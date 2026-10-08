---
title: dotnet new update
ai-usage: ai-assisted
description: The dotnet new update command updates installed template packages.
ms.date: 10/28/2025
---
# dotnet new update

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet new update` - updates installed template packages.

## Synopsis

```dotnetcli
dotnet new update [--interactive] [--add-source|--nuget-source <SOURCE>]
    [-d|--diagnostics] [--verbosity <LEVEL>] [-h|--help]

dotnet new update --check-only|--dry-run [--interactive] [--add-source|--nuget-source <SOURCE>]
    [-d|--diagnostics] [--verbosity <LEVEL>] [-h|--help]
```

## Description

The `dotnet new update` command updates installed template packages.
The `dotnet new update` command with `--check-only` option checks for available updates for installed template packages without applying them.

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
> - Show help for the `update` subcommand.
>
> - Check for updates for installed template packages:
>
>   ```dotnetcli
>   dotnet new --update-check
>   ```
>
> - Update installed template packages:
>
>   ```dotnetcli
>   dotnet new --update-apply
>   ```

## Options

- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.


- **`--add-source|--nuget-source <SOURCE>`**

  By default, `dotnet new update` uses the hierarchy of NuGet configuration files from the current directory to determine the NuGet sources for the operation. Specify `--nuget-source` to use a source in addition to the configured sources.
  To check the configured sources for the current directory, use [`dotnet nuget list source`](dotnet-nuget-list-source.md). For more information, see [Common NuGet Configurations](https://learn.microsoft.com/nuget/consume-packages/configuring-nuget-behavior). Available since .NET SDK 7.0.100.

- **`--check-only|--dry-run`**

 Only checks for updates and displays the template packages to be updated, without applying any updates.

- **`-d|--diagnostics`**

  Enables diagnostic output. Available since .NET SDK 7.0.100.

- **`-?|-h|--help`**

Prints out a description of how to use the command.


- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. For more information, see [Microsoft.Build.Framework.LoggerVerbosity](https://learn.microsoft.com/search/?terms=Microsoft.Build.Framework.LoggerVerbosity).


## Examples

- Updates the installed template packages using NuGet configuration for the current directory:

  ```dotnetcli
  dotnet new update 
  ```

- Updates the installed template packages also checking a custom NuGet source using interactive mode:

  ```dotnetcli
  dotnet new update --add-source "https://api.my-custom-nuget.com/v3/index.json" --interactive
  ```

## See also

- [dotnet new command](dotnet-new.md)
- [dotnet new search command](dotnet-new-search.md)
- [dotnet new install command](dotnet-new-install.md)
- [.NET templates for authors](templates.md)
