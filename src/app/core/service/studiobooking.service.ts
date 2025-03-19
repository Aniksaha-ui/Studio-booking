import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudiobookingService {
  private jsonUrl = 'assets/data.json';
  constructor(private http: HttpClient) {}

  getStudioData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}
