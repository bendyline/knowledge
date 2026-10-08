# Source code: docs/fundamentals/networking/snippets/httpclient/Program.CacheControlHeaders.cs

Complete source file; linked examples may select a region or line range.

```
using System.Net;
using System.Net.Cache;
using System.Net.Http;
using System.Net.Sockets;

static partial class Program
{
    // <CacheControlProgram>
    static async Task AddCacheControlHeaders()
    {
        HttpClient client = new HttpClient();
        HttpRequestMessage requestMessage = new HttpRequestMessage(HttpMethod.Get, Uri);
        CachePolicy.AddCacheControlHeaders(requestMessage, new HttpRequestCachePolicy(HttpRequestCacheLevel.NoCacheNoStore));
        HttpResponseMessage response = await client.SendAsync(requestMessage);
    }
    // </CacheControlProgram>
}

```
