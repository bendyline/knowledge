# Source code: aspnetcore/web-api/handle-errors/samples/6.x/HandleErrorsSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// <snippet_Middleware>
var app = builder.Build();

app.UseHttpsRedirection();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
}

app.UseAuthorization();

app.MapControllers();

app.Run();
// </snippet_Middleware>

```
