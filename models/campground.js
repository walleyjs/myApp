var mongoose =require("mongoose");
var CampgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    author:{
        id: {
             type: mongoose.Schema.Types.ObjectId,
             ref:"User"
            },
            username:String
            },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    price:String
});

module.exports = mongoose.model("Campground", CampgroundSchema);