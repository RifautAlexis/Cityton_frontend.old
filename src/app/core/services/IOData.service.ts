import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEvent, HttpRequest } from '@angular/common/http';

import { IUser as User } from '@shared/models/User';
import { IUserToUpdate as UserToUpdate } from '@shared/models/UserToUpdate';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IODataService {

  constructor(private http: HttpClient) {
  }

  downloadFile(): Observable<Blob> {
    return this.http.get<Blob>(environment.apiUrl + 'data/user/', { responseType: 'blob' as 'json' });
  }


}
