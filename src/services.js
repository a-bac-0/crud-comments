const API_URL = "http://localhost:3000/comments";
const form = document.getElementById("form");
const listTag = document.getElementById("commentsList");
let currentEditingCommentId = null;



//GET

async function getAllComments() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}


//se usa más adelante

async function printComments() {
  const comments = await getAllComments();
  listTag.innerHTML = "";
  
  comments.forEach((comment) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <p><strong>${comment.name}</strong></p>
      <p>${comment.product}</p>
      <p>${comment.description}</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;
    
    // Cambia el botón
    li.querySelector('.edit-btn').addEventListener('click', () => {
      currentEditingCommentId = comment.id;
      form.name.value = comment.name;
      form.product.value = comment.product;
      form.description.value = comment.description;
      
      const submitButton = form.querySelector('button');
      submitButton.textContent = 'Update Comment';
    });
    
    // Delete button event listener
    li.querySelector('.delete-btn').addEventListener('click', () => deleteComment(comment.id));
    
    listTag.appendChild(li);
  });
}


//CREATE -

async function createComment(event) {
  event.preventDefault();
  
  const newComment = {
    name: form.name.value.trim(),
    product: form.product.value.trim(),
    description: form.description.value.trim(),
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });

    if (response.ok) {
      form.reset();
      await printComments();
    } else {
      console.error("Error creating comment:", response.statusText);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}



//UPDATE-EDIT ...P

async function updateComment(event) {
  event.preventDefault();
  
  if (!currentEditingCommentId) return;

  const updatedComment = {
    name: form.name.value.trim(),
    product: form.product.value.trim(),
    description: form.description.value.trim(),
  };

  try {
    const response = await fetch(`${API_URL}/${currentEditingCommentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedComment),
    });

    if (response.ok) {
      form.reset();
      currentEditingCommentId = null;
      const submitButton = form.querySelector('button');
      submitButton.textContent = 'Add Comment';
      await printComments();
    } else {
      console.error("Error updating comment:", response.statusText);
    }
  } catch (error) {
    console.error("Network error during update:", error);
  }
}


//DELETE


async function deleteComment(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      await printComments();
    } else {
      console.error("Error deleting comment:", response.statusText);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

// Pendiente de lo que recibe
form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  if (currentEditingCommentId) {
    updateComment(event);
  } else {
    createComment(event);
  }
});

printComments();