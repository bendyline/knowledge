---
description: "Learn more about: Discovery Find and FindCriteria"
title: "Discovery Find and FindCriteria"
ms.date: "03/30/2017"
ms.assetid: 99016fa4-1778-495b-b4cc-0e22fbec42c6
---
# Discovery Find and FindCriteria

A discovery find operation is initiated by a client to discover one or more services and is one of the main actions in discovery. Performing a find sends a WS-Discovery Probe message over the network. Services that match the criteria specified reply with WS-Discovery ProbeMatch messages. For more information about discovery messages, see the [WS-Discovery specification](https://schemas.xmlsoap.org/ws/2004/10/discovery/ws-discovery.pdf).

## DiscoveryClient

The [System.ServiceModel.Discovery.DiscoveryClient](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient) class provides the mechanism to perform find operations and makes performing discovery client operations easy. It contains a [System.ServiceModel.Discovery.DiscoveryClient.Find*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient.Find*) method, which performs a (blocking) synchronous find, and a [System.ServiceModel.Discovery.DiscoveryClient.FindAsync*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.DiscoveryClient.FindAsync*) method, which initiates a non-blocking asynchronous find. Both methods take a [System.ServiceModel.Discovery.FindCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria) parameter, and provide results to the user through a [System.ServiceModel.Discovery.FindResponse](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindResponse) object.

## FindCriteria

[System.ServiceModel.Discovery.FindCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria) has several properties, which can be grouped into search criteria, which specify what services you are looking for, and find termination criteria (how long the search should last). A [System.ServiceModel.Discovery.FindCriteria](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria) can contain multiple search criteria. By default, the service has to match all of the components otherwise it does not consider itself a matching service. If you want to find services that only match some of the criteria, you can implement custom find logic on the service or you can use multiple queries.

Search criteria include:

- [System.ServiceModel.Discovery.Configuration.ContractTypeNameElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.Configuration.ContractTypeNameElement) - Optional. The contract name of the service being searched for and the criteria typically used when searching for a service. If more than one contract name is specified, only service endpoints matching ALL contracts reply. Note that in WCF an endpoint can only support one contract.

- [System.ServiceModel.Discovery.Configuration.ScopeElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.Configuration.ScopeElement) - Optional. Scopes are absolute URIs that are used to categorize individual service endpoints. You may want to use this in scenarios where multiple endpoints expose the same contract and you want a way to search for a subset of the endpoints. If more than one scope is specified, only service endpoints matching ALL scopes reply.

- [System.ServiceModel.Discovery.FindCriteria.ScopeMatchBy*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.ScopeMatchBy*) - Specifies the matching algorithm to use while matching the scopes in the Probe message with that of the endpoint. There are five supported scope-matching rules:

  - [System.ServiceModel.Discovery.FindCriteria.ScopeMatchByExact](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.ScopeMatchByExact) does a basic case-sensitive string comparison.

  - [System.ServiceModel.Discovery.FindCriteria.ScopeMatchByPrefix](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.ScopeMatchByPrefix) matches by segments separated by "/". A search for `http://contoso/building1` matches a service with scope `http://contoso/building/floor1`. Note that it does not match `http://contoso/building100` because the last two segments do not match.

  - [System.ServiceModel.Discovery.FindCriteria.ScopeMatchByLdap](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.ScopeMatchByLdap) matches scopes by segments using an LDAP URL.

  - [System.ServiceModel.Discovery.FindCriteria.ScopeMatchByUuid](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.ScopeMatchByUuid) matches scopes exactly using a UUID string.

  - [System.ServiceModel.Discovery.FindCriteria.ScopeMatchByNone](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.ScopeMatchByNone) matches only those services that do not specify a scope.

  If a scope-matching rule is not specified, [System.ServiceModel.Discovery.FindCriteria.ScopeMatchByPrefix](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.ScopeMatchByPrefix) is used.

Termination criteria include:

1. [System.ServiceModel.Discovery.FindCriteria.Duration*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.Duration*) - The maximum time to wait for replies from services on the network. The default duration is 20 seconds.

2. [System.ServiceModel.Discovery.FindCriteria.MaxResults*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.MaxResults*) - The maximum number of replies to wait for. If [System.ServiceModel.Discovery.FindCriteria.MaxResults*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.MaxResults*) replies are received before [System.ServiceModel.Discovery.FindCriteria.Duration*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindCriteria.Duration*) has elapsed, the find operation ends.

## FindResponse

[System.ServiceModel.Discovery.FindResponse](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindResponse) has an [System.ServiceModel.Discovery.FindResponse.Endpoints](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.FindResponse.Endpoints) collection property that contains any replies sent by matching services on the network. If no services replied, the collection is empty. If one or more services replied, each reply is stored in an [System.ServiceModel.Discovery.EndpointDiscoveryMetadata](https://learn.microsoft.com/search/?terms=System.ServiceModel.Discovery.EndpointDiscoveryMetadata) object, which contains the address, contract, and some additional information about the service.

The following example shows how to perform a find operation in code.

```csharp
// Create DiscoveryClient
DiscoveryClient discoveryClient = new DiscoveryClient(new UdpDiscoveryEndpoint());

// Create FindCriteria
FindCriteria findCriteria = new FindCriteria(typeof(IPrinterService));
findCriteria.Scopes.Add(new Uri("http://www.contoso.com/building1/floor1"));
findCriteria.Duration = TimeSpan.FromSeconds(10);

// Find ICalculatorService endpoints
FindResponse findResponse = discoveryClient.Find(findCriteria);

Console.WriteLine("Found {0} ICalculatorService endpoint(s).", findResponse.Endpoints.Count)
```

## See also

- [WCF Discovery Overview](wcf-discovery-overview.md)
- [Using the Discovery Client Channel](using-the-discovery-client-channel.md)
- [Discovery with Scopes](../samples/discovery-with-scopes-sample.md)
- [Basic](../samples/basic-sample.md)
