const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create
}

function newTicket(req, res){
    Flight.findById(req.params.id, function(err, flightDoc){
        if(err) {
            res.send('error in find flight id')
        }
        res.render('tickets/new.ejs', {
            flight: flightDoc
        });
    });
};

function create(req, res){
    req.body.flight = req.params.id

    Ticket.create(req.body, function(err, ticket){
        console.log(req.body, 'req bod')
        console.log(ticket, 'ticket')
        console.log(err, "error")
        if(err) {
            console.log('error in creating ticket')
        }
      
        res.redirect(`/flights/${req.params.id}`)
    });
};


// function create(req, res){
//     console.log(req.params.id, '<- params flight id');
//     console.log(req.body, 'contents of form (ticket)');


//     Flight.findById(req.params.id, function(err, flight){
//         console.log(flight, '<- flightDoc');
//         flight.tickets.push(req.body);
//         flight.save(function(err) {
//             res.redirect(`flights/${req.params.id}`, {Flight})
//         })
//     })
// }
