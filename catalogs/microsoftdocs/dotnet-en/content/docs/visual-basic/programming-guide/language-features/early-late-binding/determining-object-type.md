---
description: "Learn more about: Determining Object Type (Visual Basic)"
title: "Determining Object Type"
ms.date: 07/20/2015
helpviewer_keywords:
  - "classes [Visual Basic], discovering which an object belongs to"
  - "types [Visual Basic], determining Visual Basic object types"
  - "object variables [Visual Basic], testing values"
  - "TypeOf...Is expression, object type at run time"
  - "TypeName function"
  - "objects [Visual Basic], type determining"
ms.assetid: d95e7ad1-cd63-41d6-9a28-d7a1380d49c1
---
# Determining Object Type (Visual Basic)

Generic object variables (that is, variables you declare as `Object`) can hold objects from any class. When using variables of type `Object`, you may need to take different actions based on the class of the object; for example, some objects might not support a particular property or method. Visual Basic provides two means of determining which type of object is stored in an object variable: the `TypeName` function and the `TypeOf...Is` operator.

## TypeName and TypeOf…Is

 The `TypeName` function returns a string and is the best choice when you need to store or display the class name of an object, as shown in the following code fragment:

 [VbVbalrOOP#92 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrOOP/VB/OOP.vb#92)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrOOP/VB/OOP.vb.md)

 The `TypeOf...Is` operator is the best choice for testing an object's type, because it is much faster than an equivalent string comparison using `TypeName`. The following code fragment uses `TypeOf...Is` within an `If...Then...Else` statement:

 [VbVbalrOOP#93 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrOOP/VB/OOP.vb#93)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrOOP/VB/OOP.vb.md)

 A word of caution is due here. The `TypeOf...Is` operator returns `True` if an object is of a specific type, or is derived from a specific type. Almost everything you do with Visual Basic involves objects, which include some elements not normally thought of as objects, such as strings and integers. These objects are derived from and inherit methods from [System.Object](https://learn.microsoft.com/search/?terms=System.Object). When passed an `Integer` and evaluated with `Object`, the `TypeOf...Is` operator returns `True`. The following example reports that the parameter `InParam` is both an `Object` and an `Integer`:

 [VbVbalrOOP#94 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrOOP/VB/OOP.vb#94)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrOOP/VB/OOP.vb.md)

 The following example uses both `TypeOf...Is` and `TypeName` to determine the type of object passed to it in the `Ctrl` argument. The `TestObject` procedure calls `ShowType` with three different kinds of controls.

#### To run the example

1. Create a new Windows Application project and add a [System.Windows.Forms.Button](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Button) control, a [System.Windows.Forms.CheckBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.CheckBox) control, and a [System.Windows.Forms.RadioButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.RadioButton) control to the form.

2. From the button on your form, call the `TestObject` procedure.

3. Add the following code to your form:

     [VbVbalrOOP#95 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrOOP/VB/OOP.vb#95)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrOOP/VB/OOP.vb.md)

## See also

- [Microsoft.VisualBasic.Information.TypeName*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Information.TypeName*)
- [Calling a Property or Method Using a String Name](calling-a-property-or-method-using-a-string-name.md)
- [Object Data Type](../../../language-reference/data-types/object-data-type.md)
- [If...Then...Else Statement](../../../language-reference/statements/if-then-else-statement.md)
- [String Data Type](../../../language-reference/data-types/string-data-type.md)
- [Integer Data Type](../../../language-reference/data-types/integer-data-type.md)
