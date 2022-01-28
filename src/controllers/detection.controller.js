const db = require("../models");
const Data = db.data;

exports.findAll = (req, res) => {
  Data.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findByMissionID = (req, res) => {  
    Data.find({ mission_id: req.body.mission_id })
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Mission not found: " + req.body.mission_id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Mission not found with mission id " + req.body.mission_id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Data with mission id " + req.body.mission_id
        });
    });
  };

exports.findByRacks = (req, res) => {  
  Data.find({ rack_id: req.body.rack_id })
  .then(data => {
      if(!data) {
          return res.status(404).send({
              message: "Rack not found " + req.body.rack_id
          });            
      }
      res.send(data);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Rack not found with id " + req.body.rack_id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving Rack with id " + req.body.rack_id
      });
  });
};

exports.findByStatus = (req, res) => {  
  Data.find({ status: req.body.status })
  .then(data => {
      if(!data) {
          return res.status(404).send({
              message: "Not found: " + req.body.status
          });            
      }
      res.send(data);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Not found: " + req.body.status
          });                
      }
      return res.status(500).send({
          message: "Error retrieving data with status: " + req.body.status
      });
  });
};

exports.findByDate = (req, res) => {  
  Data.find({ date: req.body.date })
  .then(data => {
      if(!data) {
          return res.status(404).send({
              message: "Not found: " + req.body.date
          });            
      }
      res.send(data);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Not found: " + req.body.date
          });                
      }
      return res.status(500).send({
          message: "Error retrieving data with date: " + req.body.date
      });
  });
};

exports.create = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const newData = new Data({
    id: req.body.id,
    rack_id: req.body.rack_id,
    date: req.body.date,
    status: req.body.status,
    product_detection: req.body.product_detection
  });

  // Save Data in the database
  newData
    .save(newData)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the detection data."
      });
    });
};