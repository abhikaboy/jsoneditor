/* eslint-disable no-console */

import { Component, Directive, Input, OnInit } from '@angular/core';
import { schema } from './jsonfiles/schema';
@Component({
    selector: 'boolInput',
    template: `
                        <nb-checkbox (checkedChange)="toggle($event)">
                </nb-checkbox>
`,
    styleUrls: ['./app.component.scss']
})
export class BooleanInputComponent implements OnInit {
    @Input() route! : String;
    checked = false;
    toggle(checked: boolean) {
        this.checked = checked;
    }
    constructor() {

    }
    ngOnInit(): void {
        // console.log(this.route);
    }
    title = 'jsonTalkSoft';
}
