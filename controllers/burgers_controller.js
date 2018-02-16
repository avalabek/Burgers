var express = require ("express");

var router = express.Router();

// import the model to use its database functions
var burger = require("../models/burger.js");

// create routes and set up logic
router.get("/", function(req,res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
router.post("/api/burgers", function(req, res) {
    burger.create(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
    //send back the id of the new burger
    res.json({ id: result.insertID });
    //below has no effect
    // res.redirect("/");
   });
});
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    
    burger.update(
        {
            devoured: req.body.devoured
        },
        condition,
        function(result){
            console.log(result);
            if (result.changedRows === 0) {
                
                return res.status(404).end();
            }
            //add res.redirect changes nothing
            //  res.redirect("/");
            // res.status(200).end();
        res.send(result);
        }
    );
    
});
// export for server.js to use
module.exports = router;