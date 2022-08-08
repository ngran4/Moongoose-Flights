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

function show(req, res){
    const arrival = getArrival();

    Flight.findById(req.params.id, function(err, flightDoc){
        if(err){
            console.log(err, "error getting to show page")
            res.redirect('/flights')
        }
        const destination = getDestination(flightDoc);
        console.log(flightDoc, 'show page')
        res.render('flights/show', {title: 'Flight Details', flight: flightDoc, arrival, destination})
    });
};

function newFlight(req, res){
    const departure = getDeparture();
    res.render('flights/new.ejs', {departure});
};

function create(req, res){
    console.log(req.body, '<-req.body');

    Flight.create(req.body, function(err, flightDoc){
        if(err){
            console.log(err, 'error in create flight controller');
        }
        console.log(flightDoc, '<- flight created in db')
        res.redirect('/flights')
    })
};

function getDeparture(){
    const departingFlight = new Flight();
    const defaultDate = departingFlight.departs;
    const departure = defaultDate.toISOString().slice(0, 16);
    return departure;
};

function getArrival(){
    const arrivingFlight = new Flight();
    const arrival = arrivingFlight.arrival;
    return arrival;
};

function getDestination(d){
    return d.destinations.map(({airport}) => airport)
};