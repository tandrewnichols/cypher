const helpers = require('./helpers');
const Node = require('./node');

module.exports = class RelationshipNode extends Node {
  toString() {
    let str = '-';
    if (this.name || this.types.length || this.properties) {
      str = `${str}[`;
    }

    if (this.name) {
      str = `${str}${this.name}`;
    }

    if (this.types.length) {
      str = this.types.reduce(function(memo, type, index) {
        if (index) {
          memo = `${memo}|`;
        }

        if (type.indexOf(' ') > -1) {
          type = `\`${type}\``;
        }

        memo = `${memo}:${type}`;

        return memo;
      }, str);
    }

    if (this.length) {
      str = `${str}*`;
      if (this.length.start) {
        str = `${str}${this.length.start}`;
      }
      if (this.length.end) {
        str = `${str}..${this.length.end}`;
      }
    }

    if (this.properties && Object.keys(this.properties).length) {
      str = `${str}${this.name || this.types.length || this.length ? ' ' : ''}${helpers.serialize(this.properties)}`;
    }

    if (this.name || this.types.length || this.properties) {
      str = `${str}]`;
    }

    return `${str}-`;
  }
};
