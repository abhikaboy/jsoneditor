/* eslint-disable no-console */

import { Component, Directive, OnInit } from '@angular/core';
import { schema } from './jsonfiles/schema';
@Component({
  selector: 'form',
  template:`
        <ul style="list-style-type:none;">
            <li *ngFor="let item of data">
                <nb-card status="success">
                    <nb-card-header style="text-align:center;font-size:1.2em">
                        {{item.name}}
                    </nb-card-header>
                    <nb-card-body>
                        <div *ngIf="item.hasOwnProperty('items')">
                            <ref ref ={{item.items.$ref}}> </ref>
                        </div>
                        <div *ngIf="item.hasOwnProperty('properties')">
                            <prop [props]=item.properties> </prop>
                        </div>
                    </nb-card-body>
                </nb-card>
            </li>
        <ul>
`,
  styleUrls: ['./app.component.scss']
})
export class FormComponent implements OnInit{
    data : any[] = [];
    definitions: {} = {};
    constructor(){
        // console.log(schema);
        // console.log(schema.properties);
        for(const property in schema.properties){
            // console.log(property);
            this.data.push({...schema.properties[property as keyof typeof schema.properties], name: property});
        }
    }
    ngOnInit(): void {
        console.log(this.data);
    }
    title = 'jsonTalkSoft';
}
