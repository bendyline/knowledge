---
description: "Learn more about: How to: Decrypt XML Elements with X.509 Certificates"
title: "How to: Decrypt XML Elements with X.509 Certificates"
ms.date: 07/14/2020
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "System.Security.Cryptography.EncryptedXml class"
  - "XML encryption"
  - "System.Security.Cryptography.X509Certificate2 class"
  - "decryption"
  - "X.509 certificates"
  - "certificates, X.509 certificates"
ms.assetid: bd015722-d88d-408d-8ca8-e4e475c441ed
---
# How to: Decrypt XML Elements with X.509 Certificates

You can use the classes in the [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml) namespace to encrypt and decrypt an element within an XML document.  XML Encryption is a standard way to exchange or store encrypted XML data, without worrying about the data being easily read.  For more information about the XML Encryption standard, see the World Wide Web Consortium (W3C) specification for XML Encryption located at <https://www.w3.org/TR/xmldsig-core/>.

 This example decrypts an XML element that was encrypted using the methods described in: [How to: Encrypt XML Elements with X.509 Certificates](how-to-encrypt-xml-elements-with-x-509-certificates.md).  It finds an <`EncryptedData`> element, decrypts the element, and then replaces the element with the original plaintext XML element.

The code example in this procedure decrypts an XML element using an X.509 certificate from the local certificate store of the current user account.  The example uses the [System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*) method to automatically retrieve the X.509 certificate and decrypt a session key stored in the <`EncryptedKey`> element of the <`EncryptedData`> element.  The [System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*) method then automatically uses the session key to decrypt the XML element.

This example is appropriate for situations where multiple applications need to share encrypted data or where an application needs to save encrypted data between the times that it runs.

### To decrypt an XML element with an X.509 certificate

1. Create an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object by loading an XML file from disk.  The [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object contains the XML element to decrypt.

     [HowToDecryptXMLElementX509#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementX509/cs/sample.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementX509/cs/sample.cs.md)
     [HowToDecryptXMLElementX509#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementX509/vb/sample.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementX509/vb/sample.vb.md)

2. Create a new [System.Security.Cryptography.Xml.EncryptedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml) object by passing the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object to the constructor.

     [HowToDecryptXMLElementX509#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementX509/cs/sample.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementX509/cs/sample.cs.md)
     [HowToDecryptXMLElementX509#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementX509/vb/sample.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementX509/vb/sample.vb.md)

3. Decrypt the XML document using the [System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*) method.

     [HowToDecryptXMLElementX509#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementX509/cs/sample.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementX509/cs/sample.cs.md)
     [HowToDecryptXMLElementX509#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementX509/vb/sample.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementX509/vb/sample.vb.md)

4. Save the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object.

     [HowToDecryptXMLElementX509#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementX509/cs/sample.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementX509/cs/sample.cs.md)
     [HowToDecryptXMLElementX509#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementX509/vb/sample.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementX509/vb/sample.vb.md)

## Example

This example assumes that a file named `"test.xml"` exists in the same directory as the compiled program.  It also assumes that `"test.xml"` contains a `"creditcard"` element.  You can place the following XML into a file called `test.xml` and use it with this example.

```xml
<root>
    <creditcard>
        <number>19834209</number>
        <expiry>02/02/2002</expiry>
    </creditcard>
</root>
```

[HowToDecryptXMLElementX509#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementX509/cs/sample.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToDecryptXMLElementX509/cs/sample.cs.md)
[HowToDecryptXMLElementX509#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementX509/vb/sample.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToDecryptXMLElementX509/vb/sample.vb.md)

## Compiling the Code

- In a project that targets .NET Framework, include a reference to `System.Security.dll`.

- In a project that targets .NET Core or .NET 5, install NuGet package [System.Security.Cryptography.Xml](https://www.nuget.org/packages/System.Security.Cryptography.Xml).

- Include the following namespaces: [System.Xml](https://learn.microsoft.com/search/?terms=System.Xml), [System.Security.Cryptography](https://learn.microsoft.com/search/?terms=System.Security.Cryptography), and [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml).

## .NET Security

The X.509 certificate used in this example is for test purposes only.  Applications should use an X.509 certificate generated by a trusted certificate authority.

## See also

- [Cryptography Model](cryptography-model.md)
- [Cryptographic Services](cryptographic-services.md)
- [Cross-Platform Cryptography](cross-platform-cryptography.md)
- [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml)
- [How to: Encrypt XML Elements with X.509 Certificates](how-to-encrypt-xml-elements-with-x-509-certificates.md)
- [ASP.NET Core Data Protection](https://learn.microsoft.com/aspnet/core/security/data-protection/introduction)
