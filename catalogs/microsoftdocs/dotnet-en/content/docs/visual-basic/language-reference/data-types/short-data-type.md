---
description: "Learn more about: Short data type (Visual Basic)"
title: "Short Data Type"
ms.date: 01/31/2018
f1_keywords: 
  - "vb.Short"
helpviewer_keywords: 
  - "numbers [Visual Basic], whole"
  - "whole numbers"
  - "integral data types [Visual Basic]"
  - "integer numbers"
  - "numbers [Visual Basic], integer"
  - "integers [Visual Basic], data types"
  - "integers [Visual Basic], types"
  - "data types [Visual Basic], integral"
  - "S literal type character [Visual Basic]"
  - "Short data type"
  - "literal type characters [Visual Basic], S"
ms.assetid: 65fcbcf3-a841-400e-885e-301497729a8b
---
# Short data type (Visual Basic)

Holds signed 16-bit (2-byte) integers that range in value from -32,768 through 32,767.  
  
## Remarks  

 Use the `Short` data type to contain integer values that do not require the full data width of `Integer`. In some cases, the common language runtime can pack your `Short` variables closely together and save memory consumption.  
  
 The default value of `Short` is 0.  
  
## Literal assignments

You can declare and initialize a `Short` variable by assigning it a decimal literal, a hexadecimal literal, an octal literal, or (starting with Visual Basic 2017) a binary literal. If the integer literal is outside the range of `Short` (that is, if it is less than [System.Int16.MinValue](https://learn.microsoft.com/search/?terms=System.Int16.MinValue) or greater than [System.Int16.MaxValue](https://learn.microsoft.com/search/?terms=System.Int16.MaxValue), a compilation error occurs.

In the following example, integers equal to 1,034 that are represented as decimal, hexadecimal, and binary literals are implicitly converted from [Integer](integer-data-type.md) to `Short` values.

[Short (complete source file; reference: ../../../../samples/snippets/visualbasic/language-reference/data-types/numeric-literals.vb#Short)](../../../../_code/samples/snippets/visualbasic/language-reference/data-types/numeric-literals.vb.md)

> **Note:**
> You use the prefix `&h` or `&H` to denote a hexadecimal literal, the prefix `&b` or `&B` to denote a binary literal, and the prefix `&o` or `&O` to denote an octal literal. Decimal literals have no prefix.

Starting with Visual Basic 2017, you can also use the underscore character, `_`, as a digit separator to enhance readability, as the following example shows.

[Short (complete source file; reference: ../../../../samples/snippets/visualbasic/language-reference/data-types/numeric-literals.vb#ShortS)](../../../../_code/samples/snippets/visualbasic/language-reference/data-types/numeric-literals.vb.md)

Starting with Visual Basic 15.5, you can also use the underscore character (`_`) as a leading separator between the prefix and the hexadecimal, binary, or octal digits. For example:

```vb
Dim number As Short = &H_3264
```


To use the underscore character as a leading separator, you must add the following element to your Visual Basic project (\*.vbproj) file:

```xml
<PropertyGroup>
  <LangVersion>15.5</LangVersion>
</PropertyGroup>
```

For more information see [Select the Visual Basic language version](../configure-language-version.md).


Numeric literals can also include the `S` [type character](../../programming-guide/language-features/data-types/type-characters.md) to denote the `Short` data type, as the following example shows.

```vb
Dim number = &H_3264S
```

## Programming tips

- **Widening.** The `Short` data type widens to `Integer`, `Long`, `Decimal`, `Single`, or `Double`. This means you can convert `Short` to any one of these types without encountering a [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException) error.  
  
- **Type Characters.** Appending the literal type character `S` to a literal forces it to the `Short` data type. `Short` has no identifier type character.  
  
- **Framework Type.** The corresponding type in the .NET Framework is the [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16) structure.  
  
## See also

- [System.Int16](https://learn.microsoft.com/search/?terms=System.Int16)
- [Data Types](index.md)
- [Type Conversion Functions](../functions/type-conversion-functions.md)
- [Conversion Summary](../keywords/conversion-summary.md)
- [Integer Data Type](integer-data-type.md)
- [Long Data Type](long-data-type.md)
- [Efficient Use of Data Types](../../programming-guide/language-features/data-types/efficient-use-of-data-types.md)
