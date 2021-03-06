/* eslint-disable no-console */

import { Component, Directive, OnInit } from '@angular/core';
import { data } from './jsonfiles/data2';
import { schema } from './jsonfiles/schema2';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'movePrompt',
    template: `
        <nb-card status="info">
            <nb-card-body>
                <input nbInput placeholder="Position"  [(ngModel)]="position" (input)="this.logChange($event)">
            </nb-card-body>
            <nb-card-footer style="textAlign:center">
                <button nbButton status="success" style="width:100%" (click)="save()">Save</button>
                <button nbButton status="danger" style="width:100%">Cancel</button>
            </nb-card-footer>
        </nb-card>

`,
    styleUrls: ['./app.component.scss']
})
export class MoveCardComponent implements OnInit {
    position = "";
    // @ts-ignore
    constructor(protected dialogRef: NbDialogRef) {
    }
    logChange(event : Event){
        // @ts-ignore
        console.log(this.position);
    }
    save(){
        this.dialogRef.close(this.position);
        console.log("wheeew");
    }
    ngOnInit(): void {
    }
    title = 'jsonTalkSoft';
}
