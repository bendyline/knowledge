---
title: "Using the StringBuilder Class in .NET"
description: Learn how to use the StringBuilder class in .NET. Use this class to modify a string without creating a new object.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "Remove method"
  - "strings [.NET], capacities"
  - "StringBuilder object"
  - "Replace method"
  - "AppendFormat method"
  - "Append method"
  - "Insert method"
  - "strings [.NET], StringBuilder object"
---
# Using the StringBuilder Class in .NET

The [System.String](https://learn.microsoft.com/search/?terms=System.String) object is immutable. Every time you use one of the methods in the [System.String](https://learn.microsoft.com/search/?terms=System.String) class, you create a new string object in memory, which requires a new allocation of space for that new object. In situations where you need to perform repeated modifications to a string, the overhead associated with creating a new [System.String](https://learn.microsoft.com/search/?terms=System.String) object can be costly. The [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) class can be used when you want to modify a string without creating a new object. For example, using the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) class can boost performance when concatenating many strings together in a loop.

## Importing the System.Text Namespace

 The [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) class is found in the [System.Text](https://learn.microsoft.com/search/?terms=System.Text) namespace.  To avoid having to provide a fully qualified type name in your code,  you can import the [System.Text](https://learn.microsoft.com/search/?terms=System.Text) namespace:
 [Conceptual.StringBuilder#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs.md)
 [Conceptual.StringBuilder#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb.md)

## Instantiating a StringBuilder Object

 You can create a new instance of the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) class by initializing your variable with one of the overloaded constructor methods, as illustrated in the following example.
 [Conceptual.StringBuilder#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs.md)
 [Conceptual.StringBuilder#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb.md)

## Setting the Capacity and Length

 Although the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) is a dynamic object that allows you to expand the number of characters in the string that it encapsulates, you can specify a value for the maximum number of characters that it can hold. This value is called the capacity of the object and should not be confused with the length of the string that the current [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) holds. For example, you might create a new instance of the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) class with the string "Hello", which has a length of 5, and you might specify that the object has a maximum capacity of 25. When you modify the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder), it does not reallocate size for itself until the capacity is reached. When this occurs, the new space is allocated automatically and the capacity is doubled. You can specify the capacity of the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) class using one of the overloaded constructors. The following example specifies that the `myStringBuilder` object can be expanded to a maximum of 25 spaces.
 [Conceptual.StringBuilder#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs.md)
 [Conceptual.StringBuilder#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb.md)

 Additionally, you can use the read/write [System.Text.StringBuilder.Capacity](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.Capacity) property to set the maximum length of your object. The following example uses the **Capacity** property to define the maximum object length.
 [Conceptual.StringBuilder#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs.md)
 [Conceptual.StringBuilder#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb.md)

 The [System.Text.StringBuilder.EnsureCapacity*](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.EnsureCapacity*) method can be used to check the capacity of the current **StringBuilder**. If the capacity is greater than the passed value, no change is made; however, if the capacity is smaller than the passed value, the current capacity is changed to match the passed value.

 The [System.Text.StringBuilder.Length](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.Length) property can also be viewed or set. If you set the **Length** property to a value that is greater than the **Capacity** property, the **Capacity** property is automatically changed to the same value as the **Length** property. Setting the **Length** property to a value that is less than the length of the string within the current **StringBuilder** shortens the string.

## Modifying the StringBuilder String

 The following table lists the methods you can use to modify the contents of a **StringBuilder**.

| Method name | Use |
| --- | --- |
| [System.Text.StringBuilder.Append*](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.Append*) | Appends information to the end of the current **StringBuilder**. |
| [System.Text.StringBuilder.AppendFormat*](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.AppendFormat*) | Replaces a format specifier passed in a string with formatted text. |
| [System.Text.StringBuilder.Insert*](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.Insert*) | Inserts a string or object into the specified index of the current **StringBuilder**. |
| [System.Text.StringBuilder.Remove*](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.Remove*) | Removes a specified number of characters from the current **StringBuilder**. |
| [System.Text.StringBuilder.Replace*](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.Replace*) | Replaces all occurrences of a specified character or string in the current **StringBuilder** with another specified character or string. |

### Append

 The **Append** method can be used to add text or a string representation of an object to the end of a string represented by the current **StringBuilder**. The following example initializes a **StringBuilder** to "Hello World" and then appends some text to the end of the object. Space is allocated automatically as needed.
 [Conceptual.StringBuilder#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs.md)
 [Conceptual.StringBuilder#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb.md)

### AppendFormat

 The [System.Text.StringBuilder.AppendFormat*](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.AppendFormat*) method adds text to the end of the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) object. It supports the [composite formatting feature](composite-formatting.md) by calling the [System.IFormattable](https://learn.microsoft.com/search/?terms=System.IFormattable) implementation of the object or objects to be formatted. Therefore, it accepts the standard format strings for numeric, date and time, and enumeration values, the custom format strings for numeric and date and time values, and the format strings defined for custom types. (For information about formatting, see [Formatting Types](formatting-types.md).) You can use this method to customize the format of variables and append those values to a [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder). The following example uses the [System.Text.StringBuilder.AppendFormat*](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.AppendFormat*) method to place an integer value formatted as a currency value at the end of a [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) object.
 [Conceptual.StringBuilder#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs.md)
 [Conceptual.StringBuilder#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb.md)

### Insert

 The [System.Text.StringBuilder.Insert*](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.Insert*) method adds a string or object to a specified position in the current [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) object. The following example uses this method to insert a word into the sixth position of a [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) object.
 [Conceptual.StringBuilder#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs.md)
 [Conceptual.StringBuilder#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb.md)

### Remove

 You can use the **Remove** method to remove a specified number of characters from the current [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) object, beginning at a specified zero-based index. The following example uses the **Remove** method to shorten a [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) object.
 [Conceptual.StringBuilder#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs.md)
 [Conceptual.StringBuilder#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb.md)

### Replace

 The **Replace** method can be used to replace characters within the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) object with another specified character. The following example uses the **Replace** method to search a [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) object for all instances of the exclamation point character (!) and replace them with the question mark character (?).
 [Conceptual.StringBuilder#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/Example.cs.md)
 [Conceptual.StringBuilder#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/Example.vb.md)

## Converting a StringBuilder Object to a String

 You must convert the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) object to a [System.String](https://learn.microsoft.com/search/?terms=System.String) object before you can pass the string represented by the [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) object to a method that has a [System.String](https://learn.microsoft.com/search/?terms=System.String) parameter or display it in the user interface. You do this conversion by calling the [System.Text.StringBuilder.ToString*](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.ToString*) method. The following example calls a number of [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder) methods and then calls the [System.Text.StringBuilder.ToString](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder.ToString) method to display the string.

 [Conceptual.StringBuilder#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/tostringexample1.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/Conceptual.StringBuilder/cs/tostringexample1.cs.md)
 [Conceptual.StringBuilder#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/tostringexample1.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/Conceptual.StringBuilder/vb/tostringexample1.vb.md)

## See also

- [System.Text.StringBuilder](https://learn.microsoft.com/search/?terms=System.Text.StringBuilder)
- [Formatting Types](formatting-types.md)
