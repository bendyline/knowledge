# Source code: aspnetcore/mvc/views/partial/sample/PartialViewsSample/Pages/DiscoveryRP.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PartialViewsSample.Pages
{
    public class DiscoveryModel : PageModel
    {
        public void OnGet() => Page();

        #region snippet_OnGetPartial
        public IActionResult OnGetPartial() =>
            Partial("_AuthorPartialRP");
        #endregion
    }
}

```
