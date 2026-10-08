Add a pair of [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions) for `openid` and `offline_access` [Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes](https://learn.microsoft.com/search/?terms=Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes):

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    ...
    options.ProviderOptions.DefaultAccessTokenScopes.Add("openid");
    options.ProviderOptions.DefaultAccessTokenScopes.Add("offline_access");
});
```
