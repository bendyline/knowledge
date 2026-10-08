---
title: "Serializing Workflows and Activities to and from XAML"
description: This article is an overview of serializing workflow definitions and working with XAML workflow definitions in Workflow Foundation.
ms.date: "03/30/2017"
ms.assetid: 37685b32-24e3-4d72-88d8-45d5fcc49ec2
---
# Serialize Workflows and Activities to and from XAML

In addition to being compiled into types that are contained in assemblies, workflow definitions can also be serialized to XAML. These serialized definitions can be reloaded for editing or inspection, passed to a build system for compilation, or loaded and invoked. This topic provides an overview of serializing workflow definitions and working with XAML workflow definitions.

## Work with XAML Workflow definitions

To create a workflow definition for serialization, the [System.Activities.ActivityBuilder](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder) class is used. Creating an [System.Activities.ActivityBuilder](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder) is very similar to creating a [System.Activities.DynamicActivity](https://learn.microsoft.com/search/?terms=System.Activities.DynamicActivity). Any desired arguments are specified, and the activities that constitute the behavior are configured. In the following example, an `Add` activity is created that takes two input arguments, adds them together, and returns the result. Because this activity returns a result, the generic [System.Activities.ActivityBuilder`1](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder%601) class is used.

[CFX_WorkflowApplicationExample#41 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/cfx_workflowapplicationexample/cs/program.cs#41)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/cfx_workflowapplicationexample/cs/program.cs.md)

Each of the [System.Activities.DynamicActivityProperty](https://learn.microsoft.com/search/?terms=System.Activities.DynamicActivityProperty) instances represents one of the input arguments to the workflow, and the [System.Activities.ActivityBuilder.Implementation*](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder.Implementation*) contains the activities that make up the logic of the workflow. Note that the r-value expressions in this example are Visual Basic expressions. Lambda expressions are not serializable to XAML unless [System.Activities.Expressions.ExpressionServices.Convert*](https://learn.microsoft.com/search/?terms=System.Activities.Expressions.ExpressionServices.Convert*) is used. If the serialized workflows are intended to be opened or edited in the workflow designer, then Visual Basic expressions should be used. For more information, see [Authoring Workflows, Activities, and Expressions Using Imperative Code](authoring-workflows-activities-and-expressions-using-imperative-code.md).

To serialize the workflow definition represented by the [System.Activities.ActivityBuilder](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder) instance to XAML, use [System.Activities.XamlIntegration.ActivityXamlServices](https://learn.microsoft.com/search/?terms=System.Activities.XamlIntegration.ActivityXamlServices) to create a [System.Xaml.XamlWriter](https://learn.microsoft.com/search/?terms=System.Xaml.XamlWriter), and then use [System.Xaml.XamlServices](https://learn.microsoft.com/search/?terms=System.Xaml.XamlServices) to serialize the workflow definition by using the [System.Xaml.XamlWriter](https://learn.microsoft.com/search/?terms=System.Xaml.XamlWriter). [System.Activities.XamlIntegration.ActivityXamlServices](https://learn.microsoft.com/search/?terms=System.Activities.XamlIntegration.ActivityXamlServices) has methods to map [System.Activities.ActivityBuilder](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder) instances to and from XAML and to load XAML workflows and return a [System.Activities.DynamicActivity](https://learn.microsoft.com/search/?terms=System.Activities.DynamicActivity) that can be invoked. In the following example, the [System.Activities.ActivityBuilder](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder) instance from the previous example is serialized to a string and saved to a file.

```csharp
// Serialize the workflow to XAML and store it in a string.
StringBuilder sb = new StringBuilder();
StringWriter tw = new StringWriter(sb);
XamlWriter xw = ActivityXamlServices.CreateBuilderWriter(new XamlXmlWriter(tw, new XamlSchemaContext()));
XamlServices.Save(xw, ab);
string serializedAB = sb.ToString();

// Display the XAML to the console.
Console.WriteLine(serializedAB);

// Serialize the workflow to XAML and save it to a file.
StreamWriter sw = File.CreateText(@"C:\Workflows\add.xaml");
XamlWriter xw2 = ActivityXamlServices.CreateBuilderWriter(new XamlXmlWriter(sw, new XamlSchemaContext()));
XamlServices.Save(xw2, ab);
sw.Close();
```

The following example represents the serialized workflow.

```xaml
<Activity
  x:TypeArguments="x:Int32"
  x:Class="Add"
  xmlns="http://schemas.microsoft.com/netfx/2009/xaml/activities"
  xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
  <x:Members>
    <x:Property Name="Operand1" Type="InArgument(x:Int32)" />
    <x:Property Name="Operand2" Type="InArgument(x:Int32)" />
  </x:Members>
  <Sequence>
    <WriteLine Text="[Operand1.ToString() + " + " + Operand2.ToString()]" />
    <Assign x:TypeArguments="x:Int32" Value="[Operand1 + Operand2]">
      <Assign.To>
        <OutArgument x:TypeArguments="x:Int32">
          <ArgumentReference x:TypeArguments="x:Int32" ArgumentName="Result" />
          </OutArgument>
      </Assign.To>
    </Assign>
  </Sequence>
</Activity>
```

To load a serialized workflow, use the [System.Activities.XamlIntegration.ActivityXamlServices](https://learn.microsoft.com/search/?terms=System.Activities.XamlIntegration.ActivityXamlServices) [System.Activities.XamlIntegration.ActivityXamlServices.Load*](https://learn.microsoft.com/search/?terms=System.Activities.XamlIntegration.ActivityXamlServices.Load*) method. This takes the serialized workflow definition and returns a [System.Activities.DynamicActivity](https://learn.microsoft.com/search/?terms=System.Activities.DynamicActivity) that represents the workflow definition. Note that the XAML is not deserialized until [System.Activities.Activity.CacheMetadata*](https://learn.microsoft.com/search/?terms=System.Activities.Activity.CacheMetadata*) is called on the body of the [System.Activities.DynamicActivity](https://learn.microsoft.com/search/?terms=System.Activities.DynamicActivity) during the validation process. If validation is not explicitly called, then it is performed when the workflow is invoked. If the XAML workflow definition is invalid, then an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) exception is thrown. Any exceptions thrown from [System.Activities.Activity.CacheMetadata*](https://learn.microsoft.com/search/?terms=System.Activities.Activity.CacheMetadata*) escape from the call to [System.Activities.Validation.ActivityValidationServices.Validate*](https://learn.microsoft.com/search/?terms=System.Activities.Validation.ActivityValidationServices.Validate*) and must be handled by the caller. In the following example, the serialized workflow from the previous example is loaded and invoked by using [System.Activities.WorkflowInvoker](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInvoker).

[CFX_WorkflowApplicationExample#43 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/cfx_workflowapplicationexample/cs/program.cs#43)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/cfx_workflowapplicationexample/cs/program.cs.md)

When this workflow is invoked, the following output is displayed to the console.

**25 + 15**\
**40**

> **Note:**
> For more information about invoking workflows with input and output arguments, see [Using WorkflowInvoker and WorkflowApplication](using-workflowinvoker-and-workflowapplication.md) and [System.Activities.WorkflowInvoker.Invoke*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInvoker.Invoke*).

If the serialized workflow contains C# expressions, then an [System.Activities.XamlIntegration.ActivityXamlServicesSettings](https://learn.microsoft.com/search/?terms=System.Activities.XamlIntegration.ActivityXamlServicesSettings) instance with its [System.Activities.XamlIntegration.ActivityXamlServicesSettings.CompileExpressions](https://learn.microsoft.com/search/?terms=System.Activities.XamlIntegration.ActivityXamlServicesSettings.CompileExpressions) property set to `true` must be passed as a parameter to [System.Activities.XamlIntegration.ActivityXamlServices.Load*](https://learn.microsoft.com/search/?terms=System.Activities.XamlIntegration.ActivityXamlServices.Load*), otherwise a [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) will be thrown with a message similar to the following: **Expression Activity type 'CSharpValue`1' requires compilation in order to run.  Please ensure that the workflow has been compiled.**

```csharp
ActivityXamlServicesSettings settings = new ActivityXamlServicesSettings
{
    CompileExpressions = true
};

DynamicActivity<int> wf = ActivityXamlServices.Load(new StringReader(serializedAB), settings) as DynamicActivity<int>;
```

For more information, see [C# Expressions](csharp-expressions.md).

A serialized workflow definition can also be loaded into an [System.Activities.ActivityBuilder](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder) instance by using the [System.Activities.XamlIntegration.ActivityXamlServices](https://learn.microsoft.com/search/?terms=System.Activities.XamlIntegration.ActivityXamlServices) [System.Activities.XamlIntegration.ActivityXamlServices.CreateBuilderReader*](https://learn.microsoft.com/search/?terms=System.Activities.XamlIntegration.ActivityXamlServices.CreateBuilderReader*) method. After a serialized workflow is loaded into an [System.Activities.ActivityBuilder](https://learn.microsoft.com/search/?terms=System.Activities.ActivityBuilder) instance, it can be inspected and modified. This is useful for custom workflow designer authors and provides a mechanism for saving and reloading workflow definitions during the design process. In the following example, the serialized workflow definition from the previous example is loaded and its properties are inspected.

[CFX_WorkflowApplicationExample#44 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/cfx_workflowapplicationexample/cs/program.cs#44)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/cfx_workflowapplicationexample/cs/program.cs.md)
