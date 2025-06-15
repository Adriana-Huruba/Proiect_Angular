import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MoviesFormModalComponent } from '../movie-form-modal.component';

interface Movie {
  id: number;
  title: string;
  director: string;
  duration: number;
  genre: string;
  rating: number;
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
    NzIconModule
  ],
  templateUrl: './movies-table.component.html',
  styleUrl: './movies-table.component.scss'
})

export class MoviesTableComponent {

  movies = signal<Movie[]>([]);
  searchTerm = '';
  currentId = 1;
  modal: NzModalService;

  constructor() {
    this.modal = inject(NzModalService);
  }

  get filteredMovies(): Movie[] {
    return this.movies().filter(movie =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addMovie(): void {
    this.modal.create({
      nzTitle: 'Add movie',
      nzContent: MoviesFormModalComponent,
      nzData: {
        movie: null
      },
      nzOnOk: (componentInstance: any) => {
        if (componentInstance.form.valid) {
          const newMovie = { id: this.currentId++, ...componentInstance.form.value };
          this.movies.update(movies => [...movies, newMovie]);
        }
      }
    })
  }

}
