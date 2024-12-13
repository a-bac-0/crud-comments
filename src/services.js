// * por orden de dificultad

// 1º READ - GET
// 2º DELETE - DELETE
// 3º CREATE - POST
// 4º UPDATE - PUT

const API_URL = "http://localhost:3000/comments"

// * los invertimos para formar CRUD ---NO ES NECESARIO--
// 3º CREATE - POST

// 

async function createComment() {
    // Obtenemos el formulario
    const form = document.getElementById('addNewComment');
    if (!form) {
        console.error("Formulario 'addNewComment' no encontrado");
        return;
    }

    // Obtenemos los valores de los campos
    const product_data = document.getElementsByName('product')[0]?.value; // Aseguramos el acceso con "?."
    const newComment = {
        name: form.name.value.trim(),
        product: product_data?.trim(),
        description: form.description.value.trim(),
    };

    // Validamos los campos: si alguno está vacío, mostramos alerta
    if (!newComment.name || !newComment.product || !newComment.description) {
        return alert("All fields are required");
    }

    try {
        // Enviamos el comentario al servidor
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newComment),
        });

        if (response.ok) {
            alert("Comment created successfully!");
            printComments(); // Refresca la lista de comentarios
            form.reset(); // Limpia el formulario
        } else {
            console.error("Error al crear el comentario:", response.statusText);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
}


// 1º READ - GET
async function getAllComments() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // transforma los datos a JSON
        return data;
    } catch (error) {
        console.error("Error al obtener los comentarios:", error);
        return []; // Retorna un arreglo vacío en caso de error
    }
}

const listTag = document.getElementById('commentsList');

// Verifica si el elemento existe en el DOM
if (!listTag) {
    console.error("Elemento 'commentsList' no encontrado en el DOM");
}

// 1.0 PRINT ---SE REUTILIZA MÁS ADELANTE

function loadCommentData(commentId, name, product, description) {
   
    const form = document.getElementById("updateCommentForm");
    form.name.value = name;
    form.product.value = product;
    form.description.value = description;
  
    const saveButton = document.getElementById("saveCommentButton");
    saveButton.onclick = () => updateComment(commentId);
  }

async function printComments() {
    const comments = await getAllComments();
    const commentsList = document.getElementById("commentsList");
  
    commentsList.innerHTML = ""; // Limpia la lista antes de renderizar
  
    comments.forEach((comment) => {
      commentsList.innerHTML += `
        <li id="comment-${comment.id}">
          <p><strong>${comment.name}</strong></p>
          <p>${comment.product}</p>
          <p>${comment.description}</p>
          <button onclick="loadCommentData(${comment.id}, '${comment.name}', '${comment.product}', '${comment.description}')">Edit</button>
          <button onclick="deleteComment(${comment.id})">Delete</button>
        </li>
      `;
    });
  }

printComments()

// 4º UPDATE - PUT
async function updateComment(commentId) {
    const form = document.getElementById("updateCommentForm");
  
    const updatedComment = {
      name: form.name.value.trim(),
      product: form.product.value.trim(),
      description: form.description.value.trim(),
    };
  
    if (!updatedComment.name || !updatedComment.product || !updatedComment.description) {
      return alert("All fields are required");
    }
  
    try {
      const response = await fetch(`${API_URL}/${commentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedComment),
      });
  
      if (response.ok) {
        alert("Comment updated successfully!");
        printComments(); // Refresca la lista de comentarios
        form.reset(); // Limpia el formulario después de la edición
      } else {
        console.error("Error al actualizar el comentario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al actualizar el comentario:", error);
    }
  }

// 2º DELETE - DELETE
async function deleteComment(id) {
    const response = await fetch(API_URL + `/${id}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
    })

    const deletedComment = await response.json()

    if(response.ok) {
        printComments() //para refrescar después de eliminar
    }

    return deletedComment
}



