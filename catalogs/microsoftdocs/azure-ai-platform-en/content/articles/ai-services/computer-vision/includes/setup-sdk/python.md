---
author: PatrickFarley
ms.service: azure-vision-foundry-tools
ms.custom: linux-related-content
ms.topic: include
ms.date: 08/01/2023
ms.author: pafarley
---

[Reference documentation](https://aka.ms/azsdk/image-analysis/ref-docs/python) | [Package (PyPi)](https://aka.ms/azsdk/image-analysis/package/pypi) | [Samples](https://aka.ms/azsdk/image-analysis/samples/python)

This guide shows how to install the Image Analysis SDK for Python.

## Platform requirements


The Image Analysis SDK for Python is compatible with Windows, Linux, and macOS.

<!--
# [Windows](#tab/windows)

On Windows, you must use the 64-bit target architecture. Windows 10 or later is required.

You must install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](/cpp/windows/latest-supported-vc-redist?view=msvc-170&preserve-view=true) for your platform. Installing this package for the first time might require a restart.

> [!IMPORTANT]
> Make sure that packages of the same target architecture are installed. For example, if you install the x64 redistributable package, then you need to install the x64 Python package.

# [Linux](#tab/linux)

The Image Analysis SDK for Python only supports **Ubuntu 18.04/20.04/22.04** and **Debian 9/10/11** on the x64 architecture when used with Linux.

[!INCLUDE [Linux distributions](linux-distributions.md)]

---

Install a version of [Python from 3.8 or later](https://wiki.python.org/moin/BeginnersGuide/Download).

To check your installation, open a terminal and run the command `python --version`. If it's installed properly, you'll get a response like "Python 3.8.10". If you're using Linux, you might need to run the command `python3 --version` instead. To enable use of `python` instead of `python3`, run `alias python='python3'` to set up an alias. The Image Analysis SDK quickstart samples specify `python` usage. 

Your Python installation should include [pip](https://pip.pypa.io/en/stable/). You can check if you have pip installed by running `pip --version` on the command line.
-->


## Install the Image Analysis SDK for Python

Before you install the Image Analysis SDK for Python, make sure to satisfy the [platform requirements](#platform-requirements).

**Choose your tool or IDE**

# [Terminal](#tab/terminal)

### Install from terminal

To install the Image Analysis SDK for Python, run this command in a terminal.

```console
pip install azure-ai-vision-imageanalysis
```

### Upgrade to the latest Image Analysis SDK

To upgrade to the latest Image Analysis SDK, run this command in a terminal:

```console
pip install --upgrade azure-ai-vision-imageanalysis
```

You can check which Image Analysis SDK for Python version is currently installed by running this command in a terminal:

```console
pip list
```

# [VS Code](#tab/vscode)

### Install the Image Analysis SDK by using Visual Studio Code

To install the Image Analysis SDK for Python:

1. Download and install [Visual Studio Code](https://code.visualstudio.com/Download).
1. Run Visual Studio Code and install the Python extension:

   1. Select **File** > **Preferences** > **Extensions**. 
   1. Search for **Python**, find the **Python extension for Visual Studio Code** published by Microsoft, and then select **Install**.

   Screenshot that shows selections for installing the Python extension.

1. Select **Terminal** > **New Terminal** to open a terminal within Visual Studio Code. 
1. At the terminal prompt, run the following command to install the Image Analysis SDK for Python package. 
    ```console
    pip install azure-ai-vision-imageanalysis
    ```

1. To upgrade to the latest Image Analysis SDK, run this command in a terminal:
    ```console
    pip install --upgrade azure-ai-vision-imageanalysis
    ```

1. You can check which Image Analysis SDK for Python version is currently installed by running this command:
    ```console
    pip list
    ```

For more information about Visual Studio Code and Python, see the [Visual Studio Code documentation](https://code.visualstudio.com/docs) and the [Visual Studio Code Python tutorial](https://code.visualstudio.com/docs/python/python-tutorial).

---
