---
title: Azure Communication Services Call Automation How-to for Securing Webhook Endpoint 
titleSuffix: An Azure Communication Services how-to document
description: The article shows how to secure the delivery of incoming calls and callback events.
author: fanche

ms.topic: how-to
ms.service: azure-communication-services
ms.subservice: call-automation
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
ms.date: 06/19/2023
ms.author: askaur
manager: visho
services: azure-communication-services
zone_pivot_groups: acs-js-csharp-java-python
---

# Secure webhook endpoints and WebSocket connections


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Securing the delivery of messages from end to end is crucial for ensuring the confidentiality, integrity, and trustworthiness of sensitive information transmitted between systems. Your ability and willingness to trust information received from a remote system rely on the sender providing their identity. Call Automation has two ways of communicating events that can be secured: the shared `IncomingCall` event sent by Azure Event Grid and all other mid-call events sent by the Call Automation platform via webhook.

## Incoming call event

Azure Communication Services relies on Azure Event Grid subscriptions to deliver the [IncomingCall event](../../concepts/call-automation/incoming-call-notification.md). For more information, see [Deliver events to Microsoft Entra protected endpoints](../../../event-grid/secure-webhook-delivery.md).

## Call Automation webhook events

[Call Automation events](../../concepts/call-automation/call-automation.md#call-automation-webhook-events) are sent to the webhook callback URI specified when you answer a call or place a new outbound call. Your callback URI must be a public endpoint with a valid HTTPS certificate, Domain Name System name, and IP address with the correct firewall ports open to enable Call Automation to reach it. This anonymous public web server could create a security risk if you don't take the necessary steps to secure it from unauthorized access.

**Applies to: programming-language-csharp**


## Improve Call Automation webhook callback security

Each mid-call webhook callback sent by Call Automation uses a signed JSON Web Token (JWT) in the Authentication header of the inbound HTTPS request. You can use standard OpenID Connect (OIDC) JWT validation techniques to ensure the integrity of the token. The lifetime of the JWT is five minutes, and a new token is created for every event sent to the callback URI.

1. Obtain the OpenID configuration URL: `<https://acscallautomation.communication.azure.com/calling/.well-known/acsopenidconfiguration>`
1. Install the [Microsoft.AspNetCore.Authentication.JwtBearer NuGet](https://www.nuget.org/packages/Microsoft.AspNetCore.Authentication.JwtBearer) package.
1. Configure your application to validate the JWT by using the NuGet package and the configuration of your Azure Communication Services resource. You need the `audience` value as it appears in the JWT payload.
1. Validate the issuer, the audience, and the JWT:
   - The audience is your Azure Communication Services resource ID that you used to set up your Call Automation client. For information about how to get it, see [Get your Azure resource ID](../../quickstarts/voice-video-calling/get-resource-id.md).
   - The JSON Web Key Set endpoint in the OpenId configuration contains the keys that are used to validate the JWT. When the signature is valid and the token hasn't expired (within five minutes of generation), the client can use the token for authorization.

This sample code demonstrates how to use `Microsoft.IdentityModel.Protocols.OpenIdConnect` to validate the webhook payload:

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Azure Communication Services CallAutomation OpenID configuration
var configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
            builder.Configuration["OpenIdConfigUrl"],
            new OpenIdConnectConfigurationRetriever());
var configuration = configurationManager.GetConfigurationAsync().Result;

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Configuration = configuration;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidAudience = builder.Configuration["AllowedAudience"]
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/api/callback", (CloudEvent[] events) =>
{
    // Your implementation on the callback event
    return Results.Ok();
})
.RequireAuthorization()
.WithOpenApi();

app.UseAuthentication();
app.UseAuthorization();

app.Run();

```



**Applies to: programming-language-java**


## Improve Call Automation webhook callback security

Each mid-call webhook callback sent by Call Automation uses a signed JSON Web Token (JWT) in the Authentication header of the inbound HTTPS request. You can use standard OpenID Connect (OIDC) JWT validation techniques to ensure the integrity of the token. The lifetime of the JWT is five minutes, and a new token is created for every event sent to the callback URI.

1. Obtain the OpenID configuration URL: `<https://acscallautomation.communication.azure.com/calling/.well-known/acsopenidconfiguration>`
1. The following sample uses the Spring framework, which is created by using [spring initializr](https://start.spring.io/) with Maven as the project build tool.
1. Add the following dependencies in your `pom.xml`:
    
    ```
      <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-security</artifactId>
      </dependency>
      <dependency>
       <groupId>org.springframework.security</groupId>
       <artifactId>spring-security-oauth2-jose</artifactId>
      </dependency>
      <dependency>
       <groupId>org.springframework.security</groupId>
       <artifactId>spring-security-oauth2-resource-server</artifactId>
      </dependency>
    ```

1. Configure your application to validate the JWT and the configuration of your Azure Communication Services resource. You need the `audience` value as it appears in the JWT payload.
1. Validate the issuer, the audience, and the JWT:
   - The audience is your Azure Communication Services resource ID that you used to set up your Call Automation client. For information about how to get it, see [Get your Azure resource ID](../../quickstarts/voice-video-calling/get-resource-id.md).
   - The JSON Web Key Set endpoint in the OpenID configuration contains the keys that are used to validate the JWT. When the signature is valid and the token hasn't expired (within five minutes of generation), the client can use the token for authorization.

This sample code demonstrates how to configure the OIDC client to validate a webhook payload by using JWT:

```java
package callautomation.example.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.*;

@EnableWebSecurity
public class TokenValidationConfiguration {
    @Value("ACS resource ID")
    private String audience;

    @Value("https://acscallautomation.communication.azure.com")
    private String issuer;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .mvcMatchers("/api/callbacks").permitAll()
                .anyRequest()
                .and()
                .oauth2ResourceServer()
                .jwt()
                .decoder(jwtDecoder());

        return http.build();
    }

    class AudienceValidator implements OAuth2TokenValidator<Jwt> {
        private String audience;

        OAuth2Error error = new OAuth2Error("invalid_token", "The required audience is missing", null);

        public AudienceValidator(String audience) {
            this.audience = audience;
        }

        @Override
        public OAuth2TokenValidatorResult validate(Jwt token) {
            if (token.getAudience().contains(audience)) {
                return OAuth2TokenValidatorResult.success();
            } else {
                return OAuth2TokenValidatorResult.failure(error);
            }
        }
    }

    JwtDecoder jwtDecoder() {
        OAuth2TokenValidator<Jwt> withAudience = new AudienceValidator(audience);
        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
        OAuth2TokenValidator<Jwt> validator = new DelegatingOAuth2TokenValidator<>(withAudience, withIssuer);

        NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder) JwtDecoders.fromOidcIssuerLocation(issuer);
        jwtDecoder.setJwtValidator(validator);

        return jwtDecoder;
    }
}
```



**Applies to: programming-language-javascript**


## Improve Call Automation webhook callback security

Each mid-call webhook callback sent by Call Automation uses a signed JSON Web Token (JWT) in the Authentication header of the inbound HTTPS request. You can use standard OpenID Connect (OIDC) JWT validation techniques to ensure the integrity of the token. The lifetime of the JWT is five minutes, and a new token is created for every event sent to the callback URI.

1. Obtain the OpenID configuration URL: `<https://acscallautomation.communication.azure.com/calling/.well-known/acsopenidconfiguration>`
1. Install the following packages:
    - [express npm](https://www.npmjs.com/package/express)
    - [jwks-rsa npm](https://www.npmjs.com/package/jwks-rsa)
    - [jsonwebtoken npm](https://www.npmjs.com/package/jsonwebtoken)
    
    ```console
    npm install express jwks-rsa jsonwebtoken
    ```

1. Configure your application to validate the JWT and the configuration of your Azure Communication Services resource. You need the `audience` value as it appears in the JWT payload.
1. Validate the issuer, the audience, and the JWT:
   - The audience is your Azure Communication Services resource ID that you used to set up your Call Automation client. For information about how to get it, see [Get your Azure resource ID](../../quickstarts/voice-video-calling/get-resource-id.md).
   - The JSON Web Key Set endpoint in the OpenID configuration contains the keys that are used to validate the JWT. When the signature is valid and the token hasn't expired (within five minutes of generation), the client can use the token for authorization.

This sample code demonstrates how to configure the OIDC client to validate a webhook payload by using JWT:

```JavaScript
import express from "express";
import { JwksClient } from "jwks-rsa";
import { verify } from "jsonwebtoken";

const app = express();
const port = 3000;
const audience = "ACS resource ID";
const issuer = "https://acscallautomation.communication.azure.com";

app.use(express.json());

app.post("/api/callback", (req, res) => {
    const token = req?.headers?.authorization?.split(" ")[1] || "";

    if (!token) {
        res.sendStatus(401);

        return;
    }

    try {
        verify(
            token,
            (header, callback) => {
                const client = new JwksClient({
                    jwksUri: "https://acscallautomation.communication.azure.com/calling/keys",
                });

                client.getSigningKey(header.kid, (err, key) => {
                    const signingKey = key?.publicKey || key?.rsaPublicKey;

                    callback(err, signingKey);
                });
            },
            {
                audience,
                issuer,
                algorithms: ["RS256"],
            });
        // Your implementation on the callback event
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(401);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```



**Applies to: programming-language-python**


## Improve Call Automation webhook callback security

Each mid-call webhook callback sent by Call Automation uses a signed JSON Web Token (JWT) in the Authentication header of the inbound HTTPS request. You can use standard OpenID Connect (OIDC) JWT validation techniques to ensure the integrity of the token. The lifetime of the JWT is five minutes, and a new token is created for every event sent to the callback URI.

1. Obtain the OpenID configuration URL: `<https://acscallautomation.communication.azure.com/calling/.well-known/acsopenidconfiguration>`
1. Install the following packages:
    - [flask pypi](https://pypi.org/project/Flask/)
    - [PyJWT pypi](https://pypi.org/project/PyJWT/)

    ```console
    pip install flask pyjwt
    ```

1. Configure your application to validate the JWT and the configuration of your Azure Communication Services resource. You need the `audience` value as it appears in the JWT payload.
1. Validate the issuer, the audience, and the JWT:
   - The audience is your Azure Communication Services resource ID that you used to set up your Call Automation client. For information about how to get it, see [Get your Azure resource ID](../../quickstarts/voice-video-calling/get-resource-id.md).
   - The JSON Web Key Set endpoint in the OpenId configuration contains the keys that are used to validate the JWT. When the signature is valid and the token hasn't expired (within five minutes of generation), the client can use the token for authorization.

This sample code demonstrates how to configure the OIDC client to validate a webhook payload by using JWT:

```Python
from flask import Flask, jsonify, abort, request
import jwt

app = Flask(__name__)


@app.route("/api/callback", methods=["POST"])
def handle_callback_event():
    token = request.headers.get("authorization").split()[1]

    if not token:
        abort(401)

    try:
        jwks_client = jwt.PyJWKClient(
            "https://acscallautomation.communication.azure.com/calling/keys"
        )
        jwt.decode(
            token,
            jwks_client.get_signing_key_from_jwt(token).key,
            algorithms=["RS256"],
            issuer="https://acscallautomation.communication.azure.com",
            audience="ACS resource ID",
        )
        # Your implementation on the callback event
        return jsonify(success=True)
    except jwt.InvalidTokenError:
        print("Token is invalid")
        abort(401)
    except Exception as e:
        print("uncaught exception" + e)
        abort(500)


if __name__ == "__main__":
    app.run()
```



> **Important:**
> Our service uses standard JSON Web Token in the authentication header, and only support OpenID Connect (OIDC) JWT validation.

### Query Parameter Token Authentication

Query Parameter Token Authentication is a simple method of securing webhook callbacks by appending a pre-shared secret token to the webhook endpoint URL as a query string parameter. This token acts as a lightweight authentication key, allowing your system to verify that webhook callback events originate from the Call Automation Service.

```
https://api.example.com/webhook?token=8f2d9c63a7b14d32b53c9e12a1f47fcb
```

When webhook callback events are received, the Call Automation Service includes the token exactly as you configured (see example above). Upon receiving the request, your system compares the token in the query parameter against a stored, trusted value. Requests without the token, or with an incorrect value, should be rejected.

## Call Automation WebSocket events

### Authentication token in a WebSocket header

Each WebSocket connection request made by Call Automation now includes a signed JWT in the authentication header. This token is validated by using standard OIDC JWT validation methods:

  - The JWT has a lifetime of 24 hours.
  - A new token is generated for each connection request to your WebSocket server.

 **Applies to: programming-language-csharp**


## WebSocket code sample

This sample code demonstrates how to authenticate WebSocket connection requests by using JWT tokens.

```csharp
// 1. Load OpenID Connect metadata
var configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
    builder.Configuration["OpenIdConfigUrl"],
    new OpenIdConnectConfigurationRetriever());

var openIdConfig = await configurationManager.GetConfigurationAsync();
// 2. Register JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Configuration = openIdConfig;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidAudience = builder.Configuration["AllowedAudience"]
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// 3. Use authentication & authorization middleware
app.UseAuthentication();
app.UseAuthorization();

app.UseWebSockets();

// 4. WebSocket token validation manually in middleware
app.Use(async (context, next) =>
{
    if (context.Request.Path != "/ws")
    {
        await next(context);
        return;
    }

    if (!context.WebSockets.IsWebSocketRequest)
    {
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        await context.Response.WriteAsync("WebSocket connection expected.");
        return;
    }

    var result = await context.AuthenticateAsync();
    if (!result.Succeeded)
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        await context.Response.WriteAsync("Unauthorized WebSocket connection.");
        return;
    }

    context.User = result.Principal;

    // Optional: Log headers
    var correlationId = context.Request.Headers["x-ms-call-correlation-id"].FirstOrDefault();
    var callConnectionId = context.Request.Headers["x-ms-call-connection-id"].FirstOrDefault();

    Console.WriteLine($"Authenticated WebSocket - Correlation ID: {correlationId ?? "not provided"}");
    Console.WriteLine($"Authenticated WebSocket - CallConnection ID: {callConnectionId ?? "not provided"}");

    // Now you can safely accept the WebSocket and process the connection
    // var webSocket = await context.WebSockets.AcceptWebSocketAsync();
    // var mediaService = new AcsMediaStreamingHandler(webSocket, builder.Configuration);
    // await mediaService.ProcessWebSocketAsync();
});
```



**Applies to: programming-language-javascript**


## WebSocket code sample

This sample demonstrates how to configure an OIDC client to validate WebSocket connection requests by using a JWT.

```JavaScript
const audience = "ACS resource ID";
const issuer = "https://acscallautomation.communication.azure.com";

const jwksClient = new JwksClient({
  jwksUri: "https://acscallautomation.communication.azure.com/calling/keys",
});

wss.on("connection", async (ws, req) => {
  try {
    const authHeader = req.headers?.authorization || "";
    const token = authHeader.split(" ")[1];

    if (!token) {
      ws.close(1008, "Unauthorized");
      return;
    }

    verify(
      token,
      async (header, callback) => {
        try {
          const key = await jwksClient.getSigningKey(header.kid);
          const signingKey = key.getPublicKey();
          callback(null, signingKey);
        } catch (err) {
          callback(err);
        }
      },
      {
        audience,
        issuer,
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) {
          console.error("WebSocket authentication failed:", err);
          ws.close(1008, "Unauthorized");
          return;
        }

        console.log(
          "Authenticated WebSocket connection with decoded JWT payload:",
          decoded
        );

        ws.on("message", async (message) => {
          // Process message
        });

        ws.on("close", () => {
          console.log("WebSocket connection closed");
        });
      }
    );
  } catch (err) {
    console.error("Unexpected error during WebSocket setup:", err);
    ws.close(1011, "Internal Server Error"); // 1011 = internal error
  }
});
```



**Applies to: programming-language-python**


## WebSocket code sample

This sample demonstrates how to configure an OIDC-compliant client to validate WebSocket connection requests by using a JWT.

Make sure to install the required package:
`pip install cryptography`

```python
JWKS_URL = "https://acscallautomation.communication.azure.com/calling/keys"
ISSUER = "https://acscallautomation.communication.azure.com"
AUDIENCE = "ACS resource ID”

@app.websocket('/ws')
async def ws():
    try:
        auth_header = websocket.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            await websocket.close(1008)  # Policy violation
            return

        token = auth_header.split()[1]

        jwks_client = PyJWKClient(JWKS_URL)
        signing_key = jwks_client.get_signing_key_from_jwt(token)

        decoded = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            issuer=ISSUER,
            audience=AUDIENCE,
        )

        app.logger.info(f"Authenticated WebSocket connection with decoded JWT payload: {decoded}")
        await websocket.send("Connection authenticated.")

        while True:
            data = await websocket.receive()
            # Process incoming data

    except InvalidTokenError as e:
        app.logger.warning(f"Invalid token: {e}")
        await websocket.close(1008)
    except Exception as e:
        app.logger.error(f"Uncaught exception: {e}")
        await websocket.close(1011)  # Internal error
```



## IP range

Another way that you can secure your WebSocket connections is to allow only Microsoft connections from certain IP ranges.

| Category | IP ranges or FQDN | Ports |
| :--- | :--- | :--- |
| Call Automation media | 52.112.0.0/14, 52.122.0.0/15, 2603:1063::/38 | UDP: 3478, 3479, 3480, 3481 |
| Call Automation callback URLs | *.lync.com, *.teams.cloud.microsoft, *.teams.microsoft.com, teams.cloud.microsoft, teams.microsoft.com 52.112.0.0/14, 52.122.0.0/15, 2603:1027::/48, 2603:1037::/48, 2603:1047::/48, 2603:1057::/48, 2603:1063::/38, 2620:1ec:6::/48, 2620:1ec:40::/42 | TCP: 443, 80 UDP: 443 |

## Related content

- Learn more about how to [control and steer calls with Call Automation](actions-for-call-control.md).
