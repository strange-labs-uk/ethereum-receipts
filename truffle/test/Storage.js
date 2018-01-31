var Storage = artifacts.require("Storage");

contract('Storage', function(accounts) {

    //////////////////////////////
    // Writing values
    //////////////////////////////

    it("should write the value if the key does not exist", async () => {
        var storage = await Storage.new(accounts[0]);
        var tx = await storage.write("key", "value");
        assert.equal(1, tx.receipt.status, "should have created value");
    }); 

    it("should overwrite the value if the key already exists", async () => {
        var storage = await Storage.new(accounts[0]);
        var tx1 = await storage.write("key", "value");
        var tx2 = await storage.write("key", "value");
        assert.equal(1, tx1.receipt.status, "should have created value");
        assert.equal(1, tx2.receipt.status, "should have created value");
    }); 

    it("should emit a 'ValueWritten' event when a value is written", async () => {
        var storage = await Storage.new(accounts[0]);
        var tx = await storage.write("key", "value");
        assert.equal("ValueWritten", tx.logs[0].event, "event should have been emitted")
    });

    it("should revert when 'write' is not called by the owning address", async () => {
        let threw = false;
        var storage = await Storage.new(accounts[1]);
        try {
            await storage.write("key", "value");    
        } catch (error) {
            assert.include(error.message, 'revert', 'should revert');
            threw = true;
        }
        assert.isTrue(threw, "should have thrown exception");
    });

    //////////////////////////////
    // Reading values
    //////////////////////////////

    it("should read the value if the key exists", async () => {
        var storage = await Storage.new(accounts[0]);
        var tx1 = await storage.write("key", "value");
        var value =  await storage.read("key");
        assert.equal("value", value, "should have read value");
    }); 

    it("should return an empty value if the key does not exist", async () => {
        var storage = await Storage.new(accounts[0]);
        var tx1 = await storage.write("key", "value");
        var value =  await storage.read("nokey");
        assert.equal("", value, "should have read value");
    }); 

    it("should revert when 'read' is not called by the owning address", async () => {
        let threw = false;
        var storage = await Storage.new(accounts[1]);
        try {
            await storage.read("key");
        } catch (error) {
            assert.include(error.message, 'revert', 'should revert');
            threw = true;
        }
        assert.isTrue(threw, "should have thrown exception");
    });

    //////////////////////////////
    // Updating the controller
    //////////////////////////////
    
    it("should update the controller if called by the owning address", async () => {
        var storage = await Storage.new(accounts[0]);
        var tx = await storage.updateController(accounts[1]);
        var controller = await storage.controller.call();
        assert.equal(accounts[1], controller, "should have updated controller");
    }); 

    it("should emit a 'ControllerUpdated' event when the controller is updated", async () => {
        var storage = await Storage.new(accounts[0]);
        var tx = await storage.updateController(accounts[1]);
        assert.equal("ControllerUpdated", tx.logs[0].event, "event should have been emitted")
    });

    it("should revert when 'updateController' is not called by the owning address", async () => {
        let threw = false;
        var storage = await Storage.new(accounts[2], {from: accounts[1]});
        try {
            var tx = await storage.updateController(accounts[3]);
        } catch (error) {
            assert.include(error.message, 'revert', 'should revert');
            threw = true;
        }
        assert.isTrue(threw, "should have thrown exception");
    }); 
});