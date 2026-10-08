---
description: "Learn more about: How to: Decrypt XML Elements with Asymmetric Keys"
title: "How to: Decrypt XML Elements with Asymmetric Keys"
ms.date: 07/14/2020
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "System.Security.Cryptography.RSA class"
  - "asymmetric keys"
  - "System.Security.Cryptography.EncryptedXml class"
  - "XML encryption"
  - "decryption"
ms.assetid: dd5de491-dafe-4b94-966d-99714b2e754a
---
# How to: Decrypt XML Elements with Asymmetric Keys

You can use the classes in the [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml) namespace to encrypt and decrypt an element within an XML document.  XML Encryption is a standard way to exchange or store encrypted XML data, without worrying about the data being easily read.  For more information about the XML Encryption standard, see the World Wide Web Consortium (W3C) recommendation [XML Signature Syntax and Processing](https://www.w3.org/TR/xmldsig-core/).

> **Note:**
> The code in this article applies to Windows.

The example in this procedure decrypts an XML element that was encrypted using the methods described in [How to: Encrypt XML Elements with Asymmetric Keys](how-to-encrypt-xml-elements-with-asymmetric-keys.md).  It finds an <`EncryptedData`> element, decrypts the element, and then replaces the element with the original plaintext XML element.

This example decrypts an XML element using two keys.  It retrieves a previously generated RSA private key from a key container, and then uses the RSA key to decrypt a session key stored in the <`EncryptedKey`> element of the <`EncryptedData`> element.  The example then uses the session key to decrypt the XML element.

This example is appropriate for situations where multiple applications have to share encrypted data or where an application has to save encrypted data between the times that it runs.

### To decrypt an XML element with an asymmetric key

1. Create a [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) object and specify the name of the key container.

     [HowToDecryptXMLElementAsymmetric#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToDecryptXMLElementAsymmetric#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb.md)

2. Retrieve a previously generated asymmetric key from the container using the [System.Security.Cryptography.RSACryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider) object.  The key is automatically retrieved from the key container when you pass the [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) object to the [System.Security.Cryptography.RSACryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider) constructor.

     [HowToDecryptXMLElementAsymmetric#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToDecryptXMLElementAsymmetric#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb.md)

3. Create a new [System.Security.Cryptography.Xml.EncryptedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml) object to decrypt the document.

     [HowToDecryptXMLElementAsymmetric#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToDecryptXMLElementAsymmetric#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb.md)

4. Add a key/name mapping to associate the RSA key with the element within the document that should be decrypted.  You must use the same name for the key that you used when you encrypted the document.  Note that this name is separate from the name used to identify the key in the key container specified in step 1.

     [HowToDecryptXMLElementAsymmetric#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToDecryptXMLElementAsymmetric#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb.md)

5. Call the [System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*) method to decrypt the <`EncryptedData`> element.  This method uses the RSA key to decrypt the session key and automatically uses the session key to decrypt the XML element.  It also automatically replaces the <`EncryptedData`> element with the original plaintext.

     [HowToDecryptXMLElementAsymmetric#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToDecryptXMLElementAsymmetric#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb.md)

6. Save the XML document.

     [HowToDecryptXMLElementAsymmetric#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToDecryptXMLElementAsymmetric#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb.md)

## Example

This example assumes that a file named `test.xml` exists in the same directory as the compiled program.  It also assumes that `test.xml` contains an XML element that was encrypted using the techniques described in [How to: Encrypt XML Elements with Asymmetric Keys](how-to-encrypt-xml-elements-with-asymmetric-keys.md).

[HowToDecryptXMLElementAsymmetric#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/cs/sample.cs.md)
[HowToDecryptXMLElementAsymmetric#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementAsymmetric/vb/sample.vb.md)

## Compiling the Code

- In a project that targets .NET Framework, include a reference to `System.Security.dll`.

- In a project that targets .NET Core or .NET 5, install NuGet package [System.Security.Cryptography.Xml](https://www.nuget.org/packages/System.Security.Cryptography.Xml).

- Include the following namespaces: [System.Xml](https://learn.microsoft.com/search/?terms=System.Xml), [System.Security.Cryptography](https://learn.microsoft.com/search/?terms=System.Security.Cryptography), and [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml).

## .NET Security

Never store a symmetric cryptographic key in plaintext or transfer a symmetric key between machines in plaintext.  Additionally, never store or transfer the private key of an asymmetric key pair in plaintext.  For more information about symmetric and asymmetric cryptographic keys, see [Generating Keys for Encryption and Decryption](generating-keys-for-encryption-and-decryption.md).

 Never embed a key directly into your source code.  Embedded keys can be easily read from an assembly by using [Ildasm.exe (IL Disassembler)](../../framework/tools/ildasm-exe-il-disassembler.md) or by opening the assembly in a text editor such as Notepad.

 When you are done using a cryptographic key, clear it from memory by setting each byte to zero or by calling the [System.Security.Cryptography.SymmetricAlgorithm.Clear*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SymmetricAlgorithm.Clear*) method of the managed cryptography class.  Cryptographic keys can sometimes be read from memory by a debugger or read from a hard drive if the memory location is paged to disk.

## See also

- [Cryptography Model](cryptography-model.md)
- [Cryptographic Services](cryptographic-services.md)
- [Cross-Platform Cryptography](cross-platform-cryptography.md)
- [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml)
- [How to: Encrypt XML Elements with Asymmetric Keys](how-to-encrypt-xml-elements-with-asymmetric-keys.md)
- [ASP.NET Core Data Protection](https://learn.microsoft.com/aspnet/core/security/data-protection/introduction)
