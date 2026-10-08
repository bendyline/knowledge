---
title: Create and provision an Azure IoT Edge for Linux on Windows device using X.509 certificates
description: Create and provision a single IoT Edge for Linux on Windows device in IoT Hub using manual provisioning with X.509 certificates
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-edge
ms.custom: linux-related-content
services: iot-edge
ms.topic: how-to
ms.date: 06/06/2025
---

# Create and provision an IoT Edge for Linux on Windows device using X.509 certificates


**Applies to:** IoT Edge 1.6 checkmark IoT Edge 1.6

> **Important:**
> IoT Edge 1.6 LTS is the [supported release](support.md#releases). IoT Edge 1.5 LTS support ends on November 10, 2026; IoT Edge 1.4 LTS reached end of life on November 12, 2024. If you're using an earlier release, see [Update IoT Edge](how-to-update-iot-edge.md).

This article gives step-by-step instructions for registering and provisioning an IoT Edge for Linux on Windows device.


Each device that connects to an IoT hub has a device ID that tracks cloud-to-device or device-to-cloud communications. You configure a device with its connection information, including the IoT hub hostname, device ID, and the information the device uses to authenticate to IoT Hub.

This article walks you through manual provisioning, where you connect a single device to its IoT hub. For manual provisioning, you can use one of two options to authenticate IoT Edge devices:

* **Symmetric keys**: When you create a new device identity in IoT Hub, the service creates two keys. Place one of the keys on the device, and it presents the key to IoT Hub when authenticating.

  This authentication method lets you get started faster, but isn't as secure.

* **X.509 self-signed**: Create two X.509 identity certificates and place them on the device. When you create a new device identity in IoT Hub, provide thumbprints from both certificates. When the device authenticates to IoT Hub, it presents one certificate and IoT Hub verifies that the certificate matches its thumbprint.

  This authentication method is more secure and is recommended for production scenarios.

This article covers using X.509 certificates as the authentication method. To use symmetric keys, see [Create and provision an IoT Edge for Linux on Windows device using symmetric keys](how-to-provision-single-device-linux-on-windows-symmetric.md).

> **Note:**
> If you need to set up many devices and don't want to manually provision each one, use one of the following articles to learn how IoT Edge works with the IoT Hub device provisioning service:
>
> * [Create and provision IoT Edge devices at scale using X.509 certificates](how-to-provision-devices-at-scale-linux-on-windows-x509.md)
> * [Create and provision IoT Edge devices at scale with a TPM](how-to-provision-devices-at-scale-linux-on-windows-tpm.md)
> * [Create and provision IoT Edge devices at scale using symmetric keys](how-to-provision-devices-at-scale-linux-on-windows-symmetric.md)

## Prerequisites

This article covers how to register your IoT Edge device and install IoT Edge for Linux on Windows. These tasks have different prerequisites and use different utilities. Check that you meet all prerequisites before you continue.

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


<!-- Generate device identity certificates H2 and content -->

## Generate device identity certificates

Manual provisioning with X.509 certificates requires IoT Edge version 1.0.10 or newer.

When you provision an IoT Edge device with X.509 certificates, you use a *device identity certificate*. This certificate is only used for provisioning an IoT Edge device and authenticating the device with Azure IoT Hub. It's a leaf certificate that doesn't sign other certificates. The device identity certificate is separate from the certificate authority (CA) certificates that the IoT Edge device presents to modules or downstream devices for verification.

For X.509 certificate authentication, each device's authentication information is provided in the form of *thumbprints* taken from your device identity certificates. These thumbprints are given to IoT Hub at the time of device registration so that the service can recognize the device when it connects.

For more information about how the CA certificates are used in IoT Edge devices, see [Understand how Azure IoT Edge uses certificates](iot-edge-certs.md).

You need the following files for manual provisioning with X.509:

* Two device identity certificates with their matching private key certificates in .cer or .pem formats. You need two device identity certificates for certificate rotation. A best practice is to prepare two different device identity certificates with different expiration dates. If one certificate expires, the other is still valid and gives you time to rotate the expired certificate. 

  One set of certificate and key files is provided to the IoT Edge runtime. When you create device identity certificates, set the certificate common name (CN) with the device ID that you want the device to have in your IoT hub.

* Thumbprints taken from both device identity certificates. IoT Hub requires two thumbprints when registering an IoT Edge device. You can use only one certificate for registration. To use a single certificate, set the same certificate thumbprint for both the primary and secondary thumbprints when registering the device.

  Thumbprint values are 40-hex characters for SHA-1 hashes or 64-hex characters for SHA-256 hashes. Both thumbprints are provided to IoT Hub at the time of device registration.

    One way to retrieve the thumbprint from a certificate is with the following openssl command:

    ```cmd
    openssl x509 -in <certificate filename>.pem -text -fingerprint
    ```

    The thumbprint is included in the output of this command. For example:

    ```cmd
    SHA1 Fingerprint=D2:68:D9:04:9F:1A:4D:6A:FD:84:77:68:7B:C6:33:C0:32:37:51:12
    ```

If you don't have certificates available, you can [Create demo certificates to test IoT Edge device features](how-to-create-test-certificates.md). Follow the instructions in that article to set up certificate creation scripts, create a root CA certificate, and create an IoT Edge device identity certificate. For testing, you can create a single device identity certificate and use the same thumbprint for both primary and secondary thumbprint values when registering the device in IoT Hub.

<!-- Register your device and View provisioning information H2s and content -->

## Register your device

You can use the **Azure portal**, **Visual Studio Code**, or **Azure CLI** to register your device, depending on your preference.

# [Portal](#tab/azure-portal)

In your IoT hub in the Azure portal, IoT Edge devices are created and managed separately from IoT devices that aren't edge enabled.

1. Sign in to the [Azure portal](https://portal.azure.com) and navigate to your IoT hub.

1. In the resource menu, expand the **Device management** group and select **Devices**, then select **Add Device** from the command bar.

1. On the **Create a device** page, provide the following information:

   * Create a descriptive device ID. Make a note of this device ID, as you use it later.
   * Check the **IoT Edge Device** checkbox.
   * Select **X.509 Self-Signed** as the authentication type.
   * Provide the primary and secondary identity certificate thumbprints. Thumbprint values are 40-hex characters for SHA-1 hashes or 64-hex characters for SHA-256 hashes. The Azure portal supports hexadecimal values only. Remove column separators and spaces from the thumbprint values before entering them in the portal. For example, `D2:68:D9:04:9F:1A:4D:6A:FD:84:77:68:7B:C6:33:C0:32:37:51:12` is entered as `D268D9049F1A4D6AFD8477687BC633C032375112`.

   > **Tip:**
   > If you're testing and want to use one certificate, you can use the same certificate for both the primary and secondary thumbprints.

1. Select **Save**.

# [Visual Studio Code](#tab/visual-studio-code)

Currently, the Azure IoT extension for Visual Studio Code doesn't support device registration with X.509 certificates.

# [Azure CLI](#tab/azure-cli)

Use the [az iot hub device-identity create](https://learn.microsoft.com/cli/azure/iot/hub/device-identity) command to create a new device identity in your IoT hub. For example:

   ```azurecli
   az iot hub device-identity create --device-id <device_id_here> --hub-name <hub_name_here> --edge-enabled --auth-method x509_thumbprint --primary-thumbprint <primary_SHA_thumbprint_here> --secondary-thumbprint <secondary_SHA_thumbprint_here>
   ```

This command includes several parameters:

* `--device-id` or `-d`: Provide a descriptive name that's unique to your IoT hub. Make a note of this device ID, as you'll use it in the next section.
* `hub-name` or `-n`: Provide the name of your IoT hub.
* `--edge-enabled` or `--ee`: Declare that the device is an IoT Edge device.
* `--auth-method` or `--am`: Declare the authorization type the device is going to use. In this case, we're using X.509 certificate thumbprints.
* `--primary-thumbprint` or `--ptp`: Provide an X.509 certificate thumbprint to use as a primary key. Only hexadecimal values are supported. Remove column separators and spaces from the thumbprint value. For example, `D2:68:D9:04:9F:1A:4D:6A:FD:84:77:68:7B:C6:33:C0:32:37:51:12` is entered as `D268D9049F1A4D6AFD8477687BC633C032375112`.
* `--secondary-thumbprint` or `--stp`: Provide an X.509 certificate thumbprint to use as a secondary key. Remove column separators and spaces from the thumbprint value. If you're testing and want to use one certificate, you can use the same certificate for both the primary and secondary thumbprints.
---

Now that you have a device registered in IoT Hub, retrieve the information that you use to complete installation and provisioning of the IoT Edge runtime.

## View registered devices and retrieve provisioning information

Devices that use X.509 certificate authentication need their IoT hub name, their device name, and their certificate files to complete installation and provisioning of the IoT Edge runtime.

# [Portal](#tab/azure-portal)

The edge-enabled devices that connect to your IoT hub are listed on the **Devices** page. You can filter the list by the device type, *IoT Edge devices*.

# [Visual Studio Code](#tab/visual-studio-code)

While there's no support for device registration with X.509 certificates through Visual Studio Code, you can still view your IoT Edge devices if you need to.

All the devices that connect to your IoT hub are listed in the **Azure IoT Hub** section of the Visual Studio Code Explorer. IoT Edge devices are distinguishable from non-Edge devices with a different icon, and the fact that the **$edgeAgent** and **$edgeHub** modules are deployed to each IoT Edge device.

# [Azure CLI](#tab/azure-cli)

Use the [az iot hub device-identity list](https://learn.microsoft.com/cli/azure/iot/hub/device-identity) command to view all devices in your IoT hub. For example:

   ```azurecli
   az iot hub device-identity list --hub-name <hub_name_here>
   ```

Any device registered as an IoT Edge device has the property **capabilities.iotEdge** set to **true**.

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

To provision your device using X.509 certificates, you need your **IoT hub name**, **device ID**, and the absolute paths to your **identity certificate** and **private key** on your Windows host machine.

Make sure the device identity certificate and its matching private key are on your target device. Know the absolute path to both files.

Run the following command in an elevated PowerShell session on your target device. Replace the placeholder text with your own values.

```powershell
Provision-EflowVm -provisioningType ManualX509 -iotHubHostname "HUB_HOSTNAME_HERE" -deviceId "DEVICE_ID_HERE" -identityCertPath "ABSOLUTE_PATH_TO_IDENTITY_CERT_HERE" -identityPrivKeyPath "ABSOLUTE_PATH_TO_PRIVATE_KEY_HERE"
```

For more information about the `Provision-EflowVM` command, see [PowerShell functions for IoT Edge for Linux on Windows](reference-iot-edge-for-linux-on-windows-functions.md#provision-eflowvm).

## Verify successful configuration

Verify that IoT Edge for Linux on Windows was successfully installed and configured on your IoT Edge device.

1. Sign in to your IoT Edge for Linux on Windows virtual machine using the following command in your PowerShell session:

   ```powershell
   Connect-EflowVm
   ```

   >**Note:**
   >The only account allowed to SSH to the virtual machine is the user that created it.

1. Once you're logged in, you can check the list of running IoT Edge modules using the following Linux command:

   ```bash
   sudo iotedge list
   ```

1. If you need to troubleshoot the IoT Edge service, use the following Linux commands.

    1. Retrieve the service logs.

       ```bash
       sudo iotedge system logs
       ```

    2. Use the `check` tool to verify configuration and connection status of the device.

       ```bash
       sudo iotedge check
       ```

    >**Note:**
    >On a newly provisioned device, you can see an error related to IoT Edge Hub:
    >
    >**× production readiness: Edge Hub's storage directory is persisted on the host filesystem - Error**
    >
    >**Could not check current state of edgeHub container**
    >
    >This error is expected on a new device because the IoT Edge Hub module isn't running. To fix the error, in IoT Hub, set the modules for the device and create a deployment. Creating a deployment starts the modules on the device, including the IoT Edge Hub module.

When you create a new IoT Edge device, it shows the status code `417 -- The device's deployment configuration is not set` in the Azure portal. This status is normal and means the device is ready to receive a module deployment.

<!-- Uninstall IoT Edge for Linux on Windows H2 and content -->

## Uninstall IoT Edge for Linux on Windows

To remove the Azure IoT Edge for Linux on Windows installation from your device, use the following steps.

1. Open **Settings** on Windows.
1. Select **Add or Remove Programs**.
1. Select the **Azure IoT Edge** app.
1. Select **Uninstall**.


## Next steps

* Continue to [deploy IoT Edge modules](how-to-deploy-modules-portal.md) to learn how to deploy modules on your device.
* Learn how to [manage certificates on your IoT Edge for Linux on Windows virtual machine](how-to-manage-device-certificates.md) and transfer files from the host OS to your Linux virtual machine.
* Learn how to [configure your IoT Edge devices to communicate through a proxy server](how-to-configure-proxy-support.md).
