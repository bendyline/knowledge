---
description: "Learn how to encrypt XML elements with asymmetric keys."
title: "Encrypt XML elements with asymmetric keys"
ms.date: 06/10/2021
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "cryptography [.NET], asymmetric keys"
  - "AES algorithm"
  - "System.Security.Cryptography.RSA class"
  - "asymmetric keys [.NET]"
  - "System.Security.Cryptography.EncryptedXml class"
  - "XML encryption"
  - "key containers"
  - "Advanced Encryption Standard algorithm"
  - "encryption [.NET], asymmetric keys"
ms.assetid: a164ba4f-e596-4bbe-a9ca-f214fe89ed48
---

# Encrypt XML elements with asymmetric keys

You can use the classes in the [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml) namespace to encrypt an element within an XML document.  XML Encryption is a standard way to exchange or store encrypted XML data, without worrying about the data being easily read.  For more information about the XML Encryption standard, see the World Wide Web Consortium (W3C) specification for XML Encryption located at <https://www.w3.org/TR/xmldsig-core/>.

You can use XML Encryption to replace any XML element or document with an `<EncryptedData>` element that contains the encrypted XML data.  The `<EncryptedData>` element can also contain sub elements that include information about the keys and processes used during encryption.  XML Encryption allows a document to contain multiple encrypted elements and allows an element to be encrypted multiple times.  The code example in this procedure shows how to create an `<EncryptedData>` element along with several other sub elements that you can use later during decryption.

This example encrypts an XML element using two keys.  It generates an RSA public/private key pair and saves the key pair to a secure key container.  The example then creates a separate session key using the Advanced Encryption Standard (AES) algorithm.  The example uses the AES session key to encrypt the XML document and then uses the RSA public key to encrypt the AES session key.  Finally, the example saves the encrypted AES session key and the encrypted XML data to the XML document within a new <`EncryptedData`> element.

To decrypt the XML element, you retrieve the RSA private key from the key container, use it to decrypt the session key, and then use the session key to decrypt the document.  For more information about how to decrypt an XML element that was encrypted using this procedure, see [How to: Decrypt XML Elements with Asymmetric Keys](how-to-decrypt-xml-elements-with-asymmetric-keys.md).

This example is appropriate for situations where multiple applications need to share encrypted data or where an application needs to save encrypted data between the times that it runs.

### To encrypt an XML element with an asymmetric key

1. Create a [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) object and specify the name of the key container.

     [HowToEncryptXMLElementAsymmetric#2 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#2)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#2 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#2)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

2. Generate an asymmetric key using the [System.Security.Cryptography.RSACryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider) class.  The key is automatically saved to the key container when you pass the [System.Security.Cryptography.CspParameters](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CspParameters) object to the constructor of the [System.Security.Cryptography.RSACryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RSACryptoServiceProvider) class.  This key will be used to encrypt the AES session key and can be retrieved later to decrypt it.

     [HowToEncryptXMLElementAsymmetric#3 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#3)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#3 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#3)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

3. Create an [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object by loading an XML file from disk.  The [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object contains the XML element to encrypt.

     [HowToEncryptXMLElementAsymmetric#4 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#4)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#4 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#4)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

4. Find the specified element in the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object and create a new [System.Xml.XmlElement](https://learn.microsoft.com/search/?terms=System.Xml.XmlElement) object to represent the element you want to encrypt. In this example, the `"creditcard"` element is encrypted.

     [HowToEncryptXMLElementAsymmetric#5 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#5)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#5 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#5)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

5. Create a new session key using the [System.Security.Cryptography.Aes](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Aes) class.  This key will encrypt the XML element, and then be encrypted itself and placed in the XML document.

     [HowToEncryptXMLElementAsymmetric#6 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#6)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#6 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#6)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

6. Create a new instance of the [System.Security.Cryptography.Xml.EncryptedXml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml) class and use it to encrypt the specified element using the session key.  The [System.Security.Cryptography.Xml.EncryptedXml.EncryptData*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml.EncryptData*) method returns the encrypted element as an array of encrypted bytes.

     [HowToEncryptXMLElementAsymmetric#7 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#7)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#7 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#7)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

7. Construct an [System.Security.Cryptography.Xml.EncryptedData](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedData) object and populate it with the URL identifier of the encrypted XML element.  This URL identifier lets a decrypting party know that the XML contains an encrypted element.  You can use the [System.Security.Cryptography.Xml.EncryptedXml.XmlEncElementUrl](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedXml.XmlEncElementUrl) field to specify the URL identifier.  The plaintext XML element will be replaced by an `<EncryptedData>` element encapsulated by this [System.Security.Cryptography.Xml.EncryptedData](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedData) object.

     [HowToEncryptXMLElementAsymmetric#8 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#8)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#8 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#8)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

8. Create an [System.Security.Cryptography.Xml.EncryptionMethod](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptionMethod) object that is initialized to the URL identifier of the cryptographic algorithm used to generate the session key.  Pass the [System.Security.Cryptography.Xml.EncryptionMethod](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptionMethod) object to the [System.Security.Cryptography.Xml.EncryptedType.EncryptionMethod](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedType.EncryptionMethod) property.

     [HowToEncryptXMLElementAsymmetric#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

9. Create an [System.Security.Cryptography.Xml.EncryptedKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedKey) object to contain the encrypted session key.  Encrypt the session key, add it to the [System.Security.Cryptography.Xml.EncryptedKey](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedKey) object, and enter a session key name and key identifier URL.

     [HowToEncryptXMLElementAsymmetric#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

10. Create a new [System.Security.Cryptography.Xml.DataReference](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.DataReference) object that maps the encrypted data to a particular session key.  This optional step allows you to easily specify that multiple parts of an XML document were encrypted by a single key.

     [HowToEncryptXMLElementAsymmetric#11 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#11)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#11 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#11)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

11. Add the encrypted key to the [System.Security.Cryptography.Xml.EncryptedData](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedData) object.

     [HowToEncryptXMLElementAsymmetric#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

12. Create a new [System.Security.Cryptography.Xml.KeyInfo](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.KeyInfo) object to specify the name of the RSA key.  Add it to the [System.Security.Cryptography.Xml.EncryptedData](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedData) object. This helps the decrypting party identify the correct asymmetric key to use when decrypting the session key.

     [HowToEncryptXMLElementAsymmetric#13 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#13)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#13 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#13)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

13. Add the encrypted element data to the [System.Security.Cryptography.Xml.EncryptedData](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedData) object.

     [HowToEncryptXMLElementAsymmetric#14 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#14)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#14 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

14. Replace the element from the original [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object with the [System.Security.Cryptography.Xml.EncryptedData](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml.EncryptedData) element.

     [HowToEncryptXMLElementAsymmetric#15 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#15)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#15 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#15)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

15. Save the [System.Xml.XmlDocument](https://learn.microsoft.com/search/?terms=System.Xml.XmlDocument) object.

     [HowToEncryptXMLElementAsymmetric#16 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#16)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
     [HowToEncryptXMLElementAsymmetric#16 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#16)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

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

 [HowToEncryptXMLElementAsymmetric#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/cs/sample.cs.md)
 [HowToEncryptXMLElementAsymmetric#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/HowToEncryptXMLElementAsymmetric/vb/sample.vb.md)

## Compiling the code

- In a project that targets .NET Framework, include a reference to `System.Security.dll`.
- In a project that targets .NET Core or .NET 5, install NuGet package [System.Security.Cryptography.Xml](https://www.nuget.org/packages/System.Security.Cryptography.Xml).
- Include the following namespaces: [System.Xml](https://learn.microsoft.com/search/?terms=System.Xml), [System.Security.Cryptography](https://learn.microsoft.com/search/?terms=System.Security.Cryptography), and [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml).

## .NET security

Never store a symmetric cryptographic key in plaintext or transfer a symmetric key between machines in plaintext.  Additionally, never store or transfer the private key of an asymmetric key pair in plaintext.  For more information about symmetric and asymmetric cryptographic keys, see [Generating Keys for Encryption and Decryption](generating-keys-for-encryption-and-decryption.md).

> **Tip:**
> For development, use [Secret Manager](https://learn.microsoft.com/aspnet/core/security/app-secrets) for secure secret storage. In production, consider a product like [Azure Key Vault](https://learn.microsoft.com/aspnet/core/security/key-vault-configuration).

Never embed a key directly into your source code.  Embedded keys can be easily read from an assembly using the [Ildasm.exe (IL Disassembler)](../../framework/tools/ildasm-exe-il-disassembler.md) or by opening the assembly in a text editor such as Notepad.

When you are done using a cryptographic key, clear it from memory by setting each byte to zero or by calling the [System.Security.Cryptography.SymmetricAlgorithm.Clear*](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SymmetricAlgorithm.Clear*) method of the managed cryptography class.  Cryptographic keys can sometimes be read from memory by a debugger or read from a hard drive if the memory location is paged to disk.

## See also

- [Cryptography Model](cryptography-model.md)
- [Cryptographic Services](cryptographic-services.md)
- [Cross-Platform Cryptography](cross-platform-cryptography.md)- [System.Security.Cryptography.Xml](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Xml)
- [How to: Decrypt XML Elements with Asymmetric Keys](how-to-decrypt-xml-elements-with-asymmetric-keys.md)
- [ASP.NET Core Data Protection](https://learn.microsoft.com/aspnet/core/security/data-protection/introduction)
