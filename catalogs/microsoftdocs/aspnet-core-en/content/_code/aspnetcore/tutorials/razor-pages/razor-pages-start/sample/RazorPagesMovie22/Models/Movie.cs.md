# Source code: aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie22/Models/Movie.cs

Complete source file; linked examples may select a region or line range.

```
//#define First 
#if First
#region snippet1
using System;
using System.ComponentModel.DataAnnotations;

namespace RazorPagesMovie.Models
{
    public class Movie
    {
        public int ID { get; set; }
        public string Title { get; set; }

        [DataType(DataType.Date)]
        public DateTime ReleaseDate { get; set; }
        public string Genre { get; set; }
        public decimal Price { get; set; }
    }
}
#endregion
#endif
```
