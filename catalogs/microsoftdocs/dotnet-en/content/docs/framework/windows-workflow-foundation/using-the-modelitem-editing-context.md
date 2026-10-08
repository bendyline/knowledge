---
description: "Learn more about: Using the ModelItem Editing Context"
title: "Using the ModelItem Editing Context"
ms.date: "03/30/2017"
ms.assetid: 7f9f1ea5-0147-4079-8eca-be94f00d3aa1
---
# Using the ModelItem Editing Context

The [System.Activities.Presentation.Model.ModelItem](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Model.ModelItem) editing context is the object that the host application uses to communicate with the designer. [System.Activities.Presentation.EditingContext](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.EditingContext) exposes two methods, [System.Activities.Presentation.EditingContext.Items*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.EditingContext.Items*) and [System.Activities.Presentation.EditingContext.Services*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.EditingContext.Services*), which can be used

## The Items collection

 The [System.Activities.Presentation.EditingContext.Items*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.EditingContext.Items*) collection is used to access data that is shared between the host and the designer, or data that is available to all designers. This collection has the following capabilities, accessed via the [System.Activities.Presentation.ContextItemManager](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.ContextItemManager) class:

1. [System.Activities.Presentation.ContextItemManager.GetValue*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.ContextItemManager.GetValue*)

2. [System.Activities.Presentation.ContextItemManager.Subscribe*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.ContextItemManager.Subscribe*)

3. [System.Activities.Presentation.ContextItemManager.Unsubscribe*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.ContextItemManager.Unsubscribe*)

4. [System.Activities.Presentation.ContextItemManager.SetValue*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.ContextItemManager.SetValue*)

## The Services collection

 The [System.Activities.Presentation.EditingContext.Services*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.EditingContext.Services*) collection is used to access services that the designer uses to interact with the host, or services that all designers use. This collection has the following methods of note:

1. [System.Activities.Presentation.ServiceManager.Publish*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.ServiceManager.Publish*)

2. [System.Activities.Presentation.ServiceManager.Subscribe*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.ServiceManager.Subscribe*)

3. [System.Activities.Presentation.ServiceManager.Unsubscribe*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.ServiceManager.Unsubscribe*)

4. [System.Activities.Presentation.ServiceManager.GetService*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.ServiceManager.GetService*)

## Assigning a designer an activity

 To specify which designer an activity uses, the Designer attribute is used.

```csharp
[Designer(typeof(MyClassDesigner))]
public sealed class MyClass : CodeActivity
{
}
```

## Creating a service

 To create a service that serves as a conduit of information between the designer and the host, an interface and an implementation must be created. The interface is used by the [System.Activities.Presentation.ServiceManager.Publish*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.ServiceManager.Publish*) method to define the members of the service, and the implementation contains the logic for the service. In the following code example, a service interface and implementation are created.

```csharp
public interface IMyService
    {
        IEnumerable<string> GetValues(string DisplayName);
    }

    public class MyServiceImpl : IMyService
    {
        public IEnumerable<string> GetValues(string DisplayName)
        {
            return new string[]  {
                DisplayName + " One",
                DisplayName + " Two",
                "Three " + DisplayName
            } ;
        }
    }
```

## Publishing a service

 For a designer to consume a service, it must first be published by the host using the [System.Activities.Presentation.ServiceManager.Publish*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.ServiceManager.Publish*) method.

```csharp
this.Context.Services.Publish<IMyService>(new MyServiceImpl);
```

## Subscribing to a service

 The designer obtains access to the service using the [System.Activities.Presentation.ServiceManager.Subscribe*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.ServiceManager.Subscribe*) method in the [System.Activities.Presentation.WorkflowViewElement.OnModelItemChanged*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.WorkflowViewElement.OnModelItemChanged*) method. The following code snippet demonstrates how to subscribe to a service.

```csharp
protected override void OnModelItemChanged(object newItem)
{
    if (!subscribed)
    {
        this.Context.Services.Subscribe<IMyService>(
            servInstance =>
            {
                listBox1.ItemsSource = servInstance.GetValues(this.ModelItem.Properties["DisplayName"].ComputedValue.ToString());
            }
            );
        subscribed = true;
    }
}
```

## Sharing data using the Items collection

 Using the Items collection is similar to using the Services collection, except that [System.Activities.Presentation.ContextItemManager.SetValue*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.ContextItemManager.SetValue*) is used instead of Publish. This collection is more appropriate for sharing simple data between the designers and the host, rather than complex functionality.

## EditingContext host items and services

 The .NET Framework provides a number of built-in items and services accessed through the editing context.

 Items:

- [System.Activities.Presentation.Hosting.AssemblyContextControlItem](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Hosting.AssemblyContextControlItem): Manages the list of referenced local assemblies that will be used inside the workflow for controls (such as the expression editor).

- [System.Activities.Presentation.Hosting.ReadOnlyState](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Hosting.ReadOnlyState): Indicates whether the designer is in a read-only state.

- [System.Activities.Presentation.View.Selection](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.View.Selection): Defines the collection of objects that are currently selected.

- [System.Activities.Presentation.Hosting.WorkflowCommandExtensionItem](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Hosting.WorkflowCommandExtensionItem):

- [System.Activities.Presentation.WorkflowFileItem](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.WorkflowFileItem): Provides information on the file that the current editing session is based on.

 Services:

- [System.Activities.Presentation.Model.AttachedPropertiesService](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Model.AttachedPropertiesService): Allows properties to be added to the current instance, using [System.Activities.Presentation.Model.AttachedPropertiesService.AddProperty*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Model.AttachedPropertiesService.AddProperty*).

- [System.Activities.Presentation.View.DesignerView](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.View.DesignerView): Allows access to the properties of the designer canvas.

- [System.Activities.Presentation.IActivityToolboxService](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.IActivityToolboxService): Allows the contents of the toolbox to be updated.

- [System.Activities.Presentation.Hosting.ICommandService](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Hosting.ICommandService): Used to integrate designer commands (such as Context Menu) with custom-provided service implementations.

- [System.Activities.Presentation.Debug.IDesignerDebugView](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Debug.IDesignerDebugView): Provides functionality for the designer debugger.

- [System.Activities.Presentation.View.IExpressionEditorService](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.View.IExpressionEditorService): Provides access to the Expression Editor dialog.

- [System.Activities.Presentation.IIntegratedHelpService](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.IIntegratedHelpService): Provides the designer with integrated help functionality.

- [System.Activities.Presentation.Validation.IValidationErrorService](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Validation.IValidationErrorService): Provides access to validation errors using [System.Activities.Presentation.Validation.IValidationErrorService.ShowValidationErrors*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Validation.IValidationErrorService.ShowValidationErrors*).

- [System.Activities.Presentation.IWorkflowDesignerStorageService](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.IWorkflowDesignerStorageService): Provides an internal service to store and retrieve data. This service is used internally by the .NET Framework, and is not intended for external use.

- [System.Activities.Presentation.IXamlLoadErrorService](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.IXamlLoadErrorService): Provides access to the XAML load error collection using [System.Activities.Presentation.IXamlLoadErrorService.ShowXamlLoadErrors*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.IXamlLoadErrorService.ShowXamlLoadErrors*).

- [System.Activities.Presentation.Services.ModelService](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Services.ModelService): Used by the designer to interact with the model of the workflow being edited.

- [System.Activities.Presentation.Model.ModelTreeManager](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Model.ModelTreeManager): Provides access to the root of the model item tree using [System.Activities.Presentation.Model.ModelItem.Root*](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Model.ModelItem.Root*).

- [System.Activities.Presentation.UndoEngine](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.UndoEngine): Provides undo and redo functionality.

- [System.Activities.Presentation.Services.ViewService](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Services.ViewService): Maps visual elements to underlying model items.

- [System.Activities.Presentation.View.ViewStateService](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.View.ViewStateService): Stores view states for model items.

- [System.Activities.Presentation.View.VirtualizedContainerService](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.View.VirtualizedContainerService): Used to customize the virtual container UI behavior.

- [System.Activities.Presentation.Hosting.WindowHelperService](https://learn.microsoft.com/search/?terms=System.Activities.Presentation.Hosting.WindowHelperService): Used to register and unregister delegates for event notifications. Also allows a window owner to be set.
