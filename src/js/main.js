Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = print;
function print() {
  console.log("click print");
}
var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

require('../css/style.scss');

var _food = require('../images/food.jpg');

var _food2 = _interopRequireDefault(_food);

var _print = require('./print');

var _print2 = _interopRequireDefault(_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _lodash2.default.join(["Hello", "webpack"], ' ');
  element.classList.add("hello");

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = _print2.default;

  element.appendChild(btn);

  var myIcon = new Image();
  myIcon.src = _food2.default;
  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    (0, _print2.default)();
  });
}