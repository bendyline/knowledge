---
title: "Validating a Data Flow Component"
description: "Validating a Data Flow Component"
ms.date: "03/04/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "ReinitializeMetaData method"
  - "Validate method"
  - "component validation [Integration Services]"
  - "custom data flow components [Integration Services], validating"
  - "validation [Integration Services], components"
  - "data flow components [Integration Services], validating"
  - "validation [Integration Services]"
dev_langs:
  - "VB"
  - "CSharp"
---
# Validating a Data Flow Component


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%252A) method of the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent) base class is provided to prevent execution of a component that is not configured correctly. Use this method to verify that a component has the expected number of input and output objects, that the custom properties of the component have acceptable values, and that any connections, if required, are specified. Use this method also to verify that the columns in the input and output collections have the correct data types and that the [Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSUsageType](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSUsageType) of each column is set appropriately for the component. The base class implementation assists in the validation process by checking the input column collection of the component and ensuring that each column in the collection refers to a column in the [Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSOutputCollection100](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.IDTSOutputCollection100) of the upstream component.  
  
## Validate Method  
 The [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%252A) method is called repeatedly when a component is edited in  SSIS 
 Designer. You can provide feedback to the designer and to users of the component through the [Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus) enumeration return value, and by posting warnings and errors. The [Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus) enumeration contains three values that indicate various stages of failure, and a fourth, [Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus.VS_ISVALID](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus.VS_ISVALID), that indicates whether the component is correctly configured and ready to execute.  
  
 The [Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus.VS_NEEDSNEWMETADATA](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus.VS_NEEDSNEWMETADATA) value indicates that an error exists in the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ComponentMetaData%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ComponentMetaData%252A), and that the component can repair the errors. If a component encounters a metadata error that it can repair, it should not fix the error in the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%252A) method, and [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ComponentMetaData%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ComponentMetaData%252A) should not be modified during validation. Instead, the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%252A) method should return only [Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus.VS_NEEDSNEWMETADATA](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus.VS_NEEDSNEWMETADATA), and the component should repair the error in a call to the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ReinitializeMetaData%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ReinitializeMetaData%252A) method, as described later in this section.  
  
 The [Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus.VS_ISBROKEN](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus.VS_ISBROKEN) value indicates that the component has an error that can be rectified by editing the component in the designer. The error is typically caused by a custom property or a required connection that is not specified or is set incorrectly.  
  
 The final error value is [Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus.VS_ISCORRUPT](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus.VS_ISCORRUPT), which indicates that the component has discovered errors that should only occur if the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ComponentMetaData%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ComponentMetaData%252A) property has been modified directly, either by editing the package XML or by using the object model. For example, this kind of error occurs when a component has added only a single input, but validation discovers that more than one input exists in the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ComponentMetaData%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ComponentMetaData%252A). Errors that generate this return value can only be repaired by resetting the component by using the **Reset** button in the **Advanced Editor** dialog box.  
  
 Besides returning error values, components provide feedback by posting warnings or errors during validation. The [Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireWarning%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireWarning%252A) and [Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireError%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.IDTSComponentEvents.FireError%252A) methods provide this mechanism. When these methods are called, these events are posted in the **Error List** window of  SQL Server Data Tools (SSDT) 
. Component developers can then provide direct feedback to users on the errors that have occurred, and if appropriate, how to correct them.  
  
 The following code example shows an overridden implementation of [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%252A).  
  
```csharp  
public override DTSValidationStatus Validate()  
{  
    bool pbCancel = false;  
  
    // Validate that there is one input.  
    if (ComponentMetaData.InputCollection.Count != 1)  
    {  
    ComponentMetaData.FireError(0, ComponentMetaData.Name, "Incorrect number of inputs.", "", 0, out pbCancel);  
    return DTSValidationStatus.VS_ISCORRUPT;  
    }  
  
    // Validate that the UserName custom property is set.  
    if (ComponentMetaData.CustomPropertyCollection["UserName"].Value == null || ((string)ComponentMetaData.CustomPropertyCollection["UserName"].Value).Length == 0)  
    {  
        ComponentMetaData.FireError(0, ComponentMetaData.Name, "The UserName property must be set.", "", 0, out pbCancel);  
        return DTSValidationStatus.VS_ISBROKEN;  
    }  
  
    // Validate that there is one output.  
    if (ComponentMetaData.OutputCollection.Count != 1)  
    {  
        ComponentMetaData.FireError(0, ComponentMetaData.Name, "Incorrect number of outputs.", "", 0, out pbCancel);  
        return DTSValidationStatus.VS_ISCORRUPT;  
    }  
  
    // Let the base class verify that the input column reflects the output   
    // of the upstream component.  
    return base.Validate();  
}  
```  
  
```vb  
Public  Overrides Function Validate() As DTSValidationStatus   
  
 Dim pbCancel As Boolean = False  
  
 ' Validate that there is one input.  
 If Not (ComponentMetaData.InputCollection.Count = 1) Then   
   ComponentMetaData.FireError(0, ComponentMetaData.Name, "Incorrect number of inputs.", "", 0, pbCancel)   
   Return DTSValidationStatus.VS_ISCORRUPT   
 End If   
  
 ' Validate that the UserName custom property is set.  
 If ComponentMetaData.CustomPropertyCollection("UserName").Value Is Nothing OrElse CType(ComponentMetaData.CustomPropertyCollection("UserName").Value, String).Length = 0 Then   
   ComponentMetaData.FireError(0, ComponentMetaData.Name, "The UserName property must be set.", "", 0, pbCancel)   
   Return DTSValidationStatus.VS_ISBROKEN   
 End If   
  
 ' Validate that there is one output.  
 If Not (ComponentMetaData.OutputCollection.Count = 1) Then   
   ComponentMetaData.FireError(0, ComponentMetaData.Name, "Incorrect number of outputs.", "", 0, pbCancel)   
   Return DTSValidationStatus.VS_ISCORRUPT   
 End If   
  
 ' Let the base class verify that the input column reflects the output   
 ' of the upstream component.  
  
 Return MyBase.Validate   
  
End Function  
```  
  
## ReinitializeMetaData Method  
 The [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ReinitializeMetaData%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ReinitializeMetaData%252A) method is called by  SSIS 
 Designer whenever you edit a component that returns [Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus.VS_NEEDSNEWMETADATA](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.Wrapper.DTSValidationStatus.VS_NEEDSNEWMETADATA) from its [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.Validate%252A) method. Components should contain code that detects and corrects the problems identified by the component during validation.  
  
 The following example shows a component that detects problems during validation and fixes these errors in the [Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ReinitializeMetaData%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Pipeline.PipelineComponent.ReinitializeMetaData%252A) method.  
  
```csharp  
private bool areInputColumnsValid = true;  
public override DTSValidationStatus Validate()  
{  
    IDTSInput100 input = ComponentMetaData.InputCollection[0];  
    IDTSVirtualInput100 vInput = input.GetVirtualInput();  
  
    bool Cancel = false;  
    foreach (IDTSInputColumn100 column in input.InputColumnCollection)  
    {  
        try  
        {  
            IDTSVirtualInputColumn100 vColumn = vInput.VirtualInputColumnCollection.GetVirtualInputColumnByLineageID(column.LineageID);  
        }  
        catch  
        {  
            ComponentMetaData.FireError(0, ComponentMetaData.Name, "The input column " + column.IdentificationString + " does not match a column in the upstream component.", "", 0, out Cancel);  
            areInputColumnsValid = false;  
            return DTSValidationStatus.VS_NEEDSNEWMETADATA;  
        }  
    }  
  
    return DTSValidationStatus.VS_ISVALID;  
}  
public override void ReinitializeMetaData()  
{  
    if (!areInputColumnsValid)  
    {  
        IDTSInput100 input = ComponentMetaData.InputCollection[0];  
        IDTSVirtualInput100 vInput = input.GetVirtualInput();  
  
        foreach (IDTSInputColumn100 column in input.InputColumnCollection)  
        {  
            IDTSVirtualInputColumn100 vColumn = vInput.VirtualInputColumnCollection.GetVirtualInputColumnByLineageID(column.LineageID);  
  
            if (vColumn == null)  
                input.InputColumnCollection.RemoveObjectByID(column.ID);  
        }  
        areInputColumnsValid = true;  
    }  
}  
```  
  
```vb  
Private areInputColumnsValid As Boolean = True   
  
Public  Overrides Function Validate() As DTSValidationStatus   
 Dim input As IDTSInput100 = ComponentMetaData.InputCollection(0)   
 Dim vInput As IDTSVirtualInput100 = input.GetVirtualInput   
 Dim Cancel As Boolean = False   
 For Each column As IDTSInputColumn100 In input.InputColumnCollection   
   Try   
     Dim vColumn As IDTSVirtualInputColumn100 = vInput.VirtualInputColumnCollection.GetVirtualInputColumnByLineageID(column.LineageID)   
   Catch   
     ComponentMetaData.FireError(0, ComponentMetaData.Name, "The input column " + column.IdentificationString + " does not match a column in the upstream component.", "", 0, Cancel)   
     areInputColumnsValid = False   
     Return DTSValidationStatus.VS_NEEDSNEWMETADATA   
   End Try   
 Next   
 Return DTSValidationStatus.VS_ISVALID   
End Function   
  
Public  Overrides Sub ReinitializeMetaData()   
 If Not areInputColumnsValid Then   
   Dim input As IDTSInput100 = ComponentMetaData.InputCollection(0)   
   Dim vInput As IDTSVirtualInput100 = input.GetVirtualInput   
   For Each column As IDTSInputColumn100 In input.InputColumnCollection   
     Dim vColumn As IDTSVirtualInputColumn100 = vInput.VirtualInputColumnCollection.GetVirtualInputColumnByLineageID(column.LineageID)   
     If vColumn Is Nothing Then   
       input.InputColumnCollection.RemoveObjectByID(column.ID)   
     End If   
   Next   
   areInputColumnsValid = True   
 End If   
End Sub  
```
