/*
* File: app.js
* Author: Kriston Attila
* Copyright: 2024, Kriston Attila
* Group: Szoft I/1/N
* Date: 2024-05-07
* Github: https://github.com/atekthebro/
* Licenc: GNU GPL
*/

const doc = {
    booksBody: document.querySelector("#booksBody"),
    addButton: document.querySelector("#addButton"),
    idInput: document.querySelector("#id"),
    cimInput: document.querySelector("#cim"),
    szerzoInput: document.querySelector("#szerzo"),
    arInput: document.querySelector("#ar")
}

const state = {
    url: 'http://localhost:8000/books',
    cim: 'névtelen',
    szerzo: 'ismeretlen',
    ar: 300,
    add: true
}


doc.addButton.addEventListener('click', () => {
    console.log('Hozzáadás')
    
    getDataFromForm()
    createBooks()
    deleteModelContent()
    getBooks()
})

function startAdding(){
    deleteModelContent()
}

function getDataFromForm() {
    state.cim = doc.cimInput.value
    state.szerzo = doc.szerzoInput.value
    state.ar = doc.arInput.value
}

function createBooks() {
    fetch(state.url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            cim: state.cim,
            szerzo: state.szerzo,
            ar: state.ar
        })
    })
}

function getBooks() {
    fetch(state.url)
    .then( response => response.json())
    .then(result => {
        // console.log(result)
        clearTableContent()
        renderBooks(result)
    })
}

function renderBooks(booklist) {
    
    booklist.forEach(book => {
        console.log(book.ar)
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.cim}</td>
            <td>${book.szerzo}</td>
            <td>${book.ar}</td>
            <td>
                <button 
                    class="btn btn-primary"
                    data-id = "${book.id}"
                    data-cim = "${book.cim}"
                    data-szerzo = "${book.szerzo}"
                    data-ar = "${book.ar}"
                    data-bs-toggle="modal" data-bs-target="#operatorModal"
                    onclick="startEdit(this)">
                    <i class="bi bi-pen"></i>
                </button>
                <button
                    class="btn btn-danger" onclick="startDelete(${book.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `
        doc.booksBody.appendChild(row)
    });
    
}

function deleteModelContent(){
    doc.idInput.value = ''
    doc.cimInput.value = ''
    doc.szerzoInput.value = ''
    doc.arInput.value = ''
}

function clearTableContent(){
    doc.booksBody.textContent = ''
}

function startDelete(id){
    deleteBooks(id)
    getBooks()
}

function deleteBooks(id){
    let newUrl= state.url + '/'+id
    fetch(newUrl, {
        method: 'delete'
    })

}

function startEdit(source){
    doc.idInput.value = source.dataset.id
    doc.cimInput.value = source.dataset.cim
    doc.szerzoInput.value = source.dataset.szerzo
    doc.arInput.value = source.dataset.ar

}

getBooks()