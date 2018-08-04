App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
  /* $.getJSON('Adoption.json', function(data){
      var AdoptionArtifact = data;
      App.contracts.Adoption= TruffleContract(AdoptionArtifact);
      App.contracts.Adoption.setProvider(App.web3Provider);
      return App.markAdopted();
     });
  */

 if(typeof web3!== 'undefined'){
  App.web3Provider =web3.currentProvider;
} else{
  App.web3Provider= new Web3.providers.HttpProvider('http://localhost:8545');
}
web3 = new Web3(App.web3Provider);
return App.initContract();
    
  },

  initContract: function() {
 /*   $(document).on('click', '.btn-adopt', App.handleAdopt);*/
 $.getJSON('UserLogin.json', function(data){
  var UserLoginArtifact = data;
  App.contracts.UserLogin= TruffleContract(UserLoginArtifact);
  App.contracts.UserLogin.setProvider(App.web3Provider);
  return App.markSubmit();

 });
 
 /* $.getJSON('UserData.json', function(data){
  var UserDataArtifact = data;
  App.contracts.UserData= TruffleContract(UserDataArtifact);
  App.contracts.UserData.setProvider(App.web3Provider);
  return App.markVacc();

 });
 */
    return App.bindEvents();
  },

  

  bindEvents: function() {
 /*   $(document).on('click', '.btn-adopt', App.handleAdopt);*/
    $(document).on('click', '.btn-Submit', App.handleSubmit);

   /* $(document).on('click', '.btn-vacadd', App.handleAddVaccine);*/

  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;
    App.contracts.Adoption.deployed().then(function(instance){
        adoptionInstance=instance;
        return adoptionInstance.getAdopters.call();
    }).then(function(adopters){
      for(i=0;i<adopters.length;i++){
    if (adopters[i] !== '0x0000000000000000000000000000000000000000'){
      $('.panel-pet').eq(i).find('button').text('Success').attr('disabled',true);
  }
      }
    }).catch(function(err){
      console.log(err.message);
    });
  },

  markSubmit: function(person, account) {
    var userInstance;
    App.contracts.UserLogin.deployed().then(function(instance){
        userInstance=instance;
        return userInstance.showAddress.call();
    }).then(function(person){
      /*for(i=0;i<adopters.length;i++){*/
    if (person !== '0x0000000000000000000000000000000000000000'){
      $('.panel-pet').find('button').text('Success');
  }
      
    }).catch(function(err){
      console.log(person);
      console.log(err.message);
    });
  },
  markVacc: function(person, account) {
    var userInstance;
    App.contracts.UserLogin.deployed().then(function(instance){
        userInstance=instance;
        return userInstance.showAddress.call();
    }).then(function(person){
      /*for(i=0;i<adopters.length;i++){*/
    if (person !== '0x0000000000000000000000000000000000000000'){
      $('.panel-pet2').find('button').text('Added');
  }
      
    }).catch(function(err){
      console.log(person);
      console.log(err.message);
    });
  },


  handleSubmit: function(event){
    event.preventDefault();
    var nameValue = document.getElementById("fname").value;
    var emailid = document.getElementById("emailId").value;
    var li = document.createElement("LI");  
//    var name = document.getElementById("vaccine_name");
    //var date = document.getElementById("vaccine_date");
       console.log(nameValue);
    console.log(emailid);
    
    li.innerHTML ="27/4/18 : " +nameValue ;
    document.getElementById("faves").appendChild(li);
 
    console.log("Submit clicked");
    web3.eth.getAccounts(function(error,accounts){
      if(error){
        console.log(error);
      }
      var account=accounts[0];

      App.contracts.UserLogin.deployed().then(function(instance){
        userInstance =instance;
    /*web3.eth.defaultAccount = eth.accounts[0]*/
    console.log("works!");
    console.log(account);
      /*  return userInstance.setLogin("name","emailid","password", {from:accounts[0]}); */
       return userInstance.setLogin(nameValue,emailid,"password", {from:accounts[0]});

      }).then(function(result){
        return App.markSubmit();
      }).catch(function(err){
          console.log(account);
         console.log(err.message);

      });
    });
    
  },

 handleAddVaccine: function(event){
    event.preventDefault();
    console.log("Vaccine clicked");
    web3.eth.getAccounts(function(error,accounts){
      if(error){
        console.log(error);
      }
      var account=accounts[0];

      App.contracts.UserLogin.deployed().then(function(instance){
        userInstance =instance;

    
    console.log("works!");
    console.log(account);
      /*  return userInstance.setLogin("name","emailid","password", {from:accounts[0]}); */
       return userInstance.myvacc( "namc", {from:account});

      }).then(function(result){
        return App.markVacc();
      }).catch(function(err){
          console.log(account);
         console.log(err.message);

      });
    });
    
  },

  handleAdopt: function(event) {
    event.preventDefault();
   /* var adoptionInstance;*/
    var petId = parseInt($(event.target).data('id'));

    /*
     * 
    web3.eth.getAccounts(function(error,accounts){
      if(error){
        console.log(error);
      }
      var account=accounts[0];

      App.contracts.Adoption.deployed().then(function(instance){
        adoptionInstance =instance;

        return adoptionInstance.adopt(petId, {from:account});
      }).then(function(result){
        return App.markAdopted();
      }).catch(function(err){
        console.log(err.message);
      });
    });
     */
  }

};



$(function() {
  $(window).load(function() {
    App.init();
  });
});
