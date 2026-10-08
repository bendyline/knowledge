---
title: "Breaking change: Microsoft.DotNet.PlatformAbstractions package removed"
description: Learn about the .NET 5 breaking change in core .NET libraries where the Microsoft.DotNet.PlatformAbstractions package has been removed.
ms.date: 11/01/2020
---
# Microsoft.DotNet.PlatformAbstractions package removed

No new versions of the [Microsoft.DotNet.PlatformAbstractions NuGet package](https://www.nuget.org/packages/Microsoft.DotNet.PlatformAbstractions/) will be produced.

## Change description

Previously, new versions of the [Microsoft.DotNet.PlatformAbstractions](https://learn.microsoft.com/search/?terms=Microsoft.DotNet.PlatformAbstractions) library were produced alongside new versions of .NET Core. Going forward, no new functionality will be added to the library, and no new major versions will be released. However, existing versions of the library will continue to work and be serviced.

The [Microsoft.DotNet.PlatformAbstractions](https://learn.microsoft.com/search/?terms=Microsoft.DotNet.PlatformAbstractions) library overlaps with APIs that are already established in the System.\* namespaces. Also, some [Microsoft.DotNet.PlatformAbstractions](https://learn.microsoft.com/search/?terms=Microsoft.DotNet.PlatformAbstractions) APIs weren't designed with the same level of scrutiny and long-term supportability as the rest of the System.\* APIs. For example, [Microsoft.DotNet.PlatformAbstractions](https://learn.microsoft.com/search/?terms=Microsoft.DotNet.PlatformAbstractions) uses the `Platform` enumeration to describe the current operating system platform. This enumeration design was explicitly rejected when the [System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform)) API was designed, to allow for new platforms and future flexibility.

The scenarios enabled by the [Microsoft.DotNet.PlatformAbstractions](https://learn.microsoft.com/search/?terms=Microsoft.DotNet.PlatformAbstractions) library are now possible without it. Existing versions will continue to work, even in .NET 5 and later, and will be serviced along with previous versions of .NET Core. However, new functionality won't be added to the library. Instead, new functionality will be added to other libraries and APIs.

## Version introduced

5.0

## Recommended action

- You can continue to use older versions of the library if they meet your requirements.

- If the older versions don't meet your requirements, replace usages of the `PlatformAbstractions` APIs with the recommended replacements.

  | `PlatformAbstractions` API | Recommended replacement |
  | --- | --- |
  | `ApplicationEnvironment.ApplicationBasePath` | [System.AppContext.BaseDirectory](https://learn.microsoft.com/search/?terms=System.AppContext.BaseDirectory) |
  | [Microsoft.DotNet.PlatformAbstractions.HashCodeCombiner](https://learn.microsoft.com/search/?terms=Microsoft.DotNet.PlatformAbstractions.HashCodeCombiner) | [System.HashCode](https://learn.microsoft.com/search/?terms=System.HashCode) |
  | `RuntimeEnvironment.GetRuntimeIdentifier()` | [System.Runtime.InteropServices.RuntimeInformation.RuntimeIdentifier](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeInformation.RuntimeIdentifier) |
  | `RuntimeEnvironment.OperatingSystemPlatform` | [System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform)](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform)) |
  | `RuntimeEnvironment.RuntimeArchitecture` | [System.Runtime.InteropServices.RuntimeInformation.ProcessArchitecture](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeInformation.ProcessArchitecture) |
  | `RuntimeEnvironment.OperatingSystem` | [System.Runtime.InteropServices.RuntimeInformation.OSDescription](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeInformation.OSDescription) |
  | `RuntimeEnvironment.OperatingSystemVersion` | [System.Runtime.InteropServices.RuntimeInformation.OSDescription](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeInformation.OSDescription) and [System.Environment.OSVersion](https://learn.microsoft.com/search/?terms=System.Environment.OSVersion) |

  > **Note:**
  > Most use cases for `RuntimeEnvironment.OperatingSystem` and `RuntimeEnvironment.OperatingSystemVersion` are for display purposes, for example, displaying to a user, logging, and telemetry. It's not recommended to make runtime decisions based on an operating system (OS) version. [System.Environment.OSVersion](https://learn.microsoft.com/search/?terms=System.Environment.OSVersion) now [returns the correct version](environment-osversion-returns-correct-version.md) for Windows and macOS operating systems. However, for most Unix distributions, what is considered to be the "OS version" is not as straightforward. For example, it could be the Linux kernel version, or it could be the distro version. For most Unix platforms, [System.Environment.OSVersion](https://learn.microsoft.com/search/?terms=System.Environment.OSVersion) and [System.Runtime.InteropServices.RuntimeInformation.OSDescription](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.RuntimeInformation.OSDescription) return the version that's returned by `uname`. To get the Linux distro name and version information, the recommended approach is to read the */etc/os-release* file.

## Affected APIs

- `Microsoft.DotNet.PlatformAbstractions.ApplicationEnvironment.ApplicationBasePath`
- [Microsoft.DotNet.PlatformAbstractions.HashCodeCombiner](https://learn.microsoft.com/search/?terms=Microsoft.DotNet.PlatformAbstractions.HashCodeCombiner)
- `Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.GetRuntimeIdentifier()`
- `Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.OperatingSystem`
- `Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.OperatingSystemPlatform`
- `Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.OperatingSystemVersion`
- `Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.RuntimeArchitecture`

<!--

### Category

Core .NET libraries

### Affected APIs

- `P:Microsoft.DotNet.PlatformAbstractions.ApplicationEnvironment.ApplicationBasePath`
- `T:Microsoft.DotNet.PlatformAbstractions.HashCodeCombiner`
- `M:Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.GetRuntimeIdentifier`
- `P:Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.OperatingSystem`
- `P:Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.OperatingSystemPlatform`
- `P:Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.OperatingSystemVersion`
- `P:Microsoft.DotNet.PlatformAbstractions.RuntimeEnvironment.RuntimeArchitecture`

-->
