---
title: dnim uninstall command
description: The uninstall command removes .NET installations.
author: joeloff
ms.date: 08/11/2026
ai-usage: ai-assisted
---

# dnim uninstall

## Name

`dnim-win-[x86|x64|arm64] uninstall` - Detects, classifies, and removes .NET installations on a device.

## Synopsis

```dotnetcli
dnim-win-[x86|x64|arm64] uninstall [-a|--accept-license]
    [-b|--include-bin-deployed-installs]
    [--csrp|--create-system-restore-point]
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
    [-v|--verbosity <quiet|normal|diagnostic>]
    [--verify-signatures <always|bypass|never>]
    [--what-if]

dnim-win-[x86|x64|arm64] uninstall -?|-h|--help
```

## Description

The `uninstall` command attempts to remove all copies of .NET from the device. This may not be possible if installations are shared with other products like Visual Studio (see [Managed .NET installations on Windows](dnim-net-installs.md)).

> **Caution:**
> DNIM always attempts to remove all copies of .NET on a device. Use the `--what-if` option to review planned actions.

Various options can be used to target specific installations. For example, an administrator may want to remove all copies of .NET that are not in active support to comply with their organization's internal policies.

> **Important:**
> This command must be run with elevated privileges to make changes. Include the `--what-if` option if you want to evaluate the results without making changes.

## Options

- **`-a|--accept-license`**

Automatically accept the license agreement. On first run, the user will be prompted to accept the license. The command will fail if the verbosity is set to `quiet` and the tool is executed for the first time. Administrators should include this option when deploying DNIM across their network.


- **`-b|--include-bin-deployed-installs`**

Search for bin-deployed installations under Program Files. This option will incur additional overhead to verify installations that aren't backed by an MSI.


- **`--csrp|--create-system-restore-point`**

Create a system restore point before making changes to the machine. This option has no effect when System Restore isn't supported, such as on Windows Server, or when the service is disabled.

Refer to the [System Restore](https://support.microsoft.com/Windows/Experience/Backup-Recovery/system-restore) documentation for additional information.


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


- **`--rps|--restore-point-suffix <SUFFIX>`**

Append a string of up to 128 characters to the system restore point description.


- **`--ri|--report-issues`**

Return a nonzero exit code when the command succeeds but detects installations that require action. This option applies only when combined with `--what-if` and can be used by Intune detection scripts to trigger remediation.


- **`--rv|--release-version <RELEASE_VERSION_RANGE>`**

Include a specific version or range of versions using interval notation. For example, `[,7.0.3)` selects versions earlier than 7.0.3, and `[6.0.15]` selects only version 6.0.15. This option can't be combined with other installation filtering options.


- **`--sp|--support-phase <active|eol|golive|maintenance|preview>`**

Include only products, releases, or installations that match the specified support phase. Specify the option once for each support phase. By default, all support phases are included.

> **Note:**
> The `--support-phase` and `--except-support-phase` options are mutually exclusive.


- **`-v|--verbosity <quiet|normal|diagnostic>`**

Set the console output verbosity. Log files always contain diagnostic output. The default value is `normal`.


- **`--verify-signatures <always|bypass|never>`**

Control signature verification before DNIM executes a bundle. Daily .NET builds are unsigned and aren't removed by default. The default value is `always`.


- **`--what-if`**

Display the actions the command would take without making changes to the system.


## Results

The results are similar to those produced by the [`scan`](dnim-cli-scan.md) command with the addition of an extra column indicating whether or not an installation can be removed. The excerpt below was generated from running `dnim-win-x64.exe uninstall --pv 8.0 --klsp active --klsp maintenance --what-if`. The command specifically targets removing .NET 8.0, but will retain installations if they are the latest known release and the support phase is either `active` or `maintenance`. The 3.1 and 6.0 SDKs are excluded because they are not part of .NET 8.0. The 8.0.130 SDK is also not removed because it was the latest known release version when the command was executed.

| Display Name | Release | Type | Support | Uninstall Action |
| --- | --- | --- | --- | --- |
| Microsoft .NET Core SDK 3.1.426 (x64) | 3.1.426 | Bundle | EOL | NoneProductVersionExcluded |
| Microsoft .NET SDK 6.0.136 (x64) | 6.0.136 | Bundle | EOL | NoneProductVersionExcluded |
| Microsoft .NET SDK 8.0.130 (x64) | 8.0.130 | Bundle | Maintenance | NoneLatestReleasedVersion |

## Policy Evaluation

DNIM generates a set of internal policy rules based on the command-line options. Every installation is evaluated against the policies. Evaluation stops when a policy applies. If no policies apply, the .NET installation can be removed.

The table below contains an overview of the policies created from the command-line options.

| Policy | Description |
| --- | --- |
| Product Version | Include or exclude installations based on their product version. |
| Support Phase | Include or exclude installations based on their support phase. |
| Release Version | Include or exclude installations based on their release version. |
| Retention | Retain installations based on product version or support phase. |
| Install Type | Include or exclude installations based on their install type. |
| Orphaned Installations | Consider orphaned installations for removal. |
| Visual Studio EOL | Considers installations marked as out-of-support in Visual Studio. |
| Dependency Provider | Exclude installations if other products depend on them. |
| Signing | Exclude or include installations based on whether packages are signed. |

### Example

Consider the following command-line: `dnim-win-x64 uninstall --pv 6.0`. The command only considers installations associated with .NET 6.0. When the tool evaluates a .NET 7.0 installation, the product version policy applies and excludes it.

## Policy Results

Every installation is assigned an action based on the evaluated policies. The table belows contains
a description for the various policy actions returned by the `uninstall` command. Policy actions with a
`None` prefix indicate the installation won't be removed.

| Action | Policy | Description |
| --- | --- | --- |
| NoneNotOutOfSupport | Support Phase | The product is still considered to be in support based on the published release information. |
| NoneLatestReleasedVersion | Retention | The installation is the latest known released version and will be retained. |
| NoneNotOutOfSupportInVisualStudio | Visual Studio EOL | The product is out of support, but not all instances of Visual Studio considers it out-of-support. This indicates that product information in one or more Visual Studio catalog is outdated or incorrect. |
| NoneProductVersionExcluded | Product Version | The product will be retained because its version excluded it from being removed. |
| NoneProductVersionNotFound | Product Version | The installation belongs to an unknown .NET product version. This can happen when the .NET releases JSON data has not been updated or an old copy of data is being used. |
| NoneSupportPhaseExcluded | Support Phase | The installation will be retained because its support phase is excluded. |
| NoneInstallPlatformExcluded | Install Type | The installation will be retained because its platform is excluded. |
| NoneInstallTypeExcluded | Install Type | The installation will be retained because its type is excluded. For example, the user only specified MSIs to be removed. |
| NoneInstallComponentExcluded | Install Type | The installation will be retained because its component is excluded. For example, only SDK installations were selected, but the install is part of a shared framework like ASP.NET Core. |
| NoneReleaseVersionExcluded | Release Version | The installation will be retained because it does not match the specified release version. |
| NoneDependentsExist | Dependency Provider | The installation will be retained because another product still depends on it. For example, the same MSI was installed by both a standalone bundle and one or more Visual Studio instances. |
| NoneUnsigned | Signing | The installation package on disk is not signed. |
| Uninstall | N/A | The installation was successfully evaluated agaisnt all active policies and will be removed. |
| UninstallParentDependency | N/A | The installation will be removed because a parent dependency will be removed, e.g., an MSI will be removed becasue the .NET bundle to which it belongs will be removed. |
| UninstallOrphanedByVs | N/A | The installation will be removed because it was orphaned by Visual Studio. |
| NoneEolVersion | N/A | The product associated with an installation is EOL and won't be updated. |
| NoneDiscontinuedSdk | N/A | The .NET product is still supported, but the latest updates no longer include the specific feature band. |
| NoneNoComponent | N/A | The release data does not have any component data about the SDK or runtime. |
| NoneNoComponentFile | N/A | The release data includes component data, but not information about individual installation files. |

## Examples

- Remove all .NET installations that are end-of-life (EOL).

  ```console
  dnim-win-[x86|x64|arm64] uninstall --sp eol
  ```

- Remove all .NET installs, but retain the latest version for any products that are in active support if they are installed.

  ```console
  dnim-win-[x86|x64|arm64] uninstall --klsp active
  ```

  Assume .NET 9 and 8 are in active support and when the command was executed, the latest releases included 9.0.19 and 8.0.30. If a device has .NET 9.0.17 and 8.0.30 installed, the command will remove 9.0.17, but retain 8.0.30.

- Remove all SDK bundles if their release version is less than 10.0.0.

  ```console
  dnim-win-[x86|x64|arm64] uninstall --it sdk --it bundle --rv [,10.0.0)
  ```

## See also

[.NET Installs](dnim-net-installs.md)
