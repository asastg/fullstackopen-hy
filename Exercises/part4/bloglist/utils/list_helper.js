const _ = require('lodash')
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

const mostBlog = (collection) => {
  const authors = () => _.map(collection, 'author')
  const countAuthors = _.countBy(authors())
  const keys = Object.keys(countAuthors)
  const author = _.maxBy(keys, (o) => countAuthors[o])
  const object = {
    author: author,
    blogs: countAuthors[author],
  }
  return object
}

const mostLikes = (collection) => {
  const countAuthors = _.countBy(_.map(collection, 'author'))
  const authors = Object.keys(countAuthors)
  const authorsLikes = authors.map((author) => {
    return {
      author: author,
      likes: 0,
    }
  })
  for (let i = 0; i < authorsLikes.length; i++) {
    for (let j = 0; j < collection.length; j++) {
      if (authorsLikes[i].author === collection[j].author) {
        authorsLikes[i].likes += collection[j].likes
      }
    }
  }
  let most = {}
  for (let i = 0; i < authorsLikes.length - 1; i++) {
    if (authorsLikes[i].likes < authorsLikes[i + 1].likes) most = authorsLikes[i + 1]
  }
  return most
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes,
}
