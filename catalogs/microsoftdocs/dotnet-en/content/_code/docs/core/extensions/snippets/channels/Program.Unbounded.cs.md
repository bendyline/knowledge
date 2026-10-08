# Source code: docs/core/extensions/snippets/channels/Program.Unbounded.cs

Complete source file; linked examples may select a region or line range.

```
internal static partial class Program
{
    internal static Channel<Coordinates> CreateUnbounded()
    {
        // <unbounded>
        var channel = Channel.CreateUnbounded<Coordinates>();
        // </unbounded>

        return channel;
    }

    internal static Channel<Coordinates> CreateUnboundedWithOptions()
    {
        // <unboundedoptions>
        var channel = Channel.CreateUnbounded<Coordinates>(
            new UnboundedChannelOptions
            {
                SingleWriter = false,
                SingleReader = false,
                AllowSynchronousContinuations = true
            });
        // </unboundedoptions>

        return channel;
    }
}

```
