/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { Component, Directive, Input, OnInit } from '@angular/core';
import { data } from './jsonfiles/data';
import { schema } from './jsonfiles/schema';
@Component({
    selector: 'arrayInput',
    template: `
                <p style="display: inline;">{{name}}: </p> <button nbButton outline status="success" size="tiny">+</button>
                <nb-list>  
                    <nb-list-item  *ngIf='hasNoRef()'>
                        <div *ngFor='let i of getData()'>
                            <div *ngIf='hasItems(prop,props)'>
                                <ref [ref]='getRef(prop,props)'parents={{getPath(prop)}}>
                                    </ref>
                                </div>
                            </div>
                            <div>
                                <div *ngIf='isEmpty()'>
                                    <p>none</p>
                                </div>
                            </div>
                    </nb-list-item >
                    <nb-list-item *ngIf='hasRef()'>
                        <nb-list-item *ngFor='let item of getDataRef(); let i = index'>
                            <ref [ref]='this.ref' index={{$any(i)}} parents={{this.route}}>
                            </ref>
                        </nb-list-item>    
                    </nb-list-item >
                    
                </nb-list>
`,
    styleUrls: ['./app.component.scss']
})

/*
 passing undefined into new referances 
*/
export class ArrayInputComponent implements OnInit {
    @Input() route! : String;
    @Input() prop! : any;
    @Input() props! : Object;
    @Input() index! : any;
    @Input() ref : string | undefined;
    @Input() name! : string;
    constructor() {
        this.index = 0;
    }
    hasRef() : boolean{
        if(this.ref != undefined){
            // console.log("HAS REFEREANCE ");
        }
        return this.ref != undefined;
    }
    hasNoRef() : boolean{
        // console.log(this.ref);
        if(this.ref == undefined){
            // console.log("HAS NO REFEREANCE ");
        }
        // console.log("has no ref");
        // console.log(this.ref == undefined);
        return (this.ref == undefined);
    }
    getPath(prop : any) {
        // console.log(this.getPropertyType(prop,this.props));
        let propName =  this.getPropertyName(prop, this.props);
        if(propName == undefined){
            propName='';
        } else {
            propName = "." +propName
        }
        if(this.getPropertyType(prop,this.props) == 'array') return this.route + propName+`[${this.index}]`;
        else return this.route + propName;
    }
    hasParents():boolean{
    //   console.log("from parents: " + this.parents);
      return this.route != undefined;
    }
    isEmpty(){
        return this.getData().length == 0;
    }
    toNum(input : string): number{
        return parseFloat(input);
    }
    getPropertyType(prop: string, object: any): string {
        // console.log(object[prop as keyof typeof object]);
        return object[prop as keyof typeof object].type;
    }
    getPropertyName(prop: string, object: any): string {
        // console.log(object[prop as keyof typeof object]);
        if(object[prop as keyof typeof object].hasOwnProperty("name")) return object[prop as keyof typeof object].name;
        else {
            return prop;
        };
    }
    hasItems(prop: string, object: any): boolean {
        // console.log(object[prop as keyof typeof object].hasOwnProperty('items'));
        return object[prop as keyof typeof object].hasOwnProperty('items');
    }
    getRef(prop: string, object: any): string {
        return object[prop as keyof typeof object].items.$ref;
    }
    getData() : Object[]{
            let currentRoute = this.route + "." + this.getPropertyName(this.prop,this.props);
            const routes = currentRoute.split("."); // establishes levels of nesting 
            let currentLocation = data;
            for(const route of routes){ 
                currentLocation = this.dig(route, currentLocation); 
            }
            // @ts-ignore
            return currentLocation;
    }
    getDataRef() : Object[]{
            // @ts-ignore
            return data[this.route];  
    }
    dig(route : string, input:any){
        if(!route.includes("["))
        { 
            try{
                return input[route];
            } catch(e){
                return "route does not exist"
            }
        }
        // array digging 
        const level1 = route.split("[");
        const routeRoot = level1[0];
        const level2 = level1.slice(1);
        const indicies = level2.map((index) => parseFloat(index.split("]")[0]));
        let search = input[routeRoot];
        for(const index of indicies){
            search = search[index];
        }
        return search;
    }
    ngOnInit(): void {
        // console.log(this.route);
        // console.log(this.ref);
        // console.log(this.hasNoRef());
        // console.log(this.getPropertyLength());

    }
    title = 'jsonTalkSoft';
}
