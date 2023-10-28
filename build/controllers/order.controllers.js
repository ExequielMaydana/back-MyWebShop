"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var order = require("../models/order.model");
var product = require("../models/products.model");
var postOrder = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var _req$body, client, producst, prices, _iterator, _step, value, productFound, totalXProduct, totalFinal, newOrder;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, client = _req$body.client, producst = _req$body.producst;
          prices = [];
          _iterator = _createForOfIteratorHelper(producst);
          _context.prev = 3;
          _iterator.s();
        case 5:
          if ((_step = _iterator.n()).done) {
            _context.next = 22;
            break;
          }
          value = _step.value;
          _context.next = 9;
          return product.findById(value.product);
        case 9:
          productFound = _context.sent;
          if (!(productFound.stock > value.quantity)) {
            _context.next = 18;
            break;
          }
          totalXProduct = productFound.price * value.quantity;
          prices.push(totalXProduct);
          productFound.stock -= value.quantity;
          _context.next = 16;
          return productFound.save();
        case 16:
          _context.next = 20;
          break;
        case 18:
          res.status(400).json({
            message: "The product you wish to purchase is not in stock"
          });
          return _context.abrupt("return", next());
        case 20:
          _context.next = 5;
          break;
        case 22:
          _context.next = 27;
          break;
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](3);
          _iterator.e(_context.t0);
        case 27:
          _context.prev = 27;
          _iterator.f();
          return _context.finish(27);
        case 30:
          totalFinal = prices.reduce(function (a, b) {
            return a + b;
          }, 0);
          newOrder = new order({
            client: client,
            producst: producst,
            total: totalFinal
          });
          _context.prev = 32;
          _context.next = 35;
          return newOrder.save();
        case 35:
          res.status(201).json({
            message: "The order was successfully created",
            order: newOrder
          });
          _context.next = 42;
          break;
        case 38:
          _context.prev = 38;
          _context.t1 = _context["catch"](32);
          res.status(400).json(_context.t1);
          next();
        case 42:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 24, 27, 30], [32, 38]]);
  }));
  return function postOrder(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var getAllOrders = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var orders;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return order.find().populate({
            path: "client",
            select: "first_and_last_name email"
          }).populate({
            path: "producst.product",
            select: "name category img price",
            model: "product"
          });
        case 2:
          orders = _context2.sent;
          res.status(200).json({
            items: orders.length,
            orders: orders
          });
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getAllOrders(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var getOrderById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var idOrder, orderById;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          idOrder = req.params.id;
          _context3.next = 3;
          return order.findById(idOrder).populate({
            path: "client",
            select: "first_and_last_name email"
          }).populate({
            path: "producst.product",
            select: "name category img valueprice",
            model: "product"
          });
        case 3:
          orderById = _context3.sent;
          if (orderById) {
            _context3.next = 7;
            break;
          }
          res.status(400).json({
            message: "The order with the id ".concat(idOrder, " does not exist")
          });
          return _context3.abrupt("return", next());
        case 7:
          res.status(200).json(orderById);
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getOrderById(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
var updateOrder = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var idOrder, newDataOrder, orderUpdate;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          idOrder = req.params.id;
          newDataOrder = req.body;
          _context4.next = 4;
          return order.findOneAndUpdate({
            _id: idOrder
          }, newDataOrder, {
            "new": true
          }).populate({
            path: "client",
            select: "first_and_last_name email"
          }).populate({
            path: "producst.product",
            select: "name category img price",
            model: "product"
          });
        case 4:
          orderUpdate = _context4.sent;
          try {
            res.status(200).json({
              message: "The order was successfully modified",
              order_update: orderUpdate
            });
          } catch (error) {
            res.status(400).json(error);
            next();
          }
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function updateOrder(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteOrder = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var idORder;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          idORder = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return order.findOneAndDelete({
            _id: idORder
          });
        case 4:
          res.status(204).json();
          _context5.next = 11;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](1);
          res.status(400).json(_context5.t0);
          next();
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 7]]);
  }));
  return function deleteOrder(_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();

// my user

/*
  en -> req.userId se almacena el TOKEN del usuario que inicio sesion.
  Ese token contiene toda la informacion del usuario, incluyendo su ID.
  Con el ID del usuario, verifico si tiene alguna orden.
*/
var getAllMyOrders = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var ordersUser;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return order.find({
            client: {
              $in: req.userId
            }
          }).populate({
            path: "client",
            select: "first_and_last_name email"
          }).populate({
            path: "producst.product",
            select: "name category img price",
            model: "product"
          });
        case 2:
          ordersUser = _context6.sent;
          if (!ordersUser) {
            _context6.next = 5;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            items: ordersUser.length,
            orders: ordersUser
          }));
        case 5:
          next();
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getAllMyOrders(_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();
var getMyOrderById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var idMyOrder, filteredOrderById;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          idMyOrder = req.params.id;
          _context7.next = 3;
          return order.findById(idMyOrder).where({
            client: {
              $in: req.userId
            }
          }).populate({
            path: "client",
            select: "first_and_last_name email"
          }).populate({
            path: "producst.product",
            select: "name category img valueprice",
            model: "product"
          });
        case 3:
          filteredOrderById = _context7.sent;
          if (!filteredOrderById) {
            _context7.next = 6;
            break;
          }
          return _context7.abrupt("return", res.status(200).json(filteredOrderById));
        case 6:
          res.status(400).json({
            message: "The user does not have an order with this id ".concat(idMyOrder)
          });
          next();
        case 8:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function getMyOrderById(_x18, _x19, _x20) {
    return _ref7.apply(this, arguments);
  };
}();
var updateMyOrder = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
    var idMyOrder, _req$body2, client, producst, total, prices, _iterator2, _step2, value, productFound, totalXProduct, totalFinal, updateTotalOrder;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          idMyOrder = req.params.id;
          _req$body2 = req.body, client = _req$body2.client, producst = _req$body2.producst, total = _req$body2.total; // modifico la orden, verificando que pertenezca al usuario.
          _context8.next = 4;
          return order.findOneAndUpdate({
            _id: idMyOrder
          }, {
            client: client,
            producst: producst,
            total: total
          }).where({
            client: {
              $in: req.userId
            }
          }).populate({
            path: "client",
            select: "first_and_last_name email"
          }).populate({
            path: "producst.product",
            select: "name category img price",
            model: "product"
          });
        case 4:
          // luego actualizo el total a pagar y actualizo el stock de los productos.
          prices = [];
          _iterator2 = _createForOfIteratorHelper(producst);
          _context8.prev = 6;
          _iterator2.s();
        case 8:
          if ((_step2 = _iterator2.n()).done) {
            _context8.next = 25;
            break;
          }
          value = _step2.value;
          _context8.next = 12;
          return product.findById(value.product);
        case 12:
          productFound = _context8.sent;
          if (!(productFound.stock > value.quantity)) {
            _context8.next = 21;
            break;
          }
          totalXProduct = productFound.price * value.quantity;
          prices.push(totalXProduct);
          productFound.stock -= value.quantity;
          _context8.next = 19;
          return productFound.save();
        case 19:
          _context8.next = 23;
          break;
        case 21:
          res.status(400).json({
            message: "The product you wish to purchase is not in stock"
          });
          return _context8.abrupt("return", next());
        case 23:
          _context8.next = 8;
          break;
        case 25:
          _context8.next = 30;
          break;
        case 27:
          _context8.prev = 27;
          _context8.t0 = _context8["catch"](6);
          _iterator2.e(_context8.t0);
        case 30:
          _context8.prev = 30;
          _iterator2.f();
          return _context8.finish(30);
        case 33:
          totalFinal = prices.reduce(function (a, b) {
            return a + b;
          }, 0); // finalmente modifico el total y muestro la orden modificada.
          _context8.next = 36;
          return order.findOneAndUpdate({
            _id: idMyOrder
          }, {
            total: totalFinal
          }, {
            "new": true
          });
        case 36:
          updateTotalOrder = _context8.sent;
          try {
            res.status(200).json({
              message: "Order was successfully modified",
              updateTotalOrder: updateTotalOrder
            });
          } catch (error) {
            res.status(400).json({
              error: error
            });
            next();
          }
        case 38:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[6, 27, 30, 33]]);
  }));
  return function updateMyOrder(_x21, _x22, _x23) {
    return _ref8.apply(this, arguments);
  };
}();
var deleteMyOrder = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res, next) {
    var idMyOrder, ordersDelete, productsOrder, _iterator3, _step3, value, productFound;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          idMyOrder = req.params.id;
          if (!idMyOrder) {
            _context9.next = 28;
            break;
          }
          _context9.next = 4;
          return order.findById(idMyOrder).where({
            client: {
              $in: req.userId
            }
          });
        case 4:
          ordersDelete = _context9.sent;
          productsOrder = ordersDelete.producst;
          _iterator3 = _createForOfIteratorHelper(productsOrder);
          _context9.prev = 7;
          _iterator3.s();
        case 9:
          if ((_step3 = _iterator3.n()).done) {
            _context9.next = 20;
            break;
          }
          value = _step3.value;
          _context9.next = 13;
          return product.findById(value.product);
        case 13:
          productFound = _context9.sent;
          if (!productFound) {
            _context9.next = 18;
            break;
          }
          productFound.stock += value.quantity;
          _context9.next = 18;
          return productFound.save();
        case 18:
          _context9.next = 9;
          break;
        case 20:
          _context9.next = 25;
          break;
        case 22:
          _context9.prev = 22;
          _context9.t0 = _context9["catch"](7);
          _iterator3.e(_context9.t0);
        case 25:
          _context9.prev = 25;
          _iterator3.f();
          return _context9.finish(25);
        case 28:
          _context9.prev = 28;
          _context9.next = 31;
          return order.findOneAndDelete({
            _id: idMyOrder
          });
        case 31:
          res.status(200).json({
            message: "The order was successfully cancelled"
          });
          _context9.next = 38;
          break;
        case 34:
          _context9.prev = 34;
          _context9.t1 = _context9["catch"](28);
          res.status(400).json({
            error: _context9.t1
          });
          next();
        case 38:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[7, 22, 25, 28], [28, 34]]);
  }));
  return function deleteMyOrder(_x24, _x25, _x26) {
    return _ref9.apply(this, arguments);
  };
}();
module.exports = {
  postOrder: postOrder,
  getAllOrders: getAllOrders,
  getOrderById: getOrderById,
  updateOrder: updateOrder,
  deleteOrder: deleteOrder,
  getAllMyOrders: getAllMyOrders,
  getMyOrderById: getMyOrderById,
  updateMyOrder: updateMyOrder,
  deleteMyOrder: deleteMyOrder
};