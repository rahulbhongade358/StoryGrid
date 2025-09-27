import Blog from "./../models/Blog.js"

const postBlog = async(req,res)=>{
    const {title,content,category,author}=req.body

    if(!title,!content,!category,!author){
        return res.json({
            success:false,
            message:"All fields are required"
        })
    }

    const newBlog = new Blog({title,content,category,author,slug:`Temp-Slug-${Date.now()}-${Math.random().toString()}`})
    const savedBlog = await newBlog.save()
    savedBlog.slug = `${ title.toLowerCase().replace(/ /g, "-")}-${savedBlog._id}`.replace(/[^\w-]+/g,"");
    await savedBlog.save()
    res.status(201).json({
        success:true,
        data:savedBlog,
        message:"Your Blog is saved for Publishied"
    })
}
export {postBlog}