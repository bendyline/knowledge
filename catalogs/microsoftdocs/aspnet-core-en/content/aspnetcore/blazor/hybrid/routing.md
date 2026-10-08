---
title: ASP.NET Core Blazor Hybrid routing and navigation
ai-usage: ai-assisted
author: guardrex
description: Learn how to manage request routing and navigation in Blazor Hybrid apps.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 08/31/2026
uid: blazor/hybrid/routing
zone_pivot_groups: blazor-hybrid-frameworks
---
# ASP.NET Core Blazor Hybrid routing and navigation

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


This article explains how to manage request routing and navigation in Blazor Hybrid apps.

## URI request routing behavior

Default URI request routing behavior:

* A link is *internal* if the host name and scheme match between the app's origin URI and the request URI. When the host names and schemes don't match or if the link sets `target="_blank"`, the link is considered *external*.
* If the link is internal, the link is opened in the `BlazorWebView` by the app.
* If the link is external, the link is opened by an app determined by the device based on the device's registered handler for the link's scheme.
* For internal links that appear to request a file because the last segment of the URI uses dot notation (for example, `/file.x`, `/Maryia.Melnyk`, `/image.gif`) but don't point to any static content:
  * WPF and Windows Forms: The host page content is returned.
  * .NET MAUI: A 404 response is returned.

To change the link handling behavior for links that don't set `target="_blank"`, register the `UrlLoading` event and set the [Microsoft.AspNetCore.Components.WebView.UrlLoadingEventArgs.UrlLoadingStrategy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.UrlLoadingEventArgs.UrlLoadingStrategy) property. The [Microsoft.AspNetCore.Components.WebView.UrlLoadingEventArgs.UrlLoadingStrategy](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.UrlLoadingEventArgs.UrlLoadingStrategy) enumeration allows setting link handling behavior to any of the following values:

* [Microsoft.AspNetCore.Components.WebView.UrlLoadingStrategy.OpenExternally](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.UrlLoadingStrategy.OpenExternally): Load the URL using an app determined by the device. This is the default strategy for URIs with an external host.
* [Microsoft.AspNetCore.Components.WebView.UrlLoadingStrategy.OpenInWebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.UrlLoadingStrategy.OpenInWebView): Load the URL within the `BlazorWebView`. This is the default strategy for URLs with a host matching the app origin. ***Don't use this strategy for external links unless you can ensure the destination URI is fully trusted.***
* [Microsoft.AspNetCore.Components.WebView.UrlLoadingStrategy.CancelLoad](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.UrlLoadingStrategy.CancelLoad): Cancels the current URL loading attempt.

The [Microsoft.AspNetCore.Components.WebView.UrlLoadingEventArgs.Url](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.UrlLoadingEventArgs.Url) property is used to get or dynamically set the URL.

> **Warning:**
> External links are opened in an app determined by the device. Opening external links within a `BlazorWebView` can introduce security vulnerabilities and shouldn't be enabled unless you can ensure that the external links are fully trusted.

API documentation:

* .NET MAUI: [Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView.UrlLoading](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView.UrlLoading)
* WPF: [Microsoft.AspNetCore.Components.WebView.Wpf.BlazorWebView.UrlLoading](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Wpf.BlazorWebView.UrlLoading)
* Windows Forms: [Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView.UrlLoading](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView.UrlLoading)

The [Microsoft.AspNetCore.Components.WebView](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView) namespace is required for the following examples:

```csharp
using Microsoft.AspNetCore.Components.WebView;
```

**Applies to: maui**


Add the following event handler to the constructor of the `Page` where the `BlazorWebView` is created, which is `MainPage.xaml.cs` in an app created from the .NET MAUI project template.

```csharp
blazorWebView.UrlLoading += 
    (sender, urlLoadingEventArgs) =>
    {
        if (urlLoadingEventArgs.Url.Host != "0.0.0.0")
        {
            urlLoadingEventArgs.UrlLoadingStrategy = 
                UrlLoadingStrategy.OpenInWebView;
        }
    };
```



**Applies to: wpf**


Add the `UrlLoading="Handle_UrlLoading"` attribute to the `BlazorWebView` control in the `.xaml` file:

```xaml
<blazor:BlazorWebView HostPage="wwwroot\index.html" 
    Services="{StaticResource services}" 
    x:Name="blazorWebView" 
    UrlLoading="Handle_UrlLoading">
```

Add the event handler in the `.xaml.cs` file:

```csharp
private void Handle_UrlLoading(object sender, 
    UrlLoadingEventArgs urlLoadingEventArgs)
{
    if (urlLoadingEventArgs.Url.Host != "0.0.0.0")
    {
        urlLoadingEventArgs.UrlLoadingStrategy = 
            UrlLoadingStrategy.OpenInWebView;
    }
}
```



**Applies to: winforms**


In the constructor of the form containing the `BlazorWebView` control, add the following event registration:

```csharp
blazorWebView.UrlLoading += 
    (sender, urlLoadingEventArgs) =>
    {
        if (urlLoadingEventArgs.Url.Host != "0.0.0.0")
        {
            urlLoadingEventArgs.UrlLoadingStrategy = 
                UrlLoadingStrategy.OpenInWebView;
        }
    };
```



**Applies to: \>= aspnetcore-8.0**

## Get or set a path for initial navigation

Use the `BlazorWebView.StartPath` property to get or set the path for initial navigation within the Blazor navigation context when the Razor component is finished loading. The default start path is the relative root URL path (`/`).

**Applies to: maui**


In the `MainPage` XAML markup (`MainPage.xaml`), specify the start path. The following example sets the path to a welcome page at `/welcome`:

```xaml
<BlazorWebView ... StartPath="/welcome" ...>
    ...
<BlazorWebView>
```

Alternatively, the start path can be set in the `MainPage` constructor (`MainPage.xaml.cs`):

```csharp
blazorWebView.StartPath = "/welcome";
```



**Applies to: wpf**


In the `MainWindow` designer (`MainWindow.xaml`), specify the start path. The following example sets the path to a welcome page at `/welcome`:

```xaml
<blazor:BlazorWebView ... StartPath="/welcome" ...>
    ...
</blazor:BlazorWebView>
```



**Applies to: winforms**


Inside the `Form1` constructor of the `Form1.cs` file, specify the start path. The following example sets the path to a welcome page at `/welcome`:

```csharp
blazorWebView1.StartPath = "/welcome";
```





**Applies to: maui**


## Navigation among pages and Razor components

This section explains how to navigate among .NET MAUI content pages and Razor components.

The .NET MAUI Blazor hybrid project template isn't a [Shell-based app](https://learn.microsoft.com/dotnet/maui/fundamentals/shell/), so the [URI-based navigation for Shell-based apps](https://learn.microsoft.com/dotnet/maui/fundamentals/shell/navigation) isn't suitable for a project based on the project template. The examples in this section use a [Microsoft.Maui.Controls.NavigationPage](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.NavigationPage) to perform modeless or modal navigation.

In the following example:

* The namespace of the app is `MauiApp1`, which matches the suggested project name of the [Build your first app](https://learn.microsoft.com/dotnet/maui/get-started/first-app) tutorial.
* A [Microsoft.Maui.Controls.ContentPage](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.ContentPage) is placed in a new folder added to the app named `Views`.

In `App.xaml.cs`, create the `MainPage` as a [Microsoft.Maui.Controls.NavigationPage](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.NavigationPage) by making the following change:

```diff
- MainPage = new MainPage();
+ MainPage = new NavigationPage(new MainPage());
```

`Views/NavigationExample.xaml`:

```xaml
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             xmlns:local="clr-namespace:MauiApp1"
             x:Class="MauiApp1.Views.NavigationExample"
             Title="Navigation Example"
             BackgroundColor="{DynamicResource PageBackgroundColor}">
    <StackLayout>
        <Label Text="Navigation Example"
               VerticalOptions="Center"
               HorizontalOptions="Center"
               FontSize="24" />
        <Button x:Name="CloseButton" 
                Clicked="CloseButton_Clicked" 
                Text="Close" />
    </StackLayout>
</ContentPage>
```

In the following `NavigationExample` code file, the `CloseButton_Clicked` event handler for the close button calls [Microsoft.Maui.Controls.INavigation.PopAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.INavigation.PopAsync%252A) to pop the [Microsoft.Maui.Controls.ContentPage](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.ContentPage) off of the navigation stack.

`Views/NavigationExample.xaml.cs`:

```csharp
namespace MauiApp1.Views;

public partial class NavigationExample : ContentPage
{
    public NavigationExample()
    {
        InitializeComponent();
    }

    private async void CloseButton_Clicked(object sender, EventArgs e)
    {
        await Navigation.PopAsync();
    }
}
```

In a Razor component:

* Add the namespace for the app's content pages. In the following example, the namespace is `MauiApp1.Views`.
* Add an HTML `button` element with an [`@onclick` event handler](../components/event-handling.md) to open the content page. The event handler method is named `OpenPage`.
* In the event handler, call [Microsoft.Maui.Controls.INavigation.PushAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.INavigation.PushAsync%252A) to push the [Microsoft.Maui.Controls.ContentPage](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.ContentPage), `NavigationExample`, onto the navigation stack.

The following example is based on the `Index` component in the .NET MAUI Blazor project template.

`Pages/Index.razor`:

```razor
@page "/"
@using MauiApp1.Views

<h1>Hello, world!</h1>

Welcome to your new app.

<SurveyPrompt Title="How is Blazor working for you?" />

<button class="btn btn-primary" @onclick="OpenPage">Open</button>

@code {
    private async void OpenPage()
    {
        await App.Current.MainPage.Navigation.PushAsync(new NavigationExample());
    }
}
```

To change the preceding example to modal navigation:

* In the `CloseButton_Clicked` method (`Views/NavigationExample.xaml.cs`), change [Microsoft.Maui.Controls.INavigation.PopAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.INavigation.PopAsync%252A) to [Microsoft.Maui.Controls.INavigation.PopModalAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.INavigation.PopModalAsync%252A):

  ```diff
  - await Navigation.PopAsync();
  + await Navigation.PopModalAsync();
  ```

* In the `OpenPage` method (`Pages/Index.razor`), change [Microsoft.Maui.Controls.INavigation.PushAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.INavigation.PushAsync%252A) to [Microsoft.Maui.Controls.INavigation.PushModalAsync%2A](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.INavigation.PushModalAsync%252A):

  ```diff
  - await App.Current.MainPage.Navigation.PushAsync(new NavigationExample());
  + await App.Current.MainPage.Navigation.PushModalAsync(new NavigationExample());
  ```

For more information, see the following resources:

* [`NavigationPage` article (.NET MAUI documentation)](https://learn.microsoft.com/dotnet/maui/user-interface/pages/navigationpage)
* [`NavigationPage` (API documentation)](https://learn.microsoft.com/search/?terms=Microsoft.Maui.Controls.NavigationPage)



**Applies to: \>= aspnetcore-8.0**

**Applies to: maui**


## App linking (deep linking)

It's often desirable to connect a website and a mobile app so that links on a website launch the mobile app and display content in the mobile app. App linking, also known as *deep linking*, is a technique that enables a mobile device to respond to a URI and launch content in a mobile app that's represented by the URI.

For more information, see the following articles in the .NET MAUI documentation:

* [Android app links](https://learn.microsoft.com/dotnet/maui/android/app-links)
* [Apple universal links](https://learn.microsoft.com/dotnet/maui/macios/universal-links)
