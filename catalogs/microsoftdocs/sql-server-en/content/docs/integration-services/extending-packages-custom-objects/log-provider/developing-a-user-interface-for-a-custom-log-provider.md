---
title: "Developing a User Interface for a Custom Log Provider"
description: "Developing a User Interface for a Custom Log Provider"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "custom user interface [Integration Services], custom log providers"
  - "custom log providers [Integration Services], developing custom user interface"
---
# Developing a User Interface for a Custom Log Provider


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Many  Integration Services 
 log providers have a custom user interface that implements [Microsoft.SqlServer.Dts.Runtime.Design.IDtsLogProviderUI](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Design.IDtsLogProviderUI) and replaces the **Configuration** text box in the **Configure SSIS Logs** dialog box with a filtered dropdown list of available connection managers. However, custom user interfaces for custom log providers are not implemented in  SQL Server 
  Integration Services 
.  
  
## Related content

- [Creating a Custom Log Provider](creating-a-custom-log-provider.md)
- [Coding a Custom Log Provider](coding-a-custom-log-provider.md)
