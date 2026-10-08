---
title: "ISSAsynchStatus (Native Client OLE DB provider)"
description: "ISSAsynchStatus (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "ISSAsynchStatus interface"
apiname: "ISSAsynchStatus (OLE DB)"
apitype: "COM"
---
# ISSAsynchStatus (Native Client OLE DB Provider)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> The [SQL Server Native Client](../native-client/sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  **ISSAsynchStatus** exposes support for  SQL Server 
 asynchronous operations. This is an optional interface that inherits from the core OLE DB interface **IDBAsynchStatus**. In addition to the **Abort** and **GetStatus** methods inherited from **IDBAsynchStatus**, **ISSAsynchStatus** provides one new method that is used to wait until an asynchronous operation has completed or a time-out occurs.  
  
| Method | Description |
| --- | --- |
| [ISSAsynchStatus::Abort (OLE DB)](issasynchstatus-abort-ole-db.md) | Cancels an asynchronously executing operation. |
| [ISSAsynchStatus::GetStatus (OLE DB)](issasynchstatus-getstatus-ole-db.md) | Returns the status of an asynchronously executing operation. |
| [ISSAsynchStatus::WaitForAsynchCompletion (OLE DB)](issasynchstatus-waitforasynchcompletion-ole-db.md) | Waits until the asynchronously executing operation is complete or a time-out occurs. |
  
## Remarks  
 The **ISSAsynchStatus** implementation of the **ISSAsynchStatus::GetStatus** method is the same as the **IDBAsynchStatus::GetStatus** method except that if the initialization of a data source object is aborted, E_UNEXPECTED is returned rather than DB_E_CANCELED (although **ISSAsynchStatus::WaitForAsynchCompletion** returns DB_E_CANCELED). This is because the data source object is not left in the usual state following an abort operation, so that further initialization operations may be attempted.  
  
 The following methods support the use of asynchronous execution in  SQL Server 
:  
  
-   **ICommand::Execute**  
  
-   **IOpenRowset::OpenRowset**  
  
-   **IMultipleResults::GetResult**  
  
## Related content

- [SQL Server Native Client (OLE DB) Interfaces](sql-server-native-client-ole-db-interfaces.md)
- [Performing Asynchronous Operations in SQL Server Native Client](../native-client/features/performing-asynchronous-operations.md)
