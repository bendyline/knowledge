# Source code: aspnetcore/fundamentals/error-handling/samples/7.x/ErrorHandlingSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
// <snippet_AddDatabaseDeveloperPageExceptionFilter>
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddRazorPages();
// </snippet_AddDatabaseDeveloperPageExceptionFilter>

// <snippet_UseExceptionHandler>
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
// </snippet_UseExceptionHandler>

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();

```
