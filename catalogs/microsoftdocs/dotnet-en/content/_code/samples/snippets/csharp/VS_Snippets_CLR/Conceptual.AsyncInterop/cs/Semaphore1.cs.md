# Source code: samples/snippets/csharp/VS_Snippets_CLR/Conceptual.AsyncInterop/cs/Semaphore1.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Threading;
using System.Threading.Tasks;

public class Example
{
    // <Snippet13>
    static int N = 3;

    static SemaphoreSlim m_throttle = new SemaphoreSlim(N, N);

    static async Task DoOperation()
    {
        await m_throttle.WaitAsync();
        // do work
        m_throttle.Release();
    }
    // </Snippet13>
}

```
