function query(selector, element) {
  return query.one(selector, element);
}

query.one = function(selector, element) {
  if (!selector) {
    return;
  }
  if (typeof selector === "string") {
    element = element || document;
    return element.querySelector(selector);
  }
  if (selector.length !== undefined) {
    return selector[0];
  }
  return selector;
}

query.all = function(selector, element){
  if (!selector) {
    return [];
  }
  var list;
  if (typeof selector !== "string") {
    if (selector.length === undefined) {
      return [selector];
    }
    list = selector;
  } else {
    element = element || document;
    list = element.querySelectorAll(selector);
  }
  return Array.prototype.slice.call(list);
};

query.engine = function(engine){
  if (!engine.one) {
    throw new Error('.one callback required');
  }
  if (!engine.all) {
    throw new Error('.all callback required');
  }
  query.one = engine.one;
  query.all = engine.all;
  return query;
};

module.exports = query;
