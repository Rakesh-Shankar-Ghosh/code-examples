import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Serializer } from "survey-core";
import { SurveyCreatorModel } from "survey-creator-core";
import {
  getSurveyJSON,
  getSurveyName,
  saveSurveyJSON,
  saveSurveyName,
} from "../WebDataService";
import { AppService } from "../app.service";

Serializer.findProperty("survey", "title").isRequired = true;

@Component({
  templateUrl: "./creator-widget.component.html",
  selector: "creator-widget",
})
export class CreatorWidgetComponent implements OnInit {
  creator!: SurveyCreatorModel;
  constructor(
    private route: ActivatedRoute,
    private surveyService: AppService
  ) {}
  async ngOnInit() {
    // const id: number = Number.parseInt(this.route.snapshot.queryParams["id"]);
    const id: number = this.route.snapshot.queryParams["id"];
    let response: any = null;

    this.creator = new SurveyCreatorModel();
    this.creator.autoSaveEnabled = true;
    this.creator.saveSurveyFunc = (
      saveNo: number,
      callback: (saveNo: number, arg: boolean) => void
    ) => {
      // You can use `this.creator.text` as an alternative to `this.creator.JSON`
      saveSurveyJSON(id, this.creator.JSON, () => {
        callback(saveNo, true);
      });
    };
    this.creator.onModified.add((_, options) => {
      // We are interested in property changes only
      if (options.type === "PROPERTY_CHANGED") {
        // Update the survey name in the database when the survey title is changed
        if (
          options.name === "title" &&
          !!options.target &&
          options.target.getType() === "survey"
        ) {
          saveSurveyName(id, options.newValue);
        }
      }
    });

    getSurveyJSON(id, async (json: any) => {
      const res = await fetch(
        `http://localhost:3000/api/getSurvey?surveyId=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      response = structuredClone(data);

      // Save the survey title to prevent it from being overwritten
      const prevTitle = data.json.title;
      // You can use `this.creator.text` as an alternative to `this.creator.JSON`
      this.creator.JSON = data.json;
      if (!!prevTitle) {
        this.creator.survey.title = prevTitle;
      }
    });

    getSurveyName(id, async (name: string) => {
      const res = await fetch(
        `http://localhost:3000/api/getSurvey?surveyId=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      this.creator.survey.title = data?.json?.title || data?.name;
      // this.creator.survey.title = name
    });
  }
}

// getSurveyJSON(id, (json: any) => {
//   // Save the survey title to prevent it from being overwritten
//   const prevTitle = this.creator.survey.title;
//   // You can use `this.creator.text` as an alternative to `this.creator.JSON`
//   this.creator.JSON = json;
//   if (!!prevTitle) {
//     this.creator.survey.title = prevTitle;
//   }
// });
