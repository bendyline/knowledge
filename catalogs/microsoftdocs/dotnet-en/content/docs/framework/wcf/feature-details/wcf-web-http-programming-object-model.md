---
description: "Learn more about: WCF Web HTTP Programming Object Model"
title: "WCF Web HTTP Programming Object Model"
ms.date: "03/30/2017"
ms.assetid: ed96b5fc-ca2c-4b0d-bdba-d06b77c3cb2a
---
# WCF Web HTTP Programming Object Model

The WCF WEB HTTP  Programming Model allows developers to expose Windows Communication Foundation (WCF) Web services through basic HTTP requests without requiring SOAP. The WCF WEB HTTP  Programming Model is built on top of the existing WCF extensibility model. It defines the following classes:  
  
 **Programming Model:**  
  
- [System.ServiceModel.Web.AspNetCacheProfileAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.AspNetCacheProfileAttribute)  
  
- [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute)  
  
- [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute)  
  
- [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost)  
  
 **Channels and Dispatcher Infrastructure:**  
  
- [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding)  
  
- [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior)  
  
 **Utility Classes and Extensibility Points:**  
  
- [System.UriTemplate](https://learn.microsoft.com/search/?terms=System.UriTemplate)  
  
- [System.UriTemplateTable](https://learn.microsoft.com/search/?terms=System.UriTemplateTable)  
  
- [System.ServiceModel.Dispatcher.QueryStringConverter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.QueryStringConverter)  
  
- [System.ServiceModel.Dispatcher.WebHttpDispatchOperationSelector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.WebHttpDispatchOperationSelector)  
  
## AspNetCacheProfileAttribute  

 The [System.ServiceModel.Web.AspNetCacheProfileAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.AspNetCacheProfileAttribute), when applied to a service operation, indicates the ASP.NET output cache profile in the configuration file that should be used by to cache responses from the operation in the ASP .NET Output Cache. This property takes only one parameter, the cache profile name that specifies the cache settings in the configuration file.  
  
## WebGetAttribute  

 The [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute) attribute is used to mark a service operation as one that responds to HTTP GET requests. It is a passive operation behavior (the [System.ServiceModel.Description.IOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IOperationBehavior) methods do nothing) that adds metadata to the operation description. Applying the [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute) has no effect unless a behavior that looks for this metadata in the operation description (specifically, the [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior)) is added to the service's behavior collection. The [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute) attribute takes the optional parameters shown in the following table.  
  
| Parameter | Description |
| --- | --- |
| `BodyStyle` | Controls whether to wrap requests and responses sent to and received from the service operation the attribute is applied to. |
| `RequestFormat` | Controls how request messages are formatted. |
| `ResponseFormat` | Controls how response messages are formatted. |
| `UriTemplate` | Specifies the URI template that controls what HTTP requests get mapped to the service operation the attribute is applied to. |
  
## WebHttpBinding  

 The [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding) class incorporates support for XML, JSON, and raw binary data using the [System.ServiceModel.Channels.WebMessageEncodingBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.WebMessageEncodingBindingElement). It is composed of an [System.ServiceModel.Channels.HttpsTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpsTransportBindingElement), [System.ServiceModel.Channels.HttpTransportBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.HttpTransportBindingElement) and a [System.ServiceModel.WebHttpSecurity](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpSecurity) object. The [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding) is designed to be used in conjunction with the [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior).  
  
## WebInvokeAttribute  

 The [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute) attribute is similar to the [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute), but it is used to mark a service operation as one that responds to HTTP requests other than GET. It is a passive operation behavior (the [System.ServiceModel.Description.IOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IOperationBehavior) methods do nothing) that adds metadata to the operation description. Applying the [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute) has no effect unless a behavior that looks for this metadata in the operation description (specifically, the [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior)) is added to the service's behavior collection.  
  
 The [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute) attribute takes the optional parameters shown in the following table.  
  
| Parameter | Description |
| --- | --- |
| `BodyStyle` | Controls whether to wrap requests and responses sent to and received from the service operation the attribute is applied to. |
| `Method` | Specifies the HTTP method the service operation is mapped to. |
| `RequestFormat` | Controls how request messages are formatted. |
| `ResponseFormat` | Controls how response messages are formatted. |
| `UriTemplate` | Specifies the URI template that controls what GET requests get mapped to the service operation the attribute is applied to. |
  
## UriTemplate  

 The [System.UriTemplate](https://learn.microsoft.com/search/?terms=System.UriTemplate) class allows you to define a set of structurally similar URIs. Templates are composed of two parts, a path and a query. A path consists of a series of segments delimited by a slash (/). Each segment can have a literal value, a variable value (written within curly braces [{ }], constrained to match the contents of exactly one segment), or a wildcard (written as an asterisk [\*], which matches "the rest of the path"), which must appear at the end of the path. The query expression can be omitted entirely. If present, it specifies an unordered series of name/value pairs. Elements of the query expression can be either literal pairs (?x=2) or variable pairs (?x={*value*}). Unpaired values are not permitted. [System.UriTemplate](https://learn.microsoft.com/search/?terms=System.UriTemplate) is used internally by the WCF WEB HTTP  Programming Model to map specific URIs or groups of URIs to service operations.  
  
## UriTemplateTable  

 The [System.UriTemplateTable](https://learn.microsoft.com/search/?terms=System.UriTemplateTable) class represents an associative set of [System.UriTemplate](https://learn.microsoft.com/search/?terms=System.UriTemplate) objects bound to an object of the developer's choosing. It lets you match candidate Uniform Resource Identifiers (URIs) against the templates in the set and retrieve the data associated with the matching templates. [System.UriTemplateTable](https://learn.microsoft.com/search/?terms=System.UriTemplateTable) is used internally by the WCF WEB HTTP  Programming Model to map specific URIs or groups of URIs to service operations.  
  
## WebServiceHost  

 [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) extends the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) to make it easier to host a non-SOAP Web-style service. If [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) finds no endpoints in the service description, it automatically creates a default endpoint at the service's base address. When creating a default HTTP endpoint, the [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) also disables the HTTP Help page and the Web Services Description Language (WSDL) GET functionality so the metadata endpoint does not interfere with the default HTTP endpoint. [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) also ensures that all endpoints that use [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding) have the required [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior) attached. Finally, [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) automatically configures the endpoint's binding to work with the associated Internet Information Services (IIS) security settings when used in a secure virtual directory.  
  
## WebServiceHostFactory  

 The [System.ServiceModel.Activation.WebServiceHostFactory](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activation.WebServiceHostFactory) class is used to dynamically create a [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) when a service is hosted under Internet Information Services (IIS) or Windows Process Activation Service (WAS). Unlike a self-hosted service where the hosting application instantiates the [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost), services hosted under IIS or WAS use this class to create the [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) for the service. The [System.ServiceModel.Activation.WebServiceHostFactory.CreateServiceHost%28System.Type%2CSystem.Uri%5B%5D%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activation.WebServiceHostFactory.CreateServiceHost%2528System.Type%252CSystem.Uri%255B%255D%2529) method is called when a incoming request for the service is received.  
  
## WebHttpBehavior  

 The [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior) class supplies the necessary formatters, operation selectors, and so on, required for Web-style service support at the Service Model layer. This is implemented as an endpoint behavior (used in conjunction with the [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding)) and allows formatters and operation selectors to be specified for each endpoint, which enables the same service implementation to expose both SOAP and POX endpoints.  
  
### Extending WebHttpBehavior  

 [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior) is extensible by using a number of virtual methods: [System.ServiceModel.Description.WebHttpBehavior.GetOperationSelector%28System.ServiceModel.Description.ServiceEndpoint%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior.GetOperationSelector%2528System.ServiceModel.Description.ServiceEndpoint%2529), [System.ServiceModel.Description.WebHttpBehavior.GetReplyClientFormatter%28System.ServiceModel.Description.OperationDescription%2CSystem.ServiceModel.Description.ServiceEndpoint%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior.GetReplyClientFormatter%2528System.ServiceModel.Description.OperationDescription%252CSystem.ServiceModel.Description.ServiceEndpoint%2529), [System.ServiceModel.Description.WebHttpBehavior.GetRequestClientFormatter%28System.ServiceModel.Description.OperationDescription%2CSystem.ServiceModel.Description.ServiceEndpoint%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior.GetRequestClientFormatter%2528System.ServiceModel.Description.OperationDescription%252CSystem.ServiceModel.Description.ServiceEndpoint%2529), [System.ServiceModel.Description.WebHttpBehavior.GetReplyDispatchFormatter%28System.ServiceModel.Description.OperationDescription%2CSystem.ServiceModel.Description.ServiceEndpoint%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior.GetReplyDispatchFormatter%2528System.ServiceModel.Description.OperationDescription%252CSystem.ServiceModel.Description.ServiceEndpoint%2529), and [System.ServiceModel.Description.WebHttpBehavior.GetRequestDispatchFormatter%28System.ServiceModel.Description.OperationDescription%2CSystem.ServiceModel.Description.ServiceEndpoint%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior.GetRequestDispatchFormatter%2528System.ServiceModel.Description.OperationDescription%252CSystem.ServiceModel.Description.ServiceEndpoint%2529). Developers can derive a class from [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior) and override these methods to customize the default behavior.  
  
 The [System.ServiceModel.Description.WebScriptEnablingBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebScriptEnablingBehavior) is an example of extending [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior). [System.ServiceModel.Description.WebScriptEnablingBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebScriptEnablingBehavior) enables Windows Communication Foundation (WCF) endpoints to receive HTTP requests from a browser-based ASP.NET AJAX client. The [AJAX Service Using HTTP POST](../samples/ajax-service-using-http-post.md) is an example of using this extensibility point.  
  
> **Warning:**
> When using the [System.ServiceModel.Description.WebScriptEnablingBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebScriptEnablingBehavior), [System.UriTemplate](https://learn.microsoft.com/search/?terms=System.UriTemplate) are not supported within [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute) or [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute) attributes.  
  
## WebHttpDispatchOperationSelector  

 The [System.ServiceModel.Dispatcher.WebHttpDispatchOperationSelector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.WebHttpDispatchOperationSelector) class uses [System.UriTemplate](https://learn.microsoft.com/search/?terms=System.UriTemplate) and [System.UriTemplateTable](https://learn.microsoft.com/search/?terms=System.UriTemplateTable) classes to dispatch calls to service operations.  
  
## Compatibility  

 The WCF WEB HTTP Programming Model does not use SOAP-based messages and therefore does not support the WS-* protocols. You can however, expose the same contract by two different endpoint: one using SOAP and the other not using SOAP. See [How to: Expose a Contract to SOAP and Web Clients](how-to-expose-a-contract-to-soap-and-web-clients.md) for an example.  
  
## Security  

Because the WCF WEB HTTP  Programming Model does not support the WS-* protocols the only way to secure a Web service built on the WCF WEB HTTP  Programming Model is to expose your service using SSL. For more information about setting up SSL with IIS 7.0 see [How to implement SSL in IIS](https://support.microsoft.com/help/299875/how-to-implement-ssl-in-iis).
  
## See also

- [System.ServiceModel.WebHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WebHttpBinding)
- [System.ServiceModel.Web.WebGetAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebGetAttribute)
- [System.ServiceModel.Web.WebInvokeAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebInvokeAttribute)
- [System.ServiceModel.Description.WebHttpBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WebHttpBehavior)
- [System.ServiceModel.Dispatcher.WebHttpDispatchOperationSelector](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.WebHttpDispatchOperationSelector)
- [WCF Web HTTP Programming Model Overview](wcf-web-http-programming-model-overview.md)
