---
description: "Learn more about: End Statement"
title: "End Statement"
ms.date: 07/20/2015
f1_keywords:
  - "vb.End"
  - "End"
helpviewer_keywords:
  - "execution [Visual Basic], ending"
  - "files [Visual Basic], closing"
  - "End keyword [Visual Basic], End statements"
  - "programs [Visual Basic], quitting"
  - "code, exiting"
  - "program termination"
  - "End statement [Visual Basic]"
  - "execution [Visual Basic], stopping"
ms.assetid: 0e64467c-0f34-4aab-9ddd-43f8b9d55d90
---
# End Statement

Terminates execution immediately.

## Syntax

```vb
End
```

## Remarks

 You can place the `End` statement anywhere in a procedure to force the entire application to stop running. `End` closes any files opened with an `Open` statement and clears all the application's variables. The application closes as soon as there are no other programs holding references to its objects and none of its code is running.

> **Note:**
> The `End` statement stops code execution abruptly, and does not invoke the `Dispose` or `Finalize` method, or any other Visual Basic code. Object references held by other programs are invalidated. If an `End` statement is encountered within a `Try` or `Catch` block, control does not pass to the corresponding `Finally` block.

 The `Stop` statement suspends execution, but unlike `End`, it does not close any files or clear any variables, unless it is encountered in a compiled executable (.exe) file.

 Because `End` terminates your application without attending to any resources that might be open, you should try to close down cleanly before using it. For example, if your application has any forms open, you should close them before control reaches the `End` statement.

 You should use `End` sparingly, and only when you need to stop immediately. The normal ways to terminate a procedure ([Return Statement](return-statement.md) and [Exit Statement](exit-statement.md)) not only close down the procedure cleanly but also give the calling code the opportunity to close down cleanly. A console application, for example, can simply `Return` from the `Main` procedure.

> **Important:**
> The `End` statement calls the [System.Environment.Exit*](https://learn.microsoft.com/search/?terms=System.Environment.Exit*) method of the [System.Environment](https://learn.microsoft.com/search/?terms=System.Environment) class in the [System](https://learn.microsoft.com/search/?terms=System) namespace. [System.Environment.Exit*](https://learn.microsoft.com/search/?terms=System.Environment.Exit*) requires that you have `UnmanagedCode` permission. If you do not, a [System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException) error occurs.

 When followed by an additional keyword, [End \<keyword> Statement](end-keyword-statement.md) delineates the end of the definition of the appropriate procedure or block. For example, `End Function` terminates the definition of a `Function` procedure.

## Example

 The following example uses the `End` statement to terminate code execution if the user requests it.

 [VbVersHelp60Controls#64 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVersHelp60Controls/VB/Form1.vb#64)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVersHelp60Controls/VB/Form1.vb.md)

## Smart Device Developer Notes

 This statement is not supported.

## See also

- [Stop Statement](stop-statement.md)
- [End \<keyword> Statement](end-keyword-statement.md)
