---
title: dnim query products command
description: The query releases command provides information about specific .NET products.
author: joeloff
ms.date: 08/11/2026
ai-usage: ai-assisted
---

# dnim query products

## Name

`dnim-win-[x86|x64|arm64] query products` - Queries release information about specific .NET products.

## Synopsis

```dotnetcli
dnim-win-[x86|x64|arm64] query products [-a|--accept-license] 
    [--epv|--except-product-version <PRODUCT_VERSION>] 
    [--esp|--except-support-phase <active|eol|golive|maintenance|preview>]
    [-o|--output-file <OUTPUT_FILE>] [--offline <LAYOUT_DIRECTORY>]
    [--output-format <text|csv|html|json>] [--pv|--product-version <PRODUCT_VERSION>]
    [--sp|--support-phase <active|eol|golive|maintenance|preview>]
    [-v|--verbosity <quiet|normal|diagnostic>]

dnim-win-[x86|x64|arm64] query products -?|-h|--help
```

## Description

The command provides a summary of .NET products, including the latest versions, support phase and expected end-of-life date.

> **Important:**
> The information provided by this command depends on the published releases JSON data.

## Options

- **`-a|--accept-license`**

Automatically accept the license agreement. On first run, the user will be prompted to accept the license. The command will fail if the verbosity is set to `quiet` and the tool is executed for the first time. Administrators should include this option when deploying DNIM across their network.


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


- **`--sp|--support-phase <active|eol|golive|maintenance|preview>`**

Include only products, releases, or installations that match the specified support phase. Specify the option once for each support phase. By default, all support phases are included.

> **Note:**
> The `--support-phase` and `--except-support-phase` options are mutually exclusive.


- **`-v|--verbosity <quiet|normal|diagnostic>`**

Set the console output verbosity. Log files always contain diagnostic output. The default value is `normal`.


## Results

The example below lists all products whose support phase is not `eol`. The security update column indicates whether the latest release addressed security vulnerabilities. The [`query releases`](dnim-cli-query-releases.md) command can be used to obtain a list of vulnerabilities addressed by the latest release.

| Version | Support | Release type | Latest release | Latest release date | Latest SDK | Latest runtime | End of support | Security update |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 11.0 | GoLive | STS | 11.0.0-rc.1 | 9/8/2026 | 11.0.100-rc.1.26425.128 | 11.0.0-rc.1.26425.128 | n/a | True |
| 10.0 | Active | LTS | 10.0.12 | 9/8/2026 | 10.0.401 | 10.0.12 | 11/14/2028 | True |
| 9.0 | Maintenance | STS | 9.0.20 | 9/8/2026 | 9.0.318 | 9.0.20 | 11/10/2026 | True |
| 8.0 | Maintenance | LTS | 8.0.31 | 9/8/2026 | 8.0.425 | 8.0.31 | 11/10/2026 | True |

## Examples

- Display information for all .NET products.

  ```console
  dnim-win-[x86|x64|arm64] query products
  ```

- Display information for all products that are not end-of-life:

  ```console
  dnim-win-[x86|x64|arm64] query products --esp eol
  ```

- Only display information for the .NET 7.0 and 9.0 products.

  ```console
  dnim-win-[x86|x64|arm64] query products --pv 7.0 --pv 9.0
  ```

## See also

The [`query-releases`](dnim-cli-query-releases.md) command.
