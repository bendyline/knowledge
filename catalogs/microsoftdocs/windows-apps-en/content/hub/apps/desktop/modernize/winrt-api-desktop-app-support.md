---
description: This article describes WinRT APIs that aren't supported for use in desktop apps, or that have restrictions.
title: Windows Runtime APIs not supported in desktop apps
ms.date: 02/27/2024
ms.topic: article
keywords: windows 10, uwp
ms.assetid: 142b9c9b-3f7d-41b6-80da-1505de2810f9
ms.localizationpriority: medium
ms.custom: 19H1
---

# Support for Windows Runtime APIs in desktop apps

Although you can use most Windows Runtime (WinRT) APIs (see [Windows Runtime (WinRT) namespaces](https://learn.microsoft.com/uwp/api/)) in your C# or C++ desktop app, there are two main sets of WinRT APIs that aren't supported in desktop apps, or that have restrictions:

* APIs that have dependencies on user interface (UI) features that were designed for use only in a Universal Windows Platform (UWP) app.
* APIs that require package identity (see [Features that require package identity](modernize-packaged-apps.md)). Such APIs are supported only in desktop apps that are packaged using [MSIX](https://learn.microsoft.com/windows/msix/).

This article provides details about both of those sets of WinRT APIs. Where available, this article suggests alternative APIs to achieve the same functionality as the APIs that are unsupported in desktop apps. Most of the alternative APIs are available in [WinUI 3](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/winui/index.md) or via WinRT COM interfaces that are available in the Windows SDK.

> **Note:**
> Apps that use .NET can make use of provided class implementations for some of the WinRT COM interfaces listed in this article. Those classes are easier to work with than using the WinRT COM interfaces directly. For more information about the available class implementations, see [Call interop APIs from a .NET app](winrt-com-interop-csharp.md). Note that those classes require the .NET 6 SDK or later.

## APIs that have dependencies on UWP-only UI features

Some WinRT APIs were designed specifically for UI scenarios in a UWP app. Those APIs do not behave properly in desktop apps due to threading model and other platform differences. Those APIs, and other WinRT APIs that have dependencies on them, aren't supported for use in desktop apps.

### Core unsupported classes

These WinRT classes aren't supported in desktop apps:

| Class | Alternative APIs |
| --- | --- |
| [**ApplicationView**](https://learn.microsoft.com/uwp/api/windows.ui.viewmanagement.applicationview) | None |
| [**CoreApplicationView**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.core.coreapplicationview) | Use the [**Window**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.window) class provided by WinUI instead. |
| [**CoreApplicationViewTitleBar**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.core.coreapplicationviewtitlebar) | Instead of the [**ExtendViewIntoTitleBar**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.core.coreapplicationviewtitlebar.extendviewintotitlebar) property, use the [**Window.ExtendsContentIntoTitleBar**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.window.extendscontentintotitlebar) property provided by WinUI. |
| [**CoreDispatcher**](https://learn.microsoft.com/uwp/api/Windows.UI.Core.CoreDispatcher) | Use the [**Microsoft.UI.Xaml.Window.DispatcherQueue**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.window.dispatcherqueue) property provided by WinUI instead.<br/><br/>Note that the [**Windows.UI.Xaml.Window.Dispatcher**](https://learn.microsoft.com/uwp/api/Windows.UI.Xaml.Window.Dispatcher) and [**Windows.UI.Xaml.DependencyObject.Dispatcher**](https://learn.microsoft.com/uwp/api/Windows.UI.Xaml.DependencyObject.Dispatcher) properties return `null` in a desktop app. |
| [**CoreWindow**](https://learn.microsoft.com/uwp/api/Windows.UI.Core.CoreWindow) | Also see the [Classes that implement IInitializeWithWindow](#classes-that-implement-iinitializewithwindow) section below.<br/><br/>Instead of the [**GetKeyState**](https://learn.microsoft.com/uwp/api/windows.ui.core.corewindow.getkeystate) method, use the [**InputKeyboardSource.GetKeyStateForCurrentThread**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.input.inputkeyboardsource.getkeystateforcurrentthread) method provided by WinUI.<br/><br/>Instead of the [**PointerCursor**](https://learn.microsoft.com/uwp/api/windows.ui.core.corewindow.pointercursor) property, use the [**UIElement.ProtectedCursor**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement.protectedcursor) property provided by WinUI. You'll need to have a subclass of [**UIElement**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.uielement) to access that property. |
| [**UserActivity**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.useractivities.useractivity) | Use the [**IUserActivitySourceHostInterop**](https://learn.microsoft.com/windows/win32/api/useractivityinterop/nn-useractivityinterop-iuseractivitysourcehostinterop) COM interface instead (in `useractivityinterop.h`). |

For other WinRT APIs that aren't supported in desktop apps, see [Unsupported members](#unsupported-members) later in this topic.

### Classes with an XxxForCurrentView method

Many WinRT classes have a static **GetForCurrentView** or **CreateForCurrentView** method, such as [**UIViewSettings.GetForCurrentView**](https://learn.microsoft.com/uwp/api/Windows.UI.ViewManagement.UIViewSettings.GetForCurrentView). Those **XxxForCurrentView** methods have an implicit dependency on the [**ApplicationView**](https://learn.microsoft.com/uwp/api/windows.ui.viewmanagement.applicationview) type, which isn't supported in desktop apps. Because **ApplicationView** isn't supported in desktop apps, none of the **XxxForCurrentView** methods are supported either. Some unsupported **XxxForCurrentView** methods not only return `null`, but also throw exceptions.

> **Note:**
> [**CoreInputView.GetForCurrentView**](https://learn.microsoft.com/uwp/api/windows.ui.viewmanagement.core.coreinputview.getforcurrentview) *is* supported in desktop apps, and it *can* be used even without a [**CoreWindow**](https://learn.microsoft.com/uwp/api/windows.ui.core.corewindow). You can use that method to retrieve a [**CoreInputView**](https://learn.microsoft.com/uwp/api/windows.ui.viewmanagement.core.coreinputview) object on any thread; and if that thread has a foreground window, then that object will produce events.

The following classes *are* supported in desktop apps; but to retrieve an instance of one in a desktop app, you use a mechanism that's different from the **GetForCurrentView** or **CreateForCurrentView** methods. For the classes below that have a COM interface listed as the alternative API, C# developers can also consume those WinRT COM interfaces (see [Call interop APIs from a .NET app](winrt-com-interop-csharp.md)). The list might not be comprehensive.

| Class | Alternative APIs |
| --- | --- |
| [**AccountsSettingsPane**](https://learn.microsoft.com/uwp/api/windows.ui.applicationsettings.accountssettingspane) | Use the [**IAccountsSettingsPaneInterop**](https://learn.microsoft.com/windows/win32/api/accountssettingspaneinterop/nn-accountssettingspaneinterop-iaccountssettingspaneinterop) COM interface instead (in `accountssettingspaneinterop.h`). |
| [**CoreDragDropManager**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.dragdrop.core.coredragdropmanager) | Use the [**IDragDropManagerInterop**](https://learn.microsoft.com/windows/win32/api/dragdropinterop/nn-dragdropinterop-idragdropmanagerinterop) COM interface instead (in `dragdropinterop.h`). |
| [**CoreTextServicesManager**](https://learn.microsoft.com/uwp/api/windows.ui.text.core.coretextservicesmanager) | This class is currently supported in desktop apps only in Windows Insider Preview builds. |
| [**DataTransferManager**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.datatransfermanager) | Use the [**IDataTransferManagerInterop**](https://learn.microsoft.com/windows/win32/api/shobjidl_core/nn-shobjidl_core-idatatransfermanagerinterop) COM interface instead (in `shobjidl_core.h`). |
| [**DisplayInformation**](https://learn.microsoft.com/uwp/api/windows.graphics.display.displayinformation) | To retrieve an instance of **DisplayInformation**, use the [**IDisplayInformationStaticsInterop**](https://learn.microsoft.com/windows/win32/api/windows.graphics.display.interop/nn-windows-graphics-display-interop-idisplayinformationstaticsinterop) interface.<br/><br/>Alternatively, instead of the [**LogicalDpi**](https://learn.microsoft.com/uwp/api/windows.graphics.display.displayinformation.logicaldpi) property, you can use the [**XamlRoot.RasterizationScale**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.xamlroot.rasterizationscale) property, and listen for changes via the [**XamlRoot.Changed**](https://learn.microsoft.com/uwp/api/windows.ui.xaml.xamlroot.changed) event (the [**XamlRoot.RasterizationScale**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.xamlroot.rasterizationscale) property is provided in WinUI).<br/><br/>And, instead of the [**RawPixelsPerViewPixel**](https://learn.microsoft.com/uwp/api/windows.graphics.display.displayinformation.rawpixelsperviewpixel) property, you have the option to use the [**XamlRoot.RasterizationScale**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.xamlroot.rasterizationscale) property provided by WinUI. |
| [**InputPane**](https://learn.microsoft.com/uwp/api/windows.ui.viewmanagement.inputpane) | Use the [**IInputPaneInterop**](https://learn.microsoft.com/windows/win32/api/inputpaneinterop/nn-inputpaneinterop-iinputpaneinterop) COM interface instead (in `inputpaneinterop.h`). |
| [**PlayToManager**](https://learn.microsoft.com/uwp/api/windows.media.playto.playtomanager.getforcurrentview) | Use the [**IPlayToManagerInterop**](https://learn.microsoft.com/windows/win32/api/playtomanagerinterop/nn-playtomanagerinterop-iplaytomanagerinterop) COM interface instead (in `playtomanagerinterop.h`). |
| [**Print3DManager**](https://learn.microsoft.com/uwp/api/windows.graphics.printing3d.print3dmanager) | Use the [**IPrinting3DManagerInterop**](https://learn.microsoft.com/windows/win32/api/print3dmanagerinterop/nn-print3dmanagerinterop-iprinting3dmanagerinterop) COM interface instead (in `print3dmanagerinterop.h`). |
| [**PrintManager**](https://learn.microsoft.com/uwp/api/windows.graphics.printing.printmanager) | Use the [**IPrintManagerInterop**](https://learn.microsoft.com/windows/win32/api/printmanagerinterop/nn-printmanagerinterop-iprintmanagerinterop) COM interface instead (in `printmanagerinterop.h`). |
| [**RadialController**](https://learn.microsoft.com/uwp/api/windows.ui.input.radialcontroller) | Use the [**IRadialControllerInterop**](https://learn.microsoft.com/windows/win32/api/radialcontrollerinterop/nn-radialcontrollerinterop-iradialcontrollerinterop) COM interface instead (in `radialcontrollerinterop.h`). |
| [**RadialControllerConfiguration**](https://learn.microsoft.com/uwp/api/windows.ui.input.radialcontrollerconfiguration) | Use the [**IRadialControllerConfigurationInterop**](https://learn.microsoft.com/windows/win32/api/radialcontrollerinterop/nn-radialcontrollerinterop-iradialcontrollerconfigurationinterop) COM interface instead (in `radialcontrollerinterop.h`). |
| [**ResourceContext**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.resources.core.resourcecontext) | See [MRT to MRT Core migration](../../windows-app-sdk/migrate-to-windows-app-sdk/guides/mrtcore.md). |
| [**ResourceLoader**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.resources.resourceloader) | See [MRT to MRT Core migration](../../windows-app-sdk/migrate-to-windows-app-sdk/guides/mrtcore.md). |
| [**SpatialInteractionManager**](https://learn.microsoft.com/uwp/api/windows.ui.input.spatial.spatialinteractionmanager) | Use the [**ISpatialInteractionManagerInterop**](https://learn.microsoft.com/windows/win32/api/spatialinteractionmanagerinterop/nn-spatialinteractionmanagerinterop-ispatialinteractionmanagerinterop) COM interface instead (in `spatialinteractionmanagerinterop.h`). |
| [**SystemMediaTransportControls**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols) | Use the [**ISystemMediaTransportControlsInterop**](https://learn.microsoft.com/windows/win32/api/systemmediatransportcontrolsinterop/nn-systemmediatransportcontrolsinterop-isystemmediatransportcontrolsinterop) COM interface instead (in `systemmediatransportcontrolsinterop.h`). |
| [**UserActivityRequestManager**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.useractivities.useractivityrequestmanager) | Use the [**IUserActivityRequestManagerInterop**](https://learn.microsoft.com/windows/win32/api/useractivityinterop/nn-useractivityinterop-iuseractivityrequestmanagerinterop) COM interface instead (in `useractivityinterop.h`). |
| [**UIViewSettings**](https://learn.microsoft.com/uwp/api/windows.ui.viewmanagement.uiviewsettings) | Use the [**IUIViewSettingsInterop**](https://learn.microsoft.com/windows/win32/api/uiviewsettingsinterop/nn-uiviewsettingsinterop-iuiviewsettingsinterop) COM interface instead (in `uiviewsettingsinterop.h`). |

The following classes are *not* supported in desktop apps because the APIs don't provide an alternative to their **GetForCurrentView** or **CreateForCurrentView** method. The list might not be comprehensive.

| Class | Alternative APIs |
| --- | --- |
| [**AppCapture**](https://learn.microsoft.com/uwp/api/windows.media.capture.appcapture) | None |
| [**BrightnessOverride**](https://learn.microsoft.com/uwp/api/windows.graphics.display.brightnessoverride) | None |
| [**ConnectedAnimationService**](https://learn.microsoft.com/uwp/api/windows.ui.xaml.media.animation.connectedanimationservice) | None |
| [**CoreInputView**](https://learn.microsoft.com/uwp/api/windows.ui.viewmanagement.core.coreinputview) | None |
| [**CoreWindowResizeManager**](https://learn.microsoft.com/uwp/api/windows.ui.core.corewindowresizemanager) | None |
| [**DisplayEnhancementOverride**](https://learn.microsoft.com/uwp/api/windows.graphics.display.displayenhancementoverride) | None |
| [**EdgeGesture**](https://learn.microsoft.com/uwp/api/windows.ui.input.edgegesture) | None |
| [**GazeInputSourcePreview**](https://learn.microsoft.com/uwp/api/windows.devices.input.preview.gazeinputsourcepreview) | None |
| [**HdmiDisplayInformation**](https://learn.microsoft.com/uwp/api/windows.graphics.display.core.hdmidisplayinformation) | None |
| [**HolographicKeyboardPlacementOverridePreview**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.preview.holographic.holographickeyboardplacementoverridepreview) | None |
| [**KeyboardDeliveryInterceptor**](https://learn.microsoft.com/uwp/api/windows.ui.input.keyboarddeliveryinterceptor) | None |
| [**LockApplicationHost**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.lockscreen.lockapplicationhost) | None |
| [**MouseDevice**](https://learn.microsoft.com/uwp/api/windows.devices.input.mousedevice) | None |
| [**PointerVisualizationSettings**](https://learn.microsoft.com/uwp/api/windows.ui.input.pointervisualizationsettings) | None |
| [**ProtectionPolicyManager**](https://learn.microsoft.com/uwp/api/windows.security.enterprisedata.protectionpolicymanager) | None |
| [**SearchPane**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.search.searchpane) | None |
| [**SettingsPane**](https://learn.microsoft.com/uwp/api/windows.ui.applicationsettings.settingspane) | None |
| [**SystemNavigationManager**](https://learn.microsoft.com/uwp/api/windows.ui.core.systemnavigationmanager) | None |
| [**SystemNavigationManagerPreview**](https://learn.microsoft.com/uwp/api/windows.ui.core.preview.systemnavigationmanagerpreview) | None |
| [**WebAuthenticationBroker**](https://learn.microsoft.com/uwp/api/Windows.Security.Authentication.Web.WebAuthenticationBroker) | None. for more details, see the [WebAuthenticationBroker.AuthenticateAsync throws COMException](https://github.com/microsoft/ProjectReunion/issues/398) GitHub issue. |

### Classes that implement IInitializeWithWindow

Certain pickers, popups, dialogs, and other Windows Runtime (WinRT) objects depend on a [**CoreWindow**](https://learn.microsoft.com/uwp/api/windows.ui.core.corewindow); typically, to display a UI. Even though **CoreWindow** isn't supported in desktop apps (see [Core unsupported classes](#core-unsupported-classes) above), you can still use many of those WinRT classes in your desktop app by adding a little bit of interoperation code.

For more info (including a list of affected types), and code examples, see [Display WinRT UI objects that depend on CoreWindow](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/ui-input/display-ui-objects.md).

### Unsupported members

This section lists (or describes, where a comprehensive list isn't possible) specific members of WinRT classes that aren't supported for use in desktop apps. Unless otherwise noted, the rest of the classes apart from these members are supported in desktop apps.

#### Events

The following classes are supported in desktop apps, except for the specified event(s).

| Class | Unsupported events |
| --- | --- |
| [**UISettings**](https://learn.microsoft.com/uwp/api/Windows.UI.ViewManagement.UISettings) | [**ColorValuesChanged**](https://learn.microsoft.com/uwp/api/Windows.UI.ViewManagement.UISettings.ColorValuesChanged) |
| [**AccessibilitySettings**](https://learn.microsoft.com/uwp/api/Windows.UI.ViewManagement.AccessibilitySettings) | [**HighContrastChanged**](https://learn.microsoft.com/uwp/api/Windows.UI.ViewManagement.AccessibilitySettings.HighContrastChanged) |

#### Methods

The following classes are supported in desktop apps, except for the specified method(s).

| Class | Unsupported methods |
| --- | --- |
| [**DeviceInformationPairing**](https://learn.microsoft.com/uwp/api/Windows.Devices.Enumeration.DeviceInformationPairing) | [**PairAsync**](https://learn.microsoft.com/uwp/api/Windows.Devices.Enumeration.DeviceInformationPairing.PairAsync) |

#### Methods that use the Request naming pattern

Most methods that follow the **Request** naming pattern&mdash;such as [**AppCapability.RequestAccessAsync**](https://learn.microsoft.com/uwp/api/windows.security.authorization.appcapabilityaccess.appcapability.requestaccessasync) and [**StoreContext.RequestPurchaseAsync**](https://learn.microsoft.com/uwp/api/windows.services.store.storecontext.requestpurchaseasync)&mdash;aren't supported in desktop apps. Internally, these methods use the [**Windows.UI.Popups**](https://learn.microsoft.com/uwp/api/windows.ui.popups) class. That class requires that the thread have a [**CoreWindow**](https://learn.microsoft.com/uwp/api/Windows.UI.Core.CoreWindow) object, which isn't supported in desktop apps.

The full list of methods that follow the **Request** naming pattern is very long, and this article doesn't provide a comprehensive list of those methods.

## APIs that require package identity

The following WinRT classes require package identity (see [Features that require package identity](modernize-packaged-apps.md)). These APIs are supported only in desktop apps that are packaged (that is, that have package identity at runtime). The list might not be comprehensive.

### Windows.ApplicationModel...

* [**Windows.ApplicationModel.DataTransfer.DataProviderHandler**](https://learn.microsoft.com/uwp/api/windows.applicationmodel.datatransfer.dataproviderhandler)
* [**Windows.ApplicationModel.DataTransfer.DataRequest**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.DataRequest)
* [**Windows.ApplicationModel.DataTransfer.DataRequestDeferral**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.DataRequestDeferral)
* [**Windows.ApplicationModel.DataTransfer.DataRequestedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.DataRequestedEventArgs)
* [**Windows.ApplicationModel.DataTransfer.DataTransferManager**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.DataTransferManager)
* [**Windows.ApplicationModel.DataTransfer.SharedStorageAccessManager**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.SharedStorageAccessManager)
* [**Windows.ApplicationModel.DataTransfer.TargetApplicationChosenEventArgs**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.DataTransfer.TargetApplicationChosenEventArgs)
* [**Windows.ApplicationModel.Resources.Core.NamedResource**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.NamedResource)
* [**Windows.ApplicationModel.Resources.Core.ResourceCandidate**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.ResourceCandidate)
* [**Windows.ApplicationModel.Resources.Core.ResourceCandidateVectorView**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.ResourceCandidateVectorView)
* [**Windows.ApplicationModel.Resources.Core.ResourceContext**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.ResourceContext)
* [**Windows.ApplicationModel.Resources.Core.ResourceContextLanguagesVectorView**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.ResourceContextLanguagesVectorView)
* [**Windows.ApplicationModel.Resources.Core.ResourceManager**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.ResourceManager)
* [**Windows.ApplicationModel.Resources.Core.ResourceMap**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.ResourceMap)
* [**Windows.ApplicationModel.Resources.Core.ResourceMapIterator**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.ResourceMapIterator)
* [**Windows.ApplicationModel.Resources.Core.ResourceMapMapView**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.ResourceMapMapView)
* [**Windows.ApplicationModel.Resources.Core.ResourceMapMapViewIterator**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.ResourceMapMapViewIterator)
* [**Windows.ApplicationModel.Resources.Core.ResourceQualifier**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.ResourceQualifier)
* [**Windows.ApplicationModel.Resources.Core.ResourceQualifierMapView**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.ResourceQualifierMapView)
* [**Windows.ApplicationModel.Resources.Core.ResourceQualifierObservableMap**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.ResourceQualifierObservableMap)
* [**Windows.ApplicationModel.Resources.Core.ResourceQualifierVectorView**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.Core.ResourceQualifierVectorView)
* [**Windows.ApplicationModel.Resources.ResourceLoader**](https://learn.microsoft.com/uwp/api/Windows.ApplicationModel.Resources.ResourceLoader)

### Windows.Data...

* [**Windows.Data.Pdf.PdfDocument**](https://learn.microsoft.com/uwp/api/Windows.Data.Pdf.PdfDocument)
* [**Windows.Data.Pdf.PdfPage**](https://learn.microsoft.com/uwp/api/Windows.Data.Pdf.PdfPage)
* [**Windows.Data.Pdf.PdfPageDimensions**](https://learn.microsoft.com/uwp/api/Windows.Data.Pdf.PdfPageDimensions)
* [**Windows.Data.Pdf.PdfPageRenderOptions**](https://learn.microsoft.com/uwp/api/Windows.Data.Pdf.PdfPageRenderOptions)
* [**Windows.Data.Text.SelectableWordSegmentsTokenizingHandler**](https://learn.microsoft.com/uwp/api/windows.data.text.selectablewordsegmentstokenizinghandler)
* [**Windows.Data.Text.SemanticTextQuery**](https://learn.microsoft.com/uwp/api/Windows.Data.Text.SemanticTextQuery)
* [**Windows.Data.Text.TextConversionGenerator**](https://learn.microsoft.com/uwp/api/Windows.Data.Text.TextConversionGenerator)
* [**Windows.Data.Text.TextPredictionGenerator**](https://learn.microsoft.com/uwp/api/Windows.Data.Text.TextPredictionGenerator)
* [**Windows.Data.Text.TextReverseConversionGenerator**](https://learn.microsoft.com/uwp/api/Windows.Data.Text.TextReverseConversionGenerator)
* [**Windows.Data.Text.WordSegmentsTokenizingHandler**](https://learn.microsoft.com/uwp/api/windows.data.text.wordsegmentstokenizinghandler)
* [**Windows.Data.Xml.Dom.DtdEntity**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.DtdEntity)
* [**Windows.Data.Xml.Dom.DtdNotation**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.DtdNotation)
* [**Windows.Data.Xml.Dom.XmlAttribute**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlAttribute)
* [**Windows.Data.Xml.Dom.XmlCDataSection**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlCDataSection)
* [**Windows.Data.Xml.Dom.XmlComment**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlComment)
* [**Windows.Data.Xml.Dom.XmlDocument**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlDocument)
* [**Windows.Data.Xml.Dom.XmlDocumentFragment**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlDocumentFragment)
* [**Windows.Data.Xml.Dom.XmlDocumentType**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlDocumentType)
* [**Windows.Data.Xml.Dom.XmlDomImplementation**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlDomImplementation)
* [**Windows.Data.Xml.Dom.XmlElement**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlElement)
* [**Windows.Data.Xml.Dom.XmlEntityReference**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlEntityReference)
* [**Windows.Data.Xml.Dom.XmlLoadSettings**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlLoadSettings)
* [**Windows.Data.Xml.Dom.XmlNamedNodeMap**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlNamedNodeMap)
* [**Windows.Data.Xml.Dom.XmlNodeList**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlNodeList)
* [**Windows.Data.Xml.Dom.XmlProcessingInstruction**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlProcessingInstruction)
* [**Windows.Data.Xml.Dom.XmlText**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Dom.XmlText)
* [**Windows.Data.Xml.Xsl.XsltProcessor**](https://learn.microsoft.com/uwp/api/Windows.Data.Xml.Xsl.XsltProcessor)

### Windows.Devices...

* [**Windows.Devices.Input.KeyboardCapabilities**](https://learn.microsoft.com/uwp/api/Windows.Devices.Input.KeyboardCapabilities)
* [**Windows.Devices.Input.MouseCapabilities**](https://learn.microsoft.com/uwp/api/Windows.Devices.Input.MouseCapabilities)
* [**Windows.Devices.Input.MouseDevice**](https://learn.microsoft.com/uwp/api/Windows.Devices.Input.MouseDevice)
* [**Windows.Devices.Input.MouseEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Devices.Input.MouseEventArgs)
* [**Windows.Devices.Input.PointerDevice**](https://learn.microsoft.com/uwp/api/Windows.Devices.Input.PointerDevice)
* [**Windows.Devices.Input.TouchCapabilities**](https://learn.microsoft.com/uwp/api/Windows.Devices.Input.TouchCapabilities)
* [**Windows.Devices.Lights.Lamp**](https://learn.microsoft.com/uwp/api/Windows.Devices.Lights.Lamp)
* [**Windows.Devices.Lights.LampAvailabilityChangedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Devices.Lights.LampAvailabilityChangedEventArgs)
* [**Windows.Devices.Perception.Provider.PerceptionStartFaceAuthenticationHandler**](https://learn.microsoft.com/uwp/api/windows.devices.perception.provider.perceptionstartfaceauthenticationhandler)
* [**Windows.Devices.Perception.Provider.PerceptionStopFaceAuthenticationHandler**](https://learn.microsoft.com/uwp/api/windows.devices.perception.provider.perceptionstopfaceauthenticationhandler)
* [**Windows.Devices.PointOfService.MagneticStripeReader**](https://learn.microsoft.com/uwp/api/Windows.Devices.PointOfService.MagneticStripeReader)
* [**Windows.Devices.PointOfService.MagneticStripeReaderAamvaCardDataReceivedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Devices.PointOfService.MagneticStripeReaderAamvaCardDataReceivedEventArgs)
* [**Windows.Devices.PointOfService.MagneticStripeReaderBankCardDataReceivedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Devices.PointOfService.MagneticStripeReaderBankCardDataReceivedEventArgs)
* [**Windows.Devices.PointOfService.MagneticStripeReaderCapabilities**](https://learn.microsoft.com/uwp/api/Windows.Devices.PointOfService.MagneticStripeReaderCapabilities)
* [**Windows.Devices.PointOfService.MagneticStripeReaderCardTypes**](https://learn.microsoft.com/uwp/api/Windows.Devices.PointOfService.MagneticStripeReaderCardTypes)
* [**Windows.Devices.PointOfService.MagneticStripeReaderEncryptionAlgorithms**](https://learn.microsoft.com/uwp/api/Windows.Devices.PointOfService.MagneticStripeReaderEncryptionAlgorithms)
* [**Windows.Devices.PointOfService.MagneticStripeReaderErrorOccurredEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Devices.PointOfService.MagneticStripeReaderErrorOccurredEventArgs)
* [**Windows.Devices.PointOfService.MagneticStripeReaderReport**](https://learn.microsoft.com/uwp/api/Windows.Devices.PointOfService.MagneticStripeReaderReport)
* [**Windows.Devices.PointOfService.MagneticStripeReaderStatusUpdatedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Devices.PointOfService.MagneticStripeReaderStatusUpdatedEventArgs)
* [**Windows.Devices.PointOfService.MagneticStripeReaderTrackData**](https://learn.microsoft.com/uwp/api/Windows.Devices.PointOfService.MagneticStripeReaderTrackData)
* [**Windows.Devices.PointOfService.MagneticStripeReaderVendorSpecificCardDataReceivedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Devices.PointOfService.MagneticStripeReaderVendorSpecificCardDataReceivedEventArgs)
* [**Windows.Devices.Portable.ServiceDevice**](https://learn.microsoft.com/uwp/api/Windows.Devices.Portable.ServiceDevice)
* [**Windows.Devices.Portable.StorageDevice**](https://learn.microsoft.com/uwp/api/Windows.Devices.Portable.StorageDevice)
* [**Windows.Devices.Printers.Print3DDevice**](https://learn.microsoft.com/uwp/api/Windows.Devices.Printers.Print3DDevice)
* [**Windows.Devices.Printers.PrintSchema**](https://learn.microsoft.com/uwp/api/Windows.Devices.Printers.PrintSchema)
* [**Windows.Devices.SmartCards.SmartCard**](https://learn.microsoft.com/uwp/api/Windows.Devices.SmartCards.SmartCard)
* [**Windows.Devices.SmartCards.SmartCardConnection**](https://learn.microsoft.com/uwp/api/Windows.Devices.SmartCards.SmartCardConnection)
* [**Windows.Devices.SmartCards.SmartCardReader**](https://learn.microsoft.com/uwp/api/Windows.Devices.SmartCards.SmartCardReader)

### Windows.Foundation...

* [**Windows.Foundation.AsyncActionCompletedHandler**](https://learn.microsoft.com/uwp/api/windows.foundation.asyncactioncompletedhandler)
* [**Windows.Foundation.AsyncActionProgressHandler\<TProgress>**](https://learn.microsoft.com/uwp/api/windows.foundation.asyncactionprogresshandler-1)
* [**Windows.Foundation.AsyncActionWithProgressCompletedHandler\<TProgress>**](https://learn.microsoft.com/uwp/api/windows.foundation.asyncactionwithprogresscompletedhandler-1)
* [**Windows.Foundation.AsyncOperationCompletedHandler\<TProgress>**](https://learn.microsoft.com/uwp/api/windows.foundation.asyncoperationcompletedhandler-1)
* [**Windows.Foundation.Collections.VectorChangedEventHandler\<T>**](https://learn.microsoft.com/uwp/api/windows.foundation.collections.vectorchangedeventhandler-1)
* [**Windows.Foundation.DeferralCompletedHandler**](https://learn.microsoft.com/uwp/api/windows.foundation.deferralcompletedhandler)
* [**Windows.Foundation.Diagnostics.FileLoggingSession**](https://learn.microsoft.com/uwp/api/Windows.Foundation.Diagnostics.FileLoggingSession)
* [**Windows.Foundation.Diagnostics.LogFileGeneratedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Foundation.Diagnostics.LogFileGeneratedEventArgs)
* [**Windows.Foundation.Diagnostics.LoggingActivity**](https://learn.microsoft.com/uwp/api/Windows.Foundation.Diagnostics.LoggingActivity)
* [**Windows.Foundation.Diagnostics.LoggingChannel**](https://learn.microsoft.com/uwp/api/Windows.Foundation.Diagnostics.LoggingChannel)
* [**Windows.Foundation.Diagnostics.LoggingChannelOptions**](https://learn.microsoft.com/uwp/api/Windows.Foundation.Diagnostics.LoggingChannelOptions)
* [**Windows.Foundation.Diagnostics.LoggingFields**](https://learn.microsoft.com/uwp/api/Windows.Foundation.Diagnostics.LoggingFields)
* [**Windows.Foundation.Diagnostics.LoggingOptions**](https://learn.microsoft.com/uwp/api/Windows.Foundation.Diagnostics.LoggingOptions)
* [**Windows.Foundation.Diagnostics.LoggingSession**](https://learn.microsoft.com/uwp/api/Windows.Foundation.Diagnostics.LoggingSession)
* [**Windows.Foundation.EventHandler\<T>**](https://learn.microsoft.com/uwp/api/windows.foundation.eventhandler-1)
* [**Windows.Foundation.MemoryBuffer**](https://learn.microsoft.com/uwp/api/Windows.Foundation.MemoryBuffer)

### Windows.Globalization...

* [**Windows.Globalization.ApplicationLanguages**](https://learn.microsoft.com/uwp/api/Windows.Globalization.ApplicationLanguages)
* [**Windows.Globalization.JapanesePhoneme**](https://learn.microsoft.com/uwp/api/Windows.Globalization.JapanesePhoneme)
* [**Windows.Globalization.JapanesePhoneticAnalyzer**](https://learn.microsoft.com/uwp/api/Windows.Globalization.JapanesePhoneticAnalyzer)
* [**Windows.Globalization.PhoneNumberFormatting.PhoneNumberFormatter**](https://learn.microsoft.com/uwp/api/Windows.Globalization.PhoneNumberFormatting.PhoneNumberFormatter)
* [**Windows.Globalization.PhoneNumberFormatting.PhoneNumberInfo**](https://learn.microsoft.com/uwp/api/Windows.Globalization.PhoneNumberFormatting.PhoneNumberInfo)

### Windows.Graphics...

* [**Windows.Graphics.Imaging.BitmapBuffer**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapBuffer)
* [**Windows.Graphics.Imaging.BitmapCodecInformation**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapCodecInformation)
* [**Windows.Graphics.Imaging.BitmapDecoder**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapDecoder)
* [**Windows.Graphics.Imaging.BitmapEncoder**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapEncoder)
* [**Windows.Graphics.Imaging.BitmapFrame**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapFrame)
* [**Windows.Graphics.Imaging.BitmapProperties**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapProperties)
* [**Windows.Graphics.Imaging.BitmapPropertiesView**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapPropertiesView)
* [**Windows.Graphics.Imaging.BitmapPropertySet**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapPropertySet)
* [**Windows.Graphics.Imaging.BitmapTransform**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapTransform)
* [**Windows.Graphics.Imaging.BitmapTypedValue**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.BitmapTypedValue)
* [**Windows.Graphics.Imaging.ImageStream**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.ImageStream)
* [**Windows.Graphics.Imaging.PixelDataProvider**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.PixelDataProvider)
* [**Windows.Graphics.Imaging.SoftwareBitmap**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Imaging.SoftwareBitmap)
* [**Windows.Graphics.Printing3D.Print3DTaskRequestedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Print3DTaskRequestedEventArgs)
* [**Windows.Graphics.Printing3D.Print3DTaskSourceRequestedHandler**](https://learn.microsoft.com/uwp/api/windows.graphics.printing3d.print3dtasksourcerequestedhandler)
* [**Windows.Graphics.Printing3D.Printing3D3MFPackage**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3D3MFPackage)
* [**Windows.Graphics.Printing3D.Printing3DBaseMaterial**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DBaseMaterial)
* [**Windows.Graphics.Printing3D.Printing3DBaseMaterialGroup**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DBaseMaterialGroup)
* [**Windows.Graphics.Printing3D.Printing3DColorMaterial**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DColorMaterial)
* [**Windows.Graphics.Printing3D.Printing3DColorMaterialGroup**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DColorMaterialGroup)
* [**Windows.Graphics.Printing3D.Printing3DComponent**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DComponent)
* [**Windows.Graphics.Printing3D.Printing3DComponentWithMatrix**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DComponentWithMatrix)
* [**Windows.Graphics.Printing3D.Printing3DCompositeMaterial**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DCompositeMaterial)
* [**Windows.Graphics.Printing3D.Printing3DCompositeMaterialGroup**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DCompositeMaterialGroup)
* [**Windows.Graphics.Printing3D.Printing3DFaceReductionOptions**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DFaceReductionOptions)
* [**Windows.Graphics.Printing3D.Printing3DMaterial**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DMaterial)
* [**Windows.Graphics.Printing3D.Printing3DMesh**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DMesh)
* [**Windows.Graphics.Printing3D.Printing3DMeshVerificationResult**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DMeshVerificationResult)
* [**Windows.Graphics.Printing3D.Printing3DModel**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DModel)
* [**Windows.Graphics.Printing3D.Printing3DModelTexture**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DModelTexture)
* [**Windows.Graphics.Printing3D.Printing3DMultiplePropertyMaterial**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DMultiplePropertyMaterial)
* [**Windows.Graphics.Printing3D.Printing3DMultiplePropertyMaterialGroup**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DMultiplePropertyMaterialGroup)
* [**Windows.Graphics.Printing3D.Printing3DTexture2CoordMaterial**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DTexture2CoordMaterial)
* [**Windows.Graphics.Printing3D.Printing3DTexture2CoordMaterialGroup**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DTexture2CoordMaterialGroup)
* [**Windows.Graphics.Printing3D.Printing3DTextureResource**](https://learn.microsoft.com/uwp/api/Windows.Graphics.Printing3D.Printing3DTextureResource)

### Windows.Management...

* [**Windows.Management.Core.ApplicationDataManager**](https://learn.microsoft.com/uwp/api/Windows.Management.Core.ApplicationDataManager)
* [**Windows.Management.Deployment.DeploymentResult**](https://learn.microsoft.com/uwp/api/Windows.Management.Deployment.DeploymentResult)
* [**Windows.Management.Deployment.PackageManager**](https://learn.microsoft.com/uwp/api/Windows.Management.Deployment.PackageManager)
* [**Windows.Management.Deployment.PackageUserInformation**](https://learn.microsoft.com/uwp/api/Windows.Management.Deployment.PackageUserInformation)
* [**Windows.Management.Deployment.PackageVolume**](https://learn.microsoft.com/uwp/api/Windows.Management.Deployment.PackageVolume)
* [**Windows.Management.Workplace.MdmPolicy**](https://learn.microsoft.com/uwp/api/Windows.Management.Workplace.MdmPolicy)
* [**Windows.Management.Workplace.WorkplaceSettings**](https://learn.microsoft.com/uwp/api/Windows.Management.Workplace.WorkplaceSettings)

### Windows.Media...

* [**Windows.Media.AudioBuffer**](https://learn.microsoft.com/uwp/api/Windows.Media.AudioBuffer)
* [**Windows.Media.Capture.AdvancedCapturedPhoto**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.AdvancedCapturedPhoto)
* [**Windows.Media.Capture.AppCaptureAlternateShortcutKeys**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.AppCaptureAlternateShortcutKeys)
* [**Windows.Media.Capture.AppCaptureManager**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.AppCaptureManager)
* [**Windows.Media.Capture.AppCaptureSettings**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.AppCaptureSettings)
* [**Windows.Media.Capture.CapturedFrame**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.CapturedFrame)
* [**Windows.Media.Capture.MediaCaptureFailedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.MediaCaptureFailedEventArgs)
* [**Windows.Media.Capture.MediaCaptureFailedEventHandler**](https://learn.microsoft.com/uwp/api/windows.media.capture.mediacapturefailedeventhandler)
* [**Windows.Media.Capture.MediaCapturePauseResult**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.MediaCapturePauseResult)
* [**Windows.Media.Capture.MediaCaptureStopResult**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.MediaCaptureStopResult)
* [**Windows.Media.Capture.OptionalReferencePhotoCapturedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Media.Capture.OptionalReferencePhotoCapturedEventArgs)
* [**Windows.Media.Capture.RecordLimitationExceededEventHandler**](https://learn.microsoft.com/uwp/api/windows.media.capture.recordlimitationexceededeventhandler)
* [**Windows.Media.ClosedCaptioning.ClosedCaptionProperties**](https://learn.microsoft.com/uwp/api/Windows.Media.ClosedCaptioning.ClosedCaptionProperties)
* [**Windows.Media.Devices.DefaultAudioCaptureDeviceChangedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Media.Devices.DefaultAudioCaptureDeviceChangedEventArgs)
* [**Windows.Media.Devices.DefaultAudioRenderDeviceChangedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Media.Devices.DefaultAudioRenderDeviceChangedEventArgs)
* [**Windows.Media.Devices.MediaDevice**](https://learn.microsoft.com/uwp/api/Windows.Media.Devices.MediaDevice)
* [**Windows.Media.DialProtocol.DialApp**](https://learn.microsoft.com/uwp/api/Windows.Media.DialProtocol.DialApp)
* [**Windows.Media.DialProtocol.DialAppStateDetails**](https://learn.microsoft.com/uwp/api/Windows.Media.DialProtocol.DialAppStateDetails)
* [**Windows.Media.DialProtocol.DialDevice**](https://learn.microsoft.com/uwp/api/Windows.Media.DialProtocol.DialDevice)
* [**Windows.Media.FaceAnalysis.DetectedFace**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.DetectedFace)
* [**Windows.Media.FaceAnalysis.FaceDetector**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.FaceDetector)
* [**Windows.Media.FaceAnalysis.FaceTracker**](https://learn.microsoft.com/uwp/api/Windows.Media.FaceAnalysis.FaceTracker)
* [**Windows.Media.MediaExtensionManager**](https://learn.microsoft.com/uwp/api/Windows.Media.MediaExtensionManager)
* [**Windows.Media.MediaProperties.H264ProfileIds**](https://learn.microsoft.com/uwp/api/Windows.Media.MediaProperties.H264ProfileIds)
* [**Windows.Media.MediaProperties.MediaEncodingSubtypes**](https://learn.microsoft.com/uwp/api/Windows.Media.MediaProperties.MediaEncodingSubtypes)
* [**Windows.Media.MediaProperties.Mpeg2ProfileIds**](https://learn.microsoft.com/uwp/api/Windows.Media.MediaProperties.Mpeg2ProfileIds)
* [**Windows.Media.Ocr.OcrEngine**](https://learn.microsoft.com/uwp/api/Windows.Media.Ocr.OcrEngine)
* [**Windows.Media.Ocr.OcrLine**](https://learn.microsoft.com/uwp/api/Windows.Media.Ocr.OcrLine)
* [**Windows.Media.Ocr.OcrResult**](https://learn.microsoft.com/uwp/api/Windows.Media.Ocr.OcrResult)
* [**Windows.Media.Ocr.OcrWord**](https://learn.microsoft.com/uwp/api/Windows.Media.Ocr.OcrWord)
* [**Windows.Media.Playback.PlaybackMediaMarker**](https://learn.microsoft.com/uwp/api/Windows.Media.Playback.PlaybackMediaMarker)
* [**Windows.Media.Playback.PlaybackMediaMarkerReachedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Media.Playback.PlaybackMediaMarkerReachedEventArgs)
* [**Windows.Media.Playback.PlaybackMediaMarkerSequence**](https://learn.microsoft.com/uwp/api/Windows.Media.Playback.PlaybackMediaMarkerSequence)
* [**Windows.Media.SpeechRecognition.SpeechContinuousRecognitionCompletedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechContinuousRecognitionCompletedEventArgs)
* [**Windows.Media.SpeechRecognition.SpeechContinuousRecognitionResultGeneratedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechContinuousRecognitionResultGeneratedEventArgs)
* [**Windows.Media.SpeechRecognition.SpeechContinuousRecognitionSession**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechContinuousRecognitionSession)
* [**Windows.Media.SpeechRecognition.SpeechRecognitionCompilationResult**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognitionCompilationResult)
* [**Windows.Media.SpeechRecognition.SpeechRecognitionGrammarFileConstraint**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognitionGrammarFileConstraint)
* [**Windows.Media.SpeechRecognition.SpeechRecognitionHypothesis**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognitionHypothesis)
* [**Windows.Media.SpeechRecognition.SpeechRecognitionHypothesisGeneratedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognitionHypothesisGeneratedEventArgs)
* [**Windows.Media.SpeechRecognition.SpeechRecognitionListConstraint**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognitionListConstraint)
* [**Windows.Media.SpeechRecognition.SpeechRecognitionQualityDegradingEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognitionQualityDegradingEventArgs)
* [**Windows.Media.SpeechRecognition.SpeechRecognitionResult**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognitionResult)
* [**Windows.Media.SpeechRecognition.SpeechRecognitionSemanticInterpretation**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognitionSemanticInterpretation)
* [**Windows.Media.SpeechRecognition.SpeechRecognitionTopicConstraint**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognitionTopicConstraint)
* [**Windows.Media.SpeechRecognition.SpeechRecognitionVoiceCommandDefinitionConstraint**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognitionVoiceCommandDefinitionConstraint)
* [**Windows.Media.SpeechRecognition.SpeechRecognizer**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognizer)
* [**Windows.Media.SpeechRecognition.SpeechRecognizerStateChangedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognizerStateChangedEventArgs)
* [**Windows.Media.SpeechRecognition.SpeechRecognizerTimeouts**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognizerTimeouts)
* [**Windows.Media.SpeechRecognition.SpeechRecognizerUIOptions**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechRecognition.SpeechRecognizerUIOptions)
* [**Windows.Media.SpeechSynthesis.SpeechSynthesisStream**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechSynthesis.SpeechSynthesisStream)
* [**Windows.Media.SpeechSynthesis.SpeechSynthesizer**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechSynthesis.SpeechSynthesizer)
* [**Windows.Media.SpeechSynthesis.VoiceInformation**](https://learn.microsoft.com/uwp/api/Windows.Media.SpeechSynthesis.VoiceInformation)

### Windows.Networking...

* [**Windows.Networking.PushNotifications.PushNotificationChannel**](https://learn.microsoft.com/uwp/api/Windows.Networking.PushNotifications.PushNotificationChannel)
* [**Windows.Networking.PushNotifications.PushNotificationChannelManager**](https://learn.microsoft.com/uwp/api/Windows.Networking.PushNotifications.PushNotificationChannelManager)
* [**Windows.Networking.PushNotifications.PushNotificationReceivedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Networking.PushNotifications.PushNotificationReceivedEventArgs)
* [**Windows.Networking.PushNotifications.RawNotification**](https://learn.microsoft.com/uwp/api/Windows.Networking.PushNotifications.RawNotification)
* [**Windows.Networking.Sockets.DatagramSocketMessageReceivedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Networking.Sockets.DatagramSocketMessageReceivedEventArgs)
* [**Windows.Networking.Sockets.MessageWebSocketMessageReceivedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Networking.Sockets.MessageWebSocketMessageReceivedEventArgs)

### Windows.Services.Maps...

> **Important:**
> The Windows Maps platform APIs ([Windows.Services.Maps.\*](https://learn.microsoft.com/uwp/api/windows.services.maps)) are deprecated and may not be available in future versions of Windows. For more information, see [Resources for deprecated features](https://learn.microsoft.com/windows/whats-new/deprecated-features-resources#windows-uwp-map-control-and-windows-maps-platform-apis).


* [**Windows.Services.Maps.Guidance.GuidanceAudioNotificationRequestedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.Guidance.GuidanceAudioNotificationRequestedEventArgs)
* [**Windows.Services.Maps.Guidance.GuidanceLaneInfo**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.Guidance.GuidanceLaneInfo)
* [**Windows.Services.Maps.Guidance.GuidanceManeuver**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.Guidance.GuidanceManeuver)
* [**Windows.Services.Maps.Guidance.GuidanceMapMatchedCoordinate**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.Guidance.GuidanceMapMatchedCoordinate)
* [**Windows.Services.Maps.Guidance.GuidanceNavigator**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.Guidance.GuidanceNavigator)
* [**Windows.Services.Maps.Guidance.GuidanceReroutedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.Guidance.GuidanceReroutedEventArgs)
* [**Windows.Services.Maps.Guidance.GuidanceRoadSegment**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.Guidance.GuidanceRoadSegment)
* [**Windows.Services.Maps.Guidance.GuidanceRoadSignpost**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.Guidance.GuidanceRoadSignpost)
* [**Windows.Services.Maps.Guidance.GuidanceRoute**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.Guidance.GuidanceRoute)
* [**Windows.Services.Maps.Guidance.GuidanceTelemetryCollector**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.Guidance.GuidanceTelemetryCollector)
* [**Windows.Services.Maps.Guidance.GuidanceUpdatedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.Guidance.GuidanceUpdatedEventArgs)
* [**Windows.Services.Maps.LocalSearch.LocalCategories**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.LocalSearch.LocalCategories)
* [**Windows.Services.Maps.LocalSearch.LocalLocation**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.LocalSearch.LocalLocation)
* [**Windows.Services.Maps.LocalSearch.LocalLocationFinder**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.LocalSearch.LocalLocationFinder)
* [**Windows.Services.Maps.LocalSearch.LocalLocationFinderResult**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.LocalSearch.LocalLocationFinderResult)
* [**Windows.Services.Maps.LocalSearch.LocalLocationHoursOfOperationItem**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.LocalSearch.LocalLocationHoursOfOperationItem)
* [**Windows.Services.Maps.LocalSearch.LocalLocationRatingInfo**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.LocalSearch.LocalLocationRatingInfo)
* [**Windows.Services.Maps.MapAddress**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.MapAddress)
* [**Windows.Services.Maps.MapLocation**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.MapLocation)
* [**Windows.Services.Maps.MapLocationFinder**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.MapLocationFinder)
* [**Windows.Services.Maps.MapLocationFinderResult**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.MapLocationFinderResult)
* [**Windows.Services.Maps.MapManager**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.MapManager)
* [**Windows.Services.Maps.MapRoute**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.MapRoute)
* [**Windows.Services.Maps.MapRouteDrivingOptions**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.MapRouteDrivingOptions)
* [**Windows.Services.Maps.MapRouteFinder**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.MapRouteFinder)
* [**Windows.Services.Maps.MapRouteFinderResult**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.MapRouteFinderResult)
* [**Windows.Services.Maps.MapRouteLeg**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.MapRouteLeg)
* [**Windows.Services.Maps.MapRouteManeuver**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.MapRouteManeuver)
* [**Windows.Services.Maps.MapService**](https://learn.microsoft.com/uwp/api/Windows.Services.Maps.MapService)

### Windows.Services.Store...

* [**Windows.Services.Store.StoreAcquireLicenseResult**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreAcquireLicenseResult)
* [**Windows.Services.Store.StoreAppLicense**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreAppLicense)
* [**Windows.Services.Store.StoreAvailability**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreAvailability)
* [**Windows.Services.Store.StoreCollectionData**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreCollectionData)
* [**Windows.Services.Store.StoreConsumableResult**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreConsumableResult)
* [**Windows.Services.Store.StoreContext**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreContext)
* [**Windows.Services.Store.StoreImage**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreImage)
* [**Windows.Services.Store.StoreLicense**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreLicense)
* [**Windows.Services.Store.StorePackageLicense**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StorePackageLicense)
* [**Windows.Services.Store.StorePackageUpdate**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StorePackageUpdate)
* [**Windows.Services.Store.StorePackageUpdateResult**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StorePackageUpdateResult)
* [**Windows.Services.Store.StorePrice**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StorePrice)
* [**Windows.Services.Store.StoreProduct**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreProduct)
* [**Windows.Services.Store.StoreProductPagedQueryResult**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreProductPagedQueryResult)
* [**Windows.Services.Store.StoreProductQueryResult**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreProductQueryResult)
* [**Windows.Services.Store.StoreProductResult**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreProductResult)
* [**Windows.Services.Store.StorePurchaseProperties**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StorePurchaseProperties)
* [**Windows.Services.Store.StorePurchaseResult**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StorePurchaseResult)
* [**Windows.Services.Store.StoreRequestHelper**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreRequestHelper)
* [**Windows.Services.Store.StoreSendRequestResult**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreSendRequestResult)
* [**Windows.Services.Store.StoreSku**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreSku)
* [**Windows.Services.Store.StoreVideo**](https://learn.microsoft.com/uwp/api/Windows.Services.Store.StoreVideo)

### Windows.Storage...

* [**Windows.Storage.AccessCache.StorageApplicationPermissions**](https://learn.microsoft.com/uwp/api/windows.storage.accesscache.storageapplicationpermissions)
* [**Windows.Storage.ApplicationData**](https://learn.microsoft.com/uwp/api/windows.storage.applicationdata)
* [**Windows.Storage.ApplicationDataSetVersionHandler**](https://learn.microsoft.com/uwp/api/windows.storage.applicationdatasetversionhandler)
* [**Windows.Storage.CachedFileManager**](https://learn.microsoft.com/uwp/api/Windows.Storage.CachedFileManager)
* [**Windows.Storage.DownloadsFolder**](https://learn.microsoft.com/uwp/api/Windows.Storage.DownloadsFolder)
* [**Windows.Storage.FileIO**](https://learn.microsoft.com/uwp/api/Windows.Storage.FileIO)
* [**Windows.Storage.FileProperties.BasicProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.FileProperties.BasicProperties)
* [**Windows.Storage.FileProperties.DocumentProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.FileProperties.DocumentProperties)
* [**Windows.Storage.FileProperties.ImageProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.FileProperties.ImageProperties)
* [**Windows.Storage.FileProperties.MusicProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.FileProperties.MusicProperties)
* [**Windows.Storage.FileProperties.StorageItemContentProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.FileProperties.StorageItemContentProperties)
* [**Windows.Storage.FileProperties.StorageItemThumbnail**](https://learn.microsoft.com/uwp/api/Windows.Storage.FileProperties.StorageItemThumbnail)
* [**Windows.Storage.FileProperties.VideoProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.FileProperties.VideoProperties)
* [**Windows.Storage.KnownFolders**](https://learn.microsoft.com/uwp/api/Windows.Storage.KnownFolders)
* [**Windows.Storage.PathIO**](https://learn.microsoft.com/uwp/api/Windows.Storage.PathIO)
* [**Windows.Storage.StorageFile**](https://learn.microsoft.com/uwp/api/Windows.Storage.StorageFile)
* [**Windows.Storage.StorageFolder**](https://learn.microsoft.com/uwp/api/Windows.Storage.StorageFolder)
* [**Windows.Storage.StorageLibrary**](https://learn.microsoft.com/uwp/api/Windows.Storage.StorageLibrary)
* [**Windows.Storage.StorageProvider**](https://learn.microsoft.com/uwp/api/Windows.Storage.StorageProvider)
* [**Windows.Storage.StorageStreamTransaction**](https://learn.microsoft.com/uwp/api/Windows.Storage.StorageStreamTransaction)
* [**Windows.Storage.StreamedFileDataRequest**](https://learn.microsoft.com/uwp/api/Windows.Storage.StreamedFileDataRequest)
* [**Windows.Storage.StreamedFileDataRequestedHandler**](https://learn.microsoft.com/uwp/api/windows.storage.streamedfiledatarequestedhandler)
* [**Windows.Storage.Streams.Buffer**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.Buffer)
* [**Windows.Storage.Streams.DataReader**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.DataReader)
* [**Windows.Storage.Streams.DataReaderLoadOperation**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.DataReaderLoadOperation)
* [**Windows.Storage.Streams.DataWriter**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.DataWriter)
* [**Windows.Storage.Streams.DataWriterStoreOperation**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.DataWriterStoreOperation)
* [**Windows.Storage.Streams.FileInputStream**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.FileInputStream)
* [**Windows.Storage.Streams.FileOutputStream**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.FileOutputStream)
* [**Windows.Storage.Streams.FileRandomAccessStream**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.FileRandomAccessStream)
* [**Windows.Storage.Streams.InMemoryRandomAccessStream**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.InMemoryRandomAccessStream)
* [**Windows.Storage.Streams.InputStreamOverStream**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.InputStreamOverStream)
* [**Windows.Storage.Streams.OutputStreamOverStream**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.OutputStreamOverStream)
* [**Windows.Storage.Streams.RandomAccessStream**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.RandomAccessStream)
* [**Windows.Storage.Streams.RandomAccessStreamOverStream**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.RandomAccessStreamOverStream)
* [**Windows.Storage.Streams.RandomAccessStreamReference**](https://learn.microsoft.com/uwp/api/Windows.Storage.Streams.RandomAccessStreamReference)
* [**Windows.Storage.SystemAudioProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.SystemAudioProperties)
* [**Windows.Storage.SystemGPSProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.SystemGPSProperties)
* [**Windows.Storage.SystemImageProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.SystemImageProperties)
* [**Windows.Storage.SystemMediaProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.SystemMediaProperties)
* [**Windows.Storage.SystemMusicProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.SystemMusicProperties)
* [**Windows.Storage.SystemPhotoProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.SystemPhotoProperties)
* [**Windows.Storage.SystemProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.SystemProperties)
* [**Windows.Storage.SystemVideoProperties**](https://learn.microsoft.com/uwp/api/Windows.Storage.SystemVideoProperties)

### Windows.System...

* [**Windows.System.Diagnostics.ProcessCpuUsage**](https://learn.microsoft.com/uwp/api/Windows.System.Diagnostics.ProcessCpuUsage)
* [**Windows.System.Diagnostics.ProcessCpuUsageReport**](https://learn.microsoft.com/uwp/api/Windows.System.Diagnostics.ProcessCpuUsageReport)
* [**Windows.System.Diagnostics.ProcessDiagnosticInfo**](https://learn.microsoft.com/uwp/api/Windows.System.Diagnostics.ProcessDiagnosticInfo)
* [**Windows.System.Diagnostics.ProcessDiskUsage**](https://learn.microsoft.com/uwp/api/Windows.System.Diagnostics.ProcessDiskUsage)
* [**Windows.System.Diagnostics.ProcessDiskUsageReport**](https://learn.microsoft.com/uwp/api/Windows.System.Diagnostics.ProcessDiskUsageReport)
* [**Windows.System.Diagnostics.ProcessMemoryUsage**](https://learn.microsoft.com/uwp/api/Windows.System.Diagnostics.ProcessMemoryUsage)
* [**Windows.System.Diagnostics.ProcessMemoryUsageReport**](https://learn.microsoft.com/uwp/api/Windows.System.Diagnostics.ProcessMemoryUsageReport)
* [**Windows.System.Profile.AnalyticsInfo**](https://learn.microsoft.com/uwp/api/Windows.System.Profile.AnalyticsInfo)
* [**Windows.System.Profile.AnalyticsVersionInfo**](https://learn.microsoft.com/uwp/api/Windows.System.Profile.AnalyticsVersionInfo)
* [**Windows.System.Threading.Core.PreallocatedWorkItem**](https://learn.microsoft.com/uwp/api/Windows.System.Threading.Core.PreallocatedWorkItem)
* [**Windows.System.Threading.Core.SignalHandler**](https://learn.microsoft.com/uwp/api/windows.system.threading.core.signalhandler)
* [**Windows.System.Threading.Core.SignalNotifier**](https://learn.microsoft.com/uwp/api/Windows.System.Threading.Core.SignalNotifier)
* [**Windows.System.Threading.ThreadPool**](https://learn.microsoft.com/uwp/api/Windows.System.Threading.ThreadPool)
* [**Windows.System.Threading.ThreadPoolTimer**](https://learn.microsoft.com/uwp/api/Windows.System.Threading.ThreadPoolTimer)
* [**Windows.System.Threading.TimerDestroyedHandler**](https://learn.microsoft.com/uwp/api/windows.system.threading.timerdestroyedhandler)
* [**Windows.System.Threading.TimerElapsedHandler**](https://learn.microsoft.com/uwp/api/windows.system.threading.timerelapsedhandler)
* [**Windows.System.Threading.WorkItemHandler**](https://learn.microsoft.com/uwp/api/windows.system.threading.workitemhandler)
* [**Windows.System.TimeZoneSettings**](https://learn.microsoft.com/uwp/api/Windows.System.TimeZoneSettings)

### Windows.UI...

* [**Windows.UI.Notifications.BadgeNotification**](https://learn.microsoft.com/uwp/api/Windows.UI.Notifications.BadgeNotification)
* [**Windows.UI.Notifications.BadgeUpdateManager**](https://learn.microsoft.com/uwp/api/Windows.UI.Notifications.BadgeUpdateManager)
* [**Windows.UI.Notifications.BadgeUpdater**](https://learn.microsoft.com/uwp/api/Windows.UI.Notifications.BadgeUpdater)
* [**Windows.UI.Notifications.ScheduledTileNotification**](https://learn.microsoft.com/uwp/api/Windows.UI.Notifications.ScheduledTileNotification)
* [**Windows.UI.Notifications.ScheduledToastNotification**](https://learn.microsoft.com/uwp/api/Windows.UI.Notifications.ScheduledToastNotification)
* [**Windows.UI.Notifications.TileNotification**](https://learn.microsoft.com/uwp/api/Windows.UI.Notifications.TileNotification)
* [**Windows.UI.Notifications.TileUpdateManager**](https://learn.microsoft.com/uwp/api/Windows.UI.Notifications.TileUpdateManager)
* [**Windows.UI.Notifications.TileUpdater**](https://learn.microsoft.com/uwp/api/Windows.UI.Notifications.TileUpdater)
* [**Windows.UI.Notifications.ToastNotificationHistory**](https://learn.microsoft.com/uwp/api/Windows.UI.Notifications.ToastNotificationHistory)
* [**Windows.UI.StartScreen.JumpList**](https://learn.microsoft.com/uwp/api/Windows.UI.StartScreen.JumpList)
* [**Windows.UI.StartScreen.JumpListItem**](https://learn.microsoft.com/uwp/api/Windows.UI.StartScreen.JumpListItem)

In addition, when called from a desktop app that doesn't have package identity, the [**AdaptiveMediaSource.CreateFromUriAsync**](https://learn.microsoft.com/uwp/api/Windows.Media.Streaming.Adaptive.AdaptiveMediaSource.CreateFromUriAsync) methods don't support the `ms-appx` and `ms-resource` URI formats.
