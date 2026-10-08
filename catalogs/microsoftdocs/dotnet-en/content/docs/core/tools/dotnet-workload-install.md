---
title: dotnet workload install command
description: The 'dotnet workload install' command installs optional workloads.
ms.date: 11/12/2025
no-loc: [dotnet workload install]
---
# dotnet workload install

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet workload install` - Installs optional workloads.

## Synopsis

```dotnetcli
dotnet workload install <WORKLOAD_ID>...
    [--configfile <FILE>] [--disable-parallel]
    [--ignore-failed-sources] [--include-previews] [--interactive]
    [--no-cache] [--skip-manifest-update] [--source <SOURCE>]
    [--temp-dir <PATH>] [-v|--verbosity <LEVEL>] [--version <VERSION>]

dotnet workload install -?|-h|--help
```

## Description

The `dotnet workload install` command installs one or more *optional workloads*. Optional workloads can be installed on top of the .NET SDK to provide support for various application types, such as [.NET MAUI](https://learn.microsoft.com/dotnet/maui/what-is-maui) and [Blazor WebAssembly AOT](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-4/#blazor-webassembly-ahead-of-time-aot-compilation).

When the command is in `workload-set` update mode, workload versions installed:

* Are from the latest workload set or a workload set version specified in a global.json or `--version` option.
* Might not be the latest version available of each individual workload. For example, the `install` command won't install a newer workload set if you previously used the `--version` flag.

For more information, see [.NET SDK workload sets](dotnet-workload-sets.md). `workload-set` update mode is available since 8.0.400 SDK.

Use [dotnet workload search](dotnet-workload-search.md) to learn what workloads are available to install.

### When to run elevated

For macOS and Linux SDK installations that are installed to a protected directory, the command needs to run elevated (use the `sudo` command). On Windows, the command doesn't need to run elevated even if the SDK is installed to the *Program Files* directory. For Windows, the command uses MSI installers for that location.

### Results vary by SDK version

The `dotnet workload` commands operate in the context of specific SDK versions. Suppose you have both .NET 6.0.100 SDK and .NET 6.0.200 SDK installed. The `dotnet workload` commands will give different results depending on which SDK version you select. This behavior applies to major and minor version and feature band differences, not to patch version differences. For example, .NET SDK 6.0.101 and 6.0.102 give the same results, whereas 6.0.100 and 6.0.200 give different results. You can specify the SDK version by using the [*global.json* file](global-json.md).

### Advertising manifests

The names and versions of the assets that a workload installation requires are maintained in *manifests*. By default, the `dotnet workload install` command downloads the latest available manifests before it installs a workload. The local copy of a manifest then provides the information needed to find and download the assets for a workload.

The `dotnet workload list` command compares the versions of installed workloads with the currently available versions.  When it finds that a version newer than the installed version is available, it advertises that fact in the command output. These newer-version notifications in `dotnet workload list` are available starting in .NET 6.

To enable these notifications, the latest available versions of the manifests are downloaded and stored as *advertising manifests*.  These downloads happen asynchronously in the background when any of the following commands are run.

* [dotnet build](dotnet-build.md)
* [dotnet pack](dotnet-pack.md)
* [dotnet publish](dotnet-publish.md)
* [dotnet restore](dotnet-restore.md)
* [dotnet run](dotnet-run.md)
* [dotnet test](dotnet-test.md)

If a command finishes before the manifest download finishes, the download is stopped. The download is tried again the next time one of these commands is run. You can set environment variables to [disable these background downloads](dotnet-environment-variables.md#dotnet_cli_workload_update_notify_disable) or [control their frequency](dotnet-environment-variables.md#dotnet_cli_workload_update_notify_interval_hours). By default, they don't happen more than once a day.

You can prevent the `dotnet workload install` command from doing manifest downloads by using the `--skip-manifest-update` option.

The `dotnet workload update` command also downloads advertising manifests. The downloads are required to learn if an update is available, so there is no option to prevent them from running. However, you can use the `--advertising-manifests-only` option to skip workload updates and only do the manifest downloads. This option is available starting in .NET 6.

## Arguments

- **`WORKLOAD_ID`...**

  The workload ID or multiple IDs to install. Use [dotnet workload search](dotnet-workload-search.md) to learn what workloads are available.

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

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. The default is `minimal`. If you specify `detailed` or `diagnostic` verbosity, the command displays information about the Nuget packages that it downloads.


- **`version <WORKLOAD_VERSION>`**

A workload version to display, or one or more workloads and their versions joined by the `@` character. Support for the `@` character is available since 9.0.200 SDK.


## Examples

- Install the `maui` workload:

  ```dotnetcli
  dotnet workload install maui
  ```
  
- Install the `maui-android` and `maui-ios` workloads:
  
  ```dotnetcli
  dotnet workload install maui-android maui-ios
  ```

- Install the workload version specified by the `@` character:

  ```dotnetcli
  dotnet workload install maui@10.0.100
  ```
