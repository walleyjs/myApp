var Campground=require("../models/campground");
var Comment =require("../models/comment");
var middlewareObj={};
middlewareObj.checkCampgroundownership=function (req,res,next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundcampground) {
            if (err) {
                console.log(err);
                req.flash("error", "campground not found");       
                res.redirect("/back");
            } else {
                if (foundcampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "you don't have permission to do that");       
                    res.redirect("/back");
                }
            }
        });
    } else {
        req.flash("error", "you need to be logged in to do that");        
        res.redirect("/back");
    }
};
middlewareObj.checkCommentOwnership= function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundcomment) {
            if (err) {
                console.log(err);
                res.redirect("/back");
            } else {
                if (foundcomment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","you dont have permission to do that");
                    res.redirect("/back");
                }
            }
        });
    } else {
        res.redirect("/back");
    }
};
middlewareObj.isLoggedIn=function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error","you need to be logged in to do that");
    res.redirect("/login");
}
module.exports=middlewareObj;