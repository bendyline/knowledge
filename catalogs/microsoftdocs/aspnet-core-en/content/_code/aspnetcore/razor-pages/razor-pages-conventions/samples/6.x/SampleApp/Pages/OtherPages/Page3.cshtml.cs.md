# Source code: aspnetcore/razor-pages/razor-pages-conventions/samples/6.x/SampleApp/Pages/OtherPages/Page3.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using SampleApp.Filters;

namespace SampleApp.Pages.OtherPages;

[ReplaceRouteValueFilter]
public class Page3Model : BaseModel
{
    public Page3Model(ILogger<BaseModel> logger) : base(logger)
    {
    }

    public void OnGet()
    {
        SetTemplateData("Page1");
    }
}

```
