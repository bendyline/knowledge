---
title: "Operators (DMX)"
description: "Operators (DMX)"
ms.date: 02/17/2022
ms.service: sql
ms.subservice: analysis-services
ms.topic: reference
ms.custom: dmx
---
# Operators (DMX)

**Applies to:**
 

  Analysis Services 



  You can use Data Mining Extensions (DMX) operators to perform arithmetic, comparison, concatenation, and logical operations in a query in  Microsoft 
  SQL Server 
  Analysis Services 
.  
  
  Analysis Services 
 uses operators to perform the following actions:  
  
-   Search for values or objects that meet a specific condition.  
  
-   Implement a decision between values or expressions.  
  
 DMX uses several categories of operators, described in the following sections. For additional information about individual operators, see [Data Mining Extensions (DMX) Operator Reference](data-mining-extensions-dmx-operator-reference.md).  
  
| Operator category | Type of operation |
| --- | --- |
| [Arithmetic Operators (DMX)](operators-arithmetic.md) | Perform addition, subtraction, multiplication, or division. |
| [Comparison Operators (DMX)](operators-comparison.md) | Compare one value against another value or an expression. |
| [Logical Operators (DMX)](operators-logical.md) | Test for the truth of a condition, such as AND, OR, or NOT. |
| [Unary Operators (DMX)](operators-unary.md) | Perform an operation on a single operand. |
  
 You can use operators to combine smaller expressions in DMX into more complex expressions. In complex expressions, the operators are evaluated in order based on the  Analysis Services 
 definition of operator precedence. Operators that have higher precedence are performed before operators that have lower precedence. For more information about expressions, see [Expressions (DMX)](expressions-dmx.md).  
  
 When you combine simple expressions to form a complex expression, the data type of the resulting expression is determined by combining the rules for the operators with the rules for data type precedence. If the result is a character or a Unicode value,  Analysis Services 
 determines the collation of the result by combining the rules for the operators with the rules for collation precedence. There are also rules that determine the precision, scale, and length of the result based on the precision, scale, and length of the simple expressions.  
  
## Related content

- [Data Mining Extensions (DMX) Reference](data-mining-extensions-dmx-reference.md)
- [Data Mining Extensions (DMX) Function Reference](data-mining-extensions-dmx-function-reference.md)
- [Data Mining Extensions (DMX) Statements](data-mining-extensions-dmx-statements.md)
- [Data Mining Extensions (DMX) Syntax Conventions](data-mining-extensions-dmx-syntax-conventions.md)
- [Data Mining Extensions (DMX) Syntax Elements](data-mining-extensions-dmx-syntax-elements.md)
- [General Prediction Functions (DMX)](general-prediction-functions-dmx.md)
- [Structure and Usage of DMX Prediction Queries](structure-and-usage-of-dmx-prediction-queries.md)
- [Understanding the DMX Select Statement](understanding-the-dmx-select-statement.md)
