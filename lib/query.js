module.exports = class Query extends Array {
  last() {
    return this[ this.length - 1 ];
  }
};
