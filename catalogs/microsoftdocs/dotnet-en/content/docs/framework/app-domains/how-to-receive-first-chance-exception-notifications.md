---
title: "How to: Receive First-Chance Exception Notifications"
description: Get first-chance exception notifications in .NET through the AppDomain class's FirstChanceException event, before the CLR searches for exception handlers.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "first-chance exception notifications"
  - "exceptions, first chance notifications"
ms.assetid: 66f002b8-a97d-4a6e-a503-2cec01689113
---
# How to: Receive First-Chance Exception Notifications

> **Note:**
> This article is specific to .NET Framework. It doesn't apply to newer implementations of .NET, including .NET 6 and later versions.


The [System.AppDomain.FirstChanceException](https://learn.microsoft.com/search/?terms=System.AppDomain.FirstChanceException) event of the [System.AppDomain](https://learn.microsoft.com/search/?terms=System.AppDomain) class lets you receive a notification that an exception has been thrown, before the common language runtime has begun searching for exception handlers.

 The event is raised at the application domain level. A thread of execution can pass through multiple application domains, so an exception that is unhandled in one application domain could be handled in another application domain. The notification occurs in each application domain that has added a handler for the event, until an application domain handles the exception.

 The procedures and examples in this article show how to receive first-chance exception notifications in a simple program that has one application domain, and in an application domain that you create.

 For a more complex example that spans several application domains, see the example for the [System.AppDomain.FirstChanceException](https://learn.microsoft.com/search/?terms=System.AppDomain.FirstChanceException) event.

## Receiving First-Chance Exception Notifications in the Default Application Domain

 In the following procedure, the entry point for the application, the `Main()` method, runs in the default application domain.

#### To demonstrate first-chance exception notifications in the default application domain

1. Define an event handler for the [System.AppDomain.FirstChanceException](https://learn.microsoft.com/search/?terms=System.AppDomain.FirstChanceException) event, using a lambda function, and attach it to the event. In this example, the event handler prints the name of the application domain where the event was handled and the exception's [System.Exception.Message](https://learn.microsoft.com/search/?terms=System.Exception.Message) property.

     [System.AppDomain.FirstChanceException_howto_simple#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/cs/example.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/cs/example.cs.md)
     [System.AppDomain.FirstChanceException_howto_simple#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/vb/example.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/vb/example.vb.md)

2. Throw an exception and catch it. Before the runtime locates the exception handler, the [System.AppDomain.FirstChanceException](https://learn.microsoft.com/search/?terms=System.AppDomain.FirstChanceException) event is raised and displays a message. This message is followed by the message that is displayed by the exception handler.

     [System.AppDomain.FirstChanceException_howto_simple#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/cs/example.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/cs/example.cs.md)
     [System.AppDomain.FirstChanceException_howto_simple#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/vb/example.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/vb/example.vb.md)

3. Throw an exception, but do not catch it. Before the runtime looks for an exception handler, the [System.AppDomain.FirstChanceException](https://learn.microsoft.com/search/?terms=System.AppDomain.FirstChanceException) event is raised and displays a message. There is no exception handler, so the application terminates.

     [System.AppDomain.FirstChanceException_howto_simple#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/cs/example.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/cs/example.cs.md)
     [System.AppDomain.FirstChanceException_howto_simple#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/vb/example.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/vb/example.vb.md)

     The code that is shown in the first three steps of this procedure forms a complete console application. The output from the application varies, depending on the name of the .exe file, because the name of the default application domain consists of the name and extension of the .exe file. See the following for sample output.

     [System.AppDomain.FirstChanceException_howto_simple#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/cs/example.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/cs/example.cs.md)
     [System.AppDomain.FirstChanceException_howto_simple#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/vb/example.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto_simple/vb/example.vb.md)

## Receiving First-Chance Exception Notifications in Another Application Domain

 If your program contains more than one application domain, you can choose which application domains receive notifications.

#### To receive first-chance exception notifications in an application domain that you create

1. Define an event handler for the [System.AppDomain.FirstChanceException](https://learn.microsoft.com/search/?terms=System.AppDomain.FirstChanceException) event. This example uses a `static` method (`Shared` method in Visual Basic) that prints the name of the application domain where the event was handled and the exception's [System.Exception.Message](https://learn.microsoft.com/search/?terms=System.Exception.Message) property.

     [System.AppDomain.FirstChanceException_howto#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/cs/example.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/cs/example.cs.md)
     [System.AppDomain.FirstChanceException_howto#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/vb/example.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/vb/example.vb.md)

2. Create an application domain and add the event handler to the [System.AppDomain.FirstChanceException](https://learn.microsoft.com/search/?terms=System.AppDomain.FirstChanceException) event for that application domain. In this example, the application domain is named `AD1`.

     [System.AppDomain.FirstChanceException_howto#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/cs/example.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/cs/example.cs.md)
     [System.AppDomain.FirstChanceException_howto#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/vb/example.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/vb/example.vb.md)

     You can handle this event in the default application domain in the same way. Use the `static` (`Shared` in Visual Basic) [System.AppDomain.CurrentDomain](https://learn.microsoft.com/search/?terms=System.AppDomain.CurrentDomain) property in `Main()` to get a reference to the default application domain.

#### To demonstrate first-chance exception notifications in the application domain

1. Create a `Worker` object in the application domain that you created in the previous procedure. The `Worker` class must be public, and must derive from [System.MarshalByRefObject](https://learn.microsoft.com/search/?terms=System.MarshalByRefObject), as shown in the complete example at the end of this article.

     [System.AppDomain.FirstChanceException_howto#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/cs/example.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/cs/example.cs.md)
     [System.AppDomain.FirstChanceException_howto#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/vb/example.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/vb/example.vb.md)

2. Call a method of the `Worker` object that throws an exception. In this example, the `Thrower` method is called twice. The first time, the method argument is `true`, which causes the method to catch its own exception. The second time, the argument is `false`, and the `Main()` method catches the exception in the default application domain.

     [System.AppDomain.FirstChanceException_howto#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/cs/example.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/cs/example.cs.md)
     [System.AppDomain.FirstChanceException_howto#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/vb/example.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/vb/example.vb.md)

3. Place code in the `Thrower` method to control whether the method handles its own exception.

     [System.AppDomain.FirstChanceException_howto#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/cs/example.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/cs/example.cs.md)
     [System.AppDomain.FirstChanceException_howto#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/vb/example.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/vb/example.vb.md)

## Example

 The following example creates an application domain named `AD1` and adds an event handler to the application domain's [System.AppDomain.FirstChanceException](https://learn.microsoft.com/search/?terms=System.AppDomain.FirstChanceException) event. The example creates an instance of the `Worker` class in the application domain, and calls a method named `Thrower` that throws an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException). Depending on the value of its argument, the method either catches the exception or fails to handle it.

 Each time the `Thrower` method throws an exception in `AD1`, the [System.AppDomain.FirstChanceException](https://learn.microsoft.com/search/?terms=System.AppDomain.FirstChanceException) event is raised in `AD1`, and the event handler displays a message. The runtime then looks for an exception handler. In the first case, the exception handler is found in `AD1`. In the second case, the exception is unhandled in `AD1`, and instead is caught in the default application domain.

> **Note:**
> The name of the default application domain is the same as the name of the executable.

 If you add a handler for the [System.AppDomain.FirstChanceException](https://learn.microsoft.com/search/?terms=System.AppDomain.FirstChanceException) event to the default application domain, the event is raised and handled before the default application domain handles the exception. To see this, add the C# code `AppDomain.CurrentDomain.FirstChanceException += FirstChanceException;` (in Visual Basic, `AddHandler AppDomain.CurrentDomain.FirstChanceException, FirstChanceException`) at the beginning of `Main()`.

 [System.AppDomain.FirstChanceException_howto#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/cs/example.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/cs/example.cs.md)
 [System.AppDomain.FirstChanceException_howto#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/vb/example.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.appdomain.firstchanceexception_howto/vb/example.vb.md)

## See also

- [System.AppDomain.FirstChanceException](https://learn.microsoft.com/search/?terms=System.AppDomain.FirstChanceException)
