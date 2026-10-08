# Source code: aspnetcore/razor-pages/ui-class/6samples/cli/WebApp1/Program.cs

Complete source file; linked examples may select a region or line range.

```
#define SECOND // FIRST SECOND
#if NEVER
#elif FIRST
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
#elif SECOND
#region snippet1
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseWebRoot("wwwroot").UseStaticWebAssets();

builder.Services.AddRazorPages();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
#endregion
#endif

```
