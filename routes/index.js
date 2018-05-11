var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

router.get("/", function (req, res) {
    res.render("landing");
});
router.get("/register", function (req, res) {
    res.render("register");
});
// router.get("/back",function (req,res) {
//     res.redirect("/campgrounds/:id");
// });
router.post("/register", function (req, res) {
    // res.send("sign in to my server");
    // req.body.username;
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "welcome "+ user.username )
            res.redirect("/campgrounds");
        });
    });

});
// logi routes==============////////////////////////////////========================================////////
router.get("/login", function (req, res) {
    res.render("login");
});
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
});
// log out//////////////============/////////////////
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success","you just logged out");
    res.redirect("/campgrounds");
});

module.exports = router;
