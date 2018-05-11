var express= require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var flash=require("connect-flash");
var passport=require("passport");
var localStrategy=require("passport-local");
var methodOverride = require("method-override");
var Comment = require("./models/comment");
var User=require("./models/user");
var Campground = require("./models/campground");
var commentRoutes=require("./routes/comments");
var campgroundRoutes = require("./routes/campground");
var indexRoutes = require("./routes/index");
var seedDB = require("./seeds");

// seedDB(Campground,Comment);
mongoose.connect("mongodb://localhost/yelp_camp");
// configuring passport//////////
app.use(require("express-session")({
    secret:"i will be the best programmer in the world",
    resave:false,
    saveUninitialized:false
}));
app.set("port", process.env.PORT || 7000);
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// used instaed of adding the current users manually to every routes//////////////////==========
app.use(function (req,res,next) {
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
     res.locals.success = req.flash("success");
    return next();
});
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comment",commentRoutes);
app.use(indexRoutes);
// --------------------------------comments routes  -----------------------------                //

// auth routes================/////////////////////////

var server=app.listen(app.get("port"),function () {
    console.log("you are listening to port " + app.get("port"));
});










































// var catMe=require("cat-me");
// console.log(catMe());

