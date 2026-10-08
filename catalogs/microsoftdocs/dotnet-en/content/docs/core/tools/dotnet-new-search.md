---
title: dotnet new search
description: The dotnet new search command searches for templates on NuGet.org.
ms.date: 10/28/2025
---
# dotnet new search

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet new search` - searches for the templates supported by `dotnet new` on NuGet.org.

## Synopsis

```dotnetcli
dotnet new search <TEMPLATE_NAME>

dotnet new search [<TEMPLATE_NAME>] [--author <AUTHOR>] [-lang|--language <language>]
    [--package <PACKAGE>] [--tag <TAG>] [--type <TYPE>]
    [--columns <author|language|tags|type>] [--columns-all]
    [-d|--diagnostics] [--verbosity <LEVEL>] [-h|--help]
```

## Description

The `dotnet new search` command searches for templates supported by `dotnet new` on NuGet.org. When the <TEMPLATE_NAME> is specified, searches for templates containing the specified name.

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
> - Search for all templates available on NuGet.org matching the "we" substring and supporting the F# language
>
>   ```dotnetcli
>   dotnet new we --search --language "F#"
>   ```

## Arguments

- **`TEMPLATE_NAME`**

  If the argument is specified, only templates containing `<TEMPLATE_NAME>` in the template name or short name will be shown.
  The argument is mandatory when `--author`, `--language`, `--package`, `--tag`, or `--type` options are not specified.

  > **Note:**
  > Starting with .NET SDK 6.0.100, you can put the `<TEMPLATE_NAME>` argument after the `--search` option. For example, `dotnet new --search web` provides the same result as `dotnet new web --search`.
  > Using more than one argument is not allowed.

## Options

- **`--author <AUTHOR>`**

  Filters templates based on template author. A partial match is supported.

- **`--columns <COLUMNS>`**

  The list of columns to display in the output. The supported columns are:
  - `author` - The template author.
  - `language` - The template language.
  - `tags` - The list of template tags.
  - `type` - The template type.
  
  The template name, short name, package name, an indication if it's a trusted source, and total downloads count are always shown. The default list of columns is template name, short name, language, package, an indication if it's a trusted source, and total downloads. To specify multiple columns, use the `--columns` option multiple times.

- **`--columns-all`**

  Displays all columns in the output.

- **`-d|--diagnostics`**

  Enables diagnostic output. Available since .NET SDK 7.0.100.

- **`-?|-h|--help`**

Prints out a description of how to use the command.


- **`-lang|--language <language>`**

  Filters templates based on language supported by the template. The language accepted varies by the template, possible languages are C#, F#, VB, SQL, JSON, TypeScript, and more. Not valid for some templates.

  > **Note:**
  > Some shells interpret `#` as a special character. In those cases, enclose the language parameter value in quotes. For example, `dotnet new --search --language "F#"`.

- **`--package <PACKAGE>`**

  Filters templates based on NuGet package ID. A partial match is supported.

- **`--tag <TAG>`**

  Filters templates based on template tags. To be selected, a template must have at least one tag that exactly matches the criteria.

- **`--type <TYPE>`**

  Filters templates based on template type. Predefined values are `project`, `item`, and `solution`.

- **`-v|--verbosity <LEVEL>`**

  Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, and `diag[nostic]`. Available since .NET SDK 7.0.100.

> **Note:**
> To ensure that the template package appears in `dotnet new --search` result, set [the NuGet package type](https://learn.microsoft.com/nuget/create-packages/set-package-type) to `Template`.

## Examples

- Search for all templates available on NuGet.org matching the *spa* substring.

  ```dotnetcli
  dotnet new search spa
  ```

- Search for all templates available on NuGet.org matching the *we* substring and supporting the F# language.

  ```dotnetcli
  dotnet new search we --language "F#"
  ```

- Search for item templates.

  ```dotnetcli
  dotnet new search --type item
  ```

- Search for all C# templates, showing the type and tags in the output.

  ```dotnetcli
  dotnet new search --language "C#" --columns "type" --columns "tags"
  ```

## See also

- [dotnet new command](dotnet-new.md)
- [dotnet new list command](dotnet-new-list.md)
- [.NET templates for authors](templates.md)
