var express = require('express');
var router = express.Router();
var userModule = require('../modules/user');
var jwt = require('jsonwebtoken')
if (typeof localStorage === "undefined" || localStorage === null) { //npm- localStorage requirement 
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

var loginUser = localStorage.getItem('loginUser')

function verifyusername(req,res,next){
  var uname  = req.body.uname
  var checkUsername = userModule.findOne({username:uname})
  checkUsername.exec((err,data)=>{
    if(err)throw(err)
    if(!data){
      return  res.render('index', { title: 'Password Management System',msg:"Invalid Username !!",success:''}); //this will print error on html page otherthan console
      }
    next()
  })
}
/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = localStorage.getItem('loginUser')
  console.log("loginuser:",loginUser)
  res.render('index', { title: 'DrBot | AI Health Assistant',loginUser:loginUser });
});

router.get('/covid', function(req, res, next) {
  res.render('covid', { title: 'DrBot | AI Health Assistant',loginUser:loginUser });
});
router.get('/diabetes', function(req, res, next) {
  res.render('diabetes', { title: 'DrBot | AI Health Assistant',loginUser:loginUser });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'DrBot | Login',msg:"" ,success:'',loginUser:loginUser});
});

router.post('/login', verifyusername,function(req, res, next) {
  var username = req.body.uname //importing username from html form
  var password = req.body.password //importing password from html form
  var checkUser = userModule.findOne({username:username}) //this function will find that username in db 
  checkUser.exec((err,data)=>{
  if (err) throw err
  var getUserID= data._id //this will fetch the id of the user from db
  var getPassword=data.password //and this will store the input password
  if(password==getPassword){ //and this will compare it for further login
    var token = jwt.sign({ userID: getUserID }, 'loginToken'); //this will get store getUserID into userID from the db and create a token for that user named a 'loginToken'
    localStorage.setItem('userToken', token); // and this will store that token temporary in scratch folder named as 'userToken'
    localStorage.setItem('loginUser', username); //and store the username into 'loginuser' and help in displaying the name of the user on further pages
    res.redirect('/')
    // res.render('index', { title: 'Password Management System',msg:"Logged in Sucessfully" });
  }else{
    res.render('login', { title: 'DrBot | Login ',msg:"Invalid Username and Password" ,success:''});
  }
  })
});

router.get('/register', function(req, res, next) {
  res.render('register',{ title: 'DrBot | Register',msg:'',success:'' ,loginUser:loginUser});
});
router.post('/register',function(req, res, next) {  //note:- we are using these middlewere here so that our error will not be printed in console and server will not be stopped it will be displayed in form
  var username = req.body.uname //importing userDetails from html form
  var email = req.body.email
  var phone = req.body.phone 
  var password = req.body.password 
  var confpassword= req.body.confpassword

  if(password != confpassword){
    res.render('register', { title: 'Password Management System',msg:"Password not matched",success:'',loginUser:loginUser});
  }
  else{
  var userDetails = new userModule({ //exporting it to MongoDB model 
    username:username,
    email:email,
    phone:phone,
    password:password
  })
  userDetails.save((err,doc)=>{
    if(err)throw err
    res.render('register', { title: 'Password Management System',success:"User Registered Successfully",msg:'',loginUser:loginUser});
  }) //now last step, saving it 
}
});

//-----Logout----
router.get('/logout', function(req, res, next) {
  localStorage.removeItem('userToken')
  localStorage.removeItem('loginUser')
  res.redirect('/')
});

module.exports = router;
