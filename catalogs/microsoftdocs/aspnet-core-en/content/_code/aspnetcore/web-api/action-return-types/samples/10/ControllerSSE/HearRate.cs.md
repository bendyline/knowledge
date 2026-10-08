# Source code: aspnetcore/web-api/action-return-types/samples/10/ControllerSSE/HearRate.cs

Complete source file; linked examples may select a region or line range.

```
public record HeartRate(DateTime Timestamp, int HeartRate)
{
    public static HeartRate Create(int heartRate) => new(DateTime.UtcNow, heartRate);
}

```
