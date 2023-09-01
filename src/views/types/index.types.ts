export interface ISupportedSearchOption {
  q: string;
  page: number;
}

export interface MovieResponse {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export class SearchResultOfMovieResponse {
  totalResults: number = 0;
  Response: string = "";
  Search: MovieResponse[] = [];
}

interface Rating {
  Source: string;
  Value: string;
}
export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<Rating>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  totalSeasons: string;
  Response: string;
}
