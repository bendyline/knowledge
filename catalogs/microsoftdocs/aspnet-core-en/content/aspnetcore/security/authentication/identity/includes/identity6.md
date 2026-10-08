**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT)

ASP.NET Core Identity:

* Is an API that supports user interface (UI) login functionality.
* Manages users, passwords, profile data, roles, claims, tokens, email confirmation, and more.

Users can create an account with the login information stored in Identity or they can use an external login provider. Supported external login providers include [Facebook, Google, Microsoft Account, and Twitter](../../social/index.md).

For information on how to require authentication for all app users, see [Require global user authentication](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23require-global-user-authentication).

The [Identity source code](https://github.com/dotnet/AspNetCore/tree/main/src/Identity) is available on GitHub. [Scaffold Identity](../../scaffold-identity.md) and view the generated files to review the template interaction with Identity.

Identity is typically configured using a SQL Server database to store user names, passwords, and profile data. Alternatively, another persistent store can be used, for example, Azure Table Storage.

In this topic, you learn how to use Identity to register, log in, and log out a user. Note: the templates treat username and email as the same for users. For more detailed instructions about creating apps that use Identity, see [Next Steps](#next).

ASP.NET Core Identity isn't related to the [Microsoft identity platform](https://learn.microsoft.com/azure/active-directory/develop/). Microsoft identity platform is:

* An evolution of the Azure Active Directory (Azure AD) developer platform.
* An alternative identity solution for authentication and authorization in ASP.NET Core apps.

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, use one of the following:

* [Microsoft Entra ID](https://learn.microsoft.com/azure/api-management/api-management-howto-protect-backend-with-aad)
* [Duende Identity Server](https://docs.duendesoftware.com)

Duende Identity Server is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende Identity Server enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

> **Important:**
> [Duende Software](https://duendesoftware.com/) might require you to pay a license fee for production use of Duende Identity Server. For more information, see [migration/50-to-60#project-templates-use-duende-identity-server](https://learn.microsoft.com/search/?terms=migration%2F50-to-60%23project-templates-use-duende-identity-server).

For more information, see the [Duende Identity Server documentation (Duende Software website)](https://docs.duendesoftware.com).


[View or download the sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/authentication/identity/sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

<a name="adi"></a>

## Create a Web app with authentication

Create an ASP.NET Core Web Application project with Individual User Accounts.

# [Visual Studio](#tab/visual-studio)

* Select the **ASP.NET Core Web App** template. Name the project **WebApp1** to have the same namespace as the project download. Click **OK**.
* In the **Authentication type** input,  select  **Individual User Accounts**.

# [.NET CLI](#tab/net-cli)

```dotnetcli
dotnet new webapp --auth Individual -o WebApp1
```

The preceding command creates a Razor web app using SQLite. To create the web app with LocalDB, run the following command:

```dotnetcli
dotnet new webapp --auth Individual -uld -o WebApp1
```

---

The generated project provides [ASP.NET Core Identity](../../identity.md) as a [Razor class library](../../../../razor-pages/ui-class.md). The Identity Razor class library exposes endpoints with the `Identity` area. For example:

* /Identity/Account/Login
* /Identity/Account/Logout
* /Identity/Account/Manage

### Apply migrations

Apply the migrations to initialize the database.

# [Visual Studio](#tab/visual-studio)

Run the following command in the Package Manager Console (PMC):

`Update-Database`

# [.NET CLI](#tab/net-cli)

Migrations are not necessary at this step when using SQLite.

If `dotnet ef` has not been installed, install it as a global tool:

```dotnetcli
  dotnet tool install --global dotnet-ef
```

For more information on the CLI for EF Core, see [EF Core tools reference for the .NET CLI](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet).

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.



For LocalDB, run the following command:

```dotnetcli
dotnet ef database update
```

---

### Test Register and Login

Run the app and register a user. Depending on your screen size, you might need to select the navigation toggle button to see the **Register** and **Login** links.

### View the Identity database

# [Visual Studio](#tab/visual-studio) 

* From the **View** menu, select **SQL Server Object Explorer** (SSOX).
* Navigate to **(localdb)MSSQLLocalDB(SQL Server 13)**. Right-click on **dbo.AspNetUsers** > **View Data**:

Contextual menu on AspNetUsers table in SQL Server Object Explorer

# [.NET CLI](#tab/net-cli)

There are many third party tools you can download to manage and view a SQLite database, for example [DB Browser for SQLite](https://sqlitebrowser.org/).

---

<a name="pw6"></a>

### Configure Identity services

Services are added in `Program.cs`. The typical pattern is to call methods in the following order:

1. `Add{Service}`
1. `builder.Services.Configure{Service}`

[language="csharp" source="../sample/WebApp6x/Program.cs" id="snippet\_"::: (complete source file; reference: ../sample/WebApp6x/Program.cs)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp6x/Program.cs.md)

The preceding code configures Identity with default option values. Services are made available to the app through [dependency injection](../../../../fundamentals/dependency-injection.md).

Identity is enabled by calling [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A). `UseAuthentication` adds authentication [middleware](../../../../fundamentals/middleware/index.md) to the request pipeline.

The template-generated app doesn't use [authorization](../../../authorization/secure-data.md). `app.UseAuthorization` is included to ensure it's added in the correct order should the app add authorization. `UseRouting`, `UseAuthentication`, and `UseAuthorization` must be called in the order shown in the preceding code.

For more information on `IdentityOptions`, see [Microsoft.AspNetCore.Identity.IdentityOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions) and [Application Startup](../../../../fundamentals/startup.md).

<!-- Start here for .NET 6 -->

## Scaffold Register, Login, LogOut, and RegisterConfirmation

# [Visual Studio](#tab/visual-studio)

Add the `Register`, `Login`, `LogOut`, and `RegisterConfirmation` files. Follow the [Scaffold identity into a Razor project with authorization](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fscaffold-identity%23scaffold-identity-into-a-razor-project-with-authorization) instructions to generate the code shown in this section.

# [.NET CLI](#tab/net-cli)

If you created the project with name **WebApp1**, and you're not using SQLite, run the following commands. Otherwise, use the correct namespace for the `ApplicationDbContext`:

```dotnetcli
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet aspnet-codegenerator identity -dc WebApp1.Data.ApplicationDbContext --files "Account.Register;Account.Login;Account.Logout;Account.RegisterConfirmation"
```

When using SQLite, append `--useSqLite` or `-sqlite`:

```dotnetcli
dotnet aspnet-codegenerator identity -dc WebApp1.Data.ApplicationDbContext --files "Account.Register;Account.Login;Account.Logout;Account.RegisterConfirmation" --useSqLite
```

PowerShell uses semicolon as a command separator. When using PowerShell, escape the semicolons in the file list or put the file list in double quotes, as the preceding example shows.

For more information on scaffolding Identity, see [Scaffold identity into a Razor project with authorization](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fscaffold-identity%23scaffold-identity-into-a-razor-project-with-authorization).

---

### Examine Register

When a user clicks the **Register** button on the `Register` page, the `RegisterModel.OnPostAsync` action is invoked. The user is created by [Microsoft.AspNetCore.Identity.UserManager%601.CreateAsync(%600)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.UserManager%25601.CreateAsync(%25600)) on the `_userManager` object:

[language="csharp" source="../sample/WebApp3/Areas/Identity/Pages/Account/Register.cshtml.cs" id="snippet" highlight="9"::: (complete source file; reference: ../sample/WebApp3/Areas/Identity/Pages/Account/Register.cshtml.cs)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp3/Areas/Identity/Pages/Account/Register.cshtml.cs.md)

<!-- .NET 5 fixes this, see
https://github.com/dotnet/aspnetcore/blob/main/src/Identity/UI/src/Areas/Identity/Pages/V4/Account/RegisterConfirmation.cshtml.cs#L74-L77
-->
<a name="ddav"></a>
### Disable default account verification

With the default templates, the user is redirected to the `Account.RegisterConfirmation` where they can select a link to have the account confirmed. The default `Account.RegisterConfirmation` is used ***only*** for testing, automatic account verification should be disabled in a production app.

To require a confirmed account and prevent immediate login at registration, set `DisplayConfirmAccountLink = false` in `/Areas/Identity/Pages/Account/RegisterConfirmation.cshtml.cs`:

[Code reference unavailable in this source snapshot: ../../../../includes/~/security/authentication/identity/sample/WebApp3/Areas/Identity/Pages/Account/RegisterConfirmation.cshtml.cs?name=snippet\\&highlight=34](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authentication/identity/includes/identity6.md)


### Log in

The Login form is displayed when:

* The **Log in** link is selected.
* A user attempts to access a restricted page that they aren't authorized to access **or** when they haven't been authenticated by the system.

When the form on the Login page is submitted, the `OnPostAsync` action is called. `PasswordSignInAsync` is called on the `_signInManager` object.

[language="csharp" source="../sample/WebApp3/Areas/Identity/Pages/Account/Login.cshtml.cs" id="snippet" highlight="10-11"::: (complete source file; reference: ../sample/WebApp3/Areas/Identity/Pages/Account/Login.cshtml.cs)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp3/Areas/Identity/Pages/Account/Login.cshtml.cs.md)

For information on how to make authorization decisions, see [security/authorization/introduction](../../../authorization/introduction.md).

### Log out

The **Log out** link invokes the `LogoutModel.OnPost` action. 

[language="csharp" source="../sample/WebApp3/Areas/Identity/Pages/Account/Logout.cshtml.cs" highlight="36"::: (complete source file; reference: ../sample/WebApp3/Areas/Identity/Pages/Account/Logout.cshtml.cs)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp3/Areas/Identity/Pages/Account/Logout.cshtml.cs.md)

In the preceding code, the code `return RedirectToPage();` needs to be a redirect so that the browser performs a new request and the identity for the user gets updated.

[Microsoft.AspNetCore.Identity.SignInManager%601.SignOutAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SignInManager%25601.SignOutAsync%252A) clears the user's claims stored in a cookie.

Post is specified in the `Pages/Shared/_LoginPartial.cshtml`:

[language="cshtml" source="../sample/WebApp3/Pages/Shared/\_LoginPartial.cshtml" highlight="15"::: (complete source file; reference: ../sample/WebApp3/Pages/Shared/\_LoginPartial.cshtml)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp3/Pages/Shared/_LoginPartial.cshtml.md)

## Test Identity

The default web project templates allow anonymous access to the home pages. To test Identity, add [`[Authorize]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute):

[language="csharp" source="../sample/WebApp3/Pages/Privacy.cshtml.cs" highlight="7"::: (complete source file; reference: ../sample/WebApp3/Pages/Privacy.cshtml.cs)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp3/Pages/Privacy.cshtml.cs.md)

If you are signed in, sign out. Run the app and select the **Privacy** link. You are redirected to the login page.

### Explore Identity

To explore Identity in more detail:

* [Create full identity UI source](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fscaffold-identity%23create-full-identity-ui-source)
* Examine the source of each page and step through the debugger.

## Identity Components

All the Identity-dependent NuGet packages are included in the [ASP.NET Core shared framework](https://learn.microsoft.com/search/?terms=aspnetcore-3.0%23use-the-aspnet-core-shared-framework).

The primary package for Identity is [Microsoft.AspNetCore.Identity](https://www.nuget.org/packages/Microsoft.AspNetCore.Identity/). This package contains the core set of interfaces for ASP.NET Core Identity, and is included by `Microsoft.AspNetCore.Identity.EntityFrameworkCore`.

## Migrating to ASP.NET Core Identity

For more information and guidance on migrating your existing Identity store, see [Migrate Authentication and Identity](../../../../migration/fx-to-core/examples/identity.md).

## Setting password strength

See [Configuration](#pw6) for a sample that sets the minimum password requirements.

## AddDefaultIdentity and AddIdentity

[Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionUIExtensions.AddDefaultIdentity%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionUIExtensions.AddDefaultIdentity%252A) was introduced in ASP.NET Core 2.1. Calling `AddDefaultIdentity` is similar to calling the following:

* [Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentity%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentity%252A)
* [Microsoft.AspNetCore.Identity.IdentityBuilderUIExtensions.AddDefaultUI%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityBuilderUIExtensions.AddDefaultUI%252A)
* [Microsoft.AspNetCore.Identity.IdentityBuilderExtensions.AddDefaultTokenProviders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityBuilderExtensions.AddDefaultTokenProviders%252A)

See [AddDefaultIdentity source](https://github.com/dotnet/AspNetCore/blob/release/3.1/src/Identity/UI/src/IdentityServiceCollectionUIExtensions.cs#L47-L63) for more information.

## Prevent publish of static Identity assets

To prevent publishing static Identity assets (stylesheets and JavaScript files for Identity UI) to the web root, add the following `ResolveStaticWebAssetsInputsDependsOn` property and `RemoveIdentityAssets` target to the app's project file:

```xml
<PropertyGroup>
  <ResolveStaticWebAssetsInputsDependsOn>RemoveIdentityAssets</ResolveStaticWebAssetsInputsDependsOn>
</PropertyGroup>

<Target Name="RemoveIdentityAssets">
  <ItemGroup>
    <StaticWebAsset Remove="@(StaticWebAsset)" Condition="%(SourceId) == 'Microsoft.AspNetCore.Identity.UI'" />
  </ItemGroup>
</Target>
```

<a name="next"></a>

## Next Steps

* [ASP.NET Core Identity source code](https://github.com/dotnet/aspnetcore/tree/main/src/Identity)
* [How to work with Roles in ASP.NET Core Identity](https://www.yogihosting.com/aspnet-core-identity-roles/)
<!-- https://github.com/dotnet/AspNetCore.Docs/issues/7114 -->
* See [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/5131) for information on configuring Identity using SQLite.
* [Configure Identity](../../identity-configuration.md)
* [security/authorization/secure-data](../../../authorization/secure-data.md)
* [security/authentication/add-user-data](../../add-user-data.md)
* [security/authentication/identity-enable-qrcodes](../../identity-enable-qrcodes.md)
* [migration/fx-to-core/examples/identity](../../../../migration/fx-to-core/examples/identity.md)
* [security/authentication/accconfirm](../../accconfirm.md)
* [security/authentication/2fa](../../2fa.md)
* [host-and-deploy/web-farm](../../../../host-and-deploy/web-farm.md)



**Applies to: \>= aspnetcore-3.0 < aspnetcore-6.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT)

ASP.NET Core Identity:

* Is an API that supports user interface (UI) login functionality.
* Manages users, passwords, profile data, roles, claims, tokens, email confirmation, and more.

Users can create an account with the login information stored in Identity or they can use an external login provider. Supported external login providers include [Facebook, Google, Microsoft Account, and Twitter](../../social/index.md).

For information on how to require authentication for all app users, see [Require global user authentication](https://learn.microsoft.com/search/?terms=security%2Fauthorization%2Fpolicies%23require-global-user-authentication).

The [Identity source code](https://github.com/dotnet/AspNetCore/tree/main/src/Identity) is available on GitHub. [Scaffold Identity](../../scaffold-identity.md) and view the generated files to review the template interaction with Identity.

Identity is typically configured using a SQL Server database to store user names, passwords, and profile data. Alternatively, another persistent store can be used, for example, Azure Table Storage.

In this topic, you learn how to use Identity to register, log in, and log out a user. Note: the templates treat username and email as the same for users. For more detailed instructions about creating apps that use Identity, see [Next Steps](#next).

[Microsoft identity platform](https://learn.microsoft.com/azure/active-directory/develop/) is:
* An evolution of the Azure Active Directory (Azure AD) developer platform.
* An alternative identity solution for authentication and authorization in ASP.NET Core apps.
* Not related to ASP.NET Core Identity.

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, use one of the following:

* [Microsoft Entra ID](https://learn.microsoft.com/azure/api-management/api-management-howto-protect-backend-with-aad)
* [Duende IdentityServer](https://docs.duendesoftware.com). Duende IdentityServer is 3rd party product.

Duende IdentityServer is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende IdentityServer enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

For more information, see [Overview of Duende IdentityServer](https://docs.duendesoftware.com).

For more information on other authentication providers, see [Community OSS authentication options for ASP.NET Core](../../community.md)


[View or download the sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/authentication/identity/sample) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample)).

<a name="adi"></a>

## Create a Web app with authentication

Create an ASP.NET Core Web Application project with Individual User Accounts.

# [Visual Studio](#tab/visual-studio)

* Select **File** > **New** > **Project**.
* Select **ASP.NET Core Web Application**. Name the project **WebApp1** to have the same namespace as the project download. Click **OK**.
* Select an ASP.NET Core **Web Application**, then select **Change Authentication**.
* Select **Individual User Accounts** and click **OK**.

# [.NET CLI](#tab/net-cli)

```dotnetcli
dotnet new webapp --auth Individual -o WebApp1
```

The preceding command creates a Razor web app using SQLite. To create the web app with LocalDB, run the following command:

```dotnetcli
dotnet new webapp --auth Individual -uld -o WebApp1
```

---

The generated project provides [ASP.NET Core Identity](../../identity.md) as a [Razor class library](../../../../razor-pages/ui-class.md). The Identity Razor class library exposes endpoints with the `Identity` area. For example:

* /Identity/Account/Login
* /Identity/Account/Logout
* /Identity/Account/Manage

### Apply migrations

Apply the migrations to initialize the database.

# [Visual Studio](#tab/visual-studio)

Run the following command in the Package Manager Console (PMC):

`PM> Update-Database`

# [.NET CLI](#tab/net-cli)

Migrations are not necessary at this step when using SQLite.

If `dotnet ef` has not been installed, install it as a global tool:

```dotnetcli
  dotnet tool install --global dotnet-ef
```

For more information on the CLI for EF Core, see [EF Core tools reference for the .NET CLI](https://learn.microsoft.com/ef/core/miscellaneous/cli/dotnet).

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the ['--arch' option](https://learn.microsoft.com/dotnet/core/tools/dotnet-tool-install#options).
> For more information, see [GitHub dotnet/aspnetcore.docs issue #29262](https://github.com/dotnet/AspNetCore.Docs/issues/29262) - _Add '-a arm64' on Apple Silicon_.



For LocalDB, run the following command:

```dotnetcli
dotnet ef database update
```

---

### Test Register and Login

Run the app and register a user. Depending on your screen size, you might need to select the navigation toggle button to see the **Register** and **Login** links.

### View the Identity database

# [Visual Studio](#tab/visual-studio) 

* From the **View** menu, select **SQL Server Object Explorer** (SSOX).
* Navigate to **(localdb)MSSQLLocalDB(SQL Server 13)**. Right-click on **dbo.AspNetUsers** > **View Data**:

Contextual menu on AspNetUsers table in SQL Server Object Explorer

# [.NET CLI](#tab/net-cli)

There are many third party tools you can download to manage and view a SQLite database, for example [DB Browser for SQLite](https://sqlitebrowser.org/).

---

<a name="pw"></a>

### Configure Identity services

Services are added in `ConfigureServices`. The typical pattern is to call all the `Add{Service}` methods, and then call all the `services.Configure{Service}` methods.



**Applies to: \>= aspnetcore-3.0 < aspnetcore-5.0**

[language="csharp" source="../sample/WebApp3/Startup.cs" id="snippet_configureservices" highlight="11-99"::: (complete source file; reference: ../sample/WebApp3/Startup.cs)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp3/Startup.cs.md)

The preceding highlighted code configures Identity with default option values. Services are made available to the app through [dependency injection](../../../../fundamentals/dependency-injection.md).

Identity is enabled by calling [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A). `UseAuthentication` adds authentication [middleware](../../../../fundamentals/middleware/index.md) to the request pipeline.

[language="csharp" source="../sample/WebApp3/Startup.cs" id="snippet_configure" highlight="19"::: (complete source file; reference: ../sample/WebApp3/Startup.cs)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp3/Startup.cs.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[language="csharp" source="../sample/WebApp5x/Startup.cs" id="snippet_configureservices" highlight="12-99"::: (complete source file; reference: ../sample/WebApp5x/Startup.cs)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp5x/Startup.cs.md)

The preceding code configures Identity with default option values. Services are made available to the app through [dependency injection](../../../../fundamentals/dependency-injection.md).

Identity is enabled by calling [Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication%252A). `UseAuthentication` adds authentication [middleware](../../../../fundamentals/middleware/index.md) to the request pipeline.

[language="csharp" source="../sample/WebApp5x/Startup.cs" id="snippet_configure" highlight="19"::: (complete source file; reference: ../sample/WebApp5x/Startup.cs)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp5x/Startup.cs.md)



**Applies to: \>= aspnetcore-3.0 < aspnetcore-6.0**

The template-generated app doesn't use [authorization](../../../authorization/secure-data.md). `app.UseAuthorization` is included to ensure it's added in the correct order should the app add authorization. `UseRouting`, `UseAuthentication`, `UseAuthorization`, and `UseEndpoints` must be called in the order shown in the preceding code.

For more information on `IdentityOptions` and `Startup`, see [Microsoft.AspNetCore.Identity.IdentityOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.IdentityOptions) and [Application Startup](../../../../fundamentals/startup.md).

## Scaffold Register, Login, LogOut, and RegisterConfirmation

# [Visual Studio](#tab/visual-studio)

Add the `Register`, `Login`, `LogOut`, and `RegisterConfirmation` files. Follow the [Scaffold identity into a Razor project with authorization](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fscaffold-identity%23scaffold-identity-into-a-razor-project-with-authorization) instructions to generate the code shown in this section.

# [.NET CLI](#tab/net-cli)

If you created the project with name **WebApp1**, and you're not using SQLite, run the following commands. Otherwise, use the correct namespace for the `ApplicationDbContext`:

```dotnetcli
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet aspnet-codegenerator identity -dc WebApp1.Data.ApplicationDbContext --files "Account.Register;Account.Login;Account.Logout;Account.RegisterConfirmation"
```

When using SQLite, append `--useSqLite` or `-sqlite`:

```dotnetcli
dotnet aspnet-codegenerator identity -dc WebApp1.Data.ApplicationDbContext --files "Account.Register;Account.Login;Account.Logout;Account.RegisterConfirmation" --useSqLite
```

PowerShell uses semicolon as a command separator. When using PowerShell, escape the semicolons in the file list or put the file list in double quotes, as the preceding example shows.

For more information on scaffolding Identity, see [Scaffold identity into a Razor project with authorization](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fscaffold-identity%23scaffold-identity-into-a-razor-project-with-authorization).

---

### Examine Register

When a user clicks the **Register** button on the `Register` page, the `RegisterModel.OnPostAsync` action is invoked. The user is created by [Microsoft.AspNetCore.Identity.UserManager%601.CreateAsync(%600)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.UserManager%25601.CreateAsync(%25600)) on the `_userManager` object:

[language="csharp" source="../sample/WebApp3/Areas/Identity/Pages/Account/Register.cshtml.cs" id="snippet" highlight="9"::: (complete source file; reference: ../sample/WebApp3/Areas/Identity/Pages/Account/Register.cshtml.cs)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp3/Areas/Identity/Pages/Account/Register.cshtml.cs.md)

<!-- .NET 5 fixes this, see
https://github.com/dotnet/aspnetcore/blob/main/src/Identity/UI/src/Areas/Identity/Pages/V4/Account/RegisterConfirmation.cshtml.cs#L74-L77
-->
<a name="ddav"></a>
### Disable default account verification

With the default templates, the user is redirected to the `Account.RegisterConfirmation` where they can select a link to have the account confirmed. The default `Account.RegisterConfirmation` is used ***only*** for testing, automatic account verification should be disabled in a production app.

To require a confirmed account and prevent immediate login at registration, set `DisplayConfirmAccountLink = false` in `/Areas/Identity/Pages/Account/RegisterConfirmation.cshtml.cs`:

[Code reference unavailable in this source snapshot: ../../../../includes/~/security/authentication/identity/sample/WebApp3/Areas/Identity/Pages/Account/RegisterConfirmation.cshtml.cs?name=snippet\\&highlight=34](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/authentication/identity/includes/identity6.md)


### Log in

The Login form is displayed when:

* The **Log in** link is selected.
* A user attempts to access a restricted page that they aren't authorized to access **or** when they haven't been authenticated by the system.

When the form on the Login page is submitted, the `OnPostAsync` action is called. `PasswordSignInAsync` is called on the `_signInManager` object.

[language="csharp" source="../sample/WebApp3/Areas/Identity/Pages/Account/Login.cshtml.cs" id="snippet" highlight="10-11"::: (complete source file; reference: ../sample/WebApp3/Areas/Identity/Pages/Account/Login.cshtml.cs)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp3/Areas/Identity/Pages/Account/Login.cshtml.cs.md)

For information on how to make authorization decisions, see [security/authorization/introduction](../../../authorization/introduction.md).

### Log out

The **Log out** link invokes the `LogoutModel.OnPost` action. 

[language="csharp" source="../sample/WebApp3/Areas/Identity/Pages/Account/Logout.cshtml.cs" highlight="36"::: (complete source file; reference: ../sample/WebApp3/Areas/Identity/Pages/Account/Logout.cshtml.cs)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp3/Areas/Identity/Pages/Account/Logout.cshtml.cs.md)

In the preceding code, the code `return RedirectToPage();` needs to be a redirect so that the browser performs a new request and the identity for the user gets updated.

[Microsoft.AspNetCore.Identity.SignInManager%601.SignOutAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Identity.SignInManager%25601.SignOutAsync%252A) clears the user's claims stored in a cookie.

Post is specified in the `Pages/Shared/_LoginPartial.cshtml`:

[language="cshtml" source="../sample/WebApp3/Pages/Shared/\_LoginPartial.cshtml" highlight="15"::: (complete source file; reference: ../sample/WebApp3/Pages/Shared/\_LoginPartial.cshtml)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp3/Pages/Shared/_LoginPartial.cshtml.md)

## Test Identity

The default web project templates allow anonymous access to the home pages. To test Identity, add [`[Authorize]`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Authorization.AuthorizeAttribute):

[language="csharp" source="../sample/WebApp3/Pages/Privacy.cshtml.cs" highlight="7"::: (complete source file; reference: ../sample/WebApp3/Pages/Privacy.cshtml.cs)](../../../../../_code/aspnetcore/security/authentication/identity/sample/WebApp3/Pages/Privacy.cshtml.cs.md)

If you are signed in, sign out. Run the app and select the **Privacy** link. You are redirected to the login page.

### Explore Identity

To explore Identity in more detail:

* [Create full identity UI source](https://learn.microsoft.com/search/?terms=security%2Fauthentication%2Fscaffold-identity%23create-full-identity-ui-source)
* Examine the source of each page and step through the debugger.

## Identity Components

All the Identity-dependent NuGet packages are included in the [ASP.NET Core shared framework](https://learn.microsoft.com/search/?terms=aspnetcore-3.0%23use-the-aspnet-core-shared-framework).

The primary package for Identity is [Microsoft.AspNetCore.Identity](https://www.nuget.org/packages/Microsoft.AspNetCore.Identity/). This package contains the core set of interfaces for ASP.NET Core Identity, and is included by `Microsoft.AspNetCore.Identity.EntityFrameworkCore`.

## Migrating to ASP.NET Core Identity

For more information and guidance on migrating your existing Identity store, see [Migrate Authentication and Identity](../../../../migration/fx-to-core/examples/identity.md).

## Setting password strength

See [Configuration](#pw) for a sample that sets the minimum password requirements.

## Prevent publish of static Identity assets

To prevent publishing static Identity assets (stylesheets and JavaScript files for Identity UI) to the web root, add the following `ResolveStaticWebAssetsInputsDependsOn` property and `RemoveIdentityAssets` target to the app's project file:

```xml
<PropertyGroup>
  <ResolveStaticWebAssetsInputsDependsOn>RemoveIdentityAssets</ResolveStaticWebAssetsInputsDependsOn>
</PropertyGroup>

<Target Name="RemoveIdentityAssets">
  <ItemGroup>
    <StaticWebAsset Remove="@(StaticWebAsset)" Condition="%(SourceId) == 'Microsoft.AspNetCore.Identity.UI'" />
  </ItemGroup>
</Target>
```

<a name="next"></a>

## Next Steps

* [ASP.NET Core Identity source code](https://github.com/dotnet/aspnetcore/tree/main/src/Identity)
* [AddDefaultIdentity source](https://github.com/dotnet/AspNetCore/blob/release/3.1/src/Identity/UI/src/IdentityServiceCollectionUIExtensions.cs#L47-L63)
* See [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/5131) for information on configuring Identity using SQLite.
* [Configure Identity](../../identity-configuration.md)
* [security/authorization/secure-data](../../../authorization/secure-data.md)
* [security/authentication/add-user-data](../../add-user-data.md)
* [security/authentication/identity-enable-qrcodes](../../identity-enable-qrcodes.md)
* [migration/fx-to-core/examples/identity](../../../../migration/fx-to-core/examples/identity.md)
* [security/authentication/accconfirm](../../accconfirm.md)
* [security/authentication/2fa](../../2fa.md)
* [host-and-deploy/web-farm](../../../../host-and-deploy/web-farm.md)
