---
title: "Breaking change - FilePatternMatch.Stem changed to non-nullable"
description: "Learn about the breaking change in .NET 10 where FilePatternMatch.Stem property was changed from nullable to non-nullable."
ms.date: 09/08/2025
ai-usage: ai-assisted
ms.custom: https://github.com/dotnet/docs/issues/47914
---

# FilePatternMatch.Stem changed to non-nullable

The [Microsoft.Extensions.FileSystemGlobbing.FilePatternMatch.Stem](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileSystemGlobbing.FilePatternMatch.Stem) property was previously annotated as nullable because the `PatternTestResult.Stem` property it gets its value from is nullable. While the [Microsoft.Extensions.FileSystemGlobbing.Internal.PatternTestResult](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileSystemGlobbing.Internal.PatternTestResult) can indeed be null if the result isn't successful, the `FilePatternMatch` never is because it's only constructed when `PatternTestResult` is successful.

To accurately reflect nullability, the `[MemberNotNullWhen()]` attribute is applied to the `PatternTestResult.Stem` property to tell the compiler it won't be null if it's successful. Additionally, the `stem` argument passed into the `FilePatternMatch` constructor is no longer nullable, and an `ArgumentNullException` will be thrown if a null `stem` is passed in.

## Version introduced

.NET 10

## Previous behavior

Previously, the [Microsoft.Extensions.FileSystemGlobbing.FilePatternMatch](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileSystemGlobbing.FilePatternMatch) constructor accepted `null` for the `stem` parameter without any compile-time or runtime warnings or errors.

```csharp
// Allowed in previous versions.
var match = new FilePatternMatch("path/to/file.txt", null);
```

The [Microsoft.Extensions.FileSystemGlobbing.FilePatternMatch.Stem](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileSystemGlobbing.FilePatternMatch.Stem) property was also annotated as being nullable.

## New behavior

Starting in .NET 10, passing a `null` or possibly-null value to the `stem` argument in the [Microsoft.Extensions.FileSystemGlobbing.FilePatternMatch](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileSystemGlobbing.FilePatternMatch) constructor yields a compile-time warning. And, if `null` is passed in, a runtime [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) is thrown.

The [Microsoft.Extensions.FileSystemGlobbing.FilePatternMatch.Stem](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileSystemGlobbing.FilePatternMatch.Stem) property is now annotated to indicate that the value won't be null if `IsSuccessful` is `true`.

```csharp
// Generates compile-time warning.
var match = new FilePatternMatch("path/to/file.txt", null);
```

## Type of breaking change

This change can affect [source compatibility](../../categories.md#source-compatibility) and is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

The previous nullability annotations were inaccurate, and a `null` value for the `stem` argument was unexpected but not properly guarded against. This change reflects the expected behavior of the API and guards against unpredictable behavior while also producing design-time guidance around usage.

## Recommended action

If a possibly null value was passed in for the `stem` argument, review usage and update the call site to ensure `stem` can't be passed in as `null`.

If you applied nullability warning suppressions when consuming the `FilePatternMatch.Stem` property, you can remove those suppressions.

## Affected APIs

- [FilePatternMatch(String,String) constructor](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileSystemGlobbing.FilePatternMatch.%2523ctor\(System.String%2CSystem.String\))
- [Microsoft.Extensions.FileSystemGlobbing.FilePatternMatch.Stem](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.FileSystemGlobbing.FilePatternMatch.Stem)
