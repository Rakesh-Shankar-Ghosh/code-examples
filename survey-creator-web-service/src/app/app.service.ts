import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  end_point = "http:localhost:3000/api";

  constructor(private http: HttpClient) {}

  createSurvey(payload: any): Observable<any> {
    return this.http.post(`${this.end_point}/create`, payload);
  }

  getHello(): string {
    return "Hello World!";
  }
}
