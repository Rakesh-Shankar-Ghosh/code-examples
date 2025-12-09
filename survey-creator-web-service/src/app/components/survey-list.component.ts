import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { createSurvey, deleteSurvey, getSurveyItems } from "../WebDataService";
import { AppService } from "../app.service";

interface SurveyListItem {
  name: string;
  id: number;
}

@Component({
  templateUrl: "./survey-list.component.html",
  selector: "survey-list",
})
export class SurveyListComponent {
  constructor(private router: Router) {}
  public items: Array<any> = [];
  public addNewSurvey() {
    createSurvey((newItem) => {
      this.router.navigate(["/editsurvey"], {
        queryParams: { id: newItem.id.toString() },
      });
    });
  }
  public async removeSurvey(id: number) {
    await deleteSurvey(id, (currentItems) => {
      this.items = currentItems;
    });
  }

  public async runSurvey(id: number) {
    await deleteSurvey(id, (currentItems) => {
      this.items = currentItems;
    });
  }

  public async resultSurvey(id: number) {
    await deleteSurvey(id, (currentItems) => {
      this.items = currentItems;
    });
  }

  async ngOnInit() {
    await getSurveyItems((currentItems) => {
      this.items = currentItems;
    });
  }
}
