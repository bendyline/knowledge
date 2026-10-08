---
title: Azure Stack Edge Pro R security | Microsoft Docs
description: Describes the security and privacy features that protect your Azure Stack Edge Pro 2, Azure Stack Edge Pro R and Azure Stack Edge Mini R devices, service, and data on-premises and in the cloud.
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.topic: article
ms.date: 02/25/2022
ms.author: sipastak
---
# Security and data protection for Azure Stack Edge Pro 2, Azure Stack Edge Pro R, and Azure Stack Edge Mini R


**APPLIES TO:** Yes for Pro 2 SKUAzure Stack Edge Pro 2Yes for Pro R SKUAzure Stack Edge Pro RYes for Mini R SKUAzure Stack Edge Mini R&nbsp;&nbsp;


Security is a major concern when you're adopting a new technology, especially if the technology is used with confidential or proprietary data. Azure Stack Edge Pro R and Azure Stack Edge Mini R help you ensure that only authorized entities can view, modify, or delete your data.

This article describes the Azure Stack Edge Pro R and Azure Stack Edge Mini R security features that help protect each of the solution components and the data stored in them.

The solution consists of four main components that interact with each other:

- **Azure Stack Edge service, hosted in Azure public or Azure Government cloud**. The management resource that you use to create the device order, configure the device, and then track the order to completion.
- **Azure Stack Edge rugged device**. The rugged, physical device that's shipped to you so you can import your on-premises data into Azure public or Azure Government cloud. The device could be Azure Stack Edge Pro R or Azure Stack Edge Mini R.
- **Clients/hosts connected to the device**. The clients in your infrastructure that connect to the device and contain data that needs to be protected.
- **Cloud storage**. The location in the Azure cloud platform where data is stored. This location is typically the storage account linked to the Azure Stack Edge resource that you create.

## Service protection

The Azure Stack Edge service is a management service that's hosted in Azure. The service is used to configure and manage the device.


- To access the Data Box Edge service, your organization needs to have an Enterprise Agreement (EA) or Cloud Solution Provider (CSP) subscription. For more information, see [Sign up for an Azure subscription](https://www.youtube.com/watch?v=u5wf8KMD_M8).
- Because this management service is hosted in Azure, it's protected by the Azure security features. For more information about the security features provided by Azure, go to the [Microsoft Azure Trust Center](https://azure.microsoft.com/support/trust-center/security/).
- For SDK management operations, you can get the encryption key for your resource in **Device properties**. You can view the encryption key only if you have permissions for the Resource Graph API.


## Device protection

The rugged device is an on-premises device that helps transform your data by processing it locally and then sending it to Azure. Your device:

- Needs an activation key to access the Azure Stack Edge service.
- Is protected at all times by a device password.
- Is a locked-down device. The device baseboard management controller (BMC) and BIOS are password-protected. The BMC is protected by limited user-access.
- Has secure boot enabled that ensures the device boots up only using the trusted software provided by Microsoft.
- Runs Windows Defender Application Control (WDAC). WDAC lets you run only trusted applications that you define in your code-integrity policies.
- Has a Trusted Platform Module (TPM) that performs hardware-based, security-related functions. Specifically, the TPM manages and protects secrets and data that needs to be persisted on the device.
- Only the required ports are opened on the device and all the other ports are blocked. For more information, see the list of [Port requirements for device](azure-stack-edge-pro-r-system-requirements.md) .
- All the access to the device hardware as well as software is logged. 
    - For the device software, default firewall logs are collected for inbound and outbound traffic from the device. These logs are bundled in the support package.
    - For the device hardware, all the device chassis events such as opening and closing of the device chassis, are logged in the device.

    For more information on the specific logs that contain the hardware and software intrusion events and how to get the logs, go to [Gather advanced security logs](azure-stack-edge-gpu-troubleshoot.md#gather-advanced-security-logs).


### Protect the device via activation key

Only an authorized Azure Stack Edge Pro R or Azure Stack Edge Mini R device is allowed to join the Azure Stack Edge service that you create in your Azure subscription. To authorize a device, you need to use an activation key to activate the device with the Azure Stack Edge service.


The activation key that you use:

- Is a Microsoft Entra ID based authentication key.
- Expires after three days.
- Isn't used after device activation.

After you activate a device, it uses tokens to communicate with Azure.


For more information, see [Get an activation key](azure-stack-edge-pro-r-deploy-prep.md#get-the-activation-key).

### Protect the device via password

Passwords ensure that only authorized users can access your data. Azure Stack Edge Pro R devices boot up in a locked state.

You can:

- Connect to the local web UI of the device via a browser and then provide a password to sign in to the device.
- Remotely connect to the device PowerShell interface over HTTP. Remote management is turned on by default. Remote management is also configured to use Just Enough Administration (JEA) to limit what the users can do. You can then provide the device password to sign in to the device. For more information, see [Connect remotely to your device](azure-stack-edge-gpu-connect-powershell-interface.md).
- The local Edge user on the device has limited access to the device for initial configuration, and troubleshooting. The compute workloads running on the device, data transfer, and the storage can all be accessed from the Azure public or government portal for the resource in the cloud.


Keep these best practices in mind:

- We recommend that you store all passwords in a secure place so you don't have to reset a password if it's forgotten. The management service can't retrieve existing passwords. It can only reset them via the Azure portal. If you reset a password, be sure to notify all users before you reset it.
- You can access the Windows PowerShell interface of your device remotely over HTTP. As a security best practice, you should use HTTP only on trusted networks.
- Ensure that device passwords are strong and well protected. Follow the [password best practices](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security/fundamentals/identity-management-best-practices.md#enable-password-management).
- Use the local web UI to [Change the password](azure-stack-edge-gpu-manage-access-power-connectivity-mode.md#change-device-password). If you change the password, be sure to notify all remote access users so they don't have problems signing in.

### Establish trust with the device via certificates

Azure Stack Edge rugged device lets you bring your own certificates and install those to be used for all public endpoints. For more information, go to [Upload your certificate](azure-stack-edge-gpu-manage-certificates.md#upload-certificates). For a list of all the certificates that can be installed on your device, go to [Manage certificates on your device](azure-stack-edge-gpu-manage-certificates.md).

- When you configure compute on your device, an IoT device and an IoT Edge device are created. These devices are automatically assigned symmetric access keys. As a security best practice, these keys are rotated regularly via the IoT Hub service.

## Protect your data

This section describes the security features that protect in-transit and stored data.

### Protect data at rest

All the data at rest on the device is double-encrypted, the access to data is controlled and once the device is deactivated, the data is securely erased off the data disks.

#### Double-encryption of data

Data on your disks is protected by two layers of encryption:

- First layer of encryption is the BitLocker XTS-AES 256-bit encryption on the data volumes.
- Second layer is the hard disks that have a built-in encryption.
- The OS volume has BitLocker as the single layer of encryption.

> **Note:**
> The OS disk has single layer BitLocker XTS-AES-256 software encryption.

Before you activate the device, you are required to configure encryption-at-rest on your device. This is a required setting and until this is successfully configured, you can't activate the device. 

At the factory, once the devices are imaged, the volume level BitLocker encryption is enabled. After you receive the device, you need to configure the encryption-at-rest. The storage pool and volumes are recreated and you can provide BitLocker keys to enable encryption-at-rest and thus create another layer of encryption for your data-at-rest. 

The encryption-at-rest key is a 32 character long Base-64 encoded key that you provide and this key is used to protect the actual encryption key. Microsoft does not have access to this encryption-at-rest key that protects your data. The key is saved in a key file on the **Cloud details** page after the device is activated.

When the device is activated, you are prompted to save the key file that contains recovery keys that help recover the data on the device if the device doesn't boot up. Certain recovery scenarios will prompt you for the key file that you have saved. The key file has the following recovery keys:

- A key that unlocks the first layer of encryption.
- A key that unlocks the hardware encryption in the data disks.
- A key that helps recover the device configuration on the OS volumes.
- A key that protects the data flowing through the Azure service.

> **Important:**
> Save the key file in a secure location outside the device itself. If the device doesn't boot up, and you don't have the key, it could potentially result in data loss.



#### Restricted access to data

Access to data stored in shares and storage accounts is restricted.

- SMB clients that access share data need user credentials associated with the share. These credentials are defined when the share is created.
- NFS clients that access a share need to have their IP address added explicitly when the share is created.
- The Edge storage accounts that are created on the device are local and are protected by the encryption on the data disks. The Azure storage accounts that these Edge storage accounts are mapped to are protected by subscription and two 512-bit storage access keys associated with the Edge storage account (these keys are different than those associated with your Azure Storage accounts). For more information, see [Protect data in storage accounts](#protect-data-in-storage-accounts).
- BitLocker XTS-AES 256-bit encryption is used to protect local data.

#### Secure data erasure

When the device undergoes a hard reset, a secure wipe is performed on the device. The secure wipe performs data erasure on the disks using the NIST SP 800-88r1 purge.

### Protect data in flight


For data in flight:

- Standard Transport Layer Security (TLS) 1.2 is used for data that travels between the device and Azure. There is no fallback to TLS 1.1 and earlier. Agent communication will be blocked if TLS 1.2 isn't supported. TLS 1.2 is also required for portal and SDK management.
- When clients access your device through the local web UI of a browser, standard TLS 1.2 is used as the default secure protocol.

  - The best practice is to configure your browser to use TLS 1.2.
  - Your device only supports TLS 1.2 and does not support older versions TLS 1.1 nor TLS 1.0.
- We recommend that you use SMB 3.0 with encryption to protect data when you copy it from your data servers.


### Protect data in storage accounts


Your device is associated with a storage account that's used as a destination for your data in Azure. Access to the storage account is controlled by the subscription and two 512-bit storage access keys associated with that storage account.

One of the keys is used for authentication when the Azure Stack Edge device accesses the storage account. The other key is held in reserve, so you can rotate the keys periodically.

For security reasons, many datacenters require key rotation. We recommend that you follow these best practices for key rotation:

- Your storage account key is similar to the root password for your storage account. Carefully protect your account key. Don't distribute the password to other users, hard code it, or save it anywhere in plain text that's accessible to others.
- [Regenerate your account key](../storage/common/storage-account-keys-manage.md#manually-rotate-access-keys) via the Azure portal if you think it could be compromised.
- Your Azure admin should periodically change or regenerate the primary or secondary key by using the Storage section of the Azure portal to access the storage account directly.
- You can also use your own encryption key to protect the data in your Azure storage account. When you specify a customer-managed key, that key is used to protect and control access to the key that encrypts your data. For more information on how to secure your data, see [Enable customer-managed keys for your Azure Storage account](../storage/common/customer-managed-keys-overview.md#enable-customer-managed-keys-for-a-storage-account).

- Rotate and then [sync your storage account keys](azure-stack-edge-gpu-manage-storage-accounts.md) regularly to help protect your storage account from unauthorized users.

## Manage personal information

The Azure Stack Edge service collects personal information in the following scenarios:


- **Order details**. When an order is created, the shipping address, email address, and contact information of the user is stored in the Azure portal. The information saved includes:
  - Contact name
  - Phone number
  - Email address
  - Street address
  - City
  - ZIP Code/postal code
  - State
  - Country/region/province
  - Shipping tracking number

    Order details are encrypted and stored in the service. The service retains the information until you explicitly delete the resource or order. The deletion of the resource and the corresponding order is blocked from the time the device is shipped until the device returns to Microsoft.

- **Shipping address**. After an order is placed, Data Box service provides the shipping address to third-party carriers like UPS.

- **Share users**. Users on your device can also access the data located on the shares. A list of users who can access the share data can be viewed. When the shares are deleted, this list is also deleted.

To view the list of users who can access or delete a share, follow the steps in [Manage shares on the Azure Stack Edge](azure-stack-edge-gpu-manage-shares.md).

For more information, review the Microsoft privacy policy on the [Trust Center](https://www.microsoft.com/trust-center).

## Next steps

[Deploy your Azure Stack Edge Pro R device](azure-stack-edge-gpu-deploy-prep.md)
