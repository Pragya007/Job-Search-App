import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Auth/login/login.component';
import { ForseekerService } from './forseeker.service';
import { ForrecruiterService } from './forrecruiter.service';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ForHerComponent } from './for-her/for-her.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    LoginComponent,
    HomeDashboardComponent,
    ForHerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ForseekerService, ForrecruiterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
