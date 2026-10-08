---
title: "Performance considerations in PolyBase for SQL Server"
description: Performance considerations for PolyBase in your SQL Server instance.
author: markingmyname
ms.author: maghan
ms.reviewer: hudequei
ms.date: 10/04/2024
ms.service: sql
ms.subservice: polybase
ms.custom: linux-related-content
ms.topic: concept-article
monikerRange: ">=sql-server-2017 || >=sql-server-linux-ver15"
---

# Performance considerations in PolyBase for SQL Server


**Applies to:**
 

 and later versions on Windows 



 and later versions on Linux 





In [PolyBase for SQL Server](overview.md), there's no hard limit to the number of files or the amount of data that can be queried. Query performance depends on the amount of data, data format, the way data is organized, and complexity of queries and joins. 

This article covers important performance topics and guidance.

## Statistics

Collecting statistics on your external data is one of the most important things you can do for query optimization. The more the instance knows about your data, the faster it can execute queries. The SQL engine query optimizer is a cost-based optimizer. It compares the cost of various query plans, and then chooses the plan with the lowest cost. In most cases, it chooses the plan that executes the fastest.

### Automatic creation of statistics

Starting in SQL Server 2022, the Database Engine analyzes incoming user queries for missing statistics. If statistics are missing, the query optimizer automatically creates statistics on individual columns in the query predicate or join condition in order to improve cardinality estimates for the query plan. Automatic creation of statistics is done synchronously so you might observe slightly degraded query performance if your columns are missing statistics. The time to create statistics for a single column depends on the size of the files targeted.

### Create OPENROWSET manual statistics

Single-column statistics for the OPENROWSET path can be created using the `sys.sp_create_openrowset_statistics` stored procedure, by passing the select query with a single column as a parameter:

```sql
EXEC sys.sp_create_openrowset_statistics N' 
SELECT pickup_datetime 
FROM OPENROWSET( 
 BULK ''abs://public@pandemicdatalake.blob.core.windows.net/curated/covid-19/bing_covid-19_data/latest/*.parquet'', 
 FORMAT = ''parquet'') AS filerows';
```

By default, the instance uses 100% of the data provided in the dataset to create statistics. You can optionally specify the sample size as a percentage using the TABLESAMPLE options. To create single-column statistics for multiple columns, execute `sys.sp_create_openrowset_statistics` for each of the columns. You can't create multi-column statistics for the OPENROWSET path.

To update existing statistics, drop them first using the `sys.sp_drop_openrowset_statistics` stored procedure, and then recreate them using the `sys.sp_create_openrowset_statistics`: 

```sql
EXEC sys.sp_drop_openrowset_statistics 
N'SELECT pickup_datetime 
FROM OPENROWSET( 
 BULK ''abs://public@pandemicdatalake.blob.core.windows.net/curated/covid-19/bing_covid-19_data/latest/*.parquet'', 
 FORMAT = ''parquet'') AS filerows 
';
```

### Create external table manual statistics

The syntax for creating statistics on external tables resembles the one used for ordinary user tables. To create statistics on a column, provide a name for the statistics object and the name of the column:

```sql
CREATE STATISTICS sVendor 
ON tbl_TaxiRides (vendorID) 
WITH FULLSCAN, NORECOMPUTE; 
```

The `WITH` options are mandatory, and for the sample size, the allowed options are `FULLSCAN` and `SAMPLE n PERCENT`. 

- To create single-column statistics for multiple columns, execute `CREATE STATISTICS` for each of the columns. 
- Multi-column statistics are not supported.

## Query partitioned data

***Applies to*** Azure SQL Managed Instance and  Azure Synapse Analytics .

When data is organized into folders or files (also called partitions), use *partition elimination* to query only specific folders and files. Partition elimination reduces the number of files and the amount of data the query needs to read and process, resulting in better performance. 

To eliminate partitions from query execution, use the metadata function `filepath()` in the `WHERE` clause of the query.

First, create an external data source:

```sql
CREATE EXTERNAL DATA SOURCE NYCTaxiExternalDataSource
WITH (
    TYPE = BLOB_STORAGE,
    LOCATION = 'abs://nyctlc@azureopendatastorage.blob.core.windows.net'
);
GO
```

The following sample query reads NYC Yellow Taxi data files only for the last three months of 2017:

```sql
SELECT 
    r.filepath() AS filepath 
    ,r.filepath(1) AS [year] 
    ,r.filepath(2) AS [month] 
    ,COUNT_BIG(*) AS [rows] 
FROM OPENROWSET( 
        BULK 'yellow/puYear=*/puMonth=*/*.parquet', 
        DATA_SOURCE = 'NYCTaxiExternalDataSource', 
        FORMAT = 'parquet' 
    ) 
WITH ( 
    vendorID INT 
) AS [r] 
WHERE 
    r.filepath(1) IN ('2017') 
    AND r.filepath(2) IN ('10', '11', '12') 
GROUP BY 
    r.filepath() 
    ,r.filepath(1) 
    ,r.filepath(2) 
ORDER BY filepath;
```

If your stored data isn't partitioned, consider partitioning it to improve query performance.

If you are using external tables, `filepath()` and `filename()` functions are supported but not in the `WHERE` clause. You can still filter by `filename` or `filepath` if you use them in computed columns. The following example demonstrates this:

```sql
CREATE EXTERNAL TABLE tbl_TaxiRides ( 
 vendorID VARCHAR(100) COLLATE Latin1_General_BIN2, 
 tpepPickupDateTime DATETIME2, 
 tpepDropoffDateTime DATETIME2, 
 passengerCount INT, 
 tripDistance FLOAT, 
 puLocationId VARCHAR(8000), 
 doLocationId VARCHAR(8000), 
 startLon FLOAT, 
 startLat FLOAT, 
 endLon FLOAT, 
 endLat FLOAT, 
 rateCodeId SMALLINT, 
 storeAndFwdFlag VARCHAR(8000), 
 paymentType VARCHAR(8000), 
 fareAmount FLOAT, 
 extra FLOAT, 
 mtaTax FLOAT, 
 improvementSurcharge VARCHAR(8000), 
 tipAmount FLOAT, 
 tollsAmount FLOAT, 
 totalAmount FLOAT, 
 [Year]  AS CAST(filepath(1) AS INT), --use filepath() for partitioning 
 [Month]  AS CAST(filepath(2) AS INT) --use filepath() for partitioning 
) 
WITH ( 
 LOCATION = 'yellow/puYear=*/puMonth=*/*.parquet', 
 DATA_SOURCE = NYCTaxiExternalDataSource, 
 FILE_FORMAT = DemoFileFormat 
); 
GO 
 
SELECT * 
      FROM tbl_TaxiRides 
WHERE 
      [year]=2017             
      AND [month] in (10,11,12); 
```

If your stored data isn't partitioned, consider partitioning it to improve query performance.

## Push computation to Hadoop

***Applies to***  SQL Server 2016 (13.x) 
,  SQL Server 2017 (14.x) 
, and  SQL Server 2019 (15.x) 
 only

PolyBase pushes some computations to the external source to optimize the overall query. The query optimizer makes a cost-based decision to push computation to Hadoop, if that will improve query performance.  The query optimizer uses statistics on external tables to make the cost-based decision. Pushing computation creates MapReduce jobs and leverages Hadoop's distributed computational resources. For more information, see [Pushdown computations in PolyBase](polybase-pushdown-computation.md). 

## Scale compute resources

***Applies to***  SQL Server 2016 (13.x) 
,  SQL Server 2017 (14.x) 
, and  SQL Server 2019 (15.x) 
 only

To improve query performance, you can use  SQL Server 
 [PolyBase scale-out groups](polybase-scale-out-groups.md). This enables parallel data transfer between  SQL Server 
 instances and Hadoop nodes, and it adds compute resources for operating on the external data.


> **Important:**
> The Microsoft SQL Server PolyBase scale-out groups has been retired. Scale-out group functionality was removed from the product in  SQL Server 2022 (16.x) 
 and later versions. PolyBase data virtualization will continue to be fully supported as a scale-up feature in SQL Server. For more information, see [Big data options on the Microsoft SQL Server platform](../../big-data-cluster/big-data-options.md).


## Related content

- [Frequently asked questions in PolyBase](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/polybase/polybase-faq.yml)
- [PolyBase overview](overview.md)
