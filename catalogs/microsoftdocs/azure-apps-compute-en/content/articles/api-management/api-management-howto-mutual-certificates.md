---
title: Secure API Management Backend Using Client Certificate Authentication
titleSuffix: Azure API Management
description: Learn how to manage client certificates and secure backend services by using client certificate authentication in Azure API Management.
services: api-management

ms.service: azure-api-management
ms.topic: how-to
ms.date: 03/31/2026
ms.custom:
  - devx-track-azurepowershell
  - engagement-fy23
  - sfi-image-nochange

#customer intent: As an API developer, I want to secure backend services by using client certificate authentication. 
---

# Secure backend services by using client certificate authentication in Azure API Management

**APPLIES TO: All API Management tiers**




API Management allows you to secure access to the backend service of an API by using client certificates and mutual TLS authentication. This article shows how to manage certificates in API Management by using the Azure portal. It also explains how to configure an API to use a certificate to access a backend service.

You can also manage API Management certificates by using the [API Management REST API](https://learn.microsoft.com/rest/api/apimanagement/current-ga/certificate).

## Certificate options

API Management provides two options for managing certificates that are used to secure access to backend services:

* Reference a certificate that's managed in [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). 
* Add a certificate file directly in API Management.

> **Note:**
> Currently, integration with key vault for this scenario isn't available in [workspaces](workspaces-overview.md).

We recommend that you use key vault certificates because doing so improves API Management security:

* Certificates stored in key vaults can be reused across services.
* Granular [access policies](https://learn.microsoft.com/azure/key-vault/general/security-features#privileged-access) can be applied to certificates stored in key vaults.
* Certificates updated in the key vault are automatically rotated in API Management. After an update in the key vault, a certificate in API Management is updated within four hours. You can also manually refresh the certificate by using the Azure portal or via the management REST API.

## Prerequisites

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/updated-for-az.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/api-management-howto-mutual-certificates.md)

* If you haven't created an API Management instance yet, see [Create an API Management service instance](get-started-create-service-instance.md).
* Configure your backend service client certificate authentication. For information about configuring certificate authentication in Azure App Service, see [Configure TLS mutual authentication in App Service][to configure certificate authentication in Azure WebSites refer to this article]. 
* Ensure that you have access to the certificate and the password for management in an Azure key vault, or a certificate to upload to the API Management service. The certificate must be in PFX format. Self-signed certificates are allowed. 
* If you use a self-signed certificate and your API Management instance is in one of the classic tiers, disable certificate chain validation. See [Disable certificate chain validation for self-signed certificates](#disable-certificate-chain-validation-for-self-signed-certificates) later in this article.

    > **Note:**
    > When a client certificate is used by API Management for **outbound authentication** (for example, when API Management presents the certificate to a backend service), you don't need to upload the root or intermediate CA certificates to the API Management CA store. In this scenario, API Management *presents* the client certificate and doesn't perform certificate chain validation.<br/><br/>
    > Uploading trusted root or intermediate CA certificates is only required when API Management must *validate* a certificate chain, such as during inbound client certificate authentication.


### Prerequisites for key vault integration

- If you don't already have a key vault, create one. For information about creating a key vault, see [Quickstart: Create a key vault using the Azure portal](https://learn.microsoft.com/azure/key-vault/general/quick-create-portal).
    
- Enable a system-assigned or user-assigned [managed identity](api-management-howto-use-managed-service-identity.md) in API Management.


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
- Configure a network security group (NSG) rule to allow outbound traffic to the `AzureKeyVault` and `AzureActiveDirectory` [service tags](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/service-tags-overview.md).

For more information, see [Network configuration when setting up API Management in a virtual network](virtual-network-reference.md).


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

1. In **Client identity**, select a system-assigned identity or an existing user-assigned managed identity. For more information, see [Use managed identities in Azure API Management](api-management-howto-use-managed-service-identity.md).

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

After the certificate is uploaded, it shows in the **Certificates** window. If you have many certificates, note the thumbprint of the certificate that you just uploaded. You'll need it to configure an API to use the client certificate for [gateway authentication](#configure-an-api-to-use-client-certificate-for-gateway-authentication).


## Configure an API to use client certificate for gateway authentication

1. In the [Azure portal](https://portal.azure.com), go to your API Management instance.
1. Under **APIs**, select **APIs**.
1. Select an API from the list. 
1. On the **Design** tab, select the pencil icon in the **Backend** section.
1. In **Gateway credentials**, select **Client cert** and then select your certificate in the **Client certificate** list.
1. Select **Save**.

    Use client certificate for gateway authentication

> **Caution:**
> This change is effective immediately. Calls to operations of the API will use the certificate to authenticate on the backend server.

> **Tip:**
> When a certificate is specified for gateway authentication for the backend service of an API, it becomes part of the policy for that API and can be viewed in the policy editor.

## Disable certificate chain validation for self-signed certificates

If you're using self-signed certificates and your API Management instance is in one of the classic tiers, you need to disable certificate chain validation to enable API Management to communicate with the backend system. Otherwise you'll get a 500 error code. To disable this validation, you can use the [`New-AzApiManagementBackend`](https://learn.microsoft.com/powershell/module/az.apimanagement/new-azapimanagementbackend) (for a new backend) or [`Set-AzApiManagementBackend`](https://learn.microsoft.com/powershell/module/az.apimanagement/set-azapimanagementbackend) (for an existing backend) PowerShell cmdlets and set the `-SkipCertificateChainValidation` parameter to `True`:

```powershell
$context = New-AzApiManagementContext -ResourceGroupName 'ContosoResourceGroup' -ServiceName 'ContosoAPIMService'
New-AzApiManagementBackend -Context  $context -Url 'https://contoso.com/myapi' -Protocol http -SkipCertificateChainValidation $true
```

You can also disable certificate chain validation by using the [Backend](https://learn.microsoft.com/rest/api/apimanagement/current-ga/backend) REST API.

## Delete a client certificate

To delete a certificate, select **Delete** on the ellipsis (**...**) menu:

Delete a certificate

> **Important:**
> If the certificate is referenced by any policies, a warning screen appears. To delete the certificate, you must first remove it from any policies that are configured to use it.

## Related content

* [How to secure APIs using client certificate authentication in API Management](api-management-howto-mutual-certificates-for-clients.md)
* [How to add a custom CA certificate in Azure API Management](api-management-howto-ca-certificates.md)
* [Policies in API Management](api-management-howto-policies.md)


[How to add operations to an API]: mock-api-responses.md
[How to add and publish a product]: api-management-howto-add-products.md
[Monitoring and analytics]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management-monitoring.md
[Add APIs to a product]: api-management-howto-add-products.md#add-apis
[Publish a product]: api-management-howto-add-products.md#publish-product
[Get started with Azure API Management]: get-started-create-service-instance.md
[API Management policy reference]: api-management-policies.md
[Caching policies]: api-management-policies.md#caching
[Create an API Management service instance]: get-started-create-service-instance.md

[WebApp-GraphAPI-DotNet]: https://github.com/AzureADSamples/WebApp-GraphAPI-DotNet
[to configure certificate authentication in Azure WebSites refer to this article]: ../app-service/app-service-web-configure-tls-mutual-auth.md
