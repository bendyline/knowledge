---
title: dnim layout command
description: The layout command creates a cache for offline deployments.
author: joeloff
ms.date: 08/11/2026
---

# dnim layout

## Name

`dnim-win-[x86|x64|arm64] layout` - Creates or updates a cache for offline deployments.

## Synopsis

```dotnetcli
dnim-win-[x86|x64|arm64] layout <DIRECTORY> [-a|--accept-license]
    [--include-installers]
    [--include-previews]
    [-l|--log-file <LOG_FILE>] 
    [--latest]
    [-v|--verbosity <quiet|normal|diagnostic>]

dnim-win-[x86|x64|arm64] layout -?|-h|--help
```

## Description

The command creates or updates a cache used for offline deployments inside network restricted environments. The command requires internet access to download the necessary files and will verify the signatures of any installers that are downloaded. Adminitrators should place the files on a machine that is accessible from client devices inside the network.

## Options

- **`-a|--accept-license`**

Automatically accept the license agreement. On first run, the user will be prompted to accept the license. The command will fail if the verbosity is set to `quiet` and the tool is executed for the first time. Administrators should include this option when deploying DNIM across their network.


- **`--include-installers`**

Download installation packages when creating or updating a layout.


- **`--include-previews`**

Include preview versions when downloading installation packages.


- **`-l|--log-file <LOG_FILE>`**

Specify the path of the log file. By default, DNIM creates a timestamped log file in the user's temporary directory.


- **`--latest`**

Include only the latest release of each product.


- **`-v|--verbosity <quiet|normal|diagnostic>`**

Set the console output verbosity. Log files always contain diagnostic output. The default value is `normal`.


## Examples

- Create an offline deployment in `C:\dnim\layout` that only includes the release metadata (no installers).

  ```console
  dnim-win-[x86|x64|arm64] layout C:\dnim\layout
  ```

- Create an offline deployment in `C:\dnim\layout` that includes the latest installers.

  ```console
  dnim-win-[x86|x64|arm64] layout C:\dnim\layout --include-installers --latest
  ```

## See also
