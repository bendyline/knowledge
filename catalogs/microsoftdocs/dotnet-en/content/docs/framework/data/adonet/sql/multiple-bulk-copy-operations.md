---
description: "Learn more about: Multiple Bulk Copy Operations"
title: "Multiple Bulk Copy Operations"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 5ad12f94-7459-4a93-a421-4160d1a90715
---
# Multiple Bulk Copy Operations

You can perform multiple bulk copy operations using a single instance of a [System.Data.SqlClient.SqlBulkCopy](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlBulkCopy) class. If the operation parameters change between copies (for example, the name of the destination table), you must update them prior to any subsequent calls to any of the `WriteToServer` methods, as demonstrated in the following example. Unless explicitly changed, all property values remain the same as they were on the previous bulk copy operation for a given instance.

> **Note:**
> Performing multiple bulk copy operations using the same instance of [System.Data.SqlClient.SqlBulkCopy](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlBulkCopy) is usually more efficient than using a separate instance for each operation.

 If you perform several bulk copy operations using the same [System.Data.SqlClient.SqlBulkCopy](https://learn.microsoft.com/search/?terms=System.Data.SqlClient.SqlBulkCopy) object, there are no restrictions on whether source or target information is equal or different in each operation. However, you must ensure that column association information is properly set each time you write to the server.

> **Important:**
> This sample will not run unless you have created the work tables as described in [Bulk Copy Example Setup](bulk-copy-example-setup.md). This code is provided to demonstrate the syntax for using `SqlBulkCopy` only. If the source and destination tables are located in the same SQL Server instance, it is easier and faster to use a Transact-SQL `INSERT … SELECT` statement to copy the data.

 [DataWorks SqlBulkCopy.ColumnMappingOrdersDetails#1 (complete source file; reference: ../../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks SqlBulkCopy.ColumnMappingOrdersDetails/CS/source.cs#1)](<../../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks SqlBulkCopy.ColumnMappingOrdersDetails/CS/source.cs.md>)
 [DataWorks SqlBulkCopy.ColumnMappingOrdersDetails#1 (complete source file; reference: ../../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks SqlBulkCopy.ColumnMappingOrdersDetails/VB/source.vb#1)](<../../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks SqlBulkCopy.ColumnMappingOrdersDetails/VB/source.vb.md>)

## See also

- [Bulk Copy Operations in SQL Server](bulk-copy-operations-in-sql-server.md)
- [ADO.NET Overview](../ado-net-overview.md)
