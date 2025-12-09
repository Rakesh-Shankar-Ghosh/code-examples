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
    // _id: "6937c97d97d317815e38a96d",
    // name: "New Survey 5",
    // json: {
    //   title: "tttttt",
    //   pages: [
    //     {
    //       name: "page1",
    //       elements: [
    //         {
    //           type: "text",
    //           name: "question1",
    //           title: "wwwww",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // id: "6937c97c97d317815e38a96c",
  };

  surveyModel!: Model;

  async ngOnInit() {
    const id = "6937c97c97d317815e38a96c";

    const res = await fetch(
      `http://localhost:3000/api/getSurvey?surveyId=${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    this.surveyData = await res.json();
    this.surveyModel = new Model(this.surveyData.json);
    // this.surveyModel.onComplete.add((sender) => {
    //   console.log("Survey Completed:", sender.data);
    // });

    this.surveyModel.onComplete.add((sender) => {
      const surveyResultObj = sender.data; // { question1: "aa", question2: "aaa" }
      const surveyResultText = JSON.stringify(surveyResultObj);

      const payload = {
        postId: this.surveyData.id, // or _id
        surveyResult: surveyResultObj,
        surveyResultText: surveyResultText,
      };

      console.log(payload);

      // Example: send to your API
      fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => console.log("Saved successfully", data));
    });

    // this.surveyModel = new Model(this.surveyData.json);
    // this.surveyModel.onComplete.add((sender) => {
    //   console.log("Survey Completed:", sender.data);
    // });
  }

  async getSurveyToRun(id?: any): Promise<any> {
    // const res = await fetch(
    //   `http://localhost:3000/api/getSurvey?surveyId=${id}`,
    //   {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    // this.surveyData = await res.json();
    // this.surveyModel = new Model(this.surveyData.json);
    // this.surveyModel.onComplete.add((sender) => {
    //   console.log("Survey Completed:", sender.data);
    // });
  }
}
