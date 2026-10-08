# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/10.0-completed/Models/MovieGenreViewModel.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace MvcMovie.Models;

public class MovieGenreViewModel
{
    public List<Movie>? Movies { get; set; }
    public SelectList? Genres { get; set; }
    public string? MovieGenre { get; set; }
    public string? SearchString { get; set; }
}
```
