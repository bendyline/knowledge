# Source code: aspnetcore/security/authorization/customizingauthorizationmiddlewareresponse/samples_snapshot/6.x/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Authorization;

// <snippet_Register>
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<
    IAuthorizationMiddlewareResultHandler, SampleAuthorizationMiddlewareResultHandler>();

var app = builder.Build();
// </snippet_Register>

app.MapGet("/", () => "Hello World!");

app.Run();

```
