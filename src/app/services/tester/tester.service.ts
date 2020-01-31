import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject, throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
};

@Injectable({
  providedIn: 'root'
})
export class TesterService implements OnDestroy {
  private url = environment.baseApi;
  private urlHotel = environment.baseHotel;
  private subs: Subject<void> = new Subject();
  private _refresh = new Subject();
  constructor(
    public http: HttpClient,
    public router: Router,
  ) { }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  // --------------------------for Handle Error----------------
  handleError(error: Error | HttpErrorResponse) {
    if(!navigator.onLine){
        console.error('Browser Offline')
    }  else {
       if (error instanceof HttpErrorResponse) {
         if(!navigator.onLine) {
           console.error('Browser Offline')
         } else {
           console.error('Http Error');
         }
       } else {
         console.error('Client Error');
       }
       console.error(error);
    }
    return throwError(error); 
  }

  get refresh() {
    return this._refresh;
  }

  create(order: any): Observable<any> {
    return this.http.post<any>(this.url + '/tester/create', order).pipe(
      catchError(this.handleError),
    );
  }

  createVisitor(order: any): Observable<any> {
    return this.http.post<any>(this.urlHotel + '/visitor/add', order).pipe(
      catchError(this.handleError),
    );
  }
}
