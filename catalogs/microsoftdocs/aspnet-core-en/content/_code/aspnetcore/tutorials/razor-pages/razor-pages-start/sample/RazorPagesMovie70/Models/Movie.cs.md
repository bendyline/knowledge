# Source code: aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie70/Models/Movie.cs

Complete source file; linked examples may select a region or line range.

```
//#define First
#if First
// <snippet1>
using System.ComponentModel.DataAnnotations;

namespace RazorPagesMovie.Models;

public class Movie
{
    public int Id { get; set; }
    public string? Title { get; set; }
    [DataType(DataType.Date)]
    public DateTime ReleaseDate { get; set; }
    public string? Genre { get; set; }
    public decimal Price { get; set; }
}
// </snippet1>
#endif

```
