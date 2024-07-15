
const newBlogPostForm = document.getElementById('new-blog-post-form');

newBlogPostForm.addEventListener('submit', (e) => {
  e.preventDefault();


  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;


  const blogPost = {
    title: title,
    content: content
  };

  fetch('/api/blog-posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(blogPost)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
 
    window.location.href = '/blog';
  })
  .catch(error => {
    console.error(error);
  });
});


const blogPostEditor = document.getElementById('blog-post-editor');


blogPostEditor.addEventListener('click', (e) => {
  e.preventDefault();


  const blogPostId = blogPostEditor.dataset.blogPostId;


  const content = document.getElementById('editor').value;

  fetch(`/api/blog-posts/${blogPostId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: content })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    window.location.href = '/blog';
  })
  .catch(error => {
    console.error(error);
  });
});