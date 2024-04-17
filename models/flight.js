import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/
  },
  price: {
    type: Number,
    min: 0,
  },
}, {
  timestamps: true
})

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'] 
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
  tickets: [ticketSchema],
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)


export {
  Flight,
}