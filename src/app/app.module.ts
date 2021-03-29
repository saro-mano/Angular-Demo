import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CardDispComponent } from './card-disp/card-disp.component';
import { CorouselComponent } from './corousel/corousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieDispComponent } from './movie-disp/movie-disp.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ModalDemoComponent } from './modal-demo/modal-demo.component';
import { MyListComponent } from './my-list/my-list.component';




const appRoutes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'watch/:media_type/:id', component: MovieDispComponent},
  { path: 'mylist', component: MyListComponent}
];
@NgModule({
  
  declarations: [
    AppComponent,
    NavbarComponent,
    CardDispComponent,
    CorouselComponent,
    MovieDispComponent,
    HomePageComponent,
    ModalDemoComponent,
    MyListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    YouTubePlayerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

