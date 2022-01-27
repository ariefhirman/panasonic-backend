const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const rackSize = new Schema({
  width: Number,
  level_height: [Number]
}, { id: false }
)

const missionConfigSchema = new Schema({
  id: String,
  mission_name: String,
  drone_name: String,
  start_point: String,
  end_point: String,
  mission_speed: Number,
  max_altitude: Number,
  sweep_config: [Number],
  rack_size: [rackSize]
})

const MissionConfig = mongoose.model(
  "Mission",
  missionConfigSchema
);

module.exports = MissionConfig;