import mongoose from 'mongoose'

const Schema = mongoose.Schema

const flights = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Delta', 'United', 'Delta'] 
  }
})