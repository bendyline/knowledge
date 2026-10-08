# Source code: aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/zMovie.cs

Complete source file; linked examples may select a region or line range.

```
#if NEVER
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
#endif
```
