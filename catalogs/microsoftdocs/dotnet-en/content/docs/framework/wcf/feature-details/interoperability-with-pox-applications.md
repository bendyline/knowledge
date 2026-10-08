---
description: "Learn more about: Interoperability with POX applications"
title: "Interoperability with POX applications"
ms.date: "03/30/2017"
ms.assetid: 449276b8-4633-46f0-85c9-81f01d127636
---
# Interoperability with POX applications

"Plain Old XML" (POX) applications communicate by exchanging raw HTTP messages that contain only XML application data that is not enclosed within a SOAP envelope. Windows Communication Foundation (WCF) can provide both services and clients that use POX messages. On the service, WCF can be used to implement services that expose endpoints to clients such as Web browsers and scripting languages that send and receive POX messages. On the client, the WCF programming model can be used to implement clients that communicate with POX-based services.

> **Note:**
> This document was originally written for .NET Framework 3.0.  .NET Framework 3.5 has built-in support for working with POX applications. For more information about see [WCF Web HTTP Programming Model](wcf-web-http-programming-model.md).

## POX programming with WCF

WCF services that communicate over HTTP using POX messages use a [\<customBinding>](../../configure-apps/file-schema/wcf/custombinding.md).

```xml
<customBinding>
   <binding name="poxServerBinding">
       <textMessageEncoding messageVersion="None" />
       <httpTransport />
   </binding>
</customBinding>
```

This custom binding contains two elements:

- [\<httpTransport>](../../configure-apps/file-schema/wcf/httptransport.md)

- [\<textMessageEncoding>](../../configure-apps/file-schema/wcf/textmessageencoding.md)

The standard WCF Text Message Encoder is specially configured to use the [System.ServiceModel.Channels.MessageVersion.None*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageVersion.None*) value, which allows it to process XML message payloads that do not arrive wrapped in a SOAP envelope.

WCF clients that communicate over HTTP using POX messages use a similar binding (shown in the following imperative code).

```csharp
private static Binding CreatePoxBinding()
{
    TextMessageEncodingBindingElement encoder =
        new TextMessageEncodingBindingElement( MessageVersion.None, Encoding.UTF8 );
    HttpTransportBindingElement transport = new HttpTransportBindingElement();
    transport.ManualAddressing = true;
    return new CustomBinding( new BindingElement[] { encoder, transport } );
}
```

Because POX clients must explicitly specify the URIs to which they send messages, they usually must configure the [System.ServiceModel.Channels.HttpTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpTransportBindingElement) to a manual addressing mode by setting the [System.ServiceModel.Channels.TransportBindingElement.ManualAddressing](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.TransportBindingElement.ManualAddressing) property to `true` on the element. This allows messages to be addressed explicitly by application code and it is not necessary to create a new [System.ServiceModel.ChannelFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory) every time an application sends a message to a different HTTP URI.

Because POX messages do not use SOAP headers to convey important protocol information, POX clients and services often must manipulate pieces of the underlying HTTP request used to send or receive a message. HTTP-specific protocol information such as the HTTP headers and status codes are surfaced in the WCF programming model through two classes:

- [System.ServiceModel.Channels.HttpRequestMessageProperty](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpRequestMessageProperty), which contains information about the HTTP request, such as the HTTP method and request headers.

- [System.ServiceModel.Channels.HttpResponseMessageProperty](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpResponseMessageProperty), which contains information about the HTTP response, such as the HTTP status code and status description, as well as any HTTP response headers.

The following code example shows how to create an HTTP GET request message that is addressed to `http://localhost:8100/customers`.

```csharp
Message request = Message.CreateMessage( MessageVersion.None, String.Empty );
request.Headers.To = "http://localhost:8100/customers";

HttpRequestMessageProperty property = new HttpRequestMessageProperty();
property.Method = "GET";
property.SuppressEntityBody = true;
request.Properties.Add( HttpRequestMessageProperty.Name, property );
```

First, an empty request [System.ServiceModel.Channels.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message) is created by calling [System.ServiceModel.Channels.Message.CreateMessage%28System.ServiceModel.Channels.MessageVersion%2CSystem.String%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.CreateMessage%2528System.ServiceModel.Channels.MessageVersion%252CSystem.String%2529). The [System.ServiceModel.Channels.MessageVersion.None*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageVersion.None*) parameter is used to indicate that a SOAP envelope is not required and [System.String.Empty](https://learn.microsoft.com/search/?terms=System.String.Empty) parameter is passed as the Action. The request message is then addressed by setting [System.ServiceModel.Channels.MessageHeaders.To](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders.To) header to the desired URI. Next, an [System.ServiceModel.Channels.HttpRequestMessageProperty](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpRequestMessageProperty) is created and the [System.ServiceModel.Channels.HttpRequestMessageProperty.Method*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpRequestMessageProperty.Method*) is set to the HTTP verb GET method and the [System.ServiceModel.Channels.HttpRequestMessageProperty.SuppressEntityBody](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpRequestMessageProperty.SuppressEntityBody) is set to `true` to indicate that no data should be sent in the body of the outgoing HTTP request message. Finally, the request property is added to the [System.ServiceModel.Channels.Message.Properties*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.Properties*) collection of the request message so it can influence how the HTTP Transport sends the request. The message is then ready to be sent over an appropriate instance of the [System.ServiceModel.Channels.IRequestChannel](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.IRequestChannel).

Similar techniques can be used on the service to extract the [System.ServiceModel.Channels.HttpRequestMessageProperty](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpRequestMessageProperty) from an incoming message and construct a response.
