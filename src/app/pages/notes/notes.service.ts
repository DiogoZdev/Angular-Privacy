import {Injectable} from "@angular/core";
import { INewNote, INote } from "./intefaces/note.interface";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NotesService {
    private notesList = new BehaviorSubject<INote[]>([]);

    private getNotes(): INote[] {
        return this.notesList.getValue();
    }

    public watchNotes(): Observable<INote[]> {
        return this.notesList.asObservable();
    }

    public addNote(note: INewNote) {
        const id = new Date().getTime().toString()
        this.notesList.next([...this.getNotes(), { id, ...note }] as INote[]);
    }

    public resolveNote(id: string): void {
        const notes = this.getNotes()
        const index = notes.findIndex(note => note.id === id)

        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()
        const seconds = new Date().getSeconds()
        const time = `${hours}:${minutes}:${seconds}`

        notes[index] = { ...notes[index], resolved: time }
        this.notesList.next(notes)
    }

    public deleteNote(id: string): void {
        this.notesList.next(this.getNotes().filter(note => note.id !== id))
    }

    public updateNote(id: string, note: INote): void {
        const notes = this.getNotes()
        const index = notes.findIndex(note => note.id === id)

        notes[index] = { ...note }
        this.notesList.next(notes)
    }
}


