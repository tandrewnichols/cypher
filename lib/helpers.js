exports.serialize = obj => {
  return JSON.stringify(obj).replace(/"([^"]+)":/, ' $1: ').replace(/"/g, "'").replace(/([}\]])/g, ' $1');
};
