# Source code: aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/Controllers/ProductsController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ResponseFormattingSample.Controllers
{
    // <snippet>
    [Route("api/[controller]")]
    [ApiController]
    [FormatFilter]
    public class ProductsController : ControllerBase
    {
        [HttpGet("{id}.{format?}")]
        public Product Get(int id)
        {
            // </snippet>

            return new Product();
        }
    }

    public class Product
    {
    }
}

```
