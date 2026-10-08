---
title: Configure ASP.NET Core Identity
ai-usage: ai-assisted
author: AdrienTorris
description: Understand ASP.NET Core Identity default values and learn how to configure Identity properties to use custom values.
monikerRange: '>= aspnetcore-3.1'
ms.author: tdykstra
ms.date: 09/18/2026
uid: security/authentication/identity-configuration
---
# Configure ASP.NET Core Identity

**Applies to: \>= aspnetcore-6.0**


ASP.NET Core Identity uses default values for settings such as password policy, lockout, and cookie configuration. These settings can be overridden at application startup.

## Identity options

The [Microsoft.AspNetCore.Identity.IdentityOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions) class represents the options that can be used to configure the Identity system. [Microsoft.AspNetCore.Identity.IdentityOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions) must be set **after** calling [Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentity%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentity%252A) or [Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionUIExtensions.AddDefaultIdentity%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionUIExtensions.AddDefaultIdentity%252A).

### Claims Identity

[Microsoft.AspNetCore.Identity.IdentityOptions.ClaimsIdentity](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions.ClaimsIdentity) specifies the [Microsoft.AspNetCore.Identity.ClaimsIdentityOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.ClaimsIdentityOptions) with the properties shown in the following table.

| Property | Description | Default |
| --- | --- | :---: |
| [Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.RoleClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.RoleClaimType%252A) | Gets or sets the claim type used for a role claim. | [System.Security.Claims.ClaimTypes.Role](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimTypes.Role) |
| [Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.SecurityStampClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.SecurityStampClaimType%252A) | Gets or sets the claim type used for the security stamp claim. | `AspNet.Identity.SecurityStamp` |
| [Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.UserIdClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.UserIdClaimType%252A) | Gets or sets the claim type used for the user identifier claim. | [System.Security.Claims.ClaimTypes.NameIdentifier](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimTypes.NameIdentifier) |
| [Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.UserNameClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.UserNameClaimType%252A) | Gets or sets the claim type used for the user name claim. | [System.Security.Claims.ClaimTypes.Name](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimTypes.Name) |

### Lockout

Lockout is set in the [PasswordSignInAsync](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SignInManager%25601.PasswordSignInAsync\(System.String%2CSystem.String%2CSystem.Boolean%2CSystem.Boolean\)) method:

[Code example (complete source file; reference: identity-configuration/sample6/RPauth/Areas/Identity/Pages/Account/Login.cshtml.cs?name=snippet\&highlight=13)](../../../_code/aspnetcore/security/authentication/identity-configuration/sample6/RPauth/Areas/Identity/Pages/Account/Login.cshtml.cs.md)

The preceding code is based on the [`Login` Identity template](https://github.com/dotnet/aspnetcore/blob/1dcf7acfacf0fe154adcc23270cb0da11ff44ace/src/Identity/UI/src/Areas/Identity/Pages/V5/Account/Login.cshtml.cs#L131-L132).

Lockout options are set in `Program.cs`:

[Code example (complete source file; reference: identity-configuration/sample6/RPauth/Program.cs?name=snippet_lock\&highlight=17-23)](../../../_code/aspnetcore/security/authentication/identity-configuration/sample6/RPauth/Program.cs.md)

The preceding code sets the [Microsoft.AspNetCore.Identity.IdentityOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions) [Microsoft.AspNetCore.Identity.LockoutOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.LockoutOptions) with default values.

A successful authentication resets the failed access attempts count and resets the clock.

[Microsoft.AspNetCore.Identity.IdentityOptions.Lockout%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions.Lockout%252A) specifies the [Microsoft.AspNetCore.Identity.LockoutOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.LockoutOptions) with the properties shown in the table.

| Property | Description | Default |
| --- | --- | :---: |
| [Microsoft.AspNetCore.Identity.LockoutOptions.AllowedForNewUsers%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.LockoutOptions.AllowedForNewUsers%252A) | Determines if a new user can be locked out. | `true` |
| [Microsoft.AspNetCore.Identity.LockoutOptions.DefaultLockoutTimeSpan%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.LockoutOptions.DefaultLockoutTimeSpan%252A) | The amount of time a user is locked out when a lockout occurs. | 5 minutes |
| [Microsoft.AspNetCore.Identity.LockoutOptions.MaxFailedAccessAttempts%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.LockoutOptions.MaxFailedAccessAttempts%252A) | The number of failed access attempts until a user is locked out, if lockout is enabled. | 5 |

### Password

By default, Identity requires that passwords contain an uppercase character, lowercase character, a digit, and a non-alphanumeric character. Passwords must be at least six characters long.

Passwords are configured with:

* [Microsoft.AspNetCore.Identity.PasswordOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions) in `Program.cs`.
* [`[StringLength]` attributes](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.StringLengthAttribute) of `Password` properties if Identity is [scaffolded into the app](scaffold-identity.md). `InputModel` `Password` properties are found in the following files:
  * `Areas/Identity/Pages/Account/Register.cshtml.cs`
  * `Areas/Identity/Pages/Account/ResetPassword.cshtml.cs`

[Code example (complete source file; reference: identity-configuration/sample6/RPauth/Program.cs?name=snippet_pw\&highlight=17-26)](../../../_code/aspnetcore/security/authentication/identity-configuration/sample6/RPauth/Program.cs.md)

[Microsoft.AspNetCore.Identity.IdentityOptions.Password%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions.Password%252A) specifies the [Microsoft.AspNetCore.Identity.PasswordOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions) with the properties shown in the table.

| Property | Description | Default |
| --- | --- | :---: |
| [Microsoft.AspNetCore.Identity.PasswordOptions.RequireDigit%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions.RequireDigit%252A) | Requires a number between 0-9 in the password. | `true` |
| [Microsoft.AspNetCore.Identity.PasswordOptions.RequiredLength%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions.RequiredLength%252A) | The minimum length of the password. | 6 |
| [Microsoft.AspNetCore.Identity.PasswordOptions.RequireLowercase%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions.RequireLowercase%252A) | Requires a lowercase character in the password. | `true` |
| [Microsoft.AspNetCore.Identity.PasswordOptions.RequireNonAlphanumeric%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions.RequireNonAlphanumeric%252A) | Requires a non-alphanumeric character in the password. | `true` |
| [Microsoft.AspNetCore.Identity.PasswordOptions.RequiredUniqueChars%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions.RequiredUniqueChars%252A) | Only applies to ASP.NET Core 2.0 or later.<br><br> Requires the number of distinct characters in the password. | 1 |
| [Microsoft.AspNetCore.Identity.PasswordOptions.RequireUppercase%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions.RequireUppercase%252A) | Requires an uppercase character in the password. | `true` |

### Sign-in

The following code sets `SignIn` settings (to default values):

[Code example (complete source file; reference: identity-configuration/sample6/RPauth/Program.cs?name=snippet_si)](../../../_code/aspnetcore/security/authentication/identity-configuration/sample6/RPauth/Program.cs.md)

[Microsoft.AspNetCore.Identity.IdentityOptions.SignIn](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions.SignIn) specifies the [Microsoft.AspNetCore.Identity.SignInOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SignInOptions) with the properties shown in the table.

| Property | Description | Default |
| --- | --- | :---: |
| [Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedEmail%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedEmail%252A) | Requires a confirmed email to sign in. | `false` |
| [Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedPhoneNumber%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedPhoneNumber%252A) | Requires a confirmed phone number to sign in. | `false` |

### Tokens

[Microsoft.AspNetCore.Identity.IdentityOptions.Tokens%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions.Tokens%252A) specifies the [Microsoft.AspNetCore.Identity.TokenOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions) with the properties shown in the table.

| Property | Description |
| --- | --- |
| [Microsoft.AspNetCore.Identity.TokenOptions.AuthenticatorTokenProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions.AuthenticatorTokenProvider%252A) | Gets or sets the `AuthenticatorTokenProvider` used to validate two-factor sign-ins with an authenticator. |
| [Microsoft.AspNetCore.Identity.TokenOptions.ChangeEmailTokenProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions.ChangeEmailTokenProvider%252A) | Gets or sets the `ChangeEmailTokenProvider` used to generate tokens used in email change confirmation emails. |
| [Microsoft.AspNetCore.Identity.TokenOptions.ChangePhoneNumberTokenProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions.ChangePhoneNumberTokenProvider%252A) | Gets or sets the `ChangePhoneNumberTokenProvider` used to generate tokens used when changing phone numbers. |
| [Microsoft.AspNetCore.Identity.TokenOptions.EmailConfirmationTokenProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions.EmailConfirmationTokenProvider%252A) | Gets or sets the token provider used to generate tokens used in account confirmation emails. |
| [Microsoft.AspNetCore.Identity.TokenOptions.PasswordResetTokenProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions.PasswordResetTokenProvider%252A) | Gets or sets the [Microsoft.AspNetCore.Identity.IUserTwoFactorTokenProvider%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserTwoFactorTokenProvider%25601) used to generate tokens used in password reset emails. |
| [Microsoft.AspNetCore.Identity.TokenOptions.ProviderMap%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions.ProviderMap%252A) | Used to construct a [User Token Provider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenProviderDescriptor) with the key used as the provider's name. |

### User

[Code example (complete source file; reference: identity-configuration/sample6/RPauth/Program.cs?name=snippet_user)](../../../_code/aspnetcore/security/authentication/identity-configuration/sample6/RPauth/Program.cs.md)

[Microsoft.AspNetCore.Identity.IdentityOptions.User%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions.User%252A) specifies the [Microsoft.AspNetCore.Identity.UserOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.UserOptions) with the properties shown in the table.

| Property | Description | Default |
| --- | --- | :---: |
| [Microsoft.AspNetCore.Identity.UserOptions.AllowedUserNameCharacters%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.UserOptions.AllowedUserNameCharacters%252A) | Allowed characters in the username. | abcdefghijklmnopqrstuvwxyz<br>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>0123456789<br>-.\_@+ |
| [Microsoft.AspNetCore.Identity.UserOptions.RequireUniqueEmail%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.UserOptions.RequireUniqueEmail%252A) | Requires each user to have a unique email. | `false` |

<a name="cs6"></a>

### Cookie settings

Configure the app's cookie in `Program.cs`. [ConfigureApplicationCookie](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.ConfigureApplicationCookie\(Microsoft.Extensions.DependencyInjection.IServiceCollection%2CSystem.Action%7BMicrosoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions%7D\)) must be called **after** calling `AddIdentityCore`, `AddIdentity`, or `AddDefaultIdentity`.

[Code example (complete source file; reference: identity-configuration/sample6/RPauth/Program.cs?name=snippet_cookie)](../../../_code/aspnetcore/security/authentication/identity-configuration/sample6/RPauth/Program.cs.md)

For more information, see [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions).

## Password Hasher options

[Microsoft.AspNetCore.Identity.PasswordHasherOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherOptions) gets and sets options for password hashing.

| Option | Description |
| --- | --- |
| [Microsoft.AspNetCore.Identity.PasswordHasherOptions.CompatibilityMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherOptions.CompatibilityMode) | The compatibility mode used when hashing new passwords. Defaults to [Microsoft.AspNetCore.Identity.PasswordHasherCompatibilityMode.IdentityV3](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherCompatibilityMode.IdentityV3). The first byte of a hashed password, called a *format marker*, specifies the version of the hashing algorithm used to hash the password. When verifying a password against a hash, the [Microsoft.AspNetCore.Identity.PasswordHasher%601.VerifyHashedPassword%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasher%25601.VerifyHashedPassword%252A) method selects the correct algorithm based on the first byte. A client is able to authenticate regardless of which version of the algorithm was used to hash the password. Setting the compatibility mode affects the hashing of *new passwords*. |
| [Microsoft.AspNetCore.Identity.PasswordHasherOptions.IterationCount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherOptions.IterationCount) | The number of iterations used when hashing passwords using PBKDF2. This value is only used when the [Microsoft.AspNetCore.Identity.PasswordHasherOptions.CompatibilityMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherOptions.CompatibilityMode) is set to [Microsoft.AspNetCore.Identity.PasswordHasherCompatibilityMode.IdentityV3](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherCompatibilityMode.IdentityV3). The value must be a positive integer and defaults to `100000`. |

In the following example, the [Microsoft.AspNetCore.Identity.PasswordHasherOptions.IterationCount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherOptions.IterationCount) is set to `12000` in `Program.cs`:

```csharp
// using Microsoft.AspNetCore.Identity;

builder.Services.Configure<PasswordHasherOptions>(option =>
{
    option.IterationCount = 12000;
});
```

## Globally require all users to be authenticated

For guidance, see [Require global user authentication](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23require-global-user-authentication).

<a name="iss6"></a>

## ISecurityStampValidator and SignOut everywhere

Apps need to react to events involving security sensitive actions by regenerating the users [System.Security.Claims.ClaimsPrincipal](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimsPrincipal). For example, the `ClaimsPrincipal` should be regenerated when joining a role, changing the password, or other security sensitive events. Identity uses the [Microsoft.AspNetCore.Identity.ISecurityStampValidator](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.ISecurityStampValidator) interface to regenerate the `ClaimsPrincipal`.  The default implementation of Identity registers a [SecurityStampValidator](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.identity.securitystampvalidator) with the main [application cookie](#cs6) and the two-factor cookie. The validator hooks into the [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents.OnValidatePrincipal](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents.OnValidatePrincipal) event of each cookie to call into Identity to verify that the user's security stamp claim is unchanged from what's stored in the cookie. The validator calls in at regular intervals. The call interval is a tradeoff between hitting the datastore too frequently and not often enough. Checking with a long interval results in stale claims. Call `userManager.UpdateSecurityStampAsync(user)`to force existing cookies to be invalided the next time they are checked. Most of the Identity UI account and manage pages call `userManager.UpdateSecurityStampAsync(user)` after changing the password or adding a login. Apps can call `userManager.UpdateSecurityStampAsync(user)` to implement a sign out everywhere action.

Changing the validation interval is shown in the following highlighted code:

[language="csharp" source="\~/security/authentication/identity-configuration/Program.cs" highlight="17-19"::: (complete source file; reference: \~/security/authentication/identity-configuration/Program.cs)](../../../_code/aspnetcore/security/authentication/identity-configuration/Program.cs.md)



**Applies to: < aspnetcore-6.0**

ASP.NET Core Identity uses default values for settings such as password policy, lockout, and cookie configuration. These settings can be overridden in the `Startup` class.

## Identity options

The [Microsoft.AspNetCore.Identity.IdentityOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions) class represents the options that can be used to configure the Identity system. `IdentityOptions` must be set **after** calling `AddIdentity` or `AddDefaultIdentity`.

### Claims Identity

[Microsoft.AspNetCore.Identity.IdentityOptions.ClaimsIdentity](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions.ClaimsIdentity) specifies the [Microsoft.AspNetCore.Identity.ClaimsIdentityOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.ClaimsIdentityOptions) with the properties shown in the following table.

| Property | Description | Default |
| --- | --- | :---: |
| [Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.RoleClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.RoleClaimType%252A) | Gets or sets the claim type used for a role claim. | [System.Security.Claims.ClaimTypes.Role](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimTypes.Role) |
| [Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.SecurityStampClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.SecurityStampClaimType%252A) | Gets or sets the claim type used for the security stamp claim. | `AspNet.Identity.SecurityStamp` |
| [Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.UserIdClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.UserIdClaimType%252A) | Gets or sets the claim type used for the user identifier claim. | [System.Security.Claims.ClaimTypes.NameIdentifier](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimTypes.NameIdentifier) |
| [Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.UserNameClaimType%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.UserNameClaimType%252A) | Gets or sets the claim type used for the user name claim. | [System.Security.Claims.ClaimTypes.Name](https://learn.microsoft.com/search/?terms=System.Security.Claims.ClaimTypes.Name) |

### Lockout

Lockout is set in the [PasswordSignInAsync](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SignInManager%25601.PasswordSignInAsync\(System.String%2CSystem.String%2CSystem.Boolean%2CSystem.Boolean\)) method:

[Code example (complete source file; reference: identity-configuration/sample/Areas/Identity/Pages/Account/Login.cshtml.cs?name=snippet\&highlight=9)](../../../_code/aspnetcore/security/authentication/identity-configuration/sample/Areas/Identity/Pages/Account/Login.cshtml.cs.md)

The preceding code is based on the `Login` Identity template. 

Lockout options are set in `StartUp.ConfigureServices`:

[Code example (complete source file; reference: identity-configuration/sample/Startup.cs?name=snippet_lock)](../../../_code/aspnetcore/security/authentication/identity-configuration/sample/Startup.cs.md)

The preceding code sets the [Microsoft.AspNetCore.Identity.IdentityOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions) [Microsoft.AspNetCore.Identity.LockoutOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.LockoutOptions) with default values.

A successful authentication resets the failed access attempts count and resets the clock.

[Microsoft.AspNetCore.Identity.IdentityOptions.Lockout%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions.Lockout%252A) specifies the [Microsoft.AspNetCore.Identity.LockoutOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.LockoutOptions) with the properties shown in the table.

| Property | Description | Default |
| --- | --- | :---: |
| [Microsoft.AspNetCore.Identity.LockoutOptions.AllowedForNewUsers%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.LockoutOptions.AllowedForNewUsers%252A) | Determines if a new user can be locked out. | `true` |
| [Microsoft.AspNetCore.Identity.LockoutOptions.DefaultLockoutTimeSpan%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.LockoutOptions.DefaultLockoutTimeSpan%252A) | The amount of time a user is locked out when a lockout occurs. | 5 minutes |
| [Microsoft.AspNetCore.Identity.LockoutOptions.MaxFailedAccessAttempts%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.LockoutOptions.MaxFailedAccessAttempts%252A) | The number of failed access attempts until a user is locked out, if lockout is enabled. | 5 |

### Password

By default, Identity requires that passwords contain an uppercase character, lowercase character, a digit, and a non-alphanumeric character. Passwords must be at least six characters long.

Passwords are configured with:

* [Microsoft.AspNetCore.Identity.PasswordOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions) in `Startup.ConfigureServices`.
* [`[StringLength]` attributes](https://learn.microsoft.com/search/?terms=System.ComponentModel.DataAnnotations.StringLengthAttribute) of `Password` properties if Identity is [scaffolded into the app](scaffold-identity.md). `InputModel` `Password` properties are found in the following files:
  * `Areas/Identity/Pages/Account/Register.cshtml.cs`
  * `Areas/Identity/Pages/Account/ResetPassword.cshtml.cs`

[Code example (complete source file; reference: identity-configuration/sample/Startup.cs?name=snippet_pw)](../../../_code/aspnetcore/security/authentication/identity-configuration/sample/Startup.cs.md)

[Microsoft.AspNetCore.Identity.IdentityOptions.Password%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions.Password%252A) specifies the [Microsoft.AspNetCore.Identity.PasswordOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions) with the properties shown in the table.

| Property | Description | Default |
| --- | --- | :---: |
| [Microsoft.AspNetCore.Identity.PasswordOptions.RequireDigit%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions.RequireDigit%252A) | Requires a number between 0-9 in the password. | `true` |
| [Microsoft.AspNetCore.Identity.PasswordOptions.RequiredLength%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions.RequiredLength%252A) | The minimum length of the password. | 6 |
| [Microsoft.AspNetCore.Identity.PasswordOptions.RequireLowercase%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions.RequireLowercase%252A) | Requires a lowercase character in the password. | `true` |
| [Microsoft.AspNetCore.Identity.PasswordOptions.RequireNonAlphanumeric%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions.RequireNonAlphanumeric%252A) | Requires a non-alphanumeric character in the password. | `true` |
| [Microsoft.AspNetCore.Identity.PasswordOptions.RequiredUniqueChars%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions.RequiredUniqueChars%252A) | Only applies to ASP.NET Core 2.0 or later.<br><br> Requires the number of distinct characters in the password. | 1 |
| [Microsoft.AspNetCore.Identity.PasswordOptions.RequireUppercase%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordOptions.RequireUppercase%252A) | Requires an uppercase character in the password. | `true` |

### Sign-in

The following code sets `SignIn` settings (to default values):

[Code example (complete source file; reference: identity-configuration/sample/Startup.cs?name=snippet_si)](../../../_code/aspnetcore/security/authentication/identity-configuration/sample/Startup.cs.md)

[Microsoft.AspNetCore.Identity.IdentityOptions.SignIn](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions.SignIn) specifies the [Microsoft.AspNetCore.Identity.SignInOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SignInOptions) with the properties shown in the table.

| Property | Description | Default |
| --- | --- | :---: |
| [Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedEmail%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedEmail%252A) | Requires a confirmed email to sign in. | `false` |
| [Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedPhoneNumber%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedPhoneNumber%252A) | Requires a confirmed phone number to sign in. | `false` |

### Tokens

[Microsoft.AspNetCore.Identity.IdentityOptions.Tokens%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions.Tokens%252A) specifies the [Microsoft.AspNetCore.Identity.TokenOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions) with the properties shown in the table.

| Property | Description |
| --- | --- |
| [Microsoft.AspNetCore.Identity.TokenOptions.AuthenticatorTokenProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions.AuthenticatorTokenProvider%252A) | Gets or sets the `AuthenticatorTokenProvider` used to validate two-factor sign-ins with an authenticator. |
| [Microsoft.AspNetCore.Identity.TokenOptions.ChangeEmailTokenProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions.ChangeEmailTokenProvider%252A) | Gets or sets the `ChangeEmailTokenProvider` used to generate tokens used in email change confirmation emails. |
| [Microsoft.AspNetCore.Identity.TokenOptions.ChangePhoneNumberTokenProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions.ChangePhoneNumberTokenProvider%252A) | Gets or sets the `ChangePhoneNumberTokenProvider` used to generate tokens used when changing phone numbers. |
| [Microsoft.AspNetCore.Identity.TokenOptions.EmailConfirmationTokenProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions.EmailConfirmationTokenProvider%252A) | Gets or sets the token provider used to generate tokens used in account confirmation emails. |
| [Microsoft.AspNetCore.Identity.TokenOptions.PasswordResetTokenProvider%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions.PasswordResetTokenProvider%252A) | Gets or sets the [Microsoft.AspNetCore.Identity.IUserTwoFactorTokenProvider%601](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IUserTwoFactorTokenProvider%25601) used to generate tokens used in password reset emails. |
| [Microsoft.AspNetCore.Identity.TokenOptions.ProviderMap%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenOptions.ProviderMap%252A) | Used to construct a [User Token Provider](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.TokenProviderDescriptor) with the key used as the provider's name. |

### User

[Code example (complete source file; reference: identity-configuration/sample/Startup.cs?name=snippet_user)](../../../_code/aspnetcore/security/authentication/identity-configuration/sample/Startup.cs.md)

[Microsoft.AspNetCore.Identity.IdentityOptions.User%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions.User%252A) specifies the [Microsoft.AspNetCore.Identity.UserOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.UserOptions) with the properties shown in the table.

| Property | Description | Default |
| --- | --- | :---: |
| [Microsoft.AspNetCore.Identity.UserOptions.AllowedUserNameCharacters%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.UserOptions.AllowedUserNameCharacters%252A) | Allowed characters in the username. | abcdefghijklmnopqrstuvwxyz<br>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>0123456789<br>-.\_@+ |
| [Microsoft.AspNetCore.Identity.UserOptions.RequireUniqueEmail%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.UserOptions.RequireUniqueEmail%252A) | Requires each user to have a unique email. | `false` |

### Cookie settings

Configure the app's cookie in `Startup.ConfigureServices`. [ConfigureApplicationCookie](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.ConfigureApplicationCookie\(Microsoft.Extensions.DependencyInjection.IServiceCollection%2CSystem.Action%7BMicrosoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions%7D\)) must be called **after** calling `AddIdentityCore`, `AddIdentity`, or `AddDefaultIdentity`.

[Code example (complete source file; reference: identity-configuration/sample/Startup.cs?name=snippet_cookie)](../../../_code/aspnetcore/security/authentication/identity-configuration/sample/Startup.cs.md)

For more information, see [Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions).

## Password Hasher options

[Microsoft.AspNetCore.Identity.PasswordHasherOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherOptions) gets and sets options for password hashing.

| Option | Description |
| --- | --- |
| [Microsoft.AspNetCore.Identity.PasswordHasherOptions.CompatibilityMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherOptions.CompatibilityMode) | The compatibility mode used when hashing new passwords. Defaults to [Microsoft.AspNetCore.Identity.PasswordHasherCompatibilityMode.IdentityV3](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherCompatibilityMode.IdentityV3). The first byte of a hashed password, called a *format marker*, specifies the version of the hashing algorithm used to hash the password. When verifying a password against a hash, the [Microsoft.AspNetCore.Identity.PasswordHasher%601.VerifyHashedPassword%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasher%25601.VerifyHashedPassword%252A) method selects the correct algorithm based on the first byte. A client is able to authenticate regardless of which version of the algorithm was used to hash the password. Setting the compatibility mode affects the hashing of *new passwords*. |
| [Microsoft.AspNetCore.Identity.PasswordHasherOptions.IterationCount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherOptions.IterationCount) | The number of iterations used when hashing passwords using PBKDF2. This value is only used when the [Microsoft.AspNetCore.Identity.PasswordHasherOptions.CompatibilityMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherOptions.CompatibilityMode) is set to [Microsoft.AspNetCore.Identity.PasswordHasherCompatibilityMode.IdentityV3](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherCompatibilityMode.IdentityV3). The value must be a positive integer and defaults to `10000`. |

In the following example, the [Microsoft.AspNetCore.Identity.PasswordHasherOptions.IterationCount](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.PasswordHasherOptions.IterationCount) is set to `12000` in `Startup.ConfigureServices`:

```csharp
// using Microsoft.AspNetCore.Identity;

services.Configure<PasswordHasherOptions>(option =>
{
    option.IterationCount = 12000;
});
```

## Globally require all users to be authenticated

For guidance, see [Require global user authentication](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23require-global-user-authentication).
