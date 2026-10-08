---
description: "Learn more about: Instances"
title: "Instances"
ms.date: "03/30/2017"
ms.assetid: c8cf3460-0ca1-4411-8262-e9ecaf7f0a31
---
# Instances

Counter Name: Instances.

## Description

 Number of instance contexts that the service currently contains.

 Most of the time, the number of instance contexts is identical to the number of instances. However, the following scenarios are exception to this rule.

- A service method calls the [System.ServiceModel.Dispatcher.IInstanceProvider.ReleaseInstance*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Dispatcher.IInstanceProvider.ReleaseInstance*) method explicitly.

- A [System.ServiceModel.ReleaseInstanceMode](https://learn.microsoft.com/search/?terms=System.ServiceModel.ReleaseInstanceMode) is applied to an [System.ServiceModel.OperationBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationBehaviorAttribute) instance.

## See also

- [System.ServiceModel.OperationBehaviorAttribute](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationBehaviorAttribute)
