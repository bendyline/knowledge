---
title: Create IoT Edge devices at scale using X.509 certificates on Linux
titleSuffix: Azure IoT Edge
description: Use X.509 certificates to test provisioning devices at scale for Azure IoT Edge with device provisioning service
author: sethmanheim
ms.author: sethm
ms.date: 03/02/2026
ms.topic: how-to
ms.service: azure-iot-edge
ms.custom: linux-related-content
services: iot-edge
---

# Create and provision IoT Edge devices at scale on Linux using X.509 certificates


**Applies to:** IoT Edge 1.6 checkmark IoT Edge 1.6

> **Important:**
> IoT Edge 1.6 LTS is the [supported release](support.md#releases). IoT Edge 1.5 LTS support ends on November 10, 2026; IoT Edge 1.4 LTS reached end of life on November 12, 2024. If you're using an earlier release, see [Update IoT Edge](how-to-update-iot-edge.md).

This article gives step-by-step instructions for autoprovisioning one or more Linux IoT Edge devices using X.509 certificates. Automatically provision Azure IoT Edge devices with the [Azure IoT Hub device provisioning service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-dps/index.yml) (DPS). If you aren't familiar with autoprovisioning, review the [provisioning overview](../iot-dps/about-iot-dps.md#provisioning-process) before you continue.

Here are the steps to provision IoT Edge devices using X.509 certificates:

1. Generate certificates and keys.
1. Create an **individual enrollment** for a single device or a **group enrollment** for a set of devices.
1. Install the IoT Edge runtime and register the device with IoT Hub.

X.509 certificates let you scale production and simplify device provisioning. Typically, X.509 certificates are arranged in a certificate chain of trust. The chain starts with a self-signed or trusted root certificate, and each certificate in the chain signs the next lower certificate. This pattern creates a delegated chain of trust from the root certificate through each intermediate certificate to the final downstream device certificate installed on a device.

> **Tip:**
> If your device has a Hardware Security Module (HSM) like a TPM 2.0, store the X.509 keys securely in the HSM. Learn how to implement zero-touch provisioning at scale with the [iotedge-tpm2cloud](https://aka.ms/iotedge-tpm2cloud) sample.

## Prerequisites

<!-- Cloud resources prerequisites H3 and content -->

### Cloud resources

* An active IoT hub
* An instance of the IoT Hub device provisioning service in Azure, linked to your IoT hub
  * If you don't have a device provisioning service instance, you can follow the instructions in the [Create a new IoT Hub device provisioning service](https://learn.microsoft.com/azure/iot-dps/quick-setup-auto-provision#create-a-new-iot-hub-device-provisioning-service) and [Link the IoT hub and your device provisioning service](https://learn.microsoft.com/azure/iot-dps/quick-setup-auto-provision#link-the-iot-hub-and-your-device-provisioning-service) sections of the IoT Hub device provisioning service quickstart.
  * After you have the device provisioning service running, copy the value of **ID Scope** from the overview page. You use this value when you configure the IoT Edge runtime.


### Device requirements

Use a physical or virtual Linux device as the IoT Edge device.

## Generate device identity certificates

The device identity certificate is a downstream device certificate that connects through a certificate chain of trust to the top X.509 certificate authority (CA) certificate. The device identity certificate must have its common name (CN) set to the device ID that you want the device to have in your IoT hub.

Device identity certificates are only used for provisioning the IoT Edge device and authenticating the device with Azure IoT Hub. These certificates aren't signing certificates. CA certificates that the IoT Edge device presents to modules or downstream devices are used for verification. For more information, see [Azure IoT Edge certificate usage detail](iot-edge-certs.md).

After you create the device identity certificate, you have two files: a `.cer` or `.pem` file with the public portion of the certificate, and a `.cer` or `.pem` file with the private key. If you use group enrollment in DPS, you also need the public portion of an intermediate or root CA certificate in the same certificate chain of trust.

You need these files to set up automatic provisioning with X.509:

* The device identity certificate and its private key certificate. The device identity certificate is uploaded to DPS if you create an individual enrollment. The private key is passed to the IoT Edge runtime.
* A full chain certificate with at least the device identity and the intermediate certificates. The full chain certificate is passed to the IoT Edge runtime.
* An intermediate or root CA certificate from the certificate chain of trust. This certificate is uploaded to DPS if you create a group enrollment.

### Use test certificates (optional)

If you don't have a certificate authority to create new identity certificates and want to try this scenario, use the scripts in the Azure IoT Edge git repository to generate test certificates. Use these certificates for development testing only. Don't use them in production.

To create test certificates, follow the steps in [Create demo certificates to test IoT Edge device features](how-to-create-test-certificates.md). Complete the two required sections to set up the certificate generation scripts and create a root CA certificate. Then, follow the steps to create a device identity certificate. When you finish, you have the following certificate chain and key pair:

* `<WRKDIR>/certs/iot-edge-device-identity-<name>-full-chain.cert.pem`
* `<WRKDIR>/private/iot-edge-device-identity-<name>.key.pem`

You need both certificates on the IoT Edge device. If you use individual enrollment in DPS, upload the `.cert.pem` file. If you use group enrollment in DPS, also upload an intermediate or root CA certificate in the same certificate chain of trust. If you use demo certificates, use the `<WRKDIR>/certs/azure-iot-test-only.root.ca.cert.pem` certificate for group enrollment.

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

After you install the runtime on your device, set up the device with the information it uses to connect to the device provisioning service and IoT Hub.

Make sure you have the following information:

* The DPS **ID Scope** value. Get this value from the overview page of your DPS instance in the Azure portal.
* The device identity certificate chain file on the device.
* The device identity key file on the device.

Create a configuration file for your device based on the template file that's included with the IoT Edge installation.

# [Ubuntu / Debian / RHEL](#tab/ubuntu+debian+rhel)

```bash
sudo cp /etc/aziot/config.toml.edge.template /etc/aziot/config.toml
```

Open the configuration file on your IoT Edge device.

```bash
sudo nano /etc/aziot/config.toml
```

Find the **Provisioning** section of the file. Uncomment the lines for DPS provisioning with X.509 certificate, and make sure all other provisioning lines are commented out.

```toml
# DPS provisioning with X.509 certificate
[provisioning]
source = "dps"
global_endpoint = "https://global.azure-devices-provisioning.net"
id_scope = "SCOPE_ID_HERE"

# Uncomment to send a custom payload during DPS registration
# payload = { uri = "PATH_TO_JSON_FILE" }

[provisioning.attestation]
method = "x509"
registration_id = "REGISTRATION_ID_HERE"

identity_cert = "DEVICE_IDENTITY_CERTIFICATE_HERE" # For example, "file:///var/aziot/device-id.pem"
identity_pk = "DEVICE_IDENTITY_PRIVATE_KEY_HERE"   # For example, "file:///var/aziot/device-id.key"

# auto_reprovisioning_mode = Dynamic
```

# [Ubuntu Core snaps](#tab/snaps)

If you use a snap installation of IoT Edge, the template file is at `/snap/azure-iot-edge/current/etc/aziot/config.toml.edge.template`. Copy the template file to your home directory and name it `config.toml`. For example:

```bash
cp /snap/azure-iot-edge/current/etc/aziot/config.toml.edge.template ~/config.toml
```

Open the configuration file in your home directory on your IoT Edge device.

```bash
nano ~/config.toml
```

Find the **Provisioning** section of the file. Uncomment the lines for DPS provisioning with X.509 certificate, and make sure any other provisioning lines are commented out. Use the path to the shared directory that's accessible to both *azure-iot-edge* and *azure-iot-identity* snaps for the certificate files. For example, `/var/snap/azure-iot-identity/current/shared/`.

```toml
# DPS provisioning with X.509 certificate
[provisioning]
source = "dps"
global_endpoint = "https://global.azure-devices-provisioning.net"
id_scope = "SCOPE_ID_HERE"

# Uncomment to send a custom payload during DPS registration
# payload = { uri = "PATH_TO_JSON_FILE" }

[provisioning.attestation]
method = "x509"
registration_id = "REGISTRATION_ID_HERE"

identity_cert = "DEVICE_IDENTITY_CERTIFICATE_HERE" # For example, "file:///var/snap/azure-iot-identity/current/shared/device-id.pem"
identity_pk = "DEVICE_IDENTITY_PRIVATE_KEY_HERE"   # For example, "file:///var/snap/azure-iot-identity/current/shared/device-id.key"


# auto_reprovisioning_mode = Dynamic
```

---

1. Update the value of `id_scope` with the scope ID you copied from your DPS instance.

1. Enter a `registration_id` for the device, which is the ID the device has in IoT Hub. The registration ID must match the common name (CN) of the identity certificate.

1. Update the values of `identity_cert` and `identity_pk` with your certificate and key information.

   You can provide the identity certificate value as a file URI, or it can be dynamically issued using EST or a local certificate authority. Uncomment only one line, based on the format you use.

   You can provide the identity private key value as a file URI or a PKCS#11 URI. Uncomment only one line, based on the format you use.

   If you use any PKCS#11 URIs, find the **PKCS#11** section in the config file and enter your PKCS#11 configuration information.

   For more information about certificates, see [Manage IoT Edge certificates](how-to-manage-device-certificates.md).

   For more information about provisioning configuration settings, see [Configure IoT Edge device settings](configure-device.md#provisioning).

1. Optionally, find the auto reprovisioning mode section of the file. Use the `auto_reprovisioning_mode` parameter to configure your device's reprovisioning behavior. **Dynamic** - Reprovision when the device detects that it can have been moved from one IoT Hub to another. This is the default. **AlwaysOnStartup** - Reprovision when the device is rebooted or a crash causes the daemons to restart. **OnErrorOnly** - Never trigger device reprovisioning automatically. Each mode has an implicit device reprovisioning fallback if the device can't connect to IoT Hub during identity provisioning because of connectivity errors. For more information, see [IoT Hub device reprovisioning concepts](../iot-dps/concepts-device-reprovision.md).

1. Optionally, uncomment the `payload` parameter to specify the path to a local JSON file. The contents of the file are [sent to DPS as additional data](../iot-dps/how-to-send-additional-data.md#iot-edge-support) when the device registers. This is useful for [custom allocation](../iot-dps/tutorial-custom-allocation-policies.md). For example, if you want to allocate your devices based on an IoT Plug and Play model ID without human intervention.

1. Save and close the file.

Apply the configuration changes you made to IoT Edge.

# [Ubuntu / Debian / RHEL](#tab/ubuntu+debian+rhel)
```bash
sudo iotedge config apply
```

# [Ubuntu Core snaps](#tab/snaps)

```bash
sudo snap set azure-iot-edge raw-config="$(cat ~/config.toml)"
```

---

## Verify successful installation

If the runtime starts successfully, go to your IoT Hub and start deploying IoT Edge modules to your device.

# [Individual enrollment](#tab/individual-enrollment)

Check that the individual enrollment you created in device provisioning service is used. Go to your device provisioning service instance in the Azure portal. Open the enrollment details for the individual enrollment you created. The status of the enrollment is **assigned**, and the device ID is listed.

# [Group enrollment](#tab/group-enrollment)

Check that the group enrollment you created in device provisioning service is used. Go to your device provisioning service instance in the Azure portal. Open the enrollment details for the group enrollment you created. Go to the **Registration Records** tab to view all devices registered in that group.

---

Run these commands on your device to check that IoT Edge is installed and running.

Check the status of the IoT Edge service.

```cmd/sh
sudo iotedge system status
```

View service logs.

```cmd/sh
sudo iotedge system logs
```

List running modules.

```cmd/sh
sudo iotedge list
```

## Next steps

The device provisioning service enrollment process lets you set the device ID and device twin tags when you provision a new device. Use these values to target individual devices or groups of devices with automatic device management. Learn how to [deploy and monitor IoT Edge modules at scale using the Azure portal](how-to-deploy-at-scale.md) or [using Azure CLI](how-to-deploy-cli-at-scale.md).
