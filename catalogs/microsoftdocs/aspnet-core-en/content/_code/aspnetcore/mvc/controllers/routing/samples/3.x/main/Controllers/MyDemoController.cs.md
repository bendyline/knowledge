# Source code: aspnetcore/mvc/controllers/routing/samples/3.x/main/Controllers/MyDemoController.cs

Complete source file; linked examples may select a region or line range.

```
#define MYDEMO

using Microsoft.AspNetCore.Mvc;
using Microsoft.Docs.Samples;

// This uses same routes as HomeController, and MyDemo3Controller so only one can be defined
// Test with                     webBuilder.UseStartup<StartupAPI>();
namespace RoutingSample.Controllers
{
#if MYDEMO
    #region snippet
    public class MyDemoController : Controller
    {
        [Route("")]
        [Route("Home")]
        [Route("Home/Index")]
        [Route("Home/Index/{id?}")]
        public IActionResult MyIndex(int? id)
        {
            return ControllerContext.MyDisplayRouteInfo(id);
        }

        [Route("Home/About")]
        [Route("Home/About/{id?}")]
        public IActionResult MyAbout(int? id)
        {
            return ControllerContext.MyDisplayRouteInfo(id);
        }
    }
    #endregion
#endif
}


```
