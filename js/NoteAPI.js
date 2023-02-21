// const notes = [
//   {
//     id: 1,
//     title: "first note",
//     body: "some text",
//     updated: "2023-01-13T21:29:55.546Z",
//   },
//   {
//     id: 2,
//     title: "second note",
//     body: "some text",
//     updated: "2023-01-13T21:30:19.976Z",
//   },
// ];

export default class NoteAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }
  static saveNote(noteToSave) {
    const notes = NoteAPI.getAllNotes();

    const existedNote = notes.find((n) => n.id == noteToSave.id);

    if (existedNote) {
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
      existedNote.updated = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      // getTime return a spesfic number do good for id
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }
  static deleteNote(id) {
    const notes = NoteAPI.getAllNotes();
    const filteredNotes = notes.filter((n) => n.id != id);
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}
