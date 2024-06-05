const Customer = require("../models/customerModel");
const mongoose = require("mongoose");

const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  const updatedCustomer = req.body;

  if (!mongoose.isValidObjectId(updatedCustomer._id))
    return res.status(404).json({ error: "invalid customer ID" });

  try {
    delete updateCustomer.updatedAt;
    const customer = await Customer.findByIdAndUpdate(
      updatedCustomer._id,
      updatedCustomer,
      { new: true }
    );
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(404).json({ error: "invalid customer ID" });

  try {
    await Customer.findByIdAndDelete(id);
    res.status(200).json({message: "Successful deletion of customer"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(404).json({ error: "invalid customer ID" });

  try {
    const customer = await Customer.findById(id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCustomer = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json({ customers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  getAllCustomer,
};
