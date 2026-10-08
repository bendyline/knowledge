# Source code: aspnetcore/razor-pages/razor-pages-conventions/samples/6.x/SampleApp/Conventions/GlobalHeaderPageApplicationModelConvention.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using SampleApp.Filters;

namespace SampleApp.Conventions
{
    #region snippet1
    public class GlobalHeaderPageApplicationModelConvention 
        : IPageApplicationModelConvention
    {
        public void Apply(PageApplicationModel model)
        {
            model.Filters.Add(new AddHeaderAttribute(
                "GlobalHeader", new string[] { "Global Header Value" }));
        }
    }
    #endregion
}

```
