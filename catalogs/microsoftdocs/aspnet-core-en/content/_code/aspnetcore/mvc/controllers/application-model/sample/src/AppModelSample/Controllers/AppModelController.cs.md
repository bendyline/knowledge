# Source code: aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Controllers/AppModelController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace AppModelSample.Controllers
{
    #region AppModelController
    public class AppModelController : Controller
    {
        public string Description()
        {
            return "Description: " + ControllerContext.ActionDescriptor.Properties["description"];
        }
    }
    #endregion
}

```
