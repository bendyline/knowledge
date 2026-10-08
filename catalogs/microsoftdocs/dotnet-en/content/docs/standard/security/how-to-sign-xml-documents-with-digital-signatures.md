---
title: "How to: Sign XML Documents with Digital Signatures"
description: Learn how to sign XML documents with digital signatures. Use classes in the System.Security.Cryptography.Xml namespace in .NET.
ms.date: 07/14/2020
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "signatures, XML signing"
  - "System.Security.Cryptography.SignedXml class"
  - "digital signatures, XML signing"
  - "System.Security.Cryptography.RSA class"
  - "XML digital signatures"
  - "XML signing"
  - "signing XML"
ms.assetid: 99692ac1-d8c9-42d7-b1bf-2737b01037e4
---
# How to: Sign XML Documents with Digital Signatures

You can use the classes in the [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml) namespace to sign an XML document or part of an XML document with a digital signature.  XML digital signatures (XMLDSIG) allow you to verify that data was not altered after it was signed.  For more information about the XMLDSIG standard, see the World Wide Web Consortium (W3C) recommendation [XML Signature Syntax and Processing](https://www.w3.org/TR/xmldsig-core/).

> **Note:**
> The code in this article applies to Windows.

> **Important:**
> A [System.Security.Cryptography.Xml.SignedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml) instance is intended for a single signing operation. Do not reuse the same instance to compute more than one signature, and do not call [System.Security.Cryptography.Xml.SignedXml.ComputeSignature*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml.ComputeSignature*) and then [System.Security.Cryptography.Xml.SignedXml.CheckSignature*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml.CheckSignature*) on the same instance. Reusing an instance might produce incorrect results. If you need to sign multiple documents (or sign and then verify), create a new [System.Security.Cryptography.Xml.SignedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml) for each operation.

The code example in this procedure demonstrates how to digitally sign an entire XML document and attach the signature to the document in a <`Signature`> element.  The example creates an RSA signing key, adds the key to a secure key container, and then uses the key to digitally sign an XML document.  The key can then be retrieved to verify the XML digital signature, or can be used to sign another XML document.

For information about how to verify an XML digital signature that was created using this procedure, see [How to: Verify the Digital Signatures of XML Documents](how-to-verify-the-digital-signatures-of-xml-documents.md).

### To digitally sign an XML document

1. Create a [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) object and specify the name of the key container.

     [HowToSignXMLDocumentRSA#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs.md)
     [HowToSignXMLDocumentRSA#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb.md)

2. Generate an asymmetric key using the [System.Security.Cryptography.RSACryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider) class.  The key is automatically saved to the key container when you pass the [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) object to the constructor of the [System.Security.Cryptography.RSACryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider) class.  This key will be used to sign the XML document.

     [HowToSignXMLDocumentRSA#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs.md)
     [HowToSignXMLDocumentRSA#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb.md)

3. Create an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object by loading an XML file from disk.  The [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object contains the XML element to encrypt.

     [HowToSignXMLDocumentRSA#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs.md)
     [HowToSignXMLDocumentRSA#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb.md)

4. Create a new [System.Security.Cryptography.Xml.SignedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml) object and pass the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object to it.

     [HowToSignXMLDocumentRSA#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs.md)
     [HowToSignXMLDocumentRSA#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb.md)

5. Add the signing RSA key to the [System.Security.Cryptography.Xml.SignedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml) object.

     [HowToSignXMLDocumentRSA#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs.md)
     [HowToSignXMLDocumentRSA#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb.md)

6. Create a [System.Security.Cryptography.Xml.Reference](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.Reference) object that describes what to sign.  To sign the entire document, set the [System.Security.Cryptography.Xml.Reference.Uri](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.Reference.Uri) property to `""`.

     [HowToSignXMLDocumentRSA#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs.md)
     [HowToSignXMLDocumentRSA#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb.md)

7. Add an [System.Security.Cryptography.Xml.XmlDsigEnvelopedSignatureTransform](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.XmlDsigEnvelopedSignatureTransform) object to the [System.Security.Cryptography.Xml.Reference](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.Reference) object.  A transformation allows the verifier to represent the XML data in the identical manner that the signer used.  XML data can be represented in different ways, so this step is vital to verification.

     [HowToSignXMLDocumentRSA#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs.md)
     [HowToSignXMLDocumentRSA#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb.md)

8. Add the [System.Security.Cryptography.Xml.Reference](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.Reference) object to the [System.Security.Cryptography.Xml.SignedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml) object.

     [HowToSignXMLDocumentRSA#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs.md)
     [HowToSignXMLDocumentRSA#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb.md)

9. Compute the signature by calling the [System.Security.Cryptography.Xml.SignedXml.ComputeSignature*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.SignedXml.ComputeSignature*) method.

     [HowToSignXMLDocumentRSA#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs.md)
     [HowToSignXMLDocumentRSA#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb.md)

10. Retrieve the XML representation of the signature (a <`Signature`> element) and save it to a new [System.Xml.XmlElement](https://learn.microsoft.com/search/?terms=System.Xml.XmlElement) object.

     [HowToSignXMLDocumentRSA#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs.md)
     [HowToSignXMLDocumentRSA#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb.md)

11. Append the element to the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object.

     [HowToSignXMLDocumentRSA#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs.md)
     [HowToSignXMLDocumentRSA#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb.md)

12. Save the document.

     [HowToSignXMLDocumentRSA#13 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs#13)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs.md)
     [HowToSignXMLDocumentRSA#13 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb.md)

## Example

 This example assumes that a file named `test.xml` exists in the same directory as the compiled program.  You can place the following XML into a file called `test.xml` and use it with this example.

```xml
<root>
    <creditcard>
        <number>19834209</number>
        <expiry>02/02/2002</expiry>
    </creditcard>
</root>
```

 [HowToSignXMLDocumentRSA#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToSignXMLDocumentRSA/cs/sample.cs.md)
 [HowToSignXMLDocumentRSA#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToSignXMLDocumentRSA/vb/sample.vb.md)

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
- [How to: Verify the Digital Signatures of XML Documents](how-to-verify-the-digital-signatures-of-xml-documents.md)
- [ASP.NET Core Data Protection](https://learn.microsoft.com/aspnet/core/security/data-protection/introduction)
