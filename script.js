async function fetchNotes() {
    const res = await fetch("/notes");
    const notes = await res.json();

    const list = document.getElementById("notesList");
    list.innerHTML = "";

    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${note} 
        <button onclick="deleteNote(${index})">Delete</button>`;
        list.appendChild(li);
    });
}

async function addNote() {
    const input = document.getElementById("noteInput");
    await fetch("/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.value })
    });

    input.value = "";
    fetchNotes();
}

async function deleteNote(index) {
    await fetch(`/notes/${index}`, { method: "DELETE" });
    fetchNotes();
}

fetchNotes();