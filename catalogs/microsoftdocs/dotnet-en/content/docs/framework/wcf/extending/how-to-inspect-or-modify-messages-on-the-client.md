---
title: "How to: Inspect or Modify Messages on the Client"
description: Learn how to inspect or modify the incoming or outgoing messages across a WCF client or service by implementing the appropriate interface.
ms.date: "03/30/2017"
ms.assetid: b8256335-f1c2-419f-b862-9f220ccad84c
---
# How to: Inspect or Modify Messages on the Client

You can inspect or modify the incoming or outgoing messages across a WCF client by implementing a [System.ServiceModel.Dispatcher.IClientMessageInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IClientMessageInspector) and inserting it into the client runtime. For more information, see [Extending Clients](extending-clients.md). The equivalent feature on the service is the [System.ServiceModel.Dispatcher.IDispatchMessageInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IDispatchMessageInspector). For a complete code example see the [Message Inspectors](../samples/message-inspectors.md) sample.

### To inspect or modify messages

1. Implement the [System.ServiceModel.Dispatcher.IClientMessageInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IClientMessageInspector) interface.

2. Implement a [System.ServiceModel.Description.IEndpointBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IEndpointBehavior) or [System.ServiceModel.Description.IContractBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IContractBehavior) depending upon the scope at which you want to insert the client message inspector. [System.ServiceModel.Description.IEndpointBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IEndpointBehavior) allows you to change behavior at the endpoint level. [System.ServiceModel.Description.IContractBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IContractBehavior) allows you to change behavior at the contract level.

3. Insert the behavior prior to calling the [System.ServiceModel.ClientBase`1.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ClientBase%601.Open*) or the [System.ServiceModel.ICommunicationObject.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ICommunicationObject.Open*) method on the [System.ServiceModel.ChannelFactory`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601). For details, see [Configuring and Extending the Runtime with Behaviors](configuring-and-extending-the-runtime-with-behaviors.md).

## Example

 The following code examples show, in order:

- A client inspector implementation.

- An endpoint behavior that inserts the inspector.

- A [System.ServiceModel.Configuration.BehaviorExtensionElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.BehaviorExtensionElement)- derived class that allows you to add the behavior in a configuration file.

- A configuration file that adds the endpoint behavior which inserts the client message inspector into the client runtime.

```csharp
// Client message inspector
public class SimpleMessageInspector : IClientMessageInspector
{
    public void AfterReceiveReply(ref System.ServiceModel.Channels.Message reply, object correlationState)
    {
        // Implement this method to inspect/modify messages after a message
        // is received but prior to passing it back to the client
        Console.WriteLine("AfterReceiveReply called");
    }

    public object BeforeSendRequest(ref System.ServiceModel.Channels.Message request, IClientChannel channel)
    {
        // Implement this method to inspect/modify messages before they
        // are sent to the service
        Console.WriteLine("BeforeSendRequest called");
        return null;
    }
}
```

```csharp
// Endpoint behavior
public class SimpleEndpointBehavior : IEndpointBehavior
{
    public void AddBindingParameters(ServiceEndpoint endpoint, System.ServiceModel.Channels.BindingParameterCollection bindingParameters)
    {
         // No implementation necessary
    }

    public void ApplyClientBehavior(ServiceEndpoint endpoint, ClientRuntime clientRuntime)
    {
        clientRuntime.MessageInspectors.Add(new SimpleMessageInspector());
    }

    public void ApplyDispatchBehavior(ServiceEndpoint endpoint, EndpointDispatcher endpointDispatcher)
    {
         // No implementation necessary
    }

    public void Validate(ServiceEndpoint endpoint)
    {
         // No implementation necessary
    }
}
```

```csharp
// Configuration element
public class SimpleBehaviorExtensionElement : BehaviorExtensionElement
{
    public override Type BehaviorType
    {
        get { return typeof(SimpleEndpointBehavior); }
    }

    protected override object CreateBehavior()
    {
         // Create the  endpoint behavior that will insert the message
         // inspector into the client runtime
        return new SimpleEndpointBehavior();
    }
}
```

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
    <system.serviceModel>
        <client>
            <endpoint address="http://localhost:8080/SimpleService/"
                      binding="wsHttpBinding"
                      behaviorConfiguration="clientInspectorsAdded"
                      contract="ServiceReference1.IService1"
                      name="WSHttpBinding_IService1"/>
        </client>

      <behaviors>
        <endpointBehaviors>
          <behavior name="clientInspectorsAdded">
            <simpleBehaviorExtension />
          </behavior>
        </endpointBehaviors>
      </behaviors>
      <extensions>
        <behaviorExtensions>
          <add
            name="simpleBehaviorExtension"
            type="SimpleServiceLib.SimpleBehaviorExtensionElement, Host, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null"/>
        </behaviorExtensions>
      </extensions>
    </system.serviceModel>
</configuration>
```

## See also

- [System.ServiceModel.Dispatcher.IClientMessageInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IClientMessageInspector)
- [System.ServiceModel.Dispatcher.IDispatchMessageInspector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IDispatchMessageInspector)
- [Configuring and Extending the Runtime with Behaviors](configuring-and-extending-the-runtime-with-behaviors.md)
