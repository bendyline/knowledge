---
title: Secure an ASP.NET Core Blazor Web App with Windows Authentication
ai-usage: ai-assisted
author: guardrex
description: Learn how to secure a Blazor Web App with Windows Authentication.
monikerRange: '>= aspnetcore-9.0'
ms.author: wpickett
ms.date: 09/18/2026
uid: blazor/security/blazor-web-app-windows-authentication
---
# Secure an ASP.NET Core Blazor Web App with Windows Authentication

<!-- UPDATE 11.0 - Activate ...

[!INCLUDE[](~/includes/not-latest-version.md)]

-->

This article describes how to secure a Blazor Web App with [Windows Authentication](https://learn.microsoft.com/windows-server/security/windows-authentication/windows-authentication-overview) using a sample app. For more information, see [security/authentication/windowsauth](../../security/authentication/windowsauth.md).

The app specification for the Blazor Web App:

* Adopts the [Interactive Server render mode with global interactivity](../components/render-modes.md).
* Establishes an [authorization policy](../../security/authorization/policies.md) for a [Windows security identifier](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-security-identifiers) to access a secure page.

## Sample app

Access the sample through the latest version folder in the Blazor samples repository with the following link. The sample is in the `BlazorWebAppWinAuthServer` folder for .NET 9 or later.

[View or download sample code](https://github.com/dotnet/blazor-samples) ([how to download](https://learn.microsoft.com/search/?terms=blazor%2Ffundamentals%2Findex%23sample-apps))

## Configuration

The sample app doesn't require configuration to run locally.

When deployed to a host, such as IIS, the app must adopt impersonation to run under the user's account. For more information, see [security/authentication/windowsauth#impersonation](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fwindowsauth%23impersonation).

## Sample app code

Inspect the `Program` file in the sample app for the following API calls.

[Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication%252A) is called using the [Microsoft.AspNetCore.Authentication.Negotiate.NegotiateDefaults.AuthenticationScheme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Negotiate.NegotiateDefaults.AuthenticationScheme%252A) authentication scheme. [Microsoft.Extensions.DependencyInjection.NegotiateExtensions.AddNegotiate%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.NegotiateExtensions.AddNegotiate%252A) configures the [Microsoft.AspNetCore.Authentication.AuthenticationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationBuilder) to use Negotiate (also known as Windows, Kerberos, or NTLM) authentication, and the authentication handler supports Kerberos on Windows and Linux servers:

```csharp
builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
    .AddNegotiate();
```

[Microsoft.Extensions.DependencyInjection.PolicyServiceCollectionExtensions.AddAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.PolicyServiceCollectionExtensions.AddAuthorization%252A) adds authorization policy services. The following code assigns the [Microsoft.AspNetCore.Authorization.AuthorizationOptions.DefaultPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationOptions.DefaultPolicy%252A), which requires an authenticated user, to the [Microsoft.AspNetCore.Authorization.AuthorizationOptions.FallbackPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationOptions.FallbackPolicy%252A). This configuration requires authentication when no policy is produced from authorization metadata:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = options.DefaultPolicy;
});
```

For complete policy selection rules, see [security/authorization/policies#default-and-fallback-policies](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23default-and-fallback-policies).

[Microsoft.Extensions.DependencyInjection.CascadingAuthenticationStateServiceCollectionExtensions.AddCascadingAuthenticationState%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.CascadingAuthenticationStateServiceCollectionExtensions.AddCascadingAuthenticationState%252A) adds cascading authentication state to the service collection. This is equivalent to placing a `CascadingAuthenticationState` component at the root of the app's component hierarchy:

```csharp
builder.Services.AddCascadingAuthenticationState();
```

An [authorization policy](../../security/authorization/policies.md) is added for a [Windows security identifier (SID)](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-security-identifiers). The `S-1-5-113` well-known SID in the following example indicates that the user is a local account, which restricts network sign-in to local accounts instead of "administrator" or equivalent accounts:

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("LocalAccount", policy =>
        policy.RequireClaim(
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid",
            "S-1-5-113"));   
```

The authorization policy is enforced by the `LocalAccount` component.

`Components/Pages/LocalAccount.razor`:

```razor
@page "/local-account"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize("LocalAccount")]

<h1>Local Account Only</h1>

<p>
    You can only reach this page by satisfying the
    <code>LocalAccount</code> authorization policy.
</p>
```

The `UserClaims` component lists the user's claims and roles, including the user's Windows security identifiers (SIDs) with SID translations.

`Components/Pages/UserClaims.razor`:

```razor
@page "/user-claims"
@using System.Security.Claims
@using System.Security.Principal
@using Microsoft.AspNetCore.Components.QuickGrid

<PageTitle>User Claims & Roles</PageTitle>

<h1>User Claims & Roles</h1>

<QuickGrid Items="claims" Pagination="pagination">
    <Paginator State="pagination" />
    <PropertyColumn Property="@(p => p.Type)" Sortable="true" />
    <PropertyColumn Property="@(p => p.Value)" Sortable="true" />
    <PropertyColumn Property="@(p => GetClaimAsHumanReadable(p))" Sortable="true" Title="Translation" />
    <PropertyColumn Property="@(p => p.Issuer)" Sortable="true" />
</QuickGrid>

<h1>User Roles</h1>

@if (roles.Any())
{
    <ul>
        @foreach (var role in roles)
        {
            <li>@role</li>
        }
    </ul>
}
else
{
    <p>No roles available.</p>
}

@code {
    private IQueryable<Claim> claims = Enumerable.Empty<Claim>().AsQueryable();
    private IEnumerable<string> roles = Enumerable.Empty<string>();
    PaginationState pagination = new PaginationState { ItemsPerPage = 10 };

    [CascadingParameter]
    private Task<AuthenticationState>? AuthState { get; set; }

    protected override async Task OnInitializedAsync()
    {
        if (AuthState == null)
        {
            return;
        }

        var authState = await AuthState;

        claims = authState.User.Claims.AsQueryable();

        roles = authState.User.Claims
            .Where(claim => claim.Type == ClaimTypes.Role)
            .Select(claim => claim.Value);
    }

    private string GetClaimAsHumanReadable(Claim claim)
    {
        if (!OperatingSystem.IsWindows() ||
            claim.Type is not (ClaimTypes.PrimarySid or ClaimTypes.PrimaryGroupSid
                or ClaimTypes.GroupSid))
        {
            // We're either not on Windows or not dealing with a SID Claim that
            // can be translated
            return string.Empty;
        }

        SecurityIdentifier sid = new SecurityIdentifier(claim.Value);

        try
        {
            // Throw an exception if the SID can't be translated
            var account = sid.Translate(typeof(NTAccount));

            return account.ToString();
        }
        catch (IdentityNotMappedException)
        {
            return "Could not be mapped";
        }
    }
}
```

## Additional resources

* [security/authentication/windowsauth](../../security/authentication/windowsauth.md)
* [Security identifiers (Windows Server documentation)](https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-security-identifiers)
