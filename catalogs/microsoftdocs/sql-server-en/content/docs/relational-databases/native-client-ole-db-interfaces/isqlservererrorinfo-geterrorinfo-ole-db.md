---
title: "ISQLServerErrorInfo::GetErrorInfo (Native Client OLE DB provider)"
description: "ISQLServerErrorInfo::GetErrorInfo (Native Client OLE DB provider)"
author: markingmyname
ms.author: maghan
ms.date: "03/16/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "GetErrorInfo method"
apiname: "ISQLServerErrorInfo::GetErrorInfo (OLE DB)"
apitype: "COM"
---
# ISQLServerErrorInfo::GetErrorInfo (Native Client OLE DB Provider)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:**
> The [SQL Server Native Client](../native-client/sql-server-native-client.md) (often abbreviated SNAC) has been removed from  SQL Server 2022 (16.x) 
 and  SQL Server Management Studio 
 19 (SSMS). Both the SQL Server Native Client OLE DB provider (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) are not recommended for new development. Switch to the new [Microsoft OLE DB Driver (MSOLEDBSQL) for SQL Server](../../connect/oledb/oledb-driver-for-sql-server.md) going forward. 

  Returns a pointer to a  SQL Server 
 Native Client OLE DB provider SSERRORINFO structure containing the  SQL Server 
 error details.  
  
 The  SQL Server 
 Native Client OLE DB provider defines the **ISQLServerErrorInfo** error interface. This interface returns details from a  SQL Server 
 error, including its severity and state.  

  
## Syntax  
  
```  
  
HRESULT GetErrorInfo(  
   SSERRORINFO**ppSSErrorInfo,  
   OLECHAR**ppErrorStrings);  
```  
  
## Arguments  
 *ppSSErrorInfo*[out]  
 A pointer to a SSERRORINFO structure. If the method fails or there is no  SQL Server 
 information associated with the error, the provider does not allocate any memory, and ensures that the *ppSSErrorInfo* argument is a null pointer on output.  
  
 *ppErrorStrings*[out]  
 A pointer to a Unicode character-string pointer. If the method fails or there is no  SQL Server 
 information associated with an error, the provider does not allocate any memory, and ensures that the *ppErrorStrings* argument is a null pointer on output. Freeing the *ppErrorStrings* argument with the **IMalloc::Free** method frees the three individual string members of the returned SSERRORINFO structure, as the memory is allocated in a block.  
  
## Return Code Values  
 S_OK  
 The method succeeded.  
  
 E_INVALIDARG  
 Either the *ppSSErrorInfo* or the *ppErrorStrings* argument was NULL.  
  
 E_OUTOFMEMORY  
 The  SQL Server 
 Native Client OLE DB provider could not allocate sufficient memory to complete the request.  
  
## Remarks  
 The  SQL Server 
 Native Client OLE DB provider allocates memory for the SSERRORINFO and OLECHAR strings returned through the pointers passed by the consumer. The consumer must deallocate this memory by using the **IMalloc::Free** method when it no longer requires access to the error data.  
  
 The SSERRORINFO structure is defined as follows:  
  
```  
typedef struct tagSSErrorInfo  
   {  
   LPOLESTR pwszMessage;  
   LPOLESTR pwszServer;  
   LPOLESTR pwszProcedure;  
   LONG lNative;  
   BYTE bState;  
   BYTE bClass;  
   WORD wLineNumber;  
   }  
SSERRORINFO;  
```  
  
| Member | Description |
| --- | --- |
| *pwszMessage* | The error message from  SQL Server |
| . The message is returned through the **IErrorInfo::GetDescription** method. |
| *pwszServer* | The name of the instance of  SQL Server |
 | on which the error occurred. |
| *pwszProcedure* | The name of the stored procedure generating the error if the error occurred in a stored procedure; otherwise, an empty string. |
| *lNative* | The  SQL Server |
 | error number. The error number is identical to that returned in the *plNativeError* parameter of the **ISQLErrorInfo::GetSQLInfo** method. |
| *bState* | The state of the  SQL Server |
 | error. |
| *bClass* | The severity of the  SQL Server |
 | error. |
| *wLineNumber* | When applicable, the line of a  SQL Server |
 | stored procedure that generated the error message. If no procedure is involved, the default value is 1. |
  
 Pointers in the structure reference addresses in the string returned in the *ppErrorStrings* argument.  
  
## Related content

- [RAISERROR (Transact-SQL)](../../t-sql/language-elements/raiserror-transact-sql.md)
