---
title: Install .NET on Ubuntu
description: Demonstrates the various ways to install .NET SDK and .NET Runtime on Ubuntu. .NET is usually installed through APT.
author: adegeo
ms.author: adegeo
ms.date: 04/23/2026
ms.custom: updateeachrelease, linux-related-content
zone_pivot_groups: ubuntu-install-set-one
---

# Install .NET SDK or .NET Runtime on Ubuntu

This article discusses how to install .NET on Ubuntu.


Install the SDK (which includes the runtime) if you want to develop .NET apps. Or, if you only need to run apps, install the Runtime. If you're installing the Runtime, we suggest you install the **ASP.NET Core Runtime** as it includes both .NET and ASP.NET Core runtimes.

Use the `dotnet --list-sdks` and `dotnet --list-runtimes` commands to see which versions are installed. For more information, see [How to check that .NET is already installed](how-to-detect-installed-versions.md).



> **Important:**
> Using a package manager to install .NET from the **Microsoft package feed** only supports the **x64** architecture. Other architectures, such as **Arm64**, aren't supported by the **Microsoft package feed**. Use the Ubuntu feeds or manually install .NET. Be cautious of package mix up problems when using multiple feeds. For more information, see [.NET package mix ups on Linux](linux-package-mixup.md?pivots=os-linux-ubuntu#whats-going-on).

For more information on installing .NET **without a package manager**, see one of the following articles:

- [Use the `install-dotnet` script to install .NET.](linux-scripted-manual.md#scripted-install)
- [Manually install .NET.](linux-scripted-manual.md#manual-install)


<!--
===== Ubuntu 26.04
-->

**Applies to: os-linux-ubuntu-2604**


## Ubuntu 26.04


.NET is available in the Ubuntu package manager feeds. The Microsoft package repository no longer contains .NET packages for Ubuntu.


The following versions of .NET are supported or available for Ubuntu 26.04:

| Supported .NET versions | Available in<br>built-in Ubuntu feed | [Available in<br>backports<br>Ubuntu feed](linux-ubuntu-decision.md#ubuntu-net-backports-package-repository) | [Available in<br>Microsoft feed](linux-ubuntu-decision.md#register-the-microsoft-package-repository) |
| --- | --- | --- | --- |
| 10.0, 9.0, 8.0 | 10.0 | 9.0, 8.0 | None |

When an [Ubuntu version](https://wiki.ubuntu.com/Releases) falls out of support, .NET is no longer supported with that version.

# [.NET 10](#tab/dotnet10)


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


.NET is available in the Ubuntu .NET backports package repository. To add the repository, open a terminal and run the following command:

```bash
sudo add-apt-repository ppa:dotnet/backports
```



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


.NET is available in the Ubuntu .NET backports package repository. To add the repository, open a terminal and run the following command:

```bash
sudo add-apt-repository ppa:dotnet/backports
```



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

## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you'll need to make sure these libraries are installed:

- ca-certificates
- libbrotli1
- libc6
- libgcc-s1
- libgssapi-krb5-2
- libicu78
- libssl3t64
- libstdc++6
- tzdata
- zlib1g


Dependencies can be installed with the `apt install` command. The following snippet demonstrates installing the `zlib1g` library:

```bash
sudo apt install zlib1g
```




<!--
===== Ubuntu 25.10
-->

**Applies to: os-linux-ubuntu-2510**


## Ubuntu 25.10


.NET is available in the Ubuntu package manager feeds. The Microsoft package repository no longer contains .NET packages for Ubuntu.


The following versions of .NET are supported or available for Ubuntu 25.10:

| Supported .NET versions | Available in<br>built-in Ubuntu feed | [Available in<br>backports<br>Ubuntu feed](linux-ubuntu-decision.md#ubuntu-net-backports-package-repository) | [Available in<br>Microsoft feed](linux-ubuntu-decision.md#register-the-microsoft-package-repository) |
| --- | --- | --- | --- |
| 10.0, 9.0, 8.0 | 10.0, 9.0, 8.0 | None | None |

When an [Ubuntu version](https://wiki.ubuntu.com/Releases) falls out of support, .NET is no longer supported with that version.

# [.NET 10](#tab/dotnet10)


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

## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you'll need to make sure these libraries are installed:

- ca-certificates
- libc6
- libgcc-s1
- libgssapi-krb5-2
- libicu76
- libssl3t64
- libstdc++6
- tzdata
- zlib1g


Dependencies can be installed with the `apt install` command. The following snippet demonstrates installing the `zlib1g` library:

```bash
sudo apt install zlib1g
```




<!--
===== Ubuntu 25.04
-->

**Applies to: os-linux-ubuntu-2504**


## Ubuntu 25.04


.NET is available in the Ubuntu package manager feeds. The Microsoft package repository no longer contains .NET packages for Ubuntu.


The following versions of .NET are supported or available for Ubuntu 25.04:

| Supported .NET versions | Available in<br>built-in Ubuntu feed | [Available in<br>backports<br>Ubuntu feed](linux-ubuntu-decision.md#ubuntu-net-backports-package-repository) | [Available in<br>Microsoft feed](linux-ubuntu-decision.md#register-the-microsoft-package-repository) |
| --- | --- | --- | --- |
| 10.0, 9.0, 8.0 | 10.0, 9.0, 8.0 | None | None |

When an [Ubuntu version](https://wiki.ubuntu.com/Releases) falls out of support, .NET is no longer supported with that version.

# [.NET 10](#tab/dotnet10)


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

## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you'll need to make sure these libraries are installed:

- ca-certificates
- libc6
- libgcc-s1
- libgssapi-krb5-2
- libicu76
- libssl3t64
- libstdc++6
- tzdata
- zlib1g


Dependencies can be installed with the `apt install` command. The following snippet demonstrates installing the `zlib1g` library:

```bash
sudo apt install zlib1g
```




<!--
===== Ubuntu 24.04
-->

**Applies to: os-linux-ubuntu-2404**


## Ubuntu 24.04


.NET is available in the Ubuntu package manager feeds. The Microsoft package repository no longer contains .NET packages for Ubuntu.


The following versions of .NET are supported or available for Ubuntu 24.04:

| Supported .NET versions | Available in<br>built-in Ubuntu feed | [Available in<br>backports<br>Ubuntu feed](linux-ubuntu-decision.md#ubuntu-net-backports-package-repository) | [Available in<br>Microsoft feed](linux-ubuntu-decision.md#register-the-microsoft-package-repository) |
| --- | --- | --- | --- |
| 10.0, 9.0, 8.0 | 10.0, 8.0 | 9.0, 7.0, 6.0 | None |

When an [Ubuntu version](https://wiki.ubuntu.com/Releases) falls out of support, .NET is no longer supported with that version.

# [.NET 10](#tab/dotnet10)


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


.NET is available in the Ubuntu .NET backports package repository. To add the repository, open a terminal and run the following command:

```bash
sudo add-apt-repository ppa:dotnet/backports
```



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

## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you'll need to make sure these libraries are installed:

- ca-certificates
- libc6
- libgcc-s1
- libgssapi-krb5-2
- libicu74
- libssl3t64
- libstdc++6
- tzdata
- zlib1g


Dependencies can be installed with the `apt install` command. The following snippet demonstrates installing the `zlib1g` library:

```bash
sudo apt install zlib1g
```




<!--
===== Ubuntu 22.04
-->

**Applies to: os-linux-ubuntu-2204**


## Ubuntu 22.04


.NET is available in the Ubuntu package manager feeds, as well as the Microsoft package repository. However, you should only use one or the other to install .NET. Microsoft recommends that you use the Ubuntu package manager feeds. If you want to use the Microsoft package repository, see [How to register the Microsoft package repository](linux-ubuntu-decision.md#register-the-microsoft-package-repository).


The following versions of .NET are supported or available for Ubuntu 22.04:

| Supported .NET versions | Available in<br>built-in Ubuntu feed | [Available in<br>.NET backports<br>Ubuntu feed](linux-ubuntu-decision.md#ubuntu-net-backports-package-repository) | [Available in<br>Microsoft feed](linux-ubuntu-decision.md#register-the-microsoft-package-repository) |
| --- | --- | --- | --- |
| 10.0, 9.0, 8.0 | 8.0, 7.0, 6.0 | 10.0, 9.0 | 8.0, 7.0, 6.0, 3.1 |


> **Important:**
> If you're using .NET 8 SDK and Ubuntu 22.04, understand that SDK versions offered by Canonical are always in the [.1xx feature band](../versions/index.md#versioning-details). If you want to use a newer feature band release, use the [Microsoft feed to install the SDK](linux-ubuntu-decision.md#register-the-microsoft-package-repository). Make sure you review the information in the [.NET package mix ups on Linux](linux-package-mixup.md?pivots=os-linux-ubuntu#whats-going-on) article to understand the implications of switching between repository feeds.


When an [Ubuntu version](https://wiki.ubuntu.com/Releases) falls out of support, .NET is no longer supported with that version.

# [.NET 10](#tab/dotnet10)


.NET is available in the Ubuntu .NET backports package repository. To add the repository, open a terminal and run the following command:

```bash
sudo add-apt-repository ppa:dotnet/backports
```



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


.NET is available in the Ubuntu .NET backports package repository. To add the repository, open a terminal and run the following command:

```bash
sudo add-apt-repository ppa:dotnet/backports
```



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

## Dependencies

When you install with a package manager, these libraries are installed for you. But, if you manually install .NET or you publish a self-contained app, you'll need to make sure these libraries are installed:

- ca-certificates
- libc6
- libgcc-s1
- libgssapi-krb5-2
- libicu70
- libssl3
- libstdc++6
- tzdata
- zlib1g


Dependencies can be installed with the `apt install` command. The following snippet demonstrates installing the `zlib1g` library:

```bash
sudo apt install zlib1g
```




<!--
===== All versions
-->

**Applies to: os-linux-ubuntu-2604,os-linux-ubuntu-2510,os-linux-ubuntu-2504,os-linux-ubuntu-2404,os-linux-ubuntu-2204**


## Unsupported versions


The following versions of .NET are ❌ no longer supported:

- .NET 7
- .NET 6
- .NET 5
- .NET Core 3.1
- .NET Core 3.0
- .NET Core 2.2
- .NET Core 2.1
- .NET Core 2.0


## How to install other versions

.NET package names are standardized across all Linux distributions. The following table lists the packages:


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




## Next steps

- [.NET CLI overview](../tools/index.md)
- [How to enable TAB completion for the .NET CLI.](../tools/enable-tab-autocomplete.md)
- [Tutorial: Create a console application with .NET.](../tutorials/create-console-app.md)
