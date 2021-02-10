// node_modules/@rescript/std/lib/es6/belt_internalAVLtree.mjs
function treeHeight(n) {
  return n !== void 0 ? n.h : 0;
}
function create(l, x, d, r) {
  var hl = treeHeight(l), hr = treeHeight(r);
  return {
    k: x,
    v: d,
    h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
    l,
    r
  };
}
function singleton(x, d) {
  return {
    k: x,
    v: d,
    h: 1,
    l: void 0,
    r: void 0
  };
}
function updateValue(n, newValue) {
  return n.v === newValue ? n : {
    k: n.k,
    v: newValue,
    h: n.h,
    l: n.l,
    r: n.r
  };
}
function bal(l, x, d, r) {
  var hl = l !== void 0 ? l.h : 0, hr = r !== void 0 ? r.h : 0;
  if (hl > (hr + 2 | 0)) {
    var ll = l.l, lr = l.r;
    return treeHeight(ll) >= treeHeight(lr) ? create(ll, l.k, l.v, create(lr, x, d, r)) : create(create(ll, l.k, l.v, lr.l), lr.k, lr.v, create(lr.r, x, d, r));
  }
  if (hr <= (hl + 2 | 0))
    return {
      k: x,
      v: d,
      h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
      l,
      r
    };
  var rl = r.l, rr = r.r;
  return treeHeight(rr) >= treeHeight(rl) ? create(create(l, x, d, rl), r.k, r.v, rr) : create(create(l, x, d, rl.l), rl.k, rl.v, create(rl.r, r.k, r.v, rr));
}
function lengthNode(n) {
  var l = n.l, r = n.r, sizeL = l !== void 0 ? lengthNode(l) : 0, sizeR = r !== void 0 ? lengthNode(r) : 0;
  return (1 + sizeL | 0) + sizeR | 0;
}
function fillArray(_n, _i, arr) {
  for (; ; ) {
    var i = _i, n = _n, l = n.l, v = n.k, r = n.r, next = l !== void 0 ? fillArray(l, i, arr) : i;
    arr[next] = [
      v,
      n.v
    ];
    var rnext = next + 1 | 0;
    if (r === void 0)
      return rnext;
    _i = rnext, _n = r;
  }
}
function toArray(n) {
  if (n === void 0)
    return [];
  var size2 = lengthNode(n), v = new Array(size2);
  return fillArray(n, 0, v), v;
}

// node_modules/@rescript/std/lib/es6/belt_internalMapString.mjs
function getWithDefault(_n, x, def) {
  for (; ; ) {
    var n = _n;
    if (n === void 0)
      return def;
    var v = n.k;
    if (x === v)
      return n.v;
    _n = x < v ? n.l : n.r;
  }
}

// node_modules/@rescript/std/lib/es6/belt_MapString.mjs
function set(t, newK, newD) {
  if (t === void 0)
    return singleton(newK, newD);
  var k = t.k;
  if (newK === k)
    return updateValue(t, newD);
  var v = t.v;
  return newK < k ? bal(set(t.l, newK, newD), k, v, t.r) : bal(t.l, k, v, set(t.r, newK, newD));
}
var empty;
var toArray2 = toArray;
var getWithDefault2 = getWithDefault;

// index.mjs
import {
  readFileSync
} from "fs";
var words = readFileSync("index.mjs", "utf8").split(/[\s\(\)\.]/).filter(Boolean), set2 = empty;
for (let word of words)
  set2 = set(set2, word, getWithDefault2(set2, word, 1));
console.log(toArray2(set2));
