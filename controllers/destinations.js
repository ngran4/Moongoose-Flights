const Flight = require('../models/flight');

module.exports = {
    create
};

function create(req, res){
    console.log(req.body, '<- flight id');
    console.log(req.params.id, '<- form contents (destination)')
    
    // First we have to find the movie, 
    Flight.findById(req.params.id, function(err, flightDoc){
        if(err){
            res.redirect(`/flights/${req.params.id}`);
        }
        // then we need to add the review (aka req body) to that movies reviww array
        console.log(flightDoc, '<- flightDoc')
        flightDoc.destinations.push(req.body); // muating doc found from the database
            // so when we do that, we need to tell the DB that we changed something
            // so we have to save the document
        flightDoc.save(function(err){
            res.redirect(`/flights/${req.params.id}`)
        })
    })
    
};
