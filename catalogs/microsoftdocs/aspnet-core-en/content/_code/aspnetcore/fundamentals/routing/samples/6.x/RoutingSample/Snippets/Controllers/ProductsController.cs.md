# Source code: aspnetcore/fundamentals/routing/samples/6.x/RoutingSample/Snippets/Controllers/ProductsController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace RoutingSample.Snippets.Controllers;

// <snippet_ClassGet>
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet("{id}", Name = nameof(GetProduct))]
    public IActionResult GetProduct(string id)
    {
        // ...
        // </snippet_ClassGet>
        return Ok();
    }

    // <snippet_AddRelatedProduct>
    [HttpPost("{id}/Related")]
    public IActionResult AddRelatedProduct(
        string id, string pathToRelatedProduct, [FromServices] LinkParser linkParser)
    {
        var routeValues = linkParser.ParsePathByEndpointName(
            nameof(GetProduct), pathToRelatedProduct);
        var relatedProductId = routeValues?["id"];

        // ...
        // </snippet_AddRelatedProduct>

        return NoContent();
    }
}

```
