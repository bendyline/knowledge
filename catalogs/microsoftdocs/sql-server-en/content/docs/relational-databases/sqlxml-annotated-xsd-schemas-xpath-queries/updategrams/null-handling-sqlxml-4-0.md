---
title: "NULL Handling (SQLXML)"
description: "Learn how NULL attributes or elements can be specified in an SQLXML 4.0 updategram by using the updg:nullvalue attribute."
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/17/2017"
ms.service: sql
ms.subservice: xml
ms.topic: "reference"
monikerRange: "=azuresqldb-current || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
---
# NULL Handling (SQLXML 4.0)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  XML syntax denotes NULL as an absence. (For example, if an attribute or element value is NULL, that attribute or element is absent from the XML document.) In  Microsoft 
 SQLXML, the **updg:nullvalue** attribute enables specifying NULL for an element or attribute value.  
  
 For example, the following updategram ensures that the **Title** value for a contact with **ContactID** of 64 is NULL, and then updates the **Title** value to "Mr." for this contact.  
  
```  
<ROOT xmlns:updg="urn:schemas-microsoft-com:xml-updategram">  
  <updg:sync updg:nullvalue="IsNULL"  >  
    <updg:before>  
       <Person.Contact ContactID="64" Title="IsNULL" />  
    </updg:before>  
    <updg:after>  
       <Person.Contact ContactID="64" Title="Mr." />  
    </updg:after>  
  </updg:sync>  
</ROOT>  
```  
  
 When parameters are passed to an updategram, NULL can be passed as the parameter value. This is done by specifying the **nullvalue** attribute in the **\<updg:header>** block. For an example, see [Passing Parameters to Updategrams (SQLXML 4.0)](passing-parameters-to-updategrams-sqlxml-4-0.md).  
  
## Related content

- [Updategram Security Considerations (SQLXML 4.0)](../security/updategram-security-considerations-sqlxml-4-0.md)
