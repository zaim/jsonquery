// Creates a test environment that can be run on NodeJS
// re-exports the 'assert' module plus an additional 'test' function similar
// to jqUnit.test

var assert = require('assert'),
    sys    = require('sys');

function ok(str) {
  return '\033[32m' + str + '\033[39m';
};

function ex(str) {
  return '\033[33m' + str + '\033[39m';
};

function err(str) {
  return '\033[31m' + str + '\033[39m';
};

function bold(str) {
  return '\033[1m' + str + '\033[22m';
};

// simulates jqUnit.test
// prints out the test name and error message with pretty colours:
//   green:  success
//   red:    assertion errors
//   yellow: any other exceptions
// does not print out individual assert messages
function test(title, fn) {
  var colour  = ok,
      result  = 'OK: ',
      message = '';
  try {
    fn();
  }
  catch (e) {
    if (e.name == 'AssertionError') {
      colour = err;
    }
    else {
      colour = ex;
    }
    result = 'ER: ';
    message = e.message;
  }
  sys.puts(colour(bold(result) + title + ' ' + bold(message)));
};

// re-export assert functions
for (var name in assert) {
  exports[name] = assert[name];
}
exports.equals = exports.equal;
exports.test = test;
