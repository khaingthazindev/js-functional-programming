// composition
let pipe = function (...fns) {
  return function (x) {
    return fns.reduce((accu, currentFun) => currentFun(accu), x);
  };
};

// composition
let compose = function (...fns) {
  return function (x) {
    return fns.reduceRight((accu, currentFun) => currentFun(accu), x);
  };
};

// accept parameters one by one
function curry(fn) {
  return fn.length == 1
    ? fn
    : function (x) {
        // recursive
        return curry(fn.bind(null, x));
      };
}

// change method to function
let demethodnize = function (fn) {
  return function (obj, ...rest) {
    return fn.call(obj, ...rest); //indrect invocation
  };
};

function reverse(fn) {
  return function (...rest) {
    return fn(...rest.reverse());
  };
}

// especially used for 'cross cutting concern'
let MayBe = (value) => ({
  value,
  map: function (fn) {
    return this.isEmpty() ? MayBe.of(null) : MayBe.of(fn(value));
  },
  isEmpty: () => value === null || value === undefined,
  orElse: function (defaultStr) {
    return this.value === null ? MayBe.of(defaultStr) : this;
  },
});
MayBe.of = MayBe;

// especially used for 'error handling'
const Left = (value) => ({
  valueOf() {
    return value;
  },
  map(fn) {
    console.log("left map--", fn(value));
    return Left.of(fn(value));
  },
  flat() {
    return value;
  },
  flatMap(fn) {
    return fn(value);
  },
  matchWith(context) {
    return context.left(value);
  },
});
Left.of = Left;

const Right = (value) => ({
  valueOf() {
    return value;
  },
  map(fn) {
    return Right.of(fn(value));
  },
  flat() {
    return value;
  },
  flatMap(fn) {
    return fn(value);
  },
  matchWith(context) {
    return context.right(value);
  },
});
Right.of = Right;
