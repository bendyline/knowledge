# Source code: docs/csharp/asynchronous-programming/snippets/access-web/Program.cs

Complete source file; linked examples may select a region or line range.

```
class Program
{
    static async Task Main() =>
        Console.WriteLine($"learn.microsoft.com/dotnet content length = {await AccessWeb.Example.GetUrlContentLengthAsync()}");
}

class AccessWeb
{
    public static AccessWeb Example = new AccessWeb();

    // <ControlFlow>
    public async Task<int> GetUrlContentLengthAsync()
    {
        using var client = new HttpClient();

        Task<string> getStringTask =
            client.GetStringAsync("https://learn.microsoft.com/dotnet");

        DoIndependentWork();

        string contents = await getStringTask;

        return contents.Length;
    }

    void DoIndependentWork()
    {
        Console.WriteLine("Working...");
    }
    // </ControlFlow>
}

```
