# Source code: samples/snippets/csharp/VS_Snippets_CLR/generatingahash/cs/program.cs

Complete source file; linked examples may select a region or line range.

```
//<Snippet1>
using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

string messageString = "This is the original message!";

//Convert the string into an array of bytes.
byte[] messageBytes = Encoding.UTF8.GetBytes(messageString);

//Create the hash value from the array of bytes.
byte[] hashValue = SHA256.HashData(messageBytes);

//Display the hash value to the console.
Console.WriteLine(Convert.ToHexString(hashValue));
//</Snippet1>

```
