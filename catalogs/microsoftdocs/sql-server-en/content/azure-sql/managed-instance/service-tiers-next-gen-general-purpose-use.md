---
title: Use Next-gen General Purpose service tier
description: Learn how to use the Next-gen General Purpose service tier in Azure SQL Managed Instance, which is an architectural upgrade to the existing General Purpose service tier that can be used for new and existing instances.
author: urosmil
ms.author: urmilano
ms.reviewer: wiassaf, mathoma
ms.date: 08/10/2026
ms.service: azure-sql-managed-instance
ms.subservice: service-overview
ms.topic: how-to
ai-usage: ai-assisted
ms.custom:
  - ignite-2025
---
# Use Next-gen General Purpose service tier - Azure SQL Managed Instance


  **Applies to:**    [Azure SQL Managed Instance](https://learn.microsoft.com/sql/sql-server/sql-docs-navigation-guide#applies-to)

This article shows you how to use the Next-gen General Purpose service tier upgrade for [Azure SQL Managed Instance](sql-managed-instance-paas-overview.md). The Next-gen General Purpose service tier is an architectural upgrade to the existing General Purpose service tier that you can use for new and existing instances. 

## Overview


The Next-gen General Purpose service tier is an architectural upgrade of the existing General Purpose service tier that offers the following key characteristics: 

- Designed for businesses with higher performance requirements while offering the same baseline cost as the General Purpose service tier 
- Support of up to **500 databases per instance**, and a max storage size of 32 TB
- Significant upgrades to performance, scalability and resource flexibility over the General Purpose service tier
- Uses [Elastic SAN](https://learn.microsoft.com/azure/storage/elastic-san/elastic-san-introduction) instead of page blobs, which drastically improve storage performance metrics 
- 3 free IOPS for every GB of reserved storage
- Scale your instance resources independently by manually adjusting vCores, memory, storage, and IOPS, such as by using the [Create Or Update REST API](https://learn.microsoft.com/rest/api/sql/managed-instances/create-or-update) or sliders in the Azure portal: 

   Screenshot of scaling your SQL managed instance resources independently in the Azure portal.

Because the Next-gen General Purpose service tier is an upgrade to the existing General Purpose service tier, your billing statement always reflects the *General Purpose* service tier. 

#### Architectural model

The Next-gen General Purpose service tier is an upgrade to the existing General Purpose service tier that uses an upgraded remote storage layer to store instance data and log files on Elastic SAN instead of page blobs. This upgrade offers faster storage latency, IOPS, and throughput than the existing General Purpose service tier, with increased limits to storage, the number of vCores, and the max number of databases. Additionally, since the performance quotas are shared by the whole instance, you no longer have to resize individual files to improve their performance. The baseline cost of the Next-gen General Purpose service tier is the same as the General Purpose service tier, but you can use sliders to increase your IO performance and memory to vCore ratio, which is then billed separately. 

The Next-gen General Purpose service tier supports [flexible memory](resource-limits.md#flexible-memory), which allows you to choose the amount of memory you want to allocate to your instance. This feature is a significant improvement over the General Purpose service tier, which has a fixed memory allocation based on the number of selected vCores. Flexible memory is generally available for locally redundant instances on Premium-series hardware. Flexible memory for zone-redundant Next-gen General Purpose instances on Premium-series hardware is currently in preview.

The Next-gen General Purpose service tier helps reduce cost by offering free IOPS at three IOPS for every GB of reserved storage. The price of the storage includes the minimum IOPS. If you go above the minimum, you're charged as follows: 1 IOPS = storage price (by region) divided by three. 

For example: 
- If 1 GB of storage costs 0.115, then 1 IOPS = 0.115/3 = 0.038 per IOPS. 
- A 1,024-GB instance receives 3,072 IOPS for free. You can choose to increase your IOPS up to the [VM limit](resource-limits.md#iops-and-throughput) for an additional cost. 

#### When to choose this service tier

Choose this service tier if your business is budget-oriented but the performance metrics and limits of the General Purpose service tier are insufficient. 

The key reasons why you should choose the Next-gen General Purpose service tier instead of the General Purpose tier are:

- Better performance for the same baseline cost
- Improved latency, throughput, and IOPS
- Greater storage capacity
- More flexibility for your compute 
- You need over 100 databases for a single instance 
- You need more than 16 TB of reserved storage


## Upgrade existing instances 

To upgrade an existing instance to the Next-gen General Purpose service tier in the Azure portal, follow these steps:

1. Go to your SQL managed instance resource in the [Azure portal](https://portal.azure.com).
1. Select **Compute + storage** under **Settings** to open the **Compute + storage** pane.
1. On the **Compute + storage** pane, select **Enable** for *Next-gen General Purpose*:
   
   Screenshot of the compute and storage page for your instance in the Azure portal, with next-gen general purpose selected.

1. After *Next-gen General Purpose* is enabled, you can use the sliders to modify the IOPS and memory for the instance. Review the *Cost per IOPS* and *Cost per GB* in the **Estimated costs per month** box.
1. Select **Apply** to save your changes.

## New instances

You can deploy new instances using the Next-gen General Purpose service tier upgrade in the Azure portal, Azure PowerShell, or Azure CLI. Follow the instructions for your preferred deployment method:

#### [Azure portal](#tab/portal)

You can use the Next-gen General Purpose tier upgrade for new instances when you deploy them in the Azure portal. To do so, follow these steps:

1. Go to the [Create Azure SQL Managed Instance](https://portal.azure.com/#create/Microsoft.SQLManagedInstance) pane in the Azure portal.
2. On the **Networking** tab, under **Virtual network / subnet**, select a subnet from the dropdown list.
3. On the **Basics** tab, select **Configure Managed Instance** under **Compute + storage** to open the **Compute + storage** pane:

   Screenshot of the Create Azure SQL Managed Instance page in the Azure portal, with Configure Managed Instance selected.

4. Select **Enabled** for *Next-gen General Purpose*. (Optionally) Use the slider to modify IOPS and memory for your instance. Review the *Cost per IOPS* and *Cost per GB* in the **Estimated costs per month** box:

   Screenshot of the compute + storage page when you configure your new Azure SQL Managed Instance in the Azure portal.

   > **Note:**
   > Default IOPS and memory values are included in the price. You can increase resources at any time after deployment.

5. Select **Apply** to save your instance configuration and go back to the **Create Azure SQL Managed Instance** pane.
6. Fill out the rest of the values to configure your new instance.
7. Select **Review + create** to review your settings, and then select **Create** to deploy your new instance using the Next-gen General Purpose tier upgrade.

#### [PowerShell](#tab/powershell)

To create a new SQL managed instance with the Next-gen General Purpose service tier upgrade by using PowerShell, use [New-AzSqlInstance](https://learn.microsoft.com/powershell/module/az.sql/new-azsqlinstance) and set `-IsGeneralPurposeV2` to `$true`:

```powershell
$adminCredential = Get-Credential
$subnetId = "/subscriptions/<subscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.Network/virtualNetworks/<vnetName>/subnets/<subnetName>"

New-AzSqlInstance `
    -Name "my-nextgen-mi" `
    -ResourceGroupName "myResourceGroup" `
    -Location "eastus" `
    -AdministratorCredential $adminCredential `
    -SubnetId $subnetId `
    -LicenseType "LicenseIncluded" `
    -StorageSizeInGB 512 `
    -VCore 4 `
    -Edition "GeneralPurpose" `
    -ComputeGeneration "Gen5" `
    -IsGeneralPurposeV2 $true
```

#### [CLI](#tab/cli)

To create a new SQL managed instance with the Next-gen General Purpose service tier by using Azure CLI, use [az sql mi create](https://learn.microsoft.com/cli/azure/sql/mi#az-sql-mi-create) and set `--gpv2` to `true`:

```azurecli
az sql mi create \
    --name my-nextgen-mi \
    --resource-group myResourceGroup \
    --location eastus \
    --admin-user adminuser \
    --admin-password "<your-password>" \
    --subnet "/subscriptions/<subscriptionId>/resourceGroups/<resourceGroupName>/providers/Microsoft.Network/virtualNetworks/<vnetName>/subnets/<subnetName>" \
    --capacity 4 \
    --tier GeneralPurpose \
    --family Gen5 \
    --storage 512 \
    --license-type LicenseIncluded \
    --gpv2 true
```

---

## Remarks

- Zone redundancy for the Next-gen General Purpose service tier is currently in preview. The preview also supports flexible memory for zone-redundant instances on Premium-series hardware. For more information, see [availability through local and zone redundancy](high-availability-sla-local-zone-redundancy.md) and [flexible memory](resource-limits.md#flexible-memory).
- Next-gen General Purpose zone redundancy requires Azure Elastic SAN zone-redundant storage (ZRS). It isn't available in some multi-zone regions that support zone redundancy for SQL Managed Instance. For Elastic SAN ZRS availability, see [Create and deploy an Azure Elastic SAN](https://learn.microsoft.com/azure/storage/elastic-san/elastic-san-create#limitations).

## Related content

- To get started, see [Creating a SQL Managed Instance using the Azure portal](instance-create-quickstart.md)
- For pricing details, see 
    - [Azure SQL Managed Instance single instance pricing page](https://azure.microsoft.com/pricing/details/azure-sql-managed-instance/single/)
    - [Azure SQL Managed Instance pools pricing page](https://azure.microsoft.com/pricing/details/azure-sql-managed-instance/pools/)
- For details about the specific compute and storage sizes available in the General Purpose and Business Critical service tiers, see [vCore-based resource limits for Azure SQL Managed Instance](resource-limits.md).
- [SLA for Azure SQL Managed Instance](https://azure.microsoft.com/support/legal/sla/azure-sql-sql-managed-instance/)
- [Frequently asked questions](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/azure-sql/managed-instance/frequently-asked-questions-faq.yml#next-gen-general-purpose-service-tier-upgrade)
- [Modifiable configuration reference for Azure SQL Managed Instance](modifiable-configuration-reference.md)
