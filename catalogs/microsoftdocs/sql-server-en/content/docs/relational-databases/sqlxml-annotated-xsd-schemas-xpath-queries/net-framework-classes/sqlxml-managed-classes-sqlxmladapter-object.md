---
title: "SqlXmlAdapter Object (SQLXML)"
description: Learn about the SqlXmlAdapter object that provides methods that facilitate interaction with the dataset in the .NET Framework.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/16/2017"
ms.service: sql
ms.subservice: xml
ms.topic: "reference"
helpviewer_keywords:
  - "void Update(DataSet ds) method"
  - "SqlXmlAdapter object"
  - "void Fill(DataSet ds) method"
  - "SQLXML Managed Classes, SqlXmlAdapter object"
  - "Managed Classes [SQLXML], SqlXmlAdapter object"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
ms.custom: sfi-ropc-nochange
---
# SQLXML Managed Classes - SqlXmlAdapter Object

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  This object provides methods that facilitate interaction with the dataset in the  Microsoft 
 .NET Framework. For a working sample, see [Accessing SQLXML Functionality in the .NET Environment](accessing-sqlxml-functionality-in-the-net-environment.md).  
  
 The SqlXmlAdapter object supports these methods:  
  
 void Fill(DataSet ds)  
 Fills the dataset in the .NET Framework with the XML data retrieved from  SQL Server 
.  
  
 void Update(DataSet ds)  
 Applies updates to records in  SQL Server 
 from the data in the dataset.  
  
 The SqlXmlAdapter object supports these constructors:  
  
```  
public SqlXmlAdapter(SqlXmlCommand  cmd)   
  
public SqlXmlAdapter(  
                     string commandText,   
                     SqlXmlCommandType cmdType,   
                     string connectionString  
                      )   
  
public SqlXmlAdapter(  
                     Stream commandStream,   
                     SqlXmlCommandType cmdType,   
                     string connectionString  
                     )   
```  
  
## Related content

- [SQLXML Managed Classes - SqlXmlCommand Object](sqlxml-managed-classes-sqlxmlcommand-object.md)
- [SQLXML Managed Classes - SqlXmlParameter Object](sqlxml-managed-classes-sqlxmlparameter-object.md)
