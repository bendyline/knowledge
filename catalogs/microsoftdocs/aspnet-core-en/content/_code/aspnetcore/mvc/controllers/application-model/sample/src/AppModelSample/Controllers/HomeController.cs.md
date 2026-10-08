# Source code: aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Controllers/HomeController.cs

Complete source file; linked examples may select a region or line range.

```
using AppModelSample.Conventions;
using Microsoft.AspNetCore.Mvc;

namespace AppModelSample.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        #region ActionModelConvention
        // Route: /Home/MyCoolAction
        [CustomActionName("MyCoolAction")]
        public string SomeName()
        {
            return ControllerContext.ActionDescriptor.ActionName;
        }
        #endregion
    }
}

```
