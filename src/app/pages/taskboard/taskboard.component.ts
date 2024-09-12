import {Component, OnDestroy, OnInit} from '@angular/core';
import {DragulaModule, DragulaService} from "ng2-dragula";
import {ITaskboardItem} from "./taskboard-item/taskboard-item.interface";
import {TaskboardItemComponent} from "./taskboard-item/taskboard-item.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-taskboard',
  standalone: true,
  imports: [TaskboardItemComponent, DragulaModule, NgForOf],
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.scss'
})
export class TaskboardComponent implements OnInit, OnDestroy {
    list = 'taskboard';
    list1: ITaskboardItem[] = [];
    list2: ITaskboardItem[] = [];
    list3: ITaskboardItem[] = [];

    constructor(private dragulaService: DragulaService) {}

    ngOnInit(): void {
        this.dragulaService.createGroup(this.list, {
            revertOnSpill: true,
            accepts: (_, target, source) => {
                if (
                    (source?.classList.contains('list-1') && !target?.classList.contains('list-2')) ||
                    (source?.classList.contains('list-3') && !target?.classList.contains('list-2'))
                ) return false;

                return true;
            }
        });

        this.setData();
    }

    ngOnDestroy() {
        this.dragulaService.destroy(this.list);
    }

    setData() {
        ['ListItem 1', 'ListItem 2', 'ListItem 3'].map(t => this.list1.push({ title: t, theme: 'theme-1' }));
        ['ListItem 4', 'ListItem 5', 'ListItem 6'].map(t => this.list2.push({ title: t, theme: 'theme-2' }));
        ['ListItem 7', 'ListItem 8', 'ListItem 9'].map(t => this.list3.push({ title: t, theme: 'theme-3' }));
    }
}
