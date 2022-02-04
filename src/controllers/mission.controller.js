const db = require("../models");
const Config = db.config;

exports.findAll = (req, res) => {
  Config.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findByID = (req, res) => {  
  Config.find({ id: req.params.id })
  .then(data => {
      if(!data) {
          return res.status(404).send({
              message: "Config not found " + req.params.id
          });            
      }
      res.send(data);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Config not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving Config with id " + req.params.id
      });
  });
};

exports.findLatest = (req, res) => {  
  Config.findOne().sort({$natural: -1}).limit(1).
  then(data => {
    if(!data) {
        return res.status(404).send({
            message: "Latest config not found"
        });            
    }
    res.send(data);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Latest config not found"
        });                
    }
    return res.status(500).send({
        message: "Error retrieving Config"
    });
  });
};

exports.findLatestByParam = (req, res) => {  
  Config.findOne().sort({$natural: -1}).limit(req.params.no).
  then(data => {
    if(!data) {
        return res.status(404).send({
            message: "Latest config not found"
        });            
    }
    res.send(data);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Latest config not found"
        });                
    }
    return res.status(500).send({
        message: "Error retrieving Config"
    });
  });
};

exports.create = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const newConfig = new Config({
    id: req.body.id,
    mission_name: req.body.mission_name,
    drone_name: req.body.drone_name,
    start_point: req.body.start_point,
    end_point: req.body.end_point,
    mission_speed: req.body.mission_speed,
    max_altitude: req.body.max_altitude,
    rack_ids: req.body.rack_ids,
    sweep_config: req.body.sweep_config,
    rack_size: req.body.rack_size
  });

  // Save Data in the database
  newConfig
    .save(newConfig)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating config data."
      });
    });
};