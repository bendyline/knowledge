---
title: "UI Automation TextPattern Overview"
description: Read an overview of the TextPattern control pattern in UI Automation. This control pattern exposes the textual content of a control, including format and style.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "UI Automation, TextPattern class"
  - "TextPattern class"
  - "classes, TextPattern"
---

# UI Automation TextPattern Overview

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

This overview describes how to use Microsoft UI Automation to expose the textual content, including format and style attributes, of text controls in UI Automation-supported platforms. These controls include, but are not limited to, the Microsoft .NET Framework [System.Windows.Controls.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TextBox) and [System.Windows.Controls.RichTextBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.RichTextBox) as well as their Win32 equivalents.

Exposing the textual content of a control is accomplished through the use of the [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) control pattern, which represents the contents of a text container as a text stream. In turn, [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) requires the support of the [System.Windows.Automation.Text.TextPatternRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange) class to expose format and style attributes. [System.Windows.Automation.Text.TextPatternRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange) supports [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) by representing contiguous or multiple, disjoint text spans in a text container with a collection of [System.Windows.Automation.Text.TextPatternRangeEndpoint.Start](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRangeEndpoint.Start) and [System.Windows.Automation.Text.TextPatternRangeEndpoint.End](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRangeEndpoint.End) endpoints. [System.Windows.Automation.Text.TextPatternRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange) supports functionality such as selection, comparison, retrieval and traversal.

> **Note:**
> The [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) classes do not provide a means to insert or modify text. However, depending on the control, this may be accomplished by the UI Automation [System.Windows.Automation.ValuePattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ValuePattern) or through direct keyboard input. See the [TextPattern Insert Text Sample](https://github.com/Microsoft/WPF-Samples/tree/main/Accessibility/InsertText) for an example.

The functionality described in this overview is vital to assistive technology vendors and their end users. Assistive technologies can use UI Automation to gather complete text formatting information for the user and provide programmatic navigation and selection of text by [System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit) (character, word, line, or paragraph).

<a name="UI_Automation_TextPattern_vs__Cicero"></a>

## UI Automation TextPattern vs. Text Services Framework

Text Services Framework (TSF) is a simple and scalable system framework that enables natural language services and advanced text input on the desktop and within applications. In addition to providing interfaces for applications to expose their text store it also supports metadata for that text store.

However, TSF was designed for applications that need to inject input into context-aware scenarios whereas [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) is a read-only solution (with the limited workaround noted above) meant to provide optimized access to a text store for screen-readers and Braille devices.

In short, accessible technologies that require read-only access to a text store can use [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern), but will need the more complex functionality of TSF for context-aware input.

<a name="Control_Types"></a>

## Control Types

### Text

The Text control is the basic element representing a piece of text on the screen.

A standalone text control can be used as a label or static text on a form. Text controls can also be contained within the structure of a [System.Windows.Automation.ControlType.ListItem](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ControlType.ListItem), [System.Windows.Automation.ControlType.TreeItem](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ControlType.TreeItem) or [System.Windows.Automation.ControlType.DataItem](https://learn.microsoft.com/search/?terms=System.Windows.Automation.ControlType.DataItem).

> **Note:**
> Text controls might not appear in the content view of the UI Automation tree (see [UI Automation Tree Overview](ui-automation-tree-overview.md)). This is because text controls are often displayed through the Name property of another control. For instance, the text that is used to label an Edit control is exposed through the Name property of the Edit control. Because the Edit control is in the content view of the UI Automation tree, it is not necessary for the text element itself to be in that view of the UI Automation tree. The only text that shows up in the content view is text that is not redundant information. This enables any assistive technology to quickly filter only on the pieces of information that their users need.

### Edit

Edit controls enable a user to view and edit a single line of text.

> **Note:**
> The single line of text may wrap in certain layout scenarios.

### Document

Document controls let a user navigate and obtain information from multiple pages of text.

<a name="TextPattern_Client_API_s"></a>

## TextPattern Client APIs

| Type | Description |
| --- | --- |
| `System.Windows.Automation.TextPattern` class | The entry point for the Microsoft UI Automation text model.<br /><br /> This class also contains the two [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) event listeners, [System.Windows.Automation.TextPattern.TextSelectionChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.TextSelectionChangedEvent) and [System.Windows.Automation.TextPattern.TextChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.TextChangedEvent). |
| `System.Windows.Automation.Text.TextPatternRange` class | The representation of a span of text within a text container that supports [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern).<br /><br /> UI Automation clients should be careful about the current validity of a text range created using [System.Windows.Automation.Text.TextPatternRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange). If the original text in the text control is completely replaced by new text, the current text range becomes invalid. However, the text range may still have some viability if only part of the original text is changed and the underlying text control is managing its text "pointer" with anchors (or endpoints) rather than with absolute character positioning.<br /><br /> Clients can listen for a [System.Windows.Automation.TextPattern.TextChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.TextChangedEvent) for notification of any changes to the textual content they are working with. |
| `System.Windows.Automation.AutomationTextAttribute` class | Used to identify the formatting attributes of a text range. |

<a name="TextPattern_Provider_API_s"></a>

## TextPattern Provider APIs

UI elements or controls that support [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) by implementing the [System.Windows.Automation.Provider.ITextProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITextProvider) and [System.Windows.Automation.Provider.ITextRangeProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITextRangeProvider) interfaces, either natively or through Microsoft UI Automation proxies, are capable of exposing detailed attribute information for any text they contain in addition to providing robust navigational capabilities.

A [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) provider does not have to support all text attributes if the control lacks support for any particular attributes.

A [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) provider must support the [System.Windows.Automation.TextPattern.GetSelection*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.GetSelection*) and [System.Windows.Automation.Text.TextPatternRange.Select*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.Select*) functions if the control supports text selection or placement of the text cursor (or system caret) within the text area. If the control does not support this functionality, then it does not need to support either of these methods. However, the control must expose the type of text selection it supports by implementing the [System.Windows.Automation.Provider.ITextProvider.SupportedTextSelection](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITextProvider.SupportedTextSelection) property.

A [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) provider must always support the [System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit) constants [System.Windows.Automation.Text.TextUnit.Character](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit.Character) and [System.Windows.Automation.Text.TextUnit.Document](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit.Document) as well as any other [System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit) constants it is capable of supporting.

> **Note:**
> The provider may skip support for a specific [System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit) by deferring to the next largest [System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit) supported in the following order: [System.Windows.Automation.Text.TextUnit.Character](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit.Character), [System.Windows.Automation.Text.TextUnit.Format](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit.Format), [System.Windows.Automation.Text.TextUnit.Word](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit.Word), [System.Windows.Automation.Text.TextUnit.Line](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit.Line), [System.Windows.Automation.Text.TextUnit.Paragraph](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit.Paragraph), [System.Windows.Automation.Text.TextUnit.Page](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit.Page), and [System.Windows.Automation.Text.TextUnit.Document](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit.Document).

| API | Description |
| --- | --- |
| `ITextProvider` interface | Exposes methods, properties and attributes that support [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) in client applications (see [System.Windows.Automation.Provider.ITextProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITextProvider)). |
| `ITextRangeProvider` interface | Represents a span of text in a text provider (see [System.Windows.Automation.Provider.ITextRangeProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITextRangeProvider)). |
| `System.Windows.Automation.TextPatternIdentifiers` class | Contains values that are used as identifiers for text providers (see [System.Windows.Automation.TextPatternIdentifiers](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPatternIdentifiers)). |

<a name="Security"></a>

## Security

The UI Automation architecture was designed with security in mind (see [UI Automation Security Overview](ui-automation-security-overview.md)). However, the TextPattern classes described in this overview require some specific security considerations.

- Microsoft UI Automation text providers supply read-only interfaces and do not provide the ability to change the existing text in a control.

- UI Automation clients can only use Microsoft UI Automation if they are fully "trusted". An example of this would be the protected Logon Desktop, where only known and trusted applications can run.

- Developers of UI Automation providers should be aware that all information they choose to expose in their controls through Microsoft UI Automation is essentially public and fully accessible by other code. Microsoft UI Automation makes no effort to determine the trustworthiness of any UI Automation client and therefore the UI Automation provider should not expose protected content or sensitive textual information (such as password fields).

- One of the most significant changes in security for Windows Vista is broadly referred to as "Secure Input" which encompasses technologies such as Least-privileged (or Limited) User Accounts (LUA) and UI Privilege Level Isolation (UIPI).

  - UIPI prevents one program from controlling and/or monitoring another more "privileged" program, preventing cross-process window message attacks that spoof user input.

  - LUA sets limits on the privileges of applications being run by users in the Administrators group. Applications won't necessarily have administrator privileges, but will instead run with the least privileges necessary. As a consequence, there may be some restrictions enforced in LUA scenarios. Most notably string truncation (including TextPattern strings), where it may be necessary to limit the size of strings being retrieved from administrator-level applications so they aren't forced to allocate memory to the point of disabling the application.

<a name="Performance"></a>

## Performance

Because TextPattern relies on cross-process calls for most of its functionality, it does not provide a caching mechanism to improve performance when processing content. This is unlike other control patterns in Microsoft UI Automation that can be accessed using the [System.Windows.Automation.AutomationElement.GetCachedPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.GetCachedPattern*) or [System.Windows.Automation.AutomationElement.TryGetCachedPattern*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement.TryGetCachedPattern*) methods.

One tactic for improving performance is by making sure UI Automation clients attempt to retrieve moderately-sized blocks of text using [System.Windows.Automation.Text.TextPatternRange.GetText*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetText*). For example, GetText(1) calls will incur cross-process hits for each character whereas one GetText(-1) call will incur one cross-process hit, but can have high latency depending on the size of the text provider.

<a name="Glossary"></a>

## TextPattern Terminology

**Attribute**\
A formatting characteristic of a text range (for example, [System.Windows.Automation.TextPattern.IsItalicAttribute](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.IsItalicAttribute) or [System.Windows.Automation.TextPattern.FontNameAttribute](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.FontNameAttribute)).

**Degenerate Range**\
A degenerate range is an empty or zero-character text range. For the purposes of the TextPattern control pattern, the text insertion point (or system caret) is considered a degenerate range. If no text is selected, [System.Windows.Automation.TextPattern.GetSelection*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.GetSelection*) would return a degenerate range at the text insertion point and [System.Windows.Automation.TextPattern.RangeFromPoint*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.RangeFromPoint*) would return a degenerate range as its starting endpoint. [System.Windows.Automation.TextPattern.RangeFromChild*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.RangeFromChild*) and [System.Windows.Automation.TextPattern.GetVisibleRanges*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.GetVisibleRanges*) may return degenerate ranges when the text provider cannot find any text ranges that match the given condition. This degenerate range can be used as a starting endpoint within the text provider. [System.Windows.Automation.Text.TextPatternRange.FindText*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.FindText*) and [System.Windows.Automation.Text.TextPatternRange.FindAttribute*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.FindAttribute*) return a null reference (`Nothing` in Microsoft Visual Basic .NET) to avoid confusion with a discovered range versus a degenerate range.

**Embedded Object**\
There are two types of embedded objects in the UI Automation text model. They consist of text-based content elements such as hyperlinks or tables, and control elements such as images and buttons. For more detailed information, see [Access Embedded Objects Using UI Automation](access-embedded-objects-using-ui-automation.md).

**Endpoint**\
The absolute [System.Windows.Automation.Text.TextPatternRangeEndpoint.Start](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRangeEndpoint.Start) or [System.Windows.Automation.Text.TextPatternRangeEndpoint.End](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRangeEndpoint.End) point of a text range within a text container.

TextPatternRangeEndpoints (start and end).
The following illustrates a set of start and end points.

**TextRange**\
A representation of a span of text, with start and end points, in a text container including all associated attributes and functionality.

[System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit)\
A pre-defined unit of text (character, word, line, or paragraph) used for navigating through logical segments of a text range.

## See also

- [UI Automation Control Patterns for Clients](ui-automation-control-patterns-for-clients.md)
- [UI Automation Control Patterns Overview](ui-automation-control-patterns-overview.md)
- [UI Automation Tree Overview](ui-automation-tree-overview.md)
- [Use Caching in UI Automation](use-caching-in-ui-automation.md)
- [Support Control Patterns in a UI Automation Provider](support-control-patterns-in-a-ui-automation-provider.md)
- [Control Pattern Mapping for UI Automation Clients](control-pattern-mapping-for-ui-automation-clients.md)
- [Text Services Framework](https://learn.microsoft.com/windows/desktop/api/_tsf/)
