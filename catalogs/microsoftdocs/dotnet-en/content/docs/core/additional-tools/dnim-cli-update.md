---
title: dnim update command
description: The update command updates existing .NET installations.
author: joeloff
ms.date: 09/16/2026
ai-usage: ai-assisted
---

# dnim update

## Name

`dnim-win-[x86|x64|arm64] update` - Detects, classifies, removes and updates .NET installations on a device.

## Synopsis

```dotnetcli
dnim-win-[x86|x64|arm64] update [-a|--accept-license]
    [-b|--include-bin-deployed-installs]
    [--csrp|--create-system-restore-point]
    [--duwo|--download-updates-when-offline]
    [--epv|--except-product-version <PRODUCT_VERSION>]
    [--esp|--except-support-phase <active|eol|golive|maintenance|preview>]
    [--ignore-dependents]
    [--it|--install-type <msi|bundle|bin|hosting|runtime|aspnetruntime|desktopruntime|sdk|x86|x64|arm64>]
    [--klpv|--keep-latest-product-version <PRODUCT_VERSION>]
    [--klsp|--keep-latest-support-phase <active|eol|golive|maintenance|preview>]
    [-l|--log-file <LOG_FILE>]
    [--log-extra-debug-information, --lx]
    [--no-wua]
    [-o|--output-file <OUTPUT_FILE>]
    [--offline <LAYOUT_DIRECTORY>]
    [--offline-revocation-checks]
    [--output-format <text|csv|html|json>]
    [--pv|--product-version <PRODUCT_VERSION>]
    [--remove-EOL-versions-from-VS]
    [--remove-orphaned-installs]
    [--restore-point-suffix|--rps <SUFFIX>]
    [--ri|--report-issues]
    [--rv|--release-version <RELEASE_VERSION_RANGE>]
    [--sp|--support-phase <active|eol|golive|maintenance|preview>]
    [--update-discontinued-sdks]
    [--update-EOL-versions]
    [-v|--verbosity <quiet|normal|diagnostic>]
    [--verify-signatures <always|bypass|never>]
    [--what-if]

dnim-win-[x86|x64|arm64] update -?|-h|--help
```

## Description

The `update` command detects, classifies, removes and updates .NET installations on Windows. MSIs and bundles are detected by default. Bin deployed (xcopy/zip) installs under `Program Files` can be detected using the `--include-bin-deployed-installs` option.

> **Caution:**
> DNIM always attempts to remove all copies of .NET on a device before updating, even if the latest release is instaleld. Use the `--what-if` option to review planned actions and consider using the `--keep-latest-product-version` and `keep-latest-support-phase` options to retain specific installations.

The command can target specific products based on their product version, support phase, type and release version. Only standalone bundles can be updated. Installations of .NET that came from Visual Studio will require you to update Visual Studio. DNIM will not update Visual Studio.

The command will first remove any applicable installs before applying updates. This approach yields better results to meet compliance goals and reduce the need for secondary deployments to remove old copies of .NET.

## Options

- **`-a|--accept-license`**

Automatically accept the license agreement. On first run, the user will be prompted to accept the license. The command will fail if the verbosity is set to `quiet` and the tool is executed for the first time. Administrators should include this option when deploying DNIM across their network.


- **`-b|--include-bin-deployed-installs`**

Search for bin-deployed installations under Program Files. This option will incur additional overhead to verify installations that aren't backed by an MSI.


- **`--csrp|--create-system-restore-point`**

Create a system restore point before making changes to the machine. This option has no effect when System Restore isn't supported, such as on Windows Server, or when the service is disabled.

Refer to the [System Restore](https://support.microsoft.com/Windows/Experience/Backup-Recovery/system-restore) documentation for additional information.


- **`--duwo|--download-updates-when-offline`**

Allow missing updates to be downloaded when offline.

> **Tip:**
> This option is useful when DNIM is deployed offline, but Administrators still want devices to update even when they are not connected to a corporate network. For example, a user might take their laptop home before DNIM is deployed.


- **`--epv|--except-product-version <PRODUCT_VERSION>`**

Exclude installations that match the specified product version. Product versions contain a major and minor version, such as `2.2` or `5.0`. Specify the option once for each product version.

> **Note:**
> The `--product-version` and `--except-product-version` options are mutually exclusive.

  
- **`--esp|--except-support-phase <active|eol|golive|maintenance|preview>`**

Exclude installations that match the specified support phase. Specify the option once for each support phase.

> **Note:**
> The `--support-phase` and `--except-support-phase` options are mutually exclusive.


- **`--ignore-dependents`**

Ignore installation dependencies that would otherwise prevent packages from being removed.


- **`--it|--install-type <msi|bundle|bin|hosting|runtime|aspnetruntime|desktopruntime|sdk|x86|x64|arm64>`**

Target installations based on their package type, component, or architecture. You can specify this option multiple times. For example, use `--it sdk --it x64` to only target 64-bit SDK installations.


- **`--klpv|--keep-latest-product-version <PRODUCT_VERSION>`**

Keep an installation when it matches the specified product version and is the latest known version of that product. Specify the option once for each product version.


- **`--klsp|--keep-latest-support-phase <active|eol|golive|maintenance|preview>`**

Keep an installation when it matches the specified support phase and is the latest known version. Specify the option once for each support phase.


- **`-l|--log-file <LOG_FILE>`**

Specify the path of the log file. By default, DNIM creates a timestamped log file in the user's temporary directory.


- **`--lx|--log-extra-debug-information`**

Enable additional debug logging when directly executing an MSI. This option doesn't set the Windows Installer logging policy and doesn't affect MSIs executed as part of a bundle.


- **`--no-wua`**

Temporarily stop the Windows Update Agent service when executing installation packages. DNIM stops the service only if it's running and restarts it only if DNIM stopped it. The option is intended to minimize the impact from other updates that may interfere with updating .NET.

> **Caution:**
> DNIM will make a best effort to restart WUA. It is possible for DNIM to exit abruptly before it is able to restart WUA if the process is killed. This could leave a device in a vulnerable state.


- **`-o|--output-file <OUTPUT_FILE>`**

Specify the full path of the file where DNIM writes the command results.


- **`--offline <LAYOUT_DIRECTORY>`**

Use files from the specified layout directory instead of retrieving required files from the internet.


- **`--offline-revocation-checks`**

Use cached certificate revocation lists when verifying file signatures. Use this option on machines with restricted network access.


- **`--output-format <text|csv|html|json>`**

Specify the output format for command results. The default format is `csv`.


- **`--pv|--product-version <PRODUCT_VERSION>`**

Include installations that match the specified product version. Product versions contain a major and minor version, such as `2.2` or `5.0`. Specify the option once for each product version. By default, all known product versions are included.

> **Note:**
> The `--product-version` and `--except-product-version` options are mutually exclusive.


- **`--remove-EOL-versions-from-VS`**

Remove end-of-life .NET installations installed by Visual Studio if every Visual Studio instance designates the installation as out of support.

> **Note:**
> Starting with Visual Studio 15.9.27, 16.0.18, 16.4.13, 16.7.3 and 16.8 Preview 3, packages and components can be designated as out-of-support. Visual Studio will not reinstall out-of-support packages that have been manually uninstalled.


- **`--remove-orphaned-installs`**

Identify and remove orphaned installations that have dangling dependents.


- **`--ri|--report-issues`**

Return a nonzero exit code when the command succeeds but detects installations that require action. This option applies only when combined with `--what-if` and can be used by Intune detection scripts to trigger remediation.


- **`--rv|--release-version <RELEASE_VERSION_RANGE>`**

Include a specific version or range of versions using interval notation. For example, `[,7.0.3)` selects versions earlier than 7.0.3, and `[6.0.15]` selects only version 6.0.15. This option can't be combined with other installation filtering options.


- **`--sp|--support-phase <active|eol|golive|maintenance|preview>`**

Include only products, releases, or installations that match the specified support phase. Specify the option once for each support phase. By default, all support phases are included.

> **Note:**
> The `--support-phase` and `--except-support-phase` options are mutually exclusive.


- **`--update-discontinued-sdks`**

Allow SDK updates when an installed feature band has been discontinued. DNIM selects the highest applicable feature band and patch.


- **`--update-EOL-versions`**

Update end-of-life installations to the latest available version.


- **`-v|--verbosity <quiet|normal|diagnostic>`**

Set the console output verbosity. Log files always contain diagnostic output. The default value is `normal`.


- **`--verify-signatures <always|bypass|never>`**

Control signature verification before DNIM executes a bundle. Daily .NET builds are unsigned and aren't removed by default. The default value is `always`.


- **`--what-if`**

Display the actions the command would take without making changes to the system.


## Results

The results are similar to that of the uninstall command, but additional columns showing the update action and target version are included.

| Display Name | Release | Type | Support | Uninstall Action | Update Action | Update Version |
| --- | --- | --- | --- | --- | --- | --- |
| Microsoft Windows Desktop Runtime 11.0.0 (x64) | 11.0.0-preview.7.26381.103 | Bundle | GoLive | Uninstall | Update | 11.0.0-rc.1.26425.128 |

## Examples

- Update .NET installs:

  ```console
  dnim-win-[x86|x64|arm64] update
  ```

- Updated all the .NET 8.0 installations, including discontinued SDKs.

  ```console
  dnim-win-[x86|x64|arm64] update --update-discontinued-sdk --pv 8.0
  ```

  Assume 8.0.31 is the latest .NET 8 release. It includes updates for both the 8.0.1xx and 8.0.4xx SDKs. The 8.0.2xx and 8.0.3xx SDKs are no longer produced and considered discontinued. If a device has the 8.0.202 SDK installed, DNIM can install the 8.0.425 SDK and remove the 8.0.202 SDK.

## See also

[.NET Installs](dnim-net-installs.md)
