# Source code: aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Controllers/HelperController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace ViewInjectSample.Controllers
{
    public class HelperController : Controller
    {
        [Route("Helper")]
        public IActionResult Index()
        {
            return View();
        }
    }
}

```
