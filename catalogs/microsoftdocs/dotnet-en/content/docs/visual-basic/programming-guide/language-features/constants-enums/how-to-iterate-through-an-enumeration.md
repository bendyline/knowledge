---
description: "Learn more about: How to: Iterate Through An Enumeration in Visual Basic"
title: "How to: Iterate Through An Enumeration"
ms.date: 07/20/2015
helpviewer_keywords:
  - "arrays [Visual Basic], iterating"
  - "enumerations [Visual Basic], iterating"
  - "ListBox control [Windows Forms], populating from an enumeration"
ms.assetid: e5aa10eb-cfcd-4a3b-8e76-f06b8f2002be
---
# How to: Iterate Through An Enumeration in Visual Basic

Enumerations provide a convenient way to work with sets of related constants, and to associate constant values with names. To iterate through an enumeration, you can move it into an array using the [System.Enum.GetValues*](https://learn.microsoft.com/search/?terms=System.Enum.GetValues*) method. You could also iterate through an enumeration using a `For...Each` statement, using the [System.Enum.GetNames*](https://learn.microsoft.com/search/?terms=System.Enum.GetNames*) or [System.Enum.GetValues*](https://learn.microsoft.com/search/?terms=System.Enum.GetValues*) method to extract the string or numeric value.

### To iterate through an enumeration

- Declare an array and convert the enumeration to it with the [System.Enum.GetValues*](https://learn.microsoft.com/search/?terms=System.Enum.GetValues*) method before passing the array as you would any other variable. The following example displays each member of the enumeration [Microsoft.VisualBasic.FirstDayOfWeek](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FirstDayOfWeek) as it iterates through the enumeration.

     [VbEnumsTask#7 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbEnumsTask/VB/Class2.vb#7)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbEnumsTask/VB/Class2.vb.md)

## See also

- [Enumerations Overview](enumerations-overview.md)
- [How to: Declare an Enumeration](how-to-declare-enumerations.md)
- [When to Use an Enumeration](when-to-use-an-enumeration.md)
- [How to: Determine the String Associated with an Enumeration Value](how-to-determine-the-string-associated-with-an-enumeration-value.md)
- [How to: Refer to an Enumeration Member](how-to-refer-to-an-enumeration-member.md)
- [Enumerations and Name Qualification](enumerations-and-name-qualification.md)
- [Arrays](../arrays/index.md)
