function dummy(blogs) {
  return 1;
}

function totalLikes(blogs) {
  return blogs.reduce((acc, curr) => (curr.likes ? acc + curr.likes : acc), 0);
}

function favoriteBlog(blogs) {
  if (blogs.length === 0) {
    return null;
  }
  return blogs.reduce(
    (acc, curr) =>
      (curr.likes ? curr.likes : -Infinity) >
      (acc.likes ? acc.likes : -Infinity)
        ? curr
        : acc,
    blogs[0]
  );
}

function mostBlogs(blogs) {
  if (blogs.length === 0) {
    return null;
  }
  const authors = {};
  blogs.forEach((b) => {
    if (b.author) {
      authors[b.author] ? (authors[b.author] += 1) : (authors[b.author] = 1);
    }
  });
  let mostPostingAuthor = "";
  let numberOfBlogs = -Infinity;
  for (const [author, nblogs] of Object.entries(authors)) {
    if (nblogs > numberOfBlogs) {
      mostPostingAuthor = author;
      numberOfBlogs = nblogs;
    }
  }
  return { author: mostPostingAuthor, blogs: numberOfBlogs };
}

function mostLikes(blogs) {
  if (blogs.length === 0) {
    return null;
  }
  const authors = {};
  blogs.forEach((b) => {
    if (b.author) {
      if (b.likes)
        authors[b.author]
          ? (authors[b.author] += b.likes)
          : (authors[b.author] = b.likes);
    }
  });
  let mostLikedAuthor = "";
  let mostLikes = -Infinity;
  for (const [author, likes] of Object.entries(authors)) {
    if (likes > mostLikes) {
      mostLikedAuthor = author;
      mostLikes = likes;
    }
  }
  return { author: mostLikedAuthor, likes: mostLikes };
}

export { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
