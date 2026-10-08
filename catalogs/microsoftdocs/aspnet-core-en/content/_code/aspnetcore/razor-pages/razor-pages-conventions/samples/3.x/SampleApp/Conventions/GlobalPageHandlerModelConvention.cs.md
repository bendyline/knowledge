# Source code: aspnetcore/razor-pages/razor-pages-conventions/samples/3.x/SampleApp/Conventions/GlobalPageHandlerModelConvention.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace SampleApp.Conventions
{
    #region snippet1
    public class GlobalPageHandlerModelConvention
        : IPageHandlerModelConvention
    {
        public void Apply(PageHandlerModel model)
        {
            // Access the PageHandlerModel
        }
    }
    #endregion
}
```
