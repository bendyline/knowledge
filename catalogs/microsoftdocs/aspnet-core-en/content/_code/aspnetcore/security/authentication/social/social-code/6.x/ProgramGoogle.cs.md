# Source code: aspnetcore/security/authentication/social/social-code/6.x/ProgramGoogle.cs

Complete source file; linked examples may select a region or line range.

```
var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

// <snippet1>
services.AddAuthentication().AddGoogleOpenIdConnect(googleOptions =>
{
    googleOptions.ClientId = configuration["Authentication:Google:ClientId"];
    googleOptions.ClientSecret = configuration["Authentication:Google:ClientSecret"];
});
// </snippet1>

```
