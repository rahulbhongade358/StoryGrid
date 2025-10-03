import JWT from "jsonwebtoken";
import Blog from "./../models/Blog.js"

const postBlog = async(req,res)=>{
    const {title,content,category}=req.body
   const {decodedUser}=req
   console.log(decodedUser)
    if(!title,!content,!category){
        return res.json({
            success:false,
            message:"All fields are required"
        })
    }

    const newBlog = new Blog({
      title,
      content,
      category,
      author: decodedUser?._id,
      slug: `Temp-Slug-${Date.now()}-${Math.random().toString()}`,
    });
    const savedBlog = await newBlog.save();
    savedBlog.slug = `${title.toLowerCase().replace(/ /g, "-")}-${
      savedBlog._id
    }`.replace(/[^\w-]+/g, "");
    await savedBlog.save();
    res.status(201).json({
      success: true,
      data: savedBlog,
      message: "Your Blog is saved for Publishied",
    });
}
const getBlog = async(req,res)=>{
    const {author}=req.query
    const conditions = [{status:"PUBLISHED"}]
    if (author) {
        conditions.push({author:author})
    }
    const blogs= await Blog.find({$or:conditions}).populate("author","_id name email").sort(
        {
            status: 1,
      updatedAt: -1,
        }
    );

    res.status(200).json({
        success:true,
        data:blogs,
        message:"Blogs fetched Successfully"
    })
}
const getBlogForSlug=async(req,res)=>{
    const {slug} = req.params
    const blog = await Blog.findOne({slug:slug}).populate("author","_id name email");
    if (!blog) {
        return res.status(404).json({
            success:false,
            message:"Blog not found "
        })        
    }
    res.status(201).json({
        success:true,
        data:blog,
        message:"Blog Fetched Successfully"
    })
}
const patchPublishBlog=async(req,res)=>{
    const {slug}=req.params
    const {decodedUser}=req

    const blog = await Blog.findOne({slug:slug})
    if (!blog) {
        return res.status(401).json({
            success:false,
            message:"Blog NOt Found"
        })
    }

    if (blog.author.toString()!==decodedUser?._id){
        return res.status(403).json({
            success:false,
            message:"You are not authorized to publish this blog"
        })
    }
    const publishedBlogs= await Blog.findOneAndUpdate({slug:slug},{status:"PUBLISHED"});
    res.status(201).json({
        success:true,
        data:publishedBlogs,
        message:"Blog Published Successfully"
    })
}
const putBlog=async(req,res)=>{
    const {slug} = req.params
    const { title, content,category}=req.body
    const {decodedUser}=req;
    
    

    const existingBlog = await Blog.findOne({slug:slug})
    if(!existingBlog){
        return res.status(404).json({
            success:false,
            message:"Blog not Found"
        })
    }
    if (existingBlog.author.toString() !== decodedUser._id) {
        return res.status(403).json({
            success:false,
            message:"You are not eligable to update this blog"
        })
    }

    if( !title || !content || !category){
        return res.status(400).json({
            success:false,
            message:"All fields are required "
        })
    }
    const updateBlog = await Blog.findOneAndUpdate({slug:slug}, {  title, content,category,})
     return res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    blog: updateBlog,
  });
}
export {postBlog,getBlog,getBlogForSlug ,patchPublishBlog,putBlog}