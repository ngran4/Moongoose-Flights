const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

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

    Flight.findById(req.params.id, function(err, flightDoc){
        console.log(flightDoc, 'show page')
        if(err){
            console.log(err, "error getting to show page")
            res.redirect('/flights')
        }

        Ticket.find({flight: flightDoc._id}, function (err, tickets){
            console.log(tickets, 'tickets');

            res.render('flights/show', {
                title: 'Flight Details', 
                flight: flightDoc, 
                tickets
            });
        });
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

