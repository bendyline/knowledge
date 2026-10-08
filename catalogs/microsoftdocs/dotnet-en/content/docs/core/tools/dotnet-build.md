---
title: dotnet build command
description: The dotnet build command builds a project and all of its dependencies.
ms.date: 05/18/2026
---

# dotnet build

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet build` - Builds a project, solution, or file-based app and all of its dependencies.

## Synopsis

```dotnetcli
dotnet build [<PROJECT>|<SOLUTION>|<FILE>] [-a|--arch <ARCHITECTURE>]
    [--artifacts-path <ARTIFACTS_DIR>]  [-bl|--binaryLogger:<FILE>]
    [-c|--configuration <CONFIGURATION>] [--disable-build-servers]
    [-f|--framework <FRAMEWORK>] [--force] [--interactive]
    [--no-dependencies] [--no-incremental] [--no-restore] [--nologo]
    [--no-self-contained] [-o|--output <OUTPUT_DIRECTORY>] [--os <OS>]
    [-p|--property:<PROPERTYNAME>=<VALUE>] [-r|--runtime <RUNTIME_IDENTIFIER>]
    [--sc|--self-contained] [--source <SOURCE>] [-t|--target:<TARGET>]
    [--tl:[auto|on|off]] [ --ucr|--use-current-runtime]
    [-v|--verbosity <LEVEL>] [--version-suffix <VERSION_SUFFIX>]

dotnet build -h|--help
```

## Description

The `dotnet build` command builds the project, solution, or file-based app and its dependencies into a set of binaries. The binaries include the project's code in Intermediate Language (IL) files with a *.dll* extension. Depending on the project type and settings, other files may be included, such as:

- An executable that can be used to run the application.
- Symbol files used for debugging with a *.pdb* extension.
- A *.deps.json* file, which lists the dependencies of the application or library.
- A *.runtimeconfig.json* file, which specifies the shared runtime and its version for an application.
- Other libraries that the project depends on (via project references or NuGet package references).

For executable projects targeting .NET Core 3.0 and later, library dependencies are copied to the output folder. This means that if there isn't any other publish-specific logic (such as Web projects have), the build output should be deployable.

### Implicit restore

Building requires the *project.assets.json* file, which lists the dependencies of your application. The file is created when [`dotnet restore`](dotnet-restore.md) is executed. Without the assets file in place, the tooling can't resolve reference assemblies, which results in errors.

You don't have to run [`dotnet restore`](dotnet-restore.md) because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build`, `dotnet run`, `dotnet test`, `dotnet publish`, and `dotnet pack`. To disable implicit restore, use the `--no-restore` option.

The `dotnet restore` command is still useful in certain scenarios where explicitly restoring makes sense, such as [continuous integration builds in Azure DevOps Services](https://learn.microsoft.com/azure/devops/build-release/apps/aspnet/build-aspnet-core) or in build systems that need to explicitly control when the restore occurs.

For information about how to manage NuGet feeds, see the [`dotnet restore` documentation](dotnet-restore.md).

This command supports the `dotnet restore` options when passed in the long form (for example, `--source`). Short form options, such as `-s`, are not supported.


### Executable or library output

Whether the project is executable or not is determined by the `<OutputType>` property in the project file. The following example shows a project that produces executable code:

```xml
<PropertyGroup>
  <OutputType>Exe</OutputType>
</PropertyGroup>
```

To produce a library, omit the `<OutputType>` property or change its value to `Library`. The IL DLL for a library doesn't contain entry points and can't be executed.

### MSBuild

`dotnet build` uses MSBuild to build the project, solution, or file-based app. It supports both parallel and incremental builds. For more information, see [Incremental Builds](https://learn.microsoft.com/visualstudio/msbuild/incremental-builds).

In addition to its options, the `dotnet build` command accepts MSBuild options, such as `-p` for setting properties or `-l` to define a logger. For more information about these options, see the [MSBuild Command-Line Reference](https://learn.microsoft.com/visualstudio/msbuild/msbuild-command-line-reference). Or you can also use the [dotnet msbuild](dotnet-msbuild.md) command.

> **Note:**
> When `dotnet build` is run automatically by `dotnet run`, arguments like `-property:property=value` aren't respected.

Running `dotnet build` is equivalent to running `dotnet msbuild -restore`; however, the default verbosity of the output is different.

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


- **`-bl|--binaryLogger:<FILE>`**

  Enables the binary logger and optionally specifies the output file name.  
  If no file name is provided, the default is `msbuild.binlog` in the current directory.

  The binary log contains detailed build information and can be opened with the
  [MSBuild Structured Log Viewer](https://msbuildlog.com).

  ```dotnetcli
  dotnet build -bl
  dotnet build -bl:build-log.binlog
  ```

- **`-c|--configuration <CONFIGURATION>`**

Defines the build configuration. The default for most projects is `Debug`, but you can override the build configuration settings in your project.


- **`--disable-build-servers`**

Forces the command to ignore any persistent build servers. This option provides a consistent way to disable all use of build caching, which forces a build from scratch. A build that doesn't rely on caches is useful when the caches might be corrupted or incorrect for some reason. Available since .NET 7 SDK.


- **`-f|--framework <FRAMEWORK>`**

  Compiles for a specific [framework](../../standard/frameworks.md). The framework must be defined in the [project file](../project-sdk/overview.md). Examples: `net7.0`, `net462`.

- **`--force`**

  Forces all dependencies to be resolved even if the last restore was successful. Specifying this flag is the same as deleting the *project.assets.json* file.

- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.


- **`--no-dependencies`**

  Ignores project-to-project (P2P) references and only builds the specified root project.

- **`--no-incremental`**

  Marks the build as unsafe for incremental build. This flag turns off incremental compilation and forces a clean rebuild of the project's dependency graph.

- **`--no-restore`**

  Doesn't execute an implicit restore during build.

- **`--nologo`**

  Doesn't display the startup banner or the copyright message.

- **`--no-self-contained`**

Publish your application as a framework-dependent application. A compatible .NET runtime must be installed on the target machine to run your application.


- **`-o|--output <OUTPUT_DIRECTORY>`**

  Directory in which to place the built binaries. If not specified, the default path is `./bin/<configuration>/<framework>/`.  For projects with multiple target frameworks (via the `TargetFrameworks` property), you also need to define `--framework` when you specify this option.

  - .NET 7.0.200 SDK and later

    If you specify the `--output` option when running this command on a solution, the CLI will emit a warning (an error in 7.0.200) due to the unclear semantics of the output path. The `--output` option is disallowed because all outputs of all built projects would be copied into the specified directory, which isn't compatible with multi-targeted projects, as well as projects that have different versions of direct and transitive dependencies. For more information, see [Solution-level `--output` option no longer valid for build-related commands](../compatibility/sdk/7.0/solution-level-output-no-longer-valid.md).

- **`--os <OS>`**

Specifies the target operating system (OS). This is a shorthand syntax for setting the [Runtime Identifier (RID)](../rid-catalog.md), where the provided value is combined with the default RID. For example, on a `win-x64` machine, specifying `--os linux` sets the RID to `linux-x64`. If you use this option, don't use the `-r|--runtime` option. Available since .NET 6.


- **`-p|--property:<PROPERTYNAME>=<VALUE>`**

  Sets one or more MSBuild properties. Specify multiple properties delimited by semicolons or by repeating the option:

  ```dotnetcli
  --property:<NAME1>=<VALUE1>;<NAME2>=<VALUE2>
  --property:<NAME1>=<VALUE1> --property:<NAME2>=<VALUE2>
  ```

- **`-r|--runtime <RUNTIME_IDENTIFIER>`**

  Specifies the target runtime. For a list of Runtime Identifiers (RIDs), see the [RID catalog](../rid-catalog.md). If you use this option with .NET 6 SDK, use `--self-contained` or `--no-self-contained` also. If not specified, the default is to build for the current OS and architecture.

- **`--sc|--self-contained`**

Publish the .NET runtime with your application so the runtime doesn't need to be installed on the target machine.


- **`--source <SOURCE>`**

  The URI of the NuGet package source to use during the restore operation.

- **`-t|--target:<TARGET>`**

  Specifies one or more MSBuild targets to run during the build instead of the default target. Specify multiple targets by separating them with a semicolon or comma, or by repeating the option for each target. Corresponds to the MSBuild `-target` option. Common targets include `Build` (default), `Clean`, and `Rebuild`. For more information, see [MSBuild Targets](https://learn.microsoft.com/visualstudio/msbuild/msbuild-targets).

  ```dotnetcli
  dotnet build -t:"Clean;RunTests"
  dotnet build -t:Clean -t:GenerateApiClients
  dotnet build -t:RunCodeGeneration
  ```

- **`--tl:[auto|on|off]`**

Specifies whether *Terminal Logger* should be used for the build output. The default is `auto`, which first verifies the environment before enabling terminal logging. The environment check verifies that the terminal is capable of using modern output features and isn't using a redirected standard output before enabling the new logger. `on` skips the environment check and enables terminal logging. `off` skips the environment check and uses the default console logger.

Terminal Logger shows you the restore phase followed by the build phase. During each phase, the currently building projects appear at the bottom of the terminal. Each project that's building outputs both the MSBuild target currently being built and the amount of time spent on that target. You can search this information to learn more about the build. When a project is finished building, a single "build completed" section is written that captures:

- The name of the built project.
- The target framework (if multi-targeted).
- The status of that build.
- The primary output of that build (which is hyperlinked).
- Any diagnostics generated for that project.

This option is available starting in .NET 8.


- **`--ucr|--use-current-runtime`**

Use the current runtime as the target runtime.


- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. For more information, see [Microsoft.Build.Framework.LoggerVerbosity](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.LoggerVerbosity).


- **`--version-suffix <VERSION_SUFFIX>`**

  Sets the value of the `$(VersionSuffix)` property to use when building the project. This only works if the `$(Version)` property isn't set. Then, `$(Version)` is set to the `$(VersionPrefix)` combined with the `$(VersionSuffix)`, separated by a dash.

- **`-?|-h|--help`**

Prints out a description of how to use the command.


## Examples

- Build a project and its dependencies:

  ```dotnetcli
  dotnet build
  ```

- Build a file-based app:

  ```dotnetcli
  dotnet build MyProject.cs
  ```

  File-based app support was added in .NET SDK 10.0.100.

- Build a project and its dependencies using Release configuration:

  ```dotnetcli
  dotnet build --configuration Release
  ```

- Build a project and its dependencies for a specific runtime (in this example, Linux):

  ```dotnetcli
  dotnet build --runtime linux-x64
  ```

- Build the project and use the specified NuGet package source during the restore operation:

  ```dotnetcli
  dotnet build --source c:\packages\mypackages
  ```

- Build the project and set version 1.2.3.4 as a build parameter using the `-p` [MSBuild option](#msbuild):

  ```dotnetcli
  dotnet build -p:Version=1.2.3.4
  ```

- Run the `Clean` target to remove previous build outputs:

  ```dotnetcli
  dotnet build -t:Clean
  ```

- Run the `Clean` target using the equivalent space-separated syntax:

  ```dotnetcli
  dotnet build -t Clean
  ```
