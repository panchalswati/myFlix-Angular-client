import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  /**
   * constructor
   * @param fetchApiData 
   * @param dialog 
   * @param snackBar 
   */
  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();

  }

  /**
   * uses API end-point to get a list of all movies in json format
   * @function getAllMovies
   * @returns an array of movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }


  /**
   * opens the dialog to display user favorite movies list
   * @function getFavoriteMovies
   * @returns displays all the favourite movies selected by user
  */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id)
  }

  /**
   * opens the dialog to display information from GenreViewComponent
   * @function openGenreDialog
   * @param name {string}
   * @param description {string}
   * @returns display genre information of the selected movie
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assign dialog width
      width: '500px'
    });
  }

  /**
   * opens dialog to display information from DirectorViewComponent
   * @function openDirectorDialog
   * @param name {string}
   * @param bio {string}
   * @param birthday {date}
   * @returns displays director information of the selected movie
   */
  openDirectorDialog(name: string, bio: string, birthday: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthdate: birthday,
      },
      // Assign dialog width
      width: '500px'
    });

  }

  /**
   * opens dialog to display information about movie
   * @function openSynopsisDialog
   * @param title {string}
   * @param description {string}
   * @returns movie information
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      // Assign dialog width
      width: '500px'
    });

  }

  /**
   * add selected movie to user profile's favourite movies list
   * @function addFavoriteMovie
   * @param movie_id {string}
   * @returns adds movie to user's favourite movie list
   */
  addFavoriteMovie(movie_id: string): void {
    this.fetchApiData.addFavoriteMovie(movie_id).subscribe((result) => {
      console.log(result);
    },
      (result) => {
        console.log(result);

      })
  }

  /**
   * remove movie from user's favourite movie list
   * @function removeFavoriteMovie
   * @param id {string}
   * @returns removes selected movie from favourite movies list
   */
  removeFavoriteMovie(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }
}
