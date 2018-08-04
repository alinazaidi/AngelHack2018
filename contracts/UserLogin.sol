pragma solidity ^0.4.17;
contract UserLogin {

    address public person;
    struct User {
        string name;
        string emailid;
        string password;
        
    }

    struct vaccDetail{
	    string  name;
	    address  writtenBy;
	    uint256 timestamp;
    }
  
    mapping(address => User) public userInfo;  
    mapping(address => vaccDetail) public userVaccs;


    function setLogin(string _name, string _emailid, string _password) public {
    User memory user = User(_name, _emailid, _password);
    userInfo[msg.sender] = user;
    person=msg.sender;

     }
     function showAddress() public view returns(address){
		return person;
    }
        
}
