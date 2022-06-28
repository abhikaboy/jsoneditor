/* eslint-disable no-console */

import { Component, Directive, OnInit } from '@angular/core';
import { schema } from './jsonfiles/schema';
import { PropertyComponent } from './property.component';
@Component({
    selector: 'form',
    template: `
        <ul style="list-style-type:none;">
            <li *ngFor="let item of data">
                <property-card [props] = item ></property-card>
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
        console.log(this.definitions);
    }
    title = 'jsonTalkSoft';
}
