const Flight = require('../models/flight')

module.exports = {
    new: newFlight,
    create,
    index,
    show
};

function index(req, res){
    const date = new Date();

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

function getDeparture(){
    const departingFlight = new Flight();
    const defaultDate = departingFlight.departs;
    const departure = defaultDate.toISOString().slice(0, 16);
    return departure;
};

function newFlight(req, res){
    const departure = getDeparture();
    res.render('flights/new.ejs', {departure});
};

function create(req, res){
    console.log(req.body, '<-req.body');

    Flight.create(req.body, function(err, flightDocCreatedInDB){
        if(err){
            console.log(err, 'error in create flight controller');
        }
        console.log(flightDocCreatedInDB, '<- flight created in db')
        res.redirect('/flights')
    })
};

function show(req, res){
    Flight.findById(req.params.id, function(err, flight){
        if(err){
            console.log(err, "error getting to show page")
            res.redirect('/flights')
        }
        console.log(flight, 'show page')
        res.render('/flights/show', {title: 'Flight Details', flight})
    });
};