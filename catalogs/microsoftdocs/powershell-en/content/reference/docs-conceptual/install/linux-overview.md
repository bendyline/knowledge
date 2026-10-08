---
description: This article lists the Linux distributions and package managers that are supported for installing PowerShell.
ms.date: 03/31/2026
title: PowerShell support for Linux
---
# PowerShell support for Linux

PowerShell can be installed on several different Linux distributions. Most Linux platforms and
distributions have a major release each year, and provide a package manager that's used to install
PowerShell. PowerShell can be installed on some distributions of Linux that aren't supported by
Microsoft. In those cases, you may find support from the community for PowerShell on those
platforms. For more information, see the [PowerShell Support Lifecycle][01] documentation.

This article lists the supported Linux distributions and package managers. All PowerShell releases
remain supported until either the version of PowerShell or the version of the Linux distribution
reaches end-of-support.

For the best compatibility, choose a long-term release (LTS) version.

## Alpine

<!-- markdownlint-disable first-line-h1 -->
Microsoft supports PowerShell until [PowerShell reaches end-of-support][lifecycle] or the version of
[Alpine reaches end-of-life][eol-alpine].

Support for these versions of Alpine ends on the following dates:

- Alpine 3.24 - 2028-06-01
- Alpine 3.23 - 2027-11-01
- Alpine 3.22 - 2027-05-01
- Alpine 3.21 - 2026-11-01

The Docker images for the .NET SDK contain the latest versions of PowerShell. These images are
available from the [Microsoft Artifact Registry][mcr].

These images are built from official operating system (OS) images provided by the OS distributor.
These images may not have the latest security updates. Microsoft recommends that you update the OS
packages to the latest version to ensure the latest security updates are applied.

These images are provided for testing purposes. If you need a Docker image for a production
workload, you should build and maintain your own.

[lifecycle]: https://learn.microsoft.com/powershell/scripting/install/powershell-support-lifecycle
[eol-alpine]: https://alpinelinux.org/releases/
[mcr]: https://mcr.microsoft.com/en-us/artifact/mar/dotnet/sdk/tags


For more information, see [Install PowerShell on Alpine][03].

## Debian

Debian uses APT (Advanced Package Tool) as a package manager.

<!-- markdownlint-disable first-line-h1 -->
Microsoft supports PowerShell until [PowerShell reaches end-of-support][lifecycle] or the version of
[Debian reaches end-of-life][eol-debian].

Support for these versions of Debian ends on the following dates:

- Debian 13 - 2030-06-30
- Debian 12 - 2028-06-30

Install package files (`.deb`) are also available from [https://packages.microsoft.com/][pcm].

The Docker images for the .NET SDK contain the latest versions of PowerShell. These images are
available from the [Microsoft Artifact Registry][mcr].

These images are built from official operating system (OS) images provide by the OS distributor.
These images may not have the latest security updates. Microsoft recommends that you update the OS
packages to the latest version to ensure the latest security updates are applied.

These images are provided for testing purposes. If you need a Docker image for a production
workload, you should build and maintain your own.

[lifecycle]: https://learn.microsoft.com/powershell/scripting/install/powershell-support-lifecycle
[eol-debian]: https://wiki.debian.org/DebianReleases
[mcr]: https://mcr.microsoft.com/en-us/artifact/mar/dotnet/sdk/tags
[pcm]: https://packages.microsoft.com/


For more information, see [Install PowerShell on Debian][04].

## Red Hat Enterprise Linux (RHEL)

RHEL 7 uses yum and RHEL 8 uses the dnf package manager.

<!-- markdownlint-disable first-line-h1 -->
Microsoft supports PowerShell until [PowerShell reaches end-of-support][lifecycle] or the version of
[RHEL reaches end-of-support][eol-rhel].

Support for these versions of RHEL ends on the following dates:

- RHEL 10 - 2035-05-31
- RHEL 9 - 2032-05-31
- RHEL 8 - 2029-05-31

Install package files (`.rpm`) are also available from [https://packages.microsoft.com/][pcm].

PowerShell is tested on Red Hat Universal Base Images (UBI). For more information, see the
[UBI information page][ubi].

[lifecycle]: https://learn.microsoft.com/powershell/scripting/install/powershell-support-lifecycle
[eol-rhel]: https://access.redhat.com/support/policy/updates/errata/
[ubi]: https://developers.redhat.com/products/rhel/ubi
[pcm]: https://packages.microsoft.com/


For more information, see [Install PowerShell on RHEL][06].

## Ubuntu

Ubuntu uses APT (Advanced Package Tool) as a package manager.

<!-- markdownlint-disable first-line-h1 -->
Microsoft supports PowerShell until [PowerShell reaches end-of-support][lifecycle] or the version of
[Ubuntu reaches end-of-support][eol-ubuntu].

Support for these versions of Ubuntu ends on the following dates:

- Ubuntu 26.04 (Resolute Raccoon) - 2031-05-29
- Ubuntu 24.04 (Noble Numbat) - 2029-05-31
- Ubuntu 22.04 (Jammy Jellyfish) - 2027-06-01

Install package files (`.deb`) are also available from [https://packages.microsoft.com/][pcm].

The Docker images for the .NET SDK contain the latest versions of PowerShell. You can download these
images from the [Microsoft Artifact Registry][mcr].

These images are built from official operating system (OS) images provide by the OS distributor.
These images may not have the latest security updates. Microsoft recommends that you update the OS
packages to the latest version to ensure the latest security updates are applied.

These images are provided for testing purposes. If you need a Docker image for a production
workload, you should build and maintain your own.

> **Note:**
> Ubuntu 25.10 (Questing Quokka) is an interim release. Microsoft doesn't test or support
> [interim releases][interim] of Ubuntu. For more information, see
> [Community supported distributions][community].

[eol-ubuntu]: https://endoflife.date/ubuntu
[interim]: https://ubuntu.com/about/release-cycle
[lifecycle]: https://learn.microsoft.com/powershell/scripting/install/powershell-support-lifecycle
[community]: https://learn.microsoft.com/powershell/scripting/install/community-support
[mcr]: https://mcr.microsoft.com/en-us/artifact/mar/dotnet/sdk/tags
[pcm]: https://packages.microsoft.com/


For more information, see [Install PowerShell on Ubuntu][07].

## Community supported distributions

PowerShell can be installed on many distributions of Linux that aren't supported by Microsoft. In
those cases, you may find support from the community for PowerShell on those platforms.

To be supported by Microsoft, the Linux distribution must meet the following criteria:

- The version and architecture of the distribution is supported by .NET Core.
- The version of the distribution is supported for at least one year.
- The version of the distribution isn't an interim release or equivalent.
- The PowerShell team has tested the version of the distribution.

For more information, see [Community support for PowerShell on Linux][02].

## Alternate installation methods

There are other ways to install PowerShell on Linux, including Linux distributions that aren't
officially supported. You can try to install PowerShell using the PowerShell Snap Package. You can
also try deploying PowerShell binaries directly using the Linux `tar.gz` package. For more
information, see [Alternate ways to install PowerShell][05].

<!-- link references -->
[01]: https://github.com/MicrosoftDocs/PowerShell-Docs/blob/a3de8f22552170e70852470d46cd52cd9ca471ec/reference/docs-conceptual/PowerShell-Support-Lifecycle.md
[02]: community-support.md
[03]: install-alpine.md
[04]: install-debian.md
[05]: alternate-install-methods.md
[06]: install-rhel.md
[07]: install-ubuntu.md
