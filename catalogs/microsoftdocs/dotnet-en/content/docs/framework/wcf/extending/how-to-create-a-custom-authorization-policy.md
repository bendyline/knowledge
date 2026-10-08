---
description: "Learn more about: How to: Create a Custom Authorization Policy"
title: "How to: Create a Custom Authorization Policy"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 05b0549b-882d-4660-b6f0-5678543e5475
---
# How to: Create a Custom Authorization Policy

The Identity Model infrastructure in Windows Communication Foundation (WCF) supports a claim-based authorization model. Claims are extracted from tokens, optionally processed by custom authorization policy, and then placed into an [System.IdentityModel.Policy.AuthorizationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.AuthorizationContext) that can then be examined to make authorization decisions. A custom policy can be used to transform claims from incoming tokens into claims expected by the application. In this way, the application layer can be insulated from the details on the differing claims served up by the different token types that WCF supports. This topic shows how to implement a custom authorization policy and how to add that policy to the collection of policies used by a service.

### To implement a custom authorization policy

1. Define a new class that derives from [System.IdentityModel.Policy.IAuthorizationPolicy](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy).

2. Implement the read-only [System.IdentityModel.Policy.IAuthorizationComponent.Id](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationComponent.Id) property by generating a unique string in the constructor for the class and returning that string whenever the property is accessed.

3. Implement the read-only [System.IdentityModel.Policy.IAuthorizationPolicy.Issuer](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy.Issuer) property by returning a [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet) that represents the policy issuer. This could be a `ClaimSet` that represents the application or a built-in `ClaimSet` (for example, the `ClaimSet` returned by the static [System.IdentityModel.Claims.ClaimSet.System](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet.System) property.

4. Implement the [System.IdentityModel.Policy.IAuthorizationPolicy.Evaluate%28System.IdentityModel.Policy.EvaluationContext%2CSystem.Object%40%29](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy.Evaluate%2528System.IdentityModel.Policy.EvaluationContext%252CSystem.Object%2540%2529) method as described in the following procedure.

### To implement the Evaluate method

1. Two parameters are passed to this method: an instance of the [System.IdentityModel.Policy.EvaluationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.EvaluationContext) class and an object reference.

2. If the custom authorization policy adds [System.IdentityModel.Claims.ClaimSet](https://learn.microsoft.com/search/?terms=System.IdentityModel.Claims.ClaimSet) instances without regard to the current content of the [System.IdentityModel.Policy.EvaluationContext](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.EvaluationContext), then add each `ClaimSet` by calling the [System.IdentityModel.Policy.EvaluationContext.AddClaimSet%28System.IdentityModel.Policy.IAuthorizationPolicy%2CSystem.IdentityModel.Claims.ClaimSet%29](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.EvaluationContext.AddClaimSet%2528System.IdentityModel.Policy.IAuthorizationPolicy%252CSystem.IdentityModel.Claims.ClaimSet%2529) method and return `true` from the [System.IdentityModel.Policy.IAuthorizationPolicy.Evaluate*](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy.Evaluate*) method. Returning `true` indicates to the authorization infrastructure that the authorization policy has performed its work and does not need to be called again.

3. If the custom authorization policy adds claim sets only if certain claims are already present in the `EvaluationContext`, then look for those claims by examining the `ClaimSet` instances returned by the [System.IdentityModel.Policy.EvaluationContext.ClaimSets](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.EvaluationContext.ClaimSets) property. If the claims are present, then add the new claim sets by calling the [System.IdentityModel.Policy.EvaluationContext.AddClaimSet%28System.IdentityModel.Policy.IAuthorizationPolicy%2CSystem.IdentityModel.Claims.ClaimSet%29](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.EvaluationContext.AddClaimSet%2528System.IdentityModel.Policy.IAuthorizationPolicy%252CSystem.IdentityModel.Claims.ClaimSet%2529) method and, if no more claim sets are to be added, return `true`, indicating to the authorization infrastructure that the authorization policy has completed its work. If the claims are not present, return `false`, indicating that the authorization policy should be called again if other authorization policies add more claim sets to the `EvaluationContext`.

4. In more complex processing scenarios, the second parameter of the [System.IdentityModel.Policy.IAuthorizationPolicy.Evaluate%28System.IdentityModel.Policy.EvaluationContext%2CSystem.Object%40%29](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy.Evaluate%2528System.IdentityModel.Policy.EvaluationContext%252CSystem.Object%2540%2529) method is used to store a state variable that the authorization infrastructure will pass back during each subsequent call to the [System.IdentityModel.Policy.IAuthorizationPolicy.Evaluate%28System.IdentityModel.Policy.EvaluationContext%2CSystem.Object%40%29](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy.Evaluate%2528System.IdentityModel.Policy.EvaluationContext%252CSystem.Object%2540%2529) method for a particular evaluation.

### To specify a custom authorization policy through configuration

1. Specify the type of the custom authorization policy in the `policyType` attribute in the `add` element in the `authorizationPolicies` element in the `serviceAuthorization` element.

    ```xml
    <configuration>
     <system.serviceModel>
      <behaviors>
        <serviceAuthorization serviceAuthorizationManagerType=
                  "Samples.MyServiceAuthorizationManager" >
          <authorizationPolicies>
            <add policyType="Samples.MyAuthorizationPolicy" />
          </authorizationPolicies>
        </serviceAuthorization>
      </behaviors>
     </system.serviceModel>
    </configuration>
    ```

### To specify a custom authorization policy through code

1. Create a [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) of [System.IdentityModel.Policy.IAuthorizationPolicy](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy).

2. Create an instance of the custom authorization policy.

3. Add the authorization policy instance to the list.

4. Repeat steps 2 and 3 for each custom authorization policy.

5. Assign a read-only version of the list to the [System.ServiceModel.Description.ServiceAuthorizationBehavior.ExternalAuthorizationPolicies](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceAuthorizationBehavior.ExternalAuthorizationPolicies) property.

     [c_CustomAuthPol#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customauthpol/cs/c_customauthpol.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customauthpol/cs/c_customauthpol.cs.md)
     [c_CustomAuthPol#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customauthpol/vb/source.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customauthpol/vb/source.vb.md)

## Example

 The following example shows a complete [System.IdentityModel.Policy.IAuthorizationPolicy](https://learn.microsoft.com/search/?terms=System.IdentityModel.Policy.IAuthorizationPolicy) implementation.

 [c_CustomAuthPol#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_customauthpol/cs/c_customauthpol.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_customauthpol/cs/c_customauthpol.cs.md)
 [c_CustomAuthPol#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_customauthpol/vb/source.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_customauthpol/vb/source.vb.md)

## See also

- [System.ServiceModel.ServiceAuthorizationManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager)
- [How to: Compare Claims](how-to-compare-claims.md)
- [How to: Create a Custom Authorization Manager for a Service](how-to-create-a-custom-authorization-manager-for-a-service.md)
- [Authorization Policy](../samples/authorization-policy.md)
