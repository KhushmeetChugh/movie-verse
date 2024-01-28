const mongoose=require('mongoose')
const Movies = mongoose.model('Movies', {
    Mname: String,
    genre: String,
    rating:Number,
  });
export default Movies;