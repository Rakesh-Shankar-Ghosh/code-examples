import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SurveyModule } from "survey-angular-ui";
import { Model } from "survey-core";

@Component({
  selector: "app-survey-result",
  standalone: true,
  imports: [CommonModule, SurveyModule],
  templateUrl: "./survey-result.component.html",
})
export class SurveyResultComponent implements OnInit {
  // --- Static JSON from you ---
  surveyData: any = {};

  surveyModel!: Model;

  async ngOnInit() {
    const id = "6937c97c97d317815e38a96c";

    const res = await fetch(`http://localhost:3000/api/results?postId=${id}`);

    this.surveyData = await res.json();
    this.surveyModel = new Model(this.surveyData.json);
  }
}
