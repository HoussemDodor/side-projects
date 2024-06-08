const Tile = require("../models/tilesModel");
const mongoose = require("mongoose");

const getTile = async (req, res) => {
  const { articleNumber } = req.params;

  try {
    const tile = await Tile.findOne({ articleNumber });

    // Get the enum values and add it in the model to load it into select 
    tile.enumPositionInStore = await Tile.schema.path('positionInStore').enumValues    
    tile.enumSupplier = await Tile.schema.path('enumSupplier').enumValues
    res.status(200).json(tile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTiles = async (req, res) => {
  try {
    const tiles = await Tile.find().sort({ createdAt: -1 });
    tiles.enumPositionInStore = await Tile.schema.path('positionInStore').enumValues    
    tiles.enumSupplier = await Tile.schema.path('supplier').enumValues
    res.status(200).json(tiles);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

const updateTile = async (req, res) => {
  const updatedTile = req.body;

  if (!mongoose.isValidObjectId(updatedTile._id))
    return res.status(404).json({ error: "invalid Tile ID" });

  try {
    delete updatedTile.updatedAt;
    const tile = await Tile.findByIdAndUpdate(
      updatedTile._id,
      updatedTile,
      { new: true }
    );
    res.status(200).json(tile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(404).json({ error: "invalid customer ID" });

  try {
    await Tile.findByIdAndDelete(id);
    res.status(200).json({message: "Successful deletion of customer"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createTile = async (req, res) => {
  const newTile = req.body;

  try {
    const tile = await Tile.create(newTile);
    res.status(200).json(tile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTile, getAllTiles, updateTile, deleteTile, createTile };
