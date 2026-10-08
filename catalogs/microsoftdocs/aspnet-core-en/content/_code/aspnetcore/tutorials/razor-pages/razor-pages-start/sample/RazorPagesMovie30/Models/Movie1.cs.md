# Source code: aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie30/Models/Movie1.cs

Complete source file; linked examples may select a region or line range.

```
#if AddAModel_first
#region snippet
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
