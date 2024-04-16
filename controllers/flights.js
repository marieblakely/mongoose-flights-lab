import { Flight } from "../models/flight.js"


function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights',
    })
  })
  .catch(error => { 
    console.log(error)
    res.redirect('/')
  })
}

function newFlight (req, res) {
  res.render('flights/new', {
    title: 'Add Flight',
  })
}

function create (req, res) {
  // for (let key in req.body) {
	//   if (req.body[key] === '') delete req.body[key]
	// }
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function show(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/show', { 
      title: 'Flight Detail', 
      flight: flight,
    })    
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


export {
  index,
  create,
  newFlight as new,
  show,
}