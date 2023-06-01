const Supplier = require("../model/Supplier");

// create a new Supplier service
exports.createSupplierService = async (data) => {
   const result = await Supplier.create(data);
   return result;
};

// get Supplier service
exports.getSuppliersService = async () => {
   const suppliers = await Supplier.find({});
   return suppliers;
};

// get Supplier service by id
exports.getSupplierByIdService = async (id) => {
   const supplier = await Supplier.findOne({ _id: id });
   return supplier;
};

exports.updateSupplierService = async (id, data) => {
   const result = await Supplier.updateOne({ _id: id }, data, {
      runValidators: true,
   });
   return result;
};
