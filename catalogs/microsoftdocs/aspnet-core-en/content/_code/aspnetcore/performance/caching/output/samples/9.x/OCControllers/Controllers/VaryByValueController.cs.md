# Source code: aspnetcore/performance/caching/output/samples/9.x/OCControllers/Controllers/VaryByValueController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace OCControllers.Controllers;

// <snippet_selectquery>
[ApiController]
[Route("/[controller]")]
[OutputCache(PolicyName = "VaryByValue")]
public class VaryByValueController : ControllerBase
{
    public async Task GetAsync()
    {
        await Gravatar.WriteGravatar(HttpContext);
    }
}
// </snippet_selectquery>

```
