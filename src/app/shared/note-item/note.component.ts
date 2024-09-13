import { Component, EventEmitter, Input, Output } from "@angular/core";
import { INote } from "../../pages/notes/intefaces/note.interface";
import { CommonModule } from "@angular/common";
import { Dialog, DialogModule } from "@angular/cdk/dialog";
import { NoteModalComponent } from "../../pages/notes/modals/note-modal.component";

@Component({
    standalone: true,
    selector: 'Note',
    imports: [CommonModule, DialogModule],
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']
})
export class NoteComponent {

    @Input() note!: INote;
    @Output() deleteEmitter = new EventEmitter<string>();
    @Output() resolveEmitter = new EventEmitter();
    public showsOptions = false;

    constructor(
        private readonly dialog: Dialog
    ) {}

    toggleOptions() {
        this.showsOptions = !this.showsOptions
    }

    edit(id: string) {
        this.dialog.open(NoteModalComponent, {
            data: {
                note: this.note
            }
        })
    }

    delete() {
        this.deleteEmitter.emit(this.note.id)
    }

    resolve() {
        this.resolveEmitter.emit();
        this.showsOptions = false;
    }
}
