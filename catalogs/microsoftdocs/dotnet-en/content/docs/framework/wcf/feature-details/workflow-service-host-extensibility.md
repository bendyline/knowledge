---
description: "Learn more about: Workflow Service Host Extensibility"
title: "Workflow Service Host Extensibility"
ms.date: "03/30/2017"
ms.assetid: c0e8f7bb-cb13-49ec-852f-b85d7c23972f
---
# Workflow Service Host Extensibility

.NET Framework 4.6.1
 provides the [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost) class for hosting workflow services. This class is used when you are self-hosting a workflow service in a managed application or a Windows service. This class is also used when hosting a workflow service with Internet Information Services (IIS) or Windows Process Activation Service (WAS). The [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost) class provides extension points that allow you to add custom extensions, change the idle behavior, and host non-service workflows (workflows that do not use messaging activities).

## Workflow Service Host Extensions

 The [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost) contains a [System.ServiceModel.Activities.WorkflowServiceHost.WorkflowExtensions](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost.WorkflowExtensions) property of type [System.Activities.Hosting.WorkflowInstanceExtensionManager](https://learn.microsoft.com/search/?terms=System.Activities.Hosting.WorkflowInstanceExtensionManager) that provides methods to add extensions to the [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost). Use the [System.Activities.Hosting.WorkflowInstanceExtensionManager.Add*](https://learn.microsoft.com/search/?terms=System.Activities.Hosting.WorkflowInstanceExtensionManager.Add*) method to add an extension for each workflow service instance. The delegate specified is called to create a new extension when a workflow service instance is created or loaded from a persistence store. Use the [System.Activities.Hosting.WorkflowInstanceExtensionManager.Add*](https://learn.microsoft.com/search/?terms=System.Activities.Hosting.WorkflowInstanceExtensionManager.Add*) method to add an extension for each workflow service host, one instance of the extension is shared for all workflow service instances.

## React to Unhandled Exceptions

 The [System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionBehavior) enables you to specify the action to take if an unhandled exception occurs within a workflow service. The [System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionBehavior.Action](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionBehavior.Action) property specifies one of the [System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionAction](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionAction) values:

- [System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionAction.Abandon](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionAction.Abandon) – Aborts the workflow service instance.

- [System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionAction.AbandonAndSuspend](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionAction.AbandonAndSuspend) – Rolls back to the last persisted state and suspends the workflow service instance. This only occurs if the workflow has already been persisted at least once. If not the workflow instance is aborted.

- [System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionAction.Cancel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionAction.Cancel) – Cancels the instance.

- [System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionAction.Terminate](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Description.WorkflowUnhandledExceptionAction.Terminate) – Terminates the instance.

 This behavior can be configured in code as shown in the following example.

```csharp
host.Description.Behaviors.Add(new WorkflowUnhandledExceptionBehavior { Action = WorkflowUnhandledExceptionAction.Abandon });
```

 It can also be configured in a configuration file as shown in the following example.

```xml
<behaviors>
      <serviceBehaviors>
        <behavior>
          <serviceMetadata httpGetEnabled="True"/>
          <serviceDebug includeExceptionDetailInFaults="False" />
          <workflowUnhandledExceptionBehavior action="Abandon" />
        </behavior>
      </serviceBehaviors>
</behaviors>
```

## Hosting Non-Service Workflows

 [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost) can be used to host non-service workflows, or workflows that either do not begin with a [System.ServiceModel.Activities.Receive](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Receive) activity or workflows that do not use the messaging activities. Workflow services normally begin with a [System.ServiceModel.Activities.Receive](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Receive) activity. When the [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost) receives a message for a workflow service, if it is not already running (or persisted) a new workflow service instance is created. If a workflow does not begin with a Receive activity, it cannot be started by sending a message because there is no activity to receive the message. To host a non-service workflow, derive a class from [System.ServiceModel.Activities.WorkflowHostingEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowHostingEndpoint) and override [System.ServiceModel.Activities.WorkflowHostingEndpoint.OnGetInstanceId*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowHostingEndpoint.OnGetInstanceId*), [System.ServiceModel.Activities.WorkflowHostingEndpoint.OnGetCreationContext*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowHostingEndpoint.OnGetCreationContext*), and [System.ServiceModel.Activities.WorkflowHostingEndpoint.OnResolveBookmark*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowHostingEndpoint.OnResolveBookmark*). Override [System.ServiceModel.Activities.WorkflowHostingEndpoint.OnGetInstanceId*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowHostingEndpoint.OnGetInstanceId*) if you want to provide a preferred instance ID. Override [System.ServiceModel.Activities.WorkflowHostingEndpoint.OnGetCreationContext*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowHostingEndpoint.OnGetCreationContext*) to create a custom workflow creation context or populate an instance of the existing [System.ServiceModel.Activities.WorkflowCreationContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowCreationContext). Override [System.ServiceModel.Activities.WorkflowHostingEndpoint.OnResolveBookmark*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowHostingEndpoint.OnResolveBookmark*) to manually extract the bookmark from the incoming message. If you override this method, you must invoke [System.ServiceModel.Activities.WorkflowHostingResponseContext.SendResponse*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowHostingResponseContext.SendResponse*) in its body so as to respond to the message sent to the WorkflowHostingEndpoint. If you do not do so, a [System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentCalls*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentCalls*) limit may be eventually exceeded. In two-way contracts, you may be able to detect your   failure to invoke [System.ServiceModel.Activities.WorkflowHostingResponseContext.SendResponse*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowHostingResponseContext.SendResponse*) because of the client’s failure to receive a response. In one-way contracts, you may not recognize the mistake of failing to call [System.ServiceModel.Activities.WorkflowHostingResponseContext.SendResponse*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowHostingResponseContext.SendResponse*) until it’s too late, after the [System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentCalls*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentCalls*) throttle limit is exceeded. To create a new instance of a non-service workflow, declare a service contract that defines an operation that creates a new instance. The creation operation should take an IDictionary\<string, object> to pass any required workflow parameters. This contract is implicitly implemented by the [System.ServiceModel.Activities.WorkflowHostingEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowHostingEndpoint)-derived class. When hosting the workflow, add an instance of the [System.ServiceModel.Activities.WorkflowHostingEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowHostingEndpoint)-derived class to the host by calling [System.ServiceModel.Activities.WorkflowServiceHost.AddServiceEndpoint*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost.AddServiceEndpoint*) and call [System.ServiceModel.Channels.CommunicationObject.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CommunicationObject.Open*). To create an instance of the workflow, create a [System.ServiceModel.ChannelFactory`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601) of your service contract type and call [System.ServiceModel.ChannelFactory`1.CreateChannel*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601.CreateChannel*). You can then call the create operation defined in your service contract.

## See also

- [Workflow Services](workflow-services.md)
- [Messaging Activities](messaging-activities.md)
