module.exports = class Query extends Array {
  last() {
    return this[ this.length - 1 ];
  }

  lastOfType(type) {
    return this.find(element => element.type === type);
  }
};
