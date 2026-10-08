---
title: Custom authorization policy providers in ASP.NET Core
ai-usage: ai-assisted
author: mjrousos
description: Learn how to use a custom authorization policy provider (IAuthorizationPolicyProvider) in an ASP.NET Core app to dynamically generate authorization policies.
ms.author: wpickett
ms.date: 09/18/2026
uid: security/authorization/custom-authorization-policy-providers
---
# Custom authorization policy providers in ASP.NET Core

By [Mike Rousos](https://github.com/mjrousos)

This article describes how to implement the [Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider) interface to create a custom authorization policy provider, including how to create an authorization attribute for the provider.

For a typical implementation of [policy-based authorization](policies.md), policies are registered by calling [Microsoft.AspNetCore.Authorization.AuthorizationOptions.AddPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationOptions.AddPolicy%252A) during authorization service configuration. Sometimes, it isn't possible or desirable to register many authorization policies in this manner.

For example, an app might require policy-based checks for building room numbers or user ages, where it doesn't make sense to create policies for building room numbers or ages with many [Microsoft.AspNetCore.Authorization.AuthorizationOptions.AddPolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationOptions.AddPolicy%252A) calls. These scenarios are best implemented by passing a parameter that represents room numbers or ages to a custom `[Authorize]` attribute backed by a custom authorization policy provider. The custom policy provider receives the parameter value and dynamically creates a single policy to determine if authorization requirements are met. Using this approach, you avoid creating dozens or even hundreds of individual, explicit authorization policies.

Other scenarios where a custom policy provider is useful include:

* To dynamically, flexibly determine authorization requirements based on complex logic.
* To create policies at runtime based on information from an external data source, such as a database.
* When an external service is used to provide policy evaluation.

## Sample app

The Blazor Web App sample for this article is the [`BlazorWebAppAuthorization` sample app (`dotnet/AspNetCore.Docs.Samples` GitHub repository)](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/security/authorization/BlazorWebAppAuthorization) ([how to download](https://learn.microsoft.com/search/?terms=index%23how-to-download-a-sample)). The sample app uses seeded accounts to demonstrate the examples in this article. For more information, see the sample's README file (`README.md`).

> **Caution:**
> This sample app uses an in-memory database to store user information, which isn't suitable for production scenarios. The sample app is intended for demonstration purposes only and shouldn't be used as a starting point for production apps.

For an MVC sample, see the [`CustomPolicyProvider` sample in the `dotnet/aspnetcore` GitHub repository](https://github.com/dotnet/aspnetcore/tree/v3.1.3/src/Security/samples/CustomPolicyProvider).

> **Tip:**
> Use the [`git sparse-checkout` command](https://git-scm.com/docs/git-sparse-checkout) to download a single folder from the main branch of a GitHub repository.
>
> In the following example, the `security/authorization/BlazorWebAppAuthorization` subfolder is downloaded from the `dotnet/AspNetCore.Docs.Samples` repository. Replace `https://github.com/dotnet/AspNetCore.Docs.Samples.git` with the URL of the repository that you want to clone, and replace the `security/authorization/BlazorWebAppAuthorization` path with the path to the subfolder that you want to download:
>
> ```
> git clone --depth 1 --filter=blob:none https://github.com/dotnet/AspNetCore.Docs.Samples.git --sparse
> cd AspNetCore.Docs.Samples
> git sparse-checkout init --cone
> git sparse-checkout set security/authorization/BlazorWebAppAuthorization
> ```


## Customize policy retrieval

The developer decides in advance how custom policies are named by inventing a naming scheme in a string format that's easily parsed to meet one or more requirements for each policy evaluation:

* The custom authorization attribute adopts the policy naming scheme.
* The custom policy provider adopts the same policy naming scheme.

For example, consider a minimum age naming scheme in the format `MinimumAge{AGE}`, where the `{AGE}` placeholder is any given age, for example, `MinimumAge21`. This naming scheme is easily identified by its prefix "`MinimumAge`" with an easily parsed string-based age ("`21`").

The developer customizes how authorization policies are provided by implementing the following APIs in the custom policy provider:

* The [Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetPolicyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetPolicyAsync%252A) method returns an authorization policy for a given name.
* The [Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetDefaultPolicyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetDefaultPolicyAsync%252A) method returns the default authorization policy, which is selected when authorization is required but no specific policy is set.
* The [Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetFallbackPolicyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetFallbackPolicyAsync%252A) method returns the fallback authorization policy, which is selected when no policy is produced from authorization metadata. By default, the fallback policy is `null`.

For complete named, default, and fallback policy selection rules, see [security/authorization/policies#default-and-fallback-policies](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23default-and-fallback-policies).

The general format of a custom policy provider that either returns a policy for a given matching name (represented by the `{IDENTIFY POLICY BY NAME}` placeholder) or returns `null` when no policy name matches is similar to the following.

Implementing the required default and fallback policies for a custom policy provider ([Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetDefaultPolicyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetDefaultPolicyAsync%252A), [Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetFallbackPolicyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetFallbackPolicyAsync%252A)) are omitted in the following example for brevity but are described and shown in a complete example later in this article.

```csharp
// Omitted for brevity:
//   'GetDefaultPolicyAsync' (default policy)
//   'GetFallbackPolicyAsync' (fallback policy) 
internal class CustomPolicyProvider() : IAuthorizationPolicyProvider
{
    public Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
    {
        if ({IDENTIFY POLICY BY NAME})
        {
            var policy = new AuthorizationPolicyBuilder(
                IdentityConstants.ApplicationScheme);
            policy.AddRequirements(...);

            return Task.FromResult<AuthorizationPolicy?>(policy.Build());
        }

        return Task.FromResult<AuthorizationPolicy?>(null);
    }
}
```

> **Note:**
> Use of [Microsoft.AspNetCore.Identity.IdentityConstants.ApplicationScheme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityConstants.ApplicationScheme%252A) in the preceding example represents the scheme used to identify application authentication cookies. An empty [Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.AuthenticationSchemes%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.AuthenticationSchemes%252A) list evaluates requirements against the default schemes&mdash;it doesn't authenticate every registered scheme.

ASP.NET Core only uses one instance of [Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider). [Microsoft.AspNetCore.Authorization.DefaultAuthorizationPolicyProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.DefaultAuthorizationPolicyProvider) is the framework's default [Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider) implementation for retrieving authorization policies by name. Policy provider behavior is customized by registering a custom policy provider implementation in the app's service container to replace the default implementation.

If a custom policy provider is able to explicitly match and return all of the authorization policies that the app uses, the policy provider can return `Task.FromResult<AuthorizationPolicy>(null)` from the [Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetPolicyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetPolicyAsync%252A) method when no policy name matches. However, most apps that implement a custom provider defer traditional policy retrieval, for example to handle role-based and claim-based policies, to the default policy provider. Such an app typically uses a custom provider that:

* Attempts to parse policy names, returning an authorization policy for a matching name with one or more requirements or assertions.
* Uses the framework's [Microsoft.AspNetCore.Authorization.DefaultAuthorizationPolicyProvider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.DefaultAuthorizationPolicyProvider) by implementing [Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetDefaultPolicyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetDefaultPolicyAsync%252A) to provide an authorization policy for `[Authorize]` attributes that don't specify a policy name:

```csharp
public Task<AuthorizationPolicy> GetDefaultPolicyAsync() => 
    DefaultPolicyProvider.GetDefaultPolicyAsync();
```

Any of the following [Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder) methods can be used for the custom policy provider's requirements and assertions in its [Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetPolicyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetPolicyAsync%252A) method:

* [Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.AddRequirements%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.AddRequirements%252A)
* [Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireClaim%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireClaim%252A)
* [Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireRole%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireRole%252A)
* [Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireUserName%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireUserName%252A)
* [Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAssertion%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAssertion%252A)
* [Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAuthenticatedUser%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAuthenticatedUser%252A)

The custom policy provider must also implement [Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetFallbackPolicyAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationPolicyProvider.GetFallbackPolicyAsync%252A). Choosing a non-`null` fallback is optional. The following example retrieves the fallback authorization policy by delegating to the default authorization policy provider's implementation:

```csharp
public Task<AuthorizationPolicy?> GetFallbackPolicyAsync() => 
    DefaultPolicyProvider.GetFallbackPolicyAsync();
```

The default policy or fallback policy can [combine policies](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicy.Combine%252A), which is useful, for example, when middleware-based authorization flows don't specify per-endpoint authorization. All combined requirements must succeed for the combined policy to succeed.

In the following example, the policy combines:

* A standard user policy that requires an authenticated user with a `Status` claim of `Active`.
* A manager policy that requires the `Manager` role with a `Department` claim of `Sales`.

```csharp
var standardUserPolicy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .RequireClaim("Status", "Active")
    .Build();

var managerPolicy = new AuthorizationPolicyBuilder()
    .RequireRole("Manager")
    .RequireClaim("Department", "Sales")
    .Build();

var combinedPolicy = AuthorizationPolicy.Combine(standardUserPolicy, managerPolicy);

return Task.FromResult<AuthorizationPolicy?>(combinedPolicy);
```

## Custom authorization attribute

The recommended approach for applying policies in concert with a custom policy provider is to use a strongly-typed [Microsoft.AspNetCore.Authorization.AuthorizeAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute). A custom attribute implementation maps arguments into a string that's used to retrieve a corresponding authorization policy.

The following `MinimumAgeAuthorizeAttribute` example derives from [Microsoft.AspNetCore.Authorization.AuthorizeAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) and makes the `Age` property wrap the [Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy%252A) property. The attribute type has a policy string based on the hard-coded prefix (`MinimumAge`) and an integer passed in via its constructor (`MinimumAge{AGE}`), where the `{AGE}` placeholder is the minimum age, for example, `MinimumAge21`. The following attribute is used with the custom policy provider shown later in this article in the [Minimum age custom policy provider example](#minimum-age-custom-policy-provider-example) section.

`Policies/Attributes/MinimumAgeAuthorizeAttribute.cs`:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Attributes/MinimumAgeAuthorizeAttribute.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/custom-authorization-policy-providers.md)

You can apply the attribute for any given authorized minimum age with an integer parameter for the age. Examples are shown later in this article in the [Use policies from a custom policy provider](#use-policies-from-a-custom-policy-provider) section.

> **Important:**
> As with all policy-based authorization scenarios, create a requirement and an authorization handler for the policy. Register the handler in the app's service container.
>
> For examples that work with the custom policy provider in this article, see the parameterized `MinimumAgeRequirement` and `MinimumAgeHandler` code in the *Policy-based authorization* article, which work with the `MinimumAgePolicyProvider` demonstrated in this article:
>
> * [`MinimumAgeRequirement(int)` parameterized class that accepts a minimum age](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23requirements-and-policy-registration)
> * [`MinimumAgeHandler` class for one requirement](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23use-a-handler-for-one-requirement)
> * [Register the `MinimumAgeHandler`](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23handler-registration)

## Minimum age custom policy provider example

Consider a situation where authorization is based on a user's minimum age and the authorization policy names follow the pattern `MinimumAge{AGE}`, where the `{AGE}` placeholder is a string representation of an integer age. This is the same naming scheme established for the `MinimumAgeAuthorizeAttribute` earlier in this article in the [Custom authorization attribute](#custom-authorization-attribute) section.

The custom policy provider should generate authorization policies by completing the following tasks:

* The age is parsed from the policy name.
* An authorization policy builder ([Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder)) creates a new [Microsoft.AspNetCore.Authorization.AuthorizationPolicy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicy).
* The authorization policy builder is constructed with at least one authorization scheme name or always succeeds. Otherwise, there's no information on how to provide a challenge to the user and an exception is thrown. 
* Set the list of authentication schemes in [Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.AuthenticationSchemes%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.AuthenticationSchemes%252A) for the built policy. The following example passes [Microsoft.AspNetCore.Identity.IdentityConstants.ApplicationScheme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityConstants.ApplicationScheme%252A), which represents the scheme used to identify application authentication cookies. An empty (unassigned) [Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.AuthenticationSchemes%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.AuthenticationSchemes%252A) list evaluates requirements against the custom policy provider's default schemes&mdash;it doesn't authenticate every registered scheme.
* Add one or more requirements to the policy for user age evaluations with [Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.AddRequirements%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.AddRequirements%252A).

The following example demonstrates a minimum age custom policy provider.

`Policies/Providers/MinimumAgePolicyProvider.cs`:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Policies/Providers/MinimumAgePolicyProvider.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/custom-authorization-policy-providers.md)

## Use policies from a custom policy provider

To use custom policies:

* As with all policy-based authorization scenarios, create a requirement and an authorization handler for the policy. Register the handler in the app's service container.

  For examples that work with the custom policy provider in this article, see the parameterized `MinimumAgeRequirement` and `MinimumAgeHandler` code in the *Policy-based authorization* article, which work with the `MinimumAgePolicyProvider` demonstrated in this article:

  * [`MinimumAgeRequirement(int)` parameterized class that accepts a minimum age](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23requirements-and-policy-registration)
  * [`MinimumAgeHandler` class for one requirement](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23use-a-handler-for-one-requirement)
  * [Register the `MinimumAgeHandler`](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23handler-registration)

**Applies to: \>= aspnetcore-6.0**

* Register the custom policy provider type to replace the default policy provider.

  In the app's `Program` file:

  ```csharp
  builder.Services.AddSingleton<IAuthorizationPolicyProvider, MinimumAgePolicyProvider>();
  ```



**Applies to: < aspnetcore-6.0**

* Register the custom policy provider type to replace the default policy provider.

  In `Startup.ConfigureServices` of the `Startup.cs` file:

  ```csharp
  services.AddSingleton<IAuthorizationPolicyProvider, MinimumAgePolicyProvider>();
  ```



The [sample app](#sample-app) institutes application cookie redirect mapping with the following code:

* Anonymous Users: When an unauthenticated user requests a protected endpoint, the cookie handler issues a challenge and redirects to [Microsoft.AspNetCore.Builder.CookieAuthenticationOptions.LoginPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookieAuthenticationOptions.LoginPath%252A) with a return URL parameter.
* Underage Users: When an authenticated user fails the custom minimum age policy, the handler issues a forbid response and redirects to [Microsoft.AspNetCore.Builder.CookieAuthenticationOptions.AccessDeniedPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookieAuthenticationOptions.AccessDeniedPath%252A) instead of the login page.

```csharp
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.AccessDeniedPath = "/Account/AccessDenied";
});
```

For demonstration purposes, an `AuthorizeView` component can specify the weakly-typed `MinimumAge21` (`"MinimumAge" + Age`) policy, as the following sample Razor component demonstrates. Using a weakly-typed policy name isn't the best approach for applying a custom authorization policy. After the following example, a strongly-typed [Microsoft.AspNetCore.Authorization.AuthorizeAttribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) is demonstrated using the [`MinimumAgeAuthorizeAttribute` implementation](#custom-authorization-attribute) described in the [Custom authorization attribute](#custom-authorization-attribute) section.

`Components/Pages/PassMinimumAge21Policy.razor`:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Components/Pages/PassMinimumAge21Policy.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/custom-authorization-policy-providers.md)

The following component uses the strongly-typed [custom `MinimumAgeAuthorizeAttribute` implementation](#custom-authorization-attribute) described in the [Custom authorization attribute](#custom-authorization-attribute) section. Using a strongly-typed attribute is recommended for production apps.

`Components/Pages/PassMinimumAge21PolicyWithAttribute.razor`:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Components/Pages/PassMinimumAge21PolicyWithAttribute.razor](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/custom-authorization-policy-providers.md)

The same approach is useful for securing [Minimal API endpoints](https://learn.microsoft.com/search/?terms=fundamentals%2Fminimal-apis%23authorization):

```csharp
app.MapGet("/must-be-21", [MinimumAgeAuthorize(21)] () => 
    "This endpoint requires a 21-year-old birthdate claim.");
```

## Additional resources

* [Complete custom 'IAuthorizationPolicyProvider' sample (`dotnet/aspnetcore` GitHub repository)](https://github.com/dotnet/aspnetcore/tree/v3.1.3/src/Security/samples/CustomPolicyProvider)
* [security/authorization/policies](policies.md)
* [razor-pages/security/authorization/policies](../../razor-pages/security/authorization/policies.md)
* [mvc/security/authorization/policies](../../mvc/security/authorization/policies.md)
