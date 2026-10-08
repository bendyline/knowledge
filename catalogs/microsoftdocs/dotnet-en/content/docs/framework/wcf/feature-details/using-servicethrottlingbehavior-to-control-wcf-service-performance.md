---
description: "Learn more about: Using ServiceThrottlingBehavior to Control WCF Service Performance"
title: "Using ServiceThrottlingBehavior to Control WCF Service Performance"
ms.date: "03/30/2017"
helpviewer_keywords:
  - "behavior [WCF], service performance"
ms.assetid: f9dc120c-dc24-49d5-930e-b22f5bc73423
---
# Using ServiceThrottlingBehavior to Control WCF Service Performance

The [System.ServiceModel.Description.ServiceThrottlingBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior) class exposes properties that you can use to limit how many instances or sessions are created at the application level. Using this behavior, you can fine-tune the performance of your Windows Communication Foundation (WCF) application.

## Controlling Service Instances and Concurrent Calls

 Use the [System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentCalls](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentCalls) property to specify the maximum number of messages actively processing across a [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) class, and the [System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentInstances](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentInstances) property to specify the maximum number of [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) objects in the service.

 Because determining the settings for these properties usually takes place after real-world experience running the application against loads, the settings for the [System.ServiceModel.Description.ServiceThrottlingBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior) properties is typically specified in an application configuration file using the [\<serviceThrottling>](../../configure-apps/file-schema/wcf/servicethrottling.md) element.

 The following code example shows the use of the [System.ServiceModel.Description.ServiceThrottlingBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior) class from an application configuration file that sets the [System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentSessions*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentSessions*), [System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentCalls*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentCalls*), and [System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentInstances](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentInstances) properties to 1 as a trivial example. Real-world experience determines the optimal settings for any particular application.

 [ServiceThrottlingBehavior#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/servicethrottlingbehavior/cs/hostapplication.exe.config#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/servicethrottlingbehavior/cs/hostapplication.exe.config.md)

 The exact runtime behavior depends upon the values of the [System.ServiceModel.ServiceBehaviorAttribute.ConcurrencyMode*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.ConcurrencyMode*) and [System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute.InstanceContextMode) properties, which control how many messages can execute inside an operation at once and the lifetimes of the service [System.ServiceModel.InstanceContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContext) relative to incoming channel sessions, respectively.

 For details, see [System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentCalls*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentCalls*), and [System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentInstances*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior.MaxConcurrentInstances*).

## See also

- [System.ServiceModel.Description.ServiceThrottlingBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior)
- [System.ServiceModel.NetTcpBinding.MaxConnections*](https://learn.microsoft.com/search/?terms=System.ServiceModel.NetTcpBinding.MaxConnections*)
