---
description: "Learn more about: Exposing data with CacheMetadata"
title: "Exposing data with CacheMetadata"
ms.date: "03/30/2017"
ms.assetid: 34832f23-e93b-40e6-a80b-606a855a00d9
---

# Exposing data with CacheMetadata

Before executing an activity, the workflow runtime obtains all of the information about the activity that it needs in order to maintain its execution. The workflow runtime gets this information during the execution of the [System.Activities.Activity.CacheMetadata*](https://learn.microsoft.com/search/?terms=System.Activities.Activity.CacheMetadata*) method. The default implementation of this method provides the runtime with all of the public arguments, variables, and child activities exposed by the activity at the time it is executed; if the activity needs to give more information to the runtime than this (such as private members, or activities to be scheduled by the activity), this method can be overridden to provide it.

## Default CacheMetadata behavior

The default implementation of [System.Activities.NativeActivity.CacheMetadata*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity.CacheMetadata*) for activities that derive from [System.Activities.NativeActivity](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity) processes the following method types in the following ways:

- [System.Activities.InArgument`1](https://learn.microsoft.com/search/?terms=System.Activities.InArgument%601), [System.Activities.OutArgument`1](https://learn.microsoft.com/search/?terms=System.Activities.OutArgument%601), or [System.Activities.InOutArgument`1](https://learn.microsoft.com/search/?terms=System.Activities.InOutArgument%601) (generic arguments): These arguments are exposed to the runtime as arguments with a name and type equal to the exposed property name and type, the appropriate argument direction, and some validation data.

- [System.Activities.Variable](https://learn.microsoft.com/search/?terms=System.Activities.Variable) or any subclass thereof: These members are exposed to the runtime as public variables.

- [System.Activities.Activity](https://learn.microsoft.com/search/?terms=System.Activities.Activity) or any subclass thereof: These members are exposed to the runtime as public child activities. The default behavior can be implemented explicitly by calling [System.Activities.ActivityMetadata.AddImportedChild*](https://learn.microsoft.com/search/?terms=System.Activities.ActivityMetadata.AddImportedChild*), passing in the child activity.

- [System.Activities.ActivityDelegate](https://learn.microsoft.com/search/?terms=System.Activities.ActivityDelegate) or any subclass thereof: These members are exposed to the runtime as public delegates.

- [System.Collections.ICollection](https://learn.microsoft.com/search/?terms=System.Collections.ICollection) of type [System.Activities.Variable](https://learn.microsoft.com/search/?terms=System.Activities.Variable): All elements in the collection are exposed to the runtime as public variables.

- [System.Collections.ICollection](https://learn.microsoft.com/search/?terms=System.Collections.ICollection) of type [System.Activities.Activity](https://learn.microsoft.com/search/?terms=System.Activities.Activity): All elements in the collection are exposed to the runtime as public children.

- [System.Collections.ICollection](https://learn.microsoft.com/search/?terms=System.Collections.ICollection) of type [System.Activities.ActivityDelegate](https://learn.microsoft.com/search/?terms=System.Activities.ActivityDelegate): All elements in the collection are exposed to the runtime as public delegates.

The [System.Activities.Activity.CacheMetadata*](https://learn.microsoft.com/search/?terms=System.Activities.Activity.CacheMetadata*) for activities that derive from [System.Activities.Activity](https://learn.microsoft.com/search/?terms=System.Activities.Activity), [System.Workflow.Activities.CodeActivity](https://learn.microsoft.com/search/?terms=System.Workflow.Activities.CodeActivity), and [System.Activities.AsyncCodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity) also function as above, except for the following differences:

- Classes that derive from [System.Activities.Activity](https://learn.microsoft.com/search/?terms=System.Activities.Activity) cannot schedule child activities or delegates, so such members are exposed as imported children and delegates; the

- Classes that derive from [System.Activities.CodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.CodeActivity) and [System.Activities.AsyncCodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity) do not support variables, children, or delegates, so only arguments will be exposed.

## Overriding CacheMetadata to provide information to the runtime

The following code snippet demonstrates how to add information about members to an activity’s metadata during the execution of the [System.Activities.Activity.CacheMetadata*](https://learn.microsoft.com/search/?terms=System.Activities.Activity.CacheMetadata*) method. Note that the base of the method is called to cache all public data about the activity.

```csharp
protected override void CacheMetadata(NativeActivityMetadata metadata)
{
    base.CacheMetadata(metadata);
    metadata.AddImplementationChild(this._writeLine);
    metadata.AddVariable(this._myVariable);
    metadata.AddImplementationVariable(this._myImplementationVariable);

    RuntimeArgument argument = new RuntimeArgument("MyArgument", ArgumentDirection.In, typeof(SomeType));
    metadata.Bind(argument, this.SomeName);
    metadata.AddArgument(argument);
}
```

## Using CacheMetadata to expose implementation children

In order to pass data to child activities that are to be scheduled by an activity using variables, it is necessary to add the variables as implementation variables; public variables cannot have their values set this way. The reason for this is that activities are intended to be executed more as implementations of functions (which have parameters), rather than encapsulated classes (which have properties). However, there are situations in which the arguments must be explicitly set, such as when using [System.Activities.NativeActivityContext.ScheduleActivity*](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext.ScheduleActivity*), since the scheduled activity doesn't have access to the parent activity's arguments in the way a child activity would.

The following code snippet demonstrates how to pass an argument from a native activity into a scheduled activity using [System.Activities.Activity.CacheMetadata*](https://learn.microsoft.com/search/?terms=System.Activities.Activity.CacheMetadata*).

```csharp
public sealed class ChildActivity : NativeActivity
{
    public WriteLine _writeLine;
    public InArgument<string> Message { get; set; }
    private Variable<string> MessageVariable { get; set; }
    public ChildActivity()
    {
        MessageVariable = new Variable<string>();
        _writeLine = new WriteLine
        {
            Text = new InArgument<string>(MessageVariable),
        };
    }
    protected override void CacheMetadata(NativeActivityMetadata metadata)
    {
        base.CacheMetadata(metadata);
        metadata.AddImplementationVariable(this.MessageVariable);
        metadata.AddImplementationChild(this._writeLine);
    }
    protected override void Execute(NativeActivityContext context)
    {
        string configuredMessage = context.GetValue(Message);
        context.SetValue(MessageVariable, configuredMessage);
        context.ScheduleActivity(this._writeLine);
    }
}
```
