---
title: Windows 10 Build 19041 API changes
description: Developers can use the following list to identify new or changed namespaces in Windows 10 build 19041
keywords: Windows 10, apis, 19041, 2004
ms.date: 05/12/2020
ms.topic: article
ms.localizationpriority: medium
---
# New APIs in Windows 10 build 19041

New and updated API namespaces have been made available to developers in Windows 10 build 19041 (Also known as SDK version 2004). Below is a full list of documentation published for namespaces added or modified in this release.

For information on APIs added in the previous public release, see [New APIs in the Windows 10 October Update](windows-10-build-18362-api-diff.md).

## Windows.AI

### [Windows.AI.MachineLearning](https://learn.microsoft.com/uwp/api/windows.ai.machinelearning)

#### [LearningModelSessionOptions](https://learn.microsoft.com/uwp/api/windows.ai.machinelearning.learningmodelsessionoptions)

LearningModelSessionOptions.CloseModelOnSessionCreation

## Windows.ApplicationModel

### [Windows.ApplicationModel.Background](https://learn.microsoft.com/uwp/api/windows.applicationmodel.background)

#### [BackgroundTaskBuilder](https://learn.microsoft.com/uwp/api/windows.applicationmodel.background.backgroundtaskbuilder)

BackgroundTaskBuilder.SetTaskEntryPointClsid

#### [BluetoothLEAdvertisementPublisherTrigger](https://learn.microsoft.com/uwp/api/windows.applicationmodel.background.bluetoothleadvertisementpublishertrigger)

BluetoothLEAdvertisementPublisherTrigger.IncludeTransmitPowerLevel <br> BluetoothLEAdvertisementPublisherTrigger.IsAnonymous <br> BluetoothLEAdvertisementPublisherTrigger.PreferredTransmitPowerLevelInDBm <br> BluetoothLEAdvertisementPublisherTrigger.UseExtendedFormat

#### [BluetoothLEAdvertisementWatcherTrigger](https://learn.microsoft.com/uwp/api/windows.applicationmodel.background.bluetoothleadvertisementwatchertrigger)

BluetoothLEAdvertisementWatcherTrigger.AllowExtendedAdvertisements

### [Windows.ApplicationModel.ConversationalAgent](https://learn.microsoft.com/uwp/api/windows.applicationmodel.conversationalagent)

#### [ActivationSignalDetectionConfiguration](https://learn.microsoft.com/uwp/api/windows.applicationmodel.conversationalagent.activationsignaldetectionconfiguration)

ActivationSignalDetectionConfiguration <br> ActivationSignalDetectionConfiguration.ApplyTrainingData <br> ActivationSignalDetectionConfiguration.ApplyTrainingDataAsync <br> ActivationSignalDetectionConfiguration.AvailabilityChanged <br> ActivationSignalDetectionConfiguration.AvailabilityInfo <br> ActivationSignalDetectionConfiguration.ClearModelData <br> ActivationSignalDetectionConfiguration.ClearModelDataAsync <br> ActivationSignalDetectionConfiguration.ClearTrainingData <br> ActivationSignalDetectionConfiguration.ClearTrainingDataAsync <br> ActivationSignalDetectionConfiguration.DisplayName <br> ActivationSignalDetectionConfiguration.GetModelData <br> ActivationSignalDetectionConfiguration.GetModelDataAsync <br> ActivationSignalDetectionConfiguration.GetModelDataType <br> ActivationSignalDetectionConfiguration.GetModelDataTypeAsync <br> ActivationSignalDetectionConfiguration.IsActive <br> ActivationSignalDetectionConfiguration.ModelId <br> ActivationSignalDetectionConfiguration.SetEnabled <br> ActivationSignalDetectionConfiguration.SetEnabledAsync <br> ActivationSignalDetectionConfiguration.SetModelData <br> ActivationSignalDetectionConfiguration.SetModelDataAsync <br> ActivationSignalDetectionConfiguration.SignalId <br> ActivationSignalDetectionConfiguration.TrainingDataFormat <br> ActivationSignalDetectionConfiguration.TrainingStepsCompleted <br> ActivationSignalDetectionConfiguration.TrainingStepsRemaining

#### [ActivationSignalDetectionTrainingDataFormat](https://learn.microsoft.com/uwp/api/windows.applicationmodel.conversationalagent.activationsignaldetectiontrainingdataformat)

ActivationSignalDetectionTrainingDataFormat

#### [ActivationSignalDetector](https://learn.microsoft.com/uwp/api/windows.applicationmodel.conversationalagent.activationsignaldetector)

ActivationSignalDetector <br> ActivationSignalDetector.CanCreateConfigurations <br> ActivationSignalDetector.CreateConfiguration <br> ActivationSignalDetector.CreateConfigurationAsync <br> ActivationSignalDetector.GetConfiguration <br> ActivationSignalDetector.GetConfigurationAsync <br> ActivationSignalDetector.GetConfigurations <br> ActivationSignalDetector.GetConfigurationsAsync <br> ActivationSignalDetector.GetSupportedModelIdsForSignalId <br> ActivationSignalDetector.GetSupportedModelIdsForSignalIdAsync <br> ActivationSignalDetector.Kind <br> ActivationSignalDetector.ProviderId <br> ActivationSignalDetector.RemoveConfiguration <br> ActivationSignalDetector.RemoveConfigurationAsync <br> ActivationSignalDetector.SupportedModelDataTypes <br> ActivationSignalDetector.SupportedPowerStates <br> ActivationSignalDetector.SupportedTrainingDataFormats

#### [ActivationSignalDetectorKind](https://learn.microsoft.com/uwp/api/windows.applicationmodel.conversationalagent.activationsignaldetectorkind)

ActivationSignalDetectorKind

#### [ActivationSignalDetectorPowerState](https://learn.microsoft.com/uwp/api/windows.applicationmodel.conversationalagent.activationsignaldetectorpowerstate)

ActivationSignalDetectorPowerState

#### [ConversationalAgentDetectorManager](https://learn.microsoft.com/uwp/api/windows.applicationmodel.conversationalagent.conversationalagentdetectormanager)

ConversationalAgentDetectorManager <br> ConversationalAgentDetectorManager.Default <br> ConversationalAgentDetectorManager.GetActivationSignalDetectors <br> ConversationalAgentDetectorManager.GetActivationSignalDetectorsAsync <br> ConversationalAgentDetectorManager.GetAllActivationSignalDetectors <br> ConversationalAgentDetectorManager.GetAllActivationSignalDetectorsAsync

#### [DetectionConfigurationAvailabilityChangeKind](https://learn.microsoft.com/uwp/api/windows.applicationmodel.conversationalagent.detectionconfigurationavailabilitychangedeventargs)

DetectionConfigurationAvailabilityChangeKind <br> DetectionConfigurationAvailabilityChangedEventArgs

#### [DetectionConfigurationAvailabilityChangedEventArgs](https://learn.microsoft.com/uwp/api/windows.applicationmodel.conversationalagent.detectionconfigurationavailabilitychangekind)

DetectionConfigurationAvailabilityChangedEventArgs.Kind

#### [DetectionConfigurationAvailabilityInfo](https://learn.microsoft.com/uwp/api/windows.applicationmodel.conversationalagent.detectionconfigurationavailabilityinfo)

DetectionConfigurationAvailabilityInfo <br> DetectionConfigurationAvailabilityInfo.HasLockScreenPermission <br> DetectionConfigurationAvailabilityInfo.HasPermission <br> DetectionConfigurationAvailabilityInfo.HasSystemResourceAccess <br> DetectionConfigurationAvailabilityInfo.IsEnabled

#### [DetectionConfigurationTrainingStatus](https://learn.microsoft.com/uwp/api/windows.applicationmodel.conversationalagent.detectionconfigurationtrainingstatus)

DetectionConfigurationTrainingStatus

### [Windows.ApplicationModel](https://learn.microsoft.com/uwp/api/windows.applicationmodel)

#### [AppInfo](https://learn.microsoft.com/uwp/api/windows.applicationmodel.appinfo)

AppInfo.Current <br> AppInfo.GetFromAppUserModelId <br> AppInfo.GetFromAppUserModelIdForUser <br> AppInfo.Package

#### [IAppInfoStatics](https://learn.microsoft.com/uwp/api/windows.applicationmodel.iappinfostatics)

IAppInfoStatics <br> IAppInfoStatics.Current <br> IAppInfoStatics.GetFromAppUserModelId <br> IAppInfoStatics.GetFromAppUserModelIdForUser

#### [Package](https://learn.microsoft.com/uwp/api/windows.applicationmodel.package)

Package.EffectiveExternalLocation <br> Package.EffectiveExternalPath <br> Package.EffectivePath <br> Package.GetAppListEntries <br> Package.GetLogoAsRandomAccessStreamReference <br> Package.InstalledPath <br> Package.IsStub <br> Package.MachineExternalLocation <br> Package.MachineExternalPath <br> Package.MutablePath <br> Package.UserExternalLocation <br> Package.UserExternalPath

## Windows.Devices

### [Windows.Devices.Bluetooth.Advertisement](https://learn.microsoft.com/uwp/api/windows.devices.bluetooth.advertisement)

#### [BluetoothLEAdvertisementPublisher](https://learn.microsoft.com/uwp/api/windows.devices.bluetooth.advertisement.bluetoothleadvertisementpublisher)

BluetoothLEAdvertisementPublisher.IncludeTransmitPowerLevel <br> BluetoothLEAdvertisementPublisher.IsAnonymous <br> BluetoothLEAdvertisementPublisher.PreferredTransmitPowerLevelInDBm <br> BluetoothLEAdvertisementPublisher.UseExtendedAdvertisement

#### [BluetoothLEAdvertisementPublisherStatusChangedEventArgs](https://learn.microsoft.com/uwp/api/windows.devices.bluetooth.advertisement.bluetoothleadvertisementpublisherstatuschangedeventargs)

BluetoothLEAdvertisementPublisherStatusChangedEventArgs.SelectedTransmitPowerLevelInDBm

#### [BluetoothLEAdvertisementReceivedEventArgs](https://learn.microsoft.com/uwp/api/windows.devices.bluetooth.advertisement.bluetoothleadvertisementreceivedeventargs)

BluetoothLEAdvertisementReceivedEventArgs.BluetoothAddressType <br> BluetoothLEAdvertisementReceivedEventArgs.IsAnonymous <br> BluetoothLEAdvertisementReceivedEventArgs.IsConnectable <br> BluetoothLEAdvertisementReceivedEventArgs.IsDirected <br> BluetoothLEAdvertisementReceivedEventArgs.IsScanResponse <br> BluetoothLEAdvertisementReceivedEventArgs.IsScannable <br> BluetoothLEAdvertisementReceivedEventArgs.TransmitPowerLevelInDBm

#### [BluetoothLEAdvertisementWatcher](https://learn.microsoft.com/uwp/api/windows.devices.bluetooth.advertisement.bluetoothleadvertisementwatcher)

BluetoothLEAdvertisementWatcher.AllowExtendedAdvertisements

### [Windows.Devices.Bluetooth.Background](https://learn.microsoft.com/uwp/api/windows.devices.bluetooth.background)

#### [BluetoothLEAdvertisementPublisherTriggerDetails](https://learn.microsoft.com/uwp/api/windows.devices.bluetooth.background.bluetoothleadvertisementpublishertriggerdetails)

BluetoothLEAdvertisementPublisherTriggerDetails.SelectedTransmitPowerLevelInDBm

### [Windows.Devices.Bluetooth](https://learn.microsoft.com/uwp/api/windows.devices.bluetooth)

#### [BluetoothAdapter](https://learn.microsoft.com/uwp/api/windows.devices.bluetooth.bluetoothadapter)

BluetoothAdapter.IsExtendedAdvertisingSupported <br> BluetoothAdapter.MaxAdvertisementDataLength

### [Windows.Devices.Display](https://learn.microsoft.com/uwp/api/windows.devices.display)

#### [DisplayMonitor](https://learn.microsoft.com/uwp/api/windows.devices.display.displaymonitor)

DisplayMonitor.IsDolbyVisionSupportedInHdrMode

### [Windows.Devices.Input](https://learn.microsoft.com/uwp/api/windows.devices.input)

#### [PenButtonListener](https://learn.microsoft.com/uwp/api/windows.devices.input.penbuttonlistener)

PenButtonListener <br> PenButtonListener.GetDefault <br> PenButtonListener.IsSupported <br> PenButtonListener.IsSupportedChanged <br> PenButtonListener.TailButtonClicked <br> PenButtonListener.TailButtonDoubleClicked <br> PenButtonListener.TailButtonLongPressed

#### [PenDockListener](https://learn.microsoft.com/uwp/api/windows.devices.input.pendockedeventargs)

PenDockListener

#### [PenDockListener](https://learn.microsoft.com/uwp/api/windows.devices.input.pendocklistener)

PenDockListener.Docked <br> PenDockListener.GetDefault <br> PenDockListener.IsSupported <br> PenDockListener.IsSupportedChanged <br> PenDockListener.Undocked <br> PenDockedEventArgs

#### [PenTailButtonClickedEventArgs](https://learn.microsoft.com/uwp/api/windows.devices.input.pentailbuttonclickedeventargs)

PenTailButtonClickedEventArgs

#### [PenTailButtonDoubleClickedEventArgs](https://learn.microsoft.com/uwp/api/windows.devices.input.pentailbuttondoubleclickedeventargs)

PenTailButtonDoubleClickedEventArgs

#### [PenTailButtonLongPressedEventArgs](https://learn.microsoft.com/uwp/api/windows.devices.input.pentailbuttonlongpressedeventargs)

PenTailButtonLongPressedEventArgs

#### [PenUndockedEventArgs](https://learn.microsoft.com/uwp/api/windows.devices.input.penundockedeventargs)

PenUndockedEventArgs

### [Windows.Devices.Sensors](https://learn.microsoft.com/uwp/api/windows.devices.sensors)

#### [Accelerometer](https://learn.microsoft.com/uwp/api/windows.devices.sensors.accelerometer)

Accelerometer.ReportThreshold

#### [AccelerometerDataThreshold](https://learn.microsoft.com/uwp/api/windows.devices.sensors.accelerometerdatathreshold)

AccelerometerDataThreshold <br> AccelerometerDataThreshold.XAxisInGForce <br> AccelerometerDataThreshold.YAxisInGForce <br> AccelerometerDataThreshold.ZAxisInGForce

#### [Barometer](https://learn.microsoft.com/uwp/api/windows.devices.sensors.barometer)

Barometer.ReportThreshold

#### [BarometerDataThreshold](https://learn.microsoft.com/uwp/api/windows.devices.sensors.barometerdatathreshold)

BarometerDataThreshold <br> BarometerDataThreshold.Hectopascals

#### [Compass](https://learn.microsoft.com/uwp/api/windows.devices.sensors.compass)

Compass.ReportThreshold

#### [CompassDataThreshold](https://learn.microsoft.com/uwp/api/windows.devices.sensors.compassdatathreshold)

CompassDataThreshold <br> CompassDataThreshold.Degrees

#### [Gyrometer](https://learn.microsoft.com/uwp/api/windows.devices.sensors.gyrometer)

Gyrometer.ReportThreshold

#### [GyrometerDataThreshold](https://learn.microsoft.com/uwp/api/windows.devices.sensors.gyrometerdatathreshold)

GyrometerDataThreshold <br> GyrometerDataThreshold.XAxisInDegreesPerSecond <br> GyrometerDataThreshold.YAxisInDegreesPerSecond <br> GyrometerDataThreshold.ZAxisInDegreesPerSecond

#### [Inclinometer](https://learn.microsoft.com/uwp/api/windows.devices.sensors.inclinometer)

Inclinometer.ReportThreshold

#### [InclinometerDataThreshold](https://learn.microsoft.com/uwp/api/windows.devices.sensors.inclinometerdatathreshold)

InclinometerDataThreshold <br> InclinometerDataThreshold.PitchInDegrees <br> InclinometerDataThreshold.RollInDegrees <br> InclinometerDataThreshold.YawInDegrees

#### [LightSensor](https://learn.microsoft.com/uwp/api/windows.devices.sensors.lightsensor)

LightSensor.ReportThreshold

#### [LightSensorDataThreshold](https://learn.microsoft.com/uwp/api/windows.devices.sensors.lightsensordatathreshold)

LightSensorDataThreshold <br> LightSensorDataThreshold.AbsoluteLux <br> LightSensorDataThreshold.LuxPercentage

#### [Magnetometer](https://learn.microsoft.com/uwp/api/windows.devices.sensors.magnetometer)

Magnetometer.ReportThreshold

#### [MagnetometerDataThreshold](https://learn.microsoft.com/uwp/api/windows.devices.sensors.magnetometerdatathreshold)

MagnetometerDataThreshold <br> MagnetometerDataThreshold.XAxisMicroteslas <br> MagnetometerDataThreshold.YAxisMicroteslas <br> MagnetometerDataThreshold.ZAxisMicroteslas

## Windows.Foundation

### [Windows.Foundation.Metadata](https://learn.microsoft.com/uwp/api/windows.foundation.metadata)

#### [AttributeNameAttribute](https://learn.microsoft.com/uwp/api/windows.foundation.metadata.attributenameattribute)

AttributeNameAttribute <br> AttributeNameAttribute.#ctor

#### [FastAbiAttribute](https://learn.microsoft.com/uwp/api/windows.foundation.metadata.fastabiattribute)

FastAbiAttribute <br> FastAbiAttribute.#ctor <br> FastAbiAttribute.#ctor <br> FastAbiAttribute.#ctor

#### [NoExceptionAttribute](https://learn.microsoft.com/uwp/api/windows.foundation.metadata.noexceptionattribute)

NoExceptionAttribute <br> NoExceptionAttribute.#ctor

## Windows.Globalization

### [Windows.Globalization](https://learn.microsoft.com/uwp/api/windows.globalization)

#### [Language](https://learn.microsoft.com/uwp/api/windows.globalization.language)

Language.AbbreviatedName <br> Language.GetMuiCompatibleLanguageListFromLanguageTags

## Windows.Graphics

### [Windows.Graphics.Capture](https://learn.microsoft.com/uwp/api/windows.graphics.capture)

#### [GraphicsCaptureSession](https://learn.microsoft.com/uwp/api/windows.graphics.capture.graphicscapturesession)

GraphicsCaptureSession.IsCursorCaptureEnabled

### [Windows.Graphics.Holographic](https://learn.microsoft.com/uwp/api/windows.graphics.holographic)

#### [HolographicFrame](https://learn.microsoft.com/uwp/api/windows.graphics.holographic.holographicframe)

HolographicFrame.Id

#### [HolographicFrameId](https://learn.microsoft.com/uwp/api/windows.graphics.holographic.holographicframeid)

HolographicFrameId

#### [HolographicFrameRenderingReport](https://learn.microsoft.com/uwp/api/windows.graphics.holographic.holographicframerenderingreport)

HolographicFrameRenderingReport <br> HolographicFrameRenderingReport.FrameId <br> HolographicFrameRenderingReport.MissedLatchCount <br> HolographicFrameRenderingReport.SystemRelativeActualGpuFinishTime <br> HolographicFrameRenderingReport.SystemRelativeFrameReadyTime <br> HolographicFrameRenderingReport.SystemRelativeTargetLatchTime

#### [HolographicFrameScanoutMonitor](https://learn.microsoft.com/uwp/api/windows.graphics.holographic.holographicframescanoutmonitor)

HolographicFrameScanoutMonitor <br> HolographicFrameScanoutMonitor.Close <br> HolographicFrameScanoutMonitor.ReadReports

#### [HolographicFrameScanoutReport](https://learn.microsoft.com/uwp/api/windows.graphics.holographic.holographicframescanoutreport)

HolographicFrameScanoutReport <br> HolographicFrameScanoutReport.MissedScanoutCount <br> HolographicFrameScanoutReport.RenderingReport <br> HolographicFrameScanoutReport.SystemRelativeLatchTime <br> HolographicFrameScanoutReport.SystemRelativePhotonTime <br> HolographicFrameScanoutReport.SystemRelativeScanoutStartTime

#### [HolographicSpace](https://learn.microsoft.com/uwp/api/windows.graphics.holographic.holographicspace)

HolographicSpace.CreateFrameScanoutMonitor

## Windows.Management

### [Windows.Management.Deployment](https://learn.microsoft.com/uwp/api/windows.management.deployment)

#### [AddPackageOptions](https://learn.microsoft.com/uwp/api/windows.management.deployment.addpackageoptions)

AddPackageOptions <br> AddPackageOptions.#ctor <br> AddPackageOptions.AllowUnsigned <br> AddPackageOptions.DeferRegistrationWhenPackagesAreInUse <br> AddPackageOptions.DependencyPackageUris <br> AddPackageOptions.DeveloperMode <br> AddPackageOptions.ExternalLocationUri <br> AddPackageOptions.ForceAppShutdown <br> AddPackageOptions.ForceTargetAppShutdown <br> AddPackageOptions.ForceUpdateFromAnyVersion <br> AddPackageOptions.InstallAllResources <br> AddPackageOptions.OptionalPackageFamilyNames <br> AddPackageOptions.OptionalPackageUris <br> AddPackageOptions.RelatedPackageUris <br> AddPackageOptions.RequiredContentGroupOnly <br> AddPackageOptions.RetainFilesOnFailure <br> AddPackageOptions.StageInPlace <br> AddPackageOptions.StubPackageOption <br> AddPackageOptions.TargetVolume

#### [PackageManager](https://learn.microsoft.com/uwp/api/windows.management.deployment.packagemanager)

PackageManager.AddPackageByUriAsync <br> PackageManager.FindProvisionedPackages <br> PackageManager.GetPackageStubPreference <br> PackageManager.RegisterPackageByUriAsync <br> PackageManager.RegisterPackagesByFullNameAsync <br> PackageManager.SetPackageStubPreference <br> PackageManager.StagePackageByUriAsync

#### [PackageStubPreference](https://learn.microsoft.com/uwp/api/windows.management.deployment.packagestubpreference)

PackageStubPreference

#### [RegisterPackageOptions](https://learn.microsoft.com/uwp/api/windows.management.deployment.registerpackageoptions)

RegisterPackageOptions <br> RegisterPackageOptions.#ctor <br> RegisterPackageOptions.AllowUnsigned <br> RegisterPackageOptions.AppDataVolume <br> RegisterPackageOptions.DeferRegistrationWhenPackagesAreInUse <br> RegisterPackageOptions.DependencyPackageUris <br> RegisterPackageOptions.DeveloperMode <br> RegisterPackageOptions.ExternalLocationUri <br> RegisterPackageOptions.ForceAppShutdown <br> RegisterPackageOptions.ForceTargetAppShutdown <br> RegisterPackageOptions.ForceUpdateFromAnyVersion <br> RegisterPackageOptions.InstallAllResources <br> RegisterPackageOptions.OptionalPackageFamilyNames <br> RegisterPackageOptions.StageInPlace

#### [StagePackageOptions](https://learn.microsoft.com/uwp/api/windows.management.deployment.stagepackageoptions)

StagePackageOptions <br> StagePackageOptions.#ctor <br> StagePackageOptions.AllowUnsigned <br> StagePackageOptions.DependencyPackageUris <br> StagePackageOptions.DeveloperMode <br> StagePackageOptions.ExternalLocationUri <br> StagePackageOptions.ForceUpdateFromAnyVersion <br> StagePackageOptions.InstallAllResources <br> StagePackageOptions.OptionalPackageFamilyNames <br> StagePackageOptions.OptionalPackageUris <br> StagePackageOptions.RelatedPackageUris <br> StagePackageOptions.RequiredContentGroupOnly <br> StagePackageOptions.StageInPlace <br> StagePackageOptions.StubPackageOption <br> StagePackageOptions.TargetVolume

#### [StubPackageOption](https://learn.microsoft.com/uwp/api/windows.management.deployment.stubpackageoption)

StubPackageOption

## Windows.Media

### [Windows.Media.Audio](https://learn.microsoft.com/uwp/api/windows.media.audio)

#### [AudioPlaybackConnection](https://learn.microsoft.com/uwp/api/windows.media.audio.audioplaybackconnection)

AudioPlaybackConnection <br> AudioPlaybackConnection.Close <br> AudioPlaybackConnection.DeviceId <br> AudioPlaybackConnection.GetDeviceSelector <br> AudioPlaybackConnection.Open <br> AudioPlaybackConnection.OpenAsync <br> AudioPlaybackConnection.Start <br> AudioPlaybackConnection.StartAsync <br> AudioPlaybackConnection.State <br> AudioPlaybackConnection.StateChanged <br> AudioPlaybackConnection.TryCreateFromId

#### [AudioPlaybackConnectionOpenResult](https://learn.microsoft.com/uwp/api/windows.media.audio.audioplaybackconnectionopenresult)

AudioPlaybackConnectionOpenResult <br> AudioPlaybackConnectionOpenResult.ExtendedError <br> AudioPlaybackConnectionOpenResult.Status

#### [AudioPlaybackConnectionOpenResultStatus](https://learn.microsoft.com/uwp/api/windows.media.audio.audioplaybackconnectionopenresultstatus)

AudioPlaybackConnectionOpenResultStatus

#### [AudioPlaybackConnectionState](https://learn.microsoft.com/uwp/api/windows.media.audio.audioplaybackconnectionstate)

AudioPlaybackConnectionState

### [Windows.Media.Capture.Frames](https://learn.microsoft.com/uwp/api/windows.media.capture.frames)

#### [MediaFrameSourceInfo](https://learn.microsoft.com/uwp/api/windows.media.capture.frames.mediaframesourceinfo)

MediaFrameSourceInfo.GetRelativePanel

### [Windows.Media.Capture](https://learn.microsoft.com/uwp/api/windows.media.capture)

#### [MediaCapture](https://learn.microsoft.com/uwp/api/windows.media.capture.mediacapture)

MediaCapture.CreateRelativePanelWatcher

#### [MediaCaptureInitializationSettings](https://learn.microsoft.com/uwp/api/windows.media.capture.mediacaptureinitializationsettings)

MediaCaptureInitializationSettings.DeviceUri <br> MediaCaptureInitializationSettings.DeviceUriPasswordCredential

#### [MediaCaptureRelativePanelWatcher](https://learn.microsoft.com/uwp/api/windows.media.capture.mediacapturerelativepanelwatcher)

MediaCaptureRelativePanelWatcher <br> MediaCaptureRelativePanelWatcher.Changed <br> MediaCaptureRelativePanelWatcher.Close <br> MediaCaptureRelativePanelWatcher.RelativePanel <br> MediaCaptureRelativePanelWatcher.Start <br> MediaCaptureRelativePanelWatcher.Stop

### [Windows.Media.Devices](https://learn.microsoft.com/uwp/api/windows.media.devices)

#### [PanelBasedOptimizationControl](https://learn.microsoft.com/uwp/api/windows.media.devices.panelbasedoptimizationcontrol)

PanelBasedOptimizationControl <br> PanelBasedOptimizationControl.IsSupported <br> PanelBasedOptimizationControl.Panel

#### [VideoDeviceController](https://learn.microsoft.com/uwp/api/windows.media.devices.videodevicecontroller)

VideoDeviceController.PanelBasedOptimizationControl

### [Windows.Media.MediaProperties](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties)

#### [MediaEncodingSubtypes](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.mediaencodingsubtypes)

MediaEncodingSubtypes.Pgs <br> MediaEncodingSubtypes.Srt <br> MediaEncodingSubtypes.Ssa <br> MediaEncodingSubtypes.VobSub

#### [TimedMetadataEncodingProperties](https://learn.microsoft.com/uwp/api/windows.media.mediaproperties.timedmetadataencodingproperties)

TimedMetadataEncodingProperties.CreatePgs <br> TimedMetadataEncodingProperties.CreateSrt <br> TimedMetadataEncodingProperties.CreateSsa <br> TimedMetadataEncodingProperties.CreateVobSub

## Windows.Networking

### [Windows.Networking.BackgroundTransfer](https://learn.microsoft.com/uwp/api/windows.networking.backgroundtransfer)

#### [DownloadOperation](https://learn.microsoft.com/uwp/api/windows.networking.backgroundtransfer.downloadoperation)

DownloadOperation.RemoveRequestHeader <br> DownloadOperation.SetRequestHeader

#### [UploadOperation](https://learn.microsoft.com/uwp/api/windows.networking.backgroundtransfer.uploadoperation)

UploadOperation.RemoveRequestHeader <br> UploadOperation.SetRequestHeader

### [Windows.Networking.NetworkOperators](https://learn.microsoft.com/uwp/api/windows.networking.networkoperators)

#### [NetworkOperatorTetheringAccessPointConfiguration](https://learn.microsoft.com/uwp/api/windows.networking.networkoperators.networkoperatortetheringaccesspointconfiguration)

NetworkOperatorTetheringAccessPointConfiguration.Band <br> NetworkOperatorTetheringAccessPointConfiguration.IsBandSupported <br> NetworkOperatorTetheringAccessPointConfiguration.IsBandSupportedAsync

#### [NetworkOperatorTetheringManager](https://learn.microsoft.com/uwp/api/windows.networking.networkoperators.networkoperatortetheringmanager)

NetworkOperatorTetheringManager.DisableNoConnectionsTimeout <br> NetworkOperatorTetheringManager.DisableNoConnectionsTimeoutAsync <br> NetworkOperatorTetheringManager.EnableNoConnectionsTimeout <br> NetworkOperatorTetheringManager.EnableNoConnectionsTimeoutAsync <br> NetworkOperatorTetheringManager.IsNoConnectionsTimeoutEnabled

#### [TetheringWiFiBand](https://learn.microsoft.com/uwp/api/windows.networking.networkoperators.tetheringwifiband)

TetheringWiFiBand

### [Windows.Networking.PushNotifications](https://learn.microsoft.com/uwp/api/windows.networking.pushnotifications)

#### [RawNotification](https://learn.microsoft.com/uwp/api/windows.networking.pushnotifications.rawnotification)

RawNotification.ContentBytes

## Windows.Security

### [Windows.Security.Authentication.Web.Core](https://learn.microsoft.com/uwp/api/windows.security.authentication.web.core)

#### [WebAccountMonitor](https://learn.microsoft.com/uwp/api/windows.security.authentication.web.core.webaccountmonitor)

WebAccountMonitor.AccountPictureUpdated

### [Windows.Security.Isolation](https://learn.microsoft.com/uwp/api/windows.security.isolation)

#### [IsolatedWindowsEnvironment](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironment)

IsolatedWindowsEnvironment <br> IsolatedWindowsEnvironment.CreateAsync <br> IsolatedWindowsEnvironment.CreateAsync <br> IsolatedWindowsEnvironment.FindByOwnerId <br> IsolatedWindowsEnvironment.GetById <br> IsolatedWindowsEnvironment.Id <br> IsolatedWindowsEnvironment.LaunchFileWithUIAsync <br> IsolatedWindowsEnvironment.LaunchFileWithUIAsync <br> IsolatedWindowsEnvironment.RegisterMessageReceiver <br> IsolatedWindowsEnvironment.ShareFolderAsync <br> IsolatedWindowsEnvironment.ShareFolderAsync <br> IsolatedWindowsEnvironment.StartProcessSilentlyAsync <br> IsolatedWindowsEnvironment.StartProcessSilentlyAsync <br> IsolatedWindowsEnvironment.TerminateAsync <br> IsolatedWindowsEnvironment.TerminateAsync

#### [IsolatedWindowsEnvironment](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentactivator)

IsolatedWindowsEnvironment.UnregisterMessageReceiver

#### [IsolatedWindowsEnvironmentActivator](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentallowedclipboardformats)

IsolatedWindowsEnvironmentActivator

#### [IsolatedWindowsEnvironmentAllowedClipboardFormats](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentavailableprinters)

IsolatedWindowsEnvironmentAllowedClipboardFormats

#### [IsolatedWindowsEnvironmentAvailablePrinters](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentclipboardcopypastedirections)

IsolatedWindowsEnvironmentAvailablePrinters

#### [IsolatedWindowsEnvironmentClipboardCopyPasteDirections](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentcreateprogress)

IsolatedWindowsEnvironmentClipboardCopyPasteDirections

#### [IsolatedWindowsEnvironmentCreateProgress](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentcreateresult)

IsolatedWindowsEnvironmentCreateProgress <br> IsolatedWindowsEnvironmentCreateResult <br> IsolatedWindowsEnvironmentCreateResult.Environment <br> IsolatedWindowsEnvironmentCreateResult.ExtendedError

#### [IsolatedWindowsEnvironmentCreateResult](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentcreatestatus)

IsolatedWindowsEnvironmentCreateResult.Status

#### [IsolatedWindowsEnvironmentCreateStatus](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentfile)

IsolatedWindowsEnvironmentCreateStatus <br> IsolatedWindowsEnvironmentFile <br> IsolatedWindowsEnvironmentFile.Close <br> IsolatedWindowsEnvironmentFile.HostPath

#### [IsolatedWindowsEnvironmentFile](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmenthost)

IsolatedWindowsEnvironmentFile.Id <br> IsolatedWindowsEnvironmentHost <br> IsolatedWindowsEnvironmentHost.HostErrors

#### [IsolatedWindowsEnvironmentHost](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmenthosterror)

IsolatedWindowsEnvironmentHost.IsReady

#### [IsolatedWindowsEnvironmentHostError](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentlaunchfileresult)

IsolatedWindowsEnvironmentHostError <br> IsolatedWindowsEnvironmentLaunchFileResult <br> IsolatedWindowsEnvironmentLaunchFileResult.ExtendedError <br> IsolatedWindowsEnvironmentLaunchFileResult.File

#### [IsolatedWindowsEnvironmentLaunchFileResult](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentlaunchfilestatus)

IsolatedWindowsEnvironmentLaunchFileResult.Status

#### [IsolatedWindowsEnvironmentLaunchFileStatus](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentoptions)

IsolatedWindowsEnvironmentLaunchFileStatus <br> IsolatedWindowsEnvironmentOptions <br> IsolatedWindowsEnvironmentOptions.#ctor <br> IsolatedWindowsEnvironmentOptions.AllowCameraAndMicrophoneAccess <br> IsolatedWindowsEnvironmentOptions.AllowGraphicsHardwareAcceleration <br> IsolatedWindowsEnvironmentOptions.AllowedClipboardFormats <br> IsolatedWindowsEnvironmentOptions.AvailablePrinters <br> IsolatedWindowsEnvironmentOptions.ClipboardCopyPasteDirections <br> IsolatedWindowsEnvironmentOptions.EnvironmentOwnerId <br> IsolatedWindowsEnvironmentOptions.PersistUserProfile <br> IsolatedWindowsEnvironmentOptions.ShareHostFolderForUntrustedItems <br> IsolatedWindowsEnvironmentOptions.SharedFolderNameInEnvironment

#### [IsolatedWindowsEnvironmentOptions](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentownerregistration)

IsolatedWindowsEnvironmentOptions.SharedHostFolderPath <br> IsolatedWindowsEnvironmentOwnerRegistration <br> IsolatedWindowsEnvironmentOwnerRegistration.Register

#### [IsolatedWindowsEnvironmentOwnerRegistration](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentownerregistrationdata)

IsolatedWindowsEnvironmentOwnerRegistration.Unregister <br> IsolatedWindowsEnvironmentOwnerRegistrationData <br> IsolatedWindowsEnvironmentOwnerRegistrationData.#ctor <br> IsolatedWindowsEnvironmentOwnerRegistrationData.ActivationFileExtensions <br> IsolatedWindowsEnvironmentOwnerRegistrationData.ProcessesRunnableAsSystem <br> IsolatedWindowsEnvironmentOwnerRegistrationData.ProcessesRunnableAsUser

#### [IsolatedWindowsEnvironmentOwnerRegistrationData](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentownerregistrationresult)

IsolatedWindowsEnvironmentOwnerRegistrationData.ShareableFolders <br> IsolatedWindowsEnvironmentOwnerRegistrationResult <br> IsolatedWindowsEnvironmentOwnerRegistrationResult.ExtendedError

#### [IsolatedWindowsEnvironmentOwnerRegistrationResult](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentownerregistrationstatus)

IsolatedWindowsEnvironmentOwnerRegistrationResult.Status

#### [IsolatedWindowsEnvironmentOwnerRegistrationStatus](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentprocess)

IsolatedWindowsEnvironmentOwnerRegistrationStatus <br> IsolatedWindowsEnvironmentProcess <br> IsolatedWindowsEnvironmentProcess.ExitCode <br> IsolatedWindowsEnvironmentProcess.State <br> IsolatedWindowsEnvironmentProcess.WaitForExit <br> IsolatedWindowsEnvironmentProcess.WaitForExitAsync

#### [IsolatedWindowsEnvironmentProcess](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentprocessstate)

IsolatedWindowsEnvironmentProcess.WaitForExitWithTimeout

#### [IsolatedWindowsEnvironmentProcessState](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentprogressstate)

IsolatedWindowsEnvironmentProcessState

#### [IsolatedWindowsEnvironmentProgressState](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentsharefolderrequestoptions)

IsolatedWindowsEnvironmentProgressState <br> IsolatedWindowsEnvironmentShareFolderRequestOptions <br> IsolatedWindowsEnvironmentShareFolderRequestOptions.#ctor

#### [IsolatedWindowsEnvironmentShareFolderRequestOptions](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentsharefolderresult)

IsolatedWindowsEnvironmentShareFolderRequestOptions.AllowWrite <br> IsolatedWindowsEnvironmentShareFolderResult <br> IsolatedWindowsEnvironmentShareFolderResult.ExtendedError

#### [IsolatedWindowsEnvironmentShareFolderResult](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentsharefolderstatus)

IsolatedWindowsEnvironmentShareFolderResult.Status

#### [IsolatedWindowsEnvironmentShareFolderStatus](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentstartprocessresult)

IsolatedWindowsEnvironmentShareFolderStatus <br> IsolatedWindowsEnvironmentStartProcessResult <br> IsolatedWindowsEnvironmentStartProcessResult.ExtendedError <br> IsolatedWindowsEnvironmentStartProcessResult.Process

#### [IsolatedWindowsEnvironmentStartProcessResult](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmentstartprocessstatus)

IsolatedWindowsEnvironmentStartProcessResult.Status

#### [IsolatedWindowsEnvironmentStartProcessStatus](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowsenvironmenttelemetryparameters)

IsolatedWindowsEnvironmentStartProcessStatus <br> IsolatedWindowsEnvironmentTelemetryParameters <br> IsolatedWindowsEnvironmentTelemetryParameters.#ctor

#### [IsolatedWindowsEnvironmentTelemetryParameters](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowshostmessenger)

IsolatedWindowsEnvironmentTelemetryParameters.CorrelationId <br> IsolatedWindowsHostMessenger <br> IsolatedWindowsHostMessenger.GetFileId

#### [IsolatedWindowsHostMessenger](https://learn.microsoft.com/uwp/api/windows.security.isolation.isolatedwindowshostmessenger)

IsolatedWindowsHostMessenger.PostMessageToReceiver

#### [MessageReceivedCallback](https://learn.microsoft.com/uwp/api/windows.security.isolation.messagereceivedcallback)

MessageReceivedCallback

## Windows.Storage

### [Windows.Storage.Provider](https://learn.microsoft.com/uwp/api/windows.storage.provider)

#### [StorageProviderSyncRootManager](https://learn.microsoft.com/uwp/api/windows.storage.provider.storageprovidersyncrootmanager)

StorageProviderSyncRootManager.IsSupported

### [Windows.Storage](https://learn.microsoft.com/uwp/api/windows.storage)

#### [KnownFolders](https://learn.microsoft.com/uwp/api/windows.storage.knownfolders)

KnownFolders.GetFolderAsync <br> KnownFolders.RequestAccessAsync <br> KnownFolders.RequestAccessForUserAsync

#### [KnownFoldersAccessStatus](https://learn.microsoft.com/uwp/api/windows.storage.knownfoldersaccessstatus)

KnownFoldersAccessStatus

#### [StorageFile](https://learn.microsoft.com/uwp/api/windows.storage.storagefile)

StorageFile.GetFileFromPathForUserAsync

#### [StorageFolder](https://learn.microsoft.com/uwp/api/windows.storage.storagefolder)

StorageFolder.GetFolderFromPathForUserAsync

## Windows.System

### [Windows.System](https://learn.microsoft.com/uwp/api/windows.system)

#### [UserChangedEventArgs](https://learn.microsoft.com/uwp/api/windows.system.userchangedeventargs)

UserChangedEventArgs.ChangedPropertyKinds

#### [UserWatcherUpdateKind](https://learn.microsoft.com/uwp/api/windows.system.userwatcherupdatekind)

UserWatcherUpdateKind

## Windows.UI

### [Windows.UI.Composition.Interactions](https://learn.microsoft.com/uwp/api/windows.ui.composition.interactions)

#### [InteractionTracker](https://learn.microsoft.com/uwp/api/windows.ui.composition.interactions.interactiontracker)

InteractionTracker.TryUpdatePosition

#### [InteractionTrackerPositionUpdateOption](https://learn.microsoft.com/uwp/api/windows.ui.composition.interactions.interactiontrackerpositionupdateoption)

InteractionTrackerPositionUpdateOption

### [Windows.UI.Core.Preview.Communications](https://learn.microsoft.com/uwp/api/windows.ui.core.preview.communications)

#### [PreviewMeetingInfoDisplayKind](https://learn.microsoft.com/uwp/api/windows.ui.core.preview.communications.previewmeetinginfodisplaykind)

PreviewMeetingInfoDisplayKind

#### [PreviewSystemState](https://learn.microsoft.com/uwp/api/windows.ui.core.preview.communications.previewsystemstate)

PreviewSystemState

#### [PreviewTeamCleanupRequestedEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.core.preview.communications.previewteamcleanuprequestedeventargs)

PreviewTeamCleanupRequestedEventArgs <br> PreviewTeamCleanupRequestedEventArgs.GetDeferral

#### [PreviewTeamCommandInvokedEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.core.preview.communications.previewteamcommandinvokedeventargs)

PreviewTeamCommandInvokedEventArgs </br> PreviewTeamCommandInvokedEventArgs.Command

#### [PreviewTeamDeviceCredentials](https://learn.microsoft.com/uwp/api/windows.ui.core.preview.communications.previewteamdevicecredentials)

PreviewTeamDeviceCredentials <br> PreviewTeamDeviceCredentials.DomainUserName <br> PreviewTeamDeviceCredentials.Password <br> PreviewTeamDeviceCredentials.UserPrincipalName

#### [PreviewTeamEndMeetingKind](https://learn.microsoft.com/uwp/api/windows.ui.core.preview.communications.previewteamendmeetingkind)

PreviewTeamEndMeetingKind

#### [PreviewTeamEndMeetingRequestedEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.core.preview.communications.previewteamendmeetingrequestedeventargs)

PreviewTeamEndMeetingRequestedEventArgs <br> PreviewTeamEndMeetingRequestedEventArgs.GetDeferral

#### [PreviewTeamJoinMeetingRequestedEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.core.preview.communications.previewteamjoinmeetingrequestedeventargs)

PreviewTeamJoinMeetingRequestedEventArgs <br> PreviewTeamJoinMeetingRequestedEventArgs.GetDeferral <br> PreviewTeamJoinMeetingRequestedEventArgs.MeetingUri

#### [PreviewTeamView](https://learn.microsoft.com/uwp/api/windows.ui.core.preview.communications.previewteamview)

PreviewTeamView <br> PreviewTeamView.CleanupRequested <br> PreviewTeamView.CommandInvoked <br> PreviewTeamView.EndMeetingRequested <br> PreviewTeamView.EnterFullScreen <br> PreviewTeamView.GetForCurrentView <br> PreviewTeamView.IsFullScreen <br> PreviewTeamView.IsFullScreenChanged <br> PreviewTeamView.IsScreenSharing <br> PreviewTeamView.IsScreenSharingChanged <br> PreviewTeamView.JoinMeetingRequested <br> PreviewTeamView.JoinMeetingWithUri <br> PreviewTeamView.LeaveFullScreen <br> PreviewTeamView.MeetingInfoDisplayType <br> PreviewTeamView.MeetingUri <br> PreviewTeamView.NotifyMeetingEnded <br> PreviewTeamView.RequestForeground <br> PreviewTeamView.SetButtonLabel <br> PreviewTeamView.SetTitle <br> PreviewTeamView.SharingScreenBounds <br> PreviewTeamView.SharingScreenBoundsChanged <br> PreviewTeamView.StartSharingScreen <br> PreviewTeamView.StopSharingScreen <br> PreviewTeamView.SystemState

#### [PreviewTeamView](https://learn.microsoft.com/uwp/api/windows.ui.core.preview.communications.previewteamview)

PreviewTeamView.SystemStateChanged

#### [PreviewTeamViewCommand](https://learn.microsoft.com/uwp/api/windows.ui.core.preview.communications.previewteamviewcommand)

PreviewTeamViewCommand

### [Windows.UI.Input.Inking](https://learn.microsoft.com/uwp/api/windows.ui.input.inking)

#### [InkModelerAttributes](https://learn.microsoft.com/uwp/api/windows.ui.input.inking.inkmodelerattributes)

InkModelerAttributes.UseVelocityBasedPressure

### [Windows.UI.Input](https://learn.microsoft.com/uwp/api/windows.ui.input)

#### [CrossSlidingEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.input.crossslidingeventargs)

CrossSlidingEventArgs.ContactCount

#### [DraggingEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.input.draggingeventargs)

DraggingEventArgs.ContactCount

#### [GestureRecognizer](https://learn.microsoft.com/uwp/api/windows.ui.input.gesturerecognizer)

GestureRecognizer.HoldMaxContactCount <br> GestureRecognizer.HoldMinContactCount <br> GestureRecognizer.HoldRadius <br> GestureRecognizer.HoldStartDelay <br> GestureRecognizer.TapMaxContactCount <br> GestureRecognizer.TapMinContactCount <br> GestureRecognizer.TranslationMaxContactCount <br> GestureRecognizer.TranslationMinContactCount

#### [HoldingEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.input.holdingeventargs)

HoldingEventArgs.ContactCount <br> HoldingEventArgs.CurrentContactCount

#### [ManipulationCompletedEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.input.manipulationcompletedeventargs)

ManipulationCompletedEventArgs.ContactCount <br> ManipulationCompletedEventArgs.CurrentContactCount

#### [ManipulationInertiaStartingEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.input.manipulationinertiastartingeventargs)

ManipulationInertiaStartingEventArgs.ContactCount

#### [ManipulationStartedEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.input.manipulationstartedeventargs)

ManipulationStartedEventArgs.ContactCount

#### [ManipulationUpdatedEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.input.manipulationupdatedeventargs)

ManipulationUpdatedEventArgs.ContactCount <br> ManipulationUpdatedEventArgs.CurrentContactCount

#### [RightTappedEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.input.righttappedeventargs)

RightTappedEventArgs.ContactCount

#### [TappedEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.input.tappedeventargs)

TappedEventArgs.ContactCount 

### [Windows.UI.ViewManagement](https://learn.microsoft.com/uwp/api/windows.ui.viewmanagement)

#### [UISettings](https://learn.microsoft.com/uwp/api/windows.ui.viewmanagement.uisettings)

UISettings.AnimationsEnabledChanged <br> UISettings.MessageDurationChanged

#### [UISettingsAnimationsEnabledChangedEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.viewmanagement.uisettingsanimationsenabledchangedeventargs)

UISettingsAnimationsEnabledChangedEventArgs

#### [UISettingsMessageDurationChangedEventArgs](https://learn.microsoft.com/uwp/api/windows.ui.viewmanagement.uisettingsmessagedurationchangedeventargs)

UISettingsMessageDurationChangedEventArgs
