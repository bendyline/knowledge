---
description: "Learn more about: Bookmarks"
title: "Bookmarks - WF"
ms.date: "03/30/2017"
ms.assetid: 9b51a346-09ae-455c-a70a-e2264ddeb9e2
---
# Bookmarks

Bookmarks are the mechanism that enables an activity to passively wait for input without holding onto a workflow thread. When an activity signals that it is waiting for stimulus, it can create a bookmark. This indicates to the runtime that the activity’s execution should not be considered complete even when the currently executing method (which created the [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark)) returns.

## Bookmark Basics

 A [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark) represents a point at which execution can be resumed (and through which input can be delivered) within a workflow instance. Typically, a [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark) is given a name and external (host or extension) code is responsible for resuming the bookmark with relevant data. When a [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark) is resumed, the workflow runtime schedules the [System.Activities.BookmarkCallback](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkCallback) delegate that was associated with that [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark) at the time of its creation.

## Bookmark Options

 The [System.Activities.BookmarkOptions](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkOptions) class specifies the type of [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark) being created. The possible non mutually-exclusive values are [System.Activities.BookmarkOptions.None](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkOptions.None), [System.Activities.BookmarkOptions.MultipleResume](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkOptions.MultipleResume), and [System.Activities.BookmarkOptions.NonBlocking](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkOptions.NonBlocking). Use [System.Activities.BookmarkOptions.None](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkOptions.None), the default, when creating a [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark) that is expected to be resumed exactly once. Use [System.Activities.BookmarkOptions.MultipleResume](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkOptions.MultipleResume) when creating a [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark) that can be resumed multiple times. Use [System.Activities.BookmarkOptions.NonBlocking](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkOptions.NonBlocking) when creating a [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark) that might never be resumed. Unlike bookmarks created using the default [System.Activities.BookmarkOptions](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkOptions), [System.Activities.BookmarkOptions.NonBlocking](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkOptions.NonBlocking) bookmarks do not prevent an activity from completing.

## Bookmark Resumption

 Bookmarks can be resumed by code outside of a workflow using one of the [System.Activities.WorkflowApplication.ResumeBookmark*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplication.ResumeBookmark*) overloads. In this example, a `ReadLine` activity is created. When executed, the `ReadLine` activity creates a [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark), registers a callback, and then waits for the [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark) to be resumed. When it is resumed, the `ReadLine` activity assigns the data that was passed with the [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark) to its [System.Activities.Activity`1.Result*](https://learn.microsoft.com/search/?terms=System.Activities.Activity%601.Result*) argument.

```csharp
public sealed class ReadLine : NativeActivity<string>
{
    [RequiredArgument]
    public  InArgument<string> BookmarkName { get; set; }

    protected override void Execute(NativeActivityContext context)
    {
        // Create a Bookmark and wait for it to be resumed.
        context.CreateBookmark(BookmarkName.Get(context),
            new BookmarkCallback(OnResumeBookmark));
    }

    // NativeActivity derived activities that do asynchronous operations by calling
    // one of the CreateBookmark overloads defined on System.Activities.NativeActivityContext
    // must override the CanInduceIdle property and return true.
    protected override bool CanInduceIdle
    {
        get { return true; }
    }

    public void OnResumeBookmark(NativeActivityContext context, Bookmark bookmark, object obj)
    {
        // When the Bookmark is resumed, assign its value to
        // the Result argument.
        Result.Set(context, (string)obj);
    }
}
```

 In this example, a workflow is created that uses the `ReadLine` activity to gather the user’s name and display it to the console window. The host application performs the actual work of gathering the input and passes it to the workflow by resuming the [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark).

```csharp
Variable<string> name = new Variable<string>
{
    Name = "name"
};

Activity wf = new Sequence
{
    Variables =
    {
        name
    },
    Activities =
    {
        new WriteLine()
        {
            Text = "What is your name?"
        },
        new ReadLine()
        {
            BookmarkName = "UserName",
            Result = name
        },
        new WriteLine()
        {
            Text = new InArgument<string>((env) => "Hello, " + name.Get(env))
        }
    }
};

AutoResetEvent syncEvent = new AutoResetEvent(false);

// Create the WorkflowApplication using the desired
// workflow definition.
WorkflowApplication wfApp = new WorkflowApplication(wf);

// Handle the desired lifecycle events.
wfApp.Completed = delegate(WorkflowApplicationCompletedEventArgs e)
{
    // Signal the host that the workflow is complete.
    syncEvent.Set();
};

// Start the workflow.
wfApp.Run();

// Collect the user's name and resume the bookmark.
// Bookmark resumption only occurs when the workflow
// is idle. If a call to ResumeBookmark is made and the workflow
// is not idle, ResumeBookmark blocks until the workflow becomes
// idle before resuming the bookmark.
wfApp.ResumeBookmark("UserName", Console.ReadLine());

// Wait for Completed to arrive and signal that
// the workflow is complete.
syncEvent.WaitOne();
```

 When the `ReadLine` activity is executed, it creates a [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark) named `UserName` and then waits for the bookmark to be resumed. The host collects the desired data and then resumes the [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark). The workflow resumes, displays the name, and then completes. Note that no synchronization code is required with regard to resuming the bookmark. A [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark) can only be resumed when the workflow is idle, and if the workflow is not idle, the call to [System.Activities.WorkflowApplication.ResumeBookmark*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplication.ResumeBookmark*) blocks until the workflow becomes idle.

## Bookmark Resumption Result

 [System.Activities.WorkflowApplication.ResumeBookmark*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplication.ResumeBookmark*) returns a [System.Activities.BookmarkResumptionResult](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkResumptionResult) enumeration value to indicate the results of the bookmark resumption request. The possible return values are [System.Activities.BookmarkResumptionResult.Success](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkResumptionResult.Success), [System.Activities.BookmarkResumptionResult.NotReady](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkResumptionResult.NotReady), and [System.Activities.BookmarkResumptionResult.NotFound](https://learn.microsoft.com/search/?terms=System.Activities.BookmarkResumptionResult.NotFound). Hosts and extensions can use this value to determine how to proceed.
