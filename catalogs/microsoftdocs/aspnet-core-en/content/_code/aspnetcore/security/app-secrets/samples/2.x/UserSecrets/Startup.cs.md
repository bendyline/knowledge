# Source code: aspnetcore/security/app-secrets/samples/2.x/UserSecrets/Startup.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace UserSecrets
{
    #region snippet_StartupClass
    public class Startup
    {
        private string _moviesApiKey = null;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            _moviesApiKey = Configuration["Movies:ServiceApiKey"];
        }

        public void Configure(IApplicationBuilder app)
        {
            app.Run(async (context) =>
            {
                var result = string.IsNullOrEmpty(_moviesApiKey) ? "Null" : "Not Null";
                await context.Response.WriteAsync($"Secret is {result}");
            });
        }
    }
    #endregion snippet_StartupClass
}

```
