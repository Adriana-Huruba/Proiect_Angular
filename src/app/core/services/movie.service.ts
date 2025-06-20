import { Injectable } from "@angular/core";
import { Movie } from "../interfaces/movie.interface";

@Injectable({
    providedIn: 'root'
})

export class MovieService {
    constructor() { }
    private listOfMovies() {
        return [
            {
                id: 1,
                title: 'Inception',
                director: 'Christopher Nolan',
                duration: 148,
                year: 2010,
                genre: 'Sci-Fi',
                rating: 8.8,
                description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.'
            },
            {
                id: 2,
                title: 'The Dark Knight',
                director: 'Christopher Nolan',
                duration: 152,
                year: 2008,
                genre: 'Action',
                rating: 9.0,
                description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
            },
            {
                id:3,
                title: 'Interstellar',
                director: 'Christopher Nolan',
                duration: 169,
                year: 2014,
                genre: 'Adventure',
                rating: 8.6,
                description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
            }
        ];
    }

    private movies: Movie[] = this.listOfMovies();

    getMovies(): Movie[] {
        return this.movies;
    }

    updateMovie(updatedMovie: Movie) {
        const index = this.movies.findIndex(movie => movie.id === updatedMovie.id);
        if (index !== -1) {
            this.movies[index] = updatedMovie;
        }
    }

    addMovie(newMovie: Movie) {
        this.movies.push(newMovie);
    }

    searchByTitle(search: string): Movie[] {
        return this.movies.filter(movie =>
             movie.title.toLowerCase().includes(search.toLowerCase()));
    }
}