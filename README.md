# Unity Plugin Workshop

This is the workbook for a workshop led by Jonathan Lipps on how to use the [Appium AltUnity Plugin](https://github.com/projectxyzio/appium-altunity-lugin). Make sure you have taken care of the [prerequisites](prereqs.md) before following this workbook.

# Conceptual intro

*10 min*

This portion of the workshop is covered with slides.

# Building our game

## Project initialization

*20 min*

* Open the Unity Hub
* Create a new project using the "2d platformer microgame" template. Name the project "AppiumWorkshop"
* Skip the tutorial and head straight to the scene ("Load Scene")
* Press the "Play" button to make sure the game runs. You can play it for a bit.

## Add Android support

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

# Adding AltUnity tester

*10 min*

# Configuring the Appium plugin

*10 min*

# Designing and writing tests

*35 min*

# Conclusion and next steps

*5 min*

This portion of the workshop is covered with slides.
