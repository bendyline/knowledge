---
title: dotnet new uninstall
description: The dotnet new uninstall command uninstalls a template package.
ms.date: 04/29/2021
---
# dotnet new uninstall

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet new uninstall` - uninstalls a template package.

## Synopsis

```dotnetcli
dotnet new uninstall <PATH|NUGET_ID> 
    [-d|--diagnostics] [--verbosity <LEVEL>] [-h|--help]
```

## Description

The `dotnet new uninstall` command uninstalls a template package at the `PATH` or `NUGET_ID` provided. When the `<PATH|NUGET_ID>` value isn't specified, all currently installed template packages and their associated templates are displayed. When specifying `NUGET_ID`, don't include the version number.

> **Note:**
> 
Starting with the .NET 7 SDK, the `dotnet new` syntax has changed:

- The `--list`, `--search`, `--install`, and `--uninstall` options became `list`, `search`, `install`, and `uninstall` subcommands.
- The `--update-apply` option became the `update` subcommand.
- To use `--update-check`, use the `update` subcommand with the `--check-only` option.

Other options that were available before are still available to use with their respective subcommands.
Separate help for each subcommand is available via the `-h` or `--help` option: `dotnet new <subcommand> --help` lists all supported options for the subcommand.

Additionally, tab completion is now available for `dotnet new`. It supports completion for installed template names and for the options a selected template provides.
To activate tab completion for the .NET SDK, see [Enable tab completion](enable-tab-autocomplete.md).

>
> Examples of the old syntax:
>
> - List the installed templates and details about them, including how to uninstall them:
>
>   ```dotnetcli
>   dotnet new --uninstall
>   ```
>
> - Uninstall the Azure web jobs project template package:
>
>   ```dotnetcli
>   dotnet new --uninstall Microsoft.Azure.WebJobs.ProjectTemplates
>   ```

## Arguments

- **`<PATH|NUGET_ID>`**

  The folder on the file system or the NuGet package identifier the package was installed from. Note that the version for the NuGet package should not be specified.

## Options

- **`-d|--diagnostics`**

  Enables diagnostic output. Available since .NET SDK 7.0.100.

- **`-?|-h|--help`**

Prints out a description of how to use the command.


- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. For more information, see [Microsoft.Build.Framework.LoggerVerbosity](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.LoggerVerbosity).


## Examples

- List the installed templates and details about them, including how to uninstall them:

  ```dotnetcli
  dotnet new uninstall
  ```

- Uninstall the SPA templates for ASP.NET Core:

  ```dotnetcli
  dotnet new uninstall Microsoft.DotNet.Web.Spa.ProjectTemplates
  ```

## See also

- [dotnet new command](dotnet-new.md)
- [dotnet new list command](dotnet-new-list.md)
- [dotnet new search command](dotnet-new-search.md)
- [.NET templates for authors](templates.md)
