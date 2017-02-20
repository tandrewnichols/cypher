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

  describe('.path', function() {
    it('should augment the most recent node to assign the path', function() {
      let str = new Cypher().match('n').withRelationship('r').to('m').path('p').build();
      str.should.equal('MATCH p =(n)-[r]->(m)');
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

  describe('.ofType', function() {
    it('should set the type of a previous relationship', function() {
      let str = new Cypher().match('n').withRelationship('r').ofType('Person').build();
      str.should.equal('MATCH (n)-[r:Person]-()');
    });

    it('should allow an array of types', function() {
      let str = new Cypher().match('n').withRelationship('r').ofType(['Person', 'Mailman']).build();
      str.should.equal('MATCH (n)-[r:Person|:Mailman]-()');
    });

    it('should wrap types with spaces in backticks', function() {
      let str = new Cypher().match('n').withRelationship('r').ofType('Software Engineer').build();
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

  describe('.ofVariableLength', function() {
    it('should make the previous relationship a variable-length one', function() {
      let str = new Cypher().match('n').withRelationship('r').ofType('Person').ofVariableLength().build();
      str.should.equal('MATCH (n)-[r:Person*]-()');
    });

    it('should allow only a start', function() {
      let str = new Cypher().match('n').withRelationship('r').ofVariableLength(2).build();
      str.should.equal('MATCH (n)-[r*2]-()');
    });

    it('should allow a start and an end', function() {
      let str = new Cypher().match('n').withRelationship('r', { foo: 'bar' }).ofVariableLength(2, 5).build();
      str.should.equal("MATCH (n)-[r*2..5 { foo: 'bar' }]-()");
    });

    it('should allow an end only', function() {
      let str = new Cypher().match('n').withRelationship('r', { foo: 'bar' }).ofType('Friend').ofVariableLength(null, 5).build();
      str.should.equal("MATCH (n)-[r:Friend*..5 { foo: 'bar' }]-()");
    });
  });

  describe('.return', function() {
    it('should return a single variable', function() {
      let str = new Cypher().match('n').return('n').build();
      str.should.equal(`MATCH (n)\nRETURN n`);
    });

    it('should return a variable path', function() {
      let str = new Cypher().match('n').return('n.foo').build();
      str.should.equal('MATCH (n)\nRETURN n.foo');
    });

    it('should return multiple variables', function() {
      let str = new Cypher().match('n').return('n', 'o').build();
      str.should.equal('MATCH (n)\nRETURN n, o');
    });

    it('should return multiple variables and/or paths', function() {
      let str = new Cypher().match('n').return('n', 'o.foo', 'a.bar', 'c').build();
      str.should.equal('MATCH (n)\nRETURN n, o.foo, a.bar, c');
    });
  });
});
