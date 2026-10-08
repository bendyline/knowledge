### Managed cryptography classes do not throw a CryptographyException in FIPS mode

#### Details

In .NET Framework 4.7.2 and earlier versions, managed cryptographic provider classes such as [System.Security.Cryptography.SHA256Managed](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA256Managed) throw a [System.Security.Cryptography.CryptographicException](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptographicException) when the system cryptographic libraries are configured in FIPS mode. These exceptions are thrown because the managed versions have not undergone FIPS (Federal Information Processing Standards) 140-2 certification, as well as to block cryptographic algorithms that were not considered to be approved based on the FIPS rules.  Because few developers have their development machines in FIPS mode, these exceptions are frequently thrown only on production systems.Applications that target .NET Framework 4.8 and later versions automatically switch to the newer, relaxed policy, so that a [System.Security.Cryptography.CryptographicException](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptographicException) is no longer thrown by default in such cases. Instead, the managed cryptography classes redirect cryptographic operations to a system cryptography library. This policy change effectively removes a potentially confusing difference between developer environments and the production environments and makes native components and managed components operate under the same cryptographic policy.

#### Suggestion

If this behavior is undesirable, you can opt out of it and restore the previous behavior so that a [System.Security.Cryptography.CryptographicException](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptographicException) is thrown in FIPS mode by adding the following [AppContextSwitchOverrides](../../../../docs/framework/configure-apps/file-schema/runtime/appcontextswitchoverrides-element.md) configuration setting to the [\<runtime>](../../../../docs/framework/configure-apps/file-schema/runtime/runtime-element.md) section of your application configuration file:

```xml
<runtime>
  <AppContextSwitchOverrides value="Switch.System.Security.Cryptography.UseLegacyFipsThrow=true" />
</runtime>
```

If your application targets .NET Framework 4.7.2 or earlier, you can also opt in to this change by adding the following [AppContextSwitchOverrides](../../../../docs/framework/configure-apps/file-schema/runtime/appcontextswitchoverrides-element.md) configuration setting to the [\<runtime>](../../../../docs/framework/configure-apps/file-schema/runtime/runtime-element.md) section of your application configuration file:

```xml
<runtime>
  <AppContextSwitchOverrides value="Switch.System.Security.Cryptography.UseLegacyFipsThrow=false" />
</runtime>
```

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.8 |
| Type | Retargeting |

#### Affected APIs

- [System.Security.Cryptography.AesManaged](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.AesManaged)
- [System.Security.Cryptography.MD5Cng](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.MD5Cng)
- [System.Security.Cryptography.MD5CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.MD5CryptoServiceProvider)
- [System.Security.Cryptography.RC2CryptoServiceProvider](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RC2CryptoServiceProvider)
- [System.Security.Cryptography.RijndaelManaged](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RijndaelManaged)
- [System.Security.Cryptography.RIPEMD160Managed](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.RIPEMD160Managed)
- [System.Security.Cryptography.SHA1Managed](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA1Managed)
- [System.Security.Cryptography.SHA256Managed](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.SHA256Managed)
