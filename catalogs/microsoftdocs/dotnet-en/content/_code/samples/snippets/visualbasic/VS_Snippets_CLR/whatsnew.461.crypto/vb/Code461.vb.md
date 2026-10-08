# Source code: samples/snippets/visualbasic/VS_Snippets_CLR/whatsnew.461.crypto/vb/Code461.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
Option Strict On

' <Snippet1>
Imports System.Security.Cryptography
Imports System.Security.Cryptography.X509Certificates

Public Class Net461Code
    Public Shared Function SignECDsaSha512(data As Byte(), cert As X509Certificate2) As Byte()
        Using privateKey As ECDsa = cert.GetECDsaPrivateKey()
            Return privateKey.SignData(data, HashAlgorithmName.SHA512)
        End Using
    End Function

    Public Shared Function SignECDsaSha512(data As Byte, privateKey As ECDsa) As Byte()
        Return privateKey.SignData(data, HashAlgorithmName.SHA512)
    End Function
End Class
' </Snippet1>

```
