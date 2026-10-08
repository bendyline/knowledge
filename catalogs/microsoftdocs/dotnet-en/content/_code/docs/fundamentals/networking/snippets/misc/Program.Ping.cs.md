# Source code: docs/fundamentals/networking/snippets/misc/Program.Ping.cs

Complete source file; linked examples may select a region or line range.

```
public static partial class Program
{
    static async Task PingAsync()
    {
        // <ping>
        using Ping ping = new();

        string hostName = "stackoverflow.com";
        PingReply reply = await ping.SendPingAsync(hostName);
        Console.WriteLine($"Ping status for ({hostName}): {reply.Status}");
        if (reply is { Status: IPStatus.Success })
        {
            Console.WriteLine($"Address: {reply.Address}");
            Console.WriteLine($"Roundtrip time: {reply.RoundtripTime}");
            Console.WriteLine($"Time to live: {reply.Options?.Ttl}");
            Console.WriteLine();
        }
        // </ping>
    }
}

```
