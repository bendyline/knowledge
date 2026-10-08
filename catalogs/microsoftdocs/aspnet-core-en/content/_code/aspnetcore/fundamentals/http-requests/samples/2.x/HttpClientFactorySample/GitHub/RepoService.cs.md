# Source code: aspnetcore/fundamentals/http-requests/samples/2.x/HttpClientFactorySample/GitHub/RepoService.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace HttpClientFactorySample.GitHub
{
    // <snippet1>
    public class RepoService
    {
        // _httpClient isn't exposed publicly
        private readonly HttpClient _httpClient;

        public RepoService(HttpClient client)
        {
            _httpClient = client;
        }

        public async Task<IEnumerable<string>> GetRepos()
        {
            var response = await _httpClient.GetAsync("aspnet/repos");

            response.EnsureSuccessStatusCode();

            var result = await response.Content
                .ReadAsAsync<IEnumerable<string>>();

            return result;
        }
    }
    // </snippet1>
}
```
