---
title: "Developing a User Interface for a Custom ForEach Enumerator"
description: "Developing a User Interface for a Custom ForEach Enumerator"
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "custom user interface [Integration Services], custom foreach enumerators"
  - "custom foreach enumerators [Integration Services], developing custom user interface"
---
# Developing a User Interface for a Custom ForEach Enumerator


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  After you have overridden the implementation of the properties and methods of the base class to provide your custom functionality, you may want to create a custom user interface for your Foreach enumerator. If you do not create a custom user interface, users can only configure the new custom Foreach enumerator by using the Properties window.  
  
 In a custom user interface project or assembly, you create a class that implements [Microsoft.SqlServer.Dts.Runtime.ForEachEnumeratorUI](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ForEachEnumeratorUI). This class derives from System.Windows.Forms.UserControl, which is typically used to create a composite control to host other Windows Forms controls. The control that you create is displayed in the **Enumerator configuration** area of the **Collection** tab of the **Foreach Loop Editor**.  
  
> **Important:**  
>  After signing and building your custom user interface and installing it in the global assembly cache as described in [Building, Deploying, and Debugging Custom Objects](../building-deploying-and-debugging-custom-objects.md), remember to provide the fully qualified name of this class in the [Microsoft.SqlServer.Dts.Runtime.DtsForEachEnumeratorAttribute.UITypeName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsForEachEnumeratorAttribute.UITypeName%252A) property of the [Microsoft.SqlServer.Dts.Runtime.DtsForEachEnumeratorAttribute](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsForEachEnumeratorAttribute).  
  
## Coding the User Interface Control Class  
  
### Initializing the User Interface  
 You override the [Microsoft.SqlServer.Dts.Runtime.ForEachEnumeratorUI.Initialize%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ForEachEnumeratorUI.Initialize%252A) method to cache references to the host object, and to the collections of connection managers and variables defined in the package.  
  
### Setting Properties on the User Interface Control  
 The UserControl class, from which the user interface class is derived, is intended for use as a composite control to host other Windows Forms controls. Because this class hosts other controls, you can design your custom user interface by dragging and dropping controls, arranging them, setting their properties, and responding at run time to their events as in any Windows Forms application.  
  
### Saving Settings  
 You override the [Microsoft.SqlServer.Dts.Runtime.ForEachEnumeratorUI.SaveSettings%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ForEachEnumeratorUI.SaveSettings%252A) method to copy the values selected by the user from the controls to the properties of the enumerator when the user closes the editor.  
  
## Related content

- [Creating a Custom Foreach Enumerator](creating-a-custom-foreach-enumerator.md)
- [Coding a Custom Foreach Enumerator](coding-a-custom-foreach-enumerator.md)
