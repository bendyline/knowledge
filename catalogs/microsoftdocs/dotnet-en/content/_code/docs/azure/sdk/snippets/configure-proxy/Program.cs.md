# Source code: docs/azure/sdk/snippets/configure-proxy/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System.Net;
using Azure.Core.Pipeline;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

using HttpClientHandler handler = new()
{
    Proxy = new WebProxy(new Uri("<proxy-url>")),
};

SecretClientOptions options = new()
{
    Transport = new HttpClientTransport(handler),
};
SecretClient client = new(
    new Uri("https://<key-vault-name>.vault.azure.net/"),
    new DefaultAzureCredential(),
    options);

```
