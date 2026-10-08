---
title: "How to use named and optional arguments in Office programming"
description: Learn how to use named arguments and optional arguments to facilitate access to COM interfaces such as the Microsoft Office automation APIs.
ms.date: 02/16/2023
helpviewer_keywords:
  - "named and optional arguments [C#], Office programming"
  - "optional arguments [C#], Office programming"
  - "named arguments [C#], Office programming"
ms.topic: how-to
---
# How to use named and optional arguments in Office programming

Named arguments and optional arguments enhance convenience, flexibility, and readability in C# programming. In addition, these features greatly facilitate access to COM interfaces such as the Microsoft Office automation APIs.


> **Important:**
> [VSTO (Visual Studio Tools for Office)](https://learn.microsoft.com/visualstudio/vsto/visual-studio-tools-for-office-runtime-overview) relies on the [.NET Framework](../../../framework/get-started/overview.md). COM add-ins can also be written with the .NET Framework. Office Add-ins cannot be created with [.NET Core and .NET 5+](https://learn.microsoft.com/dotnet/core/dotnet-five), the latest versions of .NET. This is because .NET Core/.NET 5+ cannot work together with .NET Framework in the same process and may lead to add-in load failures. You can continue to use .NET Framework to write VSTO and COM add-ins for Office. Microsoft will not be updating VSTO or the COM add-in platform to use .NET Core or .NET 5+. You can take advantage of .NET Core and .NET 5+, including ASP.NET Core, to create the server side of [Office Web Add-ins](https://learn.microsoft.com/office/dev/add-ins/overview/office-add-ins).


In the following example, method [ConvertToTable](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/csharp/advanced-topics/interop/\[Microsoft.Office.Interop.Word.Range.ConvertToTable*]\(https://learn.microsoft.com/search/?terms=Microsoft.Office.Interop.Word.Range.ConvertToTable*\)) has 16 parameters that represent characteristics of a table, such as number of columns and rows, formatting, borders, fonts, and colors. All 16 parameters are optional, because most of the time you don't want to specify particular values for all of them. However, without named and optional arguments, you must provide a value or a placeholder value. With named and optional arguments, you specify values only for the parameters required for your project.

You must have Microsoft Office Word installed on your computer to complete these procedures.


> **Note:**
> Your computer might show different names or locations for some of the Visual Studio user interface elements in the following instructions. The Visual Studio edition that you have and the settings that you use determine these elements. For more information, see [Personalizing the IDE](https://learn.microsoft.com/visualstudio/ide/personalizing-the-visual-studio-ide).


## Create a new console application

Start Visual Studio. On the **File** menu, point to **New**, and then select **Project**. In the **Templates Categories** pane, expand **C#**, and then select **Windows**. Look in the top of the **Templates** pane to make sure that **.NET Framework 4** appears in the **Target Framework** box. In the **Templates** pane, select **Console Application**. Type a name for your project in the **Name** field. Select **OK**. The new project appears in **Solution Explorer**.

## Add a reference

In **Solution Explorer**, right-click your project's name and then select **Add Reference**. The **Add Reference** dialog box appears. On the **.NET** page, select **Microsoft.Office.Interop.Word** in the **Component Name** list. Select **OK**.

## Add necessary using directives

In **Solution Explorer**, right-click the *Program.cs* file and then select **View Code**. Add the following `using` directives to the top of the code file:

[language="csharp" source="./snippets/NamedAndOptional/wordprogram.cs" id="Snippet4"::: (complete source file; reference: ./snippets/NamedAndOptional/wordprogram.cs)](../../../../_code/docs/csharp/advanced-topics/interop/snippets/NamedAndOptional/wordprogram.cs.md)

## Display text in a Word document

In the `Program` class in *Program.cs*, add the following method to create a Word application and a Word document. The [Add](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/csharp/advanced-topics/interop/\[Microsoft.Office.Interop.Word.Documents.Add*]\(https://learn.microsoft.com/search/?terms=Microsoft.Office.Interop.Word.Documents.Add*\)) method has four optional parameters. This example uses their default values. Therefore, no arguments are necessary in the calling statement.

> **Note:**
> To avoid COM threading and timing issues that can cause exceptions like "The message filter indicated that the application is busy" (HRESULT 0x8001010A), the Word application is kept invisible during operations and only made visible after all operations are complete.

[language="csharp" source="./snippets/NamedAndOptional/wordprogram.cs" id="Snippet6"::: (complete source file; reference: ./snippets/NamedAndOptional/wordprogram.cs)](../../../../_code/docs/csharp/advanced-topics/interop/snippets/NamedAndOptional/wordprogram.cs.md)

Add the following code at the end of the method to define where to display text in the document, and what text to display:

[language="csharp" source="./snippets/NamedAndOptional/wordprogram.cs" id="Snippet7"::: (complete source file; reference: ./snippets/NamedAndOptional/wordprogram.cs)](../../../../_code/docs/csharp/advanced-topics/interop/snippets/NamedAndOptional/wordprogram.cs.md)

## Run the application

Add the following statement to Main:

[language="csharp" source="./snippets/NamedAndOptional/wordprogram.cs" id="Snippet8"::: (complete source file; reference: ./snippets/NamedAndOptional/wordprogram.cs)](../../../../_code/docs/csharp/advanced-topics/interop/snippets/NamedAndOptional/wordprogram.cs.md)

Press <kbd>CTRL</kbd>+<kbd>F5</kbd> to run the project. A Word document appears that contains the specified text.

## Change the text to a table

Use the `ConvertToTable` method to enclose the text in a table. The method has 16 optional parameters. IntelliSense encloses optional parameters in brackets, as shown in the following illustration. The default values of `Type.Missing` are the simple name for `System.Type.Missing`.

List of parameters for ConvertToTable method

Named and optional arguments enable you to specify values for only the parameters that you want to change. Add the following code to the end of method `DisplayInWord` to create a table. The argument specifies that the commas in the text string in `range` separate the cells of the table.

[language="csharp" source="./snippets/NamedAndOptional/wordprogram.cs" id="Snippet9"::: (complete source file; reference: ./snippets/NamedAndOptional/wordprogram.cs)](../../../../_code/docs/csharp/advanced-topics/interop/snippets/NamedAndOptional/wordprogram.cs.md)

Press <kbd>CTRL</kbd>+<kbd>F5</kbd> to run the project.

## Experiment with other parameters

Change the table so that it has one column and three rows, replace the last line in `DisplayInWord` with the following statement and then type <kbd>CTRL</kbd>+<kbd>F5</kbd>.

[language="csharp" source="./snippets/NamedAndOptional/wordprogram.cs" id="Snippet10"::: (complete source file; reference: ./snippets/NamedAndOptional/wordprogram.cs)](../../../../_code/docs/csharp/advanced-topics/interop/snippets/NamedAndOptional/wordprogram.cs.md)

Specify a predefined format for the table, replace the last line in `DisplayInWord` with the following statement and then type <kbd>CTRL</kbd>+<kbd>F5</kbd>. The format can be any of the [WdTableFormat](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/csharp/advanced-topics/interop/\[Microsoft.Office.Interop.Word.WdTableFormat]\(https://learn.microsoft.com/search/?terms=Microsoft.Office.Interop.Word.WdTableFormat\)) constants.

[language="csharp" source="./snippets/NamedAndOptional/wordprogram.cs" id="Snippet11"::: (complete source file; reference: ./snippets/NamedAndOptional/wordprogram.cs)](../../../../_code/docs/csharp/advanced-topics/interop/snippets/NamedAndOptional/wordprogram.cs.md)

## Example

The following code includes the full example:

[language="csharp" source="./snippets/NamedAndOptional/wordprogram.cs" id="Snippet12"::: (complete source file; reference: ./snippets/NamedAndOptional/wordprogram.cs)](../../../../_code/docs/csharp/advanced-topics/interop/snippets/NamedAndOptional/wordprogram.cs.md)
