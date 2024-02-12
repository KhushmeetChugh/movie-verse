const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjgwNDU5YmQyODE5MmViMmMzYTc4OGE2MzQwMGY2NSIsInN1YiI6IjY1Yzc0Y2U5MjY2Nzc4MDE0OTU3MGJlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H3HSLEiM9sA4vF2MtzsGtecCvMlJznCbHOpxSokht0o'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));