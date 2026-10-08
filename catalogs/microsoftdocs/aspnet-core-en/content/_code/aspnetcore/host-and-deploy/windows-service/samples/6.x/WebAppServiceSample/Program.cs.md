# Source code: aspnetcore/host-and-deploy/windows-service/samples/6.x/WebAppServiceSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Hosting.WindowsServices;
using SampleApp.Services;

var options = new WebApplicationOptions
{
    Args = args,
    ContentRootPath = WindowsServiceHelpers.IsWindowsService() 
                                     ? AppContext.BaseDirectory : default
};

var builder = WebApplication.CreateBuilder(options);
builder.Services.AddRazorPages();
builder.Services.AddHostedService<ServiceA>();
builder.Services.AddHostedService<ServiceB>();

builder.Host.UseWindowsService();

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();
app.MapRazorPages();
await app.RunAsync();

```
