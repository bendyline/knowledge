# Source code: aspnetcore/mvc/controllers/routing/samples/6.x/main/Controllers/SubscriptionManagementController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.Docs.Samples;

namespace WebMvcRouting.Controllers
{
    #region snippet
    public class SubscriptionManagementController : Controller
    {
        [HttpGet("[controller]/[action]")]
        public IActionResult ListAll()
        {
            return ControllerContext.MyDisplayRouteInfo();
        }
    }
    #endregion
}
```
