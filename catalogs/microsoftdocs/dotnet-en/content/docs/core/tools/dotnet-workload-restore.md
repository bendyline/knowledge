---
title: dotnet workload restore command
description: The 'dotnet workload restore' command installs workloads needed for a project or a solution.
ms.date: 09/10/2021
---
# dotnet workload restore

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet workload restore` - Installs workloads needed for a project or a solution.

## Synopsis

```dotnetcli
dotnet workload restore [<PROJECT | SOLUTION>]
    [--configfile <FILE>] [--disable-parallel]
    [--ignore-failed-sources] [--include-previews] [--interactive]
    [--no-cache] [--skip-manifest-update] [-s|--source <SOURCE>] 
    [--temp-dir <PATH>] [-v|--verbosity <LEVEL>] [--version <VERSION>]

dotnet workload restore -?|-h|--help
```

## Description

The `dotnet workload restore` command analyzes a project or solution to determine which workloads it needs, then installs any workloads that are missing.

For more information about the `dotnet workload` commands, see the [dotnet workload install](dotnet-workload-install.md#description) command.

## Arguments

- **`PROJECT | SOLUTION`**

  The project or solution file to install workloads for. If a file is not specified, the command searches the current directory for one.

## Options

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see [Common NuGet Configurations](https://learn.microsoft.com/nuget/consume-packages/configuring-nuget-behavior).


- **`--disable-parallel`**

Prevents restoring multiple projects in parallel.


- **`-?|-h|--help`**

Prints out a description of how to use the command.


- **`--ignore-failed-sources`**

Treats package source failures as warnings.


- **`--include-previews`**

Allows prerelease workload manifests.


- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.


- **`--no-cache`**

Prevents caching of packages and http requests.


- **`--skip-manifest-update`**

Skip updating the workload manifests. The workload manifests define what assets and versions need to be installed for each workload.


- **`-s|--source <SOURCE>`**

Specifies the URI of the NuGet package source to use. This setting overrides all of the sources specified in the *nuget.config* files. Multiple sources can be provided by specifying this option multiple times.


- **`--temp-dir <PATH>`**

Specify the temporary directory used to download and extract NuGet packages (must be secure).


- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. The default is `minimal`. For more information, see [Microsoft.Build.Framework.LoggerVerbosity](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.LoggerVerbosity).


- **`--version`**

The workload set version to install or update to. If you specify the workload-set version in global.json, you can't use the `--version` option to specify the workload-set version. To make it possible to use the `--version` option in that case, run the command outside of the path containing the global.json file. Available since 8.0.400 SDK. For more information, see [.NET SDK workload sets](dotnet-workload-sets.md).


## Example

- Restore workloads needed by MyApp.csproj:

  ```dotnetcli
  dotnet workload restore MyApp.csproj
  ```
