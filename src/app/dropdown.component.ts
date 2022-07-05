/* eslint-disable no-console */

import { Component, Directive, OnInit, Input } from '@angular/core';
@Component({
    selector: 'dropdown',
    template: `
        <div style="display:inline">
            <nb-select  placeholder="Select" [(selected)]="selectedItem">
                <nb-select-label>{{ selectedItem }}</nb-select-label>
                    <nb-option *ngFor="let option of this.options; let ind = index" value={{option}}>{{option}}</nb-option>
            </nb-select>
        </div>
`,
    styleUrls: ['./app.component.scss']
})
export class DropdownComponent implements OnInit {
<<<<<<< HEAD
    @Input() options!: string[];
    @Input() selectedItem!: any;
=======
    @Input() props!: string[];

    options: string[] = [];

    selectedItem: string = "";
>>>>>>> 3abb5047166662c50fe58a565d0d863be3579507

    constructor() {
    }
    ngOnInit(): void {
<<<<<<< HEAD
        console.log(this.options);
=======
        this.options = this.props.slice(1, this.props.length);
>>>>>>> 3abb5047166662c50fe58a565d0d863be3579507
    }
    title = 'jsonTalkSoft';
}
