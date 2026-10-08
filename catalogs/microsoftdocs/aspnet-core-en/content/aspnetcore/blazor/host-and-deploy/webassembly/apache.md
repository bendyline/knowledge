---
title: Host and deploy ASP.NET Core Blazor WebAssembly with Apache
author: guardrex
description: Learn how to host and deploy Blazor WebAssembly using Apache.
monikerRange: '>= aspnetcore-3.1'
ms.author: wpickett
ms.custom: linux-related-content
ms.date: 11/11/2025
uid: blazor/host-and-deploy/webassembly/apache
---
# Host and deploy ASP.NET Core Blazor WebAssembly with Apache

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


This article explains how to host and deploy Blazor WebAssembly using [Apache](https://www.apache.org/).

To deploy a Blazor WebAssembly app to Apache:

**Applies to: \>= aspnetcore-8.0**

Create the Apache configuration file. The following example is a simplified configuration file (`blazorapp.config`):

```
<VirtualHost *:80>
    ServerName www.example.com
    ServerAlias *.example.com

    DocumentRoot "/var/www/blazorapp"
    ErrorDocument 404 /index.html

    AddType application/wasm .wasm

    <Directory "/var/www/blazorapp">
        Options -Indexes
        AllowOverride None
    </Directory>

    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE application/javascript
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE application/octet-stream
        AddOutputFilterByType DEFLATE application/wasm
        <IfModule mod_setenvif.c>
            BrowserMatch ^Mozilla/4 gzip-only-text/html
            BrowserMatch ^Mozilla/4.0[678] no-gzip
            BrowserMatch bMSIE !no-gzip !gzip-only-text/html
        </IfModule>
    </IfModule>

    ErrorLog /var/log/httpd/blazorapp-error.log
    CustomLog /var/log/httpd/blazorapp-access.log common
</VirtualHost>
```



**Applies to: < aspnetcore-8.0**

Create the Apache configuration file. The following example is a simplified configuration file (`blazorapp.config`):

```
<VirtualHost *:80>
    ServerName www.example.com
    ServerAlias *.example.com

    DocumentRoot "/var/www/blazorapp"
    ErrorDocument 404 /index.html

    AddType application/wasm .wasm
    AddType application/octet-stream .dll

    <Directory "/var/www/blazorapp">
        Options -Indexes
        AllowOverride None
    </Directory>

    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE application/javascript
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE application/octet-stream
        AddOutputFilterByType DEFLATE application/wasm
        <IfModule mod_setenvif.c>
            BrowserMatch ^Mozilla/4 gzip-only-text/html
            BrowserMatch ^Mozilla/4.0[678] no-gzip
            BrowserMatch bMSIE !no-gzip !gzip-only-text/html
        </IfModule>
    </IfModule>

    ErrorLog /var/log/httpd/blazorapp-error.log
    CustomLog /var/log/httpd/blazorapp-access.log common
</VirtualHost>
```



Place the Apache configuration file into the `/etc/httpd/conf.d/` directory.

Place the app's published assets (`/bin/Release/{TARGET FRAMEWORK}/publish/wwwroot`, where the `{TARGET FRAMEWORK}` placeholder is the target framework) into the `/var/www/blazorapp` directory (the location specified to `DocumentRoot` in the configuration file).

Restart the Apache service.

For more information, see [`mod_mime`](https://httpd.apache.org/docs/2.4/mod/mod_mime.html) and [`mod_deflate`](https://httpd.apache.org/docs/current/mod/mod_deflate.html).

**Applies to: < aspnetcore-8.0**

## Hosted deployment on Linux (Apache)

Configure the app with [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions) to forward the `X-Forwarded-For` and `X-Forwarded-Proto` headers by following the guidance in [host-and-deploy/proxy-load-balancer](../../../host-and-deploy/proxy-load-balancer.md).

For more information on setting the app's base path, including sub-app path configuration, see [blazor/host-and-deploy/app-base-path](../app-base-path.md).

The following example hosts the app at a root URL (no sub-app path):

```
<VirtualHost *:*>
    RequestHeader set "X-Forwarded-Proto" expr=%{REQUEST_SCHEME}
</VirtualHost>

<VirtualHost *:80>
    ProxyPreserveHost On
    ProxyPass         / http://localhost:5000/
    ProxyPassReverse  / http://localhost:5000/
    ProxyPassMatch    ^/_blazor/(.*) http://localhost:5000/_blazor/$1
    ProxyPass         /_blazor ws://localhost:5000/_blazor
    ServerName        www.example.com
    ServerAlias       *.example.com
    ErrorLog          ${APACHE_LOG_DIR}helloapp-error.log
    CustomLog         ${APACHE_LOG_DIR}helloapp-access.log common
</VirtualHost>
```

To configure the server to host the app at a sub-app path, the `{PATH}` placeholder in the following entries is the sub-app path:

```
<VirtualHost *:*>
    RequestHeader set "X-Forwarded-Proto" expr=%{REQUEST_SCHEME}
</VirtualHost>

<VirtualHost *:80>
    ProxyPreserveHost On
    ProxyPass         / http://localhost:5000/{PATH}
    ProxyPassReverse  / http://localhost:5000/{PATH}
    ProxyPassMatch    ^/_blazor/(.*) http://localhost:5000/{PATH}/_blazor/$1
    ProxyPass         /_blazor ws://localhost:5000/{PATH}/_blazor
    ServerName        www.example.com
    ServerAlias       *.example.com
    ErrorLog          ${APACHE_LOG_DIR}helloapp-error.log
    CustomLog         ${APACHE_LOG_DIR}helloapp-access.log common
</VirtualHost>
```

For an app that responds to requests at `/blazor`:

```
<VirtualHost *:*>
    RequestHeader set "X-Forwarded-Proto" expr=%{REQUEST_SCHEME}
</VirtualHost>

<VirtualHost *:80>
    ProxyPreserveHost On
    ProxyPass         / http://localhost:5000/blazor
    ProxyPassReverse  / http://localhost:5000/blazor
    ProxyPassMatch    ^/_blazor/(.*) http://localhost:5000/blazor/_blazor/$1
    ProxyPass         /_blazor ws://localhost:5000/blazor/_blazor
    ServerName        www.example.com
    ServerAlias       *.example.com
    ErrorLog          ${APACHE_LOG_DIR}helloapp-error.log
    CustomLog         ${APACHE_LOG_DIR}helloapp-access.log common
</VirtualHost>
```



## Additional resources

* [Apache documentation](https://httpd.apache.org/docs/current/mod/mod_proxy.html)
* Developers on non-Microsoft support forums:
  * [Stack Overflow (tag: `blazor`)](https://stackoverflow.com/questions/tagged/blazor)
  * [ASP.NET Core Slack Team](https://join.slack.com/t/aspnetcore/shared_invite/zt-1mv5487zb-EOZxJ1iqb0A0ajowEbxByQ)
  * [Blazor Gitter](https://gitter.im/aspnet/Blazor)
