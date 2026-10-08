### System.ServiceModel.Web.WebServiceHost object no longer adds a default endpoint

#### Details

The [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost) object no longer adds a default endpoint if an explicit endpoint has been added by application code.

#### Suggestion

If users will expect to be able to connect to a default endpoint and other explicit endpoints have been added to the [System.ServiceModel.Web.WebServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.Web.WebServiceHost), default endpoints should also be added explicitly (using [System.ServiceModel.ServiceHostBase.AddDefaultEndpoints](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase.AddDefaultEndpoints)).

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type,System.ServiceModel.Channels.Binding,System.String)](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type%2CSystem.ServiceModel.Channels.Binding%2CSystem.String))
- [System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type,System.ServiceModel.Channels.Binding,System.Uri)](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type%2CSystem.ServiceModel.Channels.Binding%2CSystem.Uri))
- [System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type,System.ServiceModel.Channels.Binding,System.String,System.Uri)](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type%2CSystem.ServiceModel.Channels.Binding%2CSystem.String%2CSystem.Uri))
- [System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type,System.ServiceModel.Channels.Binding,System.Uri,System.Uri)](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type%2CSystem.ServiceModel.Channels.Binding%2CSystem.Uri%2CSystem.Uri))
- [System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type,System.ServiceModel.Channels.Binding,System.Uri,System.Uri)](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type%2CSystem.ServiceModel.Channels.Binding%2CSystem.Uri%2CSystem.Uri))
- [System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.ServiceModel.Description.ServiceEndpoint)](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.ServiceModel.Description.ServiceEndpoint))
- [System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.String,System.ServiceModel.Channels.Binding,System.String)](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.String%2CSystem.ServiceModel.Channels.Binding%2CSystem.String))
- [System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.String,System.ServiceModel.Channels.Binding,System.Uri)](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.String%2CSystem.ServiceModel.Channels.Binding%2CSystem.Uri))
- [System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.String,System.ServiceModel.Channels.Binding,System.String,System.Uri)](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.String%2CSystem.ServiceModel.Channels.Binding%2CSystem.String%2CSystem.Uri))
- [System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.String,System.ServiceModel.Channels.Binding,System.Uri,System.Uri)](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.String%2CSystem.ServiceModel.Channels.Binding%2CSystem.Uri%2CSystem.Uri))

<!--

#### Affected APIs

- `M:System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type,System.ServiceModel.Channels.Binding,System.String)`
- `M:System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type,System.ServiceModel.Channels.Binding,System.Uri)`
- `M:System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type,System.ServiceModel.Channels.Binding,System.String,System.Uri)`
- `M:System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type,System.ServiceModel.Channels.Binding,System.Uri,System.Uri)`
- `M:System.ServiceModel.ServiceHost.AddServiceEndpoint(System.Type,System.ServiceModel.Channels.Binding,System.Uri,System.Uri)`
- `M:System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.ServiceModel.Description.ServiceEndpoint)`
- `M:System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.String,System.ServiceModel.Channels.Binding,System.String)`
- `M:System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.String,System.ServiceModel.Channels.Binding,System.Uri)`
- `M:System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.String,System.ServiceModel.Channels.Binding,System.String,System.Uri)`
- `M:System.ServiceModel.ServiceHostBase.AddServiceEndpoint(System.String,System.ServiceModel.Channels.Binding,System.Uri,System.Uri)`

-->
