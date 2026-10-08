---
title: Create IoT Edge device on Linux using X.509 certificates
titleSuffix: Azure IoT Edge
description: Create and provision a single IoT Edge device in IoT Hub for manual provisioning with X.509 certificates
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-edge
ms.custom: linux-related-content
services: iot-edge
ms.topic: how-to
ms.date: 02/24/2026
---

# Create and provision an IoT Edge device on Linux using X.509 certificates


**Applies to:** IoT Edge 1.6 checkmark IoT Edge 1.6

> **Important:**
> IoT Edge 1.6 LTS is the [supported release](support.md#releases). IoT Edge 1.5 LTS support ends on November 10, 2026; IoT Edge 1.4 LTS reached end of life on November 12, 2024. If you're using an earlier release, see [Update IoT Edge](how-to-update-iot-edge.md).

This article provides end-to-end instructions for registering and provisioning a Linux IoT Edge device, including installing IoT Edge.

Every device that connects to an IoT hub has a device ID that's used to track cloud-to-device or device-to-cloud communications. You configure a device with its connection information that includes the IoT hub hostname, the device ID, and the information the device uses to authenticate to IoT Hub.

The steps in this article walk through a process called manual provisioning, where you connect a single device to its IoT hub. For manual provisioning, you have two options for authenticating IoT Edge devices:

* **Symmetric keys**: When you create a new device identity in IoT Hub, the service creates two keys. You place one of the keys on the device, and it presents the key to IoT Hub when authenticating.

  This authentication method is faster to get started, but not as secure.

* **X.509 self-signed**: You create two X.509 identity certificates and place them on the device. When you create a new device identity in IoT Hub, you provide thumbprints from both certificates. When the device authenticates to IoT Hub, it presents one certificate and IoT Hub verifies that the certificate matches its thumbprint.

  This authentication method is more secure and recommended for production scenarios.

This article covers using X.509 certificates as your authentication method. If you want to use symmetric keys, see [Create and provision an IoT Edge device on Linux using symmetric keys](how-to-provision-single-device-linux-symmetric.md).

> **Note:**
> If you have many devices to set up and don't want to manually provision each one, use one of the following articles to learn how IoT Edge works with the IoT Hub Device Provisioning Service:
>
> * [Create and provision IoT Edge devices at scale on Linux using X.509 certificates](how-to-provision-devices-at-scale-linux-x509.md)
> * [Create and provision IoT Edge devices at scale with a TPM on Linux](how-to-provision-devices-at-scale-linux-tpm.md)
> * [Create and provision IoT Edge devices at scale on Linux using symmetric keys](how-to-provision-devices-at-scale-linux-symmetric.md)

## Prerequisites

This article covers registering your IoT Edge device and installing IoT Edge on it. These tasks have different prerequisites and utilities used to accomplish them. Make sure you have all the prerequisites covered before proceeding.

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


<!-- Device requirements prerequisites H3 and content -->

### Device requirements

An x64, ARM32, or ARM64 Linux device.

Microsoft publishes installation packages for various operating systems.

For the latest information about which operating systems are currently supported for production scenarios, see [Azure IoT Edge supported platforms](support.md#operating-systems).


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

Now that the container engine and the IoT Edge runtime are installed on your device, you're ready to set up the device with its cloud identity and authentication information.

# [Ubuntu / Debian / RHEL](#tab/ubuntu+debian+rhel)

1. Create the configuration file for your device based on a template file provided as part of the IoT Edge installation.

    ```bash
    sudo cp /etc/aziot/config.toml.edge.template /etc/aziot/config.toml
    ```

1. On the IoT Edge device, open the configuration file.

    ```bash
    sudo nano /etc/aziot/config.toml
    ```

1. Find the **Provisioning** section of the file and uncomment the lines for manual provisioning with X.509 identity certificate. Make sure that any other provisioning sections are commented out.

    ```toml
    # Manual provisioning with x.509 certificates
    [provisioning]
    source = "manual"
    iothub_hostname = "REQUIRED_IOTHUB_HOSTNAME"
    device_id = "REQUIRED_DEVICE_ID_PROVISIONED_IN_IOTHUB"

    [provisioning.authentication]
    method = "x509"

    identity_cert = "REQUIRED_URI_OR_POINTER_TO_DEVICE_IDENTITY_CERTIFICATE"

    identity_pk = "REQUIRED_URI_TO_DEVICE_IDENTITY_PRIVATE_KEY"
   ```

Update the following fields:

* **iothub_hostname**: Hostname of the IoT hub the device connects to. For example, `{IoT hub name}.azure-devices.net`.
* **device_id**: The ID that you provided when you registered the device.
* **identity_cert**: URI to an identity certificate on the device, for example: `file:///path/identity_certificate.pem`. Or, dynamically issue the certificate using EST or a local certificate authority.
* **identity_pk**: URI to the private key file for the provided identity certificate, for example: `file:///path/identity_key.pem`. Or, provide a PKCS#11 URI and then provide your configuration information in the 

**PKCS#11** section later in the config file.

For more information about certificates, see [Manage IoT Edge certificates](how-to-manage-device-certificates.md).

Save and close the file.

   `CTRL + X`, `Y`, `Enter`

After entering the provisioning information in the configuration file, apply your changes:

   ```bash
   sudo iotedge config apply
   ```

# [Ubuntu Core snaps](#tab/snaps)

1. Copy your identity keyfile and certificate in the `/var/snap/azure-iot-identity/current/shared` directory. Create the directory if it doesn't exist.

1. Create a **config.toml** file in your home directory and configure your IoT Edge device for manual provisioning using an X.509 identity certificate.

    ```bash
    sudo nano ~/config.toml
    ```

1. You can manually provision using an X.509 certificate by adding the following provisioning settings to the file:

    ```toml
    [provisioning]
    source = "manual"
    iothub_hostname = "IOT_HUB_HOSTNAME"
    device_id = "REQUIRED_DEVICE_ID_PROVISIONED_IN_IOTHUB"

    [provisioning.authentication]
    
    method = "x509"
    identity_cert = "file:///var/snap/azure-iot-identity/current/shared/IDENTITY_CERT_FILENAME"
    identity_pk = "file:///var/snap/azure-iot-identity/current/shared/IDENTITY_PK_FILENAME"
    ```

    Update the following fields:

    * **iothub_hostname**: Hostname of the IoT hub where the device connects. For example, `example.azure-devices.net`.
    * **device_id**: The ID that you provided when you registered the device.
    * **identity_cert**: URI to an identity certificate on the device, for example: `file:///var/snap/azure-iot-identity/current/shared/identity_certificate.pem`.
    * **identity_pk**: URI to the private key file for the provided identity certificate, for example: `file:///var/snap/azure-iot-identity/current/shared/identity_key.pem`.

    For more information about provisioning configuration settings, see [Configure IoT Edge device settings](configure-device.md#provisioning).

1. Save and close the file.

   `CTRL + X`, `Y`, `Enter`

1. Set the configuration for IoT Edge and the Identity Service using the following command:

    ```bash
    sudo snap set azure-iot-edge raw-config="$(cat ~/config.toml)"
    ```

---

## Deploy modules

To deploy your IoT Edge modules, go to your IoT hub in the Azure portal, then:

1. Select **Devices**, under **Device management**, from the resource menu.

1. Select your device to open its page.

1. Select the **Set Modules** tab.

1. Since we want to deploy the IoT Edge default modules (edgeAgent and edgeHub), we don't need to add any modules to this pane, so select **Review + create** at the bottom.

1. You see the JSON confirmation of your modules. Select **Create** to deploy the modules.

For more information, see [Deploy a module](quickstart-linux.md#deploy-a-module).

## Verify successful configuration

Verify that the runtime was successfully installed and configured on your IoT Edge device.

>**Tip:**
>You need elevated privileges to run `iotedge` commands. Once you sign out of your machine and sign back in the first time after installing the IoT Edge runtime, your permissions are automatically updated. Until then, use `sudo` in front of the commands.

Check to see that the IoT Edge system service is running.

```bash
sudo iotedge system status
```

A successful status response is `Ok`.

If you need to troubleshoot the service, retrieve the service logs.


```bash
sudo iotedge system logs
```

Use the `check` tool to verify configuration and connection status of the device.

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
>
>**Could not check current state of edgeHub container**
>
>This error is expected on a newly provisioned device because the IoT Edge Hub module isn't running. To resolve the error, in IoT Hub, set the modules for the device and create a deployment. Creating a deployment for the device starts the modules on the device including the IoT Edge Hub module.

View all the modules running on your IoT Edge device. When the service starts for the first time, you should only see the **edgeAgent** module running. The edgeAgent module runs by default and helps to install and start any other modules that you deploy to your device.

   ```bash
   sudo iotedge list
   ```

When you create a new IoT Edge device, it displays the status code `417 -- The device's deployment configuration is not set` in the Azure portal. This status is normal, and means that the device is ready to receive a module deployment.

## Offline or specific version installation (optional)

The steps in this section are for scenarios not covered by the standard installation steps. These scenarios might include:

* Install IoT Edge while offline
* Install a release candidate version

Use the steps in this section if you want to install a specific version of the Azure IoT Edge runtime that isn't available through your package manager. The Microsoft package list only contains a limited set of recent versions and their subversions, so these steps are for anyone who wants to install an older version or a release candidate version.

If you're using Ubuntu snaps, you can download a snap and install it offline. For more information, see [Download snaps and install offline](https://forum.snapcraft.io/t/download-snaps-and-install-offline/15713).

Using curl commands, you can target the component files directly from the IoT Edge GitHub repository.

1. Navigate to the [Azure IoT Edge releases](https://github.com/Azure/azure-iotedge/releases), and find the release version that you want to target.

2. Expand the **Assets** section for that version.

3. Every release should have new files for IoT Edge and the identity service. If you're going to install IoT Edge on an offline device, download these files ahead of time. Otherwise, use the following commands to update those components.

   1. Find the **aziot-identity-service** file that matches your IoT Edge device's architecture. Right-click on the file link and copy the link address.

   2. To install that version of the identity service, use the copied link in the following command:

      # [Ubuntu / Debian](#tab/ubuntu+debian)
      ```bash
      curl -L <identity service link> -o aziot-identity-service.deb && sudo apt-get install ./aziot-identity-service.deb
      ```

      # [Red Hat Enterprise Linux](#tab/rhel)
      ```bash
      curl -L <identity service link> -o aziot-identity-service.rpm && sudo yum localinstall ./aziot-identity-service.rpm
      ```

      # [Ubuntu Core snaps](#tab/snaps)
        If you're using Ubuntu snaps, you can download a snap and install it offline. For more information, see [Download snaps and install offline](https://forum.snapcraft.io/t/download-snaps-and-install-offline/15713).
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
        If you're using Ubuntu snaps, you can download a snap and install it offline. For more information, see [Download snaps and install offline](https://forum.snapcraft.io/t/download-snaps-and-install-offline/15713).

      ---

## Uninstall IoT Edge

If you want to remove the IoT Edge installation from your device, use the following commands.

Remove the IoT Edge runtime.

# [Ubuntu / Debian](#tab/ubuntu+debian)
```bash
sudo apt-get autoremove --purge aziot-edge
```

Leave out the `--purge` flag if you plan to reinstall IoT Edge and use the same configuration information in the future. The `--purge` flags delete all the files associated with IoT Edge, including your configuration files. 

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
sudo docker rm -f <container name>
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

## Next steps

Continue to [deploy IoT Edge modules](how-to-deploy-modules-portal.md) to learn how to deploy modules onto your device.
