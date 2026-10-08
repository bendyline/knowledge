# Source code: aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Controllers/SampleController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace KestrelSample.Snippets.Controllers;

public class SampleController : ControllerBase
{
    // <snippet_RequestSizeLimit>
    [RequestSizeLimit(100_000_000)]
    public IActionResult Get()
    // </snippet_RequestSizeLimit>
        => NoContent();
}

```
