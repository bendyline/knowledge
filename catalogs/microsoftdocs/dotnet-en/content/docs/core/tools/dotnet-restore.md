---
title: dotnet restore command
description: Learn how to restore dependencies and project-specific tools with the dotnet restore command.
ms.date: 09/29/2025
---
# dotnet restore

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet restore` - Restores the dependencies and tools of a project.

## Synopsis

```dotnetcli
dotnet restore [<PROJECT>|<SOLUTION>|<FILE>]
  [-a|--arch <ARCHITECTURE>] [--artifacts-path <ARTIFACTS_DIR>] [--configfile <FILE>]
  [--disable-build-servers] [--disable-parallel] [-f|--force] [--force-evaluate]
  [--ignore-failed-sources] [--interactive] [--lock-file-path <LOCK_FILE_PATH>]
  [--locked-mode] [--no-dependencies] [--no-http-cache]
  [--os <OS>] [--packages <PACKAGES_DIRECTORY>]
  [-r|--runtime <RUNTIME_IDENTIFIER>] [-s|--source <SOURCE>]
  [--tl:[auto|on|off]] [--ucr|--use-current-runtime] [--use-lock-file]
  [-v|--verbosity <LEVEL>]

dotnet restore -h|--help
```

## Description

A .NET project typically references external libraries in [NuGet](https://www.nuget.org) packages that provide additional functionality. These external dependencies are referenced in the project file (*.csproj* or *.vbproj*). When you run the `dotnet restore` command, the .NET CLI uses NuGet to look for these dependencies and download them if necessary. It also ensures that all the dependencies required by the project are compatible with each other and that there are no conflicts between them. Once the command is completed, all the dependencies required by the project are available in a local cache and can be used by the .NET CLI to build and run the application.

In most cases, you don't need to explicitly use the `dotnet restore` command, since if a NuGet restore is necessary, the following commands run it implicitly:

- [`dotnet new`](dotnet-new.md)
- [`dotnet build`](dotnet-build.md)
- [`dotnet build-server`](dotnet-build-server.md)
- [`dotnet run`](dotnet-run.md)
- [`dotnet test`](dotnet-test.md)
- [`dotnet publish`](dotnet-publish.md)
- [`dotnet pack`](dotnet-pack.md)

Sometimes, it might be inconvenient to run the implicit NuGet restore with these commands. For example, some automated systems, such as build systems, need to call `dotnet restore` explicitly to control when the restore occurs so that they can control network usage. To prevent the implicit NuGet restore, you can use the `--no-restore` flag with any of these commands.

  > **Note:**
  > Signed package verification during restore operations requires a certificate root store that is valid for both code signing and timestamping. For more information, see [NuGet signed package verification](nuget-signed-package-verification.md).

### Specify feeds

To restore the dependencies, NuGet needs the feeds where the packages are located. Feeds are usually provided via the *nuget.config* configuration file. A default configuration file is provided when the .NET SDK is installed. To specify additional feeds, do one of the following:

- Create your own *nuget.config* file in the project directory. For more information, see [Common NuGet configurations](https://learn.microsoft.com/nuget/consume-packages/configuring-nuget-behavior) and [nuget.config differences](#nugetconfig-differences) later in this article.
- Use `dotnet nuget` commands such as [`dotnet nuget add source`](dotnet-nuget-add-source.md).

You can override the *nuget.config* feeds with the `-s` option.

For information about how to use authenticated feeds, see [Consuming packages from authenticated feeds](https://learn.microsoft.com/nuget/consume-packages/consuming-packages-authenticated-feeds).

### Global packages folder

For dependencies, you can specify where the restored packages are placed during the restore operation using the `--packages` argument. If not specified, the default NuGet package cache is used, which is found in the `.nuget/packages` directory in the user's home directory on all operating systems. For example, */home/user1* on Linux or *C:\Users\user1* on Windows.

### Project-specific tooling

For project-specific tooling, `dotnet restore` first restores the package in which the tool is packed, and then proceeds to restore the tool's dependencies as specified in its project file.

### nuget.config differences

The behavior of the `dotnet restore` command is affected by the settings in the *nuget.config* file, if present. For example, setting the `globalPackagesFolder` in *nuget.config* places the restored NuGet packages in the specified folder. This is an alternative to specifying the `--packages` option on the `dotnet restore` command. For more information, see the [nuget.config reference](https://learn.microsoft.com/nuget/schema/nuget-config-file).

There are three specific settings that `dotnet restore` ignores:

- [bindingRedirects](https://learn.microsoft.com/nuget/schema/nuget-config-file#bindingredirects-section)

  Binding redirects don't work with `<PackageReference>` elements and .NET only supports `<PackageReference>` elements for NuGet packages.

- [solution](https://learn.microsoft.com/nuget/schema/nuget-config-file#solution-section)

  This setting is Visual Studio specific and doesn't apply to .NET. .NET doesn't use a `packages.config` file and instead uses `<PackageReference>` elements for NuGet packages.

- [trustedSigners](https://learn.microsoft.com/nuget/schema/nuget-config-file#trustedsigners-section)

  Support for cross-platform package signature verification was added in the .NET 5.0.100 SDK.

### Workload manifest downloads

When you run this command, it initiates an asynchronous background download of advertising manifests for workloads. If the download is still running when this command finishes, the download is stopped. For more information, see [Advertising manifests](dotnet-workload-install.md#advertising-manifests).


## Arguments


`PROJECT | SOLUTION | FILE`

The project or solution or C# (file-based app) file to operate on. If a file isn't specified, MSBuild searches the current directory for a project or solution.

- `PROJECT` is the path and filename of a C#, F#, or Visual Basic project file, or the path to a directory that contains a C#, F#, or Visual Basic project file.

- `SOLUTION` is the path and filename of a solution file (*.sln* or *.slnx* extension), or the path to a directory that contains a solution file.

- `FILE` is an argument added in .NET 10. The path and filename of a file-based app. File-based apps are contained within a single file that is built and run without a corresponding project (*.csproj*) file. For more information, see [Build file-based C# apps](../../csharp/fundamentals/tutorials/file-based-programs.md).


## Options

- **`-a|--arch <ARCHITECTURE>`**

Specifies the target architecture. This is a shorthand syntax for setting the [Runtime Identifier (RID)](../rid-catalog.md), where the provided value is combined with the default RID. For example, on a `win-x64` machine, specifying `--arch x86` sets the RID to `win-x86`. If you use this option, don't use the `-r|--runtime` option. Available since .NET 6 Preview 7.


- **`--artifacts-path <ARTIFACTS_DIR>`**

All build output files from the executed command will go in subfolders under the specified path, separated by project. For more information see [Artifacts Output Layout](../sdk/artifacts-output.md). This option and the value provided must be explicitly cascaded in any `dotnet` command that depends on the output of another `dotnet` command, for example, when using `dotnet build --no-restore` and `dotnet publish --no-build`. Available since .NET 8 SDK.


- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see [Common NuGet Configurations](https://learn.microsoft.com/nuget/consume-packages/configuring-nuget-behavior).


- **`--disable-build-servers`**

Forces the command to ignore any persistent build servers. This option provides a consistent way to disable all use of build caching, which forces a build from scratch. A build that doesn't rely on caches is useful when the caches might be corrupted or incorrect for some reason. Available since .NET 7 SDK.


- **`--disable-parallel`**

  Disables restoring multiple projects in parallel.

- **`--force`**

  Forces all dependencies to be resolved even if the last restore was successful. Specifying this flag is the same as deleting the *project.assets.json* file.

- **`--force-evaluate`**

  Forces restore to reevaluate all dependencies even if a lock file already exists.

- **`--ignore-failed-sources`**

  Only warn about failed sources if there are packages meeting the version requirement.

- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.


- **`--lock-file-path <LOCK_FILE_PATH>`**

  Output location where project lock file is written. By default, this is *PROJECT_ROOT\packages.lock.json*.

- **`--locked-mode`**

  Don't allow updating project lock file.

- **`--no-dependencies`**

  When restoring a project with project-to-project (P2P) references, restores the root project and not the references.

- **`--no-http-cache`**

  Disable HTTP caching for packages.

- **`--os`**

  Specifies the target operating system (OS). This is a shorthand syntax for setting the Runtime Identifier (RID), where the provided value is combined with the default RID. For example, on a `win-x64` machine, specifying `--os linux` sets the RID to `linux-x64`.

  Introduced in .NET SDK 10.0.100

- **`--packages <PACKAGES_DIRECTORY>`**

  Specifies the directory for restored packages.

- **`-r|--runtime <RUNTIME_IDENTIFIER>`**

  Specifies a runtime for the package restore. This is used to restore packages for runtimes not explicitly listed in the `<RuntimeIdentifiers>` tag in the *.csproj* file. For a list of Runtime Identifiers (RIDs), see the [RID catalog](../rid-catalog.md).

- **`-s|--source <SOURCE>`**

  Specifies the URI of the NuGet package source to use during the restore operation. This setting overrides all of the sources specified in the *nuget.config* files. Multiple sources can be provided by specifying this option multiple times.

- **`--ucr|--use-current-runtime`**

Use the current runtime as the target runtime.


- **`--use-lock-file`**

  Enables project lock file to be generated and used with restore.

- **`--tl:[auto|on|off]`**

Specifies whether *Terminal Logger* should be used for the build output. The default is `auto`, which first verifies the environment before enabling terminal logging. The environment check verifies that the terminal is capable of using modern output features and isn't using a redirected standard output before enabling the new logger. `on` skips the environment check and enables terminal logging. `off` skips the environment check and uses the default console logger.

Terminal Logger shows you the restore phase followed by the build phase. During each phase, the currently building projects appear at the bottom of the terminal. Each project that's building outputs both the MSBuild target currently being built and the amount of time spent on that target. You can search this information to learn more about the build. When a project is finished building, a single "build completed" section is written that captures:

- The name of the built project.
- The target framework (if multi-targeted).
- The status of that build.
- The primary output of that build (which is hyperlinked).
- Any diagnostics generated for that project.

This option is available starting in .NET 8.


- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. The default is `minimal`. For more information, see [Microsoft.Build.Framework.LoggerVerbosity](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.LoggerVerbosity).


- **`-?|-h|--help`**

Prints out a description of how to use the command.


## Examples

- Restore dependencies and tools for the project in the current directory:

  ```dotnetcli
  dotnet restore
  ```

- Restore dependencies and tools for the `app1` project found in the given path:

  ```dotnetcli
  dotnet restore ./projects/app1/app1.csproj
  ```

- Restore the dependencies and tools for the project in the current directory using the file path provided as the source:

  ```dotnetcli
  dotnet restore -s c:\packages\mypackages
  ```

- Restore the dependencies and tools for the project in the current directory using the two file paths provided as sources:

  ```dotnetcli
  dotnet restore -s c:\packages\mypackages -s c:\packages\myotherpackages
  ```

- Restore dependencies and tools for the project in the current directory showing detailed output:

  ```dotnetcli
  dotnet restore --verbosity detailed
  ```

## Audit for security vulnerabilities

Starting in .NET 8, `dotnet restore` includes NuGet security auditing. This auditing produces a report of security vulnerabilities with the affected package name, the severity of the vulnerability, and a link to the advisory for more details.

To opt out of the security auditing, set the `<NuGetAudit>` MSBuild property to `false` in your project file.

To get vulnerability data, starting in .NET 9, you can use [`auditSources`](https://learn.microsoft.com/nuget/reference/nuget-config-file#auditsources) in addition to [`packageSources`](https://learn.microsoft.com/nuget/reference/nuget-config-file#packagesources). If no audit sources are provided, `dotnet restore` uses package sources instead. NuGet audits any source as long as the source provides the [`VulnerabilityInfo` resource](https://learn.microsoft.com/nuget/api/vulnerability-info).

To list NuGet.org as an audit source, define the following in the *nuget.config* file:

```xml
<configuration>
    <auditSources>
        <clear />
        <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
    </auditSources>
</configuration>
```

You can configure the level at which auditing will fail by setting the `<NuGetAuditLevel>` MSBuild property. Possible values are `low`, `moderate`, `high`, and `critical`. For example if you only want to see moderate, high, and critical advisories, you can set the property to `moderate`.

In .NET 8 and .NET 9, only *direct* package references are audited by default. Starting in .NET 10, NuGet audits both *direct* and *transitive* package references by default. You can change the mode by setting the `<NuGetAuditMode>` MSBuild property to `direct` or `all`.

For more information, see [Auditing package dependencies for security vulnerabilities](https://learn.microsoft.com/nuget/concepts/auditing-packages).
