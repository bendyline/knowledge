# Source code: aspnetcore/host-and-deploy/windows-service/samples/7.x/WebAppServiceSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
using SampleApp.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddWindowsService();
builder.Services.AddHostedService<ServiceA>();

var app = builder.Build();

app.MapRazorPages();

app.Run();

```
