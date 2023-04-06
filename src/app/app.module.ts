import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [
    AppComponent,
    MenuBarComponent,
    StatusBarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
