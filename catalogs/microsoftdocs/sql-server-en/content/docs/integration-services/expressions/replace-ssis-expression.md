---
title: "REPLACE (SSIS Expression)"
description: "REPLACE (SSIS Expression)"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
helpviewer_keywords:
  - "replacing string expression"
  - "REPLACE function"
---
# REPLACE (SSIS Expression)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Returns a character expression after replacing a character string within the expression with either a different character string or an empty string.  
  
> **Note:**  
>  The REPLACE function frequently uses long strings. The consequences of truncation can be handled gracefully or cause a warning or an error. For more information, see [Syntax (SSIS)](syntax-ssis.md).  
  
## Syntax  
  
```  
  
REPLACE(character_expression,searchstring,replacementstring)  
```  
  
## Arguments  
 *character_expression*  
 Is a valid character expression that the function searches.  
  
 *searchstring*  
 Is a valid character expression that the function attempts to locate.  
  
 *replacementstring*  
 Is a valid character expression that is the replacement expression.  
  
## Result Types  
 DT_WSTR  
  
## Remarks  
 The length of *searchstring* must not be zero.  
  
 The length of *replacementstring* may be zero.  
  
 The *searchstring* and *replacementstring* arguments can use variables and columns.  
  
 REPLACE works only with the DT_WSTR data type. *character_expression1, character_expression2,* and *character_expression3* arguments that are string literals or data columns with the DT_STR data type are implicitly cast to the DT_WSTR data type before REPLACE performs its operation. Other data types must be explicitly cast to the DT_WSTR data type. For more information, see [Cast (SSIS Expression)](cast-ssis-expression.md).  
  
 REPLACE returns a null result if any argument is null.  
  
## Expression Examples  
 This example uses a string literal. The return result is "All Terrain Bike".  
  
```  
REPLACE("Mountain Bike", "Mountain","All Terrain")  
```  
  
 This example removes the string "Bike" from the **Product** column.  
  
```  
REPLACE(Product, "Bike","")  
```  
  
 This example replaces values in the **DaysToManufacture** column. The column has an integer data type and the expression includes casting **DaysToManufacture** to the DT_WSTR data type.  
  
```  
REPLACE((DT_WSTR,8)DaysToManufacture,"6","5")  
```  
  
## Related content

- [SUBSTRING (SSIS Expression)](substring-ssis-expression.md)
- [Functions (SSIS Expression)](functions-ssis-expression.md)
