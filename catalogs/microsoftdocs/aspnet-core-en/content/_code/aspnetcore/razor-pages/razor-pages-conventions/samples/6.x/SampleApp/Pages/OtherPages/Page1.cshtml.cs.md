# Source code: aspnetcore/razor-pages/razor-pages-conventions/samples/6.x/SampleApp/Pages/OtherPages/Page1.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
namespace SampleApp.Pages.OtherPages;

public class Page1Model : BaseModel
{
    public Page1Model(ILogger<BaseModel> logger) : base(logger)
    {
    }

    public void OnGet()
    {
        SetTemplateData("Page1");
    }
}

```
