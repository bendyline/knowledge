### Authentication: HttpContext.Authentication property removed

The deprecated `Authentication` property on `HttpContext` has been removed.

#### Change description

As part of [dotnet/aspnetcore#6504](https://github.com/dotnet/aspnetcore/pull/6504), the deprecated `Authentication` property on `HttpContext` has been removed. The `Authentication` property has been deprecated since 2.0. A [migration guide](https://learn.microsoft.com/aspnet/core/migration/1x-to-2x/identity-2x#use-httpcontext-authentication-extensions) was published to migrate code using this deprecated property to the new replacement APIs. The remaining unused classes / APIs related to the old ASP.NET Core 1.x authentication stack were removed in commit [dotnet/aspnetcore@d7a7c65](https://github.com/dotnet/aspnetcore/commit/d7a7c65).

For discussion, see [dotnet/aspnetcore#6533](https://github.com/dotnet/aspnetcore/issues/6533).

#### Version introduced

3.0

#### Reason for change

ASP.NET Core 1.0 APIs have been replaced by extension methods in [Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions).

#### Recommended action

See the [migration guide](https://learn.microsoft.com/aspnet/core/migration/1x-to-2x/identity-2x#use-httpcontext-authentication-extensions).

#### Category

ASP.NET Core

#### Affected APIs

- [Microsoft.AspNetCore.Http.Authentication.AuthenticateInfo](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Authentication.AuthenticateInfo)
- [Microsoft.AspNetCore.Http.Authentication.AuthenticationManager](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Authentication.AuthenticationManager)
- [Microsoft.AspNetCore.Http.Authentication.AuthenticationProperties](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Authentication.AuthenticationProperties)
- [Microsoft.AspNetCore.Http.Features.Authentication.AuthenticateContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.Authentication.AuthenticateContext)
- [Microsoft.AspNetCore.Http.Features.Authentication.ChallengeBehavior](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.Authentication.ChallengeBehavior)
- [Microsoft.AspNetCore.Http.Features.Authentication.ChallengeContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.Authentication.ChallengeContext)
- [Microsoft.AspNetCore.Http.Features.Authentication.DescribeSchemesContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.Authentication.DescribeSchemesContext)
- [Microsoft.AspNetCore.Http.Features.Authentication.IAuthenticationHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.Authentication.IAuthenticationHandler)
- [Microsoft.AspNetCore.Http.Features.Authentication.IHttpAuthenticationFeature.Handler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.Authentication.IHttpAuthenticationFeature.Handler)
- [Microsoft.AspNetCore.Http.Features.Authentication.SignInContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.Authentication.SignInContext)
- [Microsoft.AspNetCore.Http.Features.Authentication.SignOutContext](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.Features.Authentication.SignOutContext)
- [Microsoft.AspNetCore.Http.HttpContext.Authentication](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Http.HttpContext.Authentication)

<!-- 

#### Affected APIs

- `T:Microsoft.AspNetCore.Http.Authentication.AuthenticateInfo`
- `T:Microsoft.AspNetCore.Http.Authentication.AuthenticationManager`
- `T:Microsoft.AspNetCore.Http.Authentication.AuthenticationProperties`
- `T:Microsoft.AspNetCore.Http.Features.Authentication.AuthenticateContext`
- `T:Microsoft.AspNetCore.Http.Features.Authentication.ChallengeBehavior`
- `T:Microsoft.AspNetCore.Http.Features.Authentication.ChallengeContext`
- `T:Microsoft.AspNetCore.Http.Features.Authentication.DescribeSchemesContext`
- `T:Microsoft.AspNetCore.Http.Features.Authentication.IAuthenticationHandler`
- `P:Microsoft.AspNetCore.Http.Features.Authentication.IHttpAuthenticationFeature.Handler`
- `T:Microsoft.AspNetCore.Http.Features.Authentication.SignInContext`
- `T:Microsoft.AspNetCore.Http.Features.Authentication.SignOutContext`
- `P:Microsoft.AspNetCore.Http.HttpContext.Authentication`

-->
