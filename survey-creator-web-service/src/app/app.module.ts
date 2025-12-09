import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SurveyCreatorModule } from "survey-creator-angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CreatorWidgetComponent } from "./components/creator-widget.component";
import { SurveyListComponent } from "./components/survey-list.component";
import { HttpClientModule } from "@angular/common/http";
import { SurveyRunComponent } from "./components/survey run/survey-run.component";
import { SurveyResultComponent } from "./components/survey result/survey-result.component";

@NgModule({
  declarations: [AppComponent, CreatorWidgetComponent, SurveyListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SurveyCreatorModule,
    SurveyRunComponent,
    SurveyResultComponent,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
