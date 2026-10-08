---
title: "Breaking change: Thread.Abort is obsolete"
description: Learn about the .NET 5 breaking change in core .NET libraries where the Thread.Abort APIs are obsolete.
ms.date: 11/01/2020
---
# Thread.Abort is obsolete

The [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) APIs are obsolete. Projects that target .NET 5 or a later version will encounter compile-time warning `SYSLIB0006` if these methods are called.

## Change description

Previously, calls to [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) did not produce compile-time warnings, however, the method did throw a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) at runtime.

Starting in .NET 5, [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) is marked obsolete as warning. Calling this method produces compiler warning `SYSLIB0006`. The implementation of the method is unchanged, and it continues to throw a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException).

## Reason for change

Given that [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) always throws a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) on all .NET implementations except .NET Framework, [System.ObsoleteAttribute](https://learn.microsoft.com/search/?terms=System.ObsoleteAttribute) was added to the method to draw attention to places where it's called.

When you call [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) to abort a thread other than the current thread, you don't know what code has executed or failed to execute when the [System.Threading.ThreadAbortException](https://learn.microsoft.com/search/?terms=System.Threading.ThreadAbortException) is thrown. You also cannot be certain of the state of your application or any application and user state that it's responsible for preserving. For example, calling [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) may prevent the execution of static constructors or the release of managed or unmanaged resources. For this reason, [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) always throws a [System.PlatformNotSupportedException](https://learn.microsoft.com/search/?terms=System.PlatformNotSupportedException) on .NET Core and .NET 5+.

## Version introduced

5.0

## Recommended action

- Use a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) to abort processing of a unit of work instead of calling [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*). The following example illustrates the use of [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken).

  ```csharp
  void ProcessPendingWorkItemsNew(CancellationToken cancellationToken)
  {
      if (QueryIsMoreWorkPending())
      {
          // If the CancellationToken is marked as "needs to cancel",
          // this will throw the appropriate exception.
          cancellationToken.ThrowIfCancellationRequested();

          WorkItem work = DequeueWorkItem();
          ProcessWorkItem(work);
      }
  }
  ```

  For more information, see [Cancellation in managed threads](../../../../standard/threading/cancellation-in-managed-threads.md).

- To suppress the compile-time warning, suppress warning code `SYSLIB0006`. The warning code is specific to [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) and suppressing it doesn't suppress other obsoletion warnings in your code. However, we recommend that you remove calls to [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*) instead of suppressing the warning.

  ```csharp
  void MyMethod()
  {
  #pragma warning disable SYSLIB0006
      Thread.CurrentThread.Abort();
  #pragma warning restore SYSLIB0006
  }
  ```

  You can also suppress the warning in the project file.

  ```xml
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net5.0</TargetFramework>
    <!-- Disable "Thread.Abort is obsolete" warnings for entire project. -->
    <NoWarn>$(NoWarn);SYSLIB0006</NoWarn>
  </PropertyGroup>
  ```

## Affected APIs

- [System.Threading.Thread.Abort*](https://learn.microsoft.com/search/?terms=System.Threading.Thread.Abort*)
