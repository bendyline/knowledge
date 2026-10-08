---
title: Introduction to Table storage - Object storage in Azure
description: Store structured data in the cloud using Azure Table storage, a NoSQL data store.
services: storage
ms.service: azure-table-storage
author: akashdubey-ms
ms.author: akashdubey
ms.topic: overview
ms.date: 05/27/2021
# Customer intent: "As a developer, I want to store and retrieve structured NoSQL data in the cloud, so that I can efficiently manage flexible datasets for my applications without the constraints of a traditional database schema."
---

# What is Azure Table storage?


> **Tip:**
> The content in this article applies to the original Azure Table storage. However, the same concepts apply to the newer Azure Cosmos DB for Table, which offers higher performance and availability, global distribution, and automatic secondary indexes. It is also available in a consumption-based [serverless](https://learn.microsoft.com/azure/cosmos-db/serverless) mode. There are some [feature differences](https://learn.microsoft.com/azure/cosmos-db/table/introduction) between Table API in Azure Cosmos DB and Azure Table storage. For more information, see [Azure Cosmos DB for Table](https://learn.microsoft.com/azure/cosmos-db/table-introduction). For ease of development, we now provide a unified [Azure Tables SDK](https://devblogs.microsoft.com/azure-sdk/announcing-the-new-azure-data-tables-libraries/) that can be used to target both Azure Table storage and Azure Cosmos DB for Table.


Azure Table storage is a service that stores non-relational structured data (also known as structured NoSQL data) in the cloud, providing a key/attribute store with a schemaless design. Because Table storage is schemaless, it's easy to adapt your data as the needs of your application evolve. Access to Table storage data is fast and cost-effective for many types of applications, and is typically lower in cost than traditional SQL for similar volumes of data.

You can use Table storage to store flexible datasets like user data for web applications, address books, device information, or other types of metadata your service requires. You can store any number of entities in a table, and a storage account may contain any number of tables, up to the capacity limit of the storage account.

## What is Table storage
Azure Table storage stores large amounts of structured data. The service is a NoSQL datastore which accepts authenticated calls from inside and outside the Azure cloud. Azure tables are ideal for storing structured, non-relational data. Common uses of Table storage include:

* Storing TBs of structured data capable of serving web scale applications
* Storing datasets that don't require complex joins, foreign keys, or stored procedures and can be denormalized for fast access
* Quickly querying data using a clustered index
* Accessing data using the OData protocol and LINQ queries with WCF Data Service .NET Libraries

You can use Table storage to store and query huge sets of structured, non-relational data, and your tables will scale as demand increases.

## Table storage concepts

Table storage contains the following components:

Tables storage component diagram

* **URL format:** Azure Table Storage accounts use this format: `http://<storage account>.table.core.windows.net/<table>`

  You can address Azure tables directly using this address with the OData protocol. For more information, see [OData.org][OData.org].

* **Accounts:** All access to Azure Storage is done through a storage account. For more information about storage accounts, see [Storage account overview](../common/storage-account-overview.md).

    All access to Azure Cosmos DB is done through an Azure Cosmos DB for Table account. For more information, see [Create an Azure Cosmos DB for Table account](https://learn.microsoft.com/azure/cosmos-db/create-table-dotnet#create-a-database-account).

* **Table**: A table is a collection of entities. Tables don't enforce a schema on entities, which means a single table can contain entities that have different sets of properties.

* **Entity**: An entity is a set of properties, similar to a database row. An entity in Azure Storage can be up to 1MB in size. An entity in Azure Cosmos DB can be up to 2MB in size.

* **Properties**: A property is a name-value pair. Each entity can include up to 252 properties to store data. Each entity also has three system properties that specify a partition key, a row key, and a timestamp. Entities with the same partition key can be queried more quickly, and inserted/updated in atomic operations. An entity's row key is its unique identifier within a partition.

For details about naming tables and properties, see [Understanding the Table Service Data Model](https://learn.microsoft.com/rest/api/storageservices/Understanding-the-Table-Service-Data-Model).

[Table1]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-table-concepts-include/table1.png
[OData.org]: https://www.odata.org/


## Next steps

* [Microsoft Azure Storage Explorer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vs-azure-tools-storage-manage-with-storage-explorer.md) is a free, standalone app from Microsoft that enables you to work visually with Azure Storage data on Windows, macOS, and Linux.

* [Get started with Azure Table Storage in .NET](https://learn.microsoft.com/azure/cosmos-db/tutorial-develop-table-dotnet)

* View the Table service reference documentation for complete details about available APIs:

    * [Storage Client Library for .NET reference](https://learn.microsoft.com/dotnet/api/overview/azure/storage)

    * [REST API reference](https://learn.microsoft.com/rest/api/storageservices/)
