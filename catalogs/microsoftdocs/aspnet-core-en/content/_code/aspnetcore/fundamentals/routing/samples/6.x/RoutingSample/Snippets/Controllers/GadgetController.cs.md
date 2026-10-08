# Source code: aspnetcore/fundamentals/routing/samples/6.x/RoutingSample/Snippets/Controllers/GadgetController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace RoutingSample.Snippets.Controllers;

// <snippet_Class>
public class GadgetController : ControllerBase
{
    public IActionResult Index() =>
        Content(Url.Action("Edit", new { id = 17 })!);
}
// </snippet_Class>

```
