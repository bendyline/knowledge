---
title: Azure Stack Edge Pro FPGA security
description: Describes the security and privacy features that protect your Azure Stack Edge Pro FPGA device, service, and data on-premises and in the cloud.
services: Data Box Edge
author: sipastak

ms.service: azure-stack-edge
ms.topic: article
ms.date: 03/20/2025
ms.author: sipastak
---
# Azure Stack Edge security and data protection

Security is a major concern when you're adopting a new technology, especially if the technology is used with confidential or proprietary data. Azure Stack Edge helps you ensure that only authorized entities can view, modify, or delete your data.

This article describes the Azure Stack Edge security features that help protect each of the solution components and the data stored in them.

Azure Stack Edge consists of three main components that interact with each other:

- **Azure Stack Edge service, hosted in Azure**. The management resource that you use to create the device order, configure the device, and then track the order to completion.
- **Clients/hosts connected to the device**. The clients in your infrastructure that connect to the Azure Stack Edge Pro device and contain data that needs to be protected.
- **Cloud storage**. The location in the Azure cloud platform where data is stored. This location is typically the storage account linked to the Azure Stack Edge resource that you create.

## Azure Stack Edge service protection

The Azure Stack Edge service is a management service that's hosted in Azure. The service is used to configure and manage the device.


- To access the Azure Stack Edge service, your organization needs to have an Enterprise Agreement (EA) or Cloud Solution Provider (CSP) subscription. For more information, see [Azure Stack Edge](https://azure.microsoft.com/products/azure-stack/edge/).
- Because this management service is hosted in Azure, it's protected by the Azure security features. For more information about the security features provided by Azure, go to the [Microsoft Azure Trust Center](https://azure.microsoft.com/support/trust-center/security/).
- For SDK management operations, you can get the encryption key for your resource in **Device properties**. You can view the encryption key only if you have permissions for the Resource Graph API.


## Azure Stack Edge device protection

The Azure Stack Edge device is an on-premises device that helps transform your data by processing it locally and then sending it to Azure. Your device:

- Needs an activation key to access the Azure Stack Edge service.
- Is protected at all times by a device password.
- Is a locked-down device. The device BMC and BIOS are password-protected. The BIOS is protected by limited user-access.
- Has secure boot enabled.
- Runs Windows Defender Device Guard. Device Guard lets you run only trusted applications that you define in your code-integrity policies.

### Protect the device via activation key

Only an authorized Azure Stack Edge device is allowed to join the Azure Stack Edge service that you create in your Azure subscription. To authorize a device, you need to use an activation key to activate the device with the Azure Stack Edge service.


The activation key that you use:

- Is a Microsoft Entra ID based authentication key.
- Expires after three days.
- Isn't used after device activation.

After you activate a device, it uses tokens to communicate with Azure.



For more information, see [Get an activation key](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/azure-stack-edge-deploy-prep.md#get-the-activation-key).

### Protect the device via password

Passwords ensure that only authorized users can access your data. Azure Stack Edge devices boot up in a locked state.

You can:

- Connect to the local web UI of the device via a browser and then provide a password to sign in to the device.
- Remotely connect to the device PowerShell interface over HTTP. Remote management is turned on by default. You can then provide the device password to sign in to the device. For more information, see [Connect remotely to your Azure Stack Edge Pro device](azure-stack-edge-connect-powershell-interface.md#connect-to-the-powershell-interface).


Keep these best practices in mind:

- We recommend that you store all passwords in a secure place so you don't have to reset a password if it's forgotten. The management service can't retrieve existing passwords. It can only reset them via the Azure portal. If you reset a password, be sure to notify all users before you reset it.
- You can access the Windows PowerShell interface of your device remotely over HTTP. As a security best practice, you should use HTTP only on trusted networks.
- Ensure that device passwords are strong and well protected. Follow the [password best practices](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security/fundamentals/identity-management-best-practices.md#enable-password-management).

- Use the local web UI to [change the password](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/azure-stack-edge-manage-access-power-connectivity-mode.md#manage-device-access). If you change the password, be sure to notify all remote access users so they don't have problems signing in.

## Protect your data

This section describes the Azure Stack Edge Pro security features that protect in-transit and stored data.

### Protect data at rest


For data at rest:

- Access to data stored in shares is restricted.

    - SMB clients that access share data need user credentials associated with the share. These credentials are defined when the share is created.
    - The IP addresses of NFS clients that access a share need to be added when the share is created.


- BitLocker XTS-AES 256-bit encryption is used to protect local data.


### Protect data in flight


For data in flight:

- Standard TLS 1.2 is used for data that travels between the device and Azure. There is no fallback to TLS 1.1 and earlier. Agent communication will be blocked if TLS 1.2 isn't supported. TLS 1.2 is also required for portal and SDK management.
- When clients access your device through the local web UI of a browser, standard TLS 1.2 is used as the default secure protocol.

    - The best practice is to configure your browser to use TLS 1.2.
    - If the browser doesn't support TLS 1.2, you can use TLS 1.1 or TLS 1.0.
- We recommend that you use SMB 3.0 with encryption to protect data when you copy it from your data servers.



### Protect data via storage accounts


Your device is associated with a storage account that's used as a destination for your data in Azure. Access to the storage account is controlled by the subscription and two 512-bit storage access keys associated with that storage account.

One of the keys is used for authentication when the Azure Stack Edge device accesses the storage account. The other key is held in reserve, so you can rotate the keys periodically.

For security reasons, many datacenters require key rotation. We recommend that you follow these best practices for key rotation:

- Your storage account key is similar to the root password for your storage account. Carefully protect your account key. Don't distribute the password to other users, hard code it, or save it anywhere in plain text that's accessible to others.
- Regenerate your account key via the Azure portal if you think it could be compromised. For more information, see [Manage storage account access keys](../storage/common/storage-account-keys-manage.md).
- Your Azure admin should periodically change or regenerate the primary or secondary key by using the Storage section of the Azure portal to access the storage account directly.

- Rotate and then [sync your storage account keys](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/azure-stack-edge-manage-shares.md#sync-storage-keys) regularly to help protect your storage account from unauthorized users.

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


For more information, review the Microsoft privacy policy on the [Trust Center](https://www.microsoft.com/trust-center).

## Next steps

[Deploy your Azure Stack Edge Pro FPGA device](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/azure-stack-edge-deploy-prep.md)
