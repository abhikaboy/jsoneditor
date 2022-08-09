/* eslint-disable no-console */

import { Component, Directive, OnInit } from '@angular/core';
import { dataJSON } from './jsonfiles/data';
import { NbDialogRef } from '@nebular/theme';
// let {data} = dataJSON;

@Component({
    selector: 'manualInput',
    template: `
        <nb-card status="info">
            <nb-card-body>
                <textarea nbInput placeholder="data"  [(ngModel)]="dataInput" (input)="this.logChange($event)">
                </textarea>
            </nb-card-body>
            <nb-card-footer style="textAlign:center">
                <button nbButton status="success" style="width:100%" (click)="save()">Save</button>
                <button nbButton status="danger" style="width:100%">Cancel</button>
            </nb-card-footer>
        </nb-card>

`,
    styleUrls: ['./app.component.scss']
})
export class InputCardComponent implements OnInit {
    dataInput = "";
    // @ts-ignore
    constructor(protected dialogRef: NbDialogRef) {
    }
    logChange(event : Event){
        // @ts-ignore
        this.dataInput = event.value;
    }
    save(){
        //@ts-ignore
        dataJSON = JSON.parse(this.dataInput).then(
            this.dialogRef.close(this.dataInput)
        );
        console.log(dataJSON);
    }
    ngOnInit(): void {
    }
    title = 'jsonTalkSoft';
}
