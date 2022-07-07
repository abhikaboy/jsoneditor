/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { Component, Directive, Input, OnInit } from '@angular/core';
import { data } from './jsonfiles/data';
import { schema } from './jsonfiles/schema';
@Component({
    selector: 'arrayInput',
    template: `
                <p style="display: inline;">{{name}}: </p> <button nbButton outline status="success" size="tiny" (click)="appendRef()">+</button>
                <nb-accordion *ngIf='hasNoRef()'>
                            <nb-accordion-item  *ngFor='let i of getData(); let index = index'>
                                <nb-accordion-item-header>{{capFirstLetter(getItemTitle(prop,props) + (index + 1))}}
                                </nb-accordion-item-header>
                                <nb-accordion-item-body>
                                    <button nbButton status="danger" size="small" (click)='removeRef(index)'>Remove</button>
                                    <div *ngIf='hasItems(prop,props)'>
                                        <ref [ref]='getRef(prop,props)' parents={{getPath(prop)}}>
                                        </ref>
                                    </div>

                                </nb-accordion-item-body>
                            </nb-accordion-item>
                                <nb-accordion-item *ngIf='isEmpty()' >
                                    <nb-accordion-item-header>Empty
                                    </nb-accordion-item-header>
                            </nb-accordion-item>
                    </nb-accordion>
                    <nb-accordion *ngIf='hasRef()'>
                        <nb-accordion-item *ngFor='let item of getDataRef(); let i = index'>
                            <nb-accordion-item-header>{{capFirstLetter(this.getRefTitle()+ " " + (i+1))}}</nb-accordion-item-header>
                                <nb-accordion-item-body>
                                    <button nbButton status="danger" size="small" (click)='removeRef(index)'> Remove </button>
                                    <div>
                                        <ref [ref]='this.ref' index={{$any(i)}} parents={{this.route}}>
                                        </ref>
                                    </div>
                                </nb-accordion-item-body>
                        </nb-accordion-item>    
                    </nb-accordion >
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
        return this.ref != undefined;
    }
    hasNoRef() : boolean{
        return (this.ref == undefined);
    }
    getItemTitle(prop: string,object:any) : string{
        const ret = this.getRef(prop,object).split("/").pop();
        if(ret == undefined) return "Item";
        return `${ret} `;
    }
    getRefTitle() : string{
        if(this.ref == undefined) return "item";
        return this.ref.split("/").pop() || "deafult";
    }
    getPath(prop : any) {
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
      return this.route != undefined;
    }
    isEmpty(){
        return this.getData().length == 0;
    }
    toNum(input : string): number{
        return parseFloat(input);
    }
    getPropertyType(prop: string, object: any): string {
        return object[prop as keyof typeof object].type;
    }
    getPropertyName(prop: string, object: any): string {
        if(object[prop as keyof typeof object].hasOwnProperty("name")) return object[prop as keyof typeof object].name;
        else {
            return prop;
        };
    }
    hasItems(prop: string, object: any): boolean {
        return object[prop as keyof typeof object].hasOwnProperty('items');
    }
    getRef(prop: string, object: any): string {
        if(object[prop as keyof typeof object].hasOwnProperty('items')) return object[prop as keyof typeof object].items.$ref;
        else return "";
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
    getRefToObject(ref : string) : Object {
        // @ts-ignore
        const def = ref.split("/").pop();
        console.log(def);
        // @ts-ignore
        const defy = schema.definitions[def]; 
        console.log(defy);
        const ret = {};
        let fill = (propertyTag : object, object: object) => {
            let property = object[propertyTag as keyof typeof object];
            // @ts-ignore
                switch(property.type){
                    case "array":
                            console.log("adding array")
                            // @ts-ignore
                            ret[propertyTag] = [];
                        break;
                        case "string":
                            console.log("adding string")
                            // @ts-ignore
                            ret[propertyTag] = ""
                        break;
                }
                console.log(ret);
        }
        if(defy.hasOwnProperty("oneOf")){
            for(let property in defy.oneOf[0].properties){
                // @ts-ignore
                fill(property,defy.oneOf[0].properties);
            }
        }
            for(let property in defy.properties){
                // @ts-ignore
                fill(property, defy.properties);
            }  
            console.log(ret);
        return ret;
    }
    capFirstLetter(input : string) :string{ 
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
    appendRef() : void {
        if(this.ref == undefined){
            // this pulls the ref from "items". If it doesn't have 
            // items property then just make it an empty string
            // TO-DO make it so this checks the data type of the property and add default from there
            this.getData().push(this.getRef(this.prop,this.props));
        } else{ 
            // has the reference property lowkey
            // @ts-ignore
            this.getDataRef().push(this.getRefToObject(this.ref));
        }
    }
    removeRef(index : number) : void {
        this.getData().splice(index,1);
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

    }
    title = 'jsonTalkSoft';
}
