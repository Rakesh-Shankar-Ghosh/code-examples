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

    // 1) Get survey JSON
    const surveyRes = await fetch(
      `http://localhost:3000/api/getSurvey?surveyId=${id}`
    );
    const surveyData = await surveyRes.json();

    // 2) Get survey result
    const resultRes = await fetch(
      `http://localhost:3000/api/results?postId=${id}`
    );
    const result = await resultRes.json();

    // 3) Load survey definition
    this.surveyModel = new Model(surveyData.json);

    // 4) Pre-fill answers (THIS is how SurveyJS shows results!)
    this.surveyModel.data = result;

    // 5) Disable editing to make it read-only
    this.surveyModel.mode = "display";
  }

  async ngOnInitx() {
    const id = "6937c97c97d317815e38a96c";

    const res = await fetch(`http://localhost:3000/api/results?postId=${id}`);

    this.surveyData = await res.json();
    this.surveyModel = new Model(this.surveyData.json);
  }
}
