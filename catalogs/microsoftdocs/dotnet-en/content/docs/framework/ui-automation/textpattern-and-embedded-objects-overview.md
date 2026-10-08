---
title: "TextPattern and Embedded Objects Overview"
description: Read an overview of how UI Automation exposes embedded objects, or child elements, within a text document or container using TextPattern and TextPatternRange.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "UI Automation, TextPattern class"
  - "embedded objects, accessing"
  - "accessing embedded objects"
  - "embedded objects, UI Automation"
---
# TextPattern and Embedded Objects Overview

> **Note:**
> This documentation is intended for .NET Framework developers who want to use the managed UI Automation classes defined in the [System.Windows.Automation](https://learn.microsoft.com/search/?terms=System.Windows.Automation) namespace. For the latest information about UI Automation, see [Windows Automation API: UI Automation](https://learn.microsoft.com/windows/win32/winauto/entry-uiauto-win32).

 This overview describes how Microsoft UI Automation exposes embedded objects, or child elements, within a text document or container.

 In UI Automation an embedded object is any element that has non-textual boundaries; for example, an image, hyperlink, table, or document type such as an Microsoft Excel spreadsheet or Microsoft Windows Media file. This differs from the standard definition, where an element is created in one application and embedded, or linked, within another. Whether the object can be edited within its original application is irrelevant in the context of UI Automation.

<a name="Embedded_Objects_and_the_UI_Automation_Tree"></a>

## Embedded Objects and the UI Automation Tree

 Embedded objects are treated as individual elements within the control view of the UI Automation tree. They are exposed as children of the text container so that they can be accessed through the same model as other controls in UI Automation.

 Embedded Table with Image in a Text Container
Example of a Text Container with Table, Image, and Hyperlink Embedded Objects

 Content view for the preceding example
Example of the Content View for a Portion of the Preceding Text Container

<a name="Expose_Embedded_Objects_Using_TextPattern_and"></a>

## Expose Embedded Objects Using TextPattern and TextPatternRange

 Used in conjunction, the [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern) control pattern class and the [System.Windows.Automation.Text.TextPatternRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange) class expose methods and properties that facilitate navigation and querying of embedded objects.

 The textual content (or inner text) of a text container and an embedded object, such as a hyperlink or table cell, is exposed as a single, continuous text stream in both the control view and the content view of the UI Automation tree; object boundaries are ignored. If a UI Automation client is retrieving the text for the purpose of reciting, interpreting, or analyzing in some manner, the text range should be checked for special cases, such as a table with textual content or other embedded objects. This can be accomplished by calling [System.Windows.Automation.Text.TextPatternRange.GetChildren*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetChildren*) to obtain an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) for each embedded object and then calling [System.Windows.Automation.TextPattern.RangeFromChild*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.RangeFromChild*) to obtain a text range for each element. This is done recursively until all textual content has been retrieved.

 Text ranges spanned by embedded objects.
Example of a text stream with embedded objects and their range spans

 When it is necessary to traverse the content of a text range, a series of steps are involved behind the scenes in order for the [System.Windows.Automation.Text.TextPatternRange.Move*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.Move*) method to execute successfully.

1. The text range is normalized; that is, the text range is collapsed to a degenerate range at the [System.Windows.Automation.Text.TextPatternRangeEndpoint.Start](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRangeEndpoint.Start) endpoint, which makes the [System.Windows.Automation.Text.TextPatternRangeEndpoint.End](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRangeEndpoint.End) endpoint superfluous. This step is necessary to remove ambiguity in situations where a text range spans [System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit) boundaries: for example, `{The URL https://www.microsoft.com is embedded in text` where "{" and "}" are the text range endpoints.

2. The resulting range is moved backward in the [System.Windows.Automation.TextPattern.DocumentRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.DocumentRange) to the beginning of the requested [System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit) boundary.

3. The range is moved forward or backward in the [System.Windows.Automation.TextPattern.DocumentRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.DocumentRange) by the requested number of [System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit) boundaries.

4. The range is then expanded from a degenerate range state by moving the [System.Windows.Automation.Text.TextPatternRangeEndpoint.End](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRangeEndpoint.End) endpoint by one requested [System.Windows.Automation.Text.TextUnit](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextUnit) boundary.

 Range adjustments by Move & ExpandToEnclosingUnit
Examples of how a text range is adjusted for Move() and ExpandToEnclosingUnit()

<a name="Common_Scenarios"></a>

## Common Scenarios

 The following sections present examples of the most common scenarios that involve embedded objects.

 Legend for the examples shown:

 { = [System.Windows.Automation.Text.TextPatternRangeEndpoint.Start](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRangeEndpoint.Start)

 } = [System.Windows.Automation.Text.TextPatternRangeEndpoint.End](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRangeEndpoint.End)

### Hyperlink

**Example 1 - A text range that contains an embedded text hyperlink**

`{The URL https://www.microsoft.com is embedded in text}.`

| Method called | Result |
| --- | --- |
| [System.Windows.Automation.Text.TextPatternRange.GetText*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetText*) | Returns the string `The URL https://www.microsoft.com is embedded in text`. |
| [System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*) | Returns the innermost [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that encloses the text range; in this case, the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that represents the text provider itself. |
| [System.Windows.Automation.Text.TextPatternRange.GetChildren*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetChildren*) | Returns an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) representing the hyperlink control. |
| [System.Windows.Automation.TextPattern.RangeFromChild*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.RangeFromChild*) where [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) is the object returned by the previous `GetChildren` method. | Returns the range that represents `https://www.microsoft.com`. |

 **Example 2 - A text range that partially spans an embedded text hyperlink**

 The URL `https://{[www]}` is embedded in text.

| Method called | Result |
| --- | --- |
| [System.Windows.Automation.Text.TextPatternRange.GetText*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetText*) | Returns the string "www". |
| [System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*) | Returns the innermost [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that encloses the text range; in this case, the hyperlink control. |
| [System.Windows.Automation.Text.TextPatternRange.GetChildren*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetChildren*) | Returns `null` since the text range doesn't span the entire URL string. |

**Example 3 - A text range that partially spans the content of a text container. The text container has an embedded text hyperlink that is not part of the text range.**

`{The URL} [https://www.microsoft.com](https://www.microsoft.com) is embedded in text.`

| Method called | Result |
| --- | --- |
| [System.Windows.Automation.Text.TextPatternRange.GetText*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetText*) | Returns the string "The URL". |
| [System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*) | Returns the innermost [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that encloses the text range; in this case, the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that represents the text provider itself. |
| [System.Windows.Automation.Text.TextPatternRange.Move*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.Move*) with parameters of (TextUnit.Word, 1). | Moves the text range span to "http" since the text of the hyperlink is comprised of individual words. In this case, the hyperlink is not treated as a single object.<br /><br /> The URL {[http]} is embedded in text. |

<a name="Image"></a>

### Image

 **Example 1 - A text range that contains an embedded image**

 {The image Embedded Image Example is embedded in text}.

| Method called | Result |
| --- | --- |
| [System.Windows.Automation.Text.TextPatternRange.GetText*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetText*) | Returns the string "The is embedded in text". Any ALT text associated with the image cannot be expected to be included in the text stream. |
| [System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*) | Returns the innermost [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that encloses the text range; in this case, the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that represents the text provider itself. |
| [System.Windows.Automation.Text.TextPatternRange.GetChildren*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetChildren*) | Returns an [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) representing the image control. |
| [System.Windows.Automation.TextPattern.RangeFromChild*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.RangeFromChild*) where [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) is the object returned by the previous [System.Windows.Automation.Text.TextPatternRange.GetChildren*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetChildren*) method. | Returns the degenerate range that represents "Embedded Image Example". |

 **Example 2 - A text range that partially spans the content of a text container. The text container has an embedded image that is not part of the text range.**

 {The image} Embedded Image Example is embedded in text.

| Method called | Result |
| --- | --- |
| [System.Windows.Automation.Text.TextPatternRange.GetText*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetText*) | Returns the string "The image". |
| [System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*) | Returns the innermost [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that encloses the text range; in this case, the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that represents the text provider itself. |
| [System.Windows.Automation.Text.TextPatternRange.Move*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.Move*) with parameters of (TextUnit.Word, 1). | Moves the text range span to "is ". Because only text-based embedded objects are considered part of the text stream, the image in this example does not affect Move or its return value (1 in this case). |

<a name="Table"></a>

### Table

### Table used for examples

| Cell with Image | Cell with Text |
| --- | --- |
| Embedded Image Example | X |
| Embedded Image Example 2 | Y |
| Embedded Image Example 3<br /><br /> Image for Z | Z |

 **Example 1 - Get the text container from the content of a cell.**

| Method Called | Result |
| --- | --- |
| [System.Windows.Automation.GridPattern.GetItem*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.GridPattern.GetItem*) with parameters (0,0) | Returns the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) representing the content of the table cell; in this case, the element is a text control. |
| [System.Windows.Automation.TextPattern.RangeFromChild*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.RangeFromChild*) where [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) is the object returned by the previous `GetItem` method. | Returns the range that spans the image Embedded Image Example. |
| [System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*) for the object returned by the previous `RangeFromChild` method. | Returns the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) representing the table cell; in this case, the element is a text control that supports TableItemPattern. |
| [System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*) for the object returned by the previous `GetEnclosingElement` method. | Returns the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) representing the table. |
| [System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange.GetEnclosingElement*) for the object returned by the previous `GetEnclosingElement` method. | Returns the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) that represents the text provider itself. |

 **Example 2 - Get the text content of a cell.**

| Method Called | Result |
| --- | --- |
| [System.Windows.Automation.GridPattern.GetItem*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.GridPattern.GetItem*) with parameters of (1,1). | Returns the [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) representing the content of the table cell; in this case, the element is a text control. |
| [System.Windows.Automation.TextPattern.RangeFromChild*](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern.RangeFromChild*) where [System.Windows.Automation.AutomationElement](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElement) is the object returned by the previous `GetItem` method. | Returns "Y". |

## See also

- [System.Windows.Automation.TextPattern](https://learn.microsoft.com/search/?terms=System.Windows.Automation.TextPattern)
- [System.Windows.Automation.Text.TextPatternRange](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Text.TextPatternRange)
- [System.Windows.Automation.Provider.ITextProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITextProvider)
- [System.Windows.Automation.Provider.ITextRangeProvider](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Provider.ITextRangeProvider)
- [Access Embedded Objects Using UI Automation](access-embedded-objects-using-ui-automation.md)
- [Expose the Content of a Table Using UI Automation](expose-the-content-of-a-table-using-ui-automation.md)
- [Traverse Text Using UI Automation](traverse-text-using-ui-automation.md)
- [TextPattern Search and Selection Sample](https://github.com/Microsoft/WPF-Samples/tree/main/Accessibility/FindText)
