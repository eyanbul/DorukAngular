import { Injectable, OnInit } from "@angular/core"
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, ReplaySubject } from "rxjs";
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";
import { ReturnStatement } from "@angular/compiler";
import { Promise } from "q";

@Injectable()
export class GlobalService {

  userData = new ReplaySubject<any>(1);
  currentProfile = new ReplaySubject<any>(1);
  loading = new ReplaySubject<any>(1);
  error = new ReplaySubject<any>(1);
  public translations: any = null;
  public currentLanguage = "tr";

  constructor(private http: HttpClient) {

    // console.log(typeof this.translations);
  }

  showError(errorText) {
    this.error.next(errorText);
    // setTimeout(() => {
    //   this.error.next(false);
    // }, 4000);
  }

  reqPost(url, reqData) {
    return this.http.post(environment.api + url, reqData, this.configHandler())
      .pipe(
        // catchError(this.handleError)
      );
  }

  reqGet(url, reqData) {
    if(reqData!=null)
    {
      let paramaters = Object.keys(reqData).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(reqData[k])
      }).join('&');

      return this.http.get(environment.api + url + "?" + paramaters, this.configHandler())
        .pipe(
          // catchError(this.handleError)
      );
  }
  else 
  {
    return this.http.get(environment.api + url, this.configHandler())
    .pipe(
      // catchError(this.handleError)
  );
  }
}

  configHandler() {
    return {
      "async": true,
      "dataType": "application/json",
      "crossDomain": true,
      "headers": new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem("access_token"),
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    };
  }

  handleError(error: any, caught: Observable<any>, router: Router) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status == 401) {
        router.navigate(["/login"])
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
    }
    return Observable.throw(error["error"] || "Server error");
  }
}
