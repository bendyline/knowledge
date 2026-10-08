---
title: dnim scan command
description: The scan command identifies .NET installations.
author: joeloff
ms.date: 08/11/2026
ai-usage: ai-assisted
---

# dnim scan

## Name

`dnim-win-[x86|x64|arm64] scan` - Detects, classifies, and reports .NET installations on a device.

## Synopsis

```dotnetcli
dnim-win-[x86|x64|arm64] scan [-a|--accept-license] [-b|--include-bin-deployed-installs]
    [--epv|--except-product-version <PRODUCT_VERSION>] 
    [--esp|--except-support-phase <active|eol|golive|maintenance|preview>]
    [-l|--log-file <LOG_FILE>] [-o|--output-file <OUTPUT_FILE>] [--offline <LAYOUT_DIRECTORY>]
    [--output-format <text|csv|html|json>] [--pv|--product-version <PRODUCT_VERSION>]
    [--sp|--support-phase <active|eol|golive|maintenance|preview>]
    [-v|--verbosity <quiet|normal|diagnostic>]

dnim-win-[x86|x64|arm64] scan -?|-h|--help
```

## Description

The `scan` command detects, classifies and reports .NET installations on Windows. MSIs and bundles are detected by default. Bin deployed (xcopy/zip) installs under `Program Files` can be detected using the `--include-bin-deployed-installs` option.

Results can be filtered using the product version and support phase options to only include installations matching the specified criteria. Results are written to both the console and diagnostic log. Additional output formats are available and include JSON, HTML and CSV.

## Options

- **`-a|--accept-license`**

Automatically accept the license agreement. On first run, the user will be prompted to accept the license. The command will fail if the verbosity is set to `quiet` and the tool is executed for the first time. Administrators should include this option when deploying DNIM across their network.


- **`-b|--include-bin-deployed-installs`**

Search for bin-deployed installations under Program Files. This option will incur additional overhead to verify installations that aren't backed by an MSI.


- **`--epv|--except-product-version <PRODUCT_VERSION>`**

Exclude installations that match the specified product version. Product versions contain a major and minor version, such as `2.2` or `5.0`. Specify the option once for each product version.

> **Note:**
> The `--product-version` and `--except-product-version` options are mutually exclusive.

  
- **`--esp|--except-support-phase <active|eol|golive|maintenance|preview>`**

Exclude installations that match the specified support phase. Specify the option once for each support phase.

> **Note:**
> The `--support-phase` and `--except-support-phase` options are mutually exclusive.


- **`-l|--log-file <LOG_FILE>`**

Specify the path of the log file. By default, DNIM creates a timestamped log file in the user's temporary directory.


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

The results presents a summary of each installation, including its type (MSI, bundle, etc.), the .NET product to which it belongs and its current support phase. It may also include information about its origin. In the example below there are three installations: two bundles and one MSI. The targeting pack MSI is shared between both SDK installs and two instances of Visual Studio: 17.14.37502 and 17.14.37110.

| Display Name | Product | Release | Type | Support | Installed By |
| --- | --- | --- | --- | --- | --- |
| Microsoft .NET SDK 6.0.136 (x64) | 6.0 | 6.0.136 | Bundle | EOL |  |
| Microsoft .NET SDK 6.0.428 (x64) | 6.0 | 6.0.428 | Bundle | EOL |  |
| Microsoft Windows Desktop Targeting Pack - 6.0.36 (x64) | 6.0 | 6.0.36 | Msi | EOL | VS 17.14.37502, VS 17.14.37110, Microsoft .NET SDK 6.0.428 (x64), Microsoft .NET SDK 6.0.136 (x64) |

## Examples

- Scan and report all .NET installations:

  ```console
  dnim-win-[x86|x64|arm64] scan
  ```

- Scan and report .NET installations that are in active support:

  ```console
  dnim-win-[x86|x64|arm64] scan --sp active
  ```

- Scan for end-of-life (EOL) installations of .NET and write the results to an HTML file:

  ```console
  dnim-win-[x86|x64|arm64] scan --sp eol -o report.html --output-format html
  ```

## See also

[.NET Installs](dnim-net-installs.md)
