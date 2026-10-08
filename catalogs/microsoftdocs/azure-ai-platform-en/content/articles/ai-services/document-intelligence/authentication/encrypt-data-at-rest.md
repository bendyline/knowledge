---
title: Service encryption of data at rest - Document Intelligence 
titleSuffix: Foundry Tools
description: Microsoft offers Microsoft-managed encryption keys, and also lets you manage your Foundry Tools subscriptions with your own keys, called customer-managed keys (CMK). This article covers data encryption at rest for Document Intelligence, and how to enable and manage CMK.
author: erindormier
manager: venkyv
ms.service: azure-document-intelligence-foundry-tools
ms.topic: how-to
ms.date: 04/23/2026
monikerRange: '<=doc-intel-4.0.0'
---


# Encrypt data at rest


**This content applies to:** 🟩 **v4.0 (GA)** 🟩  **v3.1 (GA)** 🟥 **v3.0 (retiring)** 🟥 **v2.1 (retiring)**


> **Important:**
>
> * Earlier versions of customer managed keys (`CMK`) only encrypted your models.
> * Beginning with the  ```07/31/2023``` release, all new resources utilize customer-managed keys to encrypt both models and document results.
> * [Delete analyze response](https://learn.microsoft.com/rest/api/aiservices/document-models/delete-analyze-result?view=rest-aiservices-v4.0%20\(2024-11-30\)\&preserve-view=true\&tabs=HTTP). the `analyze response` is stored for 24 hours from when the operation completes for retrieval. For scenarios where you want to delete the response sooner, use the delete analyze response API to delete the response.  
> * To upgrade an existing service to encrypt both the models and the data, disable and reenable the customer managed key.

Azure Document Intelligence in Foundry Tools automatically encrypts your data when persisting it to the cloud. Document Intelligence encryption protects your data to help you to meet your organizational security and compliance commitments.  


## About Foundry Tools encryption

Data is encrypted and decrypted using [FIPS 140-2](https://en.wikipedia.org/wiki/FIPS_140-2)-compliant [256-bit AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) encryption. Encryption and decryption are transparent, meaning encryption and access are managed for you. Your data is secure by default. You don't need to modify your code or applications to take advantage of encryption.

## About encryption key management

By default, your subscription uses Microsoft-managed encryption keys. You can also manage your subscription with your own keys, which are called customer-managed keys. When you use customer-managed keys, you have greater flexibility in the way you create, rotate, disable, and revoke access controls. You can also audit the encryption keys that you use to protect your data. If customer-managed keys are configured for your subscription, double encryption is provided. With this second layer of protection, you can control the encryption key through your Azure Key Vault.


> **Important:**
> * Customer-managed keys are only available resources created after May 11, 2020. To use customer-managed keys with Document Intelligence, you need to create a new Document Intelligence resource. Once the resource is created, you can use Azure Key Vault to set up your managed identity.
> * The scope for data encrypted with customer-managed keys includes the `analysis response` stored for 24 hours, allowing the operation results to be retrieved during that 24-hour time period.



## Customer-managed keys with Azure Key Vault

When you use customer-managed keys, you must use Azure Key Vault to store them. You can either create your own keys and store them in a key vault, or you can use the Key Vault APIs to generate keys. The Foundry Tools resource and the key vault must be in the same region and in the same Microsoft Entra tenant, but they can be in different subscriptions. For more information about Key Vault, see [What is Azure Key Vault?](https://learn.microsoft.com/azure/key-vault/general/overview).

When you create a new Foundry Tools resource, it's always encrypted by using Microsoft-managed keys. It's not possible to enable customer-managed keys when you create the resource. Customer-managed keys are stored in Key Vault. The key vault needs to be provisioned with access policies that grant key permissions to the managed identity that's associated with the Foundry Tools resource. The managed identity is available only after the resource is created by using the pricing tier that's required for customer-managed keys.

Enabling customer-managed keys also enables a system-assigned [managed identity](https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/overview), a feature of Microsoft Entra ID. After the system-assigned managed identity is enabled, this resource is registered with Microsoft Entra ID. After being registered, the managed identity is given access to the key vault that's selected during customer-managed key setup. 

> **Important:**
> If you disable system-assigned managed identities, access to the key vault is removed and any data that's encrypted with the customer keys is no longer accessible. Any features that depend on this data stop working.

> **Important:**
> Managed identities don't currently support cross-directory scenarios. When you configure customer-managed keys in the Azure portal, a managed identity is automatically assigned behind the scenes. If you subsequently move the subscription, resource group, or resource from one Microsoft Entra directory to another, the managed identity that's associated with the resource isn't transferred to the new tenant, so customer-managed keys might no longer work. For more information, see **Transferring a subscription between Microsoft Entra directories** in [FAQs and known issues with managed identities for Azure resources](https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/known-issues#transferring-a-subscription-between-azure-ad-directories).  

## Configure Key Vault

When you use customer-managed keys, you need to set two properties in the key vault, **Soft Delete** and **Do Not Purge**. These properties aren't enabled by default, but you can enable them on a new or existing key vault by using the Azure portal, PowerShell, or Azure CLI.

> **Important:**
> If the **Soft Delete** and **Do Not Purge** properties aren't enabled and you delete your key, you can't recover the data in your Foundry Tools resource.

To learn how to enable these properties on an existing key vault, see [Azure Key Vault recovery management with soft delete and purge protection](https://learn.microsoft.com/azure/key-vault/general/key-vault-recovery).

## Enable customer-managed keys for your resource

To enable customer-managed keys in the Azure portal, follow these steps:

1. Go to your Foundry Tools resource.
1. On the left, select **Encryption**.
1. Under **Encryption type**, select **Customer Managed Keys**, as shown in the following screenshot.

   Screenshot of the Encryption settings page for a Foundry resource. Under Encryption type, the Customer Managed Keys option is selected.

## Specify a key

After you enable customer-managed keys, you can specify a key to associate with the Foundry Tools resource.

### Specify a key as a URI

To specify a key as a URI, follow these steps:

1. In the Azure portal, go to your key vault.
1. Under **Settings**, select **Keys**.
1. Select the desired key, and then select the key to view its versions. Select a key version to view the settings for that version.
1. Copy the **Key Identifier** value, which provides the URI.

   Screenshot of the Azure portal page for a key version. The Key Identifier box contains a placeholder for a key URI.

1. Go back to your Foundry Tools resource, and then select **Encryption**.
1. Under **Encryption key**, select **Enter key URI**.
1. Paste the URI that you copied into the **Key URI** box.

   Screenshot of the Encryption page for a Foundry resource. The Enter key URI option is selected, and the Key URI box contains a value.

1. Under **Subscription**, select the subscription that contains the key vault.
1. Save your changes.

### Specify a key from a key vault

To specify a key from a key vault, first make sure that you have a key vault that contains a key. Then follow these steps:

1. Go to your Foundry Tools resource, and then select **Encryption**.
1. Under **Encryption key**, select **Select from Key Vault**.
1. Select the key vault that contains the key that you want to use.
1. Select the key that you want to use.

   Screenshot of the Select key from Azure Key Vault page in the Azure portal. The Subscription, Key vault, Key, and Version boxes contain values.

1. Save your changes.

## Update the key version

When you create a new version of a key, update the Foundry Tools resource to use the new version. Follow these steps:

1. Go to your Foundry Tools resource, and then select **Encryption**.
1. Enter the URI for the new key version. Alternately, you can select the key vault and then select the key again to update the version.
1. Save your changes.

## Use a different key

To change the key that you use for encryption, follow these steps:

1. Go to your Foundry Tools resource, and then select **Encryption**.
1. Enter the URI for the new key. Alternately, you can select the key vault and then select a new key.
1. Save your changes.

## Rotate customer-managed keys

You can rotate a customer-managed key in Key Vault according to your compliance policies. When the key is rotated, you must update the Foundry Tools resource to use the new key URI. To learn how to update the resource to use a new version of the key in the Azure portal, see [Update the key version](#update-the-key-version).

Rotating the key doesn't trigger re-encryption of data in the resource. No further action is required from the user.

## Revoke access to customer-managed keys

To revoke access to customer-managed keys, use PowerShell or Azure CLI. For more information, see [Azure Key Vault PowerShell](https://learn.microsoft.com/powershell/module/az.keyvault//) or [Azure Key Vault CLI](https://learn.microsoft.com/cli/azure/keyvault). Revoking access effectively blocks access to all data in the Foundry Tools resource, because the encryption key is inaccessible by Foundry Tools.

## Disable customer-managed keys

When you disable customer-managed keys, your Foundry Tools resource is then encrypted with Microsoft-managed keys. To disable customer-managed keys, follow these steps:

1. Go to your Foundry Tools resource, and then select **Encryption**.
1. Clear the checkbox that's next to **Use your own key**.


## Next steps

* [Learn more about Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview)
