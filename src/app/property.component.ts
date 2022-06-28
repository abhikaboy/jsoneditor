/* eslint-disable no-console */

import { Component, Directive, OnInit, Input, } from '@angular/core';
import { schema } from './jsonfiles/schema';
import { PropComponent } from './propCard.component';
@Component({
  selector: 'property-card',
  template:`
    <!-- <nb-card >
        <nb-card-header style="text-align:center;font-size:1.2em">
            {{this.propKeys.name}}
        </nb-card-header>
        <nb-card-body>
            <div *ngIf="item.hasOwnProperty('items')">
                Has Item Property
                <ref ref ={{item.items.$ref}}> </ref>
                <li *ngFor="let subdefinition of definitions">
                    <prop [props]="subdefinition.properties"></prop>
                </li>
            </div>
            <div *ngIf="item.hasOwnProperty('properties')">
                <prop [props]=item.properties></prop>
            </div>             
        </nb-card-body>
    </nb-card> -->
  `,
  styleUrls: ['./app.component.scss']
})
export class PropertyComponent implements OnInit{
    @Input() props!: any; 
    propKeys: string[] = [];
    itemName: string = "";

    constructor(){
    }
    ngOnInit(): void {
        this.propKeys = this.props;
        console.log(this.propKeys)  
    }
    title = 'jsonTalkSoft';
}

// <ul style="list-style-type:none;">
//             <li *ngFor="let item of data">
//                 <nb-card >
//                     <nb-card-header style="text-align:center;font-size:1.2em">
//                         {{item.name}}
//                     </nb-card-header>
//                     <nb-card-body>
//                         <div *ngIf="item.hasOwnProperty('items')">
//                             Has Item Property
//                             <ref ref ={{item.items.$ref}}> </ref>
//                             <li *ngFor="let subdefinition of definitions">
//                               <prop [props]="subdefinition.properties"></prop>
//                             </li>
//                         </div>
//                         <div *ngIf="item.hasOwnProperty('properties')">
//                             <prop [props]=item.properties></prop>
//                         </div>
                        
//                     </nb-card-body>
//                 </nb-card>
//             </li>

//         <ul>