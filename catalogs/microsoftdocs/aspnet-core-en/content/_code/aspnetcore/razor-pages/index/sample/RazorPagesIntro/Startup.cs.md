# Source code: aspnetcore/razor-pages/index/sample/RazorPagesIntro/Startup.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace RazorPagesIntro
{
    #region snippet_Startup
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            // Includes support for Razor Pages and controllers.
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseMvc();
        }
    }
    #endregion
}
```
