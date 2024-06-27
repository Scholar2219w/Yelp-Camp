const mongoose=require('mongoose');
const cities=require('./cities')
const Campground=require('../models/campground');
const {places,descriptors}= require('./seedHelpers');

mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp',{
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology:true
});
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection-error:"));
db.once("open",()=>{
    console.log("Database connected");
});
const sample=array=> array[Math.floor(Math.random()*array.length)];

const seedDB=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
      const random1000=Math.floor(Math.random()*1000);
      const price=Math.floor(Math.random()*20)+10;
      const camp=new Campground({
        author:'64e61efac9cd5c7d7583b3bb',
        location: `${cities[random1000].city},${cities[random1000].state}`,
        title:`${sample(descriptors)} ${sample(places)}`,
        description:'hi hello hello hello i am kajal who are you',
        price,
        images: [
          {
            url: 'https://res.cloudinary.com/dnbbc3wae/image/upload/v1693586042/YelpCamp/nv69abkv9hfp9ozokxzo.jpg',
            filename: 'YelpCamp/nv69abkv9hfp9ozokxzo'
          },
          {
            url: 'https://res.cloudinary.com/dnbbc3wae/image/upload/v1693586042/YelpCamp/nv69abkv9hfp9ozokxzo.jpg',
            filename: 'YelpCamp/nv69abkv9hfp9ozokxzo'
          }
       

        ]
      })
      await camp.save();

    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})
