---
description: "Learn more about: Walkthrough: Manipulating Files by Using .NET Framework Methods (Visual Basic)"
title: "Manipulating Files by Using .NET Framework Methods"
ms.date: 07/20/2015
helpviewer_keywords:
  - "I/O [Visual Basic], walkthroughs"
  - "text files [Visual Basic], writing to"
  - "reading text files [Visual Basic]"
  - "text, writing to files"
  - "files [Visual Basic], searching"
  - "StreamReader class, walkthroughs"
  - "files [Visual Basic], accessing"
  - "I/O [Visual Basic], writing text to files"
  - "writing to files [Visual Basic], walkthroughs"
  - "StreamWriter class, walkthroughs"
  - "text files [Visual Basic], reading"
  - "I/O [Visual Basic], reading text from files"
ms.assetid: 7d2109eb-f98a-4389-b43d-30f384aaa7d5
---
# Walkthrough: Manipulating Files by Using .NET Framework Methods (Visual Basic)

This walkthrough demonstrates how to open and read a file using the [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) class, check to see if a file is being accessed, search for a string within a file read with an instance of the [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) class, and write to a file using the [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) class.


> **Note:**
> Your computer might show different names or locations for some of the Visual Studio user interface elements in the following instructions. The Visual Studio edition that you have and the settings that you use determine these elements. For more information, see [Personalizing the IDE](https://learn.microsoft.com/visualstudio/ide/personalizing-the-visual-studio-ide).


## Creating the Application

Start Visual Studio and begin the project by creating a form that the user can use to write to the designated file.

### To create the project

1. On the **File** menu, select **New Project**.

2. In the **New Project** pane, click **Windows Application**.

3. In the **Name** box type `MyDiary` and click **OK**.

     Visual Studio adds the project to **Solution Explorer**, and the **Windows Forms Designer** opens.

4. Add the controls in the following table to the form and set the corresponding values for their properties.

| **Object** | **Properties** | **Value** |
| --- | --- | --- |
| [System.Windows.Forms.Button](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Button) | **Name**<br /><br /> **Text** | `Submit`<br /><br /> **Submit Entry** |
| [System.Windows.Forms.Button](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Button) | **Name**<br /><br /> **Text** | `Clear`<br /><br /> **Clear Entry** |
| [System.Windows.Forms.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox) | **Name**<br /><br /> **Text**<br /><br /> **Multiline** | `Entry`<br /><br /> **Please enter something.**<br /><br /> `False` |

## Writing to the File

To add the ability to write to a file via the application, use the [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) class. [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) is designed for character output in a particular encoding, whereas the [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) class is designed for byte input and output. Use [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) for writing lines of information to a standard text file. For more information on the [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) class, see [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter).

### To add writing functionality

1. From the **View** menu, choose **Code** to open the Code Editor.

2. Because the application references the [System.IO](https://learn.microsoft.com/search/?terms=System.IO) namespace, add the following statements at the very beginning of your code, before the class declaration for the form, which begins `Public Class Form1`.

     [VbVbcnMyFileSystem#35 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#35)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

     Before writing to the file, you must create an instance of a [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) class.

3. From the **View** menu, choose **Designer** to return to the **Windows Forms Designer**. Double-click the `Submit` button to create a [System.Windows.Forms.Control.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Click) event handler for the button, and then add the following code.

     [VbVbcnMyFileSystem#36 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#36)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

> **Note:**
> The Visual Studio Integrated Development Environment (IDE) will return to the Code Editor and position the insertion point within the event handler where you should add the code.

1. To write to the file, use the [System.IO.StreamWriter.Write*](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter.Write*) method of the [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) class. Add the following code directly after `Dim fw As StreamWriter`. You do not need to worry that an exception will be thrown if the file is not found, because it will be created if it does not already exist.

     [VbVbcnMyFileSystem#37 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#37)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

2. Make sure that the user cannot submit a blank entry by adding the following code directly after `Dim ReadString As String`.

     [VbVbcnMyFileSystem#38 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#38)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

3. Because this is a diary, the user will want to assign a date to each entry. Insert the following code after `fw = New StreamWriter("C:\MyDiary.txt", True)` to set the variable `Today` to the current date.

     [VbVbcnMyFileSystem#39 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#39)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

4. Finally, attach code to clear the [System.Windows.Forms.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox). Add the following code to the `Clear` button's [System.Windows.Forms.Control.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Click) event.

     [VbVbcnMyFileSystem#40 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#40)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

## Adding Display Features to the Diary

In this section, you add a feature that displays the latest entry in the `DisplayEntry`[System.Windows.Forms.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox). You can also add a [System.Windows.Forms.ComboBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ComboBox) that displays various entries and from which a user can select an entry to display in the `DisplayEntry`[System.Windows.Forms.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox). An instance of the [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) class reads from `MyDiary.txt`. Like the [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) class, [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) is intended for use with text files.

For this section of the walkthrough, add the controls in the following table to the form and set the corresponding values for their properties.

| Control | Properties | Values |
| --- | --- | --- |
| [System.Windows.Forms.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox) | **Name**<br /><br /> **Visible**<br /><br /> **Size**<br /><br /> **Multiline** | `DisplayEntry`<br /><br /> `False`<br /><br /> `120,60`<br /><br /> `True` |
| [System.Windows.Forms.Button](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Button) | **Name**<br /><br /> **Text** | `Display`<br /><br /> **Display** |
| [System.Windows.Forms.Button](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Button) | **Name**<br /><br /> **Text** | `GetEntries`<br /><br /> **Get Entries** |
| [System.Windows.Forms.ComboBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ComboBox) | **Name**<br /><br /> **Text**<br /><br /> **Enabled** | `PickEntries`<br /><br /> **Select an Entry**<br /><br /> `False` |

### To populate the combo box

1. The `PickEntries`[System.Windows.Forms.ComboBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ComboBox) is used to display the dates on which a user submits each entry, so the user can select an entry from a specific date. Create a [System.Windows.Forms.Control.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Click) event handler to the `GetEntries` button and add the following code.

     [VbVbcnMyFileSystem#41 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#41)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

2. To test your code, press F5 to compile the application, and then click **Get Entries**. Click the drop-down arrow in the [System.Windows.Forms.ComboBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ComboBox) to display the entry dates.

### To choose and display individual entries

1. Create a [System.Windows.Forms.Control.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Click) event handler for the `Display` button and add the following code.

     [VbVbcnMyFileSystem#42 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#42)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

2. To test your code, press F5 to compile the application, and then submit an entry. Click **Get Entries**, select an entry from the [System.Windows.Forms.ComboBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ComboBox), and then click **Display**. The contents of the selected entry appear in the `DisplayEntry`[System.Windows.Forms.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox).

## Enabling Users to Delete or Modify Entries

Finally, you can include additional functionality enables users to delete or modify an entry by using `DeleteEntry` and `EditEntry` buttons. Both buttons remain disabled unless an entry is displayed.

Add the controls in the following table to the form and set the corresponding values for their properties.

| Control | Properties | Values |
| --- | --- | --- |
| [System.Windows.Forms.Button](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Button) | **Name**<br /><br /> **Text**<br /><br /> **Enabled** | `DeleteEntry`<br /><br /> **Delete Entry**<br /><br /> `False` |
| [System.Windows.Forms.Button](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Button) | **Name**<br /><br /> **Text**<br /><br /> **Enabled** | `EditEntry`<br /><br /> **Edit Entry**<br /><br /> `False` |
| [System.Windows.Forms.Button](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Button) | **Name**<br /><br /> **Text**<br /><br /> **Enabled** | `SubmitEdit`<br /><br /> **Submit Edit**<br /><br /> `False` |

### To enable deletion and modification of entries

1. Add the following code to the `Display` button's [System.Windows.Forms.Control.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Click) event, after `DisplayEntry.Text = ReadString`.

     [VbVbcnMyFileSystem#43 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#43)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

2. Create a [System.Windows.Forms.Control.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Click) event handler for the `DeleteEntry` button and add the following code.

     [VbVbcnMyFileSystem#44 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#44)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

3. When a user displays an entry, the `EditEntry` button becomes enabled. Add the following code to the [System.Windows.Forms.Control.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Click) event of the `Display` button after `DisplayEntry.Text = ReadString`.

     [VbVbcnMyFileSystem#45 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#45)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

4. Create a [System.Windows.Forms.Control.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Click) event handler for the `EditEntry` button and add the following code.

     [VbVbcnMyFileSystem#46 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#46)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

5. Create a [System.Windows.Forms.Control.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Click) event handler for the `SubmitEdit` button and add the following code

     [VbVbcnMyFileSystem#47 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb#47)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMyFileSystem/VB/Class1.vb.md)

To test your code, press F5 to compile the application. Click **Get Entries**, select an entry, and then click **Display**. The entry appears in the `DisplayEntry`[System.Windows.Forms.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox). Click **Edit Entry**. The entry appears in the `Entry`[System.Windows.Forms.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox). Edit the entry in the `Entry`[System.Windows.Forms.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.TextBox) and click **Submit Edit**. Open the `MyDiary.txt` file to confirm your correction. Now select an entry and click **Delete Entry**. When the [System.Windows.Forms.MessageBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MessageBox) requests confirmation, click **OK**. Close the application and open `MyDiary.txt` to confirm the deletion.

## See also

- [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader)
- [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter)
- [Walkthroughs](../../../walkthroughs.md)
