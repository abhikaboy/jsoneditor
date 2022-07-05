/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { Component, Directive, Input, OnInit } from '@angular/core';
import { data } from './jsonfiles/data';
import { schema } from './jsonfiles/schema';
@Component({
    selector: 'arrayInput',
    template: `
                <p style="display: inline;">{{name}}: </p> <button nbButton outline status="success" size="tiny" (click)="appendRef()">+</button>
                
                    <div *ngIf='hasNoRef()'>
                        <nb-list>  
                        <nb-list-item  *ngFor='let i of getData(); let index = index'>
                            <div *ngIf='hasItems(prop,props)'>
                                <ref [ref]='getRef(prop,props)' [indexLabel] = 'index+1' parents={{getPath(prop)}}>
                                    </ref>
                                </div>
                            </nb-list-item>
                            <nb-list-item>
                                <div *ngIf='isEmpty()'>
                                    <p>none</p>
                                </div>
                            </nb-list-item>
                </nb-list>
                    </div >
                    <div *ngIf='hasRef()'>
                <nb-list>
                        <nb-list-item *ngFor='let item of getDataRef(); let i = index'>
                            <ref [ref]='this.ref' index={{$any(i)}} parents={{this.route}}>
                            </ref>
                        </nb-list-item>    
                </nb-list>
</div>
                    
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
    getRefToObject(ref : string) : Object {
        // @ts-ignore
        const def = ref.split("/").pop();
        // @ts-ignore
        const defy = def.definitions[def]; 
        console.log(defy);
        if(defy.hasOwnProperty("oneOf")){
            const ret = {};
            for(let property in defy.oneOf[0].properties){
                // @ts-ignore
                ret[property] = "";
            }
        }
        return {};
    }
    appendRef() : void {
        if(this.ref == undefined){
            console.warn("has no ref")
            console.log(this.getRef(this.prop,this.props));
            this.getData().push(this.getRef(this.prop,this.props));
        } else{ 
            console.log("has ref")
            console.log(this.ref)
            console.log(this.getRefToObject(this.ref));
            // @ts-ignore
            this.getDataRef().push(this.ref);
        }
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
