# Unity Plugin Workshop

This is the workbook for a workshop led by Jonathan Lipps on how to use the [Appium AltUnity Plugin](https://github.com/projectxyzio/appium-altunity-lugin). Make sure you have taken care of the [prerequisites](prereqs.md) before following this workbook.

* [Prerequisites](#prerequisites)
  * [Unity](#unity)
  * [Appium](#appium)
  * [Version List](#version-list)
  * [Test Framework (Optional)](#test-framework-(optional))
* [Conceptual intro](#conceptual-intro)
* [Building our game](#building-our-game)
  * [Project initialization](#project-initialization)
  * [Add Android support](#add-android-support)
* [Setting up AltUnity tester](#setting-up-altunity-tester)
  * [Add the AltUnity Tester to the project](#add-the-altunity-tester-to-the-project)
  * [Build the app with the AltUnity server](#build-the-app-with-the-altunity-server)
  * [Add some IDs](#add-some-ids)
* [Configuring the Appium plugin](#configuring-the-appium-plugin)
* [Designing and writing tests](#designing-and-writing-tests)
  * [The Unity context](#the-unity-context)
  * [Working with elements](#working-with-elements)
  * [Keystrokes, clicking, and text](#keystrokes,-clicking,-and-text)
  * [Putting it all together](#putting-it-all-together)
* [Conclusion and next steps](#conclusion-and-next-steps)

## Prerequisites

*(To be completed before the workshop)*

### Unity

1. You have downloaded Unity and Unity Hub for your platform
2. You have created a Unity account and are logged in with Unity Hub
3. You have a license for the Unity editor; a "free personal license" is fine

### Appium

1. You have a working Appium 2.0 install (`npm install -g appium@next`)
2. You can run Android sessions on an emulator or real device with the UiAutomator2 driver (`appium driver install uiautomator2`)
3. You are familiar with using `adb` from the command line and have access to the Android SDK
4. You should have Node.js 14+

### Version List

Here are the specific versions of the various tools used while developing this workshop. Newer or
older versions may also work fine, but these versions are verified to work correctly.

|Tool|Version|
|||
|macOS|12.2.1|
|Unity Hub|3.0.1|
|Unity IDE|2020.3.30f1|
|Unity-bundled OpenJDK|1.8.0|
|Unity-bundled Android SDK Build tools|30.0.2|
|Unity-bundled Android Platform|30 rev 3|
|Unity asset: AltUnity Tester|1.7.0|
|Unity asset: JSON .NET for Unity|2.0.1|
|Appium|2.0.0-beta.25|
|Appium UiAutomator2 driver|2.0.3|
|Appium AltUnity Plugin|1.3.0|


### Test Framework (Optional)

We'll be writing scripts from scratch in WebDriverIO. If you want, you can use another test language or framework, you'll just need to do the setup yourself (and be comfortable transposing WebDriver commands into your preferred API). So if you're not going to follow along, make sure you come along with an empty Java or Python automation project, including the Appium client library, that you can start creating Appium sessions with.

## Conceptual intro

*(10 min)* This portion of the workshop is covered with slides and explains the ideas and architecture underlying our work here.

## Building our game

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

## Setting up AltUnity tester

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
    * Take note of the port it is running on, probably the default of `13000`. This can be adjusted.

The app is now properly instrumented with AltUnity Tester and ready for testing with the Appium plugin

### Add some IDs

* AltUnity Tools > AltId > Add AltId to Every Object in Active Scene
* Now find the Player object in the Hierarchy, and give it a custom player name as the AltId
* Save and rebuild

## Configuring the Appium plugin

*(10 min)* The goal of this section is to ensure we can have an empty Appium script that successfully connects to the AltUnity process within the game.

Install the Appium AltUnity plugin:
* `appium plugin install --source=npm appium-altunity-plugin`
* Run the Appium server with the plugin enabled: `appium --use-plugins=altunity`
* Keep this server running

Ensure the AltUnity service is accessible on your system:
* Use `adb` to forward the appropriate port to a port on your system (can be the same or different)
    * `adb forward tcp:13000 tcp:13000`

Set up the empty script:
* Clone this repo somewhere: `git clone git@github.com:jlipps/unity-plugin-workshop.git`
* Head into that newly directory with a terminal session
* Run `npm install` inside it to get our client dependencies (we'll use WebdriverIO; you could run this workshop in parallel with another language if you prefer)
* Set the absolute path to your app as the UNITY_APP environment variable
    * `export UNITY_APP=/path/to/AppiumWorkshop.apk`
* Check out `test/empty.js` and make necessary updates
    * update the `appium:altUnityHost` and `appium:altUnityPort` if appropriate

Run the empty script:
* `npx mocha ./test/empty.js`
* Test should pass
* Should see something like `[AltUnityPlugin] Connection to AltUnity server established` in the Appium logs. This is how we know we were able to successfully connect with the AltUnity server.

Troubleshooting:
* Did you forward your port correctly to your device?
* Did you use the app with the AltUnity server instrumented into it?
* Did you opt in to using the plugin when you started Appium?

## Designing and writing tests

*(35 min)* The goal of this section is to explore what is possible with the Appium plugin and to write some tests of our game using the special plugin features

### The Unity context

The first thing we need to learn is how to address the Unity game rather than the default mobile automation behaviour. So let's build a new test file:

* Copy `empty.js` and rename it to `context.js`
* Rename the test definition to something like `should switch to the unity context`
* Make the test method an `async` function
* Fill out the new test method:
    ```js
    await driver.switchContext('UNITY')
    console.log(await driver.getPageSource())
    ```
* Run the test
    `npx mocha ./test/context.js`

Notice that the page source looks very different from a normal Android source output. This source is generated by the Appium plugin from the Unity object hierarchy. You can use it to explore the game as well as generate element finding queries.

### Working with elements

Let's explore how to find and interact with elements.

* Copy `context.js` and rename it to `elements.js`
* Rename the test definition to something like `should find elements`
* Add a new import up top (since we are going to make assertions)
    * `const { expect } = require('earljs')`
* Replace the test body with
    ```js
    await driver.switchContext('UNITY')
    const player = await driver.$('//Player')
    const enemy10 = await driver.$('//Enemy[10]')
    expect(await player.isDisplayed()).toBeTruthy()
    expect(await enemy10.isDisplayed()).toBeFalsy()
    ```

What we are doing here is finding game objects via XPath, then asserting whether they are visible. The Appium plugin compares their position in the game to the screen size to determine whether they are displayed.

Various locator strategies are available.
* `xpath`: finds the element via xpath query on the provided source
* `id`: finds the element via something called the AltId, which can be set on the element using the AltUnity Tester Editor in Unity
* `css selector`: this only works for IDs, it's a convenience method since some clients translate id to css selector now
* `link text`: this finds an element by its text
* `tag name`: this finds an element by its type, e.g., `Enemy`

Let's add an ID to an element:
* AltUnity Tools > AltId > Add AltId to Every Object in Active Scene
* Find the "Player" object in the hierarchy
* Change the auto-generated AltId to something unique that you want, e.g., "SuperPlayer"
* Save and rebuild the instrumented app from the AltUnity Tester Editor window

And update our test script:
* Change how we find our player object:
    ```js
    const player = await driver.$('#SuperPlayer')
    ```
* This translates to an AltId element query. Could also use find by id (this is a css selector version).
* Rerun the test

Various element commands are available:
* click
* get location
* get attribute (can get anything you can see in the XML)
* get text
* is displayed

### Keystrokes, clicking, and text

Games often involve key or button presses. To automate this, use the Actions API. For example we can press the 'ESCAPE' key to bring up the in game menu. Let's do that and also see how we can get the text of menu items at the same time.

* Copy the `elements.js` file and rename it to `actions.js`
* Rename the test to `should navigate to the settings menu`
* Replace the test body with:
    ```js
    await driver.switchContext('UNITY')

    const pressEsc = {
        type: 'key',
        id: 'keyboard',
        actions: [
            {type: 'keyDown', value: 'Escape'},
            {type: 'pause', duration: 750},
            {type: 'keyUp', value: 'Escape'},
        ]
    }

    await driver.performActions([pressEsc])

    const menuButtons = await driver.$$('//Button/Text')
    for (const button of menuButtons) {
      if (await button.getText() === 'Settings') {
        await button.click()
        break
      }
    }

    const settingsHeader = await driver.$('//Settings/Header')
    expect(await settingsHeader.getText()).toEqual('Settings')
    await driver.performActions([pressEsc])
    ```
* Notice how we can't see the Text of the buttons directly so we have to get all the Text items underneath the Button items and check their text, in order to click on the one we want. So this is how we perform key presses, get text, and click elements.
* To figure out which key strings are available, check the plugin source code for the `key-code.ts` file

### Putting it all together

Let's test some actual game behaviour! We want to cause the player to run and jump on an enemy, and make an assertion about the state of the enemy. In our game, the enemy is considered "stomped" when its worldY value has gone negative. Enemies don't "die", they just fall off the level.

* Copy the `actions.js` file and rename it `game.js`
* Update the test description to `should stomp on enemies`
* Replace the test body with:
    ```js
    await driver.switchContext('UNITY')
    let firstEnemy = await driver.$('//Enemy[starts-with(@worldX, "7.7")]')
    const initWorldY = parseFloat(await firstEnemy.getAttribute('worldY'))

    const runWithJump = {
      type: 'key',
      id:'keyboard',
      actions: [
        {type: 'keyDown', value: 'RightArrow'},
        {type: 'pause', duration: 1600},
        {type: 'keyDown', value: 'Space'},
        {type: 'pause', duration: 500},
        {type: 'keyUp', value: 'Space'},
        {type: 'pause', duration: 500},
        {type: 'keyUp', value: 'RightArrow'},
        {type: 'pause', duration: 1000},
      ]
    }
    await driver.performActions([runWithJump])

    firstEnemy = await driver.$('//Enemy[starts-with(@worldX, "7.7")]')
    const finalWorldY = parseFloat(await firstEnemy.getAttribute('worldY'))
    expect(finalWorldY).toBeLessThan(initWorldY)
    ```

Basically the way this test works is we create an action to hold down the right arrow, then while we're holding it, we press space, then release both. If our timing is correct, we will stomp on the first enemy, which we assert by checking its `worldY` attribute.

You can do a whole lot from here! Try to automate more of the game!

## Conclusion and next steps

*(5 min)* This portion of the workshop is covered with slides.
