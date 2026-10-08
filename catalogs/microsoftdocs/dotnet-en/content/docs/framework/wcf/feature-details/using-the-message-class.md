---
title: "Using the Message Class"
description: Learn about the Message class, which is fundamental to WCF. You need to program using Message class directly only in some advanced scenarios.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: d1d62bfb-2aa3-4170-b6f8-c93d3afdbbed
---
# Using the Message Class

The [System.ServiceModel.Channels.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message) class is fundamental to Windows Communication Foundation (WCF). All communication between clients and services ultimately results in [System.ServiceModel.Channels.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message) instances being sent and received.

 You would not usually interact with the [System.ServiceModel.Channels.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message) class directly. Instead, WCF service model constructs, such as data contracts, message contracts, and operation contracts, are used to describe incoming and outgoing messages. However, in some advanced scenarios you can program using the [System.ServiceModel.Channels.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message) class directly. For example, you might want to use the [System.ServiceModel.Channels.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message) class:

- When you need an alternative way of creating outgoing message contents (for example, creating a message directly from a file on disk) instead of serializing .NET Framework objects.

- When you need an alternative way of using incoming message contents (for example, when you want to apply an XSLT transformation to the raw XML contents) instead of deserializing into .NET Framework objects.

- When you need to deal with messages in a general way regardless of message contents (for example, when routing or forwarding messages when building a router, load-balancer, or a publish-subscribe system).

 Before using the [System.ServiceModel.Channels.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message) class, familiarize yourself with the WCF data transfer architecture in [Data Transfer Architectural Overview](data-transfer-architectural-overview.md).

 A [System.ServiceModel.Channels.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message) is a general-purpose container for data, but its design closely follows the design of a message in the SOAP protocol. Just like in SOAP, a message has both a message body and headers. The message body contains the actual payload data, while the headers contain additional named data containers. The rules for reading and writing the body and the headers are different, for example, the headers are always buffered in memory and may be accessed in any order any number of times, while the body may be read only once and may be streamed. Normally, when using SOAP, the message body is mapped to the SOAP body and the message headers are mapped to the SOAP headers.

## Using the Message Class in Operations

 You can use the [System.ServiceModel.Channels.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message) class as an input parameter of an operation, the return value of an operation, or both. If [System.ServiceModel.Channels.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message) is used anywhere in an operation, the following restrictions apply:

- The operation cannot have any `out` or `ref` parameters.

- There cannot be more than one `input` parameter. If the parameter is present, it must be either Message or a message contract type.

- The return type must be either `void`, `Message`, or a message contract type.

 The following code example contains a valid operation contract.

 [C_UsingTheMessageClass#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs#1)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs.md)
 [C_UsingTheMessageClass#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb#1)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb.md)

## Creating Basic Messages

 The [System.ServiceModel.Channels.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message) class provides static `CreateMessage` factory methods that you can use to create basic messages.

 All `CreateMessage` overloads take a version parameter of type [System.ServiceModel.Channels.MessageVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageVersion) that indicates the SOAP and WS-Addressing versions to use for the message. If you want to use the same protocol versions as the incoming message, you can use the [System.ServiceModel.OperationContext.IncomingMessageVersion](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext.IncomingMessageVersion) property on the [System.ServiceModel.OperationContext](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext) instance obtained from the [System.ServiceModel.OperationContext.Current](https://learn.microsoft.com/search/?terms=System.ServiceModel.OperationContext.Current) property. Most `CreateMessage` overloads also have a string parameter that indicates the SOAP action to use for the message. Version can be set to `None` to disable SOAP envelope generation; the message consists of only the body.

## Creating Messages from Objects

 The most basic `CreateMessage` overload that takes only a version and an action creates a message with an empty body. Another overload takes an additional [System.Object](https://learn.microsoft.com/search/?terms=System.Object) parameter; this creates a message whose body is the serialized representation of the given object. Use the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) with default settings for serialization. If you want to use a different serializer, or you want the `DataContractSerializer` configured differently, use the `CreateMessage` overload that also takes an `XmlObjectSerializer` parameter.

 For example, to return an object in a message, you can use the following code.

 [C_UsingTheMessageClass#2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs#2)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs.md)
 [C_UsingTheMessageClass#2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb#2)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb.md)

## Creating Messages from XML Readers

 There are `CreateMessage` overloads that take an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) or an [System.Xml.XmlDictionaryReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlDictionaryReader) for the body instead of an object. In this case, the body of the message contains the XML that results from reading from the passed XML reader. For example, the following code returns a message with body contents read from an XML file.

 [C_UsingTheMessageClass#3 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs#3)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs.md)
 [C_UsingTheMessageClass#3 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb#3)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb.md)

 Additionally, there are `CreateMessage` overloads that take an [System.Xml.XmlReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlReader) or an [System.Xml.XmlDictionaryReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlDictionaryReader) that represents the entire message and not just the body. These overloads also take an integer `maxSizeOfHeaders` parameter. Headers are always buffered into memory as soon as the message is created, and this parameter limits the amount of buffering that takes place. It is important to set this parameter to a safe value if the XML is coming from an untrusted source to mitigate the possibility of a denial of service attack. The SOAP and WS-Addressing versions of the message the XML reader represents must match the versions indicated using the version parameter.

## Creating Messages with BodyWriter

 One `CreateMessage` overload takes a `BodyWriter` instance to describe the body of the message. A `BodyWriter` is an abstract class that can be derived to customize how message bodies are created. You can create your own `BodyWriter` derived class to describe message bodies in a custom way. You must override the `BodyWriter.OnWriteBodyContents` method that takes an [System.Xml.XmlDictionaryWriter](https://learn.microsoft.com/search/?terms=System.Xml.XmlDictionaryWriter); this method is responsible for writing out the body.

 Body writers can be buffered or non-buffered (streamed). Buffered body writers can write out their contents any number of times, while streamed ones can write out their contents only once. The `IsBuffered` property indicates whether a body writer is buffered or not. You can set this for your body writer by calling the protected `BodyWriter` constructor that takes an `isBuffered` boolean parameter. Body writers support creating a buffered body writer from a non-buffered body writer. You can override the `OnCreateBufferedCopy` method to customize this process. By default, an in-memory buffer that contains the XML returned by `OnWriteBodyContents` is used. `OnCreateBufferedCopy` takes a `maxBufferSize` integer parameter; if you override this method, you must not create buffers larger than this maximum size.

 The `BodyWriter` class provides the `WriteBodyContents` and `CreateBufferedCopy` methods, which are essentially thin wrappers around `OnWriteBodyContents` and `OnCreateBufferedCopy` methods, respectively. These methods perform state checking to ensure that a non-buffered body writer is not accessed more than once. These methods are called directly only when creating custom `Message` derived classes based on `BodyWriters`.

## Creating Fault Messages

 You can use certain `CreateMessage` overloads to create SOAP fault messages. The most basic of these takes a [System.ServiceModel.Channels.MessageFault](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageFault) object that describes the fault. Other overloads are provided for convenience. The first such overload takes a `FaultCode` and a reason string and creates a `MessageFault` using `MessageFault.CreateFault` using this information. The other overload takes a detail object and also passes it to `CreateFault` together with the fault code and the reason. For example, the following operation returns a fault.

 [C_UsingTheMessageClass#4 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs#4)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs.md)
 [C_UsingTheMessageClass#4 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb#4)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb.md)

## Extracting Message Body Data

 The `Message` class supports multiple ways of extracting information from its body. These can be classified into the following categories:

- Getting the entire message body written out at once to an XML writer. This is referred to as *writing a message*.

- Getting an XML reader over the message body. This enables you to later access the message body piece-by-piece as required. This is referred to as *reading a message*.

- The entire message, including its body, can be copied to an in-memory buffer of the [System.ServiceModel.Channels.MessageBuffer](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageBuffer) type. This is referred to as *copying a message*.

 You can access the body of a `Message` only once, regardless of how it is accessed. A message object has a `State` property, which is initially set to Created. The three access methods described in the preceding list set the state to Written, Read, and Copied, respectively. Additionally, a `Close` method can set the state to Closed when the message body contents are no longer required. The message body can be accessed only in the Created state, and there is no way to go back to the Created state after the state has changed.

## Writing Messages

 The [System.ServiceModel.Channels.Message.WriteBodyContents%28System.Xml.XmlDictionaryWriter%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.WriteBodyContents%2528System.Xml.XmlDictionaryWriter%2529) method writes out the body contents of a given `Message` instance to a given XML writer. The [System.ServiceModel.Channels.Message.WriteBody*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.WriteBody*) method does the same, except that it encloses the body contents in the appropriate wrapper element (for example, `<soap:body>`). Finally, [System.ServiceModel.Channels.Message.WriteMessage*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.WriteMessage*) writes out the entire message, including the wrapping SOAP envelope and the headers. If SOAP is turned off ([System.ServiceModel.Channels.Message.Version](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.Version) is [System.ServiceModel.Channels.MessageVersion.None](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageVersion.None)), all three methods do the same thing: they write out the message body contents.

 For example, the following code writes out the body of an incoming message to a file.

 [C_UsingTheMessageClass#5 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs#5)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs.md)
 [C_UsingTheMessageClass#5 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb#5)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb.md)

 Two additional helper methods write out certain SOAP start element tags. These methods do not access the message body and so they do not change the message state. These include:

- [System.ServiceModel.Channels.Message.WriteStartBody*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.WriteStartBody*) writes the start body element, for example, `<soap:Body>`.

- [System.ServiceModel.Channels.Message.WriteStartEnvelope*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.WriteStartEnvelope*) writes the start envelope element, for example, `<soap:Envelope>`.

 To write the corresponding end element tags, call `WriteEndElement` on the corresponding XML writer. These methods are rarely called directly.

## Reading Messages

 The primary way to read a message body is to call [System.ServiceModel.Channels.Message.GetReaderAtBodyContents*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.GetReaderAtBodyContents*). You get back an [System.Xml.XmlDictionaryReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlDictionaryReader) that you can use to read the message body. Note that the [System.ServiceModel.Channels.Message](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message) transitions to the Read state as soon as [System.ServiceModel.Channels.Message.GetReaderAtBodyContents*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.GetReaderAtBodyContents*) is called, and not when you use the returned XML reader.

 The [System.ServiceModel.Channels.Message.GetBody*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.GetBody*) method also enables you to access the message body as a typed object. Internally, this method uses `GetReaderAtBodyContents`, and so it also transitions the message state to the [System.ServiceModel.Channels.MessageState.Read](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageState.Read) state (see the [System.ServiceModel.Channels.Message.State](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.State) property).

 It is good practice to check the [System.ServiceModel.Channels.Message.IsEmpty](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.IsEmpty) property, in which case the message body is empty and [System.ServiceModel.Channels.Message.GetReaderAtBodyContents*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.GetReaderAtBodyContents*) throws an [System.InvalidOperationException](https://learn.microsoft.com/search/?terms=System.InvalidOperationException). Also, if it is a received message (for example, the reply), you may also want to check [System.ServiceModel.Channels.Message.IsFault](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.IsFault), which indicates whether the message contains a fault.

 The most basic overload of [System.ServiceModel.Channels.Message.GetBody*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.GetBody*) deserializes the message body into an instance of a type (indicated by the generic parameter) using a [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) configured with the default settings and with the [System.Runtime.Serialization.DataContractSerializer.MaxItemsInObjectGraph*](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer.MaxItemsInObjectGraph*) quota disabled. If you want to use a different serialization engine, or configure the `DataContractSerializer` in a non-default way, use the [System.ServiceModel.Channels.Message.GetBody*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.GetBody*) overload that takes an [System.Runtime.Serialization.XmlObjectSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.XmlObjectSerializer).

 For example, the following code extracts data from a message body that contains a serialized `Person` object and prints out the person’s name.

 [C_UsingTheMessageClass#6 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs#6)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs.md)
 [C_UsingTheMessageClass#6 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb#6)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb.md)

## Copying a Message into a Buffer

 Sometimes it is necessary to access the message body more than once, for example, to forward the same message to multiple destinations as part of a publisher-subscriber system. In this case, it is necessary to buffer the entire message (including the body) in memory. You can do this by calling [System.ServiceModel.Channels.Message.CreateBufferedCopy%28System.Int32%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.CreateBufferedCopy%2528System.Int32%2529). This method takes an integer parameter that represents the maximum buffer size, and creates a buffer not larger than this size. It is important to set this to a safe value if the message is coming from an untrusted source.

 The buffer is returned as a [System.ServiceModel.Channels.MessageBuffer](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageBuffer) instance. You can access data in the buffer in several ways. The primary way is to call [System.ServiceModel.Channels.Message.CreateMessage*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.CreateMessage*) to create `Message` instances from the buffer.

 Another way to access the data in the buffer is to implement the [System.Xml.XPath.IXPathNavigable](https://learn.microsoft.com/search/?terms=System.Xml.XPath.IXPathNavigable) interface that the [System.ServiceModel.Channels.MessageBuffer](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageBuffer) class implements to access the underlying XML directly. Some [System.ServiceModel.Channels.MessageBuffer.CreateNavigator*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageBuffer.CreateNavigator*) overloads allow you to create [System.Xml.XPath](https://learn.microsoft.com/search/?terms=System.Xml.XPath) navigators protected by a node quota, limiting the number of XML nodes that can be visited. This helps prevent denial of service attacks based on lengthy processing time. This quote is disabled by default. Some `CreateNavigator` overloads allow you to specify how white space should be handled in the XML using the [System.Xml.XmlSpace](https://learn.microsoft.com/search/?terms=System.Xml.XmlSpace) enumeration, with the default being `XmlSpace.None`.

 A final way to access the contents of a message buffer is to write out its contents to a stream using [System.ServiceModel.Channels.Message.WriteMessage*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.WriteMessage*).

 The following example demonstrates the process of working with a `MessageBuffer`: an incoming message is forwarded to multiple recipients, and then logged to a file. Without buffering, this is not possible, because the message body can then be accessed only once.

 [C_UsingTheMessageClass#7 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs#7)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs.md)
 [C_UsingTheMessageClass#7 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb#7)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb.md)

 The `MessageBuffer` class has other members worth noting. The [System.ServiceModel.Channels.MessageBuffer.Close*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageBuffer.Close*) method can be called to free resources when the buffer contents are no longer required. The [System.ServiceModel.Channels.MessageBuffer.BufferSize](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageBuffer.BufferSize) property returns the size of the allocated buffer. The [System.ServiceModel.Channels.MessageBuffer.MessageContentType](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageBuffer.MessageContentType) property returns the MIME content type of the message.

## Accessing the Message Body for Debugging

 For debugging purposes, you can call the [System.ServiceModel.Channels.Message.ToString*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.ToString*) method to get a representation of the message as a string. This representation generally matches the way a message would look on the wire if it were encoded with the text encoder, except that the XML would be better formatted for human readability. The one exception to this is the message body. The body can be read only once, and `ToString` does not change the message state. Therefore, the `ToString` method might not be able to access the body and might substitute a placeholder (for example, "…" or three dots) instead of the message body. Therefore, do not use `ToString` to log messages if the body content of the messages is important.

## Accessing Other Message Parts

 Various properties are provided to access information about the message other than its body contents. However, these cannot be called once the message has been closed:

- The [System.ServiceModel.Channels.Message.Headers](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.Headers) property represents the message headers. See the section on "Working with Headers" later in this topic.

- The [System.ServiceModel.Channels.Message.Properties](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.Properties) property represents the message properties, which are pieces of named data attached to the message that do not generally get emitted when the message is sent. See the section on "Working with Properties" later in this topic.

- The [System.ServiceModel.Channels.Message.Version](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.Version) property indicates the SOAP and WS-Addressing version associated with the message, or `None` if SOAP is disabled.

- The [System.ServiceModel.Channels.Message.IsFault](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.IsFault) property returns `true` if the message is a SOAP fault message.

- The [System.ServiceModel.Channels.Message.IsEmpty](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.IsEmpty) property returns `true` if the message is empty.

 You can use the [System.ServiceModel.Channels.Message.GetBodyAttribute%28System.String%2CSystem.String%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.GetBodyAttribute%2528System.String%252CSystem.String%2529) method to access a particular attribute on the body wrapper element (for example, `<soap:Body>`) identified by a particular name and namespace. If such an attribute is not found, `null` is returned. This method can be called only when the `Message` is in the Created state (when the message body has not yet been accessed).

## Working with Headers

 A `Message` can contain any number of named XML fragments, called *headers*. Each fragment normally maps to a SOAP header. Headers are accessed through the `Headers` property of type [System.ServiceModel.Channels.MessageHeaders](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders). [System.ServiceModel.Channels.MessageHeaders](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders) is a collection of [System.ServiceModel.Channels.MessageHeaderInfo](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaderInfo) objects, and individual headers can be accessed through its [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) interface or through its indexer. For example, the following code lists the names of all the headers in a `Message`.

 [C_UsingTheMessageClass#8 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs#8)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs.md)
 [C_UsingTheMessageClass#8 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb#8)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb.md)

#### Adding, Removing, Finding Headers

 You can add a new header at the end of all existing headers using the [System.ServiceModel.Channels.MessageHeaders.Add*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders.Add*) method. You can use the [System.ServiceModel.Channels.MessageHeaders.Insert*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders.Insert*) method to insert a header at a particular index. Existing headers are shifted for the inserted item. Headers are ordered according to their index, and the first available index is 0. You can use the various [System.ServiceModel.Channels.MessageHeaders.CopyHeadersFrom*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders.CopyHeadersFrom*) method overloads to add headers from a different `Message` or `MessageHeaders` instance. Some overloads copy one individual header, while others copy all of them. The [System.ServiceModel.Channels.MessageHeaders.Clear*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders.Clear*) method removes all headers. The [System.ServiceModel.Channels.MessageHeaders.RemoveAt*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders.RemoveAt*) method removes a header at a particular index (shifting all headers after it). The [System.ServiceModel.Channels.MessageHeaders.RemoveAll*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders.RemoveAll*) method removes all headers with a particular name and namespace.

 Retrieve a particular header using the [System.ServiceModel.Channels.MessageHeaders.FindHeader*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders.FindHeader*) method. This method takes the name and namespace of the header to find, and returns its index. If the header occurs more than once, an exception is thrown. If the header is not found, it returns -1.

 In the SOAP header model, headers can have an `Actor` value that specifies the intended recipient of the header. The most basic `FindHeader` overload searches only headers intended for the ultimate receiver of the message. However, another overload enables you to specify which `Actor` values are included in the search. For more information, see the SOAP specification.

 A [System.ServiceModel.Channels.MessageHeaders.CopyTo%28System.ServiceModel.Channels.MessageHeaderInfo%5B%5D%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders.CopyTo%2528System.ServiceModel.Channels.MessageHeaderInfo%255B%255D%252CSystem.Int32%2529) method is provided to copy headers from a [System.ServiceModel.Channels.MessageHeaders](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders) collection to an array of [System.ServiceModel.Channels.MessageHeaderInfo](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaderInfo) objects.

 To access the XML data in a header, you can call [System.ServiceModel.Channels.MessageHeaders.GetReaderAtHeader*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders.GetReaderAtHeader*) and return an XML reader for the specific header index. If you want to deserialize the header contents into an object, use [System.ServiceModel.Channels.MessageHeaders.GetHeader``1%28System.Int32%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders.GetHeader%60%601%2528System.Int32%2529) or one of the other overloads. The most basic overloads deserialize headers using the [System.Runtime.Serialization.DataContractSerializer](https://learn.microsoft.com/search/?terms=System.Runtime.Serialization.DataContractSerializer) configured in the default way. If you want to use a different serializer or a different configuration of the `DataContractSerializer`, use one of the overloads that take an `XmlObjectSerializer`. There are also overloads that take the header name, namespace, and optionally a list of `Actor` values instead of an index; this is a combination of `FindHeader` and `GetHeader`.

## Working with Properties

 A `Message` instance can contain an arbitrary number of named objects of arbitrary types. This collection is accessed through the `Properties` property of type `MessageProperties`. The collection implements the [System.Collections.Generic.IDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IDictionary%602) interface and acts as a mapping from [System.String](https://learn.microsoft.com/search/?terms=System.String) to [System.Object](https://learn.microsoft.com/search/?terms=System.Object). Normally, property values do not map directly to any part of the message on the wire, but rather provide various message processing hints to the various channels in the WCF channel stack or to the [System.ServiceModel.Channels.MessageHeaders.CopyTo%28System.ServiceModel.Channels.MessageHeaderInfo%5B%5D%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageHeaders.CopyTo%2528System.ServiceModel.Channels.MessageHeaderInfo%255B%255D%252CSystem.Int32%2529) service framework. For an example, see [Data Transfer Architectural Overview](data-transfer-architectural-overview.md).

## Inheriting from the Message Class

 If the built-in message types created using `CreateMessage` do not meet your requirements, create a class that derives from the `Message` class.

### Defining the Message Body Contents

 Three primary techniques exist for accessing data within a message body: writing, reading, and copying it to a buffer. These operations ultimately result in the [System.ServiceModel.Channels.Message.OnWriteBodyContents*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnWriteBodyContents*), [System.ServiceModel.Channels.Message.OnGetReaderAtBodyContents*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnGetReaderAtBodyContents*), and [System.ServiceModel.Channels.Message.OnCreateBufferedCopy*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnCreateBufferedCopy*) methods being called, respectively, on your derived class of `Message`. The base `Message` class guarantees that only one of these methods is called for each `Message` instance, and that it is not called more than once. The base class also ensures that the methods are not called on a closed message. There is no need to track the message state in your implementation.

 [System.ServiceModel.Channels.Message.OnWriteBodyContents*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnWriteBodyContents*) is an abstract method and must be implemented. The most basic way to define the body contents of your message is to write using this method. For example, the following message contains 100,000 random numbers from 1 to 20.

 [C_UsingTheMessageClass#9 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs#9)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs.md)
 [C_UsingTheMessageClass#9 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb#9)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb.md)

 The [System.ServiceModel.Channels.Message.OnGetReaderAtBodyContents](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnGetReaderAtBodyContents) and [System.ServiceModel.Channels.Message.OnCreateBufferedCopy*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnCreateBufferedCopy*) methods have default implementations that work for most cases. The default implementations call [System.ServiceModel.Channels.Message.OnWriteBodyContents*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnWriteBodyContents*), buffer the results, and work with the resulting buffer. However, in some cases this may not be enough. In the preceding example, reading the message results in 100,000 XML elements being buffered, which might not be desirable. You might want to override [System.ServiceModel.Channels.Message.OnGetReaderAtBodyContents](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnGetReaderAtBodyContents) to return a custom [System.Xml.XmlDictionaryReader](https://learn.microsoft.com/search/?terms=System.Xml.XmlDictionaryReader) derived class that serves up random numbers. You can then override [System.ServiceModel.Channels.Message.OnWriteBodyContents*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnWriteBodyContents*) to use the reader that the [System.ServiceModel.Channels.Message.OnGetReaderAtBodyContents](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnGetReaderAtBodyContents) method returns, as shown in the following example.

 [C_UsingTheMessageClass#10 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs#10)](../../../../_code/samples/snippets/csharp/VS_Snippets_CFX/c_usingthemessageclass/cs/source.cs.md)
 [C_UsingTheMessageClass#10 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb#10)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_CFX/c_usingthemessageclass/vb/source.vb.md)

 Similarly, you might want to override `OnCreateBufferedCopy` to return your own `MessageBuffer` derived class.

 In addition to providing message body contents, your message derived class must also override the `Version`, `Headers`, and `Properties` properties.

 Note that if you create a copy of a message, the copy uses the message headers from the original.

### Other Members that Can Be Overridden

 You can override the [System.ServiceModel.Channels.Message.OnWriteStartEnvelope*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnWriteStartEnvelope*), [System.ServiceModel.Channels.Message.OnWriteStartHeaders*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnWriteStartHeaders*), and [System.ServiceModel.Channels.Message.OnWriteStartBody*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnWriteStartBody*) methods to specify how the SOAP envelope, SOAP headers, and SOAP body element start tags are written out. These normally correspond to `<soap:Envelope>`, `<soap:Header>`, and `<soap:Body>`. These methods should normally not write anything out if the [System.ServiceModel.Channels.Message.Version](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.Version) property returns [System.ServiceModel.Channels.MessageVersion.None](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.MessageVersion.None).

> **Note:**
> The default implementation of `OnGetReaderAtBodyContents` calls `OnWriteStartEnvelope` and `OnWriteStartBody` before calling `OnWriteBodyContents` and buffering the results. Headers are not written out.

 Override the [System.ServiceModel.Channels.Message.OnWriteMessage*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnWriteMessage*) method to change the way the entire message is constructed from its various pieces. The `OnWriteMessage` method is called from [System.ServiceModel.Channels.Message.WriteMessage*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.WriteMessage*) and from the default [System.ServiceModel.Channels.Message.OnCreateBufferedCopy*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnCreateBufferedCopy*) implementation. Note that overriding [System.ServiceModel.Channels.Message.WriteMessage*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.WriteMessage*) is not a best practice. It is better to override the appropriate `On` methods (for example, [System.ServiceModel.Channels.Message.OnWriteStartEnvelope*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnWriteStartEnvelope*), [System.ServiceModel.Channels.Message.OnWriteStartHeaders*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnWriteStartHeaders*), and [System.ServiceModel.Channels.BodyWriter.OnWriteBodyContents*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.BodyWriter.OnWriteBodyContents*).

 Override [System.ServiceModel.Channels.Message.OnBodyToString*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnBodyToString*) to override how your message body is represented during debugging. The default is to represent it as three dots ("…"). Note that this method can be called multiple times when the message state is anything other than Closed. An implementation of this method should never cause any action that must be performed only once (such as reading from a forward-only stream).

 Override the [System.ServiceModel.Channels.Message.OnGetBodyAttribute*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnGetBodyAttribute*) method to allow access to attributes on the SOAP body element. This method can be called any number of times, but the `Message` base type guarantees that it is only called when the message is in the Created state. It is not required to check the state in an implementation. The default implementation always returns `null`, which indicates that there are no attributes on the body element.

 If your `Message` object must do any special cleanup when the message body is no longer required, you can override [System.ServiceModel.Channels.Message.OnClose*](https://learn.microsoft.com/search/?terms=System.ServiceModel.Channels.Message.OnClose*). The default implementation does nothing.

 The `IsEmpty` and `IsFault` properties can be overridden. By default, both return `false`.
