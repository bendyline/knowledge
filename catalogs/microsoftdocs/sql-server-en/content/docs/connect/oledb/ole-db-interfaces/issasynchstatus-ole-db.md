---
title: "ISSAsynchStatus (OLE DB driver)"
description: Learn how OLE DB Driver for SQL Server uses the ISSAsynchStatus interface to support SQL Server asynchronous operations.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, davidengel, sunilbs, vbeiranvand
ms.date: "06/14/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "ISSAsynchStatus interface"
apiname: "ISSAsynchStatus (OLE DB)"
apitype: "COM"
---
# ISSAsynchStatus (OLE DB)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)






  **ISSAsynchStatus** interface exposes support for  SQL Server 
 asynchronous operations. It is an optional interface that inherits from the core OLE DB interface **IDBAsynchStatus**. In addition to the **Abort** and **GetStatus** methods inherited from **IDBAsynchStatus**, **ISSAsynchStatus** provides one new method that is used to wait until an asynchronous operation has completed or a time-out occurs.  
  
| Method | Description |
| --- | --- |
| [ISSAsynchStatus::Abort (OLE DB)](issasynchstatus-abort-ole-db.md) | Cancels an asynchronously executing operation. |
| [ISSAsynchStatus::GetStatus (OLE DB)](issasynchstatus-getstatus-ole-db.md) | Returns the status of an asynchronously executing operation. |
| [ISSAsynchStatus::WaitForAsynchCompletion (OLE DB)](issasynchstatus-waitforasynchcompletion-ole-db.md) | Waits until the asynchronously executing operation is complete or a time-out occurs. |
  
## Remarks  
 The **ISSAsynchStatus** implementation of the **ISSAsynchStatus::GetStatus** method is the same as the **IDBAsynchStatus::GetStatus** method except that if the initialization of a data source object is aborted, E_UNEXPECTED is returned rather than DB_E_CANCELED (although **ISSAsynchStatus::WaitForAsynchCompletion** returns DB_E_CANCELED). It is because the data source object isn't left in the usual state following an abort operation, so that further initialization operations may be attempted.  
  
 The following methods support the use of asynchronous execution in  SQL Server 
:  
  
-   **ICommand::Execute**  
  
-   **IOpenRowset::OpenRowset**  
  
-   **IMultipleResults::GetResult**  
  
## Related content

- [OLE DB Driver for SQL Server (OLE DB) Interfaces](oledb-driver-for-sql-server-ole-db-interfaces.md)
- [Performing Asynchronous Operations](../features/performing-asynchronous-operations.md)
