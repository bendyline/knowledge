---
description: "Learn more about: How to: Create Property Grids for User Settings in Visual Basic"
title: "How to: Create Property Grids for User Settings"
ms.date: 07/20/2015
helpviewer_keywords:
  - "My.Settings object [Visual Basic], creating property grids for user settings"
  - "user settings [Visual Basic], creating property grids"
  - "property grids [Visual Basic], creating for user settings"
  - "property grids"
ms.assetid: b0bc737e-50d1-43d1-a6df-268db6e6f91c
---
# How to: Create Property Grids for User Settings in Visual Basic

You can create a property grid for user settings by populating a [System.Windows.Forms.PropertyGrid](https://learn.microsoft.com/search/?terms=System.Windows.Forms.PropertyGrid) control with the user setting properties of the `My.Settings` object.

> **Note:**
> In order for this example to work, your application must have its user settings configured. For more information, see [Managing Application Settings (.NET)](https://learn.microsoft.com/visualstudio/ide/managing-application-settings-dotnet).

 The `My.Settings` object exposes each setting as a property. The property name is the same as the setting name, and the property type is the same as the setting type. The setting's **Scope** determines if the property is read-only; the property for an **Application**-scope setting is read-only, while the property for a **User**-scope setting is read-write. For more information, see [My.Settings Object](../../../language-reference/objects/my-settings-object.md).

> **Note:**
> You cannot change or save the values of application-scope settings at run time. Application-scope settings can be changed only when creating the application (through the **Project Designer**) or by editing the application's configuration file. For more information, see [Managing Application Settings (.NET)](https://learn.microsoft.com/visualstudio/ide/managing-application-settings-dotnet).

 This example uses a [System.Windows.Forms.PropertyGrid](https://learn.microsoft.com/search/?terms=System.Windows.Forms.PropertyGrid) control to access the user-setting properties of the `My.Settings` object. By default, the [System.Windows.Forms.PropertyGrid](https://learn.microsoft.com/search/?terms=System.Windows.Forms.PropertyGrid) shows all the properties of the `My.Settings` object. However, the user-setting properties have the [System.Configuration.UserScopedSettingAttribute](https://learn.microsoft.com/search/?terms=System.Configuration.UserScopedSettingAttribute) attribute. This example sets the [System.Windows.Forms.PropertyGrid.BrowsableAttributes](https://learn.microsoft.com/search/?terms=System.Windows.Forms.PropertyGrid.BrowsableAttributes) property of the [System.Windows.Forms.PropertyGrid](https://learn.microsoft.com/search/?terms=System.Windows.Forms.PropertyGrid) to [System.Configuration.UserScopedSettingAttribute](https://learn.microsoft.com/search/?terms=System.Configuration.UserScopedSettingAttribute) to display only the user-setting properties.

### To add a user setting property grid

1. Add the **PropertyGrid** control from the **Toolbox** to the design surface for your application, assumed here to be `Form1`.

     The default name of the property-grid control is `PropertyGrid1`.

2. Double-click the design surface for `Form1` to open the code for the form-load event handler.

3. Set the `My.Settings` object as the selected object for the property grid.

     [VbVbalrMyResources#11 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrMyResources/VB/Form1.vb#11)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrMyResources/VB/Form1.vb.md)

4. Configure the property grid to show only the user settings.

     [VbVbalrMyResources#12 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrMyResources/VB/Form1.vb#12)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrMyResources/VB/Form1.vb.md)

    > **Note:**
    > To show only the application-scope settings, use the [System.Configuration.ApplicationScopedSettingAttribute](https://learn.microsoft.com/search/?terms=System.Configuration.ApplicationScopedSettingAttribute) attribute instead of  [System.Configuration.UserScopedSettingAttribute](https://learn.microsoft.com/search/?terms=System.Configuration.UserScopedSettingAttribute).

## Robust Programming

 The application saves the user settings when the application shuts down. To save the settings immediately, call the `My.Settings.Save` method. For more information, see [How to: Persist User Settings in Visual Basic](how-to-persist-user-settings.md).

## See also

- [My.Settings Object](../../../language-reference/objects/my-settings-object.md)
- [How to: Read Application Settings in Visual Basic](how-to-read-application-settings.md)
- [How to: Change User Settings in Visual Basic](how-to-change-user-settings.md)
- [How to: Persist User Settings in Visual Basic](how-to-persist-user-settings.md)
- [Managing Application Settings (.NET)](https://learn.microsoft.com/visualstudio/ide/managing-application-settings-dotnet)
