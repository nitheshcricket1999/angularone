import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Observable, of } from 'rxjs';
import { Feedback,ContactType  } from '../shared/feedback';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
    submitFeedback(feedback: Feedback): Observable<Feedback> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.http.post<Feedback>(baseURL + 'feedback', feedback, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
  
}
getFeedback(): Observable<Feedback[]> {
  return this.http.get<Feedback[]>(baseURL + 'feedback/')
    .pipe(catchError(this.processHTTPMsgService.handleError));
}
}
