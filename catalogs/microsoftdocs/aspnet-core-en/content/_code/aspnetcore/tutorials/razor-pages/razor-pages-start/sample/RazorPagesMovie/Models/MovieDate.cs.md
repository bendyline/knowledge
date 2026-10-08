# Source code: aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie/Models/MovieDate.cs

Complete source file; linked examples may select a region or line range.

```
//#define First
#if First

#region snippet_1
using System;

namespace RazorPagesMovie.Models
{
    public class Movie
    {
        public int ID { get; set; }
        public string Title { get; set; }

        [Display(Name = "Release Date")]
        [DataType(DataType.Date)]
        public DateTime ReleaseDate { get; set; }
        public string Genre { get; set; }
        public decimal Price { get; set; }
    }
}
#endregion
#endif

```
