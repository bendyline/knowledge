# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie/Models/MovieNoEF.cs

Complete source file; linked examples may select a region or line range.

```
//#define MovieNoEF
#if MovieNoEF
#region snippet_1
using System;

namespace MvcMovie.Models
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
