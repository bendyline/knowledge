---
title: Role-based authorization in ASP.NET Core
ai-usage: ai-assisted
author: wadepickett
description: Learn how to restrict ASP.NET Core Blazor Razor component access with the AuthorizeView component and by passing roles to the Authorize attribute.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 04/07/2026
uid: security/authorization/roles
---
# Role-based authorization in ASP.NET Core

When a user's identity is created after authentication, the user may belong to one or more *roles*, reflecting various authorizations that the user has to access data and perform operations. For example, Tracy may belong to the "Administrator" and "User" roles with access to administrative web pages in the app, while Scott may only belong to the "User" role and not have access to administrative data or operations. How these roles are created and managed depends on the backing store of the authorization process. Roles are exposed to the developer through [System.Security.Claims.ClaimsPrincipal.IsInRole%2A](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal.IsInRole%252A). [Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles%252A) must be called to add Role services when setting up the app's identity system.

While roles are claims, not all claims are roles. Depending on the identity issuer, a role may be a collection of users that may apply claims for group members, as well as an actual claim on an identity. However, claims are meant to be information about an individual user. Using roles to add claims to a user can confuse the boundary between the user and their individual claims. This confusion is why the single-page application (SPA) templates aren't designed around roles. In addition, for organizations migrating from an on-premises legacy system, the proliferation of roles over the years can mean a role claim may be too large to be contained within a token usable by a SPA. To secure SPAs, see [security/authentication/identity/spa](../authentication/identity-api-authorization.md).

This article uses Razor component examples and focuses on Blazor authorization scenarios. For additional Blazor guidance, see the [Additional resources](#additional-resources) section. For Razor Pages and MVC guidance, see the following resources:

* [razor-pages/security/authorization/roles](../../razor-pages/security/authorization/roles.md)
* [mvc/security/authorization/roles](../../mvc/security/authorization/roles.md)

**Applies to: < aspnetcore-6.0**

Identity configuration changed with the release of .NET 6. Examples in this article demonstrate approaches that configure Identity services in the app's `Program` file. For .NET apps prior to the release of .NET 6 (and before Blazor Web Apps were released with .NET 8), services are configured in `Startup.ConfigureServices` of the `Startup.cs` file. The syntax for Identity configuration is shown in the companion [Razor Pages roles-based authorization article](../../razor-pages/security/authorization/roles.md) and the [MVC roles-based authorization article](../../mvc/security/authorization/roles.md). See the preceding resources and set the article version selector to the version of .NET that your app targets.



## Sample app

The Blazor Web App sample for this article is the [`BlazorWebAppAuthorization` sample app (`dotnet/AspNetCore.Docs.Samples` GitHub repository)](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/security/authorization/BlazorWebAppAuthorization) ([how to download](https://learn.microsoft.com/search/?terms=index%23how-to-download-a-sample)). The sample app uses seeded accounts with preconfigured roles to demonstrate most of the examples in this article. For more information, see the sample's README file (`README.md`).

> **Caution:**
> This sample app uses an in-memory database to store user information, which isn't suitable for production scenarios. The sample app is intended for demonstration purposes only and shouldn't be used as a starting point for production apps.

## Add Role services to Identity

**Applies to: \>= aspnetcore-6.0**

Register role-based authorization services in the `Program` file by calling [Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles%252A) with the role type in the app's Identity configuration. The role type in the following example is `IdentityRole`:

```csharp
builder.Services.AddDefaultIdentity<IdentityUser>( ... )
    .AddRoles<IdentityRole>()
    ...
```

The preceding code requires the [`Microsoft.AspNetCore.Identity.UI` NuGet package](https://www.nuget.org/packages/Microsoft.AspNetCore.Identity.UI) and a `using` directive for [Microsoft.AspNetCore.Identity](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity).

In cases where the app takes granular control to build Identity manually, call [Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles%252A) on [Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentityCore%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentityCore%252A):

```csharp
builder.Services.AddIdentityCore<IdentityUser>()
    .AddRoles<IdentityRole>()
    ...
```



**Applies to: < aspnetcore-6.0**

Register role-based authorization services in `Startup.ConfigureServices` (`Startup.cs`) by calling [Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles%252A) with the role type in the app's Identity configuration. The role type in the following example is `IdentityRole`:

```csharp
services.AddDefaultIdentity<IdentityUser>()
    .AddRoles<IdentityRole>()
    ...
```

The preceding code requires the [`Microsoft.AspNetCore.Identity.UI` NuGet package](https://www.nuget.org/packages/Microsoft.AspNetCore.Identity.UI) and a `using` directive for [Microsoft.AspNetCore.Identity](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity).

In cases where the app takes granular control to build Identity manually, call [Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles%252A) on [Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentityCore%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentityCore%252A):

```csharp
services.AddIdentityCore<IdentityUser>()
    .AddRoles<IdentityRole>()
    ...
```



**Applies to: \>= aspnetcore-8.0**

In Blazor Web Apps (.NET 8 or later), calling [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A) in the `Program` file isn't required.

In Blazor Server apps, call [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A) in the `Program` file after the line that calls [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) (if present):

```csharp
app.UseAuthentication(); // Only present if not called internally
app.UseAuthorization();
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

In Blazor Server apps (not Blazor Web Apps), call [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A) in the `Program` file after the line that calls [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) (if present):

```csharp
app.UseAuthentication(); // Only present if not called internally
app.UseAuthorization();
```



**Applies to: < aspnetcore-6.0**

In Blazor Server apps (not Blazor Web Apps), call [Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization%252A) in `Startup.Configure` (`Startup.cs`) after the line that calls [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A) (if present):

```csharp
app.UseAuthentication(); // Only present if not called internally
app.UseAuthorization();
```



**Applies to: \>= aspnetcore-5.0**

Blazor WebAssembly apps call [Microsoft.Extensions.DependencyInjection.AuthorizationServiceCollectionExtensions.AddAuthorizationCore%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthorizationServiceCollectionExtensions.AddAuthorizationCore%252A) in the `Program` file to add authorization services:

```csharp
builder.Services.AddAuthorizationCore();
```



## Role-based authorization checks

Role-based authorization checks:

* Are declarative and specify roles that the current user must be a member of to access the requested resource.
* Are applied to Razor components (examples in this article), [Razor Pages](../../razor-pages/security/authorization/roles.md), or [MVC controllers or actions within a controller](../../mvc/security/authorization/roles.md).

The [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) component ([`AuthorizeView` component in Blazor documentation](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component)) supports *role-based* authorization. This section covers basic concepts. For complete coverage, see [blazor/security/index](../../blazor/security/index.md).

For role-based authorization of content in Razor components, use the [Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Roles](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Roles) parameter.

In the following example:

* The user must have a role claim for either the `Admin` or `SuperUser` roles to see the content of the first [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) component.
* To require both `Admin` and `SuperUser` role claims, the second example nests [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) components.

`Pages/RoleChecksWithAuthorizeView.razor`:

```razor
@page "/role-checks-with-authorizeview"

<h3>Role Checks with AuthorizeView</h3>

<AuthorizeView Roles="Admin, SuperUser">
    <p>User: @context.User.Identity?.Name</p>
    <p>You have an 'Admin' or 'SuperUser' role claim.</p>
</AuthorizeView>

<AuthorizeView Roles="Admin">
    <p>User: @context.User.Identity?.Name</p>
    <p>You have the 'Admin' role claim.</p>
    <AuthorizeView Roles="SuperUser" Context="innerContext">
        <p>User: @innerContext.User.Identity?.Name</p>
        <p>You have both 'Admin' and 'SuperUser' role claims.</p>
    </AuthorizeView>
</AuthorizeView>
```

The preceding code establishes a `Context` for the inner [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) component to prevent an [Microsoft.AspNetCore.Components.Authorization.AuthenticationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationState) context collision. The [Microsoft.AspNetCore.Components.Authorization.AuthenticationState](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthenticationState) context is accessed in the outer [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) with the standard approach for accessing the context (`@context.User`). The context is accessed in the inner [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) with the named `innerContext` context (`@innerContext.User`).

The [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) supports role-based authorization for entire Razor components. Use the [Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Roles](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Roles) parameter. The following code limits component access to users who are a member of the `Admin` role.

`Pages/RequireAdminRoleWithAuthorizeAttribute.razor`:

```razor
@page "/require-admin-role-with-authorize-attribute"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Roles = "Admin")]

<h1>Require 'Admin' role with [Authorize] attribute</h1>

<p>You can only see this if you're in the 'Admin' role.</p>
```

Multiple roles can be specified as a comma separated list. In the following example, access is limited to users who are members of the `Admin` role *or* the `SuperUser` role.

`Pages/RequireAdminOrSuperUserRoleWithAuthorizeAttribute.razor`:

```razor
@page "/require-admin-or-superuser-role-with-authorize-attribute"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Roles = "Admin, SuperUser")]

<h1>Require 'Admin' or 'SuperUser' role with [Authorize] attribute</h1>

<p>
    You can only see this if you're in the 'Admin' role or the 'SuperUser' role.
</p>
```

When multiple attributes are applied, the user must be a member of *all* of the roles specified. The following example requires *both* `Admin` *and* `SuperUser` roles.

`Pages/RequireAdminAndSuperUserRolesWithAuthorizeAttributes.razor`:

```razor
@page "/require-admin-and-superuser-roles-with-authorize-attributes"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Roles = "Admin")]
@attribute [Authorize(Roles = "SuperUser")]

<h1>Require 'Admin' and 'SuperUser' roles with [Authorize] attributes</h1>

<p>
    You can only see this if you're in both the 'Admin' role 
    and the 'SuperUser' role.
</p>
```

Role matching is typically case-sensitive because role names are stored and compared using .NET string comparisons. For example, `Admin` (uppercase `A`) isn't treated as the same role as `admin` (lowercase `a`). For more information, see [security/authorization/claims#claim-case-sensitivity](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fclaims%23claim-case-sensitivity).

## Policy-based authorization checks

Role requirements can be expressed using policy syntax, where the app registers a policy at startup as part of the Authorization service configuration.

In the following example:

* The `RequireAdminRole` policy specifies that users must be in the `Admin` role.
* The `RequireSuperUserRole` policy specifies that users must be in the `SuperUser` role.

**Applies to: \>= aspnetcore-7.0**

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("RequireAdminRole",
         policy => policy.RequireRole("Admin"))
    .AddPolicy("RequireSuperUserRole",
         policy => policy.RequireRole("SuperUser"));
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdminRole",
        policy => policy.RequireRole("Admin"));
    options.AddPolicy("RequireSuperUserRole",
        policy => policy.RequireRole("SuperUser"));
});
```



**Applies to: < aspnetcore-6.0**

```csharp
services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdminRole",
        policy => policy.RequireRole("Admin"));
    options.AddPolicy("RequireSuperUserRole",
        policy => policy.RequireRole("SuperUser"));
});
```



For policy-based authorization using an [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) component, use the [Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Policy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Policy) parameter with a single policy name.

`Pages/PassRequireAdminRolePolicy.razor`:

```razor
@page "/pass-requireadminrole-policy-with-authorizeview"

<h1>Pass 'RequireAdminRole' policy with AuthorizeView</h1>

<AuthorizeView Policy="RequireAdminRole">
    <p>You satisfy the 'RequireAdminRole' policy.</p>
</AuthorizeView>
```

To handle the case where the user should satisfy one of several policies, create a policy that confirms that the user satisfies other policies.

To handle the case where the user must satisfy several policies simultaneously, take *either* of the following approaches:

* Create a policy for [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) that confirms that the user satisfies several other policies.

* Nest the policies in multiple [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) components.

  `Pages/PassRequireAdminRoleAndRequireSuperUserRolePoliciesWithAuthorizeViews.razor`:

  ```razor
  @page "/pass-requireadminrole-and-requiresuperuserrole-policies-with-authorizeviews"

  <h1>
      Pass 'RequireAdminRole' and 'RequireSuperUserRole' policies with AuthorizeViews
  </h1>

  <AuthorizeView Policy="RequireAdminRole">
      <AuthorizeView Policy="RequireSuperUserRole" Context="innerContext">
          <p>
              You satisfy the 'RequireAdminRole' and 
              'RequireSuperUserRole' policies.
          </p>
      </AuthorizeView>
  </AuthorizeView>
  ```

If both [Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Roles](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Roles) and [Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Policy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Policy) are set, authorization succeeds only when both conditions are satisfied. That is, the user must belong to at least one of the specified roles *and* meet the requirements defined by the policy.

If neither [Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Roles](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Roles) nor [Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Policy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView.Policy) is specified, [Microsoft.AspNetCore.Components.Authorization.AuthorizeView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.Authorization.AuthorizeView) uses the default policy:

* Authenticated (signed-in) users are authorized.
* Unauthenticated (signed-out) users are unauthorized.

In contrast to role matching, which is typically case-sensitive, ASP.NET Core policy name lookup is typically case-insensitive, so `RequireAdminRole` and `requireadminrole` refer to the same policy.

Policies are applied to an entire Razor component using the [Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute.Policy) property on the [`[Authorize]` attribute](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute).

`Pages/PassRequireAdminRolePolicyWithAuthorizeAttribute.razor`:

```razor
@page "/pass-requireadminrole-policy-with-authorize-attribute"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Policy = "RequireAdminRole")]

<h1>Pass RequireAdminRole policy with [Authorize] attribute</h1>

<p>You can only see this if the 'RequireAdminRole' policy is satisfied.</p>
```

To specify multiple allowed roles in a requirement, specify the roles as parameters to the [Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireRole%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireRole%252A) method. In the following example, users are authorized if they belong to the `Admin` *or* `SuperUser` roles:

**Applies to: \>= aspnetcore-7.0**

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("ElevatedRights", policy =>
        policy.RequireRole("Admin", "SuperUser"));
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ElevatedRights", policy =>
        policy.RequireRole("Admin", "SuperUser"));
});
```



**Applies to: < aspnetcore-6.0**

```csharp
services.AddAuthorization(options =>
{
    options.AddPolicy("ElevatedRights", policy =>
        policy.RequireRole("Admin", "SuperUser"));
});
```



If you want the policy to require all of the preceding roles, either chain the roles to the policy builder or specify them to the policy builder individually in a [statement lambda](https://learn.microsoft.com/dotnet/csharp/language-reference/operators/lambda-expressions#statement-lambdas).

Chained to the policy builder:

**Applies to: \>= aspnetcore-7.0**

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("ElevatedRights", policy => 
        policy
            .RequireRole("Admin")
            .RequireRole("SuperUser"));
```

Alternatively, use a statement lambda:

```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("ElevatedRights",
        policy =>
        {
            policy.RequireRole("Admin");
            policy.RequireRole("SuperUser");
        });
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ElevatedRights", policy => 
        policy
            .RequireRole("Admin")
            .RequireRole("SuperUser"));
});
```

Alternatively, use a statement lambda:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ElevatedRights",
        policy =>
        {
            policy.RequireRole("Admin");
            policy.RequireRole("SuperUser");
        });
});
```



**Applies to: < aspnetcore-6.0**

```csharp
services.AddAuthorization(options =>
{
    options.AddPolicy("ElevatedRights", policy => 
        policy
            .RequireRole("Admin")
            .RequireRole("SuperUser"));
});
```

Alternatively, use a statement lambda:

```csharp
services.AddAuthorization(options =>
{
    options.AddPolicy("ElevatedRights",
        policy =>
        {
            policy.RequireRole("Admin");
            policy.RequireRole("SuperUser");
        });
});
```



## Windows Authentication security groups as app roles

**Applies to: \>= aspnetcore-9.0**

After the app is [configured for Windows Authentication](../authentication/windowsauth.md) ([Blazor-specific guidance](../../blazor/security/blazor-web-app-with-windows-authentication.md)) with the client and server machines part of the same Windows domain, user security groups are automatically included as claims in the user's [System.Security.Claims.ClaimsPrincipal](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal).



**Applies to: < aspnetcore-9.0**

After the app is [configured for Windows Authentication](../authentication/windowsauth.md) with the client and server machines part of the same Windows domain, user security groups are automatically included as claims in the user's [System.Security.Claims.ClaimsPrincipal](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal).



The `User.Identity` is typically a [System.Security.Principal.WindowsIdentity](https://learn.microsoft.com/search/?terms=System.Security.Principal.WindowsIdentity) when using Windows Authentication, and you can retrieve the SID group claims or check if a user is in a role with the following code, where the `{DOMAIN}` placeholder is the domain and the `{SID GROUP NAME}` is the SID group name:

```csharp
if (User.Identity is WindowsIdentity windowsIdentity)
{
    var groups = windowsIdentity.Groups;

    // If needed, obtain a list of the SID groups
    var securityGroups = 
        groups.Select(g => g.Translate(typeof(NTAccount)).ToString()).ToList();

    // If needed, obtain the user's Windows identity name
    var windowsIdentityName = windowsIdentity.Name;

    // Check if the user is in a specific SID group
    if (User.IsInRole(@"{DOMAIN}\{SID GROUP NAME}"))
    {
        // User is in the specified group
    }
    else
    {
        // User isn't in the specified group
    }
}
else
{
    // The user isn't authenticated with Windows Authentication
}
```

**Applies to: \>= aspnetcore-9.0**

For a demonstration of related code that translates SID group claims into human-readable values in a Blazor app, see the `UserClaims` component in [blazor/security/blazor-web-app-windows-authentication](../../blazor/security/blazor-web-app-with-windows-authentication.md). Such an approach to retrieving SID group claims can be combined with [adding claims with an `IClaimsTransformation`](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fclaims%23extend-or-add-custom-claims-using-iclaimstransformation) to create custom role claims when a user is authenticated.



**Applies to: < aspnetcore-9.0**

An approach similar to the preceding example for retrieving SID group claims can be combined with [adding claims with an `IClaimsTransformation`](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fclaims%23extend-or-add-custom-claims-using-iclaimstransformation) to create custom role claims when a user is authenticated.



## Additional resources

* [blazor/security/index](../../blazor/security/index.md)
* [blazor/security/webassembly/meid-groups-roles](../../blazor/security/webassembly/microsoft-entra-id-groups-and-roles.md)
* [razor-pages/security/authorization/roles](../../razor-pages/security/authorization/roles.md)
* [mvc/security/authorization/roles](../../mvc/security/authorization/roles.md)
* [Extend or add custom claims, including role claims, using `IClaimsTransformation`](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fclaims%23extend-or-add-custom-claims-using-iclaimstransformation)
