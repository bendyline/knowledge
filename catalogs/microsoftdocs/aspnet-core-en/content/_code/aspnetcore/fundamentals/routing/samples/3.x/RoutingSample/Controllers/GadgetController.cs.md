# Source code: aspnetcore/fundamentals/routing/samples/3.x/RoutingSample/Controllers/GadgetController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.Docs.Samples;

namespace RoutingSample.Controllers
{
    // <snippet>
    public class GadgetController : Controller
    {
        public IActionResult Index()
        {
            var url = Url.Action("Edit", new { id = 17, });
            return Content(url);
        }
        // </snippet>

        public IActionResult Edit(int id)
        {
            return ControllerContext.MyDisplayRouteInfo(id);
        }
    }
}
```
