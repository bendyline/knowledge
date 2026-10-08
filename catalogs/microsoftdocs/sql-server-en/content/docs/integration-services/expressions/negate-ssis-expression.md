---
title: "- (Negate) (SSIS Expression)"
description: "- (Negate) (SSIS Expression)"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
helpviewer_keywords:
  - "- (negative)"
  - "negative operator (-)"
---
# - (Negate) (SSIS Expression)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Negates a numeric expression.  
  
## Syntax  
  
```  
  
-numeric_expression  
  
```  
  
## Arguments  
 *numeric_expression*  
 Is any valid expression of any numeric data type. Only signed numeric data types are supported. For more information, see [Integration Services Data Types](../data-flow/integration-services-data-types.md).  
  
## Result Types  
 Returns the data type of *numeric_expression*.  
  
## Expression Examples  
 This example negates the value of the **Counter** variable and adds the numeric literal 50.  
  
```  
-@Counter + 50  
```  
  
## Related content

- [Operator Precedence and Associativity](operator-precedence-and-associativity.md)
- [Operators (SSIS Expression)](operators-ssis-expression.md)
