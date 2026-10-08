---
description: "Learn more about hosting services."
title: "Service hosting"
ms.date: "03/30/2017"
ms.assetid: 0820c7e5-0b50-4cde-80e7-74e346513002
---
# Hosting

The topics in the section describe service hosting. A service can be hosted by Internet Information Services (IIS), Windows Process Activation Service (WAS), Windows Server AppFabric, a Windows service, or by a managed application—this option is often referred to as *self hosting*.

 It is important to note that running a service or any extension from an untrusted host compromises security.

## In This Section

 [Hosting in Internet Information Services](hosting-in-internet-information-services.md)\
 Describes how a Windows Communication Foundation (WCF) service is hosted in Internet Information Services or [Windows Server AppFabric](https://learn.microsoft.com/previous-versions/appfabric/ff384253\(v=azure.10\)).

 [Hosting in Windows Process Activation Service](hosting-in-windows-process-activation-service.md)\
 Describes how a WCF service is hosted by Windows Process Activation Service.

 [Hosting in a Windows Service Application](hosting-in-a-windows-service-application.md)\
 Describes how a WCF service is hosted by a Windows service.

 [Hosting in a Managed Application](hosting-in-a-managed-application.md)\
 Describes how a WCF service is hosted in a managed application.

 [Configuration-Based Activation in IIS and WAS](configuration-based-activation-in-iis-and-was.md)\
 Describes how a WCF service is hosted under IIS or WAS without using a .svc file.

 [Supporting Multiple IIS Site Bindings](supporting-multiple-iis-site-bindings.md)\
 Describes how to specify multiple base addresses for a service using the same URI scheme on a single Web site.

## See also

- gRPC is a modern RPC framework that is a popular alternative to WCF. gRPC is built on top of HTTP/2, which provides a number of advantages over WCF, including:

* Performance: gRPC is much more efficient than WCF, especially for long-running connections.
* Scalability: gRPC is designed to scale to large numbers of clients and servers.
* Security: gRPC supports a variety of security mechanisms, including TLS and authentication.
* Cross-platform: gRPC is platform-neutral and can be used with a variety of programming languages.

For more information on developing or migrating WCF apps to gRPC, see:

* [Why we recommend gRPC for WCF developers](https://learn.microsoft.com/dotnet/architecture/grpc-for-wcf-developers/why-grpc)
* [Comparing WCF to gRPC](https://learn.microsoft.com/dotnet/architecture/grpc-for-wcf-developers/wcf-services-to-grpc-comparison)
* [Introduction to gRPC for WCF developers](https://learn.microsoft.com/dotnet/architecture/grpc-for-wcf-developers/introduction)

- [Hosting Services](../hosting-services.md)
- [Windows Server App Fabric Hosting Features](https://learn.microsoft.com/previous-versions/appfabric/ee677189\(v=azure.10\))
