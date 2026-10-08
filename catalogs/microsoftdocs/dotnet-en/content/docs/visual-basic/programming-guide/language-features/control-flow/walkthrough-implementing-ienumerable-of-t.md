---
description: "Learn more about: Walkthrough: Implementing IEnumerable(Of T) in Visual Basic"
title: "Implementing IEnumerable"
ms.date: 07/31/2018
helpviewer_keywords:
  - "control flow [Visual Basic]"
  - "enumerable interfaces"
  - "loop structures [Visual Basic], optimizing performance"
  - "control flow [Visual Basic]"
ms.assetid: c60d7589-51f2-4463-a2d5-22506bbc1554
---
# Walkthrough: Implementing IEnumerable(Of T) in Visual Basic

The [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) interface is implemented by classes that can return a sequence of values one item at a time. The advantage of returning data one item at a time is that you do not have to load the complete set of data into memory to work with it. You only have to use sufficient memory to load a single item from the data. Classes that implement the `IEnumerable(T)` interface can be used with `For Each` loops or LINQ queries.

 For example, consider an application that must read a large text file and return each line from the file that matches particular search criteria. The application uses a LINQ query to return lines from the file that match the specified criteria. To query the contents of the file by using a LINQ query, the application could load the contents of the file into an array or a collection. However, loading the whole file into an array or collection would consume far more memory than is required. The LINQ query could instead query the file contents by using an enumerable class, returning only values that match the search criteria. Queries that return only a few matching values would consume far less memory.

 You can create a class that implements the [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601) interface to expose source data as enumerable data. Your class that implements the `IEnumerable(T)` interface will require another class that implements the [System.Collections.Generic.IEnumerator`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerator%601) interface to iterate through the source data. These two classes enable you to return items of data sequentially as a specific type.

 In this walkthrough, you will create a class that implements the `IEnumerable(Of String)` interface and a class that implements the `IEnumerator(Of String)` interface to read a text file one line at a time.


> **Note:**
> Your computer might show different names or locations for some of the Visual Studio user interface elements in the following instructions. The Visual Studio edition that you have and the settings that you use determine these elements. For more information, see [Personalizing the IDE](https://learn.microsoft.com/visualstudio/ide/personalizing-the-visual-studio-ide).


## Creating the Enumerable Class

**Create the enumerable class project**

1. In Visual Basic, on the **File** menu, point to **New** and then click **Project**.

1. In the **New Project** dialog box, in the **Project Types** pane, make sure that **Windows** is selected. Select **Class Library** in the **Templates** pane. In the **Name** box, type `StreamReaderEnumerable`, and then click **OK**. The new project is displayed.

1. In **Solution Explorer**, right-click the Class1.vb file and click **Rename**. Rename the file to `StreamReaderEnumerable.vb` and press ENTER. Renaming the file will also rename the class to `StreamReaderEnumerable`. This class will implement the `IEnumerable(Of String)` interface.

1. Right-click the StreamReaderEnumerable project, point to **Add**, and then click **New Item**. Select the **Class** template. In the **Name** box, type `StreamReaderEnumerator.vb` and click **OK**.

 The first class in this project is the enumerable class and will implement the `IEnumerable(Of String)` interface. This generic interface implements the [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) interface and guarantees that consumers of this class can access values typed as `String`.

**Add the code to implement IEnumerable**

1. Open the StreamReaderEnumerable.vb file.

2. On the line after `Public Class StreamReaderEnumerable`, type the following and press ENTER.

     [VbVbalrIteratorWalkthrough#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb#1)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb.md)

   Visual Basic automatically populates the class with the members that are required by the `IEnumerable(Of String)` interface.

3. This enumerable class will read lines from a text file one line at a time. Add the following code to the class to expose a public constructor that takes a file path as an input parameter.

     [VbVbalrIteratorWalkthrough#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb#2)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb.md)

4. Your implementation of the [System.Collections.Generic.IEnumerable`1.GetEnumerator*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601.GetEnumerator*) method of the `IEnumerable(Of String)` interface will return a new instance of the `StreamReaderEnumerator` class. The implementation of the `GetEnumerator` method of the `IEnumerable` interface can be made `Private`, because you have to expose only members of the `IEnumerable(Of String)` interface. Replace the code that Visual Basic generated for the `GetEnumerator` methods with the following code.

     [VbVbalrIteratorWalkthrough#3 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb#3)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb.md)

**Add the code to implement IEnumerator**

1. Open the StreamReaderEnumerator.vb file.

2. On the line after `Public Class StreamReaderEnumerator`, type the following and press ENTER.

     [VbVbalrIteratorWalkthrough#4 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb#4)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb.md)

   Visual Basic automatically populates the class with the members that are required by the `IEnumerator(Of String)` interface.

3. The enumerator class opens the text file and performs the file I/O to read the lines from the file. Add the following code to the class to expose a public constructor that takes a file path as an input parameter and open the text file for reading.

     [VbVbalrIteratorWalkthrough#5 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb#5)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb.md)

4. The `Current` properties for both the `IEnumerator(Of String)` and `IEnumerator` interfaces return the current item from the text file as a `String`. The implementation of the `Current` property of the `IEnumerator` interface can be made `Private`, because you have to expose only members of the `IEnumerator(Of String)` interface. Replace the code that Visual Basic generated for the `Current` properties with the following code.

     [VbVbalrIteratorWalkthrough#6 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb#6)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb.md)

5. The `MoveNext` method of the `IEnumerator` interface navigates to the next item in the text file and updates the value that is returned by the `Current` property. If there are no more items to read, the `MoveNext` method returns `False`; otherwise the `MoveNext` method returns `True`. Add the following code to the `MoveNext` method.

     [VbVbalrIteratorWalkthrough#7 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb#7)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb.md)

6. The `Reset` method of the `IEnumerator` interface directs the iterator to point to the start of the text file and clears the current item value. Add the following code to the `Reset` method.

     [VbVbalrIteratorWalkthrough#8 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb#8)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb.md)

7. The `Dispose` method of the `IEnumerator` interface guarantees that all unmanaged resources are released before the iterator is destroyed. The file handle that is used by the `StreamReader` object is an unmanaged resource and must be closed before the iterator instance is destroyed. Replace the code that Visual Basic generated for the `Dispose` method with the following code.

     [VbVbalrIteratorWalkthrough#9 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb#9)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/StreamReaderIterator.vb.md)

## Using the Sample Iterator

 You can use an enumerable class in your code together with control structures that require an object that implements `IEnumerable`, such as a `For Next` loop or a LINQ query. The following example shows the `StreamReaderEnumerable` in a LINQ query.

 [VbVbalrIteratorWalkthrough#10 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/Module1.vb#10)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrIteratorWalkthrough/VB/Module1.vb.md)

## See also

- [Introduction to LINQ in Visual Basic](../linq/introduction-to-linq.md)
- [Control Flow](index.md)
- [Loop Structures](loop-structures.md)
- [For Each...Next Statement](../../../language-reference/statements/for-each-next-statement.md)
