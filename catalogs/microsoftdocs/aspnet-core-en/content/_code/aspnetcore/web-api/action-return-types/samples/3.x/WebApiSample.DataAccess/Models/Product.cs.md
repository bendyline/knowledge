# Source code: aspnetcore/web-api/action-return-types/samples/3.x/WebApiSample.DataAccess/Models/Product.cs

Complete source file; linked examples may select a region or line range.

```
using System.ComponentModel.DataAnnotations;

namespace WebApiSample.DataAccess.Models
{
    // <snippet_ProductClass>
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public bool IsOnSale { get; set; }
    }
    // </snippet_ProductClass>
}

```
