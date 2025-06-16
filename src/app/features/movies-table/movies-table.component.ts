import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormControl } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { MoviesFormModalComponent } from '../movie-form-modal/movie-form-modal.component';
import { MovieService } from '../../core/services/movie.service';

interface Movie {
  id: number;
  title: string;
  director: string;
  duration: number;
  year: number;
  genre: string;
  rating: number;
  description: string;
}

@Component({
  selector: 'app-movies-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzRateModule,
    NzInputModule,
    NzIconModule,
    NzPaginationModule,
    NzModalModule
],
  templateUrl: './movies-table.component.html',
  styleUrl: './movies-table.component.scss'
})

export class MoviesTableComponent {

  private movieService=inject(MovieService);
  movies = signal<Movie[]>([]);
  searchTerm = '';
  currentId = 1;
  modal: NzModalService;

  pageIndex=1;
  total=0;
  pageSize=5;
  onPageChange(page: number) {
    this.pageIndex = page;
  }

  constructor() {
    this.modal = inject(NzModalService);
    this.movies.set(this.movieService.getMovies());
  }

  get filteredMovies(): Movie[] {
    return this.movies().filter(movie =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addMovie(): void {
    console.log('Add movie clicked');
    this.modal.create({
      nzTitle: 'Add movie',
      nzContent: MoviesFormModalComponent,
      nzData: {
        movie: null
      }, //componentInstance: any
      nzOnOk: (componentInstance: MoviesFormModalComponent) => {
        if (componentInstance.form.valid) {
          const newMovie = { id: this.currentId++, ...componentInstance.form.value };
          this.movies.update(movies => [...movies, newMovie]);
        }
      }
    })
  }

  editMovie(movie: Movie) {
    throw new Error('Method not implemented.');
  }

}
