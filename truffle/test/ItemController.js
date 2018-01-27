var ItemController = artifacts.require("ItemController");

contract('ItemController', function(accounts){

    it("should create an item", (done) => {
        ItemController.new().then(instance => {
            itemController = instance;
            return itemController.createItem("id1", "name1", "model1");
        }).then(tx => {
            assert.equal(1, tx.receipt.status, "item should have been created");
            done();
        }).catch(done);
    }); 

    it("should create an item when using call", (done) => {
        ItemController.new().then(instance => {
            itemController = instance;
            return itemController.createItem.call("id1", "name1", "model1");
        }).then(success => {
            assert.isTrue(success, "item should have been created");
            done();
        }).catch(done);
    }); 
    
    it("should not create an item if it already exists and revert", (done) => {
        ItemController.new().then(instance => {
            itemController = instance;
            return itemController.createItem("id1", "name1", "model1");
        }).then(tx => {
            return itemController.createItem("id1", "name1", "model1");
        }).then(() => {
            assert.fail();
        }).catch(error => {
            assert.include(error.message, 'revert', 'item should not have been created');
            done();
        });
    }); 

    it("should not create an item without an id and revert", (done) => {
        ItemController.new().then(instance => {
            itemController = instance;
            return itemController.createItem("", "name1", "model1");
        }).then(() => {
            assert.fail();
        }).catch(error => {
            assert.include(error.message, 'revert', 'item should not have been created');
            done();
        });
    }); 
    
    it("should emit an event when an item is created", (done) => {
        ItemController.new().then(instance => {
            itemController = instance;
            return itemController.createItem("id1", "name1", "model1");
        }).then(tx => {
            assert.equal("ItemCreated", tx.logs[0].event, "event should have been emitted")
            done();
        }).catch(done);
    }); 

});