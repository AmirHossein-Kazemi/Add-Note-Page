import NoteAPI from "./NoteAPI.js";
import NotesView from "./NotesView.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());
    this._refreshNotes();
  }

  _refreshNotes() {
    const notes = NoteAPI.getAllNotes();
    // set notes
    this._setNotes(notes);
    // set actives note
    if (notes.length > 0) {
      this._setActiveNotes(notes[0]);
    }
  }

  _setActiveNotes(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }

  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }

  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: "title",
          body: "note",
        };
        NoteAPI.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (newTitle, newBody) => {
        NoteAPI.saveNote({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        });
        this._refreshNotes();
      },
      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find((n) => n.id == noteId);
        this._setActiveNotes(selectedNote);
      },
      onNoteDelete: (noteId) => {
        NoteAPI.deleteNote(noteId);
        this._refreshNotes();
      },
    };
  }
}
