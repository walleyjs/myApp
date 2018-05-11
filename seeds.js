
// var data=[
//     { 
//         name: "usa",
//       img: "https://image.shutterstock.com/display_pic_with_logo/59982/706056724/stock-photo-family-vacation-travel-holiday-trip-in-motorhome-caravan-car-vacation-beautiful-nature-italy-706056724.jpg",
//     description:"it is in usa behind the whitr house which is the presidential villa"},
//     {
//         name:"nigeria",
//         img:"https://image.shutterstock.com/display_pic_with_logo/59982/706056724/stock-photo-family-vacation-travel-holiday-trip-in-motorhome-caravan-car-vacation-beautiful-nature-italy-706056724.jpg",
//         description:"it is the best camground in nigeria"},
//     {
//         name: "korea",
//         img: "https://cdn.pixabay.com/photo/2016/12/08/17/45/lake-sara-1892494__340.jpg",
//         description: "north korea"
        
//   }
        
//     ];
function seedDB(Campground,Comment){
   Campground.remove({},function (err) {
//        if (err) {
//            console.log(err);
//        }
//        console.log("campgrounds removed");
//        data.forEach(function (seed) {
//            Campground.create(seed, function (err, campground) {
//                if (err) {
//                    console.log(err);
//                } else {
//                    console.log("data added");
//                 Comment.create({
//                     text:"ttjgfgt",
//                     author:"eeee"
//                 },function (err,comment) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         campground.comments.push(comment);
//                         campground.save();
//                         console.log("comments added");

//                     }
//                 });
//                }
//            });
//        });
  });

}
module.exports = seedDB;