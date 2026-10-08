---
description: "Learn more about: Activity Tree Inspection"
title: "Activity Tree Inspection"
ms.date: "03/30/2017"
ms.assetid: 100d00e4-8c1d-4233-8fbb-dd443a01155d
---
# Activity Tree Inspection

Activity tree inspection is used by workflow application authors to inspect the workflows hosted by the application. By using [System.Activities.WorkflowInspectionServices](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices), workflows can be searched for specific child activities, individual activities and their properties can be enumerated, and runtime metadata of the activities can be cached at a specific time. This topic provides an overview of [System.Activities.WorkflowInspectionServices](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices) and how to use it to inspect an activity tree.

## Using WorkflowInspectionServices

 The [System.Activities.WorkflowInspectionServices.GetActivities*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices.GetActivities*) method is used to enumerate all of the activities in the specified activity tree. [System.Activities.WorkflowInspectionServices.GetActivities*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices.GetActivities*) returns an enumerable that touches all activities within the tree including children, delegate handlers, variable defaults, and argument expressions. In the following example, a workflow definition is created by using a [System.Activities.Statements.Sequence](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Sequence), [System.Activities.Statements.While](https://learn.microsoft.com/search/?terms=System.Activities.Statements.While), [System.Activities.Statements.ForEach`1](https://learn.microsoft.com/search/?terms=System.Activities.Statements.ForEach%601), [System.Activities.Statements.WriteLine](https://learn.microsoft.com/search/?terms=System.Activities.Statements.WriteLine), and expressions. After the workflow definition is created, it is invoked and then the `InspectActivity` method is called.

 [CFX_WorkflowApplicationExample#45 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/cfx_workflowapplicationexample/cs/program.cs#45)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/cfx_workflowapplicationexample/cs/program.cs.md)

 To enumerate the activities, the [System.Activities.WorkflowInspectionServices.GetActivities*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices.GetActivities*) is called on the root activity, and again recursively on each returned activity. In the following example, the [System.Activities.Activity.DisplayName*](https://learn.microsoft.com/search/?terms=System.Activities.Activity.DisplayName*) of each activity and expression in the activity tree is written to the console.

 [CFX_WorkflowApplicationExample#46 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/cfx_workflowapplicationexample/cs/program.cs#46)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/cfx_workflowapplicationexample/cs/program.cs.md)

 This sample code provides the following output.

 **List Item 1**
**List Item 2**
**List Item 3**
**List Item 4**
**List Item 5**
**Items added to collection.**
**Sequence**
 **Literal<List\<String>>**
 **While**
 **AddToCollection\<String>**
 **VariableValue<ICollection\<String>>**
 **LambdaValue\<String>**
 **LocationReferenceValue<List\<String>>**
 **LambdaValue\<Boolean>**
 **LocationReferenceValue<List\<String>>**
 **ForEach\<String>**
 **VariableValue<IEnumerable\<String>>**
 **WriteLine**
 **DelegateArgumentValue\<String>**
 **Sequence**
 **WriteLine**
 **Literal\<String>**  To retrieve a specific activity instead of enumerating all of the activities, [System.Activities.WorkflowInspectionServices.Resolve*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices.Resolve*) is used. Both [System.Activities.WorkflowInspectionServices.Resolve*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices.Resolve*) and [System.Activities.WorkflowInspectionServices.GetActivities*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices.GetActivities*) perform metadata caching if `WorkflowInspectionServices.CacheMetadata` has not been previously called. If [System.Activities.WorkflowInspectionServices.CacheMetadata*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices.CacheMetadata*) has been called then [System.Activities.WorkflowInspectionServices.GetActivities*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices.GetActivities*) is based on the existing metadata. Therefore, if tree changes have been made since the last call to [System.Activities.WorkflowInspectionServices.CacheMetadata*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices.CacheMetadata*), [System.Activities.WorkflowInspectionServices.GetActivities*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices.GetActivities*) might give unexpected results. If changes have been made to the workflow after calling [System.Activities.WorkflowInspectionServices.GetActivities*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices.GetActivities*), metadata can be re-cached by calling the [System.Activities.Validation.ActivityValidationServices](https://learn.microsoft.com/search/?terms=System.Activities.Validation.ActivityValidationServices) [System.Activities.Validation.ActivityValidationServices.Validate*](https://learn.microsoft.com/search/?terms=System.Activities.Validation.ActivityValidationServices.Validate*) method. Caching metadata is discussed in the next section.

### Caching Metadata

 Caching the metadata for an activity builds and validates a description of the activity’s arguments, variables, child activities, and activity delegates. Metadata, by default, is cached by the runtime when an activity is prepared for execution. If a workflow host author wants to cache the metadata for an activity or activity tree before this, for example to take all of the cost upfront, then [System.Activities.WorkflowInspectionServices.CacheMetadata*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInspectionServices.CacheMetadata*) can be used to cache the metadata at the desired time.
