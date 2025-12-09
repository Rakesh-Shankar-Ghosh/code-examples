import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { createSurvey, deleteSurvey, getSurveyItems } from "../WebDataService";
import { AppService } from "../app.service";
import { SurveyRunComponent } from "./survey run/survey-run.component";
import { SurveyResultComponent } from "./survey result/survey-result.component";

interface SurveyListItem {
  name: string;
  id: number;
}

@Component({
  templateUrl: "./survey-list.component.html",
  selector: "survey-list",
})
export class SurveyListComponent {
  @ViewChild(SurveyRunComponent, { static: false })
  surveyRunChild!: SurveyRunComponent;

  @ViewChild(SurveyResultComponent, { static: false })
  surveyResultChild!: SurveyResultComponent;

  constructor(private router: Router) {}

  public items: Array<any> = [];

  public async runSurvey(id: any) {
    await this.surveyRunChild.getSurveyToRun(id);
  }

  public async resultSurvey(id: number) {
    // await this.surveyResultChild.getSurveyToRun(id);
  }

  public addNewSurvey() {
    createSurvey((newItem) => {
      this.router.navigate(["/editsurvey"], {
        queryParams: { id: newItem.id.toString() },
      });
    });
  }
  public async removeSurvey(id: any) {
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
