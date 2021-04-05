import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import { convertToObject } from 'typescript';
import { Router } from '@angular/router';




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
export class NavbarComponent implements OnInit {
  // statesWithFlags = [{'name': 'Alabama', 'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'}];
  constructor(private router: Router,private http: HttpClient) { }
  search_detail:any;
  

  ngOnInit(): void {
  }


  public model: any;
  
  
  search: OperatorFunction<string, readonly {title: any, poster_path: any}[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.getMovieDetails(term.toLowerCase()))
    )

  formatter = (x: {title: string}) => x.title;


  private getMovieDetails(term:string):{title:any,poster_path:any}[] {
    this.http.get<any>("http://localhost:8080/getSearchResults?inp=" + term)
    .subscribe(responseData => {
      this.search_detail = responseData;
    });
    return this.search_detail;    
  }

  redirect(id:any,media_type:any){
    this.router.navigate(['/watch',media_type,id]);
  }

}
