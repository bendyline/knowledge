---
title: "Breaking change: Renamed parameter in HtmlElement.InsertAdjacentElement"
description: Learn about the breaking change in Windows Forms where the parameter `orient` was renamed to `orientation`.
ms.date: 01/30/2025
ai-usage: ai-assisted
---

# Renamed parameter in HtmlElement.InsertAdjacentElement

[System.Windows.Forms.HtmlElement.InsertAdjacentElement(System.Windows.Forms.HtmlElementInsertionOrientation,System.Windows.Forms.HtmlElement)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.HtmlElement.InsertAdjacentElement(System.Windows.Forms.HtmlElementInsertionOrientation%2CSystem.Windows.Forms.HtmlElement)) parameter `orient` was renamed to `orientation`.

## Previous behavior

Previously, calls to [System.Windows.Forms.HtmlElement.InsertAdjacentElement(System.Windows.Forms.HtmlElementInsertionOrientation,System.Windows.Forms.HtmlElement)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.HtmlElement.InsertAdjacentElement(System.Windows.Forms.HtmlElementInsertionOrientation%2CSystem.Windows.Forms.HtmlElement)) included the `orient` parameter:

```csharp
element.InsertAdjacentElement(orient: HtmlElementInsertionOrientation.AfterEnd, newElement);
```

## New behavior

The new parameter name is `orientation`.

```csharp
element.InsertAdjacentElement(orientation: HtmlElementInsertionOrientation.AfterEnd, newElement);
```

## Version introduced

.NET 10

## Type of breaking change

This change can affect [source compatibility](../../categories.md#source-compatibility).

## Reason for change

The parameter name was changed to provide a more descriptive name.

## Recommended action

Edit any calls with a named argument to use the new parameter name or remove the parameter name:

```csharp
element.InsertAdjacentElement(orientation: HtmlElementInsertionOrientation.AfterEnd, newElement);
```

```csharp
element.InsertAdjacentElement(HtmlElementInsertionOrientation.AfterEnd, newElement);
```

## Affected APIs

- [System.Windows.Forms.HtmlElement.InsertAdjacentElement(System.Windows.Forms.HtmlElementInsertionOrientation,System.Windows.Forms.HtmlElement)](https://learn.microsoft.com/search/?terms=System.Windows.Forms.HtmlElement.InsertAdjacentElement(System.Windows.Forms.HtmlElementInsertionOrientation%2CSystem.Windows.Forms.HtmlElement))
