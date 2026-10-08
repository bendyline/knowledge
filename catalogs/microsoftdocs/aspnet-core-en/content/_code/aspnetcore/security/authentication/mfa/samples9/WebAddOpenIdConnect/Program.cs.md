# Source code: aspnetcore/security/authentication/mfa/samples9/WebAddOpenIdConnect/Program.cs

Complete source file; linked examples may select a region or line range.

```
var builder = WebApplication.CreateBuilder(args);

// <snippet_1>
builder.Services.AddAuthentication().AddOpenIdConnect(options =>
{
    options.AdditionalAuthorizationParameters.Add("prompt", "login");
    options.AdditionalAuthorizationParameters.Add("audience", "https://api.example.com");
});
// </snippet_1>
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();

```
