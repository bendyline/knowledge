---
description: "Learn more about: How to: Call a Procedure that Does Not Return a Value (Visual Basic)"
title: "How to: Call a Procedure that Does Not Return a Value"
ms.date: 07/20/2015
helpviewer_keywords:
  - "procedure calls [Visual Basic], returning values"
  - "Visual Basic code, procedures"
  - "procedures [Visual Basic], calling"
ms.assetid: 259b49a3-a3c1-4254-ba8c-73cdc4127703
---
# How to: Call a Procedure that Does Not Return a Value (Visual Basic)

A `Sub` procedure does not return a value to the calling code. You call it explicitly with a stand-alone calling statement. You cannot call it by simply using its name within an expression.

### To call a Sub procedure

1. Specify the name of the `Sub` procedure.

2. Follow the procedure name with parentheses to enclose the argument list. If there are no arguments, you can optionally omit the parentheses. However, using the parentheses makes your code easier to read.

3. Place the arguments in the argument list within the parentheses, separated by commas. Be sure you supply the arguments in the same order that the `Sub` procedure defines the corresponding parameters.

     The following example calls the Visual Basic [Microsoft.VisualBasic.Interaction.AppActivate*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Interaction.AppActivate*) function to activate an application window. [Microsoft.VisualBasic.Interaction.AppActivate*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Interaction.AppActivate*) takes the window title as its sole argument. It does not return a value to the calling code. If a Notepad process is not running, the example throws an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException). The `Shell` procedure assumes the applications are in the paths specified.

     [VbVbalrCatRef#11 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrCatRef/VB/Class1.vb#11)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrCatRef/VB/Class1.vb.md)

## See also

- [Microsoft.VisualBasic.Interaction.Shell*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Interaction.Shell*)
- [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException)
- [Procedures](index.md)
- [Sub Procedures](sub-procedures.md)
- [Procedure Parameters and Arguments](procedure-parameters-and-arguments.md)
- [Sub Statement](../../../language-reference/statements/sub-statement.md)
- [How to: Create a Procedure](how-to-create-a-procedure.md)
- [How to: Call a Procedure That Returns a Value](how-to-call-a-procedure-that-returns-a-value.md)
- [How to: Subscribe to Events and Handle Them in Visual Basic](how-to-call-an-event-handler.md)
