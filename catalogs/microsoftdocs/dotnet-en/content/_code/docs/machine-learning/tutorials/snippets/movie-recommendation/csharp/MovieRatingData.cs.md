# Source code: docs/machine-learning/tutorials/snippets/movie-recommendation/csharp/MovieRatingData.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.ML.Data;

namespace MovieRecommendation
{
    // <SnippetMovieRatingClass>
    public class MovieRating
    {
        [LoadColumn(0)]
        public float userId;
        [LoadColumn(1)]
        public float movieId;
        [LoadColumn(2)]
        public float Label;
    }
    // </SnippetMovieRatingClass>

    // <SnippetPredictionClass>
    public class MovieRatingPrediction
    {
        public float Label;
        public float Score;
    }
    // </SnippetPredictionClass>
}

```
