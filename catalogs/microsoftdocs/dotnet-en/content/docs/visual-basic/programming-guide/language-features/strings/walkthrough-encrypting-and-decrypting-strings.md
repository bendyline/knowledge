---
description: "Learn more about: Walkthrough: Encrypting and Decrypting Strings in Visual Basic"
title: "Encrypting and Decrypting Strings"
ms.date: 09/22/2026
ai-usage: ai-assisted
helpviewer_keywords: 
  - "encryption [Visual Basic], strings"
  - "strings [Visual Basic], encrypting"
  - "decryption [Visual Basic], strings"
  - "strings [Visual Basic], decrypting"
ms.assetid: 1f51e40a-2f88-43e2-a83e-28a0b5c0d6fd
---
# Walkthrough: Encrypting and Decrypting Strings in Visual Basic

This walkthrough shows you how to use the [System.Security.Cryptography.TripleDES](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.TripleDES) class to encrypt and decrypt strings using the Triple Data Encryption Standard (3DES) algorithm. The first step is to create a simple wrapper class that encapsulates the 3DES algorithm and stores the encrypted data as a base-64 encoded string. Then, that wrapper is used to securely store private user data in a publicly accessible text file.  
  
 You can use encryption to protect user secrets (for example, passwords) and to make credentials unreadable by unauthorized users. This can protect an authorized user's identity from being stolen, which protects the user's assets and provides non-repudiation. Encryption can also protect a user's data from being accessed by unauthorized users.  
  
 For more information, see [Cryptographic Services](../../../../standard/security/cryptographic-services.md).  
  
> **Important:**
> The Rijndael (now referred to as Advanced Encryption Standard [AES]) and Triple Data Encryption Standard (3DES) algorithms provide greater security than DES because they are more computationally intensive. For more information, see [System.Security.Cryptography.DES](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DES) and [System.Security.Cryptography.Rijndael](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rijndael).  
  
### To create the encryption wrapper  

1. Create the `Simple3Des` class to encapsulate the encryption and decryption methods.  

     [VbVbalrStrings#38 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb#38)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb.md)  

2. Add an import of the cryptography namespace to the start of the file that contains the `Simple3Des` class.  

     [VbVbalrStrings#77 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb#77)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb.md)  

3. In the `Simple3Des` class, add private fields to store the 3DES cryptographic service provider, the specified key, and the format version, salt size, and iteration count.  

     [VbVbalrStrings#39 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb#39)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb.md)  

4. Add a private method that creates a byte array from the specified key and a salt.  

     [VbVbalrStrings#41 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb#41)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb.md)  

5. Add a constructor that stores the specified key.  

     The `key` parameter controls the `EncryptData` and `DecryptData` methods.  

     [VbVbalrStrings#40 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb#40)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb.md)
  
6. Add a public method that encrypts a string.  
  
     [VbVbalrStrings#42 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb#42)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb.md)  
  
7. Add a public method that decrypts a string.  
  
     [VbVbalrStrings#43 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb#43)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb.md)  
  
     The wrapper class can now be used to protect user assets. In this example, it is used to securely store private user data in a publicly accessible text file.  
  
### To test the encryption wrapper  
  
1. In a separate class, add a method that uses the wrapper's `EncryptData` method to encrypt a string and write it to the user's My Documents folder.  
  
     [VbVbalrStrings#78 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb#78)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb.md)  
  
2. Add a method that reads the encrypted string from the user's My Documents folder and decrypts the string with the wrapper's `DecryptData` method.  
  
     [VbVbalrStrings#79 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb#79)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/VbVbalrStrings/VB/Class3.vb.md)  
  
3. Add user interface code to call the `TestEncoding` and `TestDecoding` methods.  
  
4. Run the application.  
  
     When you test the application, notice that it will not decrypt the data if you provide the wrong password.  
  
## See also

- [System.Security.Cryptography](https://learn.microsoft.com/search/?terms=System.Security.Cryptography)
- [System.Security.Cryptography.DESCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DESCryptoServiceProvider)
- [System.Security.Cryptography.DES](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.DES)
- [System.Security.Cryptography.TripleDES](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.TripleDES)
- [System.Security.Cryptography.Rijndael](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.Rijndael)
- [Cryptographic Services](../../../../standard/security/cryptographic-services.md)
