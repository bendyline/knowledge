---
title: "getTrustServerCertificate Method (SQLServerDataSource)"
description: "getTrustServerCertificate Method (SQLServerDataSource)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
apilocation: "getTrustServerCertificate Method (SQLServerDataSource)"
apiname: "getTrustServerCertificate Method (SQLServerDataSource)"
apitype: "Assembly"
---
# getTrustServerCertificate Method (SQLServerDataSource)


  Returns a **Boolean** value that indicates if the trustServerCertificate property is enabled.  
  
## Syntax  
  
```  
  
public boolean getTrustServerCertificate()  
```  
  
## Return Value  
 **true** if trustServerCertificate is enabled. Otherwise, **false**.  
  
## Remarks  
 If the trustServerCertificate property is set to **true**, the  SQL Server 
 Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), certificate is automatically trusted when the communication layer is encrypted using TLS. In other words, the  Microsoft JDBC Driver for SQL Server 
 will not validate the  SQL Server 
 TLS/SSL certificate. The default value is **false**.  
  
 If the trustServerCertificate property is set to **false**, the  Microsoft JDBC Driver for SQL Server 
 will validate the server TLS/SSL certificate.  
  
## Related content

- [SQLServerDataSource Members](sqlserverdatasource-members.md)
- [SQLServerDataSource Class](sqlserverdatasource-class.md)
