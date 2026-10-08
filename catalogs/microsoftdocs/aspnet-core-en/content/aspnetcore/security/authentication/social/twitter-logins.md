---
title: Twitter external sign-in setup with ASP.NET Core
author: wadepickett
description: This tutorial demonstrates the integration of Twitter account user authentication into an existing ASP.NET Core app.
ms.author: wpickett
ms.date: 12/08/2021
monikerRange: '>= aspnetcore-3.0'
uid: security/authentication/twitter-logins
---
# Twitter external sign-in setup with ASP.NET Core

By [Valeriy Novytskyy](https://github.com/01binary) and [Rick Anderson](https://twitter.com/RickAndMSFT)

This sample shows how to enable users to [sign in with their Twitter account](https://dev.twitter.com/web/sign-in/desktop-browser) using a sample ASP.NET Core project created on the [previous page](index.md).

> **Note:**
> The Microsoft.AspNetCore.Authentication.Twitter package described below uses the OAuth 1.0 APIs provided by Twitter. Twitter has since added OAuth 2.0 APIs with a different set of functionality. The [OpenIddict](https://documentation.openiddict.com/integrations/web-providers) and [AspNet.Security.OAuth.Twitter](https://www.nuget.org/packages/AspNet.Security.OAuth.Twitter/) packages are community implementations that use the new OAuth 2.0 APIs.

## Create the app in Twitter

* Add the [Microsoft.AspNetCore.Authentication.Twitter](https://www.nuget.org/packages/Microsoft.AspNetCore.Authentication.Twitter) NuGet package to the project.

* Navigate to [twitter developer portal Dashboard](https://developer.twitter.com/en/portal/dashboard) and sign in. If you don't already have a Twitter account, use the **[Sign up now](https://twitter.com/signup)** link to create one.

* If you don't have a project, create one.

* Select **+ Add app**. Fill out the **App name** then record the generated API Key, API Key Secret and Bearer Token. These will be needed
later.

* In the **App Settings** page, select **Edit** in the **Authentication settings** section, then:
  * Enable 3-legged OAuth
  * Request email address from users
  * Fill out the required fields and select **Save**

  > **Note:**
  > Microsoft.AspNetCore.Identity requires users to have an email address by default. For Callback URLs during development, use `https://localhost:{PORT}/signin-twitter`, where the `{PORT}` placeholder is the app's port.

  > **Note:**
  > The URI segment `/signin-twitter` is set as the default callback of the Twitter authentication provider. You can change the default callback URI while configuring the Twitter authentication middleware via the inherited [Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.CallbackPath%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.CallbackPath%252A) property of the [Microsoft.AspNetCore.Authentication.Twitter.TwitterOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.Twitter.TwitterOptions) class.


## Store the Twitter consumer API key and secret

Store sensitive settings such as the Twitter consumer API key and secret with [Secret Manager](../../app-secrets.md). For this sample, use the following steps:

1. Initialize the project for secret storage per the instructions at [Enable secret storage](https://learn.microsoft.com/search/?terms=security%2Fapp-secrets%23enable-secret-storage).
1. Store the sensitive settings in the local secret store with the secrets keys `Authentication:Twitter:ConsumerKey` and `Authentication:Twitter:ConsumerSecret`:

    ```dotnetcli
    dotnet user-secrets set "Authentication:Twitter:ConsumerAPIKey" "<consumer-api-key>"
    dotnet user-secrets set "Authentication:Twitter:ConsumerSecret" "<consumer-secret>"
    ```

The colon (`:`) separator doesn't work with environment variable hierarchical keys on all platforms. For example, [Bash](https://linuxhint.com/bash-environment-variables/) doesn't support colon (`:`) as a separator. All platforms support the double underscore (`__`) syntax and automatically replace it with a colon (`:`).


These tokens can be found on the **Keys and Access Tokens** tab after creating a new Twitter application:

## Configure Twitter Authentication

**Applies to: < aspnetcore-6.0**

Add the Authentication service to the `Startup.ConfigureServices`:

[Code example (complete source file; reference: \~/security/authentication/social/social-code/3.x/StartupTwitter3x.cs?name=snippet\&highlight=10-15)](../../../../_code/aspnetcore/security/authentication/social/social-code/3.x/StartupTwitter3x.cs.md)



**Applies to: \>= aspnetcore-6.0**

[Code example (complete source file; reference: \~/security/authentication/social/social-code/6.x/ProgramTwitter.cs)](../../../../_code/aspnetcore/security/authentication/social/social-code/6.x/ProgramTwitter.cs.md)



<!--Don't update this for 2.2, use the 2.2 version -->
The [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.String)](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection%2CSystem.String)) overload sets the [Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultScheme%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultScheme%252A) property. The [Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.Action{Microsoft.AspNetCore.Authentication.AuthenticationOptions})](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection%2CSystem.Action%7BMicrosoft.AspNetCore.Authentication.AuthenticationOptions%7D)) overload allows configuring authentication options, which can be used to set up default authentication schemes for different purposes. Subsequent calls to `AddAuthentication` override previously configured [Microsoft.AspNetCore.Builder.AuthenticationOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthenticationOptions) properties.

[Microsoft.AspNetCore.Authentication.AuthenticationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authentication.AuthenticationBuilder) extension methods that register an authentication handler may only be called once per authentication scheme. Overloads exist that allow configuring the scheme properties, scheme name, and display name.


For more information on configuration options supported by Twitter authentication, see the [Microsoft.AspNetCore.Builder.TwitterOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.TwitterOptions) API reference. This can be used to request different information about the user.

## Sign in with Twitter

Run the app and select **Log in**. An option to sign in with Twitter appears:

Selecting **Twitter** redirects to Twitter for authentication:

After entering your Twitter credentials, you are redirected back to the web site where you can set your email.

You are now logged in using your Twitter credentials:

## Forward request information with a proxy or load balancer

If the app is deployed behind a proxy server or load balancer, some of the original request information might be forwarded to the app in request headers. This information usually includes the secure request scheme (`https`), host, and client IP address. Apps don't automatically read these request headers to discover and use the original request information.

The scheme is used in link generation that affects the authentication flow with external providers. Losing the secure scheme (`https`) results in the app generating incorrect insecure redirect URLs.

Use forwarded headers middleware to make the original request information available to the app for request processing.

For more information, see [host-and-deploy/proxy-load-balancer](../../../host-and-deploy/proxy-load-balancer.md).


<!-- 
### React to cancel Authorize External sign-in
Twitter doesn't support AccessDeniedPath
Rather in the twitter setup, you can provide an External sign-in homepage. The external sign-in homepage doesn't support localhost. Tested with https://cors3.azurewebsites.net/ and that works.
-->

## Troubleshooting

* **ASP.NET Core 2.x only:** If Identity isn't configured by calling `services.AddIdentity` in `ConfigureServices`, attempting to authenticate will result in *ArgumentException: The 'SignInScheme' option must be provided*. The project template used in this sample ensures Identity is configured.
* If the site database has not been created by applying the initial migration, you will get *A database operation failed while processing the request* error. Tap **Apply Migrations** to create the database and refresh to continue past the error.

## Next steps

* This article showed how you can authenticate with Twitter. You can follow a similar approach to authenticate with other providers listed on the [previous page](index.md).

* Once you publish your web site to Azure web app, you should reset the `ConsumerSecret` in the Twitter developer portal.

* Set the `Authentication:Twitter:ConsumerKey` and `Authentication:Twitter:ConsumerSecret` as application settings in the Azure portal. The configuration system is set up to read keys from environment variables.

## Additional resources

[Multiple authentication providers](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fsocial%2Findex%23multiple-authentication-providers)
