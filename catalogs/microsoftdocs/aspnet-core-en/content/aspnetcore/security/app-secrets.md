---
title: Safe storage of app secrets in development
author: tdykstra
description: Learn how to store and retrieve sensitive information during the development of an ASP.NET Core app, including the Secret Manager tool.
ms.author: tdykstra
ms.custom: sfi-ropc-nochange
monikerRange: '>= aspnetcore-3.0'
ms.date: 05/13/2026
uid: security/app-secrets

# customer intent: As an ASP.NET Core developer, I want to store and retrieve sensitive information during development of my app, so I can ensure my app secrets remain secure.
---
<!-- ms.sfi.ropc: t -->
# Safe storage of app secrets in development in ASP.NET Core

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


**Applies to: \>= aspnetcore-6.0**

By [Rick Anderson](https://twitter.com/RickAndMSFT) and [Kirk Larkin](https://twitter.com/serpent5)

This article explains how to manage sensitive data for an ASP.NET Core app on a development machine. Never store passwords or other sensitive data in source code or configuration files. Production secrets shouldn't be used for development or test. Secrets shouldn't be deployed with the app. Production secrets should be accessed through a controlled means like Azure Key Vault. Azure test and production secrets can be stored and protected with the [Azure Key Vault configuration provider](key-vault-configuration.md).

[View or download the sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/app-secrets/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

For more information on authentication for deployed test and production apps, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).

To use user secrets in a .NET console app, see [GitHub dotnet/entityframework.docs issue #3939](https://github.com/dotnet/EntityFramework.Docs/issues/3939#issuecomment-1191978026).

## Work with environment variables

Environment variables are used to avoid storage of app secrets in code or in local configuration files. Environment variables override configuration values for all previously specified configuration sources.

Consider an ASP.NET Core web app in which **Individual Accounts** security is enabled. A default database connection string is included in the project _appsettings.json_ file with the `DefaultConnection` key. The default connection string is for LocalDB, which runs in user mode and doesn't require a password. During app deployment, you can override the `DefaultConnection` key value with the value from an environment variable. The environment variable might store the complete connection string with sensitive credentials.

> **Warning:**
> Environment variables are commonly stored as plain, unencrypted text. If the machine or process is compromised, environment variables are accessible to untrusted parties. Extra measures to prevent disclosure of user secrets might be required.

The colon (`:`) separator doesn't work with environment variable hierarchical keys on all platforms. For example, [Bash](https://linuxhint.com/bash-environment-variables/) doesn't support colon (`:`) as a separator. All platforms support the double underscore (`__`) syntax and automatically replace it with a colon (`:`).


<a name="secret-manager"></a>

## Use the Secret Manager tool

Secret Manager is a tool that stores sensitive data during application development. In this context, a piece of sensitive data is an _app secret_.

- App secrets are stored in a separate location from the project tree.
- They're associated with a specific project or shared across several projects.
- They aren't checked into source control.

> **Warning:**
> Secret Manager doesn't encrypt the stored secrets and shouldn't be treated as a trusted store. It's for development purposes only. The keys and values are stored in a JSON configuration file in the user profile directory.

Secret Manager hides implementation details, such as where and how the values are stored. You can use the tool without knowing these implementation details. The values are stored in a JSON file in the local machine's user profile folder:

# [Windows](#tab/windows)

File system path:

`%APPDATA%\Microsoft\UserSecrets\<user_secrets_id>\secrets.json`

# [Linux / macOS](#tab/linux+macos)

File system path:

`~/.microsoft/usersecrets/<user_secrets_id>/secrets.json`

---

In the file system path, replace the `<user_secrets_id>` portion with the `UserSecretsId` value specified in your project file.

Don't write code that depends on the location or format of data saved with Secret Manager. These implementation details might change. For example, the secret values aren't encrypted.

## Enable secret storage

Secret Manager operates on project-specific configuration settings stored in your user profile.

### Use the CLI

Secret Manager includes an `init` command. To use user secrets, run the following command in the project directory:

```dotnetcli
dotnet user-secrets init
```

This command adds a `UserSecretsId` element within a `PropertyGroup` of the project file. By default, the inner text of `UserSecretsId` is a GUID. The inner text is arbitrary, but is unique to the project. The following example shows a GUID value of `0000a1a1-b2b2-c3c3-d4d4-eeeeee555555`.

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <UserSecretsId>0000a1a1-b2b2-c3c3-d4d4-eeeeee555555</UserSecretsId>
  </PropertyGroup>

</Project>
```

### Use Visual Studio

In Visual Studio, right-click the project in Solution Explorer, and select **Manage User Secrets** from the context menu. This gesture adds a `UserSecretsId` element, populated with a GUID, to the project file.

### If 'GenerateAssemblyInfo' is 'false'

If the generation of assembly info attributes (`GenerateAssemblyInfo`) is disabled (set to `false`), manually add the [Microsoft.Extensions.Configuration.UserSecrets.UserSecretsIdAttribute](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.UserSecrets.UserSecretsIdAttribute) in the _AssemblyInfo.cs_ file. For example:

```csharp
[assembly: UserSecretsId("your_user_secrets_id")]
```

When you manually add the `UserSecretsId` attribute to the _AssemblyInfo.cs_ file, the `UserSecretsId` value must match the value in the project file.

## Set a secret

Define an app secret consisting of a key and its value. The secret is associated with the project's `UserSecretsId` value. For example, run the following command from the directory in which the project file exists:

```dotnetcli
dotnet user-secrets set "Movies:ServiceApiKey" "12345"
```

In this example, the colon indicates that `Movies` is an object literal with a `ServiceApiKey` property.

You can also use Secret Manager from other directories. Include the `--project` option to supply the file system path at which the project file exists. For example:

```dotnetcli
dotnet user-secrets set "Movies:ServiceApiKey" "12345" --project "C:\apps\WebApp1\src\WebApp1"
```

### JSON structure flattening in Visual Studio

The Visual Studio **Manage User Secrets** gesture opens a _secrets.json_ file in the text editor. Replace the contents of the _secrets.json_ file with the key-value pairs to store. For example:

```json
{
  "Movies": {
    "ConnectionString": "Server=(localdb)\\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true",
    "ServiceApiKey": "12345"
  }
}
```

The JSON structure is flattened after modifications via the `dotnet user-secrets remove` or `dotnet user-secrets set` command. For example, running `dotnet user-secrets remove "Movies:ConnectionString"` collapses the `Movies` object literal. The modified file resembles the following JSON:

```json
{
  "Movies:ServiceApiKey": "12345"
}
```

## Set multiple secrets

A batch of secrets can be set by piping JSON to the `set` command. In the following example, the contents of the _input.json_ file is piped to the `set` command.

# [Windows](#tab/windows)

Run the following command:

```dotnetcli
type .\input.json | dotnet user-secrets set
```

# [Linux / macOS](#tab/linux+macos)

Run the following command in a terminal:

```dotnetcli
cat ./input.json | dotnet user-secrets set
```

---

## Access a secret

To access a secret, complete the following steps:

1. [Register the user secrets configuration source](#register-the-user-secrets-configuration-source).

1. [Read the secret via the Configuration API](#read-the-secret-via-the-configuration-api).

### Register the user secrets configuration source

The user secrets [configuration provider](https://learn.microsoft.com/dotnet/core/extensions/configuration-providers) registers the appropriate configuration source with the .NET [Configuration API](../fundamentals/configuration/index.md).

ASP.NET Core web apps created with the [dotnet new](https://learn.microsoft.com/dotnet/core/tools/dotnet-new) command or Visual Studio generate the following code:

[Code example (complete source file; reference: \~/security/app-secrets/samples/6.x/UserSecrets/Program.cs?name=snippet2\&highlight=1)](../../_code/aspnetcore/security/app-secrets/samples/6.x/UserSecrets/Program.cs.md)

The [WebApplication.CreateBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder%252A) method initializes a new instance of the [Microsoft.AspNetCore.Builder.WebApplicationBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder) class with preconfigured defaults. The initialized `WebApplicationBuilder` (`builder`) provides default configuration and calls the [Microsoft.Extensions.Configuration.UserSecretsConfigurationExtensions.AddUserSecrets%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.UserSecretsConfigurationExtensions.AddUserSecrets%252A) method when the [Microsoft.Extensions.Hosting.IHostEnvironment.EnvironmentName](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment.EnvironmentName) property is [Microsoft.Extensions.Hosting.EnvironmentName.Development](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.EnvironmentName.Development).

### Read the secret via the Configuration API

The following examples demonstrate how to read the `Movies:ServiceApiKey` key:

**Program.cs file**

[Code example (complete source file; reference: \~/security/app-secrets/samples/6.x/UserSecrets/Program.cs?name=snippet_s2\&highlight=2)](../../_code/aspnetcore/security/app-secrets/samples/6.x/UserSecrets/Program.cs.md)

**Razor Pages page model**

[Code example (complete source file; reference: \~/security/app-secrets/samples/6.x/UserSecrets/Pages/Index.cshtml.cs?name=snippet_PageModel\&highlight=12)](../../_code/aspnetcore/security/app-secrets/samples/6.x/UserSecrets/Pages/Index.cshtml.cs.md)

For more information, see [fundamentals/configuration/index](../fundamentals/configuration/index.md).

## Map secrets to a POCO

Mapping an entire object literal to a POCO (a simple .NET class with properties) is useful for aggregating related properties.

Assume the application _secrets.json_ file contains the following two secrets:

```json 
{
  "Movies:ConnectionString": "Server=(localdb)\\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true",
  "Movies:ServiceApiKey": "12345"
}
```



To map the preceding secrets to a POCO, use the .NET Configuration API's [object graph binding](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23bind-an-array) feature. The following code binds to a custom `MovieSettings` POCO and accesses the `ServiceApiKey` property value:

[Code example (complete source file; reference: \~/security/app-secrets/samples/3.x/UserSecrets/Startup3.cs?name=snippet_BindToObjectGraph)](../../_code/aspnetcore/security/app-secrets/samples/3.x/UserSecrets/Startup3.cs.md)

The `Movies:ConnectionString` and `Movies:ServiceApiKey` secrets are mapped to the respective properties in `MovieSettings`:

[Code example (complete source file; reference: \~/security/app-secrets/samples/3.x/UserSecrets/Models/MovieSettings.cs?name=snippet_MovieSettingsClass)](../../_code/aspnetcore/security/app-secrets/samples/3.x/UserSecrets/Models/MovieSettings.cs.md)

## Use string replacement with secrets

Storing passwords in plain text is insecure. Never store secrets in a configuration file such as _appsettings.json_, which might get checked in to a source code repository.

For example, a database connection string stored in an _appsettings.json_ file shouldn't include a password. Instead, store the password as a secret, and include the password in the connection string at runtime. For example:

```dotnetcli
dotnet user-secrets set "DbPassword" "`<secret value>`"
```

Replace the `<secret value>` placeholder in the example with the password value. Set the secret's value on a [System.Data.SqlClient.SqlConnectionStringBuilder](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnectionStringBuilder) object's [System.Data.SqlClient.SqlConnectionStringBuilder.Password%2A](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnectionStringBuilder.Password%252A) property to include it as the password value in the connection string:

[Code example (complete source file; reference: \~/security/app-secrets/samples/6.x/UserSecrets/Program.cs?name=snippet_sql\&highlight=5-8)](../../_code/aspnetcore/security/app-secrets/samples/6.x/UserSecrets/Program.cs.md)

## List the secrets

Assume the application _secrets.json_ file contains the following two secrets:

```json 
{
  "Movies:ConnectionString": "Server=(localdb)\\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true",
  "Movies:ServiceApiKey": "12345"
}
```



Run the following command from the directory in which the project file exists:

```dotnetcli
dotnet user-secrets list
```

The following output appears:

```console
Movies:ConnectionString = Server=(localdb)\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true
Movies:ServiceApiKey = 12345
```

In the example, a colon (`:`) in the key names denotes the object hierarchy within the _secrets.json_ file.

## Remove a single secret

Assume the application _secrets.json_ file contains the following two secrets:

```json 
{
  "Movies:ConnectionString": "Server=(localdb)\\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true",
  "Movies:ServiceApiKey": "12345"
}
```



Run the following command from the directory in which the project file exists:

```dotnetcli
dotnet user-secrets remove "Movies:ConnectionString"
```

The application _secrets.json_ file is modified to remove the key-value pair associated with the `Movies:ConnectionString` key:

```json
{
  "Movies": {
    "ServiceApiKey": "12345"
  }
}
```

The `dotnet user-secrets list` command displays the following message:

```console
Movies:ServiceApiKey = 12345
```

## Remove all secrets

Assume the application _secrets.json_ file contains the following two secrets:

```json 
{
  "Movies:ConnectionString": "Server=(localdb)\\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true",
  "Movies:ServiceApiKey": "12345"
}
```



Run the following command from the directory in which the project file exists:

```dotnetcli
dotnet user-secrets clear
```

All user secrets for the app are deleted from the _secrets.json_ file:

```json
{}
```

Running the `dotnet user-secrets list` command displays the following message:

```console
No secrets configured for this application.
```

## Manage user secrets with Visual Studio

To manage user secrets in Visual Studio, right-click the project in Solution Explorer and select **Manage User Secrets**:

Screenshot shows how to select the Manage User Secrets option in Visual Studio.

## Migrate user secrets from ASP.NET Framework to ASP.NET Core

You can migrate your stored user secrets from ASP.NET Framework to ASP.NET Core. For more information, see [GitHub dotnet/aspnetcore.docs issue #27611](https://github.com/dotnet/AspNetCore.Docs/issues/27611) - _User Secrets documentation doesn't mention incompatibility with AssemblyInfo.cs_.

## Work with user secrets in non-web applications

Projects that target `Microsoft.NET.Sdk.Web` automatically include support for user secrets. For projects that target `Microsoft.NET.Sdk`, such as console applications, install the configuration extension and user secrets NuGet packages explicitly.

# [PowerShell](#tab/powershell)

```powershell
Install-Package Microsoft.Extensions.Configuration
Install-Package Microsoft.Extensions.Configuration.UserSecrets
```

# [.NET CLI](#tab/net-cli)

```dotnetcli
dotnet add package Microsoft.Extensions.Configuration
dotnet add package Microsoft.Extensions.Configuration.UserSecrets
```

---

After you install the packages, [initialize the project](#enable-secret-storage) and [set secrets](#set-a-secret) the same way as for a web app. The following example shows a console application that retrieves the value of a secret set with the `AppSecret` key:

```csharp
using Microsoft.Extensions.Configuration;

namespace ConsoleApp;

class Program
{
    static void Main(string[] args)
    {
        IConfigurationRoot config = new ConfigurationBuilder()
            .AddUserSecrets<Program>()
            .Build();

        Console.WriteLine(config["AppSecret"]);
    }
}
```

## Related content

* [GitHub dotnet/aspnetcore.docs issue #30378 (Debugging under Internet Information Services (IIS))](https://github.com/dotnet/AspNetCore.Docs/issues/30378)
* [GitHub dotnet/aspnetcore.docs issue #16328 (Running in IIS)](https://github.com/dotnet/AspNetCore.Docs/issues/16328)
* [fundamentals/configuration/index](../fundamentals/configuration/index.md)
* [security/key-vault-configuration](key-vault-configuration.md)



**Applies to: < aspnetcore-6.0**
<!-- ms.sfi.ropc: t -->

By [Rick Anderson](https://twitter.com/RickAndMSFT), [Kirk Larkin](https://twitter.com/serpent5), [Daniel Roth](https://github.com/danroth27), and [Scott Addie](https://github.com/scottaddie)

[View or download sample code](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/app-secrets/samples) ([how to download](https://learn.microsoft.com/search/?terms=fundamentals%2Findex%23how-to-download-a-sample))

This article explains how to manage sensitive data for an ASP.NET Core app on a development machine. Never store passwords or other sensitive data in source code or configuration files. Production secrets shouldn't be used for development or test. Secrets shouldn't be deployed with the app. Production secrets should be accessed through a controlled means like Azure Key Vault. Azure test and production secrets can be stored and protected with the [Azure Key Vault configuration provider](key-vault-configuration.md).

For more information on authentication for test and production environments, see [Secure authentication flows](https://learn.microsoft.com/search/?terms=security%2Findex%23secure-authentication-flows).

## Environment variables

Environment variables are used to avoid storage of app secrets in code or in local configuration files. Environment variables override configuration values for all previously specified configuration sources.

Consider an ASP.NET Core web app in which **Individual User Accounts** security is enabled. A default database connection string is included in the project's `appsettings.json` file with the key `DefaultConnection`. The default connection string is for LocalDB, which runs in user mode and doesn't require a password. During app deployment, the `DefaultConnection` key value can be overridden with an environment variable's value. The environment variable may store the complete connection string with sensitive credentials.

> **Warning:**
> Environment variables are generally stored in plain, unencrypted text. If the machine or process is compromised, environment variables can be accessed by untrusted parties. Additional measures to prevent disclosure of user secrets may be required.

The colon (`:`) separator doesn't work with environment variable hierarchical keys on all platforms. For example, [Bash](https://linuxhint.com/bash-environment-variables/) doesn't support colon (`:`) as a separator. All platforms support the double underscore (`__`) syntax and automatically replace it with a colon (`:`).


## Secret Manager

The Secret Manager tool stores sensitive data during application development. In this context, a piece of sensitive data is an app secret. App secrets are stored in a separate location from the project tree. The app secrets are associated with a specific project or shared across several projects. The app secrets aren't checked into source control.

> **Warning:**
> The Secret Manager tool doesn't encrypt the stored secrets and shouldn't be treated as a trusted store. It's for development purposes only. The keys and values are stored in a JSON configuration file in the user profile directory.

## How the Secret Manager tool works

The Secret Manager tool hides implementation details, such as where and how the values are stored. You can use the tool without knowing these implementation details. The values are stored in a JSON file in the local machine's user profile folder:

# [Windows](#tab/windows)

File system path:

`%APPDATA%\Microsoft\UserSecrets\<user_secrets_id>\secrets.json`

# [Linux / macOS](#tab/linux+macos)

File system path:

`~/.microsoft/usersecrets/<user_secrets_id>/secrets.json`

---

In the preceding file paths, replace `<user_secrets_id>` with the `UserSecretsId` value specified in the project file.

Don't write code that depends on the location or format of data saved with the Secret Manager tool. These implementation details may change. For example, the secret values aren't encrypted, but could be in the future.

## Enable secret storage

The Secret Manager tool operates on project-specific configuration settings stored in your user profile.

The Secret Manager tool includes an `init` command in .NET Core SDK 3.0.100 or later. To use user secrets, run the following command in the project directory:

```dotnetcli
dotnet user-secrets init
```

The preceding command adds a `UserSecretsId` element within a `PropertyGroup` of the project file. By default, the inner text of `UserSecretsId` is a GUID. The inner text is arbitrary, but is unique to the project.

[Code reference unavailable in this source snapshot: app-secrets/includes/~/security/app-secrets/samples/3.x/UserSecrets/UserSecrets.csproj?name=snippet_PropertyGroup\\&highlight=3](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/app-secrets.md)

In Visual Studio, right-click the project in Solution Explorer, and select **Manage User Secrets** from the context menu. This gesture adds a `UserSecretsId` element, populated with a GUID, to the project file.

## Set a secret

Define an app secret consisting of a key and its value. The secret is associated with the project's `UserSecretsId` value. For example, run the following command from the directory in which the project file exists:

```dotnetcli
dotnet user-secrets set "Movies:ServiceApiKey" "12345"
```

In the preceding example, the colon denotes that `Movies` is an object literal with a `ServiceApiKey` property.

The Secret Manager tool can be used from other directories too. Use the `--project` option to supply the file system path at which the project file exists. For example:

```dotnetcli
dotnet user-secrets set "Movies:ServiceApiKey" "12345" --project "C:\apps\WebApp1\src\WebApp1"
```

### JSON structure flattening in Visual Studio

Visual Studio's **Manage User Secrets** gesture opens a `secrets.json` file in the text editor. Replace the contents of `secrets.json` with the key-value pairs to be stored. For example:

```json
{
  "Movies": {
    "ConnectionString": "Server=(localdb)\\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true",
    "ServiceApiKey": "12345"
  }
}
```

The JSON structure is flattened after modifications via `dotnet user-secrets remove` or `dotnet user-secrets set`. For example, running `dotnet user-secrets remove "Movies:ConnectionString"` collapses the `Movies` object literal. The modified file resembles the following JSON:

```json
{
  "Movies:ServiceApiKey": "12345"
}
```

## Set multiple secrets

A batch of secrets can be set by piping JSON to the `set` command. In the following example, the `input.json` file's contents are piped to the `set` command.

# [Windows](#tab/windows)

Open a command shell, and execute the following command:

  ```dotnetcli
  type .\input.json | dotnet user-secrets set
  ```

# [Linux / macOS](#tab/linux+macos)

Open a command shell, and execute the following command:

  ```dotnetcli
  cat ./input.json | dotnet user-secrets set
  ```

---

## Access a secret

To access a secret, complete the following steps:

1. [Register the user secrets configuration source](#register-the-user-secrets-configuration-source)
1. [Read the secret via the Configuration API](#read-the-secret-via-the-configuration-api)

### Register the user secrets configuration source

The user secrets [configuration provider](https://learn.microsoft.com/dotnet/core/extensions/configuration-providers) registers the appropriate configuration source with the .NET [Configuration API](../fundamentals/configuration/index.md).

The user secrets configuration source is automatically added in Development mode when the project calls [Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder%252A). `CreateDefaultBuilder` calls [Microsoft.Extensions.Configuration.UserSecretsConfigurationExtensions.AddUserSecrets%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.UserSecretsConfigurationExtensions.AddUserSecrets%252A) when the [Microsoft.Extensions.Hosting.IHostEnvironment.EnvironmentName](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHostEnvironment.EnvironmentName) is [Microsoft.Extensions.Hosting.EnvironmentName.Development](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.EnvironmentName.Development):

[Code reference unavailable in this source snapshot: app-secrets/includes/~/security/app-secrets/samples/3.x/UserSecrets/Program.cs?name=snippet_CreateHostBuilder\\&highlight=2](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/app-secrets.md)

When `CreateDefaultBuilder` isn't called, add the user secrets configuration source explicitly by calling [Microsoft.Extensions.Configuration.UserSecretsConfigurationExtensions.AddUserSecrets%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.UserSecretsConfigurationExtensions.AddUserSecrets%252A) in [Microsoft.Extensions.Hosting.HostBuilder.ConfigureAppConfiguration%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.HostBuilder.ConfigureAppConfiguration%252A). Call `AddUserSecrets` only when the app runs in the `Development` environment, as shown in the following example:

[Code reference unavailable in this source snapshot: app-secrets/includes/~/security/app-secrets/samples/3.x/UserSecrets/Program2.cs?name=snippet_Program\\&highlight=10-13](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/app-secrets.md)

### Read the secret via the Configuration API

If the user secrets configuration source is registered, the .NET Configuration API can read the secrets. [Constructor injection](https://learn.microsoft.com/dotnet/core/extensions/dependency-injection/overview#constructor-injection-behavior) can be used to gain access to the .NET Configuration API. Consider the following examples of reading the `Movies:ServiceApiKey` key:

**Startup class:**

[Code reference unavailable in this source snapshot: app-secrets/includes/~/security/app-secrets/samples/3.x/UserSecrets/Startup.cs?name=snippet_StartupClass\\&highlight=14](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/app-secrets.md)

**Razor Pages page model:**

[Code reference unavailable in this source snapshot: app-secrets/includes/~/security/app-secrets/samples/3.x/UserSecrets/Pages/Index.cshtml.cs?name=snippet_PageModel\\&highlight=12](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/app-secrets.md)

For more information, see [Access configuration in Startup](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23access-configuration-in-startup) and [Access configuration in Razor Pages](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23access-configuration-in-razor-pages).

## Map secrets to a POCO

Mapping an entire object literal to a POCO (a simple .NET class with properties) is useful for aggregating related properties.

Assume the application _secrets.json_ file contains the following two secrets:

```json 
{
  "Movies:ConnectionString": "Server=(localdb)\\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true",
  "Movies:ServiceApiKey": "12345"
}
```



To map the preceding secrets to a POCO, use the .NET Configuration API's [object graph binding](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23bind-an-array) feature. The following code binds to a custom `MovieSettings` POCO and accesses the `ServiceApiKey` property value:

[Code reference unavailable in this source snapshot: app-secrets/includes/~/security/app-secrets/samples/3.x/UserSecrets/Startup3.cs?name=snippet_BindToObjectGraph](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/app-secrets.md)

The `Movies:ConnectionString` and `Movies:ServiceApiKey` secrets are mapped to the respective properties in `MovieSettings`:

[Code reference unavailable in this source snapshot: app-secrets/includes/~/security/app-secrets/samples/3.x/UserSecrets/Models/MovieSettings.cs?name=snippet_MovieSettingsClass](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/app-secrets.md)

## String replacement with secrets

Storing passwords in plain text is insecure. Never store secrets in a configuration file such as `appsettings.json`, which might get checked in to a source code repository.

For example, a database connection string stored in `appsettings.json` should not include a password. Instead, store the password as a secret, and include the password in the connection string at runtime. For example:

```dotnetcli
dotnet user-secrets set "DbPassword" "<secret value>"
```

Replace the `<secret value>` placeholder in the preceding example with the password value. Set the secret's value on a [System.Data.SqlClient.SqlConnectionStringBuilder](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnectionStringBuilder) object's [System.Data.SqlClient.SqlConnectionStringBuilder.Password%2A](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlConnectionStringBuilder.Password%252A) property to include it as the password value in the connection string:

[Code reference unavailable in this source snapshot: app-secrets/includes/~/security/app-secrets/samples/6.x/UserSecrets/Program.cs?name=snippet_sql\\&highlight=5-8](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/security/app-secrets.md)

## List the secrets

Assume the application _secrets.json_ file contains the following two secrets:

```json 
{
  "Movies:ConnectionString": "Server=(localdb)\\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true",
  "Movies:ServiceApiKey": "12345"
}
```



Run the following command from the directory in which the project file exists:

```dotnetcli
dotnet user-secrets list
```

The following output appears:

```console
Movies:ConnectionString = Server=(localdb)\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true
Movies:ServiceApiKey = 12345
```

In the preceding example, a colon in the key names denotes the object hierarchy within `secrets.json`.

## Remove a single secret

Assume the application _secrets.json_ file contains the following two secrets:

```json 
{
  "Movies:ConnectionString": "Server=(localdb)\\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true",
  "Movies:ServiceApiKey": "12345"
}
```



Run the following command from the directory in which the project file exists:

```dotnetcli
dotnet user-secrets remove "Movies:ConnectionString"
```

The app's `secrets.json` file was modified to remove the key-value pair associated with the `MoviesConnectionString` key:

```json
{
  "Movies": {
    "ServiceApiKey": "12345"
  }
}
```

`dotnet user-secrets list` displays the following message:

```console
Movies:ServiceApiKey = 12345
```

## Remove all secrets

Assume the application _secrets.json_ file contains the following two secrets:

```json 
{
  "Movies:ConnectionString": "Server=(localdb)\\mssqllocaldb;Database=Movie-1;Trusted_Connection=True;MultipleActiveResultSets=true",
  "Movies:ServiceApiKey": "12345"
}
```



Run the following command from the directory in which the project file exists:

```dotnetcli
dotnet user-secrets clear
```

All user secrets for the app have been deleted from the `secrets.json` file:

```json
{}
```

Running `dotnet user-secrets list` displays the following message:

```console
No secrets configured for this application.
```

<a name="muswvs"></a>

## Manage user secrets with Visual Studio

To manage user secrets in Visual Studio, right click the project in solution explorer and select **Manage User Secrets**:

Visual Studio showing Manage User Secrets

## Migrating User Secrets from ASP.NET Framework to ASP.NET Core

See [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/27611).

## User secrets in non-web applications 

Projects that target `Microsoft.NET.Sdk.Web` automatically include support for user secrets. For projects that target `Microsoft.NET.Sdk`, such as console applications, install the configuration extension and user secrets NuGet packages explicitly.

Using PowerShell:

```powershell
Install-Package Microsoft.Extensions.Configuration
Install-Package Microsoft.Extensions.Configuration.UserSecrets
```

Using the .NET CLI:

```dotnetcli
dotnet add package Microsoft.Extensions.Configuration
dotnet add package Microsoft.Extensions.Configuration.UserSecrets
```

Once the packages are installed, [initialize the project](#enable-secret-storage) and [set secrets](#set-a-secret) the same way as for a web app. The following example shows a console application that retrieves the value of a secret that was set with the key "AppSecret":

```csharp
using Microsoft.Extensions.Configuration;

namespace ConsoleApp;

class Program
{
    static void Main(string[] args)
    {
        IConfigurationRoot config = new ConfigurationBuilder()
            .AddUserSecrets<Program>()
            .Build();

        Console.WriteLine(config["AppSecret"]);
    }
}
```

## Additional resources

* See [this issue](https://github.com/dotnet/AspNetCore.Docs/issues/30378) and [this issue](https://github.com/dotnet/AspNetCore.Docs/issues/16328) for information on accessing user secrets from IIS.
* [fundamentals/configuration/index](../fundamentals/configuration/index.md)
* [security/key-vault-configuration](key-vault-configuration.md)
