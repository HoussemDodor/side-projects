const Tile = require("../models/tilesModel");
const mongoose = require("mongoose");

const getTile = async (req, res) => {
  const { articleNumber } = req.params;

  try {
    const tile = await Tile.findOne({articleNumber});
    res.status(200).json(tile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTiles = async (req, res) => {};

const updateTile = async (req, res) => {};

const deleteTile = async (req, res) => {};

const createTile = async (req, res) => {
    const newTile = req.body

    try {
        const tile = await Tile.create(newTile);
        res.status(200).json(tile);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};
