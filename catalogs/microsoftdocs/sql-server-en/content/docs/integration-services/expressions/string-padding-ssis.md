---
title: "String Padding (SSIS)"
description: "String Padding (SSIS)"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
helpviewer_keywords:
  - "padding strings [Integration Services]"
  - "expressions [Integration Services], string padding"
  - "string padding"
---
# String Padding (SSIS)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The expression evaluator does not check if a string contains leading and trailing spaces, and it does not pad strings to make them the same length before it compares them. If expressions requires string padding, you can use the + operator to concatenate column values and blank strings. For more information, see [+ (Concatenate) (SSIS Expression)](concatenate-ssis-expression.md).  
  
 On the other hand, if you want to remove spaces, the expression evaluator provides the LTRIM, RTRIM, and TRIM functions, which remove leading or trailing spaces, or both. For more information, see [LTRIM (SSIS Expression)](ltrim-ssis-expression.md), [RTRIM (SSIS Expression)](rtrim-ssis-expression.md), and [TRIM (SSIS Expression)](trim-ssis-expression.md).  
  
> **Note:**  
>  The LEN function includes leading and trailing blanks in its count.  
  
## Related content

- [SSIS Expression Cheat Sheet](https://pragmaticworks.com/resources/cheat-sheet/ssis)
