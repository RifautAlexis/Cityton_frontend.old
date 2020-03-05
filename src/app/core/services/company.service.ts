import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICompany as Company } from '@shared/models/Company';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  getSettings(): Observable<Company> {
    return this.http.get<Company>(environment.apiUrl + 'company');
  }


}
