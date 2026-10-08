# Source code: aspnetcore/release-notes/aspnetcore-6.0/samples/WebMvcEF/Models/Movie.cs

Complete source file; linked examples may select a region or line range.

```
namespace WebMvcEF.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string? Title { get; set; }

        public DateTime ReleaseDate { get; set; }
        public string? Genre { get; set; }
        public decimal Price { get; set; }
    }
}

```
