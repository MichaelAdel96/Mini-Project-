// require dependincies 
var express = require('express');
var router = express.Router();
var projectController = require('./controllers/projectController');

var multer=require('multer');
var storage=multer.diskStorage(
       {
           destination:function(req,file,cb){cb(null,'images/')},
           filename:function(req,file,cb){cb(null,file.originalname)}
       });

var upload=multer({storage:storage});

// add routes
router.get('/', projectController.main);
router.get('/signup', projectController.signup);
router.get('/projects', projectController.visitor);


router.post('/', projectController.login);
router.post('/signup', projectController.createUser);
router.post('/home',upload.single("img"), projectController.createProject);
router.post('/first',upload.single("pp"), projectController.first);
router.post('/second',upload.single("img"), projectController.second);
router.post('/visitor2', projectController.visitor2);


// export router

module.exports = router;