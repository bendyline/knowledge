---
title: dnim query prreleases command
description: The query releases command provides information about specific .NET releases.
author: joeloff
ms.date: 08/11/2026
ai-usage: ai-assisted
---

# dnim query releases

## Name

`dnim-win-[x86|x64|arm64] query releases` - Queries release information about specific .NET products.

## Synopsis

```dotnetcli
dnim-win-[x86|x64|arm64] query releases [-a|--accept-license]
    [--cve <CVE_ID>]
    [--epv|--except-product-version <PRODUCT_VERSION>] 
    [--esp|--except-support-phase <active|eol|golive|maintenance|preview>]
    [-o|--output-file <OUTPUT_FILE>] [--offline <LAYOUT_DIRECTORY>]
    [--output-format <text|csv|html|json>] [--pv|--product-version <PRODUCT_VERSION>]
    [--security]
    [--sp|--support-phase <active|eol|golive|maintenance|preview>]
    [-v|--verbosity <quiet|normal|diagnostic>]

dnim-win-[x86|x64|arm64] query releases -?|-h|--help
```

## Description

The command can be used to obtain information for specific .NET releases.

> **Important:**
> The information provided by this command depends on the published releases JSON data.

## Options

- **`-a|--accept-license`**

Automatically accept the license agreement. On first run, the user will be prompted to accept the license. The command will fail if the verbosity is set to `quiet` and the tool is executed for the first time. Administrators should include this option when deploying DNIM across their network.


- **`--cve <CVE_ID>`**

Filter releases using the Common Vulnerabilities and Exposures (CVE) identifier. Only releases that address the specified CVEs are included. Specify the option once for each CVE.

> **Important:**
> This option depends on the release information published by .NET.


- **`--epv|--except-product-version <PRODUCT_VERSION>`**

Exclude installations that match the specified product version. Product versions contain a major and minor version, such as `2.2` or `5.0`. Specify the option once for each product version.

> **Note:**
> The `--product-version` and `--except-product-version` options are mutually exclusive.

  
- **`--esp|--except-support-phase <active|eol|golive|maintenance|preview>`**

Exclude installations that match the specified support phase. Specify the option once for each support phase.

> **Note:**
> The `--support-phase` and `--except-support-phase` options are mutually exclusive.


- **`-o|--output-file <OUTPUT_FILE>`**

Specify the full path of the file where DNIM writes the command results.


- **`--offline <LAYOUT_DIRECTORY>`**

Use files from the specified layout directory instead of retrieving required files from the internet.


- **`--output-format <text|csv|html|json>`**

Specify the output format for command results. The default format is `csv`.


- **`--pv|--product-version <PRODUCT_VERSION>`**

Include installations that match the specified product version. Product versions contain a major and minor version, such as `2.2` or `5.0`. Specify the option once for each product version. By default, all known product versions are included.

> **Note:**
> The `--product-version` and `--except-product-version` options are mutually exclusive.


- **`--security`**

Only include releases that contain security updates.


- **`--sp|--support-phase <active|eol|golive|maintenance|preview>`**

Include only products, releases, or installations that match the specified support phase. Specify the option once for each support phase. By default, all support phases are included.

> **Note:**
> The `--support-phase` and `--except-support-phase` options are mutually exclusive.


- **`-v|--verbosity <quiet|normal|diagnostic>`**

Set the console output verbosity. Log files always contain diagnostic output. The default value is `normal`.


## Results

The example below shows the latest release information for .NET Core 3.1.

```console
Version: 3.1.32
Release date: 12/13/2022
Release notes: https://github.com/dotnet/core/blob/main/release-notes/3.1/3.1.32/3.1.32.md
Security: True
CVEs:
  CVE-2022-41089, https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-41089
SDK 3.1.426
  ASP.NET Core Runtime 3.1.32
  .NET Core Runtime 3.1.32
  Desktop Runtime 3.1.32
```

## Examples

- Display all releases that addressed a specific CVE:

  ```console
  dnim-win-[x86|x64|arm64] query releases --cve CVE-2026-71328
  ```

- Display the latest releases available for all products that are not end-of-life.

  ```console
  dnim-win-[x86|x64|arm64] query release --esp eol --latest
  ```

## See also

The [`query products`](dnim-cli-query-products.md) command.
