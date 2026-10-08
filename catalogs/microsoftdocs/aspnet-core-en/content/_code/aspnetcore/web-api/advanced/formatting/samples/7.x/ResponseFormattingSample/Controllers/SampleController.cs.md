# Source code: aspnetcore/web-api/advanced/formatting/samples/7.x/ResponseFormattingSample/Controllers/SampleController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using ResponseFormattingSample.Snippets.Models;

namespace ResponseFormattingSample.Controllers;

[ApiController]
[Route("/api/Sample")]
public class SampleController : ControllerBase
{
    [HttpPost]
    public IActionResult Post(SampleModel sampleModel)
        => Ok(sampleModel);
}

```
