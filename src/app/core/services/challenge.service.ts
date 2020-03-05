import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IChallenge as Challenge } from '@shared/models/Challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(environment.apiUrl + 'challenge');
  }

  existName(name: string) {
    return this.http.get<boolean>(environment.apiUrl + 'challenge/existName/' + name);
  }

  create(name: string, statement: string): Observable<number> {

    let newChallenge = {
      name: name,
      statement: statement
    }

    return this.http.post<number>(environment.apiUrl + 'challenge', newChallenge);
  }

  getAllWaiting(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(environment.apiUrl + 'challenge/getAllWaiting');
  }

  delete(challengeId: number) {
    return this.http.delete(environment.apiUrl + 'challenge/' + challengeId);
  }

  validate(challengeId: number) {
    return this.http.put(environment.apiUrl + 'challenge/validate/' + challengeId, {});
  }

  searchChallenges(toSearch: string): Observable<Challenge[]> {

    let params = new HttpParams()
      .set('toSearch', toSearch)

    return this.http.get<Challenge[]>(environment.apiUrl + 'challenge/search', { params });
  }

  edit(challengeId: number, challengeName: string, challengeStatement: string): Observable<any>{

    let challengeEdited = {
      id: challengeId,
      name: challengeName,
      statement: challengeStatement
    }

    return this.http.post<any>(environment.apiUrl + 'challenge/edit', challengeEdited);
  }

}
