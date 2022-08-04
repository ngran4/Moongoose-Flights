const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        enum: ['American', 'Delta', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: function(){
            return 'DEN'
        }
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    },    
    departs: {
        type: Date,
        default: function(){
            let d = new Date();
            return d.setFullYear(d.getFullYear() + 1);
        }
    }
});

module.exports = mongoose.model('Flight', flightSchema);