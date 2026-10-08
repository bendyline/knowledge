# Source code: aspnetcore/security/authentication/social/social-without-identity/samples/6.x/SocialWithoutIdentitySample/Snippets/Program.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Authentication.Cookies;
using Google.Apis.Auth.AspNetCore3;

namespace SocialWithoutIdentitySample.Snippets;

public static class Program
{
    public static void SaveTokens(WebApplicationBuilder builder)
    {
        // <snippet_SaveTokens>
        builder.Services
            .AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = GoogleOpenIdConnectDefaults.AuthenticationScheme;
            })
            .AddCookie()
            .AddGoogleOpenIdConnect(options =>
            {
                options.ClientId = builder.Configuration["Authentication:Google:ClientId"];
                options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
                options.SaveTokens = true;
            });
        // </snippet_SaveTokens>
    }
}

```
