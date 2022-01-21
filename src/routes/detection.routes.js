const controller = require("../controllers/detection.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // post data detection from CV model
  app.post("/api/v1/detection",controller.create);
  
  // get all data
  app.get("/api/v1/detection", controller.findAll)
  // get data based on rack
  app.get("/api/v1/detection/racks", controller.findByRacks)
  // get data based on date
  app.get("/api/v1/detection/dates", controller.findByDate)
  // get data based on status
  app.get("/api/v1/detection/status", controller.findByStatus)
};