---
title: "User defined types"
description: "User defined types"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "08/12/2019"
ms.service: sql
ms.subservice: connectivity
ms.topic: concept-article
---

# User defined types



User-defined types (UDTs) were introduced in  SQL Server 2005 (9.x) 
 to allow a developer to extend the server's scalar type system by storing common language runtime (CLR) objects in a  SQL Server 
 database. UDTs can contain multiple elements and can have behaviors, unlike the traditional alias data types, that consist of a single  SQL Server 
 system data type. Previously, UDTs were restricted to a maximum size of 8 kilobytes. In  SQL Server 2008 (10.0.x) 
, support was added for UDTs larger than 64 kilobytes. Beginning in version 3.0, the JDBC Driver also supports UDTs larger than 64 kilobytes when you specify the UserDefined format.

There is no behavior change for UDTs that are less than or equal to 8,000 bytes, but larger UDTs are supported and report their size as "unlimited".

## Related content

- [Understanding the JDBC driver data types](understanding-the-jdbc-driver-data-types.md)
