var UserLogin = artifacts.require('./UserLogin.sol');
contract('UserLogin:setLogin', function(accounts) {
  it("should have address", function(done) {
    var hello_test_address = UserLogin.deployed();
    hello_test_address.then(function(contract){
      return contract.setLogin.call(); // **IMPORTANT
    }).then(function(result){
        console.log(result);
      assert.isTrue(result);
      done();
    })
  });
});