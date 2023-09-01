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
