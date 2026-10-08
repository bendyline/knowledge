---
title: Configure custom domain name for Azure API Management instance
titleSuffix: Azure API Management
description: How to configure a custom domain name and choose certificates for the endpoints of your Azure API Management instance.
services: api-management

ms.service: azure-api-management
ms.topic: how-to
ms.date: 06/03/2026
ms.custom:
  - engagement-fy23
  - build-2025
  - sfi-image-nochange
---

# Configure a custom domain name for your Azure API Management instance

**APPLIES TO: All API Management tiers**



When you create an Azure API Management service instance in the Azure cloud, Azure assigns it a `azure-api.net` subdomain (for example, `apim-service-name.azure-api.net`). You can also expose your API Management endpoints using your own custom domain name, such as **`contoso.com`**. This article shows you how to map an existing custom DNS name to endpoints exposed by an API Management instance.

> **Important:**
> API Management only accepts requests with [host header](https://tools.ietf.org/html/rfc2616#section-14.23) values matching:
>
>* The Gateway's default domain name
>* Any of the Gateway's configured custom domain names

> **Note:**
> Currently, custom domain names aren't supported in a [workspace gateway](workspaces-overview.md#workspace-gateway).

> **Important:**
> Changes to your API Management service's infrastructure (such as configuring custom domains, adding CA certificates, scaling, virtual network configuration, availability zone changes, and region additions) can take 15 minutes or longer to complete, depending on the service tier and the size of the deployment. Expect longer times for an instance with a greater number of scale units or multi-region configuration (gateways in multiple locations). Rolling changes to API Management are executed carefully to preserve capacity and availability.
>
> While the service is updating, other service infrastructure changes can't be made. However, you can configure APIs, products, policies, and user settings. The service will **not** experience gateway downtime, and API Management **will continue** to service API requests without interruption (except in the Developer tier).


## Prerequisites
-   An API Management instance. For more information, see [Create an Azure API Management instance](get-started-create-service-instance.md).
-   A custom domain name that is owned by you or your organization. This article does not provide instructions on how to procure a custom domain name.
-   Optionally, a valid certificate with a public and private key (.PFX). The subject or subject alternative name (SAN) has to match the domain name (this enables API Management instance to securely expose URLs over TLS). 

    See [Domain certificate options](#domain-certificate-options).

- DNS records hosted on a DNS server to map the custom domain name to the default domain name of your API Management instance. This topic does not provide instructions on how to host the DNS records. 

    For more information about required records, see [DNS configuration](#dns-configuration), later in this article. 
 
## Endpoints for custom domains

There are several API Management endpoints to which you can assign a custom domain name. Currently, the following endpoints are available:

| Endpoint | Default |
| --- | --- |
| **Gateway** | Default is: `<apim-service-name>.azure-api.net`. Gateway is the only endpoint available for configuration in the Consumption tier.<br/><br/>The default Gateway endpoint configuration remains available after a custom Gateway domain is added. |
| **Developer portal** (all tiers except Consumption) | Default is: `<apim-service-name>.developer.azure-api.net` |
| **Management** (classic tiers only) | Default is: `<apim-service-name>.management.azure-api.net` |
| **Self-hosted gateway configuration API (v2)** | Default is: `<apim-service-name>.configuration.azure-api.net` |
| **SCM** (classic tiers only) | Default is: `<apim-service-name>.scm.azure-api.net` |

### Considerations

* You can update any of the endpoints supported in your service tier. Typically, customers update **Gateway** (this URL is used to call the APIs exposed through API Management) and **Developer portal** (the developer portal URL).
* The default **Gateway** endpoint remains available after you configure a custom Gateway domain name and cannot be deleted. For other API Management endpoints (such as **Developer portal**) that you configure with a custom domain name, the default endpoint is no longer available.
* Only owners of API Management instances in the classic tiers can use **Management** and **SCM** endpoints internally. These endpoints are less frequently assigned a custom domain name.
* The **Developer**, **Premium**, and **Premium v2** tiers support setting multiple custom hostnames for the **Gateway** endpoint.
* Wildcard domain names, like `*.contoso.com`, are supported in the following tiers: **Developer, Basic, Standard, Standard v2, Premium, Premium v2**. A specific subdomain certificate (for example, api.contoso.com) would take precedence over a wildcard certificate (*.contoso.com) for requests to api.contoso.com.
* When configuring a custom domain for the **Developer portal**, you can [enable CORS](enable-cors-developer-portal.md) for the new domain name. This is needed for developer portal visitors to use the interactive console in the API reference pages.

## Domain certificate options

API Management supports custom TLS certificates or certificates imported from Azure Key Vault. You can also enable a free, managed certificate.

> **Warning:**
> If you require certificate pinning, please use a custom domain name and either a custom or Key Vault certificate, not the default certificate or the free, managed certificate. We don't recommend taking a hard dependency on a certificate that you don't manage.

# [Custom](#tab/custom)

If you already have a private certificate from a third-party provider, you can upload it to your API Management instance. It must meet the following requirements. (If you enable the free certificate managed by API Management, it already meets these requirements.)

* Exported as a PFX file, encrypted using triple DES, and optionally password protected.
* Contains private key at least 2048 bits long
* Contains all intermediate certificates and the root certificate in the certificate chain.

> **Important:**
> If the certificate chain uses a cross-signed certificate, API Management might return any of the valid chains, and you can't guarantee or control which one is returned. Ensure clients are configured to trust every possible valid chain rather than relying on a specific one.

# [Key Vault](#tab/key-vault)

We recommend using Azure Key Vault to [manage your certificates](https://learn.microsoft.com/azure/key-vault/certificates/about-certificates) and setting them to `autorenew`.

If you use Azure Key Vault to manage a custom domain TLS certificate, make sure the certificate is inserted into Key Vault [as a ](https://learn.microsoft.com/rest/api/keyvault/certificates/create-certificate/create-certificate)_[certificate](https://learn.microsoft.com/rest/api/keyvault/certificates/create-certificate/create-certificate)_, not a _secret_.

> **Caution:**
> When using a key vault certificate in API Management, be careful not to delete the certificate, key vault, or managed identity used to access the key vault.

To fetch a TLS/SSL certificate, API Management must have the list and get secrets permissions on the Azure Key Vault containing the certificate. 
* When you use the Azure portal to import the certificate to API Management, all the necessary configuration steps are completed automatically. 
* When you use command-line tools or management API, these permissions must be granted manually, in two steps:
    1. On the **Managed identities** page of your API Management instance, enable a system-assigned or user-assigned [managed identity](api-management-howto-use-managed-service-identity.md). Note the principal ID on that page.
    1.  Assign permissions to the managed identity to access the key vault. Use steps in the following section.
    
       

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

    
**To configure Azure RBAC access:**

1. In the left menu, select **Access control (IAM)**.
1. On the **Access control (IAM)** page, select **Add role assignment**.
1. On the **Role** tab, select **Key Vault Secrets User**.
1. On the **Members** tab, select **Managed identity** > **+ Select members**.
1. In the **Select managed identities** window, select the system-assigned managed identity or a user-assigned managed identity that's associated with your API Management instance, and then click **Select**.
1. Select **Review + assign**.


If the certificate is set to `autorenew` and your API Management tier has an SLA (that is, in all tiers except the Developer tier), API Management will pick up the latest version automatically, without downtime to the service. This update can take up to 1-2 days. You can trigger certificate synchronization manually if you don't want to wait for API Management to update the certificate automatically.

For more information about synchronization and help with troubleshooting Azure Key Vault certificate access issues, see [Certificate synchronization and troubleshooting for Azure Key Vault-backed certificates](#certificate-synchronization-and-troubleshooting-for-azure-key-vault-backed-certificates) later in this article.

> **Important:**
> * The certificate PFX file in key vault must contain all intermediate certificates and the root certificate in the chain.
> * If the certificate chain uses a cross-signed certificate, API Management might return any of the valid chains, and you can't guarantee or control which one is returned. Ensure clients are configured to trust every possible valid chain rather than relying on a specific one.


# [Managed](#tab/managed)

API Management offers a free, managed TLS certificate for your domain, if you don't wish to purchase and manage your own certificate. The certificate is autorenewed automatically.

> **Important:**
> **Creation of managed certificates for custom domains in API Management will be temporarily unavailable from August 15, 2025 to June 30, 2026.** Our Certificate Authority (CA), DigiCert, will migrate to a new validation platform to meet Multi-Perspective Issuance Corroboration (MPIC) requirements for issuing certificates. This migration requires us to temporarily suspend the creation of managed certificates for custom domains. [Learn more](breaking-changes/managed-certificates-suspension-august-2025.md)
>
> Existing managed certificates will be autorenewed and remain unaffected.
>
> While creation of managed certificates is suspended, use other certificate options for configuring custom domains.

> **Note:**
> The free, managed TLS certificate is in preview. 

### Limitations

* Currently can be used only with the Gateway endpoint of your API Management service
* Not supported in the v2 tiers
* Not supported with the self-hosted gateway
* Not supported in the following Azure regions: France South and South Africa West
* Currently available only in the Azure cloud
* Does not support root domain names (for example, `contoso.com`). Requires a fully qualified name such as `api.contoso.com`.
* Supports only public domain names
* Can only be configured when updating an existing API Management instance, not when creating an instance

### Allow access to DigiCert IP addresses


Starting January 2026, Azure API Management needs inbound access on port 80 to [specific DigiCert IP addresses](https://knowledge.digicert.com/alerts/ip-address-domain-validation?utm_medium=organic&utm_source=docs-digicert&referrer=https://docs.digicert.com/en/certcentral/manage-certificates/domain-control-validation-methods/automatic-domain-control-validation-check.html) to renew (rotate) your managed certificate.  

If your API Management instance restricts incoming IP addresses, we recommend that you remove or modify existing IP restrictions by using one of the following methods based on your deployment architecture.

> **Note:**
> Any time you make changes to policy configurations, network security groups, or firewall rules, it's recommended to test access to your APIs to confirm the restrictions have been removed as intended.

### Remove or edit IP filter policies in API Management

If you implemented IP address restrictions by using built-in policies such as [ip-filter](ip-filter-policy.md):

1. Sign in to the Azure portal and go to your API Management instance.
1. Under **APIs**, select the API where the policy applies (or **All APIs** for a global change).
1. On the **Design** tab, in **Inbound processing**, select the code editor (`</>`) icon.
1. Locate the IP restriction policy statement.
1. Do one of the following:
   - Delete the entire XML snippet to remove the restriction completely.
   - Edit the elements to include or remove specific IP addresses or ranges as needed. We recommend that you add the DigiCert IP addresses to the allow list.
1. Select **Save** to apply changes immediately to the gateway.

### Modify network security group  rules (external virtual network deployment)

If you deploy your API Management instance in a [virtual network in external mode](api-management-using-with-vnet.md), inbound IP restrictions are typically managed using network security group rules on the subnet.

To modify the network security group that you configured on the subnet:

1. In the Azure portal, go to **Network security groups**.
1. Select the network security group associated with your API Management subnet.
1. Under **Settings** > **Inbound security rules**, locate rules that are enforcing the IP restriction (for example, rules with a specific source IP range or service tag that you want to remove or broaden).
1. Do one of the following:
   - **Delete** the restrictive rule: Select the rule and choose the **Delete** option.
   - **Edit the rule**: Change **Source** to **IP Addresses** and add the DigiCert IP addresses to the allow list on port 80.
1. Select **Save**.

### Internal virtual network deployment

If your API Management instance is deployed in a [virtual network in internal mode](api-management-using-with-internal-vnet.md) and is connected with Azure Application Gateway, Azure Front Door, or Azure Traffic Manager, then you need to implement the following architecture:

Azure Front Door / Traffic Manager → Application Gateway → API Management (internal virtual network)

Both the Application Gateway and API Management instances must be injected in the same virtual network. [Learn more about integrating Application Gateway with API Management](api-management-howto-integrate-internal-vnet-appgateway.md).

**Step 1: Configure Application Gateway in front of API Management and allow DigiCert IP addresses in network security group**

1. In the Azure portal, go to **Network security groups** and select the network security group for your API Management subnet.
1. Under **Settings** > **Inbound security rules**, locate rules that are enforcing the IP restriction (for example, rules with a specific source IP range or service tag that you want to remove or broaden).
1. Do one of the following:
   - **Delete** the restrictive rule: Select the rule and choose the **Delete** option.
   - **Edit the rule**: Change **Source** to **IP Addresses** and add the DigiCert IP addresses to the allow list on port 80.
1. Select **Save**.

**Step 2: Preserve target custom domain/hostname from the traffic manager through to the API Management instance**

Do one or more of the following based on your deployment:

- Configure Azure Front Door to preserve the host header (forward the original host header).
    - **Azure Front Door (classic):** Set **Backend host header** to the API Management hostname (not the Application Gateway FQDN), or select **Preserve the incoming host header** when using custom domains.
    - **Azure Front Door Standard/Premium:** In **Route > Origin > Origin settings**, enable **Forward Host Header** and select **Original host header**.

- Configure Application Gateway to preserve the host header.

    In **HTTP settings**, do one of the following to ensure that Application Gateway acts as a reverse proxy without rewriting the host header:

    - Set **Override host name** to **No**.
    - If you use hostname override, set **Pick hostname from incoming request** (recommended).

- Ensure API Management has a matching custom domain.

    API Management in internal virtual network mode still requires the incoming hostname to match an API Management custom domain you configured.
    
    For example:
    
    | Layer | Host header |
    | --- | --- |
    | Client → Azure Front Door | `api.contoso.com` |
    | Azure Front Door → Application Gateway | `api.contoso.com` |
    | Application Gateway → API Management | `api.contoso.com` |
    
    API Management rejects requests if the incoming hostname doesn't match a configured custom domain.
    
    > **Important:**
    > If you configured a free, managed certificate on Azure Front Door on the same domain `api.contoso.com`, then you can't use the free, managed certificate feature of API management. Instead, we recommend bringing your own certificate and uploading it to API Management for the custom domain.

### Modify Azure Firewall rules if used

If an Azure Firewall protects your API Management instance, modify the firewall's network rules to allow inbound access from DigiCert IP addresses on port 80:

1. Go to your **Azure Firewall** instance.
1. Under **Settings** > **Rules** (or **Network rules**), locate the rule collection and the specific rule that restricts inbound access to the API Management instance.
1. Edit or delete the rule to add the DigiCert IP addresses to the allow list on port 80.
1. Select **Save** and test API access.

---
## Set a custom domain name - portal

Choose the steps according to the [domain certificate](#domain-certificate-options) you want to use.

# [Custom](#tab/custom)

1. Navigate to your API Management instance in the [Azure portal](https://portal.azure.com/).
1. In the left navigation, select **Custom domains**.
1. Select **+Add**, or select an existing [endpoint](#endpoints-for-custom-domains) that you want to update.
1. In the window on the right, select the **Type** of endpoint for the custom domain.
1. In the **Hostname** field, specify the name you want to use. For example, `api.contoso.com`.
1. Under **Certificate**, select **Custom**
1. Select **Certificate file** to select and upload a certificate.
1. Upload a valid .PFX file and provide its **Password**, if the certificate is protected with a password.
1. When configuring a Gateway endpoint, select or deselect [other options as necessary](#clients-calling-with-server-name-indication-sni-header), including **Negotiate client certificate** or **Default SSL binding**.
    Configure gateway domain with custom certificate
1. Select **Add**, or select **Update** for an existing endpoint.
1. Select **Save**.

# [Key Vault](#tab/key-vault)

1. Navigate to your API Management instance in the [Azure portal](https://portal.azure.com/).
1. In the left navigation, select **Custom domains**.
1. Select **+Add**, or select an existing [endpoint](#endpoints-for-custom-domains) that you want to update.
1. In the window on the right, select the **Type** of endpoint for the custom domain.
1. In the **Hostname** field, specify the name you want to use. For example, `api.contoso.com`.
1. Under **Certificate**, select **Key Vault** and then **Select**.
    1. Select the **Subscription** from the dropdown list.
    1. Select the **Key vault** from the dropdown list.
    1. Once the certificates have loaded, select the **Certificate** from the dropdown list. Click **Select**.
    1. In **Client identity**, select a system-assigned identity or a user-assigned [managed identity](api-management-howto-use-managed-service-identity.md) enabled in the instance to access the key vault.
1. When configuring a Gateway endpoint, select or deselect [other options as necessary](#clients-calling-with-server-name-indication-sni-header), including **Negotiate client certificate** or **Default SSL binding**.
    Configure gateway domain with Key Vault certificate
1. Select **Add**, or select **Update** for an existing endpoint.
1. Select **Save**.

# [Managed](#tab/managed)

1. Navigate to your API Management instance in the [Azure portal](https://portal.azure.com/).
1. In the left navigation, select **Custom domains**.
1. Select **+Add**, or select an existing [endpoint](#endpoints-for-custom-domains) that you want to update.
1. In the window on the right, select the **Type** of endpoint for the custom domain.
1. In the **Hostname** field, specify the name you want to use. For example, `api.contoso.com`.
1. Under **Certificate**, select **Managed** to enable a free certificate managed by API Management. The managed certificate is available in preview for the Gateway endpoint only.
1. Copy the following values and use them to [configure DNS](#dns-configuration):
    * **TXT record**
    * **CNAME record**
1. When configuring a Gateway endpoint, select or deselect [other options as necessary](#clients-calling-with-server-name-indication-sni-header), including **Negotiate client certificate** or **Default SSL binding**.
    Configure gateway domain with free certificate
1. Select **Add**, or select **Update** for an existing endpoint.
1. Select **Save**.

---

## DNS configuration

Configure your DNS provider to map your custom domain name to the default domain name of your API Management instance.

# [Custom](#tab/custom)

### CNAME record

Configure a CNAME record that points from your custom domain name (for example, `api.contoso.com`) to your API Management service hostname (for example, `yourapim-service-name.azure-api.net`). A CNAME record is more stable than an A record in case the IP address changes. For more information, see [IP addresses of Azure API Management](api-management-howto-ip-addresses.md#changes-to-ip-addresses) and the [API Management FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/api-management-faq.yml#how-can-i-secure-the-connection-between-the-api-management-gateway-and-my-backend-services-).

> **Note:**
> Some domain registrars only allow you to map subdomains when using a CNAME record, such as `www.contoso.com`, and not root names, such as `contoso.com`. For more information on CNAME records, see the documentation provided by your registrar or [IETF Domain Names - Implementation and Specification](https://tools.ietf.org/html/rfc1035).


# [Key Vault](#tab/key-vault)

### CNAME record

Configure a CNAME record that points from your custom domain name (for example, `api.contoso.com`) to your API Management service hostname (for example, `yourapim-service-name.azure-api.net`). A CNAME record is more stable than an A record in case the IP address changes. For more information, see [IP addresses of Azure API Management](api-management-howto-ip-addresses.md#changes-to-ip-addresses) and the [API Management FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/api-management-faq.yml#how-can-i-secure-the-connection-between-the-api-management-gateway-and-my-backend-services-).

> **Note:**
> Some domain registrars only allow you to map subdomains when using a CNAME record, such as `www.contoso.com`, and not root names, such as `contoso.com`. For more information on CNAME records, see the documentation provided by your registrar or [IETF Domain Names - Implementation and Specification](https://tools.ietf.org/html/rfc1035).


# [Managed](#tab/managed)

### CNAME record

Configure a CNAME record that points from your custom domain name (for example, `api.contoso.com`) to your API Management service hostname (for example, `yourapim-service-name.azure-api.net`). A CNAME record is more stable than an A record in case the IP address changes. For more information, see [IP addresses of Azure API Management](api-management-howto-ip-addresses.md#changes-to-ip-addresses) and the [API Management FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/api-management-faq.yml#how-can-i-secure-the-connection-between-the-api-management-gateway-and-my-backend-services-).

> **Note:**
> Some domain registrars only allow you to map subdomains when using a CNAME record, such as `www.contoso.com`, and not root names, such as `contoso.com`. For more information on CNAME records, see the documentation provided by your registrar or [IETF Domain Names - Implementation and Specification](https://tools.ietf.org/html/rfc1035).


> **Caution:**
> When you use the free, managed certificate and configure a CNAME record with your DNS provider, make sure that it resolves to the default API Management service hostname (`<apim-service-name>.azure-api.net`). Currently, API Management doesn't automatically renew the certificate if the CNAME record doesn't resolve to the default API Management hostname. For example, if you're using the free, managed certificate and you use Cloudflare as your DNS provider, make sure that DNS proxy isn't enabled on the CNAME record. 

### TXT record 

When enabling the free, managed certificate for API Management, also configure a TXT record in your DNS zone to establish your ownership of the domain name. 

* The name of the record is your custom domain name prefixed by `apimuid`. Example: `apimuid.api.contoso.com`.
* The value is a domain ownership identifier provided by your API Management instance.

When you use the portal to configure the free, managed certificate for your custom domain, the name and value of the necessary TXT record are automatically displayed.

You can also get a domain ownership identifier by calling the [Get Domain Ownership Identifier](https://learn.microsoft.com/rest/api/apimanagement/current-ga/api-management-service/get-domain-ownership-identifier) REST API.

---

## Certificate synchronization and troubleshooting for Azure Key Vault-backed certificates

API Management provides controls and diagnostics to help you keep certificates in sync and quickly resolve access issues.

For example, because of a configuration change or connectivity problem, your API Management instance might be unable to fetch a hostname certificate from Azure Key Vault after a certificate is updated or rotated there. When this happens, your API Management instance continues to use a cached certificate until it receives an updated certificate. If the cached certificate expires, runtime traffic to the gateway will be blocked. Any upstream service such as Application Gateway that uses the hostname certificate configuration could also block runtime traffic to the gateway when an expired cached certificate is used.

Use the following controls and diagnostics to keep your certificates in sync and prevent or minimize downtime.

### Synchronize certificates

Select **Sync certificates** on the command bar to manually start certificate synchronization when certificate thumbprints have changed. This option lets you avoid waiting for the automated synchronization job, which can take several hours or longer.

Screenshot of command to synchronize hostname certificates from Azure Key Vault in the portal.

### View sync logs

Select **View sync logs** on the command bar to open a panel with detailed root-cause information when certificate synchronization fails. These logs help you diagnose and resolve synchronization issues faster.

### Restore access to the key vault

API Management shows proactive warnings when it detects access issues between your API Management instance and the key vault used by the custom domain. These access issues often cause certificate synchronization failures.

If a warning appears, select **Restore** to automatically fix access based on your key vault authorization model. Depending on the model, API Management takes one of the following actions to restore access:

* Assigns the **Key Vault Secrets User** role for an Azure RBAC-based key vault.
* Grants the **GET** permission for an access policy-based key vault.

### Additional troubleshooting tips for failed certificate rotation from Azure Key Vault

* Confirm that the managed identity used to access the key vault exists. 

* If your API Management instance is deployed in a virtual network, confirm outbound connectivity to the AzureKeyVault service tag. 





## How API Management proxy server responds with SSL certificates in the TLS handshake

When configuring a custom domain for the Gateway endpoint, you can set additional properties that determine how API Management responds with a server certificate, depending on the client request.

### Clients calling with Server Name Indication (SNI) header
If you have one or multiple custom domains configured for the Gateway endpoint, API Management can respond to HTTPS requests from either:
* Custom domain (for example, `contoso.com`)
* Default domain (for example, `apim-service-name.azure-api.net`). 

Based on the information in the SNI header, API Management responds with the appropriate server certificate.

### Clients calling without SNI header
If you are using a client that does not send the [SNI](https://tools.ietf.org/html/rfc6066#section-3) header, API Management creates responses based on the following logic:

* **If the service has just one custom domain configured for Gateway**, the default certificate is the certificate issued to the Gateway's custom domain.
* **If the service has configured multiple custom domains for Gateway (supported in the **Developer** and **Premium** tier)**, you can designate the default certificate by setting the [defaultSslBinding](https://learn.microsoft.com/rest/api/apimanagement/current-ga/api-management-service/create-or-update#hostnameconfiguration) property to true (`"defaultSslBinding":"true"`). In the portal, select the **Default SSL binding** checkbox. 
  
  If you do not set the property, the default certificate is the certificate issued to the default Gateway domain hosted at `*.azure-api.net`.

## Support for PUT/POST request with large payload

API Management proxy server supports requests with large payloads (>40 KB) when using client-side certificates in HTTPS. To prevent the server's request from freezing, you can set the [negotiateClientCertificate](https://learn.microsoft.com/rest/api/apimanagement/current-ga/api-management-service/create-or-update#hostnameconfiguration) property to true (`"negotiateClientCertificate": "true"`) on the Gateway hostname. In the portal, select the **Negotiate client certificate** checkbox.

If the property is set to true, the client certificate is requested at SSL/TLS connection time, before any HTTP request exchange. Since the setting applies at the **Gateway hostname** level, all connection requests ask for the client certificate. You can work around this limitation and configure up to 20 custom domains for Gateway (only supported in the **Premium** tier).



## Limitation for custom domain name in v2 tiers

Currently, in the Standard v2 and Premium v2 tiers, API Management requires a publicly resolvable DNS name to allow traffic to the Gateway endpoint. If you configure a custom domain name for the Gateway endpoint, that name must be publicly resolvable, not restricted to a private DNS zone. 

As a workaround in scenarios where you limit public access to the gateway and you configure a private domain name, you can set up Application Gateway to receive traffic at the private domain name and route it to the API Management instance's Gateway endpoint. For an example architecture, see this [GitHub repo](https://github.com/Azure/agw-pep-custom-names).


## Related content

- [Upgrade and scale your service](upgrade-and-scale.md)
- [Use managed identities in Azure API Management](api-management-howto-use-managed-service-identity.md).
