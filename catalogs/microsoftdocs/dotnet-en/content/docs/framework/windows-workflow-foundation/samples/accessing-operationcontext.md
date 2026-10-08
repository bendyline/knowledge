---
description: "Learn more about: Accessing OperationContext"
title: "Accessing OperationContext"
ms.date: "03/30/2017"
ms.assetid: 4e92efe8-7e79-41f3-b50e-bdc38b9f41f8
---
# Accessing OperationContext

The [AccessingOperationContext sample](https://github.com/dotnet/samples/tree/main/framework/windows-workflow-foundation/scenario/Services/AccessingOperationContext/CS) demonstrates how the messaging activities ([System.ServiceModel.Activities.Receive](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Receive) and [System.ServiceModel.Activities.Send](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Send)) can be used with a custom scope activity to access [System.ServiceModel.OperationContext.Current*](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext.Current*) and attach or retrieve a custom message header within an outgoing or incoming message.

## Demonstrates

 Messaging Activities, [System.ServiceModel.Activities.ISendMessageCallback](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.ISendMessageCallback), [System.ServiceModel.Activities.IReceiveMessageCallback](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.IReceiveMessageCallback).

## Discussion

 This sample shows how to use extensibility points ([System.ServiceModel.Activities.ISendMessageCallback](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.ISendMessageCallback)) [System.ServiceModel.Activities.IReceiveMessageCallback](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.IReceiveMessageCallback)) in the messaging activities to access [System.ServiceModel.OperationContext.Current*](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext.Current*). The callbacks are registered within the workflow runtime as an implementation of [System.Activities.IExecutionProperty](https://learn.microsoft.com/search/?terms=System.Activities.IExecutionProperty) that is picked up by the messaging activities upon execution. Any messaging activity in the same scope as that [System.Activities.IExecutionProperty](https://learn.microsoft.com/search/?terms=System.Activities.IExecutionProperty) implementation is affected. In particular, this sample uses a custom scope activity to enforce the callback behavior. The [System.ServiceModel.Activities.ISendMessageCallback](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.ISendMessageCallback) is used in the client workflow to include the workflow's [System.Activities.WorkflowApplication.Id*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplication.Id*) as an outgoing [System.ServiceModel.Channels.MessageHeader](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeader). This header is then picked up in the service using the [System.ServiceModel.Activities.IReceiveMessageCallback](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.IReceiveMessageCallback) and the value of the header is printed out to the console.

## Set up, build, and run the sample

1. This sample exposes a workflow service using HTTP endpoints. To run this sample, proper URL ACLs must be added (see [Configuring HTTP and HTTPS](../../wcf/feature-details/configuring-http-and-https.md) for details), either by running Visual Studio as Administrator or by executing the following command at an elevated prompt to add the appropriate ACLs. Ensure that your Domain and Username are substituted.

    ```console
    netsh http add urlacl url=http://+:8000/ user=%DOMAIN%\%UserName%
    ```

2. Once the URL ACLs are added, use the following steps.

    1. Build the solution.

    2. Set multiple start-up projects by right-clicking the solution and selecting **Set Startup Projects**.

    3. Add **Service** and **Client** (in that order) as multiple start-up projects.

    4. Run the application. The client console shows a workflow running twice and the Service window shows the instance ID of those workflows.
