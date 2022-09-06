import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-movies-heroku.herokuapp.com/';

//get token
const token = localStorage.getItem('token');
//get username stored in local storage
const username = localStorage.getItem('username');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  /**
   * Making the api call for the user registration endpoint
   * @function userRegistration
   * @param userDetails {string}
   * @returns store user input to backend
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + `users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   *  Making the api call for the user login endpoint
   * @param userDetails {string}
   * @returns api call for user login
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * displays all movies 
   * @function getAllMovies
   * @returns all movies stored at database
   */

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + `movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * displays particular selected movie detail
   * @function getMovies
   * @param Title {string}
   * @returns movie details
   */
  public getMovies(Title: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .get(apiUrl + `movies/${Title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * display director information of a selected movie
   * @function getDirector
   * @param directorName {string}
   * @returns director information
   */
  public getDirector(directorName: any): Observable<any> {

    return this.http
      .get(apiUrl + `movies/director/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**display genre information of a selected movie
   * @function getGenre
   * @param genreName {string}
   * @returns genre information
   */
  public getGenre(genreName: any): Observable<any> {
    return this.http
      .get(apiUrl + `movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get user and get favorite movies of a user 
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * adds movie to user favorite movies list
   * @function addFavoriteMovie
   * @param movieID {string}
   * @returns adds movie to favorite movies list
   */
  public addFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieID}`, {}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * allows user to edit information
   * @function editUser
   * @param updateDetails {array}
   * @returns edits user information
   */
  public editUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${username}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      })
  }

  /**
   * display favorite movies list of a user
   * @function getFavoriteMovies
   * @returns displays all favorite movies of user
   */
  getFavoriteMovies(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    // Get Username stored in local storage
    const username = localStorage.getItem('Username');
    return this.http
      .get(apiUrl + `users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * removes movie from user's favorite movies list
   * @function removeFavoriteMovie
   * @param movieID {string}
   * @returns removes movie from favorite movies list
   */
  public removeFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * delete all details of a user
   * @function deleteUser
   * @returns to welcome component of the app
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    // Get username from localStorage for URLs
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.log(error);
      console.error(
        `Error Status code ${error.status}, Error body is: ${error.error}`
      );
      console.table(error);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}