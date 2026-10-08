---
title: Use browser developer tools with ASP.NET Core Blazor Hybrid
author: guardrex
description: Learn how to use browser developer tools with ASP.NET Core Blazor Hybrid apps.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/hybrid/developer-tools
zone_pivot_groups: blazor-hybrid-operating-systems
---
# Use browser developer tools with ASP.NET Core Blazor Hybrid

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


<!-- This topic drops loc for "Mac Catalyst" -->

This article explains how to use [browser developer tools](https://developer.mozilla.org/docs/Glossary/Developer_Tools) with Blazor Hybrid apps.

## Browser developer tools with .NET MAUI Blazor

Ensure the Blazor Hybrid project is configured to support browser developer tools. You can confirm developer tools support by searching the app for `AddBlazorWebViewDeveloperTools`.

If the project isn't already configured for browser developer tools, add support by:

1. Locating where the call to [Microsoft.Extensions.DependencyInjection.BlazorWebViewServiceCollectionExtensions.AddMauiBlazorWebView%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.BlazorWebViewServiceCollectionExtensions.AddMauiBlazorWebView%252A) is made, likely within the app's `MauiProgram.cs` file.
1. At the top of the `MauiProgram.cs` file, confirm the presence of a `using` statement for [Microsoft.Extensions.Logging](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Logging). If the `using` statement isn't present, add it to the top of the file:

   ```csharp
   using Microsoft.Extensions.Logging;
   ```

1. After the call to [Microsoft.Extensions.DependencyInjection.BlazorWebViewServiceCollectionExtensions.AddMauiBlazorWebView%2A](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.DependencyInjection.BlazorWebViewServiceCollectionExtensions.AddMauiBlazorWebView%252A), add the following code:

   ```csharp
   #if DEBUG
       builder.Services.AddBlazorWebViewDeveloperTools();
       builder.Logging.AddDebug();
   #endif
   ```

**Applies to: windows**


To use browser developer tools with a Windows app:

1. Run the .NET MAUI Blazor Hybrid app for Windows and navigate to an app page that uses a [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView). The developer tools console is unavailable from [Microsoft.Maui.Controls.ContentPage](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.ContentPage)s without a Blazor Web View.
1. Use the keyboard shortcut <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> to open browser developer tools.
1. Developer tools provide a variety of features for working with apps, including which assets the page requested, how long assets took to load, and the content of loaded assets. The following example shows the **Console** tab to see the console messages, which includes any exception messages generated by the framework or developer code:

   Microsoft Edge DevTools window for a Blazor Hybrid app running on Windows



**Applies to: android**


To use browser developer tools with an Android app:

1. Start the Android emulator and navigate to an app page that uses a [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView). The developer tools console is unavailable from [Microsoft.Maui.Controls.ContentPage](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.ContentPage)s without a Blazor Web View.
1. Open Google Chrome or Microsoft Edge.
1. Navigate to `chrome://inspect/#devices` (Google Chrome) or `edge://inspect/#devices` (Microsoft Edge).
1. Select the **`inspect`** link button to open developer tools. The following example shows the **DevTools** page in Microsoft Edge:

   Microsoft Edge Devices showing the BlazorWebView's "inspect" link button to open developer tools.

1. Developer tools provide a variety of features for working with apps, including which assets the page requested, how long assets took to load, and the content of loaded assets. The following example shows the **Console** tab to see the console messages, which includes any exception messages generated by the framework or developer code:

   Microsoft Edge DevTools window for a Blazor Hybrid app running on an emulated Pixel 5



**Applies to: ios**


To use Safari developer tools with an iOS app:

1. Open desktop Safari.
1. Select the **Safari** > **Preferences** > **Advanced** > **Show Develop menu in the menu bar** checkbox.
1. Run the .NET MAUI Blazor Hybrid app in the iOS simulator and navigate to an app page that uses a [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView). The developer tools console is unavailable from [Microsoft.Maui.Controls.ContentPage](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.ContentPage)s without a Blazor Web View.
1. Return to Safari. Select **Develop** > **{REMOTE INSPECTION TARGET}** > **0.0.0.0**, where the `{REMOTE INSPECTION TARGET}` placeholder is either the devices's plain name (for example, `MacBook Pro`) or the device's serial number (for example `XMVM7VFF10`). If multiple entries for **0.0.0.0** are present, select the entry that highlights the [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView). The [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) is highlighted in blue in the iOS simulator when the correct **0.0.0.0** entry is selected.

   Safari Develop Simulator open showing two entries for "0.0.0.0" with the second entry selected because it highlights the BlazorWebView in the Visual Studio emulator UI.

1. The **Web Inspector** window appears for the [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView).
1. Developer tools provide a variety of features for working with apps, including which assets the page requested, how long assets took to load, and the content of loaded assets. The following example shows the **Console** tab, which includes any exception messages generated by the framework or developer code:

   Safari Web Inspector and Simulator windows for a Blazor Hybrid app running on an emulated iPad mini



**Applies to: macos**


<!-- On macOS, XML files use 4-space indents. Also, the PU uses 4-space indents in the .NET MAUI template file. -->

**Applies to: < aspnetcore-8.0**

Add the `com.apple.security.get-task-allow` key, of type `Boolean`, to the [entitlements file](https://learn.microsoft.com/dotnet/maui/ios/entitlements) of the app for its debug build.

To add an entitlements file with the `com.apple.security.get-task-allow` key, add the following XML file named `Entitlements.Debug.plist` to the `Platforms/MacCatalyst` folder of the project.

`Platforms/MacCatalyst/Entitlements.Debug.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.get-task-allow</key>
    <true/>
</dict>
</plist>
```

To consume the entitlements file for debug builds on Mac Catalyst, add the following `<PropertyGroup>` node to the app's project file as a child of the `<Project>` node:

```xml
<PropertyGroup Condition="$([MSBuild]::GetTargetPlatformIdentifier('$(TargetFramework)')) == 'maccatalyst' and '$(Configuration)' == 'Debug'">
    <CodeSignEntitlements>Platforms/MacCatalyst/Entitlements.Debug.plist</CodeSignEntitlements>
</PropertyGroup>
```



To use Safari developer tools with a macOS app:

1. Open desktop Safari.
1. Select the **Safari** > **Preferences** > **Advanced** > **Show Develop menu in the menu bar** checkbox.
1. Run the .NET MAUI Blazor Hybrid app in macOS.
1. Return to Safari. Select **Develop** > **{REMOTE INSPECTION TARGET}** > **0.0.0.0**, where the `{REMOTE INSPECTION TARGET}` placeholder is either the devices's plain name (for example, `MacBook Pro`) or the device's serial number (for example `XMVM7VFF10`). If multiple entries for **0.0.0.0** are present, select the entry that highlights the [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView). The [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView) is highlighted in blue in macOS when the correct **0.0.0.0** entry is selected.
1. The **Web Inspector** window appears for the [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView).
1. Developer tools provide a variety of features for working with apps, including which assets the page requested, how long assets took to load, and the content of loaded assets. The following example shows the **Console** tab, which includes any exception messages generated by the framework or developer code:

   Safari Web Inspector for a Blazor Hybrid app



## Additional resources

* [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
* [Microsoft Edge Developer Tools overview](https://learn.microsoft.com/microsoft-edge/devtools-guide-chromium/)
* [Safari Developer Help](https://support.apple.com/guide/safari-developer/welcome/mac)
* [Inspect a `BlazorWebView` on Mac Catalyst (Mac Catalyst prior to 13.1 and iOS prior to 16.4)](https://learn.microsoft.com/dotnet/maui/user-interface/controls/webview?pivots=devices-maccatalyst#inspect-a-webview-on-mac-catalyst)
