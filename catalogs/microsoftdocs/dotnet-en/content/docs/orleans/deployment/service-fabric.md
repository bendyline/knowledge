---
title: Host with Service Fabric
description: Learn how to host an Orleans app with Service Fabric.
ms.date: 05/23/2025
ms.topic: how-to
ms.custom: devops
---

# Host with Service Fabric

Host Orleans on [Azure Service Fabric](https://learn.microsoft.com/azure/service-fabric) using the [Microsoft.ServiceFabric.Services](https://www.nuget.org/packages/Microsoft.ServiceFabric.Services) and [Microsoft.Orleans.Server](https://www.nuget.org/packages/Microsoft.Orleans.Server) NuGet packages. Host silos as unpartitioned, stateless services because Orleans manages grain distribution itself. Other hosting options, such as partitioned and stateful, are more complex and yield no benefits without additional customization. Hosting Orleans as unpartitioned and stateless is recommended.

## Service Fabric stateless service as a silo

Whether creating a new Service Fabric Application or adding Orleans to an existing one, both the `Microsoft.ServiceFabric.Services` and `Microsoft.Orleans.Server` package references are needed in the project. The stateless service project requires an implementation of [Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener](https://learn.microsoft.com/search/?terms=Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener) and a subclass of [Microsoft.ServiceFabric.Services.Runtime.StatelessService](https://learn.microsoft.com/search/?terms=Microsoft.ServiceFabric.Services.Runtime.StatelessService).

The Silo lifecycle follows the typical communication listener lifecycle:

- Initialized with [Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener.OpenAsync*](https://learn.microsoft.com/search/?terms=Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener.OpenAsync*).
- Gracefully terminated with [Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener.CloseAsync*](https://learn.microsoft.com/search/?terms=Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener.CloseAsync*).
- Or abruptly terminated with [Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener.Abort*](https://learn.microsoft.com/search/?terms=Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener.Abort*).

Since Orleans Silos can live within the confines of the [Microsoft.Extensions.Hosting.IHost](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHost), the implementation of `ICommunicationListener` is a wrapper around the `IHost`. The `IHost` initializes in the `OpenAsync` method and gracefully terminates in the `CloseAsync` method:

| `ICommunicationListener` | `IHost` interactions |
| --- | --- |
| [Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener.OpenAsync*](https://learn.microsoft.com/search/?terms=Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener.OpenAsync*) | The `IHost` instance is created and a call to [Microsoft.Extensions.Hosting.IHost.StartAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHost.StartAsync*) is made. |
| [Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener.CloseAsync*](https://learn.microsoft.com/search/?terms=Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener.CloseAsync*) | A call to [Microsoft.Extensions.Hosting.IHost.StopAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHost.StopAsync*) on the host instance is awaited. |
| [Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener.Abort*](https://learn.microsoft.com/search/?terms=Microsoft.ServiceFabric.Services.Communication.Runtime.ICommunicationListener.Abort*) | A call to [Microsoft.Extensions.Hosting.IHost.StopAsync*](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Hosting.IHost.StopAsync*) is forcefully evaluated with `GetAwaiter().GetResult()`. |

## Cluster support

Official clustering support is available from various packages, including:

- [Microsoft.Orleans.Clustering.AzureStorage](https://www.nuget.org/packages/Microsoft.Orleans.Clustering.AzureStorage)
- [Microsoft.Orleans.Clustering.AdoNet](https://www.nuget.org/packages/Microsoft.Orleans.Clustering.AdoNet)
- [Microsoft.Orleans.Clustering.DynamoDB](https://www.nuget.org/packages/Microsoft.Orleans.Clustering.DynamoDB)

Several third-party packages are also available for other services such as Cosmos DB, Kubernetes, Redis, and Aerospike. For more information, see [Cluster management in Orleans](../implementation/cluster-management.md).

## Example project

In the stateless service project, implement the `ICommunicationListener` interface as shown in the following example:

[source="snippets/service-fabric/stateless/HostedServiceCommunicationListener.cs"::: (complete source file; reference: snippets/service-fabric/stateless/HostedServiceCommunicationListener.cs)](../../../_code/docs/orleans/deployment/snippets/service-fabric/stateless/HostedServiceCommunicationListener.cs.md)

The `HostedServiceCommunicationListener` class accepts a `Func<Task<IHost>> createHost` constructor parameter. This function is later used to create the `IHost` instance in the `OpenAsync` method.

The next part of the stateless service project is implementing the `StatelessService` class. The following example shows the subclass of `StatelessService`:

[source="snippets/service-fabric/stateless/OrleansHostedStatelessService.cs"::: (complete source file; reference: snippets/service-fabric/stateless/OrleansHostedStatelessService.cs)](../../../_code/docs/orleans/deployment/snippets/service-fabric/stateless/OrleansHostedStatelessService.cs.md)

In the preceding example, the `OrleansHostedStatelessService` class is responsible for yielding an `ICommunicationListener` instance. The Service Fabric runtime calls the `CreateServiceInstanceListeners` method when the service initializes.

Pulling these two classes together, the following example shows the complete _Program.cs_ file for the stateless service project:

[source="snippets/service-fabric/stateless/Program.cs"::: (complete source file; reference: snippets/service-fabric/stateless/Program.cs)](../../../_code/docs/orleans/deployment/snippets/service-fabric/stateless/Program.cs.md)

In the preceding code:

- The [Microsoft.ServiceFabric.Services.Runtime.ServiceRuntime.RegisterServiceAsync*](https://learn.microsoft.com/search/?terms=Microsoft.ServiceFabric.Services.Runtime.ServiceRuntime.RegisterServiceAsync*) method registers the `OrleansHostedStatelessService` class with the Service Fabric runtime.
- The `CreateHostAsync` delegate creates the `IHost` instance.
