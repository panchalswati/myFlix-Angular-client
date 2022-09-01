import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  filteredMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }

  // open edit profile dialog
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: '300px'
    })
  }

  //deleteUser
  deleteProfile(): void {
    if (confirm('Are you sure u want to delete your account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('successfully deleted the account', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }

  //getfavoriteMovies
  getFavoriteMovies(): void {
    this.fetchApiData
      .getAllMovies().subscribe((response: any) => {
        this.movies = response;
        this.filteredMovies = this.filterMovies(this.movies, this.user.FavouriteMovies);
        return this.filteredMovies;
      });
  }

  filterMovies(movies: any, FavouriteMovies: any): any {
    let remainingMovies = [];
    for (let movie in movies) {
      if (FavouriteMovies.includes(movies[movie]._id)) {
        remainingMovies.push(movies[movie]);
      }
    }
    return remainingMovies;
  }

  //remove favoriteMovies
  removeFavoriteMovie(movie_id: string): void {
    this.fetchApiData
      .removeFavoriteMovie(movie_id)
      .subscribe((response) => {
        console.log(response);
        window.location.reload();
      });
  }

}
