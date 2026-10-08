---
title: Create and provision Azure IoT Edge devices using symmetric keys on Linux
description: 'Deploy IoT Edge at scale: Use symmetric keys to provision multiple Linux devices with Azure IoT Hub device provisioning service.'
author: sethmanheim
ms.author: sethm
ms.date: 03/02/2026
ms.topic: concept-article
ms.service: azure-iot-edge
ms.custom:
  - linux-related-content
  - ai-gen-docs-bap
  - ai-gen-description
  - ai-seo-date:05/16/2025
  - build-2025
services: iot-edge
---
# Create and provision IoT Edge devices at scale on Linux using symmetric keys


**Applies to:** IoT Edge 1.6 checkmark IoT Edge 1.6

> **Important:**
> IoT Edge 1.6 LTS is the [supported release](support.md#releases). IoT Edge 1.5 LTS support ends on November 10, 2026; IoT Edge 1.4 LTS reached end of life on November 12, 2024. If you're using an earlier release, see [Update IoT Edge](how-to-update-iot-edge.md).

This article gives step-by-step instructions for setting up one or more Linux IoT Edge devices using symmetric keys. Automatically set up Azure IoT Edge devices with the [Azure IoT Hub device provisioning service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-dps/index.yml) (DPS). If you aren't familiar with the autoprovisioning process, review the [provisioning overview](../iot-dps/about-iot-dps.md#provisioning-process) before you continue.

Here are the main tasks:

1. Create an **individual enrollment** for a single device or a **group enrollment** for a set of devices.
1. Install the IoT Edge runtime and connect to the IoT Hub.

>**Tip:**
>For a simplified experience, try the [Azure IoT Edge configuration tool](https://github.com/azure/iot-edge-config). This command-line tool, currently in public preview, installs IoT Edge on your device and provisions it using DPS and symmetric key attestation.

Symmetric key attestation is a simple way to authenticate a device with a device provisioning service instance. This method is a "Hello world" experience for developers who are new to device provisioning or don't have strict security requirements. Device attestation with a [TPM](../iot-dps/concepts-tpm-attestation.md) or [X.509 certificates](../iot-dps/concepts-x509-attestation.md) is more secure, and you should use it for more stringent security needs.

## Prerequisites

<!-- Cloud resources prerequisites H3 and content -->

### Cloud resources

* An active IoT hub
* An instance of the IoT Hub device provisioning service in Azure, linked to your IoT hub
  * If you don't have a device provisioning service instance, you can follow the instructions in the [Create a new IoT Hub device provisioning service](https://learn.microsoft.com/azure/iot-dps/quick-setup-auto-provision#create-a-new-iot-hub-device-provisioning-service) and [Link the IoT hub and your device provisioning service](https://learn.microsoft.com/azure/iot-dps/quick-setup-auto-provision#link-the-iot-hub-and-your-device-provisioning-service) sections of the IoT Hub device provisioning service quickstart.
  * After you have the device provisioning service running, copy the value of **ID Scope** from the overview page. You use this value when you configure the IoT Edge runtime.


### Device requirements

Use a physical or virtual Linux device as the IoT Edge device.

Define a *unique* **registration ID** to identify each device. Use the MAC address, serial number, or any unique information from the device. For example, combine a MAC address and serial number to form a registration ID like `sn-007-888-abc-mac-a1-b2-c3-d4-e5-f6`. Valid characters are lowercase alphanumeric and dash (`-`).

<!-- Create a DPS enrollment using symmetric keys H2 and content -->

## Create a DPS enrollment

Create an enrollment to provision one or more devices through DPS.

If you are looking to provision a single IoT Edge device, create an **individual enrollment**. If you need multiple devices provisioned, follow the steps for creating a DPS **group enrollment**.

When you create an enrollment in DPS, you have the opportunity to declare an **initial device twin state**. In the device twin, you can set tags to group devices by any metric you need in your solution, like region, environment, location, or device type. These tags are used to create [automatic deployments](how-to-deploy-at-scale.md).

For more information about enrollments in the device provisioning service, see [How to manage device enrollments](../iot-dps/how-to-manage-enrollments.md).

# [Individual enrollment](#tab/individual-enrollment)

### Create a DPS individual enrollment

> **Tip:**
> The steps in this article are for the Azure portal, but you can also create individual enrollments using the Azure CLI. For more information, see [az iot dps enrollment](https://learn.microsoft.com/cli/azure/iot/dps/enrollment). As part of the CLI command, use the **edge-enabled** flag to specify that the enrollment is for an IoT Edge device.

1. In the [Azure portal](https://portal.azure.com), navigate to your instance of IoT Hub device provisioning service.

1. Under **Settings**, select **Manage enrollments**.

1. Select **Add individual enrollment** then complete the following steps to configure the enrollment:  

   1. For **Mechanism**, select **Symmetric Key**.

   1. Provide a unique **Registration ID** for your device.

   1. Optionally, provide an **IoT Hub Device ID** for your device. You can use device IDs to target an individual device for module deployment. If you don't provide a device ID, the registration ID is used.

   1. Select **True** to declare that the enrollment is for an IoT Edge device.

   1. Optionally, add a tag value to the **Initial Device Twin State**. You can use tags to target groups of devices for module deployment. For example:

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

1. Copy the individual enrollment's **Primary Key** value to use when installing the IoT Edge runtime.

Now that an enrollment exists for this device, the IoT Edge runtime can automatically provision the device during installation.

# [Group enrollment](#tab/group-enrollment)

### Create a DPS group enrollment

> **Tip:**
> The steps in this article are for the Azure portal, but you can also create group enrollments using the Azure CLI. For more information, see [az iot dps enrollment-group](https://learn.microsoft.com/cli/azure/iot/dps/enrollment-group). As part of the CLI command, use the **edge-enabled** flag to specify that the enrollment is for IoT Edge devices. For a group enrollment, all devices must be IoT Edge devices or none of them can be.

1. In the [Azure portal](https://portal.azure.com), navigate to your instance of IoT Hub device provisioning service.

1. Under **Settings**, select **Manage enrollments**.

1. Select **Add individual enrollment** then complete the following steps to configure the enrollment:  

   1. Provide a **Group name**.

   1. Select **Symmetric Key** as the attestation type.

   1. Select **True** to declare that the enrollment is for an IoT Edge device. For a group enrollment, all devices must be IoT Edge devices or none of them can be.

   1. Optionally, add a tag value to the **Initial Device Twin State**. You can use tags to target groups of devices for module deployment. For example:

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

1. Copy your enrollment group's **Primary Key** value to use when creating device keys for use with a group enrollment.

Now that an enrollment group exists, the IoT Edge runtime can automatically provision devices during installation.

#### Derive a device key

Each device that is provisioned as part of a group enrollment needs a derived device key to perform symmetric key attestation with the enrollment during provisioning.

To generate a device key, use the key that you copied from your DPS enrollment group to compute an [HMAC-SHA256](https://wikipedia.org/wiki/HMAC) of the unique registration ID for the device and convert the result into Base64 format.

> **Important:**
> Do not include your enrollment's primary or secondary key in your device code.

On Windows, you can use PowerShell to generate your derived device key as shown in the following example.

Replace the value of **KEY** with the **Primary Key** you noted earlier.

Replace the value of **REG_ID** with your device's registration ID.

```powershell
$KEY='PASTE_YOUR_ENROLLMENT_KEY_HERE'
$REG_ID='PASTE_YOUR_REGISTRATION_ID_HERE'

$hmacsha256 = New-Object System.Security.Cryptography.HMACSHA256
$hmacsha256.key = [Convert]::FromBase64String($KEY)
$sig = $hmacsha256.ComputeHash([Text.Encoding]::ASCII.GetBytes($REG_ID))
$derivedkey = [Convert]::ToBase64String($sig)
echo "`n$derivedkey`n"
```

Below is a sample output of a derived device key:

```powershell
Jsm0lyGpjaVYVP2g3FnmnmG9dI/9qU24wNoykUmermc=
```

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

Once the runtime is installed on your device, configure the device with the information it uses to connect to the device provisioning service and IoT Hub.

Have the following information ready:

* The DPS **ID Scope** value
* The device **Registration ID** you created
* Either the **Primary Key** from an individual enrollment, or a [derived key](https://learn.microsoft.com/azure/iot-dps/concepts-symmetric-key-attestation#install-the-derived-device-key) for devices using a group enrollment.

Create a configuration file for your device based on a template file that is provided as part of the IoT Edge installation.

# [Ubuntu / Debian / RHEL](#tab/ubuntu+debian+rhel)

```bash
sudo cp /etc/aziot/config.toml.edge.template /etc/aziot/config.toml
```

Open the configuration file on the IoT Edge device.

   ```bash
   sudo nano /etc/aziot/config.toml
   ```

# [Ubuntu Core snaps](#tab/snaps)

If you use a snap installation of IoT Edge, the template file is at `/snap/azure-iot-edge/current/etc/aziot/config.toml.edge.template`. Copy the template file to your home directory and name it config.toml. For example:

```bash
cp /snap/azure-iot-edge/current/etc/aziot/config.toml.edge.template ~/config.toml
```

Open the configuration file in your home directory on the IoT Edge device.

```bash
nano ~/config.toml
```

---

1. Find the **Provisioning** section of the file. Uncomment the lines for DPS provisioning with symmetric key, and make sure all other provisioning lines are commented out.

    ```toml
    # DPS provisioning with symmetric key
    [provisioning]
    source = "dps"
    global_endpoint = "https://global.azure-devices-provisioning.net"
    id_scope = "PASTE_YOUR_SCOPE_ID_HERE"

    # Uncomment to send a custom payload during DPS registration
    # payload = { uri = "PATH_TO_JSON_FILE" }
    
    [provisioning.attestation]
    method = "symmetric_key"
    registration_id = "PASTE_YOUR_REGISTRATION_ID_HERE"
    
    symmetric_key = { value = "PASTE_YOUR_PRIMARY_KEY_OR_DERIVED_KEY_HERE" }
    
    # auto_reprovisioning_mode = Dynamic
    ```

1. Update the values of `id_scope`, `registration_id`, and `symmetric_key` with your DPS and device information.

   The symmetric key parameter can accept an inline key, a file URI, or a PKCS#11 URI. Uncomment only one symmetric key line, based on the format you use. If you use an inline key, use a base64-encoded key like the example. If you use a file URI, your file must contain the raw bytes of the key.

   If you use any PKCS#11 URIs, find the **PKCS#11** section in the config file and enter your PKCS#11 configuration information.

    For more information about provisioning configuration settings, see [Configure IoT Edge device settings](configure-device.md#provisioning).

1. Optionally, find the auto reprovisioning mode section of the file. Use the `auto_reprovisioning_mode` parameter to set your device's reprovisioning behavior. **Dynamic** - Reprovision when the device detects that it can be moved from one IoT Hub to another. This is the default. **AlwaysOnStartup** - Reprovision when the device is rebooted or a crash causes the daemons to restart. **OnErrorOnly** - Never trigger device reprovisioning automatically. Each mode has an implicit device reprovisioning fallback if the device can't connect to IoT Hub during identity provisioning because of connectivity errors. For more information, see [IoT Hub device reprovisioning concepts](../iot-dps/concepts-device-reprovision.md).

1. Optionally, uncomment the `payload` parameter to specify the path to a local JSON file. The contents of the file are [sent to DPS as additional data](../iot-dps/how-to-send-additional-data.md#iot-edge-support) when the device registers. This is useful for [custom allocation](../iot-dps/tutorial-custom-allocation-policies.md). For example, if you want to allocate your devices based on an IoT Plug and Play model ID without human intervention.

1. Save and close the file.

1. Apply the configuration changes you made on the device.

    # [Ubuntu / Debian / RHEL](#tab/ubuntu+debian+rhel)
    ```bash
    sudo iotedge config apply
    ```
    
    # [Ubuntu Core snaps](#tab/snaps)
    
    ```bash
    sudo snap set azure-iot-edge raw-config="$(cat ~/config.toml)"
    ```
    
    ---
    
## Check successful installation

If the runtime starts successfully, go to your IoT Hub and start deploying IoT Edge modules to your device.

# [Individual enrollment](#tab/individual-enrollment)

Check that the individual enrollment you created in device provisioning service is used. Go to your device provisioning service instance in the Azure portal. Open the enrollment details for the individual enrollment you created. The status of the enrollment is **assigned**, and the device ID is listed.

# [Group enrollment](#tab/group-enrollment)

Check that the group enrollment you created in device provisioning service is used. Go to your device provisioning service instance in the Azure portal. Open the enrollment details for the group enrollment you created. Go to the **Registration Records** tab to view all devices registered in that group.

---

Run these commands on your device to check that IoT Edge installs and starts successfully.

1. Check the status of the IoT Edge service.

    ```cmd/sh
    sudo iotedge system status
    ```

1. View service logs.

    ```cmd/sh
    sudo iotedge system logs
    ```

1. List running modules.

    ```cmd/sh
    sudo iotedge list
    ```

## Next steps

The device provisioning service enrollment process lets you set the device ID and device twin tags when you set up a new device. Use these values to target individual devices or groups of devices with automatic device management. Learn how to [deploy and monitor IoT Edge modules at scale using the Azure portal](how-to-deploy-at-scale.md) or [using Azure CLI](how-to-deploy-cli-at-scale.md).
