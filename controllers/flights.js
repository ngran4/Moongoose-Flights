const Flight = require('../models/flight')

module.exports = {
    index,
    new: newFlight,
    create
};

function index(req, res){
    Flight.find({}, function(err, allFlightsInDB){
        console.log(allFlightsInDB, 'all flights');
        if(err){
            res.send('error trying to find flights')
        }

        res.render('flights/index.ejs', {
            flights: allFlightsInDB
        });
    });
};

function newFlight(req, res){
    const departingFlight = new Flight();
    const defaultDate = departingFlight.departs;
    const departure = defaultDate.toISOString().slice(0, 16);
    
    res.render('flights/new.ejs', {departure});
};


function create(req, res){
    console.log(req.body, '<-req.body');

    Flight.create(req.body, function(err, flightDocCreatedInDB){
        if(err){
            console.log(err, 'error in create flight controller');
            return res.render('flights/new.ejs');
        }
        console.log(flightDocCreatedInDB, '<- flight created in db')
        res.redirect('/flights')
    })
};