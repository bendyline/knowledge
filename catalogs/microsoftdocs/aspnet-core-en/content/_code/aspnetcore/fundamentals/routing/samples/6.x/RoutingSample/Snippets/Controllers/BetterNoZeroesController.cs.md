# Source code: aspnetcore/fundamentals/routing/samples/6.x/RoutingSample/Snippets/Controllers/BetterNoZeroesController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace RoutingSample.Snippets.Controllers;
    
[ApiController]
[Route("api/[controller]")]
public class BetterNoZeroesController : ControllerBase
{
    // <snippet_Action>
    [HttpGet("{id}")]
    public IActionResult Get(string id)
    {
        if (id.Contains('0'))
        {
            return StatusCode(StatusCodes.Status406NotAcceptable);
        }

        return Content(id);
    }
    // </snippet_Action>
}

```
