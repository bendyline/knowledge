---
title: Build a C# .NET app with WinUI and Win32 interop
description: Build a C# .NET application with WinUI and basic Win32 interop capabilities using the Platform Invocation Services, or PInvoke.
ms.date: 03/05/2025
ms.topic: how-to
keywords: windows 11, windows 10, uwp, COM, win32, winui, interop
ms.localizationpriority: high
ms.custom: 19H1
---

# Build a C# .NET app with WinUI 3 and Win32 interop

In this topic, we step through how to build a basic **C# .NET** application with WinUI and Win32 interop capabilities using Platform Invocation Services ([PInvoke](https://github.com/dotnet/pinvoke)).

## Prerequisites

1. [Start developing Windows apps](../../get-started/start-here.md)

## Basic managed C#/.NET app

For this example, we'll specify the location and size of the app window, convert and scale it for the appropriate DPI, disable the window minimize and maximize buttons, and finally query the current process to show a list of the modules that are loaded into the current process.

We're going to build our example app from the initial template application (see [Prerequisites](#prerequisites)). Also see [WinUI templates in Visual Studio](../../dev-tools/visual-studio.md).

### The MainWindow.xaml file

With WinUI, you can create instances of the [Window](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.window) class in XAML markup.

The XAML [Window](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.window) class has been extended to support desktop windows, turning it into an abstraction of each of the low-level window implementations used by the UWP and desktop app models. Specifically, CoreWindow for UWP and window handles (or HWNDs) for Win32.

The following code shows the MainWindow.xaml file from the initial template app, which uses the [Window](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.window) class as the root element for the app.

```xaml
<Window
    x:Class="WinUI_3_basic_win32_interop.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:WinUI_3_basic_win32_interop"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="d">

    <StackPanel Orientation="Horizontal" HorizontalAlignment="Center" VerticalAlignment="Center">
        <Button x:Name="myButton" Click="myButton_Click">Click Me</Button>
    </StackPanel>
</Window>
```

### Configuration

1. To call Win32 APIs exported from `User32.dll`, you can use the [**C#/Win32 P/Invoke Source Generator**](https://github.com/microsoft/CsWin32) in your Visual Studio project. Click **Tools** > **NuGet Package Manager** > **Manage NuGet Packages for Solution...**, and (on the **Browse** tab) search for *Microsoft.Windows.CsWin32*. For more details, see [Calling Native Functions from Managed Code](https://learn.microsoft.com/cpp/dotnet/calling-native-functions-from-managed-code).

   You can optionally confirm that installation was successful by confirming that *Microsoft.Windows.CsWin32* is listed under the **Dependencies** > **Packages** node in Solution Explorer.

   You can also optionally double-click the application project file (or right click and select **Edit project file**) to open the file in a text editor, and confirm that the project file now includes a NuGet `PackageReference` for "Microsoft.Windows.CsWin32".

   [language="xml" source="samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop.csproj" highlight="39"::: (complete source file; reference: samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop.csproj)](../../../../_code/hub/apps/winui/winui3/samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop.csproj.md)

1. Add a text file to your project, and name it `NativeMethods.txt`. The contents of this file inform the C#/Win32 P/Invoke Source Generator the functions and types for which you want P/Invoke source code generated. In other words, which functions and types you'll be calling and using in your C# code.

   [Code reference unavailable in this source snapshot: samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/NativeMethods.txt](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/winui/winui3/desktop-winui3-app-with-basic-interop.md)

### Code

1. In the `App.xaml.cs` code-behind file, we get a handle to the [**Window**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.window) by using the **WindowNative.GetWindowHandle** WinRT COM interop method (see [Retrieve a window handle (HWND)](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/ui-input/retrieve-hwnd.md)).

   That method is called from the app's [**OnLaunched**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.application.onlaunched) handler, as shown here:

   [language="csharp" source="samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/App.xaml.cs" id="OnLaunched"::: (complete source file; reference: samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/App.xaml.cs)](../../../../_code/hub/apps/winui/winui3/samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/App.xaml.cs.md)

1. We then call a `SetWindowDetails` method, passing the Window handle and preferred dimensions.

   In this method:

   - We call [GetDpiForWindow](https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-getdpiforwindow) to get the dots per inch (dpi) value for the window (Win32 uses physical pixels, while WinUI uses effective pixels). This dpi value is used to calculate the scale factor, and apply it to the width and height specified for the window.
   - We then call [SetWindowPos](https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-setwindowpos) to specify the desired location of the window.
   - Finally, we call [SetWindowLong](https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-setwindowlongw) to disable the *Minimize* and *Maximize* buttons.

   [language="csharp" source="samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/App.xaml.cs" id="SetWindowDetails" highlight="3,8,18"::: (complete source file; reference: samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/App.xaml.cs)](../../../../_code/hub/apps/winui/winui3/samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/App.xaml.cs.md)

1. In the MainWindow.xaml file, we use a [ContentDialog](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.contentdialog) with a [ScrollViewer](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.scrollviewer) to display a list of all the modules loaded for the current process.

   [language="xaml" source="samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/MainWindow.xaml" range="12-21"::: (complete source file; reference: samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/MainWindow.xaml)](../../../../_code/hub/apps/winui/winui3/samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/MainWindow.xaml.md)

1. We then replace the `MyButton_Click` event handler with the following code.

   Here, we get a reference to the current process by calling [GetCurrentProcess](https://learn.microsoft.com/dotnet/api/system.diagnostics.process.getcurrentprocess). We then iterate through the collection of [Modules](https://learn.microsoft.com/dotnet/api/system.diagnostics.process.modules) and append the filename of each [ProcessModule](https://learn.microsoft.com/dotnet/api/system.diagnostics.processmodule) to our display string.

   [language="csharp" source="samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/MainWindow.xaml.cs" id="myButton_Click"::: (complete source file; reference: samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/MainWindow.xaml.cs)](../../../../_code/hub/apps/winui/winui3/samples/WinUI-3-basic-win32-interop/WinUI-3-basic-win32-interop/MainWindow.xaml.cs.md)

1. Compile and run the app.
1. After the window appears, select the "Display loaded modules" button.

   Screenshot of the basic Win32 interop application described in this topic.

## Summary

In this topic we covered accessing the underlying window implementation (in this case Win32 and HWNDs) and using Win32 APIs along with the WinRT APIs. This demonstrates how you can use existing desktop application code when creating new WinUI desktop apps.

For a more extensive sample, see the [AppWindow gallery sample](https://github.com/microsoft/WindowsAppSDK-Samples/tree/main/Samples/Windowing) in the [Windows App SDK Samples](https://github.com/microsoft/WindowsAppSDK-Samples) GitHub repo.

## An example to customize the window title bar

In this second example, we show how to customize the window's title bar and its content. Before following along with it, review these topics:

* [Install tools for the Windows App SDK](https://learn.microsoft.com/windows/apps/windows-app-sdk/set-up-your-development-environment).
* [Create your first WinUI project](https://learn.microsoft.com/windows/apps/winui/winui3/create-your-first-winui3-app).

### Create a new project

1. In Visual Studio, create a new C# or C++/WinRT project from the **WinUI Blank App (Packaged)** project template.

### Configuration

1. Again, reference the *Microsoft.Windows.CsWin32* NuGet package just like we did in the first example.

1. Add a `NativeMethods.txt` text file to your project.

   [Code reference unavailable in this source snapshot: samples/window-titlebar/window-titlebar/NativeMethods.txt](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/winui/winui3/desktop-winui3-app-with-basic-interop.md)

### MainWindow.xaml

> **Note:**
> If you need an icon file to use with this walkthrough, then you can download the [`computer.ico` file](https://github.com/microsoft/Windows-classic-samples/blob/main/Samples/Win7Samples/netds/wlan/WirelessHostedNetwork/HostedNetwork/res/computer.ico) from the **WirelessHostednetwork** sample app. Place that file in your `Assets` folder, and add the file to your project as content. You'll then be able to refer to the file using the url `Assets/computer.ico`.
>
> Otherwise, feel free to use an icon file that you already have, and change the two references to it in the code listings below.

1. In the code listing below, you'll see that in `MainWindow.xaml` we've added two buttons, and specified **Click** handlers for each. In the **Click** handler for the first button (**basicButton_Click**), we set the title bar icon and text. In the second (**customButton_Click**), we demonstrate more significant customization by replacing the title bar with the content of the **StackPanel** named *customTitleBarPanel*.

[language="xaml" source="samples/window-titlebar/window-titlebar/MainWindow.xaml"::: (complete source file; reference: samples/window-titlebar/window-titlebar/MainWindow.xaml)](../../../../_code/hub/apps/winui/winui3/samples/window-titlebar/window-titlebar/MainWindow.xaml.md)

### MainWindow.xaml.cs/cpp

1. In the code listing below for the **basicButton_Click** handler&mdash;in order to keep the custom title bar hidden&mdash;we collapse the *customTitleBarPanel* **StackPanel**, and we set the [ExtendsContentIntoTitleBar](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.window.extendscontentintotitlebar) property to `false`.
2. We then call **IWindowNative::get_WindowHandle** (for C#, using the interop helper method **GetWindowHandle**) to retrieve the window handle (**HWND**) of the main window.
3. Next, we set the application icon (for C#, using the [PInvoke.User32](https://www.nuget.org/packages/PInvoke.User32/) NuGet package) by calling the [LoadImage](https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-loadimagea) and [SendMessage](https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-sendmessage) functions.
4. Finally, we call [SetWindowText](https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-setwindowtexta) to update the title bar string.

[language="csharp" source="samples/window-titlebar/window-titlebar/MainWindow.xaml.cs" id="basicButton_Click" highlight="3-7,8-9,12-23"::: (complete source file; reference: samples/window-titlebar/window-titlebar/MainWindow.xaml.cs)](../../../../_code/hub/apps/winui/winui3/samples/window-titlebar/window-titlebar/MainWindow.xaml.cs.md)

```cppwinrt
// pch.h
...
#include <microsoft.ui.xaml.window.h>
...

// MainWindow.xaml.h
...
void basicButton_Click(Windows::Foundation::IInspectable const& sender, Microsoft::UI::Xaml::RoutedEventArgs const& args);
...

// MainWindow.xaml.cpp
void MainWindow::basicButton_Click(IInspectable const&, RoutedEventArgs const&)
{
    // Ensure the that custom title bar content is not displayed.
    customTitleBarPanel().Visibility(Visibility::Collapsed);

    // Disable custom title bar content.
    ExtendsContentIntoTitleBar(false);

    // Get the window's HWND
    auto windowNative{ this->m_inner.as<::IWindowNative>() };
    HWND hWnd{ 0 };
    windowNative->get_WindowHandle(&hWnd);

    HICON icon{ reinterpret_cast<HICON>(::LoadImage(nullptr, L"Assets/computer.ico", IMAGE_ICON, 0, 0, LR_DEFAULTSIZE | LR_LOADFROMFILE)) };
    ::SendMessage(hWnd, WM_SETICON, 0, (LPARAM)icon);

    this->Title(L"Basic customization of title bar");
}
```

5. In the **customButton_Click** handler, we set the visibility of the *customTitleBarPanel* **StackPanel** to **Visible**.
6. We then set the [ExtendsContentIntoTitleBar](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.window.extendscontentintotitlebar) property to `true`, and call [SetTitleBar](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.window.settitlebar) to display the *customTitleBarPanel* **StackPanel** as our custom title bar.

[language="csharp" source="samples/window-titlebar/window-titlebar/MainWindow.xaml.cs" id="customButton_Click"::: (complete source file; reference: samples/window-titlebar/window-titlebar/MainWindow.xaml.cs)](../../../../_code/hub/apps/winui/winui3/samples/window-titlebar/window-titlebar/MainWindow.xaml.cs.md)

```cppwinrt
// MainWindow.xaml.h
...
void customButton_Click(Windows::Foundation::IInspectable const& sender, Microsoft::UI::Xaml::RoutedEventArgs const& args);
...

// MainWindow.xaml.cpp
void MainWindow::customButton_Click(IInspectable const&, RoutedEventArgs const&)
{
    customTitleBarPanel().Visibility(Visibility::Visible);

    // Enable custom title bar content.
    ExtendsContentIntoTitleBar(true);

    // Set the content of the custom title bar.
    SetTitleBar(customTitleBarPanel());
}
```

### App.xaml

1. In the `App.xaml` file, immediately after the `<!-- Other app resources here -->` comment, we've added some custom-colored brushes for the title bar, as shown below.

[language="csharp" source="samples/window-titlebar/window-titlebar/App.xaml"::: (complete source file; reference: samples/window-titlebar/window-titlebar/App.xaml)](../../../../_code/hub/apps/winui/winui3/samples/window-titlebar/window-titlebar/App.xaml.md)

1. If you've been following along with these steps in your own app, then you can build your project now, and run the app. You'll see an application window similar to the following (with the custom app icon):

    Template app with no customization.

- Here's the basic custom title bar:

    Template app with custom application icon.

- Here's the fully custom title bar:

    Template app with custom title bar.

## See also

- [Windows App SDK](../../windows-app-sdk/index.md)
- [Manage app windows](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/ui-input/manage-app-windows.md)
- [Windows App SDK Samples](https://github.com/microsoft/WindowsAppSDK-Samples)
