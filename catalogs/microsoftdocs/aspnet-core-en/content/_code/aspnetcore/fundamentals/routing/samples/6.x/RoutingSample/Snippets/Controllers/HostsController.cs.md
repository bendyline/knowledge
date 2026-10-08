# Source code: aspnetcore/fundamentals/routing/samples/6.x/RoutingSample/Snippets/Controllers/HostsController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace RoutingSample.Snippets.Controllers;

[NonController]
// <snippet_Class>
[Host("contoso.com", "adventure-works.com")]
public class HostsController : Controller
{
    public IActionResult Index() =>
        View();

    [Host("example.com")]
    public IActionResult Example() =>
        View();
}
// </snippet_Class>

```
