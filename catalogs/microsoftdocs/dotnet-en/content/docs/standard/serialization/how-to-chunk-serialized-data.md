---
title: "How to: chunk serialized data"
description: You can chunk data to avoid problems with large datasets. Implement the IXmlSerializable interface to control serialization and deserialization.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "chunking serialized data"
  - "data chunking"
  - "binary serialization, chunking data"
  - "large data set chunking"
  - "serialization, chunking data"
  - "serialization, examples"
  - "binary serialization, examples"
ms.assetid: 22f1b818-7e0d-428a-8680-f17d6ebdd185
---
# How to: chunk serialized data

> **Warning:**
> Binary serialization with `BinaryFormatter` can be dangerous. For more information, see the [BinaryFormatter security guide](binaryformatter-security-guide.md) and the [BinaryFormatter migration guide](binaryformatter-migration-guide/index.md).


Two issues that occur when sending large data sets in Web service messages are:

1. A large working set (memory) due to buffering by the serialization engine.

2. Inordinate bandwidth consumption due to 33 percent inflation after Base64 encoding.

 To solve these problems, implement the [System.Xml.Serialization.IXmlSerializable](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable) interface to control the serialization and deserialization. Specifically, implement the [System.Xml.Serialization.IXmlSerializable.WriteXml*](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable.WriteXml*) and [System.Xml.Serialization.IXmlSerializable.ReadXml*](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable.ReadXml*) methods to chunk the data.

### To implement server-side chunking

1. On the server machine, the Web method must turn off ASP.NET buffering and return a type that implements [System.Xml.Serialization.IXmlSerializable](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable).

2. The type that implements [System.Xml.Serialization.IXmlSerializable](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable) chunks the data in the [System.Xml.Serialization.IXmlSerializable.WriteXml*](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable.WriteXml*) method.

### To implement client-side processing

1. Alter the Web method on the client proxy to return the type that implements [System.Xml.Serialization.IXmlSerializable](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable). You can use a [System.Xml.Serialization.Advanced.SchemaImporterExtension](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.Advanced.SchemaImporterExtension) to do this automatically, but this isn't shown here.

2. Implement the [System.Xml.Serialization.IXmlSerializable.ReadXml*](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable.ReadXml*) method to read the chunked data stream and write the bytes to disk. This implementation also raises progress events that can be used by a graphic control, such as a progress bar.

## Example

The following code example shows the Web method on the client that turns off ASP.NET buffering. It also shows the client-side implementation of the [System.Xml.Serialization.IXmlSerializable](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable) interface that chunks the data in the [System.Xml.Serialization.IXmlSerializable.WriteXml*](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.IXmlSerializable.WriteXml*) method.

[HowToChunkSerializedData#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Remoting/HowToChunkSerializedData/CS/SerializationChunk.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_Remoting/HowToChunkSerializedData/CS/SerializationChunk.cs.md)
[HowToChunkSerializedData#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Remoting/HowToChunkSerializedData/VB/SerializationChunk.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Remoting/HowToChunkSerializedData/VB/SerializationChunk.vb.md)
[HowToChunkSerializedData#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Remoting/HowToChunkSerializedData/CS/SerializationChunk.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_Remoting/HowToChunkSerializedData/CS/SerializationChunk.cs.md)
[HowToChunkSerializedData#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Remoting/HowToChunkSerializedData/VB/SerializationChunk.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Remoting/HowToChunkSerializedData/VB/SerializationChunk.vb.md)
[HowToChunkSerializedData#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Remoting/HowToChunkSerializedData/CS/SerializationChunk.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_Remoting/HowToChunkSerializedData/CS/SerializationChunk.cs.md)
[HowToChunkSerializedData#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Remoting/HowToChunkSerializedData/VB/SerializationChunk.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Remoting/HowToChunkSerializedData/VB/SerializationChunk.vb.md)

## Compiling the code

- The code uses the following namespaces: [System](https://learn.microsoft.com/search/?terms=System), [System.Runtime.Serialization](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization), [System.Web.Services](https://learn.microsoft.com/search/?terms=System.Web.Services), [System.Web.Services.Protocols](https://learn.microsoft.com/search/?terms=System.Web.Services.Protocols), [System.Xml](https://learn.microsoft.com/search/?terms=System.Xml), [System.Xml.Serialization](https://learn.microsoft.com/search/?terms=System.Xml.Serialization), and [System.Xml.Schema](https://learn.microsoft.com/search/?terms=System.Xml.Schema).

## See also

- [Custom Serialization](https://learn.microsoft.com/previous-versions/dotnet/fundamentals/serialization/binary/custom-serialization)
