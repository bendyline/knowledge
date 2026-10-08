---
title: Install .NET on Debian
description: Learn about which versions of .NET SDK and .NET Runtime are supported, and how to install .NET on Debian.
author: adegeo
ms.author: adegeo
ms.date: 04/23/2026
ms.custom: linux-related-content
---

# Install the .NET SDK or the .NET Runtime on Debian

This article describes how to install .NET on Debian. When a Debian version falls out of support, .NET is no longer supported with that version. However, these instructions might help you to get .NET running on those versions, even though it isn't supported.


Install the SDK (which includes the runtime) if you want to develop .NET apps. Or, if you only need to run apps, install the Runtime. If you're installing the Runtime, we suggest you install the **ASP.NET Core Runtime** as it includes both .NET and ASP.NET Core runtimes.

Use the `dotnet --list-sdks` and `dotnet --list-runtimes` commands to see which versions are installed. For more information, see [How to check that .NET is already installed](how-to-detect-installed-versions.md).


## Supported distributions

The following table is a list of currently supported .NET releases and the versions of Debian they're supported on. These versions remain supported until either the version of [.NET reaches end-of-support](https://dotnet.microsoft.com/platform/support/policy/dotnet-core) or the version of [Debian reaches end-of-life](https://wiki.debian.org/DebianReleases).

| Debian | .NET |
| --- | --- |
| 13 | 10, 9, 8 |
| 12 | 10, 9, 8 |


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


## Debian 13


Installing with APT can be done with a few commands. Before you install .NET, run the following commands to add the Microsoft package signing key to your list of trusted keys and add the package repository.

Open a terminal and run the following commands:


```bash
wget https://packages.microsoft.com/config/debian/13/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb
```

# [.NET 10](#tab/dotnet10)


> **Important:**
> The **Microsoft package feed** only publishes **x64** and **Arm64** packages for .NET 10. If you need to install .NET on other architectures, such as **Arm32**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - [Use the `install-dotnet` script to install .NET.](linux-scripted-manual.md#scripted-install)
> - [Manually install .NET.](linux-scripted-manual.md#manual-install)



### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-10.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following commands install the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-10.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-10.0` in the previous command with `dotnet-runtime-10.0`:

```bash
sudo apt-get install -y dotnet-runtime-10.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).


# [.NET 9](#tab/dotnet9)


> **Important:**
> The **Microsoft package feed** only publishes **x64** packages for .NET 9 and .NET 8. If you need to install .NET on other architectures, such as **Arm64**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - [Use the `install-dotnet` script to install .NET.](linux-scripted-manual.md#scripted-install)
> - [Manually install .NET.](linux-scripted-manual.md#manual-install)



### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-9.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following commands install the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-9.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-9.0` in the previous command with `dotnet-runtime-9.0`:

```bash
sudo apt-get install -y dotnet-runtime-9.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).


# [.NET 8](#tab/dotnet8)


> **Important:**
> The **Microsoft package feed** only publishes **x64** packages for .NET 9 and .NET 8. If you need to install .NET on other architectures, such as **Arm64**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - [Use the `install-dotnet` script to install .NET.](linux-scripted-manual.md#scripted-install)
> - [Manually install .NET.](linux-scripted-manual.md#manual-install)



### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-8.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following commands install the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-8.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-8.0` in the previous command with `dotnet-runtime-8.0`:

```bash
sudo apt-get install -y dotnet-runtime-8.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).


---

## Debian 12


Installing with APT can be done with a few commands. Before you install .NET, run the following commands to add the Microsoft package signing key to your list of trusted keys and add the package repository.

Open a terminal and run the following commands:


```bash
wget https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb
```

# [.NET 10](#tab/dotnet10)


> **Important:**
> The **Microsoft package feed** only publishes **x64** and **Arm64** packages for .NET 10. If you need to install .NET on other architectures, such as **Arm32**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - [Use the `install-dotnet` script to install .NET.](linux-scripted-manual.md#scripted-install)
> - [Manually install .NET.](linux-scripted-manual.md#manual-install)



### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-10.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following commands install the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-10.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-10.0` in the previous command with `dotnet-runtime-10.0`:

```bash
sudo apt-get install -y dotnet-runtime-10.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).


# [.NET 9](#tab/dotnet9)


> **Important:**
> The **Microsoft package feed** only publishes **x64** packages for .NET 9 and .NET 8. If you need to install .NET on other architectures, such as **Arm64**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - [Use the `install-dotnet` script to install .NET.](linux-scripted-manual.md#scripted-install)
> - [Manually install .NET.](linux-scripted-manual.md#manual-install)



### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-9.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following commands install the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-9.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-9.0` in the previous command with `dotnet-runtime-9.0`:

```bash
sudo apt-get install -y dotnet-runtime-9.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).


# [.NET 8](#tab/dotnet8)


> **Important:**
> The **Microsoft package feed** only publishes **x64** packages for .NET 9 and .NET 8. If you need to install .NET on other architectures, such as **Arm64**, don't use a package manager with the Microsoft package feed. For more information on installing .NET **without a package manager**, see one of the following articles:
>
> - [Use the `install-dotnet` script to install .NET.](linux-scripted-manual.md#scripted-install)
> - [Manually install .NET.](linux-scripted-manual.md#manual-install)



### Install the SDK

The .NET SDK allows you to develop apps with .NET. If you install the .NET SDK, you don't need to install the corresponding runtime. To install the .NET SDK, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-8.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).

### Install the runtime

The ASP.NET Core Runtime allows you to run apps that were made with .NET that didn't provide the runtime. The following commands install the ASP.NET Core Runtime, which is the most compatible runtime for .NET. In your terminal, run the following commands:

```bash
sudo apt-get update && \
  sudo apt-get install -y aspnetcore-runtime-8.0
```

As an alternative to the ASP.NET Core Runtime, you can install the .NET Runtime, which doesn't include ASP.NET Core support: replace `aspnetcore-runtime-8.0` in the previous command with `dotnet-runtime-8.0`:

```bash
sudo apt-get install -y dotnet-runtime-8.0
```

To learn how to use the .NET CLI, see [.NET CLI overview](../tools/index.md).


---

## Use APT to update .NET

When a new patch release is available for .NET, you can upgrade it through APT with the following commands:

```bash
sudo apt-get update
sudo apt-get upgrade
```

If you upgraded your Linux distribution since installing .NET, you might need to reconfigure the Microsoft package repository. Run the installation instructions for your current distribution version to upgrade to the appropriate package repository for .NET updates.

## Troubleshooting

This section provides information on common errors you might get while using APT to install .NET.

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


### Unable to locate \\ Some packages could not be installed


If you receive an error message similar to **Unable to locate package {dotnet-package}** or **Some packages could not be installed**, run the following commands.

There are two placeholders in the following set of commands.

- `{dotnet-package}`\
This represents the .NET package you're installing, such as `aspnetcore-runtime-8.0`. This is used in the following `sudo apt-get install` command.

First, try purging the package list:

```bash
sudo dpkg --purge packages-microsoft-prod && sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
```

Then, try to install .NET again. If that doesn't work, you can run a manual install with the following commands:


If you're using Debian 12 or later, try the following commands:


```bash
# Get OS version info which adds the $ID and $VERSION_ID variables
source /etc/os-release

# Download the Microsoft keys
sudo apt-get install -y gpg wget
wget https://packages.microsoft.com/keys/microsoft.asc
cat microsoft.asc | gpg --dearmor -o microsoft.asc.gpg

# Add the Microsoft repository to the system's sources list
wget https://packages.microsoft.com/config/$ID/$VERSION_ID/prod.list
sudo mv prod.list /etc/apt/sources.list.d/microsoft-prod.list

# Move the key to the appropriate place
sudo mv microsoft.asc.gpg $(cat /etc/apt/sources.list.d/microsoft-prod.list | grep -oP "(?<=signed-by=).*(?=\])")

# Update packages and install .NET
sudo apt-get update && \
  sudo apt-get install -y {dotnet-package}
```

> **Note:**
> If you're using a derived distribution, such as Linux Mint, the `$ID` and `$VERSION_ID` variables from `/etc/os-release` might not match any directory on the Microsoft packages server, causing a 404 error. To resolve the error, check which Ubuntu or Debian version your distribution is based on and use those values instead. For example, Linux Mint 22 is based on Ubuntu 24.04, so use `ubuntu` for `$ID` and `24.04` for `$VERSION_ID`.


If you're using a Debian version older than 12, try the following commands:


```bash
# Define the OS version, name, and codename
source /etc/os-release

# Download the Microsoft keys
sudo apt-get install -y gpg wget
wget https://packages.microsoft.com/keys/microsoft.asc
cat microsoft.asc | gpg --dearmor -o microsoft.asc.gpg
sudo mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/

# Add the Microsoft repository to the system's sources list
wget https://packages.microsoft.com/config/$ID/$VERSION_ID/prod.list
sudo mv prod.list /etc/apt/sources.list.d/microsoft-prod.list

# Set ownership
sudo chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg
sudo chown root:root /etc/apt/sources.list.d/microsoft-prod.list

# Update packages and install .NET
sudo apt-get update && \
  sudo apt-get install -y {dotnet-package}
```

> **Note:**
> If you're using a derived distribution, such as Linux Mint, the `$ID` and `$VERSION_ID` variables from `/etc/os-release` might not match any directory on the Microsoft packages server, causing a 404 error. To resolve the error, check which Ubuntu or Debian version your distribution is based on and use those values instead. For example, Linux Mint 22 is based on Ubuntu 24.04, so use `ubuntu` for `$ID` and `24.04` for `$VERSION_ID`.


### Failed to fetch


While installing the .NET package, you may see an error similar to `Failed to fetch ... File has unexpected size ... Mirror sync in progress?`. This error could mean that the package feed for .NET is being upgraded with newer package versions, and that you should try again later. During an upgrade, the package feed shouldn't be unavailable for more than 30 minutes. If you continually receive this error for more than 30 minutes, please file an issue at <https://github.com/dotnet/core/issues>.


## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you'll need to make sure these libraries are installed:

### 13.x

- ca-certificates
- libc6
- libgcc-s1
- libgssapi-krb5-2
- libicu76
- libssl3t64
- libstdc++6
- tzdata
- zlib1g (required for .NET 8 only)

### 12.x

- ca-certificates
- libc6
- libgcc-s1
- libgssapi-krb5-2
- libicu72
- libssl3
- libstdc++6
- tzdata
- zlib1g (required for .NET 8 only)

### Other notes

Dependencies can be installed with the `apt install` command. The following snippet demonstrates installing the `libc6` library:

```bash
sudo apt install libc6
```

## Next steps

- [.NET CLI overview](../tools/index.md)
- [How to enable TAB completion for the .NET CLI](../tools/enable-tab-autocomplete.md)
- [Tutorial: Create a console application with .NET](../tutorials/create-console-app.md)
