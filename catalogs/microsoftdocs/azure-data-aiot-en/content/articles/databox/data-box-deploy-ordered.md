---
title: Tutorial to order Azure Data Box | Microsoft Docs
description: In this tutorial, learn about Azure Data Box, a hybrid solution that allows you to import on-premises data into Azure, and how to order Azure Data Box.
services: databox
author: stevenmatthew
ms.service: azure-data-box
ms.topic: tutorial
ms.date: 03/25/2024
ms.author: shaas
zone_pivot_groups: data-box-sku
ms.custom:
  - devx-track-azurepowershell
  - devx-track-azurecli
  - sfi-image-nochange
#Customer intent: As an IT admin, I need to be able to order Data Box to upload on-premises data from my server onto Azure.
# Customer intent: "As an IT admin, I want to order an Azure Data Box to transfer on-premises data to Azure, so that I can efficiently manage and migrate large volumes of data to the cloud."
---
# Tutorial: Order Azure Data Box

**Applies to: dbx**


> **Note:**
> Azure Data Box Heavy has been retired and is no longer available to order. As we expand the availability of next-generation devices across more regions, the Azure Data Box 80 TB device will be retired in those areas. Post-retirement, new orders for the 80 TB device will no longer be accepted, though existing orders will remain supported. 



**Applies to: dbx**

Azure Data Box is a hybrid solution that allows you to import your on-premises data into Azure in a quick, easy, and reliable way. You transfer your data to a Microsoft-supplied storage device with 80 TB of usable capacity, and then ship the device back. This data is then uploaded to Azure.


**Applies to: dbx-ng**

Azure Data Box is a hybrid solution that allows you to import your on-premises data into Azure in a quick, easy, and reliable way. You transfer your data to a Microsoft-supplied storage device with 120 TB or 525 TB of usable capacity, and then ship the device back. This data is then uploaded to Azure.


This tutorial describes how you can order an Azure Data Box. In this tutorial, you learn about:   

> 
>
> * Prerequisites to deploy Data Box
> * Order a Data Box
> * Track the order
> * Cancel the order

> **Note:**
> To get answers to frequently asked questions about Data Box orders and shipments, see [Data Box FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox/data-box-faq.yml).

## Prerequisites

Complete the following configuration prerequisites for the Data Box service and device before you deploy the device:

# [Portal](#tab/portal)

### For the Data Box service


Before you begin, make sure that:

* You have your Microsoft Azure storage account with access credentials, such as storage account name and access key.

* The subscription you use for Data Box service is one of the following types:
  * Microsoft Customer Agreement (MCA) for new subscriptions or Microsoft Enterprise Agreement (EA) for existing subscriptions. Read more about [MCA for new subscriptions](https://www.microsoft.com/licensing/how-to-buy/microsoft-customer-agreement) and [EA subscriptions](https://azure.microsoft.com/pricing/enterprise-agreement/).
  * Cloud Solution Provider (CSP). Learn more about [Azure CSP program](https://learn.microsoft.com/azure/cloud-solution-provider/overview/azure-csp-overview).
    > **Note:**
    > This service is supported for the Azure CSP program in India if you are on the modern billing model. If you are on the legacy billing model as per your agreement, you will not be able to create Data Box orders.
  * Microsoft Azure Sponsorship. Learn more about [Azure sponsorship program](https://azure.microsoft.com/offers/ms-azr-0036p/).
  * Microsoft Partner Network (MPN). Learn more about [Microsoft Partner Network](https://partner.microsoft.com/commercial#).

* Ensure that you have owner or contributor access to the subscription to create a device order.



### For the Data Box device

Before you begin, make sure that:

* You should have a host computer connected to the datacenter network. Data Box will copy the data from this computer. Your host computer must run a supported operating system as described in [Azure Data Box system requirements](data-box-system-requirements.md).

**Applies to: dbx-ng**

* Your datacenter needs to have high-speed network. We strongly recommend that you have at least one 100-GbE connection. If a 100-GbE connection isn't available, you can use a 10-GbE or 1-GbE data link can be used, but copy speeds are impacted.
  


**Applies to: dbx**

* Your datacenter needs to have high-speed network. We strongly recommend that you have at least one 10-GbE connection. If a 10-GbE connection isn't available, 1-GbE data link can be used, but copy speeds are impacted.




# [Azure CLI](#tab/azure-cli)

### For the Data Box service


Before you begin, make sure that:

* You have your Microsoft Azure storage account with access credentials, such as storage account name and access key.

* The subscription you use for Data Box service is one of the following types:
  * Microsoft Customer Agreement (MCA) for new subscriptions or Microsoft Enterprise Agreement (EA) for existing subscriptions. Read more about [MCA for new subscriptions](https://www.microsoft.com/licensing/how-to-buy/microsoft-customer-agreement) and [EA subscriptions](https://azure.microsoft.com/pricing/enterprise-agreement/).
  * Cloud Solution Provider (CSP). Learn more about [Azure CSP program](https://learn.microsoft.com/azure/cloud-solution-provider/overview/azure-csp-overview).
    > **Note:**
    > This service is supported for the Azure CSP program in India if you are on the modern billing model. If you are on the legacy billing model as per your agreement, you will not be able to create Data Box orders.
  * Microsoft Azure Sponsorship. Learn more about [Azure sponsorship program](https://azure.microsoft.com/offers/ms-azr-0036p/).
  * Microsoft Partner Network (MPN). Learn more about [Microsoft Partner Network](https://partner.microsoft.com/commercial#).

* Ensure that you have owner or contributor access to the subscription to create a device order.



### For the Data Box device

Before you begin, make sure that:

* You should have a host computer connected to the datacenter network. Data Box will copy the data from this computer. Your host computer must run a supported operating system as described in [Azure Data Box system requirements](data-box-system-requirements.md).

**Applies to: dbx-ng**

* Your datacenter needs to have high-speed network. We strongly recommend that you have at least one 100-GbE connection. If a 100-GbE connection isn't available, you can use a 10-GbE or 1-GbE data link can be used, but copy speeds are impacted.
  


**Applies to: dbx**

* Your datacenter needs to have high-speed network. We strongly recommend that you have at least one 10-GbE connection. If a 10-GbE connection isn't available, 1-GbE data link can be used, but copy speeds are impacted.




If you don't have an Azure subscription, [create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

You can sign in to Azure and run Azure CLI commands in one of two ways:

* You can install the CLI and run CLI commands locally.
* You can run CLI commands from within the Azure portal, in Azure Cloud Shell.

We use Azure CLI through Windows PowerShell for the tutorial, but you're free to choose either option.

### For Azure CLI

Before you begin, make sure that:

#### Install the CLI locally

* Install [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) version 2.0.67 or later. Or [install using MSI](https://aka.ms/installazurecliwindows) instead.

**Sign in to Azure**

Open up a Windows PowerShell command window and sign in to Azure with the [az sign in](https://learn.microsoft.com/cli/azure/reference-index#az-login) command:

```azurecli
PS C:\Windows> az login
```

The output confirms a successful sign-in:

```output
You have logged in. Now let us find all the subscriptions to which you have access.
[
   {
      "cloudName": "AzureCloud",
      "homeTenantId": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "isDefault": true,
      "managedByTenants": [],
      "name": "My Subscription",
      "state": "Enabled",
      "tenantId": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      "user": {
          "name": "gusp@contoso.com",
          "type": "user"
      }
   }
]
```

**Install the Azure Data Box CLI extension**

Before you can use the Azure Data Box CLI commands, you need to install the extension. Azure CLI extensions give you access to experimental and prerelease commands before shipping as part of the core CLI. For more information about extensions, see [Use extensions with Azure CLI](https://learn.microsoft.com/cli/azure/azure-cli-extensions-overview).

To install the extension for Azure Data Box, run the following command: `az extension add --name databox`:

```azurecli

    PS C:\Windows> az extension add --name databox
```

If the extension is installed successfully, the following output is displayed:

```output
    The installed extension 'databox' is experimental and not covered by customer support. Please use with discretion.
    PS C:\Windows>

    # az databox help

    PS C:\Windows> az databox -h

    Group
        az databox

    Subgroups:
        job [Experimental] : Commands to manage databox job.

    For more specific examples, use: az find "az databox"

        Please let us know how we are doing: https://aka.ms/clihats
```

#### Use Azure Cloud Shell

You can use [Azure Cloud Shell](https://shell.azure.com/), an Azure hosted interactive shell environment, through your browser to run CLI commands. Azure Cloud Shell supports Bash or Windows PowerShell with Azure services. The Azure CLI is preinstalled and configured to use with your account. Select the Cloud Shell button on the menu in the upper-right section of the Azure portal:

Cloud Shell menu selection

The button launches an interactive shell that you can use to run the steps outlined in this how-to article.

# [PowerShell](#tab/azure-ps)

### For the Data Box service


Before you begin, make sure that:

* You have your Microsoft Azure storage account with access credentials, such as storage account name and access key.

* The subscription you use for Data Box service is one of the following types:
  * Microsoft Customer Agreement (MCA) for new subscriptions or Microsoft Enterprise Agreement (EA) for existing subscriptions. Read more about [MCA for new subscriptions](https://www.microsoft.com/licensing/how-to-buy/microsoft-customer-agreement) and [EA subscriptions](https://azure.microsoft.com/pricing/enterprise-agreement/).
  * Cloud Solution Provider (CSP). Learn more about [Azure CSP program](https://learn.microsoft.com/azure/cloud-solution-provider/overview/azure-csp-overview).
    > **Note:**
    > This service is supported for the Azure CSP program in India if you are on the modern billing model. If you are on the legacy billing model as per your agreement, you will not be able to create Data Box orders.
  * Microsoft Azure Sponsorship. Learn more about [Azure sponsorship program](https://azure.microsoft.com/offers/ms-azr-0036p/).
  * Microsoft Partner Network (MPN). Learn more about [Microsoft Partner Network](https://partner.microsoft.com/commercial#).

* Ensure that you have owner or contributor access to the subscription to create a device order.



### For the Data Box device

Before you begin, make sure that:

* You should have a host computer connected to the datacenter network. Data Box will copy the data from this computer. Your host computer must run a supported operating system as described in [Azure Data Box system requirements](data-box-system-requirements.md).

**Applies to: dbx-ng**

* Your datacenter needs to have high-speed network. We strongly recommend that you have at least one 100-GbE connection. If a 100-GbE connection isn't available, you can use a 10-GbE or 1-GbE data link can be used, but copy speeds are impacted.
  


**Applies to: dbx**

* Your datacenter needs to have high-speed network. We strongly recommend that you have at least one 10-GbE connection. If a 10-GbE connection isn't available, 1-GbE data link can be used, but copy speeds are impacted.




### For Azure PowerShell

Before you begin, make sure that you:

* Install Windows PowerShell 6.2.4 or higher.
* Install Azure PowerShell (AZ) module.
* Install Azure Data Box (Az.DataBox) module.
* Sign in to Azure.

#### Install Azure PowerShell and modules locally

**Install or upgrade Windows PowerShell**

You need to have Windows PowerShell version 6.2.4 or higher installed. To find out what version of PowerShell is installed, run: `$PSVersionTable`.

The following sample output confirms that version 6.2.3 is installed:

```azurepowershell
    PS C:\users\gusp> $PSVersionTable
    
    Name                           Value
    ----                           -----
    PSVersion                      6.2.3
    PSEdition                      Core
    GitCommitId                    6.2.3
    OS                             Microsoft Windows 10.0.18363
    Platform                       Win32NT
    PSCompatibleVersions           {1.0, 2.0, 3.0, 4.0…}
    PSRemotingProtocolVersion      2.3
    SerializationVersion           1.1.0.1
    WSManStackVersion              3.0
```

If your version is lower than 6.2.4, you need to upgrade your version of Windows PowerShell. To install the latest version of Windows PowerShell, see [Install Azure PowerShell](https://learn.microsoft.com/powershell/scripting/install/installing-powershell).

**Install Azure PowerShell and Data Box modules**

You need to install the Azure PowerShell modules to use Azure PowerShell to order an Azure Data Box. To install the Azure PowerShell modules:

1. Install the [Az PowerShell module](https://learn.microsoft.com/powershell/azure/new-azureps-module-az).
2. Then install Az.DataBox using the command `Install-Module -Name Az.DataBox`.

```azurepowershell
PS C:\PowerShell\Modules> Install-Module -Name Az.DataBox
PS C:\PowerShell\Modules> Get-InstalledModule -Name "Az.DataBox"

Version              Name                                Repository           Description
-------              ----                                ----------           -----------
0.1.1                Az.DataBox                          PSGallery            Microsoft Azure PowerShell - DataBox ser…
```

#### Sign in to Azure

Open up a Windows PowerShell command window and sign in to Azure with the [Connect-AzAccount](https://learn.microsoft.com/powershell/module/az.accounts/Connect-AzAccount) command:

```azurepowershell
PS C:\Windows> Connect-AzAccount
```

The following sample output confirms a successful sign-in:

```output
WARNING: To sign in, use a web browser to open the page https://microsoft.com/devicelogin and enter the code FSBFZMBKC to authenticate.

Account              SubscriptionName                          TenantId                             Environment
-------              ----------------                          --------                             -----------
gusp@contoso.com     MySubscription                            aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa AzureCloud

PS C:\Windows\System32>
```

For detailed information on how to sign in to Azure using Windows PowerShell, see [Sign in with Azure PowerShell](https://learn.microsoft.com/powershell/azure/authenticate-azureps).

---

## Order Data Box

To order a device, perform the following steps:

# [Portal](#tab/portal)


To order and device, perform the following steps in the Azure portal:

1. Use your Microsoft Azure credentials to sign in at this URL: [https://portal.azure.com](https://portal.azure.com).
2. Select **+ Create a resource** and search for *Azure Data Box*. Select **Azure Data Box**.

    Screenshot of the New section of the Azure portal with Azure Data Box in the search box. The Azure Data Box entry is highlighted.

3. Select **Create**.  

   Screenshot of Azure Data Box section of the Azure portal. The Create option is highlighted.

4. Check whether Data Box service is available in your region. Enter or select the following information, and then select **Apply**.

    | Setting | Value |
    | --- | --- |
    | Transfer type | Select **Import to Azure**. |
    | Subscription | Select an Enterprise Agreement (EA), Cloud Solution Provider (CSP), or Azure sponsorship subscription for Data Box service. <br> The subscription is linked to your billing account. |
    | Resource group | Select an existing resource group. A resource group is a logical container for the resources that can be managed or deployed together. |
    | Source country/region | Select the country/region where your data currently resides. |
    | Destination Azure region | Select the Azure region where you want to transfer data. <br> For more information, see [region availability for Data Box and Data Box Next Gen](https://learn.microsoft.com/azure/databox/data-box-overview?pivots=dbx-ng#region-availability) or [region availability for Data Box Heavy](data-box-heavy-overview.md#region-availability).<br> If the selected source and destination regions cross international country/region borders, check [Cross region transfer options](https://learn.microsoft.com/azure/databox/data-box-overview?pivots=dbx-ng#cross-region-data-transfer-for-data-box-devices) |

    Screenshot of options to select the Transfer Type, Subscription, Resource Group, and source and destination to start a Data Box order in the Azure portal.
   
**Applies to: dbx**


5. Select the **Data Box** product to order, either Data Box, as shown in the provided example, or Data Box Heavy.

    The maximum usable capacity for a single Data Box order is 80 TB. The maximum usable capacity for a single Data Box Heavy order is 770 TB. You can create multiple orders to accommodate larger data sizes.

    
    You can't select either Data Box or Data Box Heavy if:

    - Your selected source and destination regions cross international country/region boundaries.

      To transfer your data across country/region borders, check [Cross region transfer options](https://learn.microsoft.com/azure/databox/data-box-overview?pivots=dbx-ng#cross-region-data-transfer-for-data-box-devices). 

    - Your Azure subscription doesn't support the Data Box product. In some cases, your subscription might not support a Data Box product in a specific country/region.
    
    If you select **Data Box Heavy**, the Data Box team checks device availability within your region and notifies you when you can continue placing the order.

    Screenshot showing the screen for selecting an Azure Data Box product. The Select button for Data Box is highlighted.


**Applies to: dbx-ng**


5. Select the **Data Box Next Gen** product to order, either Data Box 120, as shown in the provided example, or Data Box 525.

    The maximum usable capacity for a single Data Box order is 120 TB or 525 TB depending on the device. You can create multiple orders to accommodate larger data sizes.

    
    You can't select either Data Box 120 or Data Box 525 if:

    - Your Azure subscription doesn't support the Data Box product. In some cases, your subscription might not support a Data Box product in a specific country/region.
    
    Screenshot showing the screen for selecting an Azure Data Box product. The Select button for Data Box is highlighted.



6. In **Order**, go to the **Basics** tab. Enter or select the following information. Then select **Next: Data destination>**.

    | Setting | Value |
    | --- | --- |
    | Subscription | The subscription is automatically populated based on your earlier selection. |
    | Resource group | The resource group you selected previously. |
    | Import order name | Provide a friendly name to track the order. <ul><li>The name can have between 3 to 24 characters that can be a letter, number, or hyphen.</li><li>The name must start and end with a letter or a number.</li></ul> |

    Screenshot showing the Basics screen for a Data Box order with example entries. 'The Basics' tab and 'Next: Data destination' button are highlighted.

7. On the **Data destination** screen, select the **Data destination** - either storage accounts or managed disks.

    The **Data destination** tab changes based on your selected destination. See either [To use storage accounts](#to-use-storage-accounts) or [To use managed disks](#to-use-managed-disks) in the following section for instructions.

    #### To use storage accounts

    Select **storage account(s)** as the storage destination. The following screen is displayed.

    Screenshot of the Data Destination tab for a Data Box order with a Storage Accounts destination. The Storage Accounts storage destination is highlighted.

    Based on the specified Azure region, select one or more storage accounts from the filtered list of existing storage accounts. Your Data Box can be linked with up to 10 storage accounts. You can also create a new **General-purpose v1**, **General-purpose v2**, or **Blob storage account**.

    - If you select Azure Premium FileStorage accounts, the provisioned quota on the storage account share increases to the size of data being uploaded to the file shares. After the quota is increased, it isn't adjusted again, for example, if for some reason the Data Box can't upload your data.

      This quota is used for billing. After your data is uploaded to the datacenter, you should adjust the quota to meet your needs. For more information, see [Understanding billing](../storage/files/understanding-billing.md).

    - If you're using a **General Purpose v1**, **General Purpose v2**, or **Blob** storage account, the **Enable copy to archive** option is shown. Enabling **Copy to archive** allows you to send your blobs to the archive tier automatically. Any data uploaded to the archive tier remains offline and needs to be rehydrated before it can be read or modified.
    
        When **Copy to archive** is enabled, an extra `Archive` share is available during the copy process. The extra share is available for [SMB, NFS, REST, and data copy service](data-box-deploy-copy-data.md) methods. 

        Screenshot of Enable copy to archive option.

    > **Note:**
    > Storage accounts with virtual networks are supported. To allow the Data Box service to work with secured storage accounts, enable the trusted services within the storage account network firewall settings. For more information, see how to [Add Azure Data Box as a trusted service](../storage/common/storage-network-security.md#exceptions).

    #### To use managed disks

    When using Data Box to create **Managed disk(s)** from on-premises virtual hard disks (VHDs), you also need to provide the following information:

    | Setting | Value |
    | --- | --- |
    | Resource groups | Create new resource groups if you intend to create managed disks from on-premises VHDs. You can use an existing resource group only if the resource group was created previously when creating a Data Box order for managed disks by the Data Box service. <br> Specify multiple resource groups separated by semi-colons. A maximum of 10 resource groups are supported. |

    Screenshot of the Data Destination tab for a Data Box order with a Managed Disks destination. The Data Destination tab, Managed Disks, and Next: Security buttons are highlighted.

    The storage account specified for managed disks is used as a staging storage account. The Data Box service uploads the VHDs as page blobs to the staging storage account before converting the page blobs to managed disks and moving them to the resource groups. For more information, see [Verify data upload to Azure](data-box-deploy-picked-up.md#verify-data-has-uploaded-to-azure).

    > **Note:**
    > Data Box supports copying only 1 MiB aligned, fixed-size `.vhd` files for creating managed disks. Dynamic VHDs, differencing VHDs, `.vmdk` or `.vhdx` files are not supported.
    >
    > If a page blob isn't successfully converted to a managed disk, it stays in the storage account and you're charged for storage.

8. Select **Next: Security>** to continue.

    The **Security** screen lets you use your own encryption key and your own device and share passwords, and choose to use double encryption.

    All settings on the **Security** screen are optional. If you don't change any settings, the default settings are applied.

    Screenshot of the Security tab for a Data Box import Order. The Security tab is highlighted.

9. If you want to use your own customer-managed key to protect the unlock passkey for your new resource, expand **Encryption type**.

    Configuring a customer-managed key for your Azure Data Box is optional. By default, Data Box uses a Microsoft managed key to protect the unlock passkey.

    A customer-managed key doesn't affect how data on the device is encrypted. The key is only used to encrypt the device unlock passkey.

    If you don't want to use a customer-managed key, skip to Step 15.

    Screenshot of Security tab in the Data Box Order wizard. Encryption Type settings are expanded and highlighted.
    
10. If you want to use your own customer-managed key to protect the unlock passkey for your new resource, expand **Encryption type**.

    To use a customer-managed key, select **Customer managed key** as the key type. Then choose **Select a key vault and key**.
   
    Screenshot of Encryption Type settings on the Security tab for a Data Box order. The 'Select a key and key vault' link is highlighted.

11. On the **Select key from Azure Key Vault** pane:

    - The **Subscription** is automatically populated.

    - For **Key vault**, you can select an existing key vault from the dropdown list.

      Screenshot of Encryption type settings on the Security tab for a Data Box order. The 'Customer managed key' option and the 'Select a key and key vault' link are selected.

      Or select **Create new key vault** if you want to create a new key vault. 
    
      Screenshot of Encryption type settings on the Security tab for a Data Box order. The 'Create new key vault' link is highlighted.

      Then, on the **Create key vault** screen, enter the resource group and a key vault name. Ensure that **Soft delete** and **Purge protection** are enabled. Accept all other defaults, and select **Review + Create**.

      Screenshot of the 'Create Key Vault' screen for a Data Box order. Resource Group and Key Vault Name are highlighted. Soft-Delete and Purge Protection are enabled.

      Review the information for your key vault, and select **Create**. Wait for a couple minutes for key vault creation to complete.

      Screenshot of the Review Plus Create tab of the Create Key Vault wizard for Azure. The Create button is highlighted.

12. The **Select a key** pane displays your selected key vault.

    Screenshot of the 'Select a key' screen in Azure Key Vault. The Key Vault field is highlighted.

    If you want to create a new key, select **Create new key**. You must use an RSA key. The size can be 2048 or greater. Enter a name for your new key, accept the other defaults, and select **Create**.

      Screenshot of the 'Create a Key' screen in Azure Key Vault with a key name entered. The Name field and the Create button are highlighted.

      You're notified when the key is created in your key vault. Your new key is selected within the **Select a key** pane.

13. Select the **Version** of the key to use, and then choose **Select**.

    Screenshot of the 'Create a Key' screen in Azure Key Vault. The Version field is highlighted, with available versions displayed.

    If you want to create a new key version, select **Create new version**.

    Screenshot of the Create A Key screen in Azure Key Vault. The Create New Version link is highlighted.

    Choose settings for the new key version, and select **Create**.

    Screenshot of the Create a Key dialog box in Azure Key Vault with example field settings. The Create button is highlighted.

    The **Encryption type** settings on the **Security** screen show your key vault and key.

    Screenshot of the Security tab for a Data Box import order. A key vault and key are highlighted in the Encryption type settings.

14. Select a user identity with which to manage access to this resource. Choose **Select a user identity**. In the panel on the right, select the subscription and the managed identity to use. Then choose **Select**.

    A user-assigned managed identity is a stand-alone Azure resource that can be used to manage multiple resources. For more information, see [Managed identity types](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md).  

    If you need to create a new managed identity, follow the guidance in [Create, list, delete, or assign a role to a user-assigned managed identity using the Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/how-to-manage-ua-identity-portal.md).
    
    Screenshot of Security tab showing 'Select user assigned management identity' panel for a Data Box order. Subscription and Selected Identity fields are highlighted.

    The user identity is shown in **Encryption type** settings.

    Screenshot of the Security tab for a Data Box import order. A selected User Identify is highlighted in the Encryption Type settings.

    > **Important:**
    > If you use a customer-managed key, you must enable the `Get`, `UnwrapKey`, and `WrapKey` permissions on the key. Without these permissions, order creation will fail. They're also needed during data copy. To set the permissions in Azure CLI, see [az keyvault set-policy](https://learn.microsoft.com/cli/azure/keyvault#az-keyvault-set-policy).

15. The system-generated passwords are secure, and are recommended unless your organization requires otherwise.

    Screenshot of expanded 'Bring your own password' on the Security tab for a Data Box order. Security tab and password options are highlighted.

If you don't want to use the system-generated passwords that Azure Data Box uses by default, expand **Bring your own password** on the **Security** screen.
    
- To use your own password for your new device, by **Set preference for the device password**, select **Use your own password**, and type a password that meets the security requirements.
     
     The password must be alphanumeric and contain between 12 to 15 characters. It must also contain at least one uppercase letter, one lowercase letter, one special character, and one number.

     - Allowed special characters: @ # - $ % ^ ! + = ; : _ ( )
     - Characters not allowed: I i L o O 0
   
     Screenshot of 'Bring your own password' options on Security tab for a Data Box order. The Use Your Own Password option and Device Password option are highlighted.

 - To use your own passwords for shares:

   1. By **Set preference for share passwords**, select **Use your own passwords** and then **Select passwords for the shares**.
     
       Screenshot of options for using your own share passwords on Security tab for a Data Box order. Two options, Use Your Own Passwords and Select Passwords for the Shares, are highlighted.

    1. Type a password for each storage account in the order. The password is used on all shares for the storage account.
    
       The password must be alphanumeric and contain between 12 to 64 characters. It must also contain at least one uppercase letter, one lowercase letter, one special character, and one number.

       - Allowed special characters: @ # - $ % ^ ! + = ; : _ ( )
       - Characters not allowed: I i L o O 0
     
    1. To use the same password for all of the storage accounts, select **Copy to all**. 

    1. When you finish, select **Save**.
     
       Screenshot of Set Share Passwords screen for a Data Box order. The Copy To All link and the Save button are highlighted.

    On the **Security** screen, you can use **View or change passwords** to change the passwords.

16. In **Security**, if you want to enable software-based double encryption, expand **Double-encryption (for highly secure environments)**, and select **Enable double encryption for the order**.

    Screenshot of Double Encryption options on the Security tab for a Data Box order. The Enable Double Encryption For The Order option and the Next: Contact Details button are highlighted.

    The software-based encryption is performed in addition to the  AES-256 bit encryption of the data on the Data Box.

    > **Note:**
    > Enabling this option could make order processing and data copy take longer. You can't change this option after you create your order.

    Select **Next: Contact details>** to continue.

17. In **Contact details**, select **+ Add Address**.

    Screenshot of Contact Details tab for a Data Box order. The Contact Details tab and the Plus Add Address option are highlighted.

18. On the **Add address** screen, provide your familiar and family name, the name and postal address of the company, and a valid phone number. Select **Validate address**. The service validates the address for service availability and notifies you if service is available for that address.

    Screenshot of the Add Address screen for a Data Box order. The Ship using options and the Add shipping address option called out.

    If you selected self-managed shipping, you'll receive an email notification after the order is placed successfully. For more information about self-managed shipping, see [Use self-managed shipping](data-box-portal-customer-managed-shipping.md).

19. Select **Add shipping address** after the shipping details are successfully validated. You're returned to the **Contact details** tab.

20. Beside **Email**, add one or more email addresses. The service sends email notifications regarding any updates to the order status to the specified email addresses.

    We recommend that you use a group email so that you continue to receive notifications if an admin in the group leaves.

    Screenshot showing the Email section of the Contact Details tab for a Data Box order. The area for typing email addresses and the Review Plus Order button are highlighted.

    Select **Review + Order** to continue.
**Applies to: dbx-ng**

21. In **Review + Order**:

    1. Review the information in **Review + Order** related to the order, contact details, notification, and privacy terms. 
    
    1. Check the box corresponding to the agreement to privacy terms. When you select the checkbox, the order information is validated.

    1. Once the order is validated, select **Order**.

        Screenshot of the Review Plus Order tab for a Data Box order. The validation status, terms checkbox, and Order button are highlighted.

    The order takes a few minutes to be created appears similar to the provided example. You can select **Go to resource** to open the order.

    Screenshot of a completed deployment for a Data Box order. The Go To Resource button is highlighted.
    


**Applies to: dbx**


21. In **Review + Order**:

    1. Review the information in **Review + Order** related to the order, contact details, notification, and privacy terms. 
    
    1. Check the box corresponding to the agreement to privacy terms. When you select the checkbox, the order information is validated.

    1. Once the order is validated, select **Order**.

        Screenshot of the Review Plus Order tab for a Data Box order. The validation status, terms checkbox, and Order button are highlighted.

    The order takes a few minutes to be created appears similar to the provided example. You can select **Go to resource** to open the order.

    Screenshot of a completed deployment for a Data Box order. The Go To Resource button is highlighted.
    



# [Azure CLI](#tab/azure-cli)

1. Write down your settings for your Data Box order. These settings include your personal/business information, subscription name, device information, and shipping information. These settings are used as parameters when running the CLI command to create the Data Box order. The following table shows the parameter settings used for `az databox job create`:

   | Setting (parameter) | Description | Sample value |
   | --- | --- | --- |
   | resource-group | Use an existing or create a new one. A resource group is a logical container for the resources that can be managed or deployed together. | "myresourcegroup" |
   | name | The name of the order you're creating. | "mydataboxorder" |
   | contact-name | The name associated with the shipping address. | "Gus Poland" |
   | phone | The phone number of the person or business receiving the order. | "14255551234" |
   | location | The nearest Azure region used to ship the device. | "US West" |
   | sku | The specific Data Box device you're ordering. Valid values are: "DataBox", "DataBoxDisk", and "DataBoxHeavy" | "DataBox" |
   | email-list | The email addresses associated with the order. | "gusp@contoso.com" |
   | street-address1 | The street address to which the order is shipped. | "15700 NE 39th St" |
   | street-address2 | The secondary address information, such as apartment number or building number. | "Building 123" |
   | city | The city to which the device is shipped. | "Redmond" |
   | state-or-province | The state to which the device is shipped. | "WA" |
   | country | The country/region to which the device is shipped. | "United States" |
   | postal-code | The zip code or postal code associated with the shipping address. | "98052" |
   | company-name | The name of your company you work for. | "Contoso, LTD" |
   | storage account | The Azure Storage account from where you want to import data. | "mystorageaccount" |
   | debug | Include debugging information to verbose logging | --debug |
   | help | Display help information for this command. | --help -h |
   | only-show-errors | Only show errors, suppressing warnings. | --only-show-errors |
   | output -o | Sets the output format.  Allowed values: json, jsonc, none, table, tsv, yaml, yamlc. The default value is json. | --output "json" |
   | query | The JMESPath query string. For more information, see [JMESPath](http://jmespath.org/). | --query &lt;string&gt; |
   | verbose | Include verbose logging. | --verbose |

2. In your command-prompt of choice or terminal, run [az data box job create](https://learn.microsoft.com/cli/azure/databox/job#az-databox-job-create) to create your Azure Data Box order.

   ```azurecli
   az databox job create --resource-group <resource-group> --name <order-name> --location <azure-location> --sku <databox-device-type> --contact-name <contact-name> --phone <phone-number> --email-list <email-list> --street-address1 <street-address-1> --street-address2 <street-address-2> --city "contact-city" --state-or-province <state-province> --country <country/region> --postal-code <postal-code> --company-name <company-name> --storage-account "storage-account"
   ```

   The following sample command illustrates the command's usage:

   ```azurecli
   az databox job create --resource-group "myresourcegroup" \
                         --name "mydataboxtest3" \
                         --location "westus" \
                         --sku "DataBox" \
                         --contact-name "Gus Poland" \
                         --phone "14255551234" \
                         --email-list "gusp@contoso.com" \
                         --street-address1 "15700 NE 39th St" \
                         --street-address2 "Bld 25" \
                         --city "Redmond" \
                         --state-or-province "WA" \
                         --country "US" \
                         --postal-code "98052" \
                         --company-name "Contoso" \
                         --storage-account mystorageaccount
   ```

   The following sample output confirms successful job creation:

   ```output
   Command group 'databox job' is experimental and not covered by customer support. Please use with discretion.
   {
     "cancellationReason": null,
     "deliveryInfo": {
        "scheduledDateTime": "0001-01-01T00:00:00+00:00"
   },
   "deliveryType": "NonScheduled",
   "details": null,
   "error": null,
   "id": "/subscriptions/[GUID]/resourceGroups/myresourcegroup/providers/Microsoft.DataBox/jobs/mydataboxtest3",
   "identity": {
     "type": "None"
   },
   "isCancellable": true,
   "isCancellableWithoutFee": true,
   "isDeletable": false,
   "isShippingAddressEditable": true,
   "location": "westus",
   "name": "mydataboxtest3",
   "resourceGroup": "myresourcegroup",
   "sku": {
     "displayName": null,
     "family": null,
     "name": "DataBox"
   },
   "startTime": "2020-06-10T23:28:27.354241+00:00",
   "status": "DeviceOrdered",
   "tags": {},
   "type": "Microsoft.DataBox/jobs"

   }
   PS C:\Windows>

   ```

3. Unless the default output is modified, all Azure CLI commands return a json response. You can change the output format by using the global parameter `--output <output-format>`. Changing the format to "table" improves output readability.

   The following example contains the same command, but with the modified `--output` parameter value to alter the formatted response:

    ```azurecli
    az databox job create --resource-group "myresourcegroup" --name "mydataboxtest4" --location "westus" --sku "DataBox" --contact-name "Gus Poland" --phone "14255551234" --email-list "gusp@contoso.com" --street-address1 "15700 NE 39th St" --street-address2 "Bld 25" --city "Redmond" --state-or-province "WA" --country "US" --postal-code "98052" --company-name "Contoso" --storage-account mystorageaccount --output "table"
   ```

   The following sample response illustrates the modified output format:

   ```output

    Command group 'databox job' is experimental and not covered by customer support. Please use with discretion.
    DeliveryType    IsCancellable    IsCancellableWithoutFee    IsDeletable    IsShippingAddressEditable    Location    Name            ResourceGroup    StartTime                         Status
    --------------  ---------------  -------------------------  -------------  ---------------------------  ----------  --------------  ---------------  --------------------------------  -------------
    NonScheduled    True             True                       False          True                         westus      mydataboxtest4  myresourcegroup  2020-06-18T03:48:00.905893+00:00  DeviceOrdered

    ```

# [PowerShell](#tab/azure-ps)

Do the following steps using Azure PowerShell to order a device:

1. Before creating the import order, fetch your storage account and save the object in a variable.

   ```azurepowershell
    $storAcct = Get-AzStorageAccount -Name "mystorageaccount" -ResourceGroup "myresourcegroup"
   ```

2. Write down your settings for your Data Box order. These settings include your personal/business information, subscription name, device information, and shipping information. These settings are used as parameters when running the PowerShell cmdlet to create the Data Box order. The following table shows the parameter settings used for [New-AzDataBoxJob](https://learn.microsoft.com/powershell/module/az.databox/New-AzDataBoxJob).

    | Setting (parameter) | Description | Sample value |
    | --- | --- | --- |
    | ResourceGroupName [Required] | Use an existing resource group. A resource group is a logical container for the resources that can be managed or deployed together. | "myresourcegroup" |
    | Name [Required] | The name of the order you're creating. | "mydataboxorder" |
    | ContactName [Required] | The name associated with the shipping address. | "Gus Poland" |
    | PhoneNumber [Required] | The phone number of the person or business receiving the order. | "14255551234" |
    | Location [Required] | The nearest Azure region to you that ships your device. | "WestUS" |
    | DataBoxType [Required] | The specific Data Box device you're ordering. Valid values are: "DataBox", "DataBoxDisk", and "DataBoxHeavy" | "DataBox" |
    | EmailId [Required] | The email addresses associated with the order. | "gusp@contoso.com" |
    | StreetAddress1 [Required] | The street address to where the order is shipped. | "15700 NE 39th St" |
    | StreetAddress2 | The secondary address information, such as apartment number or building number. | "Building 123" |
    | StreetAddress3 | The tertiary address information. |  |
    | City [Required] | The city to which the device is shipped. | "Redmond" |
    | StateOrProvinceCode [Required] | The state to which the device is shipped. | "WA" |
    | CountryCode [Required] | The country/region to which the device is shipped. | "United States" |
    | PostalCode [Required] | The zip code or postal code associated with the shipping address. | "98052" |
    | CompanyName | The name of your company you work for. | "Contoso, LTD" |
    | StorageAccountResourceId [Required] | The Azure Storage account ID from where you want to import data. | &lt;AzstorageAccount&gt;.id |

3. Use the [New-AzDataBoxJob](https://learn.microsoft.com/powershell/module/az.databox/New-AzDataBoxJob) cmdlet to create your Azure Data Box order as shown in the following example.

   ```azurepowershell
    PS> $storAcct = Get-AzureStorageAccount -StorageAccountName "mystorageaccount"
    PS> New-AzDataBoxJob -Location "WestUS" \
                         -StreetAddress1 "15700 NE 39th St" \
                         -PostalCode "98052" \
                         -City "Redmond" \
                         -StateOrProvinceCode "WA" \
                         -CountryCode "US" \
                         -EmailId "gusp@contoso.com" \
                         -PhoneNumber 4255551234 \
                         -ContactName "Gus Poland" \
                         -StorageAccount $storAcct.id \
                         -DataBoxType DataBox \
                         -ResourceGroupName "myresourcegroup" \
                         -Name "myDataBoxOrderPSTest"
   ```

   The following sample output confirms job creation:

   ```output
    jobResource.Name     jobResource.Sku.Name jobResource.Status jobResource.StartTime jobResource.Location ResourceGroup
    ----------------     -------------------- ------------------ --------------------- -------------------- -------------
    myDataBoxOrderPSTest DataBox              DeviceOrdered      07-06-2020 05:25:30   westus               myresourcegroup
   ```

---

## Track the order

# [Portal](#tab/portal)

After you place the order, you can track the status of the order from Azure portal. Go to your Data Box order and then go to **Overview** to view the status. The portal shows the order in **Ordered** state.

If the device isn't available, you receive a notification. If the device is available, Microsoft identifies the device and prepares it for shipment. The following actions occur during device preparation:

* SMB shares are created for each storage account associated with the device.
* For each share, access credentials such as username and password are generated.
* The device password is generated. This password is used to unlock the device.
* The device is locked to prevent unauthorized access at any point.

When the device preparation is complete, the portal shows the order in a **Processed** state.

Screenshot of a Data Box order that's been processed.

Microsoft then prepares and dispatches your device via a regional carrier. You receive a tracking number after the device is shipped. The portal shows the order in **Dispatched** state.

Screenshot of a Data Box order that's been dispatched.

# [Azure CLI](#tab/azure-cli)

### Track a single order

To get tracking information about a single, existing Azure Data Box order, run [`az databox job show`](https://learn.microsoft.com/cli/azure/databox/job#az-databox-job-show). The command displays information about the order such as, but not limited to: name, resource group, tracking information, subscription ID, contact information, shipment type, and device sku.

   ```azurecli
   az databox job show --resource-group <resource-group> --name <order-name>
   ```

   The following table shows the parameter information for `az databox job show`:

   | Parameter | Description | Sample value |
   | --- | --- | --- |
   | resource-group [Required] | The name of the resource group associated with the order. A resource group is a logical container for the resources that can be managed or deployed together. | "myresourcegroup" |
   | name [Required] | The name of the order to be displayed. | "mydataboxorder" |
   | debug | Include debugging information to verbose logging | --debug |
   | help | Display help information for this command. | --help -h |
   | only-show-errors | Only show errors, suppressing warnings. | --only-show-errors |
   | output -o | Sets the output format.  Allowed values: json, jsonc, none, table, tsv, yaml, yamlc. The default value is json. | --output "json" |
   | query | The JMESPath query string. For more information, see [JMESPath](http://jmespath.org/). | --query &lt;string&gt; |
   | verbose | Include verbose logging. | --verbose |

   The following example contains the same command, but with the `output` parameter value set to "table":

   ```azurecli
    PS C:\WINDOWS\system32> az databox job show --resource-group "myresourcegroup" \
                                                --name "mydataboxtest4" \
                                                --output "table"
   ```

   The following sample response shows the modified output format:

   ```output
    Command group 'databox job' is experimental and not covered by customer support. Please use with discretion.
    DeliveryType    IsCancellable    IsCancellableWithoutFee    IsDeletable    IsShippingAddressEditable    Location    Name            ResourceGroup    StartTime                         Status
    --------------  ---------------  -------------------------  -------------  ---------------------------  ----------  --------------  ---------------  --------------------------------  -------------
    NonScheduled    True             True                       False          True                         westus      mydataboxtest4  myresourcegroup  2020-06-18T03:48:00.905893+00:00  DeviceOrdered
   ```

> **Note:**
> List order can be supported at subscription level, making the `resource group` parameter optional rather than required.

### List all orders

When ordering multiple devices, you can run [`az databox job list`](https://learn.microsoft.com/cli/azure/databox/job#az-databox-job-list) to view all your Azure Data Box orders. The command lists all orders that belong to a specific resource group. Also displayed in the output: order name, shipping status, Azure region, delivery type, order status. Canceled orders are also included in the list.
The command also displays time stamps of each order.

```azurecli
az databox job list --resource-group <resource-group>
```

The following table shows the parameter information for `az databox job list`:

   | Parameter | Description | Sample value |
   | --- | --- | --- |
   | resource-group [Required] | The name of the resource group that contains the orders. A resource group is a logical container for the resources that can be managed or deployed together. | "myresourcegroup" |
   | debug | Include debugging information to verbose logging | --debug |
   | help | Display help information for this command. | --help -h |
   | only-show-errors | Only show errors, suppressing warnings. | --only-show-errors |
   | output -o | Sets the output format.  Allowed values: json, jsonc, none, table, tsv, yaml, yamlc. The default value is json. | --output "json" |
   | query | The JMESPath query string. For more information, see [JMESPath](http://jmespath.org/). | --query &lt;string&gt; |
   | verbose | Include verbose logging. | --verbose |

   The following example shows the command with the output format specified as "table":

   ```azurecli
    PS C:\WINDOWS\system32> az databox job list --resource-group "GDPTest" --output "table"
   ```

   The following sample response displays the output with modified formatting:

   ```output
   Command group 'databox job' is experimental and not covered by customer support. Please use with discretion.
   CancellationReason                                               DeliveryType    IsCancellable    IsCancellableWithoutFee    IsDeletable    IsShippingAddressEditable    Location    Name                 ResourceGroup    StartTime                         Status
   ---------------------- ----------------------------------------  --------------  ---------------  -------------------------  -------------  ---------------------------  ----------  -------------------  ---------------  --------------------------------  -------------
   OtherReason This was a test order for documentation purposes.    NonScheduled    False            False                      True           False                        westus      gdpImportTest        MyResGrp         2020-05-26T23:20:57.464075+00:00  Cancelled
   NoLongerNeeded This order was created for documentation purposes.NonScheduled    False            False                      True           False                        westus      mydataboxExportTest  MyResGrp         2020-05-27T00:04:16.640397+00:00  Cancelled
   IncorrectOrder                                                   NonScheduled    False            False                      True           False                        westus      mydataboxtest2       MyResGrp         2020-06-10T16:54:23.509181+00:00  Cancelled
                                                                    NonScheduled    True             True                       False          True                         westus      mydataboxtest3       MyResGrp         2020-06-11T22:05:49.436622+00:00  DeviceOrdered
                                                                    NonScheduled    True             True                       False          True                         westus      mydataboxtest4       MyResGrp         2020-06-18T03:48:00.905893+00:00  DeviceOrdered
   PS C:\WINDOWS\system32>
   ```

# [PowerShell](#tab/azure-ps)

### Track a single order

To get tracking information about a single, existing Azure Data Box order, run [Get-AzDataBoxJob](https://learn.microsoft.com/powershell/module/az.databox/Get-AzDataBoxJob). The command displays information about the order such as, but not limited to: name, resource group, tracking information, subscription ID, contact information, shipment type, and device sku.

> **Note:**
> `Get-AzDataBoxJob` is used for displaying both single and multiple orders. The difference is that you specify the order name for single orders.

   ```azurepowershell
    Get-AzDataBoxJob -ResourceGroupName <String> -Name <String>
   ```

   The following table shows the parameter information for `Get-AzDataBoxJob`:

   | Parameter | Description | Sample value |
   | --- | --- | --- |
   | ResourceGroup [Required] | The name of the resource group associated with the order. A resource group is a logical container for the resources that can be managed or deployed together. | "myresourcegroup" |
   | Name [Required] | The name of the order to get information for. | "mydataboxorder" |
   | ResourceId | The ID of the resource associated with the order. |  |

   The following example can be used to retrieve details about a specific order:

   ```azurepowershell
   Get-AzDataBoxJob -ResourceGroupName "myResourceGroup" -Name "myDataBoxOrderPSTest"
   ```

   The following example output indicates that the command was completed successfully:

   ```output
   jobResource.Name     jobResource.Sku.Name jobResource.Status jobResource.StartTime jobResource.Location ResourceGroup
   ----------------     -------------------- ------------------ --------------------- -------------------- -------------
   myDataBoxOrderPSTest DataBox              DeviceOrdered      7/7/2020 12:37:16 AM  WestUS               myResourceGroup
   ```

### List all orders

To view all your Azure Data Box orders, run the [`Get-AzDataBoxJob`](https://learn.microsoft.com/powershell/module/az.databox/Get-AzDataBoxJob) cmdlet. The cmdlet lists all orders that belong to a specific resource group. The resulting output also contains additional data such as order name, shipping status, Azure region, delivery type, order status, and the time stamp associated with each order. Canceled orders are also included in the list. 

The following example can be used to retrieve details about all orders associated to a specific Azure resource group:

```azurepowershell
Get-AzDataBoxJob -ResourceGroupName <String>
```

The following example output indicates that the command was completed successfully:

```output
jobResource.Name     jobResource.Sku.Name jobResource.Status jobResource.StartTime jobResource.Location ResourceGroup
----------------     -------------------- ------------------ --------------------- -------------------- -------------
guspImportTest       DataBox              Cancelled          5/26/2020 11:20:57 PM WestUS               myResourceGroup
mydataboxExportTest  DataBox              Cancelled          5/27/2020 12:04:16 AM WestUS               myResourceGroup
mydataboximport1     DataBox              Cancelled          6/26/2020 11:00:34 PM WestUS               myResourceGroup
myDataBoxOrderPSTest DataBox              Cancelled          7/07/2020 12:37:16 AM WestUS               myResourceGroup
mydataboxtest2       DataBox              Cancelled          6/10/2020 4:54:23  PM WestUS               myResourceGroup
mydataboxtest4       DataBox              DeviceOrdered      6/18/2020 3:48:00  AM WestUS               myResourceGroup
PS C:\WINDOWS\system32>
```

---

## Cancel the order

After placing an order, you can cancel it at any point before the order status is marked processed.

# [Portal](#tab/portal)

To cancel and delete an order using the Azure portal, select **Overview** from within the command bar. To cancel the order, select the **Cancel** option. To delete a canceled order, select the **Delete** option.

# [Azure CLI](#tab/azure-cli)

### Cancel an order

Use the [`az databox job cancel`](https://learn.microsoft.com/cli/azure/databox/job#az-databox-job-cancel) command to cancel a Data Box order. You're required to specify your reason for canceling the order.

   The following table provides parameter information for the `az databox job cancel` command:

   | Parameter | Description | Sample value |
   | --- | --- | --- |
   | resource-group [Required] | The name of the resource group associated with the order to be deleted. A resource group is a logical container for the resources that can be managed or deployed together. | "myresourcegroup" |
   | name [Required] | The name of the order to be deleted. | "mydataboxorder" |
   | reason [Required] | The reason for canceling the order. | "I entered erroneous information and needed to cancel the order." |
   | yes | Don't prompt for confirmation. | --yes (-y) |
   | debug | Include debugging information to verbose logging | --debug |
   | help | Display help information for this command. | --help -h |
   | only-show-errors | Only show errors, suppressing warnings. | --only-show-errors |
   | output -o | Sets the output format.  Allowed values: json, jsonc, none, table, tsv, yaml, yamlc. The default value is json. | --output "json" |
   | query | The JMESPath query string. For more information, see [JMESPath](http://jmespath.org/). | --query &lt;string&gt; |
   | verbose | Include verbose logging. | --verbose |

   The following sample command can be used to cancel a specific Data Box order:

   ```azurecli
   az databox job cancel --resource-group "myresourcegroup" --name "mydataboxtest3" --reason "Our migration plan was modified and we are ordering a device using a different cost center."
   ```

   The following example output indicates that the command was completed successfully:

   ```output
   Command group 'databox job' is experimental and not covered by customer support. Please use with discretion.
   Are you sure you want to perform this operation? (y/n): y
   ```

### Delete an order

After you cancel an Azure Data Box order, use the [`az databox job delete`](https://learn.microsoft.com/cli/azure/databox/job#az-databox-job-delete) command to delete the order.

   The following table shows the parameter information for `az databox job delete`:

   | Parameter | Description | Sample value |
   | --- | --- | --- |
   | resource-group [Required] | The name of the resource group associated with the order to be deleted. A resource group is a logical container for the resources that can be managed or deployed together. | "myresourcegroup" |
   | name [Required] | The name of the order to be deleted. | "mydataboxorder" |
   | subscription | The name or ID (GUID) of your Azure subscription. | "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" |
   | yes | Don't prompt for confirmation. | --yes (-y) |
   | debug | Include debugging information to verbose logging | --debug |
   | help | Display help information for this command. | --help -h |
   | only-show-errors | Only show errors, suppressing warnings. | --only-show-errors |
   | output -o | Sets the output format.  Allowed values: json, jsonc, none, table, tsv, yaml, yamlc. The default value is json. | --output "json" |
   | query | The JMESPath query string. For more information, see [JMESPath](http://jmespath.org/). | --query &lt;string&gt; |
   | verbose | Include verbose logging. | --verbose |

The following example can be used to delete a specific Data Box order after being canceled:

   ```azurecli
   az databox job delete --resource-group "myresourcegroup" --name "mydataboxtest3" --yes --verbose
   ```

   The following example output indicates that the command was completed successfully:

   ```output
   Command group 'databox job' is experimental and not covered by customer support. Please use with discretion.
   command ran in 1.142 seconds.
   ```

# [PowerShell](#tab/azure-ps)

### Cancel an order

You can cancel an Azure Data Box order using the [Stop-AzDataBoxJob](https://learn.microsoft.com/powershell/module/az.databox/stop-azdataboxjob) cmdlet. You're required to specify your reason for canceling the order.

The following table shows the parameter information for `Stop-AzDataBoxJob`:

| Parameter | Description | Sample value |
| --- | --- | --- |
| ResourceGroup [Required] | The name of the resource group associated with the order to be canceled. A resource group is a logical container for the resources that can be managed or deployed together. | "myresourcegroup" |
| Name [Required] | The name of the order to be deleted. | "mydataboxorder" |
| Reason [Required] | The reason for canceling the order. | "I entered erroneous information and needed to cancel the order." |
| Force | Forces the cmdlet to run without user confirmation. | -Force |

The following example can be used to delete a specific Data Box order after being canceled:

```azurepowershell
Stop-AzDataBoxJob -ResourceGroupName myResourceGroup \
    -Name "myDataBoxOrderPSTest" \
    -Reason "I entered erroneous information and need to cancel and re-order."
```

  The following example output indicates that the command was completed successfully:

```output
Confirm
"Cancelling Databox Job "myDataBoxOrderPSTest
[Y] Yes  [N] No  [S] Suspend  [?] Help (default is "Y"): y
```

### Delete an order

After canceling an Azure Data Box order, you can delete it using the [`Remove-AzDataBoxJob`](https://learn.microsoft.com/powershell/module/az.databox/remove-azdataboxjob) cmdlet.

The following table shows parameter information for `Remove-AzDataBoxJob`:

| Parameter | Description | Sample value |
| --- | --- | --- |
| ResourceGroup [Required] | The name of the resource group associated with the order to be deleted. A resource group is a logical container for the resources that can be managed or deployed together. | "myresourcegroup" |
| Name [Required] | The name of the order to be deleted. | "mydataboxorder" |
| Force | Forces the cmdlet to run without user confirmation. | -Force |

The following example can be used to delete a specific Data Box order after canceling:

```azurepowershell
Remove-AzDataBoxJob -ResourceGroup "myresourcegroup" \
    -Name "mydataboxtest3"
```

The following example output indicates that the command was completed successfully:

```output
Confirm
"Removing Databox Job "mydataboxtest3
[Y] Yes  [N] No  [S] Suspend  [?] Help (default is "Y"): y
```

---

## Next steps

In this tutorial, you learned about Azure Data Box topics such as:

> 
>
> * Prerequisites to deploy Data Box
> * Ordering Data Box
> * Tracking the Data Box order
> * Canceling the Data Box order

Advance to the next tutorial to learn how to set up your Data Box.

> 
> [Set up your Azure Data Box](data-box-deploy-set-up.md)
**Applies to: dbx-ng**
