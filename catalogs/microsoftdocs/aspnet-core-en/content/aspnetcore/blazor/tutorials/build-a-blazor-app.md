---
title: Build a Blazor todo list app
author: guardrex
description: Build a Blazor app step-by-step.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.date: 11/11/2025
uid: blazor/tutorials/build-a-blazor-app
---
# Build a Blazor todo list app

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


This tutorial provides a basic working experience for building and modifying a Blazor app. For detailed Blazor guidance, see the [Blazor reference documentation](../index.md).

Learn how to:

> 
> * Create a todo list Blazor app project
> * Modify Razor components
> * Use event handling and data binding in components
> * Use routing in a Blazor app

At the end of this tutorial, you'll have a working todo list app.

## Prerequisites

[Download and install .NET](https://dotnet.microsoft.com/download/dotnet) if it isn't already installed on the system or if the system doesn't have the latest version installed.

## Create a Blazor app

**Applies to: \>= aspnetcore-8.0**

Create a new Blazor Web App named `TodoList` in a command shell:

```dotnetcli
dotnet new blazor -o TodoList
```

The `-o|--output` option creates a folder for the project. If you've created a folder for the project and the command shell is open in that folder, omit the `-o|--output` option and value to create the project.



**Applies to: < aspnetcore-8.0**

Use either of the following hosting models to create a new Blazor app named `TodoList` in a command shell:

* For an experience with Blazor Server, create the app with the following command:

  ```dotnetcli
  dotnet new blazorserver -o TodoList
  ```

* For an experience with Blazor WebAssembly, create the app with the following command:

  ```dotnetcli
  dotnet new blazorwasm -o TodoList
  ```



The preceding command creates a folder named `TodoList` with the `-o|--output` option to hold the app. The `TodoList` folder is the *root folder* of the project. Change directories to the `TodoList` folder with the following command:

```dotnetcli
cd TodoList
```

## Build a todo list Blazor app

Add a new `Todo` Razor component to the app using the following command:

**Applies to: \>= aspnetcore-8.0**

```dotnetcli
dotnet new razorcomponent -n Todo -o Components/Pages
```

The `-n|--name` option in the preceding command specifies the name of the new Razor component. The new component is created in the project's `Components/Pages` folder with the `-o|--output` option.



**Applies to: < aspnetcore-8.0**

```dotnetcli
dotnet new razorcomponent -n Todo -o Pages
```

The `-n|--name` option in the preceding command specifies the name of the new Razor component. The new component is created in the project's `Pages` folder with the `-o|--output` option.



> **Important:**
> Razor component file names require a capitalized first letter. Open the `Pages` folder and confirm that the `Todo` component file name starts with a capital letter `T`. The file name should be `Todo.razor`.

**Applies to: \>= aspnetcore-8.0**

Open the `Todo` component in any file editor and make the following changes at the top of the file:

* Add an `@page` Razor directive with a relative URL of `/todo`.
* Enable interactivity on the page so that it isn't just statically rendered. The Interactive Server render mode enables the component to handle UI events from the server.
* Add a page title with the `PageTitle` component, which enables adding an HTML `<title>` element to the page.



**Applies to: \>= aspnetcore-6.0 < aspnetcore-8.0**

Open the `Todo` component in any file editor and make the following changes at the top of the file:

* Add an `@page` Razor directive with a relative URL of `/todo`.
* Add a page title with the `PageTitle` component, which enables adding an HTML `<title>` element to the page.



**Applies to: < aspnetcore-6.0**

Open the `Todo` component in any file editor and add an `@page` Razor directive with a relative URL of `/todo`.



`Todo.razor`:

**Applies to: \>= aspnetcore-9.0**

[language="razor" source="build-a-blazor-app/9.0/Todo0.razor"::: (complete source file; reference: build-a-blazor-app/9.0/Todo0.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/9.0/Todo0.razor.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[language="razor" source="build-a-blazor-app/8.0/Todo0.razor"::: (complete source file; reference: build-a-blazor-app/8.0/Todo0.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/8.0/Todo0.razor.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[language="razor" source="build-a-blazor-app/7.0/Todo0.razor"::: (complete source file; reference: build-a-blazor-app/7.0/Todo0.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/7.0/Todo0.razor.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[language="razor" source="build-a-blazor-app/6.0/Todo0.razor"::: (complete source file; reference: build-a-blazor-app/6.0/Todo0.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/6.0/Todo0.razor.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[language="razor" source="build-a-blazor-app/5.0/Todo0.razor"::: (complete source file; reference: build-a-blazor-app/5.0/Todo0.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/5.0/Todo0.razor.md)



**Applies to: < aspnetcore-5.0**

[language="razor" source="build-a-blazor-app/3.1/Todo0.razor"::: (complete source file; reference: build-a-blazor-app/3.1/Todo0.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/3.1/Todo0.razor.md)



Save the `Todo.razor` file.

Add the `Todo` component to the navigation bar.

The `NavMenu` component is used in the app's layout. Layouts are components that allow you to avoid duplication of content in an app. The `NavLink` component provides a cue in the app's UI when the component URL is loaded by the app.

In the navigation element (`<nav>`) content of the `NavMenu` component, add the following `<div>` element for the `Todo` component.

**Applies to: \>= aspnetcore-8.0**

In `Components/Layout/NavMenu.razor`:



**Applies to: < aspnetcore-8.0**

In `Shared/NavMenu.razor`:



```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="todo">
        <span class="oi oi-list-rich" aria-hidden="true"></span> Todo
    </NavLink>
</div>
```

Save the `NavMenu.razor` file.

Build and run the app by executing the [`dotnet watch run`](../../tutorials/dotnet-watch.md) command in the command shell from the `TodoList` folder. After the app is running, visit the new Todo page by selecting the **`Todo`** link in the app's navigation bar, which loads the page at `/todo`.

Leave the app running the command shell. Each time a file is saved, the app is automatically rebuilt, and the page in the browser is automatically reloaded.

Add a `TodoItem.cs` file to the root of the project (the `TodoList` folder) to hold a class that represents a todo item. Use the following C# code for the `TodoItem` class.

`TodoItem.cs`:

**Applies to: \>= aspnetcore-9.0**

```csharp
public class TodoItem
{
    public string? Title { get; set; }
    public bool IsDone { get; set; }
}
```



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

```csharp
public class TodoItem
{
    public string? Title { get; set; }
    public bool IsDone { get; set; }
}
```



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

```csharp
public class TodoItem
{
    public string? Title { get; set; }
    public bool IsDone { get; set; }
}
```



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

```csharp
public class TodoItem
{
    public string? Title { get; set; }
    public bool IsDone { get; set; }
}
```



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

```csharp
public class TodoItem
{
    public string Title { get; set; }
    public bool IsDone { get; set; }
}
```



**Applies to: < aspnetcore-5.0**

```csharp
public class TodoItem
{
    public string Title { get; set; }
    public bool IsDone { get; set; }
}
```



> **Note:**
> If using Visual Studio to create the `TodoItem.cs` file and `TodoItem` class, use ***either*** of the following approaches:
>
> * Remove the namespace that Visual Studio generates for the class.
> * Use the **Copy** button in the preceding code block and replace the entire contents of the file that Visual Studio generates.

Return to the `Todo` component and perform the following tasks:

* Add a field for the todo items in the `@code` block. The `Todo` component uses this field to maintain the state of the todo list.
* Add unordered list markup and a `foreach` loop to render each todo item as a list item (`<li>`).

**Applies to: \>= aspnetcore-9.0**

`Components/Pages/Todo.razor`:

[language="razor" source="build-a-blazor-app/9.0/Todo2.razor"::: (complete source file; reference: build-a-blazor-app/9.0/Todo2.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/9.0/Todo2.razor.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

`Components/Pages/Todo.razor`:

[language="razor" source="build-a-blazor-app/8.0/Todo2.razor"::: (complete source file; reference: build-a-blazor-app/8.0/Todo2.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/8.0/Todo2.razor.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

`Pages/Todo.razor`:

[language="razor" source="build-a-blazor-app/7.0/Todo2.razor"::: (complete source file; reference: build-a-blazor-app/7.0/Todo2.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/7.0/Todo2.razor.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

`Pages/Todo.razor`:

[language="razor" source="build-a-blazor-app/6.0/Todo2.razor"::: (complete source file; reference: build-a-blazor-app/6.0/Todo2.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/6.0/Todo2.razor.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

`Pages/Todo.razor`:

[language="razor" source="build-a-blazor-app/5.0/Todo2.razor"::: (complete source file; reference: build-a-blazor-app/5.0/Todo2.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/5.0/Todo2.razor.md)



**Applies to: < aspnetcore-5.0**

`Pages/Todo.razor`:

[language="razor" source="build-a-blazor-app/3.1/Todo2.razor"::: (complete source file; reference: build-a-blazor-app/3.1/Todo2.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/3.1/Todo2.razor.md)



The app requires UI elements for adding todo items to the list. Add a text input (`<input>`) and a button (`<button>`) below the unordered list (`<ul>...</ul>`):

**Applies to: \>= aspnetcore-9.0**

[language="razor" source="build-a-blazor-app/9.0/Todo3.razor"::: (complete source file; reference: build-a-blazor-app/9.0/Todo3.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/9.0/Todo3.razor.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[language="razor" source="build-a-blazor-app/8.0/Todo3.razor"::: (complete source file; reference: build-a-blazor-app/8.0/Todo3.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/8.0/Todo3.razor.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[language="razor" source="build-a-blazor-app/7.0/Todo3.razor"::: (complete source file; reference: build-a-blazor-app/7.0/Todo3.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/7.0/Todo3.razor.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[language="razor" source="build-a-blazor-app/6.0/Todo3.razor"::: (complete source file; reference: build-a-blazor-app/6.0/Todo3.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/6.0/Todo3.razor.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[language="razor" source="build-a-blazor-app/5.0/Todo3.razor"::: (complete source file; reference: build-a-blazor-app/5.0/Todo3.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/5.0/Todo3.razor.md)



**Applies to: < aspnetcore-5.0**

[language="razor" source="build-a-blazor-app/3.1/Todo3.razor"::: (complete source file; reference: build-a-blazor-app/3.1/Todo3.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/3.1/Todo3.razor.md)



Save the `TodoItem.cs` file and the updated `Todo.razor` file. In the command shell, the app is automatically rebuilt when the files are saved. The browser reloads the page.

When the **`Add todo`** button is selected, nothing happens because an event handler isn't attached to the button.

Add an `AddTodo` method to the `Todo` component and register the method for the button using the `@onclick` attribute. The `AddTodo` C# method is called when the button is selected:

**Applies to: \>= aspnetcore-9.0**

[language="razor" source="build-a-blazor-app/9.0/Todo4.razor"::: (complete source file; reference: build-a-blazor-app/9.0/Todo4.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/9.0/Todo4.razor.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[language="razor" source="build-a-blazor-app/8.0/Todo4.razor"::: (complete source file; reference: build-a-blazor-app/8.0/Todo4.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/8.0/Todo4.razor.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[language="razor" source="build-a-blazor-app/7.0/Todo4.razor"::: (complete source file; reference: build-a-blazor-app/7.0/Todo4.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/7.0/Todo4.razor.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[language="razor" source="build-a-blazor-app/6.0/Todo4.razor"::: (complete source file; reference: build-a-blazor-app/6.0/Todo4.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/6.0/Todo4.razor.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[language="razor" source="build-a-blazor-app/5.0/Todo4.razor"::: (complete source file; reference: build-a-blazor-app/5.0/Todo4.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/5.0/Todo4.razor.md)



**Applies to: < aspnetcore-5.0**

[language="razor" source="build-a-blazor-app/3.1/Todo4.razor"::: (complete source file; reference: build-a-blazor-app/3.1/Todo4.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/3.1/Todo4.razor.md)



To get the title of the new todo item, add a `newTodo` string field at the top of the `@code` block:

**Applies to: \>= aspnetcore-6.0**

```csharp
private string? newTodo;
```



**Applies to: < aspnetcore-6.0**

```csharp
private string newTodo;
```



Modify the text `<input>` element to bind `newTodo` with the `@bind` attribute:

```razor
<input placeholder="Something todo" @bind="newTodo" />
```

Update the `AddTodo` method to add the `TodoItem` with the specified title to the list. Clear the value of the text input by setting `newTodo` to an empty string:

**Applies to: \>= aspnetcore-9.0**

[language="razor" source="build-a-blazor-app/9.0/Todo6.razor"::: (complete source file; reference: build-a-blazor-app/9.0/Todo6.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/9.0/Todo6.razor.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[language="razor" source="build-a-blazor-app/8.0/Todo6.razor"::: (complete source file; reference: build-a-blazor-app/8.0/Todo6.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/8.0/Todo6.razor.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[language="razor" source="build-a-blazor-app/7.0/Todo6.razor"::: (complete source file; reference: build-a-blazor-app/7.0/Todo6.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/7.0/Todo6.razor.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[language="razor" source="build-a-blazor-app/6.0/Todo6.razor"::: (complete source file; reference: build-a-blazor-app/6.0/Todo6.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/6.0/Todo6.razor.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[language="razor" source="build-a-blazor-app/5.0/Todo6.razor"::: (complete source file; reference: build-a-blazor-app/5.0/Todo6.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/5.0/Todo6.razor.md)



**Applies to: < aspnetcore-5.0**

[language="razor" source="build-a-blazor-app/3.1/Todo6.razor"::: (complete source file; reference: build-a-blazor-app/3.1/Todo6.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/3.1/Todo6.razor.md)



Save the `Todo.razor` file. The app is automatically rebuilt in the command shell, and the page reloads in the browser.

The title text for each todo item can be made editable, and a checkbox can help the user keep track of completed items. Add a checkbox input for each todo item and bind its value to the `IsDone` property. Change `@todo.Title` to an `<input>` element bound to `todo.Title` with `@bind`:

```razor
<ul>
      @foreach (var todo in todos)
      {
         <li>
            <input type="checkbox" @bind="todo.IsDone" />
            <input @bind="todo.Title" />
         </li>
      }
</ul>
```

Update the `<h3>` header to show a count of the number of todo items that aren't complete (`IsDone` is `false`). The Razor expression in the following header evaluates each time Blazor rerenders the component.

```razor
<h3>Todo (@todos.Count(todo => !todo.IsDone))</h3>
```

The completed `Todo` component:

**Applies to: \>= aspnetcore-9.0**

[language="razor" source="build-a-blazor-app/9.0/Todo8.razor"::: (complete source file; reference: build-a-blazor-app/9.0/Todo8.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/9.0/Todo8.razor.md)



**Applies to: \>= aspnetcore-8.0 < aspnetcore-9.0**

[language="razor" source="build-a-blazor-app/8.0/Todo8.razor"::: (complete source file; reference: build-a-blazor-app/8.0/Todo8.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/8.0/Todo8.razor.md)



**Applies to: \>= aspnetcore-7.0 < aspnetcore-8.0**

[language="razor" source="build-a-blazor-app/7.0/Todo8.razor"::: (complete source file; reference: build-a-blazor-app/7.0/Todo8.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/7.0/Todo8.razor.md)



**Applies to: \>= aspnetcore-6.0 < aspnetcore-7.0**

[language="razor" source="build-a-blazor-app/6.0/Todo8.razor"::: (complete source file; reference: build-a-blazor-app/6.0/Todo8.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/6.0/Todo8.razor.md)



**Applies to: \>= aspnetcore-5.0 < aspnetcore-6.0**

[language="razor" source="build-a-blazor-app/5.0/Todo8.razor"::: (complete source file; reference: build-a-blazor-app/5.0/Todo8.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/5.0/Todo8.razor.md)



**Applies to: < aspnetcore-5.0**

[language="razor" source="build-a-blazor-app/3.1/Todo8.razor"::: (complete source file; reference: build-a-blazor-app/3.1/Todo8.razor)](../../../_code/aspnetcore/blazor/tutorials/build-a-blazor-app/3.1/Todo8.razor.md)



Save the `Todo.razor` file. The app is automatically rebuilt in the command shell, and the page reloads in the browser.

Add items, edit items, and mark todo items done to test the component.

When finished, shut down the app in the command shell. Many command shells accept the keyboard command <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop an app.

## Publish to Azure

For information on deploying to Azure, see [Quickstart: Deploy an ASP.NET web app](https://learn.microsoft.com/azure/app-service/quickstart-dotnetcore).

## Next steps

In this tutorial, you learned how to:

> 
> * Create a todo list Blazor app project
> * Modify Razor components
> * Use event handling and data binding in components
> * Use routing in a Blazor app

Learn about tooling for ASP.NET Core Blazor:

> 
> [blazor/index](../index.md)
