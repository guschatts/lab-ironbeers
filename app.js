const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

//Home route
app.get('/', (req, res) => {
  res.render('index');
});

//Beer route
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {console.log(beers[0])
    res.render('beers', {b: beers})
  })
  .catch(error => {console.log(error)
    res.render('page500')
  })
});

//Random beers route
app.get('/random', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('random', {beer: beers[0]})
  })
  .catch(error => console.log(error))
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
