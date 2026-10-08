---
title: Create and provision devices with a virtual TPM on Linux - Azure IoT Edge
description: Use a simulated TPM on a Linux device to test the Azure IoT Hub device provisioning service for Azure IoT Edge.
author: sethmanheim
ms.author: sethm
manager: lizross
ms.date: 03/02/2026
ms.topic: concept-article
ms.service: azure-iot-edge
ms.custom: linux-related-content
services: iot-edge
---
# Create and provision IoT Edge devices at scale with a TPM on Linux


**Applies to:** IoT Edge 1.6 checkmark IoT Edge 1.6

> **Important:**
> IoT Edge 1.6 LTS is the [supported release](support.md#releases). IoT Edge 1.5 LTS support ends on November 10, 2026; IoT Edge 1.4 LTS reached end of life on November 12, 2024. If you're using an earlier release, see [Update IoT Edge](how-to-update-iot-edge.md).

This article provides instructions for autoprovisioning an Azure IoT Edge for Linux device by using a Trusted Platform Module (TPM). You can automatically provision IoT Edge devices with the [Azure IoT Hub device provisioning service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-dps/index.yml). If you're unfamiliar with the process of autoprovisioning, review the [provisioning overview](../iot-dps/about-iot-dps.md#provisioning-process) before you continue.

This article outlines two methodologies. Select your preference based on the architecture of your solution:

- Autoprovision a Linux device with physical TPM hardware.
- Autoprovision a Linux virtual machine (VM) with a simulated TPM running on a Windows development machine with Hyper-V enabled. We recommend using this methodology only as a testing scenario. A simulated TPM doesn't offer the same security as a physical TPM.

Instructions differ based on your methodology, so make sure you're on the correct tab going forward.

# [Physical device](#tab/physical-device)

The tasks are as follows:

1. Retrieve provisioning information for your TPM.
1. Create an individual enrollment for your device in an instance of the IoT Hub device provisioning service.
1. Install the IoT Edge runtime and connect the device to the IoT hub.

# [Virtual machine](#tab/virtual-machine)

The tasks are as follows:

1. Create a Linux VM in Hyper-V with a simulated TPM for hardware security.
1. Retrieve provisioning information for your TPM.
1. Create an individual enrollment for your device in an instance of the IoT Hub device provisioning service.
1. Install the IoT Edge runtime and connect the device to the IoT hub.

---

## Prerequisites

<!-- Cloud resources prerequisites H3 and content -->

### Cloud resources

* An active IoT hub
* An instance of the IoT Hub device provisioning service in Azure, linked to your IoT hub
  * If you don't have a device provisioning service instance, you can follow the instructions in the [Create a new IoT Hub device provisioning service](https://learn.microsoft.com/azure/iot-dps/quick-setup-auto-provision#create-a-new-iot-hub-device-provisioning-service) and [Link the IoT hub and your device provisioning service](https://learn.microsoft.com/azure/iot-dps/quick-setup-auto-provision#link-the-iot-hub-and-your-device-provisioning-service) sections of the IoT Hub device provisioning service quickstart.
  * After you have the device provisioning service running, copy the value of **ID Scope** from the overview page. You use this value when you configure the IoT Edge runtime.


### Device requirements

# [Physical device](#tab/physical-device)

A physical Linux device to be the IoT Edge device.

If you are a device manufacturer, then refer to guidance on [integrating a TPM into the manufacturing process](../iot-dps/concepts-device-oem-security-practices.md#integrating-a-tpm-into-the-manufacturing-process).

# [Virtual machine](#tab/virtual-machine)

A Windows development machine with [Hyper-V enabled](https://learn.microsoft.com/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v). This article uses Windows 10 running an Ubuntu Server VM.

---

> **Note:**
> TPM 2.0 is required when you use TPM attestation with the device provisioning service.
>
> You can only create individual, not group, device provisioning service enrollments when you use a TPM.

## Set up your device

# [Physical device](#tab/physical-device)

If you're using a physical Linux device with a TPM, there are no extra steps to set up your device.

You're ready to continue.

# [Virtual machine](#tab/virtual-machine)

In this section, you create a new Linux VM on Hyper-V. You configure this VM with a simulated TPM for testing how automatic provisioning works with IoT Edge.

> **Tip:**
> If you're using a VM, you'll copy and paste on the VM many times throughout this article. Copying and pasting isn't easy through the Hyper-V Manager connection application. You might want to connect to the VM through Hyper-V Manager once to retrieve its IP address. First, run `sudo apt install net-tools`, and then run `hostname -I`. Then, you can use the IP address to connect through SSH: `ssh <username>@<ipaddress>`.

### Create a virtual switch

A virtual switch enables your VM to connect to a physical network.

1. Open Hyper-V manager on your Windows machine.

1. On the **Actions** menu, select **Virtual Switch Manager**.

1. Select an **External** virtual switch, and then select **Create Virtual Switch**.

1. Give your new virtual switch a name. For example, use **EdgeSwitch**. Make sure that the connection type is set to **External network**, and then select **OK**.

1. A pop-up warns you that network connectivity might be disrupted. Select **Yes** to continue.

> **Tip:**
> If you see errors while you create the new virtual switch, ensure that no other switches are using the ethernet adapter, and that no other switches use the same name.

### Create the virtual machine

Create a new VM from a bootable image file.

1. Download a disk image file to use for your VM and save it locally. For example, [Ubuntu Server 22.04](http://releases.ubuntu.com/22.04/). For information about supported operating systems for IoT Edge devices, see [Azure IoT Edge supported systems](support.md).

1. In Hyper-V Manager, select **Action** > **New** > **Virtual Machine** on the **Actions** menu.

1. Complete the **New Virtual Machine Wizard** with the following specific configurations:

   1. **Specify Generation**: Select **Generation 2**. Generation 2 VMs have nested virtualization enabled, which is required to run IoT Edge on a VM.
   1. **Configure Networking**: Set the value of **Connection** to the virtual switch that you created in the previous section.
   1. **Installation Options**: Select **Install an operating system from a bootable image file** and browse to the disk image file that you saved locally.

1. Select **Finish** in the wizard to create the VM.

It might take a few minutes to create the new VM.

### Enable virtual TPM

After your VM is created, open its settings to enable the virtual TPM that lets you autoprovision the device.

1. In Hyper-V Manager, right-click the VM and select **Settings**.

1. Go to **Security**.

1. Clear **Enable Secure Boot**.

1. Select **Enable Trusted Platform Module**.

1. Select **OK**.

### Start the virtual machine

Start your VM to complete the installation process.

1. In Hyper-V Manager, start your VM and connect to it.

1. Follow the prompts within the VM to finish the installation process and reboot the machine.

After the installation is finished and you've signed back in to your VM, you're ready to continue.

---

## Retrieve provisioning information for your TPM

> **Note:**
> This article previously used the `tpm_device_provision` tool from the IoT C SDK to generate provisioning info. If you relied on that tool previously, then be aware the steps below generate a different registration ID for the same public endorsement key. If you need to recreate the registration ID as before then refer to how the C SDK's [tpm_device_provision tool](https://github.com/Azure/azure-iot-sdk-c/tree/main/provisioning_client/tools/tpm_device_provision) generates it. Be sure the registration ID for the individual enrollment in DPS matches the registration ID the IoT Edge device is configured to use.

In this section, you use the TPM2 software tools to retrieve the endorsement key for your TPM and then generate a unique registration ID. This section corresponds with [Step 3: Device has firmware and software installed](../iot-dps/concepts-device-oem-security-practices.md#step-3-device-has-firmware-and-software-installed) in the process for [integrating a TPM into the manufacturing process](../iot-dps/concepts-device-oem-security-practices.md#integrating-a-tpm-into-the-manufacturing-process).

### Install the TPM2 Tools
Sign in to your device, and install the `tpm2-tools` package.

# [Ubuntu / Debian](#tab/ubuntu+debian)


   ```bash
   sudo apt-get install tpm2-tools
   ```

# [Red Hat Enterprise Linux](#tab/rhel)


   ```bash
   sudo yum install tpm2-tools
   ```

# [Ubuntu Core snaps](#tab/snaps)

   ```bash
   sudo snap install tpm2-tools
   ```
---

Run the following script to read the endorsement key, creating one if it does not already exist.

   ```bash
   #!/bin/sh
   if [ "$USER" != "root" ]; then
     SUDO="sudo "
   fi

   $SUDO tpm2_readpublic -Q -c 0x81010001 -o ek.pub 2> /dev/null
   if [ $? -gt 0 ]; then
     # Create the endorsement key (EK)
     $SUDO tpm2_createek -c 0x81010001 -G rsa -u ek.pub

     # Create the storage root key (SRK)
     $SUDO tpm2_createprimary -Q -C o -c srk.ctx > /dev/null

     # make the SRK persistent
     $SUDO tpm2_evictcontrol -c srk.ctx 0x81000001 > /dev/null

     # open transient handle space for the TPM
     $SUDO tpm2_flushcontext -t > /dev/null
   fi

   printf "Gathering the registration information...\n\nRegistration Id:\n%s\n\nEndorsement Key:\n%s\n" $(sha256sum -b ek.pub | cut -d' ' -f1 | sed -e 's/[^[:alnum:]]//g') $(base64 -w0 ek.pub)
   $SUDO rm ek.pub srk.ctx 2> /dev/null

   ```

The output window displays the device's **Endorsement key** and a unique **Registration ID**. Copy these values for use later when you create an individual enrollment for your device in the device provisioning service.

After you have your registration ID and endorsement key, you're ready to continue.

> **Tip:**
> If you don't want to use the TPM2 software tools to retrieve the information, you need to find another way to obtain the provisioning information. The endorsement key, which is unique to each TPM chip, is obtained from the TPM chip manufacturer associated with it. You can derive a unique registration ID for your TPM device. For example, as shown above you can create an SHA-256 hash of the endorsement key.

<!-- Create an enrollment for your device using TPM provisioning information H2 and content -->

## Create a device provisioning service enrollment

Use your TPM's provisioning information to create an individual enrollment in the device provisioning service.

When you create an enrollment in the device provisioning service, you have the opportunity to declare an **Initial Device Twin State**. In the device twin, you can set tags to group devices by any metric used in your solution, like region, environment, location, or device type. These tags are used to create [automatic deployments](how-to-deploy-at-scale.md).

> **Tip:**
> The steps in this article are for the Azure portal, but you can also create individual enrollments by using the Azure CLI. For more information, see [az iot dps enrollment](https://learn.microsoft.com/cli/azure/iot/dps/enrollment). As part of the CLI command, use the **edge-enabled** flag to specify that the enrollment is for an IoT Edge device.

1. In the [Azure portal](https://portal.azure.com), go to your instance of the IoT Hub device provisioning service.

1. Under **Settings**, select **Manage enrollments**.

1. Select **Add individual enrollment**, and then complete the following steps to configure the enrollment:

   1. For **Mechanism**, select **TPM**.

   1. Provide the **Endorsement key** and **Registration ID** that you copied from your VM or physical device.

   1. Provide an ID for your device if you want. If you don't provide a device ID, the registration ID is used.

   1. Select **True** to declare that your VM or physical device is an IoT Edge device.

   1. Choose the linked IoT hub that you want to connect your device to, or select **Link to new IoT Hub**. You can choose multiple hubs, and the device will be assigned to one of them according to the selected assignment policy.

   1. Add a tag value to the **Initial Device Twin State** if you want. You can use tags to target groups of devices for module deployment. For more information, see [Deploy IoT Edge modules at scale](how-to-deploy-at-scale.md).

   1. Select **Save**.

Now that an enrollment exists for this device, the IoT Edge runtime can automatically provision the device during installation.


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

After the runtime is installed on your device, configure the device with the information it uses to connect to the device provisioning service and IoT Hub.

Know your device provisioning service **ID Scope** and device **Registration ID** that were gathered previously.

Create a configuration file for your device based on a template file that's provided as part of the IoT Edge installation.

# [Ubuntu / Debian / RHEL](#tab/ubuntu+debian+rhel)

```bash
sudo cp /etc/aziot/config.toml.edge.template /etc/aziot/config.toml
```

Open the configuration file on the IoT Edge device.

```bash
sudo nano /etc/aziot/config.toml
```

# [Ubuntu Core snaps](#tab/snaps)

If using a snap installation of IoT Edge, the template file is located at `/snap/azure-iot-edge/current/etc/aziot/config.toml.edge.template`. Create a copy of the template file in your home directory and name it config.toml. For example:

```bash
cp /snap/azure-iot-edge/current/etc/aziot/config.toml.edge.template ~/config.toml
```

Open the configuration file in your home directory on the IoT Edge device.

```bash
nano ~/config.toml
```

---

1. Find the provisioning configurations section of the file. Uncomment the lines for TPM provisioning, and make sure any other provisioning lines are commented out.

   ```toml
   # DPS provisioning with TPM
   [provisioning]
   source = "dps"
   global_endpoint = "https://global.azure-devices-provisioning.net"
   id_scope = "DPS_ID_SCOPE_HERE"

   # Uncomment to send a custom payload during DPS registration
   # payload = { uri = "PATH_TO_JSON_FILE" }
   
   [provisioning.attestation]
   method = "tpm"
   registration_id = "REGISTRATION_ID_HERE"

   # auto_reprovisioning_mode = Dynamic
   ```

1. Update the values of `id_scope` and `registration_id` with your device provisioning service and device information. The `scope_id` value is the **ID Scope** from your device provisioning service instance's overview page.

    For more information about provisioning configuration settings, see [Configure IoT Edge device settings](configure-device.md#provisioning).

1. Optionally, find the auto reprovisioning mode section of the file. Use the `auto_reprovisioning_mode` parameter to configure your device's reprovisioning behavior. **Dynamic** - Reprovision when the device detects that it may have been moved from one IoT Hub to another. This is the default. **AlwaysOnStartup** - Reprovision when the device is rebooted or a crash causes the daemons to restart. **OnErrorOnly** - Never trigger device reprovisioning automatically. Each mode has an implicit device reprovisioning fallback if the device is unable to connect to IoT Hub during identity provisioning due to connectivity errors. For more information, see [IoT Hub device reprovisioning concepts](../iot-dps/concepts-device-reprovision.md).

1. Optionally, uncomment the `payload` parameter to specify the path to a local JSON file. The contents of the file is [sent to DPS as additional data](../iot-dps/how-to-send-additional-data.md#iot-edge-support) when the device registers. This is useful for [custom allocation](../iot-dps/tutorial-custom-allocation-policies.md). For example, if you want to allocate your devices based on an IoT Plug and Play model ID without human intervention.

1. Save and close the file.

## Give IoT Edge access to the TPM

The IoT Edge runtime relies on a TPM service that brokers access to a device's TPM. This service needs to access the TPM to automatically provision your device.

You can give access to the TPM by overriding the systemd settings so that the `aziottpm` service has root privileges. If you don't want to elevate the service privileges, you can also use the following steps to manually provide TPM access.

1. Create a new rule that gives the IoT Edge runtime access to `tpm0` and `tpmrm0`.

   ```bash
   sudo touch /etc/udev/rules.d/tpmaccess.rules
   ```

1. Open the rules file.

   ```bash
   sudo nano /etc/udev/rules.d/tpmaccess.rules
   ```

1. Copy the following access information into the rules file. The `tpmrm0` might not be present on devices that use a kernel earlier than 4.12. Devices that don't have `tpmrm0` will safely ignore that rule.

   ```input
   # allow aziottpm access to tpm0 and tpmrm0
   KERNEL=="tpm0", SUBSYSTEM=="tpm", OWNER="root", GROUP="aziottpm", MODE="0660"
   KERNEL=="tpmrm0", SUBSYSTEM=="tpmrm", OWNER="root", GROUP="aziottpm", MODE="0660"
   ```

1. Save and exit the file.

1. Trigger the `udev` system to evaluate the new rule.

   ```bash
   /bin/udevadm trigger --subsystem-match=tpm --subsystem-match=tpmrm
   ```

1. Verify that the rule was successfully applied.

   ```bash
   ls -l /dev/tpm*
   ```

   Successful output appears as follows:

   ```output
   crw-rw---- 1 root aziottpm 10, 224 Jul 20 16:27 /dev/tpm0
   crw-rw---- 1 root aziottpm 10, 224 Jul 20 16:27 /dev/tpmrm0
   ```

   If you don't see that the correct permissions applied, try rebooting your machine to refresh `udev`.

1. Apply the configuration changes that you made on the device.

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

If you didn't already, apply the configuration changes that you made on the device.

```bash
sudo iotedge config apply
```

Check to see that the IoT Edge runtime is running.

   ```bash
sudo iotedge system status
```

Examine daemon logs.

```cmd/sh
sudo iotedge system logs
```

If you see provisioning errors, it might be that the configuration changes haven't taken effect yet. Try restarting the IoT Edge daemon.

```bash
sudo systemctl daemon-reload
```

Or, try restarting your VM to see if the changes take effect on a fresh start.

If the runtime started successfully, you can go into your IoT hub and see that your new device was automatically provisioned. Now your device is ready to run IoT Edge modules.

List running modules.

```cmd/sh
iotedge list
```

You can verify that the individual enrollment that you created in the device provisioning service was used. Go to your device provisioning service instance in the Azure portal. Open the enrollment details for the individual enrollment that you created. Notice that the status of the enrollment is **assigned** and the device ID is listed.

## Next steps

The device provisioning service enrollment process lets you set the device ID and device twin tags at the same time as you provision the new device. You can use those values to target individual devices or groups of devices by using automatic device management.

Learn how to [deploy and monitor IoT Edge modules at scale by using the Azure portal](how-to-deploy-at-scale.md) or [the Azure CLI](how-to-deploy-cli-at-scale.md).
