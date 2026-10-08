---
description: "Learn more about: Extending the Visual Basic Application Model"
title: "Extending the Visual Basic Application Model"
ms.date: 07/20/2015
helpviewer_keywords:
  - "Visual Basic Application Model, extending"
ms.assetid: e91d3bed-4c27-40e3-871d-2be17467c72c
---
# Extending the Visual Basic Application Model

You can add functionality to the application model by overriding the `Overridable` members of the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase) class. This technique allows you to customize the behavior of the application model and add calls to your own methods as the application starts up and shuts down.

## Visual Overview of the Application Model

This section visually presents the sequence of function calls in the Visual Basic Application Model. The next section describes the purpose of each function in detail.

The following graphic shows the application model call sequence in a normal Visual Basic Windows Forms application. The sequence starts when the `Sub Main` procedure calls the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Run*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Run*) method.

Diagram showing the Application Model call sequence.

The Visual Basic Application Model also provides the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.StartupNextInstance](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.StartupNextInstance) and [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.UnhandledException](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.UnhandledException) events. The following graphics show the mechanism for raising these events.

Diagram showing the OnStartupNextInstance method raising the StartupNextInstance event.

Diagram showing the OnUnhandledException method raising the UnhandledException event.

## Overriding the Base Methods

The [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Run*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Run*) method defines the order in which the `Application` methods run. By default, the `Sub Main` procedure for a Windows Forms application calls the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Run*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Run*) method.

If the application is a normal application (multiple-instance application), or the first instance of a single-instance application, the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Run*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Run*) method executes the `Overridable` methods in the following order:

1. [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnInitialize*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnInitialize*). By default, this method sets the visual styles, text display styles, and current principal for the main application thread (if the application uses Windows authentication), and calls `ShowSplashScreen` if neither `/nosplash` nor `-nosplash` is used as a command-line argument.

     The application startup sequence is canceled if this function returns `False`. This can be useful if there are circumstances in which the application should not run.

     The [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnInitialize*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnInitialize*) method calls the following methods:

    1. [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.ShowSplashScreen*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.ShowSplashScreen*). Determines if the application has a splash screen defined and if it does, displays the splash screen on a separate thread.

         The [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.ShowSplashScreen*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.ShowSplashScreen*) method contains the code that displays the splash screen for at least the number of milliseconds specified by the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.MinimumSplashScreenDisplayTime](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.MinimumSplashScreenDisplayTime) property. To use this functionality, you must add the splash screen to your application using the **Project Designer** (which sets the `My.Application.MinimumSplashScreenDisplayTime` property to two seconds), or set the `My.Application.MinimumSplashScreenDisplayTime` property in a method that overrides the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnInitialize*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnInitialize*) or [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnCreateSplashScreen*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnCreateSplashScreen*) method. For more information, see [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.MinimumSplashScreenDisplayTime*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.MinimumSplashScreenDisplayTime*).

    2. [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnCreateSplashScreen*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnCreateSplashScreen*). Allows a designer to emit code that initializes the splash screen.

         By default, this method does nothing. If you select a splash screen for your application in the Visual Basic **Project Designer**, the designer overrides the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnCreateSplashScreen*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnCreateSplashScreen*) method with a method that sets the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.SplashScreen](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.SplashScreen) property to a new instance of the splash-screen form.

2. [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnStartup*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnStartup*). Provides an extensibility point for raising the `Startup` event. The application startup sequence stops if this function returns `False`.

     By default, this method raises the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Startup](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Startup) event. If the event handler sets the [System.ComponentModel.CancelEventArgs.Cancel](https://learn.microsoft.com/search/?terms=System.ComponentModel.CancelEventArgs.Cancel) property of the event argument to `True`, the method returns `False` to cancel the application startup.

3. [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnRun*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnRun*). Provides the starting point for when the main application is ready to start running, after the initialization is done.

     By default, before it enters the Windows Forms message loop, this method calls the `OnCreateMainForm` (to create the application's main form) and `HideSplashScreen` (to close the splash screen) methods:

    1. [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnCreateMainForm*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnCreateMainForm*). Provides a way for a designer to emit code that initializes the main form.

         By default, this method does nothing. However, when you select a main form for your application in the Visual Basic **Project Designer**, the designer overrides the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnCreateMainForm*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnCreateMainForm*) method with a method that sets the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.MainForm](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.MainForm) property to a new instance of the main form.

    2. [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.HideSplashScreen*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.HideSplashScreen*). If application has a splash screen defined and it is open, this method closes the splash screen.

         By default, this method closes the splash screen.

4. [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnStartupNextInstance*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnStartupNextInstance*). Provides a way to customize how a single-instance application behaves when another instance of the application starts.

     By default, this method raises the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.StartupNextInstance](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.StartupNextInstance) event.

5. [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnShutdown*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnShutdown*). Provides an extensibility point for raising the `Shutdown` event. This method does not run if an unhandled exception occurs in the main application.

     By default, this method raises the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Shutdown](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Shutdown) event.

6. [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnUnhandledException*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnUnhandledException*). Executed if an unhandled exception occurs in any of the above listed methods.

     By default, this method raises the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.UnhandledException](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.UnhandledException) event as long as a debugger is not attached and the application is handling the `UnhandledException` event.

 If the application is a single-instance application, and the application is already running, the subsequent instance of the application calls the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnStartupNextInstance*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnStartupNextInstance*) method on the original instance of the application, and then exits.

 The [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnStartupNextInstance(Microsoft.VisualBasic.ApplicationServices.StartupNextInstanceEventArgs)](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.OnStartupNextInstance(Microsoft.VisualBasic.ApplicationServices.StartupNextInstanceEventArgs)) constructor calls the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.UseCompatibleTextRendering](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.UseCompatibleTextRendering) property to determine which text rendering engine to use for the application's forms. By default, the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.UseCompatibleTextRendering](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.UseCompatibleTextRendering) property returns `False`, indicating that the GDI text rendering engine be used, which is the default in Visual Basic 2005 and later versions. You can override the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.UseCompatibleTextRendering](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.UseCompatibleTextRendering) property to return `True`, which indicates that the GDI+ text rendering engine be used, which is the default in Visual Basic .NET 2002 and Visual Basic .NET 2003.

## Configuring the Application

 As a part of the Visual Basic Application model, the [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase) class provides protected properties that configure the application. These properties should be set in the constructor of the implementing class.

 In a default Windows Forms project, the **Project Designer** creates code to set the properties with the designer settings. The properties are used only when the application is starting; setting them after the application starts has no effect.

| Property | Determines | Setting in the Application pane of  the Project Designer |
| --- | --- | --- |
| [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.IsSingleInstance*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.IsSingleInstance*) | Whether the application runs as a single-instance or multiple-instance application. | **Make single instance application** check box |
| [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.EnableVisualStyles*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.EnableVisualStyles*) | If the application will use visual styles that match Windows XP. | **Enable XP visual styles** check box |
| [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.SaveMySettingsOnExit*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.SaveMySettingsOnExit*) | If application automatically saves application's user-settings changes when the application exits. | **Save My.Settings on Shutdown** check box |
| [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.ShutdownStyle*](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.ShutdownStyle*) | What causes the application to terminate, such as when the startup form closes or when the last form closes. | **Shutdown mode** list |

## See also

- [Microsoft.VisualBasic.ApplicationServices.ApplicationBase](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.ApplicationBase)
- [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Startup](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Startup)
- [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.StartupNextInstance](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.StartupNextInstance)
- [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.UnhandledException](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.UnhandledException)
- [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Shutdown](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.Shutdown)
- [Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.NetworkAvailabilityChanged](https://learn.microsoft.com/search/?terms=Microsoft.VisualBasic.ApplicationServices.WindowsFormsApplicationBase.NetworkAvailabilityChanged)
- [Overview of the Visual Basic Application Model](../development-with-my/overview-of-the-visual-basic-application-model.md)
- [Application Page, Project Designer (Visual Basic)](https://learn.microsoft.com/visualstudio/ide/reference/application-page-project-designer-visual-basic)
