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
                id: 3,
                title: 'Interstellar',
                director: 'Christopher Nolan',
                duration: 169,
                year: 2014,
                genre: 'Adventure',
                rating: 8.6,
                description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
            },
            {
                id: 4,
                title: 'The Shawshank Redemption',
                director: 'Frank Darabont',
                duration: 142,
                year: 1994,
                genre: 'Drama',
                rating: 9.3,
                description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
            },
            {
                id: 5,
                title: 'The Matrix',
                director: 'Lana Wachowski, Lilly Wachowski',
                duration: 136,
                year: 1999,
                genre: 'Sci-Fi',
                rating: 8.7,
                description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
            },
            {
                id: 6,
                title: 'Pulp Fiction',
                director: 'Quentin Tarantino',
                duration: 154,
                year: 1994,
                genre: 'Crime',
                rating: 8.9,
                description: 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
            },
            {
                id: 7,
                title: 'The Dark Knight',
                director: 'Christopher Nolan',
                duration: 152,
                year: 2008,
                genre: 'Action',
                rating: 9.0,
                description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.'
            },
            {
                id: 8,
                title: 'Forrest Gump',
                director: 'Robert Zemeckis',
                duration: 142,
                year: 1994,
                genre: 'Drama',
                rating: 6.8,
                description: 'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with a low IQ.'
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