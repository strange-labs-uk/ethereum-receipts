pragma solidity ^0.4.18;

contract ItemController {

    struct Item {
        string name;
        string model;
        uint index;
    }   

    mapping(string => Item) private items;
    string[] private itemIDs;

    event ItemCreated(string _id);

    function createItem (
        string _id, 
        string _name, 
        string _model) 
        public
        returns (bool success)
        {
            require(keccak256(_id) != keccak256(""));   // check id is not empty
            require(!isItem(_id));                      // check item does not exist 
            items[_id].name = _name;
            items[_id].model = _model;
            items[_id].index = itemIDs.push(_id)-1;
            ItemCreated(_id);
            return true;
        } 

    function isItem (
        string _id)
        view
        public
        returns (bool result)
        {
            if (itemIDs.length == 0) {
                return false;
            }
            return ( keccak256(itemIDs[items[_id].index]) == keccak256(_id)); // see note 1
        }
    
}

// note 1
// using keccak256 to compare hashes because of following compile error:
// "Operator == not compatible with types string storage ref and string memory".
// not sure how this affects the gas usage - the interweb says 'its fine'.
// possible improvement is to use bytes32 instead of string.

// note 2
// // design informed by:
// // https://medium.com/@robhitchens/solidity-crud-part-1-824ffa69509a