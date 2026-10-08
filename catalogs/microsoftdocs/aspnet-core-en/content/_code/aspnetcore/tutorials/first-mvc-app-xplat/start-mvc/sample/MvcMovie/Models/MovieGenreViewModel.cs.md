# Source code: aspnetcore/tutorials/first-mvc-app-xplat/start-mvc/sample/MvcMovie/Models/MovieGenreViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace MvcMovie.Models
{
    public class MovieGenreViewModel
    {
        public List<Movie> movies;
        public SelectList genres;
        public string movieGenre { get; set; }
    }
}
```
