# Source code: aspnetcore/security/cors/8.0sample/Cors/Web2API/Pages/Index.cshtml.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Configuration;

namespace WebAPI
{
    public class IndexModel : HostPageModel
    {
        private readonly IConfiguration Configuration;

        public IndexModel(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void OnGet()
        {
            SetHost(Configuration);
        }
    }
}
```
