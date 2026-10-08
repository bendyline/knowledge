---
title: "Breaking change: Unicode category changed for some Latin-1 characters"
description: Learn about the globalization breaking change in .NET 5 where Char methods now return the correct Unicode category for characters in the Latin-1 range.
ms.date: 04/07/2020
---
# Unicode category changed for some Latin-1 characters

[System.Char](https://learn.microsoft.com/search/?terms=System.Char) methods now return the correct Unicode category for characters in the Latin-1 range. The category matches that of the Unicode standard.

## Change description

In previous .NET versions, [System.Char](https://learn.microsoft.com/search/?terms=System.Char) methods used a fixed list of Unicode categories for characters in the Latin-1 range. However, the Unicode standard has changed the categories of some of these characters since those APIs were implemented, creating a discrepancy. In addition, there was also a discrepancy between [System.Char](https://learn.microsoft.com/search/?terms=System.Char) and [System.Globalization.CharUnicodeInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CharUnicodeInfo) APIs, which follow the Unicode standard. In .NET 5 and later versions, [System.Char](https://learn.microsoft.com/search/?terms=System.Char) methods use and return the Unicode category that matches the Unicode standard for all characters.

The following table shows the characters whose Unicode categories have changed in .NET 5:

| Character | Unicode category<br>in previous .NET versions | Unicode category<br>in .NET 5 and later versions |
| :---: | :---: | :---: |
| § (\u00a7) | `OtherSymbol` | `OtherPunctuation` |
| ª (\u00aa) | `LowercaseLetter` | `OtherLetter` |
| SHY (\u00ad) | `DashPunctuation` | `Format` |
| ¶ (\u00b6) | `OtherSymbol` | `OtherPunctuation` |
| º (\u00ba) | `LowercaseLetter` | `OtherLetter` |

## Version introduced

.NET 5.0

## Recommended action

If you have any code that gets the Unicode character category by using the [System.Char](https://learn.microsoft.com/search/?terms=System.Char) class and assumes the category will never change, you may need to update it.

## Reason for change

This change was made so that the categories returned by the [System.Char](https://learn.microsoft.com/search/?terms=System.Char) type are consistent with both the Unicode standard and the [System.Globalization.CharUnicodeInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CharUnicodeInfo) type.

## Affected APIs

- [System.Char.GetUnicodeCategory*](https://learn.microsoft.com/search/?terms=System.Char.GetUnicodeCategory*)
- [System.Char.IsLetter*](https://learn.microsoft.com/search/?terms=System.Char.IsLetter*)
- [System.Char.IsPunctuation*](https://learn.microsoft.com/search/?terms=System.Char.IsPunctuation*)
- [System.Char.IsSymbol*](https://learn.microsoft.com/search/?terms=System.Char.IsSymbol*)
- [System.Char.IsLower*](https://learn.microsoft.com/search/?terms=System.Char.IsLower*)

Additionally, any class that depends on [System.Char](https://learn.microsoft.com/search/?terms=System.Char) to obtain the Unicode character category, for example, [System.Text.RegularExpressions.Regex](https://learn.microsoft.com/search/?terms=System.Text.RegularExpressions.Regex), is affected by this change.

<!--

### Affected APIs

- `Overload:System.Char.GetUnicodeCategory`
- `Overload:System.Char.IsLetter`
- `Overload:System.Char.IsPunctuation`
- `Overload:System.Char.IsSymbol`
- `Overload:System.Char.IsLower`

### Category

- Core .NET libraries
- Globalization

-->
