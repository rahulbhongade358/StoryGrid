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
    const publishedBlogs= await Blog.findOneAndUpdate({slug:slug},{status:"PUBLISHED"});
    res.status(201).json({
        success:true,
        data:publishedBlogs,
        message:"Blog Published Successfully"
    })
}
export {postBlog,getBlog,getBlogForSlug ,patchPublishBlog}