const express = require('express')

const { getTile, getAllTiles, updateTile, deleteTile, createTile, getEnums } = require('../controllers/tileController')

const router = express.Router()

router.get("/get/:id", getTile)

router.get("/all", getAllTiles)

router.post("/create", createTile)

router.patch("/update/:id", updateTile)

router.delete("/delete/:id", deleteTile)

router.get("/getEnums", getEnums)

module.exports = router