---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.custom: linux-related-content
ms.topic: include
ms.date: 02/02/2024
ms.author: pafarley
---


[Reference documentation](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/) | [Package (PyPi)](https://pypi.org/project/azure-cognitiveservices-speech/) | [Additional samples on GitHub](https://aka.ms/speech/github-python)


In this quickstart, you install the [Speech SDK](../../../speech-sdk.md) for Python.

## Platform requirements


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


## Install the Speech SDK for Python

Before you install the Speech SDK for Python, make sure to satisfy the [platform requirements](#platform-requirements).

# [PyPI](#tab/pypi)

### Install from PyPI

To install the Speech SDK for Python, run this command in a console window:

```console
pip install azure-cognitiveservices-speech
```

### Upgrade to the latest Speech SDK

To upgrade to the latest Speech SDK, run this command in console window:

```console
pip install --upgrade azure-cognitiveservices-speech
```

You can check which Speech SDK for Python version is currently installed by inspecting the `azure.cognitiveservices.speech.__version__` variable. For example, run this command in a console window:

```console
pip list
```

# [VS Code](#tab/vscode)

### Install the Speech SDK by using Visual Studio Code

To install the Speech SDK for Python:

1. Download and install [Visual Studio Code](https://code.visualstudio.com/Download).
1. Run Visual Studio Code and install the Python extension:

   1. Select **File** > **Preferences** > **Extensions**.
   1. Search for **Python**, find the **Python extension for Visual Studio Code** published by Microsoft, and then select **Install**.

   Screenshot that shows selections for installing the Python extension.

1. Select **Terminal** > **New Terminal** to open a terminal within Visual Studio Code.
1. At the terminal prompt, run the following command to install the Speech SDK for Python package.

    ```console
    python -m pip install azure-cognitiveservices-speech
    ```

For more information about Visual Studio Code and Python, see [Visual Studio Code](https://code.visualstudio.com/docs) and [Getting Started with Python in VS Code](https://code.visualstudio.com/docs/python/python-tutorial).

---

## Use the Speech SDK

Add the following import statement to use the Speech SDK in your Python project:

```python
import azure.cognitiveservices.speech as speechsdk
```
