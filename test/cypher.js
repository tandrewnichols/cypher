describe('cypher', function() {
  let Cypher = require('../lib/cypher');
  
  describe('.match', function() {
    it('should match a simple node', function() {
      let str = new Cypher().match('n').toString();
      str.should.equal('MATCH (n)')
    });

    it('should match a node with a label', function() {
      let str = new Cypher().match('n', 'Person').toString();
      str.should.equal('MATCH (n:Person)');
    });

    it('should match a node with a label and properties', function() {
      let str = new Cypher().match('n', 'Person', { name: 'John' }).toString();
      str.should.equal("MATCH (n:Person { name: 'John' })");
    });

    it('should match a node with properties and no label', function() {
      let str = new Cypher().match('n', { name: 'John' }).toString();
      str.should.equal("MATCH (n { name: 'John' })");
    });

    it('should match a node with a label where the node is unnamed', function() {
      let str = new Cypher().match('Person').toString();
      str.should.equal('MATCH (:Person)');
    });

    it('should match a node with properties where the node is unnamed', function() {
      let str = new Cypher().match({ name: 'John' }).toString();
      str.should.equal("MATCH ({ name: 'John' })");
    });

    it('should match a node with a label and properties where the node is unnamed', function() {
      let str = new Cypher().match('Person', { name: 'John' }).toString();
      str.should.equal("MATCH (:Person { name: 'John' })");
    });
  });
});
