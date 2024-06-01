const express = require('express')

const { createCustomer, getCustomer, getAllCustomer, deleteCustomer, updateCustomer } = require('../controllers/customerController')
const { get } = require('mongoose')

const router = express.Router()

router.get("/all", getAllCustomer)

router.patch("/update/:id", updateCustomer)

router.delete("/delete/:id", deleteCustomer)

router.post("/create", createCustomer)

router.get("/getCustomer/:id", getCustomer)

module.exports = router