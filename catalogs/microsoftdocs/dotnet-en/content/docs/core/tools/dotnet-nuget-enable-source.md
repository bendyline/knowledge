---
title: dotnet nuget enable source command
description: The dotnet nuget enable source command enables an existing source in your NuGet configuration files. 
ms.date: 10/28/2025
---
# dotnet nuget enable source

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet nuget enable source` - Enable a NuGet source.

## Synopsis

```dotnetcli
dotnet nuget enable source <NAME> [--configfile <FILE>]

dotnet nuget enable source -h|--help
```

## Description

The `dotnet nuget enable source` command enables an existing source in your NuGet configuration files.

## Arguments

- **`NAME`**

  Name of the source.

## Options

- **`--configfile <FILE>`**

The NuGet configuration file (*nuget.config*) to use. If specified, only the settings from this file will be used. If not specified, the hierarchy of configuration files from the current directory will be used. For more information, see [Common NuGet Configurations](https://learn.microsoft.com/nuget/consume-packages/configuring-nuget-behavior).


## Examples

- Enable a source with name of `mySource`:

  ```dotnetcli
  dotnet nuget enable source mySource
  ```

## See also

- [Package source sections in NuGet.config files](https://learn.microsoft.com/nuget/reference/nuget-config-file#package-source-sections)

- [sources command (nuget.exe)](https://learn.microsoft.com/nuget/reference/cli-reference/cli-ref-sources)
