# Source code: docs/core/extensions/snippets/channels/Coordinates.cs

Complete source file; linked examples may select a region or line range.

```
/// <summary>
/// A representation of a device's coordinates, 
/// which includes latitude and longitude.
/// </summary>
/// <param name="DeviceId">A unique device identifier.</param>
/// <param name="Latitude">The latitude of the device.</param>
/// <param name="Longitude">The longitude of the device.</param>
public readonly record struct Coordinates(
    Guid DeviceId,
    double Latitude,
    double Longitude);

```
