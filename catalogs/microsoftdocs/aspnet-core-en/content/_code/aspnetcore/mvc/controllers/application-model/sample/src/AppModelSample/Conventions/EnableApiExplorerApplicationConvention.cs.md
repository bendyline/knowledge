# Source code: aspnetcore/mvc/controllers/application-model/sample/src/AppModelSample/Conventions/EnableApiExplorerApplicationConvention.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace AppModelSample.Conventions
{
    public class EnableApiExplorerApplicationConvention : IApplicationModelConvention
    {
        public void Apply(ApplicationModel application)
        {
            application.ApiExplorer.IsVisible = true;
        }
    }
}
```
