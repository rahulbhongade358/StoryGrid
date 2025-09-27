import Blog from "./../models/Blog.js"

const postBlog = async(req,res)=>{
    const {title,content,category,author}=req.body

    if(!title,!content,!category,!author){
        return res.json({
            success:false,
            message:"All fields are required"
        })
    }

    const newBlog = new Blog({title,content,category,author})
    const savedBlog = await newBlog.save()

    res.status(201).json({
        success:true,
        data:savedBlog,
        message:"Your Blog is saved for Publishied"
    })
}
export {postBlog}