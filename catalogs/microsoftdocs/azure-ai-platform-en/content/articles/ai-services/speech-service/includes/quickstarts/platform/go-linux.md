---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.custom: linux-related-content
ms.topic: include
ms.date: 02/02/2024
ms.author: pafarley
---

## Platform requirements

The Speech SDK for Go supports the following distributions on the x64 architecture:

- Ubuntu 20.04/22.04/24.04
- Debian 11/12


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


Install the [Go binary version 1.13 or later](https://go.dev/dl/).

## Install the Speech SDK for Go


Use the following procedure to download and install the SDK. The steps include [downloading the required libraries and header files](https://aka.ms/csspeech/linuxbinary) as a *.tar* file.

1. Choose a directory for the Speech SDK files. Set the `SPEECHSDK_ROOT` environment variable to point to that directory. This variable makes it easy to refer to the directory in future commands.

   To use the directory *speechsdk* in your home directory, run the following command:

   ```console
   export SPEECHSDK_ROOT="$HOME/speechsdk"
   ```

1. Create the directory if it doesn't exist:

   ```console
   mkdir -p "$SPEECHSDK_ROOT"
   ```

1. Download and extract the *.tar.gz* archive that contains the Speech SDK binaries:

   ```console
   wget -O SpeechSDK-Linux.tar.gz https://aka.ms/csspeech/linuxbinary
   tar --strip 1 -xzf SpeechSDK-Linux.tar.gz -C "$SPEECHSDK_ROOT"
   ```

1. Validate the contents of the top-level directory of the extracted package:

   ```console
   ls -l "$SPEECHSDK_ROOT"
   ```

   The directory listing should contain the partner notices and license files. The listing should also contain an *include* directory that holds header (*.h*) files and a *lib* directory that holds libraries for arm32, arm64, and x64.

    | Path | Description |
    | :--- | :--- |
    | *license.md* | License |
    | *ThirdPartyNotices.md* | Partner notices |
    | *REDIST.txt* | Redistribution notice |
    | *include* | Required header files for C++ |
    | *lib/arm32* | Native library for ARM32 required to link your application |
    | *lib/arm64* | Native library for ARM64 required to link your application |
    | *lib/x64* | Native library for x64 required to link your application |


### Configure the Go environment

The following steps enable your Go environment to find the Speech SDK.

1. Because the bindings rely on `cgo`, you need to set the environment variables so Go can find the SDK.

   ```console
   export CGO_CFLAGS="-I$SPEECHSDK_ROOT/include/c_api"
   export CGO_LDFLAGS="-L$SPEECHSDK_ROOT/lib/<architecture> -lMicrosoft.CognitiveServices.Speech.core"
   ```

   > **Important:**
   > Replace `<architecture>` with the processor architecture of your CPU: `x64`, `arm32`, or `arm64`.

1. To run applications and the SDK, you need to tell the operating system where to find the libraries.

   ```console
   export LD_LIBRARY_PATH="$SPEECHSDK_ROOT/lib/<architecture>:$LD_LIBRARY_PATH"
   ```

   > **Important:**
   > Replace `<architecture>` with the processor architecture of your CPU: `x64`, `arm32`, or `arm64`.
