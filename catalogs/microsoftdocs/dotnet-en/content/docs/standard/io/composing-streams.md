---
title: Transform data by composing streams
description: "Learn how stream composition can transform data. Data passing through the stream is automatically altered."
#ms.topic: concept-article (for a future work item that rewrites this article in this format)
ms.date: 08/02/2024
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "streams, base streams"
  - "I/O [.NET], composing streams"
  - "Stream class, composing streams"
  - "base streams"
  - "streams, backing stores"

#customer intent: As a developer, I want to transform data through a stream so that I can read or write the data in a different way/

---
# Compose streams

A *backing store* is a storage medium, such as a disk or memory. Each type of backing store implements its own stream as an implementation of the [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) class.

Each stream type reads and writes bytes from and to its given backing store. Streams that connect to backing stores are called *base streams*. Base streams have constructors with the parameters necessary to connect the stream to the backing store. For example, [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) has constructors that specify an access mode parameter, which determines if the file is read from, written to, or both.

The design of the [System.IO](https://learn.microsoft.com/search/?terms=System.IO) classes provides simplified stream composition. You can attach base streams to one or more pass-through streams that provide the functionality you want. You can attach a reader or writer to the end of the chain, so the preferred types can be read or written easily.

## Prerequisites

These examples use a plain-text file named _data.txt_. This file should contain some text.

## Example: Encrypt and decrypt stream data

The following example reads data from a file, encrypts it, and then writes the encrypted data to another file. Stream composition is used to transform the data using a basic shifting cipher. Each byte that passes through the stream has its value changed by **80**.

> **Warning:**
> The encryption used in this example is basic and unsecure. It's not meant to actually encrypt data for use, but is provided to demonstrate altering data through stream composition.

### Read the source data for encryption

The following code reads the text from one file, transforms it, then writes it to another file.

> **Tip:**
> Before reviewing this code, know that the `CipherStream` is a user-defined type. The code for this class is provided in the [CipherStream class](#cipherstream-class) section.

[language="csharp" source="./snippets/composing-streams/csharp/Program.cs" id="WriteShiftedFile"::: (complete source file; reference: ./snippets/composing-streams/csharp/Program.cs)](../../../_code/docs/standard/io/snippets/composing-streams/csharp/Program.cs.md)
[language="vb" source="./snippets/composing-streams/vb/Program.vb" id="WriteShiftedFile"::: (complete source file; reference: ./snippets/composing-streams/vb/Program.vb)](../../../_code/docs/standard/io/snippets/composing-streams/vb/Program.vb.md)

Consider the following aspects about the previous code:

- There are two [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) objects:
  - The first `FileStream` (`inputBaseStream` variable) object reads the contents of the _data.txt_ file. This is the **input** data stream.
  - The second `FileStream` (`outputBaseStream` variable) object writes incoming data to the _shifted.txt_ file. This is the **output** data stream.
- The `CipherStream` (`encryptStream` variable) object wraps the `inputBaseStream`, making `inputBaseStream` the base stream for `encryptStream`.

The input stream could be read from directly, writing the data to the output stream, but that wouldn't transform the data. Instead, the `encryptStream` input stream wrapper is used to read the data. As the data is read from `encryptStream`, it pulls from the `inputBaseStream` base stream, transforms it, and returns it. The returned data is written to `outputBaseStream`, which writes the data to the _shifted.txt_ file.

### Read the transformed data for decryption

This code reverses the encryption performed by the previous code:

[language="csharp" source="./snippets/composing-streams/csharp/Program.cs" id="ReadShiftedFile"::: (complete source file; reference: ./snippets/composing-streams/csharp/Program.cs)](../../../_code/docs/standard/io/snippets/composing-streams/csharp/Program.cs.md)
[language="vb" source="./snippets/composing-streams/vb/Program.vb" id="ReadShiftedFile"::: (complete source file; reference: ./snippets/composing-streams/vb/Program.vb)](../../../_code/docs/standard/io/snippets/composing-streams/vb/Program.vb.md)

Consider the following aspects about the previous code:

- There are two [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) objects:
  - The first `FileStream` (`inputBaseStream` variable) object reads the contents of the _shifted.txt_ file. This is the **input** data stream.
  - The second `FileStream` (`outputBaseStream` variable) object writes incoming data to the _unshifted.txt_ file. This is the **output** data stream.
- The `CipherStream` (`unencryptStream` variable) object wraps the `outputBaseStream`, making `outputBaseStream` the base stream for `unencryptStream`.

Here, the code is slightly different from the previous example. Instead of wrapping the input stream, `unencryptStream` wraps the output stream. As the data is read from `inputBaseStream` input stream, it's sent to the `unencryptStream` output stream wrapper. When `unencryptStream` receives data, it transforms it and then writes the data to the `outputBaseStream` base stream. The `outputBaseStream` output stream writes the data to the _unshifted.txt_ file.

### Validate the transformed data

The two previous examples performed two operations on the data. First, the contents of the _data.txt_ file was encrypted and saved to the _shifted.txt_ file. And second, the encrypted contents of the _shifted.txt_ file were decrypted and saved to the _unshifted.txt_ file. Therefore, the _data.txt_ file and _unshifted.txt_ file should be exactly the same. The following code compares those files for equality:

[language="csharp" source="./snippets/composing-streams/csharp/Program.cs" id="ValidateFile"::: (complete source file; reference: ./snippets/composing-streams/csharp/Program.cs)](../../../_code/docs/standard/io/snippets/composing-streams/csharp/Program.cs.md)
[language="vb" source="./snippets/composing-streams/vb/Program.vb" id="ValidateFile"::: (complete source file; reference: ./snippets/composing-streams/vb/Program.vb)](../../../_code/docs/standard/io/snippets/composing-streams/vb/Program.vb.md)

The following code runs this entire encrypt-decrypt process:

[language="csharp" source="./snippets/composing-streams/csharp/Program.cs" id="TestCode"::: (complete source file; reference: ./snippets/composing-streams/csharp/Program.cs)](../../../_code/docs/standard/io/snippets/composing-streams/csharp/Program.cs.md)
[language="vb" source="./snippets/composing-streams/vb/Program.vb" id="TestCode"::: (complete source file; reference: ./snippets/composing-streams/vb/Program.vb)](../../../_code/docs/standard/io/snippets/composing-streams/vb/Program.vb.md)

### CipherStream class

The following snippet provides the `CipherStream` class, which uses a basic shifting cipher to encrypt and decrypt bytes. This class inherits from [System.IO.Stream](https://learn.microsoft.com/search/?terms=System.IO.Stream) and supports either reading or writing data.

> **Warning:**
> The encryption used in this example is basic and unsecure. It's not meant to actually encrypt data for use, but is provided to demonstrate altering data through stream composition.

[language="csharp" source="./snippets/composing-streams/csharp/CipherStream.cs"::: (complete source file; reference: ./snippets/composing-streams/csharp/CipherStream.cs)](../../../_code/docs/standard/io/snippets/composing-streams/csharp/CipherStream.cs.md)
[language="vb" source="./snippets/composing-streams/vb/CipherStream.vb"::: (complete source file; reference: ./snippets/composing-streams/vb/CipherStream.vb)](../../../_code/docs/standard/io/snippets/composing-streams/vb/CipherStream.vb.md)

## See also

- [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader)
- [System.IO.StreamReader.ReadLine*](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.ReadLine*)
- [System.IO.StreamReader.Peek*](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.Peek*)
- [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream)
- [System.IO.BinaryReader](https://learn.microsoft.com/search/?terms=System.IO.BinaryReader)
- [System.IO.BinaryReader.ReadByte*](https://learn.microsoft.com/search/?terms=System.IO.BinaryReader.ReadByte*)
- [System.IO.BinaryReader.PeekChar*](https://learn.microsoft.com/search/?terms=System.IO.BinaryReader.PeekChar*)
