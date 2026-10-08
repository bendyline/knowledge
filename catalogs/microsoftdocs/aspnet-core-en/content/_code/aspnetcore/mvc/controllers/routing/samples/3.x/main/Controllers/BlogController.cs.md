# Source code: aspnetcore/mvc/controllers/routing/samples/3.x/main/Controllers/BlogController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.Docs.Samples;

namespace WebMvcRouting.Controllers
{
    // requires   webBuilder.UseStartup<Startup>();
    #region snippet
    public class BlogController : Controller
    {
        public IActionResult Article()
        {
            return ControllerContext.MyDisplayRouteInfo();
        }

        public IActionResult Index()
        {
            return ControllerContext.MyDisplayRouteInfo();
        }
    }
    #endregion
}
```
