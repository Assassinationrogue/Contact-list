import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'https://reqres.in/api';

  /**
   * Saves user name and email and id
   * @param name gets name of the user
   * @param number gets phone number of the user
   * @returns void
   */
  postContact(data): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, data);
  }

  /**
   * Gets all contact
   * @param none
   * @returns Observable<User>
   */
  getAllContact(): Observable<User[]> {
    return this.http.get<User>(`${this.apiUrl}/users`).pipe(
      map((data) => {
        return data['data'];
      }),
      tap((data) => {
        const newData = data;
        data.forEach((user) => {
          console.log(user.first_name[0])
        });
      })
    );
  }
}
