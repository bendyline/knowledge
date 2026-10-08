---
title: "MsgBox Sample"
description: See a sample of passing string types by values as In parameters using MsgBox. It shows when to use the EntryPoint, CharSet, and ExactSpelling fields in .NET.
ms.date: 07/08/2026
ai-usage: ai-assisted
dev_langs:
  - "csharp"
  - "vb"
  - "cpp"
helpviewer_keywords:
  - "marshaling, MsgBox sample"
  - "data marshalling, MsgBox sample"
---
# MsgBox Sample

This sample demonstrates how to pass string types by value as In parameters and when to use the [System.Runtime.InteropServices.DllImportAttribute.EntryPoint](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportAttribute.EntryPoint), [System.Runtime.InteropServices.DllImportAttribute.CharSet](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportAttribute.CharSet), and [System.Runtime.InteropServices.DllImportAttribute.ExactSpelling](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportAttribute.ExactSpelling) fields.

 The MsgBox sample uses the following unmanaged function, shown with its original function declaration:

- `MessageBox` exported from User32.dll.

    ```cpp
    int MessageBox(HWND hWnd, LPCTSTR lpText, LPCTSTR lpCaption,
       UINT uType);
    ```

 In this sample, the `NativeMethods` class contains a managed prototype for each unmanaged function called by the `MsgBoxSample` class. The managed prototype methods `MsgBox`, `MsgBox2`, and `MsgBox3` have different declarations for the same unmanaged function.

 The declaration for `MsgBox2` produces incorrect output in the message box because the character type, specified as ANSI, is mismatched with the entry point `MessageBoxW`, which is the name of the Unicode function. The declaration for `MsgBox3` creates a mismatch between the `EntryPoint`, `CharSet`, and `ExactSpelling` fields. When called, `MsgBox3` throws an exception. For detailed information on string naming and name marshalling, see [Specifying a Character Set](specifying-a-character-set.md).

## Declaring Prototypes

 [Conceptual.Interop.Marshaling#5 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR/conceptual.interop.marshaling/cpp/msgbox.cpp#5)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR/conceptual.interop.marshaling/cpp/msgbox.cpp.md)
 [Conceptual.Interop.Marshaling#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.interop.marshaling/cs/msgbox.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.interop.marshaling/cs/msgbox.cs.md)
 [Conceptual.Interop.Marshaling#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.interop.marshaling/vb/msgbox.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.interop.marshaling/vb/msgbox.vb.md)

## Calling Functions

 [Conceptual.Interop.Marshaling#6 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR/conceptual.interop.marshaling/cpp/msgbox.cpp#6)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR/conceptual.interop.marshaling/cpp/msgbox.cpp.md)
 [Conceptual.Interop.Marshaling#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.interop.marshaling/cs/msgbox.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/conceptual.interop.marshaling/cs/msgbox.cs.md)
 [Conceptual.Interop.Marshaling#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.interop.marshaling/vb/msgbox.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.interop.marshaling/vb/msgbox.vb.md)

## See also

- [Marshalling Strings](marshalling-strings.md)
- [Default Marshalling for Strings](default-marshalling-for-strings.md)
- [Creating Prototypes in Managed Code](creating-prototypes-in-managed-code.md)
- [Specifying a Character Set](specifying-a-character-set.md)
