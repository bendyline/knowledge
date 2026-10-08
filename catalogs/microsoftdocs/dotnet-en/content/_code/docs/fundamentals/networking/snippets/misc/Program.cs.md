# Source code: docs/fundamentals/networking/snippets/misc/Program.cs

Complete source file; linked examples may select a region or line range.

```
ListenForNetworkAddressChanged();
ListenForNetworkAvailabilityChanged();

CanonicalUri();

await PingAsync();
ShowIPGlobalProperties();

foreach ((string eventSource, IReadOnlyList<string> counters) in RuntimeEventCounters.EventCounters)
{
    foreach (string counter in counters)
    {
        Console.WriteLine($"{eventSource}/{counter}");
    }
}

```
