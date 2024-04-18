import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"


function index(req, res) {
  Flight.find({})
  .then(flights => {
    console.log(flights)
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
  for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${req.params.flightId}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}


function show(req, res) {
  Flight.findById(req.params.flightId)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', { 
        title: 'Flight Detail', 
        flight: flight,
        meals: meals,
      })
    })    
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/edit', {
      flight: flight,
      title: 'Edit Flight'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function update(req, res) {
  // for (let key in req.body) {
  //   if(req.body[key] === "") delete req.body[key]
  // }
  // if (req.body.cast) {
  //   req.body.cast = req.body.cast.split(', ')
  // }
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function addMeal(req, res) {
  function addMeal(req, res) {
    // find the movie by id
    Flight.findById(req.params.flightId)
    .then(flight => {
      // associate by adding to cast array
      flight.meals.push(req.body.mealId)
    // save the parent document
      flight.save()
      .then(() => {
        // redirect to the movie show view
      res.redirect(`/flights/${flight._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect("/flights")
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/flight")
    })
  }
  
  
  
  
  
  
  
  
  
  
}

export {
  index,
  create,
  newFlight as new,
  show,
  edit,
  deleteFlight as delete,
  update,
  createTicket,
  addMeal
}