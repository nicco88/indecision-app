(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("js/components/test.js", function(exports, require, module) {
'use strict';

console.log('from test.js');
});

require.register("js/initialize.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

document.addEventListener('DOMContentLoaded', function () {
    console.log('app initialized!!!!!!');

    /*****************************
     * App starts here!!!
     *****************************/

    var IndecisionApp = function (_React$Component) {
        _inherits(IndecisionApp, _React$Component);

        function IndecisionApp(props) {
            _classCallCheck(this, IndecisionApp);

            var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

            _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
            _this.handlePick = _this.handlePick.bind(_this);
            _this.handleAddOption = _this.handleAddOption.bind(_this);
            _this.state = {
                options: []
            };
            return _this;
        }

        _createClass(IndecisionApp, [{
            key: 'handlePick',
            value: function handlePick() {
                var randomIndex = Math.floor(Math.random() * this.state.options.length);
                var option = this.state.options[randomIndex];
                alert(option);
            }
        }, {
            key: 'handleDeleteOptions',
            value: function handleDeleteOptions() {
                this.setState(function () {
                    return {
                        options: []
                    };
                });
            }
        }, {
            key: 'handleAddOption',
            value: function handleAddOption(option) {
                if (!option) {
                    return 'Enter valid value to add item';
                } else if (this.state.options.indexOf(option) > -1) {
                    return 'This option already exists';
                }

                this.setState(function (prevState) {
                    return {
                        options: prevState.options.concat(option)
                    };
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var subtitle = 'The world is big';

                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(Header, { subtitle: subtitle }),
                    _react2.default.createElement(Action, {
                        handlePick: this.handlePick,
                        hasOptions: this.state.options.length > 0
                    }),
                    _react2.default.createElement(Options, {
                        options: this.state.options,
                        handleDeleteOptions: this.handleDeleteOptions
                    }),
                    _react2.default.createElement(AddOption, {
                        handleAddOption: this.handleAddOption
                    })
                );
            }
        }]);

        return IndecisionApp;
    }(_react2.default.Component);

    ;

    var Header = function Header(props) {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    props.title
                ),
                props.subtitle && _react2.default.createElement(
                    'h2',
                    null,
                    props.subtitle
                )
            )
        );
    };

    Header.defaultProps = {
        title: 'Nicco\'s Indecision App'
    };

    var Action = function Action(props) {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'button',
                {
                    onClick: props.handlePick,
                    disabled: !props.hasOptions
                },
                'What should I do?'
            )
        );
    };

    var Options = function Options(props) {
        return _react2.default.createElement(
            'div',
            null,
            props.options.map(function (option, i) {
                return _react2.default.createElement(Option, { key: i, optionText: option });
            }),
            _react2.default.createElement(
                'button',
                { onClick: props.handleDeleteOptions },
                'Remove All'
            )
        );
    };

    // option
    var Option = function Option(props) {
        return _react2.default.createElement(
            'div',
            null,
            props.optionText
        );
    };

    var AddOption = function (_React$Component2) {
        _inherits(AddOption, _React$Component2);

        // since we are using 'this', we need to build the constructor
        function AddOption(props) {
            _classCallCheck(this, AddOption);

            var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

            _this2.handleAddOption = _this2.handleAddOption.bind(_this2);
            _this2.state = {
                error: undefined
            };
            return _this2;
        }

        _createClass(AddOption, [{
            key: 'handleAddOption',
            value: function handleAddOption(e) {
                if (e) e.preventDefault();

                var option = e.target.elements.option.value.trim();
                var error = this.props.handleAddOption(option);

                this.setState(function () {
                    return {
                        error: error
                        //error: error
                    };
                });

                e.target.elements.option.value = '';
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    this.state.error && _react2.default.createElement(
                        'p',
                        null,
                        this.state.error
                    ),
                    _react2.default.createElement(
                        'form',
                        { onSubmit: this.handleAddOption },
                        _react2.default.createElement('input', { name: 'option', type: 'text' }),
                        _react2.default.createElement(
                            'button',
                            null,
                            'Add'
                        )
                    )
                );
            }
        }]);

        return AddOption;
    }(_react2.default.Component);

    ;

    _reactDom2.default.render(_react2.default.createElement(IndecisionApp, null), document.getElementById('app'));
});
});

require.register("js/play/elementary-component.js", function(exports, require, module) {
// import React from 'react';
// import ReactDOM from 'react-dom';


// document.addEventListener('DOMContentLoaded', () => {
//     console.log('app initialized!!!!!!');


//     // class Header extends React.Component {
//     //     render() {
//     //         return <p>This is from Header</p>;
//     //     }
//     // }

//     const Header = () => {
//         return <p>This is from Header</p>;
//     }

//     const jsx = (
//         <div>
//             <h1>Title</h1>
//             <Header />
//         </div>
//     );

//     ReactDOM.render(jsx, document.getElementById('app'));


// });
"use strict";
});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('js/initialize.js');
//# sourceMappingURL=app.js.map