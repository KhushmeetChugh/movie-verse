const mongoose=require('mongoose')
const Movies = mongoose.model('Movies', {
    Mname: String,
    genre: String,
    type:{
      type: String,
      default: 'Stockimg',
    },
    rating:Number,
    M_url:String,
  });
// const Movies = mongoose.model('Movies', Movies);

module.exports=Movies