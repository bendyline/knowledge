---
title: dotnet workload update command
description: The 'dotnet workload update' command updates installed workloads.
ms.date: 09/10/2021
---
# dotnet workload update

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet workload update` - Updates installed workloads.

## Synopsis

```dotnetcli
dotnet workload update
    [--advertising-manifests-only]
    [--configfile <FILE>] [--disable-parallel]
    [--from-previous-sdk] [--ignore-failed-sources]
    [--include-previews] [--interactive] [--no-cache]
    [-s|--source <SOURCE>] [--temp-dir <PATH>]
    [-v|--verbosity <LEVEL>] [--version]

dotnet workload update -?|-h|--help
```

## Description

The `dotnet workload update` command updates all installed workloads to the newest available versions. It queries Nuget.org for updated workload manifests. It then updates local manifests, downloads new versions of the installed workloads, and removes all old versions of each workload.

When the command is in `workload-set` update mode, workloads are updated according to the workload-set version, not the latest version of each individual workload. For more information, see [.NET SDK workload sets](dotnet-workload-sets.md). `workload-set` mode is available since 8.0.400 SDK.

For more information about the `dotnet workload` commands, see the [dotnet workload install](dotnet-workload-install.md#description) command.

## Options

- **`--advertising-manifests-only`**

  Downloads [advertising manifests](dotnet-workload-install.md#advertising-manifests) but doesn't update any workloads.

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see [Common NuGet Configurations](https://learn.microsoft.com/nuget/consume-packages/configuring-nuget-behavior).


- **`--disable-parallel`**

Prevents restoring multiple projects in parallel.


- **`--from-previous-sdk`**

  Include workloads installed with previous SDK versions in the update.

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


- **`-s|--source <SOURCE>`**

Specifies the URI of the NuGet package source to use. This setting overrides all of the sources specified in the *nuget.config* files. Multiple sources can be provided by specifying this option multiple times.


- **`--temp-dir <PATH>`**

Specify the temporary directory used to download and extract NuGet packages (must be secure).


- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. The default is `minimal`. If you specify `detailed` or `diagnostic` verbosity, the command displays information about the Nuget packages that it downloads.


- **`--version`**

The workload set version to install or update to. If you specify the workload-set version in global.json, you can't use the `--version` option to specify the workload-set version. To make it possible to use the `--version` option in that case, run the command outside of the path containing the global.json file. Available since 8.0.400 SDK. For more information, see [.NET SDK workload sets](dotnet-workload-sets.md).


## Examples

- Update the installed workloads to the latest version of each individual workload:

  ```dotnetcli
  dotnet workload config --update-mode manifests
  dotnet workload update
  ```

- Update the installed workloads to the latest workload set version:

  ```dotnetcli
  dotnet workload config --update-mode workload-set
  dotnet workload update
  ```
