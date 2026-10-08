---
title: "Breaking change: TableLayoutStyleCollection throws ArgumentException"
description: Learn about the breaking change in .NET 8 for Windows Forms where inserting or removing an object that's not a TableLayoutStyle throws an exception.
ms.date: 02/06/2023
---
# TableLayoutStyleCollection throws ArgumentException

[System.Windows.Forms.TableLayoutStyleCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TableLayoutStyleCollection) enforces the type passed to its collection operations. The [affected APIs](#affected-apis) now throw an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) instead of an [System.InvalidCastException](https://learn.microsoft.com/search/?terms=System.InvalidCastException) if the input is not of type [System.Windows.Forms.TableLayoutStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TableLayoutStyle).

## Version introduced

.NET 8 Preview 1

## Previous behavior

Previously, if the input couldn't be converted to type [System.Windows.Forms.TableLayoutStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TableLayoutStyle), an [System.InvalidCastException](https://learn.microsoft.com/search/?terms=System.InvalidCastException) was thrown.

## New behavior

Starting in .NET 8, if the input can't be converted to type [System.Windows.Forms.TableLayoutStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TableLayoutStyle), an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) is thrown.

## Change category

This change is a [*behavioral change*](../../categories.md#behavioral-change).

## Reason for change

This change helps to make exception types consistent across the code base.

## Recommended action

For most scenarios, this change should not have a significant impact. However, if you previously handled [System.InvalidCastException](https://learn.microsoft.com/search/?terms=System.InvalidCastException), update your code to handle [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) instead.

## Affected APIs

- [System.Windows.Forms.TableLayoutStyleCollection.System%23Collections%23IList%23Add(System.Object)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TableLayoutStyleCollection.System%2523Collections%2523IList%2523Add(System.Object))
- [System.Windows.Forms.TableLayoutStyleCollection.System%23Collections%23IList%23Insert(System.Int32,System.Object)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TableLayoutStyleCollection.System%2523Collections%2523IList%2523Insert(System.Int32%2CSystem.Object))
- [System.Windows.Forms.TableLayoutStyleCollection.System%23Collections%23IList%23Remove(System.Object)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TableLayoutStyleCollection.System%2523Collections%2523IList%2523Remove(System.Object))
