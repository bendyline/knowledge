---
title: "Breaking change - BufferedStream.WriteByte no longer performs implicit flush"
description: "Learn about the breaking change in .NET 10 where BufferedStream.WriteByte no longer performs an implicit flush when the internal buffer is full."
ms.date: 10/13/2025
ai-usage: ai-assisted
dev_langs:
  - "csharp"
  - "vb"
---

# BufferedStream.WriteByte no longer performs implicit flush

The [System.IO.BufferedStream.WriteByte(System.Byte)](https://learn.microsoft.com/search/?terms=System.IO.BufferedStream.WriteByte(System.Byte)) method no longer performs an implicit flush when the internal buffer is full. This change aligns the behavior of `BufferedStream.WriteByte` with other `Write` methods in the [System.IO.BufferedStream](https://learn.microsoft.com/search/?terms=System.IO.BufferedStream) class, such as [System.IO.BufferedStream.Write(System.Byte\[\],System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.IO.BufferedStream.Write(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32)) and [System.IO.BufferedStream.WriteAsync(System.Byte\[\],System.Int32,System.Int32,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.IO.BufferedStream.WriteAsync(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32%2CSystem.Threading.CancellationToken)), which don't perform an implicit flush.

## Version introduced

.NET 10

## Previous behavior

Previously, when the internal buffer of a `BufferedStream` was full, calling `WriteByte` automatically flushed the buffer to the underlying stream. This behavior was inconsistent with other `Write` methods in `BufferedStream`.

The following example demonstrates the previous behavior:

[language="csharp" source="./snippets/bufferedstream-writebyte-flush/csharp/Program.cs" id="PreviousBehavior"::: (complete source file; reference: ./snippets/bufferedstream-writebyte-flush/csharp/Program.cs)](../../../../../_code/docs/core/compatibility/core-libraries/10.0/snippets/bufferedstream-writebyte-flush/csharp/Program.cs.md)
[language="vb" source="./snippets/bufferedstream-writebyte-flush/vb/Program.vb" id="PreviousBehavior"::: (complete source file; reference: ./snippets/bufferedstream-writebyte-flush/vb/Program.vb)](../../../../../_code/docs/core/compatibility/core-libraries/10.0/snippets/bufferedstream-writebyte-flush/vb/Program.vb.md)

## New behavior

Starting in .NET 10, the `WriteByte` method no longer performs an implicit flush when the internal buffer is full. The buffer is only flushed when the [System.IO.BufferedStream.Flush](https://learn.microsoft.com/search/?terms=System.IO.BufferedStream.Flush) method is explicitly called or when the `BufferedStream` is disposed.

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

The implicit flush behavior of [System.IO.BufferedStream.WriteByte(System.Byte)](https://learn.microsoft.com/search/?terms=System.IO.BufferedStream.WriteByte(System.Byte)) was inconsistent with other `Write` methods in the `BufferedStream` class, such as `Write` and `WriteAsync`. This inconsistency could lead to unexpected performance issues or unintended side effects when working with streams that are sensitive to flush operations. Removing the implicit flush ensures consistent behavior across all `Write` methods in `BufferedStream`.

## Recommended action

If your application relies on the implicit flush behavior of `BufferedStream.WriteByte`, update your code to explicitly call the `Flush` method when needed. For example:

**Before:**

[language="csharp" source="./snippets/bufferedstream-writebyte-flush/csharp/Program.cs" id="Before"::: (complete source file; reference: ./snippets/bufferedstream-writebyte-flush/csharp/Program.cs)](../../../../../_code/docs/core/compatibility/core-libraries/10.0/snippets/bufferedstream-writebyte-flush/csharp/Program.cs.md)
[language="vb" source="./snippets/bufferedstream-writebyte-flush/vb/Program.vb" id="Before"::: (complete source file; reference: ./snippets/bufferedstream-writebyte-flush/vb/Program.vb)](../../../../../_code/docs/core/compatibility/core-libraries/10.0/snippets/bufferedstream-writebyte-flush/vb/Program.vb.md)

**After:**

[language="csharp" source="./snippets/bufferedstream-writebyte-flush/csharp/Program.cs" id="After"::: (complete source file; reference: ./snippets/bufferedstream-writebyte-flush/csharp/Program.cs)](../../../../../_code/docs/core/compatibility/core-libraries/10.0/snippets/bufferedstream-writebyte-flush/csharp/Program.cs.md)
[language="vb" source="./snippets/bufferedstream-writebyte-flush/vb/Program.vb" id="After"::: (complete source file; reference: ./snippets/bufferedstream-writebyte-flush/vb/Program.vb)](../../../../../_code/docs/core/compatibility/core-libraries/10.0/snippets/bufferedstream-writebyte-flush/vb/Program.vb.md)

## Affected APIs

- [System.IO.BufferedStream.WriteByte(System.Byte)](https://learn.microsoft.com/search/?terms=System.IO.BufferedStream.WriteByte(System.Byte))
