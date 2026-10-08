# Source code: docs/azure/sdk/snippets/logging/Pages/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
namespace LoggingSampleApp.Pages
{
    // <FetchServiceAndStart>
    using Microsoft.AspNetCore.Mvc.RazorPages;
    using Microsoft.Extensions.Azure;

    public class IndexModel : PageModel
    {
        public IndexModel(AzureEventSourceLogForwarder logForwarder) =>
            logForwarder.Start();
        // </FetchServiceAndStart>

        public void OnGet()
        {
        }
    }
}

```
