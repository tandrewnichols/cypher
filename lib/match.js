const helpers = require('./helpers');

module.exports = class Match {
  constructor(node, label = '', properties = {}) {
    if (typeof node === 'string' && /[A-Z]/.test(node.charAt(0))) {
      properties = label;
      label = node;
      node = null;
    } else if (typeof node === 'object') {
      properties = node;
      label = null;
      node = null;
    }

    this.node = node;
    if (label && typeof label === 'object') {
      this.properties = label;
    } else {
      this.label = label;
      this.properties = properties;
    }
  }

  toString() {
    var str = 'MATCH (';

    if (this.node) {
      str = `${str}${this.node}`;
    }

    if (this.label) {
      str = `${str}:${this.label}`;
    }

    if (this.properties && Object.keys(this.properties).length) {
      str = `${str}${this.node || this.label ? ' ' : ''}${helpers.serialize(this.properties)}`;
    }

    return `${str})`;
  }
};
