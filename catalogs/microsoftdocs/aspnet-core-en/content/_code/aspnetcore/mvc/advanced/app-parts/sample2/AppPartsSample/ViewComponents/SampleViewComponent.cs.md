# Source code: aspnetcore/mvc/advanced/app-parts/sample2/AppPartsSample/ViewComponents/SampleViewComponent.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;

namespace AppPartsSample.ViewComponents
{
    public class SampleViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke() =>
            View();
    }
}

```
