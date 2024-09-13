import { Component, EventEmitter, inject, Inject, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NotesService } from "../notes.service";
import { INewNote } from "../intefaces/note.interface";


@Component({
    standalone: true,
    selector: 'NoteModal',
    templateUrl: './note-modal.component.html',
    styleUrls: ['./note-modal.component.scss'],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        CommonModule,
    ],
})
export class NoteModalComponent {
    @Output() cancelEmitter = new EventEmitter();

    constructor(
        public formBuilder: FormBuilder,
        private readonly notesService: NotesService,
    ) {
        this.noteForm = formBuilder.group({
            title: [''],
            content: ['']
        });
    }

    public noteForm!: FormGroup;


    addNote() {
        const controls = this.noteForm.controls
        if (!controls['title'].value && !controls['content'].value) {
            return;
        }

        const newNote: INewNote = {
            title: controls['title'].value,
            content: controls['content'].value
        }

        this.notesService.addNote(newNote);

        this.cancel();
    }

    cancel() {
        this.cancelEmitter.emit()
    }
}
