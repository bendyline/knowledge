---
description: "Learn more about: How to: create a custom security token authenticator"
title: "How to: create a custom security token authenticator"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "WCF, authentication"
ms.assetid: 10e245f7-d31e-42e7-82a2-d5780325d372
---
# How to: create a custom security token authenticator

This topic shows how to create a custom security token authenticator and how to integrate it with a custom security token manager. A security token authenticator validates the content of a security token provided with an incoming message. If the validation succeeds, the authenticator returns a collection of [System.IdentityModel.Policy.IAuthorizationPolicy](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy) instances that, when evaluated, returns a set of claims.

 To use a custom security token authenticator in Windows Communication Foundation (WCF), you must first create custom credentials and security token manager implementations. For more information about creating custom credentials and a security token manager, see [Walkthrough: Creating Custom Client and Service Credentials](walkthrough-creating-custom-client-and-service-credentials.md).

## Procedures

#### To create a custom security token authenticator

1. Define a new class derived from the [System.IdentityModel.Selectors.SecurityTokenAuthenticator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenAuthenticator) class.

2. Override the [System.IdentityModel.Selectors.SecurityTokenAuthenticator.CanValidateTokenCore*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenAuthenticator.CanValidateTokenCore*) method. The method returns `true` or `false` depending on whether the custom authenticator can validate the incoming token type or not.

3. Override the [System.IdentityModel.Selectors.SecurityTokenAuthenticator.ValidateTokenCore*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenAuthenticator.ValidateTokenCore*) method. This method needs to validate the token contents appropriately. If the token passes the validation step, it returns a collection of [System.IdentityModel.Policy.IAuthorizationPolicy](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy) instances. The following example uses a custom authorization policy implementation that will be created in the next procedure.

     [C_CustomTokenAuthenticator#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtokenauthenticator/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtokenauthenticator/cs/source.cs.md)
     [C_CustomTokenAuthenticator#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtokenauthenticator/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtokenauthenticator/vb/source.vb.md)

 The previous code returns a collection of authorization policies in the [System.IdentityModel.Selectors.SecurityTokenAuthenticator.CanValidateToken%28System.IdentityModel.Tokens.SecurityToken%29](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenAuthenticator.CanValidateToken%2528System.IdentityModel.Tokens.SecurityToken%2529) method. WCF does not provide a public implementation of this interface. The following procedure shows how to do so for your own requirements.

#### To create a custom authorization policy

1. Define a new class implementing the [System.IdentityModel.Policy.IAuthorizationPolicy](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy) interface.

2. Implement the [System.IdentityModel.Policy.IAuthorizationComponent.Id*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationComponent.Id*) read-only property. One way to implement this property is to generate a globally unique identifier (GUID) in the class constructor and return it every time the value for this property is requested.

3. Implement the [System.IdentityModel.Policy.IAuthorizationPolicy.Issuer](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy.Issuer) read-only property. This property needs to return an issuer of the claim sets that are obtained from the token. This issuer should correspond to the issuer of the token or an authority that is responsible for validating the token contents. The following example uses the issuer claim that passed to this class from the custom security token authenticator created in the previous procedure. The custom security token authenticator uses the system-provided claim set (returned by the [System.IdentityModel.Claims.ClaimSet.System](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet.System) property) to represent the issuer of the username token.

4. Implement the [System.IdentityModel.Policy.IAuthorizationPolicy.Evaluate*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy.Evaluate*) method. This method populates an instance of the [System.IdentityModel.Policy.EvaluationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.EvaluationContext) class (passed in as an argument) with claims that are based on the incoming security token content. The method returns `true` when it is done with the evaluation. In cases when the implementation relies on the presence of other authorization policies that provide additional information to the evaluation context, this method can return `false` if the required information is not present yet in the evaluation context. In that case, WCF will call the method again after evaluating all other authorization policies generated for the incoming message if at least one of those authorization policies modified the evaluation context.

     [c_CustomTokenAuthenticator#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtokenauthenticator/cs/source.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtokenauthenticator/cs/source.cs.md)
     [c_CustomTokenAuthenticator#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtokenauthenticator/vb/source.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtokenauthenticator/vb/source.vb.md)

 [Walkthrough: Creating Custom Client and Service Credentials](walkthrough-creating-custom-client-and-service-credentials.md) describes how to create custom credentials and a custom security token manager. To use the custom security token authenticator created here, an implementation of the security token manager is modified to return the custom authenticator from the [System.IdentityModel.Selectors.SecurityTokenManager.CreateSecurityTokenAuthenticator*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenManager.CreateSecurityTokenAuthenticator*) method. The method returns an authenticator when an appropriate security token requirement is passed in.

#### To integrate a custom security token authenticator with a custom security token manager

1. Override the [System.IdentityModel.Selectors.SecurityTokenManager.CreateSecurityTokenAuthenticator*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenManager.CreateSecurityTokenAuthenticator*) method in your custom security token manager implementation.

2. Add logic to the method to enable it to return your custom security token authenticator based on the [System.IdentityModel.Selectors.SecurityTokenRequirement](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenRequirement) parameter. The following example returns a custom security token authenticator if the token requirements token type is a user name (represented by the [System.IdentityModel.Tokens.SecurityTokenTypes.UserName](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.SecurityTokenTypes.UserName) property) and the message direction for which the security token authenticator is being requested is input (represented by the [System.ServiceModel.Description.MessageDirection.Input](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MessageDirection.Input) field).

     [c_CustomTokenAuthenticator#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customtokenauthenticator/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customtokenauthenticator/cs/source.cs.md)
     [c_CustomTokenAuthenticator#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customtokenauthenticator/vb/source.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customtokenauthenticator/vb/source.vb.md)

## See also

- [System.IdentityModel.Selectors.SecurityTokenAuthenticator](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenAuthenticator)
- [System.IdentityModel.Selectors.SecurityTokenRequirement](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenRequirement)
- [System.IdentityModel.Selectors.SecurityTokenManager](https://learn.microsoft.com/search/?terms=System.IdentityModel.Selectors.SecurityTokenManager)
- [System.IdentityModel.Tokens.UserNameSecurityToken](https://learn.microsoft.com/search/?terms=System.IdentityModel.Tokens.UserNameSecurityToken)
- [Walkthrough: Creating Custom Client and Service Credentials](walkthrough-creating-custom-client-and-service-credentials.md)
- [How to: Create a Custom Security Token Provider](how-to-create-a-custom-security-token-provider.md)
