---
title: "Breaking change: ComponentDesigner.Initialize throws ArgumentNullException"
description: Learn about the breaking change in .NET 9 for Windows Forms where ComponentDesigner.Initialize now throws ArgumentNullException if the component argument is null.
ms.date: 01/16/2024
---
# ComponentDesigner.Initialize throws ArgumentNullException

[System.ComponentModel.Design.ComponentDesigner.Initialize*](https://learn.microsoft.com/search/?terms=System.ComponentModel.Design.ComponentDesigner.Initialize*) was updated to throw an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) if the component argument is `null`.

## Version introduced

.NET 9 Preview 1

## Previous behavior

Previously, [System.ComponentModel.Design.ComponentDesigner.Initialize*](https://learn.microsoft.com/search/?terms=System.ComponentModel.Design.ComponentDesigner.Initialize*) accepted a `null` argument, but resulted in a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) or other exception later on.

## New behavior

Starting in .NET 9, [System.ComponentModel.Design.ComponentDesigner.Initialize*](https://learn.microsoft.com/search/?terms=System.ComponentModel.Design.ComponentDesigner.Initialize*) throws an [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException) if the argument is `null`.

## Change category

This change is a [*behavioral change*](../../categories.md#behavioral-change).

## Reason for change

During the process of enabling nullability in the code file, it was discovered that many methods and properties, both in [System.ComponentModel.Design.ComponentDesigner](https://learn.microsoft.com/search/?terms=System.ComponentModel.Design.ComponentDesigner) and its subclasses, relied on the passed-in component to be initialized to non-`null`. These methods and properties resulted in a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) or another exception later on if they were initialized with a `null` value.

## Recommended action

Make sure you don't call [System.ComponentModel.Design.ComponentDesigner.Initialize*](https://learn.microsoft.com/search/?terms=System.ComponentModel.Design.ComponentDesigner.Initialize*) with a `null` argument.

## Affected APIs

- [System.ComponentModel.Design.ComponentDesigner.Initialize*](https://learn.microsoft.com/search/?terms=System.ComponentModel.Design.ComponentDesigner.Initialize*)
