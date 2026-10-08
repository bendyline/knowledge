---
title: "Creating New Strings"
description: Learn to create strings using assignment, class constructors, or System.String methods that combine several strings, arrays of strings, or objects in .NET.
ms.date: "03/16/2026"
ai-usage: ai-assisted
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "CopyTo method"
  - "Join method"
  - "Format method"
  - "Concat method"
  - "strings [.NET], creating"
  - "Insert method"
  - "Create method"
---
# Create new strings in .NET

.NET allows strings to be created using simple assignment, and also overloads a class constructor to support string creation using a number of different parameters. .NET also provides several methods in the [System.String](https://learn.microsoft.com/search/?terms=System.String) class that create new string objects by combining several strings, arrays of strings, or objects.

## Create strings using assignment

The easiest way to create a new [System.String](https://learn.microsoft.com/search/?terms=System.String) object is simply to assign a string literal to a [System.String](https://learn.microsoft.com/search/?terms=System.String) object.

## Create strings using a class constructor

You can use overloads of the [System.String](https://learn.microsoft.com/search/?terms=System.String) class constructor to create strings from character arrays. You can also create a new string by duplicating a particular character a specified number of times. The [System.String.%23ctor(System.ReadOnlySpan{System.Char})](https://learn.microsoft.com/search/?terms=System.String.%2523ctor(System.ReadOnlySpan%7BSystem.Char%7D)) constructor overload accepts a [System.ReadOnlySpan%601](https://learn.microsoft.com/search/?terms=System.ReadOnlySpan%25601) or a stack-allocated [System.Span%601](https://learn.microsoft.com/search/?terms=System.Span%25601) of characters and avoids allocating an intermediate character array on the managed heap when you build small strings of a known size, although the resulting string instance is still allocated on the managed heap.

## Methods that return strings

The following table lists several useful methods that return new string objects.

| Method name | Use |
| --- | --- |
| [System.String.Format%2A](https://learn.microsoft.com/search/?terms=System.String.Format%252A) | Builds a formatted string from a set of input objects. |
| [System.String.Concat%2A](https://learn.microsoft.com/search/?terms=System.String.Concat%252A) | Builds strings from two or more strings. |
| [System.String.Join%2A](https://learn.microsoft.com/search/?terms=System.String.Join%252A) | Builds a new string by combining an array of strings. |
| [System.String.Insert%2A](https://learn.microsoft.com/search/?terms=System.String.Insert%252A) | Builds a new string by inserting a string into the specified index of an existing string. |
| [System.String.CopyTo%2A](https://learn.microsoft.com/search/?terms=System.String.CopyTo%252A) | Copies specified characters in a string into a specified position in an array of characters. |
| [System.String.Create%2A](https://learn.microsoft.com/search/?terms=System.String.Create%252A) | Creates a new string of a specified length, populating characters via a callback that receives a writable [System.Span%601](https://learn.microsoft.com/search/?terms=System.Span%25601) and a caller-supplied state object. |

### `String.Format`

You can use the `String.Format` method to create formatted strings and concatenate strings representing multiple objects. This method automatically converts any passed object into a string. For example, if your application must display an `Int32` value and a `DateTime` value to the user, you can easily construct a string to represent these values using the `Format` method. For information about formatting conventions used with this method, see the section on [composite formatting](composite-formatting.md).

The following example uses the `Format` method to create a string that uses an integer variable.

[Strings.Creating#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Strings.Creating/cs/Example.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Strings.Creating/cs/Example.cs.md)
[Strings.Creating#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Strings.Creating/vb/Example.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Strings.Creating/vb/Example.vb.md)

In this example, [System.DateTime.Now%2A](https://learn.microsoft.com/search/?terms=System.DateTime.Now%252A) displays the current date and time in a manner specified by the culture associated with the current thread.

### `String.Concat`

The `String.Concat` method can be used to easily create a new string object from two or more existing objects. It provides a language-independent way to concatenate strings. This method accepts any class that derives from `System.Object`. The following example creates a string from two existing string objects and a separating character.

[Strings.Creating#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Strings.Creating/cs/Example.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Strings.Creating/cs/Example.cs.md)
[Strings.Creating#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Strings.Creating/vb/Example.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Strings.Creating/vb/Example.vb.md)

### `String.Join`

The `String.Join` method creates a new string from an array of strings and a separator string. This method is useful if you want to concatenate multiple strings together, making a list perhaps separated by a comma.

The following example uses a space to bind a string array.

[Strings.Creating#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Strings.Creating/cs/Example.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Strings.Creating/cs/Example.cs.md)
[Strings.Creating#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Strings.Creating/vb/Example.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Strings.Creating/vb/Example.vb.md)

### `String.Insert`

The `String.Insert` method creates a new string by inserting a string into a specified position in another string. This method uses a zero-based index. The following example inserts a string into the fifth index position of `MyString` and creates a new string with this value.

[Strings.Creating#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Strings.Creating/cs/Example.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Strings.Creating/cs/Example.cs.md)
[Strings.Creating#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Strings.Creating/vb/Example.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Strings.Creating/vb/Example.vb.md)

### `String.CopyTo`

The `String.CopyTo` method copies portions of a string into an array of characters. You can specify both the beginning index of the string and the number of characters to be copied. This method takes the source index, an array of characters, the destination index, and the number of characters to copy. All indexes are zero-based.

The following example uses the `CopyTo` method to copy the characters of the word "Hello" from a string object to the first index position of an array of characters.

[Strings.Creating#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Strings.Creating/cs/Example.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Strings.Creating/cs/Example.cs.md)
[Strings.Creating#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Strings.Creating/vb/Example.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Strings.Creating/vb/Example.vb.md)

### `String.Create`

The [System.String.Create%2A](https://learn.microsoft.com/search/?terms=System.String.Create%252A) method lets you programmatically fill a new string's characters using a callback. The callback receives a writable [System.Span%601](https://learn.microsoft.com/search/?terms=System.Span%25601) of characters and a caller-supplied state object, so you can build the string's content without allocating intermediate character buffers. The callback itself might still allocate, for example if it captures local variables or calls other allocation-heavy APIs.

The following example uses `String.Create` to build a five-character string from consecutive alphabet characters:

[language="csharp" source="./snippets/creating-new/csharp/Program.cs" id="UsingStringCreate"::: (complete source file; reference: ./snippets/creating-new/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/creating-new/csharp/Program.cs.md)
[language="vb" source="./snippets/creating-new/vb/Program.vb" id="UsingStringCreate"::: (complete source file; reference: ./snippets/creating-new/vb/Program.vb)](../../../_code/docs/standard/base-types/snippets/creating-new/vb/Program.vb.md)

`String.Create` is designed for performance-sensitive scenarios where you know the final string length in advance and want to avoid allocating intermediate character buffers. The runtime allocates a new string, passes its backing buffer directly to your callback as a `Span<char>`, and returns the immutable string once the callback returns. No copy of the data occurs after the callback completes.

#### `String.Create` vs. `new String(Span<char>)`

Another option for building strings efficiently is to allocate a character buffer with `stackalloc`, fill it, and pass it to the `String(ReadOnlySpan<char>)` constructor:

[language="csharp" source="./snippets/creating-new/csharp/Program.cs" id="UsingSpanConstructor"::: (complete source file; reference: ./snippets/creating-new/csharp/Program.cs)](../../../_code/docs/standard/base-types/snippets/creating-new/csharp/Program.cs.md)

Both approaches allocate the final string exactly once. The key differences are:

- **`stackalloc` + `new string(span)`** places the working buffer on the stack. This is fastest for *small, fixed-size* buffers, but the stack is a finite resource; large or deeply nested allocations can cause a `StackOverflowException`. This example shows the C# `stackalloc` pattern; Visual Basic doesn't support `stackalloc`, but it can still call the `String(ReadOnlySpan<char>)` constructor when you have a `ReadOnlySpan<char>`.
- **`String.Create`** allocates the working buffer on the heap as part of the string object itself, so there's no stack pressure. It also accepts a typed state parameter that the runtime passes to your callback without boxing, avoiding boxing allocations when the state is a reference type or a non-captured struct.
In general, prefer `stackalloc` + `new String(span)` for small strings (typically fewer than a few hundred characters) with a known, bounded size. Use `String.Create` when the size might be large, when you want to avoid stack pressure, or when passing state into the callback without boxing.

## See also

- [Composite Formatting](composite-formatting.md)
