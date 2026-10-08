# Source code: aspnetcore/fundamentals/logging/index/samples/6.x/TodoApiDTO/Pages/About.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TodoApi.Pages
{
    #region snippet_CallLogMethods
    public class AboutModel : PageModel
    {
        private readonly ILogger _logger;

        public AboutModel(ILogger<AboutModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            _logger.LogInformation("About page visited at {DT}", 
                DateTime.UtcNow.ToLongTimeString());
        }
    }
    #endregion
}

```
