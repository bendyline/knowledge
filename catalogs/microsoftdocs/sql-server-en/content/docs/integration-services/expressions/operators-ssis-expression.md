---
title: "Operators (SSIS Expression)"
description: "Operators (SSIS Expression)"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
helpviewer_keywords:
  - "SSIS, operators"
  - "SQL Server Integration Services, operators"
  - "operators [Integration Services]"
  - "expressions [Integration Services], operators"
---
# Operators (SSIS Expression)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  This section describes the operators the expression language provides and the operator precedence and associativity that the expression evaluator uses.  
  
 The following table lists topics about operators in this section.  
  
| Operator | Description |
| --- | --- |
| [Cast (SSIS Expression)](cast-ssis-expression.md) | Converts an expression from one data type to a different data type. |
| [() (Parentheses) (SSIS Expression)](parentheses-ssis-expression.md) | Identifies the evaluation order of expressions. |
| [+ (Add) (SSIS)](add-ssis.md) | Adds two numeric expressions. |
| [+ (Concatenate) (SSIS Expression)](concatenate-ssis-expression.md) | Concatenates two expressions. |
| [- (Subtract) (SSIS Expression)](subtract-ssis-expression.md) | Subtracts the second numeric expression from the first one. |
| [- (Negate) (SSIS Expression)](negate-ssis-expression.md) | Negates a numeric expression. |
| [\* (Multiply) (SSIS Expression)](multiply-ssis-expression.md) | Multiplies two numeric expressions. |
| [/ (Divide) (SSIS Expression)](divide-ssis-expression.md) | Divides the first numeric expression by the second one. |
| [% (Modulo) (SSIS Expression)](modulo-ssis-expression.md) | Provides the integer remainder after dividing the first numeric expression by the second one. |
| [ |  | (Logical OR) (SSIS Expression)](logical-or-ssis-expression.md) | Performs a logical OR operation. |
| [&& (Logical AND) (SSIS Expression)](logical-and-ssis-expression.md) | Performs a logical AND operation. |
| [! (Logical NOT) (SSIS Expression)](logical-not-ssis-expression.md) | Negates a Boolean operand. |
| [ | (Bitwise Inclusive OR) (SSIS Expression)](bitwise-inclusive-or-ssis-expression.md) | Performs a bitwise OR operation of two integer values. |
| [^ (Bitwise Exclusive OR) (SSIS Expression)](bitwise-exclusive-or-ssis-expression.md) | Performs a bitwise exclusive OR operation of two integer values. |
| [& (Bitwise AND) (SSIS Expression)](bitwise-and-ssis-expression.md) | Performs a bitwise AND operation of two integer values. |
| [\~ (Bitwise NOT) (SSIS Expression)](bitwise-not-ssis-expression.md) | Performs a bitwise negation of an integer. |
| [== (Equal) (SSIS Expression)](equal-ssis-expression.md) | Performs a comparison to determine if two expressions are equal. |
| [!= (Unequal) (SSIS Expression)](unequal-ssis-expression.md) | Performs a comparison to determine if two expressions are not equal. |
| [> (Greater Than) (SSIS Expression)](greater-than-ssis-expression.md) | Performs a comparison to determine if the first expression is greater than the second one. |
| [< (Less Than) (SSIS Expression)](less-than-ssis-expression.md) | Performs a comparison to determine if the first expression is less than the second one. |
| [>= (Greater Than or Equal To) (SSIS Expression)](greater-than-or-equal-to-ssis-expression.md) | Performs a comparison to determine if the first expression is greater than or equal to the second one. |
| [<= (Less Than or Equal To) (SSIS Expression)](less-than-or-equal-to-ssis-expression.md) | Performs a comparison to determine if the first expression is less than or equal to the second one. |
| [? : (Conditional) (SSIS Expression)](conditional-ssis-expression.md) | Returns one of two expressions based on the evaluation of a Boolean expression. |
  
 For information about the placement of each operator in the precedence hierarchy, see [Operator Precedence and Associativity](operator-precedence-and-associativity.md).  
  
## Related content

- [Functions (SSIS Expression)](functions-ssis-expression.md)
- [Examples of Advanced Integration Services Expressions](examples-of-advanced-integration-services-expressions.md)
- [Integration Services (SSIS) Expressions](integration-services-ssis-expressions.md)
