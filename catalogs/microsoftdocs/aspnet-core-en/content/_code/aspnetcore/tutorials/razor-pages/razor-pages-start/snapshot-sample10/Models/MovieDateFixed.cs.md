# Source code: aspnetcore/tutorials/razor-pages/razor-pages-start/snapshot-sample10/Models/MovieDateFixed.cs

Complete source file; linked examples may select a region or line range.

```
//#define MOVIE_DATE_FIXED
#if MOVIE_DATE_FIXED
// <snippet_1>
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RazorPagesMovie.Models;

public class Movie
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;

    [Display(Name = "Release Date")]
    [DataType(DataType.Date)]
    public DateTime ReleaseDate { get; set; }
    public string Genre { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }
}
// </snippet_1>
#endif

```
