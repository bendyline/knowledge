---
description: "Learn more about: How to: Define a Conversion Operator (Visual Basic)"
title: "How to: Define a Conversion Operator"
ms.date: 07/20/2015
helpviewer_keywords: 
  - "procedures [Visual Basic], defining"
  - "operators [Visual Basic], defining"
  - "procedures [Visual Basic], operator"
  - "operators [Visual Basic], overloading"
  - "return values [Visual Basic], Operator procedures"
  - "operator overloading"
ms.assetid: 54203dfa-c24b-463f-9942-d5153e89e762
---
# How to: Define a Conversion Operator (Visual Basic)

If you have defined a class or structure, you can define a type conversion operator between the type of your class or structure and another data type (such as `Integer`, `Double`, or `String`).  
  
 Define the type conversion as a [CType Operator](../../../language-reference/operators/ctype-operator.md) procedure within the class or structure. All conversion procedures must be `Public Shared`, and each one must specify either [Widening](../../../language-reference/modifiers/widening.md) or [Narrowing](../../../language-reference/modifiers/narrowing.md).  
  
 Defining an operator on a class or structure is also called *overloading* the operator.  
  
## Example  

 The following example defines conversion operators between a structure called `digit` and a `Byte`.  
  
 [VbVbcnProcedures#27 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnProcedures/VB/Class1.vb#27)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnProcedures/VB/Class1.vb.md)  
  
 You can test the structure `digit` with the following code.  
  
 [VbVbcnProcedures#28 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnProcedures/VB/Class1.vb#28)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnProcedures/VB/Class1.vb.md)  
  
## See also

- [Operator Procedures](operator-procedures.md)
- [How to: Define an Operator](how-to-define-an-operator.md)
- [How to: Call an Operator Procedure](how-to-call-an-operator-procedure.md)
- [How to: Use a Class that Defines Operators](how-to-use-a-class-that-defines-operators.md)
- [Operator Statement](../../../language-reference/statements/operator-statement.md)
- [Structure Statement](../../../language-reference/statements/structure-statement.md)
- [How to: Declare a Structure](../data-types/how-to-declare-a-structure.md)
- [Implicit and Explicit Conversions](../data-types/implicit-and-explicit-conversions.md)
- [Widening and Narrowing Conversions](../data-types/widening-and-narrowing-conversions.md)
