# Source code: aspnetcore/fundamentals/routing/samples/3.x/RoutingSample/Controllers/HomeController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.Docs.Samples;

namespace RoutingSample.Controllers
{
    #region snippet
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return ControllerContext.MyDisplayRouteInfo();
        }

        public IActionResult Privacy()
        {
            return ControllerContext.MyDisplayRouteInfo();
        }

        #endregion

        public IActionResult Subscribe(int id)
        {
            return ControllerContext.MyDisplayRouteInfo(id);
        }
    }
}

```
