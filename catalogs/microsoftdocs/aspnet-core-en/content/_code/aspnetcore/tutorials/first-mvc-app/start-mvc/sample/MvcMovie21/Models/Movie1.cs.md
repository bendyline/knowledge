# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie21/Models/Movie1.cs

Complete source file; linked examples may select a region or line range.

```
//#define AddAModel_first
#if AddAModel_first
#region snippet
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MvcMovie.Models
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
