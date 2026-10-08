---
description: "Learn more about: Hosting Workflow Services Overview"
title: "Hosting Workflow Services Overview"
ms.date: "03/30/2017"
ms.assetid: 19f3704f-06bf-4eeb-8724-5224e02d7ead
---
# Hosting Workflow Services Overview

Workflow services must be hosted to execute. The [System.ServiceModel.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.WorkflowServiceHost) is the out-of-the-box workflow host that supports multiple instances, configuration, and WCF messaging (although the workflows aren’t required to use messaging in order to be hosted).  It also integrates with persistence, tracking, and instance control through a set of service behaviors.  Just like WCF’s [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost), the [System.ServiceModel.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.WorkflowServiceHost) can be self-hosted in any managed .NET application, or web-hosted (as a .xamlx file) in IIS / WAS.  Topics in this section describe how to host a workflow service.  
  
## In This Section  

 [Hosting Workflow Services](hosting-workflow-services.md)  
 Describes hosting workflow services.  
  
 [Workflow Service Host Internals](workflow-service-host-internals.md)  
 Describes how [System.ServiceModel.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.WorkflowServiceHost) processes incoming messages.  
  
 [Workflow Service Host Extensibility](workflow-service-host-extensibility.md)  
 Describes how to extend the functionality of the workflow service host.  
  
 [Workflow Control Endpoint](workflow-control-endpoint.md)  
 Describes how to define an endpoint that allows you to create workflow instances.
  
 [How to: Host a Workflow Service with Windows Server App Fabric](how-to-host-a-workflow-service-with-windows-server-app-fabric.md)  
 Demonstrates how to host an existing workflow service in Windows Server App Fabric.  
  
 [Configuring WorkflowServiceHost](configuring-workflowservicehost.md)  
 Describes how to control persistence, tracking, idle, and unhandled exception behavior.  
  
## Reference  

 [System.ServiceModel.Activities.WorkflowServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowServiceHost)  
  
 [System.ServiceModel.Activities.WorkflowService](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.WorkflowService)  
  
 [System.ServiceModel.Activation.ServiceHostFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activation.ServiceHostFactory)  
  
 [System.ServiceModel.Activation.ServiceHostFactoryBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activation.ServiceHostFactoryBase)  
  
 [System.ServiceModel.Activation.WorkflowServiceHostFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activation.WorkflowServiceHostFactory)  
  
## Related Sections  

 [Workflow Services](workflow-services.md)
