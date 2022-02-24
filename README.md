# Unity Plugin Workshop

This is the workbook for a workshop led by Jonathan Lipps on how to use the [Appium AltUnity Plugin](https://github.com/projectxyzio/appium-altunity-lugin). Make sure you have taken care of the [prerequisites](prereqs.md) before following this workbook.

# Conceptual intro

*10 min*

This portion of the workshop is covered with slides.

# Building our game

*(20 min)* The goal in this section is to get our demo game building and running on an Android device.

### Project initialization


* Open the Unity Hub
* Create a new project using the "2d platformer microgame" template. Name the project "AppiumWorkshop"
* Skip the tutorial and head straight to the scene ("Load Scene")
* Press the "Play" button to make sure the game runs. You can play it for a bit.

### Add Android support

* Make sure you have an Android device or emulator connected
* In Unity, go to Build Settings (File > Build Settings)
    * Click on Android in the left hand side
    * In "Run Device" option, choose your connected device
    * Check "Development Build"
    * Click "Switch Platform" to make Android our platform
* Click "Build and Run" to make sure it works
    * You can put the game anywhere, name it "game.apk" or similar

If you get "JDK not found" error:
* Go to Preferences > External Tools
* Find the correct JDK or check to use the one installed with Unity
* If necessary, install via Unity Hub
    * Go to "Installs"
    * Find your Unity install and click the gear icon
    * Click "Add Modules"
    * Choose "OpenJDK" under "Android Build Support" and install it
* You may do all of the above with the Android SDK tools as well

If you get a message about ARM64 vs ARMv7, or x86:
* Click "Player Settings"
* Scroll down inside "Other Settings" to "Scripting Backend" and change from "Mono" to "IL2CPP"
* Change "Target Architectures" to ARM64 or x86 or whatever you need

* Install the app: `adb install -r /path/to/your/game.apk`
* Make sure it works!
    * Can switch to Landscape mode
    * Currently, only keyboard controls are supported, no tap-to-move. Might need a keyboard plugged in if you're on a real device.

# Setting up AltUnity tester

*(10 min)* The goal in this section is to instrument the app with the AltUnity Tester server which is necessary for the Appium plugin to communicate with internal game objects.

### Add the AltUnity Tester to the project

* Go to Asset Store (Window > Asset Store), this will open up the Unity asset website
    * Ensure you are logged in with your Unity account
    * Search for "AltUnity Tester"
    * Add it and open it in Unity, this will open the Package Manager. Now select it.
    * Make sure you have updated to the latest version (click "Update"). Should be 1.7.0 for this workshop, but later versions might work just as well.
    * Go back to the store and search for "JSON .NET for Unity" by parentElement
    * Add it as well, and ensure it's also in the Package manager
* With the JSON package selected, click "Import"
    * If warned about Package Manager dependencies, click "Install/Upgrade"
    * Confirm "Import" when shown the list of files
* With the AltUnity Tester package selected, click "Import"
    * If warned about Package Manager dependencies, click "Install/Upgrade"
    * Confirm "Import" when shown the list of files
* Confirm installation by checking that a new "AltUnity Tools" menu item is shown
    * Open up the "AltUnity Tester Editor"

### Build the app with the AltUnity server

With the AltUnity Tester Editor open:

* Change "Platform" to "Android"
* Select a build location for the instrumented version of the game APK (can be anywhere)
* Click "Build Only"
    * If you get an error, and it looks to do with "sdkmanager", check the permissions on your Unity app folder in `/Applications`. May need to `chown -R $USER:admin /Applications/Unity/Hub/Editor` to fix
    * It should create `AppiumWorkshop.apk` in your folder
    * Install it to the device using `adb`
    * You should see the same game but now with an AltUnity Tester window showing waiting for connections

The app is now properly instrumented with AltUnity Tester and ready for testing with the Appium plugin

# Configuring the Appium plugin

*(10 min)* The goal of this section is to ensure we can have an empty Appium script that successfully connects to the AltUnity process within the game.

# Designing and writing tests

*(35 min)* The goal of this section is to explore what is possible with the Appium plugin and to write some tests of our game using the special plugin features

# Conclusion and next steps

*5 min*

This portion of the workshop is covered with slides.
