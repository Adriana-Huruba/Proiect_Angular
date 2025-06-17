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
import { Movie } from '../../core/services/interfaces/movie.interface';
import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule
  ],
  providers: [NzModalService],
  templateUrl: './movies-table.component.html',
  styleUrl: './movies-table.component.scss'
})

export class MoviesTableComponent implements OnInit {
  openWindow() {
    throw new Error('Method not implemented.')
  }
  private movieService = inject(MovieService);
  movies = signal<Movie[]>([]);

  form!: FormGroup;
  displayData: Movie[] = [];
  selectedMovie: Movie | null = null;
  isVisible = false;
  pageIndex = 1;
  total = 0;
  pageSize = 8;
  isEditMode = false;

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
    this.total = movies.length;
    this.updateDisplayData();
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
    //this.updateDisplayData();
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
    this.updateDisplayData();
  }

  updateDisplayData() {
    const movies = this.movieService.getMovies();
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


}
