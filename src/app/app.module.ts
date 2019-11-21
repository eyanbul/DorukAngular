import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@Injectable()
export class CanActivateTeam implements CanActivate {
  constructor(private router: Router) { 
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('access_token')) {
      return true;
    } else {
      //this.router.navigate(["/login"])
      return false;
    };
  }
}

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [CanActivateTeam] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule//,
    // RouterModule.forRoot(
    //   appRoutes
    // )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
