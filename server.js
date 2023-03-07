const express = require('express');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY
const urlGenres = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY + '&language=sl'
const urlMovies = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY + '&language=sl&page='

app.get('/', (req, res) => { res.send('it is working!') })
app.post('/genres', (req, res) => {
  fetch(urlGenres)
  .then(res => res.json())
  .then(data => res.json(data))
  .catch(err => res.status(400).json('unable to work with API'))
      
}) 
app.put('/movies', (req, res) => {
  const { page } = req.body;
  fetch(urlMovies + page)
  .then(res => res.json())
  .then(data => res.json(data))
  .catch(err => res.status(400).json('unable to work with API'))
})
app.put('/filtered', (req, res) => {
  const { page, selectedGenres } = req.body;
  const urlFilteredMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY + '&language=sl&sort_by=popularity.desc&include_adult=false&include_video=false&page=' +page+ '&with_genres=' +selectedGenres+ '&with_watch_monetization_types=flatrate'
  fetch(urlFilteredMovies)
  .then(res => res.json())
  .then(data => res.json(data))
  .catch(err => res.status(400).json('unable to work with API'))
})

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})
