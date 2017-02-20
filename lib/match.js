const Node = require('./node');

module.exports = class Match {
  constructor(node, properties = {}) {
    this.type = 'match';
    this.node = new Node(node, properties);
  }

  setLabel(labels) {
    if (!labels || !labels.length) {
      return;
    }

    if (!Array.isArray(labels)) {
      labels = [labels];
    }

    this.node.types = labels;
  }

  toString() {
    return `MATCH ${this.node.toString()}`;
  }
};
