import { Component } from '@angular/core';
import { dataJSON } from './jsonfiles/data';
import { schema } from './jsonfiles/schemas';
import { NbDialogService } from '@nebular/theme';

// @ts-ignore
import { FormComponent } from './form.component';
import jsv, { JsonSchemaValidator } from 'JSV';
import { ReviewCardComponent } from './reviewCard';
import { InputCardComponent } from './inputCard.component';
import { ActivatedRoute } from '@angular/router';
import { schemas } from "./jsonfiles/schemas"

let { data } = dataJSON;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  schemaTitle = schema.title;
  schemaDescription = schema.description;
  selectedSchema = {};
  selectedItem = {};
  update = 0;
  schemas = schemas;
  schemaHash = new Map();

  logData = () => {
    // console.log(data);
  }
  isDataEmpty() {
    console.log("data check");
    console.log(dataJSON.data)
    return dataJSON.data == {};
  }
  getData() {
    // console.log("data getting");
    return data;
  }
  setData(manualData) {
    data = manualData;
  }
  validate = () => {
    this.open(false)
  }
  constructor(private dialogService: NbDialogService, private route: ActivatedRoute) {
  }

  open(hasScroll: boolean) {
    this.dialogService.open(ReviewCardComponent, { hasScroll });
  }
  openInput() {
    this.dialogService.open(InputCardComponent);
  }
  schemaChange(event) {
    this.selectedItem = event;
    this.selectedSchema = this.schemaHash.get(event);
    console.log(this.selectedItem)
  }
  ngOnInit() {
    for (let i = 0; i < this.schemas.length; i++) {
      this.schemaHash.set(schemas[i].name, schemas[i]);
      console.log(this.schemaHash.get(schemas[i].name));
    }
    console.log(this.schemaHash);
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        // @ts-ignore
        // const encoded = btoa(JSON.stringify(data));
        // console.log(encoded)
        let dataFromQuery = JSON.parse(atob(params.data));
        dataJSON["data"] = dataFromQuery;
        console.log(dataFromQuery);
      }
      );
  }
  title = 'jsonTalkSoft';
}
