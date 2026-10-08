# Source code: aspnetcore/mvc/controllers/filters/samples/8.x/FiltersSample/Controllers/ExceptionController.cs

Complete source file; linked examples may select a region or line range.

```
using FiltersSample.Filters;
using Microsoft.AspNetCore.Mvc;

namespace FiltersSample.Controllers;

// <snippet_Class>
[TypeFilter<SampleExceptionFilter>]
public class ExceptionController : Controller
{
    public IActionResult Index() =>
        Content($"- {nameof(ExceptionController)}.{nameof(Index)}");
}
// </snippet_Class>

```
