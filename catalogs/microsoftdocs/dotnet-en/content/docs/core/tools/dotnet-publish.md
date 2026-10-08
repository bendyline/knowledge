---
title: dotnet publish command
description: The dotnet publish command publishes a .NET project or solution to a directory.
ms.date: 09/24/2025
---
# dotnet publish

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet publish` - Publishes the application and its dependencies to a folder for deployment to a hosting system.

## Synopsis

```dotnetcli
dotnet publish [<PROJECT>|<SOLUTION>|<FILE>] [-a|--arch <ARCHITECTURE>]
    [--artifacts-path <ARTIFACTS_DIR>]
    [-c|--configuration <CONFIGURATION>] [--disable-build-servers]
    [-f|--framework <FRAMEWORK>] [--force] [--interactive]
    [--manifest <PATH_TO_MANIFEST_FILE>] [--no-build] [--no-dependencies]
    [--no-restore] [--nologo] [-o|--output <OUTPUT_DIRECTORY>]
    [--os <OS>] [-p|--property:<PROPERTYNAME>=<VALUE>]
    [-r|--runtime <RUNTIME_IDENTIFIER>]
    [--sc|--self-contained] [--no-self-contained]
    [-s|--source <SOURCE>] [--tl:[auto|on|off]]
    [--ucr|--use-current-runtime]
    [-v|--verbosity <LEVEL>] [--version-suffix <VERSION_SUFFIX>]

dotnet publish -h|--help
```

## Description

`dotnet publish` compiles the application, reads through its dependencies specified in the project file, and publishes the resulting set of files to a directory. The output includes the following assets:

- Intermediate Language (IL) code in an assembly with a *dll* extension.
- A *.deps.json* file that includes all of the dependencies of the project.
- A *.runtimeconfig.json* file that specifies the shared runtime that the application expects, as well as other configuration options for the runtime (for example, garbage collection type).
- The application's dependencies, which are copied from the NuGet cache into the output folder.

The `dotnet publish` command's output is ready for deployment to a hosting system (for example, a server, PC, Mac, laptop) for execution. It's the only officially supported way to prepare the application for deployment. Depending on the type of deployment that the project specifies, the hosting system may or may not have the .NET shared runtime installed on it. For more information, see [.NET application publishing overview](../deploying/index.md).

### Implicit restore

You don't have to run [`dotnet restore`](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/docs/core/tools/dotnet-restore.md) because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build`, `dotnet run`, `dotnet test`, `dotnet publish`, and `dotnet pack`. To disable implicit restore, use the `--no-restore` option.

The `dotnet restore` command is still useful in certain scenarios where explicitly restoring makes sense, such as [continuous integration builds in Azure DevOps Services](https://learn.microsoft.com/azure/devops/build-release/apps/aspnet/build-aspnet-core) or in build systems that need to explicitly control when the restore occurs.

For information about how to manage NuGet feeds, see the [`dotnet restore` documentation](dotnet-restore.md).


### MSBuild

The `dotnet publish` command calls MSBuild, which invokes the `Publish` target. If the [`IsPublishable` property](../project-sdk/msbuild-props.md#ispublishable) is set to `false` for a particular project, the `Publish` target can't be invoked, and the `dotnet publish` command only runs the implicit [dotnet restore](dotnet-restore.md) on the project.

Any parameters passed to `dotnet publish` are passed to MSBuild. The `-c` and `-o` parameters map to MSBuild's `Configuration` and `PublishDir` properties, respectively.

The `dotnet publish` command accepts MSBuild options, such as `-p` for setting properties and `-l` to define a logger. For example, you can set an MSBuild property by using the format: `-p:<NAME>=<VALUE>`.

### .pubxml files

You can also set publish-related properties by referring to a *.pubxml* file. For example:

```dotnetcli
dotnet publish -p:PublishProfile=FolderProfile
```

The preceding example uses the *FolderProfile.pubxml* file that is found in the *\<project_folder>/Properties/PublishProfiles* folder. If you specify a path and file extension when setting the `PublishProfile` property, they're ignored. MSBuild by default looks in the *Properties/PublishProfiles* folder and assumes the *pubxml* file extension. To specify the path and filename including extension, set the `PublishProfileFullPath` property instead of the `PublishProfile` property.

In the *.pubxml* file:

* `PublishUrl` is used by Visual Studio to denote the Publish target.
* `PublishDir` is used by the CLI to denote the Publish target.

If you want the scenario to work in all places, you can initialize both these properties to the same value in the *.pubxml* file. When GitHub issue [dotnet/sdk#20931](https://github.com/dotnet/sdk/issues/20931) is resolved, only one of these properties will need to be set.

Some properties in the *.pubxml* file are honored only by Visual Studio and have no effect on `dotnet publish`. We're working to bring the CLI more into alignment with Visual Studio's behavior. But some properties will never be used by the CLI. The CLI and Visual Studio both do the packaging aspect of publishing, and [dotnet/sdk#29817](https://github.com/dotnet/sdk/pull/29817) plans to add support for more properties related to that. But the CLI doesn't do the deployment automation aspect of publishing, and properties related to that aren't supported. The most notable *.pubxml* properties that aren't supported by `dotnet publish` are the following ones that impact the build:

* `LastUsedBuildConfiguration`
* `Configuration`
* `Platform`
* `LastUsedPlatform`
* `TargetFramework`
* `TargetFrameworks`
* `RuntimeIdentifier`
* `RuntimeIdentifiers`

### MSBuild properties

The following MSBuild properties change the output of `dotnet publish`.

- `PublishReadyToRun`

  Compiles application assemblies as ReadyToRun (R2R) format. R2R is a form of ahead-of-time (AOT) compilation. For more information, see [ReadyToRun images](../deploying/ready-to-run.md).

  To see warnings about missing dependencies that could cause runtime failures, use `PublishReadyToRunShowWarnings=true`.

  We recommend that you specify `PublishReadyToRun` in a publish profile rather than on the command line.

- `PublishSingleFile`

  Packages the app into a platform-specific single-file executable. For more information about single-file publishing, see the [single-file bundler design document](https://github.com/dotnet/designs/blob/main/accepted/2020/single-file/design.md). When this property is set to `true`, the `PublishSelfContained` property is implicitly set to `true`.

  We recommend that you specify this option in the project file rather than on the command line.

- `PublishTrimmed`

  Trims unused libraries to reduce the deployment size of an app when publishing a self-contained executable. For more information, see [Trim self-contained deployments and executables](../deploying/trimming/trim-self-contained.md). Available since .NET 6 SDK.

  We recommend that you specify this option in the project file rather than on the command line.

For more information, see the following resources:

- [MSBuild command-line reference](https://learn.microsoft.com/visualstudio/msbuild/msbuild-command-line-reference)
- [Visual Studio publish profiles (.pubxml) for ASP.NET Core app deployment](https://learn.microsoft.com/aspnet/core/host-and-deploy/visual-studio-publish-profiles)
- [dotnet msbuild](dotnet-msbuild.md)

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


- **`-c|--configuration <CONFIGURATION>`**

Defines the build configuration. If you're developing with the .NET 8 SDK or a later version, the command uses the `Release` configuration by default for projects whose TargetFramework is set to `net8.0` or a later version. The default build configuration is `Debug` for earlier versions of the SDK and for earlier target frameworks. You can override the default in project settings or by using this option. For more information, see ['dotnet publish' uses Release configuration](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/core/tools/includes/~/docs/core/compatibility/sdk/8.0/dotnet-publish-config.md) and ['dotnet pack' uses Release configuration](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/core/tools/includes/~/docs/core/compatibility/sdk/8.0/dotnet-pack-config.md).


- **`--disable-build-servers`**

Forces the command to ignore any persistent build servers. This option provides a consistent way to disable all use of build caching, which forces a build from scratch. A build that doesn't rely on caches is useful when the caches might be corrupted or incorrect for some reason. Available since .NET 7 SDK.


- **`-f|--framework <FRAMEWORK>`**

  Publishes the application for the specified [target framework](../../standard/frameworks.md). You must specify the target framework in the project file.

- **`--force`**

  Forces all dependencies to be resolved even if the last restore was successful. Specifying this flag is the same as deleting the *project.assets.json* file.

- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.


- **`--manifest <PATH_TO_MANIFEST_FILE>`**

  Specifies one or several [target manifests](../deploying/runtime-store.md) to use to trim the set of packages published with the app. The manifest file is part of the output of the [`dotnet store` command](dotnet-store.md). To specify multiple manifests, add a `--manifest` option for each manifest.

- **`--no-build`**

  Doesn't build the project before publishing. It also implicitly sets the `--no-restore` flag.

- **`--no-dependencies`**

  Ignores project-to-project references and only restores the root project.

- **`--nologo`**

  Doesn't display the startup banner or the copyright message.

- **`--no-restore`**

  Doesn't execute an implicit restore when running the command.

- **`-o|--output <OUTPUT_DIRECTORY>`**

  Specifies the path for the output directory.

  If not specified, it defaults to *[project_file_folder]/bin/[configuration]/[framework]/publish/* for a framework-dependent executable and cross-platform binaries. It defaults to *[project_file_folder]/bin/[configuration]/[framework]/[runtime]/publish/* for a self-contained executable.

  In a web project, if the output folder is in the project folder, successive `dotnet publish` commands result in nested output folders. For example, if the project folder is *myproject*, and the publish output folder is *myproject/publish*, and you run `dotnet publish` twice, the second run puts content files such as *.config* and *.json* files in *myproject/publish/publish*. To avoid nesting publish folders, specify a publish folder that isn't **directly** under the project folder, or exclude the publish folder from the project. To exclude a publish folder named *publishoutput*, add the following element to a `PropertyGroup` element in the *.csproj* file:

  ```xml
  <DefaultItemExcludes>$(DefaultItemExcludes);publishoutput**</DefaultItemExcludes>
  ```

  - .NET 7.0.200 SDK and later

    If you specify the `--output` option when running this command on a solution, the CLI will emit a warning (an error in 7.0.200) due to the unclear semantics of the output path. The `--output` option is disallowed because all outputs of all built projects would be copied into the specified directory, which isn't compatible with multi-targeted projects, as well as projects that have different versions of direct and transitive dependencies. For more information, see [Solution-level `--output` option no longer valid for build-related commands](../compatibility/sdk/7.0/solution-level-output-no-longer-valid.md).

  - .NET Core 3.x SDK and later

    If you specify a relative path when publishing a project, the generated output directory is relative to the current working directory, not to the project file location.

    If you specify a relative path when publishing a solution, all output for all projects goes into the specified folder relative to the current working directory. To make publish output go to separate folders for each project, specify a relative path by using the msbuild `PublishDir` property instead of the `--output` option. For example, `dotnet publish -p:PublishDir=.\publish` sends publish output for each project to a `publish` folder under the folder that contains the project file.

- **`--os <OS>`**

Specifies the target operating system (OS). This is a shorthand syntax for setting the [Runtime Identifier (RID)](../rid-catalog.md), where the provided value is combined with the default RID. For example, on a `win-x64` machine, specifying `--os linux` sets the RID to `linux-x64`. If you use this option, don't use the `-r|--runtime` option. Available since .NET 6.


- **`--sc|--self-contained`**

Publish the .NET runtime with your application so the runtime doesn't need to be installed on the target machine.


- **`-p|--property:<PROPERTYNAME>=<VALUE>`**

  Sets one or more MSBuild properties. Specify multiple properties delimited by semicolons or by repeating the option:

  ```dotnetcli
  --property:<NAME1>=<VALUE1>;<NAME2>=<VALUE2>
  --property:<NAME1>=<VALUE1> --property:<NAME2>=<VALUE2>
  ```

- **`--no-self-contained`**

Publish your application as a framework-dependent application. A compatible .NET runtime must be installed on the target machine to run your application.


- **`--source <SOURCE>`**

  The URI of the NuGet package source to use during the restore operation.

- **`-r|--runtime <RUNTIME_IDENTIFIER>`**

  Publishes the application for a given runtime. For a list of Runtime Identifiers (RIDs), see the [RID catalog](../rid-catalog.md). For more information, see [.NET application publishing overview](../deploying/index.md). If you use this option, use `--self-contained` or `--no-self-contained` also.

  > **Note:**
  > Publishing can be done on the *solution* level and on the single *project* level. When publishing from the *solution* level by specifying the optional `<SOLUTION>` parameter or leaving it default, MSBuild first compiles the output into the `publish` directory **without** any symbols. This means that later compilations done by MSBuild, based on the initial compilation, will still not include any details for specified `<RUNTIME_IDENTIFIER>`.
  >
  > This is expected behavior. To avoid this behavior either publish for a single project by specifying the optional `<PROJECT>` parameter for your RID or specify RIDs directly in the project config by adding the [`<RuntimeIdentifiers>`](../project-sdk/msbuild-props.md#runtimeidentifiers) property.

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

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. The default is `minimal`. For more information, see [Microsoft.Build.Framework.LoggerVerbosity](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.LoggerVerbosity).


- **`--version-suffix <VERSION_SUFFIX>`**

  Defines the version suffix to replace the asterisk (`*`) in the version field of the project file.

- **`-?|-h|--help`**

Prints out a description of how to use the command.


## Examples

- Create a [framework-dependent cross-platform binary](../deploying/index.md#cross-platform-dll-deployment) for the project in the current directory:

  ```dotnetcli
  dotnet publish
  ```

  Starting with .NET Core 3.0 SDK, this example also creates a [framework-dependent executable](../deploying/index.md#publish-as-framework-dependent) for the current platform.

- Create a [self-contained executable](../deploying/index.md#publish-as-self-contained) for the project in the current directory, for a specific runtime:

  ```dotnetcli
  dotnet publish --runtime osx-x64
  ```

  The RID must be in the project file.

- Create a [framework-dependent executable](../deploying/index.md#publish-as-framework-dependent) for the project in the current directory, for a specific platform:

  ```dotnetcli
  dotnet publish --runtime osx-x64 --self-contained false
  ```

  The RID must be in the project file. This example applies to .NET Core 3.0 SDK and later versions.

- Publish the project in the current directory, for a specific runtime and target framework:

  ```dotnetcli
  dotnet publish --framework net8.0 --runtime osx-x64
  ```

- Publish the specified project file:

  ```dotnetcli
  dotnet publish ~/projects/app1/app1.csproj
  ```

- Publish the current application but don't restore project-to-project (P2P) references, just the root project during the restore operation:

  ```dotnetcli
  dotnet publish --no-dependencies
  ```

- Publish the file-based C# program *app.cs* in the current directory:

  ```dotnetcli
  dotnet publish app.cs
  ```

  File-based program support was added in .NET SDK 10.0.100.

## See also

- [.NET application publishing overview](../deploying/index.md)
- [Target frameworks](../../standard/frameworks.md)
- [Runtime Identifier (RID) catalog](../rid-catalog.md)
- [Containerize a .NET app with dotnet publish](../containers/sdk-publish.md)
- [Working with macOS Catalina Notarization](../install/macos-notarization-issues.md)
- [Directory structure of a published application](https://learn.microsoft.com/aspnet/core/hosting/directory-structure)
- [MSBuild command-line reference](https://learn.microsoft.com/visualstudio/msbuild/msbuild-command-line-reference)
- [Visual Studio publish profiles (.pubxml) for ASP.NET Core app deployment](https://learn.microsoft.com/aspnet/core/host-and-deploy/visual-studio-publish-profiles)
- [dotnet msbuild](dotnet-msbuild.md)
- [Trim self-contained deployments](../deploying/trimming/trim-self-contained.md)
