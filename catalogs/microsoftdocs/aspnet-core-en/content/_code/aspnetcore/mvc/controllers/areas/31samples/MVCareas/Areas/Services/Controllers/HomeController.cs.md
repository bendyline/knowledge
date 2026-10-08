# Source code: aspnetcore/mvc/controllers/areas/31samples/MVCareas/Areas/Services/Controllers/HomeController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.Docs.Samples;

namespace MVCareas.Areas.Services.Controllers
{
    [Area("Services")]

    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["routeInfo"] = ControllerContext.MyDisplayRouteInfo();
            return View();
        }

        public IActionResult About()
        {
            ViewData["routeInfo"] = ControllerContext.MyDisplayRouteInfo();
            return View();
        }
    }
}
```
