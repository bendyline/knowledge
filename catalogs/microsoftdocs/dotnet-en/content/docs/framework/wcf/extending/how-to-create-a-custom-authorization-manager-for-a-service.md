---
description: "Learn more about: How to: Create a Custom Authorization Manager for a Service"
title: "How to: Create a Custom Authorization Manager for a Service"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "Windows Communication Foundation, extending"
  - "OperationRequirement class"
ms.assetid: 6214afde-44c1-4bf5-ba07-5ad6493620ea
---
# How to: Create a Custom Authorization Manager for a Service

The Identity Model infrastructure in Windows Communication Foundation (WCF) supports an extensible claims-based authorization model. Claims are extracted from tokens and optionally processed by custom authorization policies and then placed into an [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext). An authorization manager examines the claims in the [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext) to make authorization decisions.

By default, authorization decisions are made by the [System.ServiceModel.ServiceAuthorizationManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager) class; however these decisions can be overridden by creating a custom authorization manager. To create a custom authorization manager, create a class that derives from [System.ServiceModel.ServiceAuthorizationManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager) and implement [System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore*) method. Authorization decisions are made in the [System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore*) method, which returns `true` when access is granted and `false` when access is denied.

If the authorization decision depends on the contents of the message body, use the [System.ServiceModel.ServiceAuthorizationManager.CheckAccess*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager.CheckAccess*) method.

Because of performance issues, if possible you should redesign your application so that the authorization decision does not require access to the message body.

Registration of the custom authorization manager for a service can be done in code or configuration.

### To create a custom authorization manager

1. Derive a class from the [System.ServiceModel.ServiceAuthorizationManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager) class.

    [c_CustomAuthMgr#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customauthmgr/cs/c_customauthmgr.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customauthmgr/cs/c_customauthmgr.cs.md)
    [c_CustomAuthMgr#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customauthmgr/vb/c_customauthmgr.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customauthmgr/vb/c_customauthmgr.vb.md)

2. Override the [System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore%28System.ServiceModel.OperationContext%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore%2528System.ServiceModel.OperationContext%2529) method.

    Use the [System.ServiceModel.OperationContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext) that is passed to the [System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore%28System.ServiceModel.OperationContext%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore%2528System.ServiceModel.OperationContext%2529) method to make authorization decisions.

    The following code example uses the [System.IdentityModel.Claims.ClaimSet.FindClaims%28System.String%2CSystem.String%29](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet.FindClaims%2528System.String%252CSystem.String%2529) method to find the custom claim `http://www.contoso.com/claims/allowedoperation` to make an authorization decision.

    [c_CustomAuthMgr#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customauthmgr/cs/c_customauthmgr.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customauthmgr/cs/c_customauthmgr.cs.md)
    [c_CustomAuthMgr#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customauthmgr/vb/c_customauthmgr.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customauthmgr/vb/c_customauthmgr.vb.md)

### To register a custom authorization manager using code

1. Create an instance of the custom authorization manager and assign it to the [System.ServiceModel.Description.ServiceAuthorizationBehavior.ServiceAuthorizationManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceAuthorizationBehavior.ServiceAuthorizationManager) property.

    The [System.ServiceModel.Description.ServiceAuthorizationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceAuthorizationBehavior) can be accessed using [System.ServiceModel.ServiceHostBase.Authorization](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHostBase.Authorization) property.

    The following code example registers the `MyServiceAuthorizationManager` custom authorization manager.

    [c_CustomAuthMgr#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customauthmgr/cs/c_customauthmgr.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customauthmgr/cs/c_customauthmgr.cs.md)
    [c_CustomAuthMgr#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customauthmgr/vb/c_customauthmgr.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customauthmgr/vb/c_customauthmgr.vb.md)

### To register a custom authorization manager using configuration

1. Open the configuration file for the service.

2. Add a [\<serviceAuthorization>](../../configure-apps/file-schema/wcf/serviceauthorization-element.md) to the [\<behaviors>](../../configure-apps/file-schema/wcf/behaviors.md).

    To the [\<serviceAuthorization>](../../configure-apps/file-schema/wcf/serviceauthorization-element.md), add a `serviceAuthorizationManagerType` attribute and set its value to the type that represents the custom authorization manager.

3. Add a binding that secures the communication between the client and service.

    The binding that is chosen for this communication determines the claims that are added to the [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext), which the custom authorization manager uses to make authorization decisions. For more details about the system-provided bindings, see [System-Provided Bindings](../system-provided-bindings.md).

4. Associate the behavior to a service endpoint, by adding a [\<service>](../../configure-apps/file-schema/wcf/service.md) element and set the value of the `behaviorConfiguration` attribute to the value of the name attribute for the [\<behavior>](../../configure-apps/file-schema/wcf/behavior-of-servicebehaviors.md) element.

    For more information about configuring a service endpoint, see [How to: Create a Service Endpoint in Configuration](../feature-details/how-to-create-a-service-endpoint-in-configuration.md).

    The following code example registers the custom authorization manager `Samples.MyServiceAuthorizationManager`.

    ```xml
    <configuration>
      <system.serviceModel>
        <services>
          <service
              name="Microsoft.ServiceModel.Samples.CalculatorService"
              behaviorConfiguration="CalculatorServiceBehavior">
            <host>
              <baseAddresses>
                <add baseAddress="http://localhost:8000/ServiceModelSamples/service"/>
              </baseAddresses>
            </host>
            <endpoint address=""
                      binding="wsHttpBinding_Calculator"
                      contract="Microsoft.ServiceModel.Samples.ICalculator" />
          </service>
        </services>
        <bindings>
          <WSHttpBinding>
           <binding name = "wsHttpBinding_Calculator">
             <security mode="Message">
               <message clientCredentialType="Windows"/>
             </security>
            </binding>
          </WSHttpBinding>
        </bindings>
        <behaviors>
          <serviceBehaviors>
            <behavior name="CalculatorServiceBehavior">
              <serviceAuthorization serviceAuthorizationManagerType="Samples.MyServiceAuthorizationManager,MyAssembly" />
             </behavior>
         </serviceBehaviors>
       </behaviors>
      </system.serviceModel>
    </configuration>
    ```

    > **Warning:**
    > Note that when you specify the serviceAuthorizationManagerType, the string must contain the fully qualified type name. a comma, and the name of the assembly in which the type is defined. If you leave out the assembly name, WCF will attempt to load the type from System.ServiceModel.dll.

## Example

The following code example demonstrates a basic implementation of a [System.ServiceModel.ServiceAuthorizationManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager) class that includes overriding the [System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore*) method. The example code examines the [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext) for a custom claim and returns `true` when the resource for that custom claim matches the action value from the [System.ServiceModel.OperationContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext). For a more complete implementation of a [System.ServiceModel.ServiceAuthorizationManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager) class, see [Authorization Policy](../samples/authorization-policy.md).

[c_CustomAuthMgr#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customauthmgr/cs/c_customauthmgr.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customauthmgr/cs/c_customauthmgr.cs.md)
[c_CustomAuthMgr#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customauthmgr/vb/c_customauthmgr.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customauthmgr/vb/c_customauthmgr.vb.md)

## See also

- [System.ServiceModel.ServiceAuthorizationManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager)
- [Authorization Policy](../samples/authorization-policy.md)
