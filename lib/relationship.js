const Match = require('./match');
const RelationshipNode = require('./relationship-node');

module.exports = class Relationship extends Match {
  constructor(rel, props) {
    super();
    this.type = 'relationship';
    this.relationshipNode = new RelationshipNode(rel, props);
  }

  setType(types) {
    if (!types) {
      return;
    }

    if (!Array.isArray(types)) {
      types = [types];
    }

    this.relationshipNode.types = types;
  }

  setLength(start, end) {
    this.relationshipNode.length = {
      start: start,
      end: end
    };
  }

  toString() {
    let start = this.incoming ? '<' : '';
    let end = this.outgoing ? '>' : '';
    return `${start}${this.relationshipNode.toString()}${end}${this.node.toString()}`;
  }
};
