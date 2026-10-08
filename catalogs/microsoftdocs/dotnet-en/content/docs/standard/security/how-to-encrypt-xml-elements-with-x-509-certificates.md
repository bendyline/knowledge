---
description: "Learn more about: How to: Encrypt XML Elements with X.509 Certificates"
title: "How to: Encrypt XML Elements with X.509 Certificates"
ms.date: 07/14/2020
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "encryption [.NET], X.509 certificates"
  - "cryptography [.NET], X.509 certificates"
  - "System.Security.Cryptography.EncryptedXml class"
  - "XML encryption"
  - "System.Security.Cryptography.X509Certificate2 class"
  - "X.509 certificates"
  - "certificates, X.509 certificates"
ms.assetid: 761f1c66-631c-47af-aa86-ad9c50cfa453
---
# How to: Encrypt XML Elements with X.509 Certificates

You can use the classes in the [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml) namespace to encrypt an element within an XML document.  XML Encryption is a standard way to exchange or store encrypted XML data, without worrying about the data being easily read.  For more information about the XML Encryption standard, see the World Wide Web Consortium (W3C) specification for XML Encryption located at <https://www.w3.org/TR/xmldsig-core/>.

 You can use XML Encryption to replace any XML element or document with an <`EncryptedData`> element that contains the encrypted XML data. The <`EncryptedData`> element can contain sub elements that include information about the keys and processes used during encryption.  XML Encryption allows a document to contain multiple encrypted elements and allows an element to be encrypted multiple times.  The code example in this procedure shows you how to create an <`EncryptedData`> element along with several other sub elements that you can use later during decryption.

This example encrypts an XML element using two keys. The example programmatically retrieves a certificate and uses it to encrypt an XML element using the [System.Security.Cryptography.Xml.EncryptedXml.Encrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml.Encrypt*) method. Internally, the [System.Security.Cryptography.Xml.EncryptedXml.Encrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml.Encrypt*) method creates a separate session key and uses it to encrypt the XML document. This method encrypts the session key and saves it along with the encrypted XML within a new <`EncryptedData`> element.

To decrypt the XML element, call the [System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*) method, which automatically retrieves the X.509 certificate from the store and performs the necessary decryption.  For more information about how to decrypt an XML element that was encrypted using this procedure, see [How to: Decrypt XML Elements with X.509 Certificates](how-to-decrypt-xml-elements-with-x-509-certificates.md).

This example is appropriate for situations where multiple applications need to share encrypted data or where an application needs to save encrypted data between the times that it runs.

### To encrypt an XML element with an X.509 certificate

To run this example, you need to create a test certificate and save it in a certificate store. Instructions for that task are provided only for the Windows [Certificate Creation Tool (Makecert.exe)](https://learn.microsoft.com/windows/desktop/SecCrypto/makecert).

1. Use [Makecert.exe](https://learn.microsoft.com/windows/desktop/SecCrypto/makecert) to generate a test X.509 certificate and place it in the local user store. You must generate an exchange key and you must make the key exportable. Run the following command:

    ```console
    makecert -r -pe -n "CN=XML_ENC_TEST_CERT" -b 01/01/2020 -e 01/01/2025 -sky exchange -ss my
    ```

2. Create an [System.Security.Cryptography.X509Certificates.X509Store](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Store) object and initialize it to open the current user store.

     [HowToEncryptXMLElementX509#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs.md)
     [HowToEncryptXMLElementX509#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb.md)

3. Open the store in read-only mode.

     [HowToEncryptXMLElementX509#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs.md)
     [HowToEncryptXMLElementX509#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb.md)

4. Initialize an [System.Security.Cryptography.X509Certificates.X509Certificate2Collection](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.X509Certificates.X509Certificate2Collection) with all of the certificates in the store.

     [HowToEncryptXMLElementX509#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs.md)
     [HowToEncryptXMLElementX509#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb.md)

5. Enumerate through the certificates in the store and find the certificate with the appropriate name.  In this example, the certificate is named `"CN=XML_ENC_TEST_CERT"`.

     [HowToEncryptXMLElementX509#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs.md)
     [HowToEncryptXMLElementX509#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb.md)

6. Close the store after the certificate is located.

     [HowToEncryptXMLElementX509#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs.md)
     [HowToEncryptXMLElementX509#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb.md)

7. Create an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object by loading an XML file from disk.  The [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object contains the XML element to encrypt.

     [HowToEncryptXMLElementX509#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs.md)
     [HowToEncryptXMLElementX509#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb.md)

8. Find the specified element in the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object and create a new [System.Xml.XmlElement](https://learn.microsoft.com/search/?terms=System.Xml.XmlElement) object to represent the element you want to encrypt.  In this example, the `"creditcard"` element is encrypted.

     [HowToEncryptXMLElementX509#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs.md)
     [HowToEncryptXMLElementX509#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb.md)

9. Create a new instance of the [System.Security.Cryptography.Xml.EncryptedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml) class and use it to encrypt the specified element using the X.509 certificate.  The [System.Security.Cryptography.Xml.EncryptedXml.Encrypt*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml.Encrypt*) method returns the encrypted element as an [System.Security.Cryptography.Xml.EncryptedData](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedData) object.

     [HowToEncryptXMLElementX509#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs.md)
     [HowToEncryptXMLElementX509#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb.md)

10. Replace the element from the original [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object with the [System.Security.Cryptography.Xml.EncryptedData](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedData) element.

     [HowToEncryptXMLElementX509#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs.md)
     [HowToEncryptXMLElementX509#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb.md)

11. Save the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object.

     [HowToEncryptXMLElementX509#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs.md)
     [HowToEncryptXMLElementX509#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb.md)

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

 [HowToEncryptXMLElementX509#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementX509/cs/sample.cs.md)
 [HowToEncryptXMLElementX509#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementX509/vb/sample.vb.md)

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
- [How to: Decrypt XML Elements with X.509 Certificates](how-to-decrypt-xml-elements-with-x-509-certificates.md)
- [ASP.NET Core Data Protection](https://learn.microsoft.com/aspnet/core/security/data-protection/introduction)
