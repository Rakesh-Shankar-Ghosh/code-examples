import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatorWidgetComponent } from './components/creator-widget.component';
import { SurveyListComponent } from './components/survey-list.component';
import { SurveyRunComponent } from './components/survey run/survey-run.component';
import { SurveyResultComponent } from './components/survey result/survey-result.component';

const routes: Routes = [
  { path: "", component: SurveyListComponent },
  { path: "editsurvey", component: CreatorWidgetComponent },
  { path: "run", component: SurveyRunComponent },
  { path: "results", component: SurveyResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
