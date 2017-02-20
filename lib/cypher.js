let Match = require('./match');
let Relationship = require('./relationship');
let Query = require('./query');
let Node = require('./node');
let Return = require('./return');

module.exports = class Cypher {
  constructor() {
    this.query = new Query();
  }

  match(node, props) {
    this.query.push(new Match(node, props));
    return this;
  }

  path(name) {
    var last = this.query.lastOfType('match');

    if (last && last.node) {
      last.node.path = name;
    }

    return this;
  }

  withLabel(labels) {
    let queryPart = this.query.last();
    if (queryPart && queryPart.setLabel) {
      queryPart.setLabel(labels);
    }
    return this;
  }

  ofType(types) {
    let queryPart = this.query.last();
    if (queryPart && queryPart.setType) {
      queryPart.setType(types);
    }
    return this;
  }

  withRelationship(rel, props) {
    this.query.push(new Relationship(rel, props));
    return this;
  }

  ofVariableLength(start, end) {
    let queryPart = this.query.last();
    if (queryPart && queryPart.setLength) {
      queryPart.setLength(start, end);
    }
    return this;
  }

  to(node, props) {
    let relationship = this.query.last();
    if (relationship && relationship.type === 'relationship') {
      relationship.outgoing = true;
      relationship.node = new Node(node, props);
    }
    return this;
  }

  from(node, props) {
    let relationship = this.query.last();
    if (relationship && relationship.type === 'relationship') {
      relationship.incoming = true;
      relationship.node = new Node(node, props);
    }
    return this;
  }

  return(...props) {
    this.query.push(new Return(props));
    return this;
  }

  build() {
    return this.query.reduce(function(memo, part) {
      return memo += part.toString();
    }, '');
  }
};
