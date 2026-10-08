---
title: Proxy your calling traffic
titleSuffix: An Azure Communication Services article
description: This article describes how to have your media and signaling traffic proxied to servers that you can control.
author: sloanster
services: azure-communication-services

ms.author: micahvivion
ms.date: 06/27/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: calling
ms.custom: mode-other
zone_pivot_groups: acs-plat-web-ios-android-windows
---

# Proxy your calling traffic


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes how to proxy your Azure Communication Services calling traffic across your own servers.

In certain situations, it might be useful to have all your client traffic proxied to a server that you can control. When the SDK is initializing, you can provide the details of your servers that you want the traffic to route to. Once enabled, all the media traffic (audio/video/screen sharing) travels through the provided TURN servers instead of the Azure Communication Services defaults.

This article describes how to:

> 
> * Set up a TURN server.
> * Set up a signaling proxy server.

## Prerequisites

None

**Applies to: platform-web**


The proxy feature is general available starting in the public version [1.25.1](https://www.npmjs.com/package/@azure/communication-calling/v/1.25.1) of Azure Communication Services Calling SDK. Make sure that you use this SDK or a later version of the SDK when you try to use this feature. This tutorial uses a version of the Calling SDK 1.13.0-beta.1 where this feature became first available on public preview.

## Proxy calling media traffic

The following sections describe how to proxy call your media traffic.

### What is a TURN server?

Many times, establishing a network connection between two peers isn't straightforward. A direct connection might not work because of:

- Firewalls with strict rules.
- Peers sitting behind a private network.
- Computers running in a network address translation (NAT) environment.

To solve these network connection issues, you can use a server that uses the Traversal Using Relay NAT (TURN) protocol for relaying network traffic. Session Traversal Utilities for NAT (STUN) and TURN servers are the relay servers.

### Provide your TURN server details to the SDK

To provide the details of your TURN servers, you need to pass details of what TURN server to use as part of `CallClientOptions` while initializing `CallClient`. For more information on how to set up a call, see [Azure Communication Services Web SDK](../quickstarts/voice-video-calling/get-started-with-video-calling.md?pivots=platform-web) for the quickstart on how to set up voice and video.

```js
import { CallClient } from '@azure/communication-calling'; 

const myTurn1 = {
    urls: [
        'turn:turn.azure.com:3478?transport=udp',
        'turn:turn1.azure.com:3478?transport=udp',
    ],
    username: 'turnserver1username',
    credential: 'turnserver1credentialorpass'
};

const myTurn2 = {
    urls: [
        'turn:20.202.255.255:3478',
        'turn:20.202.255.255:3478?transport=tcp',
    ],
    username: 'turnserver2username',
    credential: 'turnserver2credentialorpass'
};

// While you are creating an instance of the CallClient (the entry point of the SDK):
const callClient = new CallClient({
    networkConfiguration: {
        turn: {
            iceServers: [
                myTurn1,
                myTurn2
            ]
        }
    }
});

// ...continue normally with your SDK setup and usage.
```

> **Important:**
> If you provided your TURN server details while you initialized `CallClient`, all the media traffic *exclusively* flows through these TURN servers. Any other ICE candidates that are normally generated when you create a call aren't considered while trying to establish connectivity between peers. That means only `relay` candidates are considered. For more information about different types of Ice candidates, see [RTCIceCandidate: type property](https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate/type).

If the `?transport` query parameter isn't present as part of the TURN URL or isn't one of the `udp`, `tcp`, or `tls` values, the default behavior is UDP.

If any of the URLs provided are invalid or don't have one of the `turn:`, `turns:`, or `stun:` schemas, the `CallClient` initialization fails and throws errors accordingly. The error messages that are thrown should help you troubleshoot if you run into issues.

For the API reference for the `CallClientOptions` object, and the `networkConfiguration` property within it, see [CallClientOptions](https://learn.microsoft.com/javascript/api/azure-communication-services/@azure/communication-calling/callclientoptions?view=azure-communication-services-js\&preserve-view=true).

### Set up a TURN server in Azure

You can create a Linux virtual machine in the Azure portal. For more information, see [Quickstart: Create a Linux virtual machine in the Azure portal](https://learn.microsoft.com/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu). To deploy a TURN server, use [coturn](https://github.com/coturn/coturn). Coturn is a free and open-source implementation of a TURN and STUN server for VoIP and WebRTC.

After you set up a TURN server, you can test it by using the instructions on the [WebRTC Trickle ICE](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/) webpage.

## Proxy signaling traffic

To provide the URL of a proxy server, you need to pass it in as part of `CallClientOptions` while initializing `CallClient`. For more information on how to set up a call, see [Azure Communication Services Web SDK](../quickstarts/voice-video-calling/get-started-with-video-calling.md?pivots=platform-web) for the quickstart on how to set up voice and video.

```js
import { CallClient } from '@azure/communication-calling'; 

// While you are creating an instance of the CallClient (the entry point of the SDK):
const callClient = new CallClient({
    networkConfiguration: {
        proxy: {
            url: 'https://myproxyserver.com'
        }
    }
});

// ...continue normally with your SDK setup and usage.
```

> **Note:**
> If the proxy URL provided is an invalid URL, the `CallClient` initialization fails and throws errors accordingly. The error messages that are thrown help you troubleshoot if you run into issues.

For the API reference for the `CallClientOptions` object, and the `networkConfiguration` property within it, see [CallClientOptions](https://learn.microsoft.com/javascript/api/azure-communication-services/@azure/communication-calling/callclientoptions?view=azure-communication-services-js\&preserve-view=true).

### Set up a signaling proxy middleware in Express.js

You can also create a proxy middleware in your Express.js server setup to have all the URLs redirected through it by using the [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) npm package. The `createProxyMiddleware` function from that package should cover what you need for a simple redirect proxy setup. Here's an example usage of it with some option settings that the SDK needs so that all of our URLs work as expected:

```js
const proxyRouter = (req) => {
    // Your router function if you don't intend to set up a direct target

    // An example:
    if (!req.originalUrl && !req.url) {
        return '';
    }

    const incomingUrl = req.originalUrl || req.url;
    if (incomingUrl.includes('/proxy')) {
        return 'https://microsoft.com/forwarder/';
    }
    
    return incomingUrl;
}

const myProxyMiddleware = createProxyMiddleware({
    target: 'https://microsoft.com', // This will be ignored if a router function is provided, but createProxyMiddleware still requires this to be passed in (see its official docs on the npm page for the most recent changes)
    router: proxyRouter,
    changeOrigin: true,
    secure: false, // If you have proper SSL setup, set this accordingly
    followRedirects: true,
    ignorePath: true,
    ws: true,
    logLevel: 'debug'
});

// And finally pass in your proxy middleware to your express app depending on your URL/host setup
app.use('/proxy', myProxyMiddleware);
```

> **Tip:**
> If you're having SSL issues, see the [cors](https://www.npmjs.com/package/cors) package.

### Set up a signaling proxy server on Azure

You can create a Linux virtual machine in the Azure portal and deploy an NGINX server on it. For more information, see [Quickstart: Create a Linux virtual machine in the Azure portal](https://learn.microsoft.com/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu).

Here's an NGINX configuration that you can use as a sample:

```
events {
    multi_accept       on;
    worker_connections 65535;
}
http {
    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
    map $request_method $access_control_header {
        OPTIONS '*';
    }
    server {
        listen <port_you_want_listen_on> ssl;
        ssl_certificate     <path_to_your_ssl_cert>;
        ssl_certificate_key <path_to_your_ssl_key>;
        location ~* ^/(.*?\.(com|net)(?::[\d]+)?)/(.*)$ {
            if ($request_method = 'OPTIONS') {
                add_header Access-Control-Allow-Origin '*' always;
                add_header Access-Control-Allow-Credentials 'true' always;
                add_header Access-Control-Allow-Headers '*' always;
                add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
                add_header Access-Control-Max-Age 1728000;
                add_header Content-Type 'text/plain';
                add_header Content-Length 0;
                return 204;
            }
            resolver 1.1.1.1;
            set $ups_host $1;
            set $r_uri $3;
            rewrite ^/.*$ /$r_uri break;
            proxy_set_header Host $ups_host;
            proxy_ssl_server_name on;
            proxy_ssl_protocols TLSv1.2;
            proxy_ssl_ciphers DEFAULT;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass_header Authorization;
            proxy_pass_request_headers on;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_set_header Proxy "";
            proxy_set_header Access-Control-Allow-Origin $access_control_header;
            proxy_pass https://$ups_host;
            proxy_redirect https://$ups_host https://$host/$ups_host;
            proxy_intercept_errors on;
            error_page 301 302 307 = @process_redirect;
            error_page 400 405 = @process_error_response;
        }
        location @process_redirect {
            set $saved_redirect_location '$upstream_http_location';
            resolver 1.1.1.1;
            proxy_pass $saved_redirect_location;
            add_header X-DBUG-MSG "301" always;
        }
        location @process_error_response {
            add_header Access-Control-Allow-Origin * always;
        }
    }
}
```



**Applies to: platform-ios**


The proxy feature is *not* available for Teams identities and Azure Communication Services Teams interoperability actions.

## Proxy calling media traffic

The following sections describe how to proxy call your media traffic.

### What is a TURN server?
Many times, establishing a network connection between two peers isn't straightforward. A direct connection might not work because of:

- Firewalls with strict rules.
- Peers sitting behind a private network.
- Computers running in a network address translation (NAT) environment.

To solve these network connection issues, you can use a server that uses the Traversal Using Relay NAT (TURN) protocol for relaying network traffic. Session Traversal Utilities for NAT (STUN) and TURN servers are the relay servers.

### Provide your TURN server details with the SDK

To provide the details of your TURN servers, you need to pass details of what TURN server to use as part of `CallClientOptions` while initializing `CallClient`. For more information on how to set up a call, see [Azure Communication Services iOS SDK](../quickstarts/voice-video-calling/get-started-with-video-calling.md?pivots=platform-ios) for the quickstart on how to set up voice and video.

```swift
let callClientOptions = new CallClientOptions()
let callNetworkOptions = new CallNetworkOptions()

let iceServer = IceServer()
iceServer.urls = ["turn:20.202.255.255"]
iceServer.udpPort = 3478
iceServer.realm = "turn.azure.com"
iceServer.username = "turnserver1username"
iceServer.password = "turnserver1password"

callNetworkOptions.iceServers = [iceServer]

// Supply the network options when creating an instance of the CallClient
callClientOptions.network = callNetworkOptions
self.callClient = CallClient(options: callClientOptions);
```

> **Important:**
> If you provided your TURN server details while you initialized `CallClient`, all the media traffic <i>exclusively</i> flows through these TURN servers. Any other ICE candidates that are normally generated when you create a call aren't considered while trying to establish connectivity between peers. That means only `relay` candidates are considered. To learn more about different types of Ice candidates, see [RTCIceCandidate: type property](https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate/type).

Currently, the Android SDK supports only <b>one single IPv4 address</b> and <b>UDP</b> protocol for media proxy. If a UDP port isn't provided, a default UDP port 3478 is used. The SDK throws an `Failed to set media proxy` error when calling `setIceServer` with unsupported input as follows:

- More than one ICE server is provided in the IceServers list.
- More than one url is provided in the IceServer's url list.
- IPv6 url is provided in the url list.
- Only TCP port is provided.
- Realm information isn't provided.

If the ICE server information provided is invalid, the `CallClient` initialization fails and throws errors accordingly.

### Set up a TURN server in Azure

You can create a Linux virtual machine in the Azure portal. For more information, see [Create a Linux virtual machine in the Azure portal](https://learn.microsoft.com/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu). To deploy a TURN server, use [coturn](https://github.com/coturn/coturn). Coturn is a free and open-source implementation of a TURN and STUN server for VoIP and WebRTC.

After you set up a TURN server, you can test it by using the instructions on the [WebRTC Trickle ICE](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/) webpage.

## Proxy signaling traffic

To provide the URL of a proxy server, you need to pass it in as part of `CallClientOptions` through its property `Network` while initializing `CallClient`. For more information on how to set up a call, see [Azure Communication Services iOS SDK](../quickstarts/voice-video-calling/get-started-with-video-calling.md?pivots=platform-ios) for the quickstart on how to set up voice and video.

```swift
let callClientOptions = CallClientOptions()
let callNetworkOptions = CallNetworkOptions()
callNetworkOptions.proxyUrl = proxyUrl
callClientOptions.network = callNetworkOptions
self.callClient = CallClient(options: callClientOptions)

// ...continue normally with your SDK setup and usage.
```

### Set up a signaling proxy server on Azure
You can create a Linux virtual machine in the Azure portal and deploy an NGINX server on it. For more information, see [Quickstart: Create a Linux virtual machine in the Azure portal](https://learn.microsoft.com/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu).

Here's an NGINX configuration that you can use as a sample:

```
events {
    multi_accept       on;
    worker_connections 65535;
}
http {
    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
    map $request_method $access_control_header {
        OPTIONS '*';
    }
    server {
        listen <port_you_want_listen_on> ssl;
        ssl_certificate     <path_to_your_ssl_cert>;
        ssl_certificate_key <path_to_your_ssl_key>;
        location ~* ^/(.*?\.(com|net)(?::[\d]+)?)/(.*)$ {
            if ($request_method = 'OPTIONS') {
                add_header Access-Control-Allow-Origin '*' always;
                add_header Access-Control-Allow-Credentials 'true' always;
                add_header Access-Control-Allow-Headers '*' always;
                add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
                add_header Access-Control-Max-Age 1728000;
                add_header Content-Type 'text/plain';
                add_header Content-Length 0;
                return 204;
            }
            resolver 1.1.1.1;
            set $ups_host $1;
            set $r_uri $3;
            rewrite ^/.*$ /$r_uri break;
            proxy_set_header Host $ups_host;
            proxy_ssl_server_name on;
            proxy_ssl_protocols TLSv1.2;
            proxy_ssl_ciphers DEFAULT;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass_header Authorization;
            proxy_pass_request_headers on;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_set_header Proxy "";
            proxy_set_header Access-Control-Allow-Origin $access_control_header;
            proxy_pass https://$ups_host;
            proxy_redirect https://$ups_host https://$host/$ups_host;
            proxy_intercept_errors on;
            error_page 301 302 307 = @process_redirect;
            error_page 400 405 = @process_error_response;
        }
        location @process_redirect {
            set $saved_redirect_location '$upstream_http_location';
            resolver 1.1.1.1;
            proxy_pass $saved_redirect_location;
            add_header X-DBUG-MSG "301" always;
        }
        location @process_error_response {
            add_header Access-Control-Allow-Origin * always;
        }
    }
}
```


**Applies to: platform-android**


The proxy feature is *not* available for Teams identities and Azure Communication Services Teams interoperability actions.

## Proxy calling media traffic

The following sections describe how to proxy call your media traffic.

### What is a TURN server?

Many times, establishing a network connection between two peers isn't straightforward. A direct connection might not work because of:

- Firewalls with strict rules.
- Peers sitting behind a private network.
- Computers running in a network address translation (NAT) environment.

To solve these network connection issues, you can use a server that uses the Traversal Using Relay NAT (TURN) protocol for relaying network traffic. Session Traversal Utilities for NAT (STUN) and TURN servers are the relay servers.

### Provide your TURN server details with the SDK

To provide the details of your TURN servers, you need to pass details of what TURN server to use as part of `CallClientOptions` while initializing `CallClient`. For more information on how to set up a call, see [Azure Communication Services Android SDK](../quickstarts/voice-video-calling/get-started-with-video-calling.md?pivots=platform-android) for the quickstart on how to set up voice and video.

```java
CallClientOptions callClientOptions = new CallClientOptions();
CallNetworkOptions callNetworkOptions = new CallNetworkOptions();

IceServer iceServer = new IceServer();
iceServer.setUrls(Arrays.asList("turn:20.202.255.255"));
iceServer.setUdpPort(3478);
iceServer.setRealm("turn.azure.com"); // Realm information is required.
iceServer.setUsername("turnserver1username");
iceServer.setPassword("turnserver1password");

callNetworkOptions.setIceServers(Arrays.asList(iceServer));

// Supply the network options when creating an instance of the CallClient
callClientOptions.setNetwork(callNetworkOptions);
CallClient callClient = new CallClient(callClientOptions);
```

> **Important:**
> If you provided your TURN server details while you initialized `CallClient`, all the media traffic <i>exclusively</i> flows through these TURN servers. Any other ICE candidates that are normally generated when you create a call aren't considered while trying to establish connectivity between peers. That means only `relay` candidates are considered. To learn more about different types of Ice candidates, see [RTCIceCandidate: type property](https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate/type).

 Currently, the Android SDK supports only <b>one single IPv4 address</b> and <b>UDP</b> protocol for media proxy. If a UDP port isn't provided, a default UDP port 3478 is used. The SDK throws an `Failed to set media proxy` error when calling `setIceServer` with unsupported input as follows:
 * More than one ICE server is provided in the IceServers list.
 * More than one url is provided in the IceServer's url list.
 * IPv6 url is provided in the url list.
 * Only TCP port is provided.
 * Realm information isn't provided.

If the ICE server information provided is invalid, the `CallClient` initialization fails and throws errors accordingly.

### Set up a TURN server in Azure
You can create a Linux virtual machine in the Azure portal. For more information, see [Quickstart: Create a Linux virtual machine in the Azure portal](https://learn.microsoft.com/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu). To deploy a TURN server, use [coturn](https://github.com/coturn/coturn). Coturn is a free and open-source implementation of a TURN and STUN server for VoIP and WebRTC.

After you set up a TURN server, you can test it by using the instructions on the [WebRTC Trickle ICE](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/) webpage.

## Proxy signaling traffic

To provide the URL of a proxy server, you need to pass it in as part of `CallClientOptions` through its property `Network` while initializing `CallClient`. For more information on how to set up a call, see [Azure Communication Services Android SDK](../quickstarts/voice-video-calling/get-started-with-video-calling.md?pivots=platform-android).

```java
CallClientOptions callClientOptions = new CallClientOptions();
CallNetworkOptions callNetworkOptions = new CallNetworkOptions();
callNetworkOptions.setProxyUrl("https://myproxyserver.com");
callClientOptions.setNetwork(callNetworkOptions);
CallClient callClient = new CallClient(callClientOptions);

// ...continue normally with your SDK setup and usage.
```

### Set up a signaling proxy server on Azure

You can create a Linux virtual machine in the Azure portal and deploy an NGINX server on it. For more information, see [Quickstart: Create a Linux virtual machine in the Azure portal](https://learn.microsoft.com/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu).

Here's an NGINX configuration that you can use as a sample:

```
events {
    multi_accept       on;
    worker_connections 65535;
}
http {
    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
    map $request_method $access_control_header {
        OPTIONS '*';
    }
    server {
        listen <port_you_want_listen_on> ssl;
        ssl_certificate     <path_to_your_ssl_cert>;
        ssl_certificate_key <path_to_your_ssl_key>;
        location ~* ^/(.*?\.(com|net)(?::[\d]+)?)/(.*)$ {
            if ($request_method = 'OPTIONS') {
                add_header Access-Control-Allow-Origin '*' always;
                add_header Access-Control-Allow-Credentials 'true' always;
                add_header Access-Control-Allow-Headers '*' always;
                add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
                add_header Access-Control-Max-Age 1728000;
                add_header Content-Type 'text/plain';
                add_header Content-Length 0;
                return 204;
            }
            resolver 1.1.1.1;
            set $ups_host $1;
            set $r_uri $3;
            rewrite ^/.*$ /$r_uri break;
            proxy_set_header Host $ups_host;
            proxy_ssl_server_name on;
            proxy_ssl_protocols TLSv1.2;
            proxy_ssl_ciphers DEFAULT;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass_header Authorization;
            proxy_pass_request_headers on;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_set_header Proxy "";
            proxy_set_header Access-Control-Allow-Origin $access_control_header;
            proxy_pass https://$ups_host;
            proxy_redirect https://$ups_host https://$host/$ups_host;
            proxy_intercept_errors on;
            error_page 301 302 307 = @process_redirect;
            error_page 400 405 = @process_error_response;
        }
        location @process_redirect {
            set $saved_redirect_location '$upstream_http_location';
            resolver 1.1.1.1;
            proxy_pass $saved_redirect_location;
            add_header X-DBUG-MSG "301" always;
        }
        location @process_error_response {
            add_header Access-Control-Allow-Origin * always;
        }
    }
}
```


**Applies to: platform-windows**


The proxy feature is *not* available for Teams identities and Azure Communication Services Teams interoperability actions.

## Proxy calling media traffic

The following sections describe how to proxy call your media traffic.

### What is a TURN server?

Many times, establishing a network connection between two peers isn't straightforward. A direct connection might not work because of:

- Firewalls with strict rules.
- Peers sitting behind a private network.
- Computers running in a network address translation (NAT) environment.

To solve these network connection issues, you can use a server that uses the Traversal Using Relay NAT (TURN) protocol for relaying network traffic. Session Traversal Utilities for NAT (STUN) and TURN servers are the relay servers.

### Provide your TURN server details with the SDK

To provide the details of your TURN servers, you need to pass details of what TURN server to use as part of `CallClientOptions` while initializing `CallClient`. For more information on how to set up a call, see [Azure Communication Services Windows SDK](../quickstarts/voice-video-calling/get-started-with-video-calling.md?pivots=platform-windows) for the quickstart on how to set up voice and video.

```csharp
CallClientOptions callClientOptions = new CallClientOptions();
CallNetworkOptions callNetworkOptions = new CallNetworkOptions();

IceServer iceServer = new IceServer();
iceServer.Uris = new List<Uri>() { new Uri("turn:20.202.255.255") }.AsReadOnly();
iceServer.UdpPort = 3478;
iceServer.Realm = "turn.azure.com";
iceServer.Username = "turnserver1username";
iceServer.Password = "turnserver1password";

callNetworkOptions.IceServers = new List<IceServer>() { iceServer }.AsReadOnly();

// Supply the network options when creating an instance of the CallClient
callClientOptions.Network = callNetworkOptions;
CallClient callClient = new CallClient(callClientOptions);
```

> **Important:**
> If you provided your TURN server details while you initialized `CallClient`, all the media traffic <i>exclusively</i> flows through these TURN servers. Any other ICE candidates that are normally generated when you create a call aren't considered while trying to establish connectivity between peers. That means only `relay` candidates are considered. To learn more about different types of Ice candidates, see [RTCIceCandidate: type property](https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate/type).

Currently, the Android SDK supports only <b>one single IPv4 address</b> and <b>UDP</b> protocol for media proxy. If a UDP port isn't provided, a default UDP port 3478 is used. The SDK throws an `Failed to set media proxy` error when calling `setIceServer` with unsupported input as follows:

- More than one ICE server is provided in the IceServers list.
- More than one url is provided in the IceServer's url list.
- IPv6 url is provided in the url list.
- Only TCP port is provided.
- Realm information isn't provided.

If the ICE server information provided is invalid, the `CallClient` initialization fails and throws errors accordingly.

### Set up a TURN server in Azure
You can create a Linux virtual machine in the Azure portal. For more information, see [Quickstart: Create a Linux virtual machine in the Azure portal](https://learn.microsoft.com/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu). To deploy a TURN server, use [coturn](https://github.com/coturn/coturn). Coturn is a free and open-source implementation of a TURN and STUN server for VoIP and WebRTC.

After you set up a TURN server, you can test it by using the instructions on the [WebRTC Trickle ICE](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/) webpage.

## Proxy signaling traffic

To provide the URL of a proxy server, you need to pass it in as part of `CallClientOptions` through its property `Network` while initializing `CallClient`. For more information on how to set up a call, see [Azure Communication Services Windows SDK](../quickstarts/voice-video-calling/get-started-with-video-calling.md?pivots=platform-windows) for the quickstart on how to set up voice and video.

```csharp
CallClientOptions callClientOptions = new CallClientOptions();
CallNetworkOptions callNetworkOptions = new CallNetworkOptions();
callNetworkOptions.ProxyUri = new Uri("https://myproxyserver.com");
callClientOptions.Network = callNetworkOptions;
CallClient callClient = new CallClient(callClientOptions);

// ...continue normally with your SDK setup and usage.
```

### Set up a signaling proxy server on Azure

You can create a Linux virtual machine in the Azure portal and deploy an NGINX server on it. For more information, see [Quickstart: Create a Linux virtual machine in the Azure portal](https://learn.microsoft.com/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu).

Here's an NGINX configuration that you can use as a sample:

```
events {
    multi_accept       on;
    worker_connections 65535;
}
http {
    map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
    map $request_method $access_control_header {
        OPTIONS '*';
    }
    server {
        listen <port_you_want_listen_on> ssl;
        ssl_certificate     <path_to_your_ssl_cert>;
        ssl_certificate_key <path_to_your_ssl_key>;
        location ~* ^/(.*?\.(com|net)(?::[\d]+)?)/(.*)$ {
            if ($request_method = 'OPTIONS') {
                add_header Access-Control-Allow-Origin '*' always;
                add_header Access-Control-Allow-Credentials 'true' always;
                add_header Access-Control-Allow-Headers '*' always;
                add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
                add_header Access-Control-Max-Age 1728000;
                add_header Content-Type 'text/plain';
                add_header Content-Length 0;
                return 204;
            }
            resolver 1.1.1.1;
            set $ups_host $1;
            set $r_uri $3;
            rewrite ^/.*$ /$r_uri break;
            proxy_set_header Host $ups_host;
            proxy_ssl_server_name on;
            proxy_ssl_protocols TLSv1.2;
            proxy_ssl_ciphers DEFAULT;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass_header Authorization;
            proxy_pass_request_headers on;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_set_header Proxy "";
            proxy_set_header Access-Control-Allow-Origin $access_control_header;
            proxy_pass https://$ups_host;
            proxy_redirect https://$ups_host https://$host/$ups_host;
            proxy_intercept_errors on;
            error_page 301 302 307 = @process_redirect;
            error_page 400 405 = @process_error_response;
        }
        location @process_redirect {
            set $saved_redirect_location '$upstream_http_location';
            resolver 1.1.1.1;
            proxy_pass $saved_redirect_location;
            add_header X-DBUG-MSG "301" always;
        }
        location @process_error_response {
            add_header Access-Control-Allow-Origin * always;
        }
    }
}
```
