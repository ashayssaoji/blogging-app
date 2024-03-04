// Get references to HTML elements
const blogList = document.getElementById("blogList");
const blogDetails = document.getElementById("blogDetails");
const createBlogButton = document.getElementById("createBlog");

// Sample data (you can replace this with your actual JSON data)
let blogs = [];

// Load blogs from your JSON file
const loadBlogs = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "blogs.json", true);

    xhr.onload = () => {
        if (xhr.status === 200) {
            blogs = JSON.parse(xhr.responseText).blogs;
            displayBlogs(blogs);
        } else {
            console.error("Failed to load blogs");
        }
    };

    xhr.send();
};

// Function to display blogs 
const displayBlogs = (blogs) => {
    // Clear the existing blog list
    blogList.innerHTML = "";

    // Loop through each blog and create a UI element for it
    blogs.forEach((blog, index) => {
        // Create a new div element to represent the blog item
        const blogItem = document.createElement("div");
        blogItem.classList.add("blog-item");
        blogItem.innerHTML =
            `<h3>${blog.title}</h3>
             <p style="display: none;">${blog.content}</p>
            <p class="author">Author: ${blog.author}</p>
            <p class="date">Created: ${blog.creationDate}</p>
            <button class="expand-button" data-index="${index}">Expand</button>
            <button class="update-button" data-index="${index}">Update</button>`;

            // Append the blog item to the blog list
        blogList.appendChild(blogItem);

        // Add click event listener to expand button
        const expandButton = blogItem.querySelector(".expand-button");
        expandButton.addEventListener("click", () => {
             // Get the content element within the blog item
            const contentElement = blogItem.querySelector("p");
            if (contentElement.style.display === "none" || contentElement.style.display === "") {
                  // Show the content with a transition effect
                contentElement.style.display = "block";
                // Apply a transition class for animation
                setTimeout(() => { contentElement.classList.add("transition-effect"); }, 0);
            } else {
                // Hide the content and remove the transition class
                contentElement.style.display = "none";
                contentElement.classList.remove("transition-effect");
            }
        });
       
        // Add click event listener to update button
        const updateButton = blogItem.querySelector(".update-button");
        updateButton.addEventListener("click", () => {
            openUpdateForm(blog, index);
        });
    });
};

// Display blogs
loadBlogs();

// Function to open a form for creating a new blog
const openCreateForm = () => {
    blogDetails.innerHTML = `
        <h2>Create a New Blog</h2>
        <form id="createBlogForm">
            <label for="newTitle">Title:</label>
            <input type="text" id="newTitle" placeholder="New Blog Title" required><br>
            <label for="newContent">Content:</label>
            <textarea id="newContent" placeholder="New Blog Content" required></textarea><br>
            <label for="newAuthor">Author:</label>
            <input type="text" id="newAuthor" placeholder="Your Name" required><br>
            <button type="submit">Create</button>
        </form>
    `;

    // Add an event listener to the create blog form
    const createBlogForm = blogDetails.querySelector("#createBlogForm");
    createBlogForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // Get the values from the form fields
        const newTitle = createBlogForm.querySelector("#newTitle").value;
        const newContent = createBlogForm.querySelector("#newContent").value;
        const newAuthor = createBlogForm.querySelector("#newAuthor").value;


        // Create a new blog object
        const newBlog = {
            title: newTitle,
            content: newContent,
            author: newAuthor,
            creationDate: new Date().toLocaleDateString(),
        };

         // Add the new blog to the list
        blogs.push(newBlog);
        // Redisplay the updated list of blogs
        displayBlogs(blogs);
    });
};

// Event listener for the "Create blog" button
createBlogButton.addEventListener("click", openCreateForm);

// Function to open a form for updating an existing blog
const openUpdateForm = (blog, index) => {
    blogDetails.innerHTML = `
        <h2>Update Blog</h2>
        <form id="updateBlogForm">
            <label for="updateContent">Content:</label>
            <textarea id="updateContent" required>${blog.content}</textarea><br>
            <label for="updateAuthor">Author:</label>
            <input type="text" id="updateAuthor" value="${blog.author}" required><br>
            <button type="submit">Update</button>
        </form>
    `;

    // Add an event listener to the update blog form

    const updateBlogForm = blogDetails.querySelector("#updateBlogForm");
    updateBlogForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // get the updated content and author values from the form
        const updatedContent = updateBlogForm.querySelector("#updateContent").value;
        const updatedAuthor = updateBlogForm.querySelector("#updateAuthor").value;

        blog.content = updatedContent;
        blog.author = updatedAuthor;
         // Redisplay the updated list of blogs
        displayBlogs(blogs);
    });
};
// this is the greatest one till now for sureeeee

