import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'https://reqres.in/api';

 

  /**
   * Saves user name and phone and id
   * @param name gets name of the user
   * @param number gets phone number of the user
   * @returns void
   */
  postContact(name: string, number: any): void {
    
  }

  /**
   * Gets all contact
   * @param none
   * @returns Observable<User>
   */
   getAllContact(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users`).pipe(map(data=>{
      return data['data']
    }))
  }

  /**
   *
   * @param id takes unique id in string
   * @returns void
   */
  deleteContact(id: string): void {
    localStorage.removeItem(id);
  }

  // /**
  //  * Edits current contact and saves in localstorage using id
  //  * @param details
  //  * @returns void
  //  */
  // editCurrentContact(details: User): void {
  //   localStorage.setItem(
  //     details.id,
  //     JSON.stringify({
  //       name: details.name[0].toUpperCase() + details.name.slice(1),
  //       number: details.number,
  //       id: details.id + '',
  //     })
  //   );
  // }
}
