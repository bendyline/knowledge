# Source code: aspnetcore/mvc/controllers/routing/samples/6.x/nsrc/Controllers/HomeController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace My.Application.Controllers
{
    public class HomeController : Controller
    {
        // /controllers/home/index
        public IActionResult Index()
        {
            var template = ControllerContext.ActionDescriptor.AttributeRouteInfo?.Template;
            return Content($"Index- template:{template}");
        }

        public IActionResult List(int? id)
        {
            var path = Request.Path.Value;
            return Content($"List- Path:{path}");
        }

    }
}
```
