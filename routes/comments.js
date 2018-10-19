var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
router.get("/new", middleware.isLoggedIn,function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comment/form", {
                campground: campground,
                currentUser: req.user
            });
        }
    });

});
router.post("/new", middleware.isLoggedIn,function (req, res) {
    var text = req.body.text;
    var author = req.body.author;
    var commented = {
        text: text,
        author: author
    };

    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);

            res.redirect("/campgrounds");
        } else {
            Comment.create(commented, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.username=req.user.username;
                    comment.author.id=req.user._id;
                    comment.save();
                    campground.comments.push(comment._id);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "successfully added comment");       
                    res.redirect("/campgrounds/" + campground._id);

                }
            });
        }
    });
});
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function (req,res) {
    Comment.findById(req.params.comment_id,function (err,foundcomment) {
        if (err) {
            console.log(err);
        } else {
            res.render("comment/edit", {campground_id:req.params.id,foundcomment:foundcomment });
        }
    });
    
});
router.put("/:comment_id", middleware.checkCommentOwnership,function (req,res) {
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function (err,updatedComment) {
        if (err) {
            res.redirect("/");
        } else {
            req.flash("success","comment deleted");
            res.redirect("/campgrounds/" +req.params.id);
        }
    });
});
router.delete("/:comment_id", middleware.checkCommentOwnership,function (req,res) {
Comment.findByIdAndRemove(req.params.comment_id,function (err) {
    if (err) {
        res.redirect("/");
    } else {
        res.redirect("/campgrounds/" + req.params.id);
    }
});
});

module.exports = router;
