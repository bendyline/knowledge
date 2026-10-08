---
title: Create and provision an Azure IoT Edge for Linux on Windows device using symmetric keys
description: Create and provision a single IoT Edge for Linux on Windows device in IoT Hub using manual provisioning with symmetric keys
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-edge
services: iot-edge
ms.topic: how-to
ms.date: 03/02/2026
ms.custom:
  - linux-related-content
  - sfi-ropc-nochange
---

# Create and provision an IoT Edge for Linux on Windows device using symmetric keys


**Applies to:** IoT Edge 1.6 checkmark IoT Edge 1.6

> **Important:**
> IoT Edge 1.6 LTS is the [supported release](support.md#releases). IoT Edge 1.5 LTS support ends on November 10, 2026; IoT Edge 1.4 LTS reached end of life on November 12, 2024. If you're using an earlier release, see [Update IoT Edge](how-to-update-iot-edge.md).

This article provides end-to-end instructions for registering and provisioning an IoT Edge for Linux on Windows device.

Every device that connects to an IoT hub has a device ID that's used to track cloud-to-device or device-to-cloud communications. You configure a device with its connection information, which includes the IoT hub hostname, the device ID, and the information the device uses to authenticate to IoT Hub.

The steps in this article walk through a process called manual provisioning, where you connect a single device to its IoT hub. For manual provisioning, you have two options for authenticating IoT Edge devices:

* **Symmetric keys**: When you create a new device identity in IoT Hub, the service creates two keys. You place one of the keys on the device, and it presents the key to IoT Hub when authenticating.

  This authentication method is faster to get started, but isn't as secure.

* **X.509 self-signed**: You create two X.509 identity certificates and place them on the device. When you create a new device identity in IoT Hub, you provide thumbprints from both certificates. When the device authenticates to IoT Hub, it presents one certificate and IoT Hub verifies that the certificate matches its thumbprint.

  This authentication method is more secure and recommended for production scenarios.

This article covers using symmetric keys as your authentication method. If you want to use X.509 certificates, see [Create and provision an IoT Edge for Linux on Windows device using X.509 certificates](how-to-provision-single-device-linux-on-windows-x509.md).

> **Note:**
> If you need to set up many devices and don't want to manually provision each one, use one of the following articles to learn how IoT Edge works with the IoT Hub device provisioning service:
>
> * [Create and provision IoT Edge for Linux on Windows devices at scale using X.509 certificates](how-to-provision-devices-at-scale-linux-on-windows-x509.md)
> * [Create and provision an IoT Edge for Linux on Windows device at scale by using a TPM](how-to-provision-devices-at-scale-linux-on-windows-tpm.md)
> * [Create and provision IoT Edge for Linux on Windows devices at scale using symmetric keys](how-to-provision-devices-at-scale-linux-on-windows-symmetric.md)

## Prerequisites

This article covers registering your IoT Edge device and installing IoT Edge for Linux on Windows. These tasks have different prerequisites and use different utilities. Make sure you meet all the prerequisites before proceeding.

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


<!-- IoT Edge for Linux on Windows installation prerequisites H3 and content -->

### Device requirements

A Windows device with the following minimum requirements:

* System requirements
   * Windows 10<sup>1</sup>/11 (Pro, Enterprise, IoT Enterprise)
   * Windows Server 2019<sup>1</sup>/2022  
   <sub><sup>1</sup> Windows 10 and Windows Server 2019, minimum build 17763, with all current cumulative updates installed.</sub>

* Hardware requirements
  * Minimum free memory: 1 GB
  * Minimum free disk space: 10 GB

* Virtualization support
  * On Windows 10, enable Hyper-V. For more information, see [Install Hyper-V](https://learn.microsoft.com/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v).
  * On Windows Server, install the Hyper-V role and create a default network switch. For more information, see [Nested virtualization for Azure IoT Edge for Linux on Windows](nested-virtualization.md).
  * On a virtual machine, configure nested virtualization. For more information, see [Nested virtualization for Azure IoT Edge for Linux on Windows](nested-virtualization.md).

* Networking support
  * Windows Server doesn't include a default switch. Before you can deploy EFLOW to a Windows Server device, you need to create a virtual switch. For more information, see [Azure IoT Edge for Linux on Windows virtual switch creation](how-to-create-virtual-switch.md).
  * Windows Desktop versions include a default switch that you can use for EFLOW installation. If needed, you can create your own custom virtual switch.

> **Tip:**
> If you want to use **GPU-accelerated Linux modules** in your Azure IoT Edge for Linux on Windows deployment, consider several configuration options.
>
> You need to install the correct drivers depending on your GPU architecture, and you might need access to a Windows Insider Program build. To determine your configuration needs and satisfy these prerequisites, see [GPU acceleration for Azure IoT Edge for Linux on Windows](gpu-acceleration.md).
>
> Make sure you satisfy the prerequisites for GPU acceleration now. You must restart the installation process if you decide you want GPU acceleration during installation.

### Developer tools

Prepare your target device for the installation of Azure IoT Edge for Linux on Windows and the deployment of the Linux virtual machine:

1. Set the execution policy on the target device to `AllSigned`. You can check the current execution policy in an elevated PowerShell prompt by using the following command:

   ```powershell
   Get-ExecutionPolicy -List
   ```

   If the execution policy for `local machine` isn't `AllSigned`, set the execution policy by using:

   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy AllSigned -Force
   ```

For more information about the Azure IoT Edge for Linux on Windows PowerShell module, see the [PowerShell functions reference](reference-iot-edge-for-linux-on-windows-functions.md).


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


<!-- Install IoT Edge for Linux on Windows H2 and content -->

## Install IoT Edge

Deploy Azure IoT Edge for Linux on Windows on your target device.

> **Note:**
> The following PowerShell process outlines how to deploy IoT Edge for Linux on Windows onto the local device. To deploy to a remote target device using PowerShell, you can use [Remote PowerShell](https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_remote) to establish a connection to a remote device and run these commands remotely on that device.


1. In an elevated PowerShell session, run either of the following commands depending on your target device architecture to download IoT Edge for Linux on Windows.

   * **X64/AMD64**
      ```powershell
      $msiPath = $([io.Path]::Combine($env:TEMP, 'AzureIoTEdge.msi'))
      $ProgressPreference = 'SilentlyContinue'
      Invoke-WebRequest "https://aka.ms/AzEFLOWMSI_1_5_LTS_X64" -OutFile $msiPath
      ```

   * **ARM64**
      ```powershell
      $msiPath = $([io.Path]::Combine($env:TEMP, 'AzureIoTEdge.msi'))
      $ProgressPreference = 'SilentlyContinue'
      Invoke-WebRequest "https://aka.ms/AzEFLOWMSI_1_5_LTS_ARM64" -OutFile $msiPath
      ```

1. Install IoT Edge for Linux on Windows on your device.

   ```powershell
   Start-Process -Wait msiexec -ArgumentList "/i","$([io.Path]::Combine($env:TEMP, 'AzureIoTEdge.msi'))","/qn"
   ```

   You can specify custom IoT Edge for Linux on Windows installation and VHDX directories by adding `INSTALLDIR="<FULLY_QUALIFIED_PATH>"` and `VHDXDIR="<FULLY_QUALIFIED_PATH>"` parameters to the install command. For example, if you want to use the _D:\EFLOW_ folder for installation and the _D:\EFLOW-VHDX_ for the VHDX, you can use the following PowerShell cmdlet.

   ```powershell
   Start-Process -Wait msiexec -ArgumentList "/i","$([io.Path]::Combine($env:TEMP, 'AzureIoTEdge.msi'))","/qn","INSTALLDIR=D:\EFLOW", "VHDXDIR=D:\EFLOW-VHDX"
   ```

1. Set the execution policy on the target device to `AllSigned` if it isn't already. See the PowerShell prerequisites for commands to check the current execution policy and set the execution policy to `AllSigned`.

1. Create the IoT Edge for Linux on Windows deployment. The deployment creates your Linux virtual machine and installs the IoT Edge runtime for you.

   ```powershell
   Deploy-Eflow
   ```

   >**Tip:**
   >By default, the `Deploy-Eflow` command creates your Linux virtual machine with 1 GB of RAM, 1 vCPU core, and 16 GB of disk space. However, the resources your VM needs are highly dependent on the workloads you deploy. If your VM doesn't have sufficient memory to support your workloads, it fails to start.
   >
   >You can customize the virtual machine's available resources by using the `Deploy-Eflow` command's optional parameters. This customization is required to deploy EFLOW on a device with the minimum hardware requirements.
   >
   >For example, the following command creates a virtual machine with 1 vCPU core, 1 GB of RAM (represented in MB), and 2 GB of disk space:
   >
   >   ```powershell
   >   Deploy-Eflow -cpuCount 1 -memoryInMB 1024 -vmDataSize 2
   >   ```
   >
   >For information about all the optional parameters available, see [PowerShell functions for IoT Edge for Linux on Windows](https://learn.microsoft.com/azure/iot-edge/reference-iot-edge-for-linux-on-windows-functions#deploy-eflow).

   >**Warning:**
   >By default, the EFLOW Linux virtual machine has no DNS configuration. Deployments using DHCP try to obtain the DNS configuration propagated by the DHCP server. Check your DNS configuration to ensure internet connectivity. For more information, see [AzEFLOW-DNS](https://aka.ms/AzEFLOW-DNS).

   You can assign a GPU to your deployment to enable GPU-accelerated Linux modules. To gain access to these features, you need to install the prerequisites detailed in [GPU acceleration for Azure IoT Edge for Linux on Windows](https://learn.microsoft.com/azure/iot-edge/gpu-acceleration).

   To use a GPU passthrough, add the **gpuName**, **gpuPassthroughType**, and **gpuCount** parameters to your `Deploy-Eflow` command. For information about all the optional parameters available, see [PowerShell functions for IoT Edge for Linux on Windows](https://learn.microsoft.com/azure/iot-edge/reference-iot-edge-for-linux-on-windows-functions#deploy-eflow).

   >**Warning:**
   >Enabling hardware device passthrough might increase security risks. Microsoft recommends a device mitigation driver from your GPU's vendor, when applicable. For more information, see [Deploy graphics devices using discrete device assignment](https://learn.microsoft.com/windows-server/virtualization/hyper-v/deploy/deploying-graphics-devices-using-dda).

1. Enter **Y** to accept the license terms.

1. Enter **O** or **R** to toggle **Optional diagnostic data** on or off, depending on your preference.

1. Once the deployment is complete, the PowerShell window reports **Deployment successful**.

   Screenshot showing "Deployment successful" at the end of the messages.

   After a successful deployment, you're ready to provision your device.


## Provision the device with its cloud identity

Set up your device with its cloud identity and authentication information.

To provision your device using symmetric keys, you need your device *connection string*.

Run the following command in an elevated PowerShell session on your target device. Replace the placeholder text with your own values.

```powershell
Provision-EflowVm -provisioningType ManualConnectionString -devConnString "PASTE_DEVICE_CONNECTION_STRING_HERE"
```

For more information about the `Provision-EflowVM` command, see [PowerShell functions for IoT Edge for Linux on Windows](reference-iot-edge-for-linux-on-windows-functions.md#provision-eflowvm).

## Verify successful configuration

Verify that IoT Edge for Linux on Windows is successfully installed and configured on your IoT Edge device.

1. Sign in to your IoT Edge for Linux on Windows virtual machine by using the following command in your PowerShell session:

   ```powershell
   Connect-EflowVm
   ```

   > **Note:**
   > The only account allowed to SSH to the virtual machine is the user that created it.

1. After you sign in, check the list of running IoT Edge modules by using the following Linux command:

   ```bash
   sudo iotedge list
   ```

1. If you need to troubleshoot the IoT Edge service, use the following Linux commands.

    1. Retrieve the service logs.

       ```bash
       sudo iotedge system logs
       ```

    1. Use the `check` tool to verify configuration and connection status of the device.

       ```bash
       sudo iotedge check
       ```

    > **Note:**
    > On a newly provisioned device, you might see an error related to IoT Edge Hub:
    >
    > **× production readiness: Edge Hub's storage directory is persisted on the host filesystem - Error**
    >
    > **Could not check current state of edgeHub container**
    >
    > This error is expected on a newly provisioned device because the IoT Edge Hub module isn't running. To resolve the error, in IoT Hub, set the modules for the device and create a deployment. Creating a deployment for the device starts the modules on the device including the IoT Edge Hub module.


When you create a new IoT Edge device, it displays the status code **417 -- The device's deployment configuration is not set** in the Azure portal. This status is normal, and means that the device is ready to receive a module deployment.

<!-- Uninstall IoT Edge for Linux on Windows H2 and content -->

## Uninstall IoT Edge for Linux on Windows

To remove the Azure IoT Edge for Linux on Windows installation from your device, use the following steps.

1. Open **Settings** on Windows.
1. Select **Add or Remove Programs**.
1. Select the **Azure IoT Edge** app.
1. Select **Uninstall**.


## Next steps

* Continue to [deploy IoT Edge modules](how-to-deploy-modules-portal.md) to learn how to deploy modules onto your device.
* Learn how to [manage certificates on your IoT Edge for Linux on Windows virtual machine](how-to-manage-device-certificates.md) and transfer files from the host OS to your Linux virtual machine.
* Learn how to [configure your IoT Edge devices to communicate through a proxy server](how-to-configure-proxy-support.md).
