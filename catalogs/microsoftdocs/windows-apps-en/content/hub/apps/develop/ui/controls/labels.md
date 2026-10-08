---
description: Use a label to indicate to the user what they should enter into an adjacent control. You can also label a group of related controls, or display instructional text near a group of related controls.
title: Labels
ms.assetid: CFACCCD4-749F-43FB-947E-2591AE673804
label: Labels
template: detail.hbs
ms.date: 05/19/2017
ms.topic: article
keywords: windows 10, uwp
pm-contact: miguelrb
design-contact: ksulliv
doc-status: Published
ms.localizationpriority: medium
---
# Labels

 

A label is the name or title of a control or a group of related controls.

> **Important APIs**: Header property, [TextBlock class](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.UI.Xaml.Controls.TextBlock)

In XAML, many controls have a built-in Header property that you use to display the label. For controls that don't have a Header property, or to label groups of controls, you can use a [TextBlock](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.UI.Xaml.Controls.TextBlock) instead.

a screenshot that illustrates the standard label control

## Recommendations


-   Use a label to indicate to the user what they should enter into an adjacent control. You can also label a group of related controls, or display instructional text near a group of related controls.
-   When labeling controls, write the label as a noun or a concise noun phrase, not as a sentence, and not as instructional text. Avoid colons or other punctuation.
-   When you do have instructional text in a label, you can be more generous with text-string length and also use punctuation.


## Get the sample code
* [WinUI 3 Gallery sample](https://github.com/Microsoft/WinUI-Gallery)

## Related topics
* [Text controls](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/design/controls/text-controls.md)
* [TextBox.Header property](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.textbox.header)
* [PasswordBox.Header property](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.passwordbox.header)
* [ToggleSwitch.Header property](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.toggleswitch.header)
* [DatePicker.Header property](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.datepicker.header)
* [TimePicker.Header property](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.timepicker.header)
* [Slider.Header property](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.slider.header)
* [ComboBox.Header property](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.combobox.header)
* [RichEditBox.Header property](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.richeditbox.header)
* [TextBlock class](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.UI.Xaml.Controls.TextBlock)
