# Source code: aspnetcore/security/app-secrets/samples/6.x/UserSecrets/Pages/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace UserSecrets.Pages
{
    #region snippet_PageModel
    public class IndexModel : PageModel
    {
        private readonly IConfiguration _config;

        public IndexModel(IConfiguration config)
        {
            _config = config;
        }

        public void OnGet()
        {
            var moviesApiKey = _config["Movies:ServiceApiKey"];

            // call Movies service with the API key
        }
    }
    #endregion
}
```
