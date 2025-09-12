//=============================================================================
// VisuStella MZ - Item Crafting System
// VisuMZ_2_ItemCraftingSys.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ItemCraftingSys = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemCraftingSys = VisuMZ.ItemCraftingSys || {};
VisuMZ.ItemCraftingSys.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.17] [ItemCraftingSys]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Item_Crafting_System_VisuStella_MZ
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Item crafting has become a common feature in many RPG's. However, it is not
 * a feature included by default with RPG Maker MZ. This plugin adds in a scene
 * that supports item crafting, either through the main menu, or through an
 * event initiated command.
 * 
 * Craftable items are normally all available by default, but they can be
 * barred away through switch requirements. Upon crafting items, switches can
 * also be turned on/off to make a progression system if desired.
 * 
 * Item ingredients can be items, weapons, armors, and cost gold as well.
 * Multiple ingredients can be required at a time or just one. Some items can
 * also be set to only be craftable at custom crafting areas.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds an item crafting scene to the game.
 * * Item crafting scene can be accessible from the Main Menu or through
 *   event-based Plugin Commands.
 * * Crafting ingredients can consist of items, weapons, armors, and gold.
 * * Crafting specific items can require switches to be turned on in order to
 *   be listed in the crafting list.
 * * Upon crafting specific items, they can also turn on/off other switches,
 *   making a progression system to be possible.
 * * Custom item crafting effects can occur for those who understand JavaScript
 *   to implement.
 * * This plugin can mask the names of uncrafted items, too.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Proxy Items
 * 
 * Proxy Items are temporary substitutes for another. When they are acquired
 * through crafting, they will turn into the item, weapon, or armor they are a
 * proxy for. Only the icon, name, help description, and status details will
 * match up. Everything else will remain separate such as the notetag data and
 * the ingredients list. This allows you to effectively have multiple ways to
 * craft the same item using different recipes.
 * 
 * For more details, look inside of the Notetags section for Proxy items.
 *
 * ---
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
 * VisuMZ_2_ShopCommonEvents
 * 
 * If VisuStella MZ's Shop Common Events is present, you can utilize its
 * Common Event function to trigger upon crafting items, weapons, and/or armors
 * to take the player outside of the shop and returning back.
 * 
 * The following notetags will become usable:
 * 
 *   <Once Craft Common Event: id>
 * 
 *   <Once Craft Common Event Switch: id>
 *   <Once Craft Common Event All Switches: id, id, id>
 *   <Once Craft Common Event Any Switches: id, id, id>
 * 
 *   <Repeat Craft Common Event: id>
 *
 *   <Repeat Craft Common Event Switch: id>
 *   <Repeat Craft Common Event All Switches: id, id, id>
 *   <Repeat Craft Common Event Any Switches: id, id, id>
 * 
 * The following Plugin Commands will become usable:
 * 
 *   Scene: Common Event Return
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * === General Notetags ===
 * 
 * These notetags are used to mark the item as a craftable item or as items
 * that can only be crafted through a custom crafting list.
 *
 * ---
 *
 * <Crafting Ingredients>
 *  Item id: x
 *  Item name: x
 *  Weapon id: x
 *  Weapon name: x
 *  Armor id: x
 *  Armor name: x
 *  Gold: x
 *  Category name: x
 * </Crafting Ingredients>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Turns this item/weapon/armor into a craftable item by using the listed
 *   ingredients to craft with.
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Insert/delete any number of copies of the ingredients as needed.
 * - Replace 'id' with the item/weapon/armor ID of the ingredient to be used.
 * - Replace 'name' with the name of the item/weapon/armor/category to be used.
 * - Replace 'x' with the number of ingredients needed to be used for crafting.
 * 
 * Category Rules:
 * 
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Multiples of the same category name can be used. However, the player must
 *   select different items each time.
 * - If the selected category item already exists as a static ingredient, that
 *   item cannot be selected either.
 * 
 * Examples:
 * 
 * <Crafting Ingredients>
 *  Item 5: 1
 *  Item 6: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Item Potion: 1
 *  Item Magic Water: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon 1: 4
 *  Armor 2: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon Sword: 4
 *  Armor Hat: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Category Fruit: 2
 *  Category Meat: 3
 * </Crafting Ingredients>
 * 
 * ---
 *
 * <Custom Crafting Only>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - This item can only be crafted with custom crafting lists selected through
 *   the Plugin Command.
 *
 * ---
 * 
 * === Proxy Notetags ===
 * 
 * ---
 * 
 * <Proxy: id>
 * <Proxy: name>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - REQUIRES the most up to date VisuMZ Items and Equips Core!
 * - Turns this item, weapon, or armor into a proxy for another item, allowing
 *   you to create recipes with different ingredients in <Crafting Ingredients>
 *   notetag contents and yield the same item.
 * - The proxy item itself will take on the name, icon, and description of the
 *   original item it is supposed to represent.
 * - No other properties are carried over from the original.
 * - When viewed through the Window_ShopStatus window, the contents will
 *   reference the original item and not the proxy item.
 * - Proxy items themselves cannot be acquired. This includes event commands,
 *   item drops, or equips.
 * - When crafted, the item yielded won't be the proxy item but the item it is
 *   a proxy for.
 * - Replace 'id' with a number representing the item, weapon, or armor ID of
 *   the same item type. If the proxy is an item, this will reference an item.
 *   If the proxy is a weapon, this will reference a weapon. Same for armors.
 * - Replace 'name' with text representing the item, weapon, or armor's name.
 *   The referenced item needs to be the same item type as the proxy. Item for
 *   item, weapon for weapon, armor for armor.
 * 
 * ---
 * 
 * === Switch-Related Notetags ===
 * 
 * These notetags can make item crafting require certain switches to be on,
 * or turn switches on/off upon crafting items.
 *
 * ---
 *
 * <Crafting Show Switch: x>
 * 
 * <Crafting Show All Switches: x,x,x>
 * <Crafting Show Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the craftable item in the crafting scene.
 * - Replace 'x' with the switch ID to determine the item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - Insert as many switch ID's as needed.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting Turn On Switch: x>
 * <Crafting Turn On Switches: x,x,x>
 * 
 * <Crafting Turn Off Switch: x>
 * <Crafting Turn Off Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Upon crafting this item, turn on/off the marked switch(es).
 * - Replace 'x' with the switch ID to turn on/off.
 *
 * ---
 * 
 * === Masking-Related Notetags ===
 * 
 * These notetags can are used to determine name-masking properties for
 * uncrafted items.
 *
 * ---
 *
 * <Crafting Mask: text>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Displays the specific 'text' when the item has not yet been crafted.
 * - Replace 'text' with the text you wish to display if the item has not yet
 *   been crafted by the player.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting No Mask>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Bypasses name masking even if the item has not yet been crafted.
 *
 * ---
 * 
 * === JavaScript Notetag: Effect-Related ===
 * 
 * The following are notetags made for users with JavaScript knowledge to
 * make custom effects that occur upon crafting the item.
 *
 * ---
 *
 * <JS Crafting Effect>
 *  code
 *  code
 *  code
 * </JS Crafting Effect>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' with JavaScript code to determine what kinds of effects you
 *   want to occur upon crafting this item.
 * - The 'item' variable represents the item being crafted.
 * - The 'number' variable represents the number of items being crafted.
 *
 * ---
 * 
 * === Crafting Animation-Related Notetags ===
 * 
 * These notetags let you set custom crafting animations when a specific item,
 * weapon, or armor is crafted so that way, they don't all have to use the
 * default crafting animation from the plugin parameters.
 * 
 * ---
 * 
 * <Crafting Animation: id>
 * <Crafting Animation: id, id, id>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Plays the animation(s) when this item, weapon, or armor is crafted.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 * 
 * ---
 * 
 * <Crafting Fade Speed: x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - This determines the speed at which the item's icon fades in during the
 *   crafting animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Crafting Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item, weapon, or armor's icon during crafting instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of crafting, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Crafting Common Event Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event: id>
 * <Repeat Craft Common Event: id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_2_ShopCommonEvents!
 * - This will cause a specific Common Event to launch when crafted.
 * - Replace 'id' with a number representing the ID of the Common Event that
 *   you wish to launch upon this item being crafted.
 * - The "Once" notetag variant will only occur once when crafted.
 *   - Any subsequent purchases of the item will not launch the Common Event.
 * - The "Repeat" notetag variant will occur repeatedly when crafted.
 * - If both "Once" and "Repeat" notetags are present in the item, then the
 *   "Once" variant will take priority first. Any subsequent purchases will go
 *   to the "Repeat" variant.
 * - Any switch requirement notetags need to be met in order for either
 *   notetag to have any effect.
 * - Use the Plugin Command "Scene: Common Event Return" to return back to the
 *   last Item Crafting scene.
 *
 * ---
 * 
 * === Crafting Common Event Requirement-Related Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event Switch: id>
 * <Once Craft Common Event All Switches: id, id, id>
 * <Once Craft Common Event Any Switches: id, id, id>
 *
 * <Repeat Craft Common Event Switch: id>
 * <Repeat Craft Common Event All Switches: id, id, id>
 * <Repeat Craft Common Event Any Switches: id, id, id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires the respective Craft Common Events to have these Switches enabled
 *   in the "ON" position in order for them to launch.
 *   - "Once" variant will only affect the "Once" notetag variants.
 *   - "Repeat" variant will only affect the "Repeat" notetag variants.
 * - The "All" variant will require all listed Switch ID's to be "ON".
 * - The "Any" variant will require only one listed Switch ID to be "ON".
 * - Replace 'id' with a number representing the Switch ID that needs to be in
 *   the "ON" position for the requirement to be met.
 *   - Insert multiple 'id' to require more Switch ID's.
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
 * === Scene ===
 * 
 * ---
 *
 * Scene: Item Crafting (All)
 * - Go to the Item Crafting scene.
 * - All enabled recipes will be available.
 *
 * ---
 *
 * Scene: Item Crafting (Custom)
 * - Go to the Item Crafting scene.
 * - Select specific items to craft here.
 * - Some items can only appear through custom lists like this by using the
 *   <Custom Crafting Only> notetag.
 *
 *   Items:
 *   - Select which Item ID(s) to become craftable.
 *
 *   Weapons:
 *   - Select which Weapon ID(s) to become craftable.
 *
 *   Armors:
 *   - Select which armor ID(s) to become craftable.
 *
 *   Bypass Switches?:
 *   - Bypass any of the requirement switches?
 *
 *   Bypass Masks?:
 *   - Bypass name masking for uncrafted items?
 *
 * ---
 * 
 * Scene: Common Event Return
 * - Return to the last shop if coming from a Crafting Common Event.
 * - Requires VisuMZ_2_ShopCommonEvents!
 * 
 * ---
 * 
 * === System ===
 * 
 * ---
 *
 * System: Enable Crafting in Menu?
 * - Enables/disables Crafting menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Crafting menu inside the main menu.
 *
 * ---
 *
 * System: Show Crafting in Menu?
 * - Shows/hides Crafting menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Crafting menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings pertaining to Item Crafting.
 *
 * ---
 *
 * Scene_ItemCrafting
 * 
 *   Assist Button:
 *   - Text used to for the Button Assist Window's OK button when about ready
 *     to craft an item.
 * 
 *   Crafted Icon:
 *   - Icon used to depict of an item has already been crafted.
 * 
 *   Ingredient Bridge:
 *   - Text used to bridge ingredients in the item crafting scene.
 *
 * ---
 * 
 * Switches
 * 
 *   Switch: Craft:
 *   - Crafting items in Crafting Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Crafting Scene opens.
 * 
 * ---
 * 
 * Categories
 * 
 *   Category Title:
 *   - Text format used for display categories.
 *   - %1 - Category Name, %2 - Needed Quantity
 * 
 *   Selected Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Selected Text:
 *   - This is the add on text that is displayed after an item's name that's
 *     already an ingredient.
 * 
 *   Uncategorized Text:
 *   - Text used for an uncategorized item category.
 * 
 *   Uncategorized Icon:
 *   - Icon used for uncategorized item category.
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Owned:
 *   -Text used for how much of an item is owned.
 * 
 *   Shift:
 *   - Text used for the change in value.
 * 
 *   Net:
 *   - Text used for the net result.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Listing:
 *   - Code that is run globally across all items when checking if an item
 *     should be listed or not.
 * 
 *   JS: Craft Effect:
 *   - Code that is run globally across all items when crafted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Masking Settings
 * ============================================================================
 *
 * Masking settings related to uncrafted items.
 *
 * ---
 *
 * Masking
 * 
 *   Enable Masking:
 *   - Enable masking for uncrafted items?
 * 
 *   Italics For Masking:
 *   - Use Italics when masking?
 * 
 *   Mask Character:
 *   - Text used for masking per individual character.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Main Menu settings for Item Crafting.
 *
 * ---
 *
 * Main Menu
 * 
 *   Command Name:
 *   - Name of the 'Crafting' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Crafting' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Crafting' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Default settings for playing animations after crafting.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when crafting an item?
 * 
 *   Show Windows?:
 *   - Show windows during an item crafting animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when crafting.
 *
 * ---
 *
 * Sprite
 * 
 *   Scale:
 *   - How big do you want the item sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the item to fade in?
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Crafting Sound Settings
 * ============================================================================
 *
 * Default settings for the sound effect played when crafting an item.
 *
 * ---
 *
 * Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ItemCrafting.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   Background 2:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings pertaining to Item Crafting.
 *
 * ---
 *
 * Windows
 * 
 *   Requirement Font Size:
 *   - Font size used for requirement quantity.
 * 
 *   Show Tooltips:
 *   - Show tooltips when the mouse hovers over an ingredient?
 * 
 *   Custom Window Skin:
 *   - Select a custom window skin if you want the tooltip window to have one.
 *
 * ---
 *
 * Background Types
 * 
 *   Help Window:
 *   Category Window:
 *   Gold Window:
 *   List Window:
 *   Status Window:
 *   Ingredient Title:
 *   Ingredient List:
 *   Number Window:
 *   Button Assist Window:
 *   - Select background type for the specific window.
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
 * Version 1.17: July 14, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: May 12, 2022
 * * Compatibility Update
 * ** Compatibility with VisuMZ Shop Common Events added.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Irina and sponsored by MirageV:
 * *** <Once Craft Common Event: id>
 * *** <Repeat Craft Common Event: id>
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** This will cause a specific Common Event to launch when crafted.
 * *** <Once Craft Common Event Switch: id>
 * *** <Once Craft Common Event All Switches: id, id, id>
 * *** <Once Craft Common Event Any Switches: id, id, id>
 * *** <Repeat Craft Common Event Switch: id>
 * *** <Repeat Craft Common Event All Switches: id, id, id>
 * *** <Repeat Craft Common Event Any Switches: id, id, id>
 * **** Requires the respective Craft Common Events to have these Switches
 *      enabled in the "ON" position in order for them to launch.
 * ** New Plugin Command added by Irina and sponsored by MirageV:
 * *** Scene: Common Event Return
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** Return to the last shop if coming from a Crafting Common Event.
 * 
 * Version 1.15: April 7, 2022
 * * Feature Update!
 * ** Any disappearing categories as a result of hiding recipes after crafting
 *    an item will result in the first category being selected.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Failsafe added for situations where if the game dev decides to force an
 *    impossible situation in the Item Crafting scene (such as turning on a
 *    switch that erases all recipes), then the Item Scene will automatically
 *    exit out of it with zero prompts. Update made by Olivia.
 * 
 * Version 1.13: January 20, 2022
 * * Bug Fixes!
 * ** Tooltips for proxy items no longer show the original item's materials.
 *    Fix made by Olivia.
 * 
 * Version 1.12: December 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added Major Changes section for "Proxy Items".
 * * Feature Update!
 * ** Number window is now updated to show how much of an ingredient the player
 *    owns, how much will be consumed, and the number result of the crafting.
 * * New Features!
 * ** New notetags added by Arisu!
 * *** <Proxy: id>
 * *** <Proxy: name>
 * **** REQUIRES the most up to date VisuMZ Items and Equips Core!
 * **** Turns this item, weapon, or armor into a proxy for another item,
 *      allowing you to create recipes with different ingredients in
 *      <Crafting Ingredients> notetag contents and yield the same item.
 * **** The proxy item itself will take on the name, icon, and description of
 *      the original item it is supposed to represent.
 * **** No other properties are carried over from the original.
 * **** When viewed through the Window_ShopStatus window, the contents will
 *      reference the original item and not the proxy item.
 * **** Proxy items themselves cannot be acquired. This includes event
 *      commands, item drops, or equips.
 * **** When crafted, the item yielded won't be the proxy item but the item it
 *      is a proxy for.
 * **** Replace 'id' with a number representing the item, weapon, or armor ID
 *      of the same item type. If the proxy is an item, this will reference an
 *      item. If the proxy is a weapon, this will reference a weapon. Same for
 *      armors.
 * **** Replace 'name' with text representing the item, weapon, or armor's
 *      name. The referenced item needs to be the same item type as the proxy.
 *      Item for item, weapon for weapon, armor for armor.
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > General > Vocab > Owned
 * *** Plugin Parameters > General > Vocab > Shift
 * *** Plugin Parameters > General > Vocab > Net
 * **** These are new vocabulary terms for the new number window appearance.
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: June 25, 2021
 * * Bug Fixes!
 * ** When exiting out of the ingredients list back towards the item selection
 *    window, the help window should now be properly updated. Fix by Irina.
 * 
 * Version 1.09: March 12, 2021
 * * Bug Fixes!
 * ** Having extra spaces before an ingredient's name should no longer cause
 *    problems to information parsing. Fix made by Irina.
 * 
 * Version 1.08: March 5, 2021
 * * Feature Update!
 * ** Plugin Commands and Item Crafting Scene option will not appear if you do
 *    not have any recipes prepared at all in your game. Update made by Irina.
 * 
 * Version 1.07: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > General Settings > Switches > Switch: Craft
 * **** Crafting items in Crafting Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Crafting Scene opens.
 * **** This can be used after an "Item Crafting" plugin command to determine
 *      if the player has crafted an item or not.
 * 
 * Version 1.06: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Crafting Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      item, weapon, or armor's icon during crafting instead.
 * 
 * Version 1.05: November 29, 2020
 * * Bug Fixes!
 * ** If on-screen touch buttons are disabled, they will no longer cause crash
 *    errors. Fix made by Arisu.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 8, 2020
 * * Feature Update!
 * ** Animations are now more compatible with the sprites. Update by Irina.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Masked Names no longer show in the number input window. Fixed by Irina.
 * ** Plugin no longer requires a new game to be started in order for Item
 *    Crafting to work for the main menu. Fix made by Irina.
 * ** Touch Button for OK will no longer bypass the item requirements.
 *    Fix made by Irina.
 * ** Uncategorized items will now default to a newly created Uncategorized
 *    list of items. Fix made by Irina.
 * * Documentation Update!
 * ** Plugin Parameters > General is updated with "Uncategorized Text" and
 *    "Uncategorized Icon" for uncategorized items.
 *
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 * * Bug Fixes!
 * ** Color matches no longer crash the game if the matching amount is set to
 *    zero. Bug fixed by Yanfly.
 * ** Selecting a category without modern controls will now activate the list
 *    window. Bug fixed by Yanfly.
 * ** The Category Window no longer disappears when there's only one
 *    category. Bug fixed by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00 Official Release Date: November 2, 2020
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
 * @command ItemCraftingSceneOpen
 * @text Scene: Item Crafting (All)
 * @desc Go to the Item Crafting scene.
 * All enabled recipes will be available.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CustomItemCraftingSceneOpen
 * @text Scene: Item Crafting (Custom)
 * @desc Go to the Item Crafting scene.
 * Select specific items to craft here.
 * 
 * @arg Contents
 *
 * @arg Items:arraynum
 * @text Items
 * @type item[]
 * @parent Contents
 * @desc Select which Item ID(s) to become craftable.
 * @default []
 *
 * @arg Weapons:arraynum
 * @text Weapons
 * @type weapon[]
 * @parent Contents
 * @desc Select which Weapon ID(s) to become craftable.
 * @default []
 *
 * @arg Armors:arraynum
 * @text Armors
 * @type armor[]
 * @parent Contents
 * @desc Select which armor ID(s) to become craftable.
 * @default []
 * 
 * @arg Settings
 *
 * @arg BypassSwitches:eval
 * @text Bypass Switches?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass any of the requirement switches?
 * @default false
 *
 * @arg BypassMasks:eval
 * @text Bypass Masks?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass name masking for uncrafted items?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ReturnToLastCrafting
 * @text Scene: Common Event Return
 * @desc Return to the last shop if coming from a Crafting Common Event.
 * Requires VisuMZ_2_ShopCommonEvents!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableItemCraftingMenu
 * @text System: Enable Crafting in Menu?
 * @desc Enables/disables Crafting menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Crafting menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowItemCraftingMenu
 * @text System: Show Crafting in Menu?
 * @desc Shows/hides Crafting menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Crafting menu inside the main menu.
 * @default true
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
 * @param ItemCraftingSys
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to Item Crafting.
 * @default {"Scene":"","CraftAssistButton:str":"Craft","CraftedIcon:num":"223","IngredientBridge:str":"+","Categories":"","CategoryIcon:num":"16","CategoryTitle:str":"Pick %1 Type (Quantity: %2)","SelectedColor:str":"17","SelectedText:str":" (Selected)","Uncategorized:str":"Uncategorized","NoCategoryIcon:num":"160","JS":"","jsGlobalListing:func":"\"// Declare Variables\\nlet item = arguments[0]; // This is the item being crafted.\\nlet listed = true;       // Default listing value.\\n\\n// Perform Checks\\n\\n\\n// Return Boolean\\nreturn listed;\"","jsGlobalCraftEffect:func":"\"// Declare Variables\\nlet item = arguments[0];   // This is the item being crafted.\\nlet number = arguments[1]; // This is the number of them being crafted.\\n\\n// Perform Actions\""}
 *
 * @param Mask:struct
 * @text Masking Settings
 * @type struct<Mask>
 * @desc Masking settings related to uncrafted items.
 * @default {"Enable:eval":"true","MaskItalics:eval":"true","MaskLetter:str":"?"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Item Crafting.
 * @default {"Name:str":"Crafting","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 * 
 * @param Animation:struct
 * @text Animation Settings
 * @type struct<Animation>
 * @desc Default settings for playing animations after crafting.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"false","Animations:arraynum":"[\"44\",\"47\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Crafting Sound Settings
 * @type struct<Sound>
 * @desc Default settings for the sound effect played when crafting an item.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ItemCrafting.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Window settings for Scene_ItemCrafting.
 * The window positions are the same as Scene_Shop.
 * @default {"ReqQuantityFontSize:num":"18","ToolTips:eval":"true","name:str":"","BgTypes":"","HelpBgType:num":"0","CategoryBgType:num":"0","GoldBgType:num":"0","ListBgType:num":"0","StatusBgType:num":"0","IngredientTitle:num":"0","IngredientList:num":"0","NumberBgType:num":"0","ButtonAssistBgType:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Scene
 * @text Scene_ItemCrafting
 *
 * @param CraftAssistButton:str
 * @text Assist Button
 * @parent Scene
 * @desc Text used to for the Button Assist Window's OK button when about ready to craft an item.
 * @default Craft
 *
 * @param CraftedIcon:num
 * @text Crafted Icon
 * @parent Scene
 * @desc Icon used to depict of an item has already been crafted.
 * @default 223
 *
 * @param IngredientBridge:str
 * @text Ingredient Bridge
 * @parent Scene
 * @desc Text used to bridge ingredients in the item crafting scene.
 * @default +
 *
 * @param Switches
 *
 * @param SwitchCraft:num
 * @text Switch: Craft
 * @parent Switches
 * @type switch
 * @desc Crafting items in Crafting Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Crafting Scene opens.
 * @default 0
 * 
 * @param Categories
 *
 * @param CategoryIcon:num
 * @text Category Icon
 * @parent Categories
 * @desc Icon used for open-ended ingredients.
 * @default 16
 *
 * @param CategoryTitle:str
 * @text Category Title
 * @parent Categories
 * @desc Text format used for display categories.
 * %1 - Category Name, %2 - Needed Quantity
 * @default Pick %1 Type (Quantity: %2)
 *
 * @param SelectedColor:str
 * @text Selected Color
 * @parent Categories
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param SelectedText:str
 * @text Selected Text
 * @parent Categories
 * @desc This is the add on text that is displayed after an
 * item's name that's already an ingredient.
 * @default  (Selected)
 *
 * @param Uncategorized:str
 * @text Uncategorized Text
 * @parent Categories
 * @desc Text used for an uncategorized item category.
 * @default Uncategorized
 *
 * @param NoCategoryIcon:num
 * @text Uncategorized Icon
 * @parent Categories
 * @desc Icon used for uncategorized item category.
 * @default 160
 * 
 * @param Vocab
 * @text Vocabulary
 *
 * @param NumWindowOwned:str
 * @text Owned
 * @parent Vocab
 * @desc Text used for how much of an item is owned.
 * @default Owned
 *
 * @param NumWindowShift:str
 * @text Shift
 * @parent Vocab
 * @desc Text used for the change in value.
 * @default Change
 *
 * @param NumWindowNet:str
 * @text Net
 * @parent Vocab
 * @desc Text used for the net result.
 * @default Net
 *
 * @param JS
 * @text Global JS Effects
 *
 * @param jsGlobalListing:func
 * @text JS: Listing
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when checking if an item should be listed or not.
 * @default "// Declare Variables\nlet item = arguments[0]; // This is the item being crafted.\nlet listed = true;       // Default listing value.\n\n// Perform Checks\n\n\n// Return Boolean\nreturn listed;"
 *
 * @param jsGlobalCraftEffect:func
 * @text JS: Craft Effect
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when crafted.
 * @default "// Declare Variables\nlet item = arguments[0];   // This is the item being crafted.\nlet number = arguments[1]; // This is the number of them being crafted.\n\n// Perform Actions"
 *
 */
/* ----------------------------------------------------------------------------
 * Masking Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mask:
 *
 * @param Enable:eval
 * @text Enable Masking
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable masking for uncrafted items?
 * @default true
 *
 * @param MaskItalics:eval
 * @text Italics For Masking
 * @type boolean
 * @on Italics
 * @off Normal
 * @desc Use Italics when masking?
 * @default true
 *
 * @param MaskLetter:str
 * @text Mask Character
 * @desc Text used for masking per individual character.
 * @default ?
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Crafting' option in the Main Menu.
 * @default Crafting
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when crafting an item?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during an item crafting animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when crafting.
 * @default ["44","47"]
 *
 * @param Sprite
 * @text Item Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the item sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the item to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ReqQuantityFontSize:num
 * @text Requirement Font Size
 * @parent Windows
 * @desc Font size used for requirement quantity.
 * @default 18
 *
 * @param ToolTips:eval
 * @text Show Tooltips
 * @parent Windows
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips when the mouse hovers over an ingredient?
 * @default true
 *
 * @param name:str
 * @text Custom Window Skin
 * @parent ToolTips:eval
 * @type file
 * @dir img/system/
 * @desc Select a custom window skin if you want the tooltip window to have one.
 * @default 
 *
 * @param BgTypes
 * @text Background Types
 * @parent Windows
 *
 * @param HelpBgType:num
 * @text Help Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Help Window.
 * @default 0
 *
 * @param CategoryBgType:num
 * @text Category Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Category Window.
 * @default 0
 *
 * @param GoldBgType:num
 * @text Gold Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Gold Window.
 * @default 0
 *
 * @param ListBgType:num
 * @text List Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the List Window.
 * @default 0
 *
 * @param StatusBgType:num
 * @text Status Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Status Window.
 * @default 0
 *
 * @param IngredientTitle:num
 * @text Ingredient Title
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient Title Window.
 * @default 0
 *
 * @param IngredientList:num
 * @text Ingredient List
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient List Window.
 * @default 0
 *
 * @param NumberBgType:num
 * @text Number Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param ButtonAssistBgType:num
 * @text Button Assist Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 */
//=============================================================================

const _0x44f27e=_0x368d;(function(_0x2ba456,_0x453bb5){const _0x181ee4=_0x368d,_0x3bed73=_0x2ba456();while(!![]){try{const _0x5094d5=-parseInt(_0x181ee4(0x1be))/0x1+parseInt(_0x181ee4(0x1c9))/0x2+-parseInt(_0x181ee4(0x122))/0x3+-parseInt(_0x181ee4(0x2b7))/0x4*(-parseInt(_0x181ee4(0xe7))/0x5)+-parseInt(_0x181ee4(0x12c))/0x6*(parseInt(_0x181ee4(0x1f6))/0x7)+parseInt(_0x181ee4(0x25f))/0x8+-parseInt(_0x181ee4(0x1dc))/0x9*(parseInt(_0x181ee4(0x27a))/0xa);if(_0x5094d5===_0x453bb5)break;else _0x3bed73['push'](_0x3bed73['shift']());}catch(_0x152541){_0x3bed73['push'](_0x3bed73['shift']());}}}(_0x1fa9,0xf392f));var label=_0x44f27e(0x1ba),tier=tier||0x0,dependencies=[_0x44f27e(0x275)],pluginData=$plugins[_0x44f27e(0x139)](function(_0x5a6705){const _0x15b41c=_0x44f27e;return _0x5a6705[_0x15b41c(0xcb)]&&_0x5a6705[_0x15b41c(0x101)][_0x15b41c(0x301)]('['+label+']');})[0x0];VisuMZ[label][_0x44f27e(0x30a)]=VisuMZ[label][_0x44f27e(0x30a)]||{},VisuMZ['ConvertParams']=function(_0x5c6956,_0x441c81){const _0x332e99=_0x44f27e;for(const _0x2afb40 in _0x441c81){if(_0x2afb40['match'](/(.*):(.*)/i)){const _0x39b49d=String(RegExp['$1']),_0x4dc892=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x13b798,_0x412832,_0x68a6aa;switch(_0x4dc892){case _0x332e99(0x258):_0x13b798=_0x441c81[_0x2afb40]!==''?Number(_0x441c81[_0x2afb40]):0x0;break;case _0x332e99(0x203):_0x412832=_0x441c81[_0x2afb40]!==''?JSON[_0x332e99(0xbc)](_0x441c81[_0x2afb40]):[],_0x13b798=_0x412832['map'](_0x208908=>Number(_0x208908));break;case _0x332e99(0x1f8):_0x13b798=_0x441c81[_0x2afb40]!==''?eval(_0x441c81[_0x2afb40]):null;break;case'ARRAYEVAL':_0x412832=_0x441c81[_0x2afb40]!==''?JSON['parse'](_0x441c81[_0x2afb40]):[],_0x13b798=_0x412832['map'](_0x3a9b06=>eval(_0x3a9b06));break;case _0x332e99(0x145):_0x13b798=_0x441c81[_0x2afb40]!==''?JSON[_0x332e99(0xbc)](_0x441c81[_0x2afb40]):'';break;case'ARRAYJSON':_0x412832=_0x441c81[_0x2afb40]!==''?JSON['parse'](_0x441c81[_0x2afb40]):[],_0x13b798=_0x412832['map'](_0x390241=>JSON[_0x332e99(0xbc)](_0x390241));break;case _0x332e99(0x252):_0x13b798=_0x441c81[_0x2afb40]!==''?new Function(JSON[_0x332e99(0xbc)](_0x441c81[_0x2afb40])):new Function(_0x332e99(0x232));break;case'ARRAYFUNC':_0x412832=_0x441c81[_0x2afb40]!==''?JSON[_0x332e99(0xbc)](_0x441c81[_0x2afb40]):[],_0x13b798=_0x412832[_0x332e99(0x18b)](_0x4d9050=>new Function(JSON[_0x332e99(0xbc)](_0x4d9050)));break;case _0x332e99(0x1bc):_0x13b798=_0x441c81[_0x2afb40]!==''?String(_0x441c81[_0x2afb40]):'';break;case _0x332e99(0x21a):_0x412832=_0x441c81[_0x2afb40]!==''?JSON[_0x332e99(0xbc)](_0x441c81[_0x2afb40]):[],_0x13b798=_0x412832[_0x332e99(0x18b)](_0x734e7f=>String(_0x734e7f));break;case _0x332e99(0x20f):_0x68a6aa=_0x441c81[_0x2afb40]!==''?JSON['parse'](_0x441c81[_0x2afb40]):{},_0x13b798=VisuMZ[_0x332e99(0x2ad)]({},_0x68a6aa);break;case _0x332e99(0x2b4):_0x412832=_0x441c81[_0x2afb40]!==''?JSON[_0x332e99(0xbc)](_0x441c81[_0x2afb40]):[],_0x13b798=_0x412832[_0x332e99(0x18b)](_0x129058=>VisuMZ['ConvertParams']({},JSON[_0x332e99(0xbc)](_0x129058)));break;default:continue;}_0x5c6956[_0x39b49d]=_0x13b798;}}return _0x5c6956;},(_0x44bded=>{const _0x730287=_0x44f27e,_0x334e35=_0x44bded[_0x730287(0xeb)];for(const _0xf0ebc0 of dependencies){if(!Imported[_0xf0ebc0]){alert(_0x730287(0x271)[_0x730287(0xfc)](_0x334e35,_0xf0ebc0)),SceneManager[_0x730287(0x2ae)]();break;}}const _0x4a6d7a=_0x44bded[_0x730287(0x101)];if(_0x4a6d7a['match'](/\[Version[ ](.*?)\]/i)){if(_0x730287(0x249)!==_0x730287(0x29d)){const _0x52105a=Number(RegExp['$1']);_0x52105a!==VisuMZ[label][_0x730287(0x2af)]&&(alert(_0x730287(0x165)[_0x730287(0xfc)](_0x334e35,_0x52105a)),SceneManager['exit']());}else this[_0x730287(0x238)]=this['commandSymbol'](_0x524cae)||'';}if(_0x4a6d7a[_0x730287(0x1f9)](/\[Tier[ ](\d+)\]/i)){const _0x3a4061=Number(RegExp['$1']);_0x3a4061<tier?_0x730287(0x27e)===_0x730287(0x27e)?(alert(_0x730287(0x184)[_0x730287(0xfc)](_0x334e35,_0x3a4061,tier)),SceneManager[_0x730287(0x2ae)]()):this[_0x730287(0xdd)](...arguments):tier=Math[_0x730287(0x273)](_0x3a4061,tier);}VisuMZ[_0x730287(0x2ad)](VisuMZ[label]['Settings'],_0x44bded[_0x730287(0x259)]);})(pluginData);if(VisuMZ[_0x44f27e(0x177)]['version']<1.38){let text='';text+='VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20',text+='in\x20order\x20for\x20VisuMZ_2_ItemCraftingSys\x20to\x20work.',alert(text),SceneManager['exit']();}VisuMZ['ItemCraftingSys'][_0x44f27e(0x146)]=_0x44f27e(0x1ef),PluginManager[_0x44f27e(0x281)](pluginData['name'],_0x44f27e(0x1fc),_0x30cd57=>{const _0x271e4b=_0x44f27e;if(SceneManager[_0x271e4b(0xc5)]())return;if(SceneManager[_0x271e4b(0x121)]())return;if($gameSystem[_0x271e4b(0x211)])return;if(DataManager['currentCraftableItems']()['length']<=0x0){$gameTemp['isPlaytest']()&&alert(VisuMZ[_0x271e4b(0x1ba)][_0x271e4b(0x146)]);return;}SceneManager[_0x271e4b(0x183)](Scene_ItemCrafting);}),PluginManager[_0x44f27e(0x281)](pluginData[_0x44f27e(0xeb)],'CustomItemCraftingSceneOpen',_0x565d6c=>{const _0x9fb12b=_0x44f27e;if(SceneManager['isSceneBattle']())return;if(SceneManager[_0x9fb12b(0x121)]())return;if($gameSystem[_0x9fb12b(0x211)])return;VisuMZ[_0x9fb12b(0x2ad)](_0x565d6c,_0x565d6c);const _0x588a17={'items':_0x565d6c[_0x9fb12b(0xd2)]['map'](_0x2840ba=>$dataItems[_0x2840ba])['filter'](_0x3ea854=>DataManager[_0x9fb12b(0x19f)]()[_0x9fb12b(0x301)](_0x3ea854)),'weapons':_0x565d6c['Weapons'][_0x9fb12b(0x18b)](_0xb6ca6a=>$dataWeapons[_0xb6ca6a])[_0x9fb12b(0x139)](_0x3b1571=>DataManager['allCraftableWeapons']()['includes'](_0x3b1571)),'armors':_0x565d6c[_0x9fb12b(0x234)]['map'](_0x160844=>$dataArmors[_0x160844])[_0x9fb12b(0x139)](_0xb0dd62=>DataManager[_0x9fb12b(0x2b1)]()[_0x9fb12b(0x301)](_0xb0dd62)),'BypassSwitches':_0x565d6c[_0x9fb12b(0x131)],'BypassMasks':_0x565d6c[_0x9fb12b(0x29c)]};_0x588a17[_0x9fb12b(0x246)]=_0x588a17['items']['concat'](_0x588a17['weapons'],_0x588a17['armors']);if(_0x588a17[_0x9fb12b(0x246)][_0x9fb12b(0x210)]<=0x0){if($gameTemp[_0x9fb12b(0x196)]()){if(_0x9fb12b(0x162)!==_0x9fb12b(0x162)){if(!this[_0x9fb12b(0x1b6)])return;if(this[_0x9fb12b(0x1b6)]['isPlaying']())return;this['destroyAnimationSprite'](),this['createAnimation'](this[_0x9fb12b(0x14e)]['shift']());}else alert(VisuMZ[_0x9fb12b(0x1ba)][_0x9fb12b(0x146)]);}return;}$gameTemp['setCustomItemCraftingSettings'](_0x588a17),SceneManager[_0x9fb12b(0x183)](Scene_ItemCrafting);}),PluginManager[_0x44f27e(0x281)](pluginData['name'],_0x44f27e(0x13e),_0x5b2d62=>{const _0x302893=_0x44f27e;if(!SceneManager[_0x302893(0xd4)]())return;if(!$gameSystem[_0x302893(0x211)])return;$gameSystem[_0x302893(0x211)]=undefined,SceneManager[_0x302893(0x183)](Scene_ItemCrafting);}),PluginManager[_0x44f27e(0x281)](pluginData['name'],_0x44f27e(0x1a6),_0x5d7b3e=>{const _0x20a353=_0x44f27e;VisuMZ[_0x20a353(0x2ad)](_0x5d7b3e,_0x5d7b3e),$gameSystem[_0x20a353(0x1eb)](_0x5d7b3e['Enable']);}),PluginManager['registerCommand'](pluginData[_0x44f27e(0xeb)],'SystemShowItemCraftingMenu',_0x1cbb85=>{const _0x2ad744=_0x44f27e;VisuMZ[_0x2ad744(0x2ad)](_0x1cbb85,_0x1cbb85),$gameSystem['setMainMenuItemCraftingVisible'](_0x1cbb85[_0x2ad744(0x223)]);}),VisuMZ['ItemCraftingSys']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x44f27e(0x294)][_0x44f27e(0x30f)],Scene_Boot[_0x44f27e(0x294)]['onDatabaseLoaded']=function(){const _0x1dab40=_0x44f27e;VisuMZ[_0x1dab40(0x1ba)][_0x1dab40(0xbe)][_0x1dab40(0x116)](this),this[_0x1dab40(0x306)]();},Scene_Boot[_0x44f27e(0x294)][_0x44f27e(0x306)]=function(){this['process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags']();},VisuMZ[_0x44f27e(0x1ba)][_0x44f27e(0xc3)]={'Ingredients':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>\s*([\s\S]*)\s*<\/(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>/i,'AllSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'AnySwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:ANY SWITCH|ANY SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OnSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN ON (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OffSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN OFF (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'MaskText':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) MASK:[ ](.*)>/i,'NoMask':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) NO MASK>/i,'customCraftingOnly':/<CUSTOM (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) ONLY>/i,'jsOnCraft':/<JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>\s*([\s\S]*)\s*<\/JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>/i,'animationIDs':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) FADE SPEED:[ ](\d+)>/i,'craftPicture':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'CraftEventOnce':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftEventRepeat':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftOnceAllSw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftOnceAnySw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftRepeatAllSw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftRepeatAnySw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i},Scene_Boot[_0x44f27e(0x294)][_0x44f27e(0x1ff)]=function(){const _0x1dc973=_0x44f27e;if(VisuMZ[_0x1dc973(0x214)])return;const _0x537815=$dataItems[_0x1dc973(0xda)]($dataWeapons,$dataArmors);for(const _0x121ece of _0x537815){if('okurr'===_0x1dc973(0x245)){const _0x303817=_0x2f2eeb[_0x1dc973(0x1ba)]['Settings'][_0x1dc973(0x1e9)];let _0x5b08ae=_0x303817[_0x1dc973(0x260)]||_0x1dc973(0x260),_0x28afdc=_0x303817[_0x1dc973(0x10b)]||0xa0;_0x5b08ae=_0x1dc973(0x1c4)[_0x1dc973(0xfc)](_0x28afdc,_0x5b08ae),this['addCommand'](_0x5b08ae,_0x1dc973(0x1e4),!![],_0x1dc973(0x2f3));}else{if(!_0x121ece)continue;VisuMZ[_0x1dc973(0x1ba)]['Parse_Notetags_CreateJS'](_0x121ece);}}},VisuMZ[_0x44f27e(0x1ba)][_0x44f27e(0x171)]=VisuMZ['ParseItemNotetags'],VisuMZ['ParseItemNotetags']=function(_0xb17c67){const _0x134896=_0x44f27e;VisuMZ[_0x134896(0x1ba)][_0x134896(0x171)][_0x134896(0x116)](this,_0xb17c67),VisuMZ[_0x134896(0x1ba)][_0x134896(0x1a7)](_0xb17c67);},VisuMZ[_0x44f27e(0x1ba)]['ParseWeaponNotetags']=VisuMZ[_0x44f27e(0xc2)],VisuMZ[_0x44f27e(0xc2)]=function(_0x537576){const _0x336c37=_0x44f27e;VisuMZ[_0x336c37(0x1ba)]['ParseWeaponNotetags'][_0x336c37(0x116)](this,_0x537576),VisuMZ[_0x336c37(0x1ba)][_0x336c37(0x1a7)](_0x537576);},VisuMZ['ItemCraftingSys'][_0x44f27e(0x2e5)]=VisuMZ[_0x44f27e(0x2e5)],VisuMZ[_0x44f27e(0x2e5)]=function(_0x59d670){const _0x1a1134=_0x44f27e;VisuMZ[_0x1a1134(0x1ba)][_0x1a1134(0x2e5)][_0x1a1134(0x116)](this,_0x59d670),VisuMZ[_0x1a1134(0x1ba)][_0x1a1134(0x1a7)](_0x59d670);},VisuMZ[_0x44f27e(0x1ba)][_0x44f27e(0x1a7)]=function(_0x235018){const _0x58d0dd=_0x44f27e;if(_0x235018[_0x58d0dd(0x265)][_0x58d0dd(0x1f9)](VisuMZ[_0x58d0dd(0x1ba)][_0x58d0dd(0xc3)][_0x58d0dd(0xf9)])){if(_0x58d0dd(0xe5)===_0x58d0dd(0xe5))VisuMZ[_0x58d0dd(0x1ba)][_0x58d0dd(0x1ec)](_0x235018,RegExp['$1']);else{const _0x3347e3='\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20'['format'](_0x3744b4),_0x434a16=_0x4dec3c['createCraftingItemKey'](_0x5ca019);_0xf3d4f7['ItemCraftingSys']['JS'][_0x434a16]=new _0x406131(_0x3347e3);}}},VisuMZ['ItemCraftingSys']['JS']={},VisuMZ[_0x44f27e(0x1ba)][_0x44f27e(0x1ec)]=function(_0x5cc312,_0x3ab38f){const _0x29cd7c=_0x44f27e,_0x1b4c4a=_0x29cd7c(0x21b)[_0x29cd7c(0xfc)](_0x3ab38f),_0x5b1cd0=DataManager['createCraftingItemKey'](_0x5cc312);VisuMZ['ItemCraftingSys']['JS'][_0x5b1cd0]=new Function(_0x1b4c4a);},DataManager[_0x44f27e(0x288)]=function(_0x24b908){const _0x4da0a1=_0x44f27e;if(!_0x24b908)return![];if(DataManager['getCraftingIngredients'](_0x24b908)[_0x4da0a1(0x210)]<=0x0){if(_0x4da0a1(0x20b)===_0x4da0a1(0x20b))return![];else _0x530a99[_0x4da0a1(0x2a6)]=!![],this[_0x4da0a1(0x202)]=this[_0x4da0a1(0xdb)][_0x4da0a1(0x215)](),this['_itemWindow']['hide'](),this[_0x4da0a1(0x135)](),this['doesItemHaveOpenCategories']()?this[_0x4da0a1(0x2ec)]():this['setupNumberWindow'](),_0x3be5ad['_bypassProxy']=![],this[_0x4da0a1(0x202)]=this[_0x4da0a1(0xdb)][_0x4da0a1(0x215)]();}if(_0x24b908[_0x4da0a1(0x265)][_0x4da0a1(0x1f9)](VisuMZ[_0x4da0a1(0x1ba)]['RegExp'][_0x4da0a1(0x24b)])){if('DMQJy'!=='DMQJy'){const _0x5b9213=_0x54afbb[_0x4da0a1(0x1ba)][_0x4da0a1(0x30a)][_0x4da0a1(0x1e9)];this['contents'][_0x4da0a1(0xc0)]=_0x1746cd[_0x4da0a1(0x2db)](_0x5b9213['SelectedColor']),_0x289cbf+=_0x5b9213[_0x4da0a1(0x27d)];}else{if(!$gameTemp[_0x4da0a1(0x2a2)]())return![];}}if(!VisuMZ[_0x4da0a1(0x1ba)]['Settings']['General'][_0x4da0a1(0x2e4)][_0x4da0a1(0x116)](this,_0x24b908))return![];if(!VisuMZ[_0x4da0a1(0x1ba)]['CheckAllSwitches'](_0x24b908))return![];if(!VisuMZ['ItemCraftingSys']['CheckAnySwitches'](_0x24b908))return![];return!![];},VisuMZ['ItemCraftingSys'][_0x44f27e(0x213)]=function(_0x2b789c){const _0x3aa8c3=_0x44f27e,_0xd0bd04=$gameTemp[_0x3aa8c3(0x2a2)]();if(_0xd0bd04&&_0xd0bd04[_0x3aa8c3(0x131)])return!![];const _0x5b3a3a=VisuMZ[_0x3aa8c3(0x1ba)][_0x3aa8c3(0xc3)][_0x3aa8c3(0x27b)],_0x3c819b=_0x2b789c[_0x3aa8c3(0x265)][_0x3aa8c3(0x1f9)](_0x5b3a3a);if(_0x3c819b){if(_0x3aa8c3(0x10f)!=='NIVhh')for(const _0x1288c8 of _0x3c819b){if(!_0x1288c8)continue;_0x1288c8[_0x3aa8c3(0x1f9)](_0x5b3a3a);const _0xfc6430=JSON[_0x3aa8c3(0xbc)]('['+RegExp['$1'][_0x3aa8c3(0x1f9)](/\d+/g)+']');for(const _0x3a209f of _0xfc6430){if(!$gameSwitches[_0x3aa8c3(0x224)](_0x3a209f))return![];}}else _0x38810e[_0x3aa8c3(0x294)]['initialize']['call'](this,_0x311d29),this[_0x3aa8c3(0x138)]();}return!![];},VisuMZ[_0x44f27e(0x1ba)][_0x44f27e(0x11e)]=function(_0x3d5110){const _0x457e2a=_0x44f27e,_0x291aa9=$gameTemp['getCustomItemCraftingSettings']();if(_0x291aa9&&_0x291aa9['BypassSwitches'])return!![];const _0x22e7fb=VisuMZ[_0x457e2a(0x1ba)][_0x457e2a(0xc3)]['AnySwitches'],_0x569f09=_0x3d5110['note']['match'](_0x22e7fb);if(_0x569f09){for(const _0x238236 of _0x569f09){if(!_0x238236)continue;_0x238236['match'](_0x22e7fb);const _0x4788e1=JSON['parse']('['+RegExp['$1'][_0x457e2a(0x1f9)](/\d+/g)+']');for(const _0x28380c of _0x4788e1){if($gameSwitches[_0x457e2a(0x224)](_0x28380c))return!![];}}return![];}return!![];},DataManager[_0x44f27e(0x272)]=function(){const _0x4c23be=_0x44f27e,_0x43f24d=$gameTemp[_0x4c23be(0x2a2)]();if(_0x43f24d)return _0x43f24d[_0x4c23be(0x246)]['filter'](_0x4cfa6a=>this['isCraftItemListed'](_0x4cfa6a));const _0xc30b97=this[_0x4c23be(0xf4)](),_0x287df2=this[_0x4c23be(0x299)](),_0x4a9184=this[_0x4c23be(0x235)]();return _0xc30b97[_0x4c23be(0xda)](_0x287df2,_0x4a9184);},DataManager[_0x44f27e(0xf4)]=function(){return this['allCraftableItems']()['filter'](_0x591c82=>this['isCraftItemListed'](_0x591c82));},DataManager[_0x44f27e(0x19f)]=function(){const _0x1b5a5d=_0x44f27e;if(this[_0x1b5a5d(0xc8)]!==undefined)return this[_0x1b5a5d(0xc8)];this['_allCraftableItems']=[];for(const _0x26db7a of $dataItems){if(_0x1b5a5d(0x17b)===_0x1b5a5d(0x2f8)){if(this[_0x1b5a5d(0x170)]===_0x1b5a5d(0x2f3)){const _0x518e2f=_0x2a3966[_0x1b5a5d(0x133)];if(_0x518e2f&&_0x518e2f['_categoryWindow']&&_0x518e2f['_categoryWindow'][_0x1b5a5d(0x17e)])return _0x518e2f[_0x1b5a5d(0x2da)]['_nonCategoryItemCraftingItems']['includes'](_0x11317c);}return _0x37bae0[_0x1b5a5d(0x294)][_0x1b5a5d(0x301)][_0x1b5a5d(0x116)](this,_0x262cd9);}else{if(!_0x26db7a)continue;_0x26db7a[_0x1b5a5d(0x265)]['match'](VisuMZ[_0x1b5a5d(0x1ba)][_0x1b5a5d(0xc3)][_0x1b5a5d(0x167)])&&this[_0x1b5a5d(0xc8)][_0x1b5a5d(0x183)](_0x26db7a);}}return this['_allCraftableItems'];},DataManager[_0x44f27e(0x299)]=function(){const _0x22d7d7=_0x44f27e;return this[_0x22d7d7(0x2c8)]()[_0x22d7d7(0x139)](_0x33c40b=>this[_0x22d7d7(0x288)](_0x33c40b));},DataManager[_0x44f27e(0x2c8)]=function(){const _0x3a39ea=_0x44f27e;if(this[_0x3a39ea(0x24c)]!==undefined)return this['_allCraftableWeapons'];this[_0x3a39ea(0x24c)]=[];for(const _0x3199c1 of $dataWeapons){if(!_0x3199c1)continue;_0x3199c1[_0x3a39ea(0x265)][_0x3a39ea(0x1f9)](VisuMZ[_0x3a39ea(0x1ba)][_0x3a39ea(0xc3)][_0x3a39ea(0x167)])&&this[_0x3a39ea(0x24c)][_0x3a39ea(0x183)](_0x3199c1);}return this['_allCraftableWeapons'];},DataManager[_0x44f27e(0x235)]=function(){const _0x4a7742=_0x44f27e;return this[_0x4a7742(0x2b1)]()['filter'](_0x2f9a3f=>this[_0x4a7742(0x288)](_0x2f9a3f));},DataManager[_0x44f27e(0x2b1)]=function(){const _0x19fc5b=_0x44f27e;if(this[_0x19fc5b(0x2b6)]!==undefined)return this[_0x19fc5b(0x2b6)];this[_0x19fc5b(0x2b6)]=[];for(const _0x382c9d of $dataArmors){if(!_0x382c9d)continue;_0x382c9d['note'][_0x19fc5b(0x1f9)](VisuMZ['ItemCraftingSys']['RegExp'][_0x19fc5b(0x167)])&&this[_0x19fc5b(0x2b6)][_0x19fc5b(0x183)](_0x382c9d);}return this[_0x19fc5b(0x2b6)];},DataManager['getCraftingIngredients']=function(_0x1b70b3){const _0x3f440e=_0x44f27e;if(!_0x1b70b3)return[];const _0x2fdadb=this[_0x3f440e(0x10d)](_0x1b70b3);return this[_0x3f440e(0x1c8)]===undefined&&('XKGDB'!==_0x3f440e(0x284)?this['createCraftingIngredientsLists']():(this['_ingredientSelectTitle'][_0x3f440e(0x1c3)](),this['_ingredientSelectList'][_0x3f440e(0x1c3)](),this['_categoryWindow'][_0x3f440e(0x128)](),_0x433d2f[_0x3f440e(0x2a6)]=!![],this[_0x3f440e(0x292)][_0x3f440e(0xdf)](this[_0x3f440e(0xdb)][_0x3f440e(0x215)]()),_0x42e0a2[_0x3f440e(0x2a6)]=![],this[_0x3f440e(0x292)][_0x3f440e(0x128)](),this[_0x3f440e(0x292)][_0x3f440e(0x136)]())),this[_0x3f440e(0x1c8)][_0x2fdadb]||[];},DataManager[_0x44f27e(0x10d)]=function(_0x420ad7){const _0x268b4c=_0x44f27e;let _0x431680='%1%2';if(this[_0x268b4c(0x1d3)](_0x420ad7))return _0x431680['format']('Item',_0x420ad7['id']);if(this[_0x268b4c(0x10a)](_0x420ad7))return _0x431680[_0x268b4c(0xfc)]('Weapon',_0x420ad7['id']);if(this[_0x268b4c(0x1b9)](_0x420ad7))return _0x431680[_0x268b4c(0xfc)]('Armor',_0x420ad7['id']);return'';},DataManager[_0x44f27e(0x150)]=function(){const _0x5d9ca5=_0x44f27e;this['_craftingIngredients']={};const _0x3e50ca=$dataItems['concat']($dataWeapons,$dataArmors);for(const _0x2578a5 of _0x3e50ca){if('PPtDK'!==_0x5d9ca5(0x161))return![];else{if(!_0x2578a5)continue;if(_0x2578a5[_0x5d9ca5(0x265)][_0x5d9ca5(0x1f9)](VisuMZ['ItemCraftingSys'][_0x5d9ca5(0xc3)][_0x5d9ca5(0x167)])){const _0x47213c=String(RegExp['$1'])[_0x5d9ca5(0x300)](/[\r\n]+/),_0x509097=this['parseCraftingIngredientsData'](_0x2578a5,_0x47213c);if(_0x509097[_0x5d9ca5(0x210)]<=0x0)continue;const _0x18a507=this[_0x5d9ca5(0x10d)](_0x2578a5);this[_0x5d9ca5(0x1c8)][_0x18a507]=_0x509097;}}}},DataManager[_0x44f27e(0x108)]=function(_0x1d77e6,_0x2165fa){const _0x3922c3=_0x44f27e;let _0x47b5c1=[];for(let _0x517fc7 of _0x2165fa){_0x517fc7=_0x517fc7[_0x3922c3(0x2d2)]();if(_0x517fc7['match'](/GOLD:[ ](\d+)/i))_0x47b5c1[_0x3922c3(0x183)](['gold',Number(RegExp['$1'])]);else{if(_0x517fc7[_0x3922c3(0x1f9)](/CATEGORY[ ](.*):[ ](\d+)/i)){if(_0x3922c3(0x117)!==_0x3922c3(0x1b5)){const _0xa0b7e6=String(RegExp['$1'])['trim'](),_0xc88762=Number(RegExp['$2'])||0x1,_0x26e549=_0x3922c3(0x10c)[_0x3922c3(0xfc)](_0xa0b7e6);_0x47b5c1['push']([_0x26e549,_0xc88762]);}else this[_0x3922c3(0x274)]()?this[_0x3922c3(0x2eb)]():this['returnBackToItemWindow']();}else{if(_0x517fc7[_0x3922c3(0x1f9)](/(.*?)[ ](\d+):[ ](\d+)/i)){const _0x4c7647=RegExp['$1']['toLowerCase']()[_0x3922c3(0x2d2)](),_0x15f9d5=Number(RegExp['$2'])||0x0,_0x4eefcb=Number(RegExp['$3'])||0x1;let _0x4c59c7=null;if(['item','items'][_0x3922c3(0x301)](_0x4c7647))_0x4c59c7=$dataItems;if(['weapon',_0x3922c3(0x2f2)][_0x3922c3(0x301)](_0x4c7647))_0x4c59c7=$dataWeapons;if(['armor',_0x3922c3(0x287)][_0x3922c3(0x301)](_0x4c7647))_0x4c59c7=$dataArmors;this[_0x3922c3(0x191)](_0x1d77e6,_0x4c59c7,_0x15f9d5,_0x47b5c1)&&_0x47b5c1[_0x3922c3(0x183)]([_0x4c59c7[_0x15f9d5],_0x4eefcb]);}else{if(_0x517fc7[_0x3922c3(0x1f9)](/(.*?)[ ](.*):[ ](\d+)/i)){const _0x38a922=RegExp['$1'][_0x3922c3(0x20c)]()[_0x3922c3(0x2d2)](),_0x572508=RegExp['$2'][_0x3922c3(0x2d2)](),_0x4d148e=Number(RegExp['$3'])||0x1;let _0x24cd9d=null,_0x2a1cb2=0x0;['item','items'][_0x3922c3(0x301)](_0x38a922)&&(_0x24cd9d=$dataItems,_0x2a1cb2=this[_0x3922c3(0x102)](_0x572508));['weapon',_0x3922c3(0x2f2)]['includes'](_0x38a922)&&(_0x3922c3(0x309)!==_0x3922c3(0xf7)?(_0x24cd9d=$dataWeapons,_0x2a1cb2=this['getWeaponIdWithName'](_0x572508)):this['_craftPicture']=_0x391175(_0x347595['$1']));['armor',_0x3922c3(0x287)]['includes'](_0x38a922)&&(_0x24cd9d=$dataArmors,_0x2a1cb2=this[_0x3922c3(0xcd)](_0x572508));if(this[_0x3922c3(0x191)](_0x1d77e6,_0x24cd9d,_0x2a1cb2,_0x47b5c1)){if(_0x3922c3(0x1ed)===_0x3922c3(0xf0))return _0x53149d[_0x3922c3(0x155)]();else _0x47b5c1[_0x3922c3(0x183)]([_0x24cd9d[_0x2a1cb2],_0x4d148e]);}}}}}}return _0x47b5c1;},DataManager[_0x44f27e(0x191)]=function(_0x424fc4,_0xa1aff0,_0x2e796f,_0x3df2f0){if(!_0xa1aff0)return![];if(!_0xa1aff0[_0x2e796f])return![];const _0x4d4ed=_0xa1aff0[_0x2e796f];if(_0x4d4ed===_0x424fc4)return![];for(const _0x5e5fcf of _0x3df2f0){if(!_0x5e5fcf)continue;if(_0x5e5fcf[0x0]===_0x4d4ed)return![];}return!![];},DataManager[_0x44f27e(0x102)]=function(_0x15b58e){const _0x3ff812=_0x44f27e;_0x15b58e=_0x15b58e[_0x3ff812(0x173)]()['trim'](),this[_0x3ff812(0x1c0)]=this[_0x3ff812(0x1c0)]||{};if(this[_0x3ff812(0x1c0)][_0x15b58e])return this[_0x3ff812(0x1c0)][_0x15b58e];for(const _0x24589 of $dataItems){if(!_0x24589)continue;this[_0x3ff812(0x1c0)][_0x24589[_0x3ff812(0xeb)]['toUpperCase']()[_0x3ff812(0x2d2)]()]=_0x24589['id'];}return this[_0x3ff812(0x1c0)][_0x15b58e]||0x0;},DataManager[_0x44f27e(0x1ee)]=function(_0x5ab142){const _0x4fa3a0=_0x44f27e;_0x5ab142=_0x5ab142[_0x4fa3a0(0x173)]()[_0x4fa3a0(0x2d2)](),this[_0x4fa3a0(0x304)]=this['_weaponIDs']||{};if(this['_weaponIDs'][_0x5ab142])return this[_0x4fa3a0(0x304)][_0x5ab142];for(const _0x57dc82 of $dataWeapons){if(!_0x57dc82)continue;this[_0x4fa3a0(0x304)][_0x57dc82[_0x4fa3a0(0xeb)][_0x4fa3a0(0x173)]()[_0x4fa3a0(0x2d2)]()]=_0x57dc82['id'];}return this[_0x4fa3a0(0x304)][_0x5ab142]||0x0;},DataManager[_0x44f27e(0xcd)]=function(_0x4962d1){const _0x40766d=_0x44f27e;_0x4962d1=_0x4962d1[_0x40766d(0x173)]()[_0x40766d(0x2d2)](),this[_0x40766d(0x2f0)]=this['_armorIDs']||{};if(this[_0x40766d(0x2f0)][_0x4962d1])return this[_0x40766d(0x2f0)][_0x4962d1];for(const _0x28512c of $dataArmors){if(!_0x28512c)continue;this[_0x40766d(0x2f0)][_0x28512c['name'][_0x40766d(0x173)]()[_0x40766d(0x2d2)]()]=_0x28512c['id'];}return this[_0x40766d(0x2f0)][_0x4962d1]||0x0;},DataManager[_0x44f27e(0x111)]=function(_0x26dad0){const _0x2b29a8=_0x44f27e;if(!_0x26dad0)return![];if(!VisuMZ['ItemCraftingSys'][_0x2b29a8(0x30a)]['Mask']['Enable'])return![];DataManager[_0x2b29a8(0x2cd)]&&(_0x26dad0=DataManager[_0x2b29a8(0x2cd)](_0x26dad0));const _0x5708f0=$gameTemp[_0x2b29a8(0x2a2)]();if(_0x5708f0&&_0x5708f0[_0x2b29a8(0x29c)])return![];if(_0x26dad0[_0x2b29a8(0x265)][_0x2b29a8(0x1f9)](VisuMZ['ItemCraftingSys'][_0x2b29a8(0xc3)][_0x2b29a8(0x21d)]))return![];return!$gameSystem[_0x2b29a8(0x109)](_0x26dad0);},ImageManager['itemCraftedIcon']=VisuMZ['ItemCraftingSys']['Settings'][_0x44f27e(0x1e9)][_0x44f27e(0x15c)],SoundManager[_0x44f27e(0x2bc)]=function(_0x30f5ba){const _0x14cfd8=_0x44f27e;AudioManager[_0x14cfd8(0x1b0)](VisuMZ['ItemCraftingSys'][_0x14cfd8(0x30a)][_0x14cfd8(0x186)]);},TextManager[_0x44f27e(0x222)]=VisuMZ[_0x44f27e(0x1ba)]['Settings'][_0x44f27e(0x1e9)][_0x44f27e(0x250)],TextManager[_0x44f27e(0x28f)]=VisuMZ['ItemCraftingSys'][_0x44f27e(0x30a)][_0x44f27e(0x1e9)][_0x44f27e(0x17a)],TextManager['itemCraftingMask']=VisuMZ[_0x44f27e(0x1ba)][_0x44f27e(0x30a)][_0x44f27e(0x2f4)][_0x44f27e(0x103)],TextManager['ItemCraftingMenuCommand']=VisuMZ[_0x44f27e(0x1ba)][_0x44f27e(0x30a)][_0x44f27e(0x217)][_0x44f27e(0x124)],TextManager[_0x44f27e(0x1e3)]={'owned':VisuMZ[_0x44f27e(0x1ba)]['Settings'][_0x44f27e(0x1e9)]['NumWindowOwned']||_0x44f27e(0x2fe),'shift':VisuMZ[_0x44f27e(0x1ba)]['Settings'][_0x44f27e(0x1e9)][_0x44f27e(0x2c1)]||_0x44f27e(0x2bf),'net':VisuMZ[_0x44f27e(0x1ba)][_0x44f27e(0x30a)][_0x44f27e(0x1e9)][_0x44f27e(0x140)]||_0x44f27e(0x1fd)},ColorManager[_0x44f27e(0x2db)]=function(_0x131702){const _0x511a14=_0x44f27e;_0x131702=String(_0x131702);if(_0x131702[_0x511a14(0x1f9)](/#(.*)/i)){if(_0x511a14(0x106)!==_0x511a14(0x106))_0x5d992b=_0x36b2c8[_0x511a14(0xeb)];else return _0x511a14(0x30d)[_0x511a14(0xfc)](String(RegExp['$1']));}else return this[_0x511a14(0xc0)](Number(_0x131702));},SceneManager[_0x44f27e(0xc5)]=function(){const _0x51cc78=_0x44f27e;return this[_0x51cc78(0x133)]&&this[_0x51cc78(0x133)]['constructor']===Scene_Battle;},SceneManager[_0x44f27e(0x121)]=function(){const _0xd53f79=_0x44f27e;return this[_0xd53f79(0x133)]&&this[_0xd53f79(0x133)][_0xd53f79(0x1ab)]===Scene_ItemCrafting;},Game_Temp[_0x44f27e(0x294)][_0x44f27e(0x2a2)]=function(){const _0x44af05=_0x44f27e;return this[_0x44af05(0x19a)];},Game_Temp[_0x44f27e(0x294)][_0x44f27e(0x290)]=function(){const _0x100d94=_0x44f27e;this[_0x100d94(0x19a)]=undefined;},Game_Temp[_0x44f27e(0x294)][_0x44f27e(0x220)]=function(_0x488b8d){this['_customItemCraftingSettings']=_0x488b8d;},VisuMZ['ItemCraftingSys'][_0x44f27e(0x282)]=Game_System[_0x44f27e(0x294)][_0x44f27e(0xdd)],Game_System[_0x44f27e(0x294)][_0x44f27e(0xdd)]=function(){const _0x54dc51=_0x44f27e;VisuMZ[_0x54dc51(0x1ba)]['Game_System_initialize']['call'](this),this[_0x54dc51(0x2b8)](),this[_0x54dc51(0x227)](),this['initItemCraftingEvents']();},Game_System[_0x44f27e(0x294)][_0x44f27e(0x2b8)]=function(){const _0x1720ee=_0x44f27e;this[_0x1720ee(0xe8)]={'shown':VisuMZ[_0x1720ee(0x1ba)][_0x1720ee(0x30a)][_0x1720ee(0x217)]['ShowMainMenu'],'enabled':VisuMZ[_0x1720ee(0x1ba)][_0x1720ee(0x30a)][_0x1720ee(0x217)][_0x1720ee(0x143)]};},Game_System['prototype']['isMainMenuItemCraftingVisible']=function(){const _0x28f84c=_0x44f27e;if(this[_0x28f84c(0xe8)]===undefined)this[_0x28f84c(0x2b8)]();return this[_0x28f84c(0xe8)][_0x28f84c(0x313)];},Game_System[_0x44f27e(0x294)][_0x44f27e(0xbd)]=function(_0x2f6ede){const _0x4032dc=_0x44f27e;if(this['_ItemCrafting_MainMenu']===undefined)this[_0x4032dc(0x2b8)]();this[_0x4032dc(0xe8)]['shown']=_0x2f6ede;},Game_System['prototype'][_0x44f27e(0x226)]=function(){const _0x567806=_0x44f27e;if(this[_0x567806(0xe8)]===undefined)this['initItemCraftingMainMenu']();return this[_0x567806(0xe8)][_0x567806(0x20d)];},Game_System[_0x44f27e(0x294)][_0x44f27e(0x1eb)]=function(_0x3eedc){const _0x45e863=_0x44f27e;if(this['_ItemCrafting_MainMenu']===undefined)this[_0x45e863(0x2b8)]();this['_ItemCrafting_MainMenu'][_0x45e863(0x20d)]=_0x3eedc;},Game_System[_0x44f27e(0x294)][_0x44f27e(0x227)]=function(){this['_itemsCrafted']={'items':{},'weapons':{},'armors':{}};},Game_System['prototype'][_0x44f27e(0x109)]=function(_0x3f9652){const _0x46a906=_0x44f27e;return!!this[_0x46a906(0x1cb)](_0x3f9652);},Game_System[_0x44f27e(0x294)][_0x44f27e(0x1cb)]=function(_0x208230){const _0x4edf0b=_0x44f27e;if(!_0x208230)return![];if(this[_0x4edf0b(0x2bb)]===undefined)this[_0x4edf0b(0x227)]();let _0x1c7955={};if(DataManager[_0x4edf0b(0x1d3)](_0x208230))_0x1c7955=this[_0x4edf0b(0x2bb)]['items'];if(DataManager[_0x4edf0b(0x10a)](_0x208230))_0x1c7955=this[_0x4edf0b(0x2bb)]['weapons'];if(DataManager[_0x4edf0b(0x1b9)](_0x208230))_0x1c7955=this[_0x4edf0b(0x2bb)][_0x4edf0b(0x287)];return _0x1c7955[_0x208230['id']]||0x0;},Game_System[_0x44f27e(0x294)]['registerCraftedItem']=function(_0x17b6cd,_0x114ab5){const _0x195521=_0x44f27e;if(!_0x17b6cd)return![];if(this[_0x195521(0x2bb)]===undefined)this['initItemCraftingSys']();_0x114ab5=_0x114ab5||0x1;let _0x442810={};if(DataManager[_0x195521(0x1d3)](_0x17b6cd))_0x442810=this[_0x195521(0x2bb)][_0x195521(0x149)];if(DataManager[_0x195521(0x10a)](_0x17b6cd))_0x442810=this[_0x195521(0x2bb)][_0x195521(0x2f2)];if(DataManager[_0x195521(0x1b9)](_0x17b6cd))_0x442810=this[_0x195521(0x2bb)][_0x195521(0x287)];_0x442810[_0x17b6cd['id']]=_0x442810[_0x17b6cd['id']]||0x0,_0x442810[_0x17b6cd['id']]+=_0x114ab5;},Game_System[_0x44f27e(0x294)][_0x44f27e(0x253)]=function(){const _0x508c6a=_0x44f27e;this[_0x508c6a(0x11a)]={'items':[],'weapons':[],'armors':[]};},Game_System[_0x44f27e(0x294)][_0x44f27e(0x236)]=function(_0x268d25){const _0x44b6c9=_0x44f27e;if(this['_craftingEvents']===undefined)this[_0x44b6c9(0x253)]();let _0x5f373d=[];if(DataManager['isItem'](_0x268d25))_0x5f373d=this[_0x44b6c9(0x11a)]['items'];else{if(DataManager[_0x44b6c9(0x10a)](_0x268d25))_0x5f373d=this[_0x44b6c9(0x11a)][_0x44b6c9(0x2f2)];else{if(DataManager[_0x44b6c9(0x1b9)](_0x268d25)){if(_0x44b6c9(0x2b5)==='cUXmR'){if(!this[_0x44b6c9(0x1d9)]())return;if(!this[_0x44b6c9(0x26e)]())return;const _0x2a1a85=_0xbdd776['ItemCraftingMenuCommand'],_0x32c38d=this[_0x44b6c9(0x114)]();this[_0x44b6c9(0x242)](_0x2a1a85,_0x44b6c9(0x1c5),_0x32c38d);}else _0x5f373d=this['_craftingEvents'][_0x44b6c9(0x287)];}}}!_0x5f373d[_0x44b6c9(0x301)](_0x268d25['id'])&&(_0x44b6c9(0x233)!==_0x44b6c9(0x2cf)?_0x5f373d['push'](_0x268d25['id']):(this[_0x44b6c9(0x243)][_0x44b6c9(0x29e)](_0x4cadc0['x'],_0x4142db['y'],_0x27fe72,_0x2f50db,_0x23dc43,_0x3d1188),this[_0x44b6c9(0x243)]['gradientFillRect'](_0x34dc10['x']+_0x1448b3,_0x5826ea['y'],_0x563ae2,_0x37864b,_0x42f607,_0x133ede)));},Game_System[_0x44f27e(0x294)][_0x44f27e(0xe3)]=function(_0x4f0fae){const _0x274c6c=_0x44f27e;if(this['_craftingEvents']===undefined)this[_0x274c6c(0x253)]();let _0x57e381=[];if(DataManager['isItem'](_0x4f0fae))_0x274c6c(0x2ea)==='HSTxa'?(_0x45ec4b['ItemCraftingSys']['Window_MenuCommand_addOriginalCommands'][_0x274c6c(0x116)](this),this['addItemCraftingCommand']()):_0x57e381=this['_craftingEvents'][_0x274c6c(0x149)];else{if(DataManager[_0x274c6c(0x10a)](_0x4f0fae))_0x274c6c(0x264)==='Pxmwl'?_0x57e381=this[_0x274c6c(0x11a)][_0x274c6c(0x2f2)]:_0xfdcce1=_0x3b636f(_0x3471fb['$1']);else DataManager[_0x274c6c(0x1b9)](_0x4f0fae)&&(_0x57e381=this[_0x274c6c(0x11a)]['armors']);}return _0x57e381['includes'](_0x4f0fae['id']);},VisuMZ['ItemCraftingSys']['Scene_Menu_createCommandWindow']=Scene_Menu[_0x44f27e(0x294)][_0x44f27e(0x1bd)],Scene_Menu[_0x44f27e(0x294)][_0x44f27e(0x1bd)]=function(){const _0x1c3d81=_0x44f27e;VisuMZ[_0x1c3d81(0x1ba)]['Scene_Menu_createCommandWindow'][_0x1c3d81(0x116)](this);const _0x2c39ea=this[_0x1c3d81(0x218)];_0x2c39ea[_0x1c3d81(0x125)]('itemCrafting',this[_0x1c3d81(0x107)][_0x1c3d81(0x2cc)](this));},Scene_Menu[_0x44f27e(0x294)]['commandItemCrafting']=function(){const _0x1146d0=_0x44f27e;SceneManager[_0x1146d0(0x183)](Scene_ItemCrafting);};function Scene_ItemCrafting(){const _0x5e4ed3=_0x44f27e;this[_0x5e4ed3(0xdd)](...arguments);}function _0x368d(_0x29dc5f,_0x1c40ab){const _0x1fa9e1=_0x1fa9();return _0x368d=function(_0x368d63,_0x2593b8){_0x368d63=_0x368d63-0xbc;let _0x4de8aa=_0x1fa9e1[_0x368d63];return _0x4de8aa;},_0x368d(_0x29dc5f,_0x1c40ab);}function _0x1fa9(){const _0x390db7=['6nWJIcy','Window_MenuCommand_addOriginalCommands','zcgTh','drawIngredientCategory','ItemCraftingMenuCommand','BypassSwitches','_statusWindow','_scene','min','clearUserSelectedIngredients','activate','updateAnimationSprite','createTooltipWindow','filter','itemAt','AllSw','bsmLI','isReleased','ReturnToLastCrafting','updateItemSpriteOpacity','NumWindowNet','drawPicture','itemWindowRect','EnableMainMenu','maxCols','JSON','WarningMsg','_backSprite1','VisuMZ_1_MainMenuCore','items','terminate','ItemQuantityFmt','onIngredientListOk','BPomw','_animationIDs','_itemSprite','createCraftingIngredientsLists','Window_ItemCategory_needsSelection','_maxIngredientsSize','drawItemBackground','select','isMainMenuItemCraftingVisible','visualGoldDisplayAutosize','Icon','floor','buttonAssistKey1','setValue','maskItalics','CraftedIcon','createIngredientSelectionList','innerWidth','width','setText','PPtDK','uvjdu','TurnSwitches','fiXEy','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','changeOkButtonEnable','Ingredients','ReqQuantityFontSize','oKqor','onAnimationFinish','statusWindowRect','onIngredientListCancel','center','destroy','allItems','_category','ParseItemNotetags','addLoadListener','toUpperCase','lblQY','isUseModernControls','DKeti','ItemsEquipsCore','round','onNumberOk','CraftAssistButton','PNdZo','updateHelp','drawFadedItemBackground','_nonCategoryItemCraftingItems','boxHeight','makeItemList','itemLineRect','opacity','push','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','smoothSelect','Sound','createNumberWindow','_animationPlaying','addUncategorizedItemCategory','buttonAssistText1','map','deactivate','addItemCategory','boxWidth','hLvRW','qumYV','checkItemCraftingResultsValid','bitmap','updateTooltipWindow','getBackgroundOpacity','drawIngredientItem','isPlaytest','doesItemHaveOpenCategories','setItemSpriteOpacity','createBackground','_customItemCraftingSettings','drawText','fittingHeight','down','kRVFw','allCraftableItems','finishAnimation','scale','LRsaR','resetCraftingSwitches','drawBigItemImage','weZcw','SystemEnableItemCraftingMenu','Parse_Notetags_CreateJS','isTriggered','_ingredientSelectList','ucCUm','constructor','loadTitle1','addChild','_text','processFinishAnimation','playStaticSe','pop','ListBgType','CoreEngine','makeFontBigger','ruOax','_animationSprite','categoryWindowRect','GDUIS','isArmor','ItemCraftingSys','fontSize','STR','createCommandWindow','591435XMmFlT','fontItalic','_itemIDs','drawIcon','helpWindowRectItemsEquipsCore','hide','\x5cI[%1]%2','itemCrafting','onItemCrafted','onItemOk','_craftingIngredients','2939568GHLwIP','SagvR','getItemCraftedTimes','mOtNu','gold','lineHeight','loadPicture','drawIngredientGold','SelectedColor','ItemScene','isItem','HXDLq','_context','maxItems','ivYGW','drawCraftingItemName','addItemCraftingCommandAutomatically','OffSwitches','setTooltipWindowText','5232069yMWmqL','xLhOx','frames','\x20%1','opacitySpeed','right','CraftEventOnce','ItemCraftingNumberWindow','category','buttonAssistText4','buttonAssistText2','createGoldWindow','craftPicture','General','findSymbol','setMainMenuItemCraftingEnabled','createJS','iDbeT','getWeaponIdWithName','You\x20do\x20not\x20have\x20any\x20craftable\x20items!\x0aRefer\x20to\x20the\x20help\x20file\x20on\x20how\x20to\x20create\x20crafting\x20recipes.','windowPadding','buttonAssistKey2','isPlaying','refreshCursor','buttonAssistLargeIncrement','createUncategorizedItemCategory','11139667QYXCwQ','callUpdateHelp','EVAL','match','baseTextRect','createItemSprite','ItemCraftingSceneOpen','Net','loseGold','process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags','createAnimation','isFinishedAnimating','_item','ARRAYNUM','SkbGW','startAnimation','net','_tooltipWindow','setClickHandler','activateItemWindow','XUqfR','WlAAv','toLowerCase','enabled','index','STRUCT','length','_craftingCommonEventScene','addOriginalCommands','CheckAllSwitches','ParseAllNotetags','item','buyWindowRectItemsEquipsCore','MainMenu','_commandWindow','ShowAnimations','ARRAYSTR','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','tooltipFrameCheckRequirements','NoMask','drawCurrentItemName','LYLsy','setCustomItemCraftingSettings','returnBackToItemWindow','itemCraftingIngredientsBridge','Show','value','CraftRepeat','isMainMenuItemCraftingEnabled','initItemCraftingSys','numItems','setupNumberWindow','dimColor1','getCraftingIngredients','makeCommandList','changePaintOpacity','ZGiMd','CraftOnce','getInputMultiButtonStrings','StatusBgType','return\x200','QEwnp','Armors','craftableArmors','registerCraftingEvent','buttonAssistItemListRequirement','_lastSymbol','addItemCraftingCommand','FadeSpeed','shift','Gold','isMVAnimation','MaskItalics','setItemSpriteFrame','Animations','left','addCommand','contents','onItemCancel','ZgOTw','all','removeChild','createItemWindowBase','uDGKF','IngredientTitle','customCraftingOnly','_allCraftableWeapons','anchor','GoldBgType','drawCraftingIngredients','IngredientBridge','uqCxs','FUNC','initItemCraftingEvents','isOkEnabled','AnySw','innerHeight','zafSG','NUM','parameters','NNNEl','determineMax','setHelpWindow','tooltipSkin','_clickHandler','3985928LjiJHE','Uncategorized','drawItemName','quantityFontSize','applyInverse','Pxmwl','note','needsSelection','oFVgt','commandWindowRectItemsEquipsCore','createIngredientSelectionTitle','setStatusWindow','vEADM','drawTextEx','EQtFf','isItemCraftingCommandVisible','resetFontSettings','loadTitle2','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','currentCraftableItems','max','itemHasCraftCommonEvent','VisuMZ_1_ItemsEquipsCore','_goldWindow','_craftPicture','number','itemPadding','10lnIAoH','AllSwitches','Enable','SelectedText','BosnR','RgCuM','tCEsy','registerCommand','Game_System_initialize','CategoryBgType','nnIeb','_ingredientsList','VisuMZ_2_ShopCommonEvents','armors','isCraftItemListed','_alreadySelected','drawTotalPrice','_categoryIndex','kGNBc','iconWidth','bigPicture','itemCraftingNumberWindowOk','clearCustomItemCraftingSettings','iconIndex','_numberWindow','drawMathMarks','prototype','IngredientList','maxGold','_ingredientAmounts','iconHeight','craftableWeapons','setItem','height','BypassMasks','cqqft','gradientFillRect','createAnimationIDs','KJaQK','_number','getCustomItemCraftingSettings','GpYIp','goldWindowRect','CategoryIcon','_bypassProxy','cancel','buttonAssistSmallIncrement','registerCraftedItem','BgFilename2','DyxLa','%1/%2','ConvertParams','exit','version','_helpWindow','allCraftableArmors','create','IconSet','ARRAYSTRUCT','ZpaLJ','_allCraftableArmors','2092nffffd','initItemCraftingMainMenu','enableCraftingSwitches','drawHorzLine','_itemsCrafted','playItemCrafting','imageSmoothingEnabled','setWindowBackgroundTypes','Change','commandSymbol','NumWindowShift','jsGlobalCraftEffect','placeButtons','NaOqP','sCIAe','\x20=\x20','adjustSprite','allCraftableWeapons','drawBigItemIcon','destroyItemSprite','destroyAnimationSprite','bind','getProxyItem','isTouchOkEnabled','cCgvy','_iconSprite','Type','trim','KMzdH','createStatusWindow','\x20+\x20','windowskin','drawTooltipBackground','addWindow','textWidth','_categoryWindow','getColor','animationIDs','popScene','lHQDe','CraftEventRepeat','AERaW','visible','owned','addItemCategories','jsGlobalListing','ParseArmorNotetags','active','Window_ItemCategory_makeCommandList','Scale','_list','RGDjz','processCraftCommonEvent','setupSelectIngredientWindow','loadSystem','selectedIngredientList','isEnabled','_armorIDs','itemHeight','weapons','ItemCraftingNoCategory','Mask','currencyUnit','_itemSpriteOpacitySpeed','drawItem','DWlzq','SwitchCraft','drawCurrencyValue','ipvkS','categories','string','Owned','CategoryTitle','split','includes','_data','Window_Selectable_select','_weaponIDs','itemCraftingMask','process_VisuMZ_ItemCraftingSys_Notetags','_ingredientCategories','isShowNew','ojFBW','Settings','setItemSpritePosition','setBackgroundType','#%1','setHelpWindowItem','onDatabaseLoaded','buttonAssistCategory','GoldIcon','Animation','shown','_ingredientIndex','reserveCommonEvent','Window','createItemWindow','parse','setMainMenuItemCraftingVisible','Scene_Boot_onDatabaseLoaded','itemNameY','textColor','clear','ParseWeaponNotetags','RegExp','gaplw','isSceneBattle','drawGoldIngredient','changeTextColor','_allCraftableItems','BgSettings','drawIngredients','status','FrFIX','getArmorIdWithName','updateCraftingAnimation','loseItem','OnSwitches','contains','Items','_max','isSceneMap','onButtonOk','update','blt','powerDownColor','systemColor','concat','_itemWindow','centerSprite','initialize','RAYbF','setup','_windowLayer','cursorWidth','loadWindowskin','hasCraftingEventOccurred','ShopScene','eqEWT','visualGoldDisplayNoCost','18220zCKASp','_ItemCrafting_MainMenu','helpWindowRect','totalPriceY','name','RUXfX','itemRectWithPadding','allowCreateStatusWindow','JfTuG','qTDEx','rXdRS','onCategoryOk','hasCustomWindowSkin','craftableItems','fLpou','_animationWait','cZZIO','refresh','jsOnCraft','drawCraftedIcon','meetsCraftingCommonEventSwitches','format','dimColor2','KotKJ','ceil','BgFilename1','description','getItemIdWithName','MaskLetter','maskItemName','processItemCrafting','URCHa','commandItemCrafting','parseCraftingIngredientsData','isItemCrafted','isWeapon','NoCategoryIcon','category:\x20%1','createCraftingItemKey','isItemCraftingCategoryValid','qwsYI','siVLl','isCraftingItemMasked','remove','drawItemIngredient','isItemCraftingCommandEnabled','LFCaA','call','BagPv','QEybw','drawCategories','_craftingEvents','gfEyk','setItemWindow','SnapshotOpacity','CheckAnySwitches','_backSprite2','Window_ItemCategory_addItemCategory','isSceneItemCrafting','336003pKjxHD','_ingredientSelectTitle','Name','setHandler','wTmCI','NumberBgType','show','_amount','VqfkL','_buttonAssistWindow'];_0x1fa9=function(){return _0x390db7;};return _0x1fa9();}Scene_ItemCrafting[_0x44f27e(0x294)]=Object[_0x44f27e(0x2b2)](Scene_Item[_0x44f27e(0x294)]),Scene_ItemCrafting[_0x44f27e(0x294)]['constructor']=Scene_ItemCrafting,Scene_ItemCrafting[_0x44f27e(0x294)]['initialize']=function(){const _0x17553f=_0x44f27e;Scene_Item['prototype'][_0x17553f(0xdd)][_0x17553f(0x116)](this),$gameSystem[_0x17553f(0x211)]=undefined;},Scene_ItemCrafting['prototype'][_0x44f27e(0xd6)]=function(){const _0x1d4014=_0x44f27e;Scene_Item[_0x1d4014(0x294)][_0x1d4014(0xd6)]['call'](this),this[_0x1d4014(0xce)]();},Scene_ItemCrafting[_0x44f27e(0x294)]['create']=function(){const _0x5c7845=_0x44f27e;Scene_Item['prototype']['create']['call'](this),this[_0x5c7845(0x1e7)](),this[_0x5c7845(0x187)](),this['createIngredientSelectionTitle'](),this[_0x5c7845(0x15d)](),this[_0x5c7845(0x175)]()&&this['onCategoryOk'](),this[_0x5c7845(0x2be)](),this[_0x5c7845(0x1a3)]();},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x2be)]=function(){const _0x509ca3=_0x44f27e,_0xdfd81d=VisuMZ[_0x509ca3(0x1ba)][_0x509ca3(0x30a)][_0x509ca3(0x316)];this[_0x509ca3(0x2b0)]&&this['_helpWindow'][_0x509ca3(0x30c)](_0xdfd81d['HelpBgType']);this[_0x509ca3(0x2da)]&&this['_categoryWindow'][_0x509ca3(0x30c)](_0xdfd81d[_0x509ca3(0x283)]);this[_0x509ca3(0x276)]&&this['_goldWindow'][_0x509ca3(0x30c)](_0xdfd81d[_0x509ca3(0x24e)]);this[_0x509ca3(0xdb)]&&this['_itemWindow']['setBackgroundType'](_0xdfd81d[_0x509ca3(0x1b2)]);this[_0x509ca3(0x132)]&&this[_0x509ca3(0x132)][_0x509ca3(0x30c)](_0xdfd81d[_0x509ca3(0x231)]);if(this['_ingredientSelectTitle']){if(_0x509ca3(0x2fb)===_0x509ca3(0x169))return!!_0x2f648c[_0x509ca3(0x1de)];else this[_0x509ca3(0x123)][_0x509ca3(0x30c)](_0xdfd81d[_0x509ca3(0x24a)]);}this['_ingredientSelectList']&&this[_0x509ca3(0x1a9)][_0x509ca3(0x30c)](_0xdfd81d[_0x509ca3(0x295)]),this['_numberWindow']&&('VqfkL'===_0x509ca3(0x12a)?this['_numberWindow'][_0x509ca3(0x30c)](_0xdfd81d[_0x509ca3(0x127)]):(this[_0x509ca3(0x2d4)](),this[_0x509ca3(0x2d8)](this[_0x509ca3(0xdb)]))),this[_0x509ca3(0x12b)]&&this[_0x509ca3(0x12b)]['setBackgroundType'](_0xdfd81d['ButtonAssistBgType']);},Scene_ItemCrafting['prototype'][_0x44f27e(0xe9)]=function(){const _0x1caa6e=_0x44f27e;return Scene_Shop[_0x1caa6e(0x294)][_0x1caa6e(0x1c2)][_0x1caa6e(0x116)](this);},Scene_ItemCrafting[_0x44f27e(0x294)]['createGoldWindow']=function(){const _0x5862ce=_0x44f27e,_0x5df0f3=this[_0x5862ce(0x2a4)]();this[_0x5862ce(0x276)]=new Window_Gold(_0x5df0f3),this[_0x5862ce(0x2d8)](this['_goldWindow']);},Scene_ItemCrafting[_0x44f27e(0x294)]['goldWindowRect']=function(){const _0x57654b=_0x44f27e;return Scene_Shop[_0x57654b(0x294)]['goldWindowRectItemsEquipsCore'][_0x57654b(0x116)](this);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x1b7)]=function(){const _0x2ec4f9=_0x44f27e;return Scene_Shop[_0x2ec4f9(0x294)][_0x2ec4f9(0x268)][_0x2ec4f9(0x116)](this);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x317)]=function(){const _0x1808e5=_0x44f27e;this['createItemWindowBase'](),this[_0x1808e5(0x175)]()&&this['postCreateItemWindowModernControls'](),this[_0x1808e5(0xee)]()&&(this[_0x1808e5(0x2d4)](),this['addWindow'](this['_itemWindow']));},Scene_ItemCrafting['prototype'][_0x44f27e(0x248)]=function(){const _0xaedffd=_0x44f27e,_0x31b54a=this[_0xaedffd(0x142)]();this[_0xaedffd(0xdb)]=new Window_ItemCraftingList(_0x31b54a),this[_0xaedffd(0xdb)]['setHelpWindow'](this[_0xaedffd(0x2b0)]),this[_0xaedffd(0xdb)][_0xaedffd(0x125)]('ok',this[_0xaedffd(0x1c7)][_0xaedffd(0x2cc)](this)),this[_0xaedffd(0xdb)][_0xaedffd(0x125)](_0xaedffd(0x2a7),this[_0xaedffd(0x244)][_0xaedffd(0x2cc)](this)),this[_0xaedffd(0x2d8)](this['_itemWindow']),this['_categoryWindow'][_0xaedffd(0x11c)](this['_itemWindow']);if(!this[_0xaedffd(0x2da)][_0xaedffd(0x266)]()){if(_0xaedffd(0x115)===_0xaedffd(0x115))this[_0xaedffd(0xdb)]['y']-=this[_0xaedffd(0x2da)]['height'],this[_0xaedffd(0xdb)][_0xaedffd(0x29b)]+=this[_0xaedffd(0x2da)]['height'],this[_0xaedffd(0x2da)][_0xaedffd(0x1c3)](),this[_0xaedffd(0x2da)][_0xaedffd(0x18c)](),this['onCategoryOk']();else return _0x4568d0[_0xaedffd(0x25d)]!=='';}},Scene_ItemCrafting[_0x44f27e(0x294)]['itemWindowRect']=function(){const _0xf70a01=_0x44f27e;return this[_0xf70a01(0x218)]=this[_0xf70a01(0x2da)],Scene_Shop[_0xf70a01(0x294)][_0xf70a01(0x216)][_0xf70a01(0x116)](this);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x16b)]=function(){const _0x1df984=_0x44f27e;return Scene_Shop[_0x1df984(0x294)]['statusWindowRectItemsEquipsCore'][_0x1df984(0x116)](this);},Scene_ItemCrafting['prototype'][_0x44f27e(0x187)]=function(){const _0x568a10=_0x44f27e,_0x2d043c=this['itemWindowRect']();this[_0x568a10(0x292)]=new Window_ItemCraftingNumber(_0x2d043c),this[_0x568a10(0x292)][_0x568a10(0x1c3)](),this[_0x568a10(0x292)][_0x568a10(0x125)]('ok',this[_0x568a10(0x179)]['bind'](this)),this[_0x568a10(0x292)][_0x568a10(0x125)](_0x568a10(0x2a7),this['onNumberCancel'][_0x568a10(0x2cc)](this)),this[_0x568a10(0x2d8)](this['_numberWindow']);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x269)]=function(){const _0x427a89=_0x44f27e,_0x5a7c5d=this[_0x427a89(0x1b7)]();this['_ingredientSelectTitle']=new Window_Selectable(_0x5a7c5d),this['_ingredientSelectTitle']['hide'](),this[_0x427a89(0x2d8)](this[_0x427a89(0x123)]);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x15d)]=function(){const _0x554679=_0x44f27e,_0x4abff7=this[_0x554679(0x142)](),_0x5f0810=new Window_ItemCraftingIngredient(_0x4abff7);_0x5f0810[_0x554679(0x1c3)](),_0x5f0810[_0x554679(0x25c)](this[_0x554679(0x2b0)]),_0x5f0810[_0x554679(0x26a)](this['_statusWindow']),_0x5f0810[_0x554679(0x125)]('ok',this['onIngredientListOk'][_0x554679(0x2cc)](this)),_0x5f0810['setHandler']('cancel',this[_0x554679(0x16c)]['bind'](this)),this['_ingredientSelectList']=_0x5f0810,this[_0x554679(0x2d8)](this[_0x554679(0x1a9)]);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0xf2)]=function(){const _0x1ba2c8=_0x44f27e;this[_0x1ba2c8(0xdb)][_0x1ba2c8(0x136)](),this[_0x1ba2c8(0xdb)][_0x1ba2c8(0x185)](0x0);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x1c7)]=function(){const _0x507ef0=_0x44f27e;$gameTemp['_bypassProxy']=!![],this[_0x507ef0(0x202)]=this['_itemWindow'][_0x507ef0(0x215)](),this[_0x507ef0(0xdb)][_0x507ef0(0x1c3)](),this[_0x507ef0(0x135)]();if(this[_0x507ef0(0x197)]()){if(_0x507ef0(0x20a)===_0x507ef0(0x22e)){if(!_0x233cf2)return![];if(!_0x5a06a4[_0x507ef0(0x1ba)][_0x507ef0(0x30a)][_0x507ef0(0x2f4)][_0x507ef0(0x27c)])return![];_0x5b5cb6[_0x507ef0(0x2cd)]&&(_0x1ab2c9=_0x2fb71d[_0x507ef0(0x2cd)](_0x34bacd));const _0x731f51=_0x5630ae['getCustomItemCraftingSettings']();if(_0x731f51&&_0x731f51[_0x507ef0(0x29c)])return![];if(_0xb3724b[_0x507ef0(0x265)][_0x507ef0(0x1f9)](_0x5b5995[_0x507ef0(0x1ba)][_0x507ef0(0xc3)][_0x507ef0(0x21d)]))return![];return!_0x27c268[_0x507ef0(0x109)](_0x1cd545);}else this['setupSelectIngredientWindow']();}else this[_0x507ef0(0x229)]();$gameTemp[_0x507ef0(0x2a6)]=![],this['_item']=this['_itemWindow']['item']();},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x229)]=function(){const _0xf9b894=_0x44f27e;this[_0xf9b894(0x123)][_0xf9b894(0x1c3)](),this[_0xf9b894(0x1a9)]['hide'](),this[_0xf9b894(0x2da)]['show'](),$gameTemp[_0xf9b894(0x2a6)]=!![],this[_0xf9b894(0x292)][_0xf9b894(0xdf)](this[_0xf9b894(0xdb)]['item']()),$gameTemp['_bypassProxy']=![],this[_0xf9b894(0x292)][_0xf9b894(0x128)](),this[_0xf9b894(0x292)][_0xf9b894(0x136)]();},Scene_ItemCrafting[_0x44f27e(0x294)]['activateItemWindow']=function(){const _0xcbe4f3=_0x44f27e;this['_numberWindow'][_0xcbe4f3(0x1c3)](),this[_0xcbe4f3(0x123)][_0xcbe4f3(0x1c3)](),this['_ingredientSelectList']['hide'](),this[_0xcbe4f3(0x2da)][_0xcbe4f3(0x128)](),this[_0xcbe4f3(0xdb)][_0xcbe4f3(0x128)](),this[_0xcbe4f3(0xdb)][_0xcbe4f3(0x136)](),this[_0xcbe4f3(0xdb)][_0xcbe4f3(0x17c)]();},Scene_ItemCrafting[_0x44f27e(0x294)]['onNumberOk']=function(){const _0x20b880=_0x44f27e;VisuMZ['ItemCraftingSys']['Settings'][_0x20b880(0x312)][_0x20b880(0x219)]?_0x20b880(0x2c5)!==_0x20b880(0x21f)?this[_0x20b880(0x205)]():(this[_0x20b880(0xe0)][_0x20b880(0x2e1)]=!![],this['_animationPlaying']=![],this[_0x20b880(0x105)](),this['onItemCrafted'](),this['onAnimationFinish']()):this[_0x20b880(0x1a0)]();},Scene_ItemCrafting['prototype'][_0x44f27e(0x1a0)]=function(){const _0x1d23ba=_0x44f27e;this[_0x1d23ba(0xe0)]['visible']=!![],this[_0x1d23ba(0x188)]=![],this[_0x1d23ba(0x105)](),this[_0x1d23ba(0x1c6)](),this[_0x1d23ba(0x16a)]();},Scene_ItemCrafting[_0x44f27e(0x294)]['onAnimationFinish']=function(){const _0x4444e4=_0x44f27e;this[_0x4444e4(0x274)]()?this[_0x4444e4(0x2eb)]():_0x4444e4(0xef)===_0x4444e4(0xef)?this['returnBackToItemWindow']():_0x1d30bd[_0x4444e4(0x183)](_0x451a63['id']);},Scene_ItemCrafting[_0x44f27e(0x294)]['returnBackToItemWindow']=function(){const _0x28627d=_0x44f27e;this[_0x28627d(0x209)](),this[_0x28627d(0xdb)][_0x28627d(0xf8)](),this[_0x28627d(0x2da)]['refresh'](),this['_categoryWindow'][_0x28627d(0x1f3)](),this['_categoryWindow'][_0x28627d(0x1f7)](),this[_0x28627d(0x276)][_0x28627d(0xf8)](),this[_0x28627d(0xdb)]['updateHelp']();},Scene_ItemCrafting['prototype'][_0x44f27e(0x105)]=function(){const _0x5594a5=_0x44f27e;$gameTemp['_bypassProxy']=!![];let _0x292193=this[_0x5594a5(0xdb)][_0x5594a5(0x215)]();$gameTemp[_0x5594a5(0x2a6)]=![];const _0x154e84=this[_0x5594a5(0x292)][_0x5594a5(0x278)](),_0x29961f=DataManager[_0x5594a5(0x22b)](_0x292193);let _0x453cdc=0x0;for(const _0x19b193 of _0x29961f){if(_0x5594a5(0x164)!==_0x5594a5(0x2c4)){if(!_0x19b193)continue;let _0x117d7d=_0x19b193[0x0];const _0xa11d6f=_0x19b193[0x1]*_0x154e84;_0x117d7d===_0x5594a5(0x1cd)?$gameParty[_0x5594a5(0x1fe)](_0xa11d6f):_0x5594a5(0x110)===_0x5594a5(0x2d3)?(_0x62fc03[_0x5594a5(0x294)]['initialize'][_0x5594a5(0x116)](this,_0x505b38),this[_0x5594a5(0x129)]=0x0):(typeof _0x117d7d===_0x5594a5(0x2fd)&&_0x117d7d['match'](/CATEGORY/i)&&('pZfUY'===_0x5594a5(0xcc)?(_0x3c4864['ItemCraftingSys'][_0x5594a5(0xc2)][_0x5594a5(0x116)](this,_0x426721),_0x357da3[_0x5594a5(0x1ba)][_0x5594a5(0x1a7)](_0x3cd81e)):(_0x117d7d=this['_ingredientsList'][_0x453cdc],_0x453cdc+=0x1)),$gameParty[_0x5594a5(0xcf)](_0x117d7d,_0xa11d6f,![]));}else return _0x5a2781[_0x5594a5(0x230)](_0x5594a5(0x241),_0x5594a5(0x1e1));}_0x292193=this[_0x5594a5(0xdb)][_0x5594a5(0x215)](),$gameParty['gainItem'](_0x292193,_0x154e84);if(this[_0x5594a5(0x292)][_0x5594a5(0x278)]()>0x0){if(_0x5594a5(0x257)!=='aQbRg')SoundManager[_0x5594a5(0x2bc)]();else{if(!_0x50a290['isSceneItemCrafting']())return;const _0x1d5740=_0x37e7b1[_0x5594a5(0x1ba)][_0x5594a5(0x30a)][_0x5594a5(0x1e9)];_0x1d5740[_0x5594a5(0x2f9)]&&_0x5aff26[_0x5594a5(0x15a)](_0x1d5740[_0x5594a5(0x2f9)],!![]);}}else SoundManager['playCancel']();$gameSystem[_0x5594a5(0x2a9)](_0x292193,_0x154e84);},Scene_ItemCrafting[_0x44f27e(0x294)]['onItemCrafted']=function(){const _0x5c95ec=_0x44f27e,_0x24a83f=this[_0x5c95ec(0x202)],_0x1f3573=this[_0x5c95ec(0x292)]['number']();VisuMZ[_0x5c95ec(0x1ba)][_0x5c95ec(0x163)](_0x24a83f,!![]),VisuMZ[_0x5c95ec(0x1ba)][_0x5c95ec(0x163)](_0x24a83f,![]),this[_0x5c95ec(0x2b9)]();const _0x46ac7a=DataManager[_0x5c95ec(0x10d)](_0x24a83f);VisuMZ[_0x5c95ec(0x1ba)]['JS'][_0x46ac7a]&&(_0x5c95ec(0x267)!==_0x5c95ec(0x1b8)?VisuMZ[_0x5c95ec(0x1ba)]['JS'][_0x46ac7a][_0x5c95ec(0x116)](this,_0x24a83f,_0x1f3573):(this[_0x5c95ec(0x2d0)]['bitmap']=_0x8d312f['loadSystem'](_0x5c95ec(0x2b3)),this[_0x5c95ec(0x2d0)][_0x5c95ec(0x192)]['smooth']=![])),VisuMZ[_0x5c95ec(0x1ba)][_0x5c95ec(0x30a)][_0x5c95ec(0x1e9)][_0x5c95ec(0x2c2)]['call'](this,_0x24a83f,_0x1f3573);},VisuMZ['ItemCraftingSys']['TurnSwitches']=function(_0x176032,_0x3f9feb){const _0x431b5f=_0x44f27e,_0x4ee29b=_0x3f9feb?VisuMZ[_0x431b5f(0x1ba)][_0x431b5f(0xc3)][_0x431b5f(0xd0)]:VisuMZ[_0x431b5f(0x1ba)][_0x431b5f(0xc3)][_0x431b5f(0x1da)],_0x287d4d=_0x176032[_0x431b5f(0x265)][_0x431b5f(0x1f9)](_0x4ee29b);if(_0x287d4d)for(const _0x42c862 of _0x287d4d){if(_0x431b5f(0x190)!=='qumYV')this[_0x431b5f(0x2da)][_0x431b5f(0x30c)](_0x4f1ba4[_0x431b5f(0x283)]);else{if(!_0x42c862)continue;_0x42c862[_0x431b5f(0x1f9)](_0x4ee29b);const _0x2c5dd7=JSON['parse']('['+RegExp['$1'][_0x431b5f(0x1f9)](/\d+/g)+']');for(const _0xe8753a of _0x2c5dd7){$gameSwitches[_0x431b5f(0x15a)](_0xe8753a,_0x3f9feb);}}}},Scene_ItemCrafting[_0x44f27e(0x294)]['onNumberCancel']=function(){const _0xfc76c5=_0x44f27e;SoundManager['playCancel'](),this[_0xfc76c5(0x16c)]();},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x14c)]=function(){const _0x466d96=_0x44f27e,_0x3eb4a4=this['_ingredientSelectList'][_0x466d96(0x215)]();this[_0x466d96(0x285)][this['_ingredientIndex']]=_0x3eb4a4,this[_0x466d96(0x314)]++,this[_0x466d96(0x2ec)]();},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x16c)]=function(){const _0x4b8a51=_0x44f27e;this['_ingredientsList'][_0x4b8a51(0x1b1)](),this['_ingredientIndex']--;if(this['_ingredientIndex']<0x0){if(_0x4b8a51(0x2a0)===_0x4b8a51(0x251))return _0x3f656a[_0x4b8a51(0x294)][_0x4b8a51(0x268)][_0x4b8a51(0x116)](this);else this[_0x4b8a51(0x209)]();}else this[_0x4b8a51(0x2ec)]();},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x135)]=function(){const _0x283c3e=_0x44f27e;this[_0x283c3e(0x307)]=[],this[_0x283c3e(0x297)]=[],this[_0x283c3e(0x285)]=[],this[_0x283c3e(0x314)]=0x0;},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x197)]=function(){const _0x5162be=_0x44f27e;if(!this[_0x5162be(0x202)])return![];const _0x349226=DataManager[_0x5162be(0x22b)](this[_0x5162be(0x202)]);for(const _0x32cc3d of _0x349226){if(!_0x32cc3d)continue;const _0x270ce5=_0x32cc3d[0x0];if(!_0x270ce5)continue;if(typeof _0x270ce5===_0x5162be(0x2fd)&&_0x270ce5[_0x5162be(0x1f9)](/CATEGORY/i)){_0x270ce5[_0x5162be(0x1f9)](/CATEGORY: (.*)/i);const _0x592e33=String(RegExp['$1'])[_0x5162be(0x2d2)]();this[_0x5162be(0x307)][_0x5162be(0x183)](_0x592e33),this['_ingredientAmounts'][_0x5162be(0x183)](_0x32cc3d[0x1]||0x1);}}return this[_0x5162be(0x307)][_0x5162be(0x210)]>0x0;},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x2ec)]=function(){const _0x310979=_0x44f27e;if(this['_ingredientIndex']>=this[_0x310979(0x307)]['length'])return this[_0x310979(0x229)]();this[_0x310979(0x2da)][_0x310979(0x1c3)](),this[_0x310979(0x292)][_0x310979(0x1c3)]();const _0x2a8e9f=this[_0x310979(0x307)][this[_0x310979(0x314)]],_0x19e91f=this['_ingredientAmounts'][this[_0x310979(0x314)]];this[_0x310979(0x123)][_0x310979(0x128)](),this[_0x310979(0x1a9)][_0x310979(0x128)](),this[_0x310979(0x123)][_0x310979(0x243)][_0x310979(0xc1)]();const _0x596948=VisuMZ['ItemCraftingSys'][_0x310979(0x30a)][_0x310979(0x1e9)][_0x310979(0x2ff)],_0x1ed67c=VisuMZ[_0x310979(0x177)]['Settings'][_0x310979(0x1d2)][_0x310979(0x14b)],_0x21b74b=_0x596948[_0x310979(0xfc)](_0x2a8e9f,_0x1ed67c[_0x310979(0xfc)](_0x19e91f)),_0x1d9ef2=this['_ingredientSelectTitle'][_0x310979(0x181)](0x0);this[_0x310979(0x123)][_0x310979(0x26c)](_0x21b74b,_0x1d9ef2['x'],_0x1d9ef2['y']),this['_ingredientSelectList'][_0x310979(0xdf)](_0x2a8e9f,_0x19e91f);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x159)]=function(){const _0x16eb18=_0x44f27e;if(this[_0x16eb18(0x292)]&&this[_0x16eb18(0x292)]['active'])return TextManager[_0x16eb18(0x230)]('left','right');return Scene_Item[_0x16eb18(0x294)][_0x16eb18(0x159)][_0x16eb18(0x116)](this);},Scene_ItemCrafting['prototype'][_0x44f27e(0x1f1)]=function(){const _0x4799a5=_0x44f27e;if(this[_0x4799a5(0x292)]&&this[_0x4799a5(0x292)][_0x4799a5(0x2e6)])return TextManager[_0x4799a5(0x230)]('up',_0x4799a5(0x19d));return Scene_Item['prototype'][_0x4799a5(0x1f1)][_0x4799a5(0x116)](this);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x18a)]=function(){const _0x1e0a5d=_0x44f27e;if(this[_0x1e0a5d(0x237)]())return VisuMZ[_0x1e0a5d(0x177)][_0x1e0a5d(0x30a)][_0x1e0a5d(0x1d2)][_0x1e0a5d(0x310)];else{if(this[_0x1e0a5d(0x292)]&&this[_0x1e0a5d(0x292)][_0x1e0a5d(0x2e6)]){if('dxcfZ'==='oBoLl')this[_0x1e0a5d(0x205)]();else return VisuMZ[_0x1e0a5d(0x177)][_0x1e0a5d(0x30a)][_0x1e0a5d(0xe4)][_0x1e0a5d(0x2a8)];}}return Scene_Item['prototype'][_0x1e0a5d(0x18a)][_0x1e0a5d(0x116)](this);},Scene_ItemCrafting['prototype'][_0x44f27e(0x1e6)]=function(){const _0x382c7a=_0x44f27e;if(this[_0x382c7a(0x292)]&&this[_0x382c7a(0x292)][_0x382c7a(0x2e6)])return VisuMZ[_0x382c7a(0x177)][_0x382c7a(0x30a)][_0x382c7a(0xe4)][_0x382c7a(0x1f4)];return Scene_Item[_0x382c7a(0x294)][_0x382c7a(0x1e6)][_0x382c7a(0x116)](this);},Scene_ItemCrafting['prototype'][_0x44f27e(0x1e5)]=function(){const _0x2d9216=_0x44f27e;return this['_numberWindow']&&this[_0x2d9216(0x292)][_0x2d9216(0x2e6)]?TextManager['itemCraftingNumberWindowOk']:Scene_Item['prototype'][_0x2d9216(0x1e5)][_0x2d9216(0x116)](this);},Scene_ItemCrafting[_0x44f27e(0x294)]['createBackground']=function(){const _0x492082=_0x44f27e;Scene_MenuBase[_0x492082(0x294)][_0x492082(0x199)]['call'](this),this['setBackgroundOpacity'](this[_0x492082(0x194)]()),this['createCustomBackgroundImages']();},Scene_ItemCrafting['prototype'][_0x44f27e(0x194)]=function(){const _0x10d3f8=_0x44f27e;return VisuMZ[_0x10d3f8(0x1ba)][_0x10d3f8(0x30a)][_0x10d3f8(0xc9)][_0x10d3f8(0x11d)];},Scene_ItemCrafting[_0x44f27e(0x294)]['createCustomBackgroundImages']=function(){const _0x13f8b5=_0x44f27e,_0x308fed={'BgFilename1':VisuMZ[_0x13f8b5(0x1ba)][_0x13f8b5(0x30a)][_0x13f8b5(0xc9)]['BgFilename1'],'BgFilename2':VisuMZ[_0x13f8b5(0x1ba)][_0x13f8b5(0x30a)][_0x13f8b5(0xc9)][_0x13f8b5(0x2aa)]};if(_0x308fed&&(_0x308fed[_0x13f8b5(0x100)]!==''||_0x308fed['BgFilename2']!=='')){if(_0x13f8b5(0x1cc)==='bXcBr'){let _0x3326b2=_0x5abacb-_0x1abeeb[_0x13f8b5(0x178)](_0x4ee6a0[_0x13f8b5(0x28d)]/0x2),_0x9b8a7=_0x1e6539+_0x1d4e1b['round']((this[_0x13f8b5(0x1ce)]()-_0x20fa34[_0x13f8b5(0x298)])/0x2);const _0xa0c6fc=_0x3c548f[_0x13f8b5(0x1b3)]?_0x57148b[_0x13f8b5(0x1b3)][_0x13f8b5(0x30a)][_0x13f8b5(0x23c)][_0x13f8b5(0x311)]:0x0;this[_0x13f8b5(0x1c1)](_0xa0c6fc,_0x3326b2,_0x9b8a7);}else this[_0x13f8b5(0x147)]=new Sprite(ImageManager[_0x13f8b5(0x1ac)](_0x308fed['BgFilename1'])),this[_0x13f8b5(0x11f)]=new Sprite(ImageManager[_0x13f8b5(0x270)](_0x308fed[_0x13f8b5(0x2aa)])),this[_0x13f8b5(0x1ad)](this[_0x13f8b5(0x147)]),this[_0x13f8b5(0x1ad)](this[_0x13f8b5(0x11f)]),this[_0x13f8b5(0x147)][_0x13f8b5(0x192)][_0x13f8b5(0x172)](this['adjustSprite'][_0x13f8b5(0x2cc)](this,this[_0x13f8b5(0x147)])),this[_0x13f8b5(0x11f)]['bitmap'][_0x13f8b5(0x172)](this[_0x13f8b5(0x2c7)][_0x13f8b5(0x2cc)](this,this['_backSprite2']));}},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x2c7)]=function(_0x21a5ca){const _0xc8d332=_0x44f27e;this['scaleSprite'](_0x21a5ca),this[_0xc8d332(0xdc)](_0x21a5ca);},Scene_ItemCrafting['prototype'][_0x44f27e(0x205)]=function(){const _0x5d5fde=_0x44f27e;this['_animationPlaying']=!![],this[_0x5d5fde(0xf6)]=0x14,this['_windowLayer']['visible']=VisuMZ['ItemCraftingSys'][_0x5d5fde(0x30a)][_0x5d5fde(0x312)]['ShowWindows']||![],this[_0x5d5fde(0x1fb)]();},Scene_ItemCrafting[_0x44f27e(0x294)]['createItemSprite']=function(){const _0x21c6de=_0x44f27e;this['_itemSprite']=new Sprite(),this[_0x21c6de(0x1ad)](this['_itemSprite']),this['setItemSpriteBitmap'](),this[_0x21c6de(0x23f)](),this[_0x21c6de(0x30b)](),this[_0x21c6de(0x198)](),this[_0x21c6de(0x29f)](),this[_0x21c6de(0x200)](this['_animationIDs']['shift']());},Scene_ItemCrafting[_0x44f27e(0x294)]['setItemSpriteBitmap']=function(){const _0x113b72=_0x44f27e,_0x3230d0=VisuMZ[_0x113b72(0x1ba)][_0x113b72(0xc3)],_0x5466a5=this[_0x113b72(0x202)][_0x113b72(0x265)];this[_0x113b72(0x277)]='';if(_0x5466a5[_0x113b72(0x1f9)](_0x3230d0[_0x113b72(0x1e8)]))_0x113b72(0x204)!==_0x113b72(0x204)?(this[_0x113b72(0x292)]['hide'](),this[_0x113b72(0x123)]['hide'](),this[_0x113b72(0x1a9)][_0x113b72(0x1c3)](),this[_0x113b72(0x2da)]['show'](),this['_itemWindow'][_0x113b72(0x128)](),this[_0x113b72(0xdb)][_0x113b72(0x136)](),this['_itemWindow'][_0x113b72(0x17c)]()):this[_0x113b72(0x277)]=String(RegExp['$1']);else _0x5466a5[_0x113b72(0x1f9)](_0x3230d0[_0x113b72(0x28e)])&&(this[_0x113b72(0x277)]=String(RegExp['$1']));this[_0x113b72(0x2d0)]=new Sprite();this[_0x113b72(0x277)]?'weZcw'!==_0x113b72(0x1a5)?this[_0x113b72(0x132)][_0x113b72(0x30c)](_0xa48ee0[_0x113b72(0x231)]):this['_iconSprite'][_0x113b72(0x192)]=ImageManager[_0x113b72(0x1cf)](this[_0x113b72(0x277)]):(this[_0x113b72(0x2d0)]['bitmap']=ImageManager[_0x113b72(0x2ed)]('IconSet'),this[_0x113b72(0x2d0)][_0x113b72(0x192)]['smooth']=![]);this[_0x113b72(0x2d0)][_0x113b72(0x24d)]['x']=0.5,this['_iconSprite'][_0x113b72(0x24d)]['y']=0.5;if(!this['_craftPicture']){if(_0x113b72(0x25a)!=='dBftN'){const _0x4518db=VisuMZ[_0x113b72(0x1ba)]['Settings'][_0x113b72(0x312)][_0x113b72(0x2e8)]||0x8;this['_iconSprite'][_0x113b72(0x1a1)]['x']=_0x4518db,this[_0x113b72(0x2d0)][_0x113b72(0x1a1)]['y']=_0x4518db;}else _0x56bdb8[_0x113b72(0x294)]['update'][_0x113b72(0x116)](this),this[_0x113b72(0xce)]();}this[_0x113b72(0x14f)][_0x113b72(0x1ad)](this[_0x113b72(0x2d0)]);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x23f)]=function(){const _0xa5422a=_0x44f27e;if(this['_craftPicture'])return;const _0x29ccd8=this[_0xa5422a(0x202)],_0x45aa5a=_0x29ccd8[_0xa5422a(0x291)],_0x54fdda=ImageManager[_0xa5422a(0x28d)],_0x15f4d9=ImageManager[_0xa5422a(0x298)],_0x1a178b=_0x45aa5a%0x10*_0x54fdda,_0x321172=Math[_0xa5422a(0x158)](_0x45aa5a/0x10)*_0x15f4d9;this['_iconSprite']['setFrame'](_0x1a178b,_0x321172,_0x54fdda,_0x15f4d9);},Scene_ItemCrafting[_0x44f27e(0x294)]['setItemSpritePosition']=function(){const _0x43c07f=_0x44f27e;this[_0x43c07f(0x14f)]['x']=Math[_0x43c07f(0x178)](Graphics['width']/0x2);const _0x4db39a=Math[_0x43c07f(0x178)](ImageManager[_0x43c07f(0x298)]*this[_0x43c07f(0x14f)]['scale']['y']);this[_0x43c07f(0x14f)]['y']=Math[_0x43c07f(0x178)]((Graphics[_0x43c07f(0x29b)]+_0x4db39a)/0x2);},Scene_ItemCrafting['prototype'][_0x44f27e(0x198)]=function(){const _0x5c3227=_0x44f27e;this[_0x5c3227(0x2f6)]=VisuMZ[_0x5c3227(0x1ba)][_0x5c3227(0x30a)]['Animation'][_0x5c3227(0x23a)]||0x1,this[_0x5c3227(0x202)][_0x5c3227(0x265)][_0x5c3227(0x1f9)](VisuMZ[_0x5c3227(0x1ba)][_0x5c3227(0xc3)][_0x5c3227(0x1e0)])&&(this[_0x5c3227(0x2f6)]=Math[_0x5c3227(0x273)](Number(RegExp['$1']),0x1)),this[_0x5c3227(0x14f)][_0x5c3227(0x182)]=0x0;},Scene_ItemCrafting['prototype'][_0x44f27e(0x29f)]=function(){const _0x53247c=_0x44f27e;this['_animationIDs']=[],this[_0x53247c(0x202)]['note'][_0x53247c(0x1f9)](VisuMZ[_0x53247c(0x1ba)][_0x53247c(0xc3)]['animationIDs'])?this['_animationIDs']=RegExp['$1'][_0x53247c(0x300)](',')[_0x53247c(0x18b)](_0x25c8ec=>Number(_0x25c8ec)):this['_animationIDs']=this[_0x53247c(0x14e)][_0x53247c(0xda)](VisuMZ[_0x53247c(0x1ba)][_0x53247c(0x30a)][_0x53247c(0x312)][_0x53247c(0x240)]);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x200)]=function(_0x15f2f9){const _0x31495c=_0x44f27e,_0x27c5e7=$dataAnimations[_0x15f2f9];if(!_0x27c5e7)return;const _0x21288b=this[_0x31495c(0x23d)](_0x27c5e7);this[_0x31495c(0x1b6)]=new(_0x21288b?Sprite_AnimationMV:Sprite_Animation)();const _0x143fc5=[this[_0x31495c(0x14f)]],_0xa814b9=0x0;this[_0x31495c(0x1b6)][_0x31495c(0xdf)](_0x143fc5,_0x27c5e7,![],_0xa814b9,null),this[_0x31495c(0x1ad)](this['_animationSprite']);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x23d)]=function(_0x2fdd6c){const _0x5e8bc7=_0x44f27e;return!!_0x2fdd6c[_0x5e8bc7(0x1de)];},Scene_ItemCrafting['prototype'][_0x44f27e(0xce)]=function(){const _0x53aa13=_0x44f27e;if(!this[_0x53aa13(0x188)])return;this[_0x53aa13(0x13f)](),this[_0x53aa13(0x137)](),this[_0x53aa13(0x201)]()&&this['processFinishAnimation']();},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x13f)]=function(){const _0x372759=_0x44f27e;this[_0x372759(0x14f)][_0x372759(0x182)]+=this[_0x372759(0x2f6)];},Scene_ItemCrafting['prototype'][_0x44f27e(0x137)]=function(){const _0x5526d8=_0x44f27e;if(!this[_0x5526d8(0x1b6)])return;if(this[_0x5526d8(0x1b6)][_0x5526d8(0x1f2)]())return;this[_0x5526d8(0x2cb)](),this[_0x5526d8(0x200)](this[_0x5526d8(0x14e)][_0x5526d8(0x23b)]());},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x2cb)]=function(){const _0xe30949=_0x44f27e;if(!this[_0xe30949(0x1b6)])return;this['removeChild'](this['_animationSprite']),this[_0xe30949(0x1b6)][_0xe30949(0x16e)](),this[_0xe30949(0x1b6)]=undefined;},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x2ca)]=function(){const _0x57635b=_0x44f27e;if(!this[_0x57635b(0x14f)])return;this[_0x57635b(0x247)](this['_itemSprite']),this['_itemSprite'][_0x57635b(0x16e)](),this[_0x57635b(0x14f)]=undefined;},Scene_ItemCrafting['prototype'][_0x44f27e(0x201)]=function(){const _0x2b9231=_0x44f27e;if(TouchInput[_0x2b9231(0x13d)]())return!![];if(Input[_0x2b9231(0x1a8)]('ok'))return!![];if(Input[_0x2b9231(0x1a8)](_0x2b9231(0x2a7)))return!![];if(this[_0x2b9231(0x14f)][_0x2b9231(0x182)]<0xff)return![];if(this[_0x2b9231(0x1b6)])return![];return this[_0x2b9231(0xf6)]--<=0x0;},Scene_ItemCrafting['prototype'][_0x44f27e(0x1af)]=function(){const _0xe6e04e=_0x44f27e;this['destroyAnimationSprite'](),this[_0xe6e04e(0x2ca)](),this[_0xe6e04e(0x1a0)](),TouchInput['clear'](),Input[_0xe6e04e(0xc1)]();},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x14a)]=function(){const _0x14adfb=_0x44f27e;Scene_Item[_0x14adfb(0x294)][_0x14adfb(0x14a)][_0x14adfb(0x116)](this);if($gameSystem[_0x14adfb(0x211)])return;$gameTemp[_0x14adfb(0x290)]();},Scene_ItemCrafting['prototype'][_0x44f27e(0x1a3)]=function(){const _0x370b73=_0x44f27e;if(!SceneManager[_0x370b73(0x121)]())return;const _0x3fde09=VisuMZ[_0x370b73(0x1ba)][_0x370b73(0x30a)][_0x370b73(0x1e9)];_0x3fde09[_0x370b73(0x2f9)]&&$gameSwitches[_0x370b73(0x15a)](_0x3fde09['SwitchCraft'],![]);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x2b9)]=function(){const _0x17b4e6=_0x44f27e;if(!SceneManager[_0x17b4e6(0x121)]())return;const _0x4fdb80=VisuMZ[_0x17b4e6(0x1ba)][_0x17b4e6(0x30a)][_0x17b4e6(0x1e9)];_0x4fdb80[_0x17b4e6(0x2f9)]&&$gameSwitches['setValue'](_0x4fdb80[_0x17b4e6(0x2f9)],!![]);},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x274)]=function(){const _0x53f69b=_0x44f27e;if(!Imported[_0x53f69b(0x286)])return![];const _0x46ba12=this[_0x53f69b(0x202)]?this[_0x53f69b(0x202)][_0x53f69b(0x265)]||'':'',_0x15a355=VisuMZ['ItemCraftingSys'][_0x53f69b(0xc3)];if(_0x46ba12['match'](_0x15a355['CraftEventOnce'])&&!$gameSystem[_0x53f69b(0xe3)](this[_0x53f69b(0x202)])&&this[_0x53f69b(0xfb)](!![]))return _0x53f69b(0x26d)===_0x53f69b(0x1aa)?this[_0x53f69b(0x2c8)]()[_0x53f69b(0x139)](_0x30f717=>this[_0x53f69b(0x288)](_0x30f717)):!![];else{if(_0x46ba12['match'](_0x15a355[_0x53f69b(0x2df)])&&this[_0x53f69b(0xfb)](![])){if(_0x53f69b(0x11b)!==_0x53f69b(0x118))return!![];else _0x2d607b[_0x53f69b(0x1ba)]['Window_Selectable_select'][_0x53f69b(0x116)](this,_0x50d53c),this['constructor']===_0xd5573a&&_0x35a9bf[_0x53f69b(0x121)]()&&_0x2dd748>=0x0&&(this['_lastSymbol']=this[_0x53f69b(0x2c0)](_0x3001fd)||'');}}return![];},Scene_ItemCrafting['prototype'][_0x44f27e(0xfb)]=function(_0x24e7f7){const _0x209c1a=_0x44f27e,_0x38c20b=this['_item']?this[_0x209c1a(0x202)][_0x209c1a(0x265)]:'',_0x429c62=VisuMZ[_0x209c1a(0x1ba)][_0x209c1a(0xc3)],_0x821941=_0x24e7f7?_0x209c1a(0x22f):_0x209c1a(0x225);if(_0x38c20b['match'](_0x429c62[_0x821941+_0x209c1a(0x13b)])){const _0x3ba035=RegExp['$1'][_0x209c1a(0x300)](',')[_0x209c1a(0x18b)](_0x11cade=>Number(_0x11cade));for(const _0x567394 of _0x3ba035){if($gameSwitches['value'](_0x567394)===![])return![];}}if(_0x38c20b[_0x209c1a(0x1f9)](_0x429c62[_0x821941+_0x209c1a(0x255)])){const _0x34e92c=RegExp['$1'][_0x209c1a(0x300)](',')[_0x209c1a(0x18b)](_0xf5e4e2=>Number(_0xf5e4e2));for(const _0x4e4081 of _0x34e92c){if($gameSwitches['value'](_0x4e4081)===!![])return!![];}return![];}return!![];},Scene_ItemCrafting[_0x44f27e(0x294)][_0x44f27e(0x2eb)]=function(){const _0x37ba80=_0x44f27e,_0x202dac=this[_0x37ba80(0x202)]?this['_item'][_0x37ba80(0x265)]:'',_0x5c02b5=VisuMZ[_0x37ba80(0x1ba)][_0x37ba80(0xc3)];let _0x24b6b4=0x0;if(this[_0x37ba80(0xfb)](!![])&&_0x202dac[_0x37ba80(0x1f9)](_0x5c02b5[_0x37ba80(0x1e2)])&&!$gameSystem['hasCraftingEventOccurred'](this[_0x37ba80(0x202)]))_0x24b6b4=Number(RegExp['$1'])||0x1,$gameSystem[_0x37ba80(0x236)](this[_0x37ba80(0x202)]);else this[_0x37ba80(0xfb)](![])&&_0x202dac['match'](_0x5c02b5[_0x37ba80(0x2df)])&&(_0x24b6b4=Number(RegExp['$1'])||0x1);if(_0x24b6b4<=0x0){if(_0x37ba80(0x1d7)!==_0x37ba80(0x1d7)){if(this[_0x37ba80(0x289)]){const _0x5baa5d=_0x4ba586[_0x37ba80(0x1ba)]['Settings'][_0x37ba80(0x1e9)];this['contents'][_0x37ba80(0xc0)]=_0x347c8e['getColor'](_0x5baa5d[_0x37ba80(0x1d1)]),_0x482963+=_0x5baa5d[_0x37ba80(0x27d)];}_0x3b98d1['prototype']['drawText'][_0x37ba80(0x116)](this,_0x2c94b1,_0x265f48,_0x243b3a,_0xc10107,_0x4facdb);}else{this[_0x37ba80(0x221)]();return;}}$gameSystem[_0x37ba80(0x211)]=!![],$gameTemp[_0x37ba80(0x315)](_0x24b6b4),SceneManager['goto'](Scene_Map);},VisuMZ[_0x44f27e(0x1ba)][_0x44f27e(0x12d)]=Window_MenuCommand[_0x44f27e(0x294)][_0x44f27e(0x212)],Window_MenuCommand['prototype']['addOriginalCommands']=function(){const _0x124af5=_0x44f27e;VisuMZ[_0x124af5(0x1ba)][_0x124af5(0x12d)][_0x124af5(0x116)](this),this[_0x124af5(0x239)]();},Window_MenuCommand['prototype'][_0x44f27e(0x239)]=function(){const _0x59894c=_0x44f27e;if(!this[_0x59894c(0x1d9)]())return;if(!this['isItemCraftingCommandVisible']())return;const _0xfd9437=TextManager[_0x59894c(0x130)],_0x825f91=this['isItemCraftingCommandEnabled']();this['addCommand'](_0xfd9437,_0x59894c(0x1c5),_0x825f91);},Window_MenuCommand[_0x44f27e(0x294)][_0x44f27e(0x1d9)]=function(){const _0x2a997d=_0x44f27e;return Imported[_0x2a997d(0x148)]?![]:!![];},Window_MenuCommand['prototype'][_0x44f27e(0x26e)]=function(){const _0x12dfa8=_0x44f27e;return $gameSystem[_0x12dfa8(0x155)]();},Window_MenuCommand['prototype'][_0x44f27e(0x114)]=function(){const _0x26be34=_0x44f27e;if(DataManager[_0x26be34(0x272)]()[_0x26be34(0x210)]<=0x0)return![];return $gameSystem[_0x26be34(0x226)]();},VisuMZ['ItemCraftingSys'][_0x44f27e(0x2e7)]=Window_ItemCategory[_0x44f27e(0x294)][_0x44f27e(0x22c)],Window_ItemCategory['prototype'][_0x44f27e(0x22c)]=function(){const _0x376a70=_0x44f27e;if(SceneManager[_0x376a70(0x121)]()){if('QDExR'===_0x376a70(0xf5))return this[_0x376a70(0x170)]=null,!![];else{this[_0x376a70(0x2e3)]();if(this[_0x376a70(0x2e9)][_0x376a70(0x210)]<=0x0){this['addUncategorizedItemCategory'](),SceneManager[_0x376a70(0x133)]['popScene']();return;}this['createUncategorizedItemCategory']();let _0x257009=this['index']();if(this['_lastSymbol']){const _0x313981=this[_0x376a70(0x1ea)](this[_0x376a70(0x238)]);if(_0x313981>=0x0)_0x257009=_0x313981;}_0x257009=_0x257009>=this[_0x376a70(0x2e9)][_0x376a70(0x210)]?0x0:_0x257009,this[_0x376a70(0x154)](_0x257009);}}else{if('zebHe'!=='Kwonh')VisuMZ[_0x376a70(0x1ba)][_0x376a70(0x2e7)][_0x376a70(0x116)](this);else{if(this['_ItemCrafting_MainMenu']===_0x5e4379)this[_0x376a70(0x2b8)]();this[_0x376a70(0xe8)][_0x376a70(0x313)]=_0x27b44f;}}},Window_ItemCategory[_0x44f27e(0x294)][_0x44f27e(0x1f5)]=function(){const _0x36808f=_0x44f27e,_0x5374ce=Window_ItemCategory['categoryList'],_0x3307fb=DataManager['currentCraftableItems']()['clone'](),_0x18ac7e=[];for(const _0x580555 of _0x5374ce){this[_0x36808f(0x170)]=_0x580555['Type'];for(const _0x316486 of _0x3307fb){Window_ItemList[_0x36808f(0x294)]['includes'][_0x36808f(0x116)](this,_0x316486)&&_0x18ac7e[_0x36808f(0x183)](_0x316486);}}this[_0x36808f(0x170)]=null;for(const _0x37562d of _0x18ac7e){_0x3307fb[_0x36808f(0x112)](_0x37562d);}_0x3307fb[_0x36808f(0x210)]>0x0&&(_0x36808f(0x18f)===_0x36808f(0x18f)?this[_0x36808f(0x189)]():_0x276324[_0x36808f(0x183)](_0x8eb486['floor'](_0x3ee3d6[_0x36808f(0x1cd)]()/_0x46b801))),this[_0x36808f(0x17e)]=_0x3307fb;},Window_ItemCategory['prototype'][_0x44f27e(0x189)]=function(){const _0x53b94d=_0x44f27e,_0x3057ca=VisuMZ[_0x53b94d(0x1ba)][_0x53b94d(0x30a)]['General'];let _0x36df97=_0x3057ca[_0x53b94d(0x260)]||_0x53b94d(0x260),_0x6692e0=_0x3057ca[_0x53b94d(0x10b)]||0xa0;_0x36df97=_0x53b94d(0x1c4)[_0x53b94d(0xfc)](_0x6692e0,_0x36df97),this[_0x53b94d(0x242)](_0x36df97,_0x53b94d(0x1e4),!![],_0x53b94d(0x2f3));},VisuMZ['ItemCraftingSys'][_0x44f27e(0x120)]=Window_ItemCategory['prototype']['addItemCategory'],Window_ItemCategory[_0x44f27e(0x294)][_0x44f27e(0x18d)]=function(_0x27ae51){const _0x1e6823=_0x44f27e;if(SceneManager[_0x1e6823(0x121)]()&&!this['isItemCraftingCategoryValid'](_0x27ae51))return;VisuMZ[_0x1e6823(0x1ba)][_0x1e6823(0x120)][_0x1e6823(0x116)](this,_0x27ae51);},Window_ItemCategory[_0x44f27e(0x294)]['isItemCraftingCategoryValid']=function(_0x354539){const _0x28f6cf=_0x44f27e,_0x4ffcbf=DataManager[_0x28f6cf(0x272)](),_0x2b3802=_0x354539[_0x28f6cf(0x2d1)],_0x72b9e6=_0x354539[_0x28f6cf(0x157)];this[_0x28f6cf(0x170)]=_0x2b3802;for(const _0x590072 of _0x4ffcbf){if(!_0x590072)continue;if(Window_ItemList['prototype']['includes'][_0x28f6cf(0x116)](this,_0x590072))return this[_0x28f6cf(0x170)]=null,!![];}return this[_0x28f6cf(0x170)]=null,![];},VisuMZ[_0x44f27e(0x1ba)][_0x44f27e(0x151)]=Window_ItemCategory[_0x44f27e(0x294)]['needsSelection'],Window_ItemCategory[_0x44f27e(0x294)]['needsSelection']=function(){const _0x1b616f=_0x44f27e;if(SceneManager[_0x1b616f(0x121)]())return!![];return VisuMZ[_0x1b616f(0x1ba)][_0x1b616f(0x151)]['call'](this);},VisuMZ[_0x44f27e(0x1ba)][_0x44f27e(0x303)]=Window_Selectable[_0x44f27e(0x294)][_0x44f27e(0x154)],Window_Selectable[_0x44f27e(0x294)][_0x44f27e(0x154)]=function(_0x17909e){const _0x329e6b=_0x44f27e;VisuMZ[_0x329e6b(0x1ba)][_0x329e6b(0x303)][_0x329e6b(0x116)](this,_0x17909e),this[_0x329e6b(0x1ab)]===Window_ItemCategory&&SceneManager[_0x329e6b(0x121)]()&&_0x17909e>=0x0&&(this['_lastSymbol']=this['commandSymbol'](_0x17909e)||'');};function Window_ItemCraftingList(){this['initialize'](...arguments);}Window_ItemCraftingList['prototype']=Object[_0x44f27e(0x2b2)](Window_ItemList[_0x44f27e(0x294)]),Window_ItemCraftingList['prototype'][_0x44f27e(0x1ab)]=Window_ItemCraftingList,Window_ItemCraftingList[_0x44f27e(0x262)]=VisuMZ[_0x44f27e(0x1ba)]['Settings'][_0x44f27e(0x316)][_0x44f27e(0x168)],Window_ItemCraftingList[_0x44f27e(0x15b)]=VisuMZ[_0x44f27e(0x1ba)]['Settings']['Mask'][_0x44f27e(0x23e)],Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0xdd)]=function(_0xdbc195){const _0x58a04c=_0x44f27e;Window_ItemList[_0x58a04c(0x294)][_0x58a04c(0xdd)][_0x58a04c(0x116)](this,_0xdbc195),this[_0x58a04c(0x138)]();},Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0x144)]=function(){return 0x1;},Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0x2f1)]=function(){const _0x5a2987=_0x44f27e;return Window_Scrollable['prototype'][_0x5a2987(0x2f1)]['call'](this)*0x3+0x8;},Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0x2ef)]=function(_0x342e1b){return!![];},Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0x180)]=function(){const _0x427eb6=_0x44f27e;this[_0x427eb6(0x302)]=DataManager['currentCraftableItems']()[_0x427eb6(0x139)](_0x36f515=>this['includes'](_0x36f515));const _0xad05b2=this['_data'][_0x427eb6(0x18b)](_0x1c491a=>DataManager[_0x427eb6(0x22b)](_0x1c491a)[_0x427eb6(0x210)]);this[_0x427eb6(0x152)]=Math[_0x427eb6(0x273)](..._0xad05b2)+0x1;},Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0x301)]=function(_0x5390aa){const _0x21d3a9=_0x44f27e;if(this[_0x21d3a9(0x170)]===_0x21d3a9(0x2f3)){const _0x1800a4=SceneManager['_scene'];if(_0x1800a4&&_0x1800a4[_0x21d3a9(0x2da)]&&_0x1800a4[_0x21d3a9(0x2da)][_0x21d3a9(0x17e)]){if(_0x21d3a9(0x1dd)!==_0x21d3a9(0x1dd))_0x5176aa[_0x21d3a9(0x294)][_0x21d3a9(0xdd)][_0x21d3a9(0x116)](this),_0x20147e[_0x21d3a9(0x211)]=_0x40edaf;else return _0x1800a4[_0x21d3a9(0x2da)][_0x21d3a9(0x17e)]['includes'](_0x5390aa);}}return Window_ItemList[_0x21d3a9(0x294)]['includes'][_0x21d3a9(0x116)](this,_0x5390aa);},Window_ItemCraftingList[_0x44f27e(0x294)]['selectLast']=function(){},Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0x2f7)]=function(_0x5d0489){const _0x1ece69=_0x44f27e,_0x247da1=this[_0x1ece69(0x13a)](_0x5d0489);if(!_0x247da1)return;const _0x246dfe=this[_0x1ece69(0xed)](_0x5d0489);this['resetFontSettings'](),this[_0x1ece69(0x17d)](_0x246dfe,0x2),this[_0x1ece69(0x1a4)](_0x5d0489,_0x247da1,_0x246dfe),this[_0x1ece69(0xfa)](_0x247da1,_0x246dfe),this[_0x1ece69(0x1d8)](_0x247da1,_0x246dfe),this[_0x1ece69(0x24f)](_0x247da1,_0x246dfe);},Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0x17d)]=function(_0x477e74,_0x76a876){const _0x431b78=_0x44f27e;_0x76a876=_0x76a876||0x1,this[_0x431b78(0x22d)](![]);const _0x52f80e=ColorManager[_0x431b78(0x22a)](),_0x31f969=ColorManager[_0x431b78(0xfd)](),_0x47f0b9=_0x477e74[_0x431b78(0x15f)]/0x2,_0x5707b4=this[_0x431b78(0x1ce)]();while(_0x76a876--){if(_0x431b78(0x13c)!==_0x431b78(0x13c))return this[_0x431b78(0x229)]();else this['contents'][_0x431b78(0x29e)](_0x477e74['x'],_0x477e74['y'],_0x47f0b9,_0x5707b4,_0x31f969,_0x52f80e),this[_0x431b78(0x243)][_0x431b78(0x29e)](_0x477e74['x']+_0x47f0b9,_0x477e74['y'],_0x47f0b9,_0x5707b4,_0x52f80e,_0x31f969);}this[_0x431b78(0x22d)](!![]);},Window_Base[_0x44f27e(0x294)][_0x44f27e(0x1d8)]=function(_0x23b97b,_0x34fb57){const _0x1dd270=_0x44f27e;let _0x4f7a20=_0x23b97b[_0x1dd270(0xeb)],_0x43214b=_0x34fb57[_0x1dd270(0x29b)]+this[_0x1dd270(0x279)]()*0x2,_0x2c7874=_0x34fb57['y'],_0x4968e7=_0x34fb57['width']-_0x43214b-this['itemPadding']()-ImageManager[_0x1dd270(0x28d)];if(DataManager['isCraftingItemMasked'](_0x23b97b)){if(_0x1dd270(0x12e)!==_0x1dd270(0x14d))_0x4f7a20=VisuMZ[_0x1dd270(0x1ba)]['maskItemName'](_0x23b97b),this[_0x1dd270(0x243)][_0x1dd270(0x1bf)]=Window_ItemCraftingList[_0x1dd270(0x15b)];else{if(_0x2861f1[_0x1dd270(0x272)]()[_0x1dd270(0x210)]<=0x0)return![];return _0x137914[_0x1dd270(0x226)]();}}this['drawText'](_0x4f7a20,_0x43214b,_0x2c7874,_0x4968e7,_0x1dd270(0x241)),this[_0x1dd270(0x243)][_0x1dd270(0x1bf)]=![];},VisuMZ['ItemCraftingSys'][_0x44f27e(0x104)]=function(_0x3f7f31){const _0xf49132=_0x44f27e;DataManager[_0xf49132(0x2cd)]&&(_0x3f7f31=DataManager[_0xf49132(0x2cd)](_0x3f7f31));if(_0x3f7f31[_0xf49132(0x265)]['match'](VisuMZ[_0xf49132(0x1ba)][_0xf49132(0xc3)]['MaskText']))return String(RegExp['$1']);else{if(_0xf49132(0x2ab)===_0xf49132(0x2ab)){const _0xb603c=TextManager[_0xf49132(0x305)];return Array(_0x3f7f31['name'][_0xf49132(0x210)]+0x1)['join'](_0xb603c);}else{_0x36d6da[_0xf49132(0x1ba)]['Scene_Menu_createCommandWindow'][_0xf49132(0x116)](this);const _0x14a035=this['_commandWindow'];_0x14a035[_0xf49132(0x125)]('itemCrafting',this['commandItemCrafting']['bind'](this));}}},Window_ItemCraftingList[_0x44f27e(0x294)]['drawBigItemImage']=function(_0x2bca68,_0x1c1d7b,_0x31286c){const _0xb90971=_0x44f27e,_0x40f0ff=VisuMZ[_0xb90971(0x1ba)][_0xb90971(0xc3)],_0x13a506=_0x1c1d7b[_0xb90971(0x265)];let _0x4871fa='';if(_0x13a506[_0xb90971(0x1f9)](_0x40f0ff['craftPicture']))_0x4871fa=String(RegExp['$1']);else _0x13a506[_0xb90971(0x1f9)](_0x40f0ff[_0xb90971(0x28e)])&&(_0xb90971(0x2e0)===_0xb90971(0x2e0)?_0x4871fa=String(RegExp['$1']):_0x156e15=this[_0xb90971(0x11a)][_0xb90971(0x287)]);if(_0x4871fa){if('KotKJ'!==_0xb90971(0xfe)){if(_0x4af29b['isSceneItemCrafting']()&&!this[_0xb90971(0x10e)](_0x3115ce))return;_0x355916[_0xb90971(0x1ba)][_0xb90971(0x120)][_0xb90971(0x116)](this,_0x4870bb);}else{const _0x234ddf=ImageManager[_0xb90971(0x1cf)](_0x4871fa);_0x234ddf[_0xb90971(0x172)](this['drawPicture'][_0xb90971(0x2cc)](this,_0x2bca68,_0x234ddf));}}else'xVqlV'!=='lFMGE'?this[_0xb90971(0x2c9)](_0x1c1d7b,_0x31286c):this[_0xb90971(0x209)]();},Window_ItemCraftingList['prototype'][_0x44f27e(0x141)]=function(_0x2066a7,_0x123374){const _0x24b1e8=_0x44f27e,_0x264397=this[_0x24b1e8(0xed)](_0x2066a7);let _0x333f86=_0x264397['x']+this['itemPadding'](),_0x309a52=_0x264397['y']+0x4,_0x2f5c7d=_0x264397[_0x24b1e8(0x15f)]-this['itemPadding']()*0x2,_0x59f2dd=_0x264397['height']-0x8,_0x5a192b=Math[_0x24b1e8(0x134)](_0x2f5c7d,_0x59f2dd);const _0x13c6f1=_0x5a192b/_0x123374[_0x24b1e8(0x15f)],_0x3cca2d=_0x5a192b/_0x123374[_0x24b1e8(0x29b)],_0x18d95e=Math[_0x24b1e8(0x134)](_0x13c6f1,_0x3cca2d,0x1);let _0x284fd2=Math[_0x24b1e8(0x178)](_0x123374['width']*_0x18d95e),_0x261bf5=Math[_0x24b1e8(0x178)](_0x123374[_0x24b1e8(0x29b)]*_0x18d95e);_0x333f86+=Math['round']((_0x5a192b-_0x284fd2)/0x2),_0x309a52+=Math[_0x24b1e8(0x178)]((_0x5a192b-_0x261bf5)/0x2);const _0x20ce48=_0x123374[_0x24b1e8(0x15f)],_0x24fd6a=_0x123374[_0x24b1e8(0x29b)];this[_0x24b1e8(0x243)][_0x24b1e8(0x1d5)][_0x24b1e8(0x2bd)]=!![],this['contents'][_0x24b1e8(0xd7)](_0x123374,0x0,0x0,_0x20ce48,_0x24fd6a,_0x333f86,_0x309a52,_0x284fd2,_0x261bf5),this[_0x24b1e8(0x243)][_0x24b1e8(0x1d5)][_0x24b1e8(0x2bd)]=!![];},Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0x2c9)]=function(_0x48357f,_0x39c5fc){const _0x33c2a5=_0x44f27e,_0x5ee15c=_0x48357f['iconIndex'];let _0x428935=_0x39c5fc['x']+this['itemPadding'](),_0x50e44e=_0x39c5fc['y']+0x4,_0x1c3455=_0x39c5fc[_0x33c2a5(0x15f)]-this[_0x33c2a5(0x279)]()*0x2,_0x4fc59f=_0x39c5fc['height']-0x8,_0x2aca13=Math[_0x33c2a5(0x134)](_0x1c3455,_0x4fc59f);_0x2aca13=Math[_0x33c2a5(0x158)](_0x2aca13/ImageManager['iconWidth'])*ImageManager[_0x33c2a5(0x28d)],_0x50e44e+=(_0x4fc59f-_0x2aca13)/0x2;const _0x1caa4a=ImageManager[_0x33c2a5(0x2ed)](_0x33c2a5(0x2b3)),_0x5ea2d0=ImageManager[_0x33c2a5(0x28d)],_0x352096=ImageManager[_0x33c2a5(0x298)],_0xb1da7d=_0x5ee15c%0x10*_0x5ea2d0,_0x3a34eb=Math[_0x33c2a5(0x158)](_0x5ee15c/0x10)*_0x352096;this[_0x33c2a5(0x243)][_0x33c2a5(0x1d5)][_0x33c2a5(0x2bd)]=![],this[_0x33c2a5(0x243)][_0x33c2a5(0xd7)](_0x1caa4a,_0xb1da7d,_0x3a34eb,_0x5ea2d0,_0x352096,_0x428935,_0x50e44e,_0x2aca13,_0x2aca13),this[_0x33c2a5(0x243)][_0x33c2a5(0x1d5)]['imageSmoothingEnabled']=!![];},Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0xfa)]=function(_0x3e6723,_0x4c47af){const _0x46c515=_0x44f27e;if(!$gameSystem['isItemCrafted'](_0x3e6723))return;const _0x1212e2=ImageManager['itemCraftedIcon'];let _0x286602=_0x4c47af['x']+_0x4c47af['width']-ImageManager['iconWidth'],_0x420a53=_0x4c47af['y']+0x2;this[_0x46c515(0x1c1)](_0x1212e2,_0x286602,_0x420a53);},Window_ItemCraftingList['prototype']['drawCraftingIngredients']=function(_0x126090,_0x4e9ee9){const _0x5a52cb=_0x44f27e,_0x4655e3=DataManager[_0x5a52cb(0x22b)](_0x126090);let _0x539451=_0x4e9ee9['height']+this['itemPadding']()*0x2,_0x2c4d85=_0x4e9ee9['y']+Math[_0x5a52cb(0x178)](this['lineHeight']()*1.2),_0x1b26e4=_0x4e9ee9[_0x5a52cb(0x15f)]-_0x539451-this['itemPadding'](),_0xf984cb=Math[_0x5a52cb(0x158)](_0x1b26e4/this[_0x5a52cb(0x152)]),_0x156b41=!![];for(const _0x1e304c of _0x4655e3){if(!_0x156b41){if(_0x5a52cb(0x1d4)!==_0x5a52cb(0x1d4))return _0x35670a[_0x5a52cb(0x294)][_0x5a52cb(0x2f1)]['call'](this)*0x3+0x8;else{let _0x3356b4=TextManager[_0x5a52cb(0x222)],_0x3438d7=_0x4e9ee9['y']+(_0x4e9ee9[_0x5a52cb(0x29b)]-this['lineHeight']()*1.5);this[_0x5a52cb(0x19b)](_0x3356b4,_0x539451,_0x3438d7,_0xf984cb,_0x5a52cb(0x16d));}}_0x539451+=_0xf984cb;const _0xbcd72a=_0x1e304c[0x0],_0x56e0a7=_0x1e304c[0x1],_0x69ea65=_0xbcd72a==='gold'?$gameParty[_0x5a52cb(0x1cd)]():$gameParty[_0x5a52cb(0x228)](_0xbcd72a);if(_0xbcd72a===_0x5a52cb(0x1cd))_0x5a52cb(0x2de)!==_0x5a52cb(0xec)?this[_0x5a52cb(0x1d0)](_0x56e0a7,_0x69ea65,_0x539451,_0x2c4d85,_0xf984cb):this['drawIngredientCategory'](_0x29c5ec,_0x19a471,_0x56187b,_0x15a5be,_0x463e69);else typeof _0xbcd72a===_0x5a52cb(0x2fd)&&_0xbcd72a[_0x5a52cb(0x1f9)](/CATEGORY/i)?this[_0x5a52cb(0x12f)](_0xbcd72a,_0x56e0a7,_0x539451,_0x2c4d85,_0xf984cb):this[_0x5a52cb(0x195)](_0xbcd72a,_0x56e0a7,_0x69ea65,_0x539451,_0x2c4d85,_0xf984cb);this[_0x5a52cb(0x26f)](),_0x156b41=![];}},Window_ItemCraftingList[_0x44f27e(0x294)]['drawIngredientGold']=function(_0x3b36e4,_0x2d3053,_0x5e0088,_0x54f026,_0x1f7ce9){const _0x8654e7=_0x44f27e;if(Imported['VisuMZ_0_CoreEngine']){if(_0x8654e7(0xf1)!==_0x8654e7(0xf1)){if(!_0x6cd146)return[];const _0x4ee4f6=this['createCraftingItemKey'](_0x581bd7);return this[_0x8654e7(0x1c8)]===_0x27cd10&&this[_0x8654e7(0x150)](),this[_0x8654e7(0x1c8)][_0x4ee4f6]||[];}else{let _0x46fcb4=_0x5e0088-Math[_0x8654e7(0x178)](ImageManager[_0x8654e7(0x28d)]/0x2),_0x4cbb2c=_0x54f026+Math[_0x8654e7(0x178)]((this['lineHeight']()-ImageManager['iconHeight'])/0x2);const _0x564e7b=VisuMZ['CoreEngine']?VisuMZ[_0x8654e7(0x1b3)]['Settings'][_0x8654e7(0x23c)]['GoldIcon']:0x0;this[_0x8654e7(0x1c1)](_0x564e7b,_0x46fcb4,_0x4cbb2c);}}else{let _0x3427cd=_0x5e0088-Math[_0x8654e7(0x178)](_0x1f7ce9/0x2),_0x322427=_0x54f026+Math[_0x8654e7(0x178)]((this[_0x8654e7(0x1ce)]()-ImageManager[_0x8654e7(0x298)])/0x2);this['changeTextColor'](ColorManager[_0x8654e7(0xd9)]()),this[_0x8654e7(0x1b4)](),this[_0x8654e7(0x19b)](TextManager[_0x8654e7(0x2f5)],_0x3427cd,_0x322427,_0x1f7ce9,_0x8654e7(0x16d)),this[_0x8654e7(0x26f)]();}let _0x56f00b=_0x5e0088-Math[_0x8654e7(0x178)](_0x1f7ce9/0x2),_0x175d9b=_0x54f026+this[_0x8654e7(0x1ce)]();const _0xb84f1=VisuMZ['ItemsEquipsCore'][_0x8654e7(0x30a)][_0x8654e7(0x1d2)][_0x8654e7(0x14b)];let _0x52735e=_0xb84f1[_0x8654e7(0xfc)](_0x3b36e4);_0x3b36e4>_0x2d3053&&(_0x8654e7(0x1a2)!==_0x8654e7(0x1a2)?_0x4df21c=_0x4358ba(_0x3dee39['$1'])||0x1:this[_0x8654e7(0xc7)](ColorManager[_0x8654e7(0xd8)]())),this[_0x8654e7(0x243)][_0x8654e7(0x1bb)]=Window_ItemCraftingList[_0x8654e7(0x262)],this['drawText'](_0x52735e,_0x56f00b,_0x175d9b,_0x1f7ce9,'center');},Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0x12f)]=function(_0x38c6e6,_0x5607d5,_0xb70809,_0x12be4f,_0x4bbaa9){const _0x1b4466=_0x44f27e,_0x31e09a=VisuMZ[_0x1b4466(0x1ba)][_0x1b4466(0x30a)][_0x1b4466(0x1e9)];let _0x3a754b=_0xb70809-Math[_0x1b4466(0x178)](ImageManager['iconWidth']/0x2),_0x345224=_0x12be4f+Math[_0x1b4466(0x178)]((this[_0x1b4466(0x1ce)]()-ImageManager['iconHeight'])/0x2);this[_0x1b4466(0x1c1)](_0x31e09a[_0x1b4466(0x2a5)],_0x3a754b,_0x345224),_0x38c6e6['match'](/CATEGORY: (.*)/i);const _0x2282ef=String(RegExp['$1'])[_0x1b4466(0x2d2)]();let _0x1d4b4a=_0xb70809-Math[_0x1b4466(0x178)](_0x4bbaa9/0x2),_0x199686=_0x12be4f;this[_0x1b4466(0x243)][_0x1b4466(0x1bb)]=Window_ItemCraftingList[_0x1b4466(0x262)],this[_0x1b4466(0x19b)](_0x2282ef,_0x1d4b4a,_0x199686,_0x4bbaa9,_0x1b4466(0x16d));let _0x328ed5=_0xb70809-Math[_0x1b4466(0x178)](_0x4bbaa9/0x2),_0x34e1aa=_0x12be4f+this[_0x1b4466(0x1ce)]();const _0x2866c8=VisuMZ[_0x1b4466(0x177)][_0x1b4466(0x30a)][_0x1b4466(0x1d2)][_0x1b4466(0x14b)];let _0x48604a=_0x2866c8['format'](_0x5607d5);this[_0x1b4466(0x243)]['fontSize']=Window_ItemCraftingList[_0x1b4466(0x262)],this[_0x1b4466(0x19b)](_0x48604a,_0x328ed5,_0x34e1aa,_0x4bbaa9,'center');},Window_ItemCraftingList[_0x44f27e(0x294)]['drawIngredientItem']=function(_0x4a5cf9,_0x4ff98a,_0x22c1df,_0x26a061,_0x477e90,_0x2f4376){const _0xcc0376=_0x44f27e;let _0x272cf0=_0x26a061-Math[_0xcc0376(0x178)](ImageManager[_0xcc0376(0x28d)]/0x2),_0x4c90df=_0x477e90+Math[_0xcc0376(0x178)]((this[_0xcc0376(0x1ce)]()-ImageManager[_0xcc0376(0x298)])/0x2);this[_0xcc0376(0x1c1)](_0x4a5cf9[_0xcc0376(0x291)],_0x272cf0,_0x4c90df);let _0x57e17f=_0x26a061-Math[_0xcc0376(0x178)](_0x2f4376/0x2),_0x52dbf9=_0x477e90+this[_0xcc0376(0x1ce)]();const _0x6b8887=VisuMZ[_0xcc0376(0x177)]['Settings']['ItemScene']['ItemQuantityFmt'];let _0x245abd=_0x6b8887['format'](_0xcc0376(0x2ac)['format'](_0x22c1df,_0x4ff98a));_0x4ff98a>_0x22c1df&&this[_0xcc0376(0xc7)](ColorManager[_0xcc0376(0xd8)]()),this[_0xcc0376(0x243)]['fontSize']=Window_ItemCraftingList[_0xcc0376(0x262)],this[_0xcc0376(0x19b)](_0x245abd,_0x57e17f,_0x52dbf9,_0x2f4376,_0xcc0376(0x16d));},Window_ItemCraftingList['prototype']['createTooltipWindow']=function(){const _0x51708f=_0x44f27e;if(!VisuMZ[_0x51708f(0x1ba)][_0x51708f(0x30a)][_0x51708f(0x316)]['ToolTips'])return;const _0x14994b=new Rectangle(0x0,0x0,Graphics[_0x51708f(0x18e)],Window_Base['prototype'][_0x51708f(0x19c)](0x1));this[_0x51708f(0x207)]=new Window_ItemCraftingTooltip(_0x14994b),this[_0x51708f(0x1ad)](this[_0x51708f(0x207)]);},Window_ItemCraftingList['prototype']['update']=function(){const _0x887342=_0x44f27e;Window_ItemList[_0x887342(0x294)]['update'][_0x887342(0x116)](this),this[_0x887342(0x193)]();},Window_ItemCraftingList['prototype']['updateTooltipWindow']=function(){const _0x22cf92=_0x44f27e;if(!this[_0x22cf92(0x207)])return;if(this[_0x22cf92(0x21c)]()){if(_0x22cf92(0x19e)==='sOWmJ'){if(!this[_0x22cf92(0x188)])return;this[_0x22cf92(0x13f)](),this[_0x22cf92(0x137)](),this[_0x22cf92(0x201)]()&&this[_0x22cf92(0x1af)]();}else this['setTooltipWindowText']();}else this['_tooltipWindow'][_0x22cf92(0x160)]('');const _0x107366=new Point(TouchInput['x'],TouchInput['y']),_0x5b60cf=this['worldTransform'][_0x22cf92(0x263)](_0x107366);this[_0x22cf92(0x207)]['x']=_0x5b60cf['x']-this[_0x22cf92(0x207)][_0x22cf92(0x15f)]/0x2,this[_0x22cf92(0x207)]['y']=_0x5b60cf['y']-this[_0x22cf92(0x207)][_0x22cf92(0x29b)];},Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0x21c)]=function(){const _0x560bbb=_0x44f27e;if(!this[_0x560bbb(0x2e6)])return![];if(!this[_0x560bbb(0x215)]())return![];if(!this['isTouchedInsideFrame']())return![];if(this['hitIndex']()!==this[_0x560bbb(0x20e)]())return![];return!![];},Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0x1db)]=function(){const _0x379d57=_0x44f27e,_0x17e9cf=this[_0x379d57(0xed)](this['index']());$gameTemp['_bypassProxy']=!![];const _0x4f86e8=DataManager[_0x379d57(0x22b)](this[_0x379d57(0x215)]());$gameTemp[_0x379d57(0x2a6)]=![];const _0x270911=new Point(TouchInput['x'],TouchInput['y']),_0x3aa40f=this['worldTransform'][_0x379d57(0x263)](_0x270911);let _0x56b1c2=_0x17e9cf[_0x379d57(0x29b)]+this['itemPadding']()*0x2,_0x4ac1f2=_0x17e9cf['y']+this[_0x379d57(0x1ce)](),_0x342253=_0x17e9cf[_0x379d57(0x15f)]-_0x56b1c2-this[_0x379d57(0x279)](),_0x381b3d=Math[_0x379d57(0x158)](_0x342253/this['_maxIngredientsSize']);for(const _0x228770 of _0x4f86e8){if(_0x379d57(0x176)!==_0x379d57(0x1ca)){_0x56b1c2+=_0x381b3d;const _0x531528=new Rectangle(_0x56b1c2-ImageManager[_0x379d57(0x28d)],0x0,ImageManager[_0x379d57(0x28d)]*0x2,Graphics[_0x379d57(0x17f)]);if(_0x531528[_0x379d57(0xd1)](_0x3aa40f['x'],_0x3aa40f['y'])){let _0x18aa69=_0x228770[0x0],_0x270dfe='';if(_0x18aa69==='gold')_0x270dfe=TextManager[_0x379d57(0x2f5)];else typeof _0x18aa69===_0x379d57(0x2fd)&&_0x18aa69[_0x379d57(0x1f9)](/CATEGORY/i)?_0x379d57(0x174)!==_0x379d57(0x174)?this[_0x379d57(0x2ec)]():(_0x18aa69['match'](/CATEGORY: (.*)/i),_0x270dfe=String(RegExp['$1'])[_0x379d57(0x2d2)]()):_0x379d57(0x280)===_0x379d57(0x280)?_0x270dfe=_0x18aa69[_0x379d57(0xeb)]:(this[_0x379d57(0x14e)]=[],this['_item'][_0x379d57(0x265)][_0x379d57(0x1f9)](_0x549a7c['ItemCraftingSys'][_0x379d57(0xc3)][_0x379d57(0x2dc)])?this[_0x379d57(0x14e)]=_0x178bba['$1']['split'](',')[_0x379d57(0x18b)](_0x558e30=>_0x3ba4f0(_0x558e30)):this[_0x379d57(0x14e)]=this[_0x379d57(0x14e)][_0x379d57(0xda)](_0xcd0870[_0x379d57(0x1ba)][_0x379d57(0x30a)]['Animation'][_0x379d57(0x240)]));this[_0x379d57(0x207)][_0x379d57(0x160)](_0x270dfe['trim']());return;}}else return!![];}this[_0x379d57(0x207)][_0x379d57(0x160)]('');},Window_ItemCraftingList[_0x44f27e(0x294)][_0x44f27e(0x17c)]=function(){const _0x493ec3=_0x44f27e,_0x4ff50b=this[_0x493ec3(0x215)]()&&DataManager[_0x493ec3(0x111)](this[_0x493ec3(0x215)]())?null:this['item']();this[_0x493ec3(0x30e)](_0x4ff50b),this[_0x493ec3(0x132)]&&this[_0x493ec3(0x132)][_0x493ec3(0x1ab)]===Window_ShopStatus&&this['_statusWindow'][_0x493ec3(0x29a)](_0x4ff50b);};function Window_ItemCraftingTooltip(){this['initialize'](...arguments);}Window_ItemCraftingTooltip[_0x44f27e(0x294)]=Object[_0x44f27e(0x2b2)](Window_Base['prototype']),Window_ItemCraftingTooltip['prototype']['constructor']=Window_ItemCraftingTooltip,Window_ItemCraftingTooltip[_0x44f27e(0x25d)]=VisuMZ[_0x44f27e(0x1ba)][_0x44f27e(0x30a)]['Window'][_0x44f27e(0xeb)],Window_ItemCraftingTooltip[_0x44f27e(0x294)][_0x44f27e(0xdd)]=function(_0x3fabce){const _0x14ce7b=_0x44f27e;Window_Base[_0x14ce7b(0x294)][_0x14ce7b(0xdd)][_0x14ce7b(0x116)](this,_0x3fabce),this['setBackgroundType'](this[_0x14ce7b(0xf3)]()?0x0:0x2),this[_0x14ce7b(0x160)]('');},Window_ItemCraftingTooltip[_0x44f27e(0x294)][_0x44f27e(0xf3)]=function(){const _0x3eb3c4=_0x44f27e;return Window_ItemCraftingTooltip[_0x3eb3c4(0x25d)]!=='';},Window_ItemCraftingTooltip[_0x44f27e(0x294)][_0x44f27e(0xe2)]=function(){const _0x48477e=_0x44f27e;Window_ItemCraftingTooltip[_0x48477e(0x25d)]!==''?this[_0x48477e(0x2d6)]=ImageManager[_0x48477e(0x2ed)](Window_ItemCraftingTooltip[_0x48477e(0x25d)]):Window_Base[_0x48477e(0x294)][_0x48477e(0xe2)][_0x48477e(0x116)](this);},Window_ItemCraftingTooltip[_0x44f27e(0x294)][_0x44f27e(0x160)]=function(_0xaad009){const _0x48a08e=_0x44f27e;this[_0x48a08e(0x1ae)]!==_0xaad009&&(this[_0x48a08e(0x1ae)]=_0xaad009,this['refresh']());},Window_ItemCraftingTooltip[_0x44f27e(0x294)]['clear']=function(){const _0x4c24c3=_0x44f27e;this[_0x4c24c3(0x160)]('');},Window_ItemCraftingTooltip[_0x44f27e(0x294)][_0x44f27e(0x29a)]=function(_0x467b82){const _0x37748f=_0x44f27e;this[_0x37748f(0x160)](_0x467b82?_0x467b82[_0x37748f(0xeb)]:'');},Window_ItemCraftingTooltip[_0x44f27e(0x294)]['refresh']=function(){const _0x36ac85=_0x44f27e,_0x1be022=this[_0x36ac85(0x1fa)]();this[_0x36ac85(0x2d7)](),this[_0x36ac85(0x19b)](this['_text'],0x0,0x0,this['innerWidth'],_0x36ac85(0x16d));},Window_ItemCraftingTooltip[_0x44f27e(0x294)][_0x44f27e(0x2d7)]=function(){const _0x52ee5b=_0x44f27e;if(this[_0x52ee5b(0x1ae)]==='')this['contents']['clear'](),this[_0x52ee5b(0x15f)]=0x0;else{let _0x18afbd=this[_0x52ee5b(0x2d9)](this[_0x52ee5b(0x1ae)])+this[_0x52ee5b(0x279)]()*0x4;this[_0x52ee5b(0x15f)]=_0x18afbd+$gameSystem[_0x52ee5b(0x1f0)]()*0x2,this['createContents']();if(this[_0x52ee5b(0xf3)]())return;const _0x3bb411=ColorManager[_0x52ee5b(0x22a)]();this[_0x52ee5b(0x243)]['fillRect'](0x0,0x0,this[_0x52ee5b(0x15e)],this[_0x52ee5b(0x256)],_0x3bb411);}};function Window_ItemCraftingNumber(){this['initialize'](...arguments);}Window_ItemCraftingNumber[_0x44f27e(0x294)]=Object[_0x44f27e(0x2b2)](Window_ShopNumber[_0x44f27e(0x294)]),Window_ItemCraftingNumber[_0x44f27e(0x294)][_0x44f27e(0x1ab)]=Window_ItemCraftingNumber,Window_ItemCraftingNumber[_0x44f27e(0x294)][_0x44f27e(0xdd)]=function(_0x3d1702){const _0x492f79=_0x44f27e;Window_ShopNumber[_0x492f79(0x294)]['initialize'][_0x492f79(0x116)](this,_0x3d1702);},Window_ItemCraftingNumber[_0x44f27e(0x294)]['setup']=function(_0x3201e4){const _0x3d01d3=_0x44f27e;this['_item']=_0x3201e4,this[_0x3d01d3(0xd3)]=this[_0x3d01d3(0x25b)](),this[_0x3d01d3(0x2a1)]=Math['min'](0x1,this[_0x3d01d3(0xd3)]),this[_0x3d01d3(0x2c3)](),this[_0x3d01d3(0xf8)]();},Window_ItemCraftingNumber[_0x44f27e(0x294)][_0x44f27e(0x25b)]=function(){const _0x1ca482=_0x44f27e,_0x4153cb=[],_0x4f735c=this[_0x1ca482(0x202)],_0x297770=DataManager[_0x1ca482(0x22b)](_0x4f735c);let _0x49aedb=0x0;for(const _0x46e4a2 of _0x297770){if(!_0x46e4a2)continue;let _0x41c147=_0x46e4a2[0x0];const _0x26cec8=_0x46e4a2[0x1];_0x41c147===_0x1ca482(0x1cd)?_0x4153cb[_0x1ca482(0x183)](Math['floor']($gameParty[_0x1ca482(0x1cd)]()/_0x26cec8)):_0x1ca482(0x2a3)!==_0x1ca482(0x2a3)?(_0x2ff8e6=_0x6b3080['_scene']['_ingredientsList'][_0x17e83d],_0x3f96dc+=0x1):(typeof _0x41c147==='string'&&_0x41c147[_0x1ca482(0x1f9)](/CATEGORY/i)&&(_0x41c147=SceneManager['_scene'][_0x1ca482(0x285)][_0x49aedb],_0x49aedb+=0x1),_0x4153cb[_0x1ca482(0x183)](Math[_0x1ca482(0x158)]($gameParty[_0x1ca482(0x228)](_0x41c147)/_0x26cec8)));}if(_0x4153cb[_0x1ca482(0x210)]<=0x0)_0x4153cb[_0x1ca482(0x183)](0x0);return _0x4153cb['push']($gameParty[_0x1ca482(0x1d6)](_0x4f735c)-$gameParty[_0x1ca482(0x228)](_0x4f735c)),Math[_0x1ca482(0x134)](..._0x4153cb);},Window_ItemCraftingNumber['prototype']['refresh']=function(){const _0xc39d67=_0x44f27e;Window_Selectable[_0xc39d67(0x294)][_0xc39d67(0xf8)][_0xc39d67(0x116)](this),this[_0xc39d67(0x166)](),this[_0xc39d67(0x153)](0x0),this['drawTotalPrice'](),this[_0xc39d67(0x2ba)](),this[_0xc39d67(0x21e)]();},Window_ItemCraftingNumber[_0x44f27e(0x294)]['changeOkButtonEnable']=function(){const _0x365ad9=_0x44f27e,_0x516e9=this['_buttons'][0x4];if(!_0x516e9)return;this['isOkEnabled']()?_0x516e9[_0x365ad9(0x208)](this[_0x365ad9(0xd5)]['bind'](this)):_0x516e9[_0x365ad9(0x25e)]=null;},Window_ItemCraftingNumber['prototype'][_0x44f27e(0xbf)]=function(){const _0x25bcf3=_0x44f27e;return Math[_0x25bcf3(0x158)](this['totalPriceY']()+this[_0x25bcf3(0x1ce)]()*0x2);},Window_ItemCraftingNumber[_0x44f27e(0x294)]['totalPriceY']=function(){const _0x36cb58=_0x44f27e;return Math[_0x36cb58(0x158)](this[_0x36cb58(0x256)]-this[_0x36cb58(0x1ce)]()*6.5);},Window_ItemCraftingNumber['prototype']['buttonY']=function(){const _0x2d4700=_0x44f27e;return Math['floor'](this[_0x2d4700(0xbf)]()+this['lineHeight']()*0x2);},Window_ItemCraftingNumber[_0x44f27e(0x294)][_0x44f27e(0x254)]=function(){const _0x227e17=_0x44f27e;if((this['_number']||0x0)<=0x0)return![];return Window_ShopNumber['prototype'][_0x227e17(0x254)][_0x227e17(0x116)](this);},Window_ItemCraftingNumber[_0x44f27e(0x294)][_0x44f27e(0x2ce)]=function(){const _0x493d13=_0x44f27e;return this[_0x493d13(0x254)]();},Window_ItemCraftingNumber['prototype'][_0x44f27e(0x28a)]=function(){const _0x38f49a=_0x44f27e,_0x24567c=DataManager['getCraftingIngredients'](this[_0x38f49a(0x202)]);let _0x401997=this[_0x38f49a(0xea)]();_0x401997-=this[_0x38f49a(0x1ce)]()*_0x24567c[_0x38f49a(0x210)],this[_0x38f49a(0x28b)]=0x0,this[_0x38f49a(0x119)](_0x401997);for(const _0x439178 of _0x24567c){if('yMcEc'===_0x38f49a(0x27f))return _0x42159a[_0x38f49a(0x1ba)][_0x38f49a(0x30a)][_0x38f49a(0xc9)][_0x38f49a(0x11d)];else{_0x401997+=this['lineHeight']();if(!_0x439178)continue;this[_0x38f49a(0xca)](_0x439178,_0x401997);}};},Window_ItemCraftingNumber[_0x44f27e(0x294)][_0x44f27e(0x119)]=function(_0x29a81f){const _0x5d29ab=_0x44f27e,_0x1ffeb7=this['itemPadding']();let _0x598635=_0x1ffeb7*0x2;const _0x2d9678=this['innerWidth']-_0x598635-_0x1ffeb7*0x3,_0x3e526e=_0x598635+Math['ceil'](_0x2d9678/0x3),_0x1cee05=Math[_0x5d29ab(0x158)](_0x2d9678*0x2/0x3/0x3),_0x2749be=Math[_0x5d29ab(0x273)](this[_0x5d29ab(0x2d9)]('\x20+\x20'),this[_0x5d29ab(0x2d9)](_0x5d29ab(0x2c6)));this['resetFontSettings'](),this[_0x5d29ab(0xc7)](ColorManager[_0x5d29ab(0xd9)]());const _0x5dd4e4=[_0x5d29ab(0x2e2),_0x5d29ab(0x23b),_0x5d29ab(0x206)];for(let _0x592e2a=0x0;_0x592e2a<0x3;_0x592e2a++){const _0x20cbf5=_0x5dd4e4[_0x592e2a],_0x332504=TextManager[_0x5d29ab(0x1e3)][_0x20cbf5];this[_0x5d29ab(0x19b)](_0x332504,_0x3e526e+_0x1cee05*_0x592e2a+_0x2749be,_0x29a81f,_0x1cee05-_0x2749be,_0x5d29ab(0x16d));}},Window_ItemCraftingNumber[_0x44f27e(0x294)][_0x44f27e(0x293)]=function(_0xe990a5,_0x3ff248){const _0x23a3d8=_0x44f27e,_0xd62af8=this[_0x23a3d8(0x279)]();let _0x441279=_0xd62af8*0x2;const _0x1921ee=this[_0x23a3d8(0x15e)]-_0x441279-_0xd62af8*0x3,_0x2ece10=_0x441279+Math[_0x23a3d8(0xff)](_0x1921ee/0x3),_0x11241d=Math[_0x23a3d8(0x158)](_0x1921ee*0x2/0x3/0x3);_0x3ff248=_0x23a3d8(0x1df)[_0x23a3d8(0xfc)](_0x3ff248),this[_0x23a3d8(0x19b)](_0x3ff248,_0x2ece10+_0x11241d*0x1,_0xe990a5,_0x11241d,_0x23a3d8(0x241)),this[_0x23a3d8(0x19b)]('\x20=',_0x2ece10+_0x11241d*0x2,_0xe990a5,_0x11241d,'left');},Window_ItemCraftingNumber['prototype'][_0x44f27e(0xca)]=function(_0x5f34a2,_0x386f8e){const _0x36b4b9=_0x44f27e;let _0x3b1833=_0x5f34a2[0x0];this[_0x36b4b9(0x26f)](),this[_0x36b4b9(0x293)](_0x386f8e,'-');if(_0x3b1833===_0x36b4b9(0x1cd)){if(_0x36b4b9(0x126)!==_0x36b4b9(0x126)){this['addUncategorizedItemCategory'](),_0x3903ea[_0x36b4b9(0x133)][_0x36b4b9(0x2dd)]();return;}else this[_0x36b4b9(0xc6)](_0x5f34a2,_0x386f8e,!![]);}else{if(_0x36b4b9(0xde)===_0x36b4b9(0xde))this[_0x36b4b9(0x113)](_0x5f34a2,_0x386f8e,!![],![]);else return _0x1365cd['getInputMultiButtonStrings']('up',_0x36b4b9(0x19d));}},Window_ItemCraftingNumber[_0x44f27e(0x294)]['drawCurrentItemName']=function(){const _0x10de3a=_0x44f27e,_0x1e810d=[this[_0x10de3a(0x202)],0x1],_0x2589c6=this[_0x10de3a(0xbf)](),_0x3d623c=DataManager['isCraftingItemMasked'](this['_item']);this[_0x10de3a(0x113)](_0x1e810d,_0x2589c6,![],_0x3d623c),this[_0x10de3a(0x293)](_0x2589c6,'+');},Window_ItemCraftingNumber[_0x44f27e(0x294)][_0x44f27e(0x156)]=function(){return!![];},Window_ItemCraftingNumber[_0x44f27e(0x294)][_0x44f27e(0xe6)]=function(){return![];},Window_ItemCraftingNumber[_0x44f27e(0x294)][_0x44f27e(0xc6)]=function(_0x26c66c,_0x5685fc,_0x3ac24f){const _0x53d8da=_0x44f27e,_0xaf39e3=this[_0x53d8da(0x279)]();let _0x3248f8=_0xaf39e3*0x2;const _0x3d42d1=this[_0x53d8da(0x15e)]-_0x3248f8-_0xaf39e3*0x3,_0x2e604d=_0x3248f8+Math['ceil'](_0x3d42d1/0x3),_0x15be18=Math[_0x53d8da(0x158)](_0x3d42d1*0x2/0x3/0x3),_0x564653=Math[_0x53d8da(0x273)](this[_0x53d8da(0x2d9)](_0x53d8da(0x2d5)),this['textWidth'](_0x53d8da(0x2c6))),_0x414ea3=_0x26c66c[0x0],_0x232e07=_0x26c66c[0x1],_0x25f6d2=_0x232e07*this[_0x53d8da(0x2a1)],_0x181534=VisuMZ[_0x53d8da(0x1b3)]?VisuMZ['CoreEngine'][_0x53d8da(0x30a)][_0x53d8da(0x23c)][_0x53d8da(0x311)]:0x0;if(_0x181534>0x0){const _0xc8bd74=_0x5685fc+(this['lineHeight']()-ImageManager[_0x53d8da(0x298)])/0x2;this[_0x53d8da(0x1c1)](_0x181534,_0x3248f8,_0xc8bd74);const _0x2891af=ImageManager[_0x53d8da(0x28d)]+0x4;_0x3248f8+=_0x2891af;}this[_0x53d8da(0xc7)](ColorManager['systemColor']()),this[_0x53d8da(0x19b)](TextManager['currencyUnit'],_0x3248f8,_0x5685fc,_0x15be18,_0x53d8da(0x241));const _0x14b01d=$gameParty[_0x53d8da(0x1cd)]();this['drawCurrencyValue'](_0x14b01d,TextManager[_0x53d8da(0x2f5)],_0x2e604d,_0x5685fc,_0x15be18);const _0x31399d=_0x2e604d+_0x15be18*0x1+_0x564653,_0x170e58=_0x15be18-_0x564653;this[_0x53d8da(0x2fa)](_0x25f6d2,TextManager['currencyUnit'],_0x31399d,_0x5685fc,_0x170e58);const _0x5bc6f2=_0x2e604d+_0x15be18*0x2+_0x564653,_0x54360c=_0x15be18-_0x564653,_0x3c2b37=Math['min'](_0x14b01d+_0x25f6d2*(_0x3ac24f?-0x1:0x1),$gameParty[_0x53d8da(0x296)]());this['drawCurrencyValue'](_0x3c2b37,TextManager[_0x53d8da(0x2f5)],_0x5bc6f2,_0x5685fc,_0x54360c);},Window_ItemCraftingNumber['prototype'][_0x44f27e(0x113)]=function(_0x413b25,_0x244a8f,_0x28f3c3,_0x37484b){const _0x46b685=_0x44f27e,_0x4a86c6=this[_0x46b685(0x279)]();let _0x2f0152=_0x4a86c6*0x2;const _0x128cf3=this[_0x46b685(0x15e)]-_0x2f0152-_0x4a86c6*0x3,_0x384012=_0x2f0152+Math['ceil'](_0x128cf3/0x3),_0x4565a1=Math[_0x46b685(0x158)](_0x128cf3*0x2/0x3/0x3),_0x5d49b7=Math[_0x46b685(0x273)](this['textWidth'](_0x46b685(0x2d5)),this['textWidth'](_0x46b685(0x2c6)));let _0x18e049=_0x413b25[0x0];if(typeof _0x18e049==='string'&&_0x18e049[_0x46b685(0x1f9)](/CATEGORY/i)){if('AJDZO'==='EVEhU')return _0x533f24[_0x46b685(0x177)][_0x46b685(0x30a)][_0x46b685(0x1d2)][_0x46b685(0x310)];else _0x18e049=SceneManager[_0x46b685(0x133)]['_ingredientsList'][this[_0x46b685(0x28b)]],this[_0x46b685(0x28b)]+=0x1;}const _0xe496ae=_0x413b25[0x1],_0x2283bf=_0xe496ae*this[_0x46b685(0x2a1)];let _0x20a64f=_0x18e049[_0x46b685(0x291)];const _0x5ed555=_0x20a64f>0x0?ImageManager['iconWidth']+0x4:0x0;if(_0x37484b){if(_0x46b685(0x28c)!==_0x46b685(0x28c))_0x3a2f62=_0x4e795c[_0x46b685(0x273)](_0x3c50af,_0xf3097);else{const _0xaf64c2=new Rectangle(_0x2f0152,_0x244a8f,_0x128cf3,this[_0x46b685(0x1ce)]());this['drawCraftingItemName'](_0x18e049,_0xaf64c2),this[_0x46b685(0x1c1)](_0x18e049['iconIndex'],_0xaf64c2['x'],_0xaf64c2['y']);}}else this[_0x46b685(0x261)](_0x18e049,_0x2f0152,_0x244a8f,_0x128cf3);const _0x1fae14=_0x384012+_0x4565a1*0x0,_0x2d017c=_0x4565a1-_0x5ed555,_0x27eca2=$gameParty['numItems'](_0x18e049);this['drawText'](_0x27eca2,_0x1fae14,_0x244a8f,_0x2d017c,_0x46b685(0x1e1)),this[_0x46b685(0x1c1)](_0x20a64f,_0x1fae14+_0x2d017c+0x4,_0x244a8f);const _0x4ef397=_0x384012+_0x4565a1*0x1+_0x5d49b7,_0x5705f6=_0x4565a1-_0x5d49b7-_0x5ed555;this['drawText'](_0x2283bf,_0x4ef397,_0x244a8f,_0x5705f6,_0x46b685(0x1e1)),this[_0x46b685(0x1c1)](_0x20a64f,_0x4ef397+_0x5705f6+0x4,_0x244a8f);const _0xb5d1ab=_0x384012+_0x4565a1*0x2+_0x5d49b7,_0xca8fa5=_0x4565a1-_0x5d49b7-_0x5ed555,_0x1f0ffb=_0x27eca2+_0x2283bf*(_0x28f3c3?-0x1:0x1);this[_0x46b685(0x19b)](_0x1f0ffb,_0xb5d1ab,_0x244a8f,_0xca8fa5,'right'),this[_0x46b685(0x1c1)](_0x20a64f,_0xb5d1ab+_0xca8fa5+0x4,_0x244a8f);},Window_ItemCraftingNumber[_0x44f27e(0x294)]['itemRect']=function(){const _0x49ed31=_0x44f27e,_0x24bf0c=this[_0x49ed31(0x279)]();let _0x503918=_0x24bf0c*0x2;const _0x335ae6=this['innerWidth']-_0x503918-_0x24bf0c*0x3,_0x56b5c0=_0x503918+Math[_0x49ed31(0xff)](_0x335ae6/0x3),_0x1c40a2=this[_0x49ed31(0xbf)](),_0x10cfbf=Math[_0x49ed31(0x158)](_0x335ae6*0x2/0x3/0x3),_0xef1a95=Math[_0x49ed31(0x273)](this[_0x49ed31(0x2d9)](_0x49ed31(0x2d5)),this[_0x49ed31(0x2d9)](_0x49ed31(0x2c6))),_0x33e1a5=this['_item']?.[_0x49ed31(0x291)]>0x0?ImageManager[_0x49ed31(0x28d)]:0x0,_0x57d16f=this[_0x49ed31(0xe1)](),_0x4f0bb2=new Rectangle(Math[_0x49ed31(0x158)](_0x56b5c0+_0x10cfbf*0x2-this[_0x49ed31(0xe1)]()-_0x33e1a5+this['itemPadding']()/0x2-0x2),_0x1c40a2,this[_0x49ed31(0xe1)](),this[_0x49ed31(0x1ce)]());return _0x4f0bb2;};function Window_ItemCraftingIngredient(){const _0x3830ad=_0x44f27e;this[_0x3830ad(0xdd)](...arguments);}Window_ItemCraftingIngredient[_0x44f27e(0x294)]=Object[_0x44f27e(0x2b2)](Window_ItemList[_0x44f27e(0x294)]),Window_ItemCraftingIngredient['prototype'][_0x44f27e(0x1ab)]=Window_ItemCraftingIngredient,Window_ItemCraftingIngredient[_0x44f27e(0x294)][_0x44f27e(0xdd)]=function(_0x54101c){const _0x109e6f=_0x44f27e;Window_Selectable[_0x109e6f(0x294)][_0x109e6f(0xdd)][_0x109e6f(0x116)](this,_0x54101c),this[_0x109e6f(0x129)]=0x0;},Window_ItemCraftingIngredient[_0x44f27e(0x294)][_0x44f27e(0x308)]=function(){return![];},Window_ItemCraftingIngredient[_0x44f27e(0x294)][_0x44f27e(0xdf)]=function(_0xdbc264,_0xb9be5a){const _0x13fe18=_0x44f27e;this[_0x13fe18(0x170)]=_0xdbc264,this[_0x13fe18(0x129)]=_0xb9be5a||0x1,this['refresh'](),this['scrollTo'](0x0,0x0),this[_0x13fe18(0x136)](),this[_0x13fe18(0x185)](0x0);},Window_ItemCraftingIngredient['prototype'][_0x44f27e(0x180)]=function(){const _0x49bec9=_0x44f27e;this[_0x49bec9(0x302)]=$gameParty[_0x49bec9(0x16f)]()[_0x49bec9(0x139)](_0x1f04c2=>this[_0x49bec9(0x301)](_0x1f04c2));},Window_ItemCraftingIngredient['prototype'][_0x44f27e(0x301)]=function(_0xc69b39){const _0x413a62=_0x44f27e;if(!_0xc69b39)return![];if(_0xc69b39===SceneManager['_scene'][_0x413a62(0x202)])return![];return _0xc69b39[_0x413a62(0x2fc)][_0x413a62(0x301)](this[_0x413a62(0x170)]['toUpperCase']()[_0x413a62(0x2d2)]());},Window_ItemCraftingIngredient[_0x44f27e(0x294)]['isEnabled']=function(_0x49e390){const _0x4893c3=_0x44f27e;if(!_0x49e390)return![];if(this['selectedIngredientList']()[_0x4893c3(0x301)](_0x49e390))return![];return $gameParty[_0x4893c3(0x228)](_0x49e390)>=this[_0x4893c3(0x129)];},Window_ItemCraftingIngredient[_0x44f27e(0x294)][_0x44f27e(0x2ee)]=function(){const _0x1071c9=_0x44f27e,_0x406366=[],_0x5cd973=DataManager[_0x1071c9(0x22b)](SceneManager[_0x1071c9(0x133)][_0x1071c9(0x202)]);for(const _0xe1bf0 of _0x5cd973){if(!_0xe1bf0)continue;const _0x10d58b=_0xe1bf0[0x0];(DataManager[_0x1071c9(0x1d3)](_0x10d58b)||DataManager['isWeapon'](_0x10d58b)||DataManager[_0x1071c9(0x1b9)](_0x10d58b))&&_0x406366[_0x1071c9(0x183)](_0x10d58b);}return _0x406366[_0x1071c9(0xda)](SceneManager['_scene']['_ingredientsList']);},Window_ItemCraftingIngredient[_0x44f27e(0x294)][_0x44f27e(0x261)]=function(_0x160925,_0x3bfcff,_0x3c9d57,_0x315240){const _0x59d2ac=_0x44f27e;_0x160925&&this[_0x59d2ac(0x2ee)]()[_0x59d2ac(0x301)](_0x160925)&&(this[_0x59d2ac(0x289)]=!![]),Window_ItemList['prototype'][_0x59d2ac(0x261)]['call'](this,_0x160925,_0x3bfcff,_0x3c9d57,_0x315240),this[_0x59d2ac(0x289)]=![];},Window_ItemCraftingIngredient[_0x44f27e(0x294)]['drawText']=function(_0x38afaf,_0x3a6c66,_0x5c1e9c,_0x467eaa,_0x5558b4){const _0x1e923=_0x44f27e;if(this[_0x1e923(0x289)]){if(_0x1e923(0xc4)!==_0x1e923(0x26b)){const _0x114299=VisuMZ[_0x1e923(0x1ba)][_0x1e923(0x30a)]['General'];this[_0x1e923(0x243)]['textColor']=ColorManager['getColor'](_0x114299['SelectedColor']),_0x38afaf+=_0x114299['SelectedText'];}else this[_0x1e923(0x19a)]=_0x26c737;}Window_Base[_0x1e923(0x294)]['drawText'][_0x1e923(0x116)](this,_0x38afaf,_0x3a6c66,_0x5c1e9c,_0x467eaa,_0x5558b4);};