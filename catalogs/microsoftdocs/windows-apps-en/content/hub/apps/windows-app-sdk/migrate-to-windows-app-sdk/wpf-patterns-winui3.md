---
title: Migrate WPF app patterns to WinUI 3
description: WinUI 3 shares many XAML concepts with WPF and is optimized for modern Windows experiences. This topic maps common WPF patterns to their WinUI 3 equivalents to help you plan your migration.
ms.topic: concept-article
ms.date: 04/07/2026
keywords: windows, app, sdk, wpf, winui, winui3, migration, patterns, equivalents
ms.localizationpriority: medium
---

# Migrate WPF app patterns to WinUI 3

WinUI 3 shares many XAML concepts with WPF and is optimized for modern Windows experiences. Most WPF patterns have direct equivalents in WinUI 3. In some areas WinUI 3 introduces an improved approach that replaces an older pattern, and in a few cases features are still in active development.

This topic maps common WPF patterns to their WinUI 3 equivalents so you can plan your migration.

> **Tip:**
> For general WPF + Windows App SDK guidance, see [Use the Windows App SDK in an existing project](../use-windows-app-sdk-in-existing-project.md?pivots=dotnet).

## Controls

Most WPF controls have direct equivalents in WinUI 3. The following table covers controls where the mapping is not one-to-one.

| WPF control | WinUI 3 equivalent | Notes |
| --- | --- | --- |
| [`DataGrid`](https://learn.microsoft.com/dotnet/api/system.windows.controls.datagrid) | No first-party equivalent | WinUI 3 does not include a built-in DataGrid. The community-maintained [WinUI.TableView](https://github.com/w-ahmad/WinUI.TableView) is one option. Evaluate community projects based on your support and maintenance requirements. |
| [`Ribbon`](https://learn.microsoft.com/dotnet/api/system.windows.controls.ribbon.ribbon) | `CommandBar` / Community Toolkit Labs | Consider [CommandBar](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.commandbar) and [CommandBarFlyout](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.commandbarflyout) for toolbar-style scenarios. A [Ribbon control](https://github.com/CommunityToolkit/Labs-Windows/tree/main/components/Ribbon) is also available in Community Toolkit Labs (experimental). |
| [`StatusBar`](https://learn.microsoft.com/dotnet/api/system.windows.controls.primitives.statusbar) | `InfoBar` + custom layout | Use [InfoBar](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.infobar) for status messaging, or add a dedicated footer area to your layout. |
| [`FlowDocumentReader`](https://learn.microsoft.com/dotnet/api/system.windows.controls.flowdocumentreader) / [`FlowDocumentScrollViewer`](https://learn.microsoft.com/dotnet/api/system.windows.controls.flowdocumentscrollviewer) | [`RichTextBlock`](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.richtextblock) | Use [RichTextBlock](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.richtextblock) for read-only rich text display. WinUI 3 takes a different approach to document content that is better suited to modern app scenarios. |
| [`PasswordBox`](https://learn.microsoft.com/dotnet/api/system.windows.controls.passwordbox) with `SecureString` | [`PasswordBox`](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.passwordbox) | WinUI 3's [PasswordBox](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.passwordbox) provides password masking. `SecureString` is deprecated in .NET 5+; the recommended approach is to minimize how long credentials are held in memory using `ReadOnlySpan<char>` patterns. |
| [`WebBrowser`](https://learn.microsoft.com/dotnet/api/system.windows.controls.webbrowser) | [WebView2](https://learn.microsoft.com/microsoft-edge/webview2/) | `WebView2` uses the modern Microsoft Edge (Chromium) engine and is the recommended approach for embedding web content across all desktop app types. |

## XAML features

WinUI 3 XAML uses the same core concepts as WPF — resource dictionaries, styles, data binding, and markup extensions all work similarly. Some WPF-specific patterns have evolved into improved, more composable alternatives.

| WPF feature | WinUI 3 approach | Notes |
| --- | --- | --- |
| [`DataTrigger`](https://learn.microsoft.com/dotnet/api/system.windows.datatrigger) / [`MultiTrigger`](https://learn.microsoft.com/dotnet/api/system.windows.multitrigger) | [Behaviors (Community Toolkit)](https://aka.ms/toolkit/behaviors) | WinUI 3 uses attached behaviors rather than inline triggers. The XAML Behaviors package supports `DataTriggerBehavior`, `EventTriggerBehavior`, and more. Behaviors are more composable and unit-testable than WPF triggers. |
| [`DynamicResource`](https://learn.microsoft.com/dotnet/desktop/wpf/advanced/dynamicresource-markup-extension) | [`ThemeResource`](https://learn.microsoft.com/windows/uwp/xaml-platform/themeresource-markup-extension) | `ThemeResource` provides runtime resource lookup and responds automatically to theme changes (light, dark, high contrast). Use `StaticResource` for values that never change at runtime. |
| [`MultiBinding`](https://learn.microsoft.com/dotnet/api/system.windows.data.multibinding) / [`PriorityBinding`](https://learn.microsoft.com/dotnet/api/system.windows.data.prioritybinding) | Converters or `x:Bind` | Use a multi-value converter with individual bindings, or use `x:Bind` with a computed property on your view model. `x:Bind` is compiled and type-safe, which makes it more performant than `Binding`. |
| `Style` with `BasedOn` | ✅ Supported | Style inheritance with `BasedOn` works in WinUI 3. |
| Implicit styles | ✅ Supported | Resource dictionary implicit styles (styles without `x:Key`) work as expected. |
| [`AdornerLayer`](https://learn.microsoft.com/dotnet/api/system.windows.documents.adornerlayer) | Custom overlay approach | WinUI 3 has no adorner layer equivalent. Use a `Canvas` or `Grid` overlay in your layout to achieve similar visual decoration effects — this approach is more explicit and easier to reason about. |

## Threading and dispatch

| WPF pattern | WinUI 3 equivalent | Notes |
| --- | --- | --- |
| [`Dispatcher.Invoke`](https://learn.microsoft.com/dotnet/api/system.windows.threading.dispatcher.invoke) / `BeginInvoke` | [`DispatcherQueue.TryEnqueue`](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.dispatching.dispatcherqueue.tryenqueue) | WinUI 3 uses [DispatcherQueue](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.dispatching.dispatcherqueue). The async pattern is `await DispatcherQueue.EnqueueAsync(...)` using the Community Toolkit extension. |
| [`Application.Current.Dispatcher`](https://learn.microsoft.com/dotnet/api/system.windows.application.current) | [`DispatcherQueue.GetForCurrentThread()`](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.dispatching.dispatcherqueue.getforcurrentthread) | Capture the `DispatcherQueue` at construction time on the UI thread and store it for later use on background threads. |
| [`BackgroundWorker`](https://learn.microsoft.com/dotnet/api/system.componentmodel.backgroundworker) | `Task` / `async`-`await` | Modern .NET async patterns are the right approach in WinUI 3. `Task`, `CancellationToken`, and `IProgress<T>` cover all `BackgroundWorker` scenarios and integrate naturally with `x:Bind`. |

## App model and lifecycle

| WPF concept | WinUI 3 equivalent | Notes |
| --- | --- | --- |
| `Application.Startup` / `Exit` events | `App.OnLaunched` / `Window.Closed` | WinUI 3 uses `OnLaunched` in `App.xaml.cs` as the entry point. Per-window teardown is handled in `Window.Closed`. |
| `Application.Current.MainWindow` | Your `Window` instance | Hold a reference to your window instance in `App.xaml.cs` and expose it as a property. |
| `Window` subclassing | [AppWindow](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.windowing.appwindow) customization | WinUI 3 windows are customized through `AppWindow` (title bar, presenter, overlapped/fullscreen/compact overlay modes) rather than subclassing. See [Manage app windows](../../develop/ui/manage-app-windows.md). |
| `SystemParameters` | `DisplayArea` / `UISettings` | System display properties are available through [DisplayArea](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.windowing.displayarea) and [UISettings](https://learn.microsoft.com/uwp/api/windows.ui.viewmanagement.uisettings). |

## Resources and localization

| WPF pattern | WinUI 3 equivalent | Notes |
| --- | --- | --- |
| `.resx` resource files | `.resw` + `ResourceLoader` | WinUI 3 uses `.resw` files and the [ResourceLoader](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.windows.applicationmodel.resources.resourceloader) API. The .NET Upgrade Assistant can automate much of this conversion. |
| `x:Static` markup extension | `x:Bind` to a static property | Use `x:Bind` with a static property or a singleton accessor. `x:Bind` is compiled and produces clearer error messages than `x:Static`. |
| Merged resource dictionaries | ✅ Supported | `ResourceDictionary.MergedDictionaries` works in WinUI 3. |
| Theme-specific resource dictionaries | ✅ Supported | `ResourceDictionary.ThemeDictionaries` is the WinUI 3 mechanism for per-theme resources, and integrates with automatic dark/light mode switching. |

## Printing

| WPF feature | WinUI 3 status | Notes |
| --- | --- | --- |
| [`PrintDialog`](https://learn.microsoft.com/dotnet/api/system.windows.controls.printdialog) / [`PrintDocument`](https://learn.microsoft.com/dotnet/api/system.drawing.printing.printdocument) | [PrintManager](https://learn.microsoft.com/uwp/api/windows.graphics.printing.printmanager) | Full printing support is available via `PrintManager`. See [Print from your app](https://learn.microsoft.com/windows/apps/develop/devices-sensors/print-from-your-app). |

## Developer tooling

| WPF tooling | WinUI 3 status | Notes |
| --- | --- | --- |
| XAML Designer (Design tab) | Not yet supported | The Visual Studio XAML Designer doesn't currently support WinUI 3 projects. [XAML Hot Reload](https://learn.microsoft.com/visualstudio/xaml-tools/xaml-hot-reload) is supported and is the recommended way to iterate on layout and styles without stopping the debugger. |
| Blend for Visual Studio | ⚠️ Limited support | Blend ships with Visual Studio and can open WinUI 3 projects. The XAML Document Outline is functional, but Design view is not available for WinUI 3. |

## See also

- [Use the Windows App SDK in an existing project](../use-windows-app-sdk-in-existing-project.md?pivots=dotnet)
- [Overall migration strategy](overall-migration-strategy.md)
- [Windows Community Toolkit](https://learn.microsoft.com/dotnet/communitytoolkit/introduction)
- [XAML Behaviors (Community Toolkit)](https://aka.ms/toolkit/behaviors)
