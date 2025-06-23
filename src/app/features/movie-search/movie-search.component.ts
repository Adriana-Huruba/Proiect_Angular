import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss'
})

export class MovieSearchComponent {

  @Input() searchTerm: string = '';
  @Output() search = new EventEmitter<string>();

  searchMovies() {
    console.log('Search term:', this.searchTerm);
    this.search.emit(this.searchTerm.trim());
  }
}
