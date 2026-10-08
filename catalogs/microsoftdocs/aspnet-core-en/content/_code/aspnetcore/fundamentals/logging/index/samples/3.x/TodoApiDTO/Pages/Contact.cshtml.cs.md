# Source code: aspnetcore/fundamentals/logging/index/samples/3.x/TodoApiDTO/Pages/Contact.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace TodoApi.Pages
{
    #region snippet
    public class ContactModel : PageModel
    {
        private readonly ILogger _logger;

        public ContactModel(ILoggerFactory logger)
        {
            _logger = logger.CreateLogger("TodoApi.Pages.ContactModel.MyCategory");
        }

        public void OnGet()
        {
            _logger.LogInformation("GET Pages.ContactModel called.");
        }
        #endregion
    }
}
```
