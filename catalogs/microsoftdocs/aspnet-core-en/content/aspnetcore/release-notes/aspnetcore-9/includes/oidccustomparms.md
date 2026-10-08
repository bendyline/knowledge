### OIDC and OAuth Parameter Customization

The OAuth and OIDC authentication handlers now have an `AdditionalAuthorizationParameters` option to make it easier to customize authorization message parameters that are usually included as part of the redirect query string. In .NET 8 or earlier, this requires a custom [Microsoft.AspNetCore.Authentication.WsFederation.WsFederationEvents.OnRedirectToIdentityProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.WsFederation.WsFederationEvents.OnRedirectToIdentityProvider) callback or overridden [Microsoft.AspNetCore.Authentication.OAuth.OAuthHandler%601.BuildChallengeUrl%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OAuth.OAuthHandler%25601.BuildChallengeUrl%252A) method in a custom handler. Here's an example of .NET 8 code:

```csharp
builder.Services.AddAuthentication().AddOpenIdConnect(options =>
{
    options.Events.OnRedirectToIdentityProvider = context =>
    {
        context.ProtocolMessage.SetParameter("prompt", "login");
        context.ProtocolMessage.SetParameter("audience", "https://api.example.com");
        return Task.CompletedTask;
    };
});
```

The preceding example can now be simplified to the following code:

```csharp
builder.Services.AddAuthentication().AddOpenIdConnect(options =>
{
    options.AdditionalAuthorizationParameters.Add("prompt", "login");
    options.AdditionalAuthorizationParameters.Add("audience", "https://api.example.com");
});
```
