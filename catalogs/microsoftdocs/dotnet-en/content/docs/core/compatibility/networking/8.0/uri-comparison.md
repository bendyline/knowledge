---
title: "Breaking change: User info in `mailto:` URIs is compared"
description: Learn about the .NET 8 breaking change in networking where URI comparison now considers user info for `mailto:` URIs.
ms.date: 10/03/2024
---
# User info in `mailto:` URIs is compared

Previously, [System.Uri](https://learn.microsoft.com/search/?terms=System.Uri) didn't compare user info when comparing two `Uri` instances for equality. However, this behavior is not intuitive in the case of `mailto:` URIs. With this change, [System.Uri.Equals*](https://learn.microsoft.com/search/?terms=System.Uri.Equals*) and the [`==`](https://learn.microsoft.com/search/?terms=System.Uri.op_Equality\(System.Uri%2CSystem.Uri\)) operator now consider user info when comparing URIs.

## Previous behavior

Prior to .NET 8, both of the following comparisons returned `true`.

```csharp
Uri uri1 = new Uri("https://user1@www.microsoft.com");
Uri uri2 = new Uri("https://user2@www.microsoft.com");
System.Console.WriteLine(uri1 == uri2); // True.

Uri uri3 = new Uri("mailto:user1@microsoft.com");
Uri uri4 = new Uri("mailto:user2@microsoft.com");
System.Console.WriteLine(uri3 == uri4); // True.
```

## New behavior

Starting in .NET 8, the first comparison still returns `true`, but the second comparison (of `mailto` URIs) returns `false`.

```csharp
Uri uri1 = new Uri("https://user1@www.microsoft.com");
Uri uri2 = new Uri("https://user2@www.microsoft.com");
System.Console.WriteLine(uri1 == uri2); // True.

Uri uri3 = new Uri("mailto:user1@microsoft.com");
Uri uri4 = new Uri("mailto:user2@microsoft.com");
System.Console.WriteLine(uri3 == uri4); // False.
```

## Version introduced

.NET 8

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

The previous behavior was unexpected and unintuitive.

## Recommended action

If you want to compare only the host part of email addresses, compare only the [System.Uri.Host](https://learn.microsoft.com/search/?terms=System.Uri.Host) members.

## Affected APIs

- [System.Uri.Equals(System.Uri)](https://learn.microsoft.com/search/?terms=System.Uri.Equals(System.Uri))
- [System.Uri.Equals(System.Object)](https://learn.microsoft.com/search/?terms=System.Uri.Equals(System.Object))
- [System.Uri.op_Equality(System.Uri,System.Uri)](https://learn.microsoft.com/search/?terms=System.Uri.op_Equality(System.Uri%2CSystem.Uri))
