---
title: "Ensuring Data Integrity with Hash Codes"
description: Learn how to ensure data integrity using hash codes in .NET. A hash value is a numeric value of a fixed length that uniquely identifies data.
ms.date: 12/28/2022
dev_langs: 
  - "csharp"
  - "vb"
helpviewer_keywords: 
  - "generating hash"
  - "verifying hash codes"
  - "cryptography [.NET], hash"
  - "data integrity"
  - "checking hash codes"
  - "encryption [.NET], hash"
  - "hash"
ms.topic: how-to
---
# Ensuring Data Integrity with Hash Codes

A hash value is a numeric value of a fixed length that uniquely identifies data. Hash values represent large amounts of data as much smaller numeric values, so they are used with digital signatures. You can sign a hash value more efficiently than signing the larger value. Hash values are also useful for verifying the integrity of data sent through insecure channels. The hash value of received data can be compared to the hash value of data as it was sent to determine whether the data was altered.  
  
This topic describes how to generate and verify hash codes by using the classes in the [System.Security.Cryptography](https://learn.microsoft.com/search/?terms=System.Security.Cryptography) namespace.  
  
## Generating a Hash

 The hash classes can hash either an array of bytes or a stream object. The following example uses the SHA-256 hash algorithm to create a hash value for a string. The example uses [System.Text.Encoding.UTF8](https://learn.microsoft.com/search/?terms=System.Text.Encoding.UTF8) to convert the string into an array of bytes that are hashed by using the [System.Security.Cryptography.SHA256](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA256) class. The hash value is then displayed to the console.  

 [GeneratingAHash#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/generatingahash/cs/program.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/generatingahash/cs/program.cs.md)
 [GeneratingAHash#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/generatingahash/vb/program.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/generatingahash/vb/program.vb.md)  
  
 This code will display the following string to the console:  

```console
67A1790DCA55B8803AD024EE28F616A284DF5DD7B8BA5F68B4B252A5E925AF79
```
  
## Verifying a Hash

 Data can be compared to a hash value to determine its integrity. Usually, data is hashed at a certain time and the hash value is protected in some way. At a later time, the data can be hashed again and compared to the protected value. If the hash values match, the data has not been altered. If the values do not match, the data has been corrupted. For this system to work, the protected hash must be encrypted or kept secret from all untrusted parties.  
  
 The following example compares the previous hash value of a string to a new hash value.
  
 [VerifyingAHash#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_CLR/verifyingahash/cs/program.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_CLR/verifyingahash/cs/program.cs.md)
 [VerifyingAHash#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_CLR/verifyingahash/vb/program.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_CLR/verifyingahash/vb/program.vb.md)  
  
## See also

- [Cryptography Model](cryptography-model.md)
- [Cryptographic Services](cryptographic-services.md)
- [Cross-Platform Cryptography](cross-platform-cryptography.md)
- [ASP.NET Core Data Protection](https://learn.microsoft.com/aspnet/core/security/data-protection/introduction)
