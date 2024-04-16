import mongoose from 'mongoose'

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Delta', 'United'] 
  },
  airport: {
    type: String,
    airport: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date, 
    default: function() {
      let newDate = new Date()
      let adjustedDate = newDate.setFullYear(new Date().getFullYear() + 1)
      return adjustedDate
    },
  }, 
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)


export {
  Flight,
}