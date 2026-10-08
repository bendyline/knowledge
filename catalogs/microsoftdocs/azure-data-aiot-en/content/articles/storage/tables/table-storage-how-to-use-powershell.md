---
title: Perform Azure Table storage operations with PowerShell
description: Learn how to run common tasks such as creating, querying, deleting data from Azure Table storage account by using PowerShell.
author: akashdubey-ms

ms.service: azure-table-storage
ms.topic: article
ms.date: 06/23/2022
ms.author: akashdubey
ms.custom: devx-track-azurepowershell
# Customer intent: As a developer, I want to perform common operations on Azure Table storage using PowerShell, so that I can efficiently manage and manipulate structured data within my applications.
---

# Perform Azure Table storage operations with Azure PowerShell 
> **Tip:**
> The content in this article applies to Azure Table storage. However, there is now a premium offering for table storage, Azure Cosmos DB for Table that offers throughput-optimized tables, global distribution, and automatic secondary indexes. To learn more and try out the premium experience, check out [Azure Cosmos DB for Table](https://learn.microsoft.com/azure/cosmos-db/table-introduction). This article's programming language is not yet supported in the premium offering, but will be added in the future.
>

Azure Table storage is a NoSQL datastore that you can use to store and query huge sets of structured, non-relational data. The main components of the service are tables, entities, and properties. A table is a collection of entities. An entity is a set of properties. Each entity can have up to 252 properties, which are all name-value pairs. This article assumes that you are already familiar with the Azure Table Storage Service concepts. For detailed information, see [Understanding the Table Service Data Model](https://learn.microsoft.com/rest/api/storageservices/Understanding-the-Table-Service-Data-Model) and [Get started with Azure Table storage using .NET](https://learn.microsoft.com/azure/cosmos-db/tutorial-develop-table-dotnet).

This how-to article covers common Azure Table storage operations. You learn how to:

> 
> * Create a table
> * Retrieve a table
> * Add table entities
> * Query a table
> * Delete table entities
> * Delete a table

This how-to article shows you how to create a new storage account in a new resource group so you can easily remove it when you're done. You can also use an existing storage account.

The examples require Az PowerShell modules `Az.Storage (1.1.0 or greater)` and `Az.Resources (1.2.0 or greater)`. In a PowerShell window, run `Get-Module -ListAvailable Az*` to find the version. If nothing is displayed, or you need to upgrade, see [Install Azure PowerShell module](https://learn.microsoft.com/powershell/azure/install-azure-powershell).

> **Important:**
> Using this Azure feature from PowerShell requires that you have the `Az` module installed. The current version of `AzTable` is not compatible with the older AzureRM module. Follow the [latest install instructions for installing Az module](https://learn.microsoft.com/powershell/azure/install-azure-powershell) if needed.
>
> For module name compatibility reasons, this module is also published under the previous name `AzureRmStorageTables` in PowerShell Gallery. This document will reference the new name only.

After Azure PowerShell is installed or updated, you must install module **AzTable**, which has the commands for managing the entities. To install this module, run PowerShell as an administrator and use the **Install-Module** command.

```powershell
Install-Module AzTable
```

## Authorizing table data operations

The AzTable PowerShell module supports authorization with the account access key via Shared Key authorization. The examples in this article show how to authorize table data operations via Shared Key.

Azure Table Storage supports authorization with Microsoft Entra ID. However, the AzTable PowerShell module does not natively support authorization with Microsoft Entra ID. Using Microsoft Entra ID with the AzTable module requires that you call methods in the .NET client library from PowerShell.

## Sign in to Azure

To get started, sign in to your Azure subscription with the `Add-AzAccount` command and follow the on-screen directions.

```powershell
Add-AzAccount
```

## Retrieve list of locations

If you don't know which location you want to use, you can list the available locations. After the list is displayed, find the one you want to use. These examples use **eastus**. Store this value in the variable **location** for future use.

```powershell
Get-AzLocation | select Location
$location = "eastus"
```

## Create resource group

Create a resource group with the [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup) command.

An Azure resource group is a logical container into which Azure resources are deployed and managed. Store the resource group name in a variable for future use. In this example, a resource group named *pshtablesrg* is created in the *eastus* region.

```powershell
$resourceGroup = "pshtablesrg"
New-AzResourceGroup -ResourceGroupName $resourceGroup -Location $location
```

## Create storage account

Create a standard general-purpose storage account with locally redundant storage (LRS) using [New-AzStorageAccount](https://learn.microsoft.com/powershell/module/az.storage/New-azStorageAccount). Be sure to specify a unique storage account name. Next, get the context that represents the storage account. When acting on a storage account, you can reference the context instead of repeatedly providing your credentials.

```powershell
$storageAccountName = "pshtablestorage"
$storageAccount = New-AzStorageAccount -ResourceGroupName $resourceGroup `
  -Name $storageAccountName `
  -Location $location `
  -SkuName Standard_LRS `
  -Kind Storage

$ctx = $storageAccount.Context
```

## Create a new table

To create a table, use the [New-AzStorageTable](https://learn.microsoft.com/powershell/module/az.storage/New-AzStorageTable) cmdlet. In this example, the table is called `pshtesttable`.

```powershell
$tableName = "pshtesttable"
New-AzStorageTable -Name $tableName -Context $ctx
```

## Retrieve a list of tables in the storage account

Retrieve a list of tables in the storage account using [Get-AzStorageTable](https://learn.microsoft.com/powershell/module/az.storage/Get-AzStorageTable).

```powershell
Get-AzStorageTable -Context $ctx | select Name
```

## Retrieve a reference to a specific table

To perform operations on a table, you need a reference to the specific table. Get a reference using [Get-AzStorageTable](https://learn.microsoft.com/powershell/module/az.storage/Get-AzStorageTable).

```powershell
$storageTable = Get-AzStorageTable -Name $tableName -Context $ctx
```

## Reference the CloudTable property of a specific table

> **Important:**
> Using the **CloudTable** property is mandatory when working with table data via the **AzTable** PowerShell module. Call the **Get-AzStorageTable** command to get the reference to this object.

To perform operations on a table using **AzTable**, return a reference to the **CloudTable** property of a specific table. The **CloudTable** property exposes the .NET methods available for managing table data from PowerShell.

```powershell
$cloudTable = $storageTable.CloudTable
```

<!--created by Robin Shahan to go in the articles for table storage w/powershell.
    There is one for Azure Table Storage and one for Azure Cosmos DB for Table -->

## Managing table entities

Now that you have a table, let's look at how to manage entities, or rows, in the table. 

Entities can have up to 255 properties, including three system properties: **PartitionKey**, **RowKey**, and **Timestamp**. You're responsible for inserting and updating the values of **PartitionKey** and **RowKey**. The server manages the value of **Timestamp**, which can't be modified. Together the **PartitionKey** and **RowKey** uniquely identify every entity within a table.

* **PartitionKey**: Determines the partition that the entity is stored in.
* **RowKey**: Uniquely identifies the entity within the partition.

You may define up to 252 custom properties for an entity. 

### Add table entities

Add entities to a table using **Add-AzTableRow**. These examples use partition keys with values `partition1` and `partition2`, and row keys equal to state abbreviations. The properties in each entity are `username` and `userid`. 

```powershell
$partitionKey1 = "partition1"
$partitionKey2 = "partition2"

# add four rows 
Add-AzTableRow `
    -table $cloudTable `
    -partitionKey $partitionKey1 `
    -rowKey ("CA") -property @{"username"="Chris";"userid"=1}

Add-AzTableRow `
    -table $cloudTable `
    -partitionKey $partitionKey2 `
    -rowKey ("NM") -property @{"username"="Jessie";"userid"=2}

Add-AzTableRow `
    -table $cloudTable `
    -partitionKey $partitionKey1 `
    -rowKey ("WA") -property @{"username"="Christine";"userid"=3}

Add-AzTableRow `
    -table $cloudTable `
    -partitionKey $partitionKey2 `
    -rowKey ("TX") -property @{"username"="Steven";"userid"=4}
```

### Query the table entities

You can query the entities in a table by using the **Get-AzTableRow** command.

> **Note:**
> The cmdlets **Get-AzureStorageTableRowAll**, **Get-AzureStorageTableRowByPartitionKey**, **Get-AzureStorageTableRowByColumnName**, and **Get-AzureStorageTableRowByCustomFilter** are deprecated and will be removed in a future version update.

#### Retrieve all entities

```powershell
Get-AzTableRow -table $cloudTable | ft
```

This command yields results similar to the following table:

| userid | username | partition | rowkey |
| --- | --- | --- | --- |
| 1 | Chris | partition1 | CA |
| 3 | Christine | partition1 | WA |
| 2 | Jessie | partition2 | NM |
| 4 | Steven | partition2 | TX |

#### Retrieve the count of the entities in table

```powershell
$totalEntities=(Get-AzTableRow -table $cloudTable | measure).Count
Echo $totalEntities
```

This command results in the numeric count of entities similar to below:

4

#### Retrieve entities for a specific partition key

```powershell
Get-AzTableRow -table $cloudTable -partitionKey $partitionKey1 | ft
```

The results look similar to the following table:

| userid | username | partition | rowkey |
| --- | --- | --- | --- |
| 1 | Chris | partition1 | CA |
| 3 | Christine | partition1 | WA |

#### Retrieve entities for a specific value in a specific column

```powershell
Get-AzTableRow -table $cloudTable `
    -columnName "username" `
    -value "Chris" `
    -operator Equal
```

This query retrieves one record.

| field | value |
| --- | --- |
| userid | 1 |
| username | Chris |
| PartitionKey | partition1 |
| RowKey | CA |

#### Retrieve entities using a custom filter 

```powershell
Get-AzTableRow `
    -table $cloudTable `
    -customFilter "(userid eq 1)"
```

This query retrieves one record.

| field | value |
| --- | --- |
| userid | 1 |
| username | Chris |
| PartitionKey | partition1 |
| RowKey | CA |

### Updating entities 

There are three steps for updating entities. First, retrieve the entity to change. Second, make the change. Third, commit the change using **Update-AzTableRow**.

Update the entity with username = 'Jessie' to have username = 'Jessie2'. This example also shows another way to create a custom filter using .NET types.

```powershell
# Create a filter and get the entity to be updated.
[string]$filter = `
    [Microsoft.Azure.Cosmos.Table.TableQuery]::GenerateFilterCondition("username",`
    [Microsoft.Azure.Cosmos.Table.QueryComparisons]::Equal,"Jessie")
$user = Get-AzTableRow `
    -table $cloudTable `
    -customFilter $filter

# Change the entity.
$user.username = "Jessie2"

# To commit the change, pipe the updated record into the update cmdlet.
$user | Update-AzTableRow -table $cloudTable

# To see the new record, query the table.
Get-AzTableRow -table $cloudTable `
    -customFilter "(username eq 'Jessie2')"
```

The results show the Jessie2 record.

| field | value |
| --- | --- |
| userid | 2 |
| username | Jessie2 |
| PartitionKey | partition2 |
| RowKey | NM |

### Deleting table entities

You can delete one entity or all entities in the table.

#### Deleting one entity

To delete a single entity, get a reference to that entity and pipe it into **Remove-AzTableRow**.

```powershell
# Set filter.
[string]$filter = `
  [Microsoft.Azure.Cosmos.Table.TableQuery]::GenerateFilterCondition("username",`
  [Microsoft.Azure.Cosmos.Table.QueryComparisons]::Equal,"Jessie2")

# Retrieve entity to be deleted, then pipe it into the remove cmdlet.
$userToDelete = Get-AzTableRow `
    -table $cloudTable `
    -customFilter $filter
$userToDelete | Remove-AzTableRow -table $cloudTable

# Retrieve entities from table and see that Jessie2 has been deleted.
Get-AzTableRow -table $cloudTable | ft
```

#### Delete all entities in the table

To delete all entities in the table, you retrieve them and pipe the results into the remove cmdlet. 

```powershell
# Get all rows and pipe the result into the remove cmdlet.
Get-AzTableRow `
    -table $cloudTable | Remove-AzTableRow -table $cloudTable 

# List entities in the table (there won't be any).
Get-AzTableRow -table $cloudTable | ft
```


## Delete a table

To delete a table, use [Remove-AzStorageTable](https://learn.microsoft.com/powershell/module/az.storage/Remove-AzStorageTable). This cmdlet removes the table, including all of its data.

```powershell
Remove-AzStorageTable -Name $tableName -Context $ctx

# Retrieve the list of tables to verify the table has been removed.
Get-AzStorageTable -Context $Ctx | select Name
```

## Clean up resources

If you created a new resource group and storage account at the beginning of this how-to,  you can remove all of the assets you have created in this exercise by removing the resource group. This command deletes all resources contained within the group as well as the resource group itself.

```powershell
Remove-AzResourceGroup -Name $resourceGroup
```

## Next steps

In this how-to article, you learned about common Azure Table storage operations with PowerShell, including how to:

> 
> * Create a table
> * Retrieve a table
> * Add table entities
> * Query a table
> * Delete table entities
> * Delete a table

For more information, see the following articles

* [Storage PowerShell cmdlets](https://learn.microsoft.com/powershell/module/az.storage#storage)

* [Working with Azure Tables from PowerShell - AzureRmStorageTable/AzTable PS Module v2.0](https://paulomarquesc.github.io/working-with-azure-storage-tables-from-powershell)

* [Microsoft Azure Storage Explorer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vs-azure-tools-storage-manage-with-storage-explorer.md) is a free, standalone app from Microsoft that enables you to work visually with Azure Storage data on Windows, macOS, and Linux.
