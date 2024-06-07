const express = require('express')

const { getTile, getAllTiles, updateTile, deleteTile, createTile } = require('../controllers/tileController')

const router = express.Router()

router.get("/get/:id", getTile)

router.get("/get/all", getAllTiles)

router.post("/create", createTile)

router.get("/update/:id", updateTile)

router.get("/deleteTile", deleteTile)

module.exports = router