---
description: Displays a symbolic map of the Earth using Azure Maps, with support for pins, layers, and interactive controls.
title: MapControl
template: detail.hbs
ms.date: 02/20/2026
ms.topic: article
---

# MapControl

The [MapControl](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapcontrol) displays a symbolic, interactive map of the Earth powered by [Azure Maps](https://learn.microsoft.com/azure/azure-maps/about-azure-maps). You can show locations, add pins and custom layers, and let users interact with the map using pan, zoom, rotation, and pitch controls.

The MapControl requires an Azure Maps account. Follow the instructions at [Manage your Azure Maps account](https://learn.microsoft.com/azure/azure-maps/how-to-manage-account-keys) to create an account and obtain a map service token.

## Is this the right control?

Use a MapControl when you want to display geographic data in your app, such as:

- Showing a location on a map with a pin.
- Displaying a collection of points of interest.
- Providing an interactive map experience with zoom and pan.

## Create a MapControl

> 
>
> - **Important APIs**: [MapControl class](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapcontrol), [MapIcon class](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapicon), [MapElementsLayer class](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapelementslayer)

> 
> [Open the WinUI 3 Gallery app and see the MapControl in action](winui3gallery://item/MapControl)

> <table>
<tbody><tr>
<td>WinUI 3 Gallery icon</td>
<td>The <strong>WinUI 3 Gallery</strong> app includes interactive examples of WinUI controls and features. Get the app from the <a href="https://apps.microsoft.com/detail/9P3JFPWWDZRC">Microsoft Store</a> or browse the source code on <a href="https://github.com/microsoft/WinUI-Gallery">GitHub</a>.</td>
</tr>
</tbody>

Add a MapControl to your page and set the [MapServiceToken](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapcontrol.mapservicetoken) to your Azure Maps key.

```xaml
<MapControl x:Name="myMap"
            MapServiceToken="YOUR_AZURE_MAPS_TOKEN"
            Height="400" />
```

## Set the map location

Set the [Center](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapcontrol.center) and [ZoomLevel](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapcontrol.zoomlevel) properties to control what the map displays.

```csharp
using Windows.Devices.Geolocation;

var position = new BasicGeoposition { Latitude = 47.6062, Longitude = -122.3321 };
myMap.Center = new Geopoint(position);
myMap.ZoomLevel = 12;
```

```xaml
<!-- Set initial center and zoom in XAML is not supported; set in code-behind -->
<MapControl x:Name="myMap"
            MapServiceToken="YOUR_AZURE_MAPS_TOKEN"
            Height="400" />
```

## Add pins to the map

Use [MapIcon](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapicon) to display pushpins on the map. Add icons to a [MapElementsLayer](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapelementslayer), then add the layer to the map's [Layers](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapcontrol.layers) collection.

```csharp
using Windows.Devices.Geolocation;
using Microsoft.UI.Xaml.Controls;
using System.Collections.Generic;

var position = new BasicGeoposition
{
    Latitude = 47.6062,
    Longitude = -122.3321
};

var icon = new MapIcon
{
    Location = new Geopoint(position),
};

var layer = new MapElementsLayer
{
    MapElements = new List<MapElement> { icon }
};

myMap.Layers.Add(layer);
```

## Show or hide interactive controls

The [InteractiveControlsVisible](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapcontrol.interactivecontrolsvisible) property controls whether the map displays built-in overlay controls for zoom, rotation, pitch, and map style.

```xaml
<MapControl x:Name="myMap"
            MapServiceToken="YOUR_AZURE_MAPS_TOKEN"
            InteractiveControlsVisible="True"
            Height="400" />
```

## Handle map element clicks

Subscribe to the [MapElementClick](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapcontrol.mapelementclick) event to respond when the user clicks a map element such as a pin.

```csharp
myMap.MapElementClick += (sender, args) =>
{
    foreach (var element in args.MapElements)
    {
        if (element is MapIcon clickedIcon)
        {
            // Handle the clicked icon
        }
    }
};
```

## Handle map service errors

Subscribe to the [MapServiceErrorOccurred](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapcontrol.mapserviceerroroccurred) event to detect issues communicating with the map service, such as an invalid or missing [MapServiceToken](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapcontrol.mapservicetoken).

```csharp
myMap.MapServiceErrorOccurred += (sender, args) =>
{
    // Log or display the error
    System.Diagnostics.Debug.WriteLine("Map service error occurred.");
};
```

## Related articles

- [MapControl class](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapcontrol)
- [MapIcon class](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapicon)
- [MapElementsLayer class](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mapelementslayer)
- [Azure Maps documentation](https://learn.microsoft.com/azure/azure-maps/about-azure-maps)
- [Manage your Azure Maps account keys](https://learn.microsoft.com/azure/azure-maps/how-to-manage-account-keys)
