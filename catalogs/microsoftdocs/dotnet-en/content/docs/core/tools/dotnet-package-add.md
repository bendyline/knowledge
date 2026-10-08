---
title: dotnet package add command
description: The 'dotnet package add' command provides a convenient option to add a NuGet package reference to a project.
ms.date: 10/28/2025
---
# dotnet package add

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet package add` - Adds or updates a package reference in a project file.

> **Note:**
> If you're using .NET 9 SDK or earlier, use the "verb first" form (`dotnet add package`) instead. The "noun first" form was introduced in .NET 10. For more information, see [More consistent command order](../whats-new/dotnet-10/sdk.md#more-consistent-command-order).

## Synopsis

```dotnetcli
dotnet package add <PACKAGE_NAME>
    [-f|--framework <FRAMEWORK>] [--interactive] [--project <PROJECT>]
    [-n|--no-restore] [--package-directory <PACKAGE_DIRECTORY>]
    [--prerelease] [-s|--source <SOURCE>] [-v|--version <VERSION>]

dotnet package add -h|--help
```

## Description

The `dotnet package add` command provides a convenient option to add or update a package reference in a project file. When you run the command, there's a compatibility check to ensure the package is compatible with the frameworks in the project. If the check passes and the package isn't referenced in the project file, a `<PackageReference>` element is added to the project file. If the check passes and the package is already referenced in the project file, the `<PackageReference>` element is updated to the latest compatible version. After the project file is updated, [dotnet restore](dotnet-restore.md) is run.

For example, adding `Microsoft.EntityFrameworkCore` to *ToDo.csproj* produces output similar to the following example:

```console
  Determining projects to restore...
  Writing C:\Users\username\AppData\Local\Temp\tmp24A8.tmp
info : Adding PackageReference for package 'Microsoft.EntityFrameworkCore' into project 'C:\ToDo\ToDo.csproj'.
info :   CACHE https://api.nuget.org/v3/registration5-gz-semver2/microsoft.entityframeworkcore/index.json
info :   GET https://pkgs.dev.azure.com/dnceng/9ee6d478-d288-47f7-aacc-f6e6d082ae6d/_packaging/516521bf-6417-457e-9a9c-0a4bdfde03e7/nuget/v3/registrations2-semver2/microsoft.entityframeworkcore/index.json
info :   CACHE https://api.nuget.org/v3/registration5-gz-semver2/microsoft.entityframeworkcore/page/0.0.1-alpha/3.1.3.json
info :   CACHE https://api.nuget.org/v3/registration5-gz-semver2/microsoft.entityframeworkcore/page/3.1.4/7.0.0-preview.2.22153.1.json
info :   CACHE https://api.nuget.org/v3/registration5-gz-semver2/microsoft.entityframeworkcore/page/7.0.0-preview.3.22175.1/7.0.0-preview.3.22175.1.json
info :   NotFound https://pkgs.dev.azure.com/dnceng/9ee6d478-d288-47f7-aacc-f6e6d082ae6d/_packaging/516521bf-6417-457e-9a9c-0a4bdfde03e7/nuget/v3/registrations2-semver2/microsoft.entityframeworkcore/index.json 257ms
info : Restoring packages for C:\ToDo\ToDo.csproj...
info : Package 'Microsoft.EntityFrameworkCore' is compatible with all the specified frameworks in project 'C:\ToDo\ToDo.csproj'.
info : PackageReference for package 'Microsoft.EntityFrameworkCore' version '6.0.4' added to file 'C:\ToDo\ToDo.csproj'.
info : Writing assets file to disk. Path: C:\ToDo\obj\project.assets.json
log  : Restored C:\ToDo\ToDo.csproj (in 171 ms).
```

The *ToDo.csproj* file now contains a [`<PackageReference>`](https://learn.microsoft.com/nuget/consume-packages/package-references-in-project-files) element for the referenced package.

```xml
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="6.0.4" />
```

If the project is onboarded onto [Central Package Management (CPM)](https://devblogs.microsoft.com/nuget/introducing-central-package-management/) the `<PackageVersion>` element in the `Directory.Packages.props file` is added/updated and the `<PackageReference>` element is added to the project file.

The following scenarios are currently supported. These examples assume that the latest version of `Microsoft.EntityFrameworkCore` is 6.0.4. Additional scenarios related to CPM are documented in [this design spec](https://github.com/NuGet/Home/pull/11915).

Scenario 1: `<PackageReference>` does not exist in the project file, `<PackageVersion>` element does not exist in the `Directory.Packages.props file`, and the version argument is not passed from the commandline.

  CLI command that is executed: `dotnet package add Microsoft.EntityFrameworkCore --project ToDo.csproj`

  The `<PackageVersion>` element is added to the `Directory.Packages.props file`.

  ```xml
  <PackageVersion Include="Microsoft.EntityFrameworkCore" Version="6.0.4" />
  ```

  The `<PackageReference>` element is added to the project file.

  ```xml
  <PackageReference Include="Microsoft.EntityFrameworkCore" />
  ```

Scenario 2: `<PackageReference>` does not exist in the project file, `<PackageVersion>` element does not exist in the `Directory.Packages.props file`, and the version argument is passed from the commandline.

  CLI command that is executed: `dotnet package add Microsoft.EntityFrameworkCore --version 5.0.4 --project ToDo.csproj`

  The `<PackageVersion>` element is added to the `Directory.Packages.props file`.

  ```xml
  <PackageVersion Include="Microsoft.EntityFrameworkCore" Version="5.0.4" />
  ```

  The `<PackageReference>` element is added to the project file.

  ```xml
  <PackageReference Include="Microsoft.EntityFrameworkCore" />
  ```

Scenario 3: `<PackageReference>` does not exist in the project file, `<PackageVersion>` element does exist in the `Directory.Packages.props file`, and the version argument is not passed from the commandline.

  CLI command that is executed: `dotnet package add Microsoft.EntityFrameworkCore --project ToDo.csproj`

  The `<PackageVersion>` element is added to the `Directory.Packages.props file`.

  ```xml
  <PackageVersion Include="Microsoft.EntityFrameworkCore" Version="6.0.4" />
  ```

The `<PackageReference>` element is added to the project file.

  ```xml
  <PackageReference Include="Microsoft.EntityFrameworkCore" />
  ```

Scenario 4: `<PackageReference>` does not exist in the project file, `<PackageVersion>` element does exist in the `Directory.Packages.props file`, and the version argument is passed from the commandline.

  CLI command that is executed: `dotnet package add Microsoft.EntityFrameworkCore --version 5.0.4 --project ToDo.csproj`

  The `<PackageVersion>` element is added to the `Directory.Packages.props file`.

  ```xml
  <PackageVersion Include="Microsoft.EntityFrameworkCore" Version="5.0.4" />
  ```

  The `<PackageReference>` element is added to the project file.

  ```xml
  <PackageReference Include="Microsoft.EntityFrameworkCore" />
  ```

### Implicit restore

You don't have to run [`dotnet restore`](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/docs/core/tools/dotnet-restore.md) because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build`, `dotnet run`, `dotnet test`, `dotnet publish`, and `dotnet pack`. To disable implicit restore, use the `--no-restore` option.

The `dotnet restore` command is still useful in certain scenarios where explicitly restoring makes sense, such as [continuous integration builds in Azure DevOps Services](https://learn.microsoft.com/azure/devops/build-release/apps/aspnet/build-aspnet-core) or in build systems that need to explicitly control when the restore occurs.

For information about how to manage NuGet feeds, see the [`dotnet restore` documentation](dotnet-restore.md).


## Arguments

- **`PROJECT`**

  Specifies the project file. If not specified, the command searches the current directory for one.

- **`PACKAGE_NAME`**

  The package reference to add.

## Options

- **`-f|--framework <FRAMEWORK>`**

  Adds a package reference only when targeting a specific [framework](../../standard/frameworks.md).

- **`-?|-h|--help`**

Prints out a description of how to use the command.


- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.


- **`-n|--no-restore`**

  Adds a package reference without performing a restore preview and compatibility check.

- **`--package-directory <PACKAGE_DIRECTORY>`**

  The directory where to restore the packages. The default package restore location is `%userprofile%\.nuget\packages` on Windows and `~/.nuget/packages` on macOS and Linux. For more information, see [Managing the global packages, cache, and temp folders in NuGet](https://learn.microsoft.com/nuget/consume-packages/managing-the-global-packages-and-cache-folders).

- **`--prerelease`**

  Allows prerelease packages to be installed.

- **`-s|--source <SOURCE>`**

  The URI of the NuGet package source to use during the restore operation.

- **`-v|--version <VERSION>`**

  Version of the package. See [NuGet package versioning](https://learn.microsoft.com/nuget/reference/package-versioning).

## Examples

- Add `Microsoft.EntityFrameworkCore` NuGet package to a project:

  ```dotnetcli
  dotnet package add Microsoft.EntityFrameworkCore
  ```

- Add a specific version of a package to a project:

  ```dotnetcli
  dotnet package add Microsoft.Azure.DocumentDB.Core -v 1.0.0 --project ToDo.csproj
  ```

- Add a package using a specific NuGet source:

  ```dotnetcli
  dotnet package add Microsoft.AspNetCore.StaticFiles -s https://dotnet.myget.org/F/dotnet-core/api/v3/index.json
  ```

## See also

- [Managing the global packages, cache, and temp folders in NuGet](https://learn.microsoft.com/nuget/consume-packages/managing-the-global-packages-and-cache-folders)
- [NuGet package versioning](https://learn.microsoft.com/nuget/reference/package-versioning)
