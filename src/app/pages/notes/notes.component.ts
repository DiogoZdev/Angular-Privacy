import { Component, OnDestroy } from '@angular/core';
import { NotesService } from "./notes.service";
import { Dialog, DialogModule } from "@angular/cdk/dialog";
import { NoteModalComponent } from './modals/note-modal.component';
import { INote } from './intefaces/note.interface';
import { CommonModule } from '@angular/common';
import { NoteComponent } from '../../shared/note-item/note.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-notes',
    standalone: true,
    imports: [DialogModule, CommonModule, NoteComponent],
    templateUrl: './notes.component.html',
    styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnDestroy {
    public notes: INote[] = [];
    private unsubscribeAll = new Subject<void>();

    constructor(
        private readonly notesService: NotesService,
        private readonly dialog: Dialog,
    ) {
        this.notesService.watchNotes()
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((notes) => {
                this.notes = notes
            })
    }

    openNoteModal() {
        const modal = this.dialog.open(NoteModalComponent)

        modal.componentInstance?.cancelEmitter
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(() => {
                modal.close()
            })
    }

    deleteNote(id: string) {
        this.notesService.deleteNote(id)
    }

    resolveNote(id: string) {
        this.notesService.resolveNote(id)
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}
