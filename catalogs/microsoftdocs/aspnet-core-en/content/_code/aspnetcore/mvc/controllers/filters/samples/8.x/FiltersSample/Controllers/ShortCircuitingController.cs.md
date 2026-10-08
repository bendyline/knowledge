# Source code: aspnetcore/mvc/controllers/filters/samples/8.x/FiltersSample/Controllers/ShortCircuitingController.cs

Complete source file; linked examples may select a region or line range.

```
using Filters.Filters;
using FiltersSample.Filters;
using Microsoft.AspNetCore.Mvc;

namespace FiltersSample.Controllers;

// <snippet_Class>
[ResponseHeader("Filter-Header", "Filter Value")]
public class ShortCircuitingController : Controller
{
    [ShortCircuitingResourceFilter]
    public IActionResult Index() =>
        Content($"- {nameof(ShortCircuitingController)}.{nameof(Index)}");
}
// </snippet_Class>

```
