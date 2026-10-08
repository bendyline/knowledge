---
title: Use Identity to secure a Web API backend for SPAs
author: tdykstra
description: Learn how to use Identity to secure a Web API backend for single page applications (SPAs).
monikerRange: '>= aspnetcore-3.0'
ms.author: tdykstra
ms.date: 10/07/2026
uid: security/authentication/identity/spa
---
# How to use Identity to secure a Web API backend for SPAs

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


**Applies to: \>= aspnetcore-8.0**

[ASP.NET Core Identity](identity.md) provides APIs that handle authentication, authorization, and identity management. The APIs make it possible to secure endpoints of a Web API backend with cookie-based authentication. A token-based option is available for clients that can't use cookies, but in using this you are responsible for ensuring the tokens are kept secure. We recommend using cookies for browser-based applications, because, by default, the browser automatically handles them without exposing them to JavaScript.

This article shows how to use Identity to secure a Web API backend for SPAs such as Angular, React, and Vue apps. The same backend APIs can be used to secure [Blazor WebAssembly apps](../../blazor/security/webassembly/standalone-with-identity/index.md).

## Prerequisites

The steps shown in this article add authentication and authorization to an ASP.NET Core Web API app that:

* Isn't already configured for authentication.
* Targets `net8.0` or later.
* Can be either Minimal API or controller-based API.

Some of the testing instructions in this article use the [Swagger UI](https://learn.microsoft.com/aspnet/core/tutorials/web-api-help-pages-using-swagger) that's included with the project template. The Swagger UI isn't required to use Identity with a Web API backend.

## Install NuGet packages

Install the following NuGet packages:

* [`Microsoft.AspNetCore.Identity.EntityFrameworkCore`](https://www.nuget.org/packages/Microsoft.AspNetCore.Identity.EntityFrameworkCore) - Enables Identity to work with Entity Framework Core (EF Core).
* One that enables EF Core to work with a database, such as one of the following packages:
  * [`Microsoft.EntityFrameworkCore.SqlServer`](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer) or
  * [`Microsoft.EntityFrameworkCore.Sqlite`](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Sqlite) or
  * [`Microsoft.EntityFrameworkCore.InMemory`](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.InMemory).

For the quickest way to get started, use the in-memory database.

Change the database later to SQLite or SQL Server to save user data between sessions when testing or for production use. That introduces some complexity compared to in-memory, as it requires the database to be created through [migrations](https://learn.microsoft.com/ef/core/managing-schemas/migrations/), as shown in the [EF Core getting started tutorial](https://learn.microsoft.com/ef/core/get-started/overview/first-app).

Install these packages by using the [NuGet package manager in Visual Studio](https://learn.microsoft.com/nuget/consume-packages/install-use-packages-visual-studio) or the [dotnet add package](https://learn.microsoft.com/dotnet/core/tools/dotnet-add-package) CLI command.

## Create an `IdentityDbContext`

Add a class named `ApplicationDbContext` that inherits from [Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityDbContext%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityDbContext%25601):

[Code reference unavailable in this source snapshot: ~\\security\\authentication\\identity-api-authorization\\8samples\\APIforSPA\\ApplicationDbContext.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authentication/identity-api-authorization.md)

The code shown provides a special constructor that makes it possible to configure the database for different environments.

Add one or more of the following `using` directives as needed when adding the code shown in these steps.

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
```

## Configure the EF Core context

As noted earlier, the simplest way to get started is to use the in-memory database. With in-memory each run starts with a fresh database, and there's no need to use migrations. After the call to `WebApplication.CreateBuilder(args)`, add the following code to configure Identity to use an in-memory database:

[Code reference unavailable in this source snapshot: ~\\security\\authentication\\identity-api-authorization\\8samples\\APIforSPA\\Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authentication/identity-api-authorization.md)

To save user data between sessions when testing or for production use, change the database later to SQLite or SQL Server.
    
## Add Identity services to the container

After the call to `WebApplication.CreateBuilder(args)`, call [Microsoft.Extensions.DependencyInjection.AuthorizationServiceCollectionExtensions.AddAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthorizationServiceCollectionExtensions.AddAuthorization%252A) to add services to the dependency injection (DI) container:

[Code reference unavailable in this source snapshot: ~\\security\\authentication\\identity-api-authorization\\8samples\\APIforSPA\\Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authentication/identity-api-authorization.md)

## Activate Identity APIs

After the call to `WebApplication.CreateBuilder(args)`, call [Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentityApiEndpoints%60%601(Microsoft.Extensions.DependencyInjection.IServiceCollection)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentityApiEndpoints%2560%25601(Microsoft.Extensions.DependencyInjection.IServiceCollection)) and [Microsoft.Extensions.DependencyInjection.IdentityEntityFrameworkBuilderExtensions.AddEntityFrameworkStores%60%601(Microsoft.AspNetCore.Identity.IdentityBuilder)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityEntityFrameworkBuilderExtensions.AddEntityFrameworkStores%2560%25601(Microsoft.AspNetCore.Identity.IdentityBuilder)).

[Code reference unavailable in this source snapshot: ~\\security\\authentication\\identity-api-authorization\\8samples\\APIforSPA\\Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authentication/identity-api-authorization.md)

By default, both cookies and proprietary tokens are activated. Cookies are issued at login if either the `useCookies` or `useSessionCookies` query string parameter in the login endpoint is `true`.


## Map Identity routes

After the call to `builder.Build()`, call [Microsoft.AspNetCore.Routing.IdentityApiEndpointRouteBuilderExtensions.MapIdentityApi%60%601(Microsoft.AspNetCore.Routing.IEndpointRouteBuilder)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Routing.IdentityApiEndpointRouteBuilderExtensions.MapIdentityApi%2560%25601(Microsoft.AspNetCore.Routing.IEndpointRouteBuilder)) to map the Identity endpoints:

[Code reference unavailable in this source snapshot: ~\\security\\authentication\\identity-api-authorization\\8samples\\APIforSPA\\Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authentication/identity-api-authorization.md)

## Secure selected endpoints

To secure an endpoint, use the [Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization%252A) extension method on the `Map{Method}` call that defines the route. For example:

[Code reference unavailable in this source snapshot: ~\\security\\authentication\\identity-api-authorization\\8samples\\APIforSPA\\Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authentication/identity-api-authorization.md)

The `RequireAuthorization` method can also be used to:

* Secure Swagger UI endpoints, as shown in the following example:
    
   [Code reference unavailable in this source snapshot: ~\\security\\authentication\\identity-api-authorization\\8samples\\APIforSPA\\Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authentication/identity-api-authorization.md)
 
* Secure with a specific claim or permission, as shown in the following example:

  [Code reference unavailable in this source snapshot: ~\\security\\authentication\\identity-api-authorization\\8samples\\APIforSPA\\Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authentication/identity-api-authorization.md)

In a controller-based web API project, secure endpoints by applying the [\[`Authorize`\]](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute) attribute to a controller or action.

## Test the API

A quick way to test authentication is to use the in-memory database and the Swagger UI that's included with the project template. The following steps show how to test the API with the Swagger UI. Make sure that the [Swagger UI endpoints aren't secured](#secure-selected-endpoints). 

### Attempt to access a secured endpoint

* Run the app and navigate to the Swagger UI.
* Expand a secured endpoint, such as `/weatherforecast` in a project created by the web API template.
* Select  **Try it out**.
* Select **Execute**. The response is `401 - not authorized`.

### Test registration

* Expand `/register` and select **Try it out**.
* In the **Parameters** section of the UI, a sample request body is shown:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

* Replace "string" with a valid email address and password, and then select **Execute**.

  To comply with the default password validation rules, the password must be at least six characters long and contain at least one of each of the following characters:

  * Uppercase letter
  * Lowercase letter
  * Numeric digit
  * Nonalphanumeric character

  If you enter an invalid email address or a bad password, the result includes the validation errors. Here's an example of a response body with validation errors:

  ```json
  {
    "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "errors": {
      "PasswordTooShort": [
        "Passwords must be at least 6 characters."
      ],
      "PasswordRequiresNonAlphanumeric": [
        "Passwords must have at least one non alphanumeric character."
      ],
      "PasswordRequiresDigit": [
        "Passwords must have at least one digit ('0'-'9')."
      ],
      "PasswordRequiresLower": [
        "Passwords must have at least one lowercase ('a'-'z')."
      ]
    }
  }
  ```

  The errors are returned in the [ProblemDetails](https://learn.microsoft.com/aspnet/core/web-api/handle-errors#validation-failure-error-response) format so the client can parse them and display validation errors as needed.

  A successful registration results in a `200 - OK` response.

### Test login

* Expand `/login` and select **Try it out**. The example request body shows two additional parameters:

  ```json
  {
    "email": "string",
    "password": "string",
    "twoFactorCode": "string",
    "twoFactorRecoveryCode": "string"
  }
  ```

  The extra JSON properties aren't needed for this example and can be deleted. Set `useCookies` to `true`. 

* Replace "string" with the email address and password that you used to register, and then select **Execute**.

  A successful login results in a `200 - OK` response with a cookie in the response header.

### Retest the secured endpoint

After a successful login, rerun the secured endpoint. The authentication cookie is automatically sent with the request, and the endpoint is authorized. Cookie-based authentication is securely built-in to the browser and "just works."

### Testing with nonbrowser clients

Some web clients might not include cookies in the header by default:

* If you're using a tool for testing APIs, you might need to enable cookies in the settings.
* The JavaScript `fetch` API doesn't include cookies by default. Enable them by setting `credentials` to the value `include` in the options.
* An `HttpClient` running in a Blazor WebAssembly app needs the `HttpRequestMessage` to include credentials, like the following example:

  ```csharp
  request.SetBrowserRequestCredential(BrowserRequestCredentials.Include);
  ```

## Use token-based authentication

We recommend using cookies in browser-based applications, because, by default, the browser automatically handles them without exposing them to JavaScript.

A custom token (one that is proprietary to the ASP.NET Core identity platform) is issued that can be used to authenticate subsequent requests. The short-lived access token is passed in the `Authorization` header as a bearer token. A longer-lived refresh token is also provided. This refresh token allows the application to request a new access token when the old one expires without forcing the user to log in again.

The tokens aren't standard JSON Web Tokens (JWTs). The use of custom tokens is intentional, as the built-in Identity API is meant primarily for simple scenarios. The token option isn't intended to be a full-featured identity service provider or token server, but instead an alternative to the cookie option for clients that can't use cookies.

To use token-based authentication, set `useCookies` and `useSessionCookies` to `false` (or omit them) when calling the `/login` endpoint. Tokens use the *Bearer* authentication scheme. Using the token returned from the call to `/login`, subsequent calls to protected endpoints should add the header `Authorization: Bearer {TOKEN}`, where the `{TOKEN}` placeholder is the access token. For more information, see the [Use the `POST /login` endpoint](#use-the-post-login-endpoint) section.


## Log out

To provide a way for the user to log out, define a `/logout` endpoint like the following example:

[Code reference unavailable in this source snapshot: ~\\security\\authentication\\identity-api-authorization\\8samples\\APIforSPA\\Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authentication/identity-api-authorization.md)

Provide an empty JSON object (`{}`) in the request body when calling this endpoint. The following code is an example of a call to the logout endpoint:

```typescript
public signOut() {
  return this.http.post('/logout', {}, {
    withCredentials: true,
    observe: 'response',
    responseType: 'text'
```

## SignOut everywhere

Apps need to react to events involving security-sensitive actions such as password changes, or other security-sensitive events.  This is achieved using the [security stamp](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.identity.identityuser-1.securitystamp) feature of Identity.

Apps need to react to security-sensitive actions such as password changes. Identity achieves this using the [security stamp](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.identity.identityuser-1.securitystamp) feature:

* For cookie-based authentication, the security stamp is periodically revalidated based on [SecurityStampValidatorOptions.ValidationInterval](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.identity.securitystampvalidatoroptions.validationinterval).
* For token-based authentication, the access token lifetime set by [BearerTokenOptions.BearerTokenExpiration](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.authentication.bearertoken.bearertokenoptions.bearertokenexpiration) limits how long a session remains active after a security-sensitive change.

The validation interval is a balance between immediate session invalidation and database performance. A shorter interval requires more frequent database hits, while a longer one leaves a small window where an old, potentially compromised session might remain active. 

## The `MapIdentityApi<TUser>` endpoints

The call to `MapIdentityApi<TUser>` adds the following endpoints to the app:

* [`POST /register`](#use-the-post-register-endpoint)
* [`POST /login`](#use-the-post-login-endpoint)
* [`POST /refresh`](#use-the-post-refresh-endpoint)
* [`GET /confirmEmail`](#use-the-get-confirmemail-endpoint)
* [`POST /resendConfirmationEmail`](#use-the-post-resendconfirmationemail-endpoint)
* [`POST /forgotPassword`](#use-the-post-forgotpassword-endpoint)
* [`POST /resetPassword`](#use-the-post-resetpassword-endpoint)
* [`POST /manage/2fa`](#use-the-post-manage2fa-endpoint)
* [`GET /manage/info`](#use-the-get-manageinfo-endpoint)
* [`POST /manage/info`](#use-the-post-manageinfo-endpoint)

## Use the `POST /register` endpoint

The request body must have [Microsoft.AspNetCore.Identity.Data.LoginRequest.Email](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.LoginRequest.Email) and [Microsoft.AspNetCore.Identity.Data.LoginRequest.Password](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.LoginRequest.Password) properties:

```json
{
  "email": "string",
  "password": "string",
}
```

For more information, see:

* [Test registration](#test-registration) earlier in this article.
* [Microsoft.AspNetCore.Identity.Data.RegisterRequest](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.RegisterRequest).

## Use the `POST /login` endpoint

In the request body, [Microsoft.AspNetCore.Identity.Data.LoginRequest.Email](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.LoginRequest.Email) and [Microsoft.AspNetCore.Identity.Data.LoginRequest.Password](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.LoginRequest.Password) are required. If two-factor authentication (2FA) is enabled, either [Microsoft.AspNetCore.Identity.Data.LoginRequest.TwoFactorCode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.LoginRequest.TwoFactorCode) or [Microsoft.AspNetCore.Identity.Data.LoginRequest.TwoFactorRecoveryCode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.LoginRequest.TwoFactorRecoveryCode) is required. If 2FA isn't enabled, omit both `twoFactorCode` and `twoFactorRecoveryCode`. For more information, see [Use the `POST /manage/2fa` endpoint](#use-the-post-manage2fa-endpoint) later in this article.

Here's a request body example with 2FA not enabled:

```json
{
  "email": "string",
  "password": "string"
}
```

Here are request body examples with 2FA enabled:

* ```json
  {
    "email": "string",
    "password": "string",
    "twoFactorCode": "string",
  }
  ```

* ```json
  {
    "email": "string",
    "password": "string",
    "twoFactorRecoveryCode": "string"
  }
  ```

The endpoint supports the following query string parameters:

* `useCookies`: Set to `true` to issue a persistent authentication cookie when `useSessionCookies` isn't `true`.
* `useSessionCookies`: Set to `true` to issue a session (non-persistent) authentication cookie.

If both `useCookies` and `useSessionCookies` are set to `true`, a session cookie is issued. If both parameters are `false` or omitted, token-based authentication is used.

For more information about cookie-based authentication, see [Test login](#test-login) earlier in this article.

### Token-based authentication

If both `useCookies` and `useSessionCookies` are `false` or omitted, token-based authentication is enabled. The response body includes the following properties:

```json
{
  "tokenType": "string",
  "accessToken": "string",
  "expiresIn": 0,
  "refreshToken": "string"
}
```

For more information about these properties, see [Microsoft.AspNetCore.Authentication.BearerToken.AccessTokenResponse](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.BearerToken.AccessTokenResponse).

Use the [BearerTokenOptions.BearerTokenExpiration](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.authentication.bearertoken.bearertokenoptions.bearertokenexpiration) property to set how long the access token remains valid.

Put the access token in a header to make authenticated requests, as shown in the following example

```http
Authorization: Bearer {access token}
```

When the access token is about to expire, call the [/refresh](#use-the-post-refresh-endpoint) endpoint.

## Use the `POST /refresh` endpoint

For use only with token-based authentication. Gets a new access token without forcing the user to log in again. Call this endpoint when the access token is about to expire.

The request body contains only the [Microsoft.AspNetCore.Identity.Data.RefreshRequest.RefreshToken](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.RefreshRequest.RefreshToken). Here's a request body example:

```json
{
  "refreshToken": "string"
}
```

If the call is successful, the response body is a new [Microsoft.AspNetCore.Authentication.BearerToken.AccessTokenResponse](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.BearerToken.AccessTokenResponse), as shown in the following example:

```json
{
  "tokenType": "string",
  "accessToken": "string",
  "expiresIn": 0,
  "refreshToken": "string"
}
```

Use the [BearerTokenOptions.RefreshTokenExpiration](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.authentication.bearertoken.bearertokenoptions.refreshtokenexpiration) property to set how long the refresh token remains valid.

## Use the `GET /confirmEmail` endpoint

If Identity is set up for email confirmation, a successful call to the `/register` endpoint sends an email that contains a link to the `/confirmEmail` endpoint. The link contains the following query string parameters:

* `userId`
* `code`
* `changedEmail` - Included only if the user changed the email address during registration. 

Identity provides default text for the confirmation email. By default, the email subject is "Confirm your email" and the email body looks like the following example:

```http
 Please confirm your account by <a href='https://contoso.com/confirmEmail?userId={user ID}&code={generated code}&changedEmail={new email address}'>clicking here</a>.
```

If the [Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedEmail](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedEmail) property is set to `true`, the user can't log in until the email address is confirmed by clicking the link in the email. The `/confirmEmail` endpoint:

* Confirms the email address and enables the user to log in.
* Returns the text "Thank you for confirming your email." in the response body.

To set up Identity for email confirmation, add code in `Program.cs` to set `RequireConfirmedEmail` to `true` and add a class that implements [Microsoft.AspNetCore.Identity.UI.Services.IEmailSender](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.UI.Services.IEmailSender) to the DI container. For example:

[language="csharp" source="\~/security/authentication/identity-api-authorization/8samples/APIforSPA/Program.cs" id="snippetConfigureEmail"::: (complete source file; reference: \~/security/authentication/identity-api-authorization/8samples/APIforSPA/Program.cs)](../../../_code/aspnetcore/security/authentication/identity-api-authorization/8samples/APIforSPA/Program.cs.md)

For more information, see [security/authentication/accconfirm](accconfirm.md).

Identity provides default text for the other emails that need to be sent as well, such as for 2FA and password reset. To customize these emails, provide a custom implementation of the `IEmailSender` interface. In the preceding example, `EmailSender` is a class that implements `IEmailSender`. For more information, including an example of a class that implements `IEmailSender`, see [security/authentication/accconfirm](accconfirm.md).

## Use the `POST /resendConfirmationEmail` endpoint

Sends an email only if the address is valid for a registered user.

The request body contains only the [Microsoft.AspNetCore.Identity.Data.ResendConfirmationEmailRequest.Email](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.ResendConfirmationEmailRequest.Email). Here's a request body example:

```json
{
  "email": "string"
}
```

For more information, see [Use the `GET /confirmEmail` endpoint](#use-the-get-confirmemail-endpoint) earlier in this article.

## Use the `POST /forgotPassword` endpoint

Generates an email that contains a password reset code. Send that code to [`/resetPassword`](#use-the-post-resetpassword-endpoint) with a new password.

The request body contains only the [Microsoft.AspNetCore.Identity.Data.ForgotPasswordRequest.Email](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.ForgotPasswordRequest.Email). Here's an example:

```json
{
  "email": "string"
}
```

For information about how to enable Identity to send emails, see [Use the `GET /confirmEmail` endpoint](#use-the-get-confirmemail-endpoint).

## Use the `POST /resetPassword` endpoint

Call this endpoint after getting a reset code by calling the `/forgotPassword` endpoint.

The request body requires [Microsoft.AspNetCore.Identity.Data.ResetPasswordRequest.Email](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.ResetPasswordRequest.Email), [Microsoft.AspNetCore.Identity.Data.ResetPasswordRequest.ResetCode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.ResetPasswordRequest.ResetCode), and [Microsoft.AspNetCore.Identity.Data.ResetPasswordRequest.NewPassword](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.ResetPasswordRequest.NewPassword). Here's an example:

```json
{
  "email": "string",
  "resetCode": "string",
  "newPassword": "string"
}
```

## Use the `POST /manage/2fa` endpoint

Configures two-factor authentication (2FA) for the user. When 2FA is enabled, successful login requires a code produced by an authenticator app in addition to the email address and password.

### Enable 2FA

To enable 2FA for the currently authenticated user:

* Call the `/manage/2fa` endpoint, sending an empty JSON object (`{}`) in the request body.

* The response body provides the [Microsoft.AspNetCore.Identity.Data.TwoFactorResponse.SharedKey](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.TwoFactorResponse.SharedKey) along with some other properties that aren't needed at this point. The shared key is used to set up the authenticator app. Response body example:

  ```json
  {
    "sharedKey": "string",
    "recoveryCodesLeft": 0,
    "recoveryCodes": null,
    "isTwoFactorEnabled": false,
    "isMachineRemembered": false
  }
  ```

* Use the shared key to get a Time-based one-time password (TOTP). For more information, see [security/authentication/identity-enable-qrcodes](identity-enable-qrcodes.md).

* Call the `/manage/2fa` endpoint, sending the TOTP and `"enable": true` in the request body. For example:

    ```json
    {
      "enable": true,
      "twoFactorCode": "string"
    }
  ```

* The response body confirms that [Microsoft.AspNetCore.Identity.Data.TwoFactorResponse.IsTwoFactorEnabled](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.TwoFactorResponse.IsTwoFactorEnabled) is true and provides the [Microsoft.AspNetCore.Identity.Data.TwoFactorResponse.RecoveryCodes](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.TwoFactorResponse.RecoveryCodes). The recovery codes are used to log in when the authenticator app isn't available. Response body example after successfully enabling 2FA:

  ```json
  {
    "sharedKey": "string",
    "recoveryCodesLeft": 10,
    "recoveryCodes": [
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string",
      "string"
    ],
    "isTwoFactorEnabled": true,
    "isMachineRemembered": false
  }
  ```
  
### Log in with 2FA

Call the `/login` endpoint, sending the email address, password, and TOTP in the request body. For example:

```json
{
  "email": "string",
  "password": "string",
  "twoFactorCode": "string"
}
```

If the user doesn't have access to the authenticator app, log in by calling the `/login` endpoint with one of the recovery codes that was provided when 2FA was enabled. The request body looks like the following example:

  ```json
  {
    "email": "string",
    "password": "string",
    "twoFactorRecoveryCode": "string"
  }
  ```

### Reset the recovery codes

To get a new collection of recovery codes, call this endpoint with [Microsoft.AspNetCore.Identity.Data.TwoFactorRequest.ResetRecoveryCodes](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.TwoFactorRequest.ResetRecoveryCodes) set to `true`. Here's a request body example:

```json
{
  "resetRecoveryCodes": true
}
```

### Reset the shared key

To get a new random shared key, call this endpoint with [Microsoft.AspNetCore.Identity.Data.TwoFactorRequest.ResetSharedKey](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.TwoFactorRequest.ResetSharedKey) set to `true`. Here's a request body example:

```json
{
  "resetSharedKey": true
}
```

Resetting the key automatically disables the two-factor login requirement for the authenticated user until it's re-enabled by a later request.

### Forget the machine

To clear the cookie "remember me flag" if present, call this endpoint with [Microsoft.AspNetCore.Identity.Data.TwoFactorRequest.ForgetMachine](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.TwoFactorRequest.ForgetMachine) set to true. Here's a request body example:

```json
{
  "forgetMachine": true
}
```

This endpoint has no impact on token-based authentication. 

## Use the `GET /manage/info` endpoint

Gets email address and email confirmation status of the logged-in user. Claims were omitted from this endpoint for security reasons. If claims are needed, use the server-side APIs to set up an endpoint for claims. Or instead of sharing all of the users' claims, provide a validation endpoint that accepts a claim and responds whether the user has it.

The request doesn't require any parameters. The response body includes the [Microsoft.AspNetCore.Identity.Data.InfoResponse.Email](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.InfoResponse.Email) and [Microsoft.AspNetCore.Identity.Data.InfoResponse.IsEmailConfirmed](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.InfoResponse.IsEmailConfirmed) properties, as in the following example:
  
```json
{
  "email": "string",
  "isEmailConfirmed": true
}
```

## Use the `POST /manage/info` endpoint

Updates the email address and password of the logged-in user. Send [Microsoft.AspNetCore.Identity.Data.InfoRequest.NewEmail](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.InfoRequest.NewEmail), [Microsoft.AspNetCore.Identity.Data.InfoRequest.NewPassword](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.InfoRequest.NewPassword), and [Microsoft.AspNetCore.Identity.Data.InfoRequest.OldPassword](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.Data.InfoRequest.OldPassword) in the request body, as shown in the following example:

```json
{
  "newEmail": "string",
  "newPassword": "string",
  "oldPassword": "string"
}
```

Here's an example of the response body:

```json
{
  "email": "string",
  "isEmailConfirmed": false
}
```

## See also

For more information, see the following resources:

* [security/how-to-choose-identity](../how-to-choose-identity-solution.md)
* [security/identity-management-solutions](../identity-management-solutions.md)
* [security/authorization/simple](../authorization/simple.md)
* [security/authentication/add-user-data](add-user-data.md)
* [security/authorization/secure-data](../authorization/secure-data.md)
* [security/authentication/accconfirm](accconfirm.md)
* [security/authentication/identity-enable-qrcodes](identity-enable-qrcodes.md)
* [Sample Web API backend for SPAs](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/samples/SimpleAuthCookiesAndTokens/SimpleAuthCookiesAndTokens)
  The .http file shows token-based authentication. For example:
  * Doesn't set `useCookies`
  * Uses the Authorization header to pass the token
  * Shows refresh to extend session without forcing the user to login again
* [Sample Angular app that uses Identity to secure a Web API backend](https://github.com/dotnet/AspNetCore.Docs.Samples/tree/main/samples/ngIdentity)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**
<!-- ms.sfi.ropc: t -->

The ASP.NET Core templates offer authentication in Single Page Apps (SPAs) using the support for API authorization. ASP.NET Core Identity for authenticating and storing users is combined with [Duende Identity Server](https://docs.duendesoftware.com) for implementing OpenID Connect.

> **Important:**
> [Duende Software](https://duendesoftware.com/) might require you to pay a license fee for production use of Duende Identity Server. For more information, see [migration/50-to-60#project-templates-use-duende-identity-server](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23project-templates-use-duende-identity-server).

An authentication parameter was added to the **Angular** and **React** project templates that is similar to the authentication parameter in the **Web Application (Model-View-Controller)** (MVC) and **Web Application** (Razor Pages) project templates. The allowed parameter values are **None** and **Individual**. The **React.js and Redux** project template doesn't support the authentication parameter at this time.

## Create an app with API authorization support

User authentication and authorization can be used with both Angular and React SPAs. Open a command shell, and run the following command:

**Angular**:

```dotnetcli
dotnet new angular -au Individual
```

**React**:

```dotnetcli
dotnet new react -au Individual
```

The preceding command creates an ASP.NET Core app with a *ClientApp* directory containing the SPA.

## General description of the ASP.NET Core components of the app

The following sections describe additions to the project when authentication support is included:

### `Program.cs`

The following code examples rely on the [Microsoft.AspNetCore.ApiAuthorization.IdentityServer](https://www.nuget.org/packages/Microsoft.AspNetCore.ApiAuthorization.IdentityServer) NuGet package. The examples configure API authentication and authorization using the [Microsoft.Extensions.DependencyInjection.IdentityServerBuilderConfigurationExtensions.AddApiAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServerBuilderConfigurationExtensions.AddApiAuthorization%252A) and [Microsoft.AspNetCore.ApiAuthorization.IdentityServer.ApiResourceCollection.AddIdentityServerJwt%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ApiAuthorization.IdentityServer.ApiResourceCollection.AddIdentityServerJwt%252A) extension methods. Projects using the React or Angular SPA project templates with authentication include a reference to this package.

`dotnet new angular -au Individual` generates the following `Program.cs` file:

[Code reference unavailable in this source snapshot: identity-api-authorization/includes/~/security/authentication/identity-api-authorization/6samples/Program.cs](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authentication/identity-api-authorization.md)

The preceding code configures:

* Identity with the default UI:

  ```csharp
  builder.Services.AddDbContext<ApplicationDbContext>(options =>
      options.UseSqlite(connectionString));
  builder.Services.AddDatabaseDeveloperPageExceptionFilter();
  
  builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
      .AddEntityFrameworkStores<ApplicationDbContext>();
  ```

* IdentityServer with an additional `AddApiAuthorization` helper method that sets up some default ASP.NET Core conventions on top of IdentityServer:

  ```csharp
  builder.Services.AddIdentityServer()
      .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();
  ```

* Authentication with an additional `AddIdentityServerJwt` helper method that configures the app to validate JWT tokens produced by IdentityServer:

   ```csharp
   builder.Services.AddAuthentication()
   .AddIdentityServerJwt();
   ```

* The authentication middleware that is responsible for validating the request credentials and setting the user on the request context:

    ```csharp
    app.UseAuthentication();
    ```

* The IdentityServer middleware that exposes the OpenID Connect endpoints:

    ```csharp
    app.UseIdentityServer();
    ```

> **Warning:**
> This article shows the use of connection strings. When a local database is used for development and testing, database user authentication via the connection string isn't required.
> In production environments, connection strings sometimes include a password for authenticating database access or database operations. A resource owner password credential (ROPC) in a connection string is a security risk that should be avoided in production apps. Production apps should use the most secure authentication flow available.
> For more information on authentication for apps deployed to test or production environments, see [security/index#secure-authentication-flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


### Azure App Service on Linux

For Azure App Service deployments on Linux, specify the issuer explicitly:

```csharp
builder.Services.Configure<JwtBearerOptions>(
    IdentityServerJwtConstants.IdentityServerJwtBearerScheme, 
    options =>
    {
        options.Authority = "{AUTHORITY}";
    });
```

In the preceding code, the `{AUTHORITY}` placeholder is the [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Authority](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Authority) to use when making OpenID Connect calls.

Example:

```csharp
options.Authority = "https://contoso-service.azurewebsites.net";
```

### `AddApiAuthorization`

This helper method configures IdentityServer to use our supported configuration. IdentityServer is a powerful and extensible framework for handling app security concerns. At the same time, that exposes unnecessary complexity for the most common scenarios. Consequently, a set of conventions and configuration options is provided to you that are considered a good starting point. Once your authentication needs change, the full power of IdentityServer is still available to customize authentication to suit your needs.

### `AddIdentityServerJwt`

This helper method configures a policy scheme for the app as the default authentication handler. The policy is configured to let Identity handle all requests routed to any subpath in the Identity URL space "/Identity". The `JwtBearerHandler` handles all other requests. Additionally, this method registers an `<<ApplicationName>>API` API resource with IdentityServer with a default scope of `<<ApplicationName>>API` and configures the JWT bearer token middleware to validate tokens issued by IdentityServer for the app.

### `WeatherForecastController`

In the  file, notice the `[Authorize]` attribute applied to the class that indicates that the user needs to be authorized based on the default policy to access the resource. The default authorization policy happens to be configured to use the default authentication scheme, which is set up by `AddIdentityServerJwt` to the policy scheme that was mentioned above, making the `JwtBearerHandler` configured by such helper method the default handler for requests to the app.

### `ApplicationDbContext`

In the  file, notice the same `DbContext` is used in Identity with the exception that it extends `ApiAuthorizationDbContext` (a more derived class from `IdentityDbContext`) to include the schema for IdentityServer.

To gain full control of the database schema, inherit from one of the available Identity `DbContext` classes and configure the context to include the Identity schema by calling `builder.ConfigurePersistedGrantContext(_operationalStoreOptions.Value)` on the `OnModelCreating` method.

### `OidcConfigurationController`

In the  file, notice the endpoint that's provisioned to serve the OIDC parameters that the client needs to use.

### `appsettings.json`

In the `appsettings.json` file of the project root, there's a new `IdentityServer` section that describes the list of configured clients. In the following example, there's a single client. The client name corresponds to the app name and is mapped by convention to the OAuth `ClientId` parameter. The profile indicates the app type being configured. It's used internally to drive conventions that simplify the configuration process for the server. There are several profiles available, as explained in the [Application profiles](#application-profiles) section.

```json
"IdentityServer": {
  "Clients": {
    "angularindividualpreview3final": {
      "Profile": "IdentityServerSPA"
    }
  }
}
```

### `appsettings.Development.json`

In the `appsettings.Development.json` file of the project root, there's an `IdentityServer` section that describes the key used to sign tokens. When deploying to production, a key needs to be provisioned and deployed alongside the app, as explained in the [Deploy to production](#deploy-to-production) section.

```json
"IdentityServer": {
  "Key": {
    "Type": "Development"
  }
}
```

## General description of the Angular app

The authentication and API authorization support in the Angular template resides in its own Angular module in the *ClientApp/src/api-authorization* directory. The module is composed of the following elements:

* 3 components:
  * `login.component.ts`: Handles the app's login flow.
  * `logout.component.ts`: Handles the app's logout flow.
  * `login-menu.component.ts`: A widget that displays one of the following sets of links:
    * User profile management and log out links when the user is authenticated.
    * Registration and log in links when the user isn't authenticated.
* A route safeguard `AuthorizeGuard` that can be added to routes and requires a user to be authenticated before visiting the route.
* An HTTP interceptor `AuthorizeInterceptor` that attaches the access token to outgoing HTTP requests targeting the API when the user is authenticated.
* A service `AuthorizeService` that handles the lower-level details of the authentication process and exposes information about the authenticated user to the rest of the app for consumption.
* An Angular module that defines routes associated with the authentication parts of the app. It exposes the login menu component, the interceptor, the safeguard, and the service for consumption from the rest of the app.

## General description of the React app

The support for authentication and API authorization in the React template resides in the *ClientApp/src/components/api-authorization* directory. It's composed of the following elements:

* 4 components:
  * `Login.js`: Handles the app's login flow.
  * `Logout.js`: Handles the app's logout flow.
  * `LoginMenu.js`: A widget that displays one of the following sets of links:
    * User profile management and log out links when the user is authenticated.
    * Registration and log in links when the user isn't authenticated.
  * `AuthorizeRoute.js`: A route component that requires a user to be authenticated before rendering the component indicated in the `Component` parameter.
* An exported `authService` instance of class `AuthorizeService` that handles the lower-level details of the authentication process and exposes information about the authenticated user to the rest of the app for consumption.

Now that you've seen the main components of the solution, you can take a deeper look at individual scenarios for the app.

## Require authorization on a new API

By default, the system is configured to easily require authorization for new APIs. To do so, create a new controller and add the `[Authorize]` attribute to the controller class or to any action within the controller.

## Customize the API authentication handler

To customize the configuration of the API's JWT handler, configure its [Microsoft.AspNetCore.Builder.JwtBearerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.JwtBearerOptions) instance:

```csharp
builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

builder.Services.Configure<JwtBearerOptions>(
    IdentityServerJwtConstants.IdentityServerJwtBearerScheme,
    options =>
    {
        ...
    });
```

The API's JWT handler raises events that enable control over the authentication process using `JwtBearerEvents`. To provide support for API authorization, `AddIdentityServerJwt` registers its own event handlers.

To customize the handling of an event, wrap the existing event handler with additional logic as required. For example:

```csharp
builder.Services.Configure<JwtBearerOptions>(
    IdentityServerJwtConstants.IdentityServerJwtBearerScheme,
    options =>
    {
        var onTokenValidated = options.Events.OnTokenValidated;       
        
        options.Events.OnTokenValidated = async context =>
        {
            await onTokenValidated(context);
            ...
        }
    });
```

In the preceding code, the `OnTokenValidated` event handler is replaced with a custom implementation. This implementation:

1. Calls the original implementation provided by the API authorization support.
1. Run its own custom logic.

## Protect a client-side route (Angular)

Protecting a client-side route is done by adding the authorize safeguard to the list of safeguards to run when configuring a route. As an example, you can see how the `fetch-data` route is configured within the main app Angular module:

```typescript
RouterModule.forRoot([
  // ...
  { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
])
```

It's important to mention that protecting a route doesn't protect the actual endpoint (which still requires an `[Authorize]` attribute applied to it) but that it only prevents the user from navigating to the given client-side route when it isn't authenticated.

## Authenticate API requests (Angular)

Authenticating requests to APIs hosted alongside the app is done automatically through the use of the HTTP client interceptor defined by the app.

## Protect a client-side route (React)

Protect a client-side route by using the `AuthorizeRoute` component instead of the plain `Route` component. For example, notice how the `fetch-data` route is configured within the `App` component:

```jsx
<AuthorizeRoute path='/fetch-data' component={FetchData} />
```

Protecting a route:

* Doesn't protect the actual endpoint (which still requires an `[Authorize]` attribute applied to it).
* Only prevents the user from navigating to the given client-side route when it isn't authenticated.

## Authenticate API requests (React)

Authenticating requests with React is done by first importing the `authService` instance from the `AuthorizeService`. The access token is retrieved from the `authService` and is attached to the request as shown below. In React components, this work is typically done in the `componentDidMount` lifecycle method or as the result from some user interaction.

### Import the `authService` into a component

```javascript
import authService from './api-authorization/AuthorizeService'
```

### Retrieve and attach the access token to the response

```javascript
async populateWeatherData() {
  const token = await authService.getAccessToken();
  const response = await fetch('api/SampleData/WeatherForecasts', {
    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  this.setState({ forecasts: data, loading: false });
}
```

## Deploy to production

To deploy the app to production, the following resources need to be provisioned:

* A database to store the Identity user accounts and the IdentityServer grants.
* A production certificate to use for signing tokens.
  * There are no specific requirements for this certificate; it can be a self-signed certificate or a certificate provisioned through a CA authority.
  * It can be generated through standard tools like PowerShell or OpenSSL.
  * It can be installed into the certificate store on the target machines or deployed as a *.pfx* file with a strong password.

### Example: Deploy to a non-Azure web hosting provider

In your web hosting panel, create or load your certificate. Then in the app's `appsettings.json` file, modify the `IdentityServer` section to include the key details. For example:

```json
"IdentityServer": {
  "Key": {
    "Type": "Store",
    "StoreName": "WebHosting",
    "StoreLocation": "CurrentUser",
    "Name": "CN=MyApplication"
  }
}
```

In the preceding example:

* `StoreName` represents the name of the certificate store where the certificate is stored. In this case, it points to the web hosting store.
* `StoreLocation` represents where to load the certificate from (`CurrentUser` in this case).
* `Name` corresponds with the distinguished subject for the certificate.

### Example: Deploy to Azure App Service

This section describes deploying the app to Azure App Service using a certificate stored in the certificate store. To modify the app to load a certificate from the certificate store, a Standard tier service plan or better is required when you configure the app in the Azure portal in a later step.

In the app's `appsettings.json` file, modify the `IdentityServer` section to include the key details:

```json
"IdentityServer": {
  "Key": {
    "Type": "Store",
    "StoreName": "My",
    "StoreLocation": "CurrentUser",
    "Name": "CN=MyApplication"
  }
}
```

* The store name represents the name of the certificate store where the certificate is stored. In this case, it points to the personal user store.
* The store location represents where to load the certificate from (`CurrentUser` or `LocalMachine`).
* The name property on certificate corresponds with the distinguished subject for the certificate.

To deploy to Azure App Service, follow the steps in [Deploy the app to Azure](https://learn.microsoft.com/search/?terms=tutorials%2Fpublish-to-azure-webapp-using-vs%23deploy-the-app-to-azure), which explains how to create the necessary Azure resources and deploy the app to production.

After following the preceding instructions, the app is deployed to Azure but isn't yet functional. The certificate used by the app must be configured in the Azure portal. Locate the thumbprint for the certificate and follow the steps described in [Load your certificates](https://learn.microsoft.com/azure/app-service/app-service-web-ssl-cert-load#load-the-certificate-in-code).

While these steps mention SSL, there's a **Private certificates** section in the Azure portal where you can upload the provisioned certificate to use with the app.

After configuring the app and the app's settings in the Azure portal, restart the app in the portal.

## Other configuration options

The support for API authorization builds on top of IdentityServer with a set of conventions, default values, and enhancements to simplify the experience for SPAs. Needless to say, the full power of IdentityServer is available behind the scenes if the ASP.NET Core integrations don't cover your scenario. The ASP.NET Core support is focused on "first-party" apps, where all the apps are created and deployed by our organization. As such, support isn't offered for things like consent or federation. For those scenarios, use IdentityServer and follow their documentation.

### Application profiles

Application profiles are predefined configurations for apps that further define their parameters. At this time, the following profiles are supported:

* `IdentityServerSPA`: Represents a SPA hosted alongside IdentityServer as a single unit.
  * The `redirect_uri` defaults to `/authentication/login-callback`.
  * The `post_logout_redirect_uri` defaults to `/authentication/logout-callback`.
  * The set of scopes includes the `openid`, `profile`, and every scope defined for the APIs in the app.
  * The set of allowed OIDC response types is `id_token token` or each of them individually (`id_token`, `token`).
  * The allowed response mode is `fragment`.
* `SPA`: Represents a SPA that isn't hosted with IdentityServer.
  * The set of scopes includes the `openid`, `profile`, and every scope defined for the APIs in the app.
  * The set of allowed OIDC response types is `id_token token` or each of them individually (`id_token`, `token`).
  * The allowed response mode is `fragment`.
* `IdentityServerJwt`: Represents an API that is hosted alongside with IdentityServer.
  * The app is configured to have a single scope that defaults to the app name.
* `API`: Represents an API that isn't hosted with IdentityServer.
  * The app is configured to have a single scope that defaults to the app name.

### Configuration through `AppSettings`

Configure the apps through the configuration system by adding them to the list of `Clients` or `Resources`.

Configure each client's `redirect_uri` and `post_logout_redirect_uri` property, as shown in the following example:

```json
"IdentityServer": {
  "Clients": {
    "MySPA": {
      "Profile": "SPA",
      "RedirectUri": "https://www.example.com/authentication/login-callback",
      "LogoutUri": "https://www.example.com/authentication/logout-callback"
    }
  }
}
```

When configuring resources, you can configure the scopes for the resource as shown below:

```json
"IdentityServer": {
  "Resources": {
    "MyExternalApi": {
      "Profile": "API",
      "Scopes": "a b c"
    }
  }
}
```

### Configuration through code

You can also configure the clients and resources through code using an overload of `AddApiAuthorization` that takes an action to configure options.

```csharp
AddApiAuthorization<ApplicationUser, ApplicationDbContext>(options =>
{
    options.Clients.AddSPA(
        "My SPA", spa =>
        spa.WithRedirectUri("http://www.example.com/authentication/login-callback")
           .WithLogoutRedirectUri(
               "http://www.example.com/authentication/logout-callback"));

    options.ApiResources.AddApiResource("MyExternalApi", resource =>
        resource.WithScopes("a", "b", "c"));
});
```

## Additional resources

* [spa/angular](../../client-side/spa/angular.md)
* [spa/react](../../client-side/spa/react.md)
* [security/authentication/scaffold-identity](scaffold-identity.md)



**Applies to: < aspnetcore-6.0**

The ASP.NET Core 3.1 or later templates offer authentication in Single Page Apps (SPAs) using the support for API authorization. ASP.NET Core Identity for authenticating and storing users is combined with [IdentityServer](https://identityserver.io/) for implementing OpenID Connect.

An authentication parameter was added to the **Angular** and **React** project templates that is similar to the authentication parameter in the **Web Application (Model-View-Controller)** (MVC) and **Web Application** (Razor Pages) project templates. The allowed parameter values are **None** and **Individual**. The **React.js and Redux** project template doesn't support the authentication parameter at this time.

## Create an app with API authorization support

User authentication and authorization can be used with both Angular and React SPAs. Open a command shell, and run the following command:

**Angular**:

```dotnetcli
dotnet new angular -o <output_directory_name> 
```

**React**:

```dotnetcli
dotnet new react -o <output_directory_name> -au Individual
```

The preceding command creates an ASP.NET Core app with a *ClientApp* directory containing the SPA.

## General description of the ASP.NET Core components of the app

The following sections describe additions to the project when authentication support is included:

### `Startup` class

The following code examples rely on the [Microsoft.AspNetCore.ApiAuthorization.IdentityServer](https://www.nuget.org/packages/Microsoft.AspNetCore.ApiAuthorization.IdentityServer) NuGet package. The examples configure API authentication and authorization using the [Microsoft.Extensions.DependencyInjection.IdentityServerBuilderConfigurationExtensions.AddApiAuthorization%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServerBuilderConfigurationExtensions.AddApiAuthorization%252A) and [Microsoft.AspNetCore.ApiAuthorization.IdentityServer.ApiResourceCollection.AddIdentityServerJwt%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.ApiAuthorization.IdentityServer.ApiResourceCollection.AddIdentityServerJwt%252A) extension methods. Projects using the React or Angular SPA project templates with authentication include a reference to this package.

The `Startup` class has the following additions:

* Inside the `Startup.ConfigureServices` method:
  * Identity with the default UI:

    ```csharp
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

    services.AddDefaultIdentity<ApplicationUser>()
        .AddEntityFrameworkStores<ApplicationDbContext>();
    ```

  * IdentityServer with an additional `AddApiAuthorization` helper method that sets up some default ASP.NET Core conventions on top of IdentityServer:

    ```csharp
    services.AddIdentityServer()
        .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();
    ```

  * Authentication with an additional `AddIdentityServerJwt` helper method that configures the app to validate JWT tokens produced by IdentityServer:

    ```csharp
    services.AddAuthentication()
        .AddIdentityServerJwt();
    ```

* Inside the `Startup.Configure` method:
  * The authentication middleware that is responsible for validating the request credentials and setting the user on the request context:

    ```csharp
    app.UseAuthentication();
    ```

  * The IdentityServer middleware that exposes the OpenID Connect endpoints:

    ```csharp
    app.UseIdentityServer();
    ```

> **Warning:**
> This article shows the use of connection strings. When a local database is used for development and testing, database user authentication via the connection string isn't required.
> In production environments, connection strings sometimes include a password for authenticating database access or database operations. A resource owner password credential (ROPC) in a connection string is a security risk that should be avoided in production apps. Production apps should use the most secure authentication flow available.
> For more information on authentication for apps deployed to test or production environments, see [security/index#secure-authentication-flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).


### Azure App Service on Linux

For Azure App Service deployments on Linux, specify the issuer explicitly in `Startup.ConfigureServices`:

```csharp
services.Configure<JwtBearerOptions>(
    IdentityServerJwtConstants.IdentityServerJwtBearerScheme, 
    options =>
    {
        options.Authority = "{AUTHORITY}";
    });
```

In the preceding code, the `{AUTHORITY}` placeholder is the [Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Authority](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Authority) to use when making OpenID Connect calls.

Example:

```csharp
options.Authority = "https://contoso-service.azurewebsites.net";
```

### `AddApiAuthorization`

This helper method configures IdentityServer to use our supported configuration. IdentityServer is a powerful and extensible framework for handling app security concerns. At the same time, that exposes unnecessary complexity for the most common scenarios. Consequently, a set of conventions and configuration options is provided to you that are considered a good starting point. Once your authentication needs change, the full power of IdentityServer is still available to customize authentication to suit your needs.

### `AddIdentityServerJwt`

This helper method configures a policy scheme for the app as the default authentication handler. The policy is configured to let Identity handle all requests routed to any subpath in the Identity URL space "/Identity". The `JwtBearerHandler` handles all other requests. Additionally, this method registers an `<<ApplicationName>>API` API resource with IdentityServer with a default scope of `<<ApplicationName>>API` and configures the JWT bearer token middleware to validate tokens issued by IdentityServer for the app.

### `WeatherForecastController`

In the  file, notice the `[Authorize]` attribute applied to the class that indicates that the user needs to be authorized based on the default policy to access the resource. The default authorization policy happens to be configured to use the default authentication scheme, which is set up by `AddIdentityServerJwt` to the policy scheme that was mentioned above, making the `JwtBearerHandler` configured by such helper method the default handler for requests to the app.

### `ApplicationDbContext`

In the  file, notice the same `DbContext` is used in Identity with the exception that it extends `ApiAuthorizationDbContext` (a more derived class from `IdentityDbContext`) to include the schema for IdentityServer.

To gain full control of the database schema, inherit from one of the available Identity `DbContext` classes and configure the context to include the Identity schema by calling `builder.ConfigurePersistedGrantContext(_operationalStoreOptions.Value)` on the `OnModelCreating` method.

### `OidcConfigurationController`

In the  file, notice the endpoint that's provisioned to serve the OIDC parameters that the client needs to use.

### `appsettings.json`

In the `appsettings.json` file of the project root, there's a new `IdentityServer` section that describes the list of configured clients. In the following example, there's a single client. The client name corresponds to the app name and is mapped by convention to the OAuth `ClientId` parameter. The profile indicates the app type being configured. It's used internally to drive conventions that simplify the configuration process for the server. There are several profiles available, as explained in the [Application profiles](#application-profiles) section.

```json
"IdentityServer": {
  "Clients": {
    "angularindividualpreview3final": {
      "Profile": "IdentityServerSPA"
    }
  }
}
```

### `appsettings.Development.json`

In the `appsettings.Development.json` file of the project root, there's an `IdentityServer` section that describes the key used to sign tokens. When deploying to production, a key needs to be provisioned and deployed alongside the app, as explained in the [Deploy to production](#deploy-to-production) section.

```json
"IdentityServer": {
  "Key": {
    "Type": "Development"
  }
}
```

## General description of the Angular app

The authentication and API authorization support in the Angular template resides in its own Angular module in the *ClientApp/src/api-authorization* directory. The module is composed of the following elements:

* 3 components:
  * `login.component.ts`: Handles the app's login flow.
  * `logout.component.ts`: Handles the app's logout flow.
  * `login-menu.component.ts`: A widget that displays one of the following sets of links:
    * User profile management and log out links when the user is authenticated.
    * Registration and log in links when the user isn't authenticated.
* A route safeguard `AuthorizeGuard` that can be added to routes and requires a user to be authenticated before visiting the route.
* An HTTP interceptor `AuthorizeInterceptor` that attaches the access token to outgoing HTTP requests targeting the API when the user is authenticated.
* A service `AuthorizeService` that handles the lower-level details of the authentication process and exposes information about the authenticated user to the rest of the app for consumption.
* An Angular module that defines routes associated with the authentication parts of the app. It exposes the login menu component, the interceptor, the safeguard, and the service for consumption from the rest of the app.

## General description of the React app

The support for authentication and API authorization in the React template resides in the *ClientApp/src/components/api-authorization* directory. It's composed of the following elements:

* 4 components:
  * `Login.js`: Handles the app's login flow.
  * `Logout.js`: Handles the app's logout flow.
  * `LoginMenu.js`: A widget that displays one of the following sets of links:
    * User profile management and log out links when the user is authenticated.
    * Registration and log in links when the user isn't authenticated.
  * `AuthorizeRoute.js`: A route component that requires a user to be authenticated before rendering the component indicated in the `Component` parameter.
* An exported `authService` instance of class `AuthorizeService` that handles the lower-level details of the authentication process and exposes information about the authenticated user to the rest of the app for consumption.

Now that you've seen the main components of the solution, you can take a deeper look at individual scenarios for the app.

## Require authorization on a new API

By default, the system is configured to easily require authorization for new APIs. To do so, create a new controller and add the `[Authorize]` attribute to the controller class or to any action within the controller.

## Customize the API authentication handler

To customize the configuration of the API's JWT handler, configure its [Microsoft.AspNetCore.Builder.JwtBearerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.JwtBearerOptions) instance:

```csharp
services.AddAuthentication()
    .AddIdentityServerJwt();

services.Configure<JwtBearerOptions>(
    IdentityServerJwtConstants.IdentityServerJwtBearerScheme,
    options =>
    {
        ...
    });
```

The API's JWT handler raises events that enable control over the authentication process using `JwtBearerEvents`. To provide support for API authorization, `AddIdentityServerJwt` registers its own event handlers.

To customize the handling of an event, wrap the existing event handler with additional logic as required. For example:

```csharp
services.Configure<JwtBearerOptions>(
    IdentityServerJwtConstants.IdentityServerJwtBearerScheme,
    options =>
    {
        var onTokenValidated = options.Events.OnTokenValidated;       
        
        options.Events.OnTokenValidated = async context =>
        {
            await onTokenValidated(context);
            ...
        }
    });
```

In the preceding code, the `OnTokenValidated` event handler is replaced with a custom implementation. This implementation:

1. Calls the original implementation provided by the API authorization support.
1. Run its own custom logic.

## Protect a client-side route (Angular)

Protecting a client-side route is done by adding the authorize safeguard to the list of safeguards to run when configuring a route. As an example, you can see how the `fetch-data` route is configured within the main app Angular module:

```typescript
RouterModule.forRoot([
  // ...
  { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
])
```

It's important to mention that protecting a route doesn't protect the actual endpoint (which still requires an `[Authorize]` attribute applied to it) but that it only prevents the user from navigating to the given client-side route when it isn't authenticated.

## Authenticate API requests (Angular)

Authenticating requests to APIs hosted alongside the app is done automatically through the use of the HTTP client interceptor defined by the app.

## Protect a client-side route (React)

Protect a client-side route by using the `AuthorizeRoute` component instead of the plain `Route` component. For example, notice how the `fetch-data` route is configured within the `App` component:

```jsx
<AuthorizeRoute path='/fetch-data' component={FetchData} />
```

Protecting a route:

* Doesn't protect the actual endpoint (which still requires an `[Authorize]` attribute applied to it).
* Only prevents the user from navigating to the given client-side route when it isn't authenticated.

## Authenticate API requests (React)

Authenticating requests with React is done by first importing the `authService` instance from the `AuthorizeService`. The access token is retrieved from the `authService` and is attached to the request as shown below. In React components, this work is typically done in the `componentDidMount` lifecycle method or as the result from some user interaction.

### Import the `authService` into a component

```javascript
import authService from './api-authorization/AuthorizeService'
```

### Retrieve and attach the access token to the response

```javascript
async populateWeatherData() {
  const token = await authService.getAccessToken();
  const response = await fetch('api/SampleData/WeatherForecasts', {
    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  this.setState({ forecasts: data, loading: false });
}
```

## Deploy to production

To deploy the app to production, the following resources need to be provisioned:

* A database to store the Identity user accounts and the IdentityServer grants.
* A production certificate to use for signing tokens.
  * There are no specific requirements for this certificate; it can be a self-signed certificate or a certificate provisioned through a CA authority.
  * It can be generated through standard tools like PowerShell or OpenSSL.
  * It can be installed into the certificate store on the target machines or deployed as a *.pfx* file with a strong password.

### Example: Deploy to a non-Azure web hosting provider

In your web hosting panel, create or load your certificate. Then in the app's `appsettings.json` file, modify the `IdentityServer` section to include the key details. For example:

```json
"IdentityServer": {
  "Key": {
    "Type": "Store",
    "StoreName": "WebHosting",
    "StoreLocation": "CurrentUser",
    "Name": "CN=MyApplication"
  }
}
```

In the preceding example:

* `StoreName` represents the name of the certificate store where the certificate is stored. In this case, it points to the web hosting store.
* `StoreLocation` represents where to load the certificate from (`CurrentUser` in this case).
* `Name` corresponds with the distinguished subject for the certificate.

### Example: Deploy to Azure App Service

This section describes deploying the app to Azure App Service using a certificate stored in the certificate store. To modify the app to load a certificate from the certificate store, a Standard tier service plan or better is required when you configure the app in the Azure portal in a later step.

In the app's `appsettings.json` file, modify the `IdentityServer` section to include the key details:

```json
"IdentityServer": {
  "Key": {
    "Type": "Store",
    "StoreName": "My",
    "StoreLocation": "CurrentUser",
    "Name": "CN=MyApplication"
  }
}
```

* The store name represents the name of the certificate store where the certificate is stored. In this case, it points to the personal user store.
* The store location represents where to load the certificate from (`CurrentUser` or `LocalMachine`).
* The name property on certificate corresponds with the distinguished subject for the certificate.

To deploy to Azure App Service, follow the steps in [Deploy the app to Azure](https://learn.microsoft.com/search/?terms=tutorials%2Fpublish-to-azure-webapp-using-vs%23deploy-the-app-to-azure), which explains how to create the necessary Azure resources and deploy the app to production.

After following the preceding instructions, the app is deployed to Azure but isn't yet functional. The certificate used by the app must be configured in the Azure portal. Locate the thumbprint for the certificate and follow the steps described in [Load your certificates](https://learn.microsoft.com/azure/app-service/app-service-web-ssl-cert-load#load-the-certificate-in-code).

While these steps mention SSL, there's a **Private certificates** section in the Azure portal where you can upload the provisioned certificate to use with the app.

After configuring the app and the app's settings in the Azure portal, restart the app in the portal.

## Other configuration options

The support for API authorization builds on top of IdentityServer with a set of conventions, default values, and enhancements to simplify the experience for SPAs. Needless to say, the full power of IdentityServer is available behind the scenes if the ASP.NET Core integrations don't cover your scenario. The ASP.NET Core support is focused on "first-party" apps, where all the apps are created and deployed by our organization. As such, support isn't offered for things like consent or federation. For those scenarios, use IdentityServer and follow their documentation.

### Application profiles

Application profiles are predefined configurations for apps that further define their parameters. At this time, the following profiles are supported:

* `IdentityServerSPA`: Represents a SPA hosted alongside IdentityServer as a single unit.
  * The `redirect_uri` defaults to `/authentication/login-callback`.
  * The `post_logout_redirect_uri` defaults to `/authentication/logout-callback`.
  * The set of scopes includes the `openid`, `profile`, and every scope defined for the APIs in the app.
  * The set of allowed OIDC response types is `id_token token` or each of them individually (`id_token`, `token`).
  * The allowed response mode is `fragment`.
* `SPA`: Represents a SPA that isn't hosted with IdentityServer.
  * The set of scopes includes the `openid`, `profile`, and every scope defined for the APIs in the app.
  * The set of allowed OIDC response types is `id_token token` or each of them individually (`id_token`, `token`).
  * The allowed response mode is `fragment`.
* `IdentityServerJwt`: Represents an API that is hosted alongside with IdentityServer.
  * The app is configured to have a single scope that defaults to the app name.
* `API`: Represents an API that isn't hosted with IdentityServer.
  * The app is configured to have a single scope that defaults to the app name.

### Configuration through `AppSettings`

Configure the apps through the configuration system by adding them to the list of `Clients` or `Resources`.

Configure each client's `redirect_uri` and `post_logout_redirect_uri` property, as shown in the following example:

```json
"IdentityServer": {
  "Clients": {
    "MySPA": {
      "Profile": "SPA",
      "RedirectUri": "https://www.example.com/authentication/login-callback",
      "LogoutUri": "https://www.example.com/authentication/logout-callback"
    }
  }
}
```

When configuring resources, you can configure the scopes for the resource as shown below:

```json
"IdentityServer": {
  "Resources": {
    "MyExternalApi": {
      "Profile": "API",
      "Scopes": "a b c"
    }
  }
}
```

### Configuration through code

You can also configure the clients and resources through code using an overload of `AddApiAuthorization` that takes an action to configure options.

```csharp
AddApiAuthorization<ApplicationUser, ApplicationDbContext>(options =>
{
    options.Clients.AddSPA(
        "My SPA", spa =>
        spa.WithRedirectUri("http://www.example.com/authentication/login-callback")
           .WithLogoutRedirectUri(
               "http://www.example.com/authentication/logout-callback"));

    options.ApiResources.AddApiResource("MyExternalApi", resource =>
        resource.WithScopes("a", "b", "c"));
});
```

## Additional resources

* [spa/angular](../../client-side/spa/angular.md)
* [spa/react](../../client-side/spa/react.md)
* [security/authentication/scaffold-identity](scaffold-identity.md)
