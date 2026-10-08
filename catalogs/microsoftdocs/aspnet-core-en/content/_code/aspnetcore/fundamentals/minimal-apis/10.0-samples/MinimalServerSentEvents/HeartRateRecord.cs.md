# Source code: aspnetcore/fundamentals/minimal-apis/10.0-samples/MinimalServerSentEvents/HeartRateRecord.cs

Complete source file; linked examples may select a region or line range.

```
public record HeartRateRecord(DateTime Timestamp, int HeartRate)
{
    public static HeartRateRecord Create(int heartRate) => new(DateTime.UtcNow, heartRate);
}

```
