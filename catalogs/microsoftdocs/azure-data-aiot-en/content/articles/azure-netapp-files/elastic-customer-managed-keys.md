---
title: Configure customer-managed keys for Elastic zone-redundant volume encryption in Azure NetApp Files
description: Learn how to configure customer-managed keys for volume encryption with Azure NetApp Files' Elastic zone-redundant service level. 
services: azure-netapp-files
author: b-ahibbard
ms.service: azure-netapp-files
ms.topic: how-to
ms.date: 01/26/2026
ms.author: anfdocs
---
# Configure customer-managed keys for Elastic zone-redundant volume encryption in Azure NetApp Files

Customer-managed keys for Azure NetApp Files volume encryption enable you to use your own keys rather than the platform-managed (Microsoft-managed) key when creating a new volume. With customer-managed keys, you can fully manage the relationship between a key's life cycle, key usage permissions, and auditing operations on keys.

>**Important:**  
> To configure customer-managed keys for the Flexible, Standard, Premium, or Ultra service level, see [Configure customer-managed keys](configure-customer-managed-keys.md).

## Considerations



* For increased security, select the **Disable public access** option within the network settings of your key vault. When selecting this option, you must also select **Allow trusted Microsoft services to bypass this firewall** to permit the Azure NetApp Files service to access your encryption key.
* Customer-managed keys support automatic Managed System Identity (MSI) certificate renewal. If your certificate is valid, you don't need to manually update it. 
* Do not make any changes to the underlying Azure Key Vault or Azure Private Endpoint after creating a customer-managed keys volume. Making changes can make the volumes inaccessible. If you must make changes, see [Update the private endpoint IP for customer-managed keys](configure-customer-managed-keys.md#update-the-private-endpoint).
* If Azure Key Vault becomes inaccessible, Azure NetApp Files loses its access to the encryption keys and the ability to read or write data to volumes enabled with customer-managed keys. In this situation, create a support ticket to have access manually restored for the affected volumes.
* Azure NetApp Files supports customer-managed keys on source and data replication volumes with cross-region replication or cross-zone replication relationships. You configure keys per region, so the source and destination volumes can each use their own customer-managed key. Using the same key on both volumes isn't required.
* Applying Azure network security groups (NSG) on the private link subnet to Azure Key Vault is supported for Azure NetApp Files customer-managed keys. NSGs don’t affect connectivity to private links unless a private endpoint network policy is enabled on the subnet.
* Wrap/unwrap isn't supported. Customer-managed keys use encrypt/decrypt. For more information, see [RSA algorithms](https://learn.microsoft.com/azure/key-vault/keys/about-keys-details#rsa-algorithms).


## Requirements

Before creating your first customer-managed key volume, you must set up:

* A virtual network:
    The virtual network subnet need to be delegated to `Microsoft.Netapp/elasticVolumes`
* An [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview), containing at least one key.
    * The key vault must have soft delete and purge protection enabled.
    * The key must be of type RSA.
* The key vault must have an [Azure Private Endpoint](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/private-endpoint-overview.md).
    * The private endpoint must reside in a different subnet than the one delegated to Azure NetApp Files. The subnet must be in the same virtual network as the one delegated to Azure NetApp.

* If you've configured your Azure Key Vault to use Azure role-based access control (RBAC), ensure the user-assigned identity you intend to use for encypriont has a role assignment on the key vault with permissions for actions: 

    `Microsoft.KeyVault/vaults/keys/read`
    `Microsoft.KeyVault/vaults/keys/encrypt/action`
    `Microsoft.KeyVault/vaults/keys/decrypt/action`

    To learn about configuring an Azure Key Vault with RBAC, see [Provide access to Key Vault keys, certificates, and secrets with an Azure role-based access control](https://learn.microsoft.com/azure/key-vault/general/rbac-guide). 

    * If you've configured your Azure Key Vault to use a Vault access policy, the Azure portal configures the Elastic account automatically when you configure the customer-managed key.

For more information about Azure Key Vault and Azure Private Endpoint, see:
* [Quickstart: Create a key vault ](https://learn.microsoft.com/azure/key-vault/general/quick-create-portal)
* [Create or import a key into the vault](https://learn.microsoft.com/azure/key-vault/keys/quick-create-portal)
* [Create a private endpoint](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/create-private-endpoint-portal.md)
* [More about keys and supported key types](https://learn.microsoft.com/azure/key-vault/keys/about-keys)
* [Manage network policies for private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/disable-private-endpoint-network-policy.md)

## Configure an Elastic NetApp account to use customer-managed keys

1. In your Elastic storage account, select **Encryption**. 
1. For Encryption key source, select **Customer Managed Key**. 
1. Provide the Encryption Key. 
    * If you have the URI, select **Enter key URI** then enter manually the **Key URI** and **Subscription**. 

    Screenshot of manually entering key URI and subscription.

    * To select the key from a list, choose **Select key vault** then **Select a key vault and key**. 
    In the dropdown menus, select the **Subscription**, **Key vault**, and **Key** then **Select** to confirm your choices. 

    Screenshot of select a key menu.

1. Choose the identity type for authentication with the Azure Key Vault. 
    
    If your Azure Key Vault is configured to use Vault access policy as its permission model, both options are available. Otherwise, only the user-assigned option is available. 

    * If you choose **User-assigned**, select an identity. Choose **Select an identity** to open a context pane. Select the appropriate user-assigned managed identity. 

    Screenshot of selecting user assigned managed identity.

    * If you choose **System-assigned**, skip to the next step. When you save your encryption settings, Azure configures the NetApp account automatically by adding a system-assigned identity to your NetApp account and creates an access policy on your Azure Key Vault with key permissions Get, Encrypt, Decrypt. 

1. Select **Save**. 

## Next steps

After you configure encryption settings for your Elastic NetApp account, [Create an Elastic zone-redundant capacity pool](elastic-capacity-pool-task.md). Ensure you select **Customer Managed** for the encryption key source, then provide the configured Azure key vault in the key vault private endpoint. 

After the capacity pool is created with customer-managed keys, volumes created in the capacity pool automatically inherit customer-managed key encryption settings. 

## More information 

* [Create an Elastic zone-redundant capacity pool](elastic-capacity-pool-task.md)
* [Troubleshoot customer-managed keys](troubleshoot-customer-managed-keys.md)
