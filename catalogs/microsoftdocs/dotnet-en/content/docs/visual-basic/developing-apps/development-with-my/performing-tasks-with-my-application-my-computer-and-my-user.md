---
description: "Learn more about: Performing Tasks with My.Application, My.Computer, and My.User (Visual Basic)"
title: "Performing Tasks with My.Application, My.Computer, and My.User"
ms.date: 07/20/2015
helpviewer_keywords: 
  - "My.Application object [Visual Basic], developing applications"
  - "rapid application development (RAD), My.Application"
  - "rapid application development (RAD), My.Computer"
  - "rapid application development (RAD), My.User"
  - "My.Computer object [Visual Basic], developing applications"
  - "My.User object [Visual Basic], developing applications"
ms.assetid: c8af61bd-4dd3-4a0f-9af5-795b594b240b
---
# Performing Tasks with My.Application, My.Computer, and My.User (Visual Basic)

The three central `My` objects that provide access to information and commonly used functionality are `My.Application` ([Microsoft.VisualBasic.ApplicationServices.ApplicationBase](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.ApplicationBase)), `My.Computer` ([Microsoft.VisualBasic.Devices.Computer](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices.Computer)), and `My.User` ([Microsoft.VisualBasic.ApplicationServices.User](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.User)). You can use these objects to access information that is related to the current application, the computer that the application is installed on, or the current user of the application, respectively.  
  
## My.Application, My.Computer, and My.User  

 The following examples demonstrate how information can be retrieved using `My`.  
  
 [VbVbcnMy#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMy/VB/Class1.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMy/VB/Class1.vb.md)  
  
 [VbVbcnMy#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMy/VB/Class1.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMy/VB/Class1.vb.md)  
  
 In addition to retrieving information, the members exposed through these three objects also allow you to execute methods related to that object. For instance, you can access a variety of methods to manipulate files or update the registry through `My.Computer`.  
  
 File I/O is significantly easier and faster with `My`, which includes a variety of methods and properties for manipulating files, directories, and drives. The [Microsoft.VisualBasic.FileIO.TextFieldParser](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.FileIO.TextFieldParser) object allows you to read from large structured files that have delimited or fixed-width fields. This example opens the `TextFieldParser` `reader` and uses it to read from `C:\TestFolder1\test1.txt`.  
  
 [VbVbalrTextFieldParser#23 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrTextFieldParser/VB/Class1.vb#23)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrTextFieldParser/VB/Class1.vb.md)  
  
 `My.Application` allows you to change the culture for your application. The following example demonstrates how this method can be called.  
  
 [VbVbcnMy#3 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMy/VB/Class1.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbcnMy/VB/Class1.vb.md)  
  
## See also

- [Microsoft.VisualBasic.ApplicationServices.ApplicationBase](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.ApplicationBase)
- [Microsoft.VisualBasic.Devices.Computer](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.Devices.Computer)
- [Microsoft.VisualBasic.ApplicationServices.User](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.User)
- [How My Depends on Project Type](how-my-depends-on-project-type.md)
