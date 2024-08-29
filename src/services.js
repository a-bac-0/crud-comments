// * por orden de dificultad

// 1º READ - GET
// 2º DELETE - DELETE
// 3º CREATE - POST
// 4º UPDATE - PUT

const API_URL = "http://localhost:3000/comments"

// * los invertimos para formar CRUD ---NO ES NECESARIO--
// 3º CREATE - POST

// 

async function updateComment() {
    const form = document.getElementById('addNewComment')
    const product_data = document.getElementByName('product').value;
    const newComment = {
        "name": form.name.value,
        "product": product_data,
        "description": form.description.value
    }

    if (form.name.value||product_data||form.description.value) {
        return alert("All fields requirednpm r")
    }
    // const commentInput = document.getElementById("newComment");
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newComment)
    })

    if (response.ok) {
        printComments()
    }
}
    // const data = (await response).json() //transforma los datos a json
    // if (response.ok) {
    //     renderTask
        
    // }
    // return data


// 1º READ - GET
async function getAllComments() {
    const response = await fetch (API_URL, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
    })
    const data = (await response).json() //transforma los datos a json
    return data
}

const listTag = document.getElementById('commentsList')

// 1.0 PRINT ---SE REUTILIZA MÁS ADELANTE
async function printComments(){
    const comments = await getAllComments()
    listTag.innerHTML = '';
    comments.map((comment) => {
        listTag.innerHTML += `<li>
            
            <p>${comment.name}</p>
            <p>${comment.product}</p>
            <p>${comment.description}</p>
            <button onclick = "updateComment(${comment.id}, { name: "Your Alias", product: "Your Purchase", description: "Tell us more"})">Update</button>
            <button onclick = "deleteComment('${comment.id}')">Delete</button>
        </li>`
    })
}

printComments()

// 4º UPDATE - PUT
async function updateComment(commentId) {
    const form = document.getElementById('updateCommentForm');
    const product_data = document.getElementsByName('product')[0].value;
    const updatedComment = {
        "name": form.name.value,
        "product": product_data,
        "description": form.description.value
    };

    if (!form.name.value || !product_data || !form.description.value) {
        return alert("All fields are required");
    }
    // const commentInput = document.getElementById("newComment");
    const response = await fetch(`${API_URL}/${commentId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newComment)
    })

    if (response.ok) {
        printComments();
    } else {
        console.error('Error al actualizar el comentario:', response.statusText);
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



