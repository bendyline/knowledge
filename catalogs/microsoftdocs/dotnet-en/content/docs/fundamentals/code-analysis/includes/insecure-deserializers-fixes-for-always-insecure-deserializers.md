---
author: dotpaul
ms.author: paulming
ms.date: 05/01/2019
ms.topic: include
---
- If possible, use a secure serializer instead, and **don't allow an attacker to specify an arbitrary type to deserialize**. Some safer serializers include:

  - [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer)
  - [System.Runtime.Serialization.Json.DataContractJsonSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.Json.DataContractJsonSerializer)
  - [System.Web.Script.Serialization.JavaScriptSerializer](https://learn.microsoft.com/search/?terms=System.Web.Script.Serialization.JavaScriptSerializer) - Never use [System.Web.Script.Serialization.SimpleTypeResolver](https://learn.microsoft.com/search/?terms=System.Web.Script.Serialization.SimpleTypeResolver). If you must use a type resolver, restrict deserialized types to an expected list.
  - [System.Xml.Serialization.XmlSerializer](https://learn.microsoft.com/search/?terms=System.Xml.Serialization.XmlSerializer)
  - Newtonsoft Json.NET - Use TypeNameHandling.None. If you must use another value for TypeNameHandling, restrict deserialized types to an expected list with a custom ISerializationBinder.
  - Protocol Buffers

- Make the serialized data tamper-proof. After serialization, cryptographically sign the serialized data. Before deserialization, validate the cryptographic signature. Protect the cryptographic key from being disclosed and design for key rotations.
