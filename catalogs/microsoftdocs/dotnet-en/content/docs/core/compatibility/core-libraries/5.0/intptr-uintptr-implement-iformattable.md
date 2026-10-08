---
title: "Breaking change: IntPtr and UIntPtr implement IFormattable"
description: Learn about the .NET 5 breaking change in core .NET libraries where IntPtr and UIntPtr now implement IFormattable.
ms.date: 11/01/2020
---
# IntPtr and UIntPtr implement IFormattable

[System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) and [System.UIntPtr](https://learn.microsoft.com/search/?terms=System.UIntPtr) now implement [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable). Functions that check for [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) support may now return different results for these types, because they may pass in a format specifier and a culture.

## Change description

In previous versions of .NET, [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) and [System.UIntPtr](https://learn.microsoft.com/search/?terms=System.UIntPtr) do not implement [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable). Functions that check for [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) may fall back to just calling [System.IntPtr.ToString*](https://learn.microsoft.com/search/?terms=System.IntPtr.ToString*) or [System.UIntPtr.ToString*](https://learn.microsoft.com/search/?terms=System.UIntPtr.ToString*), which means that format specifiers and cultures are not respected.

In .NET 5 and later versions, [System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) and [System.UIntPtr](https://learn.microsoft.com/search/?terms=System.UIntPtr) implement [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable). Functions that check for [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) support may now return different results for these types, because they may pass in a format specifier and a culture.

This change impacts scenarios like interpolated strings and [System.Console.WriteLine*](https://learn.microsoft.com/search/?terms=System.Console.WriteLine*), among others.

## Reason for change

[System.IntPtr](https://learn.microsoft.com/search/?terms=System.IntPtr) and [System.UIntPtr](https://learn.microsoft.com/search/?terms=System.UIntPtr) now have language support in C# through the `nint` and `nuint` keywords. The backing types were updated to provide near parity (where possible) with functionality exposed by other primitive types, such as [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32).

## Version introduced

5.0

## Recommended action

If you don't want a format specifier or custom culture to be used when displaying values of these types, you can call the [System.IntPtr.ToString](https://learn.microsoft.com/search/?terms=System.IntPtr.ToString) and [System.UIntPtr.ToString](https://learn.microsoft.com/search/?terms=System.UIntPtr.ToString) overloads of `ToString()`.

## Affected APIs

Not detectable via API analysis.

<!--

### Category

Core .NET libraries

### Affected APIs

Not detectable via API analysis.

-->
