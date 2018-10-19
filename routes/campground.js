var Campground = require("../models/campground");
var express=require("express");
var router=express.Router();
var middleware=require("../middleware");
router.get("/",function (req, res) {
    // console.log(req.user);
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name:regex}, function (err, allCampgrounds, currentUser) {
            if (err) {
                console.log(err);

            } else {
                res.render("campground/index", {
                    campgrounds: allCampgrounds,
                    currentUser: req.user
                });
                // console.log(allCampgrounds);
            }
        });
    } else {
        Campground.find({}, function (err, allCampgrounds, currentUser) {
            if (err) {
                console.log(err);

            } else {
                res.render("campground/index", {
                    campgrounds: allCampgrounds,
                    currentUser: req.user
                });
                // console.log(allCampgrounds);
            }
        });

    }
    
});
// app.get("/campgrounds/new", function (req, res) {
//     res.render("form");
// });

router.post("/",middleware.isLoggedIn,function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newCampground = { name: name, img: image, description: description,author:author,price:price };
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
            console.log(newlyCreated);
        }
    });


});
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campground/form", { currentUser: req.user });
});
router.get("/:id",function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundcampground) {
        if (err) {
            console.log(err);

        } else {
            // console.log(foundcampground);
            res.render("campground/show", {foundcampground: foundcampground});
        }
    });
});
router.get("/:id/edit",middleware.checkCampgroundownership,function (req,res) {
        Campground.findById(req.params.id, function (err, foundcampground) {
              res.render("campground/edit", { foundcampground: foundcampground });
            });
    });
router.put("/:id",middleware.checkCampgroundownership,function (req,res) { 
    Campground.findByIdAndUpdate(req.params.id,req.body.campshow,function (err,updatecamp) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
router.delete("/:id",middleware.checkCampgroundownership,function (req,res) {
    Campground.findByIdAndRemove(req.params.id,function (err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports=router;