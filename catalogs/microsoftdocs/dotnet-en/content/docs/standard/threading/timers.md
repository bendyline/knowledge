---
title: "Timers"
description: Learn what .NET timers to use in a multithreaded environment.
ms.date: "07/03/2018"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "threading [.NET], timers"
  - "timers, about timers"
author: "pkulikov"
---
# Timers

.NET provides three timers to use in a multithreaded environment:

- [System.Threading.Timer](https://learn.microsoft.com/search/?terms=System.Threading.Timer), which executes a single callback method on a [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) thread at regular intervals.
- [System.Timers.Timer](https://learn.microsoft.com/search/?terms=System.Timers.Timer), which by default raises an event on a [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) thread at regular intervals.
- [System.Threading.PeriodicTimer](https://learn.microsoft.com/search/?terms=System.Threading.PeriodicTimer), which allows the caller to perform work after awaiting individual ticks of the timer.

> **Note:**
> Some .NET implementations may include additional timers:
>
> - [System.Windows.Forms.Timer](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Timer): a Windows Forms component that fires an event at regular intervals. The component has no user interface and is designed for use in a single-threaded environment.
> - [System.Web.UI.Timer](https://learn.microsoft.com/search/?terms=System.Web.UI.Timer): an ASP.NET component that performs asynchronous or synchronous web page postbacks at a regular interval.
> - [System.Windows.Threading.DispatcherTimer](https://learn.microsoft.com/search/?terms=System.Windows.Threading.DispatcherTimer): a timer that is integrated into the [System.Windows.Threading.Dispatcher](https://learn.microsoft.com/search/?terms=System.Windows.Threading.Dispatcher) queue which is processed at a specified interval of time and at a specified priority.

## The System.Threading.Timer class

The [System.Threading.Timer](https://learn.microsoft.com/search/?terms=System.Threading.Timer) class enables you to continuously call a delegate at specified time intervals. You can also use this class to schedule a single call to a delegate in a specified time interval. The delegate is executed on a [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) thread.

When you create a [System.Threading.Timer](https://learn.microsoft.com/search/?terms=System.Threading.Timer) object, you specify a [System.Threading.TimerCallback](https://learn.microsoft.com/search/?terms=System.Threading.TimerCallback) delegate that defines the callback method, an optional state object that is passed to the callback, the amount of time to delay before the first invocation of the callback, and the time interval between callback invocations. To cancel a pending timer, call the [System.Threading.Timer.Dispose*](https://learn.microsoft.com/search/?terms=System.Threading.Timer.Dispose*) method.

The following example creates a timer that calls the provided delegate for the first time after one second (1000 milliseconds) and then calls it every two seconds. The state object in the example is used to count how many times the delegate is called. The timer is stopped when the delegate has been called at least 10 times.
[System.Threading.Timer#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR_System/system.Threading.Timer/CS/source2.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR_System/system.Threading.Timer/CS/source2.cs.md)
[System.Threading.Timer#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR_System/system.Threading.Timer/VB/source2.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR_System/system.Threading.Timer/VB/source2.vb.md)

For more information and examples, see [System.Threading.Timer](https://learn.microsoft.com/search/?terms=System.Threading.Timer).

## The System.Timers.Timer class

Another timer that can be used in a multithreaded environment is [System.Timers.Timer](https://learn.microsoft.com/search/?terms=System.Timers.Timer) that by default raises an event on a [System.Threading.ThreadPool](https://learn.microsoft.com/search/?terms=System.Threading.ThreadPool) thread.

When you create a [System.Timers.Timer](https://learn.microsoft.com/search/?terms=System.Timers.Timer) object, you may specify the time interval in which to raise an [System.Timers.Timer.Elapsed](https://learn.microsoft.com/search/?terms=System.Timers.Timer.Elapsed) event. Use the [System.Timers.Timer.Enabled](https://learn.microsoft.com/search/?terms=System.Timers.Timer.Enabled) property to indicate if a timer should raise an [System.Timers.Timer.Elapsed](https://learn.microsoft.com/search/?terms=System.Timers.Timer.Elapsed) event. If you need an [System.Timers.Timer.Elapsed](https://learn.microsoft.com/search/?terms=System.Timers.Timer.Elapsed) event to be raised only once after the specified interval has elapsed, set [System.Timers.Timer.AutoReset](https://learn.microsoft.com/search/?terms=System.Timers.Timer.AutoReset) to `false`. The default value of the [System.Timers.Timer.AutoReset](https://learn.microsoft.com/search/?terms=System.Timers.Timer.AutoReset) property is `true`, which means that an [System.Timers.Timer.Elapsed](https://learn.microsoft.com/search/?terms=System.Timers.Timer.Elapsed) event is raised regularly at the interval defined by the [System.Timers.Timer.Interval](https://learn.microsoft.com/search/?terms=System.Timers.Timer.Interval) property.

For more information and examples, see [System.Timers.Timer](https://learn.microsoft.com/search/?terms=System.Timers.Timer).

## The System.Threading.PeriodicTimer class

The [System.Threading.PeriodicTimer](https://learn.microsoft.com/search/?terms=System.Threading.PeriodicTimer) class enables you to await individual ticks of a specified interval, performing work after calling [System.Threading.PeriodicTimer.WaitForNextTickAsync*](https://learn.microsoft.com/search/?terms=System.Threading.PeriodicTimer.WaitForNextTickAsync*).

When you create a [System.Threading.PeriodicTimer](https://learn.microsoft.com/search/?terms=System.Threading.PeriodicTimer) object, you specify a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan) that determines the length of time between each tick of the timer. Instead of passing a callback or setting an event handler as in the previous timer classes, you perform work directly in scope, awaiting [System.Threading.PeriodicTimer.WaitForNextTickAsync*](https://learn.microsoft.com/search/?terms=System.Threading.PeriodicTimer.WaitForNextTickAsync*) to advance the timer by the specified interval.

The [System.Threading.PeriodicTimer.WaitForNextTickAsync*](https://learn.microsoft.com/search/?terms=System.Threading.PeriodicTimer.WaitForNextTickAsync*) method returns a [`ValueTask<bool>`](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.ValueTask%601); `true` upon successful firing of the timer, and `false` when the timer has been canceled by calling [System.Threading.PeriodicTimer.Dispose*](https://learn.microsoft.com/search/?terms=System.Threading.PeriodicTimer.Dispose*). [System.Threading.PeriodicTimer.WaitForNextTickAsync*](https://learn.microsoft.com/search/?terms=System.Threading.PeriodicTimer.WaitForNextTickAsync*) optionally accepts a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken), which results in a [System.Threading.Tasks.TaskCanceledException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCanceledException) when a cancellation has been requested.

For more information, see [System.Threading.PeriodicTimer](https://learn.microsoft.com/search/?terms=System.Threading.PeriodicTimer).

## See also

- [System.Threading.Timer](https://learn.microsoft.com/search/?terms=System.Threading.Timer)
- [System.Timers.Timer](https://learn.microsoft.com/search/?terms=System.Timers.Timer)
- [System.Threading.PeriodicTimer](https://learn.microsoft.com/search/?terms=System.Threading.PeriodicTimer)
- [Threading Objects and Features](threading-objects-and-features.md)
