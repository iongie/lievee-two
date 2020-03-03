import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject, throwError, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
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
  private urlVisitor = environment.baseHotel;
  private subs: Subject<void> = new Subject();
  private _refresh = new Subject();
  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
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

  create(visitor: any): Observable<any> {
    return this.http.post<any>(this.urlVisitor + '/tester/create', visitor).pipe(
      catchError(this.handleError),
    );
  }

  createVisitor(visitor: any): Observable<any> {
    return this.http.post<any>(this.urlVisitor + '/visitor/add', visitor).pipe(
      catchError(this.handleError),
    );
  }

  checkPhoneNumber(visitor: any): Observable<any> {
    return this.http.post<any>(this.urlVisitor + '/visitor/check/phone', visitor).pipe(
      catchError(this.handleError),
    );
  }

  checkEmail(visitor: any): Observable<any> {
    return this.http.post<any>(this.urlVisitor + '/visitor/check/email', visitor).pipe(
      catchError(this.handleError),
    );
  }

  read(): Observable<any[]> {
    return this.http.get<any[]>(this.urlVisitor + '/visitor', httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  isLoggednIn(): boolean {
    return this.activatedRoute.snapshot.queryParamMap.get('view') !== null;
  }

  isRole(role: any[]): boolean {
    const currentUser = this.activatedRoute.snapshot.queryParamMap.get('view');
    return role.includes(currentUser);
  }
  
}
