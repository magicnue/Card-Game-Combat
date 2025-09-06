Title: cgc-setup \[Card Game Combat - Documentation\]

Keywords: cgc-setup   

cgc-setup

How to Setup
============

These are step by step instructions of how to manually set up **Card Game Combat** in your RPG Maker Game Project. If you would like to skip ahead to a working project, we would recommend downloading the **Blank Templates** instead which already have these folders set up for you.

1\. After purchasing Card Game Combat from MythAtelier itch.io Store, download the compressed folder **Plugin Suite** to your local drive.

2\. Unpack the folder using WinZip/WinRar (or equivalent) and open the **Plugin Suite** folder. Highlight and copy all plugin files.

3\. Go to your **RPG Maker Project** directory and open the **plugins** folder (inside the **js** folder). Paste the files from the Plugin Suite.

4\. Return to the unpacked folder and open the **Image Files** folder. Highlight and copy the folders called CGC and system.

5\. Open your RPG Maker Project in the engine and then go to your Plugin Manager. Click on an empty space to open the Plugin Window and select each of the plugins from the Plugin Suite to add to your project. Make sure that the CGC Plugins are placed in the following order:

6\. Run your game to see if there are any immediate crashes or errors. If there are any issues, it can mean one of a few things:

<table><tbody><tr><td><strong>The CGC Plugins are not placed in the correct order in the Plugin Manager</strong></td><td>Look at the Plugin Order in the step above and see if all the CGC Plugins are first in that order. If they are, try moving them as a block to either the top or the bottom of the plugin order and running the game.</td></tr><tr><td><strong>Some parameters of the CGC Plugins are missing or have incorrect values</strong></td><td>Go through the CGC Plugins and see if all the parameters have a value. You can check the Demo Project or the Help Manual section of this wiki to input some of the default values.</td></tr><tr><td><strong>Incompatibility between the CGC Plugins and another plugin your project is using</strong></td><td>Turn each CGC plugin ON/OFF until the project is running again, then report this to our Email, Forums or Discord. We will follow up with you once we have been able to extend compatibility to that plugin.</td></tr></tbody></table>

7\. If there are no crashes and you can see Cards in the Menu and in Battle, that means **Card Game Combat** is working in your game! If things look a little wonky, you may need to make changes to the project resolution and plugin parameters.

cgc-setup.txt · Last modified: 2024/10/26 21:13 by banerjeesw