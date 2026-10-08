# Source code: aspnetcore/mvc/advanced/custom-model-binding/samples/3.x/CustomModelBindingSample/Startup.cs

Complete source file; linked examples may select a region or line range.

```
using CustomModelBindingSample.Binders;
using CustomModelBindingSample.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CustomModelBindingSample
{
    public class Startup
    {
        #region snippet_ConfigureServices
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AuthorContext>(options => options.UseInMemoryDatabase("Authors"));

            services.AddControllers(options =>
            {
                options.ModelBinderProviders.Insert(0, new AuthorEntityBinderProvider());
            });
        }
        #endregion

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

```
