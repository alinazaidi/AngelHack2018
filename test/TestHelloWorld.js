var HelloWorld = artifacts.require('./HelloWorld.sol');
contract('HelloWorld:GetMessage', function(accounts) {
  it("should return a correct string", function(done) {
    var hello_eth_salon = HelloWorld.deployed();
    hello_eth_salon.then(function(contract){
      return contract.GetMessage.call(); // **IMPORTANT
    }).then(function(result){
      assert.isTrue(result === 'Hello Ethereum Salon!');
      done();
    })
  });
});