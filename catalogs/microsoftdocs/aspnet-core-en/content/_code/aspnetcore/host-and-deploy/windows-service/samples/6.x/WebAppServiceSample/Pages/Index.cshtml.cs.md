# Source code: aspnetcore/host-and-deploy/windows-service/samples/6.x/WebAppServiceSample/Pages/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace SampleApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            _logger.LogInformation("Logged from the IndexModel.OnGet method at {Time}", DateTimeOffset.Now);
        }
    }
}

```
