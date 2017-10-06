(function({ testHandler, mocha }) {
  var runner = mocha.run();
  var testsPassed = 0;
  var testFailed = 0;

  var onTestPassedHandler = function(e){
    testsPassed++;
    // console.log("onTestPassedHandler - title: " + e.title + " - total:" + testsPassed);
  };

  var onTestFailedHandler = function(e){
    testFailed++;
    // console.log("onTestFailedHandler - title: " + e.title + " - total:" + testFailed);
  };

  var onEnd = () => {
    // TODO: get test run duration
    testHandler(testsPassed, testFailed, null);
  };

  runner.on('pass', onTestPassedHandler);
  runner.on('fail', onTestFailedHandler);
  runner.on('end', onEnd);


  /**
   *  These are all the events you can subscribe to:
   *   - `start`  execution started
   *   - `end`  execution complete
   *   - `suite`  (suite) test suite execution started
   *   - `suite end`  (suite) all tests (and sub-suites) have finished
   *   - `test`  (test) test execution started
   *   - `test end`  (test) test completed
   *   - `hook`  (hook) hook execution started
   *   - `hook end`  (hook) hook complete
   *   - `pass`  (test) test passed
   *   - `fail`  (test, err) test failed
   */

})(window);
