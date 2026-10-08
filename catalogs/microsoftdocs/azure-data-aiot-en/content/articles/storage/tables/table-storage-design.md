---
title: Design scalable and performant tables in Azure Table storage.
description: Learn to design scalable and performant tables in Azure Table storage. Review table partitions, Entity Group Transactions, and capacity and cost considerations.
services: storage
ms.service: azure-table-storage
author: akashdubey-ms
ms.author: akashdubey
ms.topic: article
ms.date: 03/09/2020
# Customer intent: "As a cloud architect, I want to design efficient and scalable tables in a NoSQL system, so that I can optimize performance and cost for high-transaction cloud applications."
---

# Design scalable and performant tables


> **Tip:**
> The content in this article applies to the original Azure Table storage. However, the same concepts apply to the newer Azure Cosmos DB for Table, which offers higher performance and availability, global distribution, and automatic secondary indexes. It is also available in a consumption-based [serverless](https://learn.microsoft.com/azure/cosmos-db/serverless) mode. There are some [feature differences](https://learn.microsoft.com/azure/cosmos-db/table/introduction) between Table API in Azure Cosmos DB and Azure Table storage. For more information, see [Azure Cosmos DB for Table](https://learn.microsoft.com/azure/cosmos-db/table-introduction). For ease of development, we now provide a unified [Azure Tables SDK](https://devblogs.microsoft.com/azure-sdk/announcing-the-new-azure-data-tables-libraries/) that can be used to target both Azure Table storage and Azure Cosmos DB for Table.


To design scalable and performant tables, you must consider factors such as performance, scalability, and cost. If you have previously designed schemas for relational databases, these considerations are familiar, but while there are some similarities between the Azure Table service storage model and relational models, there are also important differences. These differences typically lead to different designs that may look counter-intuitive or wrong to someone familiar with relational databases, yet make sense if you are designing for a NoSQL key/value store such as the Azure Table service. Many of your design differences reflect the fact that the Table service is designed to support cloud-scale applications that can contain billions of entities (or rows in relational database terminology) of data or for datasets that must support high transaction volumes. Therefore, you must think differently about how you store your data and understand how the Table service works. A well-designed NoSQL data store can enable your solution to scale much further and at a lower cost than a solution that uses a relational database. This guide helps you with these topics.  

## About the Azure Table service
This section highlights some of the key features of the Table service that are especially relevant to designing for performance and scalability. If you're new to Azure Storage and the Table service, first read [Get started with Azure Table Storage using .NET](https://learn.microsoft.com/azure/cosmos-db/tutorial-develop-table-dotnet) before reading the remainder of this article. Although the focus of this guide is on the Table service, it includes discussion of the Azure Queue and Blob services, and how you might use them with the Table service.  

What is the Table service? As you might expect from the name, the Table service uses a tabular format to store data. In the standard terminology, each row of the table represents an entity, and the columns store the various properties of that entity. Every entity has a pair of keys to uniquely identify it, and a timestamp column that the Table service uses to track when the entity was last updated. The timestamp is applied automatically, and you cannot manually overwrite the timestamp with an arbitrary value. The Table service uses this last-modified timestamp (LMT) to manage optimistic concurrency.  

> **Note:**
> The Table service REST API operations also return an **ETag** value that it derives from the LMT. This document uses the terms ETag and LMT interchangeably because they refer to the same underlying data.  
> 
> 

The following example shows a simple table design to store employee and department entities. Many of the examples shown later in this guide are based on this simple design.  

<table>
<tr>
<th>PartitionKey</th>
<th>RowKey</th>
<th>Timestamp</th>
<th></th>
</tr>
<tr>
<td>Marketing</td>
<td>00001</td>
<td>2014-08-22T00:50:32Z</td>
<td>
<table>
<tr>
<th>FirstName</th>
<th>LastName</th>
<th>Age</th>
<th>Email</th>
</tr>
<tr>
<td>Don</td>
<td>Hall</td>
<td>34</td>
<td>donh@contoso.com</td>
</tr>
</table>
</tr>
<tr>
<td>Marketing</td>
<td>00002</td>
<td>2014-08-22T00:50:34Z</td>
<td>
<table>
<tr>
<th>FirstName</th>
<th>LastName</th>
<th>Age</th>
<th>Email</th>
</tr>
<tr>
<td>Jun</td>
<td>Cao</td>
<td>47</td>
<td>junc@contoso.com</td>
</tr>
</table>
</tr>
<tr>
<td>Marketing</td>
<td>Department</td>
<td>2014-08-22T00:50:30Z</td>
<td>
<table>
<tr>
<th>DepartmentName</th>
<th>EmployeeCount</th>
</tr>
<tr>
<td>Marketing</td>
<td>153</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>Sales</td>
<td>00010</td>
<td>2014-08-22T00:50:44Z</td>
<td>
<table>
<tr>
<th>FirstName</th>
<th>LastName</th>
<th>Age</th>
<th>Email</th>
</tr>
<tr>
<td>Ken</td>
<td>Kwok</td>
<td>23</td>
<td>kenk@contoso.com</td>
</tr>
</table>
</td>
</tr>
</table>


So far, this data appears similar to a table in a relational database with the key differences being the mandatory columns, and the ability to store multiple entity types in the same table. Also, each of the user-defined properties such as **FirstName** or **Age** has a data type, such as integer or string, just like a column in a relational database. Although unlike in a relational database, the schema-less nature of the Table service means that a property need not have the same data type on each entity. To store complex data types in a single property, you must use a serialized format such as JSON or XML. For more information about the table service such as supported data types, supported date ranges, naming rules, and size constraints, see [Understanding the Table Service Data Model](https://learn.microsoft.com/rest/api/storageservices/Understanding-the-Table-Service-Data-Model).

Your choice of **PartitionKey** and **RowKey** is fundamental to good table design. Every entity stored in a table must have a unique combination of **PartitionKey** and **RowKey**. As with keys in a relational database table, the **PartitionKey** and **RowKey** values are indexed to create a clustered index to enable fast look-ups. However, the Table service does not create any secondary indexes, so **PartitionKey** and **RowKey** are the only indexed properties. Some of the patterns described in [Table design patterns](table-storage-design-patterns.md) illustrate how you can work around this apparent limitation.  

A table comprises one or more partitions, and many of the design decisions you make will be around choosing a suitable **PartitionKey** and **RowKey** to optimize your solution. A solution may consist of a single table that contains all your entities organized into partitions, but typically a solution has multiple tables. Tables help you to logically organize your entities, help you manage access to the data using access control lists, and you can drop an entire table using a single storage operation.  

## Table partitions
The account name, table name, and **PartitionKey** together identify the partition within the storage service where the table service stores the entity. As well as being part of the addressing scheme for entities, partitions define a scope for transactions (see [Entity Group Transactions](#entity-group-transactions) below), and form the basis of how the table service scales. For more information on partitions, see [Performance and scalability checklist for Table storage](storage-performance-checklist.md).  

In the Table service, an individual node services one or more complete partitions, and the service scales by dynamically load-balancing partitions across nodes. If a node is under load, the table service can *split* the range of partitions serviced by that node onto different nodes; when traffic subsides, the service can *merge* the partition ranges from quiet nodes back onto a single node.  

For more information about the internal details of the Table service, and in particular how the service manages partitions, see the paper [Microsoft Azure Storage: A Highly Available
Cloud Storage Service with Strong Consistency](https://learn.microsoft.com/archive/blogs/windowsazurestorage/sosp-paper-windows-azure-storage-a-highly-available-cloud-storage-service-with-strong-consistency).  

## Entity Group Transactions
In the Table service, Entity Group Transactions (EGTs) are the only built-in mechanism for performing atomic updates across multiple entities. EGTs are sometimes also referred to as *batch transactions*. EGTs can only operate on entities stored in the same partition (that is, share the same partition key in a given table). So anytime you require atomic transactional behavior across multiple entities, you must ensure that those entities are in the same partition. This is often a reason for keeping multiple entity types in the same table (and partition) and not using multiple tables for different entity types. A single EGT can operate on at most 100 entities.  If you submit multiple concurrent EGTs for processing, it is important to ensure those EGTs do not operate on entities that are common across EGTs; otherwise, processing can be delayed.

EGTs also introduce a potential trade-off for you to evaluate in your design. That is, using more partitions increases the scalability of your application, because Azure has more opportunities for load balancing requests across nodes. But using more partitions might limit the ability of your application to perform atomic transactions and maintain strong consistency for your data. Furthermore, there are specific scalability targets at the level of a partition that might limit the throughput of transactions you can expect for a single node. For more information about scalability targets for Azure standard storage accounts, see [Scalability targets for standard storage accounts](../common/scalability-targets-standard-account.md). For more information about scalability targets for the Table service, see [Scalability and performance targets for Table storage](scalability-targets.md).

## Capacity considerations


The following table describes capacity, scalability, and performance targets for Table storage.

| Resource | Target |
| --- | --- |
| Number of tables in an Azure storage account | Limited only by the capacity of the storage account |
| Number of partitions in a table | Limited only by the capacity of the storage account |
| Number of entities in a partition | Limited only by the capacity of the storage account |
| Maximum size of a single table | 500 TiB |
| Maximum size of a single entity, including all property values | 1 MiB |
| Maximum number of properties in a table entity | 255 (including the three system properties, **PartitionKey**, **RowKey**, and **Timestamp**) |
| Maximum total size of an individual property in an entity | Varies by property type. For more information, see **Property Types** in [Understanding the Table Service Data Model](https://learn.microsoft.com/rest/api/storageservices/understanding-the-table-service-data-model). |
| Size of the **PartitionKey** | A string up to 1024 characters in size |
| Size of the **RowKey** | A string up to 1024 characters in size |
| Size of an entity group transaction | A transaction can include at most 100 entities and the payload must be less than 4 MiB in size. An entity group transaction can include an update to an entity only once. |
| Maximum number of stored access policies per table | 5 |
| Maximum request rate per storage account | 20,000 transactions per second, which assumes a 1-KiB entity size |
| Target throughput for a single table partition (1 KiB-entities) | Up to 2,000 entities per second |

## Cost considerations
Table storage is relatively inexpensive, but you should include cost estimates for both capacity usage and the quantity of transactions as part of your evaluation of any Table service solution. However, in many scenarios, storing denormalized or duplicate data in order to improve the performance or scalability of your solution is a valid approach. For more information about pricing, see [Azure Storage Pricing](https://azure.microsoft.com/pricing/details/storage/).  

## Next steps

- [Table Design Patterns](table-storage-design-patterns.md)
- [Modeling relationships](table-storage-design-modeling.md)
- [Design for querying](table-storage-design-for-query.md)
- [Encrypting Table Data](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/tables/table-storage-design-encrypt-data.md)
- [Design for data modification](table-storage-design-for-modification.md)
