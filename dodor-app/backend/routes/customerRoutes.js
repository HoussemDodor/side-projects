const express = require('express')

const { createCustomer, getCustomer, getAllCustomer, deleteCustomer, updateCustomer, getCustomerStatuses } = require('../controllers/customerController')

const router = express.Router()

router.get("/all", getAllCustomer)

router.patch("/update/:id", updateCustomer)

router.delete("/delete/:id", deleteCustomer)

router.post("/create", createCustomer)

router.get("/get/:id", getCustomer)

router.get("/statuses", getCustomerStatuses)

module.exports = router