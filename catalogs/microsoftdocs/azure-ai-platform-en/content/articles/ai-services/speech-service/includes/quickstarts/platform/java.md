---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.custom: linux-related-content
ms.topic: include
ms.date: 02/02/2024
ms.author: pafarley
---


[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)


In this quickstart, you install the [Speech SDK](../../../speech-sdk.md) for Java.

## Platform requirements

Choose your target environment:

# [Java Runtime](#tab/jre)


The Speech SDK for Java is compatible with Windows, Linux, and macOS.

# [Windows](#tab/windows)

On Windows, you must use the 64-bit target architecture. Windows 11 or later is required.

Install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist?view=msvc-170\&preserve-view=true) for your platform. Installing this package for the first time might require a restart.

The Speech SDK for Java doesn't support Windows on ARM64.

# [Linux](#tab/linux)

The Speech SDK for Java supports the following distributions on the x64, ARM32, and ARM64 architectures:

- Ubuntu 20.04/22.04/24.04
- Debian 11/12
- Amazon Linux 2023
- Azure Linux 3.0


> **Important:**
> Use the most recent LTS release of the Linux distribution. For example, if you are using Ubuntu 20.04 LTS, use the latest release of Ubuntu 20.04.X.

The Speech SDK depends on the following Linux system libraries:

- The shared libraries of the GNU C library, including the POSIX Threads Programming library, `libpthreads`.
- The OpenSSL library, version 1.x (`libssl1`) or 3.x (`libssl3`), and certificates (`ca-certificates`).
- The shared library for ALSA applications (`libasound2`).

# [Ubuntu 20.04/22.04/24.04](#tab/ubuntu)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Debian 11/12](#tab/debian)

Run these commands:

```Bash
sudo apt-get update
sudo apt-get install build-essential ca-certificates libasound2-dev libssl-dev wget
```

# [Amazon Linux 2023](#tab/amazon)


Run these commands:

```Bash
sudo yum update
sudo yum install alsa-lib ca-certificates openssl wget
```

# [Azure Linux 3.0](#tab/azure)

Run these commands:

```Bash
sudo tdnf update
sudo tdnf install alsa-lib ca-certificates openssl wget
```

---


# [macOS](#tab/macos)

A macOS version 10.14 or later is required.

---


# [Android](#tab/android)

The Speech SDK is compatible with Android devices that have 32/64-bit ARM processor and Intel x86/x64 compatible processors.

---

Install a Java Development Kit such as [Azul Zulu OpenJDK](https://www.azul.com/downloads/?package=jdk). The [Microsoft Build of OpenJDK](https://www.microsoft.com/openjdk) or your preferred JDK should also work.

## Install the Speech SDK for Java

Some of the instructions use a specific SDK version such as `1.43.0`. To check the latest version, [search our GitHub repository](https://github.com/Azure-Samples/cognitive-services-speech-sdk/search?q=com.microsoft.cognitiveservices.speech%3Aclient-sdk).

Choose your target environment:

# [Java Runtime](#tab/jre)


This guide shows how to install the [Speech SDK](../../../speech-sdk.md) for Java on the Java Runtime.

### Supported operating systems

The Speech SDK for Java package is available for these operating systems:

- Windows: 64-bit only.
- Mac: macOS X version 10.14 or later.
- Linux: See the [supported Linux distributions and target architectures](../../../speech-sdk.md).

# [Maven](#tab/maven)

Follow these steps to install the Speech SDK for Java using Apache Maven:

1. Install [Apache Maven](https://maven.apache.org/install.html).
1. Open a command prompt where you want the new project, and create a new *pom.xml* file.
1. Copy the following XML content into *pom.xml*:

   ```xml
   <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
       <modelVersion>4.0.0</modelVersion>
       <groupId>com.microsoft.cognitiveservices.speech.samples</groupId>
       <artifactId>quickstart-eclipse</artifactId>
       <version>1.0.0-SNAPSHOT</version>
       <build>
           <sourceDirectory>src</sourceDirectory>
           <plugins>
           <plugin>
               <artifactId>maven-compiler-plugin</artifactId>
               <version>3.7.0</version>
               <configuration>
               <source>1.8</source>
               <target>1.8</target>
               </configuration>
           </plugin>
           </plugins>
       </build>
       <dependencies>
           <dependency>
           <groupId>com.microsoft.cognitiveservices.speech</groupId>
           <artifactId>client-sdk</artifactId>
           <version>1.43.0</version>
           </dependency>
       </dependencies>
   </project>
   ```

1. Run the following Maven command to install the Speech SDK and dependencies.

   ```console
   mvn clean dependency:copy-dependencies
   ```

# [Eclipse](#tab/eclipse)

### Create an Eclipse project and install the Speech SDK

1. Install the [Eclipse Java IDE](https://www.eclipse.org/downloads/). This IDE requires Java to already be installed.

1. Start Eclipse.

1. In Eclipse Launcher, in the **Workspace** box, enter the name of a new workspace directory. Then select **Launch**.

   Screenshot of Eclipse Launcher.

1. In a moment, the main window of the Eclipse IDE appears. Close the **Welcome** screen if one is present.

1. From the Eclipse menu, select **File** > **New** > **Project**.

1. The **New Project** dialog box appears. Select **Java Project**, and then select **Next**.

   Screenshot of the New Project dialog box, with Java Project highlighted.

1. The **New Java Project** wizard starts. In the **Project name** field, enter *quickstart*. Choose **JavaSE-1.8** as the execution environment. Select **Finish**.

   Screenshot of the New Java Project wizard, with selections for creating a Java project.

1. If the **Open Associated Perspective?** window appears, select **Open Perspective**.

1. In **Package Explorer**, right-click the **quickstart** project. Select **Configure** > **Convert to Maven Project** from the context menu.

   Screenshot of Package Explorer and the commands for converting to a Maven project.

1. The **Create new POM** window appears. In the **Group Id** field, enter *com.microsoft.cognitiveservices.speech.samples*. In the **Artifact Id** field, enter *quickstart*. Then select **Finish**.

   Screenshot of the window for creating a new POM.

1. Open the *pom.xml* file and edit it:

   1. Add a `dependencies` element at the end of the file, before the closing tag `</project>`, with the Speech SDK as a dependency:

   ```xml
   <dependencies>
     <dependency>
       <groupId>com.microsoft.cognitiveservices.speech</groupId>
       <artifactId>client-sdk</artifactId>
       <version>1.43.0</version>
     </dependency>
   </dependencies>
   ```

   1. Save the changes.

# [Gradle](#tab/gradle)

### Gradle configurations

Gradle configurations require an explicit reference to the *.jar* dependency extension:

```gradle
// build.gradle

dependencies {
    implementation group: 'com.microsoft.cognitiveservices.speech', name: 'client-sdk', version: "1.43.0", ext: "jar"
}
```

---


# [Android](#tab/android)


This guide shows how to install the [Speech SDK](../../../speech-sdk.md) for Java on Android.

The Speech SDK for Android is packaged as an [Android Archive (AAR) file](https://developer.android.com/studio/projects/android-library), which includes the necessary libraries and required Android permissions.

### Install the Speech SDK by using Android Studio

Create a new project in Android Studio and add the Speech SDK for Java as a library dependency. The setup is based on the Speech SDK Maven Package and Android Studio Chipmunk 2021.2.1.

#### Create an empty project

1. Open Android Studio, and select **New project**.

   Screenshot showing options to open or create new projects.

1. In the **New project** window that appears, select **Phone and Tablet** > **Empty Activity**, and then select **Next**.

   Screenshot showing project types that you can select.

1. Enter **SpeechQuickstart** in the **Name** text box.

   Screenshot showing project properties that you must set.

1. Enter *samples.speech.cognitiveservices.microsoft.com* in the **Package name** text box.
1. Select a project directory in the **Save location** selection box.
1. Select **Java** in the **Language** selection box.
1. Select **API 26: Android 8.0 (Oreo)** in the **Minimum API level** selection box.
1. Select **Finish**.

Android Studio takes some time to prepare your new project. For your first time using Android Studio, it might take a few minutes to set preferences, accept licenses, and complete the wizard.

#### Install the Speech SDK for Java on Android

Add the Speech SDK as a dependency in your project.

1. Select **File** > **Project structure** > **Dependencies** > **app**.
1. Select the plus symbol (**+**) to add a dependency under **Declared Dependencies**. Then select **Library dependency** from the dropdown menu.

   Screenshot that shows how to add a library dependency in Android Studio.

1. In the **Add Library Dependency** window that appears, enter the name and version of the Speech SDK for Java: *com.microsoft.cognitiveservices.speech:client-sdk:1.43.0*. Then select **Search**.
1. Make sure that the selected **Group ID** is **com.microsoft.cognitiveservices.speech**, and then select **OK**.
1. Select **OK** to close the **Project Structure** window and apply your changes to the project.
