---
description: "Learn more about: Data Contract Surrogates"
title: "Data Contract Surrogates"
ms.date: "03/30/2017"
helpviewer_keywords:
  - "data contracts [WCF], surrogates"
ms.assetid: 8c31134c-46c5-4ed7-94af-bab0ac0dfce5
---
# Data Contract Surrogates

The data contract *surrogate* is an advanced feature built upon the Data Contract model. This feature is designed to be used for type customization and substitution in situations where users want to change how a type is serialized, deserialized or projected into metadata. Some scenarios where a surrogate may be used is when a data contract has not been specified for the type, fields and properties are not marked with the [System.Runtime.Serialization.DataMemberAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataMemberAttribute) attribute or users wish to dynamically create schema variations.

 Serialization and deserialization are accomplished with the data contract surrogate when using [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) to convert from .NET Framework to a suitable format, such as XML. Data contract surrogate can also be used to modify the metadata exported for types, when producing metadata representations such as XML Schema Documents (XSD). Upon import, code is created from metadata and the surrogate can be used in this case to customize the generated code as well.

## How the Surrogate Works

 A surrogate works by mapping one type (the "original" type) to another type (the "surrogated" type). The following example shows the original type `Inventory` and a new surrogate `InventorySurrogated` type. The `Inventory` type is not serializable but the `InventorySurrogated` type is:

 [C_IDataContractSurrogate#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs.md)

 Because a data contract has not been defined for this class, convert the class to a surrogate class with a data contract. The surrogated class is shown in the following example:

 [C_IDataContractSurrogate#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs.md)

## Implementing the IDataContractSurrogate

 To use the data contract surrogate, implement the [System.Runtime.Serialization.IDataContractSurrogate](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate) interface.

 The following is an overview of each method of [System.Runtime.Serialization.IDataContractSurrogate](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate) with a possible implementation.

### GetDataContractType

 The [System.Runtime.Serialization.IDataContractSurrogate.GetDataContractType*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetDataContractType*) method maps one type to another. This method is required for serialization, deserialization, import, and export.

 The first task is defining what types will be mapped to other types. For example:

 [C_IDataContractSurrogate#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs.md)

- On serialization, the mapping returned by this method is subsequently used to transform the original instance to a surrogated instance by calling the [System.Runtime.Serialization.IDataContractSurrogate.GetObjectToSerialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetObjectToSerialize*) method.

- On deserialization, the mapping returned by this method is used by the serializer to deserialize into an instance of the surrogate type. It subsequently calls [System.Runtime.Serialization.IDataContractSurrogate.GetDeserializedObject*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetDeserializedObject*) to transform the surrogated instance into an instance of the original type.

- On export, the surrogate type returned by this method is reflected to get the data contract to use for generating metadata.

- On import, the initial type is changed to a surrogate type that is reflected to get the data contract to use for purposes like referencing support.

 The [System.Type](https://learn.microsoft.com/search/?terms=System.Type) parameter is the type of the object that is being serialized, deserialized, imported, or exported. The [System.Runtime.Serialization.IDataContractSurrogate.GetDataContractType*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetDataContractType*) method must return the input type if the surrogate does not handle the type. Otherwise, return the appropriate surrogated type. If several surrogate types exist, numerous mappings can be defined in this method.

 The [System.Runtime.Serialization.IDataContractSurrogate.GetDataContractType*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetDataContractType*) method is not called for built-in data contract primitives, such as [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32) or [System.String](https://learn.microsoft.com/search/?terms=System.String). For other types, such as arrays, user-defined types, and other data structures, this method will be called for each type.

 In the previous example, the method checks if the `type` parameter and `Inventory` are comparable. If so, the method maps it to `InventorySurrogated`. Whenever a serialization, deserialization, import schema, or export schema is called, this function is called first to determine the mapping between types.

### GetObjectToSerialize Method

 The [System.Runtime.Serialization.IDataContractSurrogate.GetObjectToSerialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetObjectToSerialize*) method converts the original type instance to the surrogated type instance. The method is required for serialization.

 The next step is to define the way the physical data will be mapped from the original instance to the surrogate by implementing the [System.Runtime.Serialization.IDataContractSurrogate.GetObjectToSerialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetObjectToSerialize*) method. For example:

 [C_IDataContractSurrogate#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs.md)

 The [System.Runtime.Serialization.IDataContractSurrogate.GetObjectToSerialize*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetObjectToSerialize*) method is called when an object is serialized. This method transfers data from the original type to the fields of the surrogated type. Fields can be directly mapped to surrogate fields, or manipulations of the original data may be stored in the surrogate. Some possible uses include: directly mapping the fields, performing operations on the data to be stored in the surrogated fields, or storing the XML of the original type in the surrogated field.

 The `targetType` parameter refers to the declared type of the member. This parameter is the surrogated type returned by the [System.Runtime.Serialization.IDataContractSurrogate.GetDataContractType*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetDataContractType*) method. The serializer does not enforce that the object returned is assignable to this type. The `obj` parameter is the object to serialize, and will be converted to its surrogate if necessary. This method must return the input object if the surrogated does not handle the object. Otherwise, the new surrogate object will be returned. The surrogate is not called if the object is null. Numerous surrogate mappings for different instances may be defined within this method.

 When creating a [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer), you can instruct it to preserve object references. (For more information, see [Serialization and Deserialization](../feature-details/serialization-and-deserialization.md).) This is done by setting the `preserveObjectReferences` parameter in its constructor to `true`. In that case, the surrogate is called only once for an object since all subsequent serializations just write the reference into the stream. If `preserveObjectReferences` is set to `false`, then the surrogate is called every time an instance is encountered.

 If the type of the instance serialized differs from the declared type, type information is written into the stream, for example, `xsi:type` to allow the instance to be deserialized at the other end. This process occurs whether the object is surrogated or not.

 The example above converts the data of the `Inventory` instance to that of `InventorySurrogated`. It checks the type of the object and performs the necessary manipulations to convert to the surrogated type. In this case, the fields of the `Inventory` class are directly copied over to the `InventorySurrogated` class fields.

### GetDeserializedObject Method

 The [System.Runtime.Serialization.IDataContractSurrogate.GetDeserializedObject*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetDeserializedObject*) method converts the surrogated type instance to the original type instance. It is required for deserialization.

 The next task is to define the way the physical data will be mapped from the surrogate instance to the original. For example:

 [C_IDataContractSurrogate#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs.md)

 This method is called only during the deserialization of an object. It provides reverse data mapping for the deserialization from the surrogate type back to its original type. Similar to the `GetObjectToSerialize` method, some possible uses may be to directly exchange field data, perform operations on the data, and store XML data. When  deserializing, you may not always obtain the exact data values from original due to manipulations in the data conversion.

 The `targetType` parameter refers to the declared type of the member. This parameter is the surrogated type returned by the `GetDataContractType` method. The `obj` parameter refers to the object that has been deserialized. The object can be converted back to its original type if it is surrogated. This method returns the input object if the surrogate does not handle the object. Otherwise, the deserialized object will be returned once its conversion has been completed. If several surrogate types exist, you may provide data conversion from surrogate to primary type for each by indicating each type and its conversion.

 When returning an object, the internal object tables are updated with the object returned by this surrogate. Any subsequent references to an instance will obtain the surrogated instance from the object tables.

 The previous example converts objects of type `InventorySurrogated` back to the initial type `Inventory`. In this case, data is directly transferred back from `InventorySurrogated` to its corresponding fields in `Inventory`. Because there are no data manipulations, the each of the member fields will contain the same values as before the serialization.

### GetCustomDataToExport Method

 When exporting a schema, the [System.Runtime.Serialization.IDataContractSurrogate.GetCustomDataToExport*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetCustomDataToExport*) method is optional. It is used to insert additional data or hints into the exported schema. Additional data can be inserted at the member level or type level. For example:

 [C_IDataContractSurrogate#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs.md)

 This method (with two overloads) enables the inclusion of extra information into the metadata either at the member or type level. It is possible to include hints about whether a member is public or private, and comments which would be preserved throughout the export and import of the schema. Such information would be lost without this method. This method does not cause the insertion or deletion of members or types, but rather adds additional data to the schemas at either of these levels.

 The method is overloaded and can take either a `Type` (`clrtype` parameter) or [System.Reflection.MemberInfo](https://learn.microsoft.com/search/?terms=System.Reflection.MemberInfo) (`memberInfo` parameter). The second parameter is always a `Type` (`dataContractType` parameter). This method is called for every member and type of the surrogated `dataContractType` type.

 Either of these overloads must return either `null` or a serializable object. A non-null object will be serialized as annotation into the exported schema. For the `Type` overload, each type that is exported to schema is sent to this method in the first parameter along with the surrogated type as the `dataContractType` parameter. For the `MemberInfo` overload, each member that is exported to schema sends its information as the `memberInfo` parameter with the surrogated type in the second parameter.

#### GetCustomDataToExport Method (Type, Type)

 The [System.Runtime.Serialization.IDataContractSurrogate.GetCustomDataToExport%28System.Type%2CSystem.Type%29](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetCustomDataToExport%2528System.Type%252CSystem.Type%2529) method is called during schema export for every type definition. The method adds information to the types within the schema when exporting. Each type defined is sent to this method to determine whether there is any additional data that needs to be included in the schema.

#### GetCustomDataToExport Method (MemberInfo, Type)

 The [System.Runtime.Serialization.IDataContractSurrogate.GetCustomDataToExport%28System.Reflection.MemberInfo%2CSystem.Type%29](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetCustomDataToExport%2528System.Reflection.MemberInfo%252CSystem.Type%2529) is called during export for every member in the types that are exported. This function enables you to customize any comments for the members that will be included in the schema upon export. The information for every member within the class is sent to this method to check whether any additional data need to be added in the schema.

 The example above searches through the `dataContractType` for each member of the surrogate. It then returns the appropriate access modifier for each field. Without this customization, the default value for access modifiers is public. Therefore, all members would be defined as public in the code generated using the exported schema no matter what their actual access restrictions are. When not using this implementation, the member `numpens` would be public in the exported schema even though it was defined in the surrogate as private. Through the use of this method, in the exported schema, the access modifier can be generated as private.

### GetReferencedTypeOnImport Method

 This method maps the [System.Type](https://learn.microsoft.com/search/?terms=System.Type) of the surrogate to the original type. This method is optional for schema importation.

 When creating a surrogate that imports a schema and generates code for it, the next task is to define the type of a surrogate instance to its original type.

 If the generated code needs to reference an existing user type, this is done by implementing the [System.Runtime.Serialization.IDataContractSurrogate.GetReferencedTypeOnImport*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetReferencedTypeOnImport*) method.

 When importing a schema, this method is called for every type declaration to map the surrogated data contract to a type. The string parameters `typeName` and `typeNamespace` define the name and namespace of the surrogated type. The return value for [System.Runtime.Serialization.IDataContractSurrogate.GetReferencedTypeOnImport*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetReferencedTypeOnImport*) is used to determine whether a new type needs to be generated. This method must return either a valid type or null. For valid types, the type returned will be used as a referenced type in the generated code. If null is returned, no type will be referenced and a new type must be created. If several surrogates exist, it is possible to perform the mapping for each surrogate type back to its initial type.

 The `customData` parameter is the object originally returned from [System.Runtime.Serialization.IDataContractSurrogate.GetCustomDataToExport*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.GetCustomDataToExport*). This `customData` is used when surrogate authors want to insert extra data/hints into the metadata to use during import to generate code.

### ProcessImportedType Method

 The [System.Runtime.Serialization.IDataContractSurrogate.ProcessImportedType*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate.ProcessImportedType*) method customizes any type created from schema importation. This method is optional.

 When importing a schema, this method allows for any imported type and compilation information to be customized. For example:

 [C_IDataContractSurrogate#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs.md)

 During import, this method is called for every type generated. Change the specified [System.CodeDom.CodeTypeDeclaration](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeTypeDeclaration) or modify the [System.CodeDom.CodeCompileUnit](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeCompileUnit). This includes changing the name, members, attributes, and many other properties of the `CodeTypeDeclaration`. By processing the `CodeCompileUnit`, it is possible to modify the directives, namespaces, referenced assemblies, and several other aspects.

 The `CodeTypeDeclaration` parameter contains the code DOM type declaration. The `CodeCompileUnit` parameter allows for modification for processing the code.  Returning `null` results in the type declaration being discarded. Conversely, when returning a `CodeTypeDeclaration`, the modifications are preserved.

 If custom data is inserted during metadata export, it needs to be provided to the user during import so that it can be used. This custom data can be used for programming model hints, or other comments. Each `CodeTypeDeclaration` and [System.CodeDom.CodeTypeMember](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeTypeMember) instance includes custom data as the [System.CodeDom.CodeObject.UserData](https://learn.microsoft.com/search/?terms=System.CodeDom.CodeObject.UserData) property, cast to the `IDataContractSurrogate` type.

 The example above performs some changes on the schema imported. The code preserves private members of the original type by using a surrogate. The default access modifier when importing a schema is `public`. Therefore, all members of the surrogate schema will be public unless modified, as in this example. During export, custom data is inserted into the metadata about which members are private. The example looks up the custom data, checks whether the access modifier is private, and then modifies the appropriate member to be private by setting its attributes. Without this customization, the `numpens` member would be defined as public instead of private.

### GetKnownCustomDataTypes Method

 This method obtains custom data types defined from the schema. The method is optional for schema importation.

 The method is called at the beginning of schema export and import. The method returns the custom data types used in the schema exported or imported. The method is passed a [System.Collections.ObjectModel.Collection`1](https://learn.microsoft.com/search/?terms=System.Collections.ObjectModel.Collection%601) (the `customDataTypes` parameter), which is a collection of types. The method should add additional known types to this collection. The known custom data types are needed to enable serialization and deserialization of custom data using the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer). For more information, see [Data Contract Known Types](../feature-details/data-contract-known-types.md).

## Implementing a Surrogate

 To use the data contract surrogate within WCF, you must follow a few special procedures.

### To Use a Surrogate for Serialization and Deserialization

 Use the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) to perform serialization and deserialization of data with the surrogate. The [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) is created by the [System.ServiceModel.Description.DataContractSerializerOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.DataContractSerializerOperationBehavior). The surrogate must also be specified.

##### To implement serialization and deserialization

1. Create an instance of the [System.ServiceModel.ServiceHost](https://learn.microsoft.com/search/?terms=System.ServiceModel.ServiceHost) for your service. For complete instructions, see [Basic WCF Programming](../basic-wcf-programming.md).

2. For every [System.ServiceModel.Description.ServiceEndpoint](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.ServiceEndpoint) of the specified service host, find its [System.ServiceModel.Description.OperationDescription](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.OperationDescription).

3. Search through the operation behaviors to determine if an instance of the [System.ServiceModel.Description.DataContractSerializerOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.DataContractSerializerOperationBehavior) is found.

4. If a [System.ServiceModel.Description.DataContractSerializerOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.DataContractSerializerOperationBehavior) is found, set its [System.ServiceModel.Description.DataContractSerializerOperationBehavior.DataContractSurrogate](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.DataContractSerializerOperationBehavior.DataContractSurrogate) property to a new instance of the surrogate. If no [System.ServiceModel.Description.DataContractSerializerOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.DataContractSerializerOperationBehavior) is found, then create a new instance and set the [System.ServiceModel.Description.DataContractSerializerOperationBehavior.DataContractSurrogate*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.DataContractSerializerOperationBehavior.DataContractSurrogate*) member of the new behavior to a new instance of the surrogate.

5. Finally, add this new behavior to the current operation behaviors, as shown in the following example:

     [C_IDataContractSurrogate#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs.md)

### To Use a Surrogate for Metadata Import

 When importing metadata like WSDL and XSD to generate client-side code, the surrogate needs to be added to the component responsible for generating code from XSD schema, [System.Runtime.Serialization.XsdDataContractImporter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractImporter). To do this, directly modify the [System.ServiceModel.Description.WsdlImporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlImporter) used to import metadata.

##### To implement a surrogate for metadata importation

1. Import the metadata using the [System.ServiceModel.Description.WsdlImporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlImporter) class.

2. Use the [System.Collections.Generic.Dictionary`2.TryGetValue*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602.TryGetValue*) method to check whether an [System.Runtime.Serialization.XsdDataContractImporter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractImporter) has been defined.

3. If the [System.Collections.Generic.Dictionary`2.TryGetValue*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602.TryGetValue*) method returns `false`, create a new [System.Runtime.Serialization.XsdDataContractImporter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractImporter) and set its [System.Runtime.Serialization.XsdDataContractImporter.Options](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractImporter.Options) property to a new instance of the [System.Runtime.Serialization.ImportOptions](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ImportOptions) class. Otherwise, use the importer returned by the `out` parameter of the [System.Collections.Generic.Dictionary`2.TryGetValue*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602.TryGetValue*) method.

4. If the [System.Runtime.Serialization.XsdDataContractImporter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractImporter) has no [System.Runtime.Serialization.ImportOptions](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ImportOptions) defined, then set the property to be a new instance of the [System.Runtime.Serialization.ImportOptions](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ImportOptions) class.

5. Set the [System.Runtime.Serialization.ImportOptions.DataContractSurrogate](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ImportOptions.DataContractSurrogate) property of the [System.Runtime.Serialization.ImportOptions](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ImportOptions) of the [System.Runtime.Serialization.XsdDataContractImporter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractImporter) to a new instance of the surrogate.

6. Add the [System.Runtime.Serialization.XsdDataContractImporter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractImporter) to the collection returned by the [System.ServiceModel.Description.MetadataExporter.State](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExporter.State) property of the [System.ServiceModel.Description.WsdlImporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlImporter) (inherited from the [System.ServiceModel.Description.MetadataExporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExporter) class.)

7. Use the [System.ServiceModel.Description.WsdlImporter.ImportAllContracts*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlImporter.ImportAllContracts*) method of the [System.ServiceModel.Description.WsdlImporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlImporter) to import all of the data contracts within the schema. During the last step, code is generated from the schemas loaded by calling into the surrogate.

     [C_IDataContractSurrogate#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs.md)

### To Use a surrogate for Metadata Export

 By default, when exporting metadata from WCF for a service, both WSDL and XSD schema needs to be generated. The surrogate needs to be added to the component responsible for generating XSD schema for data contract types, [System.Runtime.Serialization.XsdDataContractExporter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractExporter). To do this, either use a behavior that implements [System.ServiceModel.Description.IWsdlExportExtension](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IWsdlExportExtension) to modify the [System.ServiceModel.Description.WsdlExporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlExporter), or directly modify the [System.ServiceModel.Description.WsdlExporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlExporter) used to export metadata.

##### To use a surrogate for metadata export

1. Create a new [System.ServiceModel.Description.WsdlExporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlExporter) or use the `wsdlExporter` parameter passed to the [System.ServiceModel.Description.IWsdlExportExtension.ExportContract*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.IWsdlExportExtension.ExportContract*) method.

2. Use the [System.Collections.Generic.Dictionary`2.TryGetValue*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602.TryGetValue*) function to check whether an [System.Runtime.Serialization.XsdDataContractExporter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractExporter) has been defined.

3. If [System.Collections.Generic.Dictionary`2.TryGetValue*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602.TryGetValue*) returns `false`, create a new [System.Runtime.Serialization.XsdDataContractExporter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractExporter) with the generated XML schemas from the [System.ServiceModel.Description.WsdlExporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlExporter), and add it to the collection returned by the [System.ServiceModel.Description.MetadataExporter.State](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.MetadataExporter.State) property of the [System.ServiceModel.Description.WsdlExporter](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.WsdlExporter). Otherwise, use the exporter returned by the `out` parameter of the [System.Collections.Generic.Dictionary`2.TryGetValue*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602.TryGetValue*) method.

4. If the [System.Runtime.Serialization.XsdDataContractExporter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractExporter) has no [System.Runtime.Serialization.ExportOptions](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ExportOptions) defined, then set the [System.Runtime.Serialization.XsdDataContractExporter.Options](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractExporter.Options) property to a new instance of the [System.Runtime.Serialization.ExportOptions](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ExportOptions) class.

5. Set the [System.Runtime.Serialization.ExportOptions.DataContractSurrogate](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ExportOptions.DataContractSurrogate) property of the [System.Runtime.Serialization.ExportOptions](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ExportOptions) of the [System.Runtime.Serialization.XsdDataContractExporter](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XsdDataContractExporter) to a new instance of the surrogate. Subsequent steps for exporting metadata do not require any changes.

     [C_IDataContractSurrogate#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_idatacontractsurrogate/cs/source.cs.md)

## See also

- [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer)
- [System.Runtime.Serialization.IDataContractSurrogate](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.IDataContractSurrogate)
- [System.ServiceModel.Description.DataContractSerializerOperationBehavior](https://learn.microsoft.com/search/?terms=System.ServiceModel.Description.DataContractSerializerOperationBehavior)
- [System.Runtime.Serialization.ImportOptions](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ImportOptions)
- [System.Runtime.Serialization.ExportOptions](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.ExportOptions)
- [Using Data Contracts](../feature-details/using-data-contracts.md)
