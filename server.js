const   port        = process.env.port || 2212,
        express     = require('express'),
        mongoose    = require('mongoose'),
        passport    = require('passport'),
        LocalStrategy = require('passport-local'),
        bodyParser  = require('body-parser'),
        app         = express(),
        User        = require("./models/user"),
        Article     = require("./models/article"),
        Comment     = require("./models/comment");

mongoose.connect("mongodb://localhost/gaharu_db_v2", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use('/vendor', express.static(__dirname + '/vendor'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/tiles', express.static(__dirname + '/tiles'));
app.use('/stylesheet/', express.static(__dirname + '/stylesheet/'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/material', express.static(__dirname + '/material'));



// PASSPORT CONFIGURATION 
app.use(require("express-session")({
    secret: "This website was created by Hendra Fauzi Nugraha",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user; 
    next(); //digunakan agar fungsi ini berlaku untuk semua route
});

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/HomeGaharu', (req, res) => {
    res.render("home"); // {currentUser: req.user} << tidak usah ditambahkan
});

//SHOW ALL COMMENT & VR MODE
app.get('/ProfileGaharu', isLoggedin, (req, res) => {
    // console.log(req.user);
    Article.find({}, (err, allArticles) => {
        if(err){
            console.log("error" + err)
        } else {
            res.render("profile", {article: allArticles});
        }
    })
    
});

//ADD NEW COMMENT TO PROFILE PAGE
app.post("/ProfileGaharu", isLoggedin, (req, res)=> {
    var name = req.body.namePost;
    var title = req.body.titlePost;
    var newArticle = {name: name, title: title};
    //Create a new articles and save to DB
    Article.create(newArticle, (err, newlyCreated) => {
        if(err){
            console.log("error: " + err);
        } else {
            //redirect back to profile page
            res.redirect("/ProfileGaharu");
        }
    });
});

//SHOW SPECIFIED COMMENT
app.get("/ProfileGaharu/:id", isLoggedin, (req,res) => {
    //find the comment was provide ID
    Article.findById(req.params.id).populate("comments").exec(function(err, foundArticle){
        if(err){
            console.log("error" + err);
        } else {
        //render comment template
        console.log(foundArticle);
        res.render("showComments", {foundArticles: foundArticle});
        }
    });
});

//================= COMMENT ROUTES   =================
app.get("/ProfileGaharu/:id/comments/new", (req, res) => {
    Article.findById(req.params.id, (err, Article) => {
        if(err){
            console.log(err);
        } else {
            res.render("newComments", {article: Article})
        }
    })
});

app.post("/ProfileGaharu/:id/comments", (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if(err){
            console.log("Error: "+ err);
            res.redirect("/ProfileGaharu")
        } else {
            Comment.create(req.body.element, (err, comment) => {
                if(err){
                    console.log("Error: " + err);
                } else {
                    article.comments.push(comment);
                    article.save();
                    res.redirect("/ProfileGaharu/" + article._id);
                }
            });
        }
    });
});

app.get('/VrtourGaharu', isLoggedin, (req, res) => {
    res.render("gaharuTour");
});

//================= AUTHENTICATION   =================
//================= REGISTER         =================

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("login");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/ProfileGaharu")
        });
    });
});

//================= LOGIN         =================
app.get("/login", function(req, res){
    res.render("login");
})
//rumus ==>>>  app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local", 
        {
            successRedirect: "/ProfileGaharu",
            failureRedirect: "/login"
        }), function(req, res){

});

//================= LOGOUT         =================
// app.get("/logout")
app.get("/logout", function(req,res) {
    req.logout();
    res.redirect("/HomeGaharu");
});

function isLoggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//================= COMMENTS ROUTE         =================

//================= END ROUTES

app.listen(port, () => {
    console.log(`server has started on port: ${port} `);
});