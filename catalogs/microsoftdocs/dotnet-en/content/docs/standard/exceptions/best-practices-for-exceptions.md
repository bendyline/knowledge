---
title: "Best practices for exceptions"
description: Learn best practices for exceptions, such as using try/catch/finally, handling common conditions without exceptions, and using predefined .NET exception types.
ms.date: 10/22/2025
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "exceptions, best practices"
ai-usage: ai-assisted
---

# Best practices for exceptions

Proper exception handling is essential for application reliability. You can intentionally handle expected exceptions to prevent your app from crashing. However, a crashed app is more reliable and diagnosable than an app with undefined behavior.

This article describes best practices for handling and creating exceptions.

## Handling exceptions

The following best practices concern how you handle exceptions:

- [Use try/catch/finally blocks to recover from errors or release resources](#use-trycatchfinally-blocks-to-recover-from-errors-or-release-resources)
- [Handle common conditions to avoid exceptions](#handle-common-conditions-to-avoid-exceptions)
- [Catch cancellation and asynchronous exceptions](#catch-cancellation-and-asynchronous-exceptions)
- [Design classes so that exceptions can be avoided](#design-classes-so-that-exceptions-can-be-avoided)
- [Restore state when methods don't complete due to exceptions](#restore-state-when-methods-dont-complete-due-to-exceptions)
- [Capture and rethrow exceptions properly](#capture-and-rethrow-exceptions-properly)

### Use try/catch/finally blocks to recover from errors or release resources

For code that can potentially generate an exception, and when your app can recover from that exception, use `try`/`catch` blocks around the code. In `catch` blocks, always order exceptions from the most derived to the least derived. (All exceptions derive from the [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) class. More derived exceptions aren't handled by a `catch` clause that's preceded by a `catch` clause for a base exception class.) When your code can't recover from an exception, don't catch that exception. Enable methods further up the call stack to recover if possible.

Clean up resources that are allocated with either `using` statements or `finally` blocks. Prefer `using` statements to automatically clean up resources when exceptions are thrown. Use `finally` blocks to clean up resources that don't implement [System.IDisposable](https://learn.microsoft.com/search/?terms=System.IDisposable). Code in a `finally` clause is almost always executed even when exceptions are thrown.

### Handle common conditions to avoid exceptions

For conditions that are likely to occur but might trigger an exception, consider handling them in a way that avoids the exception. For example, if you try to close a connection that's already closed, you get an `InvalidOperationException`. You can avoid that by using an `if` statement to check the connection state before trying to close it.

[Conceptual.Exception.Handling#2 (complete source file; reference: ./snippets/best-practices/csharp/source.cs#2)](../../../_code/docs/standard/exceptions/snippets/best-practices/csharp/source.cs.md)
[Conceptual.Exception.Handling#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.exception.handling/vb/source.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.exception.handling/vb/source.vb.md)

If you don't check the connection state before closing, you can catch the `InvalidOperationException` exception.

[Conceptual.Exception.Handling#3 (complete source file; reference: ./snippets/best-practices/csharp/source.cs#3)](../../../_code/docs/standard/exceptions/snippets/best-practices/csharp/source.cs.md)
[Conceptual.Exception.Handling#3 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.exception.handling/vb/source.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.exception.handling/vb/source.vb.md)

The approach to choose depends on how often you expect the event to occur.

- Use exception handling if the event doesn't occur often, that is, if the event is truly exceptional and indicates an error, such as an unexpected end-of-file. When you use exception handling, less code is executed in normal conditions.
- Check for error conditions in code if the event happens routinely and could be considered part of normal execution. When you check for common error conditions, less code is executed because you avoid exceptions.

  > **Note:**
  > Up-front checks eliminate exceptions most of the time. However, there can be race conditions where the guarded condition changes between the check and the operation, and in that case, you could still incur an exception.

### Call `Try*` methods to avoid exceptions

If the performance cost of exceptions is prohibitive, some .NET library methods provide alternative forms of error handling. For example, [System.Int32.Parse*](https://learn.microsoft.com/search/?terms=System.Int32.Parse*) throws an [System.OverflowException](https://learn.microsoft.com/search/?terms=System.OverflowException) if the value to be parsed is too large to be represented by [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32). However, [System.Int32.TryParse*](https://learn.microsoft.com/search/?terms=System.Int32.TryParse*) doesn't throw this exception. Instead, it returns a Boolean and has an `out` parameter that contains the parsed valid integer upon success. [System.Collections.Generic.Dictionary`2.TryGetValue*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602.TryGetValue*) has similar behavior for attempting to get a value from a dictionary.

### Catch cancellation and asynchronous exceptions

It's better to catch [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) instead of [System.Threading.Tasks.TaskCanceledException](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCanceledException), which derives from `OperationCanceledException`, when you call an asynchronous method. Many asynchronous methods throw an [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) exception if cancellation is requested. These exceptions enable execution to be efficiently halted and the callstack to be unwound once a cancellation request is observed.

Asynchronous methods store exceptions that are thrown during execution in the task they return. If an exception is stored into the returned task, that exception is thrown when the task is awaited. Usage exceptions, such as [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException), are still thrown synchronously. For more information, see [Asynchronous exceptions](../../csharp/asynchronous-programming/index.md#handle-asynchronous-exceptions).

### Design classes so that exceptions can be avoided

A class can provide methods or properties that enable you to avoid making a call that would trigger an exception. For example, the [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) class provides methods that help determine whether the end of the file has been reached. You can call these methods to avoid the exception that's thrown if you read past the end of the file. The following example shows how to read to the end of a file without triggering an exception:

[Conceptual.Exception.Handling#5 (complete source file; reference: ./snippets/best-practices/csharp/source.cs#5)](../../../_code/docs/standard/exceptions/snippets/best-practices/csharp/source.cs.md)
[Conceptual.Exception.Handling#5 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.exception.handling/vb/source.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.exception.handling/vb/source.vb.md)

Another way to avoid exceptions is to return `null` (or default) for most common error cases instead of throwing an exception. A common error case can be considered a normal flow of control. By returning `null` (or default) in these cases, you minimize the performance impact to an app.

For value types, consider whether to use `Nullable<T>` or `default` as the error indicator for your app. By using `Nullable<Guid>`, `default` becomes `null` instead of `Guid.Empty`. Sometimes, adding `Nullable<T>` can make it clearer when a value is present or absent. Other times, adding `Nullable<T>` can create extra cases to check that aren't necessary and only serve to create potential sources of errors.

### Restore state when methods don't complete due to exceptions

Callers should be able to assume that there are no side effects when an exception is thrown from a method. For example, if you have code that transfers money by withdrawing from one account and depositing in another account, and an exception is thrown while executing the deposit, you don't want the withdrawal to remain in effect.

```csharp
public void TransferFunds(Account from, Account to, decimal amount)
{
    from.Withdrawal(amount);
    // If the deposit fails, the withdrawal shouldn't remain in effect.
    to.Deposit(amount);
}
```

```vb
Public Sub TransferFunds(from As Account, [to] As Account, amount As Decimal)
    from.Withdrawal(amount)
    ' If the deposit fails, the withdrawal shouldn't remain in effect.
    [to].Deposit(amount)
End Sub
```

The preceding method doesn't directly throw any exceptions. However, you must write the method so that the withdrawal is reversed if the deposit operation fails.

One way to handle this situation is to catch any exceptions thrown by the deposit transaction and roll back the withdrawal.

```csharp
private static void TransferFunds(Account from, Account to, decimal amount)
{
    string withdrawalTrxID = from.Withdrawal(amount);
    try
    {
        to.Deposit(amount);
    }
    catch
    {
        from.RollbackTransaction(withdrawalTrxID);
        throw;
    }
}
```

```vb
Private Shared Sub TransferFunds(from As Account, [to] As Account, amount As Decimal)
    Dim withdrawalTrxID As String = from.Withdrawal(amount)
    Try
        [to].Deposit(amount)
    Catch
        from.RollbackTransaction(withdrawalTrxID)
        Throw
    End Try
End Sub
```

This example illustrates the use of `throw` to rethrow the original exception, making it easier for callers to see the real cause of the problem without having to examine the [System.Exception.InnerException](https://learn.microsoft.com/search/?terms=System.Exception.InnerException) property. An alternative is to throw a new exception and include the original exception as the inner exception.

```csharp
catch (Exception ex)
{
    from.RollbackTransaction(withdrawalTrxID);
    throw new TransferFundsException("Withdrawal failed.", innerException: ex)
    {
        From = from,
        To = to,
        Amount = amount
    };
}
```

```vb
Catch ex As Exception
    from.RollbackTransaction(withdrawalTrxID)
    Throw New TransferFundsException("Withdrawal failed.", innerException:=ex) With
    {
        .From = from,
        .[To] = [to],
        .Amount = amount
    }
End Try
```

### Capture and rethrow exceptions properly

Once an exception is thrown, part of the information it carries is the stack trace. The stack trace is a list of the method call hierarchy that starts with the method that throws the exception and ends with the method that catches the exception. If you rethrow an exception by specifying the exception in the `throw` statement, for example, `throw e`, the stack trace is restarted at the current method and the list of method calls between the original method that threw the exception and the current method is lost. To keep the original stack trace information with the exception, there are two options that depend on where you're rethrowing the exception from:

- If you rethrow the exception from within the handler (`catch` block) that's caught the exception instance, use the `throw` statement without specifying the exception. Code analysis rule [CA2200](../../fundamentals/code-analysis/quality-rules/ca2200.md) helps you find places in your code where you might inadvertently lose stack trace information.
- If you're rethrowing the exception from somewhere other than the handler (`catch` block), use [System.Runtime.ExceptionServices.ExceptionDispatchInfo.Capture(System.Exception)](https://learn.microsoft.com/search/?terms=System.Runtime.ExceptionServices.ExceptionDispatchInfo.Capture(System.Exception)) to capture the exception in the handler and [System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw](https://learn.microsoft.com/search/?terms=System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw) when you want to rethrow it. You can use the [System.Runtime.ExceptionServices.ExceptionDispatchInfo.SourceException](https://learn.microsoft.com/search/?terms=System.Runtime.ExceptionServices.ExceptionDispatchInfo.SourceException) property to inspect the captured exception.

The following example shows how the [System.Runtime.ExceptionServices.ExceptionDispatchInfo](https://learn.microsoft.com/search/?terms=System.Runtime.ExceptionServices.ExceptionDispatchInfo) class can be used, and what the output might look like.

```csharp
ExceptionDispatchInfo? edi = null;
try
{
    var txt = File.ReadAllText(@"C:\temp\file.txt");
}
catch (FileNotFoundException e)
{
    edi = ExceptionDispatchInfo.Capture(e);
}

// ...

Console.WriteLine("I was here.");

if (edi is not null)
    edi.Throw();
```

If the file in the example code doesn't exist, the following output is produced:

```output
I was here.
Unhandled exception. System.IO.FileNotFoundException: Could not find file 'C:\temp\file.txt'.
File name: 'C:\temp\file.txt'
   at Microsoft.Win32.SafeHandles.SafeFileHandle.CreateFile(String fullPath, FileMode mode, FileAccess access, FileShare share, FileOptions options)
   at Microsoft.Win32.SafeHandles.SafeFileHandle.Open(String fullPath, FileMode mode, FileAccess access, FileShare share, FileOptions options, Int64 preallocationSize, Nullable`1 unixCreateMode)
   at System.IO.Strategies.OSFileStreamStrategy..ctor(String path, FileMode mode, FileAccess access, FileShare share, FileOptions options, Int64 preallocationSize, Nullable`1 unixCreateMode)
   at System.IO.Strategies.FileStreamHelpers.ChooseStrategyCore(String path, FileMode mode, FileAccess access, FileShare share, FileOptions options, Int64 preallocationSize, Nullable`1 unixCreateMode)
   at System.IO.StreamReader.ValidateArgsAndOpenPath(String path, Encoding encoding, Int32 bufferSize)
   at System.IO.File.ReadAllText(String path, Encoding encoding)
   at Example.ProcessFile.Main() in C:\repos\ConsoleApp1\Program.cs:line 12
--- End of stack trace from previous location ---
   at Example.ProcessFile.Main() in C:\repos\ConsoleApp1\Program.cs:line 24
```

## Throwing exceptions

The following best practices concern how you throw exceptions:

- [Use predefined exception types](#use-predefined-exception-types)
- [Use exception builder methods](#use-exception-builder-methods)
- [Include a localized string message](#include-a-localized-string-message)
- [Use proper grammar](#use-proper-grammar)
- [Place throw statements well](#place-throw-statements-well)
- [Don't raise exceptions in finally clauses](#dont-raise-exceptions-in-finally-clauses)
- [Don't raise exceptions from unexpected places](#dont-raise-exceptions-from-unexpected-places)
- [Throw argument validation exceptions synchronously](#throw-argument-validation-exceptions-synchronously)

### Use predefined exception types

Introduce a new exception class only when a predefined one doesn't apply. For example:

- If a property set or method call isn't appropriate given the object's current state, throw an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException) exception.
- If invalid parameters are passed, throw an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) exception or one of the predefined classes that derive from [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException).

> **Note:**
> While it's best to use predefined exception types when possible, you shouldn't raise some *reserved* exception types, such as [System.AccessViolationException](https://learn.microsoft.com/search/?terms=System.AccessViolationException), [System.IndexOutOfRangeException](https://learn.microsoft.com/search/?terms=System.IndexOutOfRangeException), [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) and [System.StackOverflowException](https://learn.microsoft.com/search/?terms=System.StackOverflowException). For more information, see [CA2201: Don't raise reserved exception types](../../fundamentals/code-analysis/quality-rules/ca2201.md).

### Use exception builder methods

It's common for a class to throw the same exception from different places in its implementation. To avoid excessive code, create a helper method that creates the exception and returns it. For example:

[Conceptual.Exception.Handling#6 (complete source file; reference: ./snippets/best-practices/csharp/source.cs#6)](../../../_code/docs/standard/exceptions/snippets/best-practices/csharp/source.cs.md)
[Conceptual.Exception.Handling#6 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.exception.handling/vb/source.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.exception.handling/vb/source.vb.md)

Some key .NET exception types have such static `throw` helper methods that allocate and throw the exception. You should call these methods instead of constructing and throwing the corresponding exception type:

- [System.ArgumentNullException.ThrowIfNull*](https://learn.microsoft.com/search/?terms=System.ArgumentNullException.ThrowIfNull*)
- [System.ArgumentException.ThrowIfNullOrEmpty(System.String,System.String)](https://learn.microsoft.com/search/?terms=System.ArgumentException.ThrowIfNullOrEmpty(System.String%2CSystem.String))
- [System.ArgumentException.ThrowIfNullOrWhiteSpace(System.String,System.String)](https://learn.microsoft.com/search/?terms=System.ArgumentException.ThrowIfNullOrWhiteSpace(System.String%2CSystem.String))
- [System.ArgumentOutOfRangeException.ThrowIfZero``1(``0,System.String)](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException.ThrowIfZero%60%601(%60%600%2CSystem.String))
- [System.ArgumentOutOfRangeException.ThrowIfNegative``1(``0,System.String)](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException.ThrowIfNegative%60%601(%60%600%2CSystem.String))
- [System.ArgumentOutOfRangeException.ThrowIfEqual``1(``0,``0,System.String)](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException.ThrowIfEqual%60%601(%60%600%2C%60%600%2CSystem.String))
- [System.ArgumentOutOfRangeException.ThrowIfLessThan``1(``0,``0,System.String)](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException.ThrowIfLessThan%60%601(%60%600%2C%60%600%2CSystem.String))
- [System.ArgumentOutOfRangeException.ThrowIfNotEqual``1(``0,``0,System.String)](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException.ThrowIfNotEqual%60%601(%60%600%2C%60%600%2CSystem.String))
- [System.ArgumentOutOfRangeException.ThrowIfNegativeOrZero``1(``0,System.String)](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException.ThrowIfNegativeOrZero%60%601(%60%600%2CSystem.String))
- [System.ArgumentOutOfRangeException.ThrowIfGreaterThan``1(``0,``0,System.String)](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException.ThrowIfGreaterThan%60%601(%60%600%2C%60%600%2CSystem.String))
- [System.ArgumentOutOfRangeException.ThrowIfLessThanOrEqual``1(``0,``0,System.String)](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException.ThrowIfLessThanOrEqual%60%601(%60%600%2C%60%600%2CSystem.String))
- [System.ArgumentOutOfRangeException.ThrowIfGreaterThanOrEqual``1(``0,``0,System.String)](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException.ThrowIfGreaterThanOrEqual%60%601(%60%600%2C%60%600%2CSystem.String))
- [System.ObjectDisposedException.ThrowIf*](https://learn.microsoft.com/search/?terms=System.ObjectDisposedException.ThrowIf*)

> **Tip:**
> The following code analysis rules can help you find places in your code where you can take advantage of these static `throw` helpers: [CA1510](../../fundamentals/code-analysis/quality-rules/ca1510.md), [CA1511](../../fundamentals/code-analysis/quality-rules/ca1511.md), [CA1512](../../fundamentals/code-analysis/quality-rules/ca1512.md), and [CA1513](../../fundamentals/code-analysis/quality-rules/ca1513.md).

If you're implementing an asynchronous method, call [System.Threading.CancellationToken.ThrowIfCancellationRequested](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.ThrowIfCancellationRequested) instead of checking if cancellation was requested and then constructing and throwing [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException). For more information, see [CA2250](../../fundamentals/code-analysis/quality-rules/ca2250.md).

### Include a localized string message

The error message the user sees is derived from the [System.Exception.Message](https://learn.microsoft.com/search/?terms=System.Exception.Message) property of the exception that was thrown, and not from the name of the exception class. Typically, you assign a value to the [System.Exception.Message](https://learn.microsoft.com/search/?terms=System.Exception.Message) property by passing the message string to the `message` argument of an [Exception constructor](https://learn.microsoft.com/search/?terms=System.Exception.%2523ctor%252A).

For localized applications, you should provide a localized message string for every exception that your application can throw. You use resource files to provide localized error messages. For information on localizing applications and retrieving localized strings, see the following articles:

- [How to: Create user-defined exceptions with localized exception messages](how-to-create-localized-exception-messages.md)
- [Resources in .NET apps](../../core/extensions/resources.md)
- [System.Resources.ResourceManager](https://learn.microsoft.com/search/?terms=System.Resources.ResourceManager)

### Use proper grammar

Write clear sentences and include ending punctuation. Each sentence in the string assigned to the [System.Exception.Message](https://learn.microsoft.com/search/?terms=System.Exception.Message) property should end in a period. For example, "The log table has overflowed." uses correct grammar and punctuation.

### Place throw statements well

Place throw statements where the stack trace is helpful. The stack trace begins at the statement where the exception is thrown and ends at the `catch` statement that catches the exception.

### Don't raise exceptions in finally clauses

Don't raise exceptions in `finally` clauses. For more information, see code analysis rule [CA2219](../../fundamentals/code-analysis/quality-rules/ca2219.md).

### Don't raise exceptions from unexpected places

Some methods, such as `Equals`, `GetHashCode`, and `ToString` methods, static constructors, and equality operators, shouldn't throw exceptions. For more information, see code analysis rule [CA1065](../../fundamentals/code-analysis/quality-rules/ca1065.md).

### Throw argument validation exceptions synchronously

In task-returning methods, you should validate arguments and throw any corresponding exceptions, such as [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) and [System.ArgumentNullException](https://learn.microsoft.com/search/?terms=System.ArgumentNullException), before entering the asynchronous part of the method. Exceptions that are thrown in the asynchronous part of the method are stored in the returned task and don't emerge until, for example, the task is awaited. For more information, see [Exceptions in task-returning methods](../../csharp/fundamentals/exceptions/creating-and-throwing-exceptions.md#exceptions-in-task-returning-methods).

## Custom exception types

The following best practices concern custom exception types:

- [End exception class names with `Exception`](#end-exception-class-names-with-exception)
- [Include three constructors](#include-three-constructors)
- [Provide more properties as needed](#provide-more-properties-as-needed)

### End exception class names with `Exception`

When a custom exception is necessary, name it appropriately and derive it from the [System.Exception](https://learn.microsoft.com/search/?terms=System.Exception) class. For example:

[Conceptual.Exception.Handling#4 (complete source file; reference: ./snippets/best-practices/csharp/source.cs#4)](../../../_code/docs/standard/exceptions/snippets/best-practices/csharp/source.cs.md)
[Conceptual.Exception.Handling#4 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.exception.handling/vb/source.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/conceptual.exception.handling/vb/source.vb.md)

### Include three constructors

Use at least the three common constructors when creating your own exception classes: the parameterless constructor, a constructor that takes a string message, and a constructor that takes a string message and an inner exception.

- [System.Exception.%23ctor](https://learn.microsoft.com/search/?terms=System.Exception.%2523ctor), which uses default values.
- [System.Exception.%23ctor%28System.String%29](https://learn.microsoft.com/search/?terms=System.Exception.%2523ctor%2528System.String%2529), which accepts a string message.
- [System.Exception.%23ctor%28System.String%2CSystem.Exception%29](https://learn.microsoft.com/search/?terms=System.Exception.%2523ctor%2528System.String%252CSystem.Exception%2529), which accepts a string message and an inner exception.

For an example, see [How to: Create user-defined exceptions](how-to-create-user-defined-exceptions.md).

### Provide more properties as needed

Provide more properties for an exception (in addition to the custom message string) only when there's a programmatic scenario where the additional information is useful. For example, the [System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException) provides the [System.IO.FileNotFoundException.FileName](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException.FileName) property.

### See also

- [Design guidelines for exceptions](../design-guidelines/exceptions.md)
