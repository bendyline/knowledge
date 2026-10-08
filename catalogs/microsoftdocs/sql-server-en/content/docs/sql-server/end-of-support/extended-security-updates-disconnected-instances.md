---
title: "Register SQL Server instances for ESUs"
description: Learn how to register SQL Server instances in the Azure portal to receive Extended Security Updates (ESUs) for SQL Server 2014 and SQL Server 2016.
author: rwestMSFT
ms.author: randolphwest
ms.date: 06/22/2026
ms.service: sql
ms.subservice: install
ms.topic: concept-article
ms.custom:
  - references_regions
monikerRange: ">=sql-server-2017"
---
# Register SQL Server instances for ESUs
**Applies to:**
 
 


This article explains how to manually register  SQL Server 
 instances in the Azure portal to receive Extended Security Updates (ESUs) purchased through volume licensing. 

You must manually register  SQL Server 
 instances to receive ESUs in the following scenarios:
- You can't connect your  SQL Server 
 instance to Azure Arc directly.
- Your  SQL Server 
 on Azure VM is in a region that doesn't currently support ESUs for Azure VMs.

If those scenarios don't apply to your  SQL Server 
 instance and you prefer to take advantage of the flexibility of ESUs enabled by Azure Arc, [connect your server to Azure Arc](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/azure-arc/automatically-connect.md) or [register your SQL Server on Azure VM](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/sql-agent-extension-manually-register-single-vm) with the SQL IaaS Agent extension.

> **Note:**
> Price structure for Extended Security Updates (ESUs) changed for SQL Server 2016 on Azure VMs. To learn more, see [SQL Server 2016 ESUs](https://learn.microsoft.com/sql/sql-server/end-of-support/sql-server-extended-security-updates#changes-to-sql-server-2016-esus)

## Prerequisites

To register your  SQL Server 
 instances and receive ESUs, you need the following prerequisites:

- If you don't already have an Azure subscription, create an account by using one of the following methods:

   - [Create a Microsoft Customer Agreement subscription](https://learn.microsoft.com/azure/cost-management-billing/manage/create-subscription)
   - [Create an Enterprise Agreement subscription](https://learn.microsoft.com/azure/cost-management-billing/manage/create-enterprise-subscription)
   - [Create an Azure account with pay-as-you-go pricing](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go/)
   - [Create a free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)

- The user registering  SQL Server 
 instances resources must have the following permissions:

   - `Microsoft.AzureArcData/sqlServerInstances/read`
   - `Microsoft.AzureArcData/sqlServerInstances/write`

   Assign users to the `Azure Connected SQL Server Onboarding` role to grant these specific permissions, or assign them to built-in roles such as Contributor or Owner that have these permissions. For more information, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).

- Register the `Microsoft.AzureArcData` resource provider in your Azure subscription:

   - Sign in to the Azure portal.

   - Navigate to your subscription, and select **Resource providers**.

   - If the `Microsoft.AzureArcData` resource provider isn't listed, add it to your subscription by using the **Register** option.

- If you use Azure policies that only allow the creation of specific resource types, you need to allow the `Microsoft.AzureArcData/sqlServerInstances` resource type. If you don't allow this resource type, the `SQLServerInstances_Update` operation fails with a **'deny' Policy action** log entry in the activity log of the subscription.

You can either register a [single SQL Server instance](#single-sql-server-instance), or upload a CSV file to register [multiple SQL Server instances in bulk](#multiple-sql-server-instances-in-bulk).

## Single SQL Server instance

1. Go to the [SQL Server instances](https://portal.azure.com/#view/Microsoft_Azure_ArcCenterUX/ArcCenterMenuBlade/~/sqlServerInstances/resourceType/Microsoft.AzureArcData%2FsqlServerInstances) pane in the Azure portal.

1. To register a  SQL Server 
, select **Add** in the navigation bar:

   Screenshot of the Add button in the navigation bar of the SQL Server instances pane.

1. Select **Register SQL Server instances** to add a  SQL Server 
 instance.

   Screenshot for adding registered servers when registering a single instance.

1. Specify **Single SQL Server Instance**. This value is the default.

1. Choose the **Subscription** and **Resource group** for your registered  SQL Server 
 instance.

1. Enter the required information as detailed in the following table, and then select **Next**:

   | Value | Description | Additional information |
   | --- | --- | --- |
   | **Instance Name** | Enter the output of command `SELECT @@SERVERNAME`. | If you have a named instance, replace the backslash (`\`) with a hyphen (`-`). For example, `MyServer\Instance01` becomes `MyServer-Instance01`. |
   | **SQL Server Version** | Select your version from the dropdown list. |  |
   | **Edition** | Select the applicable edition from the dropdown list: Datacenter, Developer (free to deploy if purchased ESUs), Enterprise, Standard, Web, Workgroup. |  |
   | **Cores** | Enter the number of cores for this instance |  |
   | **Host Type** | Select the applicable host type from the dropdown list: Virtual machine (on-premises), Physical Server (on-premises), Azure Virtual Machine, Amazon EC2, Google Compute Engine, Other. |  |

1. Confirm that you have the rights to receive ESUs by using the checkbox.

## Multiple SQL Server instances in bulk

You can register multiple  SQL Server 
 instances at once by uploading a .CSV file. After you [format your .CSV file correctly](#formatting-requirements-for-csv-file), follow these steps to bulk register your  SQL Server 
 instances:

1. Go to the [SQL Server instances](https://portal.azure.com/#view/Microsoft_Azure_ArcCenterUX/ArcCenterMenuBlade/~/sqlServerInstances/resourceType/Microsoft.AzureArcData%2FsqlServerInstances) pane in the Azure portal.

1. To register a  SQL Server 
 instance, select **Add** in the navigation bar:

   Screenshot of the Add button in the navigation bar for bulk instance registration.

1. Select **Register SQL Server instances** to add a  SQL Server 
 instance.

   Screenshot of the options for adding connected or registered servers when registering instances in bulk.

1. Select the option for **Multiple SQL Instances**.

1. Select the Browse icon to upload the CSV file containing multiple disconnected  SQL Server 
 instances.

1. Confirm that you have the rights to receive ESUs by using the checkbox provided.

After you add your  SQL Server 
 instances, you see them in the portal after a few minutes. Because you added them manually, they always show the description **Registered**.

Screenshot of two registered SQL Server instances on the Azure Arc portal.

## Formatting requirements for CSV file

- Use commas to separate values.
- Don't use single or double quotes around values.
- Values can include letters, numbers, hyphens (`-`), and underscores (`_`). Don't use other special characters. If you have a named instance, replace the backslash (`\`) with a hyphen (`-`). For example, `MyServer\Instance01` becomes `MyServer-Instance01`.
- Column names are case-sensitive and must be named as follows:

  - name
  - version
  - edition
  - cores
  - hostType

### Example CSV file

The CSV file should look like this:

```csv
name,version,edition,cores,hostType
Server1-SQL2014,SQL Server 2014,Enterprise,12,Other Physical Server
Server2-SQL2014,SQL Server 2014,Enterprise,24,Other Physical Server
Server3-SQL2014,SQL Server 2014,Enterprise,12,Azure Virtual Machine
Server4-SQL2014,SQL Server 2014,Standard,8,Azure VMware Solution
```

## Link ESU invoice

Use the **Purchase Order Number** under Invoice Summary in your Microsoft invoice (as shown in the following screenshot) for the Invoice ID value to link the ESU purchase with the  SQL Server 
 instances.

Screenshot of Sample invoice with Purchase Order Number highlighted.

To link an ESU invoice to your  SQL Server 
 instances and get access to extended updates, follow these steps. This example includes both **Connected** and **Registered** instances.

1. Go to the [SQL Server instances](https://portal.azure.com/#view/Microsoft_Azure_ArcCenterUX/ArcCenterMenuBlade/~/sqlServerInstances/resourceType/Microsoft.AzureArcData%2FsqlServerInstances) pane in the Azure portal.

1. Use the checkboxes next to each  SQL Server 
 instance you want to link, and then select **Link ESU invoice**.

   Screenshot of all SQL Server instances on the Azure Arc section.

1. Enter the ESU invoice number in the **Invoice ID** section, and then select **Link invoice**.

   Screenshot of the invoice ID on the Link ESU invoice page.

1. The servers you linked to the ESU invoice now show a valid ESU expiration date.

   Screenshot of SQL Server instances with a valid ESU expiration value.

> **Important:**  
> When registering an ESU VL product for disconnected  SQL Server 
 servers, select only the instances with the **Status** of `Registered`.

## Download ESUs

After you link your ESU invoice, you can manually download ESUs from the **Extended Security Updates** pane for your [SQL Server instance](https://portal.azure.com/#servicemenu/SqlAzureExtension/AzureSqlHub/SqlServerInstance) in the Azure portal.

## Frequently asked questions

For a full list of frequently asked questions, see the [Extended Security Updates: Frequently asked questions](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/sql-server/end-of-support/extended-security-updates-frequently-asked-questions.yml).

## Related content

- [SQL Server 2014 lifecycle page](https://learn.microsoft.com/lifecycle/products/sql-server-2014)
- [SQL Server end of support options](sql-server-end-of-support-overview.md?WT.mc_id=akamseos)
- [Extended Security Updates frequently asked questions (FAQ)](https://learn.microsoft.com/lifecycle/faq/extended-security-updates)
- [Microsoft Security Response Center (MSRC)](https://msrc.microsoft.com/security-guidance/summary)
- [Update Management overview](https://learn.microsoft.com/azure/automation/update-management/overview)
- [Automated Patching for SQL Server on Azure virtual machines](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/automated-patching)
- [Microsoft Data Migration Guide](https://learn.microsoft.com/data-migration/)
- [Azure migrate: lift-and-shift options to move your current SQL Server into an Azure VM](https://azure.microsoft.com/services/azure-migrate/)
- [Cloud adoption framework for SQL migration](https://learn.microsoft.com/azure/cloud-adoption-framework/migrate/expanded-scope/sql-migration)
- [ESU-related scripts on GitHub](https://github.com/microsoft/sql-server-samples/tree/master/samples/manage/sql-server-extended-security-updates/scripts)
