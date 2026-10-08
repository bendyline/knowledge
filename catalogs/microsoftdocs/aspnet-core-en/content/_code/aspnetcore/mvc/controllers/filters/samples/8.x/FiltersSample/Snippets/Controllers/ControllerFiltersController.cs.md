# Source code: aspnetcore/mvc/controllers/filters/samples/8.x/FiltersSample/Snippets/Controllers/ControllerFiltersController.cs

Complete source file; linked examples may select a region or line range.

```
using FiltersSample.Filters;
using Microsoft.AspNetCore.Mvc;

namespace FiltersSample.Snippets.Controllers;

[NonController]
// <snippet_Class>
[SampleActionFilter(Order = int.MinValue)]
public class ControllerFiltersController : Controller
{
    // ...
}
// </snippet_Class>

```
