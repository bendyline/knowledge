---
title: Pass root component parameters in ASP.NET Core Blazor Hybrid
author: guardrex
description: Learn how to pass an optional dictionary of parameters to the root component in an ASP.NET Core Blazor Hybrid app.
monikerRange: '>= aspnetcore-6.0'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/hybrid/root-component-parameters
---
# Pass root component parameters in ASP.NET Core Blazor Hybrid

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


This article explains how to pass root component parameters in a Blazor Hybrid app.

The `RootComponent` class of a `BlazorWebView` defines a `Parameters` property of type `IDictionary<string, object?>?`, which represents an optional dictionary of parameters to pass to the root component:

* .NET MAUI: [Microsoft.AspNetCore.Components.WebView.Maui.RootComponent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Maui.RootComponent)
* WPF: [Microsoft.AspNetCore.Components.WebView.Wpf.RootComponent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.Wpf.RootComponent)
* Windows Forms: [Microsoft.AspNetCore.Components.WebView.WindowsForms.RootComponent](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.WebView.WindowsForms.RootComponent)

The following example passes a view model to the root component, which further passes the view model as a cascading type to a Razor component in the Blazor portion of the app. The example is based on the keypad example in the .NET MAUI documentation:

* [Data binding and MVVM: Commanding (.NET MAUI documentation)](https://learn.microsoft.com/dotnet/maui/xaml/fundamentals/mvvm#commanding): Explains data binding with MVVM using a keypad example.
* [.NET MAUI Samples](https://github.com/dotnet/maui-samples/)

Although the keypad example focuses on implementing the MVVM pattern in .NET MAUI Blazor Hybrid apps:

* The dictionary of objects passed to root components can include any type for any purpose where you need to pass one or more parameters to the root component for use by Razor components in the app.
* The concepts demonstrated by the following .NET MAUI Blazor example are the same for Windows Forms Blazor apps and WPF Blazor apps.

Place the following view model into your .NET MAUI Blazor Hybrid app. 

`KeypadViewModel.cs`:

```csharp
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;

namespace MauiBlazor;

public class KeypadViewModel : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged;

    private string _inputString = "";
    private string _displayText = "";
    private char[] _specialChars = { '*', '#' };

    public ICommand AddCharCommand { get; private set; }
    public ICommand DeleteCharCommand { get; private set; }

    public string InputString
    {
        get => _inputString;
        private set
        {
            if (_inputString != value)
            {
                _inputString = value;
                OnPropertyChanged();
                DisplayText = FormatText(_inputString);

                // Perhaps the delete button must be enabled/disabled.
                ((Command)DeleteCharCommand).ChangeCanExecute();
            }
        }
    }

    public string DisplayText
    {
        get => _displayText;
        set
        {
            if (_displayText != value)
            {
                _displayText = value;
                OnPropertyChanged();
            }
        }
    }

    public KeypadViewModel()
    {
        // Command to add the key to the input string
        AddCharCommand = new Command<string>((key) => InputString += key);

        // Command to delete a character from the input string when allowed
        DeleteCharCommand =
            new Command(
                // Command strips a character from the input string
                () => InputString = InputString.Substring(0, InputString.Length - 1),

                // CanExecute is processed here to return true when there's something to delete
                () => InputString.Length > 0
            );
    }

    string FormatText(string str)
    {
        bool hasNonNumbers = str.IndexOfAny(_specialChars) != -1;
        string formatted = str;

        // Format the string based on the type of data and the length
        if (hasNonNumbers || str.Length < 4 || str.Length > 10)
        {
            // Special characters exist, or the string is too small or large for special formatting
            // Do nothing
        }

        else if (str.Length < 8)
            formatted = string.Format("{0}-{1}", str.Substring(0, 3), str.Substring(3));

        else
            formatted = string.Format("({0}) {1}-{2}", str.Substring(0, 3), str.Substring(3, 3), str.Substring(6));

        return formatted;
    }

    public void OnPropertyChanged([CallerMemberName] string name = "") =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
}
```

In this article's example, the app's root namespace is `MauiBlazor`. Change the namespace of `KeypadViewModel` to match the app's root namespace:

```csharp
namespace MauiBlazor;
```

> **Note:**
> At the time the `KeypadViewModel` view model was created for the .NET MAUI sample app and the .NET MAUI documentation, view models were placed in a folder named `ViewModels`, but the namespace was set to the root of the app and didn't include the folder name. If you wish to update the namespace to include the folder in the `KeypadViewModel.cs` file, modify the example code in this article to match. Add `using` (C#) and `@using` (Razor) statements to the following files or fully-qualify the references to the view model type as `{APP NAMESPACE}.ViewModels.KeypadViewModel`, where the `{APP NAMESPACE}` placeholder is the app's root namespace.

Although you can set `Parameters` directly in XAML, the following example names the root component (`rootComponent`) in the XAML file and sets the parameter dictionary in the code-behind file.

In `MainPage.xaml`:

```xaml
<RootComponent x:Name="rootComponent" 
               Selector="#app" 
               ComponentType="{x:Type local:Main}" />
```

In the code-behind file (`MainPage.xaml.cs`), assign the view model in the constructor:

```csharp
public MainPage()
{
    InitializeComponent();

    rootComponent.Parameters = 
        new Dictionary<string, object>
        {
            { "KeypadViewModel", new KeypadViewModel() }
        };
}
```

The following example [cascades](../components/cascading-values-and-parameters.md) the object (`KeypadViewModel`) down component hierarchies in the Blazor portion of the app as a [`CascadingValue`](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fcascading-values-and-parameters%23cascadingvalue-component).

In the `Main` component (`Main.razor`):

* Add a parameter matching the type of the object passed to the root component:

  ```razor
  @code {
      [Parameter]
      public KeypadViewModel KeypadViewModel { get; set; }
  }
  ```

* Cascade the `KeypadViewModel` with the [`CascadingValue` component](https://learn.microsoft.com/search/?terms=blazor%2Fcomponents%2Fcascading-values-and-parameters%23cascadingvalue-component). Update the `<Found>` XAML content to the following markup:

  ```xaml
  <Found Context="routeData">
      <CascadingValue Value="KeypadViewModel">
          <RouteView RouteData="routeData" DefaultLayout="typeof(MainLayout)" />
          <FocusOnNavigate RouteData="routeData" Selector="h1"/>
      </CascadingValue>
  </Found>
  ```

At this point, the cascaded type is available to Razor components throughout the app as a [`CascadingParameter`](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Components.CascadingParameterAttribute).

The following `Keypad` component example:

* Displays the current value of `KeypadViewModel.DisplayText`.
* Permits character deletion by calling the `KeypadViewModel.DeleteCharCommand` command if the display string length is greater than 0 (zero), which is checked by the call to [System.Windows.Input.ICommand.CanExecute%2A](https://learn.microsoft.com/search/?terms=System.Windows.Input.ICommand.CanExecute%252A).
* Permits adding characters by calling `KeypadViewModel.AddCharCommand` with the key pressed in the UI.

`Pages/Keypad.razor`:

```razor
@page "/keypad"

<h1>Keypad</h1>

<table id="keypad">
    <thead>
        <tr>
            <th colspan="2">@KeypadViewModel.DisplayText</th>
            <th><button @onclick="DeleteChar">&#x21E6;</button></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><button @onclick="@(e => AddChar("1"))">1</button></td>
            <td><button @onclick="@(e => AddChar("2"))">2</button></td>
            <td><button @onclick="@(e => AddChar("3"))">3</button></td>
        </tr>
        <tr>
            <td><button @onclick="@(e => AddChar("4"))">4</button></td>
            <td><button @onclick="@(e => AddChar("5"))">5</button></td>
            <td><button @onclick="@(e => AddChar("6"))">6</button></td>
        </tr>
        <tr>
            <td><button @onclick="@(e => AddChar("7"))">7</button></td>
            <td><button @onclick="@(e => AddChar("8"))">8</button></td>
            <td><button @onclick="@(e => AddChar("9"))">9</button></td>
        </tr>
        <tr>
            <td><button @onclick="@(e => AddChar("*"))">*</button></td>
            <td><button @onclick="@(e => AddChar("0"))">0</button></td>
            <td><button @onclick="@(e => AddChar("#"))">#</button></td>
        </tr>
    </tbody>
</table>

@code {
    [CascadingParameter]
    private KeypadViewModel KeypadViewModel { get; set; }

    private void DeleteChar()
    {
        if (KeypadViewModel.DeleteCharCommand.CanExecute(null))
        {
            KeypadViewModel.DeleteCharCommand.Execute(null);
        }
    }

    private void AddChar(string key)
    {
        KeypadViewModel.AddCharCommand.Execute(key);
    }
}
```

Purely for demonstration purposes, style the buttons by placing the following CSS styles in the `wwwroot/index.html` file's `<head>` content:

```html
<style>
    #keypad button {
        border: 1px solid black;
        border-radius:6px;
        height: 35px;
        width:80px;
    }
</style>
```

Create a sidebar navigation entry in the `NavMenu` component (`Shared/NavMenu.razor`) with the following markup:

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="keypad">
        <span class="oi oi-list-rich" aria-hidden="true"></span> Keypad
    </NavLink>
</div>
```

## Additional resources

* [Host a Blazor web app in a .NET MAUI app using BlazorWebView](https://learn.microsoft.com/dotnet/maui/user-interface/controls/blazorwebview)
* [Data binding and MVVM: Commanding (.NET MAUI documentation)](https://learn.microsoft.com/dotnet/maui/xaml/fundamentals/mvvm#commanding)
* [blazor/components/cascading-values-and-parameters](../components/cascading-values-and-parameters.md)
