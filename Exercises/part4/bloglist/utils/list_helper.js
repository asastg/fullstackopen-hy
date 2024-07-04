const dummy = () => {
  return 1
}
const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
  let like = 0
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > like) {
      like = blogs[i].likes
    }
  }
  const blog = blogs.find((blog) => blog.likes === like)
  const newBlog = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  }
  return newBlog
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
