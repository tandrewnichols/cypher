let Match = require('./match');

module.exports = class Cypher {
  constructor() {
    this.query = [];
  }

  match(node, label, props) {
    this.query.push(new Match(node, label, props));
    return this;
  }

  toString() {
    return this.query.reduce(function(memo, part) {
      return memo += part.toString();
    }, '');
  }
};
