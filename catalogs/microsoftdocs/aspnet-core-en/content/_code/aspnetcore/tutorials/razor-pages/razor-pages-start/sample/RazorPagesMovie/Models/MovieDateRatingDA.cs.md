# Source code: aspnetcore/tutorials/razor-pages/razor-pages-start/sample/RazorPagesMovie/Models/MovieDateRatingDA.cs

Complete source file; linked examples may select a region or line range.

```
#define MovieDateRatingDA
#if MovieDateRatingDA
#region snippet1
using System;
using System.ComponentModel.DataAnnotations;
namespace RazorPagesMovie.Models
{
    public class Movie
    {
        public int ID { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Required]
        public string Title { get; set; }

        #region snippet2
        [Display(Name = "Release Date")]
        [DataType(DataType.Date)]
        public DateTime ReleaseDate { get; set; }

        [Range(1, 100)]
        [DataType(DataType.Currency)]
        public decimal Price { get; set; }
        #endregion

        [RegularExpression(@"^[A-Z]+[a-zA-Z\s]*$")]
        [Required]
        [StringLength(30)]
        public string Genre { get; set; }

        [RegularExpression(@"^[A-Z]+[a-zA-Z0-9""'\s-]*$")]
        [StringLength(5)]
        [Required]
        public string Rating { get; set; }
    }
    #endregion
}
#endif

```
