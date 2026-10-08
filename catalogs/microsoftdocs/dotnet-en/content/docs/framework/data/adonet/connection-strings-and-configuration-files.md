---
title: "Connection Strings and Configuration Files"
description: Learn how to store connection strings for ADO.NET applications in an application configuration file.
ms.date: "03/30/2017"
ai-usage: ai-assisted
dev_langs:
  - "csharp"
  - "vb"
ms.custom: sfi-ropc-nochange
---
# Connection strings and configuration files

Embedding connection strings in your application's code can lead to security vulnerabilities and maintenance problems. Unencrypted connection strings compiled into an application's source code can be viewed using the [Ildasm.exe (IL Disassembler)](../../tools/ildasm-exe-il-disassembler.md) tool. Moreover, if the connection string ever changes, your application must be recompiled. For these reasons, we recommend storing connection strings in an application configuration file.

> **Important:**
> Microsoft recommends that you use the most secure authentication flow available. If you're connecting to Azure SQL, [Managed Identities for Azure resources](https://learn.microsoft.com/sql/connect/ado-net/sql/azure-active-directory-authentication#using-managed-identity-authentication) is the recommended authentication method.


## Application Configuration Files

 Application configuration files contain settings that are specific to a particular application. For example, an ASP.NET application can have one or more **web.config** files, and a Windows application can have an optional **app.config** file. Configuration files share common elements, although the name and location of a configuration file vary depending on the application's host.

### The `connectionStrings` Section

 Connection strings can be stored as key/value pairs in the `connectionStrings` section of the `configuration` element of an application configuration file. Child elements include **add**, **clear**, and **remove**.

 The following configuration file fragment demonstrates the schema and syntax for storing a connection string. The `name` attribute is a name that you provide to uniquely identify a connection string so that it can be retrieved at runtime. The `providerName` is the invariant name of the .NET Framework data provider, which is registered in the machine.config file.

```xml
<?xml version='1.0' encoding='utf-8'?>
  <configuration>
    <connectionStrings>
      <clear />
      <add name="Name"
       providerName="System.Data.ProviderName"
       connectionString="Valid Connection String;" />
    </connectionStrings>
  </configuration>
```

> **Note:**
> You can save part of a connection string in a configuration file and use the [System.Data.Common.DbConnectionStringBuilder](https://learn.microsoft.com/search/?terms=System.Data.Common.DbConnectionStringBuilder) class to complete it at runtime. This is useful in scenarios where you do not know elements of the connection string ahead of time, or when you don't want to save sensitive information in a configuration file. For more information, see [Connection String Builders](connection-string-builders.md).

### Use External Configuration Files

 External configuration files are separate files that contain a fragment of a configuration file consisting of a single section. The external configuration file is then referenced by the main configuration file. Storing the `connectionStrings` section in a physically separate file is useful in situations where connection strings might be edited after the application is deployed. For example, the standard ASP.NET behavior is to restart an application domain when configuration files are modified, which results in state information being lost. However, modifying an external configuration file does not cause an application restart. External configuration files are not limited to ASP.NET; they can also be used by Windows applications. In addition, file access security and permissions can be used to restrict access to external configuration files. Working with external configuration files at runtime is transparent, and requires no special coding.

 To store connection strings in an external configuration file, create a separate file that contains only the `connectionStrings` section. Do not include any additional elements, sections, or attributes. This example shows the syntax for an external configuration file.

```xml
<connectionStrings>
  <add name="Name"
   providerName="System.Data.ProviderName"
   connectionString="Valid Connection String;" />
</connectionStrings>
```

 In the main application configuration file, you use the `configSource` attribute to specify the fully qualified name and location of the external file. This example refers to an external configuration file named `connections.config`.

```xml
<?xml version='1.0' encoding='utf-8'?>
<configuration>
    <connectionStrings configSource="connections.config"/>
</configuration>
```

## Retrieve Connection Strings at Run Time

Use classes in the [System.Configuration](https://learn.microsoft.com/search/?terms=System.Configuration) namespace to retrieve connection strings from configuration files at runtime, by name or provider name.

> **Note:**
> The **machine.config** file also contains a `connectionStrings` section, which contains connection strings used by Visual Studio. When retrieving connection strings by provider name from the **app.config** file in a Windows application, the connection strings in **machine.config** get loaded first, and then the entries from **app.config**. Adding `clear` immediately after the `connectionStrings` element removes all inherited references from the data structure in memory, so that only the connection strings defined in the local **app.config** file are considered.

### Work with the Configuration Classes

Use [System.Configuration.ConfigurationManager](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationManager) to work with configuration files on the local computer. It replaces the deprecated [System.Configuration.ConfigurationSettings](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationSettings) class. Use [System.Web.Configuration.WebConfigurationManager](https://learn.microsoft.com/search/?terms=System.Web.Configuration.WebConfigurationManager) to work with ASP.NET configuration files. It works with configuration files on a web server and provides programmatic access to configuration file sections such as **system.web**.

> **Note:**
> Accessing configuration files at runtime requires granting permissions to the caller; the required permissions depend on the type of application, configuration file, and location. For more information, see [System.Web.Configuration.WebConfigurationManager](https://learn.microsoft.com/search/?terms=System.Web.Configuration.WebConfigurationManager) for ASP.NET applications, and [System.Configuration.ConfigurationManager](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationManager) for Windows applications.

 You can use the [System.Configuration.ConnectionStringSettingsCollection](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettingsCollection) to retrieve connection strings from application configuration files. It contains a collection of [System.Configuration.ConnectionStringSettings](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettings) objects, each of which represents a single entry in the `connectionStrings` section. Its properties map to connection string attributes, allowing you to retrieve a connection string by specifying the name or the provider name.

| Property | Description |
| --- | --- |
| [System.Configuration.ConnectionStringSettings.Name*](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettings.Name*) | The name of the connection string. Maps to the `name` attribute. |
| [System.Configuration.ConnectionStringSettings.ProviderName*](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettings.ProviderName*) | The fully qualified provider name. Maps to the `providerName` attribute. |
| [System.Configuration.ConnectionStringSettings.ConnectionString](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettings.ConnectionString) | The connection string. Maps to the `connectionString` attribute. |

### Example: List All Connection Strings

 This example iterates through the [System.Configuration.ConnectionStringSettingsCollection](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettingsCollection) and displays the [System.Configuration.ConnectionStringSettings.Name*](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettings.Name*), [System.Configuration.ConnectionStringSettings.ProviderName*](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettings.ProviderName*), and [System.Configuration.ConnectionStringSettings.ConnectionString](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettings.ConnectionString) properties in the console window.

> **Note:**
> System.Configuration.dll is not included in all project types, and you might need to set a reference to it in order to use the configuration classes. The name and location of a particular application configuration file varies by the type of application and the hosting process.

 [DataWorks ConnectionStringSettings.RetrieveFromConfig#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfig/CS/source.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfig/CS/source.cs.md>)
 [DataWorks ConnectionStringSettings.RetrieveFromConfig#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfig/VB/source.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfig/VB/source.vb.md>)

### Example: Retrieve a Connection String by Name

 This example demonstrates how to retrieve a connection string from a configuration file by specifying its name. The code creates a [System.Configuration.ConnectionStringSettings](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettings) object, matching the supplied input parameter to the [System.Configuration.ConfigurationManager.ConnectionStrings](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationManager.ConnectionStrings) name. If no matching name is found, the function returns `null` (`Nothing` in Visual Basic).

 [DataWorks ConnectionStringSettings.RetrieveFromConfigByName#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfigByName/CS/source.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfigByName/CS/source.cs.md>)
 [DataWorks ConnectionStringSettings.RetrieveFromConfigByName#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfigByName/VB/source.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfigByName/VB/source.vb.md>)

### Example: Retrieve a Connection String by Provider Name

 This example demonstrates how to retrieve a connection string by specifying the provider-invariant name in the format *System.Data.ProviderName*. The code iterates through the [System.Configuration.ConnectionStringSettingsCollection](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettingsCollection) and returns the connection string for the first [System.Configuration.ConnectionStringSettings.ProviderName*](https://learn.microsoft.com/search/?terms=System.Configuration.ConnectionStringSettings.ProviderName*) found. If the provider name is not found, the function returns `null` (`Nothing` in Visual Basic).

 [DataWorks ConnectionStringSettings.RetrieveFromConfigByProvider#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfigByProvider/CS/source.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfigByProvider/CS/source.cs.md>)
 [DataWorks ConnectionStringSettings.RetrieveFromConfigByProvider#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfigByProvider/VB/source.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks ConnectionStringSettings.RetrieveFromConfigByProvider/VB/source.vb.md>)

## Encrypt Configuration File Sections Using Protected Configuration

 ASP.NET 2.0 introduced a new feature, called *protected configuration*, that enables you to encrypt sensitive information in a configuration file. Although primarily designed for ASP.NET, protected configuration can also be used to encrypt configuration file sections in Windows applications.

 The following configuration file fragment shows the `connectionStrings` section after it has been encrypted. The `configProtectionProvider` specifies the protected configuration provider used to encrypt and decrypt the connection strings. The `EncryptedData` section contains the cipher text.

```xml
<connectionStrings configProtectionProvider="DataProtectionConfigurationProvider">
  <EncryptedData>
    <CipherData>
      <CipherValue>AQAAANCMnd8BFdERjHoAwE/Cl+sBAAAAH2... </CipherValue>
    </CipherData>
  </EncryptedData>
</connectionStrings>
```

 When the encrypted connection string is retrieved at runtime, .NET Framework uses the specified provider to decrypt the `CipherValue` and make it available to your application. You do not need to write any additional code to manage the decryption process.

### Protected Configuration Providers

 Protected configuration providers are registered in the `configProtectedData` section of the **machine.config** file on the local computer, as shown in the following fragment, which shows the two protected configuration providers supplied with .NET Framework. The values shown here have been truncated for readability.

```xml
<configProtectedData defaultProvider="RsaProtectedConfigurationProvider">
  <providers>
    <add name="RsaProtectedConfigurationProvider"
      type="System.Configuration.RsaProtectedConfigurationProvider" />
    <add name="DataProtectionConfigurationProvider"
      type="System.Configuration.DpapiProtectedConfigurationProvider" />
  </providers>
</configProtectedData>
```

 You can configure additional protected configuration providers by adding them to the **machine.config** file. You can also create your own protected configuration provider by inheriting from the [System.Configuration.ProtectedConfigurationProvider](https://learn.microsoft.com/search/?terms=System.Configuration.ProtectedConfigurationProvider) abstract base class. The following table describes the two configuration files included with .NET Framework.

| Provider | Description |
| --- | --- |
| [System.Configuration.RsaProtectedConfigurationProvider](https://learn.microsoft.com/search/?terms=System.Configuration.RsaProtectedConfigurationProvider) | Uses the RSA encryption algorithm to encrypt and decrypt data. The RSA algorithm can be used for both public key encryption and digital signatures. It is also known as "public key" or asymmetrical encryption because it employs two different keys. You can use the [ASP.NET IIS Registration Tool (Aspnet_regiis.exe)](https://learn.microsoft.com/previous-versions/dotnet/netframework-3.5/k6h9cz8h\(v=vs.90\)) to encrypt sections in a Web.config file and manage the encryption keys. ASP.NET decrypts the configuration file when it processes the file. The identity of the ASP.NET application must have read access to the encryption key that is used to encrypt and decrypt the encrypted sections. |
| [System.Configuration.DpapiProtectedConfigurationProvider](https://learn.microsoft.com/search/?terms=System.Configuration.DpapiProtectedConfigurationProvider) | Uses the Windows Data Protection API (DPAPI) to encrypt configuration sections. It uses the Windows built-in cryptographic services and can be configured for either machine-specific or user-account-specific protection. Machine-specific protection is useful for multiple applications on the same server that need to share information. User-account-specific protection can be used with services that run with a specific user identity, such as a shared hosting environment. Each application runs under a separate identity which restricts access to resources such as files and databases. |

 Both providers offer strong encryption of data. However, if you are planning to use the same encrypted configuration file on multiple servers, such as a Web farm, only the [System.Configuration.RsaProtectedConfigurationProvider](https://learn.microsoft.com/search/?terms=System.Configuration.RsaProtectedConfigurationProvider) enables you to export the encryption keys used to encrypt the data and import them on another server. For more information, see [Importing and Exporting Protected Configuration RSA Key Containers](https://learn.microsoft.com/previous-versions/aspnet/yxw286t2\(v=vs.100\)).

### Use the Configuration Classes

 The [System.Configuration](https://learn.microsoft.com/search/?terms=System.Configuration) namespace provides classes to work with configuration settings programmatically. The [System.Configuration.ConfigurationManager](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationManager) class provides access to machine, application, and user configuration files. If you are creating an ASP.NET application, you can use the [System.Web.Configuration.WebConfigurationManager](https://learn.microsoft.com/search/?terms=System.Web.Configuration.WebConfigurationManager) class, which provides the same functionality while also allowing you to access settings that are unique to ASP.NET applications, such as those found in **\<system.web>**.

> **Note:**
> The [System.Security.Cryptography](https://learn.microsoft.com/search/?terms=System.Security.Cryptography) namespace contains classes that provide additional options for encrypting and decrypting data. Use these classes if you require cryptographic services that are not available using protected configuration. Some of these classes are wrappers for the unmanaged Microsoft CryptoAPI, while others are purely managed implementations.

### App.config Example

 This example demonstrates how to toggle encrypting the `connectionStrings` section in an **app.config** file for a Windows application. In this example, the procedure takes the name of the application as an argument, for example, "MyApplication.exe". The **app.config** file is then encrypted and copied to the folder that contains the executable under the name of "MyApplication.exe.config".

 The code uses the [System.Configuration.ConfigurationManager.OpenExeConfiguration*](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationManager.OpenExeConfiguration*) method to open the **app.config** file for editing, and the [System.Configuration.ConfigurationManager.GetSection*](https://learn.microsoft.com/search/?terms=System.Configuration.ConfigurationManager.GetSection*) method returns the `connectionStrings` section. The code then checks the [System.Configuration.SectionInformation.IsProtected](https://learn.microsoft.com/search/?terms=System.Configuration.SectionInformation.IsProtected) property, calling the [System.Configuration.SectionInformation.ProtectSection*](https://learn.microsoft.com/search/?terms=System.Configuration.SectionInformation.ProtectSection*) to encrypt the section if it is not encrypted. The [System.Configuration.SectionInformation.UnprotectSection*](https://learn.microsoft.com/search/?terms=System.Configuration.SectionInformation.UnprotectSection*) method is invoked to decrypt the section. (The connection string can only be decrypted on the computer on which it was encrypted.) The [System.Configuration.Configuration.Save*](https://learn.microsoft.com/search/?terms=System.Configuration.Configuration.Save*) method completes the operation and saves the changes.

You must add a reference to `System.Configuration.dll` in your project for the code to run.

> **Important:**
> Microsoft recommends that you use the most secure authentication flow available. If you're connecting to Azure SQL, [Managed Identities for Azure resources](https://learn.microsoft.com/sql/connect/ado-net/sql/azure-active-directory-authentication#using-managed-identity-authentication) is the recommended authentication method.


 [DataWorks ConnectionStrings.Encrypt#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStrings.Encrypt/CS/source.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStrings.Encrypt/CS/source.cs.md>)
 [DataWorks ConnectionStrings.Encrypt#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks ConnectionStrings.Encrypt/VB/source.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks ConnectionStrings.Encrypt/VB/source.vb.md>)

### Web.config Example

 This example uses the [System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration*](https://learn.microsoft.com/search/?terms=System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration*) method of the `WebConfigurationManager`. In this case, you can supply the relative path to the **Web.config** file by using a tilde. The code requires a reference to the `System.Web.Configuration` class.

 [DataWorks ConnectionStringsWeb.Encrypt#1 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStringsWeb.Encrypt/CS/source.cs#1)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DataWorks ConnectionStringsWeb.Encrypt/CS/source.cs.md>)
 [DataWorks ConnectionStringsWeb.Encrypt#1 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks ConnectionStringsWeb.Encrypt/VB/source.vb#1)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DataWorks ConnectionStringsWeb.Encrypt/VB/source.vb.md>)

 For more information about securing ASP.NET applications, see [Securing ASP.NET web sites](https://learn.microsoft.com/previous-versions/aspnet/91f66yxt\(v=vs.100\)).

## See also

- [Connection String Builders](connection-string-builders.md)
- [Protecting Connection Information](protecting-connection-information.md)
- [Using the Configuration Classes](https://learn.microsoft.com/previous-versions/visualstudio/visual-studio-2008/ms228063\(v=vs.90\))
- [Configuring Apps](../../configure-apps/index.md)
- [ASP.NET Web Site Administration](https://learn.microsoft.com/previous-versions/aspnet/6hy1xzbw\(v=vs.100\))
- [ADO.NET Overview](ado-net-overview.md)
