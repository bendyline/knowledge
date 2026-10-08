---
description: Learn how to implement copy and paste functionality in WinUI and UWP apps using the clipboard APIs. Includes code examples and best practices.
title: Copy and Paste in WinUI and UWP Apps
ms.date: 10/15/2025
ms.topic: how-to
keywords: windows 11, uwp, winrt, windows runtime, winui
ms.localizationpriority: medium
# Customer intent: As a Windows app developer, I want to learn how to implement copy and paste functionality in my app using the clipboard.
---

# Copy and paste

Copy and paste is a fundamental way for users to exchange data between apps or within an app. This article shows you how to implement copy and paste in WinUI apps using the clipboard APIs. You'll learn how to copy, cut, and paste data, track clipboard changes, and use the [DataPackage](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.DataPackage) class to handle different data formats.

> **Note:**
> You can also use these APIs in other desktop apps through Windows Runtime (WinRT) APIs. For more information, see [Call Windows Runtime APIs in desktop apps](https://learn.microsoft.com/windows/apps/desktop/modernize/desktop-to-uwp-enhance).

> 
> [Open the WinUI Gallery app and see Clipboard samples](winui3gallery://item/Clipboard)

## Check for built-in clipboard support

In many cases, you do not need to write code to support clipboard operations. Many of the default XAML controls you can use to create apps already support clipboard operations. 

## Get set up

First, include the [Windows.ApplicationModel.DataTransfer](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer) namespace in your app. Then, add an instance of the [DataPackage](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.DataPackage) object. This object contains both the data the user wants to copy and any properties (such as a description) that you want to include.

### [C#](#tab/cs)

```cs
using Windows.ApplicationModel.DataTransfer;
...
var dataPackage = new DataPackage();
```

### [C++/WinRT](#tab/cppwinrt)

```cppwinrt
#include <winrt/Windows.ApplicationModel.DataTransfer.h>
using namespace winrt::Windows::ApplicationModel::DataTransfer;
...
DataPackage dataPackage;
```

---

## Copy and cut

Copy and cut (also referred to as *move*) work almost exactly the same. Choose which operation you want by using the [RequestedOperation](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datapackage.requestedoperation) property.

### [C#](#tab/cs)

```cs
// copy 
dataPackage.RequestedOperation = DataPackageOperation.Copy;
// or cut
dataPackage.RequestedOperation = DataPackageOperation.Move;
```

### [C++/WinRT](#tab/cppwinrt)

```cppwinrt
// copy
dataPackage.RequestedOperation(DataPackageOperation::Copy);
// or cut
dataPackage.RequestedOperation(DataPackageOperation::Move);
```

---

## Set the copied content

Next, you can add the data that a user has selected to the [DataPackage](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.DataPackage) object. If this data is supported by the **DataPackage** class, you can use one of the corresponding [methods](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datapackage#methods) of the **DataPackage** object. Here's how to add text by using the [SetText](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datapackage.settext) method:

### [C#](#tab/cs)

```cs
dataPackage.SetText("Hello World!");
```

### [C++/WinRT](#tab/cppwinrt)

```cppwinrt
dataPackage.SetText(L"Hello World!");
```

---

The last step is to add the [DataPackage](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.DataPackage) to the clipboard by calling the static [SetContent](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.clipboard.setcontent) method.

### [C#](#tab/cs)

```cs
Clipboard.SetContent(dataPackage);
```

### [C++/WinRT](#tab/cppwinrt)

```cppwinrt
Clipboard::SetContent(dataPackage);
```

---

## Paste

To get the contents of the clipboard, call the static [GetContent](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.clipboard.getcontent) method. This method returns a [DataPackageView](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.DataPackageView) that contains the content. This object is almost identical to a [DataPackage](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.DataPackage) object, except that its contents are read-only. With that object, you can use either the [AvailableFormats](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datapackageview.availableformats) or the [Contains](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datapackageview.contains) method to identify what formats are available. Then, you can call the corresponding [DataPackageView](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.DataPackageView) method to get the data.

### [C#](#tab/cs)

```cs
async void OutputClipboardText()
{
    DataPackageView dataPackageView = Clipboard.GetContent();
    if (dataPackageView.Contains(StandardDataFormats.Text))
    {
        string text = await dataPackageView.GetTextAsync();
        // To output the text from this example, you need a TextBlock control
        TextOutput.Text = "Clipboard now contains: " + text;
    }
}
```

### [C++/WinRT](#tab/cppwinrt)

```cppwinrt
void MainPage::OutputClipboardText()
{
    DataPackageView dataPackageView = Clipboard::GetContent();
    if (dataPackageView.Contains(StandardDataFormats::Text()))
    {
        hstring text = dataPackageView.GetTextAsync().get();
        // To output the text from this example, you need a TextBlock control
        TextOutput().Text(L"Clipboard now contains: " + text);
    }
}
```

---

## Track changes to the clipboard

In addition to copy and paste commands, you may also want to track clipboard changes. Do this by handling the clipboard's [ContentChanged](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.clipboard.contentchanged) event.

### [C#](#tab/cs)

```cs
Clipboard.ContentChanged += async (s, e) => 
{
    DataPackageView dataPackageView = Clipboard.GetContent();
    if (dataPackageView.Contains(StandardDataFormats.Text))
    {
        string text = await dataPackageView.GetTextAsync();
        // To output the text from this example, you need a TextBlock control
        TextOutput.Text = "Clipboard now contains: " + text;
    }
};
```
### [C++/WinRT](#tab/cppwinrt)

```cppwinrt
Clipboard::ContentChanged([this](auto const&, auto const&)
{
    DataPackageView dataPackageView = Clipboard::GetContent();
    if (dataPackageView.Contains(StandardDataFormats::Text()))
    {
        hstring text = dataPackageView.GetTextAsync().get();
        // To output the text from this example, you need a TextBlock control
        TextOutput().Text(L"Clipboard now contains: " + text);
    }
});
```

---

## Related content

- [Clipboard sample](https://github.com/microsoft/Windows-universal-samples/tree/master/Samples/Clipboard)
- [Communication](index.md)
- [DataTransfer](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer)
- [DataPackage](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datapackage)
- [DataPackageView](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datapackageview)
- [DataPackagePropertySet](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.DataPackagePropertySet)
- [DataRequest](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datarequest) 
- [DataRequested](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.DataTransferManager)
- [FailWithDisplayText](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datarequest.failwithdisplaytext)
- [ShowShareUi](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datatransfermanager.showshareui)
- [RequestedOperation](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datapackage.requestedoperation) 
- [ControlsList](https://learn.microsoft.com/windows/apps/design/controls/index)
- [SetContent](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.clipboard.setcontent)
- [GetContent](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.clipboard.getcontent)
- [AvailableFormats](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datapackageview.availableformats)
- [Contains](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datapackageview.contains)
- [ContentChanged](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.clipboard.contentchanged)
