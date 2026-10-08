---
title: Azure API Management - Managed certificates suspension for custom domains (August 2025)
description: Azure API Management is temporarily suspending creation of managed certificates for custom domains from August 15, 2025 to October 30, 2026 due to industry-wide changes in domain validation.
services: api-management
ms.service: azure-api-management
ms.topic: reference
ai-usage: ai-assisted
ms.date: 08/26/2026
---

# Creation of managed certificates temporarily suspended for custom domains (August 2025 - October 2026)


**APPLIES TO: Developer | Basic | Standard | Premium**

> **Important:**
> The suspension period for managed certificates was recently extended to October 30, 2026. 

Creation of Azure-managed certificates for custom domains in API Management will be temporarily turned off from August 15, 2025 to October 30, 2026. Existing managed certificates will be autorenewed as long as your API Management service allows inbound traffic from DigiCert IP addresses on port 80 and DNS is properly configured.

In the classic service tiers, Azure API Management offers [free, managed TLS certificates for custom domains](../configure-custom-domain.md#domain-certificate-options) (preview), allowing customers to secure their endpoints without purchasing and managing their own certificates. Because of an industry-wide deprecation of CNAME-based Domain Control Validation (DCV), our Certificate Authority (CA), DigiCert, is moving to a new open-source software (OSS) domain control validation (DCV) platform that provides transparency and accountability increasing the trustworthiness of domain validation. As part of this transition, DigiCert will deprecate support for the legacy CNAME Delegation DCV workflow. This migration requires us to temporarily suspend the creation of managed certificates for custom domains.

Note that this does not impact the standard CNAME DCV workflow (where DigiCert validates a random value in the CNAME record) which is still supported in the OSS validation system. This change affects several Azure services that currently rely on the soon-to-be deprecated CNAME for automated certificate issuance and renewal.

## Is my service affected by this?

You're affected if you plan to create new managed certificates for custom domains in Azure API Management between August 15, 2025 and October 30, 2026. 

As part of this change, starting January 2026, for Azure API Management to be able to renew (rotate) your existing managed certificate, inbound access is required on port 80 to allow [specific DigiCert IP addresses](https://knowledge.digicert.com/alerts/ip-address-domain-validation?utm_medium=organic&utm_source=docs-digicert&referrer=https://docs.digicert.com/en/certcentral/manage-certificates/domain-control-validation-methods/automatic-domain-control-validation-check.html). 

## What is the deadline for the change?

The suspension of managed certificates for custom domains will be enforced from August 15, 2025 to October 30, 2026. The capability to create managed certificates will resume after the migration to the new validation platform is complete.

## What do I need to do?

If you need to add new managed certificates, plan to do so before August 15, 2025 or after October 30, 2026. During the suspension period, you can still configure custom domains with certificates you manage from other sources.

If you already have managed certificates for your custom domains, do the following to ensure continued access:

1. Ensure that your API Management service [allows inbound traffic from DigiCert IP addresses on port 80](#step-1-allow-access-to-digicert-ip-addresses). This access is now required for the certificate autorenewal process.
1. [Configure DNS records](#step-2-configure-dns-records) to resolve your custom domain name.
1. [Allow API Management service access to port 80](#step-3-allow-api-management-service-access-to-port-80) if you have inbound network restrictions in place.

### Step 1: Allow access to DigiCert IP addresses


Starting January 2026, Azure API Management needs inbound access on port 80 to [specific DigiCert IP addresses](https://knowledge.digicert.com/alerts/ip-address-domain-validation?utm_medium=organic&utm_source=docs-digicert&referrer=https://docs.digicert.com/en/certcentral/manage-certificates/domain-control-validation-methods/automatic-domain-control-validation-check.html) to renew (rotate) your managed certificate.  

If your API Management instance restricts incoming IP addresses, we recommend that you remove or modify existing IP restrictions by using one of the following methods based on your deployment architecture.

> **Note:**
> Any time you make changes to policy configurations, network security groups, or firewall rules, it's recommended to test access to your APIs to confirm the restrictions have been removed as intended.

### Remove or edit IP filter policies in API Management

If you implemented IP address restrictions by using built-in policies such as [ip-filter](../ip-filter-policy.md):

1. Sign in to the Azure portal and go to your API Management instance.
1. Under **APIs**, select the API where the policy applies (or **All APIs** for a global change).
1. On the **Design** tab, in **Inbound processing**, select the code editor (`</>`) icon.
1. Locate the IP restriction policy statement.
1. Do one of the following:
   - Delete the entire XML snippet to remove the restriction completely.
   - Edit the elements to include or remove specific IP addresses or ranges as needed. We recommend that you add the DigiCert IP addresses to the allow list.
1. Select **Save** to apply changes immediately to the gateway.

### Modify network security group  rules (external virtual network deployment)

If you deploy your API Management instance in a [virtual network in external mode](../api-management-using-with-vnet.md), inbound IP restrictions are typically managed using network security group rules on the subnet.

To modify the network security group that you configured on the subnet:

1. In the Azure portal, go to **Network security groups**.
1. Select the network security group associated with your API Management subnet.
1. Under **Settings** > **Inbound security rules**, locate rules that are enforcing the IP restriction (for example, rules with a specific source IP range or service tag that you want to remove or broaden).
1. Do one of the following:
   - **Delete** the restrictive rule: Select the rule and choose the **Delete** option.
   - **Edit the rule**: Change **Source** to **IP Addresses** and add the DigiCert IP addresses to the allow list on port 80.
1. Select **Save**.

### Internal virtual network deployment

If your API Management instance is deployed in a [virtual network in internal mode](../api-management-using-with-internal-vnet.md) and is connected with Azure Application Gateway, Azure Front Door, or Azure Traffic Manager, then you need to implement the following architecture:

Azure Front Door / Traffic Manager → Application Gateway → API Management (internal virtual network)

Both the Application Gateway and API Management instances must be injected in the same virtual network. [Learn more about integrating Application Gateway with API Management](../api-management-howto-integrate-internal-vnet-appgateway.md).

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

### Step 2: Configure DNS records

Configure DNS records for your custom domain to point to your API Management gateway. The type of DNS record you need to add depends on your API Management tier.

#### DNS records for Developer, Basic, Standard, or Premium tier

1. Add either a [CNAME](https://learn.microsoft.com/azure/api-management/configure-custom-domain?tabs=custom#cname-record) or A-record with your DNS provider. 

1. Add DigiCert as an authorized certificate authority (CA) in Azure DNS. For this, create a specific CAA record set within your domain's DNS zone using the Azure portal or other management tools.

#### DNS records for Consumption tier

1. Add either a [CNAME](https://learn.microsoft.com/azure/api-management/configure-custom-domain?tabs=custom#cname-record) or [TXT](https://learn.microsoft.com/azure/api-management/configure-custom-domain?tabs=managed#txt-record) record with your DNS provider. If you configure both, the TXT record takes precedence.
1. Add DigiCert as an authorized certificate authority (CA) in Azure DNS. For this, you need to create a specific CAA record set within your domain's DNS zone using the Azure portal or other management tools

### Step 3: Allow API Management service access to port 80

If you have inbound network restrictions configured for your API Management service, allow the Azure API Management resource provider access on port 80. This is required to allow inbound traffic to support certificate revocation list (CRL) checks, certificate renewal, and management communication. 

1. In the Azure portal, go to **Network security groups**.
1. Select the network security group associated with your API Management subnet.
1. Under **Settings** > **Inbound security rules**, add a new rule allowing traffic on port 80 from the **ApiManagement** service tag to the API Management instance.

## Help and support

If you have questions, get answers from community experts in [Microsoft Q&A](https://aka.ms/apim/azureqa/change/captcha-2022). If you have a support plan and need technical help, create a [support request](https://portal.azure.com/#view/Microsoft_Azure_Support/HelpAndSupportBlade/~/overview).

## Related content

See all [upcoming breaking changes and feature retirements](overview.md).
