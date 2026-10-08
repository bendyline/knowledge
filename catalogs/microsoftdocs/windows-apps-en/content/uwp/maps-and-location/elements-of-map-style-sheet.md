---
description: Learn about using map style sheets to define the appearance of maps, such as those displayed in a Windows Store application's MapControl.
MSHAttr: PreferredLib:/library/windows/apps
Search.Product: eADQiWindows 10XVcnh
title: Map style sheet reference
ms.date: 05/27/2025
ms.topic: article
keywords: windows 10, uwp, maps, map style sheet
ms.localizationpriority: medium
---
# Map style sheet reference

> **Important:**
> The UWP [MapControl](https://learn.microsoft.com/uwp/api/windows.ui.xaml.controls.maps.mapcontrol) and Windows Maps platform APIs ([Windows.Services.Maps.\*](https://learn.microsoft.com/uwp/api/windows.services.maps)) are deprecated and may not be available in future versions of Windows. For more information, see [Resources for deprecated features](https://learn.microsoft.com/windows/whats-new/deprecated-features-resources#windows-uwp-map-control-and-windows-maps-platform-apis).

> **Important:**
> **Bing Maps for Enterprise service retirement**
>
> The UWP [MapControl](https://learn.microsoft.com/uwp/api/windows.ui.xaml.controls.maps.mapcontrol) and map services from the [Windows.Services.Maps](https://learn.microsoft.com/uwp/api/windows.services.maps) namespaces rely on Bing Maps. Bing Maps for Enterprise is deprecated and will be retired, at which point the MapControl and services will no longer receive data.
>
> For more information, see the [Bing Maps Developer Center](https://www.bingmapsportal.com/) and [Bing Maps documentation](https://learn.microsoft.com/bingmaps/getting-started/).

Microsoft mapping technologies use [map style sheets](https://learn.microsoft.com/BingMaps/styling/map-style-sheets) to define the appearance of maps, including those displayed in a [MapControl](https://learn.microsoft.com/uwp/api/windows.ui.xaml.controls.maps.mapcontrol). A map style sheet is defined using JavaScript Object Notation (JSON) through the [MapStyleSheet.ParseFromJson](https://learn.microsoft.com/uwp/api/windows.ui.xaml.controls.maps.mapstylesheet.parsefromjson#Windows_UI_Xaml_Controls_Maps_MapStyleSheet_ParseFromJson_System_String_) method.

A style sheet consists of [entries](https://learn.microsoft.com/BingMaps/styling/map-style-sheet-entries) whose properties are overridden to change the final appearance of the map.

For example, the following JSON can be used to make water areas appear in red, water labels appear in green, and land areas appear in blue:

```json
{"version":"1.*",
    "settings":{"landColor":"#0000FF"},
    "elements":{"water":{"fillColor":"#FF0000","labelColor":"#00FF00"}}
}
```
