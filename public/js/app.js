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
require.register("js/components/Action.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

exports.default = Action;
});

require.register("js/components/AddOption.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddOption = function (_React$Component) {
    _inherits(AddOption, _React$Component);

    function AddOption() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AddOption);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            error: undefined

            // constructor(props) {
            //     super(props);
            //     this.handleAddOption = this.handleAddOption.bind(this);

            // }

        }, _this.handleAddOption = function (e) {
            if (e) e.preventDefault();

            var option = e.target.elements.option.value.trim();
            var error = _this.props.handleAddOption(option);

            _this.setState(function () {
                return { error: error };
            });

            if (!error) {
                e.target.elements.option.value = '';
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AddOption, [{
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

exports.default = AddOption;
;
});

require.register("js/components/Header.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(props) {
    return _react2.default.createElement(
        "div",
        { className: "header" },
        _react2.default.createElement(
            "div",
            { className: "container" },
            _react2.default.createElement(
                "h1",
                { className: "header__title" },
                props.title
            ),
            props.subtitle && _react2.default.createElement(
                "h2",
                { className: "header__subtitle" },
                props.subtitle
            )
        )
    );
};

Header.defaultProps = {
    title: 'Nicco\'s Indecision App'
};

exports.default = Header;
});

require.register("js/components/IndecisionApp.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AddOption = require('./AddOption');

var _AddOption2 = _interopRequireDefault(_AddOption);

var _Options = require('./Options');

var _Options2 = _interopRequireDefault(_Options);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

var _OptionModal = require('./OptionModal');

var _OptionModal2 = _interopRequireDefault(_OptionModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*****************************
* App starts here!!!
*****************************/

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, IndecisionApp);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            options: [],
            selected: undefined
        }, _this.handlePick = function () {
            var randomIndex = Math.floor(Math.random() * _this.state.options.length);
            var option = _this.state.options[randomIndex];
            // alert(option);
            _this.setState(function () {
                return {
                    selectedOption: option
                };
            });
        }, _this.handleDeleteOptions = function () {
            _this.setState(function () {
                return { options: [] };
            });
        }, _this.handleDeleteOption = function (optionToRemove) {
            _this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }, _this.handleAddOption = function (option) {
            if (!option) {
                return 'Enter valid value to add item';
            } else if (_this.state.options.indexOf(option) > -1) {
                return 'This option already exists';
            }

            _this.setState(function (prevState) {
                return { options: prevState.options.concat(option) };
            });
        }, _this.handleClearSelectedOption = function () {
            _this.setState(function () {
                return { selectedOption: undefined };
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);

                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (e) {
                // do nothing if error, that is if not a valid JSON
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var subtitle = 'The world is big';

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Header2.default, { subtitle: subtitle }),
                _react2.default.createElement(_Action2.default, {
                    handlePick: this.handlePick,
                    hasOptions: this.state.options.length > 0
                }),
                _react2.default.createElement(_Options2.default, {
                    options: this.state.options,
                    handleDeleteOptions: this.handleDeleteOptions,
                    handleDeleteOption: this.handleDeleteOption
                }),
                _react2.default.createElement(_AddOption2.default, {
                    handleAddOption: this.handleAddOption
                }),
                _react2.default.createElement(_OptionModal2.default, {
                    selectedOption: this.state.selectedOption,
                    handleClearSelectedOption: this.handleClearSelectedOption
                })
            );
        }
    }]);

    return IndecisionApp;
}(_react2.default.Component);

exports.default = IndecisionApp;
;
});

require.register("js/components/Option.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = function Option(props) {
    return _react2.default.createElement(
        'div',
        null,
        props.optionText,
        _react2.default.createElement(
            'button',
            {
                onClick: function onClick(e) {
                    props.handleDeleteOption(props.optionText);
                }
            },
            'Remove'
        )
    );
};

exports.default = Option;
});

require.register("js/components/OptionModal.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OptionModal = function OptionModal(props) {
    return _react2.default.createElement(
        _reactModal2.default,
        {
            isOpen: !!props.selectedOption,
            onRequestClose: props.handleClearSelectedOption,
            contentLabel: 'Selected Option',
            closeTimeoutMS: 200
            // className="modal"
        },
        _react2.default.createElement(
            'h3',
            null,
            'Selected Option'
        ),
        props.selectedOption && _react2.default.createElement(
            'p',
            null,
            props.selectedOption
        ),
        _react2.default.createElement(
            'button',
            { onClick: props.handleClearSelectedOption },
            'Okay'
        )
    );
};

exports.default = OptionModal;
});

require.register("js/components/Options.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Options = function Options(props) {
    return _react2.default.createElement(
        'div',
        null,
        props.options.length === 0 && _react2.default.createElement(
            'p',
            null,
            'Please, add an option to get started!'
        ),
        props.options.map(function (option, i) {
            return _react2.default.createElement(_Option2.default, {
                key: i,
                optionText: option,
                handleDeleteOption: props.handleDeleteOption
            });
        }),
        _react2.default.createElement(
            'button',
            { onClick: props.handleDeleteOptions },
            'Remove All'
        )
    );
};

exports.default = Options;
});

require.register("js/initialize.js", function(exports, require, module) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _IndecisionApp = require('./components/IndecisionApp');

var _IndecisionApp2 = _interopRequireDefault(_IndecisionApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
    console.log('app initialized!!!!!!');

    _reactDom2.default.render(_react2.default.createElement(_IndecisionApp2.default, null), document.getElementById('app'));
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