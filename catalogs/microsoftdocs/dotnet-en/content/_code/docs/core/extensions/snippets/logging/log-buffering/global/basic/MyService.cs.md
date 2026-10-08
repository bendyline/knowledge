# Source code: docs/core/extensions/snippets/logging/log-buffering/global/basic/MyService.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.Extensions.Diagnostics.Buffering;

namespace GlobalLogBufferingBasic;

public class MyService
{
    private readonly GlobalLogBuffer _buffer;

    public MyService(GlobalLogBuffer buffer)
    {
        _buffer = buffer;
    }

    public void HandleException(Exception ex)
    {
        _buffer.Flush();

        // After flushing, log buffering will be temporarily suspended (= all logs will be emitted immediately)
        // for the duration specified by AutoFlushDuration.
    }
}

```
