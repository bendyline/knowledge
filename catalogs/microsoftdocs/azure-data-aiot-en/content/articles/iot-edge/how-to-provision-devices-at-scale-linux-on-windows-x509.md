---
title: Create and provision Azure IoT Edge devices using X.509 certificates on Linux on Windows
description: Use X.509 certificate attestation to test provisioning devices at scale for Azure IoT Edge with device provisioning service
author: sethmanheim
ms.author: sethm
ms.date: 06/06/2025
ms.topic: how-to
ms.service: azure-iot-edge
ms.custom: linux-related-content
services: iot-edge
---

# Create and provision IoT Edge for Linux on Windows devices at scale using X.509 certificates


**Applies to:** IoT Edge 1.6 checkmark IoT Edge 1.6

> **Important:**
> IoT Edge 1.6 LTS is the [supported release](support.md#releases). IoT Edge 1.5 LTS support ends on November 10, 2026; IoT Edge 1.4 LTS reached end of life on November 12, 2024. If you're using an earlier release, see [Update IoT Edge](how-to-update-iot-edge.md).

This article gives step-by-step instructions for autoprovisioning one or more [IoT Edge for Linux on Windows](iot-edge-for-linux-on-windows.md) devices using X.509 certificates. Automatically provision Azure IoT Edge devices with the [Azure IoT Hub device provisioning service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-dps/index.yml) (DPS). If you aren't familiar with autoprovisioning, review the [provisioning overview](../iot-dps/about-iot-dps.md#provisioning-process) before you continue.

Here are the main tasks:

1. Generate certificates and keys.
1. Create an **individual enrollment** for a single device or a **group enrollment** for a set of devices.
1. Deploy a Linux virtual machine with the IoT Edge runtime installed, and connect it to the IoT Hub.

X.509 certificates let you scale production and simplify device provisioning. Typically, X.509 certificates are arranged in a certificate chain of trust. The chain starts with a self-signed or trusted root certificate, and each certificate in the chain signs the next lower certificate. This pattern creates a delegated chain of trust from the root certificate through each intermediate certificate to the final downstream device certificate installed on a device.

## Prerequisites

<!-- Cloud resources prerequisites H3 and content -->

### Cloud resources

* An active IoT hub
* An instance of the IoT Hub device provisioning service in Azure, linked to your IoT hub
  * If you don't have a device provisioning service instance, you can follow the instructions in the [Create a new IoT Hub device provisioning service](https://learn.microsoft.com/azure/iot-dps/quick-setup-auto-provision#create-a-new-iot-hub-device-provisioning-service) and [Link the IoT hub and your device provisioning service](https://learn.microsoft.com/azure/iot-dps/quick-setup-auto-provision#link-the-iot-hub-and-your-device-provisioning-service) sections of the IoT Hub device provisioning service quickstart.
  * After you have the device provisioning service running, copy the value of **ID Scope** from the overview page. You use this value when you configure the IoT Edge runtime.


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


## Generate device identity certificates

The device identity certificate is a downstream certificate that connects through a certificate chain of trust to the top X.509 certificate authority (CA) certificate. Set the common name (CN) of the device identity certificate to the device ID you want the device to use in your IoT hub.

Use device identity certificates only for provisioning the IoT Edge device and authenticating the device with Azure IoT Hub. They aren't signing certificates, unlike the CA certificates that the IoT Edge device presents to modules or downstream devices for verification. For more information, see [Azure IoT Edge certificate usage detail](iot-edge-certs.md).

After you create the device identity certificate, you have two files: a .cer or .pem file that has the public portion of the certificate, and a .cer or .pem file with the private key of the certificate. If you use group enrollment in DPS, you also need the public portion of an intermediate or root CA certificate in the same certificate chain of trust.

You need the following files to set up automatic provisioning with X.509:

* The device identity certificate and its private key certificate. Upload the device identity certificate to DPS if you create an individual enrollment. The private key is passed to the IoT Edge runtime.
* A full chain certificate, which has at least the device identity and the intermediate certificates in it. The full chain certificate is passed to the IoT Edge runtime.
* An intermediate or root CA certificate from the certificate chain of trust. This certificate is uploaded to DPS if you create a group enrollment.

> **Note:**
> Currently, a limitation in libiothsm prevents the use of certificates that expire on or after January 1, 2038.

### Use test certificates (optional)

If you don't have a certificate authority available to create new identity certs and want to try out this scenario, the Azure IoT Edge git repository has scripts you can use to generate test certificates. Use these certificates for development testing only, and don't use them in production.

To create test certificates, follow the steps in [Create demo certificates to test IoT Edge device features](how-to-create-test-certificates.md). Complete the two required sections to set up the certificate generation scripts and create a root CA certificate. Then, follow the steps to create a device identity certificate. When you finish, you have the following certificate chain and key pair:

* `<WRKDIR>\certs\iot-edge-device-identity-<name>-full-chain.cert.pem`
* `<WRKDIR>\private\iot-edge-device-identity-<name>.key.pem`

You need both these certificates on the IoT Edge device. If you use individual enrollment in DPS, upload the .cert.pem file. If you use group enrollment in DPS, also upload an intermediate or root CA certificate in the same certificate chain of trust. If you use demo certificates, use the `<WRKDIR>\certs\azure-iot-test-only.root.ca.cert.pem` certificate for group enrollment.

<!-- Create a DPS enrollment using X.509 certificates H2 and content -->

## Create a DPS enrollment

Use your generated certificates and keys to create an enrollment in DPS for one or more IoT Edge devices.

If you are looking to provision a single IoT Edge device, create an **individual enrollment**. If you need multiple devices provisioned, follow the steps for creating a DPS **group enrollment**.

When you create an enrollment in DPS, you have the opportunity to declare an **Initial Device Twin State**. In the device twin, you can set tags to group devices by any metric you need in your solution, like region, environment, location, or device type. These tags are used to create [automatic deployments](how-to-deploy-at-scale.md).

For more information about enrollments in the device provisioning service, see [How to manage device enrollments](https://learn.microsoft.com/azure/iot-dps/how-to-manage-enrollments).

# [Individual enrollment](#tab/individual-enrollment)

### Create a DPS individual enrollment

Individual enrollments take the public portion of a device's identity certificate and match that to the certificate on the device.

> **Tip:**
> The steps in this article are for the Azure portal, but you can also create individual enrollments using the Azure CLI. For more information, see [az iot dps enrollment](https://learn.microsoft.com/cli/azure/iot/dps/enrollment). As part of the CLI command, use the **edge-enabled** flag to specify that the enrollment is for an IoT Edge device.

1. In the [Azure portal](https://portal.azure.com), navigate to your instance of IoT Hub device provisioning service.

1. Under **Settings**, select **Manage enrollments**.

1. Select **Add individual enrollment** then complete the following steps to configure the enrollment:  

   * **Mechanism**: Select **X.509**.

   * **Primary Certificate .pem or .cer file**: Upload the public file from the device identity certificate. If you used the scripts to generate a test certificate, choose the following file:

      `<WRKDIR>\certs\iot-edge-device-identity-<name>.cert.pem`

   * **IoT Hub Device ID**: Provide an ID for your device if you'd like. You can use device IDs to target an individual device for module deployment. If you don't provide a device ID, the common name (CN) in the X.509 certificate is used.

   * **IoT Edge device**: Select **True** to declare that the enrollment is for an IoT Edge device.

   * **Select the IoT hubs this device can be assigned to**: Choose the linked IoT hub that you want to connect your device to. You can choose multiple hubs, and the device will be assigned to one of them according to the selected allocation policy.

   * **Initial Device Twin State**: Add a tag value to be added to the device twin if you'd like. You can use tags to target groups of devices for automatic deployment. For example:

      ```json
      {
         "tags": {
            "environment": "test"
         },
         "properties": {
            "desired": {}
         }
      }
      ```

1. Select **Save**.

Under **Manage Enrollments**, you can see the **Registration ID** for the enrollment you just created. Make note of it, as it can be used when you provision your device.

Now that an enrollment exists for this device, the IoT Edge runtime can automatically provision the device during installation.

# [Group enrollment](#tab/group-enrollment)

### Create a DPS group enrollment

Group enrollments use an intermediate or root CA certificate from the certificate chain of trust used to generate the individual device identity certificates.

#### Verify your root certificate

When you create an enrollment group, you have the option of using a verified certificate. You can verify a certificate with DPS by proving that you have ownership of the root certificate. For more information, see [How to do proof-of-possession for X.509 CA certificates](https://learn.microsoft.com/azure/iot-dps/how-to-verify-certificates).

1. In the [Azure portal](https://portal.azure.com), navigate to your instance of IoT Hub device provisioning service.

1. Select **Certificates** from the left-hand menu.

1. Select **Add** to add a new certificate.

1. Enter a friendly name for your certificate, then browse to the .cer or .pem file that represents the public part of your X.509 certificate.

   If you're using the demo certificates, upload the `<wrkdir>\certs\azure-iot-test-only.root.ca.cert.pem` certificate.

1. Select **Save**.

1. Your certificate should now be listed on the **Certificates** page. Select it to open the certificate details.

1. Select **Generate Verification Code** then copy the generated code.

1. Whether you brought your own CA certificate or are using the demo certificates, you can use the verification tool provided in the IoT Edge repository to verify proof of possession. The verification tool uses your CA certificate to sign a new certificate that has the provided verification code as the subject name.

   ```powershell
   New-CACertsVerificationCert "<verification code>"
   ```

1. In the same certificate details page in the Azure portal, upload the newly generated verification certificate.

1. Select **Verify**.

#### Create enrollment group

For more information about enrollments in the device provisioning service, see [How to manage device enrollments](https://learn.microsoft.com/azure/iot-dps/how-to-manage-enrollments).

> **Tip:**
> The steps in this article are for the Azure portal, but you can also create group enrollments using the Azure CLI. For more information, see [az iot dps enrollment-group](https://learn.microsoft.com/cli/azure/iot/dps/enrollment-group). As part of the CLI command, use the **edge-enabled** flag to specify that the enrollment is for IoT Edge devices. For a group enrollment, all devices must be IoT Edge devices or none of them can be.

1. In the [Azure portal](https://portal.azure.com), navigate to your instance of IoT Hub device provisioning service.

1. Under **Settings**, select **Manage enrollments**.

1. Select **Add enrollment group** then complete the following steps to configure the enrollment:

   * **Group name**: Provide a memorable name for this group enrollment.

   * **Attestation Type**: Select **Certificate**.

   * **IoT Edge device**: Select **True**. For a group enrollment, all devices must be IoT Edge devices or none of them can be.

   * **Certificate Type**: Select **CA Certificate**.

   * **Primary certificate**: Choose your certificate from the dropdown list.

   * **Select the IoT hubs this device can be assigned to**: Choose the linked IoT hub that you want to connect your device to. You can choose multiple hubs, and the device will be assigned to one of them according to the selected allocation policy.

   * **Initial Device Twin State**: Add a tag value to be added to the device twin if you'd like. You can use tags to target groups of devices for automatic deployment. For example:

      ```json
      {
         "tags": {
            "environment": "test"
         },
         "properties": {
            "desired": {}
         }
      }
      ```

1. Select **Save**.

Under **Manage Enrollments**, you can see the **Registration ID** for the enrollment you just created. Make note of it, as it can be used when you provision your devices.

Now that an enrollment exists for these devices, the IoT Edge runtime can automatically provision the devices during installation.

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

After you install the runtime on your device, configure the device with the information it uses to connect to the device provisioning service and IoT Hub.

Make sure you have the following information:

* The DPS **ID Scope** value. You find this value on the overview page of your DPS instance in the Azure portal.
* The device identity certificate chain file on the device.
* The device identity key file on the device.

Run the following command in an elevated PowerShell session. Replace the placeholder values with your own values:

```powershell
Provision-EflowVm -provisioningType DpsX509 -scopeId PASTE_YOUR_ID_SCOPE_HERE -registrationId PASTE_YOUR_REGISTRATION_ID_HERE -identityCertPath PASTE_ABSOLUTE_PATH_TO_IDENTITY_CERTIFICATE_HERE -identityPrivateKey PASTE_ABSOLUTE_PATH_TO_IDENTITY_PRIVATE_KEY_HERE
```

## Verify successful installation

Check that IoT Edge for Linux on Windows is installed and configured on your IoT Edge device.

# [Individual enrollment](#tab/individual-enrollment)

Check that the individual enrollment you created in device provisioning service is used. Go to your device provisioning service instance in the Azure portal. Open the enrollment details for the individual enrollment you created. The status of the enrollment is **assigned**, and the device ID is listed.

# [Group enrollment](#tab/group-enrollment)

Check that the group enrollment you created in device provisioning service is used. Go to your device provisioning service instance in the Azure portal. Open the enrollment details for the group enrollment you created. Go to the **Registration Records** tab to see all devices registered in that group.

---

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

    1. If you need to troubleshoot the service, retrieve the service logs.

       ```bash
       sudo iotedge system logs
       ```

    2. Use the `check` tool to verify configuration and connection status of the device.

       ```bash
       sudo iotedge check
       ```

    >**Note:**
    >On a newly provisioned device, you might see an error related to IoT Edge Hub:
    >
    >**× production readiness: Edge Hub's storage directory is persisted on the host filesystem - Error**
    >
    >**Could not check current state of edgeHub container**
    >
    >This error is expected on a newly provisioned device because the IoT Edge Hub module isn't running. To resolve the error, in IoT Hub, set the modules for the device and create a deployment. Creating a deployment for the device starts the modules on the device including the IoT Edge Hub module.

When you create a new IoT Edge device, it shows the status code `417 -- The device's deployment configuration is not set` in the Azure portal. This status is normal and means the device is ready to receive a module deployment.

<!-- Uninstall IoT Edge for Linux on Windows H2 and content -->

## Uninstall IoT Edge for Linux on Windows

To remove the Azure IoT Edge for Linux on Windows installation from your device, use the following steps.

1. Open **Settings** on Windows.
1. Select **Add or Remove Programs**.
1. Select the **Azure IoT Edge** app.
1. Select **Uninstall**.


## Next steps

The device provisioning service enrollment process lets you set the device ID and device twin tags when you provision a new device. Use those values to target individual devices or groups of devices with automatic device management. Learn how to [deploy and monitor IoT Edge modules at scale using the Azure portal](how-to-deploy-at-scale.md) or [using Azure CLI](how-to-deploy-cli-at-scale.md).

You can also:

* Continue to [deploy IoT Edge modules](how-to-deploy-modules-portal.md) to learn how to deploy modules onto your device.
* Learn how to [manage certificates on your IoT Edge for Linux on Windows virtual machine](how-to-manage-device-certificates.md) and transfer files from the host OS to your Linux virtual machine.
* Learn how to [configure your IoT Edge devices to communicate through a proxy server](how-to-configure-proxy-support.md).
