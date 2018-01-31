pragma solidity ^0.4.18;

contract Storage {

    address private owner;
    address public controller;
    mapping(string => string) private values;

    event ValueWritten(string _key);
    event ControllerUpdated(address _controller);

    function Storage(address _controller) 
    public 
    {
        owner = msg.sender;
        controller = _controller;
    }

    function write (
        string _key, 
        string _value) 
        public 
        {
            require(msg.sender == controller); 
            values[_key] = _value;
            ValueWritten(_key);
        }

    function read (
        string _key)
        public
        view
        returns (string _value)
        {
            require(msg.sender == controller); 
            return values[_key];
        }
    
    function updateController (
        address _controller)
        public
        {
            require(msg.sender == owner); 
            controller = _controller;
            ControllerUpdated(controller);
        }
}