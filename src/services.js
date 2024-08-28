// * por orden de dificultad

// 1º READ - GET
// 2º DELETE - DELETE
// 3º CREATE - POST
// 4º UPDATE - PUT

const API_URL = "http://localhost:3000/comments"

// * los invertimos para formar CRUD ---NO ES NECESARIO--
// 3º CREATE - POST
async function createComment(params) {
    
}


// 1º READ - GET
async function getAllComments() {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
    })
    const data = (await response).json() //transforma los datos a json
    return data
}

const listTag = document.getElementById('commentsList')

async function printComment() {
    const comments = await getAllComments ()
    comments.map ((comment) => {
        listTag.innerHTML += `<li>
            <p>${comment.id}</p>
            <p>${comment.name}</p>
            <p>${comment.product}</p>
            <p>${comment.description}</p>
        </li>`
    })
}

printComment()

// 4º UPDATE - PUT
async function updateComment(params) {
    
}


// 2º DELETE - DELETE
async function deleteComment(params) {
    
}



