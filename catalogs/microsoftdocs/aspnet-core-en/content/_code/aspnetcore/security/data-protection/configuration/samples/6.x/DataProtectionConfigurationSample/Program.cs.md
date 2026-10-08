# Source code: aspnetcore/security/data-protection/configuration/samples/6.x/DataProtectionConfigurationSample/Program.cs

Complete source file; linked examples may select a region or line range.

```
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();

```
