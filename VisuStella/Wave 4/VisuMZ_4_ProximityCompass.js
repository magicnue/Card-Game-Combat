//=============================================================================
// VisuStella MZ - Proximity Compass
// VisuMZ_4_ProximityCompass.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ProximityCompass = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ProximityCompass = VisuMZ.ProximityCompass || {};
VisuMZ.ProximityCompass.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.06] [ProximityCompass]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Proximity_Compass_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that adds a compass to the map screen, marking
 * the position of nearby events and the directions of far away events. Events
 * are represented by icons from the icon set. This can be used to help the
 * player locate objectives, points of interests, NPCs, and more.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Places a compass on the main map screen.
 * * Said compass will show the marked events on it with icons.
 * * Marked events will move around the compass relative to the player's
 *   current position on the map.
 * * Fade out marked events that are too far from the player's location.
 * * Minimap subfeature will display all of the passable tiles under the
 *   compass frame.
 * * Minimap can be toggled to a larger version shown on the middle of the
 *   screen displaying more of the map's data all at once.
 * * Use custom graphics to kit out the minimap to your liking.
 * * The compass can be turned on/off in the Options menu.
 * * The compass can also be resized in the Options menu.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_1_EventsMoveCore
 * 
 * Region marked passability using the Events and Movement Core region
 * restriction notetags will also be counted towards the creation of the
 * minimap. These are the notetags that will affect the minimap:
 * 
 *   <All Allow Region: x>
 *   <Player Allow Region: x>
 *   <All Forbid Region: x>
 *   <Player Forbid Region: x>
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * ---
 * 
 * === Map Notetags ===
 * 
 * ---
 *
 * <Hide Compass>
 *
 * - Used for: Map Notetags
 * - Place this notetag inside maps where you don't want the compass to show.
 *
 * ---
 * 
 * <Hide Minimap>
 * 
 * - Used for: Map Notetags
 * - Place this notetag inside maps where you don't want the minimap to show.
 * - The compass, however, can show by itself.
 * - However, if the compass does not show, neither will the minimap.
 * 
 * ---
 * 
 * <Minimap Image: filename>
 * 
 * - Used for: Map Notetags
 * - Place this notetag inside maps that you want to use custom minimaps for
 *   instead of the rendered passability map created by the plugin.
 * - This image will appear in both the compass's minimap and the toggled
 *   large minimap.
 * - This will remove any blend modes used by the large minimap to keep color
 *   consistency in line with the compass.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder.
 *   - Filenames are case sensitive.
 *   - Leave out the filename extension from the notetag.
 * - If the compass does not show, neither will the minimap.
 * 
 * ---
 * 
 * <Explorable>
 * 
 * - Used for: Map Notetags
 * - Place this notetag inside maps that you want to be explorable.
 * - The explorable portion will only appear with the toggled "large" minimap.
 * - This has no effect on maps where the compass does not show.
 * - This overrides the "Default Explorable?" Plugin Parameter settings.
 * 
 * ---
 * 
 * <Already Explored>
 * 
 * - Used for: Map Notetags
 * - Place this notetag inside maps that you want to be already explored.
 * - The whole map will be visible from the getgo when viewing the "large"
 *   version of the minimap.
 * - This has no effect on maps where the compass does not show.
 * - This overrides the "Default Explorable?" Plugin Parameter settings.
 * 
 * ---
 * 
 * === Event Notetags and Comment Tags ===
 * 
 * ---
 *
 * <Compass Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This will assign an icon to the event or the event's page.
 * - Replace 'x' with a number representing the icon index you wish for this
 *   event or event page to appear as in the Proximity Compass.
 * - This notetag effect will take priority over the <Minimap Icon: x> notetag.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Compass Proximity: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This icon will only appear on the compass if the player is within range.
 * - Replace 'x' with the number of tiles the player must be within range of
 *   this event or event page in order to appear in the Proximity Compass.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Minimap Icon: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This icon will only appear if there is no designated compass icon AND
 *   will ONLY appear on the large minimap.
 * - If <Compass Icon: x> is used, then <Compass Icon: x> will take priority.
 * - This is primarily used to mark NPC locations.
 * - This will override the setting found in the Plugin Parameters.
 * - Minimap icons will appear a different size (by default smaller) than
 *   events with <Compass Icon: x>.
 * 
 * ---
 * 
 * <Hide Minimap Icon>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Makes it so that it will not show an icon while on the minimap.
 * - If <Compass Icon: x> is used, then <Compass Icon: x> will take priority.
 * - This is primarily used to hide event locations that would be marked by
 *   default due to the Plugin Parameters.
 * - This will override the setting found in the Plugin Parameters.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Compass Plugin Commands ===
 * 
 * ---
 *
 * Compass: Show/Hide Proximity Compass
 * - Show or hide the Proximity Compass.
 * - Does not bypass user settings.
 *
 *   Setting:
 *   - Show or hide the Proximity Compass.
 *   - Does not bypass user settings.
 *
 * ---
 *
 * Compass: Change Player Icon
 * - Change the player icon to a different icon.
 *
 *   Icon Index:
 *   - This is the icon you wish to change the player icon to.
 *
 * ---
 * 
 * === Minimap Plugin Commands ===
 * 
 * ---
 *
 * Minimap: Clear Explored Minimap
 * - Clears target map's exploration progress for the large minimap.
 * - Does not work on maps with <Already Explored> notetag.
 *
 *   Map ID:
 *   - ID of the map you wish to clear exploration progress for.
 *   - Use '0' for current map.
 *   - You may use JavaScript.
 *
 * ---
 *
 * Minimap: Fully Reveal Minimap
 * - Fully reveals the minimap for target map.
 *
 *   Map ID:
 *   - ID of the map you wish to reveal map for.
 *   - Use '0' for current map.
 *   - You may use JavaScript.
 *
 * ---
 *
 * Minimap: Toggle Large Minimap
 * - Show, hide, or toggle the large minimap.
 * - Requires Minimaps to be enabled.
 *
 *   Show/Hide?:
 *   - Show, hide, or toggle the large minimap.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * Default settings used for the Proximity Compass.
 *
 * ---
 *
 * Default
 * 
 *   Show by Default:
 *   - Show the Proximity Compass by default?
 * 
 *   Proximity Range:
 *   - Default range from the player to be shown on the Proximity Compass.
 * 
 *   Player Icon:
 *   - Icon used for the player to show on the Proximity Compass.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compass Settings
 * ============================================================================
 *
 * Compass settings used for the Proximity Compass.
 *
 * ---
 *
 * Position
 * 
 *   Center X:
 *   - Code used to calculate the X position of the compass's center.
 *   - This is NOT the upper left corner of the compass.
 * 
 *   Center Y:
 *   - Code used to calculate the Y position of the compass's center.
 *   - This is NOT the upper left corner of the compass.
 *
 * ---
 *
 * Contents
 * 
 *   Default Event Icons:
 *     
 *     Below Characters:
 *     - Default icon used for events on below characters level.
 *     - These appear on the compass and large minimap.
 * 
 *     Same as Characters:
 *     - Default icon used for events on same as characters level.
 *     - These appear on the compass and large minimap.
 * 
 *     Above Characters:
 *     - Default icon used for events on above characters level.
 *     - These appear on the compass and large minimap.
 * 
 *   Filename:
 *   - The picture used for the compass' frame.
 *   - This will come from the img/pictures/ folder.
 * 
 *   Radius:
 *   - Radius of the Proximity Compass in pixels.
 * 
 *   Tile Scale:
 *   - The scale used to calculate the distance of a tile relative to the
 *     distance on the compass
 * 
 *   Back Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Back Opacity:
 *   - Sets the opacity of the back color.
 *
 * ---
 *
 * Fading
 * 
 *   Close Minimum Opacity:
 *   - Minimum opacity when the player is too close to the compass on the
 *     map screen.
 *   - Hiding the compass during messages and events will make the compass
 *     fully transparent.
 * 
 *   Compass Fade Speed:
 *   - Fade speed of the compass when toggled on/off.
 *   - Lower is slower. Higher is faster.
 * 
 *   Icon Fade Speed:
 *   - Fade speed of the icons when out of range.
 *   - Lower is slower. Higher is faster.
 *
 * ---
 *
 * Hiding
 * 
 *   Hide During Messages:
 *   - If true, hide compass whenever a message is being displayed.
 * 
 *   Hide During Events:
 *   - If true, hide compass whenever an event is running.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Minimap Settings
 * ============================================================================
 *
 * As of the v1.06 update, this plugin now has a Minimap feature. This section
 * governs the minimap feature, if you want to use it, and how it appears.
 * 
 * A keyboard button can be used to toggle the "large" minimap (provided
 * minimaps are enabled for the current map). This minimap will show the areas
 * that are explored and not explored. As the player moves around, the
 * exploration area will enlarge based on the game's screen size.
 * 
 * For mouse toggling, we recommend using VisuStella MZ's Picture Common Events
 * and this plugin's "Minimap: Toggle Large Minimap" Plugin Command for the
 * best customization options.
 * 
 * The minimap used on the compass itself will always be fully revealed due to
 * its limited area of visibility.
 *
 * ---
 *
 * General
 * 
 *   Enable Minimap?:
 *   - Enable the minimap for the game? Cannot disable midgame.
 *   - The <Hide Minimap> map notetag can hide it though.
 *
 * ---
 *
 * Contents
 * 
 *   Filename:
 *   - Use this picture if current map uses a minimap.
 *   - This will come from the img/pictures/ folder.
 *   - If empty, it will use the filename used by the default compass.
 * 
 *   Hide Ceilings:
 *   - Ceiling autotiles are normally passable.
 *   - Hide them in the minimap?
 * 
 *   Tile Color:
 *   - Sets the color of the passable tiles found on the minimap.
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Tile Opacity:
 *   - What is the opacity level for the tiles?
 * 
 *   Tile Sharpness:
 *   - How sharp do you want the passability minimap to be?
 *   - Use a number from 2 to 16.
 *
 * ---
 * 
 * Large Minimap Settings
 * 
 *   Border Buffer:
 *   - Determine the buffer distance from the edge of the map when creating the
 *     large minimap.
 * 
 *   Default Event Icons:
 *     
 *     Below Characters:
 *     - Default icon used for events on below characters level.
 *     - These only appear on the large minimap.
 * 
 *     Same as Characters:
 *     - Default icon used for events on same as characters level.
 *     - These only appear on the large minimap.
 * 
 *     Above Characters:
 *     - Default icon used for events on above characters level.
 *     - These only appear on the large minimap.
 * 
 *   Default Explorable?:
 *   - By default, are maps explorable or already mapped?
 *   - Notetags will override this feature.
 * 
 *   Hide During Messages:
 *   - If true, hide large minimap whenever a message is being displayed.
 * 
 *   Hide During Events:
 *   - If true, hide large minimap whenever an event is running.
 * 
 *   Icon Scaling:
 * 
 *     Player Icon Scale:
 *     - What is the icon scale for the player icon?
 *     - Only applies to the large minimap.
 * 
 *     Compass Icon Scale:
 *     - What is the icon scale for <Compass Icon: x>?
 *     - Only applies to the large minimap.
 * 
 *     Minimap Icon Scale:
 *     - What is the icon scale for <Minimap Icon: x>?
 *     - Only applies to the large minimap.
 * 
 *   Ignore Icon Proximity:
 *   - If true, <Compass Proximity: x> notetag effects are ignored on the
 *     large minimap.
 * 
 *   Toggle Key:
 *   - What key is used to toggle the larger minimap on/off?
 *   - This feature is not usable unless the compass is enabled.
 *   - This feature won't trigger if there is a <Hide Minimap> notetag.
 * 
 * ---
 * 
 * Large Minimap Background Image
 * 
 *   Background Filename:
 *   - Use this picture if for the large minimap's background.
 *   - This will come from the img/pictures/ folder.
 * 
 *   Hide Background Color:
 *   - If true, hide the background color when using the minimap
 *     background image.
 * 
 *   Image Opacity:
 *   - Sets the opacity of the minimap background image.
 * 
 *   Minimap Blend Mode:
 *   - What kind of blend mode do you wish to apply to the rendered
 *     passability minimap?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for the Proximity Compass.
 *
 * ---
 *
 * Options
 * 
 *   Add Show Option?:
 *   - Add the 'Show Compass' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Add Size Option?:
 *   - Add the 'Compass Size' option to the Options menu?
 * 
 *     Option Name:
 *     - Command name of the option.
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.06: June 16, 2022
 * * Documentation Update!
 * ** List new minimap feature under Introduction.
 * ** Added "VisuStella MZ Compatibility" for VisuMZ_1_EventsMoveCore in
 *    regards to the new Minimap feature.
 * ** Help file updated for new features.
 * ** Split the Notetags section up between "Map Notetags" and "Event Notetags"
 *    for better category searching.
 * ** Added segment to <Compass Icon: x> notetag:
 * *** This notetag effect will take priority over the <Minimap Icon: x>
 *     notetag.
 * * New Features!
 * ** New Plugin Parameter added by Olivia and sponsored by AndyL:
 * *** Plugin Parameters > Compass Settings > Contents > Default Event Icons
 * **** These settings allow you to set the default icons used for the compass
 *      based on their character priority level.
 * *** Plugin Parameters > Compass Settings > Fading > Close Minimum Opacity
 * **** Minimum opacity when the player is too close to the compass on the map
 *      screen. Hiding the compass during messages and events will make the
 *      compass fully transparent.
 * ** New Feature Set: Minimap, added by Olivia and sponsored by AndlyL:
 * *** Plugin Parameters > Minimap Settings
 * **** Read the help file for details.
 * ** New Notetags added by Olivia and sponsored by AndyL:
 * *** <Hide Minimap>
 * *** <Explorable>
 * *** <Already Explored>
 * *** <Minimap Icon: x>
 * *** <Hide Minimap Icon>
 * **** Read the help file for details.
 * ** New Plugin Commands added by Olivia and sponsored by AndyL:
 * *** Minimap: Clear Explored Minimap
 * *** Minimap: Fully Reveal Minimap
 * *** Minimap: Toggle Large Minimap
 * **** Read the help file for details.
 * 
 * Version 1.05: March 31, 2022
 * * Feature Update!
 * ** Spawned events with proximity compass icons will no longer show the whole
 *    spritesheet for a frame. Update made by Olivia.
 * 
 * Version 1.04: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: January 15, 2021
 * * Feature Update!
 * ** Failsafes added in case events added manually through other plugins do
 *    not update with proper events.
 * 
 * Version 1.02: November 15, 2020
 * * Bug Fix!
 * ** Events spawned by the Events & Movement Core will now have their compass
 *    icons displayed upon spawning without requiring a reload of the map. Fix
 *    made by Arisu.
 * 
 * Version 1.01: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 *
 * Version 1.00: October 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CompassVisibility
 * @text Compass: Show/Hide Proximity Compass
 * @desc Show or hide the Proximity Compass.
 * Does not bypass user settings.
 *
 * @arg value:eval
 * @text Setting
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the Proximity Compass.
 * Does not bypass user settings.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CompassPlayerIcon
 * @text Compass: Change Player Icon
 * @desc Change the player icon to a different icon.
 *
 * @arg iconIndex:num
 * @text Icon Index
 * @desc This is the icon you wish to change the player icon to.
 * @default 82
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Minimap
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MinimapClearExplored
 * @text Minimap: Clear Explored Minimap
 * @desc Clears target map's exploration progress for the large minimap.
 * Does not work on maps with <Already Explored> notetag.
 *
 * @arg MapID:eval
 * @text Map ID
 * @desc ID of the map you wish to clear exploration progress for.
 * Use '0' for current map. You may use JavaScript.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MinimapFullExplore
 * @text Minimap: Fully Reveal Minimap
 * @desc Fully reveals the minimap for target map.
 *
 * @arg MapID:eval
 * @text Map ID
 * @desc ID of the map you wish to reveal map for.
 * Use '0' for current map. You may use JavaScript.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MinimapToggle
 * @text Minimap: Toggle Large Minimap
 * @desc Show, hide, or toggle the large minimap.
 * Requires Minimaps to be enabled.
 *
 * @arg Value:str
 * @text Show/Hide?
 * @type select
 * @option Show
 * @value show
 * @option Hide
 * @value hide
 * @option Toggle
 * @value toggle
 * @desc Show, hide, or toggle the large minimap.
 * @default toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ProximityCompass
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Default:struct
 * @text Default Settings
 * @type struct<Default>
 * @desc Default settings used for the Proximity Compass.
 * @default {"Show:eval":"true","Proximity:num":"1000","PlayerIcon:num":"82"}
 *
 * @param Compass:struct
 * @text Compass Settings
 * @type struct<Compass>
 * @desc Compass settings used for the Proximity Compass.
 * @default {"Position":"","CenterX:str":"Graphics.width - 128 * ConfigManager.compassSize / 100","CenterY:str":"Graphics.height - 128 * ConfigManager.compassSize / 100","Contents":"","DefaultEventIcons":"","DefaultEventIcon_Below:num":"0","DefaultEventIcon_Same:num":"0","DefaultEventIcon_Above:num":"0","Filename:str":"","Radius:num":"100","TileScale:num":"0.25","BackColor:str":"#000000","BackOpacity:num":"200","Fading":"","MinCompassOpacity:num":"128","CompassFadeSpeed:num":"16","IconFadeSpeed:num":"16","Hiding":"","HideMessage:eval":"false","HideEvents:eval":"false"}
 *
 * @param Minimap:struct
 * @text Minimap Settings
 * @type struct<Minimap>
 * @desc Minimap settings used for the Proximity Compass.
 * @default {"General":"","Enable:eval":"true","Contents":"","Filename:str":"","HideCeilingPassability:eval":"true","TileColor:str":"#ccccff","TileOpacity:num":"128","TileSharpness:num":"8","Large":"","BorderBuffer:num":"72","DefaultEventIcons":"","DefaultEventIcon_Below:num":"0","DefaultEventIcon_Same:num":"20","DefaultEventIcon_Above:num":"0","DefaultExplore:eval":"true","HideMessage:eval":"true","HideEvents:eval":"true","IconScale":"","PlayerIconScale:num":"1.00","CompassIconScale:num":"1.00","MinimapIconScale:num":"0.50","IgnoreProximity:eval":"true","ToggleKey:str":"tab","LargeBack":"","BackFilename:str":"","HideBackColor:eval":"true","ImageOpacity:num":"255","PassabilityBlendMode:num":"2"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for the Proximity Compass.
 * @default {"AddShowOption:eval":"true","ShowName:str":"Show Compass","AddSizeOption:eval":"true","SizeName:str":"Compass Size","AdjustRect:eval":"true"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Default Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Show:eval
 * @text Show by Default
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Proximity Compass by default?
 * @default true
 *
 * @param Proximity:num
 * @text Proximity Range
 * @type number
 * @min 1
 * @max 1000
 * @desc Default range from the player to be shown on the Proximity Compass.
 * @default 1000
 *
 * @param PlayerIcon:num
 * @text Player Icon
 * @desc Icon used for the player to show on the Proximity Compass.
 * @default 82
 *
 */
/* ----------------------------------------------------------------------------
 * Compass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compass:
 *
 * @param Position
 *
 * @param CenterX:str
 * @text Center X
 * @parent Position
 * @desc Code used to calculate the X position of the compass's center.
 * This is NOT the upper left corner of the compass.
 * @default Graphics.width - 128 * ConfigManager.compassSize / 100
 *
 * @param CenterY:str
 * @text Center Y
 * @parent Position
 * @desc Code used to calculate the Y position of the compass's center.
 * This is NOT the upper left corner of the compass.
 * @default Graphics.height - 128 * ConfigManager.compassSize / 100
 *
 * @param Contents
 * 
 * @param DefaultEventIcons
 * @text Default Event Icons
 * @parent Contents
 * 
 * @param DefaultEventIcon_Below:num
 * @text Below Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on below characters level.
 * These appear on the compass and large minimap.
 * @default 0
 * 
 * @param DefaultEventIcon_Same:num
 * @text Same as Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on same as characters level.
 * These appear on the compass and large minimap.
 * @default 0
 * 
 * @param DefaultEventIcon_Above:num
 * @text Above Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on above characters level.
 * These appear on the compass and large minimap.
 * @default 0
 *
 * @param Filename:str
 * @text Filename
 * @parent Contents
 * @type file
 * @dir img/pictures/
 * @desc The picture used for the compass' frame.
 * This will come from the img/pictures/ folder.
 * @default 
 *
 * @param Radius:num
 * @text Radius
 * @parent Contents
 * @type number
 * @min 1
 * @desc Radius of the Proximity Compass in pixels.
 * @default 100
 *
 * @param TileScale:num
 * @text Tile Scale
 * @parent Contents
 * @desc The scale used to calculate the distance of a tile relative to the distance on the compass
 * @default 0.25
 *
 * @param BackColor:str
 * @text Back Color
 * @parent Contents
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #000000
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent Contents
 * @type number
 * @min 1
 * @max 255
 * @desc Sets the opacity of the back color.
 * @default 200
 *
 * @param Fading
 *
 * @param MinCompassOpacity:num
 * @text Close Minimum Opacity
 * @parent Fading
 * @type number
 * @min 0
 * @desc Minimum opacity when the player is too close to the
 * compass on the map screen.
 * @default 128
 *
 * @param CompassFadeSpeed:num
 * @text Compass Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the compass when toggled on/off.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param IconFadeSpeed:num
 * @text Icon Fade Speed
 * @parent Fading
 * @type number
 * @min 1
 * @desc Fade speed of the icons when out of range.
 * Lower is slower. Higher is faster.
 * @default 16
 *
 * @param Hiding
 *
 * @param HideMessage:eval
 * @text Hide During Messages
 * @parent Hiding
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide compass whenever a message is being displayed.
 * @default false
 *
 * @param HideEvents:eval
 * @text Hide During Events
 * @parent Hiding
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide compass whenever an event is running.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Minimap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Minimap:
 *
 * @param General
 * 
 * @param Enable:eval
 * @text Enable Minimap?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the minimap for the game? Cannot disable midgame.
 * The <Hide Minimap> map notetag can hide it though.
 * @default true
 *
 * @param Contents
 *
 * @param Filename:str
 * @text Filename
 * @parent Contents
 * @type file
 * @dir img/pictures/
 * @desc Use this picture if current map uses a minimap.
 * This will come from the img/pictures/ folder.
 * @default 
 *
 * @param HideCeilingPassability:eval
 * @text Hide Ceilings
 * @parent Contents
 * @type boolean
 * @on Hide
 * @off Show
 * @desc Ceiling autotiles are normally passable.
 * Hide them in the minimap?
 * @default true
 *
 * @param TileColor:str
 * @text Tile Color
 * @parent Contents
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ccccff
 *
 * @param TileOpacity:num
 * @text Tile Opacity
 * @parent Contents
 * @type number
 * @min 1
 * @max 255
 * @desc What is the opacity level for the tiles?
 * @default 128
 *
 * @param TileSharpness:num
 * @text Tile Sharpness
 * @parent Contents
 * @type number
 * @min 2
 * @max 16
 * @desc How sharp do you want the passability minimap to be?
 * Use a number from 2 to 16.
 * @default 8
 * 
 * @param Large
 * @text Large Minimap Settings
 * 
 * @param BorderBuffer:num
 * @text Border Buffer
 * @parent Large
 * @type number
 * @min 0
 * @desc Determine the buffer distance from the edge of the map
 * when creating the large minimap.
 * @default 72
 * 
 * @param DefaultEventIcons
 * @text Default Event Icons
 * @parent Large
 * 
 * @param DefaultEventIcon_Below:num
 * @text Below Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on below characters level.
 * These only appear on the large minimap.
 * @default 0
 * 
 * @param DefaultEventIcon_Same:num
 * @text Same as Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on same as characters level.
 * These only appear on the large minimap.
 * @default 20
 * 
 * @param DefaultEventIcon_Above:num
 * @text Above Characters
 * @parent DefaultEventIcons
 * @type number
 * @min 0
 * @desc Default icon used for events on above characters level.
 * These only appear on the large minimap.
 * @default 0
 * 
 * @param DefaultExplore:eval
 * @text Default Explorable?
 * @parent Large
 * @type boolean
 * @on Explorable
 * @off Already Mapped
 * @desc By default, are maps explorable or already mapped?
 * Notetags will override this feature.
 * @default true
 *
 * @param HideMessage:eval
 * @text Hide During Messages
 * @parent Large
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide large minimap whenever a message is being displayed.
 * @default true
 *
 * @param HideEvents:eval
 * @text Hide During Events
 * @parent Large
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide large minimap whenever an event is running.
 * @default true
 * 
 * @param IconScale
 * @text Icon Scaling
 * @parent Large
 *
 * @param PlayerIconScale:num
 * @text Player Icon Scale
 * @parent IconScale
 * @desc What is the icon scale for the player icon?
 * Only applies to the large minimap.
 * @default 1.00
 *
 * @param CompassIconScale:num
 * @text Compass Icon Scale
 * @parent IconScale
 * @desc What is the icon scale for <Compass Icon: x>?
 * Only applies to the large minimap.
 * @default 1.00
 *
 * @param MinimapIconScale:num
 * @text Minimap Icon Scale
 * @parent IconScale
 * @desc What is the icon scale for <Minimap Icon: x>?
 * Only applies to the large minimap.
 * @default 0.50
 *
 * @param IgnoreProximity:eval
 * @text Ignore Icon Proximity
 * @parent Large
 * @type boolean
 * @on Ignore
 * @off Normal
 * @desc If true, <Compass Proximity: x> notetag effects are
 * ignored on the large minimap.
 * @default true
 * 
 * @param ToggleKey:str
 * @text Toggle Key
 * @parent Large
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc What key is used to toggle the larger minimap on/off?
 * @default tab
 * 
 * @param LargeBack
 * @text Large Minimap Image
 *
 * @param BackFilename:str
 * @text Background Filename
 * @parent LargeBack
 * @type file
 * @dir img/pictures/
 * @desc Use this picture if for the large minimap's background.
 * This will come from the img/pictures/ folder.
 * @default 
 *
 * @param HideBackColor:eval
 * @text Hide Background Color
 * @parent LargeBack
 * @type boolean
 * @on Hide
 * @off No Changes
 * @desc If true, hide the background color when using the minimap
 * background image.
 * @default true
 * 
 * @param ImageOpacity:num
 * @text Image Opacity
 * @parent LargeBack
 * @type number
 * @min 1
 * @max 255
 * @desc Sets the opacity of the minimap background image.
 * @default 255
 *
 * @param PassabilityBlendMode:num
 * @text Minimap Blend Mode
 * @parent LargeBack
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the
 * rendered passability minimap?
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param AddShowOption:eval
 * @text Add Show Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Compass' option to the Options menu?
 * @default true
 *
 * @param ShowName:str
 * @text Option Name
 * @parent AddShowOption:eval
 * @desc Command name of the option.
 * @default Show Compass
 *
 * @param AddSizeOption:eval
 * @text Add Size Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Compass Size' option to the Options menu?
 * @default true
 *
 * @param SizeName:str
 * @text Option Name
 * @parent AddSizeOption:eval
 * @desc Command name of the option.
 * @default Compass Size
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 */
//=============================================================================

const _0x1fd1c8=_0x3a6c;function _0x3a6c(_0x4ba5f0,_0x2e9e5d){const _0x21d75d=_0x21d7();return _0x3a6c=function(_0x3a6c2a,_0x526408){_0x3a6c2a=_0x3a6c2a-0x18d;let _0x1692cd=_0x21d75d[_0x3a6c2a];return _0x1692cd;},_0x3a6c(_0x4ba5f0,_0x2e9e5d);}(function(_0x45ca1d,_0x25afd3){const _0x35d4ac=_0x3a6c,_0x2f0827=_0x45ca1d();while(!![]){try{const _0x4dadab=-parseInt(_0x35d4ac(0x23d))/0x1+-parseInt(_0x35d4ac(0x293))/0x2+-parseInt(_0x35d4ac(0x1f9))/0x3*(parseInt(_0x35d4ac(0x267))/0x4)+-parseInt(_0x35d4ac(0x26e))/0x5*(parseInt(_0x35d4ac(0x2ac))/0x6)+-parseInt(_0x35d4ac(0x21a))/0x7+-parseInt(_0x35d4ac(0x1ed))/0x8+parseInt(_0x35d4ac(0x2b7))/0x9;if(_0x4dadab===_0x25afd3)break;else _0x2f0827['push'](_0x2f0827['shift']());}catch(_0x5717a6){_0x2f0827['push'](_0x2f0827['shift']());}}}(_0x21d7,0x5fb82));function _0x21d7(){const _0x311334=['maxCommands','updateFrame','createContainer','getMinimapExploredTiles','drawOnUnexploredMask','PassabilityBlendMode','CenterY','HideMessage','_compassProximity','match','PlayerAllow','atan2','contains','HideCeilingPassability','ARRAYJSON','update','BACK_IMG_OPACITY','showCompass','textColor','Game_Event_clearPageSettings','AllAllow','_playerSprite','events','addFullRevealMinimap','isLoopHorizontal','%1,%2','initializeProximityCompass','addCommand','apply','PlayerIconScale','registerCommand','onLoadImageMinimap','updateMinimap','AdjustRect','STR','event','checkProximityCompassStringTags','Window_Options_changeVolume','_minimapExploredTiles','IgnoreProximity','1043848KbqmfR','addChild','autotileType','setLargeMinimapMode','CompassVisibility','Window_Options_addGeneralOptions','MinCompassOpacity','updatePositionClassic','_characterContainer','CompassIconScale','addLoadListener','_ProximityMinimap','7887CEGRGR','show','ARRAYFUNC','_largeMinimapScale','updatePositionMinimapLarge','iconHeight','fullRevealUnexploredMask','setShowProximityCompass','createPassabilityMinimap','setupPageSettings','HideEvents','clearUnexploredMask','updateProximityCompassMinimapToggleKey','call','TILE_COLOR','updateScale','SizeName','IconFadeSpeed','updatePosition','sqrt','BORDER_BUFFER','registerMinimapExploredTiles','min','smooth','opacity','_ProximityCompassSprite','BackColor','Game_Event_setupPageSettings','NUM','ARRAYSTRUCT','initProximityCompassEffects','addShowProximityCompassCommand','screenX','5467588lUwafW','createPictureBack','deltaX','getColor','push','_pictureBackSprite','DefaultEventIcon_Above','addGeneralOptions','setupProximityCompassEffects','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','getCompassFrameFilename','applyBackgroundScale','Scene_Map_createSpriteset','anchor','ProximityCompass','DEFAULT_EXPLORE','iconIndex','STRUCT','BorderBuffer','addProximityCompassCommands','_customModified','exit','createSpriteset','white','getLargeMinimapMode','_minimapIconIndex','Show','isTriggered','ToggleKey','tileWidth','ImageOpacity','minimapPassableColor','ARRAYSTR','_compassIconIndex','mapId','220386Joxhby','max','PlayerIcon','createMinimap','parse','createCustomMinimap','ARRAYNUM','_passabilityMinimaps','round','clearPassabilityMinimap','createBackground','_eventOverload','_showProximityCompass','_maskContainer','createCharacters','Options','isShowProximityCompass','setupSpawn','clearPageSettings','BACK_FILENAME','bitmap','clearRect','isMinimapSprite','width','Game_Event_setupSpawn','getPassabilityMinimap','PlayerForbid','_unexploredMask','TILE_OPACITY','_lastPlayerY','setupProximityCompassNotetags','removeFullRevealMinimap','createProximityScreenMinimap','setLargeMinimapChild','_scene','_minimapMaskSprite','isEventRunning','loadBitmap','JSON','getPlayerCompassIcon','usesPictureBack','TileScale','216msiZDx','_regionRules','debugTestRevealMap','BACK_IMG_BLENDMODE','ENABLE','changeValue','name','20iQSptA','onLoadCustomMinimap','Compass','MinimapIconScale','ARRAYEVAL','MinimapFullExplore','includes','drawCircle','ConfigManager_applyData','AllForbid','AddSizeOption','description','IGNORE_CEILING_PASSABILITY','clamp','setPlayerCompassIcon','scale','isSceneMap','AddShowOption','createSprites','return\x200','Scene_Options_maxCommands','getCompassProximity','_emptyBitmap','_character','isMinimapExplorable','createImageMinimap','cos','blendMode','isVolumeSymbol','ConvertParams','hideCompass','_priorityType','height','_fullRevealMaps','createFrame','note','initialize','1064022ANaEFP','isShow','_realX','format','ceil','mask','isPassable','split','MinimapToggle','loadPicture','IconSet','setFrame','page','screenY','_minimapScale','iconWidth','Window_Options_isVolumeSymbol','DefaultEventIcon_Same','Minimap','prototype','setInitialOpacity','_erased','_realY','setupSpawnProximityCompass','MapID','664026jRazUO','_largeMinimapChild','updateExploration','getCompassIcon','_playerCompassIcon','floor','_iconIndex','clearMinimapExploredMapData','code','makeData','create','23766102iGDxim','compassSize','_minimapSprite','addProximityCompassSizeCommand','version','VisuMZ_1_EventsMoveCore','loadSystem','constructor','TILE_SIZE','updatePositionMinimapSmall','getFullRevealMinimaps','changeProximityCompassSize','isLoopVertical','_ProximityCompassBackgroundSprite','Radius','map','tileHeight','fillRect','CompassPlayerIcon','clear','BackFilename','isCloseToCompassScreenPosition','_backgroundSprite','_lastPlayerX','DefaultEventIcon_Below','_characterSprites','Settings','createProximityCompass','setupSpawnProximityMinimap','sin','abs','isBusy','updateOpacity','COMPASS_FRAME','parameters','setupProximityCompassCommentTags','_largeMinimapMode','createDefaultMinimap','createUnexplored','hideMinimap','Filename','Default','initMembers','ConfigManager_makeData','isLargeMinimapChild','bind','regionId','changeVolume','trim','Proximity','BackOpacity','updateMain','list','toLowerCase','applyData','_ProximityCompassFrameSprite','hide','CompassFadeSpeed'];_0x21d7=function(){return _0x311334;};return _0x21d7();}var label=_0x1fd1c8(0x228),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x46cb58){const _0x37bf81=_0x1fd1c8;return _0x46cb58['status']&&_0x46cb58[_0x37bf81(0x279)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x1fd1c8(0x1a5)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x1fd1c8(0x28b)]=function(_0xc7a6bc,_0x56551f){const _0x5e25b0=_0x1fd1c8;for(const _0x4d16e2 in _0x56551f){if(_0x4d16e2[_0x5e25b0(0x1ce)](/(.*):(.*)/i)){const _0x50d7d1=String(RegExp['$1']),_0x10d994=String(RegExp['$2'])['toUpperCase']()[_0x5e25b0(0x1bb)]();let _0x5b9e35,_0x5d2570,_0x3bae47;switch(_0x10d994){case _0x5e25b0(0x215):_0x5b9e35=_0x56551f[_0x4d16e2]!==''?Number(_0x56551f[_0x4d16e2]):0x0;break;case _0x5e25b0(0x243):_0x5d2570=_0x56551f[_0x4d16e2]!==''?JSON[_0x5e25b0(0x241)](_0x56551f[_0x4d16e2]):[],_0x5b9e35=_0x5d2570[_0x5e25b0(0x19a)](_0x54b832=>Number(_0x54b832));break;case'EVAL':_0x5b9e35=_0x56551f[_0x4d16e2]!==''?eval(_0x56551f[_0x4d16e2]):null;break;case _0x5e25b0(0x272):_0x5d2570=_0x56551f[_0x4d16e2]!==''?JSON[_0x5e25b0(0x241)](_0x56551f[_0x4d16e2]):[],_0x5b9e35=_0x5d2570['map'](_0x4eb3fb=>eval(_0x4eb3fb));break;case _0x5e25b0(0x263):_0x5b9e35=_0x56551f[_0x4d16e2]!==''?JSON['parse'](_0x56551f[_0x4d16e2]):'';break;case _0x5e25b0(0x1d3):_0x5d2570=_0x56551f[_0x4d16e2]!==''?JSON[_0x5e25b0(0x241)](_0x56551f[_0x4d16e2]):[],_0x5b9e35=_0x5d2570['map'](_0x479b4a=>JSON[_0x5e25b0(0x241)](_0x479b4a));break;case'FUNC':_0x5b9e35=_0x56551f[_0x4d16e2]!==''?new Function(JSON['parse'](_0x56551f[_0x4d16e2])):new Function(_0x5e25b0(0x281));break;case _0x5e25b0(0x1fb):_0x5d2570=_0x56551f[_0x4d16e2]!==''?JSON[_0x5e25b0(0x241)](_0x56551f[_0x4d16e2]):[],_0x5b9e35=_0x5d2570[_0x5e25b0(0x19a)](_0x306ed4=>new Function(JSON[_0x5e25b0(0x241)](_0x306ed4)));break;case _0x5e25b0(0x1e7):_0x5b9e35=_0x56551f[_0x4d16e2]!==''?String(_0x56551f[_0x4d16e2]):'';break;case _0x5e25b0(0x23a):_0x5d2570=_0x56551f[_0x4d16e2]!==''?JSON[_0x5e25b0(0x241)](_0x56551f[_0x4d16e2]):[],_0x5b9e35=_0x5d2570['map'](_0x1b5241=>String(_0x1b5241));break;case _0x5e25b0(0x22b):_0x3bae47=_0x56551f[_0x4d16e2]!==''?JSON[_0x5e25b0(0x241)](_0x56551f[_0x4d16e2]):{},_0x5b9e35=VisuMZ[_0x5e25b0(0x28b)]({},_0x3bae47);break;case _0x5e25b0(0x216):_0x5d2570=_0x56551f[_0x4d16e2]!==''?JSON['parse'](_0x56551f[_0x4d16e2]):[],_0x5b9e35=_0x5d2570['map'](_0x55d88d=>VisuMZ[_0x5e25b0(0x28b)]({},JSON[_0x5e25b0(0x241)](_0x55d88d)));break;default:continue;}_0xc7a6bc[_0x50d7d1]=_0x5b9e35;}}return _0xc7a6bc;},(_0x300262=>{const _0x5681b8=_0x1fd1c8,_0x353eb8=_0x300262[_0x5681b8(0x26d)];for(const _0x2189ca of dependencies){if(!Imported[_0x2189ca]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x5681b8(0x296)](_0x353eb8,_0x2189ca)),SceneManager[_0x5681b8(0x22f)]();break;}}const _0xdcecc8=_0x300262[_0x5681b8(0x279)];if(_0xdcecc8['match'](/\[Version[ ](.*?)\]/i)){const _0xfea115=Number(RegExp['$1']);_0xfea115!==VisuMZ[label][_0x5681b8(0x18f)]&&(alert(_0x5681b8(0x223)['format'](_0x353eb8,_0xfea115)),SceneManager[_0x5681b8(0x22f)]());}if(_0xdcecc8[_0x5681b8(0x1ce)](/\[Tier[ ](\d+)\]/i)){const _0x387722=Number(RegExp['$1']);_0x387722<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x5681b8(0x296)](_0x353eb8,_0x387722,tier)),SceneManager[_0x5681b8(0x22f)]()):tier=Math['max'](_0x387722,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x300262[_0x5681b8(0x1ad)]);})(pluginData),PluginManager[_0x1fd1c8(0x1e3)](pluginData[_0x1fd1c8(0x26d)],_0x1fd1c8(0x1f1),_0x547e10=>{const _0x57e1fa=_0x1fd1c8;VisuMZ[_0x57e1fa(0x28b)](_0x547e10,_0x547e10);const _0x31b46e=_0x547e10['value'];$gameSystem[_0x57e1fa(0x200)](_0x31b46e);}),PluginManager[_0x1fd1c8(0x1e3)](pluginData[_0x1fd1c8(0x26d)],_0x1fd1c8(0x19d),_0x1a89bb=>{const _0x2ee3c7=_0x1fd1c8;VisuMZ[_0x2ee3c7(0x28b)](_0x1a89bb,_0x1a89bb);const _0x1fa39f=_0x1a89bb[_0x2ee3c7(0x22a)];$gameSystem[_0x2ee3c7(0x27c)](_0x1fa39f);}),PluginManager[_0x1fd1c8(0x1e3)](pluginData[_0x1fd1c8(0x26d)],'MinimapClearExplored',_0x1b2d8c=>{const _0x2f6aca=_0x1fd1c8;if(!Sprite_ProximityMinimap[_0x2f6aca(0x26b)])return;VisuMZ[_0x2f6aca(0x28b)](_0x1b2d8c,_0x1b2d8c);let _0x30ec66=_0x1b2d8c[_0x2f6aca(0x2ab)]||0x0;if(_0x30ec66<=0x0)_0x30ec66=$gameMap[_0x2f6aca(0x23c)]();$gameMap[_0x2f6aca(0x2b3)](_0x30ec66);if(_0x30ec66===$gameMap[_0x2f6aca(0x23c)]()){const _0x59ae77=SceneManager[_0x2f6aca(0x25f)];if(_0x59ae77){const _0x4f8aa5=_0x59ae77[_0x2f6aca(0x1f8)];_0x4f8aa5&&_0x4f8aa5[_0x2f6aca(0x204)]();}}}),PluginManager[_0x1fd1c8(0x1e3)](pluginData[_0x1fd1c8(0x26d)],_0x1fd1c8(0x273),_0x1b062c=>{const _0x237802=_0x1fd1c8;if(!Sprite_ProximityMinimap[_0x237802(0x26b)])return;VisuMZ[_0x237802(0x28b)](_0x1b062c,_0x1b062c);let _0x312b2c=_0x1b062c['MapID']||0x0;if(_0x312b2c<=0x0)_0x312b2c=$gameMap[_0x237802(0x23c)]();$gameMap[_0x237802(0x1dc)](_0x312b2c);if(_0x312b2c===$gameMap[_0x237802(0x23c)]()){const _0x44626e=SceneManager[_0x237802(0x25f)];if(_0x44626e){const _0x31fc45=_0x44626e[_0x237802(0x1f8)];_0x31fc45&&_0x31fc45[_0x237802(0x1ff)]();}}}),PluginManager[_0x1fd1c8(0x1e3)](pluginData[_0x1fd1c8(0x26d)],_0x1fd1c8(0x29b),_0x53a5bd=>{const _0x4e8620=_0x1fd1c8;if(!Sprite_ProximityMinimap[_0x4e8620(0x26b)])return;if($gameMap[_0x4e8620(0x1b2)]())return;VisuMZ[_0x4e8620(0x28b)](_0x53a5bd,_0x53a5bd);const _0x4f9abd=_0x53a5bd['Value'];switch(_0x4f9abd[_0x4e8620(0x1c0)]()[_0x4e8620(0x1bb)]()){case _0x4e8620(0x1fa):$gameSystem[_0x4e8620(0x1f0)](!![]);break;case _0x4e8620(0x1c3):$gameSystem[_0x4e8620(0x1f0)](![]);break;case'toggle':const _0x4884e8=!$gameSystem[_0x4e8620(0x232)]();$gameSystem['setLargeMinimapMode'](_0x4884e8);break;}}),ImageManager[_0x1fd1c8(0x256)]=function(){const _0x34fa92=_0x1fd1c8;this['_passabilityMinimaps']=this['_passabilityMinimaps']||{};const _0x3d7339=$gameMap[_0x34fa92(0x23c)]();if(!this[_0x34fa92(0x244)][_0x3d7339]){const _0x536857=this[_0x34fa92(0x201)]();this['_passabilityMinimaps'][_0x3d7339]=_0x536857;}return this[_0x34fa92(0x244)][_0x3d7339];},ImageManager[_0x1fd1c8(0x246)]=function(_0x484723){const _0x4c2eae=_0x1fd1c8;this[_0x4c2eae(0x244)]=this[_0x4c2eae(0x244)]||{},delete this[_0x4c2eae(0x244)][_0x484723];},ImageManager[_0x1fd1c8(0x201)]=function(){const _0x4458fe=_0x1fd1c8,_0x225e74=$gameMap['isLoopHorizontal'](),_0x366f49=$gameMap[_0x4458fe(0x197)](),_0x49ae87=_0x225e74?0x3:0x1,_0x4205a0=_0x366f49?0x3:0x1,_0x556bbd=Sprite_ProximityMinimap[_0x4458fe(0x193)],_0x18e8ee=$gameMap[_0x4458fe(0x254)](),_0x5ee896=$gameMap[_0x4458fe(0x28e)](),_0x53c061=new Bitmap(_0x18e8ee*_0x49ae87*_0x556bbd,_0x5ee896*_0x4205a0*_0x556bbd);_0x53c061[_0x4458fe(0x210)]=!![];const _0x263625=ColorManager[_0x4458fe(0x239)](),_0x80cfd1=[0x50,0x51,0x52,0x53,0x54,0x55,0x56,0x57];_0x80cfd1['push'](0x60,0x61,0x62,0x63,0x64,0x65,0x66,0x67),_0x80cfd1['push'](0x70,0x71,0x72,0x73,0x74,0x75,0x76,0x77);for(let _0x507737=0x0;_0x507737<_0x18e8ee;_0x507737++){for(let _0x289601=0x0;_0x289601<_0x5ee896;_0x289601++){if($gameMap['isPlayerPassableByAnyDirection'](_0x507737,_0x289601)){if(Imported['VisuMZ_1_EventsMoveCore']){const _0x5314ac=$gameMap[_0x4458fe(0x268)],_0x38a414=$gameMap[_0x4458fe(0x1b9)](_0x507737,_0x289601);if(_0x5314ac[_0x4458fe(0x277)][_0x4458fe(0x274)](_0x38a414))continue;if(_0x5314ac[_0x4458fe(0x257)][_0x4458fe(0x274)](_0x38a414))continue;}if(Sprite_ProximityMinimap[_0x4458fe(0x27a)]){if(_0x80cfd1['includes']($gameMap[_0x4458fe(0x1ef)](_0x507737,_0x289601,0x0)))continue;if(_0x80cfd1[_0x4458fe(0x274)]($gameMap[_0x4458fe(0x1ef)](_0x507737,_0x289601,0x1)))continue;if(_0x80cfd1[_0x4458fe(0x274)]($gameMap[_0x4458fe(0x1ef)](_0x507737,_0x289601,0x2)))continue;if(_0x80cfd1[_0x4458fe(0x274)]($gameMap[_0x4458fe(0x1ef)](_0x507737,_0x289601,0x3)))continue;if(_0x80cfd1[_0x4458fe(0x274)]($gameMap[_0x4458fe(0x1ef)](_0x507737,_0x289601,0x4)))continue;}for(let _0x884cb7=0x0;_0x884cb7<_0x49ae87;_0x884cb7++){for(let _0x2efe0a=0x0;_0x2efe0a<_0x4205a0;_0x2efe0a++){const _0x13d76e=(_0x507737+_0x18e8ee*_0x884cb7)*_0x556bbd,_0x354eef=(_0x289601+_0x5ee896*_0x2efe0a)*_0x556bbd;_0x53c061[_0x4458fe(0x19c)](_0x13d76e,_0x354eef,_0x556bbd,_0x556bbd,_0x263625);if(Imported[_0x4458fe(0x190)]){const _0x17e95c=$gameMap[_0x4458fe(0x268)],_0x57a5f1=$gameMap[_0x4458fe(0x1b9)](_0x507737,_0x289601);if(_0x17e95c[_0x4458fe(0x1d9)][_0x4458fe(0x274)](_0x57a5f1))continue;if(_0x17e95c[_0x4458fe(0x1cf)]['includes'](_0x57a5f1))continue;}!$gameMap[_0x4458fe(0x299)](_0x507737,_0x289601,0x2)&&_0x53c061[_0x4458fe(0x252)](_0x13d76e,_0x354eef+_0x556bbd-0x1,_0x556bbd,0x1),!$gameMap[_0x4458fe(0x299)](_0x507737,_0x289601,0x4)&&_0x53c061[_0x4458fe(0x252)](_0x13d76e,_0x354eef,0x1,_0x556bbd),!$gameMap[_0x4458fe(0x299)](_0x507737,_0x289601,0x6)&&_0x53c061[_0x4458fe(0x252)](_0x13d76e+_0x556bbd-0x1,_0x354eef,0x1,_0x556bbd),!$gameMap['isPassable'](_0x507737,_0x289601,0x8)&&_0x53c061[_0x4458fe(0x252)](_0x13d76e,_0x354eef,_0x556bbd,0x1);}}}}}return _0x53c061[_0x4458fe(0x22e)]=![],_0x53c061;},ColorManager[_0x1fd1c8(0x21d)]=function(_0x5c91ec){const _0x422a32=_0x1fd1c8;return _0x5c91ec=String(_0x5c91ec),_0x5c91ec[_0x422a32(0x1ce)](/#(.*)/i)?'#%1'[_0x422a32(0x296)](String(RegExp['$1'])):this[_0x422a32(0x1d7)](Number(_0x5c91ec));},ColorManager['minimapPassableColor']=function(){const _0x4e8c7f=_0x1fd1c8;return ColorManager['getColor'](Sprite_ProximityMinimap[_0x4e8c7f(0x207)]);},ConfigManager[_0x1fd1c8(0x1d6)]=!![],ConfigManager[_0x1fd1c8(0x2b8)]=0x64,VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x1b6)]=ConfigManager[_0x1fd1c8(0x2b5)],ConfigManager[_0x1fd1c8(0x2b5)]=function(){const _0x2dede3=_0x1fd1c8,_0x4fdee5=VisuMZ[_0x2dede3(0x228)][_0x2dede3(0x1b6)][_0x2dede3(0x206)](this);return _0x4fdee5[_0x2dede3(0x1d6)]=this['showCompass'],_0x4fdee5[_0x2dede3(0x2b8)]=this[_0x2dede3(0x2b8)],_0x4fdee5;},VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x276)]=ConfigManager[_0x1fd1c8(0x1c1)],ConfigManager[_0x1fd1c8(0x1c1)]=function(_0x273da1){const _0x44a0b9=_0x1fd1c8;VisuMZ['ProximityCompass'][_0x44a0b9(0x276)]['call'](this,_0x273da1),'showCompass'in _0x273da1?this[_0x44a0b9(0x1d6)]=_0x273da1[_0x44a0b9(0x1d6)]:this[_0x44a0b9(0x1d6)]=ConfigManager[_0x44a0b9(0x1d6)],_0x44a0b9(0x2b8)in _0x273da1?this['compassSize']=_0x273da1[_0x44a0b9(0x2b8)]:this[_0x44a0b9(0x2b8)]=ConfigManager[_0x44a0b9(0x2b8)];},SceneManager['isSceneMap']=function(){const _0x11f964=_0x1fd1c8;return this[_0x11f964(0x25f)]&&this['_scene'][_0x11f964(0x192)]===Scene_Map;},TextManager['showCompass']=VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x1a5)][_0x1fd1c8(0x24c)]['ShowName'],TextManager[_0x1fd1c8(0x2b8)]=VisuMZ[_0x1fd1c8(0x228)]['Settings']['Options'][_0x1fd1c8(0x209)],VisuMZ[_0x1fd1c8(0x228)]['Game_System_initialize']=Game_System[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x292)],Game_System[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x292)]=function(){const _0x29dc4d=_0x1fd1c8;VisuMZ[_0x29dc4d(0x228)]['Game_System_initialize'][_0x29dc4d(0x206)](this),this[_0x29dc4d(0x1df)]();},Game_System[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1df)]=function(){const _0x5a5464=_0x1fd1c8;this['_showProximityCompass']=VisuMZ[_0x5a5464(0x228)][_0x5a5464(0x1a5)]['Default'][_0x5a5464(0x234)],this['_playerCompassIcon']=VisuMZ[_0x5a5464(0x228)][_0x5a5464(0x1a5)][_0x5a5464(0x1b4)][_0x5a5464(0x23f)];},Game_System['prototype'][_0x1fd1c8(0x24d)]=function(){const _0x3356b1=_0x1fd1c8;return this[_0x3356b1(0x249)]===undefined&&this[_0x3356b1(0x1df)](),this[_0x3356b1(0x249)];},Game_System[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x200)]=function(_0x4fe79d){const _0x313618=_0x1fd1c8;this[_0x313618(0x249)]===undefined&&this[_0x313618(0x1df)](),this[_0x313618(0x249)]=_0x4fe79d;},Game_System['prototype'][_0x1fd1c8(0x264)]=function(){const _0x4c6d15=_0x1fd1c8;return this[_0x4c6d15(0x2b0)]===undefined&&this[_0x4c6d15(0x1df)](),this['_playerCompassIcon'];},Game_System[_0x1fd1c8(0x2a6)]['setPlayerCompassIcon']=function(_0x9482c4){const _0x8116b7=_0x1fd1c8;this[_0x8116b7(0x2b0)]===undefined&&this[_0x8116b7(0x1df)](),this['_playerCompassIcon']=_0x9482c4;},Game_System['prototype']['setLargeMinimapMode']=function(_0x420a09){const _0x48e0cc=_0x1fd1c8;this[_0x48e0cc(0x1af)]=_0x420a09;},Game_System['prototype'][_0x1fd1c8(0x232)]=function(){return this['_largeMinimapMode'];},Game_Map[_0x1fd1c8(0x2a6)]['isEventOverloaded']=function(){const _0x25c540=_0x1fd1c8;return this[_0x25c540(0x248)];},Game_Map[_0x1fd1c8(0x2a6)]['hideCompass']=function(){const _0x466c97=_0x1fd1c8;if(!ConfigManager['showCompass'])return!![];else return!!$dataMap&&!!$dataMap['note']?$dataMap[_0x466c97(0x291)][_0x466c97(0x1ce)](/<HIDE COMPASS>/i):![];},Game_Map['prototype']['isPlayerPassableByAnyDirection']=function(_0xf6eff1,_0x28cd8d){const _0x4ff3a1=_0x1fd1c8;if(Imported[_0x4ff3a1(0x190)]){const _0x5e8a07=this['_regionRules'],_0x5109b4=this[_0x4ff3a1(0x1b9)](_0xf6eff1,_0x28cd8d);if(_0x5e8a07[_0x4ff3a1(0x277)][_0x4ff3a1(0x274)](_0x5109b4))return![];if(_0x5e8a07[_0x4ff3a1(0x257)][_0x4ff3a1(0x274)](_0x5109b4))return![];}if(this[_0x4ff3a1(0x299)](_0xf6eff1,_0x28cd8d,0x2))return!![];if(this[_0x4ff3a1(0x299)](_0xf6eff1,_0x28cd8d,0x4))return!![];if(this[_0x4ff3a1(0x299)](_0xf6eff1,_0x28cd8d,0x6))return!![];if(this[_0x4ff3a1(0x299)](_0xf6eff1,_0x28cd8d,0x8))return!![];if(Imported[_0x4ff3a1(0x190)]){const _0x4d1e02=this[_0x4ff3a1(0x268)],_0x2580ca=this[_0x4ff3a1(0x1b9)](_0xf6eff1,_0x28cd8d);if(_0x4d1e02[_0x4ff3a1(0x1d9)]['includes'](_0x2580ca))return!![];if(_0x4d1e02[_0x4ff3a1(0x1cf)][_0x4ff3a1(0x274)](_0x2580ca))return!![];}return![];},Game_Map[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1b2)]=function(){const _0x594793=_0x1fd1c8;if(!Sprite_ProximityMinimap[_0x594793(0x26b)])return!![];else return!!$dataMap&&!!$dataMap[_0x594793(0x291)]?$dataMap[_0x594793(0x291)][_0x594793(0x1ce)](/<HIDE (?:MINIMAP|MINI-MAP)>/i):![];},Game_Map[_0x1fd1c8(0x2a6)]['isMinimapExplorable']=function(){const _0x3ddab9=_0x1fd1c8,_0x59605c=$dataMap?$dataMap[_0x3ddab9(0x291)]||'':'';if(_0x59605c[_0x3ddab9(0x1ce)](/<EXPLORABLE>/i))return!![];else{if(_0x59605c['match'](/<ALREADY EXPLORED>/i))return![];}if(this[_0x3ddab9(0x195)]()[_0x3ddab9(0x274)](this[_0x3ddab9(0x23c)]()))return![];return Sprite_ProximityMinimap[_0x3ddab9(0x229)];},Game_Map[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1c8)]=function(_0x4d12eb){const _0x1a5f5f=_0x1fd1c8;return this[_0x1a5f5f(0x1eb)]=this[_0x1a5f5f(0x1eb)]||{},this[_0x1a5f5f(0x1eb)][_0x4d12eb]=this['_minimapExploredTiles'][_0x4d12eb]||[],this['_minimapExploredTiles'][_0x4d12eb];},Game_Map[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x2b3)]=function(_0x213fb3){const _0x2ebea3=_0x1fd1c8;this[_0x2ebea3(0x1eb)]=this['_minimapExploredTiles']||{},this['_minimapExploredTiles'][_0x213fb3]=this['_minimapExploredTiles'][_0x213fb3]||[],delete this['_minimapExploredTiles'][_0x213fb3],this[_0x2ebea3(0x25c)](_0x213fb3);},Game_Map[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x20e)]=function(_0x1f2a4c,_0x1cc9ad,_0x870f9b){const _0x4330b2=_0x1fd1c8;this[_0x4330b2(0x1eb)]=this['_minimapExploredTiles']||{},this['_minimapExploredTiles'][_0x1f2a4c]=this[_0x4330b2(0x1eb)][_0x1f2a4c]||[];const _0xbafd25=_0x4330b2(0x1de)['format'](_0x1cc9ad,_0x870f9b);if(this[_0x4330b2(0x1eb)][_0x1f2a4c][_0x4330b2(0x274)](_0xbafd25))return;this[_0x4330b2(0x1eb)][_0x1f2a4c][_0x4330b2(0x21e)](_0xbafd25),this[_0x4330b2(0x1eb)][_0x1f2a4c]['sort']();},Game_Map[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x195)]=function(){const _0x5ccb87=_0x1fd1c8;return this[_0x5ccb87(0x28f)]=this[_0x5ccb87(0x28f)]||[],this['_fullRevealMaps'];},Game_Map['prototype'][_0x1fd1c8(0x1dc)]=function(_0xd73395){const _0xb15aa8=_0x1fd1c8;this[_0xb15aa8(0x28f)]=this[_0xb15aa8(0x28f)]||[],!this[_0xb15aa8(0x28f)][_0xb15aa8(0x274)](_0xd73395)&&this[_0xb15aa8(0x28f)][_0xb15aa8(0x21e)](_0xd73395);},Game_Map['prototype'][_0x1fd1c8(0x25c)]=function(_0x328bd9){const _0x51eeeb=_0x1fd1c8;this[_0x51eeeb(0x28f)]=this[_0x51eeeb(0x28f)]||[],this['_fullRevealMaps']['remove'](_0x328bd9);},Game_Map[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x269)]=function(){const _0x1b779d=_0x1fd1c8;this[_0x1b779d(0x1eb)]=this[_0x1b779d(0x1eb)]||{},this[_0x1b779d(0x1eb)][_0x383e3d]=[];const _0x383e3d=this[_0x1b779d(0x23c)]();for(let _0x43c7f3=0x0;_0x43c7f3<this[_0x1b779d(0x254)]();_0x43c7f3++){for(let _0x5a7af3=0x0;_0x5a7af3<this[_0x1b779d(0x28e)]();_0x5a7af3++){const _0x2ce646='%1,%2'[_0x1b779d(0x296)](_0x43c7f3,_0x5a7af3);this[_0x1b779d(0x1eb)][_0x383e3d]['push'](_0x2ce646);}}},Game_Player['prototype'][_0x1fd1c8(0x1a0)]=function(){const _0x43333c=_0x1fd1c8;if(!SceneManager[_0x43333c(0x27e)]())return![];const _0x4b1146=SceneManager[_0x43333c(0x25f)][_0x43333c(0x212)];if(!_0x4b1146)return![];const _0x30bdb4=_0x4b1146['x'],_0xf427ba=_0x4b1146['y'],_0x4aa360=VisuMZ[_0x43333c(0x228)][_0x43333c(0x1a5)]['Compass'][_0x43333c(0x199)]||0x1,_0x2889fe=_0x4b1146[_0x43333c(0x27d)]['x'],_0x3533aa=new Rectangle(_0x30bdb4-_0x4aa360*_0x2889fe,_0xf427ba-_0x4aa360*_0x2889fe,_0x4aa360*_0x2889fe*0x2+$gameMap[_0x43333c(0x237)]()/0x2,_0x4aa360*_0x2889fe*0x2+$gameMap[_0x43333c(0x19b)]()/0x2);return _0x3533aa[_0x43333c(0x1d1)](this[_0x43333c(0x219)](),this[_0x43333c(0x2a0)]());},VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x1d8)]=Game_Event[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x24f)],Game_Event[_0x1fd1c8(0x2a6)]['clearPageSettings']=function(){const _0x141e94=_0x1fd1c8;VisuMZ[_0x141e94(0x228)][_0x141e94(0x1d8)][_0x141e94(0x206)](this),this[_0x141e94(0x217)]();},VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x214)]=Game_Event['prototype'][_0x1fd1c8(0x202)],Game_Event[_0x1fd1c8(0x2a6)]['setupPageSettings']=function(){const _0x180753=_0x1fd1c8;VisuMZ[_0x180753(0x228)][_0x180753(0x214)][_0x180753(0x206)](this),this['setupProximityCompassEffects']();},Game_Event[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x222)]=function(){const _0x47b0d1=_0x1fd1c8;if(!this['event']())return;this[_0x47b0d1(0x217)](),this[_0x47b0d1(0x25b)](),this[_0x47b0d1(0x1ae)]();},Game_Event['prototype'][_0x1fd1c8(0x25b)]=function(){const _0x1fc8ab=_0x1fd1c8,_0x3faac4=this[_0x1fc8ab(0x1e8)]()[_0x1fc8ab(0x291)];if(_0x3faac4==='')return;this[_0x1fc8ab(0x1e9)](_0x3faac4);},Game_Event['prototype']['setupProximityCompassCommentTags']=function(){const _0x278778=_0x1fd1c8;if(!this[_0x278778(0x29f)]())return;const _0x32d00b=this[_0x278778(0x1bf)]();let _0x166976='';for(const _0x3005a8 of _0x32d00b){if([0x6c,0x198][_0x278778(0x274)](_0x3005a8[_0x278778(0x2b4)])){if(_0x166976!=='')_0x166976+='\x0a';_0x166976+=_0x3005a8[_0x278778(0x1ad)][0x0];}}this[_0x278778(0x1e9)](_0x166976);},Game_Event[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x217)]=function(){const _0x407f85=_0x1fd1c8;this[_0x407f85(0x23b)]=0x0,this[_0x407f85(0x1cd)]=VisuMZ[_0x407f85(0x228)][_0x407f85(0x1a5)][_0x407f85(0x1b4)][_0x407f85(0x1bc)];{const _0x329a8a=VisuMZ['ProximityCompass'][_0x407f85(0x1a5)][_0x407f85(0x270)];this[_0x407f85(0x23b)]=0x0;switch(this[_0x407f85(0x28d)]){case 0x0:this[_0x407f85(0x23b)]=_0x329a8a[_0x407f85(0x1a3)]||0x0;break;case 0x1:this[_0x407f85(0x23b)]=_0x329a8a[_0x407f85(0x2a4)]||0x0;break;case 0x2:this[_0x407f85(0x23b)]=_0x329a8a[_0x407f85(0x220)]||0x0;break;}}{const _0x3e3de0=VisuMZ[_0x407f85(0x228)][_0x407f85(0x1a5)][_0x407f85(0x2a5)];this[_0x407f85(0x233)]=0x0;switch(this['_priorityType']){case 0x0:this[_0x407f85(0x233)]=_0x3e3de0[_0x407f85(0x1a3)]||0x0;break;case 0x1:this[_0x407f85(0x233)]=_0x3e3de0[_0x407f85(0x2a4)]||0x0;break;case 0x2:this[_0x407f85(0x233)]=_0x3e3de0[_0x407f85(0x220)]||0x0;break;}}},Game_Event[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1e9)]=function(_0x3118f1){const _0x16621b=_0x1fd1c8;_0x3118f1[_0x16621b(0x1ce)](/<COMPASS ICON: (\d+)>/i)&&(this['_compassIconIndex']=parseInt(RegExp['$1'])),_0x3118f1['match'](/<COMPASS PROXIMITY: (\d+)>/i)&&(this[_0x16621b(0x1cd)]=parseInt(RegExp['$1'])),_0x3118f1[_0x16621b(0x1ce)](/<MINIMAP ICON: (\d+)>/i)&&(this['_minimapIconIndex']=parseInt(RegExp['$1'])),_0x3118f1[_0x16621b(0x1ce)](/<HIDE MINIMAP ICON>/i)&&(this[_0x16621b(0x233)]=0x0);},VisuMZ[_0x1fd1c8(0x228)]['Game_Event_setupSpawn']=Game_Event[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x24e)],Game_Event[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x24e)]=function(_0x1d9ba3){const _0x75f71=_0x1fd1c8;VisuMZ[_0x75f71(0x228)][_0x75f71(0x255)][_0x75f71(0x206)](this,_0x1d9ba3),this[_0x75f71(0x2aa)](),this[_0x75f71(0x1a7)]();},Game_Event['prototype'][_0x1fd1c8(0x2aa)]=function(){const _0x370f38=_0x1fd1c8,_0x159df8=SceneManager['_scene'];if(!_0x159df8)return;const _0x33bfc3=_0x159df8[_0x370f38(0x212)];if(!_0x33bfc3)return;const _0x2197bb=new Sprite_CompassIcon(this);_0x2197bb[_0x370f38(0x1d4)](),_0x33bfc3[_0x370f38(0x1a4)][_0x370f38(0x21e)](_0x2197bb),_0x33bfc3['addChild'](_0x2197bb),_0x33bfc3['addChild'](_0x33bfc3[_0x370f38(0x1da)]);},Game_Event[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1a7)]=function(){const _0x190a59=_0x1fd1c8,_0x587736=SceneManager[_0x190a59(0x25f)];if(!_0x587736)return;const _0x1dd33d=_0x587736[_0x190a59(0x1f8)];if(!_0x1dd33d)return;const _0x3533a6=new Sprite_CompassIcon(this);_0x3533a6[_0x190a59(0x25e)](_0x1dd33d[_0x190a59(0x2a1)]),_0x3533a6[_0x190a59(0x1d4)](),_0x1dd33d[_0x190a59(0x1a4)]['push'](_0x3533a6),_0x1dd33d[_0x190a59(0x1f5)]['addChild'](_0x3533a6),_0x1dd33d['_characterContainer'][_0x190a59(0x1ee)](_0x1dd33d[_0x190a59(0x1da)]);},VisuMZ['ProximityCompass'][_0x1fd1c8(0x226)]=Scene_Map[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x230)],Scene_Map[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x230)]=function(){const _0x2a253b=_0x1fd1c8;VisuMZ[_0x2a253b(0x228)]['Scene_Map_createSpriteset'][_0x2a253b(0x206)](this),this[_0x2a253b(0x1a6)](),this[_0x2a253b(0x25d)]();},Scene_Map[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1a6)]=function(){const _0x46b681=_0x1fd1c8;if(this[_0x46b681(0x192)]!==Scene_Map)return;this['_ProximityCompassSprite']=new Sprite_ProximityCompass(),this[_0x46b681(0x1ee)](this[_0x46b681(0x212)]);},Scene_Map[_0x1fd1c8(0x2a6)]['createProximityScreenMinimap']=function(){const _0x23a367=_0x1fd1c8;if(this[_0x23a367(0x192)]!==Scene_Map)return;if($gameMap[_0x23a367(0x1b2)]())return;this['_ProximityMinimap']=new Sprite_ProximityMinimap(),this[_0x23a367(0x1ee)](this['_ProximityMinimap']);},VisuMZ[_0x1fd1c8(0x228)]['Scene_Map_updateMain']=Scene_Map[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1be)],Scene_Map[_0x1fd1c8(0x2a6)]['updateMain']=function(){const _0x117448=_0x1fd1c8;VisuMZ['ProximityCompass']['Scene_Map_updateMain'][_0x117448(0x206)](this),this[_0x117448(0x205)]();},Scene_Map[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x205)]=function(){const _0x55a255=_0x1fd1c8,_0x1d51de=VisuMZ[_0x55a255(0x228)][_0x55a255(0x1a5)][_0x55a255(0x2a5)][_0x55a255(0x236)];if(Input[_0x55a255(0x235)](_0x1d51de)){const _0x55cd5e=!$gameSystem[_0x55a255(0x232)]();$gameSystem['setLargeMinimapMode'](_0x55cd5e);}},VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x282)]=Scene_Options[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1c5)],Scene_Options[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1c5)]=function(){const _0x245e6e=_0x1fd1c8;let _0xd798bd=VisuMZ[_0x245e6e(0x228)]['Scene_Options_maxCommands'][_0x245e6e(0x206)](this);const _0x1cfd62=VisuMZ[_0x245e6e(0x228)]['Settings'][_0x245e6e(0x24c)];if(_0x1cfd62[_0x245e6e(0x1e6)]){if(_0x1cfd62['AddShowOption'])_0xd798bd++;if(_0x1cfd62[_0x245e6e(0x278)])_0xd798bd++;}return _0xd798bd;};function Sprite_ProximityCompass(){const _0x1abe7b=_0x1fd1c8;this[_0x1abe7b(0x292)]['apply'](this,arguments);}Sprite_ProximityCompass[_0x1fd1c8(0x2a6)]=Object[_0x1fd1c8(0x2b6)](Sprite_Clickable['prototype']),Sprite_ProximityCompass[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x192)]=Sprite_ProximityCompass,Sprite_ProximityCompass[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x292)]=function(){const _0x4502d6=_0x1fd1c8;Sprite_Clickable[_0x4502d6(0x2a6)][_0x4502d6(0x292)][_0x4502d6(0x206)](this),this[_0x4502d6(0x1b5)](),this[_0x4502d6(0x280)]();},Sprite_ProximityCompass[_0x1fd1c8(0x2a6)]['initMembers']=function(){const _0x4f0164=_0x1fd1c8;this['x']=eval(VisuMZ[_0x4f0164(0x228)][_0x4f0164(0x1a5)][_0x4f0164(0x270)]['CenterX']),this['y']=eval(VisuMZ[_0x4f0164(0x228)][_0x4f0164(0x1a5)][_0x4f0164(0x270)][_0x4f0164(0x1cb)]),this[_0x4f0164(0x227)]['x']=0.5,this[_0x4f0164(0x227)]['y']=0.5,this[_0x4f0164(0x289)]=0x2,!this['isShow']()&&(this['opacity']=0x0),this[_0x4f0164(0x27d)]['x']=ConfigManager[_0x4f0164(0x2b8)]*0.01,this['scale']['y']=ConfigManager[_0x4f0164(0x2b8)]*0.01,this[_0x4f0164(0x211)]=this[_0x4f0164(0x294)]()?0xff:0x0;},Sprite_ProximityCompass[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x280)]=function(){const _0x222c33=_0x1fd1c8;this[_0x222c33(0x247)](),this[_0x222c33(0x240)](),this[_0x222c33(0x242)](),this[_0x222c33(0x290)](),this[_0x222c33(0x24b)](),this['update']();},Sprite_ProximityCompass[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x247)]=function(){const _0x536f56=_0x1fd1c8;this[_0x536f56(0x198)]=new Sprite(),this[_0x536f56(0x1ee)](this[_0x536f56(0x198)]),this[_0x536f56(0x198)][_0x536f56(0x227)]['x']=0.5,this[_0x536f56(0x198)][_0x536f56(0x227)]['y']=0.5;const _0x5a7103=VisuMZ['ProximityCompass'][_0x536f56(0x1a5)]['Compass'],_0x44ebe6=_0x5a7103['Radius'];var _0x238228=_0x44ebe6*0x2,_0x1be7b2=_0x44ebe6*0x2,_0x5ecb92=_0x5a7103[_0x536f56(0x213)];const _0x4d5bfc=new Bitmap(_0x238228,_0x1be7b2);_0x4d5bfc['paintOpacity']=_0x5a7103[_0x536f56(0x1bd)],_0x4d5bfc[_0x536f56(0x275)](_0x238228/0x2,_0x1be7b2/0x2,_0x238228/0x2,_0x5ecb92),this['_ProximityCompassBackgroundSprite'][_0x536f56(0x251)]=_0x4d5bfc;},Sprite_ProximityCompass['prototype']['createMinimap']=function(){const _0x57f8b4=_0x1fd1c8;if($gameMap[_0x57f8b4(0x1b2)]())return;const _0xc98b91=VisuMZ['ProximityCompass'][_0x57f8b4(0x1a5)][_0x57f8b4(0x270)];this[_0x57f8b4(0x18d)]=new Sprite(),this[_0x57f8b4(0x18d)]['bitmap']=ImageManager[_0x57f8b4(0x256)](),this['addChild'](this[_0x57f8b4(0x18d)]);let _0x780c66=_0xc98b91[_0x57f8b4(0x266)]*$gameMap[_0x57f8b4(0x237)]();_0x780c66/=Sprite_ProximityMinimap['TILE_SIZE'],this[_0x57f8b4(0x18d)][_0x57f8b4(0x27d)]['x']=_0x780c66,this[_0x57f8b4(0x18d)][_0x57f8b4(0x27d)]['y']=_0x780c66,this[_0x57f8b4(0x18d)][_0x57f8b4(0x211)]=Sprite_ProximityMinimap['TILE_OPACITY'];const _0x380a86=_0xc98b91[_0x57f8b4(0x199)]-0x1;this[_0x57f8b4(0x260)]=new Sprite(),this[_0x57f8b4(0x260)]['bitmap']=new Bitmap(_0x380a86*0x2,_0x380a86*0x2),this['_minimapMaskSprite'][_0x57f8b4(0x251)][_0x57f8b4(0x275)](_0x380a86,_0x380a86,_0x380a86,_0x57f8b4(0x231)),this[_0x57f8b4(0x260)][_0x57f8b4(0x227)]['x']=0.5,this[_0x57f8b4(0x260)][_0x57f8b4(0x227)]['y']=0.5,this[_0x57f8b4(0x1ee)](this['_minimapMaskSprite']),this[_0x57f8b4(0x18d)][_0x57f8b4(0x298)]=this[_0x57f8b4(0x260)];},Sprite_ProximityCompass[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x242)]=function(){const _0x374882=_0x1fd1c8,_0x13e552=$dataMap?$dataMap[_0x374882(0x291)]||'':'';if(_0x13e552['match'](/<MINIMAP IMAGE:[ ](.*)>/i)){const _0xf8bae0=RegExp['$1'][_0x374882(0x1bb)](),_0x5092fd=ImageManager['loadPicture'](_0xf8bae0);_0x5092fd[_0x374882(0x1f7)](this[_0x374882(0x26f)][_0x374882(0x1b8)](this,_0x5092fd));}},Sprite_ProximityCompass['prototype'][_0x1fd1c8(0x26f)]=function(_0x5c7fd2){const _0x26739d=_0x1fd1c8,_0x21e9c1=this[_0x26739d(0x18d)][_0x26739d(0x251)],_0x1f6e98=_0x21e9c1['width']/($gameMap[_0x26739d(0x1dd)]()?0x3:0x1),_0x157e8a=_0x21e9c1[_0x26739d(0x28e)]/($gameMap[_0x26739d(0x197)]()?0x3:0x1),_0x132753=_0x1f6e98/_0x5c7fd2[_0x26739d(0x254)],_0x590a06=_0x157e8a/_0x5c7fd2[_0x26739d(0x28e)],_0x4028ed=$gameMap[_0x26739d(0x1dd)]()?0x2:0x0,_0x4de3e3=$gameMap[_0x26739d(0x197)]()?0x2:0x0;for(let _0x35291e=0x0;_0x35291e<=_0x4028ed;_0x35291e++){for(let _0x4465bd=0x0;_0x4465bd<=_0x4de3e3;_0x4465bd++){const _0x298c27=new Sprite();_0x298c27[_0x26739d(0x251)]=_0x5c7fd2,this[_0x26739d(0x18d)][_0x26739d(0x1ee)](_0x298c27),_0x298c27[_0x26739d(0x27d)]['x']=_0x132753,_0x298c27['scale']['y']=_0x590a06,_0x298c27['x']=_0x1f6e98*_0x35291e,_0x298c27['y']=_0x157e8a*_0x4465bd;}}this[_0x26739d(0x18d)][_0x26739d(0x251)]=new Bitmap(0x1,0x1);},Sprite_ProximityCompass[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x290)]=function(){const _0x1fc687=_0x1fd1c8;this[_0x1fc687(0x1c2)]=new Sprite(),this[_0x1fc687(0x1ee)](this[_0x1fc687(0x1c2)]),this[_0x1fc687(0x1c2)][_0x1fc687(0x227)]['x']=0.5,this[_0x1fc687(0x1c2)][_0x1fc687(0x227)]['y']=0.5;const _0x2c4d53=this[_0x1fc687(0x224)]();;_0x2c4d53?this[_0x1fc687(0x1c2)][_0x1fc687(0x251)]=ImageManager[_0x1fc687(0x29c)](_0x2c4d53):this[_0x1fc687(0x1c2)][_0x1fc687(0x251)]=ImageManager[_0x1fc687(0x284)];},Sprite_ProximityCompass[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x224)]=function(){const _0x4c7685=_0x1fd1c8;return this[_0x4c7685(0x18d)]?Sprite_ProximityMinimap['COMPASS_FRAME']||VisuMZ[_0x4c7685(0x228)][_0x4c7685(0x1a5)][_0x4c7685(0x270)][_0x4c7685(0x1b3)]:VisuMZ[_0x4c7685(0x228)][_0x4c7685(0x1a5)][_0x4c7685(0x270)][_0x4c7685(0x1b3)];},Sprite_ProximityCompass[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x24b)]=function(){const _0x2032f1=_0x1fd1c8;this[_0x2032f1(0x1a4)]=[];for(const _0x5b434d of $gameMap[_0x2032f1(0x1db)]()){if(!_0x5b434d)continue;this['_characterSprites'][_0x2032f1(0x21e)](new Sprite_CompassIcon(_0x5b434d));}this['_playerSprite']=new Sprite_CompassIcon($gamePlayer),this[_0x2032f1(0x1a4)]['push'](this['_playerSprite']);for(const _0x307ccd of this['_characterSprites']){this[_0x2032f1(0x1ee)](_0x307ccd);}this['addChild'](this[_0x2032f1(0x1da)]);},Sprite_ProximityCompass[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1d4)]=function(){const _0x375d35=_0x1fd1c8;Sprite_Clickable[_0x375d35(0x2a6)][_0x375d35(0x1d4)][_0x375d35(0x206)](this),this[_0x375d35(0x1ab)](),this[_0x375d35(0x1e5)]();},Sprite_ProximityCompass[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1ab)]=function(){const _0x856057=_0x1fd1c8,_0x553a5f=VisuMZ[_0x856057(0x228)][_0x856057(0x1a5)][_0x856057(0x270)],_0x36b7dc=_0x553a5f[_0x856057(0x1c4)];if(this[_0x856057(0x294)]()){if($gamePlayer['isCloseToCompassScreenPosition']()){const _0x4b50d2=_0x553a5f[_0x856057(0x1f3)]??0x80;this[_0x856057(0x211)]=(this[_0x856057(0x211)]-_0x36b7dc)[_0x856057(0x27b)](_0x4b50d2,0xff);}else this[_0x856057(0x211)]+=_0x36b7dc;}else this[_0x856057(0x211)]-=_0x36b7dc;},Sprite_ProximityCompass[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x294)]=function(){const _0x5895d4=_0x1fd1c8,_0x2db08e=VisuMZ[_0x5895d4(0x228)][_0x5895d4(0x1a5)]['Compass'];if($gameMap[_0x5895d4(0x28c)]())return![];else{if(_0x2db08e[_0x5895d4(0x1cc)]&&$gameMessage[_0x5895d4(0x1aa)]())return![];else{if(_0x2db08e[_0x5895d4(0x203)]&&$gameMap[_0x5895d4(0x261)]())return![];else return this['_minimapSprite']&&$gameSystem[_0x5895d4(0x232)]()?![]:$gameSystem[_0x5895d4(0x24d)]();}}},Sprite_ProximityCompass[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1e5)]=function(){const _0x1af74b=_0x1fd1c8;if(!this[_0x1af74b(0x18d)])return;const _0x3bed40=VisuMZ[_0x1af74b(0x228)][_0x1af74b(0x1a5)][_0x1af74b(0x270)];let _0x582c88=_0x3bed40['TileScale']*$gameMap['tileWidth'](),_0x48d23a=$gamePlayer[_0x1af74b(0x295)]+0.5;if($gameMap[_0x1af74b(0x1dd)]())_0x48d23a+=$gameMap[_0x1af74b(0x254)]();let _0x5861c1=$gamePlayer[_0x1af74b(0x2a9)]+0.5;if($gameMap[_0x1af74b(0x197)]())_0x5861c1+=$gameMap[_0x1af74b(0x28e)]();this['_minimapSprite']['x']=_0x48d23a*-_0x582c88,this['_minimapSprite']['y']=_0x5861c1*-_0x582c88;};function Sprite_ProximityMinimap(){const _0x56cbf6=_0x1fd1c8;this['initialize'][_0x56cbf6(0x1e1)](this,arguments);}Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)]=Object['create'](Sprite_Clickable['prototype']),Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x192)]=Sprite_ProximityMinimap,Sprite_ProximityMinimap['ENABLE']=VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x1a5)][_0x1fd1c8(0x2a5)]['Enable'],Sprite_ProximityMinimap[_0x1fd1c8(0x1ac)]=VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x1a5)][_0x1fd1c8(0x2a5)][_0x1fd1c8(0x1b3)]||'',Sprite_ProximityMinimap[_0x1fd1c8(0x207)]=VisuMZ['ProximityCompass'][_0x1fd1c8(0x1a5)][_0x1fd1c8(0x2a5)]['TileColor']||0x0,Sprite_ProximityMinimap['TILE_SIZE']=VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x1a5)]['Minimap']['TileSharpness']||0x8,Sprite_ProximityMinimap[_0x1fd1c8(0x259)]=VisuMZ[_0x1fd1c8(0x228)]['Settings'][_0x1fd1c8(0x2a5)]['TileOpacity']||0x80,Sprite_ProximityMinimap[_0x1fd1c8(0x27a)]=VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x1a5)][_0x1fd1c8(0x2a5)][_0x1fd1c8(0x1d2)]||![],Sprite_ProximityMinimap[_0x1fd1c8(0x20d)]=VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x1a5)][_0x1fd1c8(0x2a5)][_0x1fd1c8(0x22c)]||0x0,Sprite_ProximityMinimap[_0x1fd1c8(0x229)]=VisuMZ[_0x1fd1c8(0x228)]['Settings'][_0x1fd1c8(0x2a5)]['DefaultExplore']||![],Sprite_ProximityMinimap[_0x1fd1c8(0x250)]=VisuMZ['ProximityCompass'][_0x1fd1c8(0x1a5)]['Minimap'][_0x1fd1c8(0x19f)]||'',Sprite_ProximityMinimap[_0x1fd1c8(0x1d5)]=VisuMZ[_0x1fd1c8(0x228)]['Settings'][_0x1fd1c8(0x2a5)][_0x1fd1c8(0x238)]||0x1,Sprite_ProximityMinimap[_0x1fd1c8(0x26a)]=VisuMZ[_0x1fd1c8(0x228)]['Settings'][_0x1fd1c8(0x2a5)][_0x1fd1c8(0x1ca)]||0x0,Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x292)]=function(){const _0x2a362a=_0x1fd1c8;Sprite_Clickable[_0x2a362a(0x2a6)][_0x2a362a(0x292)]['call'](this),this[_0x2a362a(0x1b5)](),this[_0x2a362a(0x280)]();},Sprite_ProximityMinimap['prototype'][_0x1fd1c8(0x1b5)]=function(){const _0x1e9ddf=_0x1fd1c8;this['x']=Math[_0x1e9ddf(0x245)](Graphics[_0x1e9ddf(0x254)]/0x2),this['y']=Math[_0x1e9ddf(0x245)](Graphics[_0x1e9ddf(0x28e)]/0x2),this[_0x1e9ddf(0x227)]['x']=0.5,this['anchor']['y']=0.5,this['opacity']=this[_0x1e9ddf(0x294)]()?0xff:0x0,this[_0x1e9ddf(0x1a2)]=-0x32,this[_0x1e9ddf(0x25a)]=-0x32;},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)]['createSprites']=function(){const _0x1fbcd0=_0x1fd1c8;this[_0x1fbcd0(0x21b)](),this['createBackground'](),this[_0x1fbcd0(0x1c7)](),this[_0x1fbcd0(0x240)](),this[_0x1fbcd0(0x1b1)](),this['drawUnexplored'](),this[_0x1fbcd0(0x225)](),this[_0x1fbcd0(0x24b)](),this[_0x1fbcd0(0x1d4)]();},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x21b)]=function(){const _0xc1303=_0x1fd1c8;if(!this[_0xc1303(0x265)]())return;const _0x54e467=Sprite_ProximityMinimap[_0xc1303(0x250)];this[_0xc1303(0x21f)]=new Sprite(),this['_pictureBackSprite']['bitmap']=ImageManager[_0xc1303(0x29c)](_0x54e467),this[_0xc1303(0x1ee)](this['_pictureBackSprite']),this[_0xc1303(0x21f)][_0xc1303(0x227)]['x']=0.5,this[_0xc1303(0x21f)]['anchor']['y']=0.5,this[_0xc1303(0x21f)]['opacity']=Sprite_ProximityMinimap[_0xc1303(0x1d5)];},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x265)]=function(){return Sprite_ProximityMinimap['BACK_FILENAME']!=='';},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x247)]=function(){const _0x2c6ea5=_0x1fd1c8,_0xec60a4=VisuMZ[_0x2c6ea5(0x228)][_0x2c6ea5(0x1a5)][_0x2c6ea5(0x270)],_0xe534f5=_0xec60a4[_0x2c6ea5(0x213)];this[_0x2c6ea5(0x1a1)]=new Sprite(),this[_0x2c6ea5(0x1ee)](this['_backgroundSprite']),this[_0x2c6ea5(0x1a1)][_0x2c6ea5(0x251)]=new Bitmap(0x1,0x1),this[_0x2c6ea5(0x1a1)][_0x2c6ea5(0x251)]['fillRect'](0x0,0x0,0x1,0x1,_0xe534f5),this[_0x2c6ea5(0x1a1)]['bitmap'][_0x2c6ea5(0x210)]=![],this[_0x2c6ea5(0x1a1)]['anchor']['x']=0.5,this[_0x2c6ea5(0x1a1)]['anchor']['y']=0.5,this[_0x2c6ea5(0x1a1)][_0x2c6ea5(0x211)]=_0xec60a4[_0x2c6ea5(0x1bd)],this[_0x2c6ea5(0x265)]()&&(this[_0x2c6ea5(0x1a1)][_0x2c6ea5(0x211)]=0x0);},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)]['createContainer']=function(){const _0x164bda=_0x1fd1c8;this['_maskContainer']=new Sprite(),this[_0x164bda(0x1ee)](this[_0x164bda(0x24a)]);},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x240)]=function(){const _0x233651=_0x1fd1c8;let _0x4e6536=![];const _0x215eb3=$dataMap?$dataMap[_0x233651(0x291)]||'':'';if(_0x215eb3[_0x233651(0x1ce)](/<MINIMAP IMAGE:[ ](.*)>/i)){const _0x1b234c=RegExp['$1'][_0x233651(0x1bb)]();this[_0x233651(0x287)](_0x1b234c),_0x4e6536=!![];}else this[_0x233651(0x1b0)]();this[_0x233651(0x18d)][_0x233651(0x227)]['x']=0.5,this[_0x233651(0x18d)][_0x233651(0x227)]['y']=0.5,this[_0x233651(0x18d)]['opacity']=Sprite_ProximityMinimap['TILE_OPACITY'];const _0x422f22=Sprite_ProximityMinimap[_0x233651(0x20d)]*0x2,_0x3d86f3=ImageManager[_0x233651(0x256)](),_0x1d4594=(Graphics[_0x233651(0x254)]-_0x422f22-0x2)/(_0x3d86f3[_0x233651(0x254)]/($gameMap[_0x233651(0x1dd)]()?0x3:0x1)),_0x6127a0=(Graphics[_0x233651(0x28e)]-_0x422f22-0x2)/(_0x3d86f3[_0x233651(0x28e)]/($gameMap[_0x233651(0x197)]()?0x3:0x1));this[_0x233651(0x2a1)]=Math[_0x233651(0x20f)](_0x1d4594,_0x6127a0),!_0x4e6536&&(this[_0x233651(0x18d)][_0x233651(0x27d)]['x']=this[_0x233651(0x2a1)],this[_0x233651(0x18d)]['scale']['y']=this['_minimapScale']);},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x287)]=function(_0x1f3581){const _0x48b21a=_0x1fd1c8;this[_0x48b21a(0x18d)]=new Sprite(),this[_0x48b21a(0x18d)][_0x48b21a(0x251)]=ImageManager[_0x48b21a(0x29c)](_0x1f3581),this[_0x48b21a(0x24a)][_0x48b21a(0x1ee)](this[_0x48b21a(0x18d)]),this['_minimapSprite'][_0x48b21a(0x251)][_0x48b21a(0x1f7)](this[_0x48b21a(0x1e4)][_0x48b21a(0x1b8)](this));},Sprite_ProximityMinimap['prototype'][_0x1fd1c8(0x1e4)]=function(){const _0x4cbc5f=_0x1fd1c8,_0x119187=Sprite_ProximityMinimap[_0x4cbc5f(0x20d)]*0x2,_0x4c32f2=(Graphics[_0x4cbc5f(0x254)]-_0x119187-0x2)/this[_0x4cbc5f(0x18d)][_0x4cbc5f(0x254)],_0x2cdb6c=(Graphics[_0x4cbc5f(0x28e)]-_0x119187-0x2)/this[_0x4cbc5f(0x18d)][_0x4cbc5f(0x28e)],_0x39cd38=Math[_0x4cbc5f(0x20f)](_0x4c32f2,_0x2cdb6c);this[_0x4cbc5f(0x18d)][_0x4cbc5f(0x27d)]['x']=_0x39cd38,this['_minimapSprite'][_0x4cbc5f(0x27d)]['y']=_0x39cd38;},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)]['createDefaultMinimap']=function(){const _0x3556c0=_0x1fd1c8;this[_0x3556c0(0x18d)]=new Sprite(),this['_minimapSprite']['bitmap']=ImageManager[_0x3556c0(0x256)](),this[_0x3556c0(0x24a)][_0x3556c0(0x1ee)](this[_0x3556c0(0x18d)]);const _0x21c569=$gameMap['width']()*Sprite_ProximityMinimap[_0x3556c0(0x193)],_0x29ff1c=$gameMap[_0x3556c0(0x28e)]()*Sprite_ProximityMinimap[_0x3556c0(0x193)],_0x10cd23=$gameMap[_0x3556c0(0x1dd)]()?_0x21c569:0x0,_0x203a3b=$gameMap[_0x3556c0(0x197)]()?_0x29ff1c:0x0;this[_0x3556c0(0x18d)][_0x3556c0(0x29e)](_0x10cd23,_0x203a3b,_0x21c569,_0x29ff1c);if(this[_0x3556c0(0x265)]()){const _0x32422d=Sprite_ProximityMinimap[_0x3556c0(0x26a)];this['_minimapSprite'][_0x3556c0(0x289)]=_0x32422d;}},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1b1)]=function(){const _0x398826=_0x1fd1c8;this['_unexploredMask']=new Sprite(),this[_0x398826(0x258)][_0x398826(0x251)]=new Bitmap($gameMap[_0x398826(0x254)](),$gameMap['height']()),this[_0x398826(0x258)][_0x398826(0x251)][_0x398826(0x210)]=ImageManager['getPassabilityMinimap']()[_0x398826(0x210)],this['_maskContainer'][_0x398826(0x1ee)](this[_0x398826(0x258)]),this[_0x398826(0x24a)]['mask']=this[_0x398826(0x258)],this[_0x398826(0x258)][_0x398826(0x227)]['x']=0.5,this[_0x398826(0x258)][_0x398826(0x227)]['y']=0.5,this['_unexploredMask'][_0x398826(0x27d)]['x']=this[_0x398826(0x2a1)]*Sprite_ProximityMinimap[_0x398826(0x193)],this['_unexploredMask'][_0x398826(0x27d)]['y']=this[_0x398826(0x2a1)]*Sprite_ProximityMinimap['TILE_SIZE'];},Sprite_ProximityMinimap['prototype']['drawUnexplored']=function(){const _0x56c55c=_0x1fd1c8;if(!this[_0x56c55c(0x258)])return;if(!$gameMap[_0x56c55c(0x286)]()){this[_0x56c55c(0x258)][_0x56c55c(0x251)]['fillRect'](0x0,0x0,$gameMap[_0x56c55c(0x254)](),$gameMap[_0x56c55c(0x28e)](),_0x56c55c(0x231));return;}const _0x2ac94a=$gameMap[_0x56c55c(0x1c8)]($gameMap[_0x56c55c(0x23c)]());for(const _0x15cc05 of _0x2ac94a){const _0x2261ee=_0x15cc05[_0x56c55c(0x29a)](',')[_0x56c55c(0x19a)](_0x1eff97=>Number(_0x1eff97)||0x0);this[_0x56c55c(0x1c9)](_0x2261ee[0x0],_0x2261ee[0x1]);}},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x225)]=function(){const _0x1ec205=_0x1fd1c8,_0x2dafa5=0x2,_0x367440=Math['ceil'](this[_0x1ec205(0x2a1)]*this[_0x1ec205(0x18d)]['width'])+_0x2dafa5,_0x5da84e=Math[_0x1ec205(0x297)](this[_0x1ec205(0x2a1)]*this['_minimapSprite'][_0x1ec205(0x28e)])+_0x2dafa5;this['_backgroundSprite'][_0x1ec205(0x27d)]['x']=_0x367440,this[_0x1ec205(0x1a1)]['scale']['y']=_0x5da84e;},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)]['createCharacters']=function(){const _0x566572=_0x1fd1c8;this[_0x566572(0x1a4)]=[],this[_0x566572(0x1f5)]=new Sprite(),this['_maskContainer'][_0x566572(0x1ee)](this[_0x566572(0x1f5)]);for(const _0x8ba715 of $gameMap[_0x566572(0x1db)]()){if(!_0x8ba715)continue;const _0x11e0fa=new Sprite_CompassIcon(_0x8ba715);_0x11e0fa[_0x566572(0x25e)](this[_0x566572(0x2a1)]),this[_0x566572(0x1a4)][_0x566572(0x21e)](_0x11e0fa);}this[_0x566572(0x1da)]=new Sprite_CompassIcon($gamePlayer),this[_0x566572(0x1da)][_0x566572(0x25e)](this[_0x566572(0x2a1)]),this['_characterSprites'][_0x566572(0x21e)](this[_0x566572(0x1da)]);for(const _0x4f6249 of this[_0x566572(0x1a4)]){this['_characterContainer'][_0x566572(0x1ee)](_0x4f6249);}this[_0x566572(0x1f5)][_0x566572(0x1ee)](this[_0x566572(0x1da)]);},Sprite_ProximityMinimap['prototype'][_0x1fd1c8(0x1d4)]=function(){const _0x55bebe=_0x1fd1c8;Sprite_Clickable[_0x55bebe(0x2a6)][_0x55bebe(0x1d4)]['call'](this),this[_0x55bebe(0x1ab)](),this[_0x55bebe(0x2ae)]();},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1ab)]=function(){const _0x1f70c5=_0x1fd1c8,_0x2779d0=VisuMZ[_0x1f70c5(0x228)][_0x1f70c5(0x1a5)]['Compass'],_0x323bb1=_0x2779d0[_0x1f70c5(0x1c4)];this[_0x1f70c5(0x294)]()?this['opacity']+=_0x323bb1:this[_0x1f70c5(0x211)]-=_0x323bb1;},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x294)]=function(){const _0x2e4ab3=_0x1fd1c8,_0x1114cc=VisuMZ[_0x2e4ab3(0x228)][_0x2e4ab3(0x1a5)]['Minimap'];if($gameMap[_0x2e4ab3(0x28c)]())return![];else{if(_0x1114cc['HideMessage']&&$gameMessage[_0x2e4ab3(0x1aa)]())return![];else{if(_0x1114cc[_0x2e4ab3(0x203)]&&$gameMap[_0x2e4ab3(0x261)]())return![];else return!$gameSystem[_0x2e4ab3(0x232)]()?![]:$gameSystem['isShowProximityCompass']();}}},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x2ae)]=function(){const _0x4a6283=_0x1fd1c8;if(!this[_0x4a6283(0x258)])return;if(!$gameMap[_0x4a6283(0x286)]())return;if($gamePlayer['x']===this[_0x4a6283(0x1a2)]&&$gamePlayer['y']===this[_0x4a6283(0x25a)])return;const _0x1da097=$gamePlayer['x'],_0x135da7=$gamePlayer['y'];this[_0x4a6283(0x1a2)]=_0x1da097,this[_0x4a6283(0x25a)]=_0x135da7;const _0x516563=$gameMap[_0x4a6283(0x23c)]();$gameMap['registerMinimapExploredTiles'](_0x516563,_0x1da097,_0x135da7),this[_0x4a6283(0x1c9)](_0x1da097,_0x135da7);},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1c9)]=function(_0x22797e,_0xacf6f5){const _0x13bbb7=_0x1fd1c8;if(!this[_0x13bbb7(0x258)])return;const _0x109eee=this[_0x13bbb7(0x258)][_0x13bbb7(0x251)],_0x19831d=Math[_0x13bbb7(0x297)](Graphics['width']/$gameMap['tileWidth']()),_0x5cce30=Math[_0x13bbb7(0x297)](Graphics[_0x13bbb7(0x28e)]/$gameMap[_0x13bbb7(0x19b)]()),_0x5c78fc=Math[_0x13bbb7(0x297)](_0x19831d/0x2),_0x5c206a=Math[_0x13bbb7(0x297)](_0x5cce30/0x2);let _0x26e24a=_0x22797e-_0x5c78fc,_0x4c5227=_0xacf6f5-_0x5c206a;!$gameMap['isLoopHorizontal']()&&(_0x26e24a=Math[_0x13bbb7(0x23e)](_0x26e24a,0x0),_0x26e24a=Math[_0x13bbb7(0x20f)](_0x26e24a,$gameMap[_0x13bbb7(0x254)]()-_0x19831d));!$gameMap[_0x13bbb7(0x197)]()&&(_0x4c5227=Math['max'](_0x4c5227,0x0),_0x4c5227=Math[_0x13bbb7(0x20f)](_0x4c5227,$gameMap[_0x13bbb7(0x28e)]()-_0x5cce30));_0x109eee[_0x13bbb7(0x19c)](_0x26e24a,_0x4c5227,_0x19831d,_0x5cce30,_0x13bbb7(0x231));const _0x15ac40=_0x26e24a;if($gameMap[_0x13bbb7(0x1dd)]()){if(_0x26e24a<0x0)_0x26e24a+=$gameMap[_0x13bbb7(0x254)]();else _0x26e24a>$gameMap[_0x13bbb7(0x254)]()-_0x19831d&&(_0x26e24a-=$gameMap['width']());_0x109eee[_0x13bbb7(0x19c)](_0x26e24a,_0x4c5227,_0x19831d,_0x5cce30,_0x13bbb7(0x231));}if($gameMap['isLoopVertical']()){if(_0x4c5227<0x0)_0x4c5227+=$gameMap[_0x13bbb7(0x28e)]();else _0x4c5227>$gameMap['height']()-_0x5cce30&&(_0x4c5227-=$gameMap['height']());_0x109eee[_0x13bbb7(0x19c)](_0x26e24a,_0x4c5227,_0x19831d,_0x5cce30,_0x13bbb7(0x231));}$gameMap[_0x13bbb7(0x1dd)]()&&$gameMap['isLoopVertical']()&&_0x26e24a!==_0x15ac40&&_0x109eee[_0x13bbb7(0x19c)](_0x15ac40,_0x4c5227,_0x19831d,_0x5cce30,'white');},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)]['clearUnexploredMask']=function(){const _0x1433f0=_0x1fd1c8;if(!this[_0x1433f0(0x258)])return;const _0x3ac6ce=this[_0x1433f0(0x258)]['bitmap'];_0x3ac6ce[_0x1433f0(0x19e)](),this[_0x1433f0(0x1a2)]=-0x32,this['_lastPlayerY']=-0x32,this[_0x1433f0(0x2ae)]();},Sprite_ProximityMinimap[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1ff)]=function(){const _0x997aed=_0x1fd1c8;if(!this[_0x997aed(0x258)])return;const _0x439cf4=this['_unexploredMask']['bitmap'];_0x439cf4[_0x997aed(0x19c)](0x0,0x0,_0x439cf4[_0x997aed(0x254)],_0x439cf4[_0x997aed(0x28e)],'white');};function Sprite_CompassIcon(){const _0x3cfa8f=_0x1fd1c8;this['initialize'][_0x3cfa8f(0x1e1)](this,arguments);}Sprite_CompassIcon['prototype']=Object[_0x1fd1c8(0x2b6)](Sprite[_0x1fd1c8(0x2a6)]),Sprite_CompassIcon[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x192)]=Sprite_CompassIcon,Sprite_CompassIcon[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x292)]=function(_0x36d635){const _0x5a1370=_0x1fd1c8;this[_0x5a1370(0x285)]=_0x36d635,this[_0x5a1370(0x2b2)]=0x0,Sprite[_0x5a1370(0x2a6)][_0x5a1370(0x292)][_0x5a1370(0x206)](this),this[_0x5a1370(0x1b5)](),this[_0x5a1370(0x262)](),this[_0x5a1370(0x2a7)]();},Sprite_CompassIcon[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1b5)]=function(){const _0x21b9fb=_0x1fd1c8;this[_0x21b9fb(0x227)]['x']=0.5,this[_0x21b9fb(0x227)]['y']=0.5;var _0x388e17=0x1/(ConfigManager[_0x21b9fb(0x2b8)]*0.01);this[_0x21b9fb(0x27d)]['x']=_0x388e17,this[_0x21b9fb(0x27d)]['y']=_0x388e17,this['_largeMinimapChild']=![],this[_0x21b9fb(0x1fc)]=0x1;},Sprite_CompassIcon[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x262)]=function(){const _0x41784c=_0x1fd1c8;this[_0x41784c(0x251)]=ImageManager[_0x41784c(0x191)](_0x41784c(0x29d));},Sprite_CompassIcon['prototype'][_0x1fd1c8(0x2a7)]=function(){const _0xb698b3=_0x1fd1c8;if(this[_0xb698b3(0x285)]===$gamePlayer)this[_0xb698b3(0x211)]=0xff;else{var _0x458679=this['getCompassProximity'](),_0x1655ab=$gameMap['deltaX'](this[_0xb698b3(0x285)][_0xb698b3(0x295)],$gamePlayer[_0xb698b3(0x295)]),_0x20fd2c=$gameMap[_0xb698b3(0x21c)](this['_character'][_0xb698b3(0x2a9)],$gamePlayer[_0xb698b3(0x2a9)]);_0x458679>=Math['abs'](_0x1655ab)+Math['abs'](_0x20fd2c)?this['opacity']=0xff:this['opacity']=0x0;}},Sprite_CompassIcon[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x283)]=function(){const _0x2a9440=_0x1fd1c8;if(this[_0x2a9440(0x1b7)]()){if(VisuMZ[_0x2a9440(0x228)][_0x2a9440(0x1a5)][_0x2a9440(0x2a5)][_0x2a9440(0x1ec)])return 0xf4240;}return this[_0x2a9440(0x285)]?this['_character'][_0x2a9440(0x1cd)]:0x1;},Sprite_CompassIcon[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x25e)]=function(_0x9a56fc){const _0x2ba0a4=_0x1fd1c8;this[_0x2ba0a4(0x2ad)]=!![],this[_0x2ba0a4(0x1fc)]=_0x9a56fc;},Sprite_CompassIcon['prototype'][_0x1fd1c8(0x1b7)]=function(){const _0x7cd3e3=_0x1fd1c8;return this[_0x7cd3e3(0x2ad)];},Sprite_CompassIcon[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1d4)]=function(){const _0x273cc9=_0x1fd1c8;Sprite['prototype'][_0x273cc9(0x1d4)][_0x273cc9(0x206)](this),this[_0x273cc9(0x1ab)](),this[_0x273cc9(0x1c6)](),this[_0x273cc9(0x20b)](),this[_0x273cc9(0x208)]();},Sprite_CompassIcon[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1ab)]=function(){const _0x1a42ca=_0x1fd1c8;if(this[_0x1a42ca(0x285)]===$gamePlayer)this[_0x1a42ca(0x211)]=0xff;else{if(this[_0x1a42ca(0x285)]&&this[_0x1a42ca(0x285)][_0x1a42ca(0x2a8)])this['opacity']=0x0;else{var _0x1c4afd=this[_0x1a42ca(0x283)](),_0x327eb0=$gameMap[_0x1a42ca(0x21c)](this[_0x1a42ca(0x285)][_0x1a42ca(0x295)],$gamePlayer[_0x1a42ca(0x295)]),_0x1ce7ba=$gameMap[_0x1a42ca(0x21c)](this[_0x1a42ca(0x285)][_0x1a42ca(0x2a9)],$gamePlayer[_0x1a42ca(0x2a9)]);const _0x376f71=VisuMZ['ProximityCompass'][_0x1a42ca(0x1a5)]['Compass'][_0x1a42ca(0x20a)];_0x1c4afd>=Math[_0x1a42ca(0x1a9)](_0x327eb0)+Math[_0x1a42ca(0x1a9)](_0x1ce7ba)?this[_0x1a42ca(0x211)]+=_0x376f71:this[_0x1a42ca(0x211)]-=_0x376f71;}}},Sprite_CompassIcon[_0x1fd1c8(0x2a6)]['updateFrame']=function(){const _0x4f0d24=_0x1fd1c8;this[_0x4f0d24(0x2b2)]=this[_0x4f0d24(0x2af)]();if(this[_0x4f0d24(0x2b2)]===0x0)this['setFrame'](0x0,0x0,0x0,0x0);else{var _0x4c7e26=ImageManager[_0x4f0d24(0x2a2)],_0x5d8eda=ImageManager[_0x4f0d24(0x1fe)],_0xf50acb=this[_0x4f0d24(0x2b2)]%0x10*_0x4c7e26,_0x35dfc1=Math[_0x4f0d24(0x2b1)](this[_0x4f0d24(0x2b2)]/0x10)*_0x5d8eda;this['setFrame'](_0xf50acb,_0x35dfc1,_0x4c7e26,_0x5d8eda);}},Sprite_CompassIcon[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x2af)]=function(){const _0x4ef958=_0x1fd1c8;if(this[_0x4ef958(0x285)]===$gamePlayer)return $gameSystem[_0x4ef958(0x264)]();else return this[_0x4ef958(0x1b7)]()?this[_0x4ef958(0x285)][_0x4ef958(0x23b)]||this['_character'][_0x4ef958(0x233)]:this[_0x4ef958(0x285)][_0x4ef958(0x23b)];},Sprite_CompassIcon['prototype']['updatePosition']=function(){const _0x574220=_0x1fd1c8;if(this[_0x574220(0x1b7)]())this['updatePositionMinimapLarge']();else this['isMinimapSprite']()?this[_0x574220(0x194)]():this[_0x574220(0x1f4)]();},Sprite_CompassIcon[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x253)]=function(){const _0x4137d6=_0x1fd1c8;return this['parent']&&this['parent'][_0x4137d6(0x18d)];},Sprite_CompassIcon[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1f4)]=function(){const _0x5b0857=_0x1fd1c8,_0x364bbd=VisuMZ['ProximityCompass'][_0x5b0857(0x1a5)][_0x5b0857(0x270)];var _0x5337c5=_0x364bbd[_0x5b0857(0x199)],_0x328bb2=_0x364bbd[_0x5b0857(0x266)]*$gameMap['tileWidth'](),_0x32d8cc=$gameMap['deltaX'](this[_0x5b0857(0x285)][_0x5b0857(0x295)],$gamePlayer['_realX'])*_0x328bb2,_0x3956ad=$gameMap[_0x5b0857(0x21c)](this['_character']['_realY'],$gamePlayer[_0x5b0857(0x2a9)])*_0x328bb2,_0x34a69d=Math[_0x5b0857(0x20c)](_0x32d8cc*_0x32d8cc+_0x3956ad*_0x3956ad);if(_0x34a69d<_0x5337c5)this['x']=Math[_0x5b0857(0x245)](_0x32d8cc),this['y']=Math['round'](_0x3956ad);else{var _0x5bdab6=Math[_0x5b0857(0x1d0)](_0x3956ad,_0x32d8cc);this['x']=Math[_0x5b0857(0x245)](_0x5337c5*Math[_0x5b0857(0x288)](_0x5bdab6)),this['y']=Math[_0x5b0857(0x245)](_0x5337c5*Math['sin'](_0x5bdab6));}},Sprite_CompassIcon[_0x1fd1c8(0x2a6)]['updatePositionMinimapSmall']=function(){const _0x21a047=_0x1fd1c8,_0x4f5eb3=VisuMZ[_0x21a047(0x228)][_0x21a047(0x1a5)][_0x21a047(0x270)],_0x550178=_0x4f5eb3[_0x21a047(0x199)],_0x53bb4c=_0x4f5eb3[_0x21a047(0x266)]*$gameMap[_0x21a047(0x237)](),_0x465070=$gameMap[_0x21a047(0x21c)](this[_0x21a047(0x285)]['_realX'],$gamePlayer[_0x21a047(0x295)])*_0x53bb4c,_0x37a343=$gameMap['deltaX'](this[_0x21a047(0x285)][_0x21a047(0x2a9)],$gamePlayer['_realY'])*_0x53bb4c,_0x7eaba=Math[_0x21a047(0x20c)](_0x465070*_0x465070+_0x37a343*_0x37a343);this['x']=Math[_0x21a047(0x245)](_0x465070),this['y']=Math['round'](_0x37a343);if(_0x7eaba>=_0x550178){const _0x279bb7=_0x465070[_0x21a047(0x27b)](-_0x550178,_0x550178),_0x35252=_0x37a343[_0x21a047(0x27b)](-_0x550178,_0x550178),_0x1a55e6=Math[_0x21a047(0x1d0)](_0x35252,_0x279bb7),_0x5d5d78=Math[_0x21a047(0x288)](_0x1a55e6)*_0x550178,_0x461737=Math[_0x21a047(0x1a8)](_0x1a55e6)*_0x550178;this['x']=Math[_0x21a047(0x245)](_0x465070)['clamp'](-_0x5d5d78,_0x5d5d78),this['y']=Math['round'](_0x37a343)['clamp'](-_0x461737,_0x461737);}},Sprite_CompassIcon['prototype'][_0x1fd1c8(0x1fd)]=function(){const _0x2d523c=_0x1fd1c8,_0x132e71=$gameMap[_0x2d523c(0x254)](),_0x343269=$gameMap[_0x2d523c(0x28e)](),_0x72c8d7=this[_0x2d523c(0x1fc)];let _0x3f6092=this[_0x2d523c(0x285)][_0x2d523c(0x295)]+0.5,_0x4e172f=this[_0x2d523c(0x285)]['_realY']+0.5;const _0x478bda=Sprite_ProximityMinimap[_0x2d523c(0x193)]*_0x72c8d7;_0x3f6092*=_0x478bda,_0x4e172f*=_0x478bda,_0x3f6092-=_0x132e71/0x2*_0x478bda,_0x4e172f-=_0x343269/0x2*_0x478bda,this['x']=_0x3f6092,this['y']=_0x4e172f;},Sprite_CompassIcon[_0x1fd1c8(0x2a6)]['updateScale']=function(){const _0x373662=_0x1fd1c8;let _0x55b355=0x1/(ConfigManager['compassSize']*0.01);if(this['isLargeMinimapChild']()){const _0x5dbac0=VisuMZ[_0x373662(0x228)][_0x373662(0x1a5)][_0x373662(0x2a5)];if(this[_0x373662(0x285)]===$gamePlayer)_0x55b355*=_0x5dbac0[_0x373662(0x1e2)];else{if(this[_0x373662(0x285)][_0x373662(0x23b)]>0x0)_0x55b355*=_0x5dbac0[_0x373662(0x1f6)];else this[_0x373662(0x285)][_0x373662(0x23b)]<=0x0&&(_0x55b355*=_0x5dbac0[_0x373662(0x271)]);}}this[_0x373662(0x27d)]['x']=_0x55b355,this[_0x373662(0x27d)]['y']=_0x55b355;},VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x1f2)]=Window_Options['prototype'][_0x1fd1c8(0x221)],Window_Options[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x221)]=function(){const _0x35767a=_0x1fd1c8;VisuMZ['ProximityCompass'][_0x35767a(0x1f2)]['call'](this),this[_0x35767a(0x22d)]();},Window_Options[_0x1fd1c8(0x2a6)]['addProximityCompassCommands']=function(){const _0x206d2e=_0x1fd1c8;VisuMZ[_0x206d2e(0x228)]['Settings'][_0x206d2e(0x24c)][_0x206d2e(0x27f)]&&this['addShowProximityCompassCommand'](),VisuMZ[_0x206d2e(0x228)]['Settings']['Options']['AddSizeOption']&&this[_0x206d2e(0x18e)]();},Window_Options[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x218)]=function(){const _0xb5281c=_0x1fd1c8,_0x3c605b=TextManager[_0xb5281c(0x1d6)],_0x3e8fbd=_0xb5281c(0x1d6);this[_0xb5281c(0x1e0)](_0x3c605b,_0x3e8fbd);},Window_Options[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x18e)]=function(){const _0x231e21=_0x1fd1c8,_0x9183e6=TextManager[_0x231e21(0x2b8)],_0x3ba02a=_0x231e21(0x2b8);this['addCommand'](_0x9183e6,_0x3ba02a);},VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x2a3)]=Window_Options['prototype'][_0x1fd1c8(0x28a)],Window_Options[_0x1fd1c8(0x2a6)]['isVolumeSymbol']=function(_0x484ad8){const _0x5cecbd=_0x1fd1c8;return _0x484ad8===_0x5cecbd(0x2b8)?!![]:VisuMZ[_0x5cecbd(0x228)][_0x5cecbd(0x2a3)]['call'](this,_0x484ad8);},VisuMZ[_0x1fd1c8(0x228)][_0x1fd1c8(0x1ea)]=Window_Options[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1ba)],Window_Options[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x1ba)]=function(_0x1d5456,_0x1093eb,_0x26a108){const _0x55ec98=_0x1fd1c8;_0x1d5456===_0x55ec98(0x2b8)?this[_0x55ec98(0x196)](_0x1d5456,_0x1093eb,_0x26a108):VisuMZ[_0x55ec98(0x228)][_0x55ec98(0x1ea)][_0x55ec98(0x206)](this,_0x1d5456,_0x1093eb,_0x26a108);},Window_Options[_0x1fd1c8(0x2a6)][_0x1fd1c8(0x196)]=function(_0x4bcc5f,_0x459b69,_0x298e49){const _0x4d97d6=_0x1fd1c8,_0x4ae8c5=this['getConfigValue'](_0x4bcc5f),_0x4101af=0xa,_0x5579b0=_0x4ae8c5+(_0x459b69?_0x4101af:-_0x4101af);_0x5579b0>0x64&&_0x298e49?this[_0x4d97d6(0x26c)](_0x4bcc5f,0x32):this[_0x4d97d6(0x26c)](_0x4bcc5f,_0x5579b0['clamp'](0x32,0x64));};