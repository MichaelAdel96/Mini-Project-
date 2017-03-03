let User=require('../models/User');
var sessionUser;


let projectController = {

     main:function(req, res){
        
         res.render('main',{flag:false,sp:false});
     },
    
    
    signup:function(req, res){
        
          res.render('signup',{flag:false});

    },
    first:function(req, res){
        
        
        try {
           sessionUser.image=req.file.originalname;  
        } catch (error) {
           sessionUser.image="default.png";            
        }

        sessionUser.portoname=req.body.portfolioname;
        

        res.render('second');

    },
    second:function(req, res){
        
    User.findOne({username:sessionUser.username},function(err,user){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{
             var x =1;
             var on="";

            try {
              on=req.file.originalname;
              x=req.body.chose;            
            } catch (error) {
                
            }

        console.log(sessionUser.portoname);


            
        user.portofolioname=sessionUser.portoname ;
        user.image=sessionUser.image  ;
        user.work.push({title:req.body.title,chose:x,url:req.body.url,screenshot:on,code:("file:///"+on)});
        user.save(function(err){});

          console.log(user);
          res.render('home', {user,person:sessionUser.username});
            
            
             }

       })

    },

    visitor:function(req, res){
        
        User.find({work: { $gt: [] } },function(err, users){


       var sum=0;
        for(var x=0;x<users.length;x++){
            
            sum=sum+users[x].work.length;
        }

       var a = Math.ceil((users.length/10) );

        var page="page 1 from "+a;
        if(users.length==0)
           page="page 0 from "+0;
          
            if(err)
                res.send(err.message);
            else
                res.render('visitor', {users,num:0,sum:sum,page:page});
        })

    },
    visitor2:function(req, res){
        
        User.find({work: { $gt: [] } },function(err, users){

        var sum=0;
        for(var x=0;x<users.length;x++){
            
            sum=sum+users[x].work.length;
        }
        var a = Math.ceil((users.length/10) );

        var page="page "+( (req.body.num/10) +1)+" from "+a;

          
            if(err)
                res.send(err.message);
            else
                res.render('visitor', {users,num:req.body.num,sum:sum,page:page});
        })

    },    

    createProject:function(req, res){
  
       
    User.findOne({username:sessionUser.username},function(err,user){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{


             var x =1;
             var on="";

            try {
              on=req.file.originalname;
              x=req.body.chose;            
            } catch (error) {
                
            }

                  
        user.work.push({title:req.body.title,chose:x,url:req.body.url,screenshot:on,code:("file:///"+on)});
        user.save(function(err){});
                 
                // console.log(user);
                // console.log(user.work.length);
                
                res.render('home', {user,person:sessionUser.username});
            }
       
       })
    },
        createUser:function(req, res){
        let user = new User(req.body);
           


        user.save(function(err, user){
            if(err){
               res.render('signup',{flag:true})
              //  console.log(err);
            }
            else{

             //   console.log(user);
            res.render('main',{flag:false,sp:true});  
            }
        })
    },
    login:function(req,res){
    

    
    User.findOne({username:req.body.username,password:req.body.password},function(err,user){
     
     
       if(err){
           res.send(err.message);
    }else {
        if(!user){
            res.render('main',{flag:true,sp:false});           
         }else {

             sessionUser=req.session;
             sessionUser.username=req.body.username ;
             console.log(user);


             if(user.work.length==0)
                 res.render('first',{user,person:req.body.username})   
             else
                res.render('home',{user,person:req.body.username})
         }
   }


        })
    }
}

module.exports = projectController;
