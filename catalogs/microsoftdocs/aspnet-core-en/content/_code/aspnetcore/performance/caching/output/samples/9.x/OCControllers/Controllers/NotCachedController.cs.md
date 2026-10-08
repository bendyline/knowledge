# Source code: aspnetcore/performance/caching/output/samples/9.x/OCControllers/Controllers/NotCachedController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace OCControllers.Controllers;

[ApiController]
[Route("/")]
public class NotCachedController : ControllerBase
{
     public async Task GetAsync()
    {
        await Gravatar.WriteGravatar(HttpContext);
    }
}

```
