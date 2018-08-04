pragma solidity ^0.4.21;
contract UserData {
    string[] public myVacc;
    address public person;
    struct vaccDetail{
	    string  name;
	    address  writtenBy;
	    uint256 timestamp;
    }
    
    //The allergy detail
    mapping(address => vaccDetail[]) public userVaccs;
    //All allergies 
    vaccDetail[] public userVacc;

      function myvacc(string _content) public{
	    vaccDetail memory vaccine =vaccDetail(_content,msg.sender,now);
        userVaccs[msg.sender].push(vaccine);
        person=msg.sender;  
	    userVacc.push(vaccine);
      }

     function showAddress() public view returns(address){
		return person;
    }
    
    
}