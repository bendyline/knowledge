# Source code: aspnetcore/razor-pages/razor-pages-conventions/samples/6.x/SampleApp/Pages/OtherPages/Page2.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
namespace SampleApp.Pages.OtherPages;

public class Page2Model : BaseModel
{
    public Page2Model(ILogger<BaseModel> logger) : base(logger)
    {
    }
    
    public void OnGet()
    {
        SetTemplateData("Page2");
    }
}

```
