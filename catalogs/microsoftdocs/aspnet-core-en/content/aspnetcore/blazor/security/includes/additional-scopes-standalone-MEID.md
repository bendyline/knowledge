Add a [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions) for `User.Read` permission with [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes):

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    ...
    options.ProviderOptions.DefaultAccessTokenScopes
        .Add("https://graph.microsoft.com/User.Read");
});
```
