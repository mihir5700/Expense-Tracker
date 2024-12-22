import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class APIService {
    public baseUrl: string = "http://localhost:3000";
    public fetchArguments: any = {};
  
    constructor(private http: HttpClient) {

    }

    // GET request
    getData(endpoint: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${endpoint}`);
    }

    // POST request
    postData(endpoint: string, data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/${endpoint}`, data);
    }

    // PUT request
    updateData(endpoint: string, data: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/${endpoint}`, data);
    }

    // DELETE request
    deleteData(endpoint: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${endpoint}`);
    }
    
}