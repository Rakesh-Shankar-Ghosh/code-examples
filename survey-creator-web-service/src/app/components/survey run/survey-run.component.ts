import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SurveyModule } from "survey-angular-ui";
import { Model } from "survey-core";

@Component({
  selector: "app-survey-run",
  standalone: true,
  imports: [CommonModule, SurveyModule],
  templateUrl: "./survey-run.component.html",
})
export class SurveyRunComponent implements OnInit {
  // --- Static JSON from you ---
  surveyData: any = {
    _id: "6937c97d97d317815e38a96d",
    name: "New Survey 5",
    json: {
      title: "tttttt",
      pages: [
        {
          name: "page1",
          elements: [
            {
              type: "text",
              name: "question1",
              title: "wwwww",
            },
          ],
        },
      ],
    },
    id: "6937c97c97d317815e38a96c",
  };

  surveyModel!: Model;

  ngOnInit() {
    this.surveyModel = new Model(this.surveyData.json);

    this.surveyModel.onComplete.add((sender) => {
      console.log("Survey Completed:", sender.data);
    });
  }
}
