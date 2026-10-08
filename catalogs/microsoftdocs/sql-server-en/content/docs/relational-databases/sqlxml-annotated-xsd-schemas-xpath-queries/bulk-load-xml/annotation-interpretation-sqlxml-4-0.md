---
title: "Annotation Interpretation (SQLXML)"
description: Learn how XML Bulk Load in SQLXML 4.0 interprets annotations in the XSD and XDR schemas.
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/17/2017"
ms.service: sql
ms.subservice: xml
ms.topic: "reference"
helpviewer_keywords:
  - "annotated XSD schemas, XML Bulk Load"
  - "XML Bulk Load [SQLXML], annotation interpretations"
  - "annotations [SQLXML]"
  - "bulk load [SQLXML], annotation interpretations"
  - "annotated XDR schemas, XML Bulk Load"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# Annotation Interpretation (SQLXML 4.0)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  The topics in this section describe how XML Bulk Load interprets annotations in the XSD schema. The behavior described here also applies to the annotations in the XDR schema.  
  
> **Note:**  
>  The information in these topics describes only the annotations used by XML Bulk Load in its processing. For a complete list of annotations for the XSD schema that are supported by SQLXML 4.0, see [Using Annotations in XSD Schemas (SQLXML 4.0)](../../sqlxml-annotated-xsd-schemas-using/using-annotations-in-xsd-schemas-sqlxml-4-0.md). For a list of supported annotations for XDR schemas, see [Annotated XDR Schemas (Deprecated in SQLXML 4.0)](../../sqlxml/annotated-xsd-schemas/annotated-xdr-schemas-deprecated-in-sqlxml-4-0.md).  
  
## In This Section  
 [sql:relationship and the Key Ordering Rule (SQLXML 4.0)](annotation-interpretation-sql-relationship-and-key-ordering-rule.md)  
 Describes how the **sql:relationship** annotation is interpreted in XML Bulk Load.  
  
 [sql:mapped (SQLXML 4.0)](annotation-interpretation-sql-mapped.md)  
 Describes how the **sql:mapped** annotation is interpreted in XML Bulk Load.  
  
 [sql:limit-field and sql:limit-value (SQLXML 4.0)](annotation-interpretation-sql-limit-field-and-sql-limit-value.md)  
 Describes how the **sql:limit-field** and **sql:limit-value** annotations are interpreted in XML Bulk Load.  
  
 [sql:overflow-field (SQLXML 4.0)](annotation-interpretation-sql-overflow-field.md)  
 Describes how the **sql:overflow** annotation is interpreted in XML Bulk Load.  
  
 [Other Annotations (SQLXML 4.0)](annotation-interpretation-other-annotations.md)  
 Describes how the following annotations are interpreted in XML Bulk Load: **sql:id-prefix**, **sql:use-cdata**, **sql:url-encode**, **sql:is-mapping-schema**, **sql:key-fields**.
