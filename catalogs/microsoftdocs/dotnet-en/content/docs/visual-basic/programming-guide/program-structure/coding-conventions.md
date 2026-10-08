---
description: "Learn more about: Visual Basic Coding Conventions"
title: "Coding Conventions"
ms.date: 07/20/2015
helpviewer_keywords: 
  - "coding conventions [Visual Basic], Visual Basic"
  - "examples [Visual Basic], coding conventions"
  - "Visual Basic code, conventions"
ms.assetid: c1df130b-fec6-49a5-becf-0a7e494a1d0f
---
# Visual Basic Coding Conventions

Microsoft develops samples and documentation that follow the guidelines in this topic. If you follow the same coding conventions, you may gain the following benefits:  
  
- Your code will have a consistent look, so that readers can better focus on content, not layout.  
  
- Readers understand your code more quickly because they can make assumptions based on previous experience.  
  
- You can copy, change, and maintain the code more easily.  
  
- You help ensure that your code demonstrates "best practices" for Visual Basic.  
  
## Naming Conventions  
  
- For information about naming guidelines, see [Naming Guidelines](../../../standard/design-guidelines/naming-guidelines.md) topic.  
  
- Do not use "My" or "my" as part of a variable name. This practice creates confusion with the `My` objects.  
  
- You do not have to change the names of objects in auto-generated code to make them fit the guidelines.  
  
## Layout Conventions  
  
- Insert tabs as spaces, and use smart indenting with four-space indents.  
  
- Use **Pretty listing (reformatting) of code** to reformat your code in the code editor. For more information, see [Options, Text Editor, Basic (Visual Basic)](https://learn.microsoft.com/visualstudio/ide/reference/options-text-editor-basic-visual-basic).  
  
- Use only one statement per line. Don't use the Visual Basic line separator character (`:`).  
  
- Avoid using the explicit line continuation character "`_`" in favor of implicit line continuation wherever the language allows it.  
  
- Use only one declaration per line.  
  
- If **Pretty listing (reformatting) of code** doesn't format continuation lines automatically, manually indent continuation lines one tab stop. However, always left-align items in a list.  
  
    ```vb  
    a As Integer,  
    b As Integer  
    ```  
  
- Add at least one blank line between method and property definitions.  
  
## Commenting Conventions  
  
- Put comments on a separate line instead of at the end of a line of code.  
  
- Start comment text with an uppercase letter, and end comment text with a period.  
  
- Insert one space between the comment delimiter (`'`) and the comment text.  
  
     [VbVbalrGuidelines#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
- Do not surround comments with formatted blocks of asterisks.  
  
## Program Structure  
  
- When you use the `Main` method, use the default construct for new console applications, and use `My` for command-line arguments.  
  
     [VbVbalrGuidelines#3 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
## Language Guidelines  
  
### String Data Type  
  
- Use [string interpolation](../language-features/strings/interpolated-strings.md) to concatenate short strings, as shown in the following code.
  
     ```vb
     MsgBox($"hello{vbCrLf}goodbye")
     ```
  
- To append strings in loops, use the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) object.  
  
     [VbVbalrGuidelines#5 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
### Relaxed Delegates in Event Handlers  

 Do not explicitly qualify the arguments (`Object` and `EventArgs`) to event handlers. If you are not using the event arguments that are passed to an event (for example, `sender As Object`, `e As EventArgs`), use relaxed delegates, and leave out the event arguments in your code:  
  
 [VbVbalrGuidelines#7 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
### Unsigned Data Type  
  
- Use `Integer` rather than unsigned types, except where they are necessary.  
  
### Arrays  
  
- Use the short syntax when you initialize arrays on the declaration line. For example, use the following syntax.  
  
     [VbVbalrGuidelines#8 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
     Do not use the following syntax.  
  
     [VbVbalrGuidelines#9 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
- Put the array designator on the type, not on the variable. For example, use the following syntax:  
  
     [VbVbalrGuidelines#11 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#11)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
     Do not use the following syntax:  
  
     [VbVbalrGuidelines#10 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
- Use the { } syntax when you declare and initialize arrays of basic data types. For example, use the following syntax:  
  
     [VbVbalrGuidelines#12 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#12)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
     Do not use the following syntax:  
  
     [VbVbalrGuidelines#13 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#13)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
### Use the With Keyword  

 When you make a series of calls to one object, consider using the `With` keyword:  
  
 [VbVbalrGuidelines#15 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#15)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
### Use the Try...Catch and Using Statements when you use Exception Handling  

 Do not use `On Error Goto`.  
  
### Use the IsNot Keyword  

 Use `... IsNot Nothing` instead of `Not ... Is Nothing`.  
  
### New Keyword  
  
- Use short instantiation. For example, use the following syntax:  
  
     [VbVbalrGuidelines#21 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#21)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
     The preceding line is equivalent to this:  
  
     [VbVbalrGuidelines#22 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#22)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
- Use object initializers for new objects instead of the parameterless constructor:  
  
     [VbVbalrGuidelines#23 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#23)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
### Event Handling  
  
- Use `Handles` rather than `AddHandler`:  
  
     [VbVbalrGuidelines#24 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#24)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
- Use `AddressOf`, and do not instantiate the delegate explicitly:  
  
     [VbVbalrGuidelines#25 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#25)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
- When you define an event, use the short syntax, and let the compiler define the delegate:  
  
     [VbVbalrGuidelines#26 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#26)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
- Do not verify whether an event is `Nothing` (null) before you call the `RaiseEvent` method. `RaiseEvent` checks for `Nothing` before it raises the event.  
  
### Using Shared Members  

 Call `Shared` members by using the class name, not from an instance variable.  
  
### Use XML Literals  

 XML literals simplify the most common tasks that you encounter when you work with XML (for example, load, query, and transform). When you develop with XML, follow these guidelines:  
  
- Use XML literals to create XML documents and fragments instead of calling XML APIs directly.  
  
- Import XML namespaces at the file or project level to take advantage of the performance optimizations for XML literals.  
  
- Use the XML axis properties to access elements and attributes in an XML document.  
  
- Use embedded expressions to include values and to create XML from existing values instead of using API calls such as the `Add` method:  
  
     [VbVbalrGuidelines#27 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#27)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
### LINQ Queries  
  
- Use meaningful names for query variables:  
  
     [VbVbalrGuidelines#28 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#28)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
- Provide names for elements in a query to make sure that property names of anonymous types are correctly capitalized using Pascal casing:  
  
     [VbVbalrGuidelines#29 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#29)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
- Rename properties when the property names in the result would be ambiguous. For example, if your query returns a customer name and an order ID, rename them instead of leaving them as `Name` and `ID` in the result:  
  
     [VbVbalrGuidelines#30 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#30)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
- Use type inference in the declaration of query variables and range variables:  
  
     [VbVbalrGuidelines#31 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#31)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
- Align query clauses under the `From` statement:  
  
     [VbVbalrGuidelines#32 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#32)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
- Use `Where` clauses before other query clauses so that later query clauses operate on the filtered set of data:  
  
     [VbVbalrGuidelines#33 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#33)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
- Use the `Join` clause to explicitly define a join operation instead of using the `Where` clause to implicitly define a join operation:  
  
     [VbVbalrGuidelines#34 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb#34)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrGuidelines/VB/Class1.vb.md)  
  
## See also

- [Secure Coding Guidelines](../../../standard/security/secure-coding-guidelines.md)
