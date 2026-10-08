---
title: "Import native & character format data from earlier versions of SQL Server"
description: In SQL Server 2019, you can use bcp to import native and character format data from other versions of SQL Server by using the -V switch with a qualifier.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: data-movement
ms.topic: concept-article
helpviewer_keywords:
  - "earlier versions [SQL Server], import and export data formats"
  - "-V switch"
  - "data formats [SQL Server], earlier versions"
  - "previous versions [SQL Server], import and export data formats"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# Import native and character format data from earlier versions of SQL Server

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





In  SQL Server 2014 (12.x)
 and later, you can use **bcp** to import native and character format data from  SQL Server 2000 (8.x) 
,  SQL Server 2005 (9.x) 
,  SQL Server 2008 (10.0.x) 
,  SQL Server 2008 R2 (10.50.x) 
, or  SQL Server 2012 (11.x) 
 by using the **-V** switch. The **-V** switch causes  SQL Server 
 to use data types from the specified earlier version of  SQL Server 
, and the data file format are the same as the format in that earlier version.  
  
To specify an earlier  SQL Server 
 version for a data file, use the **-V** switch with one of the following qualifiers:  
  
| SQL Server version | Qualifier |
| --- | --- |
| SQL Server 2000 (8.x) |
| **-V80** |
| SQL Server 2005 (9.x) |
| **-V90** |
| SQL Server 2008 (10.0.x) |
| **-V100** |
| SQL Server 2012 (11.x) |
| **-V 110** |
  
## Interpretation of Data Types  
  SQL Server 2005 (9.x) 
 and later versions have support for some new types. When you want to import a new data type into an earlier  SQL Server 
 version, the data type must be stored in a format that readable by the older **bcp** clients. The following table summarizes how the new data types are converted for compatibility with the earlier versions of  SQL Server 
.  
  
| New data types in SQL Server 2005 | Compatible data types in version 6*x* | Compatible data types in version 70 | Compatible data types in version 80 |
| --- | --- | --- | --- |
| **bigint** | **decimal** | **decimal** | * |
| **sql_variant** | **text** | **nvarchar(4000)** | * |
| **varchar(max)** | **text** | **text** | **text** |
| **nvarchar(max)** | **ntext** | **ntext** | **ntext** |
| **varbinary(max)** | **image** | **image** | **image** |
| XML | **ntext** | **ntext** | **ntext** |
| UDT** | **image** | **image** | **image** |
  
 *This type is natively supported.  
  
 **UDT indicates a user defined type.  
  
## Exporting using -V 80  
 When you bulk export data by using the **-V80** switch, **nvarchar(max)**, **varchar(max)**, **varbinary(max)**, XML, and UDT data in native mode are stored with a 4-byte prefix, like **text**, **image**, and **ntext** data, rather than with an 8-byte prefix, which is the default for  SQL Server 2005 (9.x) 
 and later versions.  
  
## Copying Date Values  
 **bcp** uses the ODBC bulk copy API. Therefore, to import date values into  SQL Server 
, **bcp** uses the ODBC date format (*yyyy-mm-dd hh:mm:ss*[*.f...*]).  
  
 The **bcp** command exports character format data files using the ODBC default format for **datetime** and **smalldatetime** values. For example, a **datetime** column containing the date `12 Aug 1998` is bulk copied to a data file as the character string `1998-08-12 00:00:00.000`.  
  
> **Important:**  
>  When importing data into a **smalldatetime** field using **bcp**, be sure the value for seconds is 00.000; otherwise the operation will fail. The **smalldatetime** data type only holds values to the nearest minute. BULK INSERT and INSERT ... SELECT * FROM OPENROWSET(BULK...) will not fail in this instance but will truncate the seconds value.  
  
##  <a name="RelatedTasks"></a> Related Tasks  
 **To use data formats for bulk import or bulk export**  
  
-   [Use Character Format to Import or Export Data (SQL Server)](use-character-format-to-import-or-export-data-sql-server.md)  
  
-   [Use Native Format to Import or Export Data (SQL Server)](use-native-format-to-import-or-export-data-sql-server.md)  
  
-   [Use Unicode Character Format to Import or Export Data (SQL Server)](use-unicode-character-format-to-import-or-export-data-sql-server.md)  
  
-   [Use Unicode Native Format to Import or Export Data (SQL Server)](use-unicode-native-format-to-import-or-export-data-sql-server.md)  
  
## Related content

- [bcp utility](../../tools/bcp/bcp-utility.md)
- [BULK INSERT (Transact-SQL)](../../t-sql/statements/bulk-insert-transact-sql.md)
- [OPENROWSET (Transact-SQL)](../../t-sql/functions/openrowset-transact-sql.md)
- [Data types (Transact-SQL)](../../t-sql/data-types/data-types-transact-sql.md)
- [Discontinued Database Engine functionality in SQL Server](../../database-engine/discontinued-database-engine-functionality-in-sql-server.md)
- [CAST and CONVERT (Transact-SQL)](../../t-sql/functions/cast-and-convert-transact-sql.md)
