import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormControl, Validators } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { MovieService } from '../../core/services/movie.service';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';
import { Movie } from '../../core/interfaces/movie.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieSearchComponent } from "../movie-search/movie-search.component";

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
    NzModalModule,
    NzDividerModule,
    ReactiveFormsModule,
    MovieSearchComponent
  ],
  providers: [NzModalService],
  templateUrl: './movies-table.component.html',
  styleUrl: './movies-table.component.scss'
})

export class MoviesTableComponent implements OnInit {

  private movieService = inject(MovieService);
  movies = signal<Movie[]>([]);
  originalMovies = signal<Movie[]>([]);

  form!: FormGroup;
  displayData: Movie[] = [];
  selectedMovie: Movie | null = null;
  isVisible = false;
  pageIndex = 1;
  total = 0;
  pageSize = 8;
  isEditMode = false;
  searchMovie = '';
  sortKey: string = '';
  sortOrder: 'ascend' | 'descend' | null = null;

  ngOnInit() {
    console.log("initialization");
    this.initializeForm();
    console.log("form initialized", this.form);
    this.loadMovies();
  }

  initializeForm() {
    this.form = new FormGroup({
      title: new FormControl('', { validators: [Validators.required] }),
      year: new FormControl('', { validators: [Validators.required] }),
      genre: new FormControl('', { validators: [Validators.required] }),
      director: new FormControl('', { validators: [Validators.required] }),
      duration: new FormControl('', { validators: [Validators.required] }),
      rating: new FormControl('', { validators: [Validators.required] }),
      description: new FormControl('', { validators: [Validators.required] })
    });
  }

  private loadMovies() {
    const movies = this.movieService.getMovies();
    this.originalMovies.set(movies);
    this.applyFiltersAndSorting();
  }

  handleOk() {
    const movieData: Movie = {
      id: this.isEditMode && this.selectedMovie ? this.selectedMovie.id : this.generateNewId(),
      title: this.form.controls['title'].value,
      year: this.form.controls['year'].value,
      genre: this.form.controls['genre'].value,
      director: this.form.controls['director'].value,
      duration: this.form.controls['duration'].value,
      rating: this.form.controls['rating'].value,
      description: this.form.controls['description'].value
    };

    if (this.isEditMode) {
      this.movieService.updateMovie(movieData);
    }
    else {
      this.movieService.addMovie(movieData);
    }

    this.loadMovies();
    this.isVisible = false;
    this.form.reset();
    this.selectedMovie = null;
    this.isEditMode = false;
  }

  generateNewId(): number {
    return this.movieService.getMovies().length + 1;
  }

  handleCancel() {
    this.isVisible = false;
    this.form.reset();
    this.selectedMovie = null;
    this.isEditMode = false;
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.applyFiltersAndSorting();
  }

  updateDisplayData() {
    const movies = this.movies();
    this.displayData = movies.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize);
    this.total = movies.length;
  }

  editMovie(movie: Movie) {
    console.log("editMovie called", movie);
    this.isEditMode = true;
    this.selectedMovie = movie;
    this.form.patchValue(movie);
    console.log("form patched with", this.form.value);
    this.isVisible = true;
  }

  addMovie() {
    console.log("addMovie called");
    this.isEditMode = false;
    this.selectedMovie = null;
    this.form.reset();
    this.isVisible = true;
  }

  deleteMovie(movie: any): void {
    const confirmDelete = confirm(`Are you sure you want to delete the movie"${movie.title}"?`);
    if (confirmDelete) {
      this.displayData = this.displayData.filter(m => m !== movie);
    }
  }

  onSortOrderChange(sortKey: keyof Movie, sortOrder: string | null): void {

    console.log('Sort key:', sortKey, 'Order:', sortOrder);
    this.sortKey = sortKey;
    this.sortOrder = sortOrder as 'ascend' | 'descend' | null;
    this.pageIndex = 1;
    this.applyFiltersAndSorting();
  }

  onSearchChange(searchText: string) {
    this.searchMovie = searchText.trim();
    this.pageIndex = 1;
    this.applyFiltersAndSorting();
  }

  applyFiltersAndSorting() {
    let movies = [...this.originalMovies()];

    if (this.searchMovie) {
      movies = movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchMovie.toLowerCase())
      );
    }

    if (this.sortKey && this.sortOrder) {
      movies.sort((a, b) => {
        const valueA = a[this.sortKey as keyof Movie] ?? '';
        const valueB = b[this.sortKey as keyof Movie] ?? '';

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sortOrder === 'ascend' ? valueA - valueB : valueB - valueA;
        }

        return this.sortOrder === 'ascend'
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA));
      });
    }

    this.movies.set(movies);
    this.updateDisplayData();
  }

}
