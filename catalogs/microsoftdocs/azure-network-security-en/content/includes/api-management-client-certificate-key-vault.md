---
author: PatAltimore
ms.service: azure-api-management
ms.topic: include
ms.date: 01/29/2026
ms.author: patricka
ms.custom: sfi-image-nochange
---

### Prerequisites for key vault integration

- If you don't already have a key vault, create one. For information about creating a key vault, see [Quickstart: Create a key vault using the Azure portal](https://learn.microsoft.com/azure/key-vault/general/quick-create-portal).
    
- Enable a system-assigned or user-assigned [managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/api-management-howto-use-managed-service-identity.md) in API Management.


### Configure access to key vault

1. In the Azure portal, go to your key vault.
1. In the left menu, select **Settings** > **Access configuration**. Make a note of the configured **Permission model**.
1. Depending on the permission model, configure either a [key vault access policy](https://learn.microsoft.com/azure/key-vault/general/assign-access-policy) or [Azure RBAC access](https://learn.microsoft.com/azure/key-vault/general/rbac-guide) for an API Management managed identity.
    
**To add a key vault access policy:**

1. In the left menu, select **Access policies**.
1. On the **Access policies** page, select **+ Create**.
1. On the **Permissions** tab, under **Secret permissions**, select **Get** and **List**, and then select **Next**.
1. On the **Principal** tab, search for  the resource name of your managed identity, then select **Next**.
     If you're using a system-assigned identity, the principal is the name of your API Management instance.
1. Select **Next** again. On the **Review + create** tab, select **Create**.


To create a certificate in the key vault or import a certificate to the key vault, see [Quickstart: Set and retrieve a certificate from Azure Key Vault using the Azure portal](https://learn.microsoft.com/azure/key-vault/certificates/quick-create-portal).



#### Requirements for Key Vault firewall

If [Key Vault firewall](https://learn.microsoft.com/azure/key-vault/general/network-security) is enabled on your key vault, you must meet these requirements:

- You **must** use the API Management instance's system-assigned managed identity to access the key vault. You can't use a user-assigned identity for access from API Management. 

- In Key Vault firewall, enable the **Allow Trusted Microsoft Services to bypass this firewall** option: 

  1. In your key vault, select **Settings** > **Networking**.
  1. Under **Firewalls and virtual networks**, select **Allow public access from specific virtual networks and IP addresses**.
  1. Under **Exception**, select **Allow trusted Microsoft services to bypass this firewall**.

  API Management supports trusted service connectivity to access the key vault for control-plane options.

- Ensure that your local client IP address is allowed to access the key vault temporarily. You must select a certificate or secret to add to Azure API Management. For more information, see [Configure Azure Key Vault networking settings](https://learn.microsoft.com/azure/key-vault/general/how-to-azure-key-vault-network-security).

  After you complete the configuration, you can block your client address in the key vault firewall.

#### Virtual network requirements

If the API Management instance is deployed in a virtual network, also configure the following network settings:

- Enable a [service endpoint](https://learn.microsoft.com/azure/key-vault/general/overview-vnet-service-endpoints) to Key Vault on the API Management subnet.
- Configure a network security group (NSG) rule to allow outbound traffic to the `AzureKeyVault` and `AzureActiveDirectory` [service tags](../articles/virtual-network/service-tags-overview.md).

For more information, see [Network configuration when setting up API Management in a virtual network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/virtual-network-reference.md).


## Add a key vault certificate

See [Prerequisites for key vault integration](#prerequisites-for-key-vault-integration).

> **Important:**
> To add a key vault certificate to your API Management instance, you must have permissions to list secrets from the key vault.

> **Caution:**
> When using a key vault certificate in API Management, be careful not to delete the certificate, key vault, or managed identity that's used to access the key vault.

To add a key vault certificate to API Management:

1. In the [Azure portal](https://portal.azure.com), go to your API Management instance.
1. Under **Security**, select **Certificates**.
1. Select **Certificates**, then **+ Add**.
1. In **Id**, enter a name.
1. In **Certificate**, select **Key vault**.
1. Enter the identifier of a key vault certificate, or choose **Select** to select a certificate from a key vault.

   > **Important:**
   >
   > If you enter a key vault certificate identifier yourself, be sure that it doesn't have version information. Otherwise, the certificate won't rotate automatically in API Management after an update in the key vault.

1. In **Client identity**, select a system-assigned identity or an existing user-assigned managed identity. For more information, see [Use managed identities in Azure API Management](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/api-management-howto-use-managed-service-identity.md).

   > **Note:**
   >
   > The identity needs to have permissions to get and list certificates from the key vault. If you haven't already configured access to the key vault, API Management prompts you so that it can automatically configure the identity with the necessary permissions.

1. Select **Add**.

   Screenshot that shows how to add a key vault certificate to API Management in the portal.
    
1. Select **Save**.

## Upload a certificate

To upload a client certificate to API Management: 

1. In the [Azure portal](https://portal.azure.com), go to your API Management instance.
1. Under **Security**, select **Certificates**.
1. Select **Certificates**, then **+ Add**.
1. In **Id**, enter a name.
1. In **Certificate**, select **Custom**.
1. Browse to select the certificate .pfx file, and enter its password.
1. Select **Add**.

   Screenshot of uploading a client certificate to API Management in the portal.

1. Select **Save**.
