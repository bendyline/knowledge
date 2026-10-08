---
title: "Data Types and XML Bulk Load Behavior (SQLXML)"
description: Learn about data types and XML Bulk Load behavior in SQLXML 4.0.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: xml
ms.topic: "reference"
helpviewer_keywords:
  - "bulk load [SQLXML], data types"
  - "data types [SQLXML], XML Bulk Load"
  - "XML Bulk Load [SQLXML], data types"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# Data Types and XML Bulk Load Behavior (SQLXML 4.0)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  The data types that are specified in the mapping schema (XSD or XDR type and **sql:datatype**) are generally ignored, except in the following cases:  
  
 In XSD:  
  
-   If the type is **dateTime** or **time**, you must specify the **sql:datatype** because XML Bulk Load performs data conversion before sending the data to Microsoft  SQL Server 
.  
  
-   When you are bulk loading into a column of **uniqueidentifier** type in  SQL Server 
 and the XSD value is a GUID that includes braces ({ and }), you must specify **sql:datatype="uniqueidentifier"** to remove the braces before the value is inserted into the column. If **sql:datatype** is not specified, the value is sent with the braces and the insert fails.  
  
 For more information about **sql:datatype**, see [Data Type Coercions and the sql:datatype Annotation (SQLXML 4.0)](../../sqlxml-annotated-xsd-schemas-using/data-type-coercions-and-the-sql-datatype-annotation-sqlxml-4-0.md).  
  
 In XDR:  
  
-   If the **dt:type** is **datetime**, **time**, **dateTime.tz**, or **time.tz**, you must specify both the **dt:type** and **sql:datatype** data types because XML Bulk Load performs data conversion before it sends the data to  SQL Server 
.  
  
-   If your XML data is of type **uuid**, **sql:datatype** must be specified; **dt:type="uuid"** is also required, unless the data is string data. If you do not specify **dt:uuid**, XML Bulk Load accepts strings with braces (and removes them if needed).  
  
-   If the XML data is **bin.base64** or **bin.hex**, you must specify the XML data type with **dt:type**. XML Bulk Load then loads the data into  SQL Server 
 as a hexadecimal representation of the data.
