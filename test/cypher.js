describe('cypher', function() {
  let Cypher = require('../lib/cypher');
  
  describe('.match', function() {
    it('should match a simple node', function() {
      let str = new Cypher().match('n').build();
      str.should.equal('MATCH (n)')
    });

    it('should match a node with properties', function() {
      let str = new Cypher().match('n', { name: 'John' }).build();
      str.should.equal("MATCH (n { name: 'John' })");
    });

    it('should match a node with properties where the node is unnamed', function() {
      let str = new Cypher().match({ name: 'John' }).build();
      str.should.equal("MATCH ({ name: 'John' })");
    });
  });

  describe('.withLabel', function() {
    it('should set the type of a previous node', function() {
      let str = new Cypher().match('n').withLabel('Person').build();
      str.should.equal('MATCH (n:Person)');
    });

    it('should allow an array of labels', function() {
      let str = new Cypher().match('n').withLabel(['Person', 'Mailman']).build();
      str.should.equal('MATCH (n:Person:Mailman)');
    });

    it('should set the type of a previous node connected by relationship', function() {
      let str = new Cypher().match('n').withRelationship('r').withLabel('Person').build();
      str.should.equal('MATCH (n)-[r]-(:Person)');
    });
  });

  describe('.withType', function() {
    it('should set the type of a previous relationship', function() {
      let str = new Cypher().match('n').withRelationship('r').withType('Person').build();
      str.should.equal('MATCH (n)-[r:Person]-()');
    });

    it('should allow an array of types', function() {
      let str = new Cypher().match('n').withRelationship('r').withType(['Person', 'Mailman']).build();
      str.should.equal('MATCH (n)-[r:Person|:Mailman]-()');
    });

    it('should wrap types with spaces in backticks', function() {
      let str = new Cypher().match('n').withRelationship('r').withType('Software Engineer').build();
      str.should.equal(`MATCH (n)-[r:\`Software Engineer\`]-()`);
    });
  });

  describe('.withRelationship', function() {
    it('should relate to nodes without direction', function() {
      let str = new Cypher().match('n').withRelationship().build();
      str.should.equal('MATCH (n)--()');
    });

    it('should accept a named relationship', function() {
      let str = new Cypher().match('n').withRelationship('r').build();
      str.should.equal('MATCH (n)-[r]-()');
    });

    it('should accept a named relationship and properties', function() {
      let str = new Cypher().match('n').withRelationship('r', { for: '12 years' }).build();
      str.should.equal("MATCH (n)-[r { for: '12 years' }]-()");
    });

    it('should accept a unnamed relationship with only properties', function() {
      let str = new Cypher().match('n').withRelationship({ for: '12 years' }).build();
      str.should.equal("MATCH (n)-[{ for: '12 years' }]-()");
    });
  });

  describe('.to', function() {
    it('should make the previously relationship an outgoing one', function() {
      let str = new Cypher().match('n').withRelationship().to('a').build();
      str.should.equal('MATCH (n)-->(a)');
    });

    it('should work with properties', function() {
      let str = new Cypher().match('n').withRelationship().to('a', { name: 'John' }).build();
      str.should.equal("MATCH (n)-->(a { name: 'John' })");
    });

    it('should work with properties where the node is unnamed', function() {
      let str = new Cypher().match('n').withRelationship().to({ name: 'John' }).build();
      str.should.equal("MATCH (n)-->({ name: 'John' })");
    });

    it('should make the previous named relationship an outgoing one', function() {
      let str = new Cypher().match('n').withRelationship('r').to('a').build();
      str.should.equal('MATCH (n)-[r]->(a)');
    });
  });

  describe('.from', function() {
    it('should make the previously relationship an outgoing one', function() {
      let str = new Cypher().match('n').withRelationship().from('a').build();
      str.should.equal('MATCH (n)<--(a)');
    });

    it('should work with properties', function() {
      let str = new Cypher().match('n').withRelationship().from('a', { name: 'John' }).build();
      str.should.equal("MATCH (n)<--(a { name: 'John' })");
    });

    it('should work with properties where the node is unnamed', function() {
      let str = new Cypher().match('n').withRelationship().from({ name: 'John' }).build();
      str.should.equal("MATCH (n)<--({ name: 'John' })");
    });

    it('should make the previous named relationship an incoming one', function() {
      let str = new Cypher().match('n').withRelationship('r').from('a').build();
      str.should.equal('MATCH (n)<-[r]-(a)');
    });
  });
});
