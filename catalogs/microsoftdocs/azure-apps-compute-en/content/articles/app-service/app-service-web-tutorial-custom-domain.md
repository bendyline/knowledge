---
title: Set Up an Existing Custom Domain Name for Your App
description: Learn how to set up and map an existing custom domain name for your App Service app to improve branding and user access.
keywords: app service, azure app service, domain mapping, domain name, existing domain, hostname, vanity domain

ms.assetid: dc446e0e-0958-48ea-8d99-441d2b947a7c
ms.topic: how-to
ms.date: 04/07/2026
ms.author: msangapu
author: msangapu-msft
ms.service: azure-app-service
ms.custom:
  - mvc
  - sfi-image-nochange
---

# Set up an existing custom domain in Azure App Service


> **Important:**
> As of July 28, 2025, changes to App Service Managed Certificates (ASMC) impact how certificates are issued and renewed in certain scenarios. While most customers don’t need to take action, we recommend reviewing our [ASMC detailed blog post](https://go.microsoft.com/fwlink/?linkid=2328307) for more information.
>

[Azure App Service](overview.md) provides a highly scalable, self-patching web hosting service. This guide shows you how to map an existing custom Domain Name System (DNS) name to App Service. To migrate a live site and its DNS domain name to App Service with no downtime, see [Migrate an existing domain to Azure App Service](manage-custom-dns-migrate-domain.md).

The DNS record type you need to use depends on the domain you want to add to App Service.

| Scenario | Example | Recommended DNS record |
| --- | --- | --- |
| Root domain | `contoso.com` | [A record](https://en.wikipedia.org/wiki/List_of_DNS_record_types#A). Don't use the CNAME record for the root domain. (For information, see [RFC 1912, section 2.4](https://datatracker.ietf.org/doc/html/rfc1912#section-2.4).) |
| Subdomain | `www.contoso.com`, `my.contoso.com` | [CNAME record](https://en.wikipedia.org/wiki/CNAME_record). You can map a subdomain to the app's IP address directly with an A record, but it's possible for [the IP address to change](overview-inbound-outbound-ips.md#when-inbound-ip-changes). The CNAME maps to the app's default hostname instead, which is less susceptible to change. |
| [Wildcard](https://en.wikipedia.org/wiki/Wildcard_DNS_record) | `*.contoso.com` | [CNAME record](https://en.wikipedia.org/wiki/CNAME_record). |

> **Note:**
> For an end-to-end tutorial that shows you how to configure a `www` subdomain and a managed certificate, see [Tutorial: Use a custom domain and a managed certificate to secure your app](tutorial-secure-domain-certificate.md).

## Prerequisites

* Create an [App Service app](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/index.yml), or use an app that you created for another tutorial. The web app's [App Service plan](overview-hosting-plans.md) must be a paid tier, not the Free (F1) tier. To update the tier, see [Scale up your pricing tier](manage-scale-up.md#scale-up-your-pricing-tier).
* Make sure you can edit the DNS records for your custom domain. To edit DNS records, you need access to the DNS registry for your domain provider, such as GoDaddy. For example, to add DNS entries for `contoso.com` and `www.contoso.com`, you must be able to configure the DNS settings for the `contoso.com` root domain. Your custom domains must be in a public DNS zone; private DNS zones aren't supported.
* If you don't have a custom domain yet, you can [purchase an App Service domain](manage-custom-dns-buy-domain.md) instead.

## Configure a custom domain

1. In the [Azure portal](https://portal.azure.com), navigate to your app's management page.

1. In the sidebar menu for your app, under **Settings**, select **Custom domains**.

1. Select **Add custom domain**.

    A screenshot showing how to open the Add custom domain dialog.

1. For **Domain provider**, select **All other domain services** to configure a non-Microsoft domain.

    > **Note:**
    > To configure an App Service domain, see [Buy and manage an App Service domain](manage-custom-dns-buy-domain.md).

1. For **TLS/SSL certificate**, select **App Service Managed Certificate** if your app is in the Basic tier or higher. If you want to remain in the Shared tier, or if you want to use your own certificate, select **Add certificate later**.

1. For **TLS/SSL type**, select the binding type you want.

    
| Setting | Description |
| --- | --- |
| Custom domain | The domain name for which you're adding the TLS/SSL binding. |
| Private Certificate Thumbprint | The certificate to bind. |
| TLS/SSL Type | **[SNI SSL](https://en.wikipedia.org/wiki/Server_Name_Indication)**: Multiple Server Name Indication (SNI) SSL bindings might be added. This option allows multiple TLS/SSL certificates to secure multiple domains on the same IP address. Most modern browsers (including Internet Explorer, Chrome, Firefox, and Opera) support SNI (for more information, see [Server Name Indication](https://wikipedia.org/wiki/Server_Name_Indication)).<br /> **IP SSL**: Only one IP SSL binding can be added. This option allows only one TLS/SSL certificate to secure a dedicated public IP address. After you configure the binding, follow the steps in [Remap records for IP-based SSL](configure-ssl-bindings.md#remap-records-for-ip-based-ssl).<br/>IP-based SSL is supported only in Standard tier or above. |


1. For **Domain**, specify a fully qualified domain name you want based on the domain you own. The **Hostname record type** box defaults to the recommended DNS record to use, depending on whether the domain is a root domain (like `contoso.com`), a subdomain (like `www.contoso.com`), or a wildcard domain (like `*.contoso.com`).

1. Don't select **Validate** yet.

1. For each custom domain in App Service, you need two DNS records with your domain provider. The **Domain validation** section shows you two DNS records that you must add with your domain provider. You can use the copy buttons to copy the value or values that you need in the next section.

    The following screenshot shows the default selections for a `www.contoso.com` domain. It shows a CNAME record and a TXT record to add.

    A screenshot showing how to configure a new custom domain, along with a managed certificate.

    > **Warning:**
    > While it's not absolutely required to add the TXT record, it's highly recommended for security. The TXT record is a *domain verification ID* that helps avoid subdomain takeovers from other App Service apps. For custom domains you previously configured without this verification ID, you should protect them from the same risk by adding the verification ID (the TXT record) to your DNS configuration. For more information on this common high-severity threat, see [Subdomain takeover](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security/fundamentals/subdomain-takeover.md).

<a name="a" aria-hidden="true"></a>

<a name="enable-a" aria-hidden="true"></a>

<a name="wildcard" aria-hidden="true"></a>

<a name="cname" aria-hidden="true"></a>

## Create the DNS records


1. Sign in to the website of your domain provider.

    You can use Azure DNS to manage DNS records for your domain and configure a custom DNS name for Azure App Service. For more information, see [Tutorial: Host your domain in Azure DNS](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/dns-delegate-domain-azure-dns.md).

1. Find the page for managing DNS records.

    Every domain provider has its own DNS records interface, so consult the provider's documentation. Look for areas of the site labeled **Domain Name**, **DNS**, or **Name Server Management**.
    
    Often, you can find the DNS records page by viewing your account information and then looking for a link like **My domains**. Go to that page, and then look for a link that's named something like **Zone file**, **DNS Records**, or **Advanced configuration**.

   The following screenshot is an example of a DNS records page:

   Screenshot that shows an example DNS records page.

1. To create a record, select **Add** or select the appropriate widget.

> **Note:**
> For certain providers, such as GoDaddy, changes to DNS records don't become effective until you select a separate **Save Changes** link.


Select the type of record to create and follow the instructions. You can use either a [CNAME record](https://en.wikipedia.org/wiki/CNAME_record) or an [A record](https://en.wikipedia.org/wiki/List_of_DNS_record_types#A) to map a custom DNS name to App Service. When your function app is hosted in a [Consumption plan](../azure-functions/consumption-plan.md), only the CNAME option is supported.

### [Root domain (for example, contoso.com)](#tab/root)

Create two records, as described in the following table:

| Record type | Host | Value | Comments |
| --- | --- | --- | --- |
| A | `@` | The app's IP address shown in the **Add custom domain** dialog. | The domain mapping itself. (`@` typically represents the root domain.) |
| TXT | `asuid` | The domain verification ID shown in the **Add custom domain** dialog. | For the root domain, App Service accesses the `asuid` TXT record to verify your ownership of the custom domain. |

Screenshot that shows a DNS records page.

### [Subdomain (for example, www.contoso.com)](#tab/subdomain)

#### With an A record

Create two records, as described in the following table:

| Record type | Host | Value | Comments |
| --- | --- | --- | --- |
| A | `<subdomain>` (for example, `www`) | IP address shown in the **Add custom domain** dialog. | The domain mapping itself. |
| TXT | `asuid.<subdomain>` (for example, `asuid.www`) | The domain verification ID shown in the **Add custom domain** dialog. | App Service accesses the `asuid.<subdomain>` TXT record to verify your ownership of the custom domain. |

Screenshot that shows a DNS records subdomain page.

#### With a CNAME record

Create two records, as described in the following table:

| Record type | Host | Value | Comments |
| --- | --- | --- | --- |
| CNAME | `<subdomain>` (for example, `www`) | (See the value in the Azure portal **Overview** page for your app.) | The domain mapping itself. |
| TXT | `asuid.<subdomain>` (for example, `asuid.www`) | The domain verification ID shown in the **Add custom domain** dialog. | App Service accesses the `asuid.<subdomain>` TXT record to verify your ownership of the custom domain. |

Screenshot that shows the portal navigation to an Azure app.

### [Wildcard (CNAME)](#tab/wildcard)

For a wildcard name, like `*` in `*.contoso.com`, create two records, as described in the following table:

| Record type | Host | Value | Comments |
| --- | --- | --- | --- |
| CNAME | `*` | (See the value in the Azure portal **Overview** page for your app.) | The domain mapping itself. |
| TXT | `asuid` | The domain verification ID shown in the **Add custom domain** dialog. | App Service accesses the `asuid` TXT record to verify your ownership of the custom domain. |

Screenshot that shows the navigation to an Azure app.

---

## Validate domain ownership and complete the mapping

1. Back in the **Add custom domain** dialog in the Azure portal, select **Validate**.

    A screenshot showing how to validate your DNS record settings in the Add a custom domain dialog.

1. If the **Domain validation** section shows green check marks next to both domain records, you've configured them correctly. Select **Add**. If you see any errors or warnings, resolve them in the DNS record settings on your domain provider's website.

    A screenshot showing the Add button activated after validation.

    > **Note:**
    > If you configured the TXT record but not the A or CNAME record, App Service treats the change as a [domain migration](manage-custom-dns-migrate-domain.md) scenario and allows the validation to succeed, but you don't see green check marks next to the records.

1. You should see the custom domain added to the list. You might also see a red X and the text **No binding**. 

    If you selected **App Service Managed Certificate** earlier, wait a few minutes for App Service to create the managed certificate for your custom domain. When the process is complete, the red X becomes a green check mark and you see the word **Secured**. If you selected **Add certificate later**, the red X remains until you [add a private certificate for the domain](configure-ssl-certificate.md) and [configure the binding](configure-ssl-bindings.md).

    A screenshot showing the custom domains page with the new secured custom domain.

    > **Note:**
    > Unless you configure a certificate binding for your custom domain, any HTTPS request from a browser to the domain receives an error or warning, depending on the browser.
    
## Test the DNS resolution

Browse to the domain name that you configured.

Screenshot that shows navigation to an Azure app.

<a name="resolve-404-not-found" aria-hidden="true"></a>

If you receive an HTTP 404 (Not Found) error when you browse to the URL of your custom domain, the two most likely causes are:

- The browser client has cached the old IP address of your domain. Clear the cache and test the DNS resolution again. On a Windows machine, you can clear the cache with `ipconfig /flushdns`.
- You configured an IP-based certificate binding, and the app's IP address has changed because of it. [Remap the A record](configure-ssl-bindings.md#remap-records-for-ip-based-ssl) in your DNS entries to the new IP address.

If you receive a `Page not secure` warning or error, it's because your domain doesn't have a certificate binding yet. [Add a private certificate for the domain](configure-ssl-certificate.md) and [configure the binding](configure-ssl-bindings.md).

## (Optional) Automate with scripts


You can automate management of custom domains with scripts by using the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) or [Azure PowerShell](https://learn.microsoft.com/powershell/azure/).

# [Azure CLI](#tab/azurecli)
The following command adds a configured custom DNS name to an App Service app.

```azurecli 
az webapp config hostname add \
    --webapp-name <app-name> \
    --resource-group <resource-group-name> \
    --hostname <fully-qualified-domain-name>
``` 

For more information, see [Map a custom domain to a web app](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/scripts/cli-configure-custom-domain.md).

# [PowerShell](#tab/powershell)

The following command adds a configured custom DNS name to an App Service app.

```powershell  
$subscriptionId = "<subscription-ID>"
$resourceGroup = "<resource-group-name>"
$appName = "<app-name>"
$hostname = "<fully-qualified-domain-name>"
$apiVersion = "2024-04-01"
 
$restApiPath = "/subscriptions/{0}/resourceGroups/{1}/providers/Microsoft.Web/sites/{2}/hostNameBindings/{3}?api-version={4}" `
    -f $subscriptionId, $resourceGroup, $appName, $hostname, $apiVersion
 
Invoke-AzRestMethod -Method PUT -Path $restApiPath
```

For more information, see [Assign a custom domain to a web app](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/scripts/powershell-configure-custom-domain.md).

---




## Next step

> 
> [Enable HTTPS for a custom domain in Azure App Service](configure-ssl-bindings.md)
