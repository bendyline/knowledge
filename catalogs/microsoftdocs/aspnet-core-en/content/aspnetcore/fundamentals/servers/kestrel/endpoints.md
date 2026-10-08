---
title: Configure endpoints for Kestrel web server
ai-usage: ai-assisted
author: tdykstra
description: Learn about configuring endpoints with Kestrel, the cross-platform web server for ASP.NET Core.
monikerRange: '>= aspnetcore-5.0'
ms.author: tdykstra
ms.date: 09/24/2026
uid: fundamentals/servers/kestrel/endpoints
---
# Configure endpoints for the ASP.NET Core Kestrel web server

**Applies to: < aspnetcore-10.0**
> **Note:**
> This isn't the latest version of this article. For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).


**Applies to: \= aspnetcore-7.0 || = aspnetcore-5.0 || = aspnetcore-3.0 || = aspnetcore-3.1 || = aspnetcore-2.0**
> **Warning:**
> This version of ASP.NET Core is no longer supported. For more information, see the [.NET and .NET Core Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). For the current release, see the [.NET 10 version of this article](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/includes?view=aspnetcore-10.0\&preserve-view=true).



<!-- Exclude until .NET 11 preview is added to the version selector collection
(add triple colon here) moniker range="> aspnetcore-10.0"
> [!IMPORTANT]
> This information relates to a pre-release product that may be substantially modified before it's commercially released. Microsoft makes no warranties, express or implied, with respect to the information provided here.
>
> For the current release, see the [.NET 10 version of this article](?view=aspnetcore-10.0&preserve-view=true).
(add triple colon here) moniker-end
-->

<!--
Include either this file or 'not-latest-version-without-not-supported-content.md' at the top 
of articles.

'not-latest-version.md' (this file): Includes not-supported content.
'not-latest-version-without-not-supported-content.md': Doesn't include not-supported content.

Use this file in articles that target >=7.0. For articles that target >=8.0 prior to 10.0
reaching EOL, 'not-latest-version-without-not-supported-content.md' must be used to avoid
a zone/file moniker range mismatch error.

When a new version is released, it might be necessary to temporarily comment out the current 
version moniker range section until the new moniker is created.

Markdown to include this file:

[!INCLUDE[](~/includes/not-latest-version.md)]
-->


**Applies to: \>= aspnetcore-8.0**

Kestrel endpoints provide the infrastructure for listening to incoming requests and routing them to the appropriate middleware. The combination of an address and a protocol defines an endpoint.

* The address specifies the network interface that the server listens on for incoming requests, such as a TCP port.
* The protocol specifies the communication between the client and server, such as HTTP/1.1, HTTP/2, or HTTP/3.
* An endpoint can be secured by using the `https` URL scheme or `UseHttps` method.

Endpoints can be configured with URLs, JSON in the _appsettings.json_ file, and code. This article describes how to use each option to configure endpoints, HTTPS, and HTTP protocols.

## Identify the default endpoint

The configuration for new ASP.NET Core projects binds each project to a default endpoint. The configuration selects a random HTTP port between 5000-5300 and a random HTTPS port between 7000-7300. The selected ports are stored in the generated _Properties/launchSettings.json_ file and are modifiable by the developer. The _launchSetting.json_ file is used for local development only.

If there's no endpoint configuration, Kestrel binds to the `http://localhost:5000` URL.

## Configure endpoints

Kestrel endpoints listen for incoming connections. When an endpoint is created, it must be configured with the address to use for listening. The address is usually a TCP address and port number.

You have several options for configuring endpoints. You can specify the URLs or ports directly, define the addresses in your code, or create the endpoints with JSON in the _appsettings.json_ file.

### Specify endpoints with URLs

The following sections explain how to configure endpoints by using the following resources:

* `ASPNETCORE_URLS` environment variable
* `--urls` command-line argument
* `urls` host configuration key
* [UseUrls](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls%252A) extension method
* [WebApplication.Urls](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplication.Urls) property

#### URL formats

The URLs indicate the IP or host addresses with ports and protocols that the server listens on. You can omit the port if it's the default for the protocol (typically 80 and 443). URLs can be in any of the following formats.

* IPv4 address with port number:

  ```url
  http://65.55.39.10:80/
  ```

  `0.0.0.0` is a special case that binds to all IPv4 addresses.

* IPv6 address with port number:

  ```url
  http://[0:0:0:0:0:ffff:4137:270a]:80/
  ```

  `[::]` is the IPv6 equivalent of IPv4 `0.0.0.0`.

* Wildcard (`*`) host with port number:

  ```url
  http://contoso.com:80/
  http://*:80/
  ```

  Anything not recognized as a valid IP address or `localhost` is treated as a wildcard that binds to all IPv4 and IPv6 addresses. Some developers prefer to use the asterisk `*` or plus symbol `+` to be more explicit. To bind different host names to different ASP.NET Core apps on the same port, use [HTTP.sys](../httpsys.md) or a reverse proxy server. Reverse proxy server examples include IIS, YARP, Nginx, and Apache.

* Host name `localhost` with port number or loopback IP with port number:

  ```url
  http://localhost:5000/
  http://127.0.0.1:5000/
  http://[::1]:5000/
  ```

  When `localhost` is specified, Kestrel attempts to bind to both IPv4 and IPv6 loopback interfaces. If the requested port is in use by another service on either loopback interface, Kestrel fails to start. If either loopback interface is unavailable for any other reason (most commonly because IPv6 isn't supported), Kestrel logs a warning.

* Specify multiple URL prefixes by using a semicolon (`;`) delimiter, for example:

  ```url
  http://*:5000;http://localhost:5001;https://hostname:5002
  ```

For more information, see [Override configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fweb-host%23override-configuration).

#### HTTPS URL prefixes

You can define endpoints by using HTTPS URL prefixes only if a default certificate is provided in the HTTPS endpoint configuration. For example, use the [Microsoft.AspNetCore.Server.Kestrel.KestrelServerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.KestrelServerOptions) configuration or a configuration file. This approach is described in the [Configure HTTPS in appsettings.json](#configure-https-in-appsettingsjson) section later in this article. For more information, see the [Configure HTTPS](#configure-https) section.

### Specify ports only

Most configurations for apps and containers define only a port for listening, like port 80, without specifying other constraints like the host or path. `HTTP_PORTS` and `HTTPS_PORTS` are config keys that specify the listening ports for the Kestrel and HTTP.sys servers. You can specify the keys as environment variables defined with the `DOTNET_` or `ASPNETCORE_` prefixes, or set them directly through any other config input, such as the `appsettings.json` file. Each configuration is a semicolon-delimited list of port values, as shown in the following example:

```json
ASPNETCORE_HTTP_PORTS=80;8080
ASPNETCORE_HTTPS_PORTS=443;8081
```

The configuration in the example is shorthand for the following specification, which defines the scheme (HTTP or HTTPS) and any host or IP:

```json
ASPNETCORE_URLS=http://*:80/;http://*:8080/;https://*:443/;https://*:8081/
```

The `HTTP_PORTS` and `HTTPS_PORTS` configuration keys are lower priority. If other URLs or values are set directly in code, they can override the configuration keys. Configure certificates separately using server-specific mechanics for HTTPS.

> **Note:**
> Don't confuse the `HTTPS_PORTS` configuration key and `ASPNETCORE_HTTPS_PORTS` environment variable, which set the ports for Kestrel/HTTP.sys endpoint configuration, with the `HTTPS_PORT` configuration key and `ASPNETCORE_HTTPS_PORT` environment variable, which set the port for [HTTPS redirection middleware](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23https-redirection-middleware-usehttpsredirection).


### Create endpoints in `appsettings.json`

Kestrel can load endpoints from an [Microsoft.Extensions.Configuration.IConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration) instance. By default, Kestrel configuration is loaded from the `Kestrel` section and endpoints are configured in `Kestrel:Endpoints`:

```json
{
  "Kestrel": {
    "Endpoints": {
      "MyHttpEndpoint": {
        "Url": "http://localhost:8080"
      }
    }
  }
}
```

The example code:

* Uses the _appsettings.json_ file as the configuration source. However, any `IConfiguration` source can be used.
* Adds an endpoint named `MyHttpEndpoint` on port 8080.

For more information about configuring endpoints with JSON, see the [Configure HTTPS in appsettings.json](#configure-https-in-appsettingsjson) and [Configure HTTP protocols in appsettings.json](#configure-http-protocols-in-appsettingsjson) sections later in this article.

#### Reload endpoints from configuration

By default, the endpoint configuration can be reloaded when the configuration source changes. It can be disabled by using the [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration,System.Boolean)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration%2CSystem.Boolean)) method.

When a change is signaled:

* The new configuration is compared to the old version. Any endpoint without configuration changes isn't modified.
* Removed or modified endpoints are allowed 5 seconds to complete processing requests and shut down.
* New or modified endpoints are started.

Clients connecting to a modified endpoint might be disconnected or refused while the endpoint is restarted.

#### ConfigurationLoader

The [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure%252A) returns a [Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader). The loader's [Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader.Endpoint(System.String,System.Action{Microsoft.AspNetCore.Server.Kestrel.EndpointConfiguration})](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader.Endpoint(System.String%2CSystem.Action%7BMicrosoft.AspNetCore.Server.Kestrel.EndpointConfiguration%7D)) method can be used to supplement a configured endpoint's settings:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigurationLoader"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

`KestrelServerOptions.ConfigurationLoader` can be directly accessed to continue iterating on the existing loader, such as the one provided by the [Microsoft.AspNetCore.Builder.WebApplicationBuilder.WebHost%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder.WebHost%252A).

* The configuration section for each endpoint is available on the options in the [Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader.Endpoint%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader.Endpoint%252A) method so custom settings can be read.
* [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration)) can be called multiple times, but only the last configuration is used unless `Load` is explicitly called on prior instances. The default host doesn't call `Load` so its default configuration section might be replaced.
* `KestrelConfigurationLoader` mirrors the `Listen` family of APIs from `KestrelServerOptions` as `Endpoint` overloads, so code and config endpoints can be configured in the same place. These overloads don't use names and only consume default settings from configuration.

### Define endpoints in the code

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions) provides methods for configuring endpoints in code:

* [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A)
* [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenLocalhost%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenLocalhost%252A)
* [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenAnyIP%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenAnyIP%252A)
* [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%252A)
* [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenNamedPipe%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenNamedPipe%252A)

When both the `Listen` and [UseUrls](#specify-endpoints-with-urls) APIs are used simultaneously, the `Listen` endpoints override the `UseUrls` endpoints.

#### Bind to a TCP socket

The [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A), [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenLocalhost%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenLocalhost%252A), and [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenAnyIP%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenAnyIP%252A) methods bind to a TCP socket:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_Listen"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

The example code:

* Configures endpoints that listen on port 5000 and 5001.
* Configures HTTPS for an endpoint with the [Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps%252A) extension method on a [Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions) object. For more information, see [Configure HTTPS in code](#configure-https-in-code).

On Windows, self-signed certificates can be created by using the [New-SelfSignedCertificate PowerShell cmdlet](https://learn.microsoft.com/powershell/module/pki/new-selfsignedcertificate). For an unsupported example, see the [UpdateIISExpressSSLForChrome.ps1](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/includes/make-x509-cert/UpdateIISExpressSSLForChrome.ps1) certificate file on GitHub.

On macOS, Linux, and Windows, create certificates can be created by using [OpenSSL](https://www.openssl.org/).


#### Bind to a Unix socket

Listen on a Unix socket with [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%252A) for improved performance with Nginx, as shown in this example:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ListenUnixSocket"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

* In the Nginx configuration file, set the `server` > `location` > `proxy_pass` entry to `http://unix:/tmp/{KESTREL SOCKET}:/;`, where `{KESTREL SOCKET}` is the name of the socket provided to [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%252A). In the code example, the name is `kestrel-test.sock`.
* Ensure the socket is writeable by Nginx. (You can set the write permissions on the socket with the `chmod go+w /tmp/kestrel-test.sock` command).

#### Configure endpoint defaults

[ConfigureEndpointDefaults(Action\<ListenOptions>)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults\(System.Action%7BMicrosoft.AspNetCore.Server.Kestrel.Core.ListenOptions%7D\)) specifies configuration that runs for each specified endpoint. Multiple calls to `ConfigureEndpointDefaults` replace the previous configuration.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureEndpointDefaults"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

> **Note:**
> Endpoints created by calling the [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) **before** calling the [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults%252A) don't have the defaults applied.

### Use dynamic port binding

When port number `0` is specified, Kestrel dynamically binds to an available port. The following example shows how to determine the port bound by Kestrel at runtime:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_IServerAddressesFeature"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

Dynamically binding a port isn't available in some scenarios:

* The code calls the [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenLocalhost%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenLocalhost%252A).
* The code binds together TCP-based HTTP/1.1 or HTTP/2 with QUIC-based HTTP/3.

## Configure HTTPS

Kestrel supports securing endpoints with HTTPS. Data sent over HTTPS is encrypted by using [Transport Layer Security (TLS)](https://tools.ietf.org/html/rfc5246) to increase the security of data transferred between the client and server.

HTTPS requires a TLS certificate. The TLS certificate is stored on the server, and Kestrel is configured to use it. An app can use the [ASP.NET Core HTTPS development certificate](../../../security/enforcing-ssl.md) in a local development environment. The development certificate isn't installed in nondevelopment environments. In production, a TLS certificate must be explicitly configured. At a minimum, a default certificate must be provided.

How HTTPS and the TLS certificate is configured depends on how endpoints are configured. If [URL prefixes](#specify-endpoints-with-urls) or [only specified ports](#specify-ports-only) are used to define endpoints, HTTPS can be used only if a default certificate is provided in HTTPS endpoint configuration. A default certificate can be configured with the following options:

* [Configure HTTPS in appsettings.json](#configure-https-in-appsettingsjson)
* [Configure HTTPS in code](#configure-https-in-code)

### Configure HTTPS in appsettings.json

A default HTTPS app settings configuration schema is available for Kestrel. Configure multiple endpoints, including the URLs and the certificates to use, either from a file on disk or from a certificate store.

Any HTTPS endpoint that doesn't specify a certificate (`HttpsDefaultCert` in the following example code) falls back to the certificate defined under `Certificates:Default` or the development certificate.

The following example is for the _appsettings.json_ file, but any configuration source can be used:

```json
{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5000"
      },
      "HttpsInlineCertFile": {
        "Url": "https://localhost:5001",
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      },
      "HttpsInlineCertAndKeyFile": {
        "Url": "https://localhost:5002",
        "Certificate": {
          "Path": "<path to .pem/.crt file>",
          "KeyPath": "<path to .key file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      },
      "HttpsInlineCertStore": {
        "Url": "https://localhost:5003",
        "Certificate": {
          "Subject": "<subject; required>",
          "Store": "<certificate store; required>",
          "Location": "<location; defaults to CurrentUser>",
          "AllowInvalid": "<true or false; defaults to false>"
        }
      },
      "HttpsDefaultCert": {
        "Url": "https://localhost:5004"
      }
    },
    "Certificates": {
      "Default": {
        "Path": "<path to .pfx file>",
        "Password": "$CREDENTIAL_PLACEHOLDER$"
      }
    }
  }
}
```

> **Warning:**
> In the example code, the certificate password is stored as plain text in the _appsettings.json_ file.
> The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for the certificate password.
> To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md).
> To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md).
> It's a best practice to not use development secrets for production or testing.


#### Schema notes

* Endpoint names are [case-insensitive](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23configuration-keys-and-values). For example, `HTTPS` and `Https` are equivalent.
* The `Url` parameter is required for each endpoint. The format for this parameter is the same as the top-level `Urls` configuration parameter, but it can have only a single value. For more information, see the [URL formats](#url-formats) section in this article.
* These endpoints replace the values defined in the top-level `Urls` configuration rather than adding to them. Endpoints defined in code with the `Listen` API are cumulative with the endpoints defined in the configuration section.
* The `Certificate` section is optional. If the `Certificate` section isn't specified, the defaults defined in `Certificates:Default` are used. If no defaults are available, the development certificate is used. If there are no defaults and the development certificate isn't present, the server throws an exception and fails to start.
* The `Certificate` section supports multiple certificate sources.
* Any number of endpoints can be defined in `Configuration`, as long as they don't cause port conflicts.

#### Certificate sources

Certificate nodes can be configured to load certificates from various sources:

* `Path` and `Password`: Load _.pfx_ files.
* `Path`, `KeyPath`, and `Password`: Load _.pem_/_.crt_ and _.key_ files.
* `Subject` and `Store`: Load from the certificate store.

For example, the `Certificates:Default` certificate can be specified with the following JSON:

```json
"Default": {
  "Subject": "<subject; required>",
  "Store": "<cert store; required>",
  "Location": "<location; defaults to CurrentUser>",
  "AllowInvalid": "<true or false; defaults to false>"
}
```

#### Configure client certificates in appsettings.json

The [ClientCertificateMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode) is used to configure client certificate behavior.

```json
{
  "Kestrel": {
    "Endpoints": {
      "MyHttpsEndpoint": {
        "Url": "https://localhost:5001",
        "ClientCertificateMode": "AllowCertificate",
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      }
    }
  }
}
```

> **Warning:**
> In the example code, the certificate password is stored as plain text in the _appsettings.json_ file.
> The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for the certificate password.
> To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md).
> To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md).
> It's a best practice to not use development secrets for production or testing.


The default value is `ClientCertificateMode.NoCertificate`, where Kestrel doesn't request or require a certificate from the client.

For more information, see [Configure certificate authentication in ASP.NET Core](../../../security/authentication/certauth.md).

#### Configure SSL/TLS protocols in appsettings.json

SSL Protocols are protocols used for encrypting and decrypting traffic between two peers, which traditionally are a client and a server.

```json
{
  "Kestrel": {
    "Endpoints": {
      "MyHttpsEndpoint": {
        "Url": "https://localhost:5001",
        "SslProtocols": ["Tls12", "Tls13"],
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      }
    }
  }
}
```

> **Warning:**
> In the example code, the certificate password is stored as plain text in the _appsettings.json_ file.
> The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for the certificate password.
> To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md).
> To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md).
> It's a best practice to not use development secrets for production or testing.


The default value, `SslProtocols.None`, causes Kestrel to use the operating system defaults to choose the best protocol. Unless you have a specific reason to select a protocol, use the default.

### Configure HTTPS in code

When you use the `Listen` API, the [Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps%252A) extension method on [Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions) is available to configure HTTPS.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_Listen"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

The `ListenOptions.UseHttps` parameters include:

* `filename`: The path and file name of a certificate file, relative to the directory that contains the app's content files.
* `password`: The password required to access the X.509 certificate data.
* `configureOptions`: An `Action` to configure the `HttpsConnectionAdapterOptions`. Returns the `ListenOptions`.
* `storeName`: The certificate store from which to load the certificate.
* `subject`: The subject name for the certificate.
* `allowInvalid`: Indicates whether to consider invalid certificates, such as self-signed certificates.
* `location`: The store location to load the certificate from.
* `serverCertificate`: The X.509 certificate.

For a complete list of `UseHttps` overloads, see [Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps%252A).

#### Configure client certificates in code

The [Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode) configures the client certificate requirements.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureHttpsDefaultsClientCertificateMode"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

The default value is [Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode.NoCertificate](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode.NoCertificate) (0), where Kestrel doesn't request or require a certificate from the client.

For more information, see [Configure certificate authentication in ASP.NET Core](../../../security/authentication/certauth.md).

#### Configure HTTPS defaults in code

The [ConfigureHttpsDefaults(Action\<HttpsConnectionAdapterOptions>)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults\(System.Action%7BMicrosoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions%7D\)) specifies a configuration `Action` to run for each HTTPS endpoint. Multiple calls to `ConfigureHttpsDefaults` replace prior `Action` instances with the last `Action` specified.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureHttpsDefaults"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

> **Note:**
> Endpoints created by calling the [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) **before** calling the [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults%252A) don't have the defaults applied.

#### Configure SSL/TLS protocols in code

SSL protocols are protocols used for encrypting and decrypting traffic between two peers, which traditionally are a client and a server.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureHttpsDefaultsSslProtocols"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

#### Configure TLS cipher suites filter in code

On Linux, a [System.Net.Security.CipherSuitesPolicy](https://learn.microsoft.com/search/?terms=System.Net.Security.CipherSuitesPolicy) object can be used to filter TLS handshakes on a per-connection basis:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureHttpsDefaultsCipherSuitesPolicy"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## Configure Server Name Indication

[Server Name Indication (SNI)](https://tools.ietf.org/html/rfc6066#section-3) can be used to host multiple domains on the same IP address and port. SNI can be used to conserve resources by serving multiple sites from one server.

For SNI to function, the client sends the host name for the secure session to the server during the TLS handshake so the server can provide the correct certificate. The client uses the furnished certificate for encrypted communication with the server during the secure session that follows the TLS handshake.

All websites must run on the same Kestrel instance. Kestrel doesn't support sharing an IP address and port across multiple instances without a reverse proxy.

SNI can be configured in two ways:

* Configure a mapping between host names and HTTPS options in [Configuration](../../configuration/index.md). For example, specify JSON in the _appsettings.json_ file.
* Create an endpoint in code and select a certificate by using the host name with the [Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.ServerCertificateSelector%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.ServerCertificateSelector%252A) callback property.

### Configure SNI in appsettings.json

Kestrel supports SNI defined in configuration. An endpoint can be configured with an `Sni` object that contains a mapping between host names and HTTPS options. The connection host name is matched to the options and they're used for that connection.

The following configuration adds an endpoint named `MySniEndpoint` that uses SNI to select HTTPS options based on the host name:

```json
{
  "Kestrel": {
    "Endpoints": {
      "MySniEndpoint": {
        "Url": "https://*",
        "SslProtocols": ["Tls11", "Tls12"],
        "Sni": {
          "a.example.org": {
            "Protocols": "Http1AndHttp2",
            "SslProtocols": ["Tls11", "Tls12", "Tls13"],
            "Certificate": {
              "Subject": "<subject; required>",
              "Store": "<certificate store; required>",
            },
            "ClientCertificateMode" : "NoCertificate"
          },
          "*.example.org": {
            "Certificate": {
              "Path": "<path to .pfx file>",
              "Password": "$CREDENTIAL_PLACEHOLDER$"
            }
          },
          "*": {
            // At least one subproperty needs to exist per SNI section or it
            // cannot be discovered via IConfiguration
            "Protocols": "Http1",
          }
        }
      }
    },
    "Certificates": {
      "Default": {
        "Path": "<path to .pfx file>",
        "Password": "$CREDENTIAL_PLACEHOLDER$"
      }
    }
  }
}
```

> **Warning:**
> In the example code, the certificate password is stored as plain text in the _appsettings.json_ file.
> The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for the certificate password.
> To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md).
> To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md).
> It's a best practice to not use development secrets for production or testing.


SNI can override the following HTTPS options:

* `Certificate` configures the [certificate source](#certificate-sources).
* `Protocols` configures the allowed [HTTP protocols](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols).
* `SslProtocols` configures the allowed [SSL protocols](https://learn.microsoft.com/search/?terms=System.Security.Authentication.SslProtocols).
* `ClientCertificateMode` configures the [client certificate requirements](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode).

The host name supports the following wildcard matching:

- **Exact match**: For example, `a.example.org` matches `a.example.org`.
- **Wildcard prefix**: If there are multiple wildcard matches, the longest pattern is selected. For example, `*.example.org` matches `b.example.org` and `c.example.org`.
- **Full wildcard**: The wildcard `*` matches everything else, including clients that don't use SNI and don't send a host name.

The matched SNI configuration is applied to the endpoint for the connection, overriding values on the endpoint. If a connection doesn't match a configured SNI host name, the connection is refused.

### Configure SNI with code

Kestrel supports SNI with several callback APIs:

* `ServerCertificateSelector`
* `ServerOptionsSelectionCallback`
* `TlsHandshakeCallbackOptions`

#### SNI with `ServerCertificateSelector`

Kestrel supports SNI via the `ServerCertificateSelector` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ServerCertificateSelector"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

#### SNI with `ServerOptionsSelectionCallback`

Kestrel supports more dynamic TLS configuration via the `ServerOptionsSelectionCallback` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate and TLS configuration. Default certificates and `ConfigureHttpsDefaults` aren't used with this callback.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ServerOptionsSelectionCallback"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

#### SNI with `TlsHandshakeCallbackOptions`

Kestrel supports more dynamic TLS configuration via the `TlsHandshakeCallbackOptions.OnConnection` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate, TLS configuration, and other server options. Default certificates and `ConfigureHttpsDefaults` aren't used with this callback.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_TlsHandshakeCallbackOptions"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## Configure HTTP protocols

Kestrel supports all commonly used HTTP versions. Endpoints can be configured to support different HTTP versions by using the [Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols) enum, which specifies available HTTP version options.

TLS is required to support more than one HTTP version. The TLS [Application-Layer Protocol Negotiation (ALPN)](https://tools.ietf.org/html/rfc7301#section-3) handshake is used to negotiate the connection protocol between the client and the server when an endpoint supports multiple protocols. 

| HttpProtocols value | Allowed protocol | Notes |
| --- | --- | --- |
| `Http1` | HTTP/1.1 | Can be used with or without TLS. |
| `Http2` | HTTP/2 | Can be used without TLS, only if the client supports a [Prior Knowledge mode](https://tools.ietf.org/html/rfc7540#section-3.4). |
| `Http3` | HTTP/3 | **Requires TLS**. The client might need to be configured to use HTTP/3 only. |
| `Http1AndHttp2` | HTTP/1.1 <br> HTTP/2 | HTTP/2 requires the client to select HTTP/2 in the TLS [Application-Layer Protocol Negotiation (ALPN)](https://tools.ietf.org/html/rfc7301#section-3) handshake. Otherwise, the connection defaults to HTTP/1.1. |
| `Http1AndHttp2AndHttp3` | HTTP/1.1 <br> HTTP/2 <br> HTTP/3 | The first client request normally uses HTTP/1.1 or HTTP/2. The ['alt-svc' response header](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Fhttp3%23alt-svc) prompts the client to upgrade to HTTP/3. HTTP/2 and HTTP/3 requires TLS. Otherwise, the connection defaults to HTTP/1.1. |

The default protocol value for an endpoint is `HttpProtocols.Http1AndHttp2`.

### TLS restrictions for HTTP/2

When you use the HTTP/2 protocol for the connection, the following TLS restrictions apply:

* Requires TLS version 1.2 or later
* Renegotiation is disabled
* Compression is disabled
* Minimum ephemeral key exchange sizes:
  * Elliptic curve Diffie-Hellman (ECDHE) (see [[RFC 4492](https://www.ietf.org/rfc/rfc4492.txt)]): 224 bits minimum
  * Finite field Diffie-Hellman (DHE) (see TLS12 in [[RFC 5246](https://www.rfc-editor.org/rfc/rfc5246)]): 2,048 bits minimum
* The Cipher suite isn't prohibited. 

The `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256` format (see TLS-ECDHE in [[RFC 8422](https://www.rfc-editor.org/rfc/rfc8422)]) with the P-256 elliptic curve (see [[FIPS186](https://csrc.nist.gov/pubs/fips/186-5/final)]) is supported by default.

### Configure HTTP protocols in appsettings.json

The following the _appsettings.json_ file example establishes the HTTP/1.1 connection protocol for a specific endpoint:

```json
{
  "Kestrel": {
    "Endpoints": {
      "HttpsDefaultCert": {
        "Url": "https://localhost:5001",
        "Protocols": "Http1"
      }
    }
  }
}
```

A default protocol can be configured in the `Kestrel:EndpointDefaults` section. The following _appsettings.json_ file example establishes HTTP/1.1 as the default connection protocol for all endpoints:

```json
{
  "Kestrel": {
    "EndpointDefaults": {
      "Protocols": "Http1"
    }
  }
}
```

Protocols specified in code override values set by configuration.

### Configure HTTP protocols in code

The [Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions.Protocols](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions.Protocols) is used to specify protocols with the [Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols) enum.

The following example configures an endpoint for HTTP/1.1, HTTP/2, and HTTP/3 connections on port 8000. Connections are made secure with TLS and a supplied certificate:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelProtocols"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)



**Applies to: \>= aspnetcore-9.0**

## Customize Kestrel named pipe endpoints

Kestrel's named pipe support includes advanced customization options. The [CreateNamedPipeServerStream](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.server.kestrel.transport.namedpipes.namedpipetransportoptions.createnamedpipeserverstream) property on the named pipe options allows pipes to be customized per-endpoint.

This approach is useful in a Kestrel app that requires two pipe endpoints with different [access security](https://learn.microsoft.com/windows/win32/ipc/named-pipe-security-and-access-rights). The `CreateNamedPipeServerStream` option can be used to create pipes with custom security settings, depending on the pipe name.

[language="csharp" source="\~/fundamentals/servers/kestrel/endpoints/samples/KestrelNamedEP/Program.cs" highlight="16-36,39-59" id="snippet_1"::: (complete source file; reference: \~/fundamentals/servers/kestrel/endpoints/samples/KestrelNamedEP/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/endpoints/samples/KestrelNamedEP/Program.cs.md)

In the preceding example, only the account the server runs as is granted `CreateNewInstance` access. Kestrel creates several instances of each pipe to accept connections in parallel, and Windows requires that right to create each instance after the first. Callers are granted read/write access only.

> **Warning:**
> Don't grant `PipeAccessRights.CreateNewInstance` to callers, and avoid `PipeAccessRights.FullControl`, which includes it along with `ChangePermissions` and `TakeOwnership`. `CreateNewInstance` corresponds to the Windows `FILE_CREATE_PIPE_INSTANCE` right, which authorizes a grantee to create additional server instances under the same pipe name. Windows distributes incoming connections across all instances of a pipe, so a process holding that right can accept genuine client connections and impersonate the server.

> **Note:**
> A pipe's security descriptor controls which accounts can connect to that pipe. It doesn't control which endpoints a connected caller can reach because every endpoint mapped in the app is served on every named pipe endpoint. Use authentication and authorization to restrict individual endpoints.



**Applies to: \>= aspnetcore-8.0**

## Related content

* [Kestrel web server in ASP.NET Core](../kestrel.md)
* [Configure options for the ASP.NET Core Kestrel web server](options.md)



**Applies to: \= aspnetcore-7.0**

ASP.NET Core projects are configured to bind to a random HTTP port between 5000-5300 and a random HTTPS port between 7000-7300. This default configuration is specified in the generated `Properties/launchSettings.json` file and can be overridden. If no ports are specified, Kestrel binds to `http://localhost:5000`.

Specify URLs using the:

* `ASPNETCORE_URLS` environment variable.
* `--urls` command-line argument.
* `urls` host configuration key.
* [Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls%252A) extension method.

The value provided using these approaches can be one or more HTTP and HTTPS endpoints (HTTPS if a default cert is available). Configure the value as a semicolon-separated list (for example, `"Urls": "http://localhost:8000;http://localhost:8001"`).

For more information on these approaches, see [Server URLs](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fweb-host%23server-urls) and [Override configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fweb-host%23override-configuration).

A development certificate is created:

* When the [.NET SDK](https://learn.microsoft.com/dotnet/core/sdk) is installed.
* The [dev-certs tool](https://learn.microsoft.com/dotnet/core/tools/dotnet-dev-certs) is used to create a certificate.

The development certificate is available only for the user that generates the certificate. Some browsers require granting explicit permission to trust the local development certificate.

Project templates configure apps to run on HTTPS by default and include [HTTPS redirection and HSTS support](../../../security/enforcing-ssl.md).

Call [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) or [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%252A) methods on [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions) to configure URL prefixes and ports for Kestrel.

`UseUrls`, the `--urls` command-line argument, `urls` host configuration key, and the `ASPNETCORE_URLS` environment variable also work but have the limitations noted later in this section (a default certificate must be available for HTTPS endpoint configuration).

`KestrelServerOptions` configuration:

## ConfigureEndpointDefaults

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults(System.Action{Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions})](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults(System.Action%7BMicrosoft.AspNetCore.Server.Kestrel.Core.ListenOptions%7D)) specifies a configuration `Action` to run for each specified endpoint. Calling `ConfigureEndpointDefaults` multiple times replaces prior `Action`s with the last `Action` specified:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureEndpointDefaults"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

> **Note:**
> Endpoints created by calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) **before** calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults%252A) won't have the defaults applied.

## Configure(IConfiguration)

Enables Kestrel to load endpoints from an [Microsoft.Extensions.Configuration.IConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration). The configuration must be scoped to the configuration section for Kestrel. The `Configure(IConfiguration, bool)` overload can be used to enable reloading endpoints when the configuration source changes.

By default, Kestrel configuration is loaded from the `Kestrel` section and reloading changes is enabled:

```json
{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5000"
      },
      "Https": {
        "Url": "https://localhost:5001"
      }
    }
  }
}
```

If reloading configuration is enabled and a change is signaled then the following steps are taken:

* The new configuration is compared to the old one, any endpoint without configuration changes are not modified.
* Removed or modified endpoints are given 5 seconds to complete processing requests and shut down.
* New or modified endpoints are started.

Clients connecting to a modified endpoint may be disconnected or refused while the endpoint is restarted.

## ConfigureHttpsDefaults

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults(System.Action{Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions})](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults(System.Action%7BMicrosoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions%7D)) specifies a configuration `Action` to run for each HTTPS endpoint. Calling `ConfigureHttpsDefaults` multiple times replaces prior `Action`s with the last `Action` specified.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureHttpsDefaults"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

> **Note:**
> Endpoints created by calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) **before** calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults%252A) won't have the defaults applied.

## ListenOptions.UseHttps

Configure Kestrel to use HTTPS.

`ListenOptions.UseHttps` extensions:

* `UseHttps`: Configure Kestrel to use HTTPS with the default certificate. Throws an exception if no default certificate is configured.
* `UseHttps(string fileName)`
* `UseHttps(string fileName, string password)`
* `UseHttps(string fileName, string password, Action<HttpsConnectionAdapterOptions> configureOptions)`
* `UseHttps(StoreName storeName, string subject)`
* `UseHttps(StoreName storeName, string subject, bool allowInvalid)`
* `UseHttps(StoreName storeName, string subject, bool allowInvalid, StoreLocation location)`
* `UseHttps(StoreName storeName, string subject, bool allowInvalid, StoreLocation location, Action<HttpsConnectionAdapterOptions> configureOptions)`
* `UseHttps(X509Certificate2 serverCertificate)`
* `UseHttps(X509Certificate2 serverCertificate, Action<HttpsConnectionAdapterOptions> configureOptions)`
* `UseHttps(Action<HttpsConnectionAdapterOptions> configureOptions)`

`ListenOptions.UseHttps` parameters:

* `filename` is the path and file name of a certificate file, relative to the directory that contains the app's content files.
* `password` is the password required to access the X.509 certificate data.
* `configureOptions` is an `Action` to configure the `HttpsConnectionAdapterOptions`. Returns the `ListenOptions`.
* `storeName` is the certificate store from which to load the certificate.
* `subject` is the subject name for the certificate.
* `allowInvalid` indicates if invalid certificates should be considered, such as self-signed certificates.
* `location` is the store location to load the certificate from.
* `serverCertificate` is the X.509 certificate.

In production, HTTPS must be explicitly configured. At a minimum, a default certificate must be provided.

If certificates are being read from disk, as opposed to a [Windows Certificate Store](https://learn.microsoft.com/windows-hardware/drivers/install/certificate-stores), the containing directory must have appropriate permissions to prevent unauthorized access.

Supported configurations described next:

* No configuration
* Replace the default certificate from configuration
* Change the defaults in code

### No configuration

Kestrel listens on `http://localhost:5000`.

<a name="configuration"></a>

### Replace the default certificate from configuration

A default HTTPS app settings configuration schema is available for Kestrel. Configure multiple endpoints, including the URLs and the certificates to use, either from a file on disk or from a certificate store.

In the following `appsettings.json` example:

* Set `AllowInvalid` to `true` to permit the use of invalid certificates (for example, self-signed certificates).
* Any HTTPS endpoint that doesn't specify a certificate (`HttpsDefaultCert` in the example that follows) falls back to the cert defined under `Certificates:Default` or the development certificate.

```json
{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5000"
      },
      "HttpsInlineCertFile": {
        "Url": "https://localhost:5001",
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      },
      "HttpsInlineCertAndKeyFile": {
        "Url": "https://localhost:5002",
        "Certificate": {
          "Path": "<path to .pem/.crt file>",
          "KeyPath": "<path to .key file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      },
      "HttpsInlineCertStore": {
        "Url": "https://localhost:5003",
        "Certificate": {
          "Subject": "<subject; required>",
          "Store": "<certificate store; required>",
          "Location": "<location; defaults to CurrentUser>",
          "AllowInvalid": "<true or false; defaults to false>"
        }
      },
      "HttpsDefaultCert": {
        "Url": "https://localhost:5004"
      }
    },
    "Certificates": {
      "Default": {
        "Path": "<path to .pfx file>",
        "Password": "$CREDENTIAL_PLACEHOLDER$"
      }
    }
  }
}
```

> **Warning:**
> In the preceding example, certificate passwords are stored in plain-text in `appsettings.json`. The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for each certificate's password. To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md). To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md). Development secrets shouldn't be used for production or test.

Schema notes:

* Endpoints names are [case-insensitive](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23configuration-keys-and-values). For example, `HTTPS` and `Https` are equivalent.
* The `Url` parameter is required for each endpoint. The format for this parameter is the same as the top-level `Urls` configuration parameter except that it's limited to a single value.
* These endpoints replace those defined in the top-level `Urls` configuration rather than adding to them. Endpoints defined in code via `Listen` are cumulative with the endpoints defined in the configuration section.
* The `Certificate` section is optional. If the `Certificate` section isn't specified, the defaults defined in `Certificates:Default` are used. If no defaults are available, the development certificate is used. If there are no defaults and the development certificate isn't present, the server throws an exception and fails to start.
* The `Certificate` section supports multiple [certificate sources](#certificate-sources).
* Any number of endpoints may be defined in [Configuration](../../configuration/index.md) as long as they don't cause port conflicts.

#### Certificate sources

Certificate nodes can be configured to load certificates from a number of sources:

* `Path` and `Password` to load *.pfx* files.
* `Path`, `KeyPath` and `Password` to load *.pem*/*.crt* and *.key* files.
* `Subject` and `Store` to load from the certificate store.

For example, the `Certificates:Default` certificate can be specified as:

```json
"Default": {
  "Subject": "<subject; required>",
  "Store": "<cert store; required>",
  "Location": "<location; defaults to CurrentUser>",
  "AllowInvalid": "<true or false; defaults to false>"
}
```

#### ConfigurationLoader

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration)) returns a [Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader) with an [Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader.Endpoint(System.String,System.Action{Microsoft.AspNetCore.Server.Kestrel.EndpointConfiguration})](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader.Endpoint(System.String%2CSystem.Action%7BMicrosoft.AspNetCore.Server.Kestrel.EndpointConfiguration%7D)) method that can be used to supplement a configured endpoint's settings:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigurationLoader"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

`KestrelServerOptions.ConfigurationLoader` can be directly accessed to continue iterating on the existing loader, such as the one provided by [Microsoft.AspNetCore.Builder.WebApplicationBuilder.WebHost%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder.WebHost%252A).

* The configuration section for each endpoint is available on the options in the `Endpoint` method so that custom settings may be read.
* Multiple configurations may be loaded by calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration)) again with another section. Only the last configuration is used, unless `Load` is explicitly called on prior instances. The metapackage doesn't call `Load` so that its default configuration section may be replaced.
* `KestrelConfigurationLoader` mirrors the `Listen` family of APIs from `KestrelServerOptions` as `Endpoint` overloads, so code and config endpoints may be configured in the same place. These overloads don't use names and only consume default settings from configuration.

### Change the defaults in code

`ConfigureEndpointDefaults` and `ConfigureHttpsDefaults` can be used to change default settings for `ListenOptions` and `HttpsConnectionAdapterOptions`, including overriding the default certificate specified in the prior scenario. `ConfigureEndpointDefaults` and `ConfigureHttpsDefaults` should be called before any endpoints are configured.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureEndpointDefaultsConfigureHttpsDefaults"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## Configure endpoints using Server Name Indication

[Server Name Indication (SNI)](https://tools.ietf.org/html/rfc6066#section-3) can be used to host multiple domains on the same IP address and port. For SNI to function, the client sends the host name for the secure session to the server during the TLS handshake so that the server can provide the correct certificate. The client uses the furnished certificate for encrypted communication with the server during the secure session that follows the TLS handshake.

SNI can be configured in two ways:

* Create an endpoint in code and select a certificate using the host name with the [Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.ServerCertificateSelector%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.ServerCertificateSelector%252A) callback.
* Configure a mapping between host names and HTTPS options in [Configuration](../../configuration/index.md). For example, JSON in  the `appsettings.json` file.

### SNI with `ServerCertificateSelector`

Kestrel supports SNI via the `ServerCertificateSelector` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ServerCertificateSelector"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

### SNI with `ServerOptionsSelectionCallback`

Kestrel supports additional dynamic TLS configuration via the `ServerOptionsSelectionCallback` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate and TLS configuration. Default certificates and `ConfigureHttpsDefaults` are not used with this callback.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ServerOptionsSelectionCallback"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

### SNI with `TlsHandshakeCallbackOptions`

Kestrel supports additional dynamic TLS configuration via the `TlsHandshakeCallbackOptions.OnConnection` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate, TLS configuration, and other server options. Default certificates and `ConfigureHttpsDefaults` are not used with this callback.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_TlsHandshakeCallbackOptions"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

### SNI in configuration

Kestrel supports SNI defined in configuration. An endpoint can be configured with an `Sni` object that contains a mapping between host names and HTTPS options. The connection host name is matched to the options and they are used for that connection.

The following configuration adds an endpoint named `MySniEndpoint` that uses SNI to select HTTPS options based on the host name:

```json
{
  "Kestrel": {
    "Endpoints": {
      "MySniEndpoint": {
        "Url": "https://*",
        "SslProtocols": ["Tls11", "Tls12"],
        "Sni": {
          "a.example.org": {
            "Protocols": "Http1AndHttp2",
            "SslProtocols": ["Tls11", "Tls12", "Tls13"],
            "Certificate": {
              "Subject": "<subject; required>",
              "Store": "<certificate store; required>",
            },
            "ClientCertificateMode" : "NoCertificate"
          },
          "*.example.org": {
            "Certificate": {
              "Path": "<path to .pfx file>",
              "Password": "$CREDENTIAL_PLACEHOLDER$"
            }
          },
          "*": {
            // At least one subproperty needs to exist per SNI section or it
            // cannot be discovered via IConfiguration
            "Protocols": "Http1",
          }
        }
      }
    },
    "Certificates": {
      "Default": {
        "Path": "<path to .pfx file>",
        "Password": "$CREDENTIAL_PLACEHOLDER$"
      }
    }
  }
}
```

> **Warning:**
> In the preceding example, certificate passwords are stored in plain-text in `appsettings.json`. The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for each certificate's password. To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md). To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md). Development secrets shouldn't be used for production or test.

HTTPS options that can be overridden by SNI:

* `Certificate` configures the [certificate source](#certificate-sources).
* `Protocols` configures the allowed [HTTP protocols](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols).
* `SslProtocols` configures the allowed [SSL protocols](https://learn.microsoft.com/search/?terms=System.Security.Authentication.SslProtocols).
* `ClientCertificateMode` configures the [client certificate requirements](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode).

The host name supports wildcard matching:

* Exact match. For example, `a.example.org` matches `a.example.org`.
* Wildcard prefix. If there are multiple wildcard matches then the longest pattern is chosen. For example, `*.example.org` matches `b.example.org` and `c.example.org`.
* Full wildcard. `*` matches everything else, including clients that aren't using SNI and don't send a host name.

The matched SNI configuration is applied to the endpoint for the connection, overriding values on the endpoint. If a connection doesn't match a configured SNI host name then the connection is refused.

### SNI requirements

All websites must run on the same Kestrel instance. Kestrel doesn't support sharing an IP address and port across multiple instances without a reverse proxy.

## SSL/TLS Protocols

SSL Protocols are protocols used for encrypting and decrypting traffic between two peers, traditionally a client and a server.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureHttpsDefaultsSslProtocols"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

```json
{
  "Kestrel": {
    "Endpoints": {
      "MyHttpsEndpoint": {
        "Url": "https://localhost:5001",
        "SslProtocols": ["Tls12", "Tls13"],
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      }
    }
  }
}
```

> **Warning:**
> In the preceding example, the certificate password is stored in plain-text in `appsettings.json`. The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for the certificate's password. To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md). To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md). Development secrets shouldn't be used for production or test.

The default value, `SslProtocols.None`, causes Kestrel to use the operating system defaults to choose the best protocol. Unless you have a specific reason to select a protocol, use the default.

## Client Certificates

`ClientCertificateMode` configures the [client certificate requirements](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode).

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureHttpsDefaultsClientCertificateMode"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

```json
{
  "Kestrel": {
    "Endpoints": {
      "MyHttpsEndpoint": {
        "Url": "https://localhost:5001",
        "ClientCertificateMode": "AllowCertificate",
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      }
    }
  }
}
```

> **Warning:**
> In the preceding example, the certificate password is stored in plain-text in `appsettings.json`. The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for the certificate's password. To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md). To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md).

The default value is `ClientCertificateMode.NoCertificate` where Kestrel will not request or require a certificate from the client.

For more information, see [security/authentication/certauth](../../../security/authentication/certauth.md).

## Connection logging

Call [Microsoft.AspNetCore.Hosting.ListenOptionsConnectionLoggingExtensions.UseConnectionLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.ListenOptionsConnectionLoggingExtensions.UseConnectionLogging%252A) to emit Debug level logs for byte-level communication on a connection. Connection logging is helpful for troubleshooting problems in low-level communication, such as during TLS encryption and behind proxies. If `UseConnectionLogging` is placed before `UseHttps`, encrypted traffic is logged. If `UseConnectionLogging` is placed after `UseHttps`, decrypted traffic is logged. This is built-in [connection middleware](#connection-middleware).

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelUseConnectionLogging"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## Bind to a TCP socket

The [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) method binds to a TCP socket, and an options lambda permits X.509 certificate configuration:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_Listen"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

The example configures HTTPS for an endpoint with [Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions). Use the same API to configure other Kestrel settings for specific endpoints.

On Windows, self-signed certificates can be created by using the [New-SelfSignedCertificate PowerShell cmdlet](https://learn.microsoft.com/powershell/module/pki/new-selfsignedcertificate). For an unsupported example, see the [UpdateIISExpressSSLForChrome.ps1](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/includes/make-x509-cert/UpdateIISExpressSSLForChrome.ps1) certificate file on GitHub.

On macOS, Linux, and Windows, create certificates can be created by using [OpenSSL](https://www.openssl.org/).


## Bind to a Unix socket

Listen on a Unix socket with [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%252A) for improved performance with Nginx, as shown in this example:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ListenUnixSocket"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

* In the Nginx configuration file, set the `server` > `location` > `proxy_pass` entry to `http://unix:/tmp/{KESTREL SOCKET}:/;`. `{KESTREL SOCKET}` is the name of the socket provided to [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%252A) (for example, `kestrel-test.sock` in the preceding example).
* Ensure that the socket is writeable by Nginx (for example, `chmod go+w /tmp/kestrel-test.sock`).

## Port 0

When the port number `0` is specified, Kestrel dynamically binds to an available port. The following example shows how to determine which port Kestrel bound at runtime:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_IServerAddressesFeature"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

Dynamically binding a port isn't available in some situations:

* `ListenLocalhost`
* Binding TCP-based HTTP/1.1 or HTTP/2, and QUIC-based HTTP/3 together.

## Limitations

Configure endpoints with the following approaches:

* [Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls%252A)
* `--urls` command-line argument
* `urls` host configuration key
* `ASPNETCORE_URLS` environment variable

These methods are useful for making code work with servers other than Kestrel. However, be aware of the following limitations:

* HTTPS can't be used with these approaches unless a default certificate is provided in the HTTPS endpoint configuration (for example, using `KestrelServerOptions` configuration or a configuration file as shown earlier in this article).
* When both the `Listen` and `UseUrls` approaches are used simultaneously, the `Listen` endpoints override the `UseUrls` endpoints.

## IIS endpoint configuration

When using IIS, the URL bindings for IIS override bindings are set by either `Listen` or `UseUrls`. For more information, see [ASP.NET Core Module](../../../host-and-deploy/aspnet-core-module.md).

## ListenOptions.Protocols

The `Protocols` property establishes the HTTP protocols (`HttpProtocols`) enabled on a connection endpoint or for the server. Assign a value to the `Protocols` property from the `HttpProtocols` enum.

| `HttpProtocols` enum value | Connection protocol permitted |
| --- | --- |
| `Http1` | HTTP/1.1 only. Can be used with or without TLS. |
| `Http2` | HTTP/2 only. May be used without TLS only if the client supports a [Prior Knowledge mode](https://tools.ietf.org/html/rfc7540#section-3.4). |
| `Http3` | HTTP/3 only. Requires TLS. The client may need to be configured to use HTTP/3 only. |
| `Http1AndHttp2` | HTTP/1.1 and HTTP/2. HTTP/2 requires the client to select HTTP/2 in the TLS [Application-Layer Protocol Negotiation (ALPN)](https://tools.ietf.org/html/rfc7301#section-3) handshake; otherwise, the connection defaults to HTTP/1.1. |
| `Http1AndHttp2AndHttp3` | HTTP/1.1, HTTP/2 and HTTP/3. The first client request normally uses HTTP/1.1 or HTTP/2, and the [`alt-svc` response header](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Fhttp3%23alt-svc) prompts the client to upgrade to HTTP/3. HTTP/2 and HTTP/3 requires TLS; otherwise, the connection defaults to HTTP/1.1. |

The default `ListenOptions.Protocols` value for any endpoint is `HttpProtocols.Http1AndHttp2`.

TLS restrictions for HTTP/2:

* TLS version 1.2 or later
* Renegotiation disabled
* Compression disabled
* Minimum ephemeral key exchange sizes:
  * Elliptic curve Diffie-Hellman (ECDHE) &lbrack;[RFC4492](https://www.ietf.org/rfc/rfc4492.txt)&rbrack;: 224 bits minimum
  * Finite field Diffie-Hellman (DHE) &lbrack;`TLS12`&rbrack;: 2048 bits minimum
* Cipher suite not prohibited. 

`TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256` &lbrack;`TLS-ECDHE`&rbrack; with the P-256 elliptic curve &lbrack;`FIPS186`&rbrack; is supported by default.

The following example permits HTTP/1.1 and HTTP/2 connections on port 8000. Connections are secured by TLS with a supplied certificate:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelProtocols"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

On Linux, [System.Net.Security.CipherSuitesPolicy](https://learn.microsoft.com/search/?terms=System.Net.Security.CipherSuitesPolicy) can be used to filter TLS handshakes on a per-connection basis:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureHttpsDefaultsCipherSuitesPolicy"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## Connection middleware

Custom connection middleware can filter TLS handshakes on a per-connection basis for specific ciphers if necessary.

The following example throws [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) for any cipher algorithm that the app doesn't support. Alternatively, define and compare [Microsoft.AspNetCore.Connections.Features.ITlsHandshakeFeature.CipherAlgorithm%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Connections.Features.ITlsHandshakeFeature.CipherAlgorithm%252A) to a list of acceptable cipher suites.

No encryption is used with a [System.Security.Authentication.CipherAlgorithmType.Null](https://learn.microsoft.com/search/?terms=System.Security.Authentication.CipherAlgorithmType.Null) cipher algorithm.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelMiddleware"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## Set the HTTP protocol from configuration

By default, Kestrel configuration is loaded from the `Kestrel` section. The following `appsettings.json` example establishes HTTP/1.1 as the default connection protocol for all endpoints:

```json
{
  "Kestrel": {
    "EndpointDefaults": {
      "Protocols": "Http1"
    }
  }
}
```

The following `appsettings.json` example establishes the HTTP/1.1 connection protocol for a specific endpoint:

```json
{
  "Kestrel": {
    "Endpoints": {
      "HttpsDefaultCert": {
        "Url": "https://localhost:5001",
        "Protocols": "Http1"
      }
    }
  }
}
```

Protocols specified in code override values set by configuration.

## URL prefixes

When using `UseUrls`, `--urls` command-line argument, `urls` host configuration key, or `ASPNETCORE_URLS` environment variable, the URL prefixes can be in any of the following formats.

Only HTTP URL prefixes are valid. Kestrel doesn't support HTTPS when configuring URL bindings using `UseUrls`.

* IPv4 address with port number

  ```
  http://65.55.39.10:80/
  ```

  `0.0.0.0` is a special case that binds to all IPv4 addresses.

* IPv6 address with port number

  ```
  http://[0:0:0:0:0:ffff:4137:270a]:80/
  ```

  `[::]` is the IPv6 equivalent of IPv4 `0.0.0.0`.

* Host name with port number

  ```
  http://contoso.com:80/
  http://*:80/
  ```

  Host names, `*`, and `+`, aren't special. Anything not recognized as a valid IP address or `localhost` binds to all IPv4 and IPv6 IPs. To bind different host names to different ASP.NET Core apps on the same port, use [HTTP.sys](../httpsys.md) or a reverse proxy server. Reverse proxy server examples include IIS, Nginx, or Apache.

  > **Warning:**
  > Hosting in a reverse proxy configuration requires [host filtering](host-filtering.md).

* Host `localhost` name with port number or loopback IP with port number

  ```
  http://localhost:5000/
  http://127.0.0.1:5000/
  http://[::1]:5000/
  ```

  When `localhost` is specified, Kestrel attempts to bind to both IPv4 and IPv6 loopback interfaces. If the requested port is in use by another service on either loopback interface, Kestrel fails to start. If either loopback interface is unavailable for any other reason (most commonly because IPv6 isn't supported), Kestrel logs a warning.



**Applies to: \= aspnetcore-6.0**

ASP.NET Core projects are configured to bind to a random HTTP port between 5000-5300 and a random HTTPS port between 7000-7300. This default configuration is specified in the generated `Properties/launchSettings.json` file and can be overridden. If no ports are specified, Kestrel binds to:

* `http://localhost:5000`
* `https://localhost:5001` (when a local development certificate is present)

Specify URLs using the:

* `ASPNETCORE_URLS` environment variable.
* `--urls` command-line argument.
* `urls` host configuration key.
* [Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls%252A) extension method.

The value provided using these approaches can be one or more HTTP and HTTPS endpoints (HTTPS if a default cert is available). Configure the value as a semicolon-separated list (for example, `"Urls": "http://localhost:8000;http://localhost:8001"`).

For more information on these approaches, see [Server URLs](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fweb-host%23server-urls) and [Override configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fweb-host%23override-configuration).

A development certificate is created:

* When the [.NET SDK](https://learn.microsoft.com/dotnet/core/sdk) is installed.
* The [dev-certs tool](https://learn.microsoft.com/dotnet/core/tools/dotnet-dev-certs) is used to create a certificate.

The development certificate is available only for the user that generates the certificate. Some browsers require granting explicit permission to trust the local development certificate.

Project templates configure apps to run on HTTPS by default and include [HTTPS redirection and HSTS support](../../../security/enforcing-ssl.md).

Call [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) or [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%252A) methods on [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions) to configure URL prefixes and ports for Kestrel.

`UseUrls`, the `--urls` command-line argument, `urls` host configuration key, and the `ASPNETCORE_URLS` environment variable also work but have the limitations noted later in this section (a default certificate must be available for HTTPS endpoint configuration).

`KestrelServerOptions` configuration:

## ConfigureEndpointDefaults

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults(System.Action{Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions})](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults(System.Action%7BMicrosoft.AspNetCore.Server.Kestrel.Core.ListenOptions%7D)) specifies a configuration `Action` to run for each specified endpoint. Calling `ConfigureEndpointDefaults` multiple times replaces prior `Action`s with the last `Action` specified:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureEndpointDefaults"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

> **Note:**
> Endpoints created by calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) **before** calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults%252A) won't have the defaults applied.

## Configure(IConfiguration)

Enables Kestrel to load endpoints from an [Microsoft.Extensions.Configuration.IConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration). The configuration must be scoped to the configuration section for Kestrel. The `Configure(IConfiguration, bool)` overload can be used to enable reloading endpoints when the configuration source changes.

By default, Kestrel configuration is loaded from the `Kestrel` section and reloading changes is enabled:

```json
{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5000"
      },
      "Https": {
        "Url": "https://localhost:5001"
      }
    }
  }
}
```

If reloading configuration is enabled and a change is signaled then the following steps are taken:

* The new configuration is compared to the old one, any endpoint without configuration changes are not modified.
* Removed or modified endpoints are given 5 seconds to complete processing requests and shut down.
* New or modified endpoints are started.

Clients connecting to a modified endpoint may be disconnected or refused while the endpoint is restarted.

## ConfigureHttpsDefaults

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults(System.Action{Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions})](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults(System.Action%7BMicrosoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions%7D)) specifies a configuration `Action` to run for each HTTPS endpoint. Calling `ConfigureHttpsDefaults` multiple times replaces prior `Action`s with the last `Action` specified.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureHttpsDefaults"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

> **Note:**
> Endpoints created by calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) **before** calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults%252A) won't have the defaults applied.

## ListenOptions.UseHttps

Configure Kestrel to use HTTPS.

`ListenOptions.UseHttps` extensions:

* `UseHttps`: Configure Kestrel to use HTTPS with the default certificate. Throws an exception if no default certificate is configured.
* `UseHttps(string fileName)`
* `UseHttps(string fileName, string password)`
* `UseHttps(string fileName, string password, Action<HttpsConnectionAdapterOptions> configureOptions)`
* `UseHttps(StoreName storeName, string subject)`
* `UseHttps(StoreName storeName, string subject, bool allowInvalid)`
* `UseHttps(StoreName storeName, string subject, bool allowInvalid, StoreLocation location)`
* `UseHttps(StoreName storeName, string subject, bool allowInvalid, StoreLocation location, Action<HttpsConnectionAdapterOptions> configureOptions)`
* `UseHttps(X509Certificate2 serverCertificate)`
* `UseHttps(X509Certificate2 serverCertificate, Action<HttpsConnectionAdapterOptions> configureOptions)`
* `UseHttps(Action<HttpsConnectionAdapterOptions> configureOptions)`

`ListenOptions.UseHttps` parameters:

* `filename` is the path and file name of a certificate file, relative to the directory that contains the app's content files.
* `password` is the password required to access the X.509 certificate data.
* `configureOptions` is an `Action` to configure the `HttpsConnectionAdapterOptions`. Returns the `ListenOptions`.
* `storeName` is the certificate store from which to load the certificate.
* `subject` is the subject name for the certificate.
* `allowInvalid` indicates if invalid certificates should be considered, such as self-signed certificates.
* `location` is the store location to load the certificate from.
* `serverCertificate` is the X.509 certificate.

In production, HTTPS must be explicitly configured. At a minimum, a default certificate must be provided.

Supported configurations described next:

* No configuration
* Replace the default certificate from configuration
* Change the defaults in code

### No configuration

Kestrel listens on `http://localhost:5000` and `https://localhost:5001` (if a default cert is available).

<a name="configuration"></a>

### Replace the default certificate from configuration

A default HTTPS app settings configuration schema is available for Kestrel. Configure multiple endpoints, including the URLs and the certificates to use, either from a file on disk or from a certificate store.

In the following `appsettings.json` example:

* Set `AllowInvalid` to `true` to permit the use of invalid certificates (for example, self-signed certificates).
* Any HTTPS endpoint that doesn't specify a certificate (`HttpsDefaultCert` in the example that follows) falls back to the cert defined under `Certificates:Default` or the development certificate.

```json
{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5000"
      },
      "HttpsInlineCertFile": {
        "Url": "https://localhost:5001",
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      },
      "HttpsInlineCertAndKeyFile": {
        "Url": "https://localhost:5002",
        "Certificate": {
          "Path": "<path to .pem/.crt file>",
          "KeyPath": "<path to .key file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      },
      "HttpsInlineCertStore": {
        "Url": "https://localhost:5003",
        "Certificate": {
          "Subject": "<subject; required>",
          "Store": "<certificate store; required>",
          "Location": "<location; defaults to CurrentUser>",
          "AllowInvalid": "<true or false; defaults to false>"
        }
      },
      "HttpsDefaultCert": {
        "Url": "https://localhost:5004"
      }
    },
    "Certificates": {
      "Default": {
        "Path": "<path to .pfx file>",
        "Password": "$CREDENTIAL_PLACEHOLDER$"
      }
    }
  }
}
```

> **Warning:**
> In the preceding example, certificate passwords are stored in plain-text in `appsettings.json`. The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for each certificate's password. To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md). To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md). Development secrets shouldn't be used for production or test.

Schema notes:

* Endpoints names are [case-insensitive](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23configuration-keys-and-values). For example, `HTTPS` and `Https` are equivalent.
* The `Url` parameter is required for each endpoint. The format for this parameter is the same as the top-level `Urls` configuration parameter except that it's limited to a single value.
* These endpoints replace those defined in the top-level `Urls` configuration rather than adding to them. Endpoints defined in code via `Listen` are cumulative with the endpoints defined in the configuration section.
* The `Certificate` section is optional. If the `Certificate` section isn't specified, the defaults defined in `Certificates:Default` are used. If no defaults are available, the development certificate is used. If there are no defaults and the development certificate isn't present, the server throws an exception and fails to start.
* The `Certificate` section supports multiple [certificate sources](#certificate-sources).
* Any number of endpoints may be defined in [Configuration](../../configuration/index.md) as long as they don't cause port conflicts.

#### Certificate sources

Certificate nodes can be configured to load certificates from a number of sources:

* `Path` and `Password` to load *.pfx* files.
* `Path`, `KeyPath` and `Password` to load *.pem*/*.crt* and *.key* files.
* `Subject` and `Store` to load from the certificate store.

For example, the `Certificates:Default` certificate can be specified as:

```json
"Default": {
  "Subject": "<subject; required>",
  "Store": "<cert store; required>",
  "Location": "<location; defaults to CurrentUser>",
  "AllowInvalid": "<true or false; defaults to false>"
}
```

#### ConfigurationLoader

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration)) returns a [Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader) with an [Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader.Endpoint(System.String,System.Action{Microsoft.AspNetCore.Server.Kestrel.EndpointConfiguration})](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader.Endpoint(System.String%2CSystem.Action%7BMicrosoft.AspNetCore.Server.Kestrel.EndpointConfiguration%7D)) method that can be used to supplement a configured endpoint's settings:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigurationLoader"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

`KestrelServerOptions.ConfigurationLoader` can be directly accessed to continue iterating on the existing loader, such as the one provided by [Microsoft.AspNetCore.Builder.WebApplicationBuilder.WebHost%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.WebApplicationBuilder.WebHost%252A).

* The configuration section for each endpoint is available on the options in the `Endpoint` method so that custom settings may be read.
* Multiple configurations may be loaded by calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration)](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration)) again with another section. Only the last configuration is used, unless `Load` is explicitly called on prior instances. The metapackage doesn't call `Load` so that its default configuration section may be replaced.
* `KestrelConfigurationLoader` mirrors the `Listen` family of APIs from `KestrelServerOptions` as `Endpoint` overloads, so code and config endpoints may be configured in the same place. These overloads don't use names and only consume default settings from configuration.

### Change the defaults in code

`ConfigureEndpointDefaults` and `ConfigureHttpsDefaults` can be used to change default settings for `ListenOptions` and `HttpsConnectionAdapterOptions`, including overriding the default certificate specified in the prior scenario. `ConfigureEndpointDefaults` and `ConfigureHttpsDefaults` should be called before any endpoints are configured.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureEndpointDefaultsConfigureHttpsDefaults"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## Configure endpoints using Server Name Indication

[Server Name Indication (SNI)](https://tools.ietf.org/html/rfc6066#section-3) can be used to host multiple domains on the same IP address and port. For SNI to function, the client sends the host name for the secure session to the server during the TLS handshake so that the server can provide the correct certificate. The client uses the furnished certificate for encrypted communication with the server during the secure session that follows the TLS handshake.

SNI can be configured in two ways:

* Create an endpoint in code and select a certificate using the host name with the [Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.ServerCertificateSelector%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.ServerCertificateSelector%252A) callback.
* Configure a mapping between host names and HTTPS options in [Configuration](../../configuration/index.md). For example, JSON in  the `appsettings.json` file.

### SNI with `ServerCertificateSelector`

Kestrel supports SNI via the `ServerCertificateSelector` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ServerCertificateSelector"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

### SNI with `ServerOptionsSelectionCallback`

Kestrel supports additional dynamic TLS configuration via the `ServerOptionsSelectionCallback` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate and TLS configuration. Default certificates and `ConfigureHttpsDefaults` are not used with this callback.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ServerOptionsSelectionCallback"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

### SNI with `TlsHandshakeCallbackOptions`

Kestrel supports additional dynamic TLS configuration via the `TlsHandshakeCallbackOptions.OnConnection` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate, TLS configuration, and other server options. Default certificates and `ConfigureHttpsDefaults` are not used with this callback.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_TlsHandshakeCallbackOptions"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

### SNI in configuration

Kestrel supports SNI defined in configuration. An endpoint can be configured with an `Sni` object that contains a mapping between host names and HTTPS options. The connection host name is matched to the options and they are used for that connection.

The following configuration adds an endpoint named `MySniEndpoint` that uses SNI to select HTTPS options based on the host name:

```json
{
  "Kestrel": {
    "Endpoints": {
      "MySniEndpoint": {
        "Url": "https://*",
        "SslProtocols": ["Tls11", "Tls12"],
        "Sni": {
          "a.example.org": {
            "Protocols": "Http1AndHttp2",
            "SslProtocols": ["Tls11", "Tls12", "Tls13"],
            "Certificate": {
              "Subject": "<subject; required>",
              "Store": "<certificate store; required>",
            },
            "ClientCertificateMode" : "NoCertificate"
          },
          "*.example.org": {
            "Certificate": {
              "Path": "<path to .pfx file>",
              "Password": "$CREDENTIAL_PLACEHOLDER$"
            }
          },
          "*": {
            // At least one subproperty needs to exist per SNI section or it
            // cannot be discovered via IConfiguration
            "Protocols": "Http1",
          }
        }
      }
    },
    "Certificates": {
      "Default": {
        "Path": "<path to .pfx file>",
        "Password": "$CREDENTIAL_PLACEHOLDER$"
      }
    }
  }
}
```

> **Warning:**
> In the preceding example, certificate passwords are stored in plain-text in `appsettings.json`. The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for each certificate's password. To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md). To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md). Development secrets shouldn't be used for production or test.

HTTPS options that can be overridden by SNI:

* `Certificate` configures the [certificate source](#certificate-sources).
* `Protocols` configures the allowed [HTTP protocols](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols).
* `SslProtocols` configures the allowed [SSL protocols](https://learn.microsoft.com/search/?terms=System.Security.Authentication.SslProtocols).
* `ClientCertificateMode` configures the [client certificate requirements](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode).

The host name supports wildcard matching:

* Exact match. For example, `a.example.org` matches `a.example.org`.
* Wildcard prefix. If there are multiple wildcard matches then the longest pattern is chosen. For example, `*.example.org` matches `b.example.org` and `c.example.org`.
* Full wildcard. `*` matches everything else, including clients that aren't using SNI and don't send a host name.

The matched SNI configuration is applied to the endpoint for the connection, overriding values on the endpoint. If a connection doesn't match a configured SNI host name then the connection is refused.

### SNI requirements

All websites must run on the same Kestrel instance. Kestrel doesn't support sharing an IP address and port across multiple instances without a reverse proxy.

## SSL/TLS Protocols

SSL Protocols are protocols used for encrypting and decrypting traffic between two peers, traditionally a client and a server.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureHttpsDefaultsSslProtocols"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

```json
{
  "Kestrel": {
    "Endpoints": {
      "MyHttpsEndpoint": {
        "Url": "https://localhost:5001",
        "SslProtocols": ["Tls12", "Tls13"],
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      }
    }
  }
}
```

> **Warning:**
> In the preceding example, the certificate password is stored in plain-text in `appsettings.json`. The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for the certificate's password. To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md). To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md). Development secrets shouldn't be used for production or test.

The default value, `SslProtocols.None`, causes Kestrel to use the operating system defaults to choose the best protocol. Unless you have a specific reason to select a protocol, use the default.

## Client Certificates

`ClientCertificateMode` configures the [client certificate requirements](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode).

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureHttpsDefaultsClientCertificateMode"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

```json
{
  "Kestrel": {
    "Endpoints": {
      "MyHttpsEndpoint": {
        "Url": "https://localhost:5001",
        "ClientCertificateMode": "AllowCertificate",
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      }
    }
  }
}
```

> **Warning:**
> In the preceding example, the certificate password is stored in plain-text in `appsettings.json`. The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for the certificate's password. To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md). To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md).

The default value is `ClientCertificateMode.NoCertificate` where Kestrel will not request or require a certificate from the client.

For more information, see [security/authentication/certauth](../../../security/authentication/certauth.md).

## Connection logging

Call [Microsoft.AspNetCore.Hosting.ListenOptionsConnectionLoggingExtensions.UseConnectionLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.ListenOptionsConnectionLoggingExtensions.UseConnectionLogging%252A) to emit Debug level logs for byte-level communication on a connection. Connection logging is helpful for troubleshooting problems in low-level communication, such as during TLS encryption and behind proxies. If `UseConnectionLogging` is placed before `UseHttps`, encrypted traffic is logged. If `UseConnectionLogging` is placed after `UseHttps`, decrypted traffic is logged. This is built-in [connection middleware](#connection-middleware).

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelUseConnectionLogging"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## Bind to a TCP socket

The [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) method binds to a TCP socket, and an options lambda permits X.509 certificate configuration:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_Listen"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

The example configures HTTPS for an endpoint with [Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions). Use the same API to configure other Kestrel settings for specific endpoints.

On Windows, self-signed certificates can be created by using the [New-SelfSignedCertificate PowerShell cmdlet](https://learn.microsoft.com/powershell/module/pki/new-selfsignedcertificate). For an unsupported example, see the [UpdateIISExpressSSLForChrome.ps1](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/includes/make-x509-cert/UpdateIISExpressSSLForChrome.ps1) certificate file on GitHub.

On macOS, Linux, and Windows, create certificates can be created by using [OpenSSL](https://www.openssl.org/).


## Bind to a Unix socket

Listen on a Unix socket with [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%252A) for improved performance with Nginx, as shown in this example:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ListenUnixSocket"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

* In the Nginx configuration file, set the `server` > `location` > `proxy_pass` entry to `http://unix:/tmp/{KESTREL SOCKET}:/;`. `{KESTREL SOCKET}` is the name of the socket provided to [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%252A) (for example, `kestrel-test.sock` in the preceding example).
* Ensure that the socket is writeable by Nginx (for example, `chmod go+w /tmp/kestrel-test.sock`).

## Port 0

When the port number `0` is specified, Kestrel dynamically binds to an available port. The following example shows how to determine which port Kestrel bound at runtime:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_IServerAddressesFeature"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## Limitations

Configure endpoints with the following approaches:

* [Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls%252A)
* `--urls` command-line argument
* `urls` host configuration key
* `ASPNETCORE_URLS` environment variable

These methods are useful for making code work with servers other than Kestrel. However, be aware of the following limitations:

* HTTPS can't be used with these approaches unless a default certificate is provided in the HTTPS endpoint configuration (for example, using `KestrelServerOptions` configuration or a configuration file as shown earlier in this article).
* When both the `Listen` and `UseUrls` approaches are used simultaneously, the `Listen` endpoints override the `UseUrls` endpoints.

## IIS endpoint configuration

When using IIS, the URL bindings for IIS override bindings are set by either `Listen` or `UseUrls`. For more information, see [ASP.NET Core Module](../../../host-and-deploy/aspnet-core-module.md).

## ListenOptions.Protocols

The `Protocols` property establishes the HTTP protocols (`HttpProtocols`) enabled on a connection endpoint or for the server. Assign a value to the `Protocols` property from the `HttpProtocols` enum.

| `HttpProtocols` enum value | Connection protocol permitted |
| --- | --- |
| `Http1` | HTTP/1.1 only. Can be used with or without TLS. |
| `Http2` | HTTP/2 only. May be used without TLS only if the client supports a [Prior Knowledge mode](https://tools.ietf.org/html/rfc7540#section-3.4). |
| `Http1AndHttp2` | HTTP/1.1 and HTTP/2. HTTP/2 requires the client to select HTTP/2 in the TLS [Application-Layer Protocol Negotiation (ALPN)](https://tools.ietf.org/html/rfc7301#section-3) handshake; otherwise, the connection defaults to HTTP/1.1. |

The default `ListenOptions.Protocols` value for any endpoint is `HttpProtocols.Http1AndHttp2`.

TLS restrictions for HTTP/2:

* TLS version 1.2 or later
* Renegotiation disabled
* Compression disabled
* Minimum ephemeral key exchange sizes:
  * Elliptic curve Diffie-Hellman (ECDHE) &lbrack;[RFC4492](https://www.ietf.org/rfc/rfc4492.txt)&rbrack;: 224 bits minimum
  * Finite field Diffie-Hellman (DHE) &lbrack;`TLS12`&rbrack;: 2048 bits minimum
* Cipher suite not prohibited. 

`TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256` &lbrack;`TLS-ECDHE`&rbrack; with the P-256 elliptic curve &lbrack;`FIPS186`&rbrack; is supported by default.

The following example permits HTTP/1.1 and HTTP/2 connections on port 8000. Connections are secured by TLS with a supplied certificate:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelProtocols"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

On Linux, [System.Net.Security.CipherSuitesPolicy](https://learn.microsoft.com/search/?terms=System.Net.Security.CipherSuitesPolicy) can be used to filter TLS handshakes on a per-connection basis:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureHttpsDefaultsCipherSuitesPolicy"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## Connection middleware

Custom connection middleware can filter TLS handshakes on a per-connection basis for specific ciphers if necessary.

The following example throws [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) for any cipher algorithm that the app doesn't support. Alternatively, define and compare [Microsoft.AspNetCore.Connections.Features.ITlsHandshakeFeature.CipherAlgorithm%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Connections.Features.ITlsHandshakeFeature.CipherAlgorithm%252A) to a list of acceptable cipher suites.

No encryption is used with a [System.Security.Authentication.CipherAlgorithmType.Null](https://learn.microsoft.com/search/?terms=System.Security.Authentication.CipherAlgorithmType.Null) cipher algorithm.

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs" id="snippet_ConfigureKestrelMiddleware"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/6.x/KestrelSample/Snippets/Program.cs.md)

## Set the HTTP protocol from configuration

By default, Kestrel configuration is loaded from the `Kestrel` section. The following `appsettings.json` example establishes HTTP/1.1 as the default connection protocol for all endpoints:

```json
{
  "Kestrel": {
    "EndpointDefaults": {
      "Protocols": "Http1"
    }
  }
}
```

The following `appsettings.json` example establishes the HTTP/1.1 connection protocol for a specific endpoint:

```json
{
  "Kestrel": {
    "Endpoints": {
      "HttpsDefaultCert": {
        "Url": "https://localhost:5001",
        "Protocols": "Http1"
      }
    }
  }
}
```

Protocols specified in code override values set by configuration.

## URL prefixes

When using `UseUrls`, `--urls` command-line argument, `urls` host configuration key, or `ASPNETCORE_URLS` environment variable, the URL prefixes can be in any of the following formats.

Only HTTP URL prefixes are valid. Kestrel doesn't support HTTPS when configuring URL bindings using `UseUrls`.

* IPv4 address with port number

  ```
  http://65.55.39.10:80/
  ```

  `0.0.0.0` is a special case that binds to all IPv4 addresses.

* IPv6 address with port number

  ```
  http://[0:0:0:0:0:ffff:4137:270a]:80/
  ```

  `[::]` is the IPv6 equivalent of IPv4 `0.0.0.0`.

* Host name with port number

  ```
  http://contoso.com:80/
  http://*:80/
  ```

  Host names, `*`, and `+`, aren't special. Anything not recognized as a valid IP address or `localhost` binds to all IPv4 and IPv6 IPs. To bind different host names to different ASP.NET Core apps on the same port, use [HTTP.sys](../httpsys.md) or a reverse proxy server. Reverse proxy server examples include IIS, Nginx, or Apache.

  > **Warning:**
  > Hosting in a reverse proxy configuration requires [host filtering](host-filtering.md).

* Host `localhost` name with port number or loopback IP with port number

  ```
  http://localhost:5000/
  http://127.0.0.1:5000/
  http://[::1]:5000/
  ```

  When `localhost` is specified, Kestrel attempts to bind to both IPv4 and IPv6 loopback interfaces. If the requested port is in use by another service on either loopback interface, Kestrel fails to start. If either loopback interface is unavailable for any other reason (most commonly because IPv6 isn't supported), Kestrel logs a warning.



**Applies to: < aspnetcore-6.0**

By default, ASP.NET Core binds to:

* `http://localhost:5000`
* `https://localhost:5001` (when a local development certificate is present)

Specify URLs using the:

* `ASPNETCORE_URLS` environment variable.
* `--urls` command-line argument.
* `urls` host configuration key.
* [Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls%252A) extension method.

The value provided using these approaches can be one or more HTTP and HTTPS endpoints (HTTPS if a default cert is available). Configure the value as a semicolon-separated list (for example, `"Urls": "http://localhost:8000;http://localhost:8001"`).

For more information on these approaches, see [Server URLs](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fweb-host%23server-urls) and [Override configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fhost%2Fweb-host%23override-configuration).

A development certificate is created:

* When the [.NET SDK](https://learn.microsoft.com/dotnet/core/sdk) is installed.
* The [dev-certs tool](https://learn.microsoft.com/dotnet/core/tools/dotnet-dev-certs) is used to create a certificate.

Some browsers require granting explicit permission to trust the local development certificate.

Project templates configure apps to run on HTTPS by default and include [HTTPS redirection and HSTS support](../../../security/enforcing-ssl.md).

Call [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) or [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%252A) methods on [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions) to configure URL prefixes and ports for Kestrel.

`UseUrls`, the `--urls` command-line argument, `urls` host configuration key, and the `ASPNETCORE_URLS` environment variable also work but have the limitations noted later in this section (a default certificate must be available for HTTPS endpoint configuration).

`KestrelServerOptions` configuration:

## ConfigureEndpointDefaults

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults(System.Action{Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions})](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults(System.Action%7BMicrosoft.AspNetCore.Server.Kestrel.Core.ListenOptions%7D)) specifies a configuration `Action` to run for each specified endpoint. Calling `ConfigureEndpointDefaults` multiple times replaces prior `Action`s with the last `Action` specified.

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureEndpointDefaults(listenOptions =>
    {
        // Configure endpoint defaults
    });
});
```

> **Note:**
> Endpoints created by calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) **before** calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults%252A) won't have the defaults applied.

## Configure(IConfiguration)

Enables Kestrel to load endpoints from an [Microsoft.Extensions.Configuration.IConfiguration](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.IConfiguration). The configuration must be scoped to the configuration section for Kestrel.

The `Configure(IConfiguration, bool)` overload can be used to enable reloading endpoints when the configuration source changes.

`IHostBuilder.ConfigureWebHostDefaults` calls `Configure(context.Configuration.GetSection("Kestrel"), reloadOnChange: true)` by default to load Kestrel configuration and enable reloading.

```json
{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5000"
      },
      "Https": {
        "Url": "https://localhost:5001"
      }
    }
  }
}
```

If reloading configuration is enabled and a change is signaled then the following steps are taken:

* The new configuration is compared to the old one, any endpoint without configuration changes are not modified.
* Removed or modified endpoints are given 5 seconds to complete processing requests and shut down.
* New or modified endpoints are started.

Clients connecting to a modified endpoint may be disconnected or refused while the endpoint is restarted.

## ConfigureHttpsDefaults

[Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults(System.Action{Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions})](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults(System.Action%7BMicrosoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions%7D)) specifies a configuration `Action` to run for each HTTPS endpoint. Calling `ConfigureHttpsDefaults` multiple times replaces prior `Action`s with the last `Action` specified.

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureHttpsDefaults(listenOptions =>
    {
        // certificate is an X509Certificate2
        listenOptions.ServerCertificate = certificate;
    });
});
```

> **Note:**
> Endpoints created by calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) **before** calling [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults%252A) won't have the defaults applied.

## ListenOptions.UseHttps

Configure Kestrel to use HTTPS.

`ListenOptions.UseHttps` extensions:

* `UseHttps`: Configure Kestrel to use HTTPS with the default certificate. Throws an exception if no default certificate is configured.
* `UseHttps(string fileName)`
* `UseHttps(string fileName, string password)`
* `UseHttps(string fileName, string password, Action<HttpsConnectionAdapterOptions> configureOptions)`
* `UseHttps(StoreName storeName, string subject)`
* `UseHttps(StoreName storeName, string subject, bool allowInvalid)`
* `UseHttps(StoreName storeName, string subject, bool allowInvalid, StoreLocation location)`
* `UseHttps(StoreName storeName, string subject, bool allowInvalid, StoreLocation location, Action<HttpsConnectionAdapterOptions> configureOptions)`
* `UseHttps(X509Certificate2 serverCertificate)`
* `UseHttps(X509Certificate2 serverCertificate, Action<HttpsConnectionAdapterOptions> configureOptions)`
* `UseHttps(Action<HttpsConnectionAdapterOptions> configureOptions)`

`ListenOptions.UseHttps` parameters:

* `filename` is the path and file name of a certificate file, relative to the directory that contains the app's content files.
* `password` is the password required to access the X.509 certificate data.
* `configureOptions` is an `Action` to configure the `HttpsConnectionAdapterOptions`. Returns the `ListenOptions`.
* `storeName` is the certificate store from which to load the certificate.
* `subject` is the subject name for the certificate.
* `allowInvalid` indicates if invalid certificates should be considered, such as self-signed certificates.
* `location` is the store location to load the certificate from.
* `serverCertificate` is the X.509 certificate.

In production, HTTPS must be explicitly configured. At a minimum, a default certificate must be provided.

Supported configurations described next:

* No configuration
* Replace the default certificate from configuration
* Change the defaults in code

### No configuration

Kestrel listens on `http://localhost:5000` and `https://localhost:5001` (if a default cert is available).

<a name="configuration"></a>

### Replace the default certificate from configuration

A default HTTPS app settings configuration schema is available for Kestrel. Configure multiple endpoints, including the URLs and the certificates to use, either from a file on disk or from a certificate store.

In the following `appsettings.json` example:

* Set `AllowInvalid` to `true` to permit the use of invalid certificates (for example, self-signed certificates).
* Any HTTPS endpoint that doesn't specify a certificate (`HttpsDefaultCert` in the example that follows) falls back to the cert defined under `Certificates:Default` or the development certificate.

```json
{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5000"
      },
      "HttpsInlineCertFile": {
        "Url": "https://localhost:5001",
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      },
      "HttpsInlineCertAndKeyFile": {
        "Url": "https://localhost:5002",
        "Certificate": {
          "Path": "<path to .pem/.crt file>",
          "KeyPath": "<path to .key file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      },
      "HttpsInlineCertStore": {
        "Url": "https://localhost:5003",
        "Certificate": {
          "Subject": "<subject; required>",
          "Store": "<certificate store; required>",
          "Location": "<location; defaults to CurrentUser>",
          "AllowInvalid": "<true or false; defaults to false>"
        }
      },
      "HttpsDefaultCert": {
        "Url": "https://localhost:5004"
      }
    },
    "Certificates": {
      "Default": {
        "Path": "<path to .pfx file>",
        "Password": "$CREDENTIAL_PLACEHOLDER$"
      }
    }
  }
}
```

> **Warning:**
> In the preceding example, certificate passwords are stored in plain-text in `appsettings.json`. The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for each certificate's password. To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md). To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md). Development secrets shouldn't be used for production or test.

Schema notes:

* Endpoints names are [case-insensitive](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23configuration-keys-and-values). For example, `HTTPS` and `Https` are equivalent.
* The `Url` parameter is required for each endpoint. The format for this parameter is the same as the top-level `Urls` configuration parameter except that it's limited to a single value.
* These endpoints replace those defined in the top-level `Urls` configuration rather than adding to them. Endpoints defined in code via `Listen` are cumulative with the endpoints defined in the configuration section.
* The `Certificate` section is optional. If the `Certificate` section isn't specified, the defaults defined in `Certificates:Default` are used. If no defaults are available, the development certificate is used. If there are no defaults and the development certificate isn't present, the server throws an exception and fails to start.
* The `Certificate` section supports multiple [certificate sources](#certificate-sources).
* Any number of endpoints may be defined in [Configuration](../../configuration/index.md) as long as they don't cause port conflicts.

#### Certificate sources

Certificate nodes can be configured to load certificates from a number of sources:

* `Path` and `Password` to load *.pfx* files.
* `Path`, `KeyPath` and `Password` to load *.pem*/*.crt* and *.key* files.
* `Subject` and `Store` to load from the certificate store.

For example, the `Certificates:Default` certificate can be specified as:

```json
"Default": {
  "Subject": "<subject; required>",
  "Store": "<cert store; required>",
  "Location": "<location; defaults to CurrentUser>",
  "AllowInvalid": "<true or false; defaults to false>"
}
```

#### ConfigurationLoader

`options.Configure(context.Configuration.GetSection("{SECTION}"))` returns a [Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader) with an `.Endpoint(string name, listenOptions => { })` method that can be used to supplement a configured endpoint's settings:

```csharp
webBuilder.UseKestrel((context, serverOptions) =>
{
    serverOptions.Configure(context.Configuration.GetSection("Kestrel"))
        .Endpoint("HTTPS", listenOptions =>
        {
            listenOptions.HttpsOptions.SslProtocols = SslProtocols.Tls12;
        });
});
```

`KestrelServerOptions.ConfigurationLoader` can be directly accessed to continue iterating on the existing loader, such as the one provided by [Microsoft.AspNetCore.WebHost.CreateDefaultBuilder%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.WebHost.CreateDefaultBuilder%252A).

* The configuration section for each endpoint is available on the options in the `Endpoint` method so that custom settings may be read.
* Multiple configurations may be loaded by calling `options.Configure(context.Configuration.GetSection("{SECTION}"))` again with another section. Only the last configuration is used, unless `Load` is explicitly called on prior instances. The metapackage doesn't call `Load` so that its default configuration section may be replaced.
* `KestrelConfigurationLoader` mirrors the `Listen` family of APIs from `KestrelServerOptions` as `Endpoint` overloads, so code and config endpoints may be configured in the same place. These overloads don't use names and only consume default settings from configuration.

### Change the defaults in code

`ConfigureEndpointDefaults` and `ConfigureHttpsDefaults` can be used to change default settings for `ListenOptions` and `HttpsConnectionAdapterOptions`, including overriding the default certificate specified in the prior scenario. `ConfigureEndpointDefaults` and `ConfigureHttpsDefaults` should be called before any endpoints are configured.

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureEndpointDefaults(listenOptions =>
    {
        // Configure endpoint defaults
    });

    serverOptions.ConfigureHttpsDefaults(listenOptions =>
    {
        listenOptions.SslProtocols = SslProtocols.Tls12;
    });
});
```

## Configure endpoints using Server Name Indication

[Server Name Indication (SNI)](https://tools.ietf.org/html/rfc6066#section-3) can be used to host multiple domains on the same IP address and port. For SNI to function, the client sends the host name for the secure session to the server during the TLS handshake so that the server can provide the correct certificate. The client uses the furnished certificate for encrypted communication with the server during the secure session that follows the TLS handshake.

SNI can be configured in two ways:

* Create an endpoint in code and select a certificate using the host name with the [Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.ServerCertificateSelector%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.ServerCertificateSelector%252A) callback.
* Configure a mapping between host names and HTTPS options in [Configuration](../../configuration/index.md). For example, JSON in  the `appsettings.json` file.

### SNI with `ServerCertificateSelector`

Kestrel supports SNI via the `ServerCertificateSelector` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate. The following callback code can be used in the `ConfigureWebHostDefaults` method call of a project's `Program.cs` file:

```csharp
// using System.Security.Cryptography.X509Certificates;
// using Microsoft.AspNetCore.Server.Kestrel.Https;

webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5005, listenOptions =>
    {
        listenOptions.UseHttps(httpsOptions =>
        {
            var localhostCert = CertificateLoader.LoadFromStoreCert(
                "localhost", "My", StoreLocation.CurrentUser,
                allowInvalid: true);
            var exampleCert = CertificateLoader.LoadFromStoreCert(
                "example.com", "My", StoreLocation.CurrentUser,
                allowInvalid: true);
            var subExampleCert = CertificateLoader.LoadFromStoreCert(
                "sub.example.com", "My", StoreLocation.CurrentUser,
                allowInvalid: true);
            var certs = new Dictionary<string, X509Certificate2>(StringComparer.OrdinalIgnoreCase)
            {
                { "localhost", localhostCert },
                { "example.com", exampleCert },
                { "sub.example.com", subExampleCert },
            };            

            httpsOptions.ServerCertificateSelector = (connectionContext, name) =>
            {
                if (name != null && certs.TryGetValue(name, out var cert))
                {
                    return cert;
                }

                return exampleCert;
            };
        });
    });
});
```

### SNI with `ServerOptionsSelectionCallback`

Kestrel supports additional dynamic TLS configuration via the `ServerOptionsSelectionCallback` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate and TLS configuration. Default certificates and `ConfigureHttpsDefaults` are not used with this callback.

```csharp
// using System.Security.Cryptography.X509Certificates;
// using Microsoft.AspNetCore.Server.Kestrel.Https;

webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5005, listenOptions =>
    {
        listenOptions.UseHttps(httpsOptions =>
        {
            var localhostCert = CertificateLoader.LoadFromStoreCert(
                "localhost", "My", StoreLocation.CurrentUser,
                allowInvalid: true);
            var exampleCert = CertificateLoader.LoadFromStoreCert(
                "example.com", "My", StoreLocation.CurrentUser,
                allowInvalid: true);

            listenOptions.UseHttps((stream, clientHelloInfo, state, cancellationToken) =>
            {
                if (string.Equals(clientHelloInfo.ServerName, "localhost", StringComparison.OrdinalIgnoreCase))
                {
                    return new ValueTask<SslServerAuthenticationOptions>(new SslServerAuthenticationOptions
                    {
                        ServerCertificate = localhostCert,
                        // Different TLS requirements for this host
                        ClientCertificateRequired = true,
                    });
                }

                return new ValueTask<SslServerAuthenticationOptions>(new SslServerAuthenticationOptions
                {
                    ServerCertificate = exampleCert,
                });
            }, state: null);
        });
    });
});
```

### SNI in configuration

Kestrel supports SNI defined in configuration. An endpoint can be configured with an `Sni` object that contains a mapping between host names and HTTPS options. The connection host name is matched to the options and they are used for that connection.

The following configuration adds an endpoint named `MySniEndpoint` that uses SNI to select HTTPS options based on the host name:

```json
{
  "Kestrel": {
    "Endpoints": {
      "MySniEndpoint": {
        "Url": "https://*",
        "SslProtocols": ["Tls11", "Tls12"],
        "Sni": {
          "a.example.org": {
            "Protocols": "Http1AndHttp2",
            "SslProtocols": ["Tls11", "Tls12", "Tls13"],
            "Certificate": {
              "Subject": "<subject; required>",
              "Store": "<certificate store; required>",
            },
            "ClientCertificateMode" : "NoCertificate"
          },
          "*.example.org": {
            "Certificate": {
              "Path": "<path to .pfx file>",
              "Password": "$CREDENTIAL_PLACEHOLDER$"
            }
          },
          "*": {
            // At least one subproperty needs to exist per SNI section or it
            // cannot be discovered via IConfiguration
            "Protocols": "Http1",
          }
        }
      }
    },
    "Certificates": {
      "Default": {
        "Path": "<path to .pfx file>",
        "Password": "$CREDENTIAL_PLACEHOLDER$"
      }
    }
  }
}
```

> **Warning:**
> In the preceding example, certificate passwords are stored in plain-text in `appsettings.json`. The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for each certificate's password. To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md). To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md). Development secrets shouldn't be used for production or test.

HTTPS options that can be overridden by SNI:

* `Certificate` configures the [certificate source](#certificate-sources).
* `Protocols` configures the allowed [HTTP protocols](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols).
* `SslProtocols` configures the allowed [SSL protocols](https://learn.microsoft.com/search/?terms=System.Security.Authentication.SslProtocols).
* `ClientCertificateMode` configures the [client certificate requirements](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode).

The host name supports wildcard matching:

* Exact match. For example, `a.example.org` matches `a.example.org`.
* Wildcard prefix. If there are multiple wildcard matches then the longest pattern is chosen. For example, `*.example.org` matches `b.example.org` and `c.example.org`.
* Full wildcard. `*` matches everything else, including clients that aren't using SNI and don't send a host name.

The matched SNI configuration is applied to the endpoint for the connection, overriding values on the endpoint. If a connection doesn't match a configured SNI host name then the connection is refused.

### SNI requirements

* Running on target framework `netcoreapp2.1` or later. On `net461` or later, the callback is invoked but the `name` is always `null`. The `name` is also `null` if the client doesn't provide the host name parameter in the TLS handshake.
* All websites run on the same Kestrel instance. Kestrel doesn't support sharing an IP address and port across multiple instances without a reverse proxy.

## SSL/TLS Protocols

SSL Protocols are protocols used for encrypting and decrypting traffic between two peers, traditionally a client and a server.

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureHttpsDefaults(listenOptions =>
    {
        listenOptions.SslProtocols = SslProtocols.Tls13;
    });
});
```

```json
{
  "Kestrel": {
    "Endpoints": {
      "MyHttpsEndpoint": {
        "Url": "https://localhost:5001",
        "SslProtocols": ["Tls12", "Tls13"],
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      }
    }
  }
}
```

> **Warning:**
> In the preceding example, the certificate password is stored in plain-text in `appsettings.json`. The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for the certificate's password. To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md). To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md). Development secrets shouldn't be used for production or test.

The default value, `SslProtocols.None`, causes Kestrel to use the operating system defaults to choose the best protocol. Unless you have a specific reason to select a protocol, use the default.

## Client Certificates

`ClientCertificateMode` configures the [client certificate requirements](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode).

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureHttpsDefaults(listenOptions =>
    {
        listenOptions.ClientCertificateMode = ClientCertificateMode.AllowCertificate;
    });
});
```

```json
{
  "Kestrel": {
    "Endpoints": {
      "MyHttpsEndpoint": {
        "Url": "https://localhost:5001",
        "ClientCertificateMode": "AllowCertificate",
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      }
    }
  }
}
```

> **Warning:**
> In the preceding example, the certificate password is stored in plain-text in `appsettings.json`. The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for the certificate's password. To store certificate passwords securely in development environments, see [Protect secrets in development](../../../security/app-secrets.md). To store certificate passwords securely in production environments, see [Azure Key Vault configuration provider](../../../security/key-vault-configuration.md). Development secrets shouldn't be used for production or test.

The default value is `ClientCertificateMode.NoCertificate` where Kestrel will not request or require a certificate from the client.

For more information, see [security/authentication/certauth](../../../security/authentication/certauth.md).

## Connection logging

Call [Microsoft.AspNetCore.Hosting.ListenOptionsConnectionLoggingExtensions.UseConnectionLogging%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.ListenOptionsConnectionLoggingExtensions.UseConnectionLogging%252A) to emit Debug level logs for byte-level communication on a connection. Connection logging is helpful for troubleshooting problems in low-level communication, such as during TLS encryption and behind proxies. If `UseConnectionLogging` is placed before `UseHttps`, encrypted traffic is logged. If `UseConnectionLogging` is placed after `UseHttps`, decrypted traffic is logged. This is built-in [connection middleware](#connection-middleware).

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.Listen(IPAddress.Any, 8000, listenOptions =>
    {
        listenOptions.UseConnectionLogging();
    });
});
```

## Bind to a TCP socket

The [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen%252A) method binds to a TCP socket, and an options lambda permits X.509 certificate configuration:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Program.cs" id="snippet_TCPSocket" highlight="12-18"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Program.cs.md)

The example configures HTTPS for an endpoint with [Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions). Use the same API to configure other Kestrel settings for specific endpoints.

On Windows, self-signed certificates can be created by using the [New-SelfSignedCertificate PowerShell cmdlet](https://learn.microsoft.com/powershell/module/pki/new-selfsignedcertificate). For an unsupported example, see the [UpdateIISExpressSSLForChrome.ps1](https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/includes/make-x509-cert/UpdateIISExpressSSLForChrome.ps1) certificate file on GitHub.

On macOS, Linux, and Windows, create certificates can be created by using [OpenSSL](https://www.openssl.org/).


## Bind to a Unix socket

Listen on a Unix socket with [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%252A) for improved performance with Nginx, as shown in this example:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Program.cs" id="snippet_UnixSocket"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Program.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Program.cs.md)

* In the Nginx configuration file, set the `server` > `location` > `proxy_pass` entry to `http://unix:/tmp/{KESTREL SOCKET}:/;`. `{KESTREL SOCKET}` is the name of the socket provided to [Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket%252A) (for example, `kestrel-test.sock` in the preceding example).
* Ensure that the socket is writeable by Nginx (for example, `chmod go+w /tmp/kestrel-test.sock`).

## Port 0

When the port number `0` is specified, Kestrel dynamically binds to an available port. The following example shows how to determine which port Kestrel bound at runtime:

[language="csharp" source="\~/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Startup.cs" id="snippet_Configure" highlight="3-4,15-21"::: (complete source file; reference: \~/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Startup.cs)](../../../../_code/aspnetcore/fundamentals/servers/kestrel/samples/5.x/KestrelSample/Startup.cs.md)

When the app is run, the console window output indicates the dynamic port where the app can be reached:

```console
Listening on the following addresses: http://127.0.0.1:48508
```

## Limitations

Configure endpoints with the following approaches:

* [Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls%252A)
* `--urls` command-line argument
* `urls` host configuration key
* `ASPNETCORE_URLS` environment variable

These methods are useful for making code work with servers other than Kestrel. However, be aware of the following limitations:

* HTTPS can't be used with these approaches unless a default certificate is provided in the HTTPS endpoint configuration (for example, using `KestrelServerOptions` configuration or a configuration file as shown earlier in this article).
* When both the `Listen` and `UseUrls` approaches are used simultaneously, the `Listen` endpoints override the `UseUrls` endpoints.

## IIS endpoint configuration

When using IIS, the URL bindings for IIS override bindings are set by either `Listen` or `UseUrls`. For more information, see [ASP.NET Core Module](../../../host-and-deploy/aspnet-core-module.md).

## ListenOptions.Protocols

The `Protocols` property establishes the HTTP protocols (`HttpProtocols`) enabled on a connection endpoint or for the server. Assign a value to the `Protocols` property from the `HttpProtocols` enum.

| `HttpProtocols` enum value | Connection protocol permitted |
| --- | --- |
| `Http1` | HTTP/1.1 only. Can be used with or without TLS. |
| `Http2` | HTTP/2 only. May be used without TLS only if the client supports a [Prior Knowledge mode](https://tools.ietf.org/html/rfc7540#section-3.4). |
| `Http1AndHttp2` | HTTP/1.1 and HTTP/2. HTTP/2 requires the client to select HTTP/2 in the TLS [Application-Layer Protocol Negotiation (ALPN)](https://tools.ietf.org/html/rfc7301#section-3) handshake; otherwise, the connection defaults to HTTP/1.1. |

The default `ListenOptions.Protocols` value for any endpoint is `HttpProtocols.Http1AndHttp2`.

TLS restrictions for HTTP/2:

* TLS version 1.2 or later
* Renegotiation disabled
* Compression disabled
* Minimum ephemeral key exchange sizes:
  * Elliptic curve Diffie-Hellman (ECDHE) &lbrack;[RFC4492](https://www.ietf.org/rfc/rfc4492.txt)&rbrack;: 224 bits minimum
  * Finite field Diffie-Hellman (DHE) &lbrack;`TLS12`&rbrack;: 2048 bits minimum
* Cipher suite not prohibited. 

`TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256` &lbrack;`TLS-ECDHE`&rbrack; with the P-256 elliptic curve &lbrack;`FIPS186`&rbrack; is supported by default.

The following example permits HTTP/1.1 and HTTP/2 connections on port 8000. Connections are secured by TLS with a supplied certificate:

```csharp
webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.Listen(IPAddress.Any, 8000, listenOptions =>
    {
        listenOptions.UseHttps("testCert.pfx", "testPassword");
    });
});
```

On Linux, [System.Net.Security.CipherSuitesPolicy](https://learn.microsoft.com/search/?terms=System.Net.Security.CipherSuitesPolicy) can be used to filter TLS handshakes on a per-connection basis:

```csharp
// using System.Net.Security;
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.Server.Kestrel.Core;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Hosting;

webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureHttpsDefaults(listenOptions =>
    {
        listenOptions.OnAuthenticate = (context, sslOptions) =>
        {
            sslOptions.CipherSuitesPolicy = new CipherSuitesPolicy(
                new[]
                {
                    TlsCipherSuite.TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
                    TlsCipherSuite.TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,
                    // ...
                });
        };
    });
});
```

## Connection middleware

Custom connection middleware can filter TLS handshakes on a per-connection basis for specific ciphers if necessary.

The following example throws [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) for any cipher algorithm that the app doesn't support. Alternatively, define and compare [ITlsHandshakeFeature.CipherAlgorithm](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Connections.Features.ITlsHandshakeFeature.CipherAlgorithm) to a list of acceptable cipher suites.

No encryption is used with a [CipherAlgorithmType.Null](https://learn.microsoft.com/search/?terms=System.Security.Authentication.CipherAlgorithmType) cipher algorithm.

```csharp
// using System.Net;
// using Microsoft.AspNetCore.Connections;

webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.Listen(IPAddress.Any, 8000, listenOptions =>
    {
        listenOptions.UseHttps("testCert.pfx", "testPassword");
        listenOptions.UseTlsFilter();
    });
});
```

```csharp
using System;
using System.Security.Authentication;
using Microsoft.AspNetCore.Connections.Features;

namespace Microsoft.AspNetCore.Connections
{
    public static class TlsFilterConnectionMiddlewareExtensions
    {
        public static IConnectionBuilder UseTlsFilter(
            this IConnectionBuilder builder)
        {
            return builder.Use((connection, next) =>
            {
                var tlsFeature = connection.Features.Get<ITlsHandshakeFeature>();

                if (tlsFeature.CipherAlgorithm == CipherAlgorithmType.Null)
                {
                    throw new NotSupportedException("Prohibited cipher: " +
                        tlsFeature.CipherAlgorithm);
                }

                return next();
            });
        }
    }
}
```

Connection filtering can also be configured via an [Microsoft.AspNetCore.Connections.IConnectionBuilder](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Connections.IConnectionBuilder) lambda:

```csharp
// using System;
// using System.Net;
// using System.Security.Authentication;
// using Microsoft.AspNetCore.Connections;
// using Microsoft.AspNetCore.Connections.Features;

webBuilder.ConfigureKestrel(serverOptions =>
{
    serverOptions.Listen(IPAddress.Any, 8000, listenOptions =>
    {
        listenOptions.UseHttps("testCert.pfx", "testPassword");
        listenOptions.Use((context, next) =>
        {
            var tlsFeature = context.Features.Get<ITlsHandshakeFeature>();

            if (tlsFeature.CipherAlgorithm == CipherAlgorithmType.Null)
            {
                throw new NotSupportedException(
                    $"Prohibited cipher: {tlsFeature.CipherAlgorithm}");
            }

            return next();
        });
    });
});
```

## Set the HTTP protocol from configuration

`CreateDefaultBuilder` calls `serverOptions.Configure(context.Configuration.GetSection("Kestrel"))` by default to load Kestrel configuration.

The following `appsettings.json` example establishes HTTP/1.1 as the default connection protocol for all endpoints:

```json
{
  "Kestrel": {
    "EndpointDefaults": {
      "Protocols": "Http1"
    }
  }
}
```

The following `appsettings.json` example establishes the HTTP/1.1 connection protocol for a specific endpoint:

```json
{
  "Kestrel": {
    "Endpoints": {
      "HttpsDefaultCert": {
        "Url": "https://localhost:5001",
        "Protocols": "Http1"
      }
    }
  }
}
```

Protocols specified in code override values set by configuration.

## URL prefixes

When using `UseUrls`, `--urls` command-line argument, `urls` host configuration key, or `ASPNETCORE_URLS` environment variable, the URL prefixes can be in any of the following formats.

Only HTTP URL prefixes are valid. Kestrel doesn't support HTTPS when configuring URL bindings using `UseUrls`.

* IPv4 address with port number

  ```
  http://65.55.39.10:80/
  ```

  `0.0.0.0` is a special case that binds to all IPv4 addresses.

* IPv6 address with port number

  ```
  http://[0:0:0:0:0:ffff:4137:270a]:80/
  ```

  `[::]` is the IPv6 equivalent of IPv4 `0.0.0.0`.

* Host name with port number

  ```
  http://contoso.com:80/
  http://*:80/
  ```

  Host names, `*`, and `+`, aren't special. Anything not recognized as a valid IP address or `localhost` binds to all IPv4 and IPv6 IPs. To bind different host names to different ASP.NET Core apps on the same port, use [HTTP.sys](../httpsys.md) or a reverse proxy server. Reverse proxy server examples include IIS, Nginx, or Apache.

  > **Warning:**
  > Hosting in a reverse proxy configuration requires [host filtering](host-filtering.md).

* Host `localhost` name with port number or loopback IP with port number

  ```
  http://localhost:5000/
  http://127.0.0.1:5000/
  http://[::1]:5000/
  ```

  When `localhost` is specified, Kestrel attempts to bind to both IPv4 and IPv6 loopback interfaces. If the requested port is in use by another service on either loopback interface, Kestrel fails to start. If either loopback interface is unavailable for any other reason (most commonly because IPv6 isn't supported), Kestrel logs a warning.
