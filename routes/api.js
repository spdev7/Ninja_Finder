const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');



//get a list of ninjas from the db
router.get('/ninjas',(req,res,next) => {
//    res.send({type:'GET'});
// Ninja.geoNear(
//     {
//         type:'Point',coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)],
//         maxDistance:100000,spherical:true}
//     ).then((ninja) => {
//         res.send(ninja);
//     }) ; 
Ninja.aggregate().near({
    near: { type: "point", coordinates: [parseFloat(req.query.lng),parseFloat(req.query.lat)] },
    maxDistance: 10000,  // in 10k meters
    spherical: true,
    distanceField: "dist.calculated"
  }).then(function(ninjas){
      console.log(ninjas)
    res.send(ninjas)
  });
});




//add a new ninja to the db
router.post('/ninjas',(req,res,next) => {
    // var ninja = new Ninja(req.body);
    // ninja.save();
    //Instead of using this we can use .create proporty of mongoose
    Ninja.create(req.body).then((ninja)=>{
        res.send(ninja);      
    }).catch(next) ; 
});

//update a ninja in the db
router.put('/ninjas/:id',(req,res,next) => {
    Ninja.findByIdAndUpdate({_id:req.params.id},req.body,{new:true }).then((ninja) => {
        res.send({ninja});
     });
});
//delete a ninja from the db
router.delete('/ninjas/:id',(req,res,next) => {
    Ninja.findByIdAndRemove({_id:req.params.id}).then((ninja) => {
         res.send(ninja);
       });
    res.send({type:'DELETE'});
});

module.exports = router;
