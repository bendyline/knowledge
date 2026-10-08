---
title: POS Device Manager Output
description: POS Device Manager Output (POS for .NET v1.14 SDK Documentation)
ms.date: 03/03/2014
ms.topic: how-to
ms.custom: "pos-restored-from-archive"
---

# POS Device Manager Output (POS for .NET v1.14 SDK Documentation)

The [POS Device Manager](pos-device-manager.md) is used to set up the device configuration for a given system. The output from the **POS Device Manager** is written to an XML file. The name of this file is the value of the registry key **\\HKLM\\SOFTWARE\\POSfor.NET\\Configuration**.

## Configuration Migration

You should not modify this file directly. Doing so may lead to unexpected behavior. You can, however, migrate the file from one system to another, making it possible to build a configuration on one system, and propagate that same setup to others.

## API Support

You may also access configuration properties with the following methods in [Microsoft.PointOfService.PosCommon](https://learn.microsoft.com/search/?terms=Microsoft.PointOfService.PosCommon):

- [Microsoft.PointOfService.PosCommon.GetConfigurationProperty(System.String)](https://learn.microsoft.com/search/?terms=Microsoft.PointOfService.PosCommon.GetConfigurationProperty(System.String))
- [Microsoft.PointOfService.PosCommon.SetConfigurationProperty(System.String,System.String)](https://learn.microsoft.com/search/?terms=Microsoft.PointOfService.PosCommon.SetConfigurationProperty(System.String%2CSystem.String))
- [Microsoft.PointOfService.PosCommon.DeleteConfigurationProperty(System.String)](https://learn.microsoft.com/search/?terms=Microsoft.PointOfService.PosCommon.DeleteConfigurationProperty(System.String))

## See Also

#### Other Resources

- [POS Device Manager](pos-device-manager.md)
