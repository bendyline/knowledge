---
title: "SQLXML Managed Classes"
description: Learn about Microsoft SQLXML Managed Classes that expose the functionality of SQLXML 4.0 inside the Microsoft .NET Framework.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: xml
ms.topic: "reference"
helpviewer_keywords:
  - ".NET Framework [SQLXML], Managed Classes"
  - "SQL Server .NET Data Provider"
  - "Managed Classes [SQLXML], about managed classes"
  - "providers [SQLXML], SQL Server .NET Data Provider"
  - "data providers [SQLXML], SQL Server .NET Data Provider"
  - "Managed Classes [SQLXML]"
  - "XML [SQLXML]"
  - "SQLXML Managed Classes"
  - "providers [SQLXML], SQLXML Managed Classes"
  - "data providers [SQLXML], SQLXML Managed Classes"
  - "SQLXML, Managed Classes"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# SQLXML 4.0 .NET Framework Support - Managed Classes

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



   Microsoft 
 SQLXML 4.0 supports features that allow you to write applications to access XML data from an instance of  SQL Server 
, bring the data into the  Microsoft 
 .NET Framework environment, process the data, and send the updates back to  SQL Server 
. 
  
   Microsoft 
 SQLXML Managed Classes exposes the functionality of SQLXML 4.0 inside the  Microsoft 
 .NET Framework. With SQLXML Managed Classes, you can write a C# application to access XML data from an instance of  SQL Server 
, bring the data into the .NET Framework environment, process the data, and send the updates back to  SQL Server 
 as a DiffGram to apply the updates. You must use a mapping schema when applying updates to a  SQL Server 
 database using SQLXML Managed Classes. For a working sample, see [Accessing SQLXML Functionality in the .NET Environment](accessing-sqlxml-functionality-in-the-net-environment.md).  
  
 To use the SQLXML Managed Classes with SQLXML 4.0, you must install Microsoft Visual Studio.  
  
> **Note:**  
>  The .NET Framework includes the  SQL Server 
 .NET Data Provider. This provider can be used to access  SQL Server 
 from the .NET environment; however, it can handle only traditional SQL queries (that is, relational database queries with the exception of FOR XML queries). You cannot execute XML templates or the server-side XPath queries in  SQL Server 
.  

 For information about accessing and modifying data in  SQL Server 
 within the  Microsoft 
 .NET Framework, and about using DiffGrams to update data in  SQL Server 
 tables, see [Accessing SQLXML Functionality in the .NET Environment](accessing-sqlxml-functionality-in-the-net-environment.md).  
  
> **Note:**  
>  You can also write  Microsoft 
 Visual Studio applications to bulk load XML documents by using XML Bulk Load. For more information, see [Performing Bulk Load of XML Data (SQLXML 4.0)](../bulk-load-xml/performing-bulk-load-of-xml-data-sqlxml-4-0.md). You must add a reference to the XML Bulk Load DLL (Xblkld4.dll) in your application. This is a COM DLL for which Visual Studio .NET automatically creates the wrapper library.  
  
  This section provides sample applications that demonstrate how to use the  Microsoft 
 SQLXML Managed Classes:  
 [Executing SQL Queries (SQLXML Managed Classes)](executing-sql-queries-sqlxml-managed-classes.md)  
  [Executing SQL Queries by Using the ExecuteXMLReader Method](executing-sql-queries-by-using-the-executexmlreader-method.md)  
  [Processing XML on the Client Side (SQLXML Managed Classes)](processing-xml-on-the-client-side-sqlxml-managed-classes.md)  
  [Executing XPath Queries (SQLXML Managed Classes)](executing-xpath-queries-sqlxml-managed-classes.md)  
  [Executing XPath Queries with Namespaces (SQLXML Managed Classes)](executing-xpath-queries-with-namespaces-sqlxml-managed-classes.md)  
  [Executing Template Files by Using the CommandText Property](executing-template-files-by-using-the-commandtext-property.md)  
  [Executing Template Files by Using the CommandStream Property](executing-template-files-by-using-the-commandstream-property.md)  
  [Applying an XSL Transformation (SQLXML Managed Classes)](applying-an-xsl-transformation-sqlxml-managed-classes.md)
