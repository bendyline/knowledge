---
description: "Learn more about: How to: Set a Max Clock Skew"
title: "How to: Set a Max Clock Skew"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "MaxClockSkew property"
  - "WCF, custom bindings"
ms.assetid: 491d1705-eb29-43c2-a44c-c0cf996f74eb
---
# How to: Set a Max Clock Skew

Time-critical functions can be derailed if the clock settings on two computers are different. To mitigate this possibility, you can set the `MaxClockSkew` property to a [System.TimeSpan](https://learn.microsoft.com/search/?terms=System.TimeSpan). This property is available on two classes:

 [System.ServiceModel.Channels.LocalClientSecuritySettings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.LocalClientSecuritySettings)

 [System.ServiceModel.Channels.LocalServiceSecuritySettings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.LocalServiceSecuritySettings)

> **Important:**
> For a secure conversation, changes to the `MaxClockSkew` property  must be made when the service or client is bootstrapped. To do this, you must set the property on the [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement) returned by the [System.ServiceModel.Security.Tokens.SecureConversationSecurityTokenParameters.BootstrapSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens.SecureConversationSecurityTokenParameters.BootstrapSecurityBindingElement) property.

 To change the property on one of the system-provided bindings, you must find the security binding element in the collection of bindings and set the `MaxClockSkew` property to a new value. Two classes derive from the [System.ServiceModel.Channels.SecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SecurityBindingElement): [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement) and [System.ServiceModel.Channels.AsymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.AsymmetricSecurityBindingElement). When retrieving the security binding from the collection, you must cast to one of these types in order to correctly set the `MaxClockSkew` property. The following example uses a [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding), which uses the [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement). For a list that specifies which type of security binding to use in each system-provided binding, see [System-Provided Bindings](../system-provided-bindings.md).

## To create a custom binding with a new clock skew value in code

> **Warning:**
> Add references to the following namespaces in your code: [System.ServiceModel.Channels](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels), [System.ServiceModel.Description](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description), [System.Security.Permissions](https://learn.microsoft.com/search/?terms=System.Security.Permissions), and [System.ServiceModel.Security.Tokens](https://learn.microsoft.com/search/?terms=System.ServiceModel.Security.Tokens).

1. Create an instance of a [System.ServiceModel.WSHttpBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding) class and set its security mode to [System.ServiceModel.SecurityMode.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.SecurityMode.Message).

2. Create a new instance of the [System.ServiceModel.Channels.BindingElementCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElementCollection) class by calling the [System.ServiceModel.WSHttpBinding.CreateBindingElements*](https://learn.microsoft.com/search/?terms=System.ServiceModel.WSHttpBinding.CreateBindingElements*) method.

3. Use the [System.ServiceModel.Channels.BindingElementCollection.Find*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElementCollection.Find*) method of the [System.ServiceModel.Channels.BindingElementCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElementCollection) class to find the security binding element.

4. When using the [System.ServiceModel.Channels.BindingElementCollection.Find*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BindingElementCollection.Find*) method, cast to the actual type. The example below casts to the [System.ServiceModel.Channels.SymmetricSecurityBindingElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.SymmetricSecurityBindingElement) type.

5. Set the [System.ServiceModel.Channels.LocalServiceSecuritySettings.MaxClockSkew](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.LocalServiceSecuritySettings.MaxClockSkew) property on the security binding element.

6. Create a [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) with an appropriate service type and base address.

7. Use the [System.ServiceModel.ServiceHost.AddServiceEndpoint*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost.AddServiceEndpoint*) method to add an endpoint and include the [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding).

     [c_MaxClockSkew#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_maxclockskew/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_maxclockskew/cs/source.cs.md)
     [c_MaxClockSkew#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_maxclockskew/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_maxclockskew/vb/source.vb.md)

## To set the MaxClockSkew in configuration

1. Create a [\<customBinding>](../../configure-apps/file-schema/wcf/custombinding.md) in the [\<bindings>](../../configure-apps/file-schema/wcf/bindings.md) element section.

2. Create a [\<binding>](../../configure-apps/file-schema/wcf/bindings.md) element and set the `name` attribute to an appropriate value. The following example sets it to `MaxClockSkewBinding`.

3. Add an encoding element. The example below adds a [\<textMessageEncoding>](../../configure-apps/file-schema/wcf/textmessageencoding.md).

4. Add a [\<security>](../../configure-apps/file-schema/wcf/security-of-custombinding.md) element and set the `authenticationMode` attribute to an appropriate setting. The following example set the attribute to `Kerberos` to specify that the service use Windows authentication.

5. Add a [\<localServiceSettings>](../../configure-apps/file-schema/wcf/localservicesettings-element.md) and set the `maxClockSkew` attribute to a value in the form of `"##:##:##"`. The following example sets it to 7 minutes. Optionally, add a [\<localServiceSettings>](../../configure-apps/file-schema/wcf/localservicesettings-element.md) and set the `maxClockSkew` attribute to an appropriate setting.

6. Add a transport element. The following example uses an [\<httpTransport>](../../configure-apps/file-schema/wcf/httptransport.md).

7. For a secure conversation, the security settings must occur at the bootstrap in the [\<secureConversationBootstrap>](../../configure-apps/file-schema/wcf/secureconversationbootstrap.md) element.

    ```xml
    <bindings>
      <customBinding>
        <binding name="MaxClockSkewBinding">
            <textMessageEncoding />
            <security authenticationMode="Kerberos">
               <localClientSettings maxClockSkew="00:07:00" />
               <localServiceSettings maxClockSkew="00:07:00" />
               <secureConversationBootstrap>
                  <localClientSettings maxClockSkew="00:30:00" />
                  <localServiceSettings maxClockSkew="00:30:00" />
               </secureConversationBootstrap>
            </security>
            <httpTransport />
        </binding>
      </customBinding>
    </bindings>
    ```

## See also

- [System.ServiceModel.Channels.LocalClientSecuritySettings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.LocalClientSecuritySettings)
- [System.ServiceModel.Channels.LocalServiceSecuritySettings](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.LocalServiceSecuritySettings)
- [System.ServiceModel.Channels.CustomBinding](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.CustomBinding)
- [How to: Create a Custom Binding Using the SecurityBindingElement](how-to-create-a-custom-binding-using-the-securitybindingelement.md)
