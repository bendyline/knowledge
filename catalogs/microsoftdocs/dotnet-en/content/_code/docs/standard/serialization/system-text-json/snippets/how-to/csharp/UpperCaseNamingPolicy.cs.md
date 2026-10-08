# Source code: docs/standard/serialization/system-text-json/snippets/how-to/csharp/UpperCaseNamingPolicy.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json;

namespace SystemTextJsonSamples
{
    public class UpperCaseNamingPolicy : JsonNamingPolicy
    {
        public override string ConvertName(string name) =>
            name.ToUpper();
    }
}

```
