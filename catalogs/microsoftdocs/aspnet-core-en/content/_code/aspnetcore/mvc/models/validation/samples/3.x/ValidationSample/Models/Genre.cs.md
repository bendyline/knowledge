# Source code: aspnetcore/mvc/models/validation/samples/3.x/ValidationSample/Models/Genre.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

namespace ValidationSample.Models
{
    public enum Genre
    {
        Classic,
        [Display(Name = "Post Classic")]
        PostClassic,
        Modern,
        [Display(Name = "Post Modern")]
        PostModern,
        Contemporary
    }
}

```
