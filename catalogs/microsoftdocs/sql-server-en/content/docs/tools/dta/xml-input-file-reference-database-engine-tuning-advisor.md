---
title: XML Input File Reference
titleSuffix: Database Engine Tuning Advisor
description: This article summarizes the elements available for an XML input file that Database Engine Tuning Advisor uses to tune a database.
author: rwestMSFT
ms.author: randolphwest
ms.date: 03/01/2017
ms.service: sql
ms.subservice: tools-other
ms.topic: reference
ms.collection:
  - data-tools
---

# XML Input File Reference (Database Engine Tuning Advisor)

 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

 Database Engine 
 Tuning Advisor can use an XML input file to tune a database. This XML file designates which databases, tables, workload files or tables, and tuning options to use for the tuning session. You can also use this file to specify a user-specified configuration to perform "what-if" analysis.  
  
 A  Database Engine 
 Tuning Advisor XML input file contains a hierarchy of XML elements, each containing text or other elements that specify the tuning session settings. The  Database Engine 
 Tuning Advisor XML input file must conform to the standards for well-formed XML, so all element names are case sensitive. Elements are specified using Pascal case, which means that the first character is uppercase and the first letter of any subsequent concatenated word is uppercase.  
  
 All element values must conform to XML naming conventions. For more information about these conventions, see [XML Textual Content](https://learn.microsoft.com/previous-versions/windows/desktop/ms763742\(v=vs.85\)) in the MSDN Library.  
  
 Note that this reference is not comprehensive. For information about all the elements you can use to define XML input, refer to the  Database Engine 
 Tuning Advisor XML schema, DTASchema.xsd.  
  
## XML Declaration  
  
-   [XML Data &#40;SQL Server&#41;](../../relational-databases/xml/xml-data-sql-server.md)  
  
## DTAXML Root Element  
  
-   [DTAXML Element (DTA)](dtaxml-element-dta.md)  
  
## DTAInput Elements  
  
-   [DTAInput Element (DTA)](dtainput-element-dta.md)  
  
-   [Server Element (DTA)](server-element-dta.md)  
  
-   [Workload Element (DTA)](workload-element-dta.md)  
  
-   [TuningOptions Element (DTA)](tuningoptions-element-dta.md)  
  
-   [Configuration Element (DTA)](configuration-element-dta.md)  
  
## Server Elements  
  
-   [Name Element for Server (DTA)](name-element-for-server-dta.md)  
  
-   [Database Element for Server (DTA)](database-element-for-server-dta.md)  
  
## Workload Elements  
  
-   [File Element (DTA)](file-element-dta.md)  
  
-   [Database Element for Workload (DTA)](database-element-for-workload-dta.md)  
  
-   [EventString Element (DTA)](eventstring-element-dta.md)  
  
## Tuning Options Elements  
  
-   [TuningTimeInMin Element (DTA)](tuningtimeinmin-element-dta.md)  
  
-   [StorageBoundInMB Element (DTA)](storageboundinmb-element-dta.md)  
  
-   [TestServer Element (DTA)](testserver-element-dta.md)  
  
-   [FeatureSet Element (DTA)](featureset-element-dta.md)  
  
-   [Partitioning Element (DTA)](partitioning-element-dta.md)  
  
-   [DropOnlyMode Element (DTA)](droponlymode-element-dta.md)  
  
-   [KeepExisting Element (DTA)](keepexisting-element-dta.md)  
  
-   [OnlineIndexOperation Element (DTA)](onlineindexoperation-element-dta.md)  
  
-   [DatabaseToConnect Element (DTA)](databasetoconnect-element-dta.md)  
  
## Configuration Elements  
  
-   [Server Element for Configuration (DTA)](server-element-for-configuration-dta.md)  
  
-   [Database Element for Configuration (DTA)](database-element-for-configuration-dta.md)  
  
-   [Recommendation Element (DTA)](recommendation-element-dta.md)  
  
-   [Create Element (DTA)](create-element-dta.md)  
  
-   [Index Element (DTA)](index-element-dta.md)  
  
-   [Name Element for Index (DTA)](name-element-for-index-dta.md)  
  
-   [Column Element for Index (DTA)](column-element-for-index-dta.md)  
  
-   [Name Element for Column (DTA)](name-element-for-column-dta.md)  
  
-   [Filegroup Element for Index (DTA)](filegroup-element-for-index-dta.md)  
  
## Database Elements  
  
-   [Name Element for Database (DTA)](name-element-for-database-dta.md)  
  
-   [Schema Element for Database (DTA)](schema-element-for-database-dta.md)  
  
-   [Name Element for Schema (DTA)](name-element-for-schema-dta.md)  
  
-   [Table Element for Schema (DTA)](table-element-for-schema-dta.md)  
  
-   [Name Element for Table (DTA)](name-element-for-table-dta.md)  
  
## Related content

- [Database Engine Tuning Advisor](../../relational-databases/performance/database-engine-tuning-advisor.md)
