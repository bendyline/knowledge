# Source code: aspnetcore/performance/caching/output/samples/9.x/OCControllers/Controllers/EvictByTagController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace OCControllers.Controllers;

// <snippet_evictbytag>
[ApiController]
[Route("/[controller]/purge/{tag}")]
[OutputCache]
public class EvictByTagController : ControllerBase
{
    [HttpPost]
    public async Task PostAsync(IOutputCacheStore cache, string tag)
    {
        await cache.EvictByTagAsync(tag, default);
    }
}
// </snippet_evictbytag>

```
