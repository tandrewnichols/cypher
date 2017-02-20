module.exports = class Return {
  constructor(values) {
    this.type = 'return';
    this.values = values;
  }

  toString() {
    return `\nRETURN ${this.values.join(', ')}`;
  }
};
