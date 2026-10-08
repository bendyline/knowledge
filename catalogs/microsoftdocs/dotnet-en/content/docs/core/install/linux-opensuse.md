---
title: Install .NET on openSUSE Leap
description: Learn about which versions of .NET SDK and .NET Runtime are supported, and how to install .NET on openSUSE Leap.
author: adegeo
ms.author: adegeo
ms.date: 04/23/2026
ms.custom: linux-related-content
---

# Install the .NET SDK or the .NET Runtime on openSUSE Leap

.NET is supported on openSUSE Leap. This article describes how to install .NET on openSUSE Leap.


Install the SDK (which includes the runtime) if you want to develop .NET apps. Or, if you only need to run apps, install the Runtime. If you're installing the Runtime, we suggest you install the **ASP.NET Core Runtime** as it includes both .NET and ASP.NET Core runtimes.

Use the `dotnet --list-sdks` and `dotnet --list-runtimes` commands to see which versions are installed. For more information, see [How to check that .NET is already installed](how-to-detect-installed-versions.md).


## Supported distributions

The following table is a list of currently supported .NET releases on openSUSE Leap. These versions remain supported until either the version of [.NET reaches end-of-support](https://dotnet.microsoft.com/platform/support/policy/dotnet-core) or the version of openSUSE Leap is no longer supported.

| openSUSE Leap | .NET |
| --- | --- |
| 16 | 10, 9, 8 |


The following versions of .NET are ❌ no longer supported:

- .NET 7
- .NET 6
- .NET 5
- .NET Core 3.1
- .NET Core 3.0
- .NET Core 2.2
- .NET Core 2.1
- .NET Core 2.0


## Install preview versions


Preview and release candidate versions of .NET aren't available in package repositories. You can install previews and release candidates of .NET in one of the following ways:

- [Scripted install with *install-dotnet.sh*](linux-scripted-manual.md#scripted-install)
- [Manual binary extraction](linux-scripted-manual.md#manual-install)


## Remove preview versions


When using a package manager to manage your installation of .NET, you may run into a conflict if you've previously installed a preview release. The package manager may interpret the non-preview release as an earlier version of .NET. To install the non-preview release, first uninstall the preview versions. For more information about uninstalling .NET, see [How to remove the .NET Runtime and SDK](remove-runtime-sdk-versions.md?pivots=os-linux#uninstall-net).


## openSUSE Leap 16


Before you install .NET, run the following commands to add the Microsoft package signing key to your list of trusted keys and add the Microsoft package repository. Open a terminal and run the following commands:


```bash
sudo zypper install libicu
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
wget https://packages.microsoft.com/config/opensuse/16/prod.repo
sudo mv prod.repo /etc/zypp/repos.d/microsoft-prod.repo
sudo chown root:root /etc/zypp/repos.d/microsoft-prod.repo
```

# [.NET 10](#tab/dotnet10)


> **Important:**
> The **Microsoft package feed** only publishes **x64** and **Arm64** packages for .NET 10. If you need to install .NET on other architectures, such as **Arm32**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - [Use the `install-dotnet` script to install .NET.](linux-scripted-manual.md#scripted-install)
> - [Manually install .NET.](linux-scripted-manual.md#manual-install)



### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following command:

```bash
sudo zypper install dotnet-sdk-10.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following command installs the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following command:

```bash
sudo zypper install aspnetcore-runtime-10.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-10.0` in the previous command with `dotnet-runtime-10.0`:

```bash
sudo zypper install dotnet-runtime-10.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).


# [.NET 9](#tab/dotnet9)


> **Important:**
> The **Microsoft package feed** only publishes **x64** packages for .NET 9 and .NET 8. If you need to install .NET on other architectures, such as **Arm64**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - [Use the `install-dotnet` script to install .NET.](linux-scripted-manual.md#scripted-install)
> - [Manually install .NET.](linux-scripted-manual.md#manual-install)



### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following command:

```bash
sudo zypper install dotnet-sdk-9.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following command installs the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following command:

```bash
sudo zypper install aspnetcore-runtime-9.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-9.0` in the previous command with `dotnet-runtime-9.0`:

```bash
sudo zypper install dotnet-runtime-9.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).


# [.NET 8](#tab/dotnet8)


> **Important:**
> The **Microsoft package feed** only publishes **x64** packages for .NET 9 and .NET 8. If you need to install .NET on other architectures, such as **Arm64**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - [Use the `install-dotnet` script to install .NET.](linux-scripted-manual.md#scripted-install)
> - [Manually install .NET.](linux-scripted-manual.md#manual-install)



### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following command:

```bash
sudo zypper install dotnet-sdk-8.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following command installs the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following command:

```bash
sudo zypper install aspnetcore-runtime-8.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-8.0` in the previous command with `dotnet-runtime-8.0`:

```bash
sudo zypper install dotnet-runtime-8.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).


---

## How to install other versions


All versions of .NET are available for download at <https://dotnet.microsoft.com/download/dotnet>, but require [manual installation](linux-scripted-manual.md). You can try to use the package manager to install a different version of .NET. However, the requested version might not be available.

The packages added to package manager feeds are named in a hackable format, for example: `{product}-{type}-{version}`.

- **product**\
The type of .NET product to install. Valid options are:

  - `dotnet`
  - `aspnetcore`

- **type**\
Chooses the SDK or the runtime. Valid options are:

  - `sdk` (only available for the **dotnet** product)
  - `runtime`

- **version**\
The version of the SDK or runtime to install. Valid options are any released version, such as:

  - `9.0`
  - `8.0`
  - `3.1`
  - `2.1`

  It's possible the SDK/runtime you're trying to download isn't available for your Linux distribution. For a list of supported distributions, see [Install .NET on Linux](linux.md).

### Examples

- Install the ASP.NET Core 9.0 runtime: `aspnetcore-runtime-9.0`
- Install the .NET Core 2.1 runtime: `dotnet-runtime-2.1`
- Install the .NET 5 SDK: `dotnet-sdk-5.0`
- Install the .NET Core 3.1 SDK: `dotnet-sdk-3.1`

> **Note:**
> Some package might not be available on your Linux distribution.

### Package missing

If the package-version combination doesn't work, it's not available. For example, there isn't an ASP.NET Core SDK. The SDK components for ASP.NET Core are included with the .NET SDK. The value `aspnetcore-sdk-8.0` is incorrect and should be `dotnet-sdk-8.0`. For a list of Linux distributions supported by .NET, see [.NET dependencies and requirements](linux.md).


## Troubleshoot the package manager

This section provides information on common errors you may get while using the package manager to install .NET.

### Unable to find package


> **Important:**
> The **Microsoft package feed** publishes packages for different architectures depending on the .NET version:
>
> - **.NET 10**: **x64** and **Arm64** packages only.
> - **.NET 9**: **x64** packages only.
> - **.NET 8**: **x64** packages only.
>
> If you need to install .NET on other architectures, such as **Arm32**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - [Use the `install-dotnet` script to install .NET.](linux-scripted-manual.md#scripted-install)
> - [Manually install .NET.](linux-scripted-manual.md#manual-install)


### Failed to fetch


While installing the .NET package, you may see an error similar to `signature verification failed for file 'repomd.xml' from repository 'packages-microsoft-com-prod'`. Generally speaking, this error means that the package feed for .NET is being upgraded with newer package versions, and that you should try again later. During an upgrade, the package feed should not be unavailable for more than 2 hours. If you continually receive this error for more than 2 hours, please file an issue at <https://github.com/dotnet/core/issues>.


## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you'll need to make sure these libraries are installed:

- ca-certificates
- glibc
- krb5
- libgcc_s1
- libicu
- libopenssl3
- libstdc++6
- timezone
- zlib (required for .NET 8 only)

> **Important:**
> .NET packages for openSUSE depend on OpenSSL 3.x (libopenssl3). For more information, see [.NET packages for openSUSE and SLES depend on OpenSSL 3.x](../compatibility/deployment/8.0/opensuse-sles-openssl3-dependency.md).

Dependencies can be installed with the `zypper install` command. The following snippet demonstrates installing the `krb5` library:

```bash
sudo zypper install krb5
```

For more information about the dependencies, see [Self-contained Linux apps](https://github.com/dotnet/core/blob/main/Documentation/self-contained-linux-apps.md).

## Next steps

- [.NET CLI overview](../tools/index.md)
- [How to enable TAB completion for the .NET CLI](../tools/enable-tab-autocomplete.md)
- [Tutorial: Create a console application with .NET](../tutorials/create-console-app.md)
