var assert = require('assert');
describe("LED Demo Module", function() {
  var ledDemo = require('../ledDemo');
  describe("Change State", function(){
    it("Should return true when state changed to On", function(){
      assert.equal(ledDemo.changeState('on', 1), true);
    });
    it("Should return false when state changed to Off", function(){
      assert.equal(ledDemo.changeState('off', 1), false);

    });
  })

});
