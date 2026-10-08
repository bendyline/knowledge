---
title: "Breaking change: ManagementDateTimeConverter.ToDateTime returns a local time"
description: Learn about the .NET 8 breaking change in .NET extensions where the DateTime returned by ManagementDateTimeConverter.ToDateTime is based on local time.
ms.date: 10/05/2023
---
# ManagementDateTimeConverter.ToDateTime returns a local time

The [System.DateTime](https://learn.microsoft.com/search/?terms=System.DateTime) value returned by [System.Management.ManagementDateTimeConverter.ToDateTime(System.String)](https://learn.microsoft.com/search/?terms=System.Management.ManagementDateTimeConverter.ToDateTime(System.String)) is now based on the local time zone.

## Version introduced

.NET 8 RC 1

## Previous behavior

Previously, [System.Management.ManagementDateTimeConverter.ToDateTime(System.String)](https://learn.microsoft.com/search/?terms=System.Management.ManagementDateTimeConverter.ToDateTime(System.String)) returned a value whose [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) value was [System.DateTimeKind.Unspecified](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Unspecified).

## New behavior

Starting in .NET 8, [System.Management.ManagementDateTimeConverter.ToDateTime(System.String)](https://learn.microsoft.com/search/?terms=System.Management.ManagementDateTimeConverter.ToDateTime(System.String)) returns a value whose [System.DateTime.Kind](https://learn.microsoft.com/search/?terms=System.DateTime.Kind) value was [System.DateTimeKind.Local](https://learn.microsoft.com/search/?terms=System.DateTimeKind.Local).

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

This change was made so that the code matched what the documentation said it did.

## Recommended action

If your code expected the returned value to be based on an unspecified time zone, update it to expect a value that's based on the local time zone.

## Affected APIs

- [System.Management.ManagementDateTimeConverter.ToDateTime(System.String)](https://learn.microsoft.com/search/?terms=System.Management.ManagementDateTimeConverter.ToDateTime(System.String))
