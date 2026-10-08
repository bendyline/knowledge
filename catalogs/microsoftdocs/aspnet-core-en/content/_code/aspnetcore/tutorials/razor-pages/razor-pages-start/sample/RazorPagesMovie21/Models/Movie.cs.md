# Source code: aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie21/Models/Movie.cs

Complete source file; linked examples may select a region or line range.

```
#if Never
#region snippet1
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace RazorPagesMovie.Models
{
    public class Movie
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Genre { get; set; }
        public decimal Price { get; set; }
    }
}
#endregion
#endif
```
