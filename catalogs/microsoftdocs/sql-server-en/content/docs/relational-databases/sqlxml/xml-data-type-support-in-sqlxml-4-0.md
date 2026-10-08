---
title: "xml Data Type Support in SQLXML 4.0"
description: Learn how SQLXML 4.0 recognizes instances of the xml data type and implements support for it.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/17/2017"
ms.service: sql
ms.subservice: xml
ms.topic: "reference"
helpviewer_keywords:
  - "SQLXML, xml data type support"
  - "xml data type [SQL Server], SQLXML"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# xml Data Type Support in SQLXML 4.0

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Beginning with  SQL Server 2005 (9.x) 
,  SQL Server 
 supports XML typed data using the **xml** data type. This topic provides information about how SQLXML 4.0 recognizes instances of the **xml** data type and implements support for them.  
  
## Working with xml Data Types  
 To understand more about how to work with SQL tables that implement **xml** data type columns, the following examples are provided:  
  
| Task | Example | Topic |
| --- | --- | --- |
| How to map and include an **xml** column in an XML view | "Mapping an XML element to an XML data type column" | [Default Mapping of XSD Elements and Attributes to Tables and Columns (SQLXML 4.0)](../sqlxml-annotated-xsd-schemas-using/default-mapping-of-xsd-elements-and-attributes-to-tables-and-columns-sqlxml-4-0.md) |
| How to insert data into an **xml** column with updategrams | "Inserting data into an XML data type column" | [Inserting Data Using XML Updategrams (SQLXML 4.0)](../sqlxml-annotated-xsd-schemas-xpath-queries/updategrams/inserting-data-using-xml-updategrams-sqlxml-4-0.md) |
| Bulk loading XML data into an **xml** column | "Bulk loading in xml Data Type columns" | [XML Bulk Load Examples (SQLXML 4.0)](../sqlxml-annotated-xsd-schemas-xpath-queries/bulk-load-xml/xml-bulk-load-examples-sqlxml-4-0.md) |
  
## Guidelines and Limitations  
  
-   **\<xsd:any>** cannot be mapped to a column including an **xml** data type. Support in SQLXML for this scenario is provided through the **sql:overflow-field** annotation. Another workaround is to map an **xml** data type field as an element of **xsd:anyType**. This workaround is demonstrated in the "Mapping an XML element to an XML data type column" example referenced in the table above.  
  
-   XPath query into the contents of **xml** data type columns is not supported.  
  
-   Using an **xml** data type column in annotations where it is not supported (such as **sql:relationship** and **sql:key-fields**) or allowed will result in  SQL Server 
 errors that will not be trapped by middle-tier components implementing SQLXML 4.0. This occurs because SQLXML does not require SQL type information. This is similar to the behavior of SQLXML for other data types, such as BLOB and binary types.  
  
-   Mapping **xml** columns is supported only for XSD schemas. XDR schemas do not support mapping **xml** columns.  
  
-   SQLXML 4.0 relies upon the XML parsing support provided in  SQL Server 
. An **xml** column can be either mapped as typed XML or untyped XML. In either case, SQLXML 4.0 does not validate the input XML.  If input XML is not valid or well-formed,  SQL Server 
 reports it to SQLXML, and propagates any relevant error information returned by the server to the user.  
  
-   SQLXML 4.0 relies upon the limited support for DTDs provided in  SQL Server 
.  SQL Server 
 allows for an internal DTD in **xml** data type data, which can be used to supply default values and to replace entity references with their expanded contents. SQLXML passes the XML data "as is" (including the internal DTD) to the server. You can convert DTDs to XML Schema (XSD) documents using third-party tools, and load the data with inline XSD schemas into the database.  
  
-   SQLXML 4.0 does not preserve XML declaration processing instructions (for example, ) based on the behavior of  SQL Server 
. Instead, the XML declaration is treated as a directive to the  SQL Server 
 XML parser, and its attributes (version, encoding, and standalone) are lost after data is converted to the **xml** data type. The XML data is stored internally as UCS-2. All other processing instructions in the XML instance are preserved; they are allowed in the **xml** column and can be supported by SQLXML.  
  
## Related content

- [XML data (SQL Server)](../xml/xml-data-sql-server.md)
