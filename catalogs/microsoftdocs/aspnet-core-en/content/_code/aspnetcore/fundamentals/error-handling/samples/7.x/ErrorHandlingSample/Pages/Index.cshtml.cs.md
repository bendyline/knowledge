# Source code: aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Pages/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ErrorHandlingSample.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;

    public IndexModel(ILogger<IndexModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {
        throw new FileNotFoundException();
    }
}

```
