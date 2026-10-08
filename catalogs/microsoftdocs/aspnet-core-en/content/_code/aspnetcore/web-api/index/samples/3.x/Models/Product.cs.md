# Source code: aspnetcore/web-api/index/samples/3.x/Models/Product.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

namespace WebApiSample.Models
{
    public class Product
    {
        public int Id { get; set; }

        public bool IsDiscontinued { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}

```
