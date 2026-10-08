### Authentication: Newtonsoft.Json types replaced

In ASP.NET Core 3.0, `Newtonsoft.Json` types used in Authentication APIs have been replaced with `System.Text.Json` types. Except for the following cases, basic usage of the Authentication packages remains unaffected:

* Classes derived from the OAuth providers, such as those from [aspnet-contrib](https://github.com/aspnet-contrib/AspNet.Security.OAuth.Providers).
* Advanced claim manipulation implementations.

For more information, see [dotnet/aspnetcore#7105](https://github.com/dotnet/aspnetcore/pull/7105). For discussion, see [dotnet/aspnetcore#7289](https://github.com/dotnet/aspnetcore/issues/7289).

#### Version introduced

3.0

#### Recommended action

For derived OAuth implementations, the most common change is to replace `JObject.Parse` with `JsonDocument.Parse` in the `CreateTicketAsync` override as shown in [dotnet/aspnetcore#7105](https://github.com/dotnet/aspnetcore/pull/7105/files?utf8=%E2%9C%93&diff=unified&w=1#diff-e1c9f9740a6fe8021020a6f249c589b0L40). `JsonDocument` implements `IDisposable`.

The following list outlines known changes:

- [Microsoft.AspNetCore.Authentication.OAuth.Claims.ClaimAction.Run(Newtonsoft.Json.Linq.JObject,System.Security.Claims.ClaimsIdentity,System.String)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OAuth.Claims.ClaimAction.Run(Newtonsoft.Json.Linq.JObject%2CSystem.Security.Claims.ClaimsIdentity%2CSystem.String)) becomes `ClaimAction.Run(JsonElement userData, ClaimsIdentity identity, string issuer)`. All derived implementations of `ClaimAction` are similarly affected.
- [Microsoft.AspNetCore.Authentication.ClaimActionCollectionMapExtensions.MapCustomJson(Microsoft.AspNetCore.Authentication.OAuth.Claims.ClaimActionCollection,System.String,System.Func{Newtonsoft.Json.Linq.JObject,System.String})](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.ClaimActionCollectionMapExtensions.MapCustomJson(Microsoft.AspNetCore.Authentication.OAuth.Claims.ClaimActionCollection%2CSystem.String%2CSystem.Func%7BNewtonsoft.Json.Linq.JObject%2CSystem.String%7D)) becomes `MapCustomJson(this ClaimActionCollection collection, string claimType, Func<JsonElement, string> resolver)`
- [Microsoft.AspNetCore.Authentication.ClaimActionCollectionMapExtensions.MapCustomJson(Microsoft.AspNetCore.Authentication.OAuth.Claims.ClaimActionCollection,System.String,System.String,System.Func{Newtonsoft.Json.Linq.JObject,System.String})](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.ClaimActionCollectionMapExtensions.MapCustomJson(Microsoft.AspNetCore.Authentication.OAuth.Claims.ClaimActionCollection%2CSystem.String%2CSystem.String%2CSystem.Func%7BNewtonsoft.Json.Linq.JObject%2CSystem.String%7D)) becomes `MapCustomJson(this ClaimActionCollection collection, string claimType, string valueType, Func<JsonElement, string> resolver)`
- [Microsoft.AspNetCore.Authentication.OAuth.OAuthCreatingTicketContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OAuth.OAuthCreatingTicketContext) has had one old constructor removed and the other replaced `JObject` with `JsonElement`. The `User` property and `RunClaimActions` method have been updated to match.
- [Microsoft.AspNetCore.Authentication.OAuth.OAuthTokenResponse.Success(Newtonsoft.Json.Linq.JObject)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OAuth.OAuthTokenResponse.Success(Newtonsoft.Json.Linq.JObject)) now accepts a parameter of type `JsonDocument` instead of `JObject`. The `Response` property has been updated to match. `OAuthTokenResponse` is now disposable and will be disposed by `OAuthHandler`. Derived OAuth implementations overriding `ExchangeCodeAsync` don't need to dispose the `JsonDocument` or `OAuthTokenResponse`.
- [Microsoft.AspNetCore.Authentication.OpenIdConnect.UserInformationReceivedContext.User](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect.UserInformationReceivedContext.User) changed from `JObject` to `JsonDocument`.
- [Microsoft.AspNetCore.Authentication.Twitter.TwitterCreatingTicketContext.User](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Twitter.TwitterCreatingTicketContext.User) changed from `JObject` to `JsonElement`.
- The last parameter of [TwitterHandler.CreateTicketAsync(ClaimsIdentity,AuthenticationProperties,AccessToken,JObject)](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.authentication.twitter.twitterhandler.createticketasync#Microsoft_AspNetCore_Authentication_Twitter_TwitterHandler_CreateTicketAsync_System_Security_Claims_ClaimsIdentity_Microsoft_AspNetCore_Authentication_AuthenticationProperties_Microsoft_AspNetCore_Authentication_Twitter_AccessToken_Newtonsoft_Json_Linq_JObject_) changed from `JObject` to `JsonElement`. The replacement method is [Microsoft.AspNetCore.Authentication.Twitter.TwitterHandler.CreateTicketAsync(System.Security.Claims.ClaimsIdentity,Microsoft.AspNetCore.Authentication.AuthenticationProperties,Microsoft.AspNetCore.Authentication.Twitter.AccessToken,System.Text.Json.JsonElement)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Twitter.TwitterHandler.CreateTicketAsync(System.Security.Claims.ClaimsIdentity%2CMicrosoft.AspNetCore.Authentication.AuthenticationProperties%2CMicrosoft.AspNetCore.Authentication.Twitter.AccessToken%2CSystem.Text.Json.JsonElement)).

#### Category

ASP.NET Core

#### Affected APIs

- [Microsoft.AspNetCore.Authentication.Facebook](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Facebook)
- [Microsoft.AspNetCore.Authentication.Google](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Google)
- [Microsoft.AspNetCore.Authentication.MicrosoftAccount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.MicrosoftAccount)
- [Microsoft.AspNetCore.Authentication.OAuth](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OAuth)
- [Microsoft.AspNetCore.Authentication.OpenIdConnect](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.OpenIdConnect)
- [Microsoft.AspNetCore.Authentication.Twitter](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Twitter)

<!--

#### Affected APIs

- `N:Microsoft.AspNetCore.Authentication.Facebook`
- `N:Microsoft.AspNetCore.Authentication.Google`
- `N:Microsoft.AspNetCore.Authentication.MicrosoftAccount`
- `N:Microsoft.AspNetCore.Authentication.OAuth`
- `N:Microsoft.AspNetCore.Authentication.OpenIdConnect`
- `N:Microsoft.AspNetCore.Authentication.Twitter`

-->
