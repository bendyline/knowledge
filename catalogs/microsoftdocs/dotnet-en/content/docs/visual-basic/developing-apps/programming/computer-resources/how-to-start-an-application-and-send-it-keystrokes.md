---
description: "Learn more about: How to: start an application and send it keystrokes (Visual Basic)"
title: "How to: start an Application and send it Keystrokes - Visual Basic"
ms.date: 10/23/2019
helpviewer_keywords:
  - "keystrokes, sending"
  - "Shell command example [Visual Basic]"
  - "processes, starting and sending keystrokes"
  - "SendKeys.SendWait examples"
ms.assetid: f1303184-fce4-44fb-88b4-aac5f42d5d77
---
# How to: start an application and send it keystrokes (Visual Basic)

This example uses the [Microsoft.VisualBasic.Interaction.Shell*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Interaction.Shell*) method to start the Notepad application and then prints a sentence by sending keystrokes using the [My.Computer.Keyboard.SendKeys](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices.Keyboard.SendKeys%252A) method.

## Example

[VbVbalrMyComputer#25 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrMyComputer/VB/Class2.vb#25)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrMyComputer/VB/Class2.vb.md)

## Robust programming

An [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) exception is raised if an application with the requested process identifier cannot be found.

## .NET Framework Security

The call to the `Shell` function requires full trust ([System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException) class).

## See also

- [Microsoft.VisualBasic.Devices.Keyboard.SendKeys*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices.Keyboard.SendKeys*)
- [Microsoft.VisualBasic.Interaction.Shell*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Interaction.Shell*)
- [Microsoft.VisualBasic.Interaction.AppActivate*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Interaction.AppActivate*)
