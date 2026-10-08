---
description: "Learn more about Dynamic Update, which provides a mechanism for workflow app developers to update the workflow definition of a persisted workflow instance"
title: "Dynamic Update"
ms.date: "03/30/2017"
ms.custom: sfi-ropc-nochange
---

# Dynamic update

Dynamic update provides a mechanism for workflow application developers to update the workflow definition of a persisted workflow instance. This can be to implement a bug fix, new requirements, or to accommodate unexpected changes. This topic provides an overview of the dynamic update functionality introduced in .NET Framework 4.5.

To apply dynamic updates to a persisted workflow instance, a [System.Activities.DynamicUpdate.DynamicUpdateMap](https://learn.microsoft.com/search/?terms=System.Activities.DynamicUpdate.DynamicUpdateMap) is created that contains instructions for the runtime that describe how to modify the persisted workflow instance to reflect the desired changes. Once the update map is created, it is applied to the desired persisted workflow instances. Once the dynamic update is applied, the workflow instance may be resumed using the new updated workflow definition. There are four steps required to create and apply an update map.

1. [Prepare the workflow definition for dynamic update](#prepare-the-workflow-definition-for-dynamic-update).
2. [Update the workflow definition to reflect the desired changes](#update-the-workflow-definition-to-reflect-the-desired-changes).
3. [Create the update map](#create-the-update-map).
4. [Apply the update map to the desired persisted workflow instances](#apply-the-update-map-to-the-desired-persisted-workflow-instances).

> **Note:**
> Steps 1 through 3, which cover the creation of the update map, can be performed independently of applying the update. A common scenario is that the workflow developer will create the update map offline, and then an administrator will apply the update at a later time.

This article provides an overview of the dynamic update process of adding a new activity to a persisted instance of a compiled Xaml workflow.

## Prepare the workflow definition for dynamic update

The first step in the dynamic update process is to prepare the desired workflow definition for update. This is done by calling the [System.Activities.DynamicUpdate.DynamicUpdateServices.PrepareForUpdate*](https://learn.microsoft.com/search/?terms=System.Activities.DynamicUpdate.DynamicUpdateServices.PrepareForUpdate*) method and passing in the workflow definition to modify. This method validates and then walks the workflow tree to identify all of the objects such as public activities and variables that need to be tagged so they can be compared later with the modified workflow definition. When this is complete, the workflow tree is cloned and attached to the original workflow definition. When the update map is created, the updated version of the workflow definition is compared with the original workflow definition and the update map is generated based on the differences.

To prepare a Xaml workflow for dynamic update it may be loaded into an [System.Activities.ActivityBuilder](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder), and then the [System.Activities.ActivityBuilder](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder) is passed into [System.Activities.DynamicUpdate.DynamicUpdateServices.PrepareForUpdate*](https://learn.microsoft.com/search/?terms=System.Activities.DynamicUpdate.DynamicUpdateServices.PrepareForUpdate*).

> **Note:**
> For more information about working with serialized workflows and [System.Activities.ActivityBuilder](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder), see [Serializing Workflows and Activities to and from XAML](serializing-workflows-and-activities-to-and-from-xaml.md).

In the following example, a `MortgageWorkflow` definition (that consists of a [System.Activities.Statements.Sequence](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Sequence) with several child activities) is loaded into an [System.Activities.ActivityBuilder](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder), and then prepared for dynamic update. After the method returns, the [System.Activities.ActivityBuilder](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder) contains the original workflow definition as well as a copy.

```csharp
// Load the MortgageWorkflow definition from Xaml into
// an ActivityBuilder.
XamlXmlReaderSettings readerSettings = new XamlXmlReaderSettings()
{
    LocalAssembly = Assembly.GetExecutingAssembly()
};

XamlXmlReader xamlReader = new XamlXmlReader(@"C:\WorkflowDefinitions\MortgageWorkflow.xaml",
    readerSettings);

ActivityBuilder ab = XamlServices.Load(
    ActivityXamlServices.CreateBuilderReader(xamlReader)) as ActivityBuilder;

// Prepare the workflow definition for dynamic update.
DynamicUpdateServices.PrepareForUpdate(ab);
```

## Update the workflow definition to reflect the desired changes

Once the workflow definition has been prepared for updating, the desired changes can be made. You can add or remove activities, add, move or delete public variables, add or remove arguments, and make changes to the signature of activity delegates. You cannot remove a running activity or change the signature of a running delegate. These changes may be made using code, or in a re-hosted workflow designer. In the following example, a custom `VerifyAppraisal` activity is added to the Sequence that makes up the body of the `MortgageWorkflow` from the previous example.

```csharp
// Make desired changes to the definition. In this example, we are
// inserting a new VerifyAppraisal activity as the 3rd child of the root Sequence.
VerifyAppraisal va = new VerifyAppraisal
{
    Result = new VisualBasicReference<bool>("LoanCriteria")
};

// Get the Sequence that makes up the body of the workflow.
Sequence s = ab.Implementation as Sequence;

// Insert the new activity into the Sequence.
s.Activities.Insert(2, va);
```

## Create the update map

Once the workflow definition that was prepared for update has been modified, the update map can be created. To create a dynamic update map, the [System.Activities.DynamicUpdate.DynamicUpdateServices.CreateUpdateMap*](https://learn.microsoft.com/search/?terms=System.Activities.DynamicUpdate.DynamicUpdateServices.CreateUpdateMap*) method is invoked. This returns a [System.Activities.DynamicUpdate.DynamicUpdateMap](https://learn.microsoft.com/search/?terms=System.Activities.DynamicUpdate.DynamicUpdateMap) that contains the information the runtime needs to modify a persisted workflow instance so that it may be loaded and resumed with the new workflow definition. In the following example, a dynamic map is created for the modified `MortgageWorkflow` definition from the previous example.

```csharp
// Create the update map.
DynamicUpdateMap map = DynamicUpdateServices.CreateUpdateMap(ab);
```

This update map can immediately be used to modify persisted workflow instances, or more typically it can be saved and the updates applied later. One way to save the update map is to serialize it to a file, as shown in the following example.

```csharp
// Serialize the update map to a file.
DataContractSerializer serializer = new DataContractSerializer(typeof(DynamicUpdateMap));
using (FileStream fs = System.IO.File.Open(@"C:\WorkflowDefinitions\MortgageWorkflow.map", FileMode.Create))
{
    serializer.WriteObject(fs, map);
}
```

When [System.Activities.DynamicUpdate.DynamicUpdateServices.CreateUpdateMap*](https://learn.microsoft.com/search/?terms=System.Activities.DynamicUpdate.DynamicUpdateServices.CreateUpdateMap*) returns, the cloned workflow definition and other dynamic update information that was added in the call to [System.Activities.DynamicUpdate.DynamicUpdateServices.PrepareForUpdate*](https://learn.microsoft.com/search/?terms=System.Activities.DynamicUpdate.DynamicUpdateServices.PrepareForUpdate*) is removed, and the modified workflow definition is ready to be saved so that it can be used later when resuming updated workflow instances. In the following example, the modified workflow definition is saved to `MortgageWorkflow_v1.1.xaml`.

```csharp
// Save the modified workflow definition.
StreamWriter sw = File.CreateText(@"C:\WorkflowDefinitions\MortgageWorkflow_v1.1.xaml");
XamlWriter xw = ActivityXamlServices.CreateBuilderWriter(new XamlXmlWriter(sw, new XamlSchemaContext()));
XamlServices.Save(xw, ab);
sw.Close();
```

## Apply the update map to the desired persisted workflow instances

Applying the update map can be done at any time after creating it. It can be done right away using the [System.Activities.DynamicUpdate.DynamicUpdateMap](https://learn.microsoft.com/search/?terms=System.Activities.DynamicUpdate.DynamicUpdateMap) instance that was returned by [System.Activities.DynamicUpdate.DynamicUpdateServices.CreateUpdateMap*](https://learn.microsoft.com/search/?terms=System.Activities.DynamicUpdate.DynamicUpdateServices.CreateUpdateMap*), or it can be done later using a saved copy of the update map. To update a workflow instance, load it into a [System.Activities.WorkflowApplicationInstance](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplicationInstance) using [System.Activities.WorkflowApplication.GetInstance*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplication.GetInstance*). Next, create a [System.Activities.WorkflowApplication](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplication) using the updated workflow definition, and the desired [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity). This [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity) may be different than the one that was used to persist the original workflow, and typically is in order to reflect that the persisted instance has been modified. Once the [System.Activities.WorkflowApplication](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplication) is created, it is loaded using the overload of [System.Activities.WorkflowApplication.Load*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplication.Load*) that takes a [System.Activities.DynamicUpdate.DynamicUpdateMap](https://learn.microsoft.com/search/?terms=System.Activities.DynamicUpdate.DynamicUpdateMap), and then unloaded with a call to [System.Activities.WorkflowApplication.Unload*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplication.Unload*). This applies the dynamic update and persists the updated workflow instance.

```csharp
// Load the serialized update map.
DynamicUpdateMap map;
using (FileStream fs = File.Open(@"C:\WorkflowDefinitions\MortgageWorkflow.map", FileMode.Open))
{
    DataContractSerializer serializer = new DataContractSerializer(typeof(DynamicUpdateMap));
    object updateMap = serializer.ReadObject(fs);
    if (updateMap == null)
    {
        throw new ApplicationException("DynamicUpdateMap is null.");
    }

    map = (DynamicUpdateMap)updateMap;
}

// Retrieve a list of workflow instance ids that corresponds to the
// workflow instances to update. This step is the responsibility of
// the application developer.
List<Guid> ids = GetPersistedWorkflowIds();
foreach (Guid id in ids)
{
    // Get a proxy to the persisted workflow instance.
    SqlWorkflowInstanceStore store = new SqlWorkflowInstanceStore(connectionString);
    WorkflowApplicationInstance instance = WorkflowApplication.GetInstance(id, store);

    // If desired, you can inspect the WorkflowIdentity of the instance
    // using the DefinitionIdentity property to determine whether to apply
    // the update.
    Console.WriteLine(instance.DefinitionIdentity);

    // Create a workflow application. You must specify the updated workflow definition, and
    // you may provide an updated WorkflowIdentity if desired to reflect the update.
    WorkflowIdentity identity = new WorkflowIdentity
    {
        Name = "MortgageWorkflow v1.1",
        Version = new Version(1, 1, 0, 0)
    };

    // Load the persisted workflow instance using the updated workflow definition
    // and with an updated WorkflowIdentity. In this example the MortgageWorkflow class
    // contains the updated definition.
    WorkflowApplication wfApp = new WorkflowApplication(new MortgageWorkflow(), identity);

    // Apply the dynamic update on the loaded instance.
    wfApp.Load(instance, map);

    // Unload the updated instance.
    wfApp.Unload();
}
```

## Resume an Updated Workflow Instance

Once dynamic update has been applied, the workflow instance may be resumed. Note that the new updated definition and [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity) must be used.

> **Note:**
> For more information about working with [System.Activities.WorkflowApplication](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplication) and [System.Activities.WorkflowIdentity](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowIdentity), see [Using WorkflowIdentity and Versioning](using-workflowidentity-and-versioning.md).

In the following example, the `MortgageWorkflow_v1.1.xaml` workflow from the previous example has been compiled, and is loaded and resumed using the updated workflow definition.

```csharp
// Load the persisted workflow instance using the updated workflow definition
// and updated WorkflowIdentity.
WorkflowIdentity identity = new WorkflowIdentity
{
    Name = "MortgageWorkflow v1.1",
    Version = new Version(1, 1, 0, 0)
};

WorkflowApplication wfApp = new WorkflowApplication(new MortgageWorkflow(), identity);

// Configure persistence and desired workflow event handlers.
// (Omitted for brevity.)
ConfigureWorkflowApplication(wfApp);

// Load the persisted workflow instance.
wfApp.Load(InstanceId);

// Resume the workflow.
// wfApp.ResumeBookmark(...);
```
