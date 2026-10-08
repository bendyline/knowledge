---
title: Cross Platform development using the UI library
titleSuffix: An Azure Communication Services sample overview
description: Cross Platform development solutions using the UI library to enable .NET MAUI and React Native developers build communication calling mobile applications
author: jorgegarc
manager: anujbh
services: azure-communication-services

ms.author: jorgegarc
ms.date: 08/30/2021
ms.topic: overview
ms.service: azure-communication-services
ms.subservice: calling
ms.custom: devx-track-dotnet
zone_pivot_groups: acs-maui-react
---

# Get started with Cross Platform development using the UI library


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> Preview APIs and SDKs are provided without a service-level agreement. We recommend that you don't use them for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


Azure Communication Services introduces Cross Platform development using **.NET MAUI and React Native** solutions. This sample demonstrates how Azure Communication Services Calling integrates the UI Library for mobile platforms and create the bindings to allow developers to begin building with the calling capabilities.

**Applies to: platform-maui**


## Azure Communication UI Mobile Library for .NET MAUI

This project demonstrates the integration of Azure Communication UI library into .NET MAUI application. It utilizes Azure Communication Services and the native Azure Communication Services UI library to build a calling experience that features both voice and video calling.

### Download code

Find the project for this sample on [GitHub](https://github.com/Azure-Samples/communication-services-ui-library-maui).

### Features

Refer to the native [UI Library overview](../concepts/ui-library/ui-library-overview.md)

### Prerequisites

- Visual Studio [Setup Instructions](https://learn.microsoft.com/dotnet/maui/get-started/installation)
- An Azure account with an active subscription. For details, see [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- iOS [Requirements](https://github.com/Azure/communication-ui-library-ios#requirements)
- Android [Requirements](https://github.com/Azure/communication-ui-library-android#prerequisites)
- An Azure Communication Services resource. For details, see [Create an Azure Communication Services resource](../quickstarts/create-communication-resource.md).
- An Azure Function running the [Authentication Endpoint](../tutorials/trusted-service-tutorial.md) to fetch access tokens.

### Run sample app

Clone [repo](https://github.com/Azure-Samples/communication-services-ui-library-maui).

#### For Android

##### Visual Studio Mac/Windows 2022

1. Navigate to `/AndroidMauiBindings` and in this directory in terminal run `./downloadJarScript.sh`. `GitBash` or `Windows Subsystem for Linux (WSL)` should be enabled to run `.sh` on Windows.
2. Open `CommunicationCallingSampleMauiApp/CommunicationCallingSampleMauiApp.sln` in Visual Studio
3. Edit `CommunicationCallingSampleMauiApp/CommunicationCallingSampleMauiApp.csproj` and set `<TargetFrameworks>net7.0-android</TargetFrameworks>`.
4. Select android device/emulator in visual studio and run `CommunicationCallingSampleMauiApp` app.

#### For iOS

##### Visual Studio Mac 2022

1. Navigate to `communication-services-ui-library-maui/iOSMauiBindings/ProxyLibs/CommunicationUI-Proxy` and in this directory in terminal run `./iOSFramework.sh -d`.
2. Open `CommunicationCallingSampleMauiApp/CommunicationCallingSampleMauiApp.sln` in Visual Studio
3. Edit `CommunicationCallingSampleMauiApp/CommunicationCallingSampleMauiApp.csproj` and set `<TargetFrameworks>net7.0-ios</TargetFrameworks>`.
4. Select iOS device/simulator in visual studio and run `CommunicationCallingSampleMauiApp` app.

### Highlights and feedback

Visit [GitHub](https://github.com/Azure-Samples/communication-services-ui-library-maui#key-sample-highlights) to learn more and discover more capabilities and share your valuable feedback.




**Applies to: platform-react**


## Azure Communication UI Mobile Library for React Native

This project demonstrates the integration of Azure Communication UI library into a React Native utilizes the native Azure Communication UI library and Azure Communication Services to build a calling experience that features both voice and video calling.

### Download code

Find the project for this sample on [GitHub](https://github.com/Azure-Samples/communication-services-ui-library-react-native).

### Features

Refer to the native [UI Library overview](../concepts/ui-library/ui-library-overview.md)

### Prerequisites

- Visual Studio [Setup Instructions](https://learn.microsoft.com/xamarin/get-started/installation/?pivots=macos)
- An Azure account with an active subscription. For details, see [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- iOS [Requirements](https://github.com/Azure/communication-ui-library-ios#requirements)
- Android [Requirements](https://github.com/Azure/communication-ui-library-android#prerequisites)
- An Azure Communication Services resource. For details, see [Create an Azure Communication Services resource](../quickstarts/create-communication-resource.md).
- An Azure Function running the [Authentication Endpoint](../tutorials/trusted-service-tutorial.md) to fetch access tokens.
- Node, Watchman, and React Native CLI: please refer to [React Native environment setup guide](https://reactnative.dev/docs/environment-setup).
- Yarn: refer to [installation guide](https://classic.yarnpkg.com/lang/en/docs/install)

### Run sample app

Navigate to `AzureCommunicationUIDemoApp/`:

1. Run `yarn install`

#### For iOS

Install iOS app dependencies:

1. In Terminal, navigate to `AzureCommunicationUIDemoApp/ios/`:
2. Run `pod install --repo-update`

#### For Android

Build android app dependencies:

1. In Terminal, navigate to `AzureCommunicationUIDemoApp/android/`:
2. Run `./gradlew build`

#### Execute

Navigate back to `AzureCommunicationUIDemoApp/`

1. Run `yarn react-native start`
2. Open another Terminal, navigate to `AzureCommunicationUIDemoApp/` folder, and run `yarn react-native run-ios` or `yarn react-native run-android`

Alternatively, you can also run the iOS app by launching Xcode from the `.xcworkspace` file, and run the app with scheme `AzureCommunicationUIDemoApp` on your simulator or iOS device.

To run Android app, you can also launch Android Studio and run on Android emulator or Android device after syncing up gradle. There are two ways to sync gradle either with a command in the android folder `./gradlew build` or via Android Studio.

### Highlights and feedback

Visit the [GitHub](https://github.com/Azure-Samples/communication-services-ui-library-react-native#key-sample-highlights) to learn more and discover more capabilities and share your valuable feedback.
