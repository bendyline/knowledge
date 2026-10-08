# Source code: aspnetcore/security/authentication/configure-oidc-web-authentication/sample/oidc-net8/RazorPageOidc/appsettings.json

Complete source file; linked examples may select a region or line range.

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*",
  "OpenIDConnectSettings": {
    "Authority": "https://localhost:44318",
    "ClientId": "oidc-pkce-confidential",
    "ClientSecret": "oidc-pkce-confidential_secret"
  }
}

```
