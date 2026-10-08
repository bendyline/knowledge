---
title: "Binary Large Object (Blob) Data (SQL Server)"
description: With FILESTREAM, FileTables, and Remote Blob Store (RBS), SQL Server can store blobs in the database or in remote storage. Compare options for storing blobs.
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: filestream
ms.topic: concept-article
helpviewer_keywords:
  - "FILESTREAM [SQL Server], design and implementation"
---
# Binary Large Object (Blob) Data (SQL Server)
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
   SQL Server 
 provides solutions for storing files and documents in the database or on remote storage devices.  
  
## Compare Options for Storing Blobs in SQL Server

Compare the advantages of FILESTREAM, FileTables, and Remote Blob Store. See [Compare Options for Storing Blobs (SQL Server)](compare-options-for-storing-blobs-sql-server.md).
  
##  Options for Storing Blobs  

### [FILESTREAM (SQL Server)](filestream-sql-server.md)  

FILESTREAM enables  SQL Server 
-based applications to store unstructured data, such as documents and images, on the file system. Applications can use the rich streaming APIs and performance of the file system and at the same time maintain transactional consistency between the unstructured data and corresponding structured data.  
  
### [FileTables (SQL Server)](filetables-sql-server.md)  

The FileTable feature brings support for the Windows file namespace and compatibility with Windows applications to the file data stored in  SQL Server 
. FileTable lets an application integrate its storage and data management components, and provides integrated  SQL Server 
 services - including full-text search and semantic search - over unstructured data and metadata.  
  
 In other words, you can store files and documents in special tables in  SQL Server 
 called FileTables, but access them from Windows applications as if they were stored in the file system, without making any changes to your client applications.  
  
### [Remote Blob Store (RBS) (SQL Server)](remote-blob-store-rbs-sql-server.md)  

Remote BLOB store (RBS) for  SQL Server 
 lets database administrators store binary large objects (BLOBs) in commodity storage solutions instead of directly on the server. This saves a significant amount of space and avoids wasting expensive server hardware resources. RBS provides a set of API libraries that define a standardized model for applications to access BLOB data. RBS also includes maintenance tools, such as garbage collection, to help manage remote BLOB data.  
  
 RBS is included on the  SQL Server 
 installation media, but is not installed by the  SQL Server 
 Setup program.
