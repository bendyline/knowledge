# Source code: aspnetcore/mvc/controllers/filters/samples/3.x/FiltersSample/StartupAF.cs

Complete source file; linked examples may select a region or line range.

```
using FiltersSample.Filters;
using FiltersSample.Helper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FiltersSample
{
    public class StartupAF
    {
        public StartupAF(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // <snippet>
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<PositionOptions>(
                     Configuration.GetSection("Position"));
            services.AddScoped<MyActionFilterAttribute>();

            services.AddControllersWithViews();
        }
        // </snippet>

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}

```
