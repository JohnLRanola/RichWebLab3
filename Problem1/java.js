
const notesContainer = document.getElementById("notes");
const addNoteButton = document.getElementById("btn");
var colors = ["red", "pink", "yellow", "blue"];
var colorPicker = document.getElementById("color");

function getNotes() {
    return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}


function createNote(id, title, content, color) {
    const noteElement = document.createElement("li");
    noteElement.dataset.id = id; 
    noteElement.style.backgroundColor = color;
    noteElement.style.position = "relative";
    
    const titleElement = document.createElement("div");
    titleElement.textContent = title;
    noteElement.appendChild(titleElement);

    const breakElement = document.createElement("br");
    noteElement.appendChild(breakElement);

    const contentElement = document.createElement("div");
    contentElement.textContent = content;
    noteElement.appendChild(contentElement);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.position = "absolute";
    deleteButton.style.top = "10px";
    deleteButton.style.right = "10px";
    deleteButton.addEventListener("click", function() {
        deleteNote(id);
    });
    noteElement.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.style.position = "absolute";
    editButton.style.bottom = "10px";
    editButton.style.left = "10px";
    editButton.addEventListener("click", function() {
        editNote(id);
    });
    noteElement.appendChild(editButton);

    return noteElement;
}

function addNote() {
    const title = document.getElementById("title").value;
    const message = document.getElementById("message").value;
    const color = colorPicker.value;

    const notes = getNotes();

    // gets the last id used from local storage, or 0 if it doesn't exist
    let lastId = parseInt(localStorage.getItem("lastId") || "0");

    const noteObject = {
        id: lastId + 1, // increments the id by 1
        title: title,
        content: message,
        color: color
    };

    // saves the new last id to local storage
    localStorage.setItem("lastId", noteObject.id.toString());

    // creates new note element
    const noteElement = createNote(noteObject.id, noteObject.title, noteObject.content, noteObject.color);

    // adds note to the top of the list
    notesContainer.insertBefore(noteElement, notesContainer.firstChild);

    notes.unshift(noteObject);
    saveNotes(notes);
}

function deleteNote(id) {
    const notes = getNotes();
    const newNotes = notes.filter(note => note.id !== id);
    saveNotes(newNotes);

    // remove the note element from the page
    const noteElement = document.querySelector(`li[data-id='${id}']`);
    if (noteElement) {
        noteElement.remove();
    }
}

function editNote(id) {
    const notes = getNotes();
    const note = notes.find(note => note.id === id);

    document.getElementById("title").value = note.title;
    document.getElementById("message").value = note.content;
    colorPicker.value = note.color;

    addNoteButton.textContent = "Update";
    addNoteButton.removeEventListener("click", addNote);
    addNoteButton.addEventListener("click", function() {
        updateNote(id);
    });
}

function updateNote(id) {
    const notes = getNotes();
    const noteIndex = notes.findIndex(note => note.id === id);

    notes[noteIndex].title = document.getElementById("title").value;
    notes[noteIndex].content = document.getElementById("message").value;
    notes[noteIndex].color = colorPicker.value;

    saveNotes(notes);
    location.reload();
}

// adds new note when button is clicked
addNoteButton.addEventListener("click", addNote);

// displays to user when called
getNotes().forEach(note => {
    const noteElement = createNote(note.id, note.title, note.content, note.color);
    notesContainer.insertBefore(noteElement, notesContainer.firstChild);
});