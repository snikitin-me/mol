require( "source-map-support" ).install()

;
/// Fake namespace for optional overrides
///
/// 	namespace $ { export var x = 1 , y = 1 } // defaults
/// 	namespace $.$mol { export var x = 2 } // overrides
/// 	namespace $.$mol { console.log( x , y ) } // usage
///
this.$ = this.$ || this
var $ = this.$
$.$mol = $

;
setImmediate(function () {
    $.$mol_test_run();
});
//test.node.js.map
;
var $;
(function ($) {
    function $mol_test(set) {
        for (var name_1 in set)
            $.$mol_test_all.push(new $mol_test_case(set[name_1]));
    }
    $.$mol_test = $mol_test;
    $.$mol_test_all = [];
    $.$mol_test_run = function () {
        for (var _i = 0, $mol_test_all_1 = $.$mol_test_all; _i < $mol_test_all_1.length; _i++) {
            var test = $mol_test_all_1[_i];
            test.run();
        }
    };
    var $mol_test_case = (function () {
        function $mol_test_case(code) {
            if (typeof code === 'string') {
                this.code = new Function(code);
            }
            else {
                this.code = code;
            }
        }
        $mol_test_case.prototype.run = function () {
            this.code();
        };
        return $mol_test_case;
    }());
    $.$mol_test_case = $mol_test_case;
})($ || ($ = {}));
//test.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'must be false': function () {
            $.$mol_assert_not(0);
        },
        'must be true': function () {
            $.$mol_assert_ok(1);
        },
        'must be equal': function () {
            $.$mol_assert_equal(2, 2);
        },
        'must be unique': function () {
            $.$mol_assert_unique([3], [3]);
        },
    });
})($ || ($ = {}));
//assert.test.js.map
;
var $;
(function ($) {
    function $mol_assert_ok(value) {
        if (value)
            return;
        throw new Error("Not true (" + value + ")");
    }
    $.$mol_assert_ok = $mol_assert_ok;
    function $mol_assert_not(value) {
        if (!value)
            return;
        throw new Error("Not false (" + value + ")");
    }
    $.$mol_assert_not = $mol_assert_not;
    function $mol_assert_fail(handler, ErrorRight) {
        try {
            handler();
        }
        catch (error) {
            if (ErrorRight)
                $mol_assert_ok(error instanceof ErrorRight);
            return error;
        }
        throw new Error('Not failed');
    }
    $.$mol_assert_fail = $mol_assert_fail;
    function $mol_assert_equal(a, b) {
        if (a === b)
            return;
        throw new Error("Not equal (" + a + "," + b + ")");
    }
    $.$mol_assert_equal = $mol_assert_equal;
    function $mol_assert_unique(a, b) {
        if (a !== b)
            return;
        throw new Error("Not unique (" + a + "," + b + ")");
    }
    $.$mol_assert_unique = $mol_assert_unique;
})($ || ($ = {}));
//assert.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'dict shim must have equal api to native Map': function () {
            var dict = new $.$mol_dict_shim;
            var obj1 = {};
            var obj2 = {};
            var obj3 = {};
            dict.set(obj1, 1);
            dict.set(obj2, 2);
            $.$mol_assert_equal(dict.size, 2);
            $.$mol_assert_ok(dict.has(obj1));
            $.$mol_assert_ok(dict.has(obj2));
            $.$mol_assert_not(dict.has(obj3));
            $.$mol_assert_equal(dict.get(obj1), 1);
            $.$mol_assert_equal(dict.get(obj2), 2);
            $.$mol_assert_equal(dict.get(obj3), void 0);
            var entries = dict.entries();
            $.$mol_assert_equal(entries.length, 2);
            $.$mol_assert_equal(entries[0][0], obj1);
            $.$mol_assert_equal(entries[0][1], 1);
            $.$mol_assert_equal(entries[1][0], obj2);
            $.$mol_assert_equal(entries[1][1], 2);
            dict.delete(obj2);
            $.$mol_assert_not(dict.has(obj2));
        }
    });
})($ || ($ = {}));
//dict.test.js.map
;
var $;
(function ($) {
    var $mol_dict_shim = (function () {
        function $mol_dict_shim() {
            this._keys = {};
            this._values = {};
            this.size = 0;
        }
        $mol_dict_shim.prototype.set = function (key, value) {
            var keyStr = String(key);
            var keys = this._keys[keyStr];
            if (keys) {
                var index = keys.indexOf(key);
                if (index === -1) {
                    index = keys.length;
                    keys.push(key);
                    ++this.size;
                }
                this._values[keyStr][index] = value;
            }
            else {
                this._keys[keyStr] = [key];
                this._values[keyStr] = [value];
                ++this.size;
            }
            return this;
        };
        $mol_dict_shim.prototype.get = function (key) {
            var keyStr = String(key);
            var list = this._keys[keyStr];
            if (!list)
                return void 0;
            var index = list.indexOf(key);
            if (index === -1)
                return void 0;
            return this._values[keyStr][index];
        };
        $mol_dict_shim.prototype.has = function (key) {
            var keyStr = String(key);
            var list = this._keys[keyStr];
            if (!list)
                return false;
            return list.indexOf(key) !== -1;
        };
        $mol_dict_shim.prototype.delete = function (key) {
            var keyStr = String(key);
            var keys = this._keys[keyStr];
            if (!keys)
                return;
            var index = keys.indexOf(key);
            if (index === -1)
                return;
            keys.splice(index, 1);
            this._values[keyStr].splice(index, 1);
            --this.size;
        };
        $mol_dict_shim.prototype.forEach = function (handle) {
            for (var keyStr in this._keys) {
                if (!this._keys.hasOwnProperty(keyStr))
                    continue;
                var values = this._values[keyStr];
                this._keys[keyStr].forEach(function (key, index) {
                    handle(values[index], key);
                });
            }
        };
        $mol_dict_shim.prototype.keys = function () {
            var keys = [];
            this.forEach(function (val, key) {
                keys.push(key);
            });
            return keys;
        };
        $mol_dict_shim.prototype.values = function () {
            var values = [];
            this.forEach(function (val, key) {
                values.push(val);
            });
            return values;
        };
        $mol_dict_shim.prototype.entries = function () {
            var entries = [];
            this.forEach(function (val, key) {
                entries.push([key, val]);
            });
            return entries;
        };
        $mol_dict_shim.prototype.clear = function () {
            this._keys = {};
            this._values = {};
            this.size = 0;
        };
        return $mol_dict_shim;
    }());
    $.$mol_dict_shim = $mol_dict_shim;
})($ || ($ = {}));
//dict.js.map
;
$.$mol_dict = ( typeof Map === 'function' ) ? Map : $.$mol_dict_shim

;
var $;
(function ($) {
    $.$mol_func_name_dict = new $.$mol_dict();
    function $mol_func_name(func) {
        if (func.name)
            return func.name;
        if ($.$mol_func_name_dict.has(func))
            return $.$mol_func_name_dict.get(func);
        var name = Function.prototype.toString.call(func).match(/^function ([a-z0-9_$]*)/)[1];
        $.$mol_func_name_dict.set(func, name);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
})($ || ($ = {}));
//func.js.map
;
var $;
(function ($) {
    function $mol_log(path, values) {
        var filter = $mol_log.filter();
        if (filter == null)
            return;
        if (path.indexOf(filter) === -1)
            return;
        var time = new Date().toLocaleTimeString();
        console.log(time, path, values);
    }
    $.$mol_log = $mol_log;
    (function ($mol_log) {
        var _filter;
        function filter(next) {
            if (next !== void 0) {
                _filter = next;
            }
            if (_filter !== void 0)
                return _filter;
            return _filter = null;
        }
        $mol_log.filter = filter;
    })($mol_log = $.$mol_log || ($.$mol_log = {}));
})($ || ($ = {}));
//log.node.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    $.$mol_test({
        'init with overload': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                X.prototype.foo = function () {
                    return 1;
                };
                return X;
            }($.$mol_object));
            var x = new X().setup(function (obj) {
                obj.foo = function () { return 2; };
            });
            $.$mol_assert_equal(x.foo(), 2);
        },
        'object path generation': function () {
            var x = new $.$mol_object;
            $.$mol_assert_equal("" + x, '');
            x.object_field('foo()');
            $.$mol_assert_equal("" + x, '.foo()');
            x.object_field('bar()');
            $.$mol_assert_equal("" + x, '.foo()');
        },
    });
})($ || ($ = {}));
//object.test.js.map
;
var $;
(function ($) {
    var $mol_object = (function () {
        function $mol_object() {
            this['destroyed()'] = false;
        }
        $mol_object.prototype.Class = function () {
            return this.constructor;
        };
        $mol_object.toString = function () {
            return $.$mol_func_name(this);
        };
        $mol_object.prototype.object_owner = function (next) {
            if (this['object_owner()'])
                return this['object_owner()'];
            return this['object_owner()'] = next;
        };
        $mol_object.prototype.object_field = function (next) {
            if (this['object_field()'])
                return this['object_field()'] || '';
            return this['object_field()'] = next;
        };
        $mol_object.prototype.toString = function () {
            var path = '';
            var owner = this.object_owner();
            if (owner)
                path = owner.toString();
            var field = this.object_field();
            if (field)
                path += '.' + field;
            return path;
        };
        $mol_object.prototype.toJSON = function () {
            return this.toString();
        };
        $mol_object.prototype.setup = function (script) {
            script(this);
            return this;
        };
        $mol_object.prototype.destroyed = function (next) {
            if (next === void 0)
                return this['destroyed()'];
            this['destroyed()'] = next;
            this.log(['.destroyed()', next]);
            return next;
        };
        $mol_object.prototype.log = function (values) {
            if ($.$mol_log.filter() == null)
                return;
            $.$mol_log(this.toString(), values);
        };
        return $mol_object;
    }());
    $.$mol_object = $mol_object;
})($ || ($ = {}));
//object.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_defer = (function (_super) {
        __extends($mol_defer, _super);
        function $mol_defer(run) {
            var _this = _super.call(this) || this;
            _this.run = run;
            $mol_defer.add(_this);
            return _this;
        }
        $mol_defer.prototype.destroyed = function (next) {
            if (next)
                $mol_defer.drop(this);
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_defer.schedule = function () {
            var _this = this;
            if (this.timer)
                return;
            this.timer = this.scheduleNative(function () {
                _this.timer = 0;
                _this.run();
            });
        };
        $mol_defer.unschedule = function () {
            if (!this.timer)
                return;
            cancelAnimationFrame(this.timer);
            this.timer = 0;
        };
        $mol_defer.add = function (defer) {
            this.all.push(defer);
            this.schedule();
        };
        $mol_defer.drop = function (defer) {
            var index = this.all.indexOf(defer);
            if (index >= 0)
                this.all.splice(index, 1);
        };
        $mol_defer.run = function () {
            if (this.all.length === 0)
                return;
            this.schedule();
            for (var defer; defer = this.all.pop();)
                defer.run();
        };
        return $mol_defer;
    }($.$mol_object));
    $mol_defer.all = [];
    $mol_defer.timer = 0;
    $mol_defer.scheduleNative = (typeof requestAnimationFrame == 'function')
        ? function (handler) { return requestAnimationFrame(handler); }
        : function (handler) { return setTimeout(handler, 16); };
    $.$mol_defer = $mol_defer;
})($ || ($ = {}));
//defer.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'set-shim must have equal api to native Set': function () {
            var set = new $.$mol_set_shim;
            var obj1 = {};
            var obj2 = {};
            var obj3 = {};
            set.add(obj1);
            set.add(obj2);
            $.$mol_assert_equal(set.size, 2);
            $.$mol_assert_ok(set.has(obj1));
            $.$mol_assert_ok(set.has(obj2));
            $.$mol_assert_not(set.has(obj3));
            var entries = set.entries();
            $.$mol_assert_equal(entries.length, 2);
            $.$mol_assert_equal(entries[0][0], obj1);
            $.$mol_assert_equal(entries[0][1], obj1);
            $.$mol_assert_equal(entries[1][0], obj2);
            $.$mol_assert_equal(entries[1][1], obj2);
            set.delete(obj2);
            $.$mol_assert_not(set.has(obj2));
        },
    });
})($ || ($ = {}));
//set.test.js.map
;
var $;
(function ($) {
    var $mol_set_shim = (function () {
        function $mol_set_shim() {
            this._index = {};
            this.size = 0;
        }
        $mol_set_shim.prototype.add = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (list) {
                if (list.indexOf(value) !== -1)
                    return this;
                list.push(value);
            }
            else {
                list = this._index[key] = [value];
            }
            ++this.size;
            return this;
        };
        $mol_set_shim.prototype.has = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (!list)
                return false;
            return list.indexOf(value) !== -1;
        };
        $mol_set_shim.prototype.delete = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (!list)
                return;
            var index = list.indexOf(value);
            if (index === -1)
                return;
            list.splice(index, 1);
            --this.size;
        };
        $mol_set_shim.prototype.forEach = function (handle) {
            for (var key in this._index) {
                if (!this._index.hasOwnProperty(key))
                    continue;
                this._index[key].forEach(function (val, index) { return handle(val, val); });
            }
        };
        $mol_set_shim.prototype.keys = function () {
            var keys = [];
            this.forEach(function (val, key) {
                keys.push(key);
            });
            return keys;
        };
        $mol_set_shim.prototype.values = function () {
            var values = [];
            this.forEach(function (val, key) {
                values.push(val);
            });
            return values;
        };
        $mol_set_shim.prototype.entries = function () {
            var entries = [];
            this.forEach(function (val, key) {
                entries.push([val, key]);
            });
            return entries;
        };
        $mol_set_shim.prototype.clear = function () {
            this._index = {};
            this.size = 0;
        };
        return $mol_set_shim;
    }());
    $.$mol_set_shim = $mol_set_shim;
})($ || ($ = {}));
//set.js.map
;
$.$mol_set = ( typeof Set === 'function' ) ? Set : $.$mol_set_shim

;
var $;
(function ($) {
    $.$mol_state_stack = new $.$mol_dict();
})($ || ($ = {}));
//stack.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'caching': function () {
            var random = new $.$mol_atom('random', function () { return Math.random(); });
            $.$mol_assert_equal(random.get(), random.get());
        },
        'lazyness': function () {
            var value = 0;
            var prop = new $.$mol_atom('prop', function () { return value = 1; });
            $.$mol_defer.run();
            $.$mol_assert_equal(value, 0);
        },
        'instant actualization': function () {
            var source = new $.$mol_atom('source', function (next) { return next || 1; });
            var middle = new $.$mol_atom('middle', function () { return source.get() + 1; });
            var target = new $.$mol_atom('target', function () { return middle.get() + 1; });
            $.$mol_assert_equal(target.get(), 3);
            source.set(2);
            $.$mol_assert_equal(target.get(), 4);
        },
        'automatic deferred restart': function () {
            var targetValue;
            var source = new $.$mol_atom('source', function (next) { return next || 1; });
            var middle = new $.$mol_atom('middle', function () { return source.get() + 1; });
            var target = new $.$mol_atom('target', function () { return targetValue = middle.get() + 1; });
            target.get();
            $.$mol_assert_equal(targetValue, 3);
            source.set(2);
            $.$mol_assert_equal(targetValue, 3);
            $.$mol_defer.run();
            $.$mol_assert_equal(targetValue, 4);
        },
        'Right reactive change of source': function () {
            var targetValue;
            var counter = new $.$mol_atom('counter', function (next) {
                new $.$mol_defer(function () {
                    counter.push(next || 1);
                });
                throw new $.$mol_atom_wait;
            });
            var slave = new $.$mol_atom('slave', function (next) { return counter.get(); });
            slave.actualize();
            var changed = false;
            $.$mol_atom_task('task', function () {
                var next = counter.get() + 1;
                $.$mol_atom_task('task', function () {
                    counter.set(next).valueOf();
                    changed = true;
                });
            });
            $.$mol_defer.run();
            $.$mol_assert_equal(counter.get(), 2);
            $.$mol_assert_ok(changed);
            slave.destroyed(true);
        },
        'error handling': function () {
            var source = new $.$mol_atom('source', function (next) {
                var error = new Error('Test error');
                error['$mol_atom_catched'] = true;
                throw error;
            });
            var middle = new $.$mol_atom('middle', function () { return source.get() + 1; });
            var target = new $.$mol_atom('target', function () { return middle.get() + 1; });
            $.$mol_assert_fail(function () { return target.get().valueOf(); });
        },
    });
})($ || ($ = {}));
//atom.test.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_atom_status;
    (function ($mol_atom_status) {
        $mol_atom_status[$mol_atom_status["obsolete"] = 'obsolete'] = "obsolete";
        $mol_atom_status[$mol_atom_status["checking"] = 'checking'] = "checking";
        $mol_atom_status[$mol_atom_status["pulling"] = 'pulling'] = "pulling";
        $mol_atom_status[$mol_atom_status["actual"] = 'actual'] = "actual";
    })($mol_atom_status = $.$mol_atom_status || ($.$mol_atom_status = {}));
    var $mol_atom = (function (_super) {
        __extends($mol_atom, _super);
        function $mol_atom(host, handler, field) {
            if (field === void 0) { field = 'value()'; }
            var _this = _super.call(this) || this;
            _this.masters = null;
            _this.slaves = null;
            _this.status = $mol_atom_status.obsolete;
            _this.autoFresh = true;
            _this.handler = handler;
            _this.host = Object(host);
            _this.field = field || 'value()';
            return _this;
        }
        $mol_atom.prototype.destroyed = function (next) {
            if (next) {
                this.unlink();
                var host = this.host;
                var value = host[this.field];
                if (value instanceof $.$mol_object) {
                    if ((value.object_owner() === host) && (value.object_field() === this.field)) {
                        value.destroyed(true);
                    }
                }
                host[this.field] = void null;
                host[this.field + '@'] = void null;
                this.status = $mol_atom_status.obsolete;
            }
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_atom.prototype.unlink = function () {
            this.disobey_all();
            this.check_slaves();
        };
        $mol_atom.prototype.toString = function () {
            return this.host + "." + this.field + "@";
        };
        $mol_atom.prototype.get = function (force) {
            if (this.status === $mol_atom_status.pulling) {
                throw new Error("Cyclic atom dependency of " + this);
            }
            this.actualize(force);
            var slave = $mol_atom.stack[0];
            if (slave)
                this.lead(slave);
            if (slave)
                slave.obey(this);
            var value = this.host[this.field];
            if (value instanceof Error) {
                if (typeof Proxy !== 'function')
                    throw value;
            }
            return value;
        };
        $mol_atom.prototype.actualize = function (force) {
            var _this = this;
            if (!force && this.status === $mol_atom_status.actual)
                return;
            var slave = $mol_atom.stack[0];
            $mol_atom.stack[0] = this;
            if (!force && this.status === $mol_atom_status.checking) {
                this.masters.forEach(function (master) {
                    if (_this.status !== $mol_atom_status.checking)
                        return;
                    master.actualize();
                });
                if (this.status === $mol_atom_status.checking) {
                    this.status = $mol_atom_status.actual;
                }
            }
            if (force || this.status !== $mol_atom_status.actual) {
                var oldMasters = this.masters;
                this.masters = null;
                if (oldMasters)
                    oldMasters.forEach(function (master) {
                        master.dislead(_this);
                    });
                this.status = $mol_atom_status.pulling;
                var next = this.pull(force);
                this.push(next);
            }
            $mol_atom.stack[0] = slave;
        };
        $mol_atom.prototype.pull = function (force) {
            try {
                return this.handler(this._next, force);
            }
            catch (error) {
                if (error['$mol_atom_catched'])
                    return error;
                if (error instanceof $mol_atom_wait)
                    return error;
                console.error(error.stack || error);
                if (!(error instanceof Error)) {
                    error = new Error(error.stack || error);
                }
                error['$mol_atom_catched'] = true;
                return error;
            }
        };
        $mol_atom.prototype.set = function (next) {
            var next_normal = this.normalize(next, this._next);
            if (next_normal === this._next)
                return this.get();
            if (next_normal === this.host[this.field])
                return this.get();
            this._next = next_normal;
            this.obsolete();
            return this.get();
        };
        $mol_atom.prototype.normalize = function (next, prev) {
            if (next === prev)
                return next;
            if ((next instanceof Array) && (prev instanceof Array) && (next.length === prev.length)) {
                for (var i = 0; i < next.length; ++i) {
                    if (next[i] !== prev[i])
                        return next;
                }
                return prev;
            }
            return next;
        };
        $mol_atom.prototype.push = function (next_raw) {
            this._next = void null;
            this.status = $mol_atom_status.actual;
            var host = this.host;
            var prev = host[this.field];
            if (next_raw === void null)
                return prev;
            var next = (next_raw instanceof Error) ? next_raw : this.normalize(next_raw, prev);
            if (next === prev)
                return prev;
            if (next instanceof $.$mol_object) {
                next.object_field(this.field);
                next.object_owner(host);
            }
            if ((typeof Proxy === 'function') && (next instanceof Error)) {
                next = new Proxy(next, {
                    get: function (target) {
                        throw target.valueOf();
                    },
                    ownKeys: function (target) {
                        throw target.valueOf();
                    },
                });
            }
            host[this.field] = next;
            this.log(['push', next, prev]);
            this.obsolete_slaves();
            return next;
        };
        $mol_atom.prototype.obsolete_slaves = function () {
            if (!this.slaves)
                return;
            this.slaves.forEach(function (slave) { return slave.obsolete(); });
        };
        $mol_atom.prototype.check_slaves = function () {
            if (this.slaves) {
                this.slaves.forEach(function (slave) { return slave.check(); });
            }
            else {
                if (this.autoFresh)
                    $mol_atom.actualize(this);
            }
        };
        $mol_atom.prototype.check = function () {
            if (this.status === $mol_atom_status.actual) {
                this.status = $mol_atom_status.checking;
                this.check_slaves();
            }
        };
        $mol_atom.prototype.obsolete = function () {
            if (this.status === $mol_atom_status.obsolete)
                return;
            this.log(['obsolete']);
            this.status = $mol_atom_status.obsolete;
            this.check_slaves();
            return void null;
        };
        $mol_atom.prototype.lead = function (slave) {
            if (!this.slaves) {
                this.slaves = new $.$mol_set();
                $mol_atom.unreap(this);
            }
            this.slaves.add(slave);
        };
        $mol_atom.prototype.dislead = function (slave) {
            if (!this.slaves)
                return;
            if (this.slaves.size === 1) {
                this.slaves = null;
                $mol_atom.reap(this);
            }
            else {
                this.slaves.delete(slave);
            }
        };
        $mol_atom.prototype.obey = function (master) {
            if (!this.masters)
                this.masters = new $.$mol_set();
            this.masters.add(master);
        };
        $mol_atom.prototype.disobey = function (master) {
            if (!this.masters)
                return;
            this.masters.delete(master);
        };
        $mol_atom.prototype.disobey_all = function () {
            var _this = this;
            if (!this.masters)
                return;
            this.masters.forEach(function (master) { return master.dislead(_this); });
            this.masters = null;
        };
        $mol_atom.prototype.value = function (next, force) {
            if (next === void null) {
                return this.get(force);
            }
            else {
                if (force) {
                    return this.push(next);
                }
                else {
                    return this.set(next);
                }
            }
        };
        $mol_atom.actualize = function (atom) {
            $mol_atom.updating.push(atom);
            $mol_atom.schedule();
        };
        $mol_atom.reap = function (atom) {
            $mol_atom.reaping.add(atom);
            $mol_atom.schedule();
        };
        $mol_atom.unreap = function (atom) {
            $mol_atom.reaping.delete(atom);
        };
        $mol_atom.schedule = function () {
            var _this = this;
            if (this.scheduled)
                return;
            new $.$mol_defer(function () {
                if (!_this.scheduled)
                    return;
                _this.scheduled = false;
                _this.sync();
            });
            this.scheduled = true;
        };
        $mol_atom.sync = function () {
            var _this = this;
            $.$mol_log('$mol_atom.sync', []);
            this.schedule();
            while (this.updating.length) {
                var atom = this.updating.shift();
                if (this.reaping.has(atom))
                    continue;
                if (!atom.destroyed())
                    atom.get();
            }
            while (this.reaping.size) {
                this.reaping.forEach(function (atom) {
                    _this.reaping.delete(atom);
                    if (!atom.slaves)
                        atom.destroyed(true);
                });
            }
            this.scheduled = false;
        };
        return $mol_atom;
    }($.$mol_object));
    $mol_atom.stack = [null];
    $mol_atom.updating = [];
    $mol_atom.reaping = new $.$mol_set();
    $mol_atom.scheduled = false;
    $.$mol_atom = $mol_atom;
    $.$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
    var $mol_atom_wait = (function (_super) {
        __extends($mol_atom_wait, _super);
        function $mol_atom_wait(message) {
            if (message === void 0) { message = 'Wait...'; }
            var _this = _super.call(this, message) || this;
            _this.message = message;
            _this.name = '$mol_atom_wait';
            var error = new Error(message);
            error.name = _this.name;
            error['__proto__'] = $mol_atom_wait.prototype;
            return error;
        }
        return $mol_atom_wait;
    }(Error));
    $.$mol_atom_wait = $mol_atom_wait;
    var $mol_atom_force = (function (_super) {
        __extends($mol_atom_force, _super);
        function $mol_atom_force() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_atom_force;
    }(Object));
    $.$mol_atom_force = $mol_atom_force;
    function $mol_atom_task(host, handler) {
        var atom = new $mol_atom(host, function () {
            try {
                handler();
            }
            catch (error) {
                if (!(error instanceof $mol_atom_wait))
                    atom.destroyed(true);
                throw error;
            }
            atom.destroyed(true);
        });
        $mol_atom.actualize(atom);
        return atom;
    }
    $.$mol_atom_task = $mol_atom_task;
})($ || ($ = {}));
//atom.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_test({
        'cached property with simple key': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                X.prototype.foo = function (id, next) {
                    if (next == null)
                        return new Number(123);
                    return new Number(next);
                };
                return X;
            }($.$mol_object));
            __decorate([
                $.$mol_mem_key()
            ], X.prototype, "foo", null);
            var x = new X;
            $.$mol_assert_equal(x.foo(0).valueOf(), 123);
            $.$mol_assert_equal(x.foo(0), x.foo(0));
            $.$mol_assert_unique(x.foo(0), x.foo(1));
            x.foo(0, 321);
            $.$mol_assert_equal(x.foo(0).valueOf(), 321);
            x.foo(0, null);
            $.$mol_assert_equal(x.foo(0).valueOf(), 123);
        },
        'cached property with complex key': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                X.prototype.foo = function (ids) {
                    return Math.random();
                };
                return X;
            }($.$mol_object));
            __decorate([
                $.$mol_mem_key()
            ], X.prototype, "foo", null);
            var x = new X;
            $.$mol_assert_equal(x.foo([0, 1]), x.foo([0, 1]));
            $.$mol_assert_unique(x.foo([0, 1]), x.foo([0, 2]));
        },
        'auto sync of properties': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                X.prototype.foo = function (next) {
                    return next || 1;
                };
                X.prototype.bar = function () {
                    return this.foo() + 1;
                };
                X.prototype.xxx = function () {
                    return this.bar() + 1;
                };
                return X;
            }($.$mol_object));
            __decorate([
                $.$mol_mem()
            ], X.prototype, "foo", null);
            __decorate([
                $.$mol_mem()
            ], X.prototype, "bar", null);
            __decorate([
                $.$mol_mem()
            ], X.prototype, "xxx", null);
            var x = new X;
            $.$mol_assert_equal(x.bar(), 2);
            $.$mol_assert_equal(x.xxx(), 3);
            x.foo(5);
            $.$mol_assert_equal(x.xxx(), 7);
        },
        'must be deferred destroyed when no longer referenced': function () {
            var foo;
            var B = (function (_super) {
                __extends(B, _super);
                function B() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                B.prototype.showing = function (next) {
                    if (next === void 0)
                        return true;
                    return next;
                };
                B.prototype.foo = function () {
                    return foo = new $.$mol_object;
                };
                B.prototype.bar = function () {
                    return this.showing() ? this.foo() : null;
                };
                return B;
            }($.$mol_object));
            __decorate([
                $.$mol_mem()
            ], B.prototype, "showing", null);
            __decorate([
                $.$mol_mem()
            ], B.prototype, "foo", null);
            __decorate([
                $.$mol_mem()
            ], B.prototype, "bar", null);
            var b = new B;
            var bar = b.bar();
            $.$mol_assert_ok(bar);
            b.showing(false);
            b.bar();
            $.$mol_defer.run();
            $.$mol_assert_ok(foo.destroyed());
            $.$mol_assert_ok(bar.destroyed());
            $.$mol_assert_not(b.bar());
            b.showing(true);
            $.$mol_defer.run();
            $.$mol_assert_unique(b.bar(), bar);
        },
        'wait for data': function () {
            var Test = (function (_super) {
                __extends(Test, _super);
                function Test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Test.prototype.source = function (next, force) {
                    var _this = this;
                    new $.$mol_defer(function () {
                        _this.source('Jin', $.$mol_atom_force);
                    });
                    throw new $.$mol_atom_wait('Wait for data!');
                };
                Test.prototype.middle = function () {
                    return this.source();
                };
                Test.prototype.target = function () {
                    return this.middle();
                };
                return Test;
            }($.$mol_object));
            __decorate([
                $.$mol_mem()
            ], Test.prototype, "source", null);
            __decorate([
                $.$mol_mem()
            ], Test.prototype, "middle", null);
            __decorate([
                $.$mol_mem()
            ], Test.prototype, "target", null);
            var t = new Test;
            $.$mol_assert_fail(function () { return t.target().valueOf(); }, $.$mol_atom_wait);
            $.$mol_defer.run();
            $.$mol_assert_equal(t.target(), 'Jin');
        },
    });
})($ || ($ = {}));
//mem.test.js.map
;
var $;
(function ($) {
    function $mol_mem(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (next, force) {
                var host = this;
                var field = name + "()";
                var fieldA = field + '@';
                var atom = host[fieldA];
                if (!atom) {
                    if (force && (next === void null))
                        return next;
                    host[fieldA] = atom = new $.$mol_atom(host, value.bind(host), field);
                    if (config)
                        atom.autoFresh = !config.lazy;
                }
                return atom.value(next, force);
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem = $mol_mem;
    function $mol_mem_key(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (key, next, force) {
                var host = this;
                var field = name + "(" + JSON.stringify(key) + ")";
                var fieldA = field + '@';
                var atom = host[fieldA];
                if (!atom) {
                    if (force && (next === void null))
                        return next;
                    host[fieldA] = atom = new $.$mol_atom(host, value.bind(host, key), field);
                    if (config)
                        atom.autoFresh = !config.lazy;
                }
                return atom.value(next, force);
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem_key = $mol_mem_key;
})($ || ($ = {}));
//mem.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_window = (function (_super) {
        __extends($mol_window, _super);
        function $mol_window() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_window.size = function (next) {
            return next || {
                width: 1024,
                height: 768,
            };
        };
        return $mol_window;
    }($.$mol_object));
    $.$mol_window = $mol_window;
})($ || ($ = {}));
//window.node.js.map
;
var $node = new Proxy({}, { get: function (target, field, wrapper) {
        return require(field);
    } });
//node.node.js.map
;
var $;
(function ($) {
    $.$mol_dom_context = $node.jsdom.jsdom().defaultView;
})($ || ($ = {}));
//context.node.js.map
;
var $;
(function ($) {
})($ || ($ = {}));
//context.js.map
;
var $;
(function ($) {
    function $mol_dom_render(el, config) {
        var document = el.ownerDocument;
        var _loop_1 = function (key) {
            switch (key) {
                case 'localName': break;
                case 'namespaceURI': break;
                case 'childNodes': {
                    if (!config.childNodes)
                        break;
                    $mol_dom_render_childNodes(el, config.childNodes);
                    break;
                }
                case 'attributes': {
                    if (!config.attributes)
                        break;
                    $mol_dom_render_attributes(el, config.attributes);
                    break;
                }
                case 'style': {
                    if (!config.style)
                        break;
                    $mol_dom_render_style(el, config.style);
                    break;
                }
                case 'events': {
                    $mol_dom_render_event(el, config.events);
                    break;
                }
                case 'events_async': {
                    $mol_dom_render_event_async(el, config.events_async);
                    break;
                }
                default: {
                    if (el[key] !== config[key]) {
                        el[key] = config[key];
                        if (el[key] !== config[key]) {
                            var setter_1 = function () {
                                el.removeEventListener('DOMNodeInsertedIntoDocument', setter_1, { passive: true });
                                new $.$mol_defer(function () {
                                    el[key] = config[key];
                                });
                            };
                            el.addEventListener('DOMNodeInsertedIntoDocument', setter_1, { passive: true });
                        }
                    }
                }
            }
        };
        for (var key in config) {
            _loop_1(key);
        }
        return el;
    }
    $.$mol_dom_render = $mol_dom_render;
    function $mol_dom_render_childNodes(el, childNodes) {
        var nodes = [];
        for (var i = 0; i < childNodes.length; ++i) {
            var node = childNodes[i];
            if (node == null)
                continue;
            if (Object(node) === node) {
                if (node['render'])
                    node = node['render']();
                nodes.push(node);
            }
            else {
                nodes.push(String(node));
            }
        }
        var nextNode = el.firstChild;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var view_ = nodes_1[_i];
            var view = view_.valueOf();
            if (view instanceof $.$mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (nodes.indexOf(nextNode) === -1) {
                            var nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                        else {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    nextNode.nodeValue = String(view);
                    nextNode = nextNode.nextSibling;
                }
                else {
                    var textNode = $.$mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            var currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_childNodes = $mol_dom_render_childNodes;
    function $mol_dom_render_attributes(el, attrs) {
        for (var name_1 in attrs) {
            var val = attrs[name_1];
            if (el.getAttribute(name_1) === val)
                continue;
            if (val === null || val === false)
                el.removeAttribute(name_1);
            else
                el.setAttribute(name_1, String(val));
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
    function $mol_dom_render_style(el, styles) {
        for (var name_2 in styles) {
            var val = styles[name_2];
            if (typeof val === 'number')
                val = val + "px";
            var style = el.style;
            if (val !== style[name_2])
                style[name_2] = val;
        }
    }
    $.$mol_dom_render_style = $mol_dom_render_style;
    function $mol_dom_render_event(el, events) {
        for (var name_3 in events) {
            el.addEventListener(name_3, events[name_3]);
        }
    }
    $.$mol_dom_render_event = $mol_dom_render_event;
    function $mol_dom_render_event_async(el, events) {
        for (var name_4 in events) {
            el.addEventListener(name_4, events[name_4], { passive: true });
        }
    }
    $.$mol_dom_render_event_async = $mol_dom_render_event_async;
})($ || ($ = {}));
//render.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'Make empty div': function () {
            var dom = $.$mol_dom_make({
                id: '$mol_dom_make_test',
            });
            $.$mol_assert_equal(dom.outerHTML, '<span id="$mol_dom_make_test"></span>');
        },
        'Make SVG': function () {
            var dom = $.$mol_dom_make({
                id: '$mol_dom_make_test',
                localName: 'svg',
                namespaceURI: 'http://www.w3.org/2000/svg',
            });
            $.$mol_assert_equal(dom.outerHTML, '<svg id="$mol_dom_make_test"></svg>');
        },
        'Make input with id and value': function () {
            var dom = $.$mol_dom_make({
                id: '$mol_dom_make_test',
                localName: 'input',
                value: 123,
            });
            $.$mol_assert_equal(dom.outerHTML, '<input id="$mol_dom_make_test">');
            $.$mol_assert_equal(dom.value, '123');
        },
        'Make content': function () {
            var id = '$mol_dom_make_test';
            var dom = $.$mol_dom_make({
                id: "" + id,
                childNodes: [
                    'hello',
                    $.$mol_dom_make({
                        id: id + "_inner",
                    }),
                    '!',
                ]
            });
            $.$mol_assert_equal(dom.outerHTML, '<span id="$mol_dom_make_test">' +
                'hello' +
                '<span id="$mol_dom_make_test_inner"></span>' +
                '!' +
                '</span>');
        },
        'Make to exists element': function () {
            var dom1 = $.$mol_dom_make({
                id: '$mol_dom_make_test',
            });
            $.$mol_dom_context.document.body.appendChild(dom1);
            var dom2 = $.$mol_dom_make({
                id: '$mol_dom_make_test',
                className: 'mol_dom_make_test'
            });
            $.$mol_dom_context.document.body.removeChild(dom1);
            $.$mol_assert_equal(dom1, dom2);
            $.$mol_assert_equal(dom1.outerHTML, '<span id="$mol_dom_make_test" class="mol_dom_make_test"></span>');
        },
        'Make by another dom element': function () {
            var dom1 = $.$mol_dom_make({
                id: '$mol_dom_make_test',
                className: 'hello',
                childNodes: [
                    'world'
                ],
            });
            var dom2 = $.$mol_dom_make({
                id: dom1.id,
                className: dom1.className,
                childNodes: dom1.childNodes,
            });
            $.$mol_assert_equal(dom2.outerHTML, '<span id="$mol_dom_make_test" class="hello">world</span>');
        },
    });
})($ || ($ = {}));
//make.test.js.map
;
var $;
(function ($) {
    function $mol_dom_make(config) {
        var document = $.$mol_dom_context.document;
        var el = config.id && document.getElementById(config.id);
        if (!el) {
            var name_1 = config.localName || 'span';
            var space = config.namespaceURI || 'http://www.w3.org/1999/xhtml';
            el = document.createElementNS(space, name_1);
        }
        return $.$mol_dom_render(el, config);
    }
    $.$mol_dom_make = $mol_dom_make;
})($ || ($ = {}));
//make.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_view_dom = (function (_super) {
        __extends($mol_view_dom, _super);
        function $mol_view_dom() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_view_dom.node = function (view) {
            var node = $mol_view_dom.nodes.get(view);
            if (!node) {
                node = $.$mol_dom_make({
                    localName: view.dom_name(),
                    namespaceURI: view.dom_name_space(),
                });
                $mol_view_dom.mount(view, node);
            }
            return node;
        };
        $mol_view_dom.mount = function (view, node) {
            $mol_view_dom.nodes.set(view, node);
            $.$mol_dom_render(node, {
                id: view.toString(),
                attributes: view.attr_static(),
                events: view.event(),
                events_async: view.event_async(),
            });
            for (var _i = 0, _a = view.plugins(); _i < _a.length; _i++) {
                var plugin = _a[_i];
                $mol_view_dom.nodes.set(plugin, node);
                $.$mol_dom_render(node, {
                    attributes: plugin.attr_static(),
                    events: plugin.event(),
                    events_async: plugin.event_async(),
                });
            }
            return node;
        };
        return $mol_view_dom;
    }($.$mol_object));
    $mol_view_dom.nodes = new (WeakMap || $.$mol_dict)();
    $.$mol_view_dom = $mol_view_dom;
})($ || ($ = {}));
//dom.js.map
;
var $;
(function ($) {
    function $mol_deprecated(message) {
        return function (host, field, descr) {
            var value = descr.value;
            descr.value = function $mol_deprecated_wrapper() {
                console.warn(host.constructor + "::" + field + " is deprecated. " + message);
                return value.apply(host, arguments);
            };
        };
    }
    $.$mol_deprecated = $mol_deprecated;
})($ || ($ = {}));
//deprecated.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_test({
        'id auto generation': function () {
            var $mol_view_test_item = (function (_super) {
                __extends($mol_view_test_item, _super);
                function $mol_view_test_item() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return $mol_view_test_item;
            }($.$mol_view));
            var $mol_view_test_block = (function (_super) {
                __extends($mol_view_test_block, _super);
                function $mol_view_test_block() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test_block.prototype.element = function (id) {
                    return new $mol_view_test_item();
                };
                return $mol_view_test_block;
            }($.$mol_view));
            __decorate([
                $.$mol_mem_key()
            ], $mol_view_test_block.prototype, "element", null);
            var x = new $mol_view_test_block();
            $.$mol_assert_equal(x.render().id, '');
            $.$mol_assert_equal(x.element(0).render().id, '.element(0)');
        },
        'caching ref to dom node': function () {
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            $.$mol_assert_equal(x.render(), x.render());
        },
        'content render': function () {
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test.prototype.sub = function () {
                    return ['lol', 5];
                };
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            var node = x.render();
            $.$mol_assert_equal(node.innerHTML, 'lol5');
        },
        'bem attributes generation': function () {
            var $mol_view_test_item = (function (_super) {
                __extends($mol_view_test_item, _super);
                function $mol_view_test_item() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return $mol_view_test_item;
            }($.$mol_view));
            var $mol_view_test_block = (function (_super) {
                __extends($mol_view_test_block, _super);
                function $mol_view_test_block() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test_block.prototype.Element = function (id) {
                    return new $mol_view_test_item();
                };
                return $mol_view_test_block;
            }($.$mol_view));
            __decorate([
                $.$mol_mem_key()
            ], $mol_view_test_block.prototype, "Element", null);
            var x = new $mol_view_test_block();
            $.$mol_assert_equal(x.render().getAttribute('mol_view_test_block'), '');
            $.$mol_assert_equal(x.render().getAttribute('mol_view'), '');
            $.$mol_assert_equal(x.Element(0).render().getAttribute('mol_view_test_block_element'), '');
            $.$mol_assert_equal(x.Element(0).render().getAttribute('mol_view_test_item'), '');
            $.$mol_assert_equal(x.Element(0).render().getAttribute('mol_view'), '');
        },
        'render custom attributes': function () {
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test.prototype.attr = function () {
                    return {
                        'href': '#haha',
                        'required': true,
                        'hidden': false,
                    };
                };
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            var node = x.render();
            $.$mol_assert_equal(node.getAttribute('href'), '#haha');
            $.$mol_assert_equal(node.getAttribute('required'), 'true');
            $.$mol_assert_equal(node.getAttribute('hidden'), null);
        },
        'render custom fields': function () {
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test.prototype.field = function () {
                    return {
                        'hidden': true
                    };
                };
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            var node = x.render();
            $.$mol_assert_equal(node.hidden, true);
        },
        'attach event handlers': function () {
            var clicked = false;
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test.prototype.event = function () {
                    var _this = this;
                    return {
                        'click': function (next) { return _this.event_click(next); }
                    };
                };
                $mol_view_test.prototype.event_click = function (next) {
                    clicked = true;
                };
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            var node = x.render();
            node.click();
            $.$mol_assert_ok(clicked);
        },
    });
})($ || ($ = {}));
//view.test.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_view_context = {};
    $.$mol_view_context.$mol_view_visible_width = function () { return $.$mol_window.size().width; };
    $.$mol_view_context.$mol_view_visible_height = function () { return $.$mol_window.size().height; };
    $.$mol_view_context.$mol_view_state_key = function (suffix) { return suffix; };
    var $mol_view = (function (_super) {
        __extends($mol_view, _super);
        function $mol_view() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this['event_wrapped()'] = null;
            return _this;
        }
        $mol_view.Root = function (id) {
            return new this;
        };
        $mol_view.prototype.title = function () {
            return this.Class().toString();
        };
        $mol_view.prototype.focused = function (next) {
            var node = $.$mol_view_dom.node(this);
            var value = $.$mol_view_selection.focused(next === void 0 ? void 0 : [node]);
            return value.indexOf(node) !== -1;
        };
        $mol_view.prototype.context = function (next) {
            return next || $.$mol_view_context;
        };
        $mol_view.prototype.context_sub = function () {
            return this.context();
        };
        $mol_view.prototype.state_key = function (suffix) {
            if (suffix === void 0) { suffix = ''; }
            return this.context().$mol_view_state_key(suffix);
        };
        $mol_view.prototype.dom_name = function () {
            return this.constructor.toString().replace('$', '');
        };
        $mol_view.prototype.dom_name_space = function () { return 'http://www.w3.org/1999/xhtml'; };
        $mol_view.prototype.sub = function () {
            return null;
        };
        $mol_view.prototype.sub_visible = function () {
            var sub = this.sub();
            if (!sub)
                return sub;
            var context = this.context_sub();
            sub.forEach(function (child) {
                if (child instanceof $mol_view) {
                    child.context(context);
                }
            });
            return sub;
        };
        $mol_view.prototype.minimal_width = function () {
            var sub = this.sub();
            if (!sub)
                return 0;
            var min = 0;
            sub.forEach(function (view) {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_width());
                }
            });
            return min;
        };
        $mol_view.prototype.minimal_height = function () {
            var sub = this.sub();
            if (!sub)
                return 0;
            var min = 0;
            sub.forEach(function (view) {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_height());
                }
            });
            return min;
        };
        $mol_view.prototype.view_classes = function () {
            var proto = Object.getPrototypeOf(this);
            if (this['view_classes()'])
                return this['view_classes()'];
            var current = proto;
            var classes = [];
            while (current) {
                classes.push(current.constructor);
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return this['view_classes()'] = classes;
        };
        $mol_view.prototype.dom_node = function () {
            return $.$mol_view_dom.node(this);
        };
        $mol_view.prototype.dom_tree = function () {
            return this.render();
        };
        $mol_view.prototype.render = function () {
            var node = this.dom_node();
            try {
                for (var _i = 0, _a = this.plugins(); _i < _a.length; _i++) {
                    var plugin = _a[_i];
                    plugin.render();
                }
                $.$mol_dom_render(node, __assign({ attributes: this.attr(), childNodes: this.sub_visible(), style: this.style() }, (this.field() || {})));
            }
            catch (error) {
                $.$mol_dom_render(node, {
                    attributes: { mol_view_error: error.name },
                });
                if (error instanceof $.$mol_atom_wait)
                    return node;
                if (error['$mol_atom_catched'])
                    return node;
                console.error(error);
                error['$mol_atom_catched'] = true;
            }
            return node;
        };
        $mol_view.prototype.attr_static = function () {
            var attrs = { 'mol_view_error': false };
            var owner = this.object_owner();
            if (owner instanceof $mol_view) {
                var suffix_1 = this.object_field().replace(/\(.*/, '');
                var suffix2_1 = '_' + suffix_1[0].toLowerCase() + suffix_1.substring(1);
                owner.view_classes().forEach(function (Class) {
                    if (suffix_1 in Class.prototype) {
                        var attrName = Class.toString().replace(/\$/g, '') + suffix2_1;
                        attrs[attrName] = '';
                    }
                });
            }
            this.view_classes().forEach(function (Class) {
                attrs[Class.toString().replace(/\$/g, '').toLowerCase()] = '';
            });
            return attrs;
        };
        $mol_view.prototype.attr = function () {
            return {
                'mol_view_error': false,
            };
        };
        $mol_view.prototype.style = function () {
            return {};
        };
        $mol_view.prototype.field = function () {
            return {};
        };
        $mol_view.prototype.event = function () {
            return {};
        };
        $mol_view.prototype.event_async = function () {
            return {};
        };
        $mol_view.prototype.event_wrapped = function () {
            var _this = this;
            if (this['event_wrapped()'])
                return this['event_wrapped()'];
            var event = this.event();
            var wrapped = {};
            var _loop_1 = function (name_1) {
                var handle = event[name_1];
                wrapped[name_1] = function (event) {
                    $.$mol_atom_task(_this + ".event()['" + name_1 + "']", function () { return handle(event); }).get();
                };
            };
            for (var name_1 in event) {
                _loop_1(name_1);
            }
            return this['event_wrapped()'] = wrapped;
        };
        $mol_view.prototype.locale_contexts = function () {
            return this['locale_contexts()'] || (this['locale_contexts()'] = this.view_classes().map(String));
        };
        $mol_view.prototype.plugins = function () {
            return [];
        };
        return $mol_view;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "context", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $.$mol_deprecated('Use $mol_view::render instead.')
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "render", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_view, "Root", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_view_selection = (function (_super) {
        __extends($mol_view_selection, _super);
        function $mol_view_selection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_view_selection.focused = function (next, force) {
            if (next === void 0)
                return [];
            if (next.length !== 1)
                throw new Error('Length must be equals 1');
            var node = next[0];
            node.focus();
        };
        $mol_view_selection.position = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i] = arguments[_i];
            }
            if (diff.length) {
                if (!diff[0])
                    return diff[0];
                var start = diff[0].start;
                var end = diff[0].end;
                if (!(start <= end))
                    throw new Error("Wrong offsets (" + start + "," + end + ")");
                var root = $.$mol_dom_context.document.getElementById(diff[0].id);
                root.focus();
                var range = new Range;
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= start)
                            break;
                        start -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            start = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setStart(cur, start);
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= end)
                            break;
                        end -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            end = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setEnd(cur, end);
                var sel = $.$mol_dom_context.document.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                return diff[0];
            }
            else {
                var sel = $.$mol_dom_context.document.getSelection();
                if (sel.rangeCount === 0)
                    return null;
                var range = sel.getRangeAt(0);
                var el = range.commonAncestorContainer;
                while (el && !el.id)
                    el = el.parentElement;
                if (!el)
                    return { id: null, start: 0, end: 0 };
                var meter = new Range;
                meter.selectNodeContents(el);
                meter.setEnd(range.startContainer, range.startOffset);
                var startOffset = meter.toString().length;
                meter.setEnd(range.endContainer, range.endOffset);
                var endOffset = meter.toString().length;
                return { id: el.id, start: startOffset, end: endOffset };
            }
        };
        $mol_view_selection.onFocus = function (event) {
            var parents = [];
            var element = event.target;
            while (element) {
                parents.push(element);
                element = element.parentElement;
            }
            $mol_view_selection.focused(parents, $.$mol_atom_force);
        };
        $mol_view_selection.onBlur = function (event) {
            $mol_view_selection.focused([], $.$mol_atom_force);
        };
        return $mol_view_selection;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_view_selection, "focused", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view_selection, "position", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//selection.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_meter = (function (_super) {
        __extends($mol_meter, _super);
        function $mol_meter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_meter.prototype.width = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.height = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.left = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.right = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.bottom = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.top = function (val) {
            return (val !== void 0) ? val : 0;
        };
        return $mol_meter;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "width", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "height", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "left", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "right", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "bottom", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "top", null);
    $.$mol_meter = $mol_meter;
})($ || ($ = {}));
//meter.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_meter = (function (_super) {
            __extends($mol_meter, _super);
            function $mol_meter() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._request_id = 0;
                return _this;
            }
            $mol_meter.prototype.defer_task = function () {
                var _this = this;
                this._request_id = requestAnimationFrame(function () { return _this.update(); });
            };
            $mol_meter.prototype.update = function () {
                var elem = this.render();
                var rect = elem.getBoundingClientRect();
                this.width(Math.round(rect.width));
                this.height(Math.round(rect.height));
                this.top(rect.top);
                this.bottom(rect.bottom);
                this.left(rect.left);
                this.right(rect.right);
                this.defer_task();
            };
            $mol_meter.prototype.destroyed = function (next) {
                if (next)
                    cancelAnimationFrame(this._request_id);
                return _super.prototype.destroyed.call(this, next);
            };
            $mol_meter.prototype.width = function (val) {
                var _this = this;
                if (val !== void 0)
                    return val;
                if (this.render().tagName === 'BODY')
                    return $.$mol_window.size().width;
                new $.$mol_defer(function () { return _this.update(); });
                return 0;
            };
            $mol_meter.prototype.height = function (val) {
                var _this = this;
                if (val !== void 0)
                    return val;
                if (this.render().tagName === 'BODY')
                    return $.$mol_window.size().height;
                new $.$mol_defer(function () { return _this.update(); });
                return 0;
            };
            return $mol_meter;
        }($.$mol_meter));
        __decorate([
            $.$mol_mem()
        ], $mol_meter.prototype, "width", null);
        __decorate([
            $.$mol_mem()
        ], $mol_meter.prototype, "height", null);
        $mol.$mol_meter = $mol_meter;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//meter.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_ghost = (function (_super) {
        __extends($mol_ghost, _super);
        function $mol_ghost() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_ghost.prototype.Sub = function () {
            return new $.$mol_view();
        };
        return $mol_ghost;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_ghost.prototype, "Sub", null);
    $.$mol_ghost = $mol_ghost;
})($ || ($ = {}));
//ghost.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_ghost = (function (_super) {
            __extends($mol_ghost, _super);
            function $mol_ghost() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_ghost.prototype.dom_node = function () {
                return $.$mol_view_dom.node(this.Sub());
            };
            $mol_ghost.prototype.render = function () {
                this.Sub().render();
                return _super.prototype.render.call(this);
            };
            return $mol_ghost;
        }($.$mol_ghost));
        $mol.$mol_ghost = $mol_ghost;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//ghost.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_book = (function (_super) {
        __extends($mol_book, _super);
        function $mol_book() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_book.prototype.pages_extended = function () {
            return [];
        };
        $mol_book.prototype.sub = function () {
            return this.pages_extended();
        };
        $mol_book.prototype.pages = function () {
            return [];
        };
        $mol_book.prototype.width = function () {
            return this.Meter().width();
        };
        $mol_book.prototype.Meter = function () {
            return new $.$mol_meter();
        };
        $mol_book.prototype.plugins = function () {
            return [].concat(this.Meter());
        };
        $mol_book.prototype.page = function (index) {
            return null;
        };
        $mol_book.prototype.page_visible = function (index) {
            return true;
        };
        $mol_book.prototype.Page = function (index) {
            var _this = this;
            return new $.$mol_book_page().setup(function (obj) {
                obj.Sub = function () { return _this.page(index); };
                obj.visible = function () { return _this.page_visible(index); };
            });
        };
        return $mol_book;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_book.prototype, "Meter", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_book.prototype, "Page", null);
    $.$mol_book = $mol_book;
})($ || ($ = {}));
(function ($) {
    var $mol_book_placeholder = (function (_super) {
        __extends($mol_book_placeholder, _super);
        function $mol_book_placeholder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_book_placeholder.prototype.minimal_width = function () {
            return 400;
        };
        $mol_book_placeholder.prototype.sub = function () {
            return [].concat(this.title());
        };
        return $mol_book_placeholder;
    }($.$mol_view));
    $.$mol_book_placeholder = $mol_book_placeholder;
})($ || ($ = {}));
(function ($) {
    var $mol_book_page = (function (_super) {
        __extends($mol_book_page, _super);
        function $mol_book_page() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_book_page.prototype.visible = function () {
            return true;
        };
        $mol_book_page.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_book_page_visible": this.visible() }));
        };
        return $mol_book_page;
    }($.$mol_ghost));
    $.$mol_book_page = $mol_book_page;
})($ || ($ = {}));
//book.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_book = (function (_super) {
            __extends($mol_book, _super);
            function $mol_book() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_book.prototype.pages_filtered = function () {
                return this.pages().filter(function (page) { return page; });
            };
            $mol_book.prototype.break_point = function () {
                var pages = this.pages_filtered();
                var limit = this.width();
                var width = 0;
                for (var break_point = pages.length; break_point > 0; --break_point) {
                    width += pages[break_point - 1].minimal_width();
                    if (width > limit)
                        break;
                }
                if (break_point === pages.length)
                    --break_point;
                return break_point;
            };
            $mol_book.prototype.page = function (index) {
                return this.pages_filtered()[index];
            };
            $mol_book.prototype.page_visible = function (index) {
                return index >= this.break_point();
            };
            $mol_book.prototype.pages_extended = function () {
                var _this = this;
                return this.pages_filtered().map(function (page, index) { return _this.Page(index); });
            };
            $mol_book.prototype.title = function () {
                return this.pages_filtered()[this.pages_filtered().length - 1].title();
            };
            return $mol_book;
        }($.$mol_book));
        __decorate([
            $.$mol_mem()
        ], $mol_book.prototype, "pages_filtered", null);
        __decorate([
            $.$mol_mem()
        ], $mol_book.prototype, "break_point", null);
        $mol.$mol_book = $mol_book;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//book.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_status = (function (_super) {
        __extends($mol_status, _super);
        function $mol_status() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_status.prototype.status = function () {
            return null;
        };
        $mol_status.prototype.message = function () {
            return "";
        };
        $mol_status.prototype.sub = function () {
            return [].concat(this.message());
        };
        return $mol_status;
    }($.$mol_view));
    $.$mol_status = $mol_status;
})($ || ($ = {}));
//status.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_status = (function (_super) {
            __extends($mol_status, _super);
            function $mol_status() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_status.prototype.message = function () {
                try {
                    var status_1 = this.status();
                    if (status_1)
                        status_1.valueOf();
                    return null;
                }
                catch (error) {
                    if (error instanceof $.$mol_atom_wait)
                        throw error;
                    return error.message;
                }
            };
            return $mol_status;
        }($.$mol_status));
        $mol.$mol_status = $mol_status;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//status.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_list = (function (_super) {
        __extends($mol_list, _super);
        function $mol_list() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_list.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "minHeight": this.minimal_height() }));
        };
        $mol_list.prototype.rows = function () {
            return [];
        };
        $mol_list.prototype.sub = function () {
            return this.rows();
        };
        $mol_list.prototype.Empty = function () {
            return null;
        };
        return $mol_list;
    }($.$mol_view));
    $.$mol_list = $mol_list;
})($ || ($ = {}));
//list.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_list = (function (_super) {
            __extends($mol_list, _super);
            function $mol_list() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_list.prototype.sub = function () {
                var rows = this.rows();
                return (rows.length === 0) ? [this.Empty()] : rows;
            };
            $mol_list.prototype.row_offsets = function () {
                var sub = this.sub();
                if (!sub)
                    return null;
                var heightLimit = this.context().$mol_view_visible_height();
                var offset = 0;
                var next = [];
                for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                    var child = sub_1[_i];
                    next.push(offset);
                    if (child instanceof $.$mol_view) {
                        offset += child.minimal_height();
                    }
                    if (offset > heightLimit)
                        break;
                }
                return next;
            };
            $mol_list.prototype.row_context = function (index) {
                var _this = this;
                var context = this.context();
                var next = Object.create(context);
                next.$mol_view_visible_height = function () {
                    var limit = context.$mol_view_visible_height();
                    return limit - _this.row_offsets()[index];
                };
                return next;
            };
            $mol_list.prototype.sub_visible = function () {
                var sub = this.sub();
                if (!sub)
                    return sub;
                var limit = this.row_offsets().length;
                var next = [];
                for (var i = 0; i < limit; ++i) {
                    var child = sub[i];
                    if (child == null)
                        continue;
                    if (child instanceof $.$mol_view) {
                        child.context(this.row_context(i));
                    }
                    next.push(child);
                }
                return next;
            };
            $mol_list.prototype.minimal_height = function () {
                var height = 0;
                var sub = this.sub();
                if (sub)
                    sub.forEach(function (child) {
                        if (child instanceof $.$mol_view) {
                            height += child.minimal_height();
                        }
                    });
                return height;
            };
            return $mol_list;
        }($.$mol_list));
        __decorate([
            $.$mol_mem()
        ], $mol_list.prototype, "row_offsets", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_list.prototype, "row_context", null);
        __decorate([
            $.$mol_mem()
        ], $mol_list.prototype, "sub_visible", null);
        $mol.$mol_list = $mol_list;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//list.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_session = (function (_super) {
        __extends($mol_state_session, _super);
        function $mol_state_session() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_state_session.value = function (key, next) {
            if (next === void 0)
                return (key in this._storage) ? this._storage[key] : null;
            if (next === null)
                delete this._storage[key];
            else
                this._storage[key] = next;
            return next;
        };
        $mol_state_session.prototype.prefix = function () { return ''; };
        $mol_state_session.prototype.value = function (key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        };
        return $mol_state_session;
    }($.$mol_object));
    $mol_state_session._storage = Object.create(null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));
//session.node.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'null by default': function () {
            var key = String(Math.random());
            $.$mol_assert_equal($.$mol_state_session.value(key), null);
        },
        'storing': function () {
            var key = String(Math.random());
            $.$mol_state_session.value(key, '$mol_state_session_test');
            $.$mol_assert_equal($.$mol_state_session.value(key), '$mol_state_session_test');
            $.$mol_state_session.value(key, null);
            $.$mol_assert_equal($.$mol_state_session.value(key), null);
        },
    });
})($ || ($ = {}));
//session.test.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_scroll = (function (_super) {
        __extends($mol_scroll, _super);
        function $mol_scroll() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_scroll.prototype.minimal_height = function () {
            return 0;
        };
        $mol_scroll.prototype.scroll_top = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_left = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_bottom = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_right = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.field = function () {
            return (__assign({}, _super.prototype.field.call(this), { "scrollTop": this.scroll_top(), "scrollLeft": this.scroll_left(), "scrollBottom": this.scroll_bottom(), "scrollRight": this.scroll_right() }));
        };
        $mol_scroll.prototype.event_scroll = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_scroll.prototype.event_repos = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_scroll.prototype.event_async = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event_async.call(this), { "scroll": function (event) { return _this.event_scroll(event); }, "DOMSubtreeModified": function (event) { return _this.event_repos(event); } }));
        };
        return $mol_scroll;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_top", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_left", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_bottom", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_right", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "event_scroll", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "event_repos", null);
    $.$mol_scroll = $mol_scroll;
})($ || ($ = {}));
//scroll.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_view_context.$mol_scroll_scroll_top = function () { return 0; };
    $.$mol_view_context.$mol_scroll_scroll_left = function () { return 0; };
    $.$mol_view_context.$mol_scroll_moving = function () { return false; };
})($ || ($ = {}));
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_scroll = (function (_super) {
            __extends($mol_scroll, _super);
            function $mol_scroll() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._moving_task_frame = 0;
                return _this;
            }
            $mol_scroll.prototype.scroll_top = function (next) {
                return $.$mol_state_session.value(this + ".scroll_top()", next) || 0;
            };
            $mol_scroll.prototype.scroll_left = function (next) {
                return $.$mol_state_session.value(this + ".scroll_left()", next) || 0;
            };
            $mol_scroll.prototype.scroll_bottom = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.scroll_right = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.event_scroll = function (next) {
                var _this = this;
                this.moving(true);
                this.moving_task_stop();
                new $.$mol_defer(function () {
                    var el = _this.dom_node();
                    var top = Math.max(0, el.scrollTop);
                    var left = Math.max(0, el.scrollLeft);
                    _this.scroll_top(top);
                    _this.scroll_left(left);
                    _this.scroll_bottom(Math.max(0, el.scrollHeight - top - el.offsetHeight));
                    _this.scroll_right(Math.max(0, el.scrollWidth - left - el.offsetWidth));
                });
            };
            $mol_scroll.prototype.event_repos = function (next) {
                var _this = this;
                new $.$mol_defer(function () {
                    var el = _this.dom_node();
                    _this.scroll_bottom(Math.max(0, el.scrollHeight - _this.scroll_top() - el.offsetHeight));
                    _this.scroll_right(Math.max(0, el.scrollWidth - _this.scroll_left() - el.offsetWidth));
                });
            };
            $mol_scroll.prototype.moving_task_stop = function () {
                var _this = this;
                cancelAnimationFrame(this._moving_task_frame);
                this._moving_task_frame = requestAnimationFrame(function () {
                    _this.moving(false);
                });
            };
            $mol_scroll.prototype.moving = function (next) {
                return next || false;
            };
            $mol_scroll.prototype.context_sub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_view_visible_height = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_height();
                    return _this.scroll_top() + Math.min(sizeWin.height, limit);
                };
                subContext.$mol_view_visible_width = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_width();
                    return _this.scroll_left() + Math.min(sizeWin.width, limit);
                };
                subContext.$mol_scroll_scroll_top = function () { return _this.scroll_top(); };
                subContext.$mol_scroll_scroll_left = function () { return _this.scroll_left(); };
                subContext.$mol_scroll_moving = function () { return _this.moving(); };
                return subContext;
            };
            return $mol_scroll;
        }($.$mol_scroll));
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "scroll_bottom", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "scroll_right", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "moving", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "context_sub", null);
        $mol.$mol_scroll = $mol_scroll;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//scroll.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_page = (function (_super) {
        __extends($mol_page, _super);
        function $mol_page() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_page.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_page.prototype.tools = function () {
            return [];
        };
        $mol_page.prototype.head = function () {
            return [].concat(this.Title(), this.tools());
        };
        $mol_page.prototype.Head = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.head(); };
            });
        };
        $mol_page.prototype.body_scroll_top = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_page.prototype.body = function () {
            return [];
        };
        $mol_page.prototype.Body = function () {
            var _this = this;
            return new $.$mol_scroll().setup(function (obj) {
                obj.scroll_top = function (val) { return _this.body_scroll_top(val); };
                obj.sub = function () { return _this.body(); };
            });
        };
        $mol_page.prototype.foot = function () {
            return [];
        };
        $mol_page.prototype.Foot = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.foot(); };
            });
        };
        $mol_page.prototype.sub = function () {
            return [].concat(this.Head(), this.Body(), this.Foot());
        };
        return $mol_page;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Head", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "body_scroll_top", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Body", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Foot", null);
    $.$mol_page = $mol_page;
})($ || ($ = {}));
//page.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_page = (function (_super) {
            __extends($mol_page, _super);
            function $mol_page() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_page.prototype.body_scroll_top = function (next) {
                return $.$mol_state_session.value(this + ".body_scroll_top()", next) || 0;
            };
            return $mol_page;
        }($.$mol_page));
        $mol.$mol_page = $mol_page;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//page.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_svg = (function (_super) {
        __extends($mol_svg, _super);
        function $mol_svg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg.prototype.dom_name = function () {
            return "svg";
        };
        $mol_svg.prototype.dom_name_space = function () {
            return "http://www.w3.org/2000/svg";
        };
        return $mol_svg;
    }($.$mol_view));
    $.$mol_svg = $mol_svg;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_root = (function (_super) {
        __extends($mol_svg_root, _super);
        function $mol_svg_root() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_root.prototype.dom_name = function () {
            return "svg";
        };
        $mol_svg_root.prototype.view_box = function () {
            return "0 0 100 100";
        };
        $mol_svg_root.prototype.aspect = function () {
            return "";
        };
        $mol_svg_root.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "viewBox": this.view_box(), "preserveAspectRatio": this.aspect() }));
        };
        return $mol_svg_root;
    }($.$mol_svg));
    $.$mol_svg_root = $mol_svg_root;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_group = (function (_super) {
        __extends($mol_svg_group, _super);
        function $mol_svg_group() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_group.prototype.dom_name = function () {
            return "g";
        };
        return $mol_svg_group;
    }($.$mol_svg));
    $.$mol_svg_group = $mol_svg_group;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_line = (function (_super) {
        __extends($mol_svg_line, _super);
        function $mol_svg_line() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_line.prototype.dom_name = function () {
            return "line";
        };
        $mol_svg_line.prototype.from = function () {
            return [];
        };
        $mol_svg_line.prototype.to = function () {
            return [];
        };
        $mol_svg_line.prototype.pos = function () {
            return [].concat(this.from(), this.to());
        };
        $mol_svg_line.prototype.from_x = function () {
            return "";
        };
        $mol_svg_line.prototype.from_y = function () {
            return "";
        };
        $mol_svg_line.prototype.to_x = function () {
            return "";
        };
        $mol_svg_line.prototype.to_y = function () {
            return "";
        };
        $mol_svg_line.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "x1": this.from_x(), "y1": this.from_y(), "x2": this.to_x(), "y2": this.to_y() }));
        };
        return $mol_svg_line;
    }($.$mol_svg));
    $.$mol_svg_line = $mol_svg_line;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_path = (function (_super) {
        __extends($mol_svg_path, _super);
        function $mol_svg_path() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_path.prototype.dom_name = function () {
            return "path";
        };
        $mol_svg_path.prototype.geometry = function () {
            return "";
        };
        $mol_svg_path.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "d": this.geometry() }));
        };
        return $mol_svg_path;
    }($.$mol_svg));
    $.$mol_svg_path = $mol_svg_path;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_circle = (function (_super) {
        __extends($mol_svg_circle, _super);
        function $mol_svg_circle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_circle.prototype.dom_name = function () {
            return "circle";
        };
        $mol_svg_circle.prototype.pos = function () {
            return [];
        };
        $mol_svg_circle.prototype.radius = function () {
            return ".5%";
        };
        $mol_svg_circle.prototype.pos_x = function () {
            return "";
        };
        $mol_svg_circle.prototype.pos_y = function () {
            return "";
        };
        $mol_svg_circle.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "r": this.radius(), "cx": this.pos_x(), "cy": this.pos_y() }));
        };
        return $mol_svg_circle;
    }($.$mol_svg));
    $.$mol_svg_circle = $mol_svg_circle;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_text = (function (_super) {
        __extends($mol_svg_text, _super);
        function $mol_svg_text() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_text.prototype.dom_name = function () {
            return "text";
        };
        $mol_svg_text.prototype.pos = function () {
            return [];
        };
        $mol_svg_text.prototype.pos_x = function () {
            return "";
        };
        $mol_svg_text.prototype.pos_y = function () {
            return "";
        };
        $mol_svg_text.prototype.align = function () {
            return "middle";
        };
        $mol_svg_text.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "x": this.pos_x(), "y": this.pos_y(), "text-anchor": this.align() }));
        };
        $mol_svg_text.prototype.text = function () {
            return "";
        };
        $mol_svg_text.prototype.sub = function () {
            return [].concat(this.text());
        };
        return $mol_svg_text;
    }($.$mol_svg));
    $.$mol_svg_text = $mol_svg_text;
})($ || ($ = {}));
//svg.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_svg_line = (function (_super) {
            __extends($mol_svg_line, _super);
            function $mol_svg_line() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_svg_line.prototype.from = function () {
                return this.pos()[0];
            };
            $mol_svg_line.prototype.from_x = function () {
                return this.from()[0];
            };
            $mol_svg_line.prototype.from_y = function () {
                return this.from()[1];
            };
            $mol_svg_line.prototype.to = function () {
                return this.pos()[1];
            };
            $mol_svg_line.prototype.to_x = function () {
                return this.to()[0];
            };
            $mol_svg_line.prototype.to_y = function () {
                return this.to()[1];
            };
            return $mol_svg_line;
        }($.$mol_svg_line));
        $mol.$mol_svg_line = $mol_svg_line;
        var $mol_svg_circle = (function (_super) {
            __extends($mol_svg_circle, _super);
            function $mol_svg_circle() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_svg_circle.prototype.pos_x = function () {
                return this.pos()[0];
            };
            $mol_svg_circle.prototype.pos_y = function () {
                return this.pos()[1];
            };
            return $mol_svg_circle;
        }($.$mol_svg_circle));
        $mol.$mol_svg_circle = $mol_svg_circle;
        var $mol_svg_text = (function (_super) {
            __extends($mol_svg_text, _super);
            function $mol_svg_text() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_svg_text.prototype.pos_x = function () {
                return this.pos()[0];
            };
            $mol_svg_text.prototype.pos_y = function () {
                return this.pos()[1];
            };
            return $mol_svg_text;
        }($.$mol_svg_text));
        $mol.$mol_svg_text = $mol_svg_text;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//svg.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_icon = (function (_super) {
        __extends($mol_icon, _super);
        function $mol_icon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon.prototype.view_box = function () {
            return "0 0 24 24";
        };
        $mol_icon.prototype.path = function () {
            return "";
        };
        $mol_icon.prototype.Path = function () {
            var _this = this;
            return new $.$mol_svg_path().setup(function (obj) {
                obj.geometry = function () { return _this.path(); };
            });
        };
        $mol_icon.prototype.sub = function () {
            return [].concat(this.Path());
        };
        return $mol_icon;
    }($.$mol_svg_root));
    __decorate([
        $.$mol_mem()
    ], $mol_icon.prototype, "Path", null);
    $.$mol_icon = $mol_icon;
})($ || ($ = {}));
//icon.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_icon_cross = (function (_super) {
        __extends($mol_icon_cross, _super);
        function $mol_icon_cross() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_cross.prototype.path = function () {
            return "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z";
        };
        return $mol_icon_cross;
    }($.$mol_icon));
    $.$mol_icon_cross = $mol_icon_cross;
})($ || ($ = {}));
//cross.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_arg = (function (_super) {
        __extends($mol_state_arg, _super);
        function $mol_state_arg(prefix) {
            if (prefix === void 0) { prefix = ''; }
            var _this = _super.call(this) || this;
            _this.prefix = prefix;
            return _this;
        }
        $mol_state_arg.href = function (next) {
            return next || process.argv.slice(2).join(' ');
        };
        $mol_state_arg.dict = function (next) {
            if (next !== void 0)
                this.href(this.make(next));
            var href = this.href();
            var chunks = href.split(/[\/\?#!&; ]/g);
            var params = {};
            chunks.forEach(function (chunk) {
                if (!chunk)
                    return;
                var vals = chunk.split(/[:=]/).map(decodeURIComponent);
                params[vals.shift()] = vals;
            });
            return params;
        };
        $mol_state_arg.value = function (key, next) {
            if (next === void 0)
                return this.dict()[key] || null;
            this.href(this.link((_a = {}, _a[key] = next, _a)));
            return next;
            var _a;
        };
        $mol_state_arg.link = function (next) {
            var params = {};
            var prev = this.dict();
            for (var key in prev) {
                params[key] = prev[key];
            }
            for (var key in next) {
                params[key] = next[key];
            }
            return this.make(params);
        };
        $mol_state_arg.make = function (next) {
            var chunks = [];
            for (var key in next) {
                if (null == next[key])
                    continue;
                chunks.push([key].concat(next[key]).map(encodeURIComponent).join('='));
            }
            return '#' + chunks.join('#');
        };
        $mol_state_arg.prototype.value = function (key, next) {
            return $mol_state_arg.value(this.prefix + key, next);
        };
        $mol_state_arg.prototype.sub = function (postfix) {
            return new $mol_state_arg(this.prefix + postfix + '.');
        };
        $mol_state_arg.prototype.link = function (next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return $mol_state_arg.link(dict);
        };
        return $mol_state_arg;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_state_arg, "href", null);
    __decorate([
        $.$mol_mem()
    ], $mol_state_arg, "dict", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_arg, "value", null);
    $.$mol_state_arg = $mol_state_arg;
})($ || ($ = {}));
//arg.node.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_link = (function (_super) {
        __extends($mol_link, _super);
        function $mol_link() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_link.prototype.minimal_height = function () {
            return 36;
        };
        $mol_link.prototype.dom_name = function () {
            return "a";
        };
        $mol_link.prototype.uri = function () {
            return "";
        };
        $mol_link.prototype.hint = function () {
            return "";
        };
        $mol_link.prototype.current = function () {
            return false;
        };
        $mol_link.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "href": this.uri(), "title": this.hint(), "mol_link_current": this.current() }));
        };
        $mol_link.prototype.sub = function () {
            return [].concat(this.title());
        };
        $mol_link.prototype.arg = function () {
            return ({});
        };
        return $mol_link;
    }($.$mol_view));
    $.$mol_link = $mol_link;
})($ || ($ = {}));
//link.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_link = (function (_super) {
            __extends($mol_link, _super);
            function $mol_link() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_link.prototype.uri = function () {
                return new $.$mol_state_arg(this.state_key()).link(this.arg());
            };
            $mol_link.prototype.current = function () {
                return this.uri() === $.$mol_state_arg.link({});
            };
            return $mol_link;
        }($.$mol_link));
        __decorate([
            $.$mol_mem()
        ], $mol_link.prototype, "uri", null);
        $mol.$mol_link = $mol_link;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//link.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_float = (function (_super) {
        __extends($mol_float, _super);
        function $mol_float() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_float.prototype.shiftStyle = function () {
            return "";
        };
        $mol_float.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "transform": this.shiftStyle() }));
        };
        $mol_float.prototype.scrolling = function () {
            return false;
        };
        $mol_float.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_float_scrolling": this.scrolling() }));
        };
        return $mol_float;
    }($.$mol_view));
    $.$mol_float = $mol_float;
})($ || ($ = {}));
//float.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_float = (function (_super) {
            __extends($mol_float, _super);
            function $mol_float() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_float.prototype.shiftStyle = function () {
                var context = this.context();
                var offset = context.$mol_scroll_scroll_top();
                return "translateY(" + offset + "px)";
            };
            $mol_float.prototype.scrolling = function () {
                return this.context().$mol_scroll_moving();
            };
            return $mol_float;
        }($.$mol_float));
        $mol.$mol_float = $mol_float;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//float.view.js.map
;
var $;
(function ($) {
    var $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));
//code.js.map
;
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        $.$mol_test({
            'handle clicks by default': function () {
                var clicked = false;
                var clicker = new $mol.$mol_button;
                clicker.event_click = function (event) { clicked = true; };
                var element = clicker.render();
                var event = $.$mol_dom_context.document.createEvent('mouseevent');
                event.initEvent('click', true, true);
                element.dispatchEvent(event);
                $.$mol_assert_ok(clicked);
            },
            'no handle clicks if disabled': function () {
                var clicked = false;
                var clicker = new $mol.$mol_button;
                clicker.event_click = function (event) { clicked = true; };
                clicker.enabled = function () { return false; };
                var element = clicker.render();
                var event = $.$mol_dom_context.document.createEvent('mouseevent');
                event.initEvent('click', true, true);
                element.dispatchEvent(event);
                $.$mol_assert_not(clicked);
            },
        });
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//button.test.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_button = (function (_super) {
        __extends($mol_button, _super);
        function $mol_button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_button.prototype.enabled = function () {
            return true;
        };
        $mol_button.prototype.event_click = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_button.prototype.event_activate = function (event) {
            return this.event_click(event);
        };
        $mol_button.prototype.evenet_key_press = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_button.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "click": function (event) { return _this.event_activate(event); }, "keypress": function (event) { return _this.evenet_key_press(event); } }));
        };
        $mol_button.prototype.disabled = function () {
            return false;
        };
        $mol_button.prototype.tab_index = function () {
            return "0";
        };
        $mol_button.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "disabled": this.disabled(), "role": "button", "tabindex": this.tab_index() }));
        };
        $mol_button.prototype.sub = function () {
            return [].concat(this.title());
        };
        return $mol_button;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "event_click", null);
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "event_activate", null);
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "evenet_key_press", null);
    $.$mol_button = $mol_button;
})($ || ($ = {}));
//button.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_button = (function (_super) {
            __extends($mol_button, _super);
            function $mol_button() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_button.prototype.disabled = function () {
                return !this.enabled();
            };
            $mol_button.prototype.event_activate = function (next) {
                if (!this.enabled())
                    return;
                this.event_click(next);
            };
            $mol_button.prototype.evenet_key_press = function (event) {
                if (event.keyCode === $.$mol_keyboard_code.enter)
                    return this.event_activate(event);
            };
            $mol_button.prototype.tab_index = function () {
                return this.enabled() ? _super.prototype.tab_index.call(this) : null;
            };
            return $mol_button;
        }($.$mol_button));
        $mol.$mol_button = $mol_button;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//button.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_button_major = (function (_super) {
        __extends($mol_button_major, _super);
        function $mol_button_major() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_button_major;
    }($.$mol_button));
    $.$mol_button_major = $mol_button_major;
})($ || ($ = {}));
(function ($) {
    var $mol_button_minor = (function (_super) {
        __extends($mol_button_minor, _super);
        function $mol_button_minor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_button_minor;
    }($.$mol_button));
    $.$mol_button_minor = $mol_button_minor;
})($ || ($ = {}));
(function ($) {
    var $mol_button_danger = (function (_super) {
        __extends($mol_button_danger, _super);
        function $mol_button_danger() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_button_danger;
    }($.$mol_button));
    $.$mol_button_danger = $mol_button_danger;
})($ || ($ = {}));
//button_types.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check = (function (_super) {
        __extends($mol_check, _super);
        function $mol_check() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_check.prototype.checked = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_check.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_check_checked": this.checked(), "aria-checked": this.checked(), "role": "checkbox" }));
        };
        $mol_check.prototype.Icon = function () {
            return null;
        };
        $mol_check.prototype.label = function () {
            return [];
        };
        $mol_check.prototype.Label = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.label()); };
            });
        };
        $mol_check.prototype.sub = function () {
            return [].concat(this.Icon(), this.Label());
        };
        return $mol_check;
    }($.$mol_button));
    __decorate([
        $.$mol_mem()
    ], $mol_check.prototype, "checked", null);
    __decorate([
        $.$mol_mem()
    ], $mol_check.prototype, "Label", null);
    $.$mol_check = $mol_check;
})($ || ($ = {}));
//check.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_check = (function (_super) {
            __extends($mol_check, _super);
            function $mol_check() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_check.prototype.event_click = function (next) {
                this.checked(!this.checked());
                next.preventDefault();
            };
            return $mol_check;
        }($.$mol_check));
        $mol.$mol_check = $mol_check;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//check.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_icon_tick = (function (_super) {
        __extends($mol_icon_tick, _super);
        function $mol_icon_tick() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_tick.prototype.path = function () {
            return "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z";
        };
        return $mol_icon_tick;
    }($.$mol_icon));
    $.$mol_icon_tick = $mol_icon_tick;
})($ || ($ = {}));
//tick.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check_box = (function (_super) {
        __extends($mol_check_box, _super);
        function $mol_check_box() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_check_box.prototype.Icon = function () {
            return new $.$mol_icon_tick();
        };
        return $mol_check_box;
    }($.$mol_check));
    __decorate([
        $.$mol_mem()
    ], $mol_check_box.prototype, "Icon", null);
    $.$mol_check_box = $mol_check_box;
})($ || ($ = {}));
//box.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_icon_chevron = (function (_super) {
        __extends($mol_icon_chevron, _super);
        function $mol_icon_chevron() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_chevron.prototype.path = function () {
            return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
        };
        return $mol_icon_chevron;
    }($.$mol_icon));
    $.$mol_icon_chevron = $mol_icon_chevron;
})($ || ($ = {}));
//chevron.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check_expand = (function (_super) {
        __extends($mol_check_expand, _super);
        function $mol_check_expand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_check_expand.prototype.Icon = function () {
            return new $.$mol_icon_chevron();
        };
        $mol_check_expand.prototype.sub = function () {
            return [].concat(this.Icon(), this.Label());
        };
        $mol_check_expand.prototype.level = function () {
            return 0;
        };
        $mol_check_expand.prototype.level_style = function () {
            return "0px";
        };
        $mol_check_expand.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "paddingLeft": this.level_style() }));
        };
        $mol_check_expand.prototype.expanded = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_check_expand.prototype.checked = function (val) {
            return this.expanded(val);
        };
        $mol_check_expand.prototype.expandable = function () {
            return false;
        };
        $mol_check_expand.prototype.enabled = function () {
            return this.expandable();
        };
        return $mol_check_expand;
    }($.$mol_check));
    __decorate([
        $.$mol_mem()
    ], $mol_check_expand.prototype, "Icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_check_expand.prototype, "expanded", null);
    __decorate([
        $.$mol_mem()
    ], $mol_check_expand.prototype, "checked", null);
    $.$mol_check_expand = $mol_check_expand;
})($ || ($ = {}));
//expand.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_check_expand = (function (_super) {
            __extends($mol_check_expand, _super);
            function $mol_check_expand() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_check_expand.prototype.level_style = function () {
                return this.level() * .75 - .75 + "rem";
            };
            $mol_check_expand.prototype.expandable = function () {
                return this.expanded() !== null;
            };
            return $mol_check_expand;
        }($.$mol_check_expand));
        $mol.$mol_check_expand = $mol_check_expand;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//expand.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_dimmer = (function (_super) {
        __extends($mol_dimmer, _super);
        function $mol_dimmer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_dimmer.prototype.haystack = function () {
            return "";
        };
        $mol_dimmer.prototype.needle = function () {
            return "";
        };
        $mol_dimmer.prototype.parts = function () {
            return [];
        };
        $mol_dimmer.prototype.sub = function () {
            return this.parts();
        };
        $mol_dimmer.prototype.string = function (id) {
            return "";
        };
        $mol_dimmer.prototype.low = function (id) {
            var _this = this;
            return new $.$mol_dimmer_low().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.string(id)); };
            });
        };
        return $mol_dimmer;
    }($.$mol_view));
    __decorate([
        $.$mol_mem_key()
    ], $mol_dimmer.prototype, "low", null);
    $.$mol_dimmer = $mol_dimmer;
})($ || ($ = {}));
(function ($) {
    var $mol_dimmer_low = (function (_super) {
        __extends($mol_dimmer_low, _super);
        function $mol_dimmer_low() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_dimmer_low.prototype.dom_name = function () {
            return "span";
        };
        return $mol_dimmer_low;
    }($.$mol_view));
    $.$mol_dimmer_low = $mol_dimmer_low;
})($ || ($ = {}));
//dimmer.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_dimmer = (function (_super) {
            __extends($mol_dimmer, _super);
            function $mol_dimmer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_dimmer.prototype.parts = function () {
                var needle = this.needle();
                if (!needle)
                    return [this.haystack()];
                var chunks = [];
                var strings = this.strings();
                for (var index = 0; index < strings.length; index++) {
                    if (index > 0)
                        chunks.push(this.needle());
                    if (strings[index] !== '')
                        chunks.push(this.low(index));
                }
                return chunks;
            };
            $mol_dimmer.prototype.strings = function () {
                return this.haystack().split(this.needle());
            };
            $mol_dimmer.prototype.string = function (index) {
                return this.strings()[index];
            };
            return $mol_dimmer;
        }($.$mol_dimmer));
        __decorate([
            $.$mol_mem()
        ], $mol_dimmer.prototype, "strings", null);
        $mol.$mol_dimmer = $mol_dimmer;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//dimmer.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_grid = (function (_super) {
        __extends($mol_grid, _super);
        function $mol_grid() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_grid.prototype.row_ids = function () {
            return [];
        };
        $mol_grid.prototype.row_id = function (index) {
            return null;
        };
        $mol_grid.prototype.col_ids = function () {
            return [];
        };
        $mol_grid.prototype.records = function () {
            return ({});
        };
        $mol_grid.prototype.record = function (id) {
            return null;
        };
        $mol_grid.prototype.hierarchy = function () {
            return null;
        };
        $mol_grid.prototype.hierarchy_col = function () {
            return "";
        };
        $mol_grid.prototype.gap_top = function () {
            return 0;
        };
        $mol_grid.prototype.rows_visible = function () {
            return [];
        };
        $mol_grid.prototype.Table = function () {
            var _this = this;
            return new $.$mol_grid_table().setup(function (obj) {
                obj.offset = function () { return _this.gap_top(); };
                obj.sub = function () { return [].concat(_this.rows_visible()); };
            });
        };
        $mol_grid.prototype.height = function () {
            return 0;
        };
        $mol_grid.prototype.Gap = function () {
            var _this = this;
            return new $.$mol_grid_gap().setup(function (obj) {
                obj.offset = function () { return _this.height(); };
            });
        };
        $mol_grid.prototype.sub = function () {
            return [].concat(this.Table(), this.Gap());
        };
        $mol_grid.prototype.rows = function () {
            return [];
        };
        $mol_grid.prototype.row_height = function () {
            return 40;
        };
        $mol_grid.prototype.head_cells = function () {
            return [];
        };
        $mol_grid.prototype.Head = function () {
            var _this = this;
            return new $.$mol_grid_row().setup(function (obj) {
                obj.height = function () { return _this.row_height(); };
                obj.cells = function () { return _this.head_cells(); };
            });
        };
        $mol_grid.prototype.cells = function (id) {
            return [];
        };
        $mol_grid.prototype.Row = function (id) {
            var _this = this;
            return new $.$mol_grid_row().setup(function (obj) {
                obj.height = function () { return _this.row_height(); };
                obj.cells = function () { return _this.cells(id); };
            });
        };
        $mol_grid.prototype.cell = function (id) {
            return null;
        };
        $mol_grid.prototype.cell_content = function (id) {
            return [];
        };
        $mol_grid.prototype.cell_content_text = function (id) {
            return this.cell_content(id);
        };
        $mol_grid.prototype.Cell_text = function (id) {
            var _this = this;
            return new $.$mol_grid_cell().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.cell_content_text(id)); };
            });
        };
        $mol_grid.prototype.cell_content_number = function (id) {
            return this.cell_content(id);
        };
        $mol_grid.prototype.Cell_number = function (id) {
            var _this = this;
            return new $.$mol_grid_number().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.cell_content_number(id)); };
            });
        };
        $mol_grid.prototype.col_head_content = function (id) {
            return [];
        };
        $mol_grid.prototype.Col_head = function (id) {
            var _this = this;
            return new $.$mol_float().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.col_head_content(id)); };
            });
        };
        $mol_grid.prototype.cell_level = function (id) {
            return 0;
        };
        $mol_grid.prototype.cell_expanded = function (id, val) {
            return (val !== void 0) ? val : false;
        };
        $mol_grid.prototype.Cell_branch = function (id) {
            var _this = this;
            return new $.$mol_check_expand().setup(function (obj) {
                obj.level = function () { return _this.cell_level(id); };
                obj.label = function () { return _this.cell_content(id); };
                obj.expanded = function (val) { return _this.cell_expanded(id, val); };
            });
        };
        $mol_grid.prototype.needle = function () {
            return "";
        };
        $mol_grid.prototype.cell_value = function (id) {
            return "";
        };
        $mol_grid.prototype.Cell_dimmer = function (id) {
            var _this = this;
            return new $.$mol_dimmer().setup(function (obj) {
                obj.needle = function () { return _this.needle(); };
                obj.haystack = function () { return _this.cell_value(id); };
            });
        };
        $mol_grid.prototype.Cell_content = function (id) {
            return [].concat(this.Cell_dimmer(id));
        };
        return $mol_grid;
    }($.$mol_scroll));
    __decorate([
        $.$mol_mem()
    ], $mol_grid.prototype, "Table", null);
    __decorate([
        $.$mol_mem()
    ], $mol_grid.prototype, "Gap", null);
    __decorate([
        $.$mol_mem()
    ], $mol_grid.prototype, "Head", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "Cell_text", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "Cell_number", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "Col_head", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "cell_expanded", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "Cell_branch", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "Cell_dimmer", null);
    $.$mol_grid = $mol_grid;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_table = (function (_super) {
        __extends($mol_grid_table, _super);
        function $mol_grid_table() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_grid_table.prototype.dom_name = function () {
            return "table";
        };
        $mol_grid_table.prototype.offset = function () {
            return 0;
        };
        $mol_grid_table.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "top": this.offset() }));
        };
        return $mol_grid_table;
    }($.$mol_view));
    $.$mol_grid_table = $mol_grid_table;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_gap = (function (_super) {
        __extends($mol_grid_gap, _super);
        function $mol_grid_gap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_grid_gap.prototype.offset = function () {
            return 0;
        };
        $mol_grid_gap.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "top": this.offset() }));
        };
        return $mol_grid_gap;
    }($.$mol_view));
    $.$mol_grid_gap = $mol_grid_gap;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_row = (function (_super) {
        __extends($mol_grid_row, _super);
        function $mol_grid_row() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_grid_row.prototype.dom_name = function () {
            return "tr";
        };
        $mol_grid_row.prototype.height = function () {
            return 40;
        };
        $mol_grid_row.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "height": this.height() }));
        };
        $mol_grid_row.prototype.cells = function () {
            return [];
        };
        $mol_grid_row.prototype.sub = function () {
            return this.cells();
        };
        return $mol_grid_row;
    }($.$mol_view));
    $.$mol_grid_row = $mol_grid_row;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_cell = (function (_super) {
        __extends($mol_grid_cell, _super);
        function $mol_grid_cell() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_grid_cell.prototype.dom_name = function () {
            return "td";
        };
        return $mol_grid_cell;
    }($.$mol_view));
    $.$mol_grid_cell = $mol_grid_cell;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_number = (function (_super) {
        __extends($mol_grid_number, _super);
        function $mol_grid_number() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_grid_number;
    }($.$mol_grid_cell));
    $.$mol_grid_number = $mol_grid_number;
})($ || ($ = {}));
//grid.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_grid = (function (_super) {
            __extends($mol_grid, _super);
            function $mol_grid() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_grid.prototype.rows_visible = function () {
                var rows = this.rows();
                if (!rows)
                    return null;
                var view_window = this.view_window();
                return [].concat(this.col_ids() && this.Head(), rows.slice(view_window.top, view_window.bottom).valueOf());
            };
            $mol_grid.prototype.rows_visible_max = function () {
                return Math.ceil(this.context().$mol_view_visible_height() / this.row_height());
            };
            $mol_grid.prototype.view_window = function () {
                var rows = this.rows();
                if (!rows)
                    return null;
                var count = rows.length;
                var context = this.context_sub();
                var scrollTop = context.$mol_scroll_scroll_top();
                var top = Math.max(0, Math.floor(scrollTop / this.row_height()));
                var bottom = Math.min(count, top + this.rows_visible_max());
                return { top: top, bottom: bottom, count: count };
            };
            $mol_grid.prototype.gap_top = function () {
                var view_window = this.view_window();
                return view_window.top * this.row_height();
            };
            $mol_grid.prototype.height = function () {
                var view_window = this.view_window();
                return view_window.count * this.row_height();
            };
            $mol_grid.prototype.head_cells = function () {
                var _this = this;
                return this.col_ids().map(function (colId) { return _this.Col_head(colId); });
            };
            $mol_grid.prototype.col_head_content = function (colId) {
                return [colId];
            };
            $mol_grid.prototype.rows = function () {
                var _this = this;
                return this.row_ids().map(function (id) { return _this.Row(id); });
            };
            $mol_grid.prototype.cells = function (row_id) {
                var _this = this;
                return this.col_ids().map(function (col_id) { return _this.Cell({ row: row_id, col: col_id }); });
            };
            $mol_grid.prototype.col_type = function (col_id) {
                if (col_id === this.hierarchy_col())
                    return 'branch';
                var rowFirst = this.row_id(0);
                var val = this.record(rowFirst[rowFirst.length - 1])[col_id];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            };
            $mol_grid.prototype.Cell = function (id) {
                switch (this.col_type(id.col).valueOf()) {
                    case 'branch': return this.Cell_branch(id);
                    case 'number': return this.Cell_number(id);
                }
                return this.Cell_text(id);
            };
            $mol_grid.prototype.cell_content = function (id) {
                return this.record(id.row[id.row.length - 1])[id.col];
            };
            $mol_grid.prototype.records = function () {
                return [];
            };
            $mol_grid.prototype.record = function (id) {
                return this.records()[id];
            };
            $mol_grid.prototype.record_ids = function () {
                return Object.keys(this.records());
            };
            $mol_grid.prototype.row_id = function (index) {
                return this.row_ids().slice(index, index + 1).valueOf()[0];
            };
            $mol_grid.prototype.col_ids = function () {
                var rowFirst = this.row_id(0);
                if (rowFirst === void 0)
                    return null;
                var record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            };
            $mol_grid.prototype.hierarchy = function () {
                var hierarchy = {};
                var root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                this.record_ids().map(function (id) {
                    root.sub.push(hierarchy[id] = {
                        id: id,
                        parent: root,
                        sub: [],
                    });
                });
                return hierarchy;
            };
            $mol_grid.prototype.row_sub_ids = function (row) {
                return this.hierarchy()[row[row.length - 1]].sub.map(function (child) { return row.concat(child.id); });
            };
            $mol_grid.prototype.row_root_id = function () {
                return [''];
            };
            $mol_grid.prototype.cell_level = function (id) {
                return id.row.length - 1;
            };
            $mol_grid.prototype.row_ids = function () {
                var _this = this;
                var next = [];
                var add = function (row) {
                    next.push(row);
                    if (_this.row_expanded(row)) {
                        _this.row_sub_ids(row).forEach(function (child) { return add(child); });
                    }
                };
                this.row_sub_ids(this.row_root_id()).forEach(function (child) { return add(child); });
                return next;
            };
            $mol_grid.prototype.row_expanded = function (row_id, next) {
                if (!this.row_sub_ids(row_id).length)
                    return null;
                var key = "row_expanded(" + JSON.stringify(row_id) + ")";
                var next2 = $.$mol_state_session.value(key, next);
                return (next2 == null) ? this.row_expanded_default(row_id) : next2;
            };
            $mol_grid.prototype.row_expanded_default = function (row_id) {
                return row_id.length < 3;
            };
            $mol_grid.prototype.cell_expanded = function (id, next) {
                return this.row_expanded(id.row, next);
            };
            return $mol_grid;
        }($.$mol_grid));
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "rows_visible", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "rows_visible_max", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "view_window", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "head_cells", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "col_head_content", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_grid.prototype, "col_type", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "record_ids", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "hierarchy", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "row_ids", null);
        $mol.$mol_grid = $mol_grid;
        var $mol_grid_table = (function (_super) {
            __extends($mol_grid_table, _super);
            function $mol_grid_table() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_grid_table.prototype.context_sub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_scroll_scroll_top = function () { return context.$mol_scroll_scroll_top() - _this.offset(); };
                return subContext;
            };
            return $mol_grid_table;
        }($.$mol_grid_table));
        __decorate([
            $.$mol_mem()
        ], $mol_grid_table.prototype, "context_sub", null);
        $mol.$mol_grid_table = $mol_grid_table;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//grid.view.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'search numbers': function () {
            var syntax = new $.$mol_syntax({
                'number': /[+-]?\d+(?:\.\d+)?/
            });
            var serial = function (tokens) {
                return tokens.map(function (token) { return token.name + "=" + token.found; }).join('|');
            };
            $.$mol_assert_equal(serial(syntax.tokenize('')), '');
            $.$mol_assert_equal(serial(syntax.tokenize('foo')), '=foo');
            $.$mol_assert_equal(serial(syntax.tokenize('123')), 'number=123');
            $.$mol_assert_equal(serial(syntax.tokenize('foo123bar')), '=foo|number=123|=bar');
            $.$mol_assert_equal(serial(syntax.tokenize('foo123bar456')), '=foo|number=123|=bar|number=456');
            $.$mol_assert_equal(serial(syntax.tokenize('foo123\n\nbar456\n')), '=foo|number=123|=\n\nbar|number=456|=\n');
        }
    });
})($ || ($ = {}));
//syntax.test.js.map
;
var $;
(function ($) {
    var $mol_syntax = (function () {
        function $mol_syntax(lexems) {
            this['lexems()'] = lexems;
        }
        $mol_syntax.prototype.lexems = function () {
            return this['lexems()'];
        };
        $mol_syntax.prototype.rules = function () {
            var rules = this['rules()'];
            if (rules)
                return rules;
            rules = [];
            var lexems = this.lexems();
            for (var name_1 in lexems) {
                rules.push({
                    name: name_1,
                    regExp: lexems[name_1],
                    size: RegExp('^$|' + lexems[name_1].source).exec('').length - 1,
                });
            }
            return this['rules()'] = rules;
        };
        $mol_syntax.prototype.regExp = function () {
            var regExp = this['regExp()'];
            if (regExp)
                return regExp;
            var parts = '(' + this.rules().map(function (rule) { return rule.regExp.source; }).join(')|(') + ')';
            regExp = RegExp("([^]*?)(?:(" + parts + ")|$(?![^]))", 'gm');
            return this['regExp()'] = regExp;
        };
        $mol_syntax.prototype.tokenize = function (text) {
            var tokens = [];
            var rules = this.rules();
            var regExp = this.regExp();
            var regExpSize = RegExp('^$|' + regExp.source).exec('').length - 1;
            var position = 0;
            parsing: while (position < text.length) {
                regExp.lastIndex = position;
                var found = regExp.exec(text);
                if (position === regExp.lastIndex)
                    throw new Error('Empty token');
                position = regExp.lastIndex;
                var prefix = found[1];
                if (prefix) {
                    tokens.push({
                        name: '',
                        found: prefix,
                        chunks: [],
                    });
                }
                var suffix = found[2];
                if (suffix) {
                    var offset = 4;
                    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                        var rule = rules_1[_i];
                        if (found[offset - 1]) {
                            tokens.push({
                                name: rule.name,
                                found: suffix,
                                chunks: found.slice(offset, offset + rule.size)
                            });
                            continue parsing;
                        }
                        offset += rule.size + 1;
                    }
                    throw new Error('Something wrong');
                }
            }
            return tokens;
        };
        return $mol_syntax;
    }());
    $.$mol_syntax = $mol_syntax;
})($ || ($ = {}));
//syntax.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'only text': function () {
            var tokens = $.$mol_syntax_md_flow.tokenize('Hello,\nWorld..\r\n\r\n\nof Love!');
            $.$mol_assert_equal(tokens.map(function (token) { return token.found; }).join('|'), 'Hello,\nWorld..\r\n\r\n\n|of Love!');
        },
        'headers and text': function () {
            var tokens = $.$mol_syntax_md_flow.tokenize('# Header1\n\nHello!\n\n## Header2');
            $.$mol_assert_equal(tokens.length, 3);
            $.$mol_assert_equal(tokens[0].name, 'header');
            $.$mol_assert_equal(tokens[0].chunks.join('|'), '#| |Header1|\n\n');
            $.$mol_assert_equal(tokens[1].name, 'block');
            $.$mol_assert_equal(tokens[1].chunks.join('|'), 'Hello!|\n\n');
            $.$mol_assert_equal(tokens[2].name, 'header');
            $.$mol_assert_equal(tokens[2].found, '## Header2');
            $.$mol_assert_equal(tokens[2].chunks.join('|'), '##| |Header2|');
        },
        'codes and text': function () {
            var tokens = $.$mol_syntax_md_flow.tokenize('```\nstart()\n```\n\n```js\nrestart()\n```\n\nHello!\n\n```\nstop()\n```');
            $.$mol_assert_equal(tokens.length, 4);
            $.$mol_assert_equal(tokens[0].name, 'code');
            $.$mol_assert_equal(tokens[0].chunks.join('|'), '```||start()\n|```|\n\n');
            $.$mol_assert_equal(tokens[1].name, 'code');
            $.$mol_assert_equal(tokens[1].chunks.join('|'), '```|js|restart()\n|```|\n\n');
            $.$mol_assert_equal(tokens[2].name, 'block');
            $.$mol_assert_equal(tokens[2].chunks.join('|'), 'Hello!|\n\n');
            $.$mol_assert_equal(tokens[3].name, 'code');
            $.$mol_assert_equal(tokens[3].chunks.join('|'), '```||stop()\n|```|');
        },
        'table': function () {
            var tokens = $.$mol_syntax_md_flow.tokenize('| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n\n| Cell11 | Cell12\n| Cell21 | Cell22\n');
            $.$mol_assert_equal(tokens.length, 2);
            $.$mol_assert_equal(tokens[0].name, 'table');
            $.$mol_assert_equal(tokens[0].chunks[0], '| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n');
            $.$mol_assert_equal(tokens[1].name, 'table');
            $.$mol_assert_equal(tokens[1].chunks[0], '| Cell11 | Cell12\n| Cell21 | Cell22\n');
        }
    });
})($ || ($ = {}));
//md.test.js.map
;
var $;
(function ($) {
    $.$mol_syntax_md_flow = new $.$mol_syntax({
        'header': /^(#+)(\s*)(.*?)$([\n\r]*)/,
        'list-item': /^(\s?\*\s+)(.*?)$([\n\r]*)/,
        'code': /^(```)(\w*)[\r\n]+([^]*?)^(```)$([\n\r]*)/,
        'code-indent': /^((?:(?:  |\t)(?:[^]*?)$([\n\r]*))+)/,
        'table': /((?:^\|.+?$\r?\n)+)([\n\r]*)/,
        'block': /^(.*?(?:\r?\n.+?)*)$((?:\r?\n)*)/,
    });
    $.$mol_syntax_md_line = new $.$mol_syntax({
        'strong': /\*\*(.+?)\*\*/,
        'emphasis': /\*(.+?)\*/,
        'code3': /```(.+?)```/,
        'code': /`(.+?)`/,
        'strike': /~~(.+?)~~/,
        'text-link': /\[(.*?(?:\[.*?\].*?)*)\]\((.*?)\)/,
        'image-link': /!\[([^\[\]]*?)\]\((.*?)\)/,
    });
})($ || ($ = {}));
//md.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_text = (function (_super) {
        __extends($mol_text, _super);
        function $mol_text() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_text.prototype.text = function () {
            return "";
        };
        $mol_text.prototype.block_content = function (id) {
            return [];
        };
        $mol_text.prototype.block_type = function (id) {
            return "";
        };
        $mol_text.prototype.Row = function (id) {
            var _this = this;
            return new $.$mol_text_row().setup(function (obj) {
                obj.sub = function () { return _this.block_content(id); };
                obj.type = function () { return _this.block_type(id); };
            });
        };
        $mol_text.prototype.Span = function (id) {
            return new $.$mol_text_spanner();
        };
        $mol_text.prototype.Link = function (id) {
            return new $.$mol_text_linker();
        };
        $mol_text.prototype.Image = function (id) {
            return new $.$mol_text_imager();
        };
        $mol_text.prototype.header_level = function (id) {
            return 0;
        };
        $mol_text.prototype.header_content = function (id) {
            return [];
        };
        $mol_text.prototype.Header = function (id) {
            var _this = this;
            return new $.$mol_text_header().setup(function (obj) {
                obj.level = function () { return _this.header_level(id); };
                obj.content = function () { return _this.header_content(id); };
            });
        };
        $mol_text.prototype.table_head_cells = function (id) {
            return [];
        };
        $mol_text.prototype.table_rows = function (id) {
            return [];
        };
        $mol_text.prototype.Table = function (id) {
            var _this = this;
            return new $.$mol_grid().setup(function (obj) {
                obj.head_cells = function () { return _this.table_head_cells(id); };
                obj.rows = function () { return _this.table_rows(id); };
            });
        };
        $mol_text.prototype.table_cells = function (id) {
            return [];
        };
        $mol_text.prototype.Table_row = function (id) {
            var _this = this;
            return new $.$mol_grid_row().setup(function (obj) {
                obj.cells = function () { return _this.table_cells(id); };
            });
        };
        $mol_text.prototype.table_cell_content = function (id) {
            return [];
        };
        $mol_text.prototype.Table_cell = function (id) {
            var _this = this;
            return new $.$mol_grid_cell().setup(function (obj) {
                obj.sub = function () { return _this.table_cell_content(id); };
            });
        };
        $mol_text.prototype.Table_cell_head = function (id) {
            var _this = this;
            return new $.$mol_float().setup(function (obj) {
                obj.sub = function () { return _this.table_cell_content(id); };
            });
        };
        return $mol_text;
    }($.$mol_list));
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Span", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Link", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Image", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Header", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Table", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Table_row", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Table_cell", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Table_cell_head", null);
    $.$mol_text = $mol_text;
})($ || ($ = {}));
(function ($) {
    var $mol_text_row = (function (_super) {
        __extends($mol_text_row, _super);
        function $mol_text_row() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_text_row.prototype.minimal_height = function () {
            return 40;
        };
        $mol_text_row.prototype.type = function () {
            return "";
        };
        $mol_text_row.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_text_type": this.type() }));
        };
        return $mol_text_row;
    }($.$mol_view));
    $.$mol_text_row = $mol_text_row;
})($ || ($ = {}));
(function ($) {
    var $mol_text_header = (function (_super) {
        __extends($mol_text_header, _super);
        function $mol_text_header() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_text_header.prototype.dom_name = function () {
            return "h";
        };
        $mol_text_header.prototype.minimal_height = function () {
            return 50;
        };
        $mol_text_header.prototype.level = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_text_header.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_text_header_level": this.level() }));
        };
        $mol_text_header.prototype.content = function () {
            return [];
        };
        $mol_text_header.prototype.sub = function () {
            return this.content();
        };
        return $mol_text_header;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_text_header.prototype, "level", null);
    $.$mol_text_header = $mol_text_header;
})($ || ($ = {}));
(function ($) {
    var $mol_text_spanner = (function (_super) {
        __extends($mol_text_spanner, _super);
        function $mol_text_spanner() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_text_spanner.prototype.dom_name = function () {
            return "span";
        };
        $mol_text_spanner.prototype.type = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_spanner.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_text_type": this.type() }));
        };
        $mol_text_spanner.prototype.content = function (val) {
            return (val !== void 0) ? val : [];
        };
        $mol_text_spanner.prototype.sub = function () {
            return this.content();
        };
        return $mol_text_spanner;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_text_spanner.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_text_spanner.prototype, "content", null);
    $.$mol_text_spanner = $mol_text_spanner;
})($ || ($ = {}));
(function ($) {
    var $mol_text_linker = (function (_super) {
        __extends($mol_text_linker, _super);
        function $mol_text_linker() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_text_linker.prototype.dom_name = function () {
            return "a";
        };
        $mol_text_linker.prototype.type = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_linker.prototype.link = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_linker.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_text_type": this.type(), "href": this.link() }));
        };
        $mol_text_linker.prototype.content = function (val) {
            return (val !== void 0) ? val : [];
        };
        $mol_text_linker.prototype.sub = function () {
            return this.content();
        };
        return $mol_text_linker;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_text_linker.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_text_linker.prototype, "link", null);
    __decorate([
        $.$mol_mem()
    ], $mol_text_linker.prototype, "content", null);
    $.$mol_text_linker = $mol_text_linker;
})($ || ($ = {}));
(function ($) {
    var $mol_text_imager = (function (_super) {
        __extends($mol_text_imager, _super);
        function $mol_text_imager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_text_imager.prototype.dom_name = function () {
            return "img";
        };
        $mol_text_imager.prototype.type = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_imager.prototype.link = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_imager.prototype.title = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_imager.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_text_type": this.type(), "src": this.link(), "alt": this.title() }));
        };
        return $mol_text_imager;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_text_imager.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_text_imager.prototype, "link", null);
    __decorate([
        $.$mol_mem()
    ], $mol_text_imager.prototype, "title", null);
    $.$mol_text_imager = $mol_text_imager;
})($ || ($ = {}));
//text.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_text = (function (_super) {
            __extends($mol_text, _super);
            function $mol_text() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_text.prototype.tokens_flow = function () {
                return $.$mol_syntax_md_flow.tokenize(this.text());
            };
            $mol_text.prototype.rows = function () {
                var _this = this;
                return this.tokens_flow().map(function (token, index) {
                    switch (token.name) {
                        case 'table': return _this.Table(index);
                        case 'header': return _this.Header(index);
                    }
                    return _this.Row(index);
                });
            };
            $mol_text.prototype.header_level = function (index) {
                return this.tokens_flow()[index].chunks[0].length;
            };
            $mol_text.prototype.header_content = function (index) {
                return this.text2spans("" + index, this.tokens_flow()[index].chunks[2]);
            };
            $mol_text.prototype.block_type = function (index) {
                return this.tokens_flow()[index].name;
            };
            $mol_text.prototype.cell_contents = function (indexBlock) {
                return this.tokens_flow()[indexBlock].chunks[0]
                    .split(/\r?\n/g)
                    .filter(function (row) { return row && !/\|--/.test(row); })
                    .map(function (row, rowId) {
                    return row.split(/\|/g)
                        .filter(function (cell) { return cell; })
                        .map(function (cell, cellId) { return cell.trim(); });
                });
            };
            $mol_text.prototype.table_rows = function (blockId) {
                var _this = this;
                return this.cell_contents(blockId)
                    .slice(1)
                    .map(function (row, rowId) { return _this.Table_row({ block: blockId, row: rowId + 1 }); });
            };
            $mol_text.prototype.table_head_cells = function (blockId) {
                var _this = this;
                return this.cell_contents(blockId)[0]
                    .map(function (cell, cellId) { return _this.Table_cell_head({ block: blockId, row: 0, cell: cellId }); });
            };
            $mol_text.prototype.table_cells = function (id) {
                var _this = this;
                return this.cell_contents(id.block)[id.row]
                    .map(function (cell, cellId) { return _this.Table_cell({ block: id.block, row: id.row, cell: cellId }); });
            };
            $mol_text.prototype.table_cell_content = function (id) {
                return this.text2spans(id.block + "/" + id.row + "/" + id.cell, this.cell_contents(id.block)[id.row][id.cell]);
            };
            $mol_text.prototype.text2spans = function (prefix, text) {
                var _this = this;
                return $.$mol_syntax_md_line.tokenize(text).map(function (token, index) {
                    var id = prefix + "/" + index;
                    switch (token.name) {
                        case 'text-link': {
                            if (/^#|(\w+script+:)+/.test(token.chunks[1])) {
                                var span_1 = _this.Span(id);
                                span_1.content(_this.text2spans(id, token.chunks[0]));
                                return span_1;
                            }
                            else {
                                var span_2 = _this.Link(id);
                                span_2.type(token.name);
                                span_2.link(token.chunks[1]);
                                span_2.content(_this.text2spans(id, token.chunks[0]));
                                return span_2;
                            }
                        }
                        case 'image-link': {
                            var span_3 = _this.Image(id);
                            span_3.type(token.name);
                            span_3.link(token.chunks[1]);
                            span_3.title(token.chunks[0]);
                            return span_3;
                        }
                        case 'code3':
                        case 'code': {
                            var span_4 = _this.Span(id);
                            span_4.type('code');
                            span_4.content([token.chunks[0]]);
                            return span_4;
                        }
                    }
                    var span = _this.Span(id);
                    span.type(token.name);
                    span.content(token.name
                        ? [].concat.apply([], token.chunks.map(function (text, index) { return _this.text2spans(id + "/" + index, text); }))
                        : [token.found]);
                    return span;
                });
            };
            $mol_text.prototype.block_content = function (indexBlock) {
                var token = this.tokens_flow()[indexBlock];
                switch (token.name) {
                    case 'header': return this.text2spans("" + indexBlock, token.chunks[2]);
                    case 'list-item': return this.text2spans("" + indexBlock, token.chunks[1]);
                    case 'code': return [token.chunks[2]];
                    case 'code-indent': return [token.chunks[0].replace(/[\n\r]*$/, '')];
                }
                return this.text2spans("" + indexBlock, token.chunks[0]);
            };
            return $mol_text;
        }($.$mol_text));
        __decorate([
            $.$mol_mem()
        ], $mol_text.prototype, "tokens_flow", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_text.prototype, "cell_contents", null);
        $mol.$mol_text = $mol_text;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//text.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_http_request = (function (_super) {
        __extends($mol_http_request, _super);
        function $mol_http_request() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_http_request.prototype.uri = function () { return ''; };
        $mol_http_request.prototype.method_get = function () { return 'Get'; };
        $mol_http_request.prototype.method_put = function () { return 'Put'; };
        $mol_http_request.prototype.credentials = function () {
            return null;
        };
        $mol_http_request.prototype.headers = function () {
            return {};
        };
        $mol_http_request.prototype.body = function () { return null; };
        $mol_http_request.prototype.native = function () {
            var _this = this;
            if (this['native()'])
                return this['native()'];
            var next = this['native()'] = new $.$mol_dom_context.XMLHttpRequest;
            next.withCredentials = Boolean(this.credentials());
            next.onload = function (event) {
                if ((next.status === 0) || (Math.floor(next.status / 100) === 2)) {
                    _this.response(next, $.$mol_atom_force);
                }
                else {
                    _this.response(new Error(next.responseText), $.$mol_atom_force);
                }
            };
            next.onerror = function (event) {
                _this.response(event.error || new Error('Unknown HTTP error'), $.$mol_atom_force);
            };
            return next;
        };
        $mol_http_request.prototype.destroyed = function (next) {
            if (next) {
                var native = this['native()'];
                if (native)
                    native.abort();
            }
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_http_request.prototype.response = function (next, force) {
            var creds = this.credentials();
            var native = this.native();
            var method = (next === void 0) ? this.method_get() : this.method_put();
            var uri = this.uri();
            native.open(method, uri, true, creds && creds.login, creds && creds.password);
            var headers = this.headers();
            for (var name_1 in headers)
                native.setRequestHeader(name_1, headers[name_1]);
            native.send(next);
            throw new $.$mol_atom_wait(method + " " + uri);
        };
        $mol_http_request.prototype.text = function (next, force) {
            return this.response(next, force).responseText;
        };
        return $mol_http_request;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_http_request.prototype, "response", null);
    $.$mol_http_request = $mol_http_request;
})($ || ($ = {}));
//request.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_http_resource = (function (_super) {
        __extends($mol_http_resource, _super);
        function $mol_http_resource() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_http_resource.item = function (uri) {
            return new $mol_http_resource().setup(function (obj) {
                obj.uri = function () { return uri; };
            });
        };
        $mol_http_resource.prototype.uri = function () { return ''; };
        $mol_http_resource.prototype.method_get = function () { return 'Get'; };
        $mol_http_resource.prototype.method_put = function () { return 'Put'; };
        $mol_http_resource.prototype.credentials = function () {
            return null;
        };
        $mol_http_resource.prototype.headers = function () {
            return {};
        };
        $mol_http_resource.prototype.request = function () {
            var _this = this;
            var request = new $.$mol_http_request();
            request.uri = function () { return _this.uri(); };
            request.method_get = function () { return _this.method_get(); };
            request.method_put = function () { return _this.method_put(); };
            request.credentials = function () { return _this.credentials(); };
            request.headers = function () { return _this.headers(); };
            return request;
        };
        $mol_http_resource.prototype.text = function (next, force) {
            return this.request().text(next, force);
        };
        return $mol_http_resource;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_http_resource.prototype, "request", null);
    __decorate([
        $.$mol_mem()
    ], $mol_http_resource.prototype, "text", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_http_resource, "item", null);
    $.$mol_http_resource = $mol_http_resource;
})($ || ($ = {}));
//resource.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_http_resource_json = (function (_super) {
        __extends($mol_http_resource_json, _super);
        function $mol_http_resource_json() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_http_resource_json.item = function (uri) {
            return new $mol_http_resource_json().setup(function (obj) {
                obj.uri = function () { return uri; };
            });
        };
        $mol_http_resource_json.prototype.json = function (next, force) {
            return JSON.parse(this.text(next && JSON.stringify(next, null, '\t'), force));
        };
        return $mol_http_resource_json;
    }($.$mol_http_resource));
    __decorate([
        $.$mol_mem()
    ], $mol_http_resource_json.prototype, "json", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_http_resource_json, "item", null);
    $.$mol_http_resource_json = $mol_http_resource_json;
})($ || ($ = {}));
//json.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_habhub = (function (_super) {
        __extends($mol_app_habhub, _super);
        function $mol_app_habhub() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_habhub.prototype.Placeholder = function () {
            var _this = this;
            return new $.$mol_book_placeholder().setup(function (obj) {
                obj.minimal_width = function () { return 600; };
                obj.title = function () { return _this.title_default(); };
            });
        };
        $mol_app_habhub.prototype.title_default = function () {
            return "HabHub";
        };
        $mol_app_habhub.prototype.gists = function () {
            return [];
        };
        $mol_app_habhub.prototype.Status = function () {
            var _this = this;
            return new $.$mol_status().setup(function (obj) {
                obj.status = function () { return _this.gists(); };
            });
        };
        $mol_app_habhub.prototype.menu_rows = function () {
            return [];
        };
        $mol_app_habhub.prototype.Menu = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.menu_rows(); };
            });
        };
        $mol_app_habhub.prototype.Menu_page = function () {
            var _this = this;
            return new $.$mol_page().setup(function (obj) {
                obj.minimal_width = function () { return 400; };
                obj.title = function () { return _this.title_default(); };
                obj.body = function () { return [].concat(_this.Status(), _this.Menu()); };
            });
        };
        $mol_app_habhub.prototype.gist_current_title = function () {
            return "";
        };
        $mol_app_habhub.prototype.close_arg = function () {
            return ({
                "gist": null,
            });
        };
        $mol_app_habhub.prototype.Close_icon = function () {
            return new $.$mol_icon_cross();
        };
        $mol_app_habhub.prototype.Close = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.arg = function () { return _this.close_arg(); };
                obj.sub = function () { return [].concat(_this.Close_icon()); };
            });
        };
        $mol_app_habhub.prototype.details_scroll_top = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_app_habhub.prototype.gist_current_content = function () {
            return "";
        };
        $mol_app_habhub.prototype.Datails_text = function () {
            var _this = this;
            return new $.$mol_text().setup(function (obj) {
                obj.text = function () { return _this.gist_current_content(); };
            });
        };
        $mol_app_habhub.prototype.Details = function () {
            var _this = this;
            return new $.$mol_page().setup(function (obj) {
                obj.minimal_width = function () { return 600; };
                obj.title = function () { return _this.gist_current_title(); };
                obj.tools = function () { return [].concat(_this.Close()); };
                obj.body_scroll_top = function (val) { return _this.details_scroll_top(val); };
                obj.body = function () { return [].concat(_this.Datails_text()); };
            });
        };
        $mol_app_habhub.prototype.pages = function () {
            return [].concat(this.Placeholder(), this.Menu_page(), this.Details());
        };
        $mol_app_habhub.prototype.gist_title = function (id) {
            return "";
        };
        $mol_app_habhub.prototype.gist_arg = function (id) {
            return ({});
        };
        $mol_app_habhub.prototype.Menu_row = function (id) {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.title = function () { return _this.gist_title(id); };
                obj.arg = function () { return _this.gist_arg(id); };
            });
        };
        return $mol_app_habhub;
    }($.$mol_book));
    __decorate([
        $.$mol_mem()
    ], $mol_app_habhub.prototype, "Placeholder", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_habhub.prototype, "Status", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_habhub.prototype, "Menu", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_habhub.prototype, "Menu_page", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_habhub.prototype, "Close_icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_habhub.prototype, "Close", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_habhub.prototype, "details_scroll_top", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_habhub.prototype, "Datails_text", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_habhub.prototype, "Details", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_habhub.prototype, "Menu_row", null);
    $.$mol_app_habhub = $mol_app_habhub;
})($ || ($ = {}));
//habhub.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_habhub = (function (_super) {
            __extends($mol_app_habhub, _super);
            function $mol_app_habhub() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_habhub.prototype.uriSource = function () {
                return 'https://api.github.com/search/issues?q=label:HabHub+is:open&sort=reactions';
            };
            $mol_app_habhub.prototype.gists = function () {
                return $.$mol_http_resource_json.item(this.uriSource()).json().items;
            };
            $mol_app_habhub.prototype.gists_dict = function () {
                var dict = {};
                this.gists().forEach(function (gist) { return dict[gist.id] = gist; });
                return dict;
            };
            $mol_app_habhub.prototype.gist = function (id) {
                return this.gists_dict()[id];
            };
            $mol_app_habhub.prototype.gist_current_id = function () {
                return Number($.$mol_state_arg.value('gist'));
            };
            $mol_app_habhub.prototype.pages = function () {
                var gist = this.gist_current_id();
                return [
                    gist ? null : this.Placeholder(),
                    this.Menu_page(),
                    gist ? this.Details() : null
                ];
            };
            $mol_app_habhub.prototype.menu_rows = function () {
                var _this = this;
                return this.gists().map(function (gist, index) { return _this.Menu_row(gist.id); });
            };
            $mol_app_habhub.prototype.gist_title = function (id) {
                return this.gist(id).title;
            };
            $mol_app_habhub.prototype.gist_arg = function (id) {
                return { gist: id };
            };
            $mol_app_habhub.prototype.gist_current_title = function () {
                return this.gist(this.gist_current_id()).title;
            };
            $mol_app_habhub.prototype.gist_current_content = function () {
                return this.gist(this.gist_current_id()).body;
            };
            $mol_app_habhub.prototype.details_scroll_top = function (next) {
                var current = this.gist_current_id();
                return $.$mol_state_session.value(this + ".details_scroll_top(" + current + ")", next);
            };
            return $mol_app_habhub;
        }($.$mol_app_habhub));
        $mol.$mol_app_habhub = $mol_app_habhub;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//habhub.view.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'local get set delete': function () {
            var key = '$mol_state_local_test:' + Math.random();
            $.$mol_assert_equal($.$mol_state_local.value(key), null);
            $.$mol_state_local.value(key, 123);
            $.$mol_assert_equal($.$mol_state_local.value(key), 123);
            $.$mol_state_local.value(key, null);
            $.$mol_assert_equal($.$mol_state_local.value(key), null);
        },
    });
})($ || ($ = {}));
//local.test.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var localStorage = localStorage || {
    getItem: function (key) {
        return this[':' + key];
    },
    setItem: function (key, value) {
        this[':' + key] = value;
    },
    removeItem: function (key) {
        this[':' + key] = void 0;
    }
};
var $;
(function ($) {
    var $mol_state_local = (function (_super) {
        __extends($mol_state_local, _super);
        function $mol_state_local() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_state_local.value = function (key, next, force) {
            if (next === void 0)
                return JSON.parse(localStorage.getItem(key) || 'null');
            if (next === null)
                localStorage.removeItem(key);
            else
                localStorage.setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_local.prototype.prefix = function () { return ''; };
        $mol_state_local.prototype.value = function (key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        };
        return $mol_state_local;
    }($.$mol_object));
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//local.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_file = (function (_super) {
        __extends($mol_file, _super);
        function $mol_file() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_file.absolute = function (path) {
            return new $mol_file().setup(function (obj) {
                obj.path = function () { return path; };
            });
        };
        $mol_file.relative = function (path) {
            return $mol_file.absolute($node.path.resolve(path).replace(/\\/g, '/'));
        };
        $mol_file.prototype.path = function () {
            return '.';
        };
        $mol_file.prototype.watcher = function () {
            var _this = this;
            var watcher = $node.fs.watch(this.path(), { persistent: false }, function (type, name) {
                if (!name)
                    _this.stat(void null, $.$mol_atom_force);
                else if (!/(^\.|___$)/.test(name)) {
                    var file = _this.resolve(name);
                    file.stat(void null, $.$mol_atom_force);
                }
            });
            watcher.on('error', function (error) {
                _this.stat(error, $.$mol_atom_force);
            });
            return watcher;
        };
        $mol_file.prototype.stat = function (next, force) {
            var path = this.path();
            try {
                var stat = next || $node.fs.statSync(path);
            }
            catch (error) {
                if (error.code === 'ENOENT')
                    return null;
                return error;
            }
            this.parent().watcher();
            return stat;
        };
        $mol_file.prototype.version = function () {
            return this.stat().mtime.getTime().toString(36).toUpperCase();
        };
        $mol_file.prototype.exists = function (next) {
            var exists = !!this.stat();
            if (next === void 0) {
                return exists;
            }
            else {
                if (next == exists)
                    return exists;
                if (next) {
                    this.parent().exists(true);
                    $node.fs.mkdirSync(this.path());
                }
                else {
                    $node.fs.unlinkSync(this.path());
                }
                this.stat(void null, $.$mol_atom_force);
                return next;
            }
        };
        $mol_file.prototype.parent = function () {
            return this.resolve('..');
        };
        $mol_file.prototype.type = function () {
            var stat = this.stat();
            if (stat) {
                if (stat.isFile())
                    return 'file';
                if (stat.isDirectory())
                    return 'dir';
                if (stat.isBlockDevice())
                    return 'blocks';
                if (stat.isCharacterDevice())
                    return 'chars';
                if (stat.isSymbolicLink())
                    return 'link';
                if (stat.isFIFO())
                    return 'fifo';
                if (stat.isSocket())
                    return 'socket';
            }
            else {
                return null;
            }
            throw new Error("Unknown file type " + this.path());
        };
        $mol_file.prototype.name = function () {
            return $node.path.basename(this.path());
        };
        $mol_file.prototype.ext = function () {
            var match = /((?:\.\w+)+)$/.exec(this.path());
            return match && match[1].substring(1);
        };
        $mol_file.prototype.content = function (next, force) {
            if (next === void 0) {
                return this.stat() && $node.fs.readFileSync(this.path());
            }
            this.parent().exists(true);
            $node.fs.writeFileSync(this.path(), next);
            return next;
        };
        $mol_file.prototype.reader = function () {
            return $node.fs.createReadStream(this.path());
        };
        $mol_file.prototype.writer = function () {
            return $node.fs.createWriteStream(this.path());
        };
        $mol_file.prototype.sub = function () {
            var _this = this;
            this.stat();
            switch (this.type()) {
                case 'dir':
                    return $node.fs.readdirSync(this.path())
                        .filter(function (name) { return !/^\.+$/.test(name); })
                        .map(function (name) { return _this.resolve(name); });
            }
            return [];
        };
        $mol_file.prototype.resolve = function (path) {
            return this.Class().relative($node.path.join(this.path(), path));
        };
        $mol_file.prototype.relate = function (base) {
            if (base === void 0) { base = this.Class().relative('.'); }
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        };
        $mol_file.prototype.append = function (next) {
            $node.fs.appendFileSync(this.path(), next);
        };
        $mol_file.prototype.find = function (include, exclude) {
            var found = [];
            this.sub().forEach(function (child) {
                if (exclude && child.path().match(exclude))
                    return;
                if (!include || child.path().match(include))
                    found.push(child);
                if (child.type() === 'dir')
                    found = found.concat(child.find(include, exclude));
            });
            return found;
        };
        return $mol_file;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_file.prototype, "watcher", null);
    __decorate([
        $.$mol_mem()
    ], $mol_file.prototype, "stat", null);
    __decorate([
        $.$mol_mem()
    ], $mol_file.prototype, "version", null);
    __decorate([
        $.$mol_mem()
    ], $mol_file.prototype, "content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_file.prototype, "sub", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_file, "absolute", null);
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//file.node.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_locale = (function (_super) {
        __extends($mol_locale, _super);
        function $mol_locale() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_locale.lang_default = function () {
            return 'en';
        };
        $mol_locale.lang = function (next) {
            return $.$mol_state_local.value('locale', next) || $.$mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        };
        $mol_locale.source = function (lang) {
            return JSON.parse($.$mol_file.relative("-/web.locale=" + lang + ".json").content());
        };
        $mol_locale.texts = function (next) {
            if (next)
                return next;
            var lang = this.lang();
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                var def = this.lang_default();
                if (lang === def)
                    throw error;
                return this.source(def);
            }
        };
        $mol_locale.text = function (contexts, key) {
            var texts = this.texts();
            for (var i = 0; i < contexts.length; ++i) {
                var text = texts[contexts[i] + "_" + key];
                if (text)
                    return text;
            }
            console.warn('Locale tet not found: ', contexts, key);
            return "<" + key + ">";
        };
        return $mol_locale;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "lang_default", null);
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "lang", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_locale, "source", null);
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "texts", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//locale.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_app_habhub_demo = (function (_super) {
        __extends($mol_app_habhub_demo, _super);
        function $mol_app_habhub_demo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_habhub_demo.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        return $mol_app_habhub_demo;
    }($.$mol_app_habhub));
    $.$mol_app_habhub_demo = $mol_app_habhub_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
//# sourceMappingURL=node.test.js.map