---
title: Create a .NET console application
description: Learn how to create a .NET console application using Visual Studio, Visual Studio Code, or GitHub Codespaces.
ms.date: 03/03/2026
ai-usage: ai-assisted
zone_pivot_groups: code-editor-set-one
dev_langs:
  - "csharp"
  - "vb"
---
# Tutorial: Create a .NET console application

**Applies to: visualstudio**


This tutorial shows how to create and run a .NET console application in Visual Studio.

In this tutorial, you:

> 
>
> * Create a Visual Studio solution and console app project.
> * Create a "HelloWorld" .NET console application.
> * Enhance the app to prompt the user for their name and display it in the console window.



**Applies to: vscode**


This tutorial shows how to create and run a .NET console application by using Visual Studio Code.

In this tutorial, you:

> 
>
> * Launch Visual Studio Code with a C# development environment.
> * Create a "HelloWorld" .NET console application.
> * Enhance the app to prompt the user for their name and display it in the console window.



**Applies to: codespaces**


This tutorial shows how to create and run a .NET console application by using GitHub Codespaces.

In this tutorial, you:

> 
>
> * Launch a GitHub Codespace with a C# development environment.
> * Create a "HelloWorld" .NET file-based app.
> * Enhance the app to prompt the user for their name and display it in the console window.



## Prerequisites

**Applies to: visualstudio**


- [Visual Studio](https://visualstudio.microsoft.com/downloads/?utm_medium=microsoft&utm_source=learn.microsoft.com&utm_campaign=inline+link) with the **.NET desktop development** workload installed. The .NET SDK is automatically installed when you select this workload.

  For more information, see [Install the .NET SDK with Visual Studio](../install/windows.md#install-with-visual-studio).



**Applies to: vscode**



- The latest [.NET SDK](https://dotnet.microsoft.com/download)
- [Visual Studio Code](https://code.visualstudio.com) editor
- The [C# DevKit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)

### Installation instructions

On Windows, this [WinGet configuration file](https://builds.dotnet.microsoft.com/dotnet/install/dotnet_basic_config_docs.winget) to install all prerequisites. If you already have something installed, WinGet will skip that step.

1. Download the file and double-click to run it.
1. Read the license agreement, type <kbd>y</kbd>, and select <kbd>Enter</kbd> when prompted to accept.
1. If you get a flashing User Account Control (UAC) prompt in your Taskbar, allow the installation to continue.

On other platforms, you need to install each of these components separately.

1. Download the recommended installer from the [.NET SDK download page](https://dotnet.microsoft.com/download) and double-click to run it. The download page detects your platform and recommends the latest installer for your platform.
1. Download the latest installer from the [Visual Studio Code](https://code.visualstudio.com) home page and double click to run it. That page also detects your platform and the link should be correct for your system.
1. Click the "Install" button on the [C# DevKit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) extension page. That opens Visual Studio code, and asks if you want to install or enable the extension. Select "install".




**Applies to: codespaces**


- A GitHub account to use [GitHub Codespaces](https://github.com/codespaces). If you don't already have one, you can create a free account at [GitHub.com](https://github.com).



## Create the app

**Applies to: visualstudio**


Create a .NET console app project named "HelloWorld".

1. Start Visual Studio.

1. On the start page, choose **Create a new project**.

   Create a new project button selected on the Visual Studio start page

1. On the **Create a new project** page, enter **console** in the search box. Next, choose **C#** or **Visual Basic** from the language list, and then choose **All platforms** from the platform list. Choose the **Console App** template, and then choose **Next**.

   Create a new project window with filters selected

   > **Tip:**
   > If you don't see the .NET templates, you're probably missing the required workload. Under the **Not finding what you're looking for?** message, choose the **Install more tools and features** link. The Visual Studio Installer opens. Make sure you have the **.NET desktop development** workload installed.

1. In the **Configure your new project** dialog,  enter **HelloWorld** in the **Project name** box. Then choose **Next**.

   Configure your new project window with Project name, location, and solution name fields

1. In the **Additional information** dialog:
   - Select **.NET 10.0 (Long Term Support)**.
   - Select **Create**.

   Enter additional information for the console app.

   The template creates a simple application that displays "Hello, World!" in the console window. The code is in the *Program.cs* or *Program.vb* file:

   ```csharp
   // See https://aka.ms/new-console-template for more information
   Console.WriteLine("Hello, World!");
   ```

   ```vb
   Imports System

   Module Program
       Sub Main(args As String())
           Console.WriteLine("Hello World!")
       End Sub
   End Module
   ```

   If the language you want to use is not shown, change the language selector at the top of the page.

   The C# template uses top-level statements to call the [System.Console.WriteLine(System.String)](https://learn.microsoft.com/search/?terms=System.Console.WriteLine(System.String)) method to display a message in the console window. The Visual Basic template defines a `Module Program` with a `Sub Main` method that calls the same method.



**Applies to: vscode**


Create a .NET console app project named "HelloWorld".

1. Start Visual Studio Code.

1. Go to the Explorer view and select **Create .NET Project**. Alternatively, you can bring up the Command Palette using Ctrl+Shift+P (Command+Shift+P on MacOS) and then type ".NET" and find and select the .NET: New Project command.

    The .NET: New Project command in the Command Palette

1. After selecting the command, you need to choose the project template. Choose **Console App**.

1. Select the location where you would like the new project to be created.

1. Give your new project a name, "HelloWorld".

1. Select **.sln** for the solution file format.

1. Select **Create Project**.

1. The project is created and the *Program.cs* file opens. You see the simple application created by the template:

   ```csharp
   // See https://aka.ms/new-console-template for more information
   Console.WriteLine("Hello, World!");
   ```

    The code defines a class, `Program`, that calls the [System.Console.WriteLine(System.String)](https://learn.microsoft.com/search/?terms=System.Console.WriteLine(System.String)) method to display a message in the console window.



**Applies to: codespaces**


### Open Codespaces

Start a GitHub Codespace with the tutorial environment.

1. Open a browser window and navigate to the [tutorial codespace](https://github.com/dotnet/tutorial-codespace) repository.

1. Select the green **Code** button, and then the **Codespaces** tab.

1. Select the `+` sign or the green **Create codespace on main** button to create a new Codespace using this environment.

    Create a new Codespace from the tutorial repository

### Create a .NET file-based app

In Codespaces, you'll create a [file-based app](../sdk/file-based-apps.md). File-based apps let you build .NET applications from a single C# file without creating a traditional project file.

1. When your codespace loads, right-click on the *tutorials* folder and select **New File...**. Enter the name *HelloWorld.cs* and then press <kbd>Enter</kbd>.

    Create a new file named HelloWorld.cs in the tutorials folder

1. *HelloWorld.cs* opens in the editor. Type or copy the following code into the file:

    [language="csharp" source="../snippets/get-started/csharp/hello-world.cs" id="HelloWorld"::: (complete source file; reference: ../snippets/get-started/csharp/hello-world.cs)](../../../_code/docs/core/snippets/get-started/csharp/hello-world.cs.md)



## Run the app

**Applies to: visualstudio**


1. Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the program without debugging.

   A console window opens with the text "Hello, World!" printed on the screen. (Or "Hello World!" without a comma in the Visual Basic project template.)

1. Press any key to close the console window.



**Applies to: vscode**


To run your app, select **Run** > **Run without Debugging** in the upper menu, or use the keyboard shortcut (Ctrl+F5).

If asked to select a debugger, select **C#** as the debugger, then select **C#: Debug Active File** as the Launch configuration.

The program displays "Hello, World!" and ends.



**Applies to: codespaces**


In the terminal window, make sure the tutorials folder is the current folder, and run your program:

```dotnetcli
cd tutorials
dotnet HelloWorld.cs
```

The program displays "Hello, World!" and ends.



## Enhance the app

Enhance the application to prompt the user for their name and display it along with the date and time.

**Applies to: visualstudio**


1. In *Program.cs* or *Program.vb*, replace the contents with the following code:

   [language="csharp" source="./snippets/create-console-app/csharp/Program.cs" id="MainMethod"::: (complete source file; reference: ./snippets/create-console-app/csharp/Program.cs)](../../../_code/docs/core/tutorials/snippets/create-console-app/csharp/Program.cs.md)
   [language="vb" source="./snippets/create-console-app/vb/Program.vb" id="MainMethod"::: (complete source file; reference: ./snippets/create-console-app/vb/Program.vb)](../../../_code/docs/core/tutorials/snippets/create-console-app/vb/Program.vb.md)

   This code displays a prompt in the console window and waits until the user enters a string followed by the <kbd>Enter</kbd> key. It stores this string in a variable named `name`. It also retrieves the value of the [System.DateTime.Now](https://learn.microsoft.com/search/?terms=System.DateTime.Now) property, which contains the current local time, and assigns it to a variable named `currentDate`. And it displays these values in the console window. Finally, it displays a prompt in the console window and calls the [System.Console.Read](https://learn.microsoft.com/search/?terms=System.Console.Read) method to wait for user input.

   [System.Environment.NewLine](https://learn.microsoft.com/search/?terms=System.Environment.NewLine) is a platform-independent and language-independent way to represent a line break. Alternatives are `\n` in C# and `vbCrLf` in Visual Basic.

   The dollar sign (`$`) in front of a string lets you put expressions such as variable names in curly braces in the string. The expression value is inserted into the string in place of the expression. This syntax is referred to as [interpolated strings](../../csharp/language-reference/tokens/interpolated.md).

1. Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the program without debugging.

1. Respond to the prompt by entering a name and pressing the <kbd>Enter</kbd> key.

   Console window with modified program output

1. Press any key to close the console window.



**Applies to: vscode**


1. Open *Program.cs*.

1. Replace the contents of the class with the following code:

   [language="csharp" source="./snippets/create-console-app/csharp/Program.cs" id="MainMethod"::: (complete source file; reference: ./snippets/create-console-app/csharp/Program.cs)](../../../_code/docs/core/tutorials/snippets/create-console-app/csharp/Program.cs.md)

   This code displays a prompt in the console window and waits until the user enters a string followed by the <kbd>Enter</kbd> key. It stores this string in a variable named `name`. It also retrieves the value of the [System.DateTime.Now](https://learn.microsoft.com/search/?terms=System.DateTime.Now) property, which contains the current local time, and assigns it to a variable named `currentDate`. And it displays these values in the console window. Finally, it displays a prompt in the console window and calls the [System.Console.Read](https://learn.microsoft.com/search/?terms=System.Console.Read) method to wait for user input.

   [System.Environment.NewLine](https://learn.microsoft.com/search/?terms=System.Environment.NewLine) is a platform-independent and language-independent way to represent a line break.

   The dollar sign (`$`) in front of a string lets you put expressions such as variable names in curly braces in the string. The expression value is inserted into the string in place of the expression. This syntax is referred to as [interpolated strings](../../csharp/language-reference/tokens/interpolated.md).

1. Save your changes.

   > **Important:**
   > In Visual Studio Code, you have to explicitly save changes. Unlike Visual Studio, file changes are not automatically saved when you build and run an app.

1. Select **Run**>**Run without debugging**.

1. Respond to the prompt by entering a name and pressing the <kbd>Enter</kbd> key.

   Terminal window with modified program output

    Press <kbd>Enter</kbd> to exit the program.



**Applies to: codespaces**


1. Update *HelloWorld.cs* with the following code:

    [language="csharp" source="./snippets/create-console-app/csharp/Program.cs" id="MainMethod"::: (complete source file; reference: ./snippets/create-console-app/csharp/Program.cs)](../../../_code/docs/core/tutorials/snippets/create-console-app/csharp/Program.cs.md)

   This code displays a prompt in the console window and waits until the user enters a string followed by the <kbd>Enter</kbd> key. It stores this string in a variable named `name`. It also retrieves the value of the [System.DateTime.Now](https://learn.microsoft.com/search/?terms=System.DateTime.Now) property, which contains the current local time, and assigns it to a variable named `currentDate`. And it displays these values in the console window. Finally, it displays a prompt in the console window and calls the [System.Console.Read](https://learn.microsoft.com/search/?terms=System.Console.Read) method to wait for user input.

   [System.Environment.NewLine](https://learn.microsoft.com/search/?terms=System.Environment.NewLine) is a platform-independent and language-independent way to represent a line break.

   The dollar sign (`$`) in front of a string lets you put expressions such as variable names in curly braces in the string. The expression value is inserted into the string in place of the expression. This syntax is referred to as [interpolated strings](../../csharp/language-reference/tokens/interpolated.md).

1. Run the updated app using the following command:

   ```dotnetcli
   dotnet HelloWorld.cs
   ```

1. Respond to the prompt by entering a name and pressing the <kbd>Enter</kbd> key.

   You'll see output similar to the following:

   ```output
   What is your name? Mark
   Hello, Mark, on 1/29/2026 at 4:40 PM!
   Press Enter to exit...
   ```

   Press <kbd>Enter</kbd> to exit the program.



## Additional resources

**Applies to: visualstudio**


- [Standard-term support (STS) releases and long-term support (LTS) releases](../releases-and-support.md#release-tracks).



**Applies to: vscode**


* [Setting up Visual Studio Code](https://code.visualstudio.com/docs/setup/setup-overview)



**Applies to: codespaces**


* [GitHub Codespaces documentation](https://docs.github.com/codespaces)
* [Getting started with GitHub Codespaces](https://docs.github.com/codespaces/getting-started)

## Cleanup resources

GitHub automatically deletes your Codespace after 30 days of inactivity. If you plan to explore more tutorials in this series, you can leave your Codespace provisioned. If you're ready to visit the [.NET site](https://dotnet.microsoft.com/download/dotnet) to download the .NET SDK, you can delete your Codespace. To delete your Codespace, open a browser window and navigate to [your Codespaces](https://github.com/codespaces). You see a list of your codespaces in the window. Select the three dots (`...`) in the entry for the learn tutorial codespace. Then select "Delete".



## Next steps

In this tutorial, you created a .NET console application. In the next tutorial, you debug the app.

> 
> [Debug a .NET console application](debug-console-app.md)
