---
title: Create a table in the Azure portal
titleSuffix: Azure Storage
description: Learn how to use the Azure portal to create a new table in Azure Table storage.
services: storage
author: akashdubey-ms

ms.author: akashdubey
ms.date: 01/25/2023
ms.topic: quickstart
ms.service: azure-table-storage
ms.custom: mode-ui, engagement-fy23
# Customer intent: "As a cloud developer, I want to create tables and entities in Azure Table storage, so that I can efficiently manage and organize large datasets within my application."
---

# Quickstart: Create a table in the Azure portal

This quickstart shows how to create tables and entities in the web-based Azure portal. This quickstart also shows you how to create an Azure storage account.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/tables/table-storage-quickstart-portal.md)

## Prerequisites

To complete this quickstart, first create an Azure storage account in the [Azure portal](https://portal.azure.com/#create/Microsoft.StorageAccount-ARM). For help creating the account, see [Create a storage account](../common/storage-account-create.md).

## Add a table

To create a table in the Azure portal:

1. Navigate to your storage account in the Azure portal.
1. Select **Storage Browser** in the left-hand navigation panel.
1. In the Storage Browser tree, select **Tables**.
1. Select the **Add table** button to add a new table.
1. In the **Add table** dialog, provide a name for the new table.

    Screenshot showing how to create a table in Storage Browser in the Azure portal.

1. Select **Ok** to create the new table.

## Add an entity to the table

To add an entity to your table from the Azure portal:

1. In the Storage Browser in the Azure portal, select the table you created previously.
1. Select the **Add entity** button to add a new entity.

   Screenshot showing how to add a new entity to a table in Storage Browser in the Azure portal.

1. In the **Add entity** dialog, provide a partition key and a row key, then add any additional properties for data that you want to write to the entity.

    Screenshot showing how to add properties to an entity in Storage Browser in the Azure portal.

For more information on working with entities and properties, see [Understanding the Table service data model](https://learn.microsoft.com/rest/api/storageservices/understanding-the-table-service-data-model).

## Next steps

- [Guidelines for table design](table-storage-design-guidelines.md)
