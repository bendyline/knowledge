---
title: "! (Logical Not) (SSIS Expression)"
description: "! (Logical Not) (SSIS Expression)"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
helpviewer_keywords:
  - "logical Not (!)"
  - "! (logical Not)"
---
# ! (Logical Not) (SSIS Expression)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Negates a Boolean operand.  
  
> **Note:**  
>  The ! operator cannot be used in conjunction with other operators. For example, you cannot combine the ! and the > operators into the !>. operator.  
  
## Syntax  
  
```  
  
!boolean_expression  
  
```  
  
## Arguments  
 *boolean_expression*  
 Is any valid expression that evaluates to a Boolean. For more information, see [Integration Services Data Types](../data-flow/integration-services-data-types.md).  
  
## Result Types  
 DT_BOOL  
  
## Remarks  
 The following table shows the result of the ! operation.  
  
| Original Boolean expression | After applying the ! operator |
| --- | --- |
| TRUE | FALSE |
| NULL | NULL |
| FALSE | TRUE |
  
## Expression Examples  
 This example evaluates to FALSE if the **Color** column value is "red".  
  
```  
!(Color == "red")  
```  
  
 This example evaluates to TRUE if the value of the **MonthNumber** variable is the same as the integer that represents the current month. For more information, see [MONTH (SSIS Expression)](month-ssis-expression.md) and [GETDATE (SSIS Expression)](getdate-ssis-expression.md).  
  
```  
!(@MonthNumber != MONTH(GETDATE())  
```  
  
## Related content

- [Operator Precedence and Associativity](operator-precedence-and-associativity.md)
- [Operators (SSIS Expression)](operators-ssis-expression.md)
