---
title: Create a custom IPv4 address prefix in Azure
titleSuffix: Azure Virtual Network
description: Learn how to onboard and create a custom IP address prefix using the Azure portal, Azure CLI, or Azure PowerShell.
author: mbender-ms
ms.author: mbender
ms.service: azure-virtual-network
ms.subservice: ip-services
ms.topic: how-to
ms.date: 08/08/2024
ms.custom:
  - references_regions
  - sfi-image-nochange
# Customer intent: "As a network administrator, I want to create a custom IPv4 address prefix in Azure, so that I can control IP address allocation and advertising while maintaining ownership of my IP range."
---

# Create a custom IPv4 address prefix in Azure

In this article, you learn how to create a custom IPv4 address prefix using the Azure portal. You prepare a range to provision, provision the range for IP allocation, and enable the range advertisement by Microsoft.

A custom IPv4 address prefix enables you to bring your own IPv4 ranges to Microsoft and associate it to your Azure subscription. You maintain ownership of the range while Microsoft would be permitted to advertise it to the Internet. A custom IP address prefix functions as a regional resource that represents a contiguous block of customer owned IP addresses.

For this article, choose between the Azure portal, Azure CLI, or PowerShell to create a custom IPv4 address prefix.


## Global/Regional vs Unified model

Before onboarding your range to Azure, you need to decide on the model that would work best for your architecture. For BYOIPv4, Azure offers two deployment models: "global/regional" and "unified".

* The Global/Regional model uses a *parent*/*child* paradigm. In this paradigm, the Microsoft Wide Area Network (WAN) advertises the global (parent) range, and the respective Azure regions advertise the regional (child) ranges. By default, global ranges can be anywhere from /21 to /24 in size, and regional ranges can be from /22 to /26 in size. Regional ranges are dependent on the size of their respective parent range, and they must be at least one level smaller. For example, a global range using /23 would allow a regional range of /24 to /26. Only the global range needs to be validated as part of the provisioning. The regional ranges are derived from the global range in a similar manner to the way public IP prefixes are derived from custom IP prefixes.  Regional ranges can be in different subscriptions from the global range, but must be in the same tenant.

* The Unified model is a simplified system where both the Microsoft Wide Area Network (WAN) and the Azure region advertises the same range. By default, a unified range can be anywhere from /21 to /24 in size.

* The choice of the model is dependent on the scope of the desired onboarding. For example, if your plan only involves onboarding a range to a single Azure region, the unified model is the more logical choice and avoids management overhead. If your organization is instead looking to deploy BYOIPv4 ranges to multiple regions--potentially spread across different teams within the organization and over an extended period of time--then a global/regional model can provide more flexibility.

> **Note:**
> Ranges cannot be "migrated" between the two models once they are onboarded; they must be fully deprovisioned and re-onboarded to utilize the other model.


## Prerequisites

# [Azure portal](#tab/azureportal)

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- A customer owned IPv4 range to provision in Azure.
    - A sample customer range (1.2.3.0/24) is used for this example. This range isn't validated in Azure so replace the example range with yours.

> **Note:**
> For problems encountered during the provisioning process, please see [Troubleshooting for custom IP prefix](manage-custom-ip-address-prefix.md#troubleshooting-and-faqs).

# [Azure CLI](#tab/azurecli/)

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/create-custom-ip-address-prefix-portal.md)

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- This tutorial requires version 2.28 or later of the Azure CLI (you can run az version to determine which you have). If using Azure Cloud Shell, the latest version is already installed.
- Sign in to Azure CLI and select the subscription you want to use with `az account`.
- A customer owned IPv4 range to provision in Azure.
    - A sample customer range (1.2.3.0/24) is used for this example. This range isn't validated in Azure so replace the example range with yours.

> **Note:**
> For problems encountered during the provisioning process, please see [Troubleshooting for custom IP prefix](manage-custom-ip-address-prefix.md#troubleshooting-and-faqs).

# [Azure PowerShell](#tab/azurepowershell/)

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure PowerShell installed locally or Azure Cloud Shell.
- Sign in to Azure PowerShell and select the subscription to use with this feature. For more information, see [Sign in with Azure PowerShell](https://learn.microsoft.com/powershell/azure/authenticate-azureps).
- Ensure your `Az.Network` module is 5.1.1 or later. To verify the installed module, use the command `Get-InstalledModule -Name "Az.Network"`. If the module requires an update, use the command `Update-Module -Name "Az.Network"` if necessary.
- A customer owned IPv4 range to provision in Azure.
    - A sample customer range (1.2.3.0/24) is used for this example. This range isn't validated in Azure so replace the example range with yours.

If you choose to install and use PowerShell locally, this article requires the Azure PowerShell module version 5.4.1 or later. Run `Get-Module -ListAvailable Az` to find the installed version. If you need to upgrade, see [Install Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-azure-powershell). If you're running PowerShell locally, you also need to run `Connect-AzAccount` to create a connection with Azure.

> **Note:**
> For problems encountered during the provisioning process, please see [Troubleshooting for custom IP prefix](manage-custom-ip-address-prefix.md#troubleshooting-and-faqs).

---

## Pre-provisioning steps


To utilize the Azure BYOIP feature, you must perform the following steps before the provisioning of your IPv4 address range.

### Requirements and prefix readiness

* The address range must be owned by you and registered under your name with the one of the five major Regional Internet Registries:
    * [American Registry for Internet Numbers (ARIN)](https://www.arin.net/)
    * [Réseaux IP Européens Network Coordination Centre (RIPE NCC)](https://www.ripe.net/)
    * [Asia Pacific Network Information Centre Regional Internet Registries (APNIC)](https://www.apnic.net/)
    * [Latin America and Caribbean Network Information Centre (LACNIC)](https://www.lacnic.net/)
    * [African Network Information Centre (AFRINIC)](https://afrinic.net/)

* The address range must be no smaller than a /24 for Internet Service Providers to accept.

* A Route Origin Authorization (ROA) document that authorizes Microsoft to advertise the address range must be completed by the customer on the appropriate Routing Internet Registry (RIR) website or via their API. The RIR requires the ROA to be digitally signed with the Resource Public Key Infrastructure (RPKI) of your RIR.
    
    For this ROA:
        
    * The Origin AS must be listed as 8075 for the Public Cloud. (If the range will be onboarded to the US Gov Cloud, the Origin AS must be listed as 8070.)
    
    * The validity end date (expiration date) needs to account for the time you intend to have the prefix advertised by Microsoft. Some RIRs don't present validity end date as an option and or choose the date for you.
    
    * The prefix length should exactly match the prefixes that Microsoft advertises. For example, if you plan to bring 1.2.3.0/24 and 2.3.4.0/23 to Microsoft, they should both be named.
  
    * After the ROA is complete and submitted, allow at least 24 hours for it to become available to Microsoft, where it will be verified to determine its authenticity and correctness as part of the provisioning process.

> **Note:**
> It is also recommended to create a ROA for any existing ASN that is advertising the range to avoid any issues during migration.

> **Important:**
> While Microsoft will not stop advertising the range after the specified date,  it is strongly recommended to independently create a follow-up ROA if the original expiration date has passed to avoid external carriers from not accepting the advertisement.


### Certificate readiness

To authorize Microsoft to associate a prefix with a customer subscription, a public certificate must be compared against a signed message. 

The following steps show the steps required to prepare sample customer range (1.2.3.0/24) for provisioning to the Public cloud. You can execute these commands with Windows PowerShell or in a Linux Console. Both require OpenSSL to be installed.

# [**PowerShell**](#tab/powershell)

1. Create a [self-signed X509 certificate](https://en.wikipedia.org/wiki/Self-signed_certificate) to add to the Whois/RDAP record for the prefix. For information about RDAP, see the [ARIN](https://www.arin.net/resources/registry/whois/rdap/), [RIPE](https://www.ripe.net/manage-ips-and-asns/db/registration-data-access-protocol-rdap), [APNIC](https://www.apnic.net/about-apnic/whois_search/about/rdap/), and [AFRINIC](https://www.afrinic.net/) sites. 

   Utilizing the OpenSSL toolkit, the following commands generate an RSA key pair and create an X509 certificate using the key pair that expires in six months.
    
    ```powershell
    ./openssl genrsa -out byoipprivate.key 2048
    Set-Content -Path byoippublickey.cer (./openssl req -new -x509 -key byoipprivate.key -days 180) -NoNewline
    ```
   
2. After the certificate is created, update the public comments section of the Whois/RDAP record for the prefix. To display for copying, including the BEGIN/END header/footer with dashes, use the command `cat byoippublickey.cer` You should be able to perform this procedure via your Routing Internet Registry. 

    Here are instructions for each registry:
  
    * [ARIN](https://www.arin.net/resources/registry/manage/netmod/) - edit the *Comments* of the prefix record.
    
    * [RIPE](https://www.ripe.net/manage-ips-and-asns/db/support/updating-the-ripe-database) - edit the *Remarks* of the inetnum record.
    
    * [APNIC](https://www.apnic.net/manage-ip/using-whois/updating-whois/) - edit the *Remarks* of the inetnum record using MyAPNIC.
    
    * [AFRINIC](https://afrinic.net/support.html) - edit the *Remarks* of the inetnum record by using MyAFRINIC.
    
    * For ranges from LACNIC registry, create a support ticket with Microsoft.
     
    After the public comments are filled out, the Whois/RDAP record should look like the following example. When copying, ensure there aren't spaces, or carriage returns and include all dashes:

     ```text
     -----BEGIN CERTIFICATE-----BCDEFG0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2-----END CERTIFICATE-----
     ```
    
3. To create the message passed to Microsoft, create a string that contains relevant information about your prefix and subscription. Sign this message with the key pair generated previously. Use the following format, substituting your subscription ID, prefix to be provisioned, and expiration date matching the Validity Date on the ROA. Ensure the format is in that order. 

    Use the following command to create a signed message passed to Microsoft for verification. 
   
    > **Note:**
    > If the Validity End date was not included in the original ROA, pick a date that corresponds to the time you intend to have the prefix advertised by Azure.
    
    ```powershell
    $byoipauth="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|1.2.3.0/24|yyyymmdd"
    Set-Content -Path byoipauth.txt -Value $byoipauth -NoNewline
    ./openssl dgst -sha256 -sign byoipprivate.key -keyform PEM -out byoipauthsigned.txt byoipauth.txt
    $byoipauthsigned=(./openssl enc -base64 -in byoipauthsigned.txt) -join ''
    ```

4. To view the contents of the signed message, enter the variable created from the signed message created previously and select **Enter** at the prompt:

    ```powershell
    $byoipauthsigned

    # Output
    ABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0a1b2c0a10a/1234567a/ABCDEFG0a1b2c0//ABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0a1b2c0a10aABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0a1b2c0a10aABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0a1b2c0a10aABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0a1b2c0a10aABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0/ABCDEFG0a1b2c0a1b2c0a1b21212121212/ABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0a1b2c0a10a==
    ```

# [**Console**](#tab/console)

1. Create a [self-signed X509 certificate](https://en.wikipedia.org/wiki/Self-signed_certificate) to add to the Whois/RDAP record for the prefix. For information about RDAP, see the [ARIN](https://www.arin.net/resources/registry/whois/rdap/), [RIPE](https://www.ripe.net/manage-ips-and-asns/db/registration-data-access-protocol-rdap), [APNIC](https://www.apnic.net/about-apnic/whois_search/about/rdap/), and [AFRINIC](https://www.afrinic.net/) sites. 

    When utilizing the OpenSSL toolkit, the following example commands generate an RSA key pair and create an X509 certificate using the key pair that expires in six months.

    ```console
    openssl genrsa -out byoipprivate.key 2048
    openssl req -new -x509 -key byoipprivate.key -days 180 | tr -d "\n" > byoippublickey.cer
    ```
   
2. After the certificate is created, update the public comments section of the Whois/RDAP record for the prefix. To display for copying, including the BEGIN/END header/footer with dashes, use the command `cat byoippublickey.cer` You should be able to perform this procedure via your Routing Internet Registry. 

    Here are instructions for each registry:
  
    * [ARIN](https://www.arin.net/resources/registry/manage/netmod/) - edit the *Comments* of the prefix record.
    
    * [RIPE](https://www.ripe.net/manage-ips-and-asns/db/support/updating-the-ripe-database) - edit the *Remarks* of the inetnum record.
    
    * [APNIC](https://www.apnic.net/manage-ip/using-whois/updating-whois/) - edit the *Remarks* of the inetnum record using MyAPNIC.
    
    * [AFRINIC](https://afrinic.net/support.html) - edit the *Remarks* of the inetnum record by using MyAFRINIC.
    
    * For ranges from LACNIC registry, create a support ticket with Microsoft.
     
    After the public comments are filled out, the Whois/RDAP record should look like the following example. Ensure there aren't spaces or carriage returns and include all dashes:

    ```text
     -----BEGIN CERTIFICATE-----BCDEFG0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2c0a1b2-----END CERTIFICATE-----
    ```
    
3. To create the message passed to Microsoft, create a string that contains relevant information about your prefix and subscription. Sign this message with the key pair generated previously. Use the following format, substituting your subscription ID, prefix to be provisioned, and expiration date matching the Validity Date on the ROA. Ensure the format is in that order. 

    Use the following command to create a signed message passed to Microsoft for verification. 
   
    > **Note:**
    > If the Validity End date was not included in the original ROA, pick a date that corresponds to the time you intend to have the prefix advertised by Azure.

    ```console
    byoipauth="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|1.2.3.0/24|yyyymmdd"
    byoipauthsigned=$(echo $byoipauth | tr -d "\n" | openssl dgst -sha256 -sign byoipprivate.key -keyform PEM | openssl base64 | tr -d "\n")
    ```

4. To view the contents of the signed message, enter the variable created from the signed message created previously and select **Enter** at the prompt:

    ```console
    byoipauthsigned

    # Output

    ABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0a1b2c0a10a/1234567a/ABCDEFG0a1b2c0//ABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0a1b2c0a10aABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0a1b2c0a10aABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0a1b2c0a10aABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0a1b2c0a10aABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0/ABCDEFG0a1b2c0a1b2c0a1b21212121212/ABCDEFG0a1b2c0a1b2c0a1b2c0ca1b2c0a1b2c0a10a==
    ```
---



## Provisioning and Commissioning a Custom IPv4 Prefix

The following steps display the procedure for provisioning and commissioning a custom IPv4 address prefix with a choice of two models:  Unified and Global/Regional. The steps can be performed with the Azure portal, Azure CLI, or Azure PowerShell.

# [Azure portal](#tab/azureportal)

Use the Azure portal to provision and commission a custom IPv4 address prefix with the Azure portal.

# [Azure CLI](#tab/azurecli)

Use the Azure CLI to provision and commission a custom IPv4 address prefix with the Azure CLI.

# [Azure PowerShell](#tab/azurepowershell/)

Use Azure PowerShell to provision and commission a custom IPv4 address prefix with Azure PowerShell.

---

# [Unified Model](#tab/unified/azureportal)

The following steps display the procedure for provisioning a sample customer range (1.2.3.0/24) to the US West 2 region.

> **Note:**
> Clean up or delete steps aren't shown on this page given the nature of the resource. For information on removing a provisioned custom IP prefix, see [Manage custom IP prefix](manage-custom-ip-address-prefix.md).

## Sign in to Azure

Sign in to the [Azure portal](https://portal.azure.com).

## Create and provision a unified custom IP address prefix

1. In the search box at the top of the portal, enter **Custom IP**.

2. In the search results, select **Custom IP Prefixes**.

3. Select **+ Create**.

4. In **Create a custom IP prefix**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription |
    | Resource group | Select **Create new**.</br> Enter **myResourceGroup**.</br> Select **OK**. |
    | **Instance details** |  |
    | Name | Enter **myCustomIPPrefix**. |
    | Region | Select **West US 2**. |
    | IP Version | Select IPv4. |
    | IPv4 Prefix (CIDR) | Enter **1.2.3.0/24**. |
    | ROA expiration date | Enter your ROA expiration date in the **yyyymmdd** format. |
    | Signed message | Paste in the output of **$byoipauthsigned** from the pre-provisioning section. |
    | Availability Zones | Select **Zone-redundant**. |

    Screenshot of create custom IP prefix page in Azure portal.

5. Select the **Review + create** tab or the blue **Review + create** button at the bottom of the page.

6. Select **Create**.

The range is pushed to the Azure IP Deployment Pipeline. The deployment process is asynchronous. You can check the status by reviewing the **Commissioned state** field for the custom IP prefix.

> **Note:**
> The estimated time to complete the provisioning process is 30 minutes.

> **Important:**
> After the custom IP prefix is in a "Provisioned" state, a child public IP prefix can be created. These public IP prefixes and any public IP addresses can be attached to networking resources. For example, virtual machine network interfaces or load balancer front ends. The IPs won't be advertised and therefore won't be reachable. For more information on a migration of an active prefix, see [Manage a custom IP prefix](manage-custom-ip-address-prefix.md).

## Create a public IP prefix from unified custom IP prefix

When you create a prefix, you must create static IP addresses from the prefix. In this section, you create a static IP address from the prefix you created earlier.

1. In the search box at the top of the portal, enter **Custom IP**.

2. In the search results, select **Custom IP Prefixes**.

3. In **Custom IP Prefixes**, select **myCustomIPPrefix**.

4. In **Overview** of **myCustomIPPrefix**, select **+ Add a public IP prefix**.

5. Enter or select the following information in the **Basics** tab of **Create a public IP prefix**.

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **myResourceGroup**. |
    | **Instance details** |  |
    | Name | Enter **myPublicIPPrefix**. |
    | Region | Select **West US 2**. The region of the public IP prefix must match the region of the custom IP prefix. |
    | IP version | Select **IPv4**. |
    | Prefix ownership | Select **Custom prefix**. |
    | Custom IP prefix | Select **myCustomIPPrefix**. |
    | Prefix size | Select a prefix size. The size can be as large as the custom IP prefix. |

6. Select **Review + create**, and then **Create** on the following page.

7. Repeat steps 1-3 to return to the **Overview** page for **myCustomIPPrefix**. You see **myPublicIPPrefix** listed under the **Associated public IP prefixes** section. You can now allocate standard SKU public IP addresses from this prefix. For more information, see [Create a static public IP address from a prefix](manage-public-ip-address-prefix.md#create-a-static-public-ip-address-from-a-prefix).

## Commission the unified custom IP address prefix

When the custom IP prefix is in **Provisioned** state, update the prefix to begin the process of advertising the range from Azure.

1. In the search box at the top of the portal, enter **Custom IP** and select **Custom IP Prefixes**.

2. Verify, and wait if necessary, for **myCustomIPPrefix** to be is listed in a **Provisioned** state.

3. In **Custom IP Prefixes**, select **myCustomIPPrefix**.

4. In **Overview** of **myCustomIPPrefix**, select the **Commission** dropdown menu and choose **Globally**.

The operation is asynchronous. You can check the status by reviewing the **Commissioned state** field for the custom IP prefix. Initially, the status will show the prefix as **Commissioning**, followed in the future by **Commissioned**. The advertisement rollout isn't completed all at once. The range is partially advertised while still in the **Commissioning** status.

> **Note:**
> The estimated time to fully complete the commissioning process is 3-4 hours.

> **Important:**
> As the custom IP prefix transitions to a **Commissioned** state, the range is being advertised with Microsoft from the local Azure region and globally to the Internet by Microsoft's wide area network under Autonomous System Number (ASN) 8075. Advertising this same range to the Internet from a location other than Microsoft at the same time could potentially create BGP routing instability or traffic loss. For example, a customer on-premises building. Plan any migration of an active range during a maintenance period to avoid impact. To prevent these issues during initial deployment, you can choose the regional only commissioning option where your custom IP prefix will only be advertised within the Azure region it is deployed in. For more information, see [Manage a custom IP address prefix (BYOIP)](manage-custom-ip-address-prefix.md).

# [Global/Regional Model](#tab/globalregional/azureportal)

The following steps display the modified steps for provisioning a sample global (parent) IP range (1.2.3.0/4) and regional (child) IP ranges to the US West 2 and US East 2 Regions.

> **Note:**
> Clean up or delete steps aren't shown on this page given the nature of the resource. For information on removing a provisioned custom IP prefix, see [Manage custom IP prefix](manage-custom-ip-address-prefix.md).

### Provision a global custom IP address prefix

Sign in to the [Azure portal](https://portal.azure.com).

## Create and provision a global custom IP address prefix

1. In the search box at the top of the portal, enter **Custom IP**.

2. In the search results, select **Custom IP Prefixes**.

3. Select **+ Create**.

4. In **Create a custom IP prefix**, enter or select the following information:

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription |
    | Resource group | Select **Create new**.</br> Enter **myResourceGroup**.</br> Select **OK**. |
    | **Instance details** |  |
    | Name | Enter **myCustomIPGlobalPrefix**. |
    | Region | Select **West US 2**. |
    | IP Version | Select IPv4. |
    | IP prefix range | Select Global. |
    | Global IPv4 Prefix (CIDR) | Enter **1.2.3.0/24**. |
    | ROA expiration date | Enter your ROA expiration date in the **yyyymmdd** format. |
    | Signed message | Paste in the output of **$byoipauthsigned** from the pre-provisioning section. |

5. Select the **Review + create** tab or the blue **Review + create** button at the bottom of the page.

6. Select **Create**.
The range is pushed to the Azure IP Deployment Pipeline. The deployment process is asynchronous. You can check the status by reviewing the **Commissioned state** field for the custom IP prefix.

> **Note:**
> The estimated time to complete the provisioning process is 30 minutes.

### Provision regional custom IP address prefixes

After the global custom IP prefix is in a **Provisioned** state, regional custom IP prefixes can be created. These ranges must always be of size /64 to be considered valid. The ranges can be created in any region (it doesn't need to be the same as the global custom IP prefix), keeping in mind any geolocation restrictions associated with the original global range. The "children" custom IP prefixes advertise from the region they're created in. Because the validation is only done for global custom IP prefix provision, no Authorization or Signed message is required (but availability zones can be utilized).

In the same **Create a custom IP prefix** page as before, enter or select the following information:

| Setting | Value |
| --- | --- |
| **Project details** |  |
| Subscription | Select your subscription |
| Resource group | Select **Create new**.</br> Enter **myResourceGroup**.</br> Select **OK**. |
| **Instance details** |  |
| Name | Enter **myCustomIPRegionalPrefix1**. |
| Region | Select **West US 2**. |
| IP Version | Select IPv4. |
| IP prefix range | Select Regional. |
| Custom IP prefix parent | Select myCustomIPGlobalPrefix (1.2.3.0/24) from the drop-down menu. |
| Regional IPv4 Prefix (CIDR) | Enter **1.2.3.0/25**. |
| ROA expiration date | Enter your ROA expiration date in the **yyyymmdd** format. |
| Signed message | Paste in the output of **$byoipauthsigned** from the pre-provisioning section. |
| Availability Zones | Select **Zone-redundant**. |

After creation, go through the flow a second time for another regional prefix in a new region.

| Setting | Value |
| --- | --- |
| **Project details** |  |
| Subscription | Select your subscription |
| Resource group | Select **Create new**.</br> Enter **myResourceGroup**.</br> Select **OK**. |
| **Instance details** |  |
| Name | Enter **myCustomIPRegionalPrefix2**. |
| Region | Select **East US 2**. |
| IP Version | Select IPv4. |
| IP prefix range | Select Regional. |
| Custom IP prefix parent | Select myCustomIPGlobalPrefix (1.2.3.0/24) from the drop-down menu. |
| Regional IPv4 Prefix (CIDR) | Enter **1.2.3.128/25**. |
| ROA expiration date | Enter your ROA expiration date in the **yyyymmdd** format. |
| Signed message | Paste in the output of **$byoipauthsigned** from the pre-provisioning section. |
| Availability Zones | Select Zone **3**. |

> **Important:**
> After the regional custom IP prefix is in a "Provisioned" state, a child public IP prefix can be created. These public IP prefixes and any public IP addresses can be attached to networking resources. For example, virtual machine network interfaces or load balancer front ends. The IPs won't be advertised and therefore won't be reachable. For more information on a migration of an active prefix, see [Manage a custom IP prefix](manage-custom-ip-address-prefix.md).

## Create a public IP prefix from regional custom IP prefix

When you create a prefix, you must create static IP addresses from the prefix. In this section, you create a static IP address from the prefix you created earlier.

1. In the search box at the top of the portal, enter **Custom IP**.

2. In the search results, select **Custom IP Prefixes**.

3. In **Custom IP Prefixes**, select **myCustomIPPrefix**.

4. In **Overview** of **myCustomIPPrefix**, select **+ Add a public IP prefix**.

5. Enter or select the following information in the **Basics** tab of **Create a public IP prefix**.

    | Setting | Value |
    | --- | --- |
    | **Project details** |  |
    | Subscription | Select your subscription. |
    | Resource group | Select **myResourceGroup**. |
    | **Instance details** |  |
    | Name | Enter **myPublicIPPrefix**. |
    | Region | Select **West US 2**. The region of the public IP prefix must match the region of the regional custom IP prefix. |
    | IP version | Select **IPv4**. |
    | Prefix ownership | Select **Custom prefix**. |
    | Custom IP prefix | Select **myCustomIPRegionalPrefix1**. |
    | Prefix size | Select a prefix size. The size can be as large as the regional custom IP prefix. |

6. Select **Review + create**, and then **Create** on the following page.

7. Repeat steps 1-3 to return to the **Overview** page for **myCustomIPPrefix**. You see **myPublicIPPrefix** listed under the **Associated public IP prefixes** section. You can now allocate standard SKU public IP addresses from this prefix. For more information, see [Create a static public IP address from a prefix](manage-public-ip-address-prefix.md#create-a-static-public-ip-address-from-a-prefix).

### Commission the custom IP address prefixes

When commissioning custom IP prefixes using this model, the global and regional prefixes are treated separately. In other words, commissioning a regional custom IP prefix isn't connected to commissioning the global custom IP prefix.

Diagram of custom IPv4 prefix showing parent prefix and child prefixes across multiple regions.

The safest strategy for range migrations is as follows:
1. Provision all required regional custom IP prefixes in their respective regions. Create public IP prefixes and public IP addresses and attach to resources.
2. Commission each regional custom IP prefix and test connectivity to the IPs within the region. Repeat for each regional custom IP prefix.
3. Commission the global custom IP prefix, which advertises the larger range to the Internet. Complete this step only after verifying all regional custom IP prefixes (and derived prefixes/IPs) work as expected.

To commission a custom IP prefix (regional or global) using the portal:

1. In the search box at the top of the portal, enter **Custom IP** and select **Custom IP Prefixes**.

2. Verify the custom IP prefix is in a **Provisioned** state.

3. In **Custom IP Prefixes**, select the desired custom IP prefix.

4. In **Overview** page of the custom IP prefix, select the **Commission** button near the top of the screen. If the range is global, it begins advertising from the Microsoft WAN. If the range is regional, it advertises only from the specific region.

> **Note:**
> The estimated time to fully complete the commissioning process for a custom IP global prefix is 3-4 hours. The estimated time to fully complete the commissioning process for a custom IP regional prefix is 30 minutes.

It's possible to commission the global custom IP prefix before the regional custom IP prefixes. Doing this advertises the global range to the Internet before the regional prefixes are ready so it's not recommended for migrations of active ranges. You can decommission a global custom IP prefix while there are still active (commissioned) regional custom IP prefixes. Also, you can decommission a regional custom IP prefix while the global prefix is still active (commissioned).


> **Important:**
> As the global custom IP prefix transitions to a **Commissioned** state, the range is being advertised with Microsoft from the local Azure region and globally to the Internet by Microsoft's wide area network under Autonomous System Number (ASN) 8075. Advertising this same range to the Internet from a location other than Microsoft at the same time could potentially create BGP routing instability or traffic loss. For example, a customer on-premises building. Plan any migration of an active range during a maintenance period to avoid impact.


# [Unified model](#tab/unified/azurecli)

The following steps display the procedure for provisioning a sample customer range (1.2.3.0/24) to the US West 2 region.

> **Note:**
> Clean up or delete steps aren't shown on this page given the nature of the resource. For information on removing a provisioned custom IP prefix, see [Manage custom IP prefix](manage-public-ip-address-prefix.md).

### Create a resource group and specify the prefix and authorization messages

Create a resource group in the desired location for provisioning the BYOIP range.

```azurecli-interactive
  az group create \
    --name myResourceGroup \
    --location westus2
```
### Provision a unified custom IP address prefix
The following command creates a custom IP prefix in the specified region and resource group. Specify the exact prefix in CIDR notation as a string to ensure there's no syntax error. For the `--authorization-message` parameter, use the variable **$byoipauth** that contains your subscription ID, prefix to be provisioned, and expiration date matching the Validity Date on the ROA. Ensure the format is in that order. Use the variable **$byoipauthsigned** for the `--signed-message` parameter created in the certificate readiness section.

```azurecli-interactive
  byoipauth="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|1.2.3.0/24|yyyymmdd"
  
  az network custom-ip prefix create \
    --name myCustomIpPrefix \
    --resource-group myResourceGroup \
    --location westus2 \
    --cidr ‘1.2.3.0/24’ \
    --zone 1 2 3
    --authorization-message $byoipauth \
    --signed-message $byoipauthsigned
```
The range is pushed to the Azure IP Deployment Pipeline. The deployment process is asynchronous. To determine the status, execute the following command:   

 ```azurecli-interactive
  az network custom-ip prefix show \
    --name myCustomIpPrefix \
    --resource-group myResourceGroup
```
Sample output is shown below, with some fields removed for clarity:

```
{
  "cidr": "1.2.3.0/24",
  "commissionedState": "Provisioning",
  "id": "/subscriptions/xxxx/resourceGroups/myResourceGroup/providers/Microsoft.Network/customIPPrefixes/myCustomIpPrefix",
  "location": "westus2",
  "name": myCustomIpPrefix,
  "resourceGroup": "myResourceGroup",
}
```

The **CommissionedState** field should show the range as **Provisioning** initially, followed in the future by **Provisioned**.

> **Note:**
> The estimated time to complete the provisioning process is 30 minutes.

> **Important:**
> After the custom IP prefix is in a **Provisioned** state, a child public IP prefix can be created. These public IP prefixes and any public IP addresses can be attached to networking resources. For example, virtual machine network interfaces or load balancer front ends. The IPs won't be advertised and therefore won't be reachable. For more information on a migration of an active prefix, see [Manage a custom IP prefix](manage-public-ip-address-prefix.md).

### Commission the unified custom IP address prefix

When the custom IP prefix is in **Provisioned** state, the following command updates the prefix to begin the process of advertising the range from Azure.

```azurecli-interactive
az network custom-ip prefix update \
    --name myCustomIpPrefix \
    --resource-group myResourceGroup \
    --state commission 
```

As before, the operation is asynchronous. Use [az network custom-ip prefix show](https://learn.microsoft.com/cli/azure/network/custom-ip/prefix#az-network-custom-ip-prefix-show) to retrieve the status. The **CommissionedState** field will initially show the prefix as **Commissioning**, followed in the future by **Commissioned**. The advertisement rollout isn't completed all at once. The range is partially advertised while still in the **Commissioning** status.

> **Note:**
> The estimated time to fully complete the commissioning process is 3-4 hours.

> **Important:**
> As the custom IP prefix transitions to a **Commissioned** state, the range is being advertised with Microsoft from the local Azure region and globally to the Internet by Microsoft's wide area network under Autonomous System Number (ASN) 8075. Advertising this same range to the Internet from a location other than Microsoft at the same time could potentially create BGP routing instability or traffic loss. For example, a customer on-premises building. Plan any migration of an active range during a maintenance period to avoid impact. Additionally, you could take advantage of the regional commissioning feature to put a custom IP prefix into a state where it is only advertised within the Azure region it is deployed in--see [Manage a custom IP address prefix (BYOIP)](manage-custom-ip-address-prefix.md) for more information.

# [Global/Regional Model)](#tab/globalregional/azurecli)

The following steps display the modified steps for provisioning a sample global (parent) IP range (1.2.3.0/4) and regional (child) IP ranges to the US West 2 and US East 2 Regions.

> **Note:**
> Clean up or delete steps aren't shown on this page given the nature of the resource. For information on removing a provisioned custom IP prefix, see [Manage custom IP prefix](manage-public-ip-address-prefix.md).

### Create a resource group and specify the prefix and authorization messages

Create a resource group in the desired location for provisioning the global range resource. Although the global range will be associated with a region, the prefix will be advertised by the Microsoft WAN to the Internet globally.

```azurecli-interactive
  az group create \
    --name myResourceGroup \
    --location westus2
```

### Provision a global custom IP address prefix

The following command creates a custom IP prefix in the specified region and resource group. Specify the exact prefix in CIDR notation as a string to ensure there's no syntax error. No zonal properties are provided because the global range isn't associated with any particular region (and therefore no regional availability zones). The global custom IP prefix resource will still sit in a region in your subscription; this has no bearing on how the range will be advertised by Microsoft.

```azurecli-interactive
  byoipauth="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|1.2.3.0/24|yyyymmdd"
  
  az network custom-ip prefix create \
    --name myCustomIPGlobalPrefix \
    --resource-group myResourceGroup \
    --location westus2 \
    --cidr ‘1.2.3.0/24’ \
    --authorization-message $byoipauth \
    --signed-message $byoipauthsigned
    --isparent
```

### Provision regional custom IP address prefixes

After the global custom IP prefix is in a **Provisioned** state, regional custom IP prefixes can be created. These ranges must always be of size /64 to be considered valid. The ranges can be created in any region (it doesn't need to be the same as the global custom IP prefix), keeping in mind any geolocation restrictions associated with the original global range. The "children" custom IP prefixes advertise from the region they're created in. Because the validation is only done for global custom IP prefix provision, no Authorization or Signed message is required (but availability zones can be utilized).

```azurecli-interactive
  az network custom-ip prefix create \
    --name myCustomIPRegionalPrefix1 \
    --resource-group myResourceGroup \
    --location westus2 \
    --cidr ‘1.2.3.0/25’ \
    --zone 1 2 3 \
    --cip-prefix-parent myCustomIPGlobalPrefix

  az network custom-ip prefix create \
    --name myCustomIPRegionalPrefix2 \
    --resource-group myResourceGroup \
    --location westus2 \
    --cidr ‘1.2.3.128/25’ \
    --zone 3
    --cip-prefix-parent myCustomIPGlobalPrefix
```

After the regional custom IP prefix is in a **Provisioned** state, public IP prefixes can be derived from the regional custom IP prefix. These public IP prefixes and any public IP addresses derived from them can be attached to networking resources, though they aren't yet being advertised.

### Commission the custom IP address prefixes

When commissioning custom IP prefixes using this model, the global and regional prefixes are treated separately. In other words, commissioning a regional custom IP prefix isn't connected to commissioning the global custom IP prefix.

Diagram of custom IPv4 prefix showing parent prefix and child prefixes across multiple regions.

The safest strategy for range migrations is as follows:
1. Provision all required regional custom IP prefixes in their respective regions. Create public IP prefixes and public IP addresses and attach to resources.
2. Commission each regional custom IP prefix and test connectivity to the IPs within the region. Repeat for each regional custom IP prefix.
3. Commission the global custom IP prefix, which advertises the larger range to the Internet. Complete this step only after verifying all regional custom IP prefixes (and derived prefixes/IPs) work as expected.

Using the previous example ranges, the command sequence would be:

```azurecli-interactive
az network custom-ip prefix update \
    --name myCustomIPRegionalPrefix \
    --resource-group myResourceGroup \
    --state commission 

az network custom-ip prefix update \
    --name myCustomIPRegionalPrefix2 \
    --resource-group myResourceGroup \
    --state commission 
```
Followed by:

```azurecli-interactive
az network custom-ip prefix update \
    --name myCustomIPGlobalPrefix \
    --resource-group myResourceGroup \
    --state commission 
```

> **Note:**
> The estimated time to fully complete the commissioning process for a custom IP global prefix is 3-4 hours. The estimated time to fully complete the commissioning process for a custom IP regional prefix is 30 minutes.

It's possible to commission the global custom IP prefix before the regional custom IP prefixes. Doing this advertises the global range to the Internet before the regional prefixes are ready so it's not recommended for migrations of active ranges. You can decommission a global custom IP prefix while there are still active (commissioned) regional custom IP prefixes. Also, you can decommission a regional custom IP prefix while the global prefix is still active (commissioned).


> **Important:**
> As the global custom IP prefix transitions to a **Commissioned** state, the range is being advertised with Microsoft from the local Azure region and globally to the Internet by Microsoft's wide area network under Autonomous System Number (ASN) 8075. Advertising this same range to the Internet from a location other than Microsoft at the same time could potentially create BGP routing instability or traffic loss. For example, a customer on-premises building. Plan any migration of an active range during a maintenance period to avoid impact.



# [Unified Model](#tab/unified/azurepowershell)

The following steps display the procedure for provisioning a sample customer range (1.2.3.0/24) to the US West 2 region.

> **Note:**
> Clean up or delete steps aren't shown on this page given the nature of the resource. For information on removing a provisioned custom IP prefix, see [Manage custom IP prefix](manage-public-ip-address-prefix.md).

### Create a resource group and specify the prefix and authorization messages

Create a resource group in the desired location for provisioning the BYOIP range. 

```azurepowershell-interactive
$rg =@{
    Name = 'myResourceGroup'
    Location = 'WestUS2'
}
New-AzResourceGroup @rg
```

### Provision a unified custom IP address prefix

The following command creates a custom IP prefix in the specified region and resource group. Specify the exact prefix in CIDR notation as a string to ensure there's no syntax error. For the `-AuthorizationMessage` parameter, substitute your subscription ID, prefix to be provisioned, and expiration date matching the Validity Date on the ROA. Ensure the format is in that order. Use the variable **$byoipauthsigned** for the `-SignedMessage` parameter created in the certificate readiness section.

```azurepowershell-interactive
$prefix =@{
    Name = 'myCustomIPPrefix'
    ResourceGroupName = 'myResourceGroup'
    Location = 'WestUS2'
    CIDR = '1.2.3.0/24'
    AuthorizationMessage = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|1.2.3.0/24|yyyymmdd'
    SignedMessage = $byoipauthsigned
}
$myCustomIpPrefix = New-AzCustomIPPrefix @prefix -Zone 1,2,3
```

The range is pushed to the Azure IP Deployment Pipeline. The deployment process is asynchronous. To determine the status, execute the following command:  

```azurepowershell-interactive
Get-AzCustomIpPrefix -ResourceId $myCustomIpPrefix.Id
```

Here's a sample output with some fields removed for clarity:

```
Name              : myCustomIpPrefix
ResourceGroupName : myResourceGroup
Location          : westus2
Id                : /subscriptions/xxxx/resourceGroups/myResourceGroup/providers/Microsoft.Network/customIPPrefixes/MyCustomIPPrefix
Cidr              : 1.2.3.0/24
Zones             : {1, 2, 3}
CommissionedState : Provisioning
```

The **CommissionedState** field should show the range as **Provisioning** initially, followed in the future by **Provisioned**.

> **Note:**
> The estimated time to complete the provisioning process is 30 minutes.

> **Important:**
> After the custom IP prefix is in a **Provisioned** state, a child public IP prefix can be created. These public IP prefixes and any public IP addresses can be attached to networking resources. For example, virtual machine network interfaces or load balancer front ends. The IPs won't be advertised and therefore won't be reachable. For more information on a migration of an active prefix, see [Manage a custom IP prefix](manage-public-ip-address-prefix.md).

### Commission the unified custom IP address prefix

When the custom IP prefix is in the **Provisioned** state, the following command updates the prefix to begin the process of advertising the range from Azure.

```azurepowershell-interactive
Update-AzCustomIpPrefix -ResourceId $myCustomIPPrefix.Id -Commission
```

As before, the operation is asynchronous. Use [Get-AzCustomIpPrefix](https://learn.microsoft.com/powershell/module/az.network/get-azcustomipprefix) to retrieve the status. The **CommissionedState** field will initially show the prefix as **Commissioning**, followed in the future by **Commissioned**. The advertisement rollout isn't completed all at once. The range is partially advertised while still in the **Commissioning** status.

> **Note:**
> The estimated time to fully complete the commissioning process is 3-4 hours.

> **Important:**
> As the custom IP prefix transitions to a **Commissioned** state, the range is being advertised with Microsoft from the local Azure region and globally to the Internet by Microsoft's wide area network under Autonomous System Number (ASN) 8075. Advertising this same range to the Internet from a location other than Microsoft at the same time could potentially create BGP routing instability or traffic loss. For example, a customer on-premises building. Plan any migration of an active range during a maintenance period to avoid impact. Additionally, you could take advantage of the regional commissioning feature to put a custom IP prefix into a state where it is only advertised within the Azure region it is deployed in. For more information, see [Manage a custom IP address prefix (BYOIP)](manage-public-ip-address-prefix.md).

# [Global/Regional Model](#tab/globalregional/azurepowershell)

The following steps display the modified steps for provisioning a sample global (parent) IP range (1.2.3.0/4) and regional (child) IP ranges to the US West 2 and US East 2 Regions.

> **Note:**
> Clean up or delete steps aren't shown on this page given the nature of the resource. For information on removing a provisioned custom IP prefix, see [Manage custom IP prefix](manage-public-ip-address-prefix.md).

### Create a resource group and specify the prefix and authorization messages

Create a resource group in the desired location for provisioning the global range resource. Although the global range is associated with a region, the prefix is advertised by the Microsoft WAN to the Internet globally.

```azurepowershell-interactive
$rg =@{
    Name = 'myResourceGroup'
    Location = 'USWest2'
}
New-AzResourceGroup @rg
```

### Provision a global custom IP address prefix

The following command creates a custom IP prefix in the specified region and resource group. Specify the exact prefix in CIDR notation as a string to ensure there's no syntax error. No zonal properties are provided because the global range isn't associated with any particular region (and therefore no regional availability zones). The global custom IP prefix resource will still sit in a region in your subscription; this has no bearing on how the range is advertised by Microsoft.

```azurepowershell-interactive
$prefix =@{
    Name = 'myCustomGlobalPrefix'
    ResourceGroupName = 'myResourceGroup'
    Location = 'WestUS2'
    CIDR = '1.2.3.0/24'
    AuthorizationMessage = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx|1.2.3.0/24|yyyymmdd'
    SignedMessage = $byoipauthsigned
}
$myCustomIPGlobalPrefix = New-AzCustomIPPrefix @prefix -IsParent
```
### Provision regional custom IP address prefixes

After the global custom IP prefix is in a **Provisioned** state, regional custom IP prefixes can be created. These ranges must always be of size /64 to be considered valid. The ranges can be created in any region (it doesn't need to be the same as the global custom IP prefix), keeping in mind any geolocation restrictions associated with the original global range. The *child* custom IP prefixes advertise from the region where they're created. Because the validation is only done for global custom IP prefix provision, no Authorization or Signed message is required (but availability zones can be utilized).

```azurepowershell-interactive
$prefix =@{
    Name = 'myCustomIPRegionalPrefix1'
    ResourceGroupName = 'myResourceGroup'
    Location = 'WestUS2'
    CIDR = '1.2.3.0/25'

}
$myCustomIPRegionalPrefix = New-AzCustomIPPrefix @prefix -CustomIpPrefixParent $myCustomIPGlobalPrefix -Zone 1,2,3

$prefix2 =@{
    Name = 'myCustomIPRegionalPrefix2'
    ResourceGroupName = 'myResourceGroup'
    Location = 'EastUS2'
    CIDR = '1.2.3.128/25'
}
$myCustomIPRegionalPrefix2 = New-AzCustomIPPrefix @prefix2 -CustomIpPrefixParent $myCustomIPGlobalPrefix -Zone 3
```

After the regional custom IP prefix is in a **Provisioned** state, public IP prefixes can be derived from the regional custom IP prefix. These public IP prefixes and any public IP addresses derived from them can be attached to networking resources, though they aren't yet being advertised.

### Commission the custom IP address prefixes

When commissioning custom IP prefixes using this model, the global and regional prefixes are treated separately. In other words, commissioning a regional custom IP prefix isn't connected to commissioning the global custom IP prefix.

Diagram of custom IPv4 prefix showing parent prefix and child prefixes across multiple regions.

The safest strategy for range migrations is as follows:
1. Provision all required regional custom IP prefixes in their respective regions. Create public IP prefixes and public IP addresses and attach to resources.
2. Commission each regional custom IP prefix and test connectivity to the IPs within the region. Repeat for each regional custom IP prefix.
3. Commission the global custom IP prefix, which advertises the larger range to the Internet. Complete this step only after verifying all regional custom IP prefixes (and derived prefixes/IPs) work as expected.

With the previous example ranges, the command sequence would be:

```azurepowershell-interactive
Update-AzCustomIpPrefix -ResourceId $myCustomIPRegionalPrefix.Id -Commission
Update-AzCustomIpPrefix -ResourceId $myCustomIPRegionalPrefix2.Id -Commission
``` 
Followed by:

```azurepowershell-interactive
Update-AzCustomIpPrefix -ResourceId $myCustomIPGlobalPrefix.Id -Commission
```
> **Note:**
> The estimated time to fully complete the commissioning process for a custom IP global prefix is 3-4 hours. The estimated time to fully complete the commissioning process for a custom IP regional prefix is 30 minutes.

It's possible to commission the global custom IP prefix before the regional custom IP prefixes. Since this process advertises the global range to the Internet before the regional prefixes are ready, it's not recommended for migrations of active ranges. You can decommission a global custom IP prefix while there are still active (commissioned) regional custom IP prefixes. Also, you can decommission a regional custom IP prefix while the global prefix is still active (commissioned).

> **Important:**
> As the global custom IP prefix transitions to a **Commissioned** state, the range is being advertised with Microsoft from the local Azure region and globally to the Internet by Microsoft's wide area network under Autonomous System Number (ASN) 8075. Advertising this same range to the Internet from a location other than Microsoft at the same time could potentially create BGP routing instability or traffic loss. For example, a customer on-premises building. Plan any migration of an active range during a maintenance period to avoid impact.


> **Important:**
> As the global custom IP prefix transitions to a **Commissioned** state, the range is being advertised with Microsoft from the local Azure region and globally to the Internet by Microsoft's wide area network under Autonomous System Number (ASN) 8075. Advertising this same range to the Internet from a location other than Microsoft at the same time could potentially create BGP routing instability or traffic loss. For example, a customer on-premises building. Plan any migration of an active range during a maintenance period to avoid impact.


---
## Next steps

- To learn about scenarios and benefits of using a custom IP prefix, see [Custom IP address prefix (BYOIP)](custom-ip-address-prefix.md).

- For more information on managing a custom IP prefix, see [Manage a custom IP address prefix (BYOIP)](manage-public-ip-address-prefix.md).
