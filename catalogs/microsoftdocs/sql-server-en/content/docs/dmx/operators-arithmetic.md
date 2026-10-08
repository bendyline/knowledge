---
title: "Arithmetic Operators (DMX)"
description: "Arithmetic Operators (DMX)"
ms.date: 02/17/2022
ms.service: sql
ms.subservice: analysis-services
ms.topic: reference
ms.custom: dmx
---
# Operators - Arithmetic

**Applies to:**
 

  Analysis Services 



  You can use arithmetic operators in Data Mining Extensions (DMX) for arithmetic computations in  Microsoft 
  SQL Server 
  Analysis Services 
, including addition, subtraction, multiplication, and division.  
  
 The following table identifies the arithmetic operators that DMX supports.  
  
| Operator | Description |
| --- | --- |
| [+ (Add) (DMX)](add-dmx.md) | Adds two numbers together. |
| [- (Subtract) (DMX)](subtract-dmx.md) | Subtracts one number from another number. |
| [\* (Multiply) (DMX)](multiply-dmx.md) | Multiplies one number by another number. |
| [(Divide) (DMX)](divide-dmx.md) | Divides one number by another number. |
  
 The following rules determine the order of precedence for arithmetic operators in a DMX expression:  
  
-   When there is more than one arithmetic operator in an expression, multiplication and division are calculated first, followed by subtraction and addition.  
  
-   When all the arithmetic operators in an expression have the same level of precedence, the order of execution is left to right.  
  
-   Expressions that are within parentheses take precedence over all other operations.  
  
## Related content

- [Data Mining Extensions (DMX) Reference](data-mining-extensions-dmx-reference.md)
- [Data Mining Extensions (DMX) Function Reference](data-mining-extensions-dmx-function-reference.md)
- [Data Mining Extensions (DMX) Operator Reference](data-mining-extensions-dmx-operator-reference.md)
- [Data Mining Extensions (DMX) Statements](data-mining-extensions-dmx-statements.md)
- [Data Mining Extensions (DMX) Syntax Conventions](data-mining-extensions-dmx-syntax-conventions.md)
- [Data Mining Extensions (DMX) Syntax Elements](data-mining-extensions-dmx-syntax-elements.md)
- [Expressions (DMX)](expressions-dmx.md)
- [General Prediction Functions (DMX)](general-prediction-functions-dmx.md)
- [Operators (DMX)](operators-dmx.md)
- [Structure and Usage of DMX Prediction Queries](structure-and-usage-of-dmx-prediction-queries.md)
- [Understanding the DMX Select Statement](understanding-the-dmx-select-statement.md)
