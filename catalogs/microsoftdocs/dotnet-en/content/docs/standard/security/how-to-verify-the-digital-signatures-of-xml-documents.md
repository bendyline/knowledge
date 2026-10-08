---
description: "Learn more about: How to: Verify the Digital Signatures of XML Documents"
title: "How to: Verify the Digital Signatures of XML Documents"
ms.date: 07/14/2020
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "System.Security.Cryptography.SignedXml class"
  - "signatures, cryptographic"
  - "System.Security.Cryptography.RSA class"
  - "verifying signatures"
  - "checking signatures"
  - "XML digital signatures"
  - "digital signatures, verifying"
ms.assetid: a4d5ceb1-b9f5-47e8-9e4a-a2b39110002f
---
# How to: Verify the Digital Signatures of XML Documents

You can use the classes in the [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml) namespace to verify XML data signed with a digital signature. XML digital signatures (XMLDSIG) allow you to verify that data was not altered after it was signed. For more information about the XMLDSIG standard, see the World Wide Web Consortium (W3C) specification at <https://www.w3.org/TR/xmldsig-core/>.

> **Note:**
> The code in this article applies to Windows.

> **Important:**
> Always verify XML signatures by using an overload of [System.Security.Cryptography.Xml.SignedXml.CheckSignature*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml.CheckSignature*) that takes the verification key or certificate as an argument, and obtain that key or certificate from a source that is independent of the signed document (for example, a key container as shown in this example, application configuration, or a certificate pinned to the application). Do not use the parameterless `CheckSignature()` overload to authenticate documents from an untrusted source: it selects a key from the document's own `<KeyInfo>` element, which is under the control of whoever produced the document, so a successful result does not prove that the signer is trusted. For the full rationale, see the [Remarks](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml%23remarks) on [System.Security.Cryptography.Xml.SignedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml).

> **Important:**
> A [System.Security.Cryptography.Xml.SignedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml) instance is intended for a single verification. Do not call [System.Security.Cryptography.Xml.SignedXml.CheckSignature*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml.CheckSignature*) more than once on the same instance, and do not reuse an instance that was used for signing. Reusing an instance might produce incorrect results. Create a new [System.Security.Cryptography.Xml.SignedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml) for each verification.

The code example in this procedure demonstrates how to verify an XML digital signature contained in a <`Signature`> element.  The example retrieves an RSA public key from a key container and then uses the key to verify the signature.

For information about how to create a digital signature that can be verified using this technique, see [How to: Sign XML Documents with Digital Signatures](how-to-sign-xml-documents-with-digital-signatures.md).

### To verify the digital signature of an XML document

1. To verify the document, you must use the same asymmetric key that was used for signing.  Create a [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) object and specify the name of the key container that was used for signing.

     [HowToVerifyXMLDocumentRSA#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs.md)
     [HowToVerifyXMLDocumentRSA#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb.md)

2. Retrieve the public key using the [System.Security.Cryptography.RSACryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider) class.  The key is automatically loaded from the key container by name when you pass the [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) object to the constructor of the [System.Security.Cryptography.RSACryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider) class.

     [HowToVerifyXMLDocumentRSA#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs.md)
     [HowToVerifyXMLDocumentRSA#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb.md)

3. Create an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object by loading an XML file from disk.  The [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object contains the signed XML document to verify.

     [HowToVerifyXMLDocumentRSA#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs.md)
     [HowToVerifyXMLDocumentRSA#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb.md)

4. Create a new [System.Security.Cryptography.Xml.SignedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml) object and pass the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object to it.

     [HowToVerifyXMLDocumentRSA#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs.md)
     [HowToVerifyXMLDocumentRSA#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb.md)

5. Find the <`signature`> element and create a new [System.Xml.XmlNodeList](https://learn.microsoft.com/search/?terms=System.Xml.XmlNodeList) object.

     [HowToVerifyXMLDocumentRSA#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs.md)
     [HowToVerifyXMLDocumentRSA#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb.md)

6. Load the XML of the first <`signature`> element into the [System.Security.Cryptography.Xml.SignedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml) object.

     [HowToVerifyXMLDocumentRSA#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs.md)
     [HowToVerifyXMLDocumentRSA#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb.md)

7. Check the signature using the [System.Security.Cryptography.Xml.SignedXml.CheckSignature*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml.CheckSignature*) method and the RSA public key.  This method returns a Boolean value that indicates success or failure.

     [HowToVerifyXMLDocumentRSA#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs.md)
     [HowToVerifyXMLDocumentRSA#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb.md)

## Example

This example assumes that a file named `"test.xml"` exists in the same directory as the compiled program.  The `"test.xml"` file must be signed using the techniques described in [How to: Sign XML Documents with Digital Signatures](how-to-sign-xml-documents-with-digital-signatures.md).

[HowToVerifyXMLDocumentRSA#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/cs/sample.cs.md)
[HowToVerifyXMLDocumentRSA#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToVerifyXMLDocumentRSA/vb/sample.vb.md)

## Compiling the Code

- In a project that targets .NET Framework, include a reference to `System.Security.dll`.

- In a project that targets .NET Core or .NET 5, install NuGet package [System.Security.Cryptography.Xml](https://www.nuget.org/packages/System.Security.Cryptography.Xml).

- Include the following namespaces: [System.Xml](https://learn.microsoft.com/search/?terms=System.Xml), [System.Security.Cryptography](https://learn.microsoft.com/search/?terms=System.Security.Cryptography), and [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml).

## .NET Security

Never store or transfer the private key of an asymmetric key pair in plaintext.  For more information about symmetric and asymmetric cryptographic keys, see [Generating Keys for Encryption and Decryption](generating-keys-for-encryption-and-decryption.md).

Never embed a private key directly into your source code.  Embedded keys can be easily read from an assembly using the [Ildasm.exe (IL Disassembler)](../../framework/tools/ildasm-exe-il-disassembler.md) or by opening the assembly in a text editor such as Notepad.

## See also

- [Cryptography Model](cryptography-model.md)
- [Cryptographic Services](cryptographic-services.md)
- [Cross-Platform Cryptography](cross-platform-cryptography.md)
- [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml)
- [How to: Sign XML Documents with Digital Signatures](how-to-sign-xml-documents-with-digital-signatures.md)
- [ASP.NET Core Data Protection](https://learn.microsoft.com/aspnet/core/security/data-protection/introduction)
