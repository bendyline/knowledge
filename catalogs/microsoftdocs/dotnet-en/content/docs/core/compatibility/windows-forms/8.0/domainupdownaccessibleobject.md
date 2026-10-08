---
title: "Breaking change: WFDEV002 obsoletion is now an error"
description: Learn about the breaking change in .NET 8 for Windows Forms where the compile-time diagnostic WFDEV002 has been promoted from a warning to an error.
ms.date: 01/30/2023
---
# WFDEV002 obsoletion is now an error

The WFDEV002 obsoletion has been promoted from a warning to an error in .NET 8. Any reference to [System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject) will result in a compilation error that can't be suppressed. In addition, [System.Windows.Forms.DomainUpDown.CreateAccessibilityInstance](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.CreateAccessibilityInstance) now returns an object of the internal type `UpDownBase.UpDownBaseAccessibleObject`.

## Version introduced

.NET 8 Preview 1

## Previous behavior

Previously, if you referenced the [System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject) type, you got compile-time warning [WFDEV002](https://learn.microsoft.com/dotnet/desktop/winforms/wfdev-diagnostics/wfdev002).

Also, [System.Windows.Forms.DomainUpDown.CreateAccessibilityInstance](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.CreateAccessibilityInstance) returned an object of type [System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject).

## New behavior

If you reference the [System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject) type, you'll get a compile-time error with the same diagnostic ID ([WFDEV002](https://learn.microsoft.com/dotnet/desktop/winforms/wfdev-diagnostics/wfdev002)).

In addition, since the type has been removed, [System.Windows.Forms.DomainUpDown.CreateAccessibilityInstance](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.CreateAccessibilityInstance) now returns an object of type `UpDownBase.UpDownBaseAccessibleObject` (which is an internal type).

## Change category

This change can affect [*source compatibility*](../../categories.md#source-compatibility).

## Reason for change

The [System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject) class has always been documented as "internal use only". All functionality of the class was moved to the base class.

## Recommended action

Update your code to use [System.Windows.Forms.Control.ControlAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.ControlAccessibleObject) or [System.Windows.Forms.AccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.AccessibleObject) instead of [System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject).

## Affected APIs

- [System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DomainUpDownAccessibleObject)
- [System.Windows.Forms.DomainUpDown.CreateAccessibilityInstance](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.CreateAccessibilityInstance)
