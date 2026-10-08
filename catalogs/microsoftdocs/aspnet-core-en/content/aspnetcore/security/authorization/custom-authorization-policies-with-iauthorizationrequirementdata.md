---
title: Custom authorization policies with `IAuthorizationRequirementData`
ai-usage: ai-assisted
author: tdykstra
description: Learn how to specify requirements associated with the authorization policy in attribute definitions with the IAuthorizationRequirementData interface.
monikerRange: '>= aspnetcore-8.0'
ms.author: tdykstra
ms.date: 07/29/2026
uid: security/authorization/iard
---
# Custom authorization policies with `IAuthorizationRequirementData`

Use the [Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData) interface to specify requirements associated with the authorization policy in attribute definitions.

This article uses a [Minimal API](../../fundamentals/minimal-apis.md) endpoint within the app and focuses on testing JWT-based authorization. For a demonstration of similar guidance in an MVC app with a controller, see the [mvc/security/authorization/iard](../../mvc/security/authorization/custom-authorization-policies-with-iauthorizationrequirementdata-in-mvc.md).

**Applies to: \>= aspnetcore-11.0**

You can apply [Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData) attributes to SignalR hubs and hub methods, MVC controllers and actions, and Blazor's [`AuthorizeView`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component) and [`AuthorizeRouteView`](../../blazor/security/authentication-state.md) components, not just to endpoints. For apps that target releases earlier than .NET 11, these attributes are only enforced on Minimal API and routed endpoints.



**Applies to: < aspnetcore-11.0**

[Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData) isn't supported for authorization attributes applied to:

* SignalR hubs and hub methods
* MVC controllers and actions
* Blazor's [`AuthorizeView`](https://learn.microsoft.com/search/?terms=blazor%2Fsecurity%2Findex%23authorizeview-component) and [`AuthorizeRouteView`](../../blazor/security/authentication-state.md) components

Support for the preceding is available for apps that target .NET 11 or later.


## Sample app

The Blazor Web App sample for this article is the [`AuthRequirementsDataBWA` sample app (`dotnet/AspNetCore.Docs.Samples` GitHub repository)](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/security/authorization/AuthRequirementsDataBWA) ([how to download](https://learn.microsoft.com/search/?terms=index%23how-to-download-a-sample)). The sample app implements a minimum age handler for users accessing a Minimal API endpoint at `/api/greetings/hello`, requiring a user to present a birth date claim indicating that they're at least 21 years old.

## Minimum age authorize attribute

The `MinimumAgeAuthorizeAttribute` implementation of [Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData) sets an authorization age:

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/AuthRequirementsDataBWA/Authorization/MinimumAgeAuthorizeAttribute.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/custom-authorization-policies-with-iauthorizationrequirementdata.md)

## Minimum age authorization handler

The `MinimumAgeAuthorizationHandler` class handles the single [Microsoft.AspNetCore.Authorization.IAuthorizationRequirement](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationRequirement) provided by `MinimumAgeAuthorizeAttribute`, as specified by the generic parameter `MinimumAgeAuthorizeAttribute`.

The `HandleRequirementAsync` method:

* Gets the user's birth date claim.
* Obtains the user's age from the claim.
* Adjusts age if the user hasn't had a birthday this year.
* Marks the authorization requirement succeeded if the user meets the age requirement.
* Implements logging for demonstration purposes.

[Code reference unavailable in this source snapshot: ~/../AspNetCore.Docs.Samples/security/authorization/AuthRequirementsDataBWA/Authorization/MinimumAgeAuthorizationHandler.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authorization/custom-authorization-policies-with-iauthorizationrequirementdata.md)

The `MinimumAgeAuthorizationHandler` is registered as a singleton [Microsoft.AspNetCore.Authorization.IAuthorizationHandler](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.IAuthorizationHandler) service in the app's `Program` file:

```csharp
builder.Services.AddSingleton<IAuthorizationHandler,
    MinimumAgeAuthorizationHandler>();
```

A [Minimal API](../../fundamentals/minimal-apis.md) endpoint is configured in the app's `Program` file with the [Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%252A) extension method and the `MinimumAgeAuthorizeAttribute`:

```csharp
app.MapGet("/api/greetings/hello", (HttpContext context) =>
{
    return $"Hello {context.User.Identity?.Name}!";
}).RequireAuthorization(new MinimumAgeAuthorizeAttribute(21));
```

The endpoint displays the user's name when they satisfy the minimum age policy, using an age of 21 years old supplied to a `MinimumAgeAuthorizeAttribute` instance.

If the user's birth date claim indicates that they're at least 21 years old, the endpoint displays the greeting string, issuing a 200 (OK) status code. If the user is missing the birth date claim or the claim indicates that they aren't at least 21 years old, the greeting isn't displayed and a 403 (Forbidden) status code is issued.

> **Note:**
> For MVC controller guidance that demonstrates the same behavior, see [mvc/security/authorization/iard](../../mvc/security/authorization/custom-authorization-policies-with-iauthorizationrequirementdata-in-mvc.md).

JWT bearer authentication services are added in the app's `Program` file:

```csharp
builder.Services.AddAuthentication().AddJwtBearer();
```

The app settings file (`appsettings.Development.json`) configures the audience and issuer for JWT bearer authentication:

```json
"Authentication": {
  "Schemes": {
    "Bearer": {
      "ValidAudiences": [
        "https://localhost:5001",
        "http://localhost:5000"
      ],
      "ValidIssuer": "dotnet-user-jwts"
    }
  }
}
```

In the preceding example, the localhost audience matches the localhost address specified by `applicationUrl` in the app's launch profile (`Properties/launchSettings.json`).

## Demonstration

Test the sample with [`dotnet user-jwts`](../authentication/jwt-authn.md) and curl.

From the project's folder in a command shell, execute the following command to create a JWT bearer token with a birth date claim that makes the user over 21 years old:

```dotnetcli
dotnet user-jwts create --claim http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth=1989-01-01
```

The output produces a token after "`Token:`" in the command shell:

```dotnetcli
New JWT saved with ID '{JWT ID}'.
Name: {USER}
Custom Claims: [http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth=1989-01-01]

Token: {TOKEN}
```

Set the value of the token (where the `{TOKEN}` placeholder appears in the preceding output) aside for use later.

You can decode the token in an online JWT decoder, such as [`jwt.ms`](https://jwt.ms/) to see its contents, revealing that it contains a `birthdate` claim with the user's birth date:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}.{
  "unique_name": "{USER}",
  "sub": "{USER}",
  "jti": "6cd613ed",
  "birthdate": "1989-01-01",
  "aud": [
    "https://localhost:5001",
    "http://localhost:5000"
  ],
  "nbf": 1773663513,
  "exp": 1781612313,
  "iat": 1773663515,
  "iss": "dotnet-user-jwts"
}.[Signature]
```

Execute the command again with a `dateofbirth` value that makes the user under the age of 21:

```dotnetcli
dotnet user-jwts create --claim http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth=2020-01-01
```

Set the value of second token aside.

Start the app in Visual Studio or with the `dotnet watch` command in a command shell:

```dotnetcli
dotnet watch
```

In a command shell, use the .NET CLI to execute the following `curl.exe` command to request the `api/greetings/hello` endpoint. Replace the `{TOKEN}` placeholder with the first JWT bearer token that you saved earlier:

```dotnetcli
curl.exe -i -H "Authorization: Bearer {TOKEN}" https://localhost:5001/api/greetings/hello
```

The output indicates success because the user's birth date claim indicates that they're at least 21 years old:

```dotnetcli
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Date: Thu, 15 May 2025 22:58:10 GMT
Server: Kestrel
Transfer-Encoding: chunked

Hello {USER}!
```

Logging indicates that the age requirement was met:

<!-- DOC AUTHOR NOTE

The following block quote uses two spaces at the ends of lines (except the
last line) to create returns in the rendered content. Don't remove the two 
spaces at the ends of the lines when editing the following content.

-->

> MinimumAgeAuthorizationHandler: Information: Evaluating authorization requirement for age >= 21
> MinimumAgeAuthorizationHandler: Information: Minimum age authorization requirement 21 satisfied

Re-execute the `curl.exe` command with the second token, which indicates the user is under 21 years old. The output indicates that the requirement isn't met. Access to the endpoint is forbidden (status code 403):

```dotnetcli
HTTP/1.1 403 Forbidden
Content-Length: 0
Date: Thu, 15 May 2025 22:58:36 GMT
Server: Kestrel
```

Logging indicates that the age requirement wasn't met:

<!-- DOC AUTHOR NOTE

The following block quote uses two spaces at the ends of lines (except the
last line) to create returns in the rendered content. Don't remove the two 
spaces at the ends of the lines when editing the following content.

-->

> MinimumAgeAuthorizationHandler: Information: Evaluating authorization requirement for age >= 21
> MinimumAgeAuthorizationHandler: Information: Current user's DateOfBirth claim (2020-01-01) doesn't satisfy the minimum age authorization requirement 21

## Additional resources

[mvc/security/authorization/iard](../../mvc/security/authorization/custom-authorization-policies-with-iauthorizationrequirementdata-in-mvc.md)
