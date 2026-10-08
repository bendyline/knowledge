---
title: Configure export settings in FHIR service
description: "FHIR service export configuration: Enable managed identity, assign storage roles, and protect your data exports. Follow our step-by-step guide."
author: expekesheth
ms.service: azure-health-data-services
ms.subservice: fhir
ms.topic: how-to
ms.date: 03/24/2026
ms.author: kesheth
ms.reviewer: v-catheribun
ms.custom:
  - references_regions
  - subject-rbac-steps
  - sfi-image-nochange
---

# Configure export settings and set up a storage account

The FHIR&reg; service supports the `$export` operation [specified by HL7](https://www.hl7.org/fhir/uv/bulkdata/) for exporting FHIR data from a FHIR server. In the FHIR service implementation, when you call the `$export` endpoint, the FHIR service exports data into a preconfigured Azure storage account. The storage account must be a Blob or Azure Data Lake Storage Gen2 (ADLS Gen2) account.

This article describes how to configure export settings for the FHIR service and give the FHIR service permission to access your storage account. If your FHIR service is outside the network boundary of your storage account, you can configure access by allowing the FHIR service as a Microsoft trusted service or by allowing specific IP addresses to access the storage account. For more information, see [Secure the FHIR service `$export` operation](#secure-the-fhir-service-export-operation).    

## Prerequisites

- A FHIR service. To create one, see [Deploy the FHIR service](deploy-azure-portal.md).
- An [Azure Blob or Azure Data Lake Storage Gen2 (ADLS Gen2)](../../storage/common/storage-account-create.md) account.
- You need the **FHIR Data exporter role** application role. To learn more about application roles, see [Authentication and Authorization for FHIR service](../authentication-authorization.md).


## Step 1: Enable managed identity for the FHIR service

The first step in configuring your environment for FHIR data export is to enable a system-assigned managed identity for the FHIR service. The FHIR service uses this managed identity to authenticate and access the ADLS Gen2 account during an `$export` operation. For more information about managed identities in Azure, see [About managed identities for Azure resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md).

1. In the Azure portal, browse to your FHIR service.
1. On the left menu, select **Identity**.
1. In the **System assigned** tab, set the **Status** option to **On**, and then select **Save**.

   Screenshot showing the enabled managed identity for the FHIR service.

1. When the **Yes** and **No** buttons display, select **Yes** to enable the managed identity for the FHIR service. After you enable the system identity, you see an **Object (principal) ID** value for your FHIR service.

   Screenshot showing the enabled managed identity for the FHIR service with the Object (principal) ID displayed.


## Step 2: Give permission in the storage account for FHIR service access

1. Go to your storage account in the Azure portal. 
1. In your storage account, select **Access control (IAM)**.

1. Select **Add** > **Add role assignment**. If **Add role assignment** is grayed out, ask your Azure administrator for help with this step.

   Screenshot that shows Access control (IAM) page with Add role assignment menu open.

1. On the **Role** tab, select the [Storage Blob Data Contributor](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-contributor) role.

    Screenshot showing user interface of Add role assignment page.

1. On the **Members** tab, select **Managed identity**, and then select **Select members**.

1. Select your Azure subscription.

1. Select **System-assigned managed identity**, and then select the managed identity that you previously enabled for your FHIR service.

1. On the **Review + assign** tab, select **Review + assign** to assign the **Storage Blob Data Contributor** role to your FHIR service.

For more information about assigning roles in the Azure portal, see [Azure built-in roles](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

Now you're ready to configure the FHIR service by setting the ADLS Gen2 account as the default storage account for export.

## Step 3: Specify the storage account for FHIR service export

Specify the storage account that the FHIR service uses when exporting data.

> **Note:**
> In the storage account, if you don't assign the **Storage Blob Data Contributor** role to the FHIR service, the `$export` operation fails.

1. Go to your FHIR service settings.

1. Select **Export**.

1. Select the name of the storage account from the list. If you need to search for your storage account, use the **Name**, **Resource group**, or **Region** filters. 

    Screenshot showing user interface of FHIR Export Storage list.

> **Note:**
> You can only register storage accounts in the same subscription as the FHIR service as the destination for `$export` operations.

## Secure the FHIR service `$export` operation

To securely export data from the FHIR service outside the network boundary of your storage account, use one of the following options:

* Allow the FHIR service to access the storage account as a Microsoft trusted service.
* Allow specific IP addresses associated with the FHIR service to access the storage account. This option permits two different configurations depending on whether the storage account is in the same Azure region as the FHIR service.

### Allow the FHIR service as a Microsoft trusted service

To enable the FHIR workspace as a trusted Microsoft service, follow these steps:

1. In the Azure portal, go to your storage account.
1. On the left menu, select **Security + Networking** > **Networking**.
1. On the **Public access** tab, under **Public network access**, select **Manage**.

   Screenshot of Azure Storage networking settings.
1. Select **Enable from selected networks**.
1. In the **Resource type** dropdown list, select **Microsoft.HealthcareApis/workspaces**. In the **Instance name** dropdown list, select your workspace.
1. In the **Exceptions** section, select the **Allow trusted Microsoft services to access this storage account** checkbox.
   Screenshot that shows the option to allow trusted Microsoft services to access this storage account.
1. Select **Save** to retain the settings.


To enable the FHIR service as a trusted Microsoft service, use the following PowerShell commands:

1. Run the following PowerShell command to install the `Az.Storage` PowerShell module in your local environment. Use this module to configure your Azure storage accounts by using PowerShell.

    ```PowerShell
    Install-Module Az.Storage -Repository PsGallery -AllowClobber -Force 
    ```

1. Use the following PowerShell command to set the selected FHIR service instance as a trusted resource for the storage account. Make sure that all listed parameters are defined in your PowerShell environment.

   You need to run the `Add-AzStorageAccountNetworkRule` command as an administrator in your local environment. For more information, see [Configure Azure Storage firewalls and virtual networks](../../storage/common/storage-network-security.md).

   ```PowerShell
   $subscription="xxx"
   $tenantId = "xxx"
   $resourceGroupName = "xxx"
   $storageaccountName = "xxx"
   $workspacename="xxx"
   $fhirname="xxx"
   $resourceId = "/subscriptions/$subscription/resourceGroups/$resourceGroupName/providers/Microsoft.HealthcareApis/workspaces/$workspacename/fhirservices/$fhirname"

   Add-AzStorageAccountNetworkRule -ResourceGroupName $resourceGroupName -Name $storageaccountName -TenantId $tenantId -ResourceId $resourceId
   ```

1. To verify that the FHIR service is added as a trusted Microsoft service for the storage account, go to the storage account in the Azure portal, and select **JSON view**. Verify that the FHIR service is listed in the `properties.networkAcls.resourceAccessRules`.

You're now ready to securely export FHIR data to the storage account.

The storage account is on selected networks and isn't publicly accessible. To securely access the files, you can enable [private endpoints](../../storage/common/storage-private-endpoints.md) for the storage account.


### Allow specific IP addresses to access the Azure storage account from other Azure regions

1. In the Azure portal, go to the storage account.
1. On the left menu, select **Security + Networking** > **Networking**.
1. On the **Public access** tab under **Public network access**, select **Manage**.
1. Select **Enabled from selected networks**.
1. Enter the IP addresses in the **IPv4 Addresses** section.

Screenshot of the page for allowing selected public IP addresses.

The following table lists the public IP addresses for the FHIR service in different Azure regions. You can use these IP addresses to allow access to the storage account from the FHIR service in other regions.

   | Azure region | Public IP address |
   | :--- | :--- |
   | Australia East | 20.53.44.80 |
   | Canada Central | 20.48.192.84 |
   | Central US | 52.182.208.31 |
   | East US | 20.62.128.148 |
   | East US 2 | 20.49.102.228 |
   | East US 2 EUAP | 20.39.26.254 |
   | Germany North | 51.116.51.33 |
   | Germany West Central | 51.116.146.216 |
   | Japan East | 20.191.160.26 |
   | Korea Central | 20.41.69.51 |
   | North Central US | 20.49.114.188 |
   | North Europe | 52.146.131.52 |
   | South Africa North | 102.133.220.197 |
   | South Central US | 13.73.254.220 |
   | Southeast Asia | 23.98.108.42 |
   | Switzerland North | 51.107.60.95 |
   | UK South | 51.104.30.170 |
   | UK West | 51.137.164.94 |
   | West Central US | 52.150.156.44 |
   | West Europe | 20.61.98.66 |
   | West US 2 | 40.64.135.77 |

### Allow specific IP addresses to access the Azure storage account in the same region

The configuration process for IP addresses in the same region is just like the previous procedure, except that you use a specific IP address range in Classless Inter-Domain Routing (CIDR) format (for example, 100.64.0.0/10). You must specify the IP address range (100.64.0.0 to 100.127.255.255) because the FHIR service allocates an IP address each time you make an operation request.

> **Note:**
> You can use a private IP address within the range of 10.0.2.0/24, but there's no guarantee that the operation succeeds. If the operation request fails, you can retry. However, the request doesn't succeed until you use an IP address within the range of 100.64.0.0/10.
>
> This network behavior for IP address ranges is by design. The alternative is to configure the storage account in a different region.




## Next steps

>
>[Export FHIR data](export-data.md)


> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7.
