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
    var $mol_string = (function (_super) {
        __extends($mol_string, _super);
        function $mol_string() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_string.prototype.dom_name = function () {
            return "input";
        };
        $mol_string.prototype.enabled = function () {
            return true;
        };
        $mol_string.prototype.disabled = function () {
            return false;
        };
        $mol_string.prototype.value = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_string.prototype.value_changed = function (val) {
            return this.value(val);
        };
        $mol_string.prototype.hint = function () {
            return "";
        };
        $mol_string.prototype.type = function (val) {
            return (val !== void 0) ? val : "text";
        };
        $mol_string.prototype.field = function () {
            return (__assign({}, _super.prototype.field.call(this), { "disabled": this.disabled(), "value": this.value_changed(), "placeholder": this.hint(), "type": this.type() }));
        };
        $mol_string.prototype.event_change = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_string.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "input": function (event) { return _this.event_change(event); } }));
        };
        return $mol_string;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "value_changed", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "event_change", null);
    $.$mol_string = $mol_string;
})($ || ($ = {}));
//string.view.tree.js.map
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
        var $mol_string = (function (_super) {
            __extends($mol_string, _super);
            function $mol_string() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_string.prototype.event_change = function (next) {
                this.value(next.target.value.trim());
            };
            $mol_string.prototype.disabled = function () {
                return !this.enabled();
            };
            return $mol_string;
        }($.$mol_string));
        $mol.$mol_string = $mol_string;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//string.view.js.map
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
    var $mol_app_hello = (function (_super) {
        __extends($mol_app_hello, _super);
        function $mol_app_hello() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_hello.prototype.name_hint = function () {
            return "Name";
        };
        $mol_app_hello.prototype.name = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_hello.prototype.Name = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.hint = function () { return _this.name_hint(); };
                obj.value = function (val) { return _this.name(val); };
            });
        };
        $mol_app_hello.prototype.greeting = function () {
            return "";
        };
        $mol_app_hello.prototype.Greeting = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.greeting()); };
            });
        };
        $mol_app_hello.prototype.sub = function () {
            return [].concat(this.Name(), this.Greeting());
        };
        return $mol_app_hello;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_app_hello.prototype, "name", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_hello.prototype, "Name", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_hello.prototype, "Greeting", null);
    $.$mol_app_hello = $mol_app_hello;
})($ || ($ = {}));
//hello.view.tree.js.map
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
        var $mol_app_hello = (function (_super) {
            __extends($mol_app_hello, _super);
            function $mol_app_hello() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_hello.prototype.greeting = function () {
                var name = this.name();
                return name && "Hello, " + name + "!";
            };
            return $mol_app_hello;
        }($.$mol_app_hello));
        $mol.$mol_app_hello = $mol_app_hello;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//hello.view.js.map
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
    var $mol_app_hello_demo = (function (_super) {
        __extends($mol_app_hello_demo, _super);
        function $mol_app_hello_demo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_hello_demo.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        return $mol_app_hello_demo;
    }($.$mol_app_hello));
    $.$mol_app_hello_demo = $mol_app_hello_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
//# sourceMappingURL=node.test.js.map