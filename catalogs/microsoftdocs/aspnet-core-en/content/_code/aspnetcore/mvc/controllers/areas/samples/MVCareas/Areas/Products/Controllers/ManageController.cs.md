# Source code: aspnetcore/mvc/controllers/areas/samples/MVCareas/Areas/Products/Controllers/ManageController.cs

Complete source file; linked examples may select a region or line range.

```
#region snippet
using Microsoft.AspNetCore.Mvc;

namespace MVCareas.Areas.Products.Controllers
{
    #region snippet2
    [Area("Products")]
    public class ManageController : Controller
    {
    #endregion
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }
    }
}
#endregion
```
