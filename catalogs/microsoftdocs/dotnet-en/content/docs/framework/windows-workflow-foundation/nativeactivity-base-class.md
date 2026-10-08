---
description: "Learn more about: NativeActivity Base Class"
title: "NativeActivity Base Class"
ms.date: "03/30/2017"
ms.assetid: 254a4c50-425b-426d-a32f-0f7234925bac
---
# NativeActivity Base Class

[System.Activities.NativeActivity](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity) is an abstract class with a protected constructor. Like [System.Activities.CodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.CodeActivity), [System.Activities.NativeActivity](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity) is used for writing imperative behavior by implementing an [System.Activities.NativeActivity.Execute*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity.Execute*) method. Unlike [System.Activities.CodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.CodeActivity), [System.Activities.NativeActivity](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity) has access to all of the exposed features of the workflow runtime through the [System.Activities.NativeActivityContext](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext) object passed to the [System.Activities.NativeActivity.Execute*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity.Execute*) method.

## Using NativeActivityContext

 Features of the workflow runtime can be accessed from within the [System.Activities.NativeActivity.Execute*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity.Execute*) method by using members of the `context` parameter, of type [System.Activities.NativeActivityContext](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext). The features available through [System.Activities.NativeActivityContext](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext) include the following:

- Getting and setting of arguments and variables.

- Scheduling child activities with [System.Activities.NativeActivityContext.ScheduleActivity*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext.ScheduleActivity*)

- Aborting activity execution using [System.Activities.NativeActivityContext.Abort*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext.Abort*).

- Canceling child execution using [System.Activities.NativeActivityContext.CancelChild*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext.CancelChild*) and [System.Activities.NativeActivityContext.CancelChildren*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext.CancelChildren*).

- Access to activity bookmarks using such methods as [System.Activities.NativeActivityContext.CreateBookmark*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext.CreateBookmark*), [System.Activities.NativeActivityContext.RemoveBookmark*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext.RemoveBookmark*), and [System.Activities.NativeActivityContext.ResumeBookmark*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext.ResumeBookmark*).

- Custom tracking features using [System.Activities.CodeActivityContext.Track*](https://learn.microsoft.com/search/?terms=System.Activities.CodeActivityContext.Track*).

- Access to the activity’s execution properties and value properties using [System.Activities.CodeActivityContext.GetProperty*](https://learn.microsoft.com/search/?terms=System.Activities.CodeActivityContext.GetProperty*) and [System.Activities.NativeActivityContext.GetValue*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext.GetValue*).

- Scheduling activity actions and functions using [System.Activities.NativeActivityContext.ScheduleAction*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext.ScheduleAction*) and [System.Activities.NativeActivityContext.ScheduleFunc*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext.ScheduleFunc*).

### To create a custom activity that inherits from NativeActivity

1. OpenVisual Studio 2010.

2. Select **File**, **New**, and then **Project**. Select **Workflow 4.0** under **Visual C#** in the **Project Types** window, and select the **v2010** node. Select **Activity Library** in the **Templates** window. Name the new project HelloActivity.

3. Right-click Activity1.xaml in the HelloActivity project and select **Delete**.

4. Right-click the HelloActivity project and select **Add**, and then **Class**. Name the new class HelloActivity.cs.

5. In the HelloActivity.cs file, add the following `using` directives.

    ```csharp
    using System.Activities;
    using System.Activities.Statements;
    ```

6. Make the new class inherit from [System.Activities.NativeActivity](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity) by adding a base class to the class declaration.

    ```csharp
    class HelloActivity : NativeActivity
    ```

7. Add functionality to the class by adding an [System.Activities.NativeActivity.Execute*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity.Execute*) method.

    ```csharp
    protected override void Execute(NativeActivityContext context)
    {
        Console.WriteLine("Hello World!");
    }
    ```

8. Override the [System.Activities.NativeActivity.CacheMetadata*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity.CacheMetadata*) method and call the appropriate Add method to let the workflow runtime know about the custom activity’s variables, arguments, children, and delegates. For more information see the [System.Activities.NativeActivityMetadata](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityMetadata) class.

9. Use the [System.Activities.NativeActivityContext](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext) object to schedule a bookmark. See [System.Activities.WorkflowApplicationIdleEventArgs.Bookmarks*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplicationIdleEventArgs.Bookmarks*) for details on how to create, schedule, and resume a bookmark.

    ```csharp
    protected override void Execute(NativeActivityContext context)
        {
            // Create a Bookmark and wait for it to be resumed.
            context.CreateBookmark(BookmarkName.Get(context),
                new BookmarkCallback(OnResumeBookmark));
        }
    ```
