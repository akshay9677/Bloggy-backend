const router = require("express").Router();
let Blog = require("../models/blog.model");

router.route("/").get((req,res)=>{
    Blog.find()
    .then(blogs => res.json(blogs))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route("/add").post((req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const likes = 0;
  
    const newBlog = new Blog({
        title,
        body,
        likes
    });
  
    newBlog.save(function(err){
        if(!err){
            res.json("Blog Added!");
        }else{
            res.status(400).json("Error :"+ err);
        }
    })
    //   .then(() => res.json('Blog added!'))
    //   .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route("/find").get((req,res)=>{
    Blog.find(function(err,blog){
        if(!err){
            res.json(blog);
        }else{
            res.status(400).json('Error: ' + err);
        }
    })
  
})

router.route("/:id").put((req,res)=>{
   
    Blog.findById(req.params.id,function(err,blog){
        blog.likes +=1 ;
      
        
      
        blog.save(function(err){
            if(!err){
                res.json("Liked");
            }else{
                res.status(400).json("Error :"+ err);
            }
        })

    })

    
})
  
  router.route("/:id").get((req,res)=>{
    Blog.findById(req.params.id,function(err,blog){
        if(!err){
            res.json(blog);
        }else{
            res.status(400).json('Error: ' + err);
        }
    })
    
})

  router.route("/:id").delete((req,res)=>{
      Blog.findByIdAndDelete(req.params.id,function(err){
             if(!err){
                 res.json("Blog Deleted");
             }else{
                 res.status(400).json("Error: "+ err);
             }
      })
    //   .then(() => res.json('Blog Deleted!'))
    //   .catch(err => res.status(400).json('Error: ' + err));
  })
  
  module.exports = router;