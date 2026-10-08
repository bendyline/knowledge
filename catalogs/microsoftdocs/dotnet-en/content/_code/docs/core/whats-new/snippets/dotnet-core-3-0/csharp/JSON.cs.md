# Source code: docs/core/whats-new/snippets/dotnet-core-3-0/csharp/JSON.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Text;

namespace whats_new
{
    public class JSON
    {
        public string WriteJSON()
        {
            // <SnippetJsonSerialize>
            var instance = new
            {
                FirstName = "John",
                LastName = "Smith",
                Age = 18
            };

            System.Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(instance));
            // </SnippetJsonSerialize>

            return System.Text.Json.JsonSerializer.Serialize(instance);
        }
    }

    // <SnippetJsonDeserialize>
    public class JsonPerson
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }

        public static JsonPerson Parse(string json) =>
            System.Text.Json.JsonSerializer.Deserialize<JsonPerson>(json);
    }
    // </SnippetJsonDeserialize>
}

```
