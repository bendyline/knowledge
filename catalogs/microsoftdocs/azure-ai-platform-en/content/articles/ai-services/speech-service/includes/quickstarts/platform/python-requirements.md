---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.custom: linux-related-content
ms.topic: include
ms.date: 02/02/2024
ms.author: pafarley
---

The Speech SDK for Python is compatible with Windows, Linux, and macOS.

# [Windows](#tab/windows)

On Windows, you must use the 64-bit target architecture. Windows 11 or later is required.

Install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist?view=msvc-170\&preserve-view=true) for your platform. Installing this package for the first time might require a restart.

> **Important:**
> Make sure that packages of the same target architecture are installed. For example, if you install the x64 redistributable package, install the x64 Python package.

# [Linux](#tab/linux)

The Speech SDK for Python supports the following distributions on the x64 and ARM64 architectures:

- Ubuntu 20.04/22.04/24.04
- Debian 11/12
- Amazon Linux 2023
- Azure Linux 3.0


> **Important:**
> Use the most recent LTS release of the Linux distribution. For example, if you are using Ubuntu 20.04 LTS, use the latest release of Ubuntu 20.04.X.

The Speech SDK depends on the following Linux system libraries:

- The shared libraries of the GNU C library, including the POSIX Threads Programming library, `libpthreads`.
- The OpenSSL library, version 1.x (`libssl1`) or 3.x (`libssl3`), and certificates (`ca-certificates`).
- The shared library for ALSA applications (`libasound2`).

# [Ubuntu 20.04/22.04/24.04](#tab/ubuntu)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Debian 11/12](#tab/debian)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Amazon Linux 2023](#tab/amazon)


Run these commands:

```Bash
sudo yum update
sudo yum install alsa-lib ca-certificates openssl wget
```

# [Azure Linux 3.0](#tab/azure)

Run these commands:

```Bash
sudo tdnf update
sudo tdnf install alsa-lib ca-certificates openssl wget
```

---


# [macOS](#tab/macos)

A macOS version 10.14 or later is required.

---

Install a version of [Python from 3.8 or later](https://www.python.org/downloads/).

- To check your installation, open a terminal and run the command `python --version`. If Python installed properly, you get a response like `Python 3.8.10`.

- If you're using macOS or Linux, you might need to run the command `python3 --version` instead.

  To enable use of `python` instead of `python3`, run `alias python='python3'` to set up an alias. The Speech SDK quickstart samples specify `python` usage.
