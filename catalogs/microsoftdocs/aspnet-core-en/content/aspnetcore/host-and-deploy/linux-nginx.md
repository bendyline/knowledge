---
title: Host ASP.NET Core on Linux with Nginx
ai-usage: ai-assisted
author: tdykstra
description: Learn how to set up Nginx as a reverse proxy on Ubuntu, RHEL and SUSE to forward HTTP traffic to an ASP.NET Core web app running on Kestrel.
monikerRange: '>= aspnetcore-3.1'
ms.author: tdykstra
ms.custom: linux-related-content, sfi-ropc-nochange
ms.date: 11/10/2025
uid: host-and-deploy/linux-nginx
---
# Host ASP.NET Core on Linux with Nginx

By [Sourabh Shirhatti](https://twitter.com/sshirhatti)

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


**Applies to: \>= aspnetcore-6.0**
This guide explains setting up a production-ready ASP.NET Core environment for Ubuntu, Red Hat Enterprise (RHEL), and SUSE Linux Enterprise Server.

For information on other Linux distributions supported by ASP.NET Core, see [Prerequisites for .NET on Linux](https://learn.microsoft.com/dotnet/core/linux-prerequisites).

This guide:

* Places an existing ASP.NET Core app behind a reverse proxy server.
* Sets up the reverse proxy server to forward requests to the Kestrel web server.
* Ensures the web app runs on startup as a daemon.
* Configures a process management tool to help restart the web app.

## Prerequisites

# [Ubuntu](#tab/linux-ubuntu)

* Access to Ubuntu 20.04 with a standard user account with sudo privilege.
* The latest stable [.NET runtime installed](https://learn.microsoft.com/dotnet/core/install/linux) on the server.
* An existing ASP.NET Core app.

# [Red Hat Enterprise Linux](#tab/linux-rhel)

* Access to Red Hat Enterprise (RHEL) 8.0 or later with a standard user account with sudo privilege.
* The latest stable [.NET runtime installed](https://learn.microsoft.com/dotnet/core/install/linux) on the server.
* An existing ASP.NET Core app.

# [SUSE Linux Enterprise Server](#tab/linux-sles)

* Access to SLES 12 or 15 with a standard user account with sudo privilege.
* The latest stable [.NET runtime installed](https://learn.microsoft.com/dotnet/core/install/linux) on the server.
* An existing ASP.NET Core app.

---

At any point in the future after upgrading the shared framework, restart the ASP.NET Core apps hosted by the server.

## Publish and copy over the app

Configure the app for a [framework-dependent deployment](https://learn.microsoft.com/dotnet/core/deploying/#framework-dependent-deployments-fdd).

If the app is run locally in the [`Development` environment](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23configure-services-and-middleware-by-environment) and isn't configured by the server to make secure HTTPS connections, adopt either of the following approaches:

* Configure the app to handle secure local connections. For more information, see the [HTTPS configuration](#https-configuration) section.

* Configure the app to run at the insecure endpoint:

  * Deactivate HTTPS redirection middleware in the `Development` environment (`Program.cs`):

    ```csharp
    if (!app.Environment.IsDevelopment())
    {
        app.UseHttpsRedirection();
    }
    ```

    For more information, see [fundamentals/environments#configure-services-and-middleware-by-environment](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23configure-services-and-middleware-by-environment).

  * Remove `https://localhost:5001` (if present) from the `applicationUrl` property in the `Properties/launchSettings.json` file.

For more information on configuration by environment, see [fundamentals/environments](../fundamentals/environments.md).

Run [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) from the `Development` environment to package an app into a directory (for example, `bin/Release/{TARGET FRAMEWORK MONIKER}/publish`, where the `{TARGET FRAMEWORK MONIKER}` placeholder is the [Target Framework Moniker (TFM)](https://learn.microsoft.com/dotnet/standard/frameworks)) that can run on the server:

```dotnetcli
dotnet publish --configuration Release
```

The app can also be published as a [self-contained deployment](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd) if you prefer not to maintain the .NET runtime on the server.

Copy the ASP.NET Core app to the server using a tool that integrates into the organization's workflow (for example, `SCP`, `SFTP`). It's common to locate web apps under the `var` directory (for example, `var/www/helloapp`).

> **Note:**
> Under a production deployment scenario, a continuous integration workflow does the work of publishing the app and copying the assets to the server.

Test the app:

1. From the command line, run the app: `dotnet <app_assembly>.dll`.
1. In a browser, navigate to `http://<serveraddress>:<port>` to verify the app works on Linux locally.

## Configure a reverse proxy server

A reverse proxy is a common setup for serving dynamic web apps. A reverse proxy terminates the HTTP request and forwards it to the ASP.NET Core app.

### Use a reverse proxy server

Kestrel is great for serving dynamic content from ASP.NET Core. However, the web serving capabilities aren't as feature rich as servers such as IIS, Apache, or Nginx. A reverse proxy server can offload work such as serving static content, caching requests, compressing requests, and HTTPS termination from the HTTP server. A reverse proxy server may reside on a dedicated machine or may be deployed alongside an HTTP server.

For the purposes of this guide, a single instance of Nginx is used. It runs on the same server, alongside the HTTP server. Based on requirements, a different setup may be chosen.

Because requests are forwarded by reverse proxy, use the [forwarded headers middleware](proxy-load-balancer.md) from the [`Microsoft.AspNetCore.HttpOverrides`](https://www.nuget.org/packages/Microsoft.AspNetCore.HttpOverrides) package, which is automatically included in ASP.NET Core apps via the [shared framework's `Microsoft.AspNetCore.App` metapackage](../fundamentals/metapackage-app.md). The middleware updates the `Request.Scheme`, using the `X-Forwarded-Proto` header, so that redirect URIs and other security policies work correctly.

Forwarded headers middleware should run before other middleware. This ordering ensures that the middleware relying on forwarded headers information can consume the header values for processing. To run forwarded headers middleware after diagnostics and error handling middleware, see [forwarded headers middleware order](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fproxy-load-balancer%23forwarded-headers-middleware-order).

Invoke the [Microsoft.AspNetCore.Builder.ForwardedHeadersExtensions.UseForwardedHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersExtensions.UseForwardedHeaders%252A) method before calling other middleware. Configure the middleware to forward the `X-Forwarded-For` and `X-Forwarded-Proto` headers:

[language="csharp" source="\~/host-and-deploy/linux-nginx/sample7/Program.cs" id="snippet_1"::: (complete source file; reference: \~/host-and-deploy/linux-nginx/sample7/Program.cs)](../../_code/aspnetcore/host-and-deploy/linux-nginx/sample7/Program.cs.md)

If no [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions) are specified to the middleware, the default headers to forward are `None`.

Proxies running on loopback addresses (`127.0.0.0/8`, `[::1]`), including the standard localhost address (`127.0.0.1`), are trusted by default. If other trusted proxies or networks within the organization handle requests between the internet and the web server, add them to the list of [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownProxies%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownProxies%252A) or [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks%252A) with [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions). The following example adds a trusted proxy server at IP address `10.0.0.100` to the forwarded headers middleware `KnownProxies`:

[language="csharp" source="\~/host-and-deploy/linux-nginx/sample7/Program.cs" id="snippet_all"::: (complete source file; reference: \~/host-and-deploy/linux-nginx/sample7/Program.cs)](../../_code/aspnetcore/host-and-deploy/linux-nginx/sample7/Program.cs.md)

For more information, see [host-and-deploy/proxy-load-balancer](proxy-load-balancer.md).

### Install Nginx

# [Ubuntu](#tab/linux-ubuntu)

Use `apt-get` to install Nginx. The installer creates a [`systemd`](https://systemd.io/) init script that runs Nginx as daemon on system startup. Follow the installation instructions for Ubuntu at [Nginx: Linux packages - Ubuntu](https://nginx.org/en/linux_packages.html#Ubuntu).

# [Red Hat Enterprise Linux](#tab/linux-rhel)

Use `yum-utils` to select and install an Nginx module stream. Follow the installation instructions for RHEL at [Nginx: Linux packages - RHEL](https://nginx.org/en/linux_packages.html#RHEL).

# [SUSE Linux Enterprise Server](#tab/linux-sles)

Use `yum-utils` to select and install an Nginx module stream. Follow the installation instructions for SLES at [Nginx: Linux packages - SLES](https://nginx.org/en/linux_packages.html#SLES).

---

> **Note:**
> If optional Nginx modules are required, building Nginx from source might be required.

Since Nginx was installed for the first time, explicitly start it by running:

```bash
sudo service nginx start
```

Verify a browser displays the default landing page for Nginx. The landing page is reachable at `http://<server_IP_address>/index.nginx-debian.html`.

### Configure Nginx

# [Ubuntu](#tab/linux-ubuntu)

To configure Nginx as a reverse proxy to forward HTTP requests to the ASP.NET Core app, modify `/etc/nginx/sites-available/default` and  recreate the symlink. After creating the `/etc/nginx/sites-available/default` file,  use the following command to create the symlink:

```bash
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
```

Open `/etc/nginx/sites-available/default` in a text editor, and replace the contents with the following snippet:

# [Red Hat Enterprise Linux](#tab/linux-rhel)

To configure Nginx as a reverse proxy to forward HTTP requests to an ASP.NET Core app, modify `/etc/nginx.conf`. Update the `http{}` code block with the following snippet:

# [SUSE Linux Enterprise Server](#tab/linux-sles)

To configure Nginx as a reverse proxy to forward HTTP requests to an ASP.NET Core app, modify `/etc/nginx.conf`. Update the `http{}` code block with the following snippet:

---

```text
map $http_connection $connection_upgrade {
  "~*Upgrade" $http_connection;
  default keep-alive;
}

server {
  listen        80;
  server_name   example.com *.example.com;
  location / {
      proxy_pass         http://127.0.0.1:5000/;
      proxy_http_version 1.1;
      proxy_set_header   Upgrade $http_upgrade;
      proxy_set_header   Connection $connection_upgrade;
      proxy_set_header   Host $host;
      proxy_cache_bypass $http_upgrade;
      proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header   X-Forwarded-Proto $scheme;
  }
}
```

If the app is a SignalR or Blazor Server app, see [signalr/scale#linux-with-nginx](https://learn.microsoft.com/search/?terms=signalr%2Fscale%23linux-with-nginx) and [blazor/host-and-deploy/server/index#linux-with-nginx](https://learn.microsoft.com/search/?terms=blazor%2Fhost-and-deploy%2Fserver%2Findex%23linux-with-nginx) respectively for more information.

When no `server_name` matches, Nginx uses the default server. If no default server is defined, the first server in the configuration file is the default server. As a best practice, add a specific default server that returns a status code of 444 in your configuration file. A default server configuration example is:

```text
server {
    listen   80 default_server;
    # listen [::]:80 default_server deferred;
    return   444;
}
```

With the preceding configuration file and default server, Nginx accepts public traffic on port 80 with host header `example.com` or `*.example.com`. Requests not matching these hosts won't get forwarded to Kestrel. Nginx forwards the matching requests to Kestrel at `http://127.0.0.1:5000/`. For more information, see [How nginx processes a request](https://nginx.org/docs/http/request_processing.html). To change Kestrel's IP/port, see [Kestrel: Endpoint configuration](../fundamentals/servers/kestrel/endpoints.md).

> **Warning:**
> Failure to specify a proper [server_name directive](https://nginx.org/docs/http/server_names.html) exposes your app to security vulnerabilities. Subdomain wildcard binding (for example, `*.example.com`) doesn't pose this security risk if you control the entire parent domain (as opposed to `*.com`, which is vulnerable). For more information, see [RFC 9110: HTTP Semantics (Section 7.2: Host and :authority)](https://www.rfc-editor.org/rfc/rfc9110#field.host).

Once the Nginx configuration is established, run `sudo nginx -t` to verify the syntax of the configuration files. If the configuration file test is successful, force Nginx to pick up the changes by running `sudo nginx -s reload`.

To directly run the app on the server:

1. Navigate to the app's directory.
1. Run the app: `dotnet <app_assembly.dll>`, where `app_assembly.dll` is the assembly file name of the app.

# [Ubuntu](#tab/linux-ubuntu)

If the app runs on the server but fails to respond over the internet, check the server's firewall and confirm port 80 is open. If using an Azure Ubuntu VM, add a Network Security Group (NSG) rule that enables inbound port 80 traffic. There's no need to enable an outbound port 80 rule, as the outbound traffic is automatically granted when the inbound rule is enabled.

# [Red Hat Enterprise Linux](#tab/linux-rhel)

If the app runs on the server but fails to respond over the internet, check the server's firewall and confirm port 80 is open.

# [SUSE Linux Enterprise Server](#tab/linux-sles)

If the app runs on the server but fails to respond over the internet, check the server's firewall and confirm port 80 is open.

---

When done testing the app, shut down the app with <kbd>Ctrl</kbd>+<kbd>C</kbd> in the command shell.

### Increase keepalive_requests

[`keepalive_requests`](http://nginx.org/en/docs/http/ngx_http_core_module.html#keepalive_requests) can be increased for [higher performance](https://www.nginx.com/blog/10-tips-for-10x-application-performance/#web-server-tuning), For more information, see [this GitHub issue](https://github.com/dotnet/AspNetCore.Docs/issues/22141#issuecomment-1442435506).

## Monitor the app

The server is set up to forward requests made to `http://<serveraddress>:80` on to the ASP.NET Core app running on Kestrel at `http://127.0.0.1:5000`. However, Nginx isn't set up to manage the Kestrel process. [`systemd`](https://systemd.io/) can be used to create a service file to start and monitor the underlying web app. `systemd` is an init system that provides many powerful features for starting, stopping, and managing processes.

### Create the service file

Create the service definition file:

```bash
sudo nano /etc/systemd/system/kestrel-helloapp.service
```

The following example is an `.ini` service file for the app:

```text
[Unit]
Description=Example .NET Web API App running on Linux

[Service]
WorkingDirectory=/var/www/helloapp
ExecStart=/usr/bin/dotnet /var/www/helloapp/helloapp.dll
Restart=always
# Restart service after 10 seconds if the dotnet service crashes:
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=dotnet-example
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_NOLOGO=true

[Install]
WantedBy=multi-user.target
```

In the preceding example, the user that manages the service is specified by the `User` option. The user (`www-data`) must exist and have proper ownership of the app's files.

Use `TimeoutStopSec` to configure the duration of time to wait for the app to shut down after it receives the initial interrupt signal. If the app doesn't shut down in this period, SIGKILL is issued to terminate the app. Provide the value as unitless seconds (for example, `150`), a time span value (for example, `2min 30s`), or `infinity` to disable the timeout. `TimeoutStopSec` defaults to the value of `DefaultTimeoutStopSec` in the manager configuration file (`systemd-system.conf`, `system.conf.d`, `systemd-user.conf`, `user.conf.d`). The default timeout for most distributions is 90 seconds.

```text
# The default value is 90 seconds for most distributions.
TimeoutStopSec=90
```

Linux has a case-sensitive file system. Setting `ASPNETCORE_ENVIRONMENT` to `Production` results in searching for the configuration file `appsettings.Production.json`, not `appsettings.production.json`.

Some values (for example, SQL connection strings) must be escaped for the configuration providers to read the environment variables. Use the following command to generate a properly escaped value for use in the configuration file:

```console
systemd-escape "<value-to-escape>"
```

Colon (`:`) separators aren't supported in environment variable names. Use a double underscore (`__`) in place of a colon. The [Environment Variables configuration provider](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23environment-variables) converts double-underscores into colons when environment variables are read into configuration. In the following example, the connection string key `ConnectionStrings:DefaultConnection` is set into the service definition file as `ConnectionStrings__DefaultConnection`:

```console
Environment=ConnectionStrings__DefaultConnection={Connection String}
```

Save the file and enable the service.

```bash
sudo systemctl enable kestrel-helloapp.service
```

Start the service and verify that it's running.

```bash
sudo systemctl start kestrel-helloapp.service
sudo systemctl status kestrel-helloapp.service

◝ kestrel-helloapp.service - Example .NET Web API App running on Linux
    Loaded: loaded (/etc/systemd/system/kestrel-helloapp.service; enabled)
    Active: active (running) since Thu 2016-10-18 04:09:35 NZDT; 35s ago
Main PID: 9021 (dotnet)
    CGroup: /system.slice/kestrel-helloapp.service
            └─9021 /usr/local/bin/dotnet /var/www/helloapp/helloapp.dll
```

With the reverse proxy configured and Kestrel managed through `systemd`, the web app is fully configured and can be accessed from a browser on the local machine at `http://localhost`. It's also accessible from a remote machine, barring any firewall that might be blocking. Inspecting the response headers, the `Server` header shows the ASP.NET Core app being served by Kestrel.

```text
HTTP/1.1 200 OK
Date: Tue, 11 Oct 2016 16:22:23 GMT
Server: Kestrel
Keep-Alive: timeout=5, max=98
Connection: Keep-Alive
Transfer-Encoding: chunked
```

### View logs

Since the web app using Kestrel is managed using [`systemd`](https://systemd.io/), all events and processes are logged to a centralized journal. However, this journal includes all entries for all services and processes managed by `systemd`. To view the `kestrel-helloapp.service`-specific items, use the following command:

```bash
sudo journalctl -fu kestrel-helloapp.service
```

For further filtering, time options such as `--since today`, `--until 1 hour ago`, or a combination of these can reduce the number of entries returned.

```bash
sudo journalctl -fu kestrel-helloapp.service --since "2016-10-18" --until "2016-10-18 04:00"
```

## Data protection

The [ASP.NET Core Data Protection stack](../security/data-protection/introduction.md) is used by several ASP.NET Core [middlewares](../fundamentals/middleware/index.md), including authentication middleware (for example, cookie middleware) and cross-site request forgery (CSRF) protections. Even if Data Protection APIs aren't called by user code, data protection should be configured to create a persistent cryptographic [key store](../security/data-protection/implementation/key-management.md). If data protection isn't configured, the keys are held in memory and discarded when the app restarts.

If the key ring is stored in memory when the app restarts:

* All cookie-based authentication tokens are invalidated.
* Users are required to sign in again on their next request.
* Any data protected with the key ring can no longer be decrypted. This may include [CSRF tokens](https://learn.microsoft.com/search/?terms=security%2Fanti-request-forgery%23aspnet-core-antiforgery-configuration) and [ASP.NET Core MVC TempData cookies](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23tempdata).

To configure data protection to persist and encrypt the key ring, see:

* [security/data-protection/implementation/key-storage-providers](../security/data-protection/implementation/key-storage-providers.md)
* [security/data-protection/implementation/key-encryption-at-rest](../security/data-protection/implementation/key-encryption-at-rest.md)

## Long request header fields

Proxy server default settings typically limit request header fields to 4 K or 8 K depending on the platform. An app may require fields longer than the default (for example, apps that use [Microsoft Entra ID](https://azure.microsoft.com/services/active-directory/)). If longer fields are required, the proxy server's default settings require adjustment. The values to apply depend on the scenario. For more information, see your server's documentation.

* [proxy_buffer_size](https://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffer_size)
* [proxy_buffers](https://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffers)
* [proxy_busy_buffers_size](https://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_busy_buffers_size)
* [large_client_header_buffers](https://nginx.org/docs/http/ngx_http_core_module.html#large_client_header_buffers)

> **Warning:**
> Don't increase the default values of proxy buffers unless necessary. Increasing these values increases the risk of buffer overrun (overflow) and Denial of Service (DoS) attacks by malicious users.

## Secure the app

### Enable AppArmor

Linux Security Modules (LSM) is a framework that's part of the Linux kernel since Linux 2.6. LSM supports different implementations of security modules. [AppArmor](https://wiki.ubuntu.com/AppArmor) is an LSM that implements a Mandatory Access Control system, which allows confining the program to a limited set of resources. Ensure AppArmor is enabled and properly configured.

### Configure the firewall

Close off all external ports that aren't in use. Uncomplicated firewall (ufw) provides a front end for `iptables` by providing a CLI for configuring the firewall.

# [Ubuntu](#tab/linux-ubuntu)

> **Warning:**
> A firewall prevents access to the whole system if not configured correctly. Failure to specify the correct SSH port effectively locks you out of the system if you are using SSH to connect to it. The default port is 22. For more information, see the [introduction to ufw](https://help.ubuntu.com/community/UFW) and the [manual](https://manpages.ubuntu.com/manpages/resolute/man8/ufw.8.html).

Install `ufw` and configure it to allow traffic on any ports needed.

```bash
sudo apt-get install ufw

sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

sudo ufw enable
```

# [Red Hat Enterprise Linux](#tab/linux-rhel)

> **Warning:**
> A firewall prevents access to the whole system if not configured correctly. Failure to specify the correct SSH port effectively locks you out of the system if you are using SSH to connect to it. The default port is 22. For more information, see the [introduction to ufw](https://help.ubuntu.com/community/UFW).

Install `ufw` and configure it to allow traffic on any ports needed.

```bash
sudo yum -y install ufw

sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

sudo ufw enable
```

# [SUSE Linux Enterprise Server](#tab/linux-sles)

> **Warning:**
> A firewall prevents access to the whole system if not configured correctly. Failure to specify the correct SSH port effectively locks you out of the system if you are using SSH to connect to it. The default port is 22. For more information, see the [introduction to ufw](https://help.ubuntu.com/community/UFW).

Install `ufw` and configure it to allow traffic on any ports needed.

```bash
sudo yum -y install ufw

sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

sudo ufw enable
```

---

### Secure Nginx

#### Change the Nginx response name

Edit `src/http/ngx_http_header_filter_module.c`:

```c
static char ngx_http_server_string[] = "Server: Web Server" CRLF;
static char ngx_http_server_full_string[] = "Server: Web Server" CRLF;
```

#### Configure options

Configure the server with additional required modules. Consider using a web app firewall, such as [ModSecurity](https://www.modsecurity.org/), to harden the app.

#### HTTPS configuration

**Configure the app for secure (HTTPS) local connections**

The [dotnet run](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) command uses the app's `Properties/launchSettings.json` file, which configures the app to listen on the URLs provided by the `applicationUrl` property. For example, `https://localhost:5001;http://localhost:5000`.

Configure the app to use a certificate in development for the `dotnet run` command or development environment (<kbd>F5</kbd> or <kbd>Ctrl</kbd>+<kbd>F5</kbd> in Visual Studio Code) using one of the following approaches:

* [Replace the default certificate from configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Fendpoints%23configuration) (*Recommended*)
* [KestrelServerOptions.ConfigureHttpsDefaults](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Fendpoints%23configurehttpsdefaultsactionhttpsconnectionadapteroptions)

**Configure the reverse proxy for secure (HTTPS) client connections**

> **Warning:**
> The security configuration in this section is a general configuration to be used as a starting point for further customization. We're unable to provide support for third-party tooling, servers, and operating systems. *Use the configuration in this section at your own risk.* For more information, access the following resources:
>
> * [Configuring HTTPS servers](http://nginx.org/docs/http/configuring_https_servers.html) (Nginx documentation)
> * [mozilla.org SSL Configuration Generator](https://ssl-config.mozilla.org/#server=nginx)

* Configure the server to listen to HTTPS traffic on port 443 by specifying a valid certificate issued by a trusted Certificate Authority (CA).

* Harden the security by employing some of the practices depicted in the following */etc/nginx/nginx.conf* file.

* The following example doesn't configure the server to redirect insecure requests. We recommend using HTTPS redirection middleware. For more information, see [security/enforcing-ssl](../security/enforcing-ssl.md).

  > **Note:**
  > For development environments where the server configuration handles secure redirection instead of HTTPS redirection middleware, we recommend using temporary redirects (302) rather than permanent redirects (301). Link caching can cause unstable behavior in development environments.

* Adding a `Strict-Transport-Security` (HSTS) header ensures all subsequent requests made by the client are over HTTPS. For guidance on setting the `Strict-Transport-Security` header, see [security/enforcing-ssl#http-strict-transport-security-hsts-protocol](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23http-strict-transport-security-hsts-protocol).

* If HTTPS will be disabled in the future, use one of the following approaches:

  * Don't add the HSTS header.
  * Choose a short `max-age` value.

Add the */etc/nginx/proxy.conf* configuration file:

[Code reference unavailable in this source snapshot: ~/host-and-deploy/linux-nginx/proxy.conf](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/host-and-deploy/linux-nginx.md)

# [Ubuntu](#tab/linux-ubuntu)

**Replace** the contents of the */etc/nginx/nginx.conf* configuration file with the following file. The example contains both `http` and `server` sections in one configuration file.

# [Red Hat Enterprise Linux](#tab/linux-rhel)

Modify `/etc/nginx/nginx.conf`. Open it in a text editor, and replace the `http{}` and `server{}` code blocks with contents with the following snippet:

# [SUSE Linux Enterprise Server](#tab/linux-sles)

Modify `/etc/nginx/nginx.conf`. Open it in a text editor, and replace the `http{}` and `server{}` code blocks with contents with the following snippet:

---

[Code reference unavailable in this source snapshot: ~/host-and-deploy/linux-nginx/nginx.conf](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/host-and-deploy/linux-nginx.md)

> **Note:**
> Blazor WebAssembly apps require a larger `burst` parameter value to accommodate the larger number of requests made by an app. For more information, see [blazor/host-and-deploy/webassembly/nginx](../blazor/host-and-deploy/webassembly/nginx.md).

> **Note:**
> The preceding example disables Online Certificate Status Protocol (OCSP) Stapling. If enabled, confirm that the certificate supports the feature. For more information and guidance on enabling OCSP, see the following properties in the [Module ngx_http_ssl_module (Nginx documentation)](http://nginx.org/en/docs/http/ngx_http_ssl_module.html) article:
>
> * `ssl_stapling`
> * `ssl_stapling_file`
> * `ssl_stapling_responder`
> * `ssl_stapling_verify`

#### Secure Nginx from clickjacking

[Clickjacking](https://blog.qualys.com/securitylabs/2015/10/20/clickjacking-a-common-implementation-mistake-that-can-put-your-websites-in-danger), also known as a *UI redress attack*, is a malicious attack where a website visitor is tricked into clicking a link or button on a different page than they're currently visiting. Use `X-FRAME-OPTIONS` to secure the site.

To mitigate clickjacking attacks:

1. Edit the *nginx.conf* file:

   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```

   Within the `http{}` code block, add the line: `add_header X-Frame-Options "SAMEORIGIN";`

1. Save the file.
1. Restart Nginx.

#### MIME-type sniffing

This header prevents most browsers from MIME-sniffing a response away from the declared content type, as the header instructs the browser not to override the response content type. With the `nosniff` option, if the server says the content is `text/html`, the browser renders it as `text/html`.

1. Edit the *nginx.conf* file:

   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```

   Within the `http{}` code block, add the line: `add_header X-Content-Type-Options "nosniff";`

1. Save the file.
1. Restart Nginx.

## Additional Nginx suggestions

After upgrading the shared framework on the server, restart the ASP.NET Core apps hosted by the server.

## Additional resources

* [Prerequisites for .NET on Linux](https://learn.microsoft.com/dotnet/core/linux-prerequisites)
* [Nginx: Linux packages - Ubuntu](https://nginx.org/en/linux_packages.html#Ubuntu)
* [test/troubleshoot](../test/troubleshoot.md)
* [host-and-deploy/proxy-load-balancer](proxy-load-balancer.md)
* [NGINX: Using the Forwarded header](https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/)



**Applies to: \= aspnetcore-5.0**
This guide explains setting up a production-ready ASP.NET Core environment on an Ubuntu 16.04 server. These instructions likely work with newer versions of Ubuntu, but the instructions haven't been tested with newer versions.

For information on other Linux distributions supported by ASP.NET Core, see [Prerequisites for .NET Core on Linux](https://learn.microsoft.com/dotnet/core/linux-prerequisites).

> **Note:**
> For Ubuntu 14.04, `supervisord` is recommended as a solution for monitoring the Kestrel process. `systemd` isn't available on Ubuntu 14.04. For Ubuntu 14.04 instructions, see the [previous version of this topic](https://github.com/dotnet/AspNetCore.Docs/blob/e9c1419175c4dd7e152df3746ba1df5935aaafd5/aspnetcore/publishing/linuxproduction.md).

This guide:

* Places an existing ASP.NET Core app behind a reverse proxy server.
* Sets up the reverse proxy server to forward requests to the Kestrel web server.
* Ensures the web app runs on startup as a daemon.
* Configures a process management tool to help restart the web app.

## Prerequisites

* Access to an Ubuntu 16.04 server with a standard user account with sudo privilege.
* The latest non-preview [.NET runtime installed](https://learn.microsoft.com/dotnet/core/install/linux) on the server.
* An existing ASP.NET Core app.

At any point in the future after upgrading the shared framework, restart the ASP.NET Core apps hosted by the server.

## Publish and copy over the app

Configure the app for a [framework-dependent deployment](https://learn.microsoft.com/dotnet/core/deploying/#framework-dependent-deployments-fdd).

If the app is run locally in the [`Development` environment](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23configure-services-and-middleware-by-environment) and isn't configured by the server to make secure HTTPS connections, adopt either of the following approaches:

* Configure the app to handle secure local connections. For more information, see the [HTTPS configuration](#https-configuration) section.

* Configure the app to run at the insecure endpoint:

  * Deactivate HTTPS redirection middleware in the `Development` environment (`Program.cs`):

    ```csharp
    if (!app.Environment.IsDevelopment())
    {
        app.UseHttpsRedirection();
    }
    ```

    For more information, see [fundamentals/environments#configure-services-and-middleware-by-environment](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23configure-services-and-middleware-by-environment).

  * Remove `https://localhost:5001` (if present) from the `applicationUrl` property in the `Properties/launchSettings.json` file.

For more information on configuration by environment, see [fundamentals/environments](../fundamentals/environments.md).

Run [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) from the `Development` environment to package an app into a directory (for example, `bin/Release/{TARGET FRAMEWORK MONIKER}/publish`, where the placeholder `{TARGET FRAMEWORK MONIKER}` is the Target Framework Moniker/TFM) that can run on the server:

```dotnetcli
dotnet publish --configuration Release
```

The app can also be published as a [self-contained deployment](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd) if you prefer not to maintain the .NET Core runtime on the server.

Copy the ASP.NET Core app to the server using a tool that integrates into the organization's workflow (for example, `SCP`, `SFTP`). It's common to locate web apps under the `var` directory (for example, `var/www/helloapp`).

> **Note:**
> Under a production deployment scenario, a continuous integration workflow does the work of publishing the app and copying the assets to the server.

Test the app:

1. From the command line, run the app: `dotnet <app_assembly>.dll`.
1. In a browser, navigate to `http://<serveraddress>:<port>` to verify the app works on Linux locally.

## Configure a reverse proxy server

A reverse proxy is a common setup for serving dynamic web apps. A reverse proxy terminates the HTTP request and forwards it to the ASP.NET Core app.

### Use a reverse proxy server

Kestrel is great for serving dynamic content from ASP.NET Core. However, the web serving capabilities aren't as feature rich as servers such as IIS, Apache, or Nginx. A reverse proxy server can offload work such as serving static content, caching requests, compressing requests, and HTTPS termination from the HTTP server. A reverse proxy server may reside on a dedicated machine or may be deployed alongside an HTTP server.

For the purposes of this guide, a single instance of Nginx is used. It runs on the same server, alongside the HTTP server. Based on requirements, a different setup may be chosen.

Because requests are forwarded by reverse proxy, use the [forwarded headers middleware](proxy-load-balancer.md) from the [`Microsoft.AspNetCore.HttpOverrides`](https://www.nuget.org/packages/Microsoft.AspNetCore.HttpOverrides) package. The middleware updates the `Request.Scheme`, using the `X-Forwarded-Proto` header, so that redirect URIs and other security policies work correctly.

Forwarded headers middleware should run before other middleware. This ordering ensures that the middleware relying on forwarded headers information can consume the header values for processing. To run forwarded headers middleware after diagnostics and error handling middleware, see [forwarded headers middleware order](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fproxy-load-balancer%23forwarded-headers-middleware-order).

Invoke the [Microsoft.AspNetCore.Builder.ForwardedHeadersExtensions.UseForwardedHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersExtensions.UseForwardedHeaders%252A) method at the top of `Program.cs` before calling other middleware. Configure the middleware to forward the `X-Forwarded-For` and `X-Forwarded-Proto` headers:

```csharp
// requires using Microsoft.AspNetCore.HttpOverrides;
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseAuthentication();
```

If no [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions) are specified to the middleware, the default headers to forward are `None`.

Proxies running on loopback addresses (`127.0.0.0/8`, `[::1]`), including the standard localhost address (`127.0.0.1`), are trusted by default. If other trusted proxies or networks within the organization handle requests between the Internet and the web server, add them to the list of [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownProxies%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownProxies%252A) or [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks%252A) with [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions). The following example adds a trusted proxy server at IP address 10.0.0.100 to the forwarded headers middleware `KnownProxies` in `Program.cs`:

```csharp
using System.Net;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.KnownProxies.Add(IPAddress.Parse("10.0.0.100"));
});
```

For more information, see [host-and-deploy/proxy-load-balancer](proxy-load-balancer.md).

### Install Nginx

Use `apt-get` to install Nginx. The installer creates a `systemd` init script that runs Nginx as daemon on system startup. Follow the installation instructions for Ubuntu at [Nginx: Official Debian/Ubuntu packages](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/#official-debian-ubuntu-packages).

> **Note:**
> If optional Nginx modules are required, building Nginx from source might be required.

Since Nginx was installed for the first time, explicitly start it by running:

```bash
sudo service nginx start
```

Verify a browser displays the default landing page for Nginx. The landing page is reachable at `http://<server_IP_address>/index.nginx-debian.html`.

### Configure Nginx

To configure Nginx as a reverse proxy to forward HTTP requests to your ASP.NET Core app, modify `/etc/nginx/sites-available/default`. Open it in a text editor, and replace the contents with the following snippet:

```nginx
server {
    listen        80;
    server_name   example.com *.example.com;
    location / {
        proxy_pass         http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

If the app is a SignalR or Blazor Server app, see [signalr/scale#linux-with-nginx](https://learn.microsoft.com/search/?terms=signalr%2Fscale%23linux-with-nginx) and [blazor/host-and-deploy/server/index#linux-with-nginx](https://learn.microsoft.com/search/?terms=blazor%2Fhost-and-deploy%2Fserver%2Findex%23linux-with-nginx) respectively for more information.

When no `server_name` matches, Nginx uses the default server. If no default server is defined, the first server in the configuration file is the default server. As a best practice, add a specific default server that returns a status code of 444 in your configuration file. A default server configuration example is:

```nginx
server {
    listen   80 default_server;
    # listen [::]:80 default_server deferred;
    return   444;
}
```

With the preceding configuration file and default server, Nginx accepts public traffic on port 80 with host header `example.com` or `*.example.com`. Requests not matching these hosts won't get forwarded to Kestrel. Nginx forwards the matching requests to Kestrel at `http://127.0.0.1:5000`. For more information, see [How nginx processes a request](https://nginx.org/docs/http/request_processing.html). To change Kestrel's IP/port, see [Kestrel: Endpoint configuration](../fundamentals/servers/kestrel/endpoints.md).

> **Warning:**
> Failure to specify a proper [server_name directive](https://nginx.org/docs/http/server_names.html) exposes your app to security vulnerabilities. Subdomain wildcard binding (for example, `*.example.com`) doesn't pose this security risk if you control the entire parent domain (as opposed to `*.com`, which is vulnerable). For more information, see [RFC 9110: HTTP Semantics (Section 7.2: Host and :authority)](https://www.rfc-editor.org/rfc/rfc9110#field.host).

Once the Nginx configuration is established, run `sudo nginx -t` to verify the syntax of the configuration files. If the configuration file test is successful, force Nginx to pick up the changes by running `sudo nginx -s reload`.

To directly run the app on the server:

1. Navigate to the app's directory.
1. Run the app: `dotnet <app_assembly.dll>`, where `app_assembly.dll` is the assembly file name of the app.

If the app runs on the server but fails to respond over the Internet, check the server's firewall and confirm port 80 is open. If using an Azure Ubuntu VM, add a Network Security Group (NSG) rule that enables inbound port 80 traffic. There's no need to enable an outbound port 80 rule, as the outbound traffic is automatically granted when the inbound rule is enabled.

When done testing the app, shut down the app with <kbd>Ctrl</kbd>+<kbd>C</kbd> in the command shell.

## Monitor the app

The server is set up to forward requests made to `http://<serveraddress>:80` on to the ASP.NET Core app running on Kestrel at `http://127.0.0.1:5000`. However, Nginx isn't set up to manage the Kestrel process. `systemd` can be used to create a service file to start and monitor the underlying web app. `systemd` is an init system that provides many powerful features for starting, stopping, and managing processes. 

### Create the service file

Create the service definition file:

```bash
sudo nano /etc/systemd/system/kestrel-helloapp.service
```

The following example is a service file for the app:

```ini
[Unit]
Description=Example .NET Web API App running on Ubuntu

[Service]
WorkingDirectory=/var/www/helloapp
ExecStart=/usr/bin/dotnet /var/www/helloapp/helloapp.dll
Restart=always
# Restart service after 10 seconds if the dotnet service crashes:
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=dotnet-example
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_NOLOGO=true

[Install]
WantedBy=multi-user.target
```

In the preceding example, the user that manages the service is specified by the `User` option. The user (`www-data`) must exist and have proper ownership of the app's files.

Use `TimeoutStopSec` to configure the duration of time to wait for the app to shut down after it receives the initial interrupt signal. If the app doesn't shut down in this period, SIGKILL is issued to terminate the app. Provide the value as unitless seconds (for example, `150`), a time span value (for example, `2min 30s`), or `infinity` to disable the timeout. `TimeoutStopSec` defaults to the value of `DefaultTimeoutStopSec` in the manager configuration file (`systemd-system.conf`, `system.conf.d`, `systemd-user.conf`, `user.conf.d`). The default timeout for most distributions is 90 seconds.

```
# The default value is 90 seconds for most distributions.
TimeoutStopSec=90
```

Linux has a case-sensitive file system. Setting `ASPNETCORE_ENVIRONMENT` to `Production` results in searching for the configuration file `appsettings.Production.json`, not `appsettings.production.json`.

Some values (for example, SQL connection strings) must be escaped for the configuration providers to read the environment variables. Use the following command to generate a properly escaped value for use in the configuration file:

```console
systemd-escape "<value-to-escape>"
```

Colon (`:`) separators aren't supported in environment variable names. Use a double underscore (`__`) in place of a colon. The [Environment Variables configuration provider](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23environment-variables) converts double-underscores into colons when environment variables are read into configuration. In the following example, the connection string key `ConnectionStrings:DefaultConnection` is set into the service definition file as `ConnectionStrings__DefaultConnection`:

```
Environment=ConnectionStrings__DefaultConnection={Connection String}
```

Save the file and enable the service.

```bash
sudo systemctl enable kestrel-helloapp.service
```

Start the service and verify that it's running.

```
sudo systemctl start kestrel-helloapp.service
sudo systemctl status kestrel-helloapp.service

◝ kestrel-helloapp.service - Example .NET Web API App running on Ubuntu
    Loaded: loaded (/etc/systemd/system/kestrel-helloapp.service; enabled)
    Active: active (running) since Thu 2016-10-18 04:09:35 NZDT; 35s ago
Main PID: 9021 (dotnet)
    CGroup: /system.slice/kestrel-helloapp.service
            └─9021 /usr/local/bin/dotnet /var/www/helloapp/helloapp.dll
```

With the reverse proxy configured and Kestrel managed through `systemd`, the web app is fully configured and can be accessed from a browser on the local machine at `http://localhost`. It's also accessible from a remote machine, barring any firewall that might be blocking. Inspecting the response headers, the `Server` header shows the ASP.NET Core app being served by Kestrel.

```text
HTTP/1.1 200 OK
Date: Tue, 11 Oct 2016 16:22:23 GMT
Server: Kestrel
Keep-Alive: timeout=5, max=98
Connection: Keep-Alive
Transfer-Encoding: chunked
```

### View logs

Since the web app using Kestrel is managed using `systemd`, all events and processes are logged to a centralized journal. However, this journal includes all entries for all services and processes managed by `systemd`. To view the `kestrel-helloapp.service`-specific items, use the following command:

```bash
sudo journalctl -fu kestrel-helloapp.service
```

For further filtering, time options such as `--since today`, `--until 1 hour ago`, or a combination of these can reduce the number of entries returned.

```bash
sudo journalctl -fu kestrel-helloapp.service --since "2016-10-18" --until "2016-10-18 04:00"
```

## Data protection

The [ASP.NET Core Data Protection stack](../security/data-protection/introduction.md) is used by several ASP.NET Core [middlewares](../fundamentals/middleware/index.md), including authentication middleware (for example, cookie middleware) and cross-site request forgery (CSRF) protections. Even if Data Protection APIs aren't called by user code, data protection should be configured to create a persistent cryptographic [key store](../security/data-protection/implementation/key-management.md). If data protection isn't configured, the keys are held in memory and discarded when the app restarts.

If the key ring is stored in memory when the app restarts:

* All cookie-based authentication tokens are invalidated.
* Users are required to sign in again on their next request.
* Any data protected with the key ring can no longer be decrypted. This may include [CSRF tokens](https://learn.microsoft.com/search/?terms=security%2Fanti-request-forgery%23aspnet-core-antiforgery-configuration) and [ASP.NET Core MVC TempData cookies](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23tempdata).

To configure data protection to persist and encrypt the key ring, see:

* [security/data-protection/implementation/key-storage-providers](../security/data-protection/implementation/key-storage-providers.md)
* [security/data-protection/implementation/key-encryption-at-rest](../security/data-protection/implementation/key-encryption-at-rest.md)

## Long request header fields

Proxy server default settings typically limit request header fields to 4 K or 8 K depending on the platform. An app may require fields longer than the default (for example, apps that use [Azure Active Directory](https://azure.microsoft.com/services/active-directory/)). If longer fields are required, the proxy server's default settings require adjustment. The values to apply depend on the scenario. For more information, see your server's documentation.

* [proxy_buffer_size](https://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffer_size)
* [proxy_buffers](https://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffers)
* [proxy_busy_buffers_size](https://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_busy_buffers_size)
* [large_client_header_buffers](https://nginx.org/docs/http/ngx_http_core_module.html#large_client_header_buffers)

> **Warning:**
> Don't increase the default values of proxy buffers unless necessary. Increasing these values increases the risk of buffer overrun (overflow) and Denial of Service (DoS) attacks by malicious users.

## Secure the app

### Enable AppArmor

Linux Security Modules (LSM) is a framework that's part of the Linux kernel since Linux 2.6. LSM supports different implementations of security modules. [AppArmor](https://wiki.ubuntu.com/AppArmor) is an LSM that implements a Mandatory Access Control system, which allows confining the program to a limited set of resources. Ensure AppArmor is enabled and properly configured.

### Configure the firewall

Close off all external ports that aren't in use. Uncomplicated firewall (ufw) provides a front end for `iptables` by providing a CLI for configuring the firewall.

> **Warning:**
> A firewall will prevent access to the whole system if not configured correctly. Failure to specify the correct SSH port will effectively lock you out of the system if you are using SSH to connect to it. The default port is 22. For more information, see the [introduction to ufw](https://help.ubuntu.com/community/UFW) and the [manual](https://manpages.ubuntu.com/manpages/resolute/man8/ufw.8.html).

Install `ufw` and configure it to allow traffic on any ports needed.

```bash
sudo apt-get install ufw

sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

sudo ufw enable
```

### Secure Nginx

#### Change the Nginx response name

Edit `src/http/ngx_http_header_filter_module.c`:

```
static char ngx_http_server_string[] = "Server: Web Server" CRLF;
static char ngx_http_server_full_string[] = "Server: Web Server" CRLF;
```

#### Configure options

Configure the server with additional required modules. Consider using a web app firewall, such as [ModSecurity](https://www.modsecurity.org/), to harden the app.

#### HTTPS configuration

**Configure the app for secure (HTTPS) local connections**

The [dotnet run](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) command uses the app's `Properties/launchSettings.json` file, which configures the app to listen on the URLs provided by the `applicationUrl` property. For example, `https://localhost:5001;http://localhost:5000`.

Configure the app to use a certificate in development for the `dotnet run` command or development environment (<kbd>F5</kbd> or <kbd>Ctrl</kbd>+<kbd>F5</kbd> in Visual Studio Code) using one of the following approaches:

* [Replace the default certificate from configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Fendpoints%23configuration) (*Recommended*)
* [KestrelServerOptions.ConfigureHttpsDefaults](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%2Fendpoints%23configurehttpsdefaultsactionhttpsconnectionadapteroptions)

**Configure the reverse proxy for secure (HTTPS) client connections**

> **Warning:**
> The security configuration in this section is a general configuration to be used as a starting point for further customization. We're unable to provide support for third-party tooling, servers, and operating systems. *Use the configuration in this section at your own risk.* For more information, access the following resources:
>
> * [Configuring HTTPS servers](http://nginx.org/docs/http/configuring_https_servers.html) (Nginx documentation)
> * [mozilla.org SSL Configuration Generator](https://ssl-config.mozilla.org/#server=nginx)

* Configure the server to listen to HTTPS traffic on port 443 by specifying a valid certificate issued by a trusted Certificate Authority (CA).

* Harden the security by employing some of the practices depicted in the following */etc/nginx/nginx.conf* file.

* The following example doesn't configure the server to redirect insecure requests. We recommend using HTTPS redirection middleware. For more information, see [security/enforcing-ssl](../security/enforcing-ssl.md).

  > **Note:**
  > For development environments where the server configuration handles secure redirection instead of HTTPS redirection middleware, we recommend using temporary redirects (302) rather than permanent redirects (301). Link caching can cause unstable behavior in development environments.

* Adding a `Strict-Transport-Security` (HSTS) header ensures all subsequent requests made by the client are over HTTPS. For guidance on setting the `Strict-Transport-Security` header, see [security/enforcing-ssl#http-strict-transport-security-hsts-protocol](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23http-strict-transport-security-hsts-protocol).

* If HTTPS will be disabled in the future, use one of the following approaches:

  * Don't add the HSTS header.
  * Choose a short `max-age` value.

Add the */etc/nginx/proxy.conf* configuration file:

[Code reference unavailable in this source snapshot: linux-nginx/includes/~/host-and-deploy/linux-nginx/proxy.conf](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/host-and-deploy/linux-nginx.md)

**Replace** the contents of the */etc/nginx/nginx.conf* configuration file with the following file. The example contains both `http` and `server` sections in one configuration file.

[Code reference unavailable in this source snapshot: linux-nginx/includes/~/host-and-deploy/linux-nginx/nginx.conf](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/host-and-deploy/linux-nginx.md)

> **Note:**
> Blazor WebAssembly apps require a larger `burst` parameter value to accommodate the larger number of requests made by an app. For more information, see [blazor/host-and-deploy/webassembly/nginx](../blazor/host-and-deploy/webassembly/nginx.md).

> **Note:**
> The preceding example disables Online Certificate Status Protocol (OCSP) Stapling. If enabled, confirm that the certificate supports the feature. For more information and guidance on enabling OCSP, see the following properties in the [Module ngx_http_ssl_module (Nginx documentation)](http://nginx.org/en/docs/http/ngx_http_ssl_module.html) article:
>
> * `ssl_stapling`
> * `ssl_stapling_file`
> * `ssl_stapling_responder`
> * `ssl_stapling_verify`

#### Secure Nginx from clickjacking

[Clickjacking](https://blog.qualys.com/securitylabs/2015/10/20/clickjacking-a-common-implementation-mistake-that-can-put-your-websites-in-danger), also known as a *UI redress attack*, is a malicious attack where a website visitor is tricked into clicking a link or button on a different page than they're currently visiting. Use `X-FRAME-OPTIONS` to secure the site.

To mitigate clickjacking attacks:

1. Edit the *nginx.conf* file:

   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```

   Add the line: `add_header X-Frame-Options "SAMEORIGIN";`

1. Save the file.
1. Restart Nginx.

#### MIME-type sniffing

This header prevents most browsers from MIME-sniffing a response away from the declared content type, as the header instructs the browser not to override the response content type. With the `nosniff` option, if the server says the content is `text/html`, the browser renders it as `text/html`.

1. Edit the *nginx.conf* file:

   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```

   Add the line: `add_header X-Content-Type-Options "nosniff";`

1. Save the file.
1. Restart Nginx.

## Additional Nginx suggestions

After upgrading the shared framework on the server, restart the ASP.NET Core apps hosted by the server.

## Additional resources

* [Prerequisites for .NET Core on Linux](https://learn.microsoft.com/dotnet/core/linux-prerequisites)
* [Nginx: Binary Releases: Official Debian/Ubuntu packages](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/#official-debian-ubuntu-packages)
* [test/troubleshoot](../test/troubleshoot.md)
* [host-and-deploy/proxy-load-balancer](proxy-load-balancer.md)
* [NGINX: Using the Forwarded header](https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/)



**Applies to: \= aspnetcore-3.1**

This guide explains setting up a production-ready ASP.NET Core environment on an Ubuntu 16.04 server. These instructions likely work with newer versions of Ubuntu, but the instructions haven't been tested with newer versions.

For information on other Linux distributions supported by ASP.NET Core, see [Prerequisites for .NET Core on Linux](https://learn.microsoft.com/dotnet/core/linux-prerequisites).

> **Note:**
> For Ubuntu 14.04, `supervisord` is recommended as a solution for monitoring the Kestrel process. `systemd` isn't available on Ubuntu 14.04. For Ubuntu 14.04 instructions, see the [previous version of this topic](https://github.com/dotnet/AspNetCore.Docs/blob/e9c1419175c4dd7e152df3746ba1df5935aaafd5/aspnetcore/publishing/linuxproduction.md).

This guide:

* Places an existing ASP.NET Core app behind a reverse proxy server.
* Sets up the reverse proxy server to forward requests to the Kestrel web server.
* Ensures the web app runs on startup as a daemon.
* Configures a process management tool to help restart the web app.

## Prerequisites

* Access to an Ubuntu 16.04 server with a standard user account with sudo privilege.
* The latest non-preview [.NET runtime installed](https://learn.microsoft.com/dotnet/core/install/linux) on the server.
* An existing ASP.NET Core app.

At any point in the future after upgrading the shared framework, restart the ASP.NET Core apps hosted by the server.

## Publish and copy over the app

Configure the app for a [framework-dependent deployment](https://learn.microsoft.com/dotnet/core/deploying/#framework-dependent-deployments-fdd).

If the app is run locally in the [`Development` environment](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23configure-services-and-middleware-by-environment) and isn't configured by the server to make secure HTTPS connections, adopt either of the following approaches:

* Configure the app to handle secure local connections. For more information, see the [HTTPS configuration](#https-configuration) section.

* Configure the app to run at the insecure endpoint:

  * Deactivate HTTPS redirection middleware in the `Development` environment (`Program.cs`):

    ```csharp
    if (!app.Environment.IsDevelopment())
    {
        app.UseHttpsRedirection();
    }
    ```

    For more information, see [fundamentals/environments#configure-services-and-middleware-by-environment](https://learn.microsoft.com/search/?terms=fundamentals%2Fenvironments%23configure-services-and-middleware-by-environment).

  * Remove `https://localhost:5001` (if present) from the `applicationUrl` property in the `Properties/launchSettings.json` file.

For more information on configuration by environment, see [fundamentals/environments](../fundamentals/environments.md).

Run [dotnet publish](https://learn.microsoft.com/dotnet/core/tools/dotnet-publish) from the `Development` environment to package an app into a directory (for example, `bin/Release/{TARGET FRAMEWORK MONIKER}/publish`, where the placeholder `{TARGET FRAMEWORK MONIKER}` is the Target Framework Moniker/TFM) that can run on the server:

```dotnetcli
dotnet publish --configuration Release
```

The app can also be published as a [self-contained deployment](https://learn.microsoft.com/dotnet/core/deploying/#self-contained-deployments-scd) if you prefer not to maintain the .NET Core runtime on the server.

Copy the ASP.NET Core app to the server using a tool that integrates into the organization's workflow (for example, `SCP`, `SFTP`). It's common to locate web apps under the `var` directory (for example, `var/www/helloapp`).

> **Note:**
> Under a production deployment scenario, a continuous integration workflow does the work of publishing the app and copying the assets to the server.

Test the app:

1. From the command line, run the app: `dotnet <app_assembly>.dll`.
1. In a browser, navigate to `http://<serveraddress>:<port>` to verify the app works on Linux locally.

## Configure a reverse proxy server

A reverse proxy is a common setup for serving dynamic web apps. A reverse proxy terminates the HTTP request and forwards it to the ASP.NET Core app.

### Use a reverse proxy server

Kestrel is great for serving dynamic content from ASP.NET Core. However, the web serving capabilities aren't as feature rich as servers such as IIS, Apache, or Nginx. A reverse proxy server can offload work such as serving static content, caching requests, compressing requests, and HTTPS termination from the HTTP server. A reverse proxy server may reside on a dedicated machine or may be deployed alongside an HTTP server.

For the purposes of this guide, a single instance of Nginx is used. It runs on the same server, alongside the HTTP server. Based on requirements, a different setup may be chosen.

Because requests are forwarded by reverse proxy, use the [forwarded headers middleware](proxy-load-balancer.md) from the [`Microsoft.AspNetCore.HttpOverrides`](https://www.nuget.org/packages/Microsoft.AspNetCore.HttpOverrides) package. The middleware updates the `Request.Scheme`, using the `X-Forwarded-Proto` header, so that redirect URIs and other security policies work correctly.

Forwarded headers middleware should run before other middleware. This ordering ensures that the middleware relying on forwarded headers information can consume the header values for processing. To run forwarded headers middleware after diagnostics and error handling middleware, see [forwarded headers middleware order](https://learn.microsoft.com/search/?terms=host-and-deploy%2Fproxy-load-balancer%23forwarded-headers-middleware-order).

Invoke the [Microsoft.AspNetCore.Builder.ForwardedHeadersExtensions.UseForwardedHeaders%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersExtensions.UseForwardedHeaders%252A) method at the top of the request processing pipeline before calling other middleware. Configure the middleware to forward the `X-Forwarded-For` and `X-Forwarded-Proto` headers:

```csharp
using Microsoft.AspNetCore.HttpOverrides;

...

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseAuthentication();
```

If no [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions) are specified to the middleware, the default headers to forward are `None`.

Proxies running on loopback addresses (`127.0.0.0/8`, `[::1]`), including the standard localhost address (`127.0.0.1`), are trusted by default. If other trusted proxies or networks within the organization handle requests between the Internet and the web server, add them to the list of [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownProxies%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownProxies%252A) or [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks%252A) with [Microsoft.AspNetCore.Builder.ForwardedHeadersOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.ForwardedHeadersOptions). The following example adds a trusted proxy server at IP address 10.0.0.100 to the forwarded headers middleware `KnownProxies` in `Startup.ConfigureServices`:

```csharp
using System.Net;

...

services.Configure<ForwardedHeadersOptions>(options =>
{
    options.KnownProxies.Add(IPAddress.Parse("10.0.0.100"));
});
```

For more information, see [host-and-deploy/proxy-load-balancer](proxy-load-balancer.md).

### Install Nginx

Use `apt-get` to install Nginx. The installer creates a `systemd` init script that runs Nginx as daemon on system startup. Follow the installation instructions for Ubuntu at [Nginx: Official Debian/Ubuntu packages](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/#official-debian-ubuntu-packages).

> **Note:**
> If optional Nginx modules are required, building Nginx from source might be required.

Since Nginx was installed for the first time, explicitly start it by running:

```bash
sudo service nginx start
```

Verify a browser displays the default landing page for Nginx. The landing page is reachable at `http://<server_IP_address>/index.nginx-debian.html`.

### Configure Nginx

To configure Nginx as a reverse proxy to forward HTTP requests to your ASP.NET Core app, modify `/etc/nginx/sites-available/default`. Open it in a text editor, and replace the contents with the following snippet:

```nginx
server {
    listen        80;
    server_name   example.com *.example.com;
    location / {
        proxy_pass         http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

If the app is a SignalR or Blazor Server app, see [signalr/scale#linux-with-nginx](https://learn.microsoft.com/search/?terms=signalr%2Fscale%23linux-with-nginx) and [blazor/host-and-deploy/server/index#linux-with-nginx](https://learn.microsoft.com/search/?terms=blazor%2Fhost-and-deploy%2Fserver%2Findex%23linux-with-nginx) respectively for more information.

When no `server_name` matches, Nginx uses the default server. If no default server is defined, the first server in the configuration file is the default server. As a best practice, add a specific default server that returns a status code of 444 in your configuration file. A default server configuration example is:

```nginx
server {
    listen   80 default_server;
    # listen [::]:80 default_server deferred;
    return   444;
}
```

With the preceding configuration file and default server, Nginx accepts public traffic on port 80 with host header `example.com` or `*.example.com`. Requests not matching these hosts won't get forwarded to Kestrel. Nginx forwards the matching requests to Kestrel at `http://127.0.0.1:5000`. For more information, see [How nginx processes a request](https://nginx.org/docs/http/request_processing.html). To change Kestrel's IP/port, see [Kestrel: Endpoint configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%23endpoint-configuration).

> **Warning:**
> Failure to specify a proper [server_name directive](https://nginx.org/docs/http/server_names.html) exposes your app to security vulnerabilities. Subdomain wildcard binding (for example, `*.example.com`) doesn't pose this security risk if you control the entire parent domain (as opposed to `*.com`, which is vulnerable). For more information, see [RFC 9110: HTTP Semantics (Section 7.2: Host and :authority)](https://www.rfc-editor.org/rfc/rfc9110#field.host).

Once the Nginx configuration is established, run `sudo nginx -t` to verify the syntax of the configuration files. If the configuration file test is successful, force Nginx to pick up the changes by running `sudo nginx -s reload`.

To directly run the app on the server:

1. Navigate to the app's directory.
1. Run the app: `dotnet <app_assembly.dll>`, where `app_assembly.dll` is the assembly file name of the app.

If the app runs on the server but fails to respond over the Internet, check the server's firewall and confirm port 80 is open. If using an Azure Ubuntu VM, add a Network Security Group (NSG) rule that enables inbound port 80 traffic. There's no need to enable an outbound port 80 rule, as the outbound traffic is automatically granted when the inbound rule is enabled.

When done testing the app, shut down the app with <kbd>Ctrl</kbd>+<kbd>C</kbd> in the command shell.

## Monitor the app

The server is set up to forward requests made to `http://<serveraddress>:80` on to the ASP.NET Core app running on Kestrel at `http://127.0.0.1:5000`. However, Nginx isn't set up to manage the Kestrel process. `systemd` can be used to create a service file to start and monitor the underlying web app. `systemd` is an init system that provides many powerful features for starting, stopping, and managing processes. 

### Create the service file

Create the service definition file:

```bash
sudo nano /etc/systemd/system/kestrel-helloapp.service
```

The following example is a service file for the app:

```ini
[Unit]
Description=Example .NET Web API App running on Ubuntu

[Service]
WorkingDirectory=/var/www/helloapp
ExecStart=/usr/bin/dotnet /var/www/helloapp/helloapp.dll
Restart=always
# Restart service after 10 seconds if the dotnet service crashes:
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=dotnet-example
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

[Install]
WantedBy=multi-user.target
```

In the preceding example, the user that manages the service is specified by the `User` option. The user (`www-data`) must exist and have proper ownership of the app's files.

Use `TimeoutStopSec` to configure the duration of time to wait for the app to shut down after it receives the initial interrupt signal. If the app doesn't shut down in this period, SIGKILL is issued to terminate the app. Provide the value as unitless seconds (for example, `150`), a time span value (for example, `2min 30s`), or `infinity` to disable the timeout. `TimeoutStopSec` defaults to the value of `DefaultTimeoutStopSec` in the manager configuration file (`systemd-system.conf`, `system.conf.d`, `systemd-user.conf`, `user.conf.d`). The default timeout for most distributions is 90 seconds.

```
# The default value is 90 seconds for most distributions.
TimeoutStopSec=90
```

Linux has a case-sensitive file system. Setting `ASPNETCORE_ENVIRONMENT` to `Production` results in searching for the configuration file `appsettings.Production.json`, not `appsettings.production.json`.

Some values (for example, SQL connection strings) must be escaped for the configuration providers to read the environment variables. Use the following command to generate a properly escaped value for use in the configuration file:

```console
systemd-escape "<value-to-escape>"
```

Colon (`:`) separators aren't supported in environment variable names. Use a double underscore (`__`) in place of a colon. The [Environment Variables configuration provider](https://learn.microsoft.com/search/?terms=fundamentals%2Fconfiguration%2Findex%23environment-variables) converts double-underscores into colons when environment variables are read into configuration. In the following example, the connection string key `ConnectionStrings:DefaultConnection` is set into the service definition file as `ConnectionStrings__DefaultConnection`:

```
Environment=ConnectionStrings__DefaultConnection={Connection String}
```

Save the file and enable the service.

```bash
sudo systemctl enable kestrel-helloapp.service
```

Start the service and verify that it's running.

```
sudo systemctl start kestrel-helloapp.service
sudo systemctl status kestrel-helloapp.service

◝ kestrel-helloapp.service - Example .NET Web API App running on Ubuntu
    Loaded: loaded (/etc/systemd/system/kestrel-helloapp.service; enabled)
    Active: active (running) since Thu 2016-10-18 04:09:35 NZDT; 35s ago
Main PID: 9021 (dotnet)
    CGroup: /system.slice/kestrel-helloapp.service
            └─9021 /usr/local/bin/dotnet /var/www/helloapp/helloapp.dll
```

With the reverse proxy configured and Kestrel managed through `systemd`, the web app is fully configured and can be accessed from a browser on the local machine at `http://localhost`. It's also accessible from a remote machine, barring any firewall that might be blocking. Inspecting the response headers, the `Server` header shows the ASP.NET Core app being served by Kestrel.

```text
HTTP/1.1 200 OK
Date: Tue, 11 Oct 2016 16:22:23 GMT
Server: Kestrel
Keep-Alive: timeout=5, max=98
Connection: Keep-Alive
Transfer-Encoding: chunked
```

### View logs

Since the web app using Kestrel is managed using `systemd`, all events and processes are logged to a centralized journal. However, this journal includes all entries for all services and processes managed by `systemd`. To view the `kestrel-helloapp.service`-specific items, use the following command:

```bash
sudo journalctl -fu kestrel-helloapp.service
```

For further filtering, time options such as `--since today`, `--until 1 hour ago`, or a combination of these can reduce the number of entries returned.

```bash
sudo journalctl -fu kestrel-helloapp.service --since "2016-10-18" --until "2016-10-18 04:00"
```

## Data protection

The [ASP.NET Core Data Protection stack](../security/data-protection/introduction.md) is used by several ASP.NET Core [middlewares](../fundamentals/middleware/index.md), including authentication middleware (for example, cookie middleware) and cross-site request forgery (CSRF) protections. Even if Data Protection APIs aren't called by user code, data protection should be configured to create a persistent cryptographic [key store](../security/data-protection/implementation/key-management.md). If data protection isn't configured, the keys are held in memory and discarded when the app restarts.

If the key ring is stored in memory when the app restarts:

* All cookie-based authentication tokens are invalidated.
* Users are required to sign in again on their next request.
* Any data protected with the key ring can no longer be decrypted. This may include [CSRF tokens](https://learn.microsoft.com/search/?terms=security%2Fanti-request-forgery%23aspnet-core-antiforgery-configuration) and [ASP.NET Core MVC TempData cookies](https://learn.microsoft.com/search/?terms=fundamentals%2Fapp-state%23tempdata).

To configure data protection to persist and encrypt the key ring, see:

* [security/data-protection/implementation/key-storage-providers](../security/data-protection/implementation/key-storage-providers.md)
* [security/data-protection/implementation/key-encryption-at-rest](../security/data-protection/implementation/key-encryption-at-rest.md)

## Long request header fields

Proxy server default settings typically limit request header fields to 4 K or 8 K depending on the platform. An app may require fields longer than the default (for example, apps that use [Azure Active Directory](https://azure.microsoft.com/services/active-directory/)). If longer fields are required, the proxy server's default settings require adjustment. The values to apply depend on the scenario. For more information, see your server's documentation.

* [proxy_buffer_size](https://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffer_size)
* [proxy_buffers](https://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffers)
* [proxy_busy_buffers_size](https://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_busy_buffers_size)
* [large_client_header_buffers](https://nginx.org/docs/http/ngx_http_core_module.html#large_client_header_buffers)

> **Warning:**
> Don't increase the default values of proxy buffers unless necessary. Increasing these values increases the risk of buffer overrun (overflow) and Denial of Service (DoS) attacks by malicious users.

## Secure the app

### Enable AppArmor

Linux Security Modules (LSM) is a framework that's part of the Linux kernel since Linux 2.6. LSM supports different implementations of security modules. [AppArmor](https://wiki.ubuntu.com/AppArmor) is an LSM that implements a Mandatory Access Control system, which allows confining the program to a limited set of resources. Ensure AppArmor is enabled and properly configured.

### Configure the firewall

Close off all external ports that aren't in use. Uncomplicated firewall (ufw) provides a front end for `iptables` by providing a CLI for configuring the firewall.

> **Warning:**
> A firewall will prevent access to the whole system if not configured correctly. Failure to specify the correct SSH port will effectively lock you out of the system if you are using SSH to connect to it. The default port is 22. For more information, see the [introduction to ufw](https://help.ubuntu.com/community/UFW) and the [manual](https://manpages.ubuntu.com/manpages/resolute/man8/ufw.8.html).

Install `ufw` and configure it to allow traffic on any ports needed.

```bash
sudo apt-get install ufw

sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

sudo ufw enable
```

### Secure Nginx

#### Change the Nginx response name

Edit `src/http/ngx_http_header_filter_module.c`:

```
static char ngx_http_server_string[] = "Server: Web Server" CRLF;
static char ngx_http_server_full_string[] = "Server: Web Server" CRLF;
```

#### Configure options

Configure the server with additional required modules. Consider using a web app firewall, such as [ModSecurity](https://www.modsecurity.org/), to harden the app.

#### HTTPS configuration

**Configure the app for secure (HTTPS) local connections**

The [dotnet run](https://learn.microsoft.com/dotnet/core/tools/dotnet-run) command uses the app's `Properties/launchSettings.json` file, which configures the app to listen on the URLs provided by the `applicationUrl` property. For example, `https://localhost:5001;http://localhost:5000`.

Configure the app to use a certificate in development for the `dotnet run` command or development environment (<kbd>F5</kbd> or <kbd>Ctrl</kbd>+<kbd>F5</kbd> in Visual Studio Code) using one of the following approaches:

* [Replace the default certificate from configuration](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%23configuration) (*Recommended*)
* [KestrelServerOptions.ConfigureHttpsDefaults](https://learn.microsoft.com/search/?terms=fundamentals%2Fservers%2Fkestrel%23configurehttpsdefaultsactionhttpsconnectionadapteroptions)


**Configure the reverse proxy for secure (HTTPS) client connections**

> **Warning:**
> The security configuration in this section is a general configuration to be used as a starting point for further customization. We're unable to provide support for third-party tooling, servers, and operating systems. *Use the configuration in this section at your own risk.* For more information, access the following resources:
>
> * [Configuring HTTPS servers](http://nginx.org/docs/http/configuring_https_servers.html) (Nginx documentation)
> * [mozilla.org SSL Configuration Generator](https://ssl-config.mozilla.org/#server=nginx)

* Configure the server to listen to HTTPS traffic on port 443 by specifying a valid certificate issued by a trusted Certificate Authority (CA).

* Harden the security by employing some of the practices depicted in the following */etc/nginx/nginx.conf* file.

* The following example doesn't configure the server to redirect insecure requests. We recommend using HTTPS redirection middleware. For more information, see [security/enforcing-ssl](../security/enforcing-ssl.md).

  > **Note:**
  > For development environments where the server configuration handles secure redirection instead of HTTPS redirection middleware, we recommend using temporary redirects (302) rather than permanent redirects (301). Link caching can cause unstable behavior in development environments.

* Adding a `Strict-Transport-Security` (HSTS) header ensures all subsequent requests made by the client are over HTTPS. For guidance on setting the `Strict-Transport-Security` header, see [security/enforcing-ssl#http-strict-transport-security-hsts-protocol](https://learn.microsoft.com/search/?terms=security%2Fenforcing-ssl%23http-strict-transport-security-hsts-protocol).

* If HTTPS will be disabled in the future, use one of the following approaches:

  * Don't add the HSTS header.
  * Choose a short `max-age` value.

Add the */etc/nginx/proxy.conf* configuration file:

[Code reference unavailable in this source snapshot: linux-nginx/includes/~/host-and-deploy/linux-nginx/proxy.conf](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/host-and-deploy/linux-nginx.md)

**Replace** the contents of the */etc/nginx/nginx.conf* configuration file with the following file. The example contains both `http` and `server` sections in one configuration file.

[Code reference unavailable in this source snapshot: linux-nginx/includes/~/host-and-deploy/linux-nginx/nginx.conf](https://github.com/dotnet/AspNetCore.Docs/blob/970aa3fd243493b204e11c0f29472fd3f0399fee/aspnetcore/host-and-deploy/linux-nginx.md)

> **Note:**
> Blazor WebAssembly apps require a larger `burst` parameter value to accommodate the larger number of requests made by an app. For more information, see [blazor/host-and-deploy/webassembly/nginx](../blazor/host-and-deploy/webassembly/nginx.md).

> **Note:**
> The preceding example disables Online Certificate Status Protocol (OCSP) Stapling. If enabled, confirm that the certificate supports the feature. For more information and guidance on enabling OCSP, see the following properties in the [Module ngx_http_ssl_module (Nginx documentation)](http://nginx.org/en/docs/http/ngx_http_ssl_module.html) article:
>
> * `ssl_stapling`
> * `ssl_stapling_file`
> * `ssl_stapling_responder`
> * `ssl_stapling_verify`

#### Secure Nginx from clickjacking

[Clickjacking](https://blog.qualys.com/securitylabs/2015/10/20/clickjacking-a-common-implementation-mistake-that-can-put-your-websites-in-danger), also known as a *UI redress attack*, is a malicious attack where a website visitor is tricked into clicking a link or button on a different page than they're currently visiting. Use `X-FRAME-OPTIONS` to secure the site.

To mitigate clickjacking attacks:

1. Edit the *nginx.conf* file:

   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```

   Add the line: `add_header X-Frame-Options "SAMEORIGIN";`

1. Save the file.
1. Restart Nginx.

#### MIME-type sniffing

This header prevents most browsers from MIME-sniffing a response away from the declared content type, as the header instructs the browser not to override the response content type. With the `nosniff` option, if the server says the content is `text/html`, the browser renders it as `text/html`.

1. Edit the *nginx.conf* file:

   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```

   Add the line: `add_header X-Content-Type-Options "nosniff";`

1. Save the file.
1. Restart Nginx.

## Additional Nginx suggestions

After upgrading the shared framework on the server, restart the ASP.NET Core apps hosted by the server.

## Additional resources

* [Prerequisites for .NET Core on Linux](https://learn.microsoft.com/dotnet/core/linux-prerequisites)
* [Nginx: Binary Releases: Official Debian/Ubuntu packages](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/#official-debian-ubuntu-packages)
* [test/troubleshoot](../test/troubleshoot.md)
* [host-and-deploy/proxy-load-balancer](proxy-load-balancer.md)
* [NGINX: Using the Forwarded header](https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/)
