---
description: "Learn more about: Preventing Replay Attacks When a WCF Service is Hosted in a Web Farm"
title: "Preventing Replay Attacks When a WCF Service is Hosted in a Web Farm"
ms.date: "03/30/2017"
ms.assetid: 1c2ed695-7a31-4257-92bd-9e9731b886a5
---
# Preventing Replay Attacks When a WCF Service is Hosted in a Web Farm

When using message security WCF prevents replay attacks by creating a NONCE out of the incoming message and checking the internal `InMemoryNonceCache` to see if the generated NONCE is present. If it is, the message is discarded as a replay. When a WCF service is hosted in a web farm, since the `InMemoryNonceCache` is not shared across the nodes in the web farm, the service is vulnerable to replay attacks.  To mitigate this scenario WCF 4.5 provides an extensibility point that allows you to implement your own shared NONCE cache by deriving a class from the abstract class [System.ServiceModel.Security.NonceCache](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.NonceCache).

## NonceCache Implementation

 To implement your own shared NONCE cache, derive a class from [System.ServiceModel.Security.NonceCache](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.NonceCache) and override the [System.ServiceModel.Security.NonceCache.CheckNonce*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.NonceCache.CheckNonce*) and [System.ServiceModel.Security.NonceCache.TryAddNonce*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.NonceCache.TryAddNonce*) methods. [System.ServiceModel.Security.NonceCache.CheckNonce*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.NonceCache.CheckNonce*) will check to see if the specified NONCE exists in the cache. [System.ServiceModel.Security.NonceCache.TryAddNonce*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.NonceCache.TryAddNonce*) will attempt to add a NONCE to the cache. Once the class is implemented, you hook it up by instantiating an instance and assigning it to [System.ServiceModel.Channels.LocalClientSecuritySettings.NonceCache*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.LocalClientSecuritySettings.NonceCache*) for client-side replay detection and [System.ServiceModel.Channels.LocalServiceSecuritySettings.NonceCache*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.LocalServiceSecuritySettings.NonceCache*) for server-side replay detection. There is no out of the box configuration support for this feature.

## See also

- [Message Security](message-security-in-wcf.md)
- [SymmetricSecurityBindingElement](../diagnostics/wmi/symmetricsecuritybindingelement.md)
