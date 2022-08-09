const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create
}


function newTicket(req, res){
    res.render('tickets/new.ejs')
};

function create(req, res){
    console.log(req.params.id, '<- params flight id');
    console.log(req.body, 'contents of form (ticket)');

    Flight.findById(req.params.id, function(err, flightDoc){
        console.log(flightDoc, '<- flightDoc');
        flightDoc.tickets.push(req.body);
        flightDoc.save(function(err) {
            res.redirect(`flights/${req.params.id}`)
        })
    })
}