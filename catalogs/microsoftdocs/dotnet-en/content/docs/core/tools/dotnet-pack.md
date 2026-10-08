---
title: dotnet pack command
description: The dotnet pack command creates NuGet packages for your .NET project.
ms.date: 04/02/2026
ai-usage: ai-assisted
---
# dotnet pack

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet pack` - Packs the code into a NuGet package.

## Synopsis

```dotnetcli
dotnet pack [<PROJECT>|<SOLUTION>|<NUSPEC>|<FILE>]
    [--artifacts-path <ARTIFACTS_DIR>] [-c|--configuration <CONFIGURATION>]
    [--disable-build-servers] [--force] [--include-source] [--include-symbols]
    [--interactive] [--no-build] [--no-dependencies] [--no-restore] [--nologo]
    [-o|--output <OUTPUT_DIRECTORY>] [-p|--property:<PROPERTYNAME>=<VALUE>]
    [--runtime <RUNTIME_IDENTIFIER>]
    [-s|--serviceable] [--tl:[auto|on|off]] [-v|--verbosity <LEVEL>]
    [--version <VERSION>] [--version-suffix <VERSION_SUFFIX>]

dotnet pack -h|--help
```

## Description

The `dotnet pack` command builds the project and creates NuGet packages. The result of this command is a NuGet package (that is, a *.nupkg* file).

Starting with .NET 10, you can also pass a *.nuspec* file or a file-based app (*.cs* file) directly as the argument. When you pass a *.nuspec* file, `dotnet pack` creates the package from the *.nuspec* file without requiring a project file and without running MSBuild. When you pass a file-based app, `dotnet pack` packs it without a project file.

If you want to generate a package that contains the debug symbols, you have two options available:

- `--include-symbols` - it creates the symbols package.
- `--include-source` - it creates the symbols package with a `src` folder inside containing the source files.

NuGet dependencies of the packed project are added to the *.nuspec* file, so they're properly resolved when the package is installed. If the packed project has references to other projects, the other projects aren't included in the package. Currently, you must have a package per project if you have project-to-project dependencies.

By default, `dotnet pack` builds the project first. If you wish to avoid this behavior, pass the `--no-build` option. This option is often useful in Continuous Integration (CI) build scenarios where you know the code was previously built.

> **Note:**
> In some cases, the implicit build cannot be performed. This can occur when `GeneratePackageOnBuild` is set, to avoid a cyclic dependency between build and pack targets. The build can also fail if there is a locked file or other issue.

> **Note:**
> Web projects aren't packable.

### Implicit restore

You don't have to run [`dotnet restore`](dotnet-restore.md) because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build`, `dotnet run`, `dotnet test`, `dotnet publish`, and `dotnet pack`. To disable implicit restore, use the `--no-restore` option.

The `dotnet restore` command is still useful in certain scenarios where explicitly restoring makes sense, such as [continuous integration builds in Azure DevOps Services](https://learn.microsoft.com/azure/devops/build-release/apps/aspnet/build-aspnet-core) or in build systems that need to explicitly control when the restore occurs.

For information about how to manage NuGet feeds, see the [`dotnet restore` documentation](dotnet-restore.md).

This command supports the `dotnet restore` options when passed in the long form (for example, `--source`). Short form options, such as `-s`, are not supported.


### Workload manifest downloads

When you run this command, it initiates an asynchronous background download of advertising manifests for workloads. If the download is still running when this command finishes, the download is stopped. For more information, see [Advertising manifests](dotnet-workload-install.md#advertising-manifests).


## Arguments

`PROJECT | SOLUTION | NUSPEC | FILE`

  The project, solution, *.nuspec* file, or file-based app to pack.

- `PROJECT` is the path to a `.csproj`, `.vbproj`, or `.fsproj` file, or to a directory containing a project file.
- `SOLUTION` is the path to a solution file (`.sln` or `.slnx` extension), or to a directory containing a solution file.
- `NUSPEC` is the path to a `.nuspec` file. Available starting in .NET 10.
- `FILE` is the path to a file-based app (a C# file without a corresponding project file). Available starting in .NET 10. For more information, see [Build file-based C# apps](../../csharp/fundamentals/tutorials/file-based-programs.md).

  If not specified, the command searches the current directory for a project or solution file.

## Options

- **`--artifacts-path <ARTIFACTS_DIR>`**

All build output files from the executed command will go in subfolders under the specified path, separated by project. For more information see [Artifacts Output Layout](../sdk/artifacts-output.md). This option and the value provided must be explicitly cascaded in any `dotnet` command that depends on the output of another `dotnet` command, for example, when using `dotnet build --no-restore` and `dotnet publish --no-build`. Available since .NET 8 SDK.


- **`-c|--configuration <CONFIGURATION>`**

Defines the build configuration. If you're developing with the .NET 8 SDK or a later version, the command uses the `Release` configuration by default for projects whose TargetFramework is set to `net8.0` or a later version. The default build configuration is `Debug` for earlier versions of the SDK and for earlier target frameworks. You can override the default in project settings or by using this option. For more information, see ['dotnet publish' uses Release configuration](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/core/tools/includes/~/docs/core/compatibility/sdk/8.0/dotnet-publish-config.md) and ['dotnet pack' uses Release configuration](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/core/tools/includes/~/docs/core/compatibility/sdk/8.0/dotnet-pack-config.md).


- **`--disable-build-servers`**

Forces the command to ignore any persistent build servers. This option provides a consistent way to disable all use of build caching, which forces a build from scratch. A build that doesn't rely on caches is useful when the caches might be corrupted or incorrect for some reason. Available since .NET 7 SDK.


- **`--force`**

  Forces all dependencies to be resolved even if the last restore was successful. Specifying this flag is the same as deleting the *project.assets.json* file.

- **`--include-source`**

  Includes the debug symbols NuGet packages in addition to the regular NuGet packages in the output directory. The sources files are included in the `src` folder within the symbols package.

- **`--include-symbols`**

  Includes the debug symbols NuGet packages in addition to the regular NuGet packages in the output directory.

- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.


- **`--no-build`**

  Doesn't build the project before packing. It also implicitly sets the `--no-restore` flag.

- **`--no-dependencies`**

  Ignores project-to-project references and only restores the root project.

- **`--no-restore`**

  Doesn't execute an implicit restore when running the command.

- **`--nologo`**

  Doesn't display the startup banner or the copyright message.

- **`-o|--output <OUTPUT_DIRECTORY>`**

  Places the built packages in the directory specified.

  - .NET 7.0.200 SDK

    In the 7.0.200 SDK, if you specify the `--output` option when running this command on a solution, the CLI will emit an error. This is a regression and was fixed in 7.0.201 and later versions of the .NET SDK.

- **`-p|--property:<PROPERTYNAME>=<VALUE>`**

  Sets one or more MSBuild properties. When packing a *.nuspec* file directly, the properties are used for token replacement in the *.nuspec* file rather than as MSBuild properties. Specify multiple properties delimited by semicolons or by repeating the option:

  ```dotnetcli
  --property:<NAME1>=<VALUE1>;<NAME2>=<VALUE2>
  --property:<NAME1>=<VALUE1> --property:<NAME2>=<VALUE2>
  ```

  For more information, see [NuGet pack target properties](https://learn.microsoft.com/nuget/reference/msbuild-targets#pack-target) and [MSBuild command-line reference](https://learn.microsoft.com/visualstudio/msbuild/msbuild-command-line-reference).

- **`--runtime <RUNTIME_IDENTIFIER>`**

  Specifies the target runtime to restore packages for. For a list of Runtime Identifiers (RIDs), see the [RID catalog](../rid-catalog.md).

- **`-s|--serviceable`**

  Sets the serviceable flag in the package. For more information, see [.NET Blog: .NET Framework 4.5.1 Supports Microsoft Security Updates for .NET NuGet Libraries](https://aka.ms/nupkgservicing).

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

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. For more information, see [Microsoft.Build.Framework.LoggerVerbosity](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.LoggerVerbosity).


- **`--version <VERSION>`**

  The version of the package to create. When packing a *.nuspec* file, overrides the version number in the *.nuspec* file.

  > **Note:**
  > Available starting in .NET 10.

- **`--version-suffix <VERSION_SUFFIX>`**

  Defines the value for the `VersionSuffix` MSBuild property. The effect of this property on the package version depends on the values of the `Version` and `VersionPrefix` properties, as shown in the following table:

  | Properties with values | Package version |
  | --- | --- |
  | None | `1.0.0` |
  | `Version` | `$(Version)` |
  | `VersionPrefix` only | `$(VersionPrefix)` |
  | `VersionSuffix` only | `1.0.0-$(VersionSuffix)` |
  | `VersionPrefix` and `VersionSuffix` | `$(VersionPrefix)-$(VersionSuffix)` |

  If you want to use `--version-suffix`, specify `VersionPrefix` and not `Version` in the project file. For example, if `VersionPrefix` is `0.1.2` and you pass `--version-suffix rc.1` to `dotnet pack`, the package version will be `0.1.2-rc.1`.

  If `Version` has a value and you pass `--version-suffix` to `dotnet pack`, the value specified for `--version-suffix` is ignored.

- **`-?|-h|--help`**

Prints out a description of how to use the command.


## Examples

- Pack the project in the current directory:

  ```dotnetcli
  dotnet pack
  ```

- Pack the `app1` project:

  ```dotnetcli
  dotnet pack ~/projects/app1/project.csproj
  ```

- Pack the project in the current directory and place the resulting packages into the `nupkgs` folder:

  ```dotnetcli
  dotnet pack --output nupkgs
  ```

- Pack the project in the current directory into the `nupkgs` folder and skip the build step:

  ```dotnetcli
  dotnet pack --no-build --output nupkgs
  ```

- With the project's version suffix configured as `<VersionSuffix>$(VersionSuffix)</VersionSuffix>` in the *.csproj* file, pack the current project and update the resulting package version with the given suffix:

  ```dotnetcli
  dotnet pack --version-suffix "ci-1234"
  ```

- Set the package version to `2.1.0` with the `PackageVersion` MSBuild property:

  ```dotnetcli
  dotnet pack -p:PackageVersion=2.1.0
  ```

- Pack the project for a specific [target framework](../../standard/frameworks.md):

  ```dotnetcli
  dotnet pack -p:TargetFrameworks=net45
  ```

- Pack the project and use a specific runtime (Windows) for the restore operation:

  ```dotnetcli
  dotnet pack --runtime win-x64
  ```

- Pack the project in the current directory into a deterministic package (.NET 10.0.400 and later):

  ```dotnetcli
  dotnet pack -p:Deterministic=true -p:DeterministicTimestamp="2026-12-19T16:39:57-08:00"
  ```

- Pack the project using a *.nuspec* file (MSBuild project-based approach):

  ```dotnetcli
  dotnet pack ~/projects/app1/project.csproj -p:NuspecFile=~/projects/app1/project.nuspec -p:NuspecBasePath=~/projects/app1/nuget
  ```

  For information about how to use `NuspecFile`, `NuspecBasePath`, and `NuspecProperties`, see the following resources:

  - [Packing using a .nuspec](https://learn.microsoft.com/nuget/reference/msbuild-targets#packing-using-a-nuspec)
  - [Advanced extension points to create customized package](https://learn.microsoft.com/nuget/reference/msbuild-targets#advanced-extension-points-to-create-customized-package)
  - [Global properties](https://learn.microsoft.com/visualstudio/msbuild/msbuild-properties#global-properties)

- Pack a *.nuspec* file directly, without a project file (.NET 10 and later):

  ```dotnetcli
  dotnet pack MyPackage.nuspec --output ./artifacts

  ```dotnetcli
  dotnet pack MyPackage.nuspec --version 1.2.3 --output ./artifacts
  ```

- Pack a *.nuspec* file directly and use token replacement (.NET 10 and later):

  ```dotnetcli
  dotnet pack MyPackage.nuspec --property:Version=1.2.3 --property:Configuration=Release --output ./artifacts
  ```
