import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {async, Observable, of, OperatorFunction} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import { convertToObject } from 'typescript';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {catchError, distinctUntilChanged, tap, switchMap} from 'rxjs/operators';



interface MyReturnTypeItem{
  vars: string;
  smps: string;
}

interface MyReturnType {
  [name: string]: MyReturnTypeItem;
}



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  // statesWithFlags = [{'name': 'Alabama', 'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'}];
  constructor(private router: Router,private http: HttpClient) { }
  search_detail:any;
  model: any;
  searching:any = true;

  search:OperatorFunction<string, readonly any[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => this.getMovieDetails(term.toLowerCase()).pipe(
      )));

  formatter = (x: {title: string}) => x.title;

  getMovieDetails(term:string) {
    return this.http.get<any>("http://localhost:8080/getSearchResults?inp=" + term)
    .pipe(
      map((responseData: any) => {
      return responseData; })
    );
    // return this.search_detail; //["GAM"]
  }

  redirect(id:any,media_type:any){
    this.router.navigate(['/watch',media_type,id]);
  }

  selectedItem(temp$:any){
    const id = temp$.item.id;
    const media_type = temp$.item.media_type;
    this.router.navigate(['/watch',media_type,id]);
  }
}
function responseData(responseData: any, any: any): OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

