---
description: "Learn more about: How To: Allow Metadata Requests While Authorizing"
title: "How To: Allow Metadata Requests While Authorizing"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "allowing metadata requests while authorizing [WCF]"
ms.assetid: 90cec34f-b619-452b-a056-8b1c0de49d05
---
# How To: Allow Metadata Requests While Authorizing

During custom authorization, it may be necessary to allow a request for metadata to be processed. The following topic walks through the steps to validate such a request.

 For more information about Windows Communication Foundation (WCF) authorization, see [Authorization](authorization-in-wcf.md).

### To allow metadata requests during authorization

1. Create an extension of the [System.ServiceModel.ServiceAuthorizationManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager) class.

2. Override the [System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore*) method. The method returns `true` or `false` depending on whether authorization is allowed. Information about the current procedure is found in the [System.ServiceModel.OperationContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext) passed as a parameter to the method.

3. In the override, check the contract name, namespace, and the action as shown in the following example. If the conditions are valid, then return `true.`

4. Use the extensibility point to employ the class. For more information, see [How to: Create a Custom Authorization Manager for a Service](../extending/how-to-create-a-custom-authorization-manager-for-a-service.md).

## Example

 The following example shows an override of the [System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore*](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager.CheckAccessCore*) method.

 [C_HowtoCheckForMexRequestsInAuthorization#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_howtocheckformexrequestsinauthorization/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_howtocheckformexrequestsinauthorization/cs/source.cs.md)
 [C_HowtoCheckForMexRequestsInAuthorization#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_howtocheckformexrequestsinauthorization/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_howtocheckformexrequestsinauthorization/vb/source.vb.md)

## See also

- [System.ServiceModel.ServiceAuthorizationManager](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceAuthorizationManager)
- [Authorization](authorization-in-wcf.md)
- [Managing Claims and Authorization with the Identity Model](managing-claims-and-authorization-with-the-identity-model.md)
