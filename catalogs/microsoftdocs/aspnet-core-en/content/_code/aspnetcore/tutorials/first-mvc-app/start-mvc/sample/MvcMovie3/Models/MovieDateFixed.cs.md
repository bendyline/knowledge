# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie3/Models/MovieDateFixed.cs

Complete source file; linked examples may select a region or line range.

```
//#define First
#if First

#region snippet_1
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MvcMovie.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }

        [Display(Name = "Release Date")]
        [DataType(DataType.Date)]
        public DateTime ReleaseDate { get; set; }
        public string Genre { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }
    }
}
#endregion
#endif

```
