---
title: "Create Client Applications for FILESTREAM Data"
description: Learn how to use Win32 APIs to create client applications that access FILESTREAM data. See available functions, required steps, examples, and best practices.
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: filestream
ms.topic: concept-article
helpviewer_keywords:
  - "FILESTREAM [SQL Server], Win32"
---
# Create Client Applications for FILESTREAM Data
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  You can use Win32 APIs to read and write data to a FILESTREAM BLOB. The following steps are required:  
  
-   Read the FILESTREAM file path.  
  
-   Read the current transaction context.  
  
-   Obtain a Win32 handle and use the handle to read and write data to the FILESTREAM BLOB.  
  
> **Note:**  
>  The examples in this topic require the FILESTREAM-enabled database and table that are created in [Create a FILESTREAM-Enabled Database](create-a-filestream-enabled-database.md) and [Create a Table for Storing FILESTREAM Data](create-a-table-for-storing-filestream-data.md).  
  
##  <a name="func"></a> Functions for Working with FILESTREAM Data  
 When you use FILESTREAM to store binary large object (BLOB) data, you can use Win32 APIs to work with the files. To support working with FILESTREAM BLOB data in Win32 applications,  SQL Server 
 provides the following functions and API:  
  
-   [PathName](../system-functions/pathname-transact-sql.md) returns a path as a token to a BLOB. An application uses this token to obtain a Win32 handle and operate on BLOB data.  
  
     When the database that contains FILESTREAM data belongs to an Always On availability group, then the PathName function returns a virtual network name (VNN) instead of a computer name.  
  
-   [GET_FILESTREAM_TRANSACTION_CONTEXT()](../../t-sql/functions/get-filestream-transaction-context-transact-sql.md) returns a token that represents the current transaction of a session. An application uses this token to bind FILESTREAM file system streaming operations to the transaction.  
  
-   The [OpenSqlFilestream API](access-filestream-data-with-opensqlfilestream.md) obtains a Win32 file handle. The application uses the handle to stream the FILESTREAM data, and can then pass the handle to the following Win32 APIs: [ReadFile](https://learn.microsoft.com/windows/win32/api/fileapi/nf-fileapi-readfile), [WriteFile](https://learn.microsoft.com/windows/win32/api/fileapi/nf-fileapi-writefile), [TransmitFile](https://learn.microsoft.com/windows/win32/api/mswsock/nf-mswsock-transmitfile), [SetFilePointer](https://learn.microsoft.com/windows/win32/api/fileapi/nf-fileapi-setfilepointer), [SetEndOfFile](https://learn.microsoft.com/windows/win32/api/fileapi/nf-fileapi-setendoffile), or [FlushFileBuffers](https://learn.microsoft.com/windows/win32/api/fileapi/nf-fileapi-flushfilebuffers). If the application calls any other API by using the handle, an ERROR_ACCESS_DENIED error is returned. The application should close the handle by using [CloseHandle](https://learn.microsoft.com/windows/win32/api/handleapi/nf-handleapi-closehandle).  
  
 All FILESTREAM data container access is performed in a  SQL Server 
 transaction.  Transact-SQL  statements can be executed in the same transaction to maintain consistency between SQL data and FILESTREAM data.  
  
##  <a name="steps"></a> Steps for Accessing FILESTREAM Data  
  
###  <a name="path"></a> Reading the FILESTREAM File Path  
 Each cell in a FILESTREAM table has a file path that is associated with it. To read the path, use the **PathName** property of a **varbinary(max)** column in a  Transact-SQL  statement. The following example shows how to read the file path of a **varbinary(max)** column.  
  
 [language="sql" source="codesnippet/tsql/create-client-applicatio_1.sql"::: (complete source file; reference: codesnippet/tsql/create-client-applicatio_1.sql)](../../../_code/docs/relational-databases/blob/codesnippet/tsql/create-client-applicatio_1.sql.md)
  
###  <a name="trx"></a> Reading the Transaction Context  
 To obtain the current transaction context, use the  Transact-SQL  [GET_FILESTREAM_TRANSACTION_CONTEXT()](../../t-sql/functions/get-filestream-transaction-context-transact-sql.md) function. The following example shows how to begin a transaction and read the current transaction context.  
  
 [language="sql" source="codesnippet/tsql/create-client-applicatio_2.sql"::: (complete source file; reference: codesnippet/tsql/create-client-applicatio_2.sql)](../../../_code/docs/relational-databases/blob/codesnippet/tsql/create-client-applicatio_2.sql.md)
  
###  <a name="handle"></a> Obtaining a Win32 File Handle  
 To obtain a Win32 file handle, call the OpenSqlFilestream API. This API is exported from the sqlncli.dll file. The returned handle can be passed to any of the following Win32 APIs: [ReadFile](https://learn.microsoft.com/windows/win32/api/fileapi/nf-fileapi-readfile), [WriteFile](https://learn.microsoft.com/windows/win32/api/fileapi/nf-fileapi-writefile), [TransmitFile](https://learn.microsoft.com/windows/win32/api/mswsock/nf-mswsock-transmitfile), [SetFilePointer](https://learn.microsoft.com/windows/win32/api/fileapi/nf-fileapi-setfilepointer), [SetEndOfFile](https://learn.microsoft.com/windows/win32/api/fileapi/nf-fileapi-setendoffile), or [FlushFileBuffers](https://learn.microsoft.com/windows/win32/api/fileapi/nf-fileapi-flushfilebuffers). The following examples show you how to obtain a Win32 File handle and use it to read and write data to a FILESTREAM BLOB.  
  
 [FILESTREAM#FS_CS_ReadAndWriteBLOB (complete source file; reference: ../../relational-databases/blob/codesnippet/csharp/create-client-applicatio_3.cs)](../../../_code/docs/relational-databases/blob/codesnippet/csharp/create-client-applicatio_3.cs.md)  
  
 [FILESTREAM#FS_VB_ReadAndWriteBLOB (complete source file; reference: ../../relational-databases/blob/codesnippet/visualbasic/create-client-applicatio_4.vb)](../../../_code/docs/relational-databases/blob/codesnippet/visualbasic/create-client-applicatio_4.vb.md)  
  
 [FILESTREAM#FS_CPP_WriteBLOB (complete source file; reference: ../../relational-databases/blob/codesnippet/cpp/create-client-applicatio_5.cpp)](../../../_code/docs/relational-databases/blob/codesnippet/cpp/create-client-applicatio_5.cpp.md)  
  
##  <a name="best"></a> Best Practices for Application Design and Implementation  
  
-   When you are designing and implementing applications that use FILESTREAM, consider the following guidelines:  
  
-   Use NULL instead of 0x to represent a non-initialized FILESTREAM column. The 0x value causes a file to be created, and NULL does not.  
  
-   Avoid insert and delete operations in tables that contain nonnull FILESTREAM columns. Insert and delete operations can modify the FILESTREAM tables that are used for garbage collection. This can cause an application's performance to decrease over time.  
  
-   In applications that use replication, use NEWSEQUENTIALID() instead of NEWID(). NEWSEQUENTIALID() performs better than NEWID() for GUID generation in these applications.  
  
-   The FILESTREAM API is designed for Win32 streaming access to data. Avoid using  Transact-SQL  to read or write FILESTREAM binary large objects (BLOBs) that are larger than 2 MB. If you must read or write BLOB data from  Transact-SQL , make sure that all BLOB data is consumed before you try to open the FILESTREAM BLOB from Win32. Failure to consume all the  Transact-SQL  data might cause any successive FILESTREAM open or close operations to fail.  
  
-   Avoid  Transact-SQL  statements that update, append or prepend data to the FILESTREAM BLOB. This causes the BLOB data to be spooled into the tempdb database and then back into a new physical file.  
  
-   Avoid appending small BLOB updates to a FILESTREAM BLOB. Each append causes the underlying FILESTREAM files to be copied. If an application has to append small BLOBs, write the BLOBs into a **varbinary(max)** column, and then perform a single write operation to the FILESTREAM BLOB when the number of BLOBs reaches a predetermined limit.  
  
-   Avoid retrieving the data length of lots of BLOB files in an application. This is a time-consuming operation because the size is not stored in the  SQL Server Database Engine 
. If you must determine the length of a BLOB file, use the  Transact-SQL  DATALENGTH() function to determine the size of the BLOB if it is closed. DATALENGTH() does not open the BLOB file to determine its size.  
  
-   If an application uses Message Block1 (SMB1) protocol, FILESTREAM BLOB data should be read in 60-KB multiples to optimize performance.  
  
## Related content

- [Avoid conflicts with database operations in FILESTREAM applications](avoid-conflicts-with-database-operations-in-filestream-applications.md)
- [Access FILESTREAM Data with OpenSqlFilestream](access-filestream-data-with-opensqlfilestream.md)
- [Binary Large Object (Blob) Data (SQL Server)](binary-large-object-blob-data-sql-server.md)
- [Make Partial Updates to FILESTREAM Data](make-partial-updates-to-filestream-data.md)
