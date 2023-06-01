const Store = require("../model/Store");

// create a new store services
exports.createStoreService = async (data) => {
   console.log(data);
   const store = await Store.save(data);
   return store;
};

// get store services
exports.getStoresService = async () => {
   const stores = await Store.find({});
   return stores;
};

//  get store services by service
exports.getStoreByIdService = async (storeId) => {
   const store = await Store.find({ _id: storeId });
   return store;
};
