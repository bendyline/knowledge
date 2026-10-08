# Source code: aspnetcore/fundamentals/logging/index/samples/3.x/TodoApiDTO/Pages/Privacy.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace TodoApi.Pages
{
    #region snippet
    public class PrivacyModel : PageModel
    {
        private readonly ILogger<PrivacyModel> _logger;

        public PrivacyModel(ILogger<PrivacyModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            _logger.LogInformation("GET Pages.PrivacyModel called.");
        }
    }
    #endregion
}

```
