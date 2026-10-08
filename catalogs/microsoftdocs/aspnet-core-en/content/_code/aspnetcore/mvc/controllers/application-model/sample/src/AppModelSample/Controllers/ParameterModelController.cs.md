# Source code: aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Controllers/ParameterModelController.cs

Complete source file; linked examples may select a region or line range.

```
using AppModelSample.Conventions;
using Microsoft.AspNetCore.Mvc;

namespace AppModelSample.Controllers
{
    #region ParameterModelController
    public class ParameterModelController : Controller
    {
        // Will bind:  /ParameterModel/GetById/123
        // WON'T bind: /ParameterModel/GetById?id=123
        public string GetById([MustBeInRouteParameterModelConvention]int id)
        {
            return $"Bound to id: {id}";
        }
    }
    #endregion
}

```
