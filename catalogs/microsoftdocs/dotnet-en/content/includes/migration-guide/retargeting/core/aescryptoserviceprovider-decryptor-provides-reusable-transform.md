### AesCryptoServiceProvider decryptor provides a reusable transform

#### Details

Starting with apps that target the .NET Framework 4.6.2, the [System.Security.Cryptography.AesCryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesCryptoServiceProvider) decryptor provides a reusable transform. After a call to [System.Security.Cryptography.CryptoAPITransform.TransformFinalBlock(System.Byte\[\],System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptoAPITransform.TransformFinalBlock(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32)), the transform is reinitialized and can be reused. For apps that target earlier versions of the .NET Framework, attempting to reuse the decryptor by calling [System.Security.Cryptography.CryptoAPITransform.TransformBlock(System.Byte\[\],System.Int32,System.Int32,System.Byte\[\],System.Int32)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptoAPITransform.TransformBlock(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32%2CSystem.Byte%5B%5D%2CSystem.Int32)) after a call to [System.Security.Cryptography.CryptoAPITransform.TransformFinalBlock(System.Byte\[\],System.Int32,System.Int32)](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptoAPITransform.TransformFinalBlock(System.Byte%5B%5D%2CSystem.Int32%2CSystem.Int32)) throws a [System.Security.Cryptography.CryptographicException](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptographicException) or produces corrupted data.

#### Suggestion

The impact of this change should be minimal, since this is the expected behavior.Applications that depend on the previous behavior can opt out of it using it by adding the following configuration setting to the `<runtime>` section of the application's configuration file:

```xml
<runtime>
<AppContextSwitchOverrides value="Switch.System.Security.Cryptography.AesCryptoServiceProvider.DontCorrectlyResetDecryptor=true"/>
</runtime>
```

In addition, applications that target a previous version of the .NET Framework but are running under a version of the .NET Framework starting with .NET Framework 4.6.2 can opt in to it by adding the following configuration setting to the `<runtime>` section of the application's configuration file:

```xml
<runtime>
<AppContextSwitchOverrides value="Switch.System.Security.Cryptography.AesCryptoServiceProvider.DontCorrectlyResetDecryptor=false"/>
</runtime>
```

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6.2 |
| Type | Retargeting |

#### Affected APIs

- [System.Security.Cryptography.AesCryptoServiceProvider.CreateDecryptor](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesCryptoServiceProvider.CreateDecryptor)
