---
title: "Configuring and Extending the Runtime with Behaviors"
description: Learn how to implement behavior interfaces in WCF apps and add them to a service description or endpoint, either programmatically or in a configuration file.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "attaching extensions using behaviors [WCF]"
ms.assetid: 149b99b6-6eb6-4f45-be22-c967279677d9
---
# Configuring and Extending the Runtime with Behaviors

Behaviors enable you to modify default behavior and add custom extensions that inspect and validate service configuration or modify runtime behavior in Windows Communication Foundation (WCF) client and service applications. This topic describes the behavior interfaces, how to implement them, and how to add them to the service description (in a service application) or endpoint (in a client application) programmatically or in a configuration file. For more information about using system-provided behaviors, see [Specifying Service Run-Time Behavior](../specifying-service-run-time-behavior.md) and [Specifying Client Run-Time Behavior](../specifying-client-run-time-behavior.md).

## Behaviors

 Behavior types are added to the service or service endpoint description objects (on the service or client, respectively) before those objects are used by Windows Communication Foundation (WCF) to create a runtime that executes a WCF service or a WCF client. When these behaviors are called during the runtime construction process they are then able to access runtime properties and methods that modify the runtime constructed by the contract, bindings, and addresses.

### Behavior Methods

 All behaviors have an `AddBindingParameters` method, an `ApplyDispatchBehavior` method, a `Validate` method, and an `ApplyClientBehavior` method with one exception: Because [System.ServiceModel.Description.IServiceBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IServiceBehavior) cannot execute in a client, it does not implement `ApplyClientBehavior`.

- Use the `AddBindingParameters` method to modify or add custom objects to a collection that custom bindings can access for their use when the runtime is constructed. For example, this how protection requirements are specified that affect the way the channel is built, but are not known by the channel developer.

- Use the `Validate` method to examine the description tree and corresponding runtime object to ensure it conforms to some set of criteria.

- Use the `ApplyDispatchBehavior` and `ApplyClientBehavior` methods to examine the description tree and modify the runtime for a particular scope on either the service or the client. You can also insert extension objects as well.

    > **Note:**
    > Although a description tree is provided in these methods, it is for examination only. If a description tree is modified, the behavior is undefined.

 The properties you can modify and the customization interfaces you can implement are accessed through the service and client runtime classes. The service types are the [System.ServiceModel.Dispatcher.DispatchRuntime](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.DispatchRuntime) and  [System.ServiceModel.Dispatcher.DispatchOperation](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.DispatchOperation) classes. The client types are the [System.ServiceModel.Dispatcher.ClientRuntime](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.ClientRuntime) and [System.ServiceModel.Dispatcher.ClientOperation](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.ClientOperation) classes. The [System.ServiceModel.Dispatcher.ClientRuntime](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.ClientRuntime) and [System.ServiceModel.Dispatcher.DispatchRuntime](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.DispatchRuntime) classes are the extensibility entry points to access client-wide and service-wide runtime properties and extension collections, respectively. Similarly, the [System.ServiceModel.Dispatcher.ClientOperation](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.ClientOperation) and  [System.ServiceModel.Dispatcher.DispatchOperation](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.DispatchOperation) classes expose client operation and service operation runtime properties and extension collections, respectively. You can, however, access the wider scoped runtime object from the operation runtime object and vice versa if need be.

> **Note:**
> For a discussion of runtime properties and extension types that you can use to modify the execution behavior of a client, see [Extending Clients](extending-clients.md). For a discussion of runtime properties and extension types that you can use to modify the execution behavior of a service dispatcher, see [Extending Dispatchers](extending-dispatchers.md).

 Most WCF users do not interact with the runtime directly; instead they use core programming model constructs like endpoints, contracts, bindings, addresses, and behavior attributes on classes or behaviors in configuration files. These constructs make up the *description tree*, which is the complete specification for constructing a runtime to support a service or client described by the description tree.

 There are four kinds of behaviors in WCF:

- Service behaviors ([System.ServiceModel.Description.IServiceBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IServiceBehavior) types) enable the customization of the entire service runtime including [System.ServiceModel.ServiceHostBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase).

- Endpoint behaviors ([System.ServiceModel.Description.IEndpointBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IEndpointBehavior) types) enable the customization of service endpoints and their associated [System.ServiceModel.Dispatcher.EndpointDispatcher](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.EndpointDispatcher) objects.

- Contract behaviors ([System.ServiceModel.Description.IContractBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IContractBehavior) types) enable the customization of both the [System.ServiceModel.Dispatcher.ClientRuntime](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.ClientRuntime) and [System.ServiceModel.Dispatcher.DispatchRuntime](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.DispatchRuntime) classes in client and service applications, respectively.

- Operation behaviors ([System.ServiceModel.Description.IOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IOperationBehavior) types) enable the customization of the [System.ServiceModel.Dispatcher.ClientOperation](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.ClientOperation) and [System.ServiceModel.Dispatcher.DispatchOperation](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.DispatchOperation) classes, again, on the client and service.

 You can add these behaviors to the various description objects by implementing custom attributes, using application configuration files, or directly by adding them to the behaviors collection on the appropriate description object. The must, however, be added to a service description or service endpoint description object prior to calling [System.ServiceModel.ICommunicationObject.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ICommunicationObject.Open*) on the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) or a [System.ServiceModel.ChannelFactory`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601).

### Behavior Scopes

 There are four behavior types, each of which corresponds to a particular scope of runtime access.

#### Service Behaviors

 Service behaviors, which implement [System.ServiceModel.Description.IServiceBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IServiceBehavior), are the primary mechanism by which you modify the entire service runtime. There are three mechanisms for adding service behaviors to a service.

1. Using an attribute on the service class.  When a [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) is constructed, the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) implementation uses reflection to discover the set of attributes on the type of the service. If any of those attributes are implementations of [System.ServiceModel.Description.IServiceBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IServiceBehavior), they are added to the behaviors collection on [System.ServiceModel.Description.ServiceDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDescription). This allows those behaviors to participate in the construction of the service runtime.

2. Programmatically adding the behavior to the behaviors collection on [System.ServiceModel.Description.ServiceDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDescription). This can be accomplished with the following lines of code:

    ```csharp
    ServiceHost host = new ServiceHost(/* Parameters */);
    host.Description.Behaviors.Add(/* Service Behavior */);
    ```

3. Implementing a custom [System.ServiceModel.Configuration.BehaviorExtensionElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.BehaviorExtensionElement) that extends configuration. This enables the use of the service behavior from application configuration files.

 Examples of service behaviors in WCF include the [System.ServiceModel.ServiceBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute) attribute, the [System.ServiceModel.Description.ServiceThrottlingBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceThrottlingBehavior), and the [System.ServiceModel.Description.ServiceMetadataBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceMetadataBehavior) behavior.

#### Contract Behaviors

 Contract behaviors, which implement the [System.ServiceModel.Description.IContractBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IContractBehavior) interface, are used to extend both the client and service runtime across a contract.

 There are two mechanisms for adding contract behaviors to a contract.  The first mechanism is to create a custom attribute to be used on the contract interface. When a contract interface is passed to either a [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) or a [System.ServiceModel.ChannelFactory`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601), WCF examines the attributes on the interface. If any attributes are implementations of [System.ServiceModel.Description.IContractBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IContractBehavior), those are added to the behaviors collection on the [System.ServiceModel.Description.ContractDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ContractDescription) created for that interface.

 You can also implement the [System.ServiceModel.Description.IContractBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IContractBehaviorAttribute) on the custom contract behavior attribute. In this case, the behavior is as follows when applied to:

 •A contract interface. In this case, the behavior is applied to all contracts of that type in any endpoint and WCF ignores the value of the [System.ServiceModel.Description.IContractBehaviorAttribute.TargetContract](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IContractBehaviorAttribute.TargetContract) property.

 •A service class. In this case, the behavior is applied only to endpoints the contract of which is the value of the [System.ServiceModel.Description.IContractBehaviorAttribute.TargetContract](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IContractBehaviorAttribute.TargetContract) property.

 •A callback class. In this case, the behavior is applied to the duplex client's endpoint and WCF ignores the value of the [System.ServiceModel.Description.IContractBehaviorAttribute.TargetContract](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IContractBehaviorAttribute.TargetContract) property.

 The second mechanism is to add the behavior to the behaviors collection on a [System.ServiceModel.Description.ContractDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ContractDescription).

 Examples of contract behaviors in WCF include the [System.ServiceModel.DeliveryRequirementsAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.DeliveryRequirementsAttribute) attribute. For more information and an example, see the reference topic.

#### Endpoint Behaviors

 Endpoint behaviors, which implement [System.ServiceModel.Description.IEndpointBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IEndpointBehavior), are the primary mechanism by which you modify the entire service or client runtime for a specific endpoint.

 There are two mechanisms for adding endpoint behaviors to a service.

1. Add the behavior to the [System.ServiceModel.Description.ServiceEndpoint.Behaviors](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint.Behaviors) property.

2. Implement a custom [System.ServiceModel.Configuration.BehaviorExtensionElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.BehaviorExtensionElement) that extends configuration.

 For more information and an example, see the reference topic.

#### Operation Behaviors

 Operation behaviors, which implement the [System.ServiceModel.Description.IOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IOperationBehavior) interface, are used to extend both the client and service runtime for each operation.

 There are two mechanisms for adding operation behaviors to an operation. The first mechanism is to create a custom attribute to be used on the method that models the operation. When an operation is added to either a [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) or a [System.ServiceModel.ChannelFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory), WCF adds any  [System.ServiceModel.Description.IOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IOperationBehavior) attributes to the behaviors collection on the [System.ServiceModel.Description.OperationDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription) created for that operation.

 The second mechanism is by directly adding the behavior to the behaviors collection on a constructed [System.ServiceModel.Description.OperationDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription).

 Examples of operation behaviors in WCF include the [System.ServiceModel.OperationBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationBehaviorAttribute) and the [System.ServiceModel.TransactionFlowAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.TransactionFlowAttribute).

 For more information and an example, see the reference topic.

### Using Configuration to Create Behaviors

 Service and endpoint, and contract behaviors can by designed to be specified in code or using attributes; only service and endpoint behaviors can be configured using application or Web configuration files. Exposing behaviors using attributes allows developers to specify a behavior at compilation-time that cannot be added, removed, or modified at runtime. This is often suitable for behaviors that are always required for the correct operation of a service (for example, the transaction-related parameters to the [System.ServiceModel.ServiceBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute) attribute). Exposing behaviors using configuration allows developers to leave the specification and configuration of those behaviors to those who deploy the service. This is suitable for behaviors that are optional components or other deployment-specific configuration, such as whether metadata is exposed for the service or the particular authorization configuration for a service.

> **Note:**
> You can also use behaviors that support configuration to enforce company application policies by inserting them into the machine.config configuration file and locking those items down. For a description and an example, see [How to: Lock Down Endpoints in the Enterprise](how-to-lock-down-endpoints-in-the-enterprise.md).

 To expose a behavior using configuration, a developer must create a derived class of [System.ServiceModel.Configuration.BehaviorExtensionElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.BehaviorExtensionElement) and then register that extension with configuration.

 The following code example shows how an  [System.ServiceModel.Description.IEndpointBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IEndpointBehavior) implements [System.ServiceModel.Configuration.BehaviorExtensionElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.BehaviorExtensionElement):

```csharp
// BehaviorExtensionElement members
public override Type BehaviorType
{
  get { return typeof(EndpointBehaviorMessageInspector); }
}

protected override object CreateBehavior()
{
  return new EndpointBehaviorMessageInspector();
}
```

 In order for the configuration system to load a custom [System.ServiceModel.Configuration.BehaviorExtensionElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.BehaviorExtensionElement), it must be registered as an extension. The following code example shows the configuration file for the preceding endpoint behavior:

```xml
<configuration>
  <system.serviceModel>
    <services>
      <service
        name="Microsoft.WCF.Documentation.SampleService"
        behaviorConfiguration="metadataSupport"
      >
        <host>
          <baseAddresses>
            <add baseAddress="http://localhost:8080/ServiceMetadata" />
          </baseAddresses>
        </host>
        <endpoint
          address="/SampleService"
          binding="wsHttpBinding"
          behaviorConfiguration="withMessageInspector"
          contract="Microsoft.WCF.Documentation.ISampleService"
        />
        <endpoint
           address="mex"
           binding="mexHttpBinding"
           contract="IMetadataExchange"
        />
      </service>
    </services>
    <behaviors>
      <serviceBehaviors>
      <behavior name="metadataSupport">
        <serviceMetadata httpGetEnabled="true" httpGetUrl=""/>
      </behavior>
      </serviceBehaviors>
      <endpointBehaviors>
        <behavior name="withMessageInspector">
          <endpointMessageInspector />
        </behavior>
      </endpointBehaviors>
    </behaviors>
    <extensions>
      <behaviorExtensions>
        <add
          name="endpointMessageInspector"
          type="Microsoft.WCF.Documentation.EndpointBehaviorMessageInspector, HostApplication, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null"
        />
      </behaviorExtensions>
    </extensions>
  </system.serviceModel>
</configuration>
```

 Where `Microsoft.WCF.Documentation.EndpointBehaviorMessageInspector` is the behavior extension type and `HostApplication` is the name of the assembly into which that class has been compiled.

### Evaluation Order

 The [System.ServiceModel.ChannelFactory`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601) and the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) are responsible for building the runtime from the programming model and description. Behaviors, as previously described, contribute to that build process at the service, endpoint, contract, and operation.

 The [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) applies behaviors in the following order:

1. Service

2. Contract

3. Endpoint

4. Operation

 Within any collection of behaviors, no order is guaranteed.

 The [System.ServiceModel.ChannelFactory`1](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory%601) applies behaviors in the following order:

1. Contract

2. Endpoint

3. Operation

 Within any collection of behaviors, again, no order is guaranteed.

### Adding Behaviors Programmatically

 Properties of the [System.ServiceModel.Description.ServiceDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceDescription) in the service application must not be modified subsequent to the [System.ServiceModel.Channels.CommunicationObject.OnOpening*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CommunicationObject.OnOpening*) method on [System.ServiceModel.ServiceHostBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase). Some members, like the [System.ServiceModel.ServiceHostBase.Credentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase.Credentials) property and the `AddServiceEndpoint` methods on [System.ServiceModel.ServiceHostBase](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase) and [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost), throw an exception if modified past that point. Others permit you to modify them, but the result is undefined.

 Similarly, on the client the [System.ServiceModel.Description.ServiceEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint) values must not be modified after the call to [System.ServiceModel.Channels.CommunicationObject.OnOpening*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CommunicationObject.OnOpening*) on the [System.ServiceModel.ChannelFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory). The [System.ServiceModel.ChannelFactory.Credentials](https://learn.microsoft.com/search/?terms=System.ServiceModel.ChannelFactory.Credentials) property throws an exception if modified past that point, but the other client description values can be modified without error. The result, however, is undefined.

 Whether for the service or client, it is recommended that you modify the description prior to calling [System.ServiceModel.Channels.CommunicationObject.Open*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CommunicationObject.Open*).

### Inheritance Rules for Behavior Attributes

 All four types of behaviors can be populated using attributes – service behaviors and contract behaviors. Because attributes are defined on managed objects and members, and managed objects and members support inheritance, it is necessary to define how behavior attributes work in the context of inheritance.

 At a high level, the rule is that for a particular scope (for example, service, contract, or operation), all behavior attributes in the inheritance hierarchy for that scope are applied. If there are two behavior attributes of the same type, only the most-derived type is used.

#### Service Behaviors

 For a given service class, all service behavior attributes on that class, and on parents of that class, are applied. If the same type of attribute is applied at multiple places in the inheritance hierarchy, the most-derived type is used.

```csharp
[ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Multiple)]
[AspNetCompatibilityRequirementsAttribute(
    AspNetCompatibilityRequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
public class A { /* … */ }

[ServiceBehavior(InstanceContextMode = InstanceContextMode.Single)]
public class B : A { /* … */}
```

 For example, in the preceding case, the service B ends up with an [System.ServiceModel.InstanceContextMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode) of [System.ServiceModel.InstanceContextMode.Single](https://learn.microsoft.com/search/?terms=System.ServiceModel.InstanceContextMode.Single), an [System.ServiceModel.Activation.AspNetCompatibilityRequirementsMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activation.AspNetCompatibilityRequirementsMode) mode of [System.ServiceModel.Activation.AspNetCompatibilityRequirementsMode.Allowed](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activation.AspNetCompatibilityRequirementsMode.Allowed), and a [System.ServiceModel.ConcurrencyMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode) of [System.ServiceModel.ConcurrencyMode.Single](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode.Single). The [System.ServiceModel.ConcurrencyMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode) is [System.ServiceModel.ConcurrencyMode.Single](https://learn.microsoft.com/search/?terms=System.ServiceModel.ConcurrencyMode.Single), because [System.ServiceModel.ServiceBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceBehaviorAttribute) attribute on service B is on "more derived" than that on service A.

#### Contract Behaviors

 For a given contract, all contract behavior attributes on that interface and on parents of that interface, are applied. If the same type of attribute is applied at multiple places in the inheritance hierarchy, the most-derived type is used.

#### Operation Behaviors

 If a given operation does not override an existing abstract or virtual operation, no inheritance rules apply.

 If an operation does override an existing operation, then all operation behavior attributes on that operation and on parents of that operation, are applied.  If the same type of attribute is applied at multiple places in the inheritance hierarchy, the most-derived type is used.
