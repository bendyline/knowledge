---
description: "Learn more about: Using DataContractSerializer and DataContractResolver to Provide the Functionality of NetDataContractSerializer"
title: "Using DataContractSerializer and DataContractResolver to Provide the Functionality of NetDataContractSerializer"
ms.date: "03/30/2017"
ms.assetid: 1376658f-f695-45f7-a7e0-94664e9619ff
---
# Using DataContractSerializer and DataContractResolver to Provide the Functionality of NetDataContractSerializer

The [NetDcSasDcSwithDCR sample](https://github.com/dotnet/samples/tree/main/framework/wcf) demonstrates how the use of [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) with an appropriate [System.Runtime.Serialization.DataContractResolver](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractResolver) provides the same functionality as [System.Runtime.Serialization.NetDataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.NetDataContractSerializer). This sample shows how to create the appropriate [System.Runtime.Serialization.DataContractResolver](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractResolver) and how to add it to the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer).

## Sample details

 [System.Runtime.Serialization.NetDataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.NetDataContractSerializer) differs from [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) in one important way: [System.Runtime.Serialization.NetDataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.NetDataContractSerializer) includes CLR type information in the serialized XML, whereas [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) does not. Therefore, [System.Runtime.Serialization.NetDataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.NetDataContractSerializer) can be used only if both the serializing and deserializing ends share the same CLR types. However, it is recommended to use [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) because its performance is better than [System.Runtime.Serialization.NetDataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.NetDataContractSerializer). You can change the information that is serialized in [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) by adding a [System.Runtime.Serialization.DataContractResolver](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractResolver) to it.

This sample consists of two projects. The first project uses [System.Runtime.Serialization.NetDataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.NetDataContractSerializer) to serialize an object. The second project uses [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) with a [System.Runtime.Serialization.DataContractResolver](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractResolver) to provide the same functionality as the first project.

The following code example shows the implementation of a custom [System.Runtime.Serialization.DataContractResolver](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractResolver) named `MyDataContractResolver` that is added to the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) in the DCSwithDCR project.

```csharp
class MyDataContractResolver : DataContractResolver
{
    private XmlDictionary dictionary = new XmlDictionary();

    public MyDataContractResolver()
    {
    }

    // Used at deserialization
    // Allows users to map xsi:type name to any Type
    public override Type ResolveName(string typeName, string typeNamespace, DataContractResolver knownTypeResolver)
    {
        Type type = knownTypeResolver.ResolveName(typeName, typeNamespace, null);
        type ??= Type.GetType(typeName + ", " + typeNamespace);
        return type;
    }

    // Used at serialization
    // Maps any Type to a new xsi:type representation
    public override void ResolveType(Type dataContractType, DataContractResolver knownTypeResolver, out XmlDictionaryString typeName, out XmlDictionaryString typeNamespace)
    {
        knownTypeResolver.ResolveType(dataContractType, null, out typeName, out typeNamespace);
        if (typeName == null || typeNamespace == null)
        {
            XmlDictionary dictionary = new XmlDictionary();
            typeName = dictionary.Add(dataContractType.FullName);
            typeNamespace = dictionary.Add(dataContractType.Assembly.FullName);
        }
    }
}
```

#### To use this sample

1. Using Visual Studio, open the DCRSample.sln solution file.

2. Right-click the solution file and choose **Properties**.

3. In the **Solution Property Pages** dialog, under **Common Properties**, **Startup Project**, select **Multiple startup projects:**.

4. Next to the **DCSwithDCR** project, select **Start** from the **Action** dropdown.

5. Next to the **NetDCS** project, select **Start** from the **Action** dropdown.

6. Click **OK** to close the dialog.

7. To build the solution, press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>.

8. To run the solution, press <kbd>Ctrl</kbd>+<kbd>F5</kbd>.
