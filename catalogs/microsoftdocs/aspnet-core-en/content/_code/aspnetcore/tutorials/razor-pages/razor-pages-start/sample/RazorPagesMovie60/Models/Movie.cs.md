# Source code: aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie60/Models/Movie.cs

Complete source file; linked examples may select a region or line range.

```
//#define First
#if First
#region snippet1
using System.ComponentModel.DataAnnotations;

namespace RazorPagesMovie.Models
{
    public class Movie
    {
        public int ID { get; set; }
        public string Title { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        public DateTime ReleaseDate { get; set; }
        public string Genre { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}
#endregion
#endif
```
