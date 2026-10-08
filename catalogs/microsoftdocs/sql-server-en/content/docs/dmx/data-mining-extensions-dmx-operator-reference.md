---
title: "Data Mining Extensions (DMX) Operator Reference"
description: "Data Mining Extensions (DMX) Operator Reference"
ms.date: 02/17/2022
ms.service: sql
ms.subservice: analysis-services
ms.topic: reference
ms.custom: dmx
---
# Data Mining Extensions (DMX) Operator Reference

**Applies to:**
 

  Analysis Services 



  The Data Mining Extensions (DMX) language in  Microsoft 
  SQL Server 
  Analysis Services 
 supports arithmetic, assignment, comparison, logical, and unary operators. The following table lists the operators that DMX supports.  
  
| Operator | Description |
| --- | --- |
| [+ (Add) (DMX)](add-dmx.md) | An arithmetic operator that adds two numbers together. |
| [- (Subtract) (DMX)](subtract-dmx.md) | An arithmetic operator that subtracts one number from another number. |
| [\* (Multiply) (DMX)](multiply-dmx.md) | An arithmetic operator that multiplies one number by another number. |
| [(Divide) (DMX)](divide-dmx.md) | An arithmetic operator that divides one number by another number. |
| [< (Less Than) (DMX)](less-than-dmx.md) | A comparison operator. For arguments that evaluate to non-null values, returns TRUE if the value of the argument on the left is less than the value of the argument on the right; returns FALSE otherwise. If either argument or both arguments evaluate to a null value, the operator returns a null value. |
| [> (Greater Than) (DMX)](greater-than-dmx.md) | A comparison operator. For arguments that evaluate to non-null values, returns TRUE if the value of the argument on the left is greater than the value of the argument on the right; returns FALSE otherwise. If either argument or both arguments evaluate to a null value, the operator returns a null value. |
| [= (Equal To) (DMX)](equal-to-dmx.md) | A comparison operator. For arguments that evaluate to non-null values, returns TRUE if the value of the argument on the left is equal to the value of the argument on the right; returns FALSE otherwise. If either argument or both arguments evaluate to a null value, the operator returns a null value. |
| [<> (Not Equal To) (DMX)](not-equal-to-dmx.md) | A comparison operator. For arguments that evaluate to non-null values, returns TRUE if the value of the argument on the left is not equal to the value of the argument on the right; returns FALSE otherwise. If either argument or both arguments evaluate to a null value, the operator returns a null value. |
| [<= (Less Than or Equal To) (DMX)](less-than-or-equal-to-dmx.md) | A comparison operator. For arguments that evaluate to non-null values, returns TRUE if the value of the argument on the left is less than or equal to the value of the argument on the right; returns FALSE otherwise. If either argument or both arguments evaluate to a null value, the operator returns a null value. |
| [>= (Greater Than or Equal To) (DMX)](greater-than-or-equal-to-dmx.md) | A comparison operator. For arguments that evaluate to non-null values, returns TRUE if the value of the argument on the left is greater than or equal to the value of the argument on the right; returns FALSE otherwise. If either argument or both arguments evaluate to a null value, the operator returns a null value. |
| [AND (DMX)](and-dmx.md) | A logical operator that performs a conjunction on two numeric expressions. |
| [NOT (DMX)](not-dmx.md) | A logical operator that performs a negation on a numeric expression. |
| [OR (DMX)](or-dmx.md) | A logical operator that performs a disjunction on two numeric expressions. |
| [+ (Positive) (DMX)](positive-dmx.md) | A unary operator that returns the positive value of a numeric expression. |
| [- (Negative) (DMX)](negative-dmx.md) | A unary operator that returns the negative value of a numeric expression. |
| [Double Slash (Comment) (DMX)](double-slash-comment-dmx.md) | Indicates a text string that  Analysis Services |
 | should not execute. You can nest comments within a DMX statement, include them at the end of a line of code, or insert them on a separate line. |
| [-- (Comment) (DMX) Summary](comment-dmx-summary.md) | Indicates a text string that  Analysis Services |
 | should not execute. You can nest comments within a DMX statement, include them at the end of a line of code, or insert them on a separate line. |
| [Slash Star (Comment) (DMX)](slash-star-comment-dmx.md) | Indicates a text string that  Analysis Services |
 | should not execute. You can nest comments within a DMX statement, include them at the end of a line of code, or insert them on a separate line. |
  
## Related content

- [Data Mining Extensions (DMX) Function Reference](data-mining-extensions-dmx-function-reference.md)
- [Data Mining Extensions (DMX) Reference](data-mining-extensions-dmx-reference.md)
- [Data Mining Extensions (DMX) Statements](data-mining-extensions-dmx-statements.md)
- [Data Mining Extensions (DMX) Syntax Conventions](data-mining-extensions-dmx-syntax-conventions.md)
- [Data Mining Extensions (DMX) Syntax Elements](data-mining-extensions-dmx-syntax-elements.md)
- [Operators (DMX)](operators-dmx.md)
