---
title: "Transport security with an anonymous client"
description: Review this WCF scenario, which uses transport security to authenticate a server by using a certificate that the client trusts. The client is not authenticated.
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: 056653a5-384e-4a02-ae3c-1b0157d2ccb4
ms.custom: sfi-image-nochange
---
# Transport security with an anonymous client

This Windows Communication Foundation (WCF) scenario uses transport security (HTTPS) to ensure confidentiality and integrity. The server must be authenticated with a Secure Sockets Layer (SSL) certificate, and the clients must trust the server's certificate. The client is not authenticated by any mechanism and is, therefore, anonymous.

For a sample application, see [WS Transport Security](../samples/ws-transport-security.md). For more information about transport security, see [Transport Security Overview](transport-security-overview.md).

For more information about using a certificate with a service, see [Working with Certificates](working-with-certificates.md) and [How to: Configure a Port with an SSL Certificate](how-to-configure-a-port-with-an-ssl-certificate.md).

Using transport security with an anonymous client

| Characteristic | Description |
| --- | --- |
| Security Mode | Transport |
| Interoperability | With existing Web services and clients |
| Authentication (Server)<br /><br /> Authentication (Client) | Yes<br /><br /> Application level (no WCF support) |
| Integrity | Yes |
| Confidentiality | Yes |
| Transport | HTTPS |
| Binding | [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding) |

## Service

The following code and configuration are meant to run independently. Do one of the following:

- Create a stand-alone service using the code with no configuration.

- Create a service using the supplied configuration, but do not define any endpoints.

### Code

The following code shows how to create an endpoint using transport security:

[c_SecurityScenarios#5 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/c_securityscenarios/cs/source.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_securityscenarios/cs/source.cs.md)
[c_SecurityScenarios#5 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/c_securityscenarios/vb/source.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_securityscenarios/vb/source.vb.md)

### Configuration

The following code sets up the same endpoint using configuration. The client is not authenticated by any mechanism, and is therefore anonymous.

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.serviceModel>
    <services>
      <service name="ServiceModel.Calculator">
        <endpoint address="https://localhost/Calculator"
                  binding="wsHttpBinding"
                  bindingConfiguration="WSHttpBinding_ICalculator"
                  name="SecuredByTransportEndpoint"
                  contract="ServiceModel.ICalculator" />
      </service>
    </services>
    <bindings>
      <wsHttpBinding>
        <binding name="WSHttpBinding_ICalculator">
          <security mode="Transport">
            <transport clientCredentialType="None" />
          </security>
        </binding>
      </wsHttpBinding>
    </bindings>
    <client />
  </system.serviceModel>
</configuration>
```

## Client

The following code and configuration are meant to run independently. Do one of the following:

- Create a stand-alone client using the code (and client code).

- Create a client that does not define any endpoint addresses. Instead, use the client constructor that takes the configuration name as an argument. For example:

     [C_SecurityScenarios#0 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/c_securityscenarios/cs/source.cs#0)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_securityscenarios/cs/source.cs.md)
     [C_SecurityScenarios#0 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/c_securityscenarios/vb/source.vb#0)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_securityscenarios/vb/source.vb.md)

### Code

[c_SecurityScenarios#6 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/c_securityscenarios/cs/source.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_securityscenarios/cs/source.cs.md)
[c_SecurityScenarios#6 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_CFX/c_securityscenarios/vb/source.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_securityscenarios/vb/source.vb.md)

### Configuration

The following configuration can be used instead of the code to set up the service.

```xml
<configuration>
  <system.serviceModel>
    <bindings>
      <wsHttpBinding>
        <binding name="WSHttpBinding_ICalculator" >
          <security mode="Transport">
            <transport clientCredentialType="None" />
          </security>
        </binding>
      </wsHttpBinding>
    </bindings>
    <client>
      <endpoint address="https://machineName/Calculator"
                binding="wsHttpBinding"
                bindingConfiguration="WSHttpBinding_ICalculator"
                contract="ICalculator"
                name="WSHttpBinding_ICalculator" />
    </client>
  </system.serviceModel>
</configuration>
```

## See also

- [Security Overview](security-overview.md)
- [WS Transport Security](../samples/ws-transport-security.md)
- [Transport Security Overview](transport-security-overview.md)
- [Security Model for Windows Server App Fabric](https://learn.microsoft.com/previous-versions/appfabric/ee677202\(v=azure.10\))
