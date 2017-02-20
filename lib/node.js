const helpers = require('./helpers');

module.exports = class Node {
  constructor(name, properties) {
    this.type = 'node';

    if (typeof name === 'object') {
      properties = name;
      name = null;
    }

    this.name = name;
    this.properties = properties;
    this.types = [];
  }

  toString() {
    var str = '(';

    if (this.name) {
      str = `${str}${this.name}`;
    }

    if (this.types.length) {
      str = `${str}:${this.types.join(':')}`;
    }

    if (this.properties && Object.keys(this.properties).length) {
      str = `${str}${this.name || this.label ? ' ' : ''}${helpers.serialize(this.properties)}`;
    }

    return `${str})`;
  }
};
