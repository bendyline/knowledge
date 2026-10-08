---
title: "Task-based asynchronous programming - .NET"
description: In this article, learn about task-based asynchronous programming through the Task Parallel Library (TPL) in .NET.
ms.date: 10/22/2025
ms.custom: devdivchpfy22
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "parallelism, task"
ms.assetid: 458b5e69-5210-45e5-bc44-3888f86abd6f
ai-usage: ai-assisted
---
# Task-based asynchronous programming

The Task Parallel Library (TPL) is based on the concept of a *task*, which represents an asynchronous operation. In some ways, a task resembles a thread or [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) work item but at a higher level of abstraction. The term *task parallelism* refers to one or more independent tasks running concurrently. Tasks provide two primary benefits:

- More efficient and more scalable use of system resources.

     Behind the scenes, tasks are queued to the [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool), which has been enhanced with algorithms that determine and adjust to the number of threads. These algorithms provide load balancing to maximize throughput. This process makes tasks relatively lightweight, and you can create many of them to enable fine-grained parallelism.

- More programmatic control than is possible with a thread or work item.

     Tasks and the framework built around them provide a rich set of APIs that support waiting, cancellation, continuations, robust exception handling, detailed status, custom scheduling, and more.

For both reasons, TPL is the preferred API for writing multi-threaded, asynchronous, and parallel code in .NET.

## Creating and running tasks implicitly

The [System.Threading.Tasks.Parallel.Invoke*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.Invoke*) method provides a convenient way to run any number of arbitrary statements concurrently. Just pass in an [System.Action](https://learn.microsoft.com/search/?terms=System.Action) delegate for each item of work. The easiest way to create these delegates is to use lambda expressions. The lambda expression can either call a named method or provide the code inline. The following example shows a basic [System.Threading.Tasks.Parallel.Invoke*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.Invoke*) call that creates and starts two tasks that run concurrently. The first task is represented by a lambda expression that calls a method named `DoSomeWork`, and the second task is represented by a lambda expression that calls a method named `DoSomeOtherWork`.

> **Note:**
> This documentation uses lambda expressions to define delegates in TPL. If you aren't familiar with lambda expressions in C# or Visual Basic, see [Lambda Expressions in PLINQ and TPL](lambda-expressions-in-plinq-and-tpl.md).

[TPL#21 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl/cs/tpl.cs#21)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl/cs/tpl.cs.md)
[TPL#21 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl/vb/tpl_vb.vb#21)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl/vb/tpl_vb.vb.md)

> **Note:**
> The number of [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) instances that are created behind the scenes by [System.Threading.Tasks.Parallel.Invoke*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.Invoke*) isn't necessarily equal to the number of delegates that are provided. The TPL might employ various optimizations, especially with large numbers of delegates.

For more information, see [How to: Use Parallel.Invoke to Execute Parallel Operations](how-to-use-parallel-invoke-to-execute-parallel-operations.md).

For greater control over task execution or to return a value from the task, you must work with [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) objects more explicitly.

## Creating and running tasks explicitly

A task that doesn't return a value is represented by the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) class. A task that returns a value is represented by the [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) class, which inherits from [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task). The task object handles the infrastructure details and provides methods and properties that are accessible from the calling thread throughout the lifetime of the task. For example, you can access the [System.Threading.Tasks.Task.Status](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Status) property of a task at any time to determine whether it has started running, ran to completion, was canceled, or has thrown an exception. The status is represented by a [System.Threading.Tasks.TaskStatus](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskStatus) enumeration.

When you create a task, you give it a user delegate that encapsulates the code that the task will execute. The delegate can be expressed as a named delegate, an anonymous method, or a lambda expression. Lambda expressions can contain a call to a named method, as shown in the following example. The example includes a call to the [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*) method to ensure that the task completes execution before the console mode application ends.

[TPL_TaskIntro#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/lambda1.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/lambda1.cs.md)
[TPL_TaskIntro#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/lambda1.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/lambda1.vb.md)

You can also use the [System.Threading.Tasks.Task.Run*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Run*) methods to create and start a task in one operation. To manage the task, the [System.Threading.Tasks.Task.Run*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Run*) methods use the default task scheduler, regardless of which task scheduler is associated with the current thread. The [System.Threading.Tasks.Task.Run*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Run*) methods are the preferred way to create and start tasks when more control over the creation and scheduling of the task isn't needed.

[TPL_TaskIntro#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/run1.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/run1.cs.md)
[TPL_TaskIntro#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/run1.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/run1.vb.md)

You can also use the [System.Threading.Tasks.TaskFactory.StartNew*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.StartNew*) method to create and start a task in one operation. As shown in the following example, you can use this method when:

- Creation and scheduling don't have to be separated and you require additional task creation options or the use of a specific scheduler.

- You need to pass additional state into the task that you can retrieve through its [System.Threading.Tasks.Task.AsyncState](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.AsyncState) property.

[TPL_TaskIntro#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/asyncstate.cs#23)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/asyncstate.cs.md)
[TPL_TaskIntro#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/asyncstate.vb#23)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/asyncstate.vb.md)

[System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) each expose a static [System.Threading.Tasks.Task.Factory](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Factory) property that returns a default instance of [System.Threading.Tasks.TaskFactory](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory), so that you can call the method as `Task.Factory.StartNew()`. Also, in the following example, because the tasks are of type [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601), they each have a public [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property that contains the result of the computation. The tasks run asynchronously and might complete in any order. If the [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property is accessed before the computation finishes, the property blocks the calling thread until the value is available.

[TPL_TaskIntro#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/result1.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/result1.cs.md)
[TPL_TaskIntro#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/result1.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/result1.vb.md)

For more information, see [How to: Return a Value from a Task](how-to-return-a-value-from-a-task.md).

When you use a lambda expression to create a delegate, you have access to all the variables that are visible at that point in your source code. However, in some cases, most notably within loops, a lambda doesn't capture the variable as expected. It only captures the reference of the variable, not the value, as it mutates after each iteration. The following example illustrates the problem. It passes a loop counter to a lambda expression that instantiates a `CustomData` object and uses the loop counter as the object's identifier. As the output from the example shows, each `CustomData` object has an identical identifier.

[TPL_TaskIntro#22 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/iteration1b.cs#22)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/iteration1b.cs.md)
[TPL_TaskIntro#22 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/iteration1b.vb#22)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/iteration1b.vb.md)

You can access the value on each iteration by providing a state object to a task through its constructor. The following example modifies the previous example by using the loop counter when creating the `CustomData` object, which, in turn, is passed to the lambda expression. As the output from the example shows, each `CustomData` object now has a unique identifier based on the value of the loop counter at the time the object was instantiated.

[TPL_TaskIntro#21 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/iteration1a.cs#21)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/iteration1a.cs.md)
[TPL_TaskIntro#21 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/iteration1a.vb#21)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/iteration1a.vb.md)

This state is passed as an argument to the task delegate, and it can be accessed from the task object by using the [System.Threading.Tasks.Task.AsyncState](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.AsyncState) property. The following example is a variation on the previous example. It uses the [System.Threading.Tasks.Task.AsyncState](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.AsyncState) property to display information about the `CustomData` objects passed to the lambda expression.

[TPL_TaskIntro#23 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/asyncstate.cs#23)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/asyncstate.cs.md)
[TPL_TaskIntro#23 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/asyncstate.vb#23)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/asyncstate.vb.md)

## Task ID

Every task receives an integer ID that uniquely identifies it in an application domain and can be accessed by using the [System.Threading.Tasks.Task.Id](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Id) property. The ID is useful for viewing task information in the Visual Studio debugger **Parallel Stacks** and **Tasks** windows. The ID is created lazily, which means it isn't created until it's requested. Therefore, a task might have a different ID every time the program is run. For more information about how to view task IDs in the debugger, see [Using the Tasks Window](https://learn.microsoft.com/visualstudio/debugger/using-the-tasks-window) and [Using the Parallel Stacks Window](https://learn.microsoft.com/visualstudio/debugger/using-the-parallel-stacks-window).

## Task creation options

Most APIs that create tasks provide overloads that accept a [System.Threading.Tasks.TaskCreationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions) parameter. By specifying one or more of these options, you tell the task scheduler how to schedule the task on the thread pool. Options might be combined by using a bitwise **OR** operation.

The following example shows a task that has the [System.Threading.Tasks.TaskCreationOptions.LongRunning](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions.LongRunning) and [System.Threading.Tasks.TaskCreationOptions.PreferFairness](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions.PreferFairness) options:

[TPL_TaskIntro#03 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/taskintro.cs#03)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/taskintro.cs.md)
[TPL_TaskIntro#03 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/tpl_intro.vb#03)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/tpl_intro.vb.md)

## Tasks, threads, and culture

Each thread has an associated culture and UI culture, which are defined by the [System.Threading.Thread.CurrentCulture*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.CurrentCulture*) and [System.Threading.Thread.CurrentUICulture](https://learn.microsoft.com/search/?terms=System.Threading.Thread.CurrentUICulture) properties, respectively. A thread's culture is used in operations such as formatting, parsing, sorting, and string comparison operations. A thread's UI culture is used in resource lookup.

The system culture defines the default culture and UI culture of a thread. However, you can specify a default culture for all the threads in an application domain by using the [System.Globalization.CultureInfo.DefaultThreadCurrentCulture*](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DefaultThreadCurrentCulture*) and [System.Globalization.CultureInfo.DefaultThreadCurrentUICulture](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo.DefaultThreadCurrentUICulture) properties. If you explicitly set a thread's culture and launch a new thread, the new thread doesn't inherit the culture of the calling thread; instead, its culture is the default system culture. However, in task-based programming, tasks use the calling thread's culture, even if the task runs asynchronously on a different thread.

The following example provides a simple illustration. It changes the app's current culture to French (France). If French (France) is already the current culture, it changes to English (United States). It then invokes a delegate named `formatDelegate` that returns some numbers formatted as currency values in the new culture. Whether the delegate is invoked by a task either synchronously or asynchronously, the task uses the culture of the calling thread.

[language="csharp" source="snippets/cs/asyncculture1.cs" id="1"::: (complete source file; reference: snippets/cs/asyncculture1.cs)](../../../_code/docs/standard/parallel-programming/snippets/cs/asyncculture1.cs.md)

[language="vbnet" source="snippets/vb/asyncculture1.vb" id="1"::: (complete source file; reference: snippets/vb/asyncculture1.vb)](../../../_code/docs/standard/parallel-programming/snippets/vb/asyncculture1.vb.md)

> **Note:**
> In versions of .NET Framework earlier than .NET Framework 4.6, a task's culture is determined by the culture of the thread on which it runs, not the culture of the calling thread. For asynchronous tasks, the culture used by the task could be different from the calling thread's culture.

For more information on asynchronous tasks and culture, see the "Culture and asynchronous task-based operations" section in the [System.Globalization.CultureInfo](https://learn.microsoft.com/search/?terms=System.Globalization.CultureInfo) article.

## Creating task continuations

The [System.Threading.Tasks.Task.ContinueWith*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.ContinueWith*) and [System.Threading.Tasks.Task`1.ContinueWith*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.ContinueWith*) methods let you specify a task to start when the *antecedent task* finishes. The delegate of the continuation task is passed a reference to the antecedent task so that it can examine the antecedent task's status. And by retrieving the value of the [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property, you can use the output of the antecedent as input for the continuation.

In the following example, the `getData` task is started by a call to the [System.Threading.Tasks.TaskFactory.StartNew``1%28System.Func%7B``0%7D%29](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.StartNew%60%601%2528System.Func%257B%60%600%257D%2529) method. The `processData` task is started automatically when `getData` finishes, and `displayData` is started when `processData` finishes. `getData` produces an integer array, which is accessible to the `processData` task through the `getData` task's [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property. The `processData` task processes that array and returns a result whose type is inferred from the return type of the lambda expression passed to the [System.Threading.Tasks.Task`1.ContinueWith``1%28System.Func%7BSystem.Threading.Tasks.Task%7B`0%7D%2C``0%7D%29](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.ContinueWith%60%601%2528System.Func%257BSystem.Threading.Tasks.Task%257B%600%257D%252C%60%600%257D%2529) method. The `displayData` task executes automatically when `processData` finishes, and the [System.Tuple`3](https://learn.microsoft.com/search/?terms=System.Tuple%603) object returned by the `processData` lambda expression is accessible to the `displayData` task through the `processData` task's [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property. The `displayData` task takes the result of the `processData` task. It produces a result whose type is inferred in a similar manner, and which is made available to the program in the [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property.

[TPL_TaskIntro#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/continuations1.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/continuations1.cs.md)
[TPL_TaskIntro#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/continuations1.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/continuations1.vb.md)

Because [System.Threading.Tasks.Task.ContinueWith*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.ContinueWith*) is an instance method, you can chain method calls together instead of instantiating a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object for each antecedent task. The following example is functionally identical to the previous one, except that it chains together calls to the [System.Threading.Tasks.Task.ContinueWith*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.ContinueWith*) method. The [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object returned by the chain of method calls is the final continuation task.

[TPL_TaskIntro#24 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/continuations2.cs#24)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/continuations2.cs.md)
[TPL_TaskIntro#24 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/continuations2.vb#24)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/continuations2.vb.md)

The [System.Threading.Tasks.TaskFactory.ContinueWhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.ContinueWhenAll*) and [System.Threading.Tasks.TaskFactory.ContinueWhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.ContinueWhenAny*) methods enable you to continue from multiple tasks.

For more information, see [Chaining Tasks by Using Continuation Tasks](chaining-tasks-by-using-continuation-tasks.md).

## Creating detached child tasks

When user code that's running in a task creates a new task and doesn't specify the [System.Threading.Tasks.TaskCreationOptions.AttachedToParent](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions.AttachedToParent) option, the new task isn't synchronized with the parent task in any special way. This type of non-synchronized task is called a *detached nested task* or *detached child task*. The following example shows a task that creates one detached child task:

[TPL_TaskIntro#07 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/taskintro.cs#07)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/taskintro.cs.md)
[TPL_TaskIntro#07 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/tpl_intro.vb#07)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/tpl_intro.vb.md)

> **Note:**
> The parent task doesn't wait for the detached child task to finish.

## Creating child tasks

When user code that's running in a task creates a task with the [System.Threading.Tasks.TaskCreationOptions.AttachedToParent](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions.AttachedToParent) option, the new task is known as an *attached child task* of the parent task. You can use the [System.Threading.Tasks.TaskCreationOptions.AttachedToParent](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions.AttachedToParent) option to express structured task parallelism because the parent task implicitly waits for all attached child tasks to finish. The following example shows a parent task that creates 10 attached child tasks. The example calls the [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*) method to wait for the parent task to finish. It doesn't have to explicitly wait for the attached child tasks to complete.

[TPL_TaskIntro#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/child1.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/child1.cs.md)
[TPL_TaskIntro#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/child1.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/child1.vb.md)

A parent task can use the [System.Threading.Tasks.TaskCreationOptions.DenyChildAttach](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions.DenyChildAttach) option to prevent other tasks from attaching to the parent task. For more information, see [Attached and Detached Child Tasks](attached-and-detached-child-tasks.md).

## Waiting for tasks to finish

The [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) types provide several overloads of the [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*) methods that enable you to wait for a task to finish. In addition, overloads of the static [System.Threading.Tasks.Task.WaitAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll*) and [System.Threading.Tasks.Task.WaitAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAny*) methods let you wait for any or all of an array of tasks to finish.

Typically, you would wait for a task for one of these reasons:

- The main thread depends on the final result computed by a task.

- You have to handle exceptions that might be thrown from the task.

- The application might terminate before all tasks have completed execution. For example, console applications will terminate after all synchronous code in `Main` (the application entry point) has executed.

The following example shows the basic pattern that doesn't involve exception handling:

[TPL_TaskIntro#06 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/taskintro.cs#06)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_taskintro/cs/taskintro.cs.md)
[TPL_TaskIntro#06 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/tpl_intro.vb#06)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/tpl_intro.vb.md)

For an example that shows exception handling, see [Exception Handling](exception-handling-task-parallel-library.md).

Some overloads let you specify a time-out, and others take an additional [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) as an input parameter so that the wait itself can be canceled either programmatically or in response to user input.

When you wait for a task, you implicitly wait for all children of that task that were created by using the [System.Threading.Tasks.TaskCreationOptions.AttachedToParent](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions.AttachedToParent) option. [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*) returns immediately if the task has already completed. A [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*) method throws any exceptions raised by a task, even if the [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*) method was called after the task completed.

## Composing tasks

The [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) classes provide several methods to help you compose multiple tasks. These methods implement common patterns and make better use of the asynchronous language features that are provided by C#, Visual Basic, and F#. This section describes the [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*), [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*), [System.Threading.Tasks.Task.Delay*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Delay*), and [System.Threading.Tasks.Task.FromResult*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.FromResult*) methods.

### Task.WhenAll

The [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*) method asynchronously waits for multiple [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) objects to finish. It provides overloaded versions that enable you to wait for non-uniform sets of tasks. For example, you can wait for multiple [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) objects to complete from one method call.

### Task.WhenAny

The [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) method asynchronously waits for one of multiple [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) objects to finish. As in the [System.Threading.Tasks.Task.WhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAll*) method, this method provides overloaded versions that enable you to wait for non-uniform sets of tasks. The [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) method is especially useful in the following scenarios:

- **Redundant operations**: Consider an algorithm or operation that can be performed in many ways. You can use the [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) method to select the operation that finishes first and then cancel the remaining operations.

- **Interleaved operations**: You can start multiple operations that must finish and use the [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) method to process results as each operation finishes. After one operation finishes, you can start one or more tasks.

- **Throttled operations**: You can use the [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) method to extend the previous scenario by limiting the number of concurrent operations.

- **Expired operations**: You can use the [System.Threading.Tasks.Task.WhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WhenAny*) method to select between one or more tasks and a task that finishes after a specific time, such as a task that's returned by the [System.Threading.Tasks.Task.Delay*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Delay*) method. The [System.Threading.Tasks.Task.Delay*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Delay*) method is described in the following section.

### Task.Delay

The [System.Threading.Tasks.Task.Delay*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Delay*) method produces a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) object that finishes after the specified time. You can use this method to build loops that poll for data, to specify time-outs, to delay the handling of user input, and so on.

### Task(T).FromResult

By using the [System.Threading.Tasks.Task.FromResult*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.FromResult*) method, you can create a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object that holds a pre-computed result. This method is useful when you perform an asynchronous operation that returns a [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object, and the result of that [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object is already computed. For an example that uses [System.Threading.Tasks.Task.FromResult*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.FromResult*) to retrieve the results of asynchronous download operations that are held in a cache, see [How to: Create Pre-Computed Tasks](how-to-create-pre-computed-tasks.md).

## Handling exceptions in tasks

When a task throws one or more exceptions, the exceptions are wrapped in an [System.AggregateException](https://learn.microsoft.com/search/?terms=System.AggregateException) exception. That exception is propagated back to the thread that joins with the task. Typically, it's the thread waiting for the task to finish or the thread accessing the [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property. This behavior enforces the .NET Framework policy that all unhandled exceptions by default should terminate the process. The calling code can handle the exceptions by using any of the following in a `try`/`catch` block:

- The [System.Threading.Tasks.Task.Wait*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Wait*) method

- The [System.Threading.Tasks.Task.WaitAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAll*) method

- The [System.Threading.Tasks.Task.WaitAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.WaitAny*) method

- The [System.Threading.Tasks.Task`1.Result](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601.Result) property

The joining thread can also handle exceptions by accessing the [System.Threading.Tasks.Task.Exception](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Exception) property before the task is garbage-collected. By accessing this property, you prevent the unhandled exception from triggering the exception propagation behavior that terminates the process when the object is finalized.

For more information about exceptions and tasks, see [Exception Handling](exception-handling-task-parallel-library.md).

## Canceling tasks

The [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) class supports cooperative cancellation and is fully integrated with the [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) and [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) classes, which were introduced in the .NET Framework 4. Many of the constructors in the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) class take a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) object as an input parameter. Many of the [System.Threading.Tasks.TaskFactory.StartNew*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.StartNew*) and [System.Threading.Tasks.Task.Run*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Run*) overloads also include a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) parameter.

You can create the token and issue the cancellation request at some later time, by using the [System.Threading.CancellationTokenSource](https://learn.microsoft.com/search/?terms=System.Threading.CancellationTokenSource) class. Pass the token to the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) as an argument, and also reference the same token in your user delegate, which does the work of responding to a cancellation request.

For more information, see [Task Cancellation](task-cancellation.md) and [How to: Cancel a Task and Its Children](how-to-cancel-a-task-and-its-children.md).

## The TaskFactory class

The [System.Threading.Tasks.TaskFactory](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory) class provides static methods that encapsulate common patterns for creating and starting tasks and continuation tasks.

- The most common pattern is [System.Threading.Tasks.TaskFactory.StartNew*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.StartNew*), which creates and starts a task in one statement.

- When you create continuation tasks from multiple antecedents, use the [System.Threading.Tasks.TaskFactory.ContinueWhenAll*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.ContinueWhenAll*) method or [System.Threading.Tasks.TaskFactory.ContinueWhenAny*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.ContinueWhenAny*) method or their equivalents in the [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) class. For more information, see [Chaining Tasks by Using Continuation Tasks](chaining-tasks-by-using-continuation-tasks.md).

- To encapsulate Asynchronous Programming Model `BeginX` and `EndX` methods in a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) instance, use the [System.Threading.Tasks.TaskFactory.FromAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.FromAsync*) methods. For more information, see [TPL and Traditional .NET Framework Asynchronous Programming](tpl-and-traditional-async-programming.md).

The default [System.Threading.Tasks.TaskFactory](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory) can be accessed as a static property on the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) class or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) class. You can also instantiate a [System.Threading.Tasks.TaskFactory](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory) directly and specify various options that include a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken), a [System.Threading.Tasks.TaskCreationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions) option, a [System.Threading.Tasks.TaskContinuationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskContinuationOptions) option, or a [System.Threading.Tasks.TaskScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler). Whatever options are specified when you create the task factory are applied to all tasks that it creates unless the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) is created by using the [System.Threading.Tasks.TaskCreationOptions](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions) enumeration, in which case the task's options override those of the task factory.

## Tasks without delegates

In some cases, you might want to use a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) to encapsulate some asynchronous operation that's performed by an external component instead of your user delegate. If the operation is based on the Asynchronous Programming Model Begin/End pattern, you can use the [System.Threading.Tasks.TaskFactory.FromAsync*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory.FromAsync*) methods. If that's not the case, you can use the [System.Threading.Tasks.TaskCompletionSource`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%601) object to wrap the operation in a task and thereby gain some of the benefits of [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) programmability. For example, support for exception propagation and continuations. For more information, see [System.Threading.Tasks.TaskCompletionSource`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%601).

## Custom schedulers

Most application or library developers don't care which processor the task runs on, how it synchronizes its work with other tasks, or how it's scheduled on the [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool). They only require that it execute as efficiently as possible on the host computer. If you require more fine-grained control over the scheduling details, the TPL lets you configure some settings on the default task scheduler, and even lets you supply a custom scheduler. For more information, see [System.Threading.Tasks.TaskScheduler](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskScheduler).

## Related data structures

The TPL has several new public types that are useful in parallel and sequential scenarios. These include several thread-safe, fast, and scalable collection classes in the [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent) namespace and several new synchronization types. For example, [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore) and [System.Threading.ManualResetEventSlim](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEventSlim), which are more efficient than their predecessors for specific kinds of workloads. Other new types in the .NET Framework 4, for example, [System.Threading.Barrier](https://learn.microsoft.com/search/?terms=System.Threading.Barrier) and [System.Threading.SpinLock](https://learn.microsoft.com/search/?terms=System.Threading.SpinLock), provide functionality that wasn't available in earlier releases. For more information, see [Data Structures for Parallel Programming](data-structures-for-parallel-programming.md).

## Custom task types

We recommend that you don't inherit from [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601). Instead, we recommend that you use the [System.Threading.Tasks.Task.AsyncState](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.AsyncState) property to associate additional data or state with a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object. You can also use extension methods to extend the functionality of the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) classes. For more information about extension methods, see [Extension Methods](../../csharp/programming-guide/classes-and-structs/extension-methods.md) and [Extension Methods](../../visual-basic/programming-guide/language-features/procedures/extension-methods.md).

If you must inherit from [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601), you can't use [System.Threading.Tasks.Task.Run*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.Run*) or the [System.Threading.Tasks.TaskFactory](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory), [System.Threading.Tasks.TaskFactory`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory%601), or [System.Threading.Tasks.TaskCompletionSource`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCompletionSource%601) classes to create instances of your custom task type. You can't use them because these classes create only [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) objects. In addition, you can't use the task continuation mechanisms that are provided by [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task), [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601), [System.Threading.Tasks.TaskFactory](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory), and [System.Threading.Tasks.TaskFactory`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskFactory%601) to create instances of your custom task type. You can't use them because these classes also create only [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) and [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) objects.

## Related sections

| Title | Description |
| --- | --- |
| [Chaining Tasks by Using Continuation Tasks](chaining-tasks-by-using-continuation-tasks.md) | Describes how continuations work. |
| [Attached and Detached Child Tasks](attached-and-detached-child-tasks.md) | Describes the difference between attached and detached child tasks. |
| [Task Cancellation](task-cancellation.md) | Describes the cancellation support that's built into the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) object. |
| [Exception Handling](exception-handling-task-parallel-library.md) | Describes how exceptions on concurrent threads are handled. |
| [How to: Use Parallel.Invoke to Execute Parallel Operations](how-to-use-parallel-invoke-to-execute-parallel-operations.md) | Describes how to use [System.Threading.Tasks.Parallel.Invoke*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.Invoke*). |
| [How to: Return a Value from a Task](how-to-return-a-value-from-a-task.md) | Describes how to return values from tasks. |
| [How to: Cancel a Task and Its Children](how-to-cancel-a-task-and-its-children.md) | Describes how to cancel tasks. |
| [How to: Create Pre-Computed Tasks](how-to-create-pre-computed-tasks.md) | Describes how to use the [System.Threading.Tasks.Task.FromResult*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task.FromResult*) method to retrieve the results of asynchronous download operations that are held in a cache. |
| [How to: Traverse a Binary Tree with Parallel Tasks](how-to-traverse-a-binary-tree-with-parallel-tasks.md) | Describes how to use tasks to traverse a binary tree. |
| [How to: Unwrap a Nested Task](how-to-unwrap-a-nested-task.md) | Demonstrates how to use the [System.Threading.Tasks.TaskExtensions.Unwrap*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskExtensions.Unwrap*) extension method. |
| [Data Parallelism](data-parallelism-task-parallel-library.md) | Describes how to use [System.Threading.Tasks.Parallel.For*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.For*) and [System.Threading.Tasks.Parallel.ForEach*](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Parallel.ForEach*) to create parallel loops over data. |
| [Parallel Programming](index.md) | Top-level node for .NET Framework parallel programming. |

## See also

- [Parallel Programming](index.md)
- [Samples for Parallel Programming with the .NET Core & .NET Standard](https://learn.microsoft.com/samples/browse/?products=dotnet-core%2Cdotnet-standard\&term=parallel)
