---
title: Create IoT Edge device on Linux using symmetric keys
titleSuffix: Azure IoT Edge
description: Create and provision a single IoT Edge device in IoT Hub for manual provisioning with symmetric keys
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-edge
services: iot-edge
ms.topic: how-to
ms.date: 02/26/2026
ms.custom:
  - linux-related-content
  - sfi-ropc-nochange
---

# Create and provision an IoT Edge device on Linux using symmetric keys


**Applies to:** IoT Edge 1.6 checkmark IoT Edge 1.6

> **Important:**
> IoT Edge 1.6 LTS is the [supported release](support.md#releases). IoT Edge 1.5 LTS support ends on November 10, 2026; IoT Edge 1.4 LTS reached end of life on November 12, 2024. If you're using an earlier release, see [Update IoT Edge](how-to-update-iot-edge.md).

This article provides end-to-end instructions for registering and provisioning a Linux IoT Edge device that includes installing IoT Edge.

Each device that connects to an [IoT hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/index.yml) has a device ID that tracks [cloud-to-device](../iot-hub/iot-hub-devguide-c2d-guidance.md) or [device-to-cloud](../iot-hub/iot-hub-devguide-d2c-guidance.md) communications. You configure a device with its connection information, which includes:

* IoT hub hostname
* Device ID
* Authentication details to connect to IoT Hub

The steps in this article walk through a process called *manual provisioning*, where you connect a single device to its IoT hub. For manual provisioning, you have two options for authenticating IoT Edge devices:

* **Symmetric keys**: When you create a new device identity in IoT Hub, the service creates two keys. You place one of the keys on the device, and it presents the key to IoT Hub when authenticating.

  This authentication method is faster to get started, but isn't as secure.

* **X.509 self-signed**: You create two X.509 identity certificates and place them on the device. When you create a new device identity in IoT Hub, you provide thumbprints from both certificates. When the device authenticates to IoT Hub, it presents one certificate and IoT Hub verifies that the certificate matches its thumbprint.

  This authentication method is more secure and recommended for production scenarios.

This article covers using symmetric keys as your authentication method. If you want to use X.509 certificates, see [Create and provision an IoT Edge device on Linux using X.509 certificates](how-to-provision-single-device-linux-x509.md).

> **Note:**
> If you have many devices to set up and don't want to manually provision each one, use one of the following articles to learn how IoT Edge works with the IoT Hub device provisioning service:
>
> * [Create and provision IoT Edge devices at scale on Linux using X.509 certificates](how-to-provision-devices-at-scale-linux-x509.md)
> * [Create and provision IoT Edge devices at scale with a TPM on Linux](how-to-provision-devices-at-scale-linux-tpm.md)
> * [Create and provision IoT Edge devices at scale on Linux using symmetric keys](how-to-provision-devices-at-scale-linux-symmetric.md)

## Prerequisites

This article shows how to register your IoT Edge device and install IoT Edge (also called IoT Edge runtime) on your device. Make sure you have the device management tool of your choice, such as Azure CLI, and review device requirements before you register and install your device.

<!-- Device registration prerequisites H3 and content -->

### Device management tools

You can use the Azure portal, Visual Studio Code, or the Azure CLI to register your device. Each utility has its own prerequisites or might need to be installed:

# [Portal](#tab/azure-portal)

A free or standard [IoT hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-create-through-portal.md) in your Azure subscription.

# [Visual Studio Code](#tab/visual-studio-code)

* A free or standard [IoT hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-create-through-portal.md) in your Azure subscription
* [Visual Studio Code](https://code.visualstudio.com/)
* [Azure IoT Edge](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-edge) extension. The *Azure IoT Edge tools for Visual Studio Code* extension is in [maintenance mode](https://github.com/microsoft/vscode-azure-iot-edge/issues/639).
* [Azure IoT Hub](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-toolkit) extension

# [Azure CLI](#tab/azure-cli)

* A free or standard [IoT hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-create-using-cli.md) in your Azure subscription
* [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) in your environment

  At a minimum, your Azure CLI version must be 2.0.70 or newer. Use `az --version` to validate. This version supports `az` extension commands and introduces the Knack command framework.

---


<!-- Device requirements H3 and content -->

### Device requirements

An x64, ARM32, or ARM64 Linux device.

Microsoft publishes installation packages for various operating systems.

For the latest information about which operating systems are currently supported for production scenarios, see [Azure IoT Edge supported platforms](support.md#operating-systems).


<!-- Azure IoT extensions for Visual Studio Code-->
### Visual Studio Code extensions

If you're using Visual Studio Code, helpful Azure IoT extensions make the device creation and management process easier.

Install both the Azure IoT Edge and Azure IoT Hub extensions:

* [Azure IoT Edge](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-edge). The *Azure IoT Edge tools for Visual Studio Code* extension is in [maintenance mode](https://github.com/microsoft/vscode-azure-iot-edge/issues/639).
* [Azure IoT Hub](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-toolkit)

<!-- Prerequisites end -->

<!-- Register your device and View provisioning information H2s and content -->

## Register your device

You can use the Azure portal, Visual Studio Code, or Azure CLI to register your device, depending on your preference.

# [Portal](#tab/azure-portal)

In your IoT hub in the Azure portal, you create and manage IoT Edge devices separately from IoT devices that aren't edge enabled.

1. Sign in to the [Azure portal](https://portal.azure.com) and go to your IoT hub.

1. In the left pane, select **Devices** from the menu, and then select **Add Device**.

1. On **Create a device**, provide the following information:

   * Create a descriptive Device ID, such as `my-edge-device-1` (all lowercase). Copy this Device ID, as you use it later.
   * Select the **IoT Edge Device** checkbox.
   * Select **Symmetric key** as the authentication type.
   * Use the default settings to autogenerate authentication keys, which connect the new device to your hub.

1. Select **Save**.

You should see your new device listed in your IoT hub.

# [Visual Studio Code](#tab/visual-studio-code)

### Sign in to Azure

Use the Azure IoT extensions for Visual Studio Code to perform operations with your IoT hub. Make sure you install the Azure IoT extension prerequisites. 

After you install the Azure IoT Edge and Azure IoT Hub extensions, you see an Azure icon in the left icon menu. Sign in to your Azure account through Visual Studio Code by selecting the Azure icon and then selecting **Sign in to Azure**. 

### Register a new device with Visual Studio Code

Registering a new device is similar to creating an IoT Edge device in the Azure portal. This virtual device is one of the *twins*, whereas the real world device is the other twin. Visual Studio Code can set up this virtual device for you through the following steps:

1. In the Visual Studio Code Explorer menu, expand the **Azure IoT Hub** section.
1. Select the **...** ellipsis in the **Azure IoT Hub** section header. If you don't see the ellipsis, select or hover over the header.
1. Select **Create IoT Edge Device**.
1. In the text box that opens, give your device an ID, such as `my-edge-device-1` (all lowercase), and press **Enter**.

In the output console of Visual Studio Code, you see the result of the command: a JSON printout. The device information includes the **deviceId** that you provided and generates a **connectionString** value that you can use to connect your physical device to your IoT hub. The output console also shows your keys and other device identifying information.

You can now see your device listed under the **Azure IoT Hub > Devices** section of the Explorer menu.

> **Note:**
> If your device isn't listed, you might need to choose your IoT hub from the link **Select IoT Hub** provided under **Azure IoT Hub** and then follow the prompts. The prompts ask you to choose your subscription first and then your IoT hub. This process lets Visual Studio Code know about your IoT hub (and all devices in it). Refresh Visual Studio Code and your device should show.

# [Azure CLI](#tab/azure-cli)

Use the [`az iot hub device-identity create`](https://learn.microsoft.com/cli/azure/iot/hub/device-identity) command to create a new device identity in your IoT hub. Replace `device_id_here` with your own new and unique device ID, such as `my-edge-device-1` (all lowercase). Replace `hub_name_here` with your existing IoT hub.

This command includes three parameters:

* `--device-id` or `-d`: Provide a descriptive name that's unique within your IoT hub.
* `--hub-name` or `-n`: Provide the name of your IoT hub.
* `--edge-enabled` or `--ee`: Declare that the device is an IoT Edge device.

   ```azurecli
   az iot hub device-identity create --device-id device_id_here --hub-name hub_name_here --edge-enabled
   ```

If your CLI says **The command requires the extension azure-iot. Do you want to install it now?**, type **Y** and press **Enter** to initiate the download and create your device.

---

Now that you have a device registered in IoT Hub, in the next step you can retrieve provisioning information used to complete the installation and provisioning of the [IoT Edge runtime](iot-edge-runtime.md).

## View registered devices and retrieve provisioning information

Devices that use symmetric key authentication need their connection strings to complete installation and provisioning of the IoT Edge runtime. The connection string is generated for your IoT Edge device when you create the device. For Visual Studio Code and Azure CLI, the connection string appears in the JSON output. If you use the Azure portal to create your device, you can find the connection string from the device itself. When you select your device in your IoT hub, it's listed as **Primary connection string** on the device page.

# [Portal](#tab/azure-portal)

The edge-enabled devices that connect to your IoT hub are listed on the **Devices** page of your IoT hub. If you have multiple devices, you can filter the list by selecting the **Iot Edge Devices** type, then select **Apply**. 

When you're ready to set up your device, you need the connection string that links your physical device with its identity in the IoT hub. Devices that authenticate with symmetric keys have their connection strings available to copy in the portal. To find your connection string in the portal, perform the following steps:

1. From the **Devices** page, select the IoT Edge device ID from the list.
1. Copy the value of either **Primary Connection String** or **Secondary Connection String**. Either key works.

# [Visual Studio Code](#tab/visual-studio-code)

The **Azure IoT Hub** section of the Visual Studio Code Explorer lists all the devices that connect to your IoT hub. IoT Edge devices have a different icon, so you can easily distinguish them from non-edge devices. You can see that the **$edgeAgent** and **$edgeHub** modules are deployed to each IoT Edge device.

When you're ready to set up your device, you need the connection string that links your physical device with its identity in the IoT hub. Here's how to get your connection string from Visual Studio Code:

1. Right-click the ID (name) of your device in the **Azure IoT Hub** section.
1. Select **Copy Device Connection String**. The connection string is copied to your clipboard.

You can also select **Get Device Info** from the right-click context menu to see all the device info, including the connection string, in the output window.

# [Azure CLI](#tab/azure-cli)

To see all devices in your IoT hub, use the [`az iot hub device-identity list`](https://learn.microsoft.com/cli/azure/iot/hub/device-identity) command. Replace `hub_name_here` with your own IoT hub name:

```azurecli
az iot hub device-identity list --hub-name hub_name_here
```

Any device that you register as an IoT Edge device has the property **capabilities.iotEdge** set to **true**. You can see a lot of other metadata as JSON output as well, including your device IDs.

When you're ready to set up your device, you need its connection string that links your physical device with its identity in the IoT hub. Use the following [`az iot hub device-identity connection-string show`](https://learn.microsoft.com/cli/azure/iot/hub/device-identity/connection-string) command to return the connection string for a single device. Replace `[device_id]` and `[hub_name]` with your own values. The value for the `device-identity` parameter is case-sensitive.

```azurecli
az iot hub device-identity connection-string show --device-id [device_id] --hub-name [hub_name]
```

You should see JSON output in the console, similar to the following example:

```json
{
  "connectionString": "HostName=[hub_name].azure-devices.net;DeviceId=[device_id];SharedAccessKey=[device_key]"
}
```

>**Tip:**
>The `connection-string show` command was introduced in version 0.9.8 of the Azure IoT extension, replacing the deprecated `show-connection-string` command. If you get an error running this command, make sure your extension version is updated to 0.9.8 or later. For more information and the latest updates, see [Microsoft Azure IoT extension for Azure CLI](https://github.com/Azure/azure-iot-cli-extension).

When you copy the connection string to use on a device, don't include the quotation marks around the connection string.

---


<!-- Install IoT Edge on Linux H2 and content -->

## Install IoT Edge

In this section, you prepare your Linux virtual machine or physical device for IoT Edge. Then, you install IoT Edge.

Run the following commands to add the package repository and then add the Microsoft package signing key to your list of trusted keys.

> **Important:**
> On June 30, 2022, Raspberry Pi OS Stretch was retired from the Tier 1 OS support list. To avoid potential security vulnerabilities, update your host OS to Bookworm.
>
> For [tier 2 supported platform operating systems](support.md#tier-2), installation packages are available at [Azure IoT Edge releases](https://github.com/Azure/azure-iotedge/releases). See the installation steps in [Offline or specific version installation (optional)](how-to-provision-single-device-linux-symmetric.md#offline-or-specific-version-installation-optional).


# [Ubuntu](#tab/ubuntu)

You can install IoT Edge by using a few commands. Open a terminal and run the following commands:

* **24.04**:

   ```bash
   wget https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
   sudo dpkg -i packages-microsoft-prod.deb
   rm packages-microsoft-prod.deb
   ```

* **22.04**:

   ```bash
   wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
   sudo dpkg -i packages-microsoft-prod.deb
   rm packages-microsoft-prod.deb
   ```

# [Debian](#tab/debian)

You can install it by using APT and running a few commands. Open a terminal and run the following commands:

* **12 - Bookworm (arm32v7)**:

    ```bash
    curl https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb > ./packages-microsoft-prod.deb
    sudo apt install ./packages-microsoft-prod.deb
    ```

> **Tip:**
> If you set a password for the "root" account during the OS installation, you don't need `sudo`. You can run the previous command by starting with `apt`.

# [Red Hat Enterprise Linux](#tab/rhel)

You can install IoT Edge by using a few commands. Open a terminal and run the following commands:

* **9.x (amd64)**:

   ```bash
    wget https://packages.microsoft.com/config/rhel/9.0/packages-microsoft-prod.rpm -O packages-microsoft-prod.rpm
    sudo yum localinstall packages-microsoft-prod.rpm
    rm packages-microsoft-prod.rpm
    ```

* **8.x (amd64)**:

   ```bash
    wget https://packages.microsoft.com/config/rhel/8/packages-microsoft-prod.rpm -O packages-microsoft-prod.rpm
    sudo yum localinstall packages-microsoft-prod.rpm
    rm packages-microsoft-prod.rpm
    ```

# [Ubuntu Core snaps](#tab/snaps)

You install the IoT Edge runtime from the snap store in a later step. Continue to the next section.

---

For more information about operating system versions, see [Azure IoT Edge supported platforms](support.md?#linux-containers).

> **Note:**
> Azure IoT Edge software packages are subject to the license terms located in each package (`usr/share/doc/{package-name}` or the `LICENSE` directory). Read the license terms before using a package. Your installation and use of a package constitutes your acceptance of these terms. If you don't agree with the license terms, don't use that package.

### Install a container engine

Azure IoT Edge relies on an [OCI](https://opencontainers.org/)-compatible container runtime. For production scenarios, use the Moby engine. The Moby engine is the container engine officially supported with IoT Edge. Docker CE and Docker EE container images work with the Moby runtime. If you're using Ubuntu Core snaps, Canonical services the Docker snap and supports it for production scenarios.

# [Ubuntu](#tab/ubuntu)

Install the Moby engine.

   ```bash
   sudo apt-get update; \
     sudo apt-get install moby-engine
   ```

# [Debian](#tab/debian)

Install the Moby engine.

   ```bash
   sudo apt-get update; \
     sudo apt-get install moby-engine
   ```

# [Red Hat Enterprise Linux](#tab/rhel)

Install the Moby engine and CLI.

   ```bash
   sudo yum install moby-engine moby-cli
   ```

> **Tip:**
> If you get errors when you install the Moby container engine, verify your Linux kernel for Moby compatibility. Some embedded device manufacturers ship device images that contain custom Linux kernels without the features required for container engine compatibility. Run the following command, which uses the [check-config script](https://github.com/moby/moby/blob/master/contrib/check-config.sh) provided by Moby, to check your kernel configuration:
>
>   ```bash
>   curl -ssl https://raw.githubusercontent.com/moby/moby/master/contrib/check-config.sh -o check-config.sh
>   chmod +x check-config.sh
>   ./check-config.sh
>   ```
>
> In the output of the script, check that all items under `Generally Necessary` and `Network Drivers` are enabled. If you're missing features, enable them by rebuilding your kernel from source and selecting the associated modules for inclusion in the appropriate kernel .config. Similarly, if you're using a kernel configuration generator like `defconfig` or `menuconfig`, find and enable the respective features and rebuild your kernel accordingly. After you deploy your newly modified kernel, run the check-config script again to verify that all the required features are successfully enabled.

# [Ubuntu Core snaps](#tab/snaps)

IoT Edge has dependencies on Docker and IoT Identity Service. Install the dependencies by using the following commands:

```bash
sudo snap install docker
sudo snap install azure-iot-identity
```

The Docker snap is serviced by Canonical and supported for production scenarios.

---

By default, the container engine doesn't set container log size limits. Over time, this situation can lead to the device filling up with logs and running out of disk space. However, you can configure your log to show locally, though it's optional. For more information about logging configuration, see [Prepare to deploy your IoT Edge solution in production](production-checklist.md#set-up-default-logging-driver).

The following steps show you how to configure your container to use the [`local` logging driver](https://docs.docker.com/config/containers/logging/local/) as the logging mechanism. 

# [Ubuntu / Debian / RHEL](#tab/ubuntu+debian+rhel)

1. Create or edit the existing Docker [daemon's config file](https://docs.docker.com/config/daemon/):

    ```bash
    sudo nano /etc/docker/daemon.json
    ```

1. Set the default logging driver to the `local` logging driver as shown in the example:

    ```json
       {
          "log-driver": "local"
       }
    ```

1. Restart the container engine for the changes to take effect.

    ```bash
    sudo systemctl restart docker
    ```

# [Ubuntu Core snaps](#tab/snaps)

Currently, the Docker snap doesn't support the `local` logging driver setting.

---

### Install the IoT Edge runtime

The IoT Edge service provides and maintains security standards on the IoT Edge device. The service starts on every boot and bootstraps the device by starting the rest of the IoT Edge runtime.

> **Note:**
> Beginning with version 1.2, the [Azure IoT identity service](https://azure.github.io/iot-identity-service/) handles identity provisioning and management for IoT Edge and for other device components that need to communicate with IoT Hub.

The steps in this section represent the typical process to install the latest IoT Edge version on a device that has internet connection. If you need to install a specific version, like a prerelease version, or need to install while offline, follow the **Offline or specific version installation** steps later in this article.

> **Tip:**
> If you already have an IoT Edge device running an older version and want to upgrade to the latest release, use the steps in [Update IoT Edge](how-to-update-iot-edge.md). Later versions are sufficiently different from previous versions of IoT Edge that specific steps are necessary to upgrade.

# [Ubuntu](#tab/ubuntu)

Install the latest version of IoT Edge and the IoT identity service package (if you're not already [up-to-date](version-history.md)):

* **22.04**:
   ```bash
   sudo apt-get update; \
     sudo apt-get install aziot-edge
   ```

# [Debian](#tab/debian)

Install the latest version of IoT Edge and the IoT identity service package (if you're not already [up-to-date](version-history.md)):

   ```bash
   sudo apt-get update; \
     sudo apt-get install aziot-edge
   ```

# [Red Hat Enterprise Linux](#tab/rhel)

  Install the latest version of IoT Edge and the IoT identity service package (if you're not already [up-to-date](version-history.md)):

   ```bash
   sudo yum install aziot-edge
   ```

# [Ubuntu Core snaps](#tab/snaps)

Install IoT Edge from the snap store:

```bash
sudo snap install azure-iot-edge
```

### Connect snaps

By default, snaps are dependency-free, untrusted, and strictly confined. Hence, you must connect snaps to other snaps and system resources after installation. Use the following commands to connect the IoT Identity Service and IoT Edge snaps to each other and to system resources. To get started, manually connect the snaps. For production deployments, you can configure them to automatically connect to reduce the provisioning workload.

```bash
#------------------------
#  IoT Identity Service
#------------------------

# Connect the Identity Service snap to the logging system
# and grant permission to query system info

sudo snap connect azure-iot-identity:log-observe
sudo snap connect azure-iot-identity:mount-observe
sudo snap connect azure-iot-identity:system-observe
sudo snap connect azure-iot-identity:hostname-control

# If using a TPM, enable TPM access

sudo snap connect azure-iot-identity:tpm

#------------
#  IoT Edge
#------------

# Connect to your /home directory to enable writing support bundles

sudo snap connect azure-iot-edge:home

# Connect to logging and grant permission to query system info

sudo snap connect azure-iot-edge:log-observe
sudo snap connect azure-iot-edge:mount-observe
sudo snap connect azure-iot-edge:system-observe
sudo snap connect azure-iot-edge:hostname-control
# Allow IoT Edge to connect to the /var/run/iotedge folder and use sockets

sudo snap connect azure-iot-edge:run-iotedge

# Connect IoT Edge to Docker

sudo snap connect azure-iot-edge:docker docker:docker-daemon
```

---


## Provision the device with its cloud identity

After you install the container engine and the IoT Edge runtime on your device, set up the device with its cloud identity and authentication information.

# [Ubuntu / Debian / RHEL](#tab/ubuntu+debian+rhel)

You can configure your IoT Edge device with symmetric key authentication by using the following command:

```bash
sudo iotedge config mp --connection-string 'PASTE_DEVICE_CONNECTION_STRING_HERE'
```

1. Apply the configuration changes.

   ```bash
   sudo iotedge config apply
   ```

1. To view the configuration file, you can open it:

   ```bash
   sudo nano /etc/aziot/config.toml
   ```

# [Ubuntu Core snaps](#tab/snaps)

1. Create a **config.toml** file in your home directory and configure your IoT Edge device with a symmetric key authentication for the snap.

    ```bash
    sudo nano ~/config.toml
    ```

1. You can manually provision with a connection string using the following provisioning settings:

    ```toml
    [provisioning]
    source = "manual"
    connection_string = "REPLACE_WITH_DEVICE_CONNECTION_STRING"
    ```

    For more information about provisioning configuration settings, see [Configure IoT Edge device settings](configure-device.md#provisioning).

1. Set the configuration for IoT Edge and the Identity Service using the following command:

    ```bash
    sudo snap set azure-iot-edge raw-config="$(cat ~/config.toml)"
    ```

---

## Deploy modules

To deploy your IoT Edge modules, go to your IoT hub in the Azure portal, then:

1. Select **Devices** from the IoT Hub menu.

1. Select your device to open its page.

1. Select the **Set Modules** tab.

1. Since we want to deploy the IoT Edge default modules (edgeAgent and edgeHub), we don't need to add any modules to this pane, so select **Review + create** at the bottom.

1. You see the JSON confirmation of your modules. Select **Create** to deploy the modules.

For more information, see [Deploy a module](quickstart-linux.md#deploy-a-module).

## Verify successful configuration

Verify that the runtime was successfully installed and configured on your IoT Edge device.

> **Tip:**
> You need elevated privileges to run `iotedge` commands. Once you sign out of your machine and sign back in the first time after installing the IoT Edge runtime, your permissions are automatically updated. Until then, use `sudo` in front of the commands.

1. Check to see that the IoT Edge system service is running.

   ```bash
   sudo iotedge system status
   ```

   A successful status response shows the `aziot` services as running or ready.

1. If you need to troubleshoot the service, retrieve the service logs:

   ```bash
   sudo iotedge system logs
   ```

1. Use the `check` tool to verify configuration and connection status of the device:

   ```bash
   sudo iotedge check
   ```

   You can expect a range of responses that might include **OK** (green), **Warning** (yellow), or **Error** (red). For troubleshooting common errors, see [Solutions to common issues for Azure IoT Edge](troubleshoot-common-errors.md).

   Screenshot of sample responses from the check command.

   >**Tip:**
   >Always use `sudo` to run the check tool, even after your permissions are updated. The tool needs elevated privileges to access the config file to verify configuration status.

   >**Note:**
   >On a newly provisioned device, you might see an error related to IoT Edge Hub:
   >
   >**× production readiness: Edge Hub's storage directory is persisted on the host filesystem - Error**
   >**Could not check current state of edgeHub container**
   >
   >This error is expected on a newly provisioned device because the IoT Edge Hub module isn't yet running. Be sure your IoT Edge modules were deployed in the previous steps. Deployment resolves this error.
   >
   >Alternatively, you might see a status code as `417 -- The device's deployment configuration is not set`. Once your modules are deployed, this status changes.
   >

1. When the service starts for the first time, you should only see the **edgeAgent** module running. The edgeAgent module runs by default and helps to install and start any other modules that you deploy to your device.

   Check that your device and modules are deployed and running, by viewing your device page in the Azure portal.

   Screenshot of IoT Edge modules deployed and running confirmation in the Azure portal.

   Once your modules are deployed and running, list them in your device or virtual machine with the following command:

   ```bash
   sudo iotedge list
   ```

## Offline or specific version installation (optional)

The steps in this section are for scenarios not covered by the standard installation steps. These scenarios might include:

* Installing IoT Edge while offline
* Installing a release candidate version

Use the steps in this section if you want to install a [specific version of the Azure IoT Edge runtime](version-history.md) that isn't available through your package manager. The Microsoft package list only contains a limited set of recent versions and their subversions, so these steps are for anyone who wants to install an older version or a release candidate version.

If you're using Ubuntu snaps, you can download a snap and install it offline. For more information, see [Download snaps and install offline](https://forum.snapcraft.io/t/download-snaps-and-install-offline/15713).

Using curl commands, you can target the component files directly from the IoT Edge GitHub repository.

1. Navigate to the [Azure IoT Edge releases](https://github.com/Azure/azure-iotedge/releases), and find the release version that you want to target.

2. Expand the **Assets** section for that version.

3. Every release should have new files for IoT Edge and the identity service. If you're going to install IoT Edge on an offline device, download these files ahead of time. Otherwise, use the following commands to update those components.

   1. Find the **aziot-identity-service** file that matches your IoT Edge device's architecture. Right-click on the file link and copy the link address.

   2. Use the copied link in the following command to install that version of the identity service:

      # [Ubuntu / Debian](#tab/ubuntu+debian)
      ```bash
      curl -L <identity service link> -o aziot-identity-service.deb && sudo apt-get install ./aziot-identity-service.deb
      ```

      # [Red Hat Enterprise Linux](#tab/rhel)
      ```bash
      curl -L <identity service link> -o aziot-identity-service.rpm && sudo yum localinstall ./aziot-identity-service.rpm
      ```

      # [Ubuntu Core snaps](#tab/snaps)
      If you're using Ubuntu snaps, you can download a snap package and install it offline. For more information, see [Download snaps and install offline](https://forum.snapcraft.io/t/download-snaps-and-install-offline/15713).

      ---

   3. Find the **aziot-edge** file that matches your IoT Edge device's architecture. Right-click on the file link and copy the link address.

   4. Use the copied link in the following command to install that version of IoT Edge.

      # [Ubuntu / Debian](#tab/ubuntu+debian)
      ```bash
      curl -L <iotedge link> -o aziot-edge.deb && sudo apt-get install ./aziot-edge.deb
      ```

      # [Red Hat Enterprise Linux](#tab/rhel)
      ```bash
      curl -L <iotedge link> -o aziot-edge.rpm && sudo yum localinstall ./aziot-edge.rpm
      ```

      # [Ubuntu Core snaps](#tab/snaps)
      If you're using Ubuntu snaps, you can download a snap package and install it offline. For more information, see [Download snaps and install offline](https://forum.snapcraft.io/t/download-snaps-and-install-offline/15713).

      ---

## Uninstall IoT Edge

If you want to remove the IoT Edge installation from your device, use the following commands.

Remove the IoT Edge runtime.

# [Ubuntu / Debian](#tab/ubuntu+debian)
```bash
sudo apt-get autoremove --purge aziot-edge
```

Leave out the `--purge` flag if you plan to reinstall IoT Edge and use the same configuration information in the future. The `--purge` flag deletes all the files associated with IoT Edge, including your configuration files.

# [Red Hat Enterprise Linux](#tab/rhel)
```bash
sudo yum remove aziot-edge
```

# [Ubuntu Core snaps](#tab/snaps)

Remove the IoT Edge runtime:

```bash
sudo snap remove azure-iot-edge
```

Remove Azure Identity Service:

```bash
sudo snap remove azure-iot-identity
```

---

When the IoT Edge runtime is removed, any containers that it created are stopped but still exist on your device. View all containers to see which ones remain.

```bash
sudo docker ps -a
```

Delete the containers from your device, including the two runtime containers.

```bash
sudo docker rm -f <container ID>
```

Finally, remove the container runtime from your device.

# [Ubuntu / Debian](#tab/ubuntu+debian)
```bash
sudo apt-get autoremove --purge moby-engine
```

# [Red Hat Enterprise Linux](#tab/rhel)

```bash
sudo yum remove moby-cli
sudo yum remove moby-engine
```

# [Ubuntu Core snaps](#tab/snaps)

```bash
sudo snap remove docker
```

---

## Next steps

Continue to [deploy IoT Edge modules](how-to-deploy-modules-portal.md) to learn how to deploy modules onto your device.
