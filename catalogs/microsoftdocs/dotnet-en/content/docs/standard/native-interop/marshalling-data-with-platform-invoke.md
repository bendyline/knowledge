---
title: "Marshalling Data with Platform Invoke"
description: Marshal data with platform invoke in .NET. See a list of data types used in Windows APIs and C-style functions, and find their .NET managed type equivalents.
ms.date: 07/08/2026
ai-usage: ai-assisted
dev_langs:
  - "csharp"
  - "vb"
  - "cpp"
helpviewer_keywords:
  - "platform invoke, marshalling data"
  - "data marshalling, platform invoke"
  - "marshaling, platform invoke"
---
# Marshalling Data with Platform Invoke

To call functions exported from an unmanaged library, a .NET application requires a function prototype in managed code that represents the unmanaged function. To create a prototype that enables platform invoke to marshal data correctly, you must do the following:

- Apply the [System.Runtime.InteropServices.DllImportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportAttribute) attribute to the static function or method in managed code.

- Substitute managed data types for unmanaged data types.

You can use the documentation supplied with an unmanaged function to construct an equivalent managed prototype by applying the attribute with its optional fields and substituting managed data types for unmanaged types. For instructions about how to apply the [System.Runtime.InteropServices.DllImportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportAttribute), see [Consuming Unmanaged DLL Functions](consuming-unmanaged-dll-functions.md).

This section provides samples that demonstrate how to create managed function prototypes for passing arguments to and receiving return values from functions exported by unmanaged libraries. The samples also demonstrate when to use the [System.Runtime.InteropServices.MarshalAsAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.MarshalAsAttribute) attribute and the [System.Runtime.InteropServices.Marshal](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal) class to explicitly marshal data.

## Platform invoke data types

The following table lists data types used in the Windows APIs and C-style functions. Many unmanaged libraries contain functions that pass these data types as parameters and return values. The third column lists the corresponding .NET built-in value type or class that you use in managed code. In some cases, you can substitute a type of the same size for the type listed in the table.

| Unmanaged type in Windows APIs | Unmanaged C language type | Managed type | Description |
| --- | --- | --- | --- |
| `VOID` | `void` | [System.Void](https://learn.microsoft.com/search/?terms=System.Void) | Applied to a function that does not return a value. |
| `HANDLE` | `void *` | [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) or [System.UIntPtr](https://learn.microsoft.com/search/?terms=System.UIntPtr) | 32 bits on 32-bit Windows operating systems, 64 bits on 64-bit Windows operating systems. |
| `BYTE` | `unsigned char` | [System.Byte](https://learn.microsoft.com/search/?terms=System.Byte) | 8 bits |
| `SHORT` | `short` | [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16) | 16 bits |
| `WORD` | `unsigned short` | [System.UInt16](https://learn.microsoft.com/search/?terms=System.UInt16) | 16 bits |
| `INT` | `int` | [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) | 32 bits |
| `UINT` | `unsigned int` | [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) | 32 bits |
| `LONG` | `long` | [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) | 32 bits |
| `BOOL` | `long` | [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) or [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) | 32 bits |
| `DWORD` | `unsigned long` | [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) | 32 bits |
| `ULONG` | `unsigned long` | [System.UInt32](https://learn.microsoft.com/search/?terms=System.UInt32) | 32 bits |
| `CHAR` | `char` | [System.Char](https://learn.microsoft.com/search/?terms=System.Char) | Decorate with ANSI. |
| `WCHAR` | `wchar_t` | [System.Char](https://learn.microsoft.com/search/?terms=System.Char) | Decorate with Unicode. |
| `LPSTR` | `char *` | [System.String](https://learn.microsoft.com/search/?terms=System.String) or [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) | Decorate with ANSI. |
| `LPCSTR` | `const char *` | [System.String](https://learn.microsoft.com/search/?terms=System.String) or [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) | Decorate with ANSI. |
| `LPWSTR` | `wchar_t *` | [System.String](https://learn.microsoft.com/search/?terms=System.String) or [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) | Decorate with Unicode. |
| `LPCWSTR` | `const wchar_t *` | [System.String](https://learn.microsoft.com/search/?terms=System.String) or [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) | Decorate with Unicode. |
| `FLOAT` | `float` | [System.Single](https://learn.microsoft.com/search/?terms=System.Single) | 32 bits |
| `DOUBLE` | `double` | [System.Double](https://learn.microsoft.com/search/?terms=System.Double) | 64 bits |

For corresponding types in Visual Basic, C#, and C++, see the [Introduction to the .NET class library](../class-library-overview.md#system-namespace).

## PinvokeLib.dll

The following code defines the library functions provided by PInvokeLib.dll. Many samples described in this section call this library.

### Example

[PInvokeLib#1 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR/pinvokelib/cpp/pinvokelib.cpp#1)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR/pinvokelib/cpp/pinvokelib.cpp.md)

[PInvokeLib#2 (complete source file; reference: ../../../samples/snippets/cpp/VS_Snippets_CLR/pinvokelib/cpp/pinvokelib.h#2)](../../../_code/samples/snippets/cpp/VS_Snippets_CLR/pinvokelib/cpp/pinvokelib.h.md)

To call the library functions from managed code, implement managed prototypes for each function you want to invoke. If the unmanaged code uses any custom types, you must also declare those types in your managed code. Decorate each prototype with the [System.Runtime.InteropServices.DllImportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportAttribute) attribute, and use [System.Runtime.InteropServices.StructLayoutAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.StructLayoutAttribute) to control the layout of managed structures so they match the unmanaged equivalents.

### Managed type declarations

The following code shows the managed equivalents of the unmanaged types defined in `PInvokeLib.h`. Each structure uses `StructLayout` to ensure the field layout matches the unmanaged layout:

[language="csharp" source="./snippets/marshalling-data-with-platform-invoke/csharp/PInvokeLibManaged/NativeMethods.cs" id="ManagedTypes"::: (complete source file; reference: ./snippets/marshalling-data-with-platform-invoke/csharp/PInvokeLibManaged/NativeMethods.cs)](../../../_code/docs/standard/native-interop/snippets/marshalling-data-with-platform-invoke/csharp/PInvokeLibManaged/NativeMethods.cs.md)
[language="vb" source="./snippets/marshalling-data-with-platform-invoke/vb/PInvokeLibManaged/NativeMethods.vb" id="ManagedTypes"::: (complete source file; reference: ./snippets/marshalling-data-with-platform-invoke/vb/PInvokeLibManaged/NativeMethods.vb)](../../../_code/docs/standard/native-interop/snippets/marshalling-data-with-platform-invoke/vb/PInvokeLibManaged/NativeMethods.vb.md)

### Managed function prototypes

The following code shows the `DllImport` declarations that expose the unmanaged functions from `PinvokeLib.dll` to managed code:

[language="csharp" source="./snippets/marshalling-data-with-platform-invoke/csharp/PInvokeLibManaged/NativeMethods.cs" id="NativeMethods"::: (complete source file; reference: ./snippets/marshalling-data-with-platform-invoke/csharp/PInvokeLibManaged/NativeMethods.cs)](../../../_code/docs/standard/native-interop/snippets/marshalling-data-with-platform-invoke/csharp/PInvokeLibManaged/NativeMethods.cs.md)
[language="vb" source="./snippets/marshalling-data-with-platform-invoke/vb/PInvokeLibManaged/NativeMethods.vb" id="NativeMethods"::: (complete source file; reference: ./snippets/marshalling-data-with-platform-invoke/vb/PInvokeLibManaged/NativeMethods.vb)](../../../_code/docs/standard/native-interop/snippets/marshalling-data-with-platform-invoke/vb/PInvokeLibManaged/NativeMethods.vb.md)

For more information and examples, see the following articles:

- [Marshalling Classes, Structures, and Unions](marshalling-classes-structures-and-unions.md)
- [Marshalling Strings](marshalling-strings.md)
- [Marshalling Different Types of Arrays](marshalling-different-types-of-arrays.md)
