---
title: "How to: Hook Up a Delegate Using Reflection"
description: See how to hook up a delegate using reflection in .NET. Connect an existing method to an event by getting the necessary types through reflection.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "events [.NET], adding event handlers with reflection"
  - "reflection, adding event-handler delegates"
  - "delegates [.NET], adding event handlers with reflection"
---
# How to: Hook up a delegate using reflection

When you use reflection to load and run assemblies, you can't use language features like the C# `+=` operator or the Visual Basic [AddHandler statement](../../visual-basic/language-reference/statements/addhandler-statement.md) to hook up events. The following procedures show how to hook up an existing method to an event by getting all the necessary types through reflection, and how to create a dynamic method using reflection emit and hook it up to an event.

> **Note:**
> For another way to hook up an event-handling delegate, see the code example for the [System.Reflection.EventInfo.AddEventHandler*](https://learn.microsoft.com/search/?terms=System.Reflection.EventInfo.AddEventHandler*) method of the [System.Reflection.EventInfo](https://learn.microsoft.com/search/?terms=System.Reflection.EventInfo) class.

## To hook up a delegate using reflection

1. Load an assembly that contains a type that raises events. Assemblies are usually loaded with the [System.Reflection.Assembly.Load*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Load*) method. To keep this example simple, a derived form in the current assembly is used, so the [System.Reflection.Assembly.GetExecutingAssembly*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.GetExecutingAssembly*) method is used to load the current assembly.

   [HookUpDelegate#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs.md)
   [HookUpDelegate#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb.md)

2. Get a [System.Type](https://learn.microsoft.com/search/?terms=System.Type) object representing the type, and create an instance of the type. The [System.Activator.CreateInstance%28System.Type%29](https://learn.microsoft.com/search/?terms=System.Activator.CreateInstance%2528System.Type%2529) method is used in the following code because the form has a parameterless constructor. There are several other overloads of the [System.Activator.CreateInstance*](https://learn.microsoft.com/search/?terms=System.Activator.CreateInstance*) method that you can use if the type you are creating does not have a parameterless constructor. The new instance is stored as type [System.Object](https://learn.microsoft.com/search/?terms=System.Object) to maintain the fiction that nothing is known about the assembly. (Reflection allows you to get the types in an assembly without knowing their names in advance.)

   [HookUpDelegate#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs.md)
   [HookUpDelegate#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb.md)

3. Get an [System.Reflection.EventInfo](https://learn.microsoft.com/search/?terms=System.Reflection.EventInfo) object representing the event, and use the [System.Reflection.EventInfo.EventHandlerType](https://learn.microsoft.com/search/?terms=System.Reflection.EventInfo.EventHandlerType) property to get the type of delegate used to handle the event. In the following code, an [System.Reflection.EventInfo](https://learn.microsoft.com/search/?terms=System.Reflection.EventInfo) for the [System.Windows.Forms.Control.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Click) event is obtained.

   [HookUpDelegate#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs.md)
   [HookUpDelegate#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb.md)

4. Get a [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo) object representing the method that handles the event. The complete program code in the Example section later in this article contains a method that matches the signature of the [System.EventHandler](https://learn.microsoft.com/search/?terms=System.EventHandler) delegate, which handles the [System.Windows.Forms.Control.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Click) event, but you can also generate dynamic methods at runtime. For details, see the accompanying procedure, for generating an event handler at runtime by using a dynamic method.

   [HookUpDelegate#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs.md)
   [HookUpDelegate#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb.md)

5. Create an instance of the delegate, using the [System.Delegate.CreateDelegate*](https://learn.microsoft.com/search/?terms=System.Delegate.CreateDelegate*) method. This method is static (`Shared` in Visual Basic), so the delegate type must be supplied. Using the overloads of [System.Delegate.CreateDelegate*](https://learn.microsoft.com/search/?terms=System.Delegate.CreateDelegate*) that take a [System.Reflection.MethodInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MethodInfo) is recommended.

   [HookUpDelegate#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs.md)
   [HookUpDelegate#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb.md)

6. Get the `add` accessor method and invoke it to hook up the event. All events have an `add` accessor and a `remove` accessor, which are hidden by the syntax of high-level languages. For example, C# uses the `+=` operator to hook up events, and Visual Basic uses the [AddHandler statement](../../visual-basic/language-reference/statements/addhandler-statement.md). The following code gets the `add` accessor of the [System.Windows.Forms.Control.Click](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Control.Click) event and invokes it late-bound, passing in the delegate instance. The arguments must be passed as an array.

   [HookUpDelegate#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs.md)
   [HookUpDelegate#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb.md)

7. Test the event. The following code shows the form defined in the code example. Clicking the form invokes the event handler.

   [HookUpDelegate#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs.md)
   [HookUpDelegate#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb.md)

## Generate an event handler at runtime by using a dynamic method

1. Event-handler methods can be generated at runtime, using lightweight dynamic methods and reflection emit. To construct an event handler, you need the return type and parameter types of the delegate. These can be obtained by examining the delegate's `Invoke` method. The following code uses the `GetDelegateReturnType` and `GetDelegateParameterTypes` methods to obtain this information. The code for these methods can be found in the Example section later in this article.

   It is not necessary to name a [System.Reflection.Emit.DynamicMethod](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.DynamicMethod), so the empty string can be used. In the following code, the last argument associates the dynamic method with the current type, giving the delegate access to all the public and private members of the `Example` class.

   [HookUpDelegate#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs.md)
   [HookUpDelegate#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb.md)

2. Generate a method body. This method loads a string, calls the overload of the [System.Windows.Forms.MessageBox.Show*](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MessageBox.Show*) method that takes a string, pops the return value off the stack (because the handler has no return type), and returns. To learn more about emitting dynamic methods, see [How to: Define and Execute Dynamic Methods](how-to-define-and-execute-dynamic-methods.md).

   [HookUpDelegate#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs.md)
   [HookUpDelegate#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb.md)

3. Complete the dynamic method by calling its [System.Reflection.Emit.DynamicMethod.CreateDelegate*](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.DynamicMethod.CreateDelegate*) method. Use the `add` accessor to add the delegate to the invocation list for the event.

   [HookUpDelegate#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs.md)
   [HookUpDelegate#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb.md)

4. Test the event. The following code loads the form defined in the code example. Clicking the form invokes both the predefined event handler and the emitted event handler.

   [HookUpDelegate#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs.md)
   [HookUpDelegate#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb.md)

## Example

The following code example shows how to hook up an existing method to an event using reflection, and also how to use the [System.Reflection.Emit.DynamicMethod](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.DynamicMethod) class to emit a method at runtime and hook it up to an event.

[HookUpDelegate#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HookUpDelegate/cs/source.cs.md)
[HookUpDelegate#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HookUpDelegate/vb/source.vb.md)

## See also

- [System.Reflection.Assembly.Load*](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Load*)
- [System.Reflection.Emit.DynamicMethod](https://learn.microsoft.com/search/?terms=System.Reflection.Emit.DynamicMethod)
- [System.Activator.CreateInstance*](https://learn.microsoft.com/search/?terms=System.Activator.CreateInstance*)
- [System.Delegate.CreateDelegate*](https://learn.microsoft.com/search/?terms=System.Delegate.CreateDelegate*)
- [How to: Define and Execute Dynamic Methods](how-to-define-and-execute-dynamic-methods.md)
- [Reflection](overview.md)
