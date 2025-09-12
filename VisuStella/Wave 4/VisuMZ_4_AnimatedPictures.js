//=============================================================================
// VisuStella MZ - Animated Pictures
// VisuMZ_X_AnimatedPictures.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_AnimatedPictures = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AnimatedPictures = VisuMZ.AnimatedPictures || {};
VisuMZ.AnimatedPictures.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.02] [AnimatedPictures]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Animated_Pictures_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that gives functionality to Show Picture
 * events to display animated pictures. Animated pictures are shown in a sprite
 * sheet format. There are looping controls and speed controls that can be used
 * with these animated pictures.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Functionality to make pictures animated as long as they follow the
 *   animated cell format.
 * * Control the looping properties and speed of the animated picture through
 *   the usage of plugin commands.
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
 * Instructions
 * ============================================================================
 *
 * Save your animated picture into your game project's img/pictures folder.
 * The filename must be named with the following format:
 *
 * filename[ANI][HxV]
 *
 * Replace H in the filename with the number of horizontal cells it has.
 * Replace V in the filename with the number of vertical cells it has.
 * The number of total cells it has available is equal the multiplicative
 * product of the horizontal and vertical cells.
 *
 * For example:
 *
 * "Parrot[ANI][3x2]" will have 3 horizontal cells and 2 vertical cells. This
 * means there are a total of 6 cells that will be used for animating.
 *
 * Animations will be played from left to right, then up to down so please
 * arrange them as such. For example, 4x5 will play like this:
 *
 *  1  2  3  4
 *  5  6  7  8
 *  9 10 11 12
 * 13 14 15 16
 * 17 18 19 20
 *
 * Keep this in mind as you format your animated pictures.
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
 * Animated Picture: Change Properties
 * - Changes the properties used for the animated picture.
 *
 *   Picture ID:
 *   - Select which Picture ID to affect.
 *
 *   Loop?:
 *   - Animated pictures will loop back to beginning once it reaches the
 *     last frame.
 *
 *   Wait Frames:
 *   - Number of frames to wait before moving to next picture cell.
 *
 * ---
 *
 * ============================================================================
 * Good Practices
 * ============================================================================
 *
 * Animated pictures, if used incorrectly, can bog down the game client. Here
 * are some good practices that you can follow when making animated pictures
 * to make them run more smoothly in-game.
 *
 * ---
 *
 * 1. Use animated pictures sparingly if possible. RPG Maker MZ's cache has a
 * limited size to it, which means the more animated pictures you use, the
 * faster it will fill up. And the faster it fills up, the more it needs to be
 * emptied to allow other assets in your game to load at all.
 *
 * ---
 *
 * 2. If you do use animated pictures, trim down as much empty space as
 * possible and keep picture cells to a minimum size to reduce bloating
 * the cache.
 *
 * ---
 *
 * 3. If it is practical, make your sprite sheet cells work towards a power of
 * 2 (ie: sizes of 32x32, 64x64, 128x128, 256x256, etc). Bitmaps render best
 * when it works in this cell range. This is not necessary, but it is a thing
 * to keep in mind.
 *
 * ---
 *
 * 4. Limit the amount of colors used in the animated picture to reduce the
 * filesize of the image and reduce the strain on the cache. Use more flat
 * colors instead of gradients. These work better for the engine.
 *
 * ---
 *
 * 5. When you are done using the animated picture, use the Erase Picture
 * command to clear the picture from use. This will stop the animation frame
 * calculating and reduce strain on your game.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters are the only ones available with this plugin. These
 * adjust the default settings of animated pictures. If you wish to change how
 * some animated pictures behave from others, 
 *
 * ---
 *
 * Defaults
 * 
 *   Default Loop?:
 *   - Animated pictures will loop back to beginning by default once it reaches
 *     the last frame.
 * 
 *   Default Wait Frames:
 *   - Default number of frames to wait before moving to next picture cell.
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
 * Version 1.02: April 28, 2022
 * * Compatibility Update
 * ** Added compatibility with Events & Movement Core version 1.38's new
 *    <Picture Filename: filename> related notetags.
 * * Documentation Update!
 * ** Help file updated for new features.
 * 
 * Version 1.01: December 4, 2020
 * * Bug Fixes!
 * ** Plugin Command "Animated Picture: Change Properties" wait frames will no
 *    longer cap at 1 frame. Fixed by Irina and Shaz.
 *
 * Version 1.00: October 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeProperties
 * @text Animated Picture: Change Properties
 * @desc Changes the properties used for the animated picture.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Select which Picture ID to affect.
 * @default 1
 *
 * @arg Loop:eval
 * @text Loop?
 * @parent PictureID:num
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Animated pictures will loop back to beginning once it reaches the last frame.
 * @default true
 *
 * @arg WaitFrames:num
 * @text Wait Frames
 * @parent PictureID:num
 * @type number
 * @min 1
 * @desc Number of frames to wait before moving to next picture cell.
 * @default 4
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
 * @param AnimatedPictures
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Loop:eval
 * @text Default Loop?
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Animated pictures will loop back to beginning by default once it reaches the last frame.
 * @default true
 *
 * @param WaitFrames:num
 * @text Default Wait Frames
 * @desc Default number of frames to wait before moving to next picture cell.
 * @default 4
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
//=============================================================================

const _0x5b7e10=_0xb9b1;(function(_0x47dafe,_0x7f6575){const _0x1ea4d9=_0xb9b1,_0x11dd99=_0x47dafe();while(!![]){try{const _0x17aaff=parseInt(_0x1ea4d9(0xf0))/0x1+parseInt(_0x1ea4d9(0x135))/0x2*(parseInt(_0x1ea4d9(0xfb))/0x3)+-parseInt(_0x1ea4d9(0x14c))/0x4*(parseInt(_0x1ea4d9(0xf9))/0x5)+-parseInt(_0x1ea4d9(0x10e))/0x6*(-parseInt(_0x1ea4d9(0x144))/0x7)+-parseInt(_0x1ea4d9(0x154))/0x8+-parseInt(_0x1ea4d9(0x12a))/0x9+parseInt(_0x1ea4d9(0x123))/0xa;if(_0x17aaff===_0x7f6575)break;else _0x11dd99['push'](_0x11dd99['shift']());}catch(_0x19087a){_0x11dd99['push'](_0x11dd99['shift']());}}}(_0x21a8,0x927e9));function _0xb9b1(_0x425202,_0x24e70f){const _0x21a81a=_0x21a8();return _0xb9b1=function(_0xb9b153,_0x4b0202){_0xb9b153=_0xb9b153-0xf0;let _0x140967=_0x21a81a[_0xb9b153];return _0x140967;},_0xb9b1(_0x425202,_0x24e70f);}var label=_0x5b7e10(0x14f),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x5def83){const _0x2d61cb=_0x5b7e10;return _0x5def83[_0x2d61cb(0xf8)]&&_0x5def83[_0x2d61cb(0x168)][_0x2d61cb(0xfd)]('['+label+']');})[0x0];function _0x21a8(){const _0x839f1f=['updateAnimatedPictureCount','setAnimatedPictureWaitFrames','UJRnJ','TIDAT','CocuH','updateAttachPictureBitmap','match','clearAttachPictureSettings','max','_attachPictureAnimationWaitFrames','aniWaitFrames','Game_Event_checkEventsMoveCoreStringTags','getAttachPictureBitmapHeight','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ARRAYSTR','940150WwTAXu','_isAnimatedPicture','qcrVL','FUNC','ARRAYNUM','_animatedPictureLoop','_attachPictureAnimationHorzCells','7018938aTEivP','STRUCT','loadBitmap','floor','realPictureId','parameters','checkEventsMoveCoreStringTags','height','_animationHorzCells','setupAnimatedPictureData','Game_Screen_initialize','2fdeDGC','Loop','return\x200','_attachPictureAnimationVertCells','exit','wlPaB','_animationMaxCells','updateAnimatedPictureFrame','updateAnimatedAttachPictureBitmap','addLoadListener','_isAttachPictureAnimatedPicture','_attachPictureSprite','getAnimatedPictureWaitFrames','toUpperCase','onLoadAttachPicture','7860461WYXijd','resetFrame','_animationCount','Sprite_Picture_update','_animationIndex','updateAttachedPictureAnimatedPictureFrame','Sprite_Character_updateAttachPictureBitmap','initAnimatedPicture','1068UXKOnV','_animationVertCells','ARRAYSTRUCT','AnimatedPictures','Settings','ARRAYEVAL','registerCommand','isAnimationLooping','9300728EZftwz','initialize','setAnimatedPictureLooping','RbJyp','hLwZY','WaitFrames','_attachPictureAnimationCount','avWPB','_animatedPictureWait','initAnimatedPictureSettings','ConvertParams','_attachPictureAnimationMaxCells','format','parse','attachPictureAniWaitFrames','Sprite_Picture_initialize','_attachPicture','Sprite_Character_getAttachPictureBitmapHeight','width','NUM','description','411580rGkGEd','prototype','OQfkc','name','bitmap','map','version','isAnimatedPicture','status','2890eRVpAX','Sprite_Picture_loadBitmap','3204966nFrKuS','visible','includes','Game_CharacterBase_clearAttachPictureSettings','update','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','mdhaa','PictureID','ChangeProperties','animationWaitFrames','setFrame','Sprite_Character_getAttachPictureBitmapWidth','LBgdf','_attachPictureAnimationIndex','_character','xMLhI','Sprite_Character_onLoadAttachPicture','attachPictureFilename','attachPictureSettings','6KdRrDq','bind','call','getAttachPictureBitmapWidth','isAnimatedPictureLooping','_pictureName'];_0x21a8=function(){return _0x839f1f;};return _0x21a8();}VisuMZ[label][_0x5b7e10(0x150)]=VisuMZ[label][_0x5b7e10(0x150)]||{},VisuMZ[_0x5b7e10(0x15e)]=function(_0x4121e2,_0x235adb){const _0x3ce5ed=_0x5b7e10;for(const _0x34f165 in _0x235adb){if(_0x34f165[_0x3ce5ed(0x11a)](/(.*):(.*)/i)){const _0xdc238a=String(RegExp['$1']),_0x44fde6=String(RegExp['$2'])[_0x3ce5ed(0x142)]()['trim']();let _0x3c728e,_0x2007df,_0x56339f;switch(_0x44fde6){case _0x3ce5ed(0x167):_0x3c728e=_0x235adb[_0x34f165]!==''?Number(_0x235adb[_0x34f165]):0x0;break;case _0x3ce5ed(0x127):_0x2007df=_0x235adb[_0x34f165]!==''?JSON[_0x3ce5ed(0x161)](_0x235adb[_0x34f165]):[],_0x3c728e=_0x2007df[_0x3ce5ed(0xf5)](_0x285c4d=>Number(_0x285c4d));break;case'EVAL':_0x3c728e=_0x235adb[_0x34f165]!==''?eval(_0x235adb[_0x34f165]):null;break;case _0x3ce5ed(0x151):_0x2007df=_0x235adb[_0x34f165]!==''?JSON[_0x3ce5ed(0x161)](_0x235adb[_0x34f165]):[],_0x3c728e=_0x2007df['map'](_0x4427fa=>eval(_0x4427fa));break;case'JSON':_0x3c728e=_0x235adb[_0x34f165]!==''?JSON[_0x3ce5ed(0x161)](_0x235adb[_0x34f165]):'';break;case'ARRAYJSON':_0x2007df=_0x235adb[_0x34f165]!==''?JSON['parse'](_0x235adb[_0x34f165]):[],_0x3c728e=_0x2007df[_0x3ce5ed(0xf5)](_0x311502=>JSON['parse'](_0x311502));break;case _0x3ce5ed(0x126):_0x3c728e=_0x235adb[_0x34f165]!==''?new Function(JSON[_0x3ce5ed(0x161)](_0x235adb[_0x34f165])):new Function(_0x3ce5ed(0x137));break;case'ARRAYFUNC':_0x2007df=_0x235adb[_0x34f165]!==''?JSON[_0x3ce5ed(0x161)](_0x235adb[_0x34f165]):[],_0x3c728e=_0x2007df['map'](_0x2e6aac=>new Function(JSON[_0x3ce5ed(0x161)](_0x2e6aac)));break;case'STR':_0x3c728e=_0x235adb[_0x34f165]!==''?String(_0x235adb[_0x34f165]):'';break;case _0x3ce5ed(0x122):_0x2007df=_0x235adb[_0x34f165]!==''?JSON['parse'](_0x235adb[_0x34f165]):[],_0x3c728e=_0x2007df['map'](_0x349df3=>String(_0x349df3));break;case _0x3ce5ed(0x12b):_0x56339f=_0x235adb[_0x34f165]!==''?JSON[_0x3ce5ed(0x161)](_0x235adb[_0x34f165]):{},_0x3c728e=VisuMZ[_0x3ce5ed(0x15e)]({},_0x56339f);break;case _0x3ce5ed(0x14e):_0x2007df=_0x235adb[_0x34f165]!==''?JSON[_0x3ce5ed(0x161)](_0x235adb[_0x34f165]):[],_0x3c728e=_0x2007df[_0x3ce5ed(0xf5)](_0x399e5c=>VisuMZ[_0x3ce5ed(0x15e)]({},JSON[_0x3ce5ed(0x161)](_0x399e5c)));break;default:continue;}_0x4121e2[_0xdc238a]=_0x3c728e;}}return _0x4121e2;},(_0x2c4173=>{const _0x4e42fa=_0x5b7e10,_0x29292c=_0x2c4173[_0x4e42fa(0xf3)];for(const _0x18468f of dependencies){if(!Imported[_0x18468f]){if(_0x4e42fa(0x157)===_0x4e42fa(0x157)){alert(_0x4e42fa(0x121)['format'](_0x29292c,_0x18468f)),SceneManager[_0x4e42fa(0x139)]();break;}else{const _0x3de2c6=_0x5a5f89(_0x39d65b['$1']);_0x3de2c6!==_0x3cad62[_0x2b2ae2][_0x4e42fa(0xf6)]&&(_0x4aaa03(_0x4e42fa(0x100)['format'](_0x33f908,_0x3de2c6)),_0x3b9909['exit']());}}}const _0x14bdfd=_0x2c4173[_0x4e42fa(0x168)];if(_0x14bdfd[_0x4e42fa(0x11a)](/\[Version[ ](.*?)\]/i)){const _0x2b2113=Number(RegExp['$1']);_0x2b2113!==VisuMZ[label]['version']&&(alert(_0x4e42fa(0x100)['format'](_0x29292c,_0x2b2113)),SceneManager[_0x4e42fa(0x139)]());}if(_0x14bdfd[_0x4e42fa(0x11a)](/\[Tier[ ](\d+)\]/i)){if(_0x4e42fa(0x10a)!=='vmExr'){const _0x2cc354=Number(RegExp['$1']);_0x2cc354<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x4e42fa(0x160)](_0x29292c,_0x2cc354,tier)),SceneManager[_0x4e42fa(0x139)]()):_0x4e42fa(0x116)!==_0x4e42fa(0x117)?tier=Math['max'](_0x2cc354,tier):this[_0x4e42fa(0x128)][_0x465155]=_0x144064[_0x4e42fa(0x14f)][_0x4e42fa(0x150)][_0x4e42fa(0x136)];}else this[_0x4e42fa(0x148)]=0x0;}VisuMZ[_0x4e42fa(0x15e)](VisuMZ[label][_0x4e42fa(0x150)],_0x2c4173[_0x4e42fa(0x12f)]);})(pluginData),PluginManager[_0x5b7e10(0x152)](pluginData['name'],_0x5b7e10(0x103),_0x5b30e3=>{const _0x5f0783=_0x5b7e10;VisuMZ[_0x5f0783(0x15e)](_0x5b30e3,_0x5b30e3);const _0x208933=_0x5b30e3[_0x5f0783(0x102)],_0x5b8079=_0x5b30e3[_0x5f0783(0x136)],_0x396bec=_0x5b30e3[_0x5f0783(0x159)];$gameScreen['setAnimatedPictureLooping'](_0x208933,_0x5b8079),$gameScreen['setAnimatedPictureWaitFrames'](_0x208933,_0x396bec);}),VisuMZ[_0x5b7e10(0x14f)][_0x5b7e10(0x134)]=Game_Screen['prototype']['initialize'],Game_Screen[_0x5b7e10(0xf1)]['initialize']=function(){const _0x417e50=_0x5b7e10;VisuMZ[_0x417e50(0x14f)][_0x417e50(0x134)][_0x417e50(0x110)](this),this[_0x417e50(0x15d)]();},Game_Screen[_0x5b7e10(0xf1)]['initAnimatedPictureSettings']=function(){const _0x47c782=_0x5b7e10;this[_0x47c782(0x128)]=[],this['_animatedPictureWait']=[];},Game_Screen['prototype'][_0x5b7e10(0x112)]=function(_0xff4c36){const _0x6fee9b=_0x5b7e10;this['_animatedPictureLoop']===undefined&&(_0x6fee9b(0x158)===_0x6fee9b(0x158)?this['initAnimatedPictureSettings']():(this[_0x6fee9b(0x124)]=!![],this[_0x6fee9b(0x132)]=_0x195d8d[_0x6fee9b(0x11c)](0x1,_0x56e5a9(_0x3d719e['$1'])),this[_0x6fee9b(0x14d)]=_0x17729c[_0x6fee9b(0x11c)](0x1,_0x505055(_0x3bf559['$2'])),this[_0x6fee9b(0x13b)]=this['_animationHorzCells']*this[_0x6fee9b(0x14d)]));const _0x250224=this[_0x6fee9b(0x12e)](_0xff4c36);return this[_0x6fee9b(0x128)][_0x250224]===undefined&&(this[_0x6fee9b(0x128)][_0x250224]=VisuMZ[_0x6fee9b(0x14f)][_0x6fee9b(0x150)][_0x6fee9b(0x136)]),this[_0x6fee9b(0x128)][_0x250224];},Game_Screen['prototype'][_0x5b7e10(0x156)]=function(_0x494e48,_0x5decd4){const _0x33243b=_0x5b7e10;if(this[_0x33243b(0x128)]===undefined){if(_0x33243b(0x118)!==_0x33243b(0x118)){this[_0x33243b(0x128)]===_0x1663bb&&this[_0x33243b(0x15d)]();const _0x5a8bf5=this[_0x33243b(0x12e)](_0x5edb7e);this[_0x33243b(0x128)][_0x5a8bf5]=_0x4a9268;}else this[_0x33243b(0x15d)]();}const _0x1e576a=this[_0x33243b(0x12e)](_0x494e48);this[_0x33243b(0x128)][_0x1e576a]=_0x5decd4;},Game_Screen[_0x5b7e10(0xf1)][_0x5b7e10(0x141)]=function(_0x24039f){const _0x3572be=_0x5b7e10;this[_0x3572be(0x15c)]===undefined&&this[_0x3572be(0x15d)]();const _0x46141a=this[_0x3572be(0x12e)](_0x24039f);return this['_animatedPictureWait'][_0x46141a]===undefined&&(this[_0x3572be(0x15c)][_0x46141a]=VisuMZ['AnimatedPictures'][_0x3572be(0x150)][_0x3572be(0x159)]),this[_0x3572be(0x15c)][_0x46141a];},Game_Screen[_0x5b7e10(0xf1)][_0x5b7e10(0x115)]=function(_0x49ed80,_0x247279){const _0x3ab78d=_0x5b7e10;this[_0x3ab78d(0x15c)]===undefined&&this['initAnimatedPictureSettings']();const _0x24d1d5=this[_0x3ab78d(0x12e)](_0x49ed80);this['_animatedPictureWait'][_0x24d1d5]=_0x247279;},VisuMZ[_0x5b7e10(0x14f)][_0x5b7e10(0xfe)]=Game_CharacterBase[_0x5b7e10(0xf1)]['clearAttachPictureSettings'],Game_CharacterBase['prototype'][_0x5b7e10(0x11b)]=function(){const _0x82397c=_0x5b7e10;VisuMZ['AnimatedPictures'][_0x82397c(0xfe)][_0x82397c(0x110)](this),this[_0x82397c(0x164)][_0x82397c(0x11e)]=VisuMZ[_0x82397c(0x14f)]['Settings'][_0x82397c(0x159)]||0x1;},VisuMZ[_0x5b7e10(0x14f)][_0x5b7e10(0x11f)]=Game_Event['prototype'][_0x5b7e10(0x130)],Game_Event[_0x5b7e10(0xf1)]['checkEventsMoveCoreStringTags']=function(_0x491ecf){const _0xb20226=_0x5b7e10;VisuMZ[_0xb20226(0x14f)][_0xb20226(0x11f)][_0xb20226(0x110)](this,_0x491ecf),_0x491ecf[_0xb20226(0x11a)](/<(?:ATTACH PICTURE|PICTURE) (?:WAIT|DELAY) (?:FRAME|FRAMES):[ ](\d+)>/i)&&(this[_0xb20226(0x164)][_0xb20226(0x11e)]=Math[_0xb20226(0x11c)](0x1,Number(RegExp['$1'])));},Game_CharacterBase[_0x5b7e10(0xf1)]['attachPictureAniWaitFrames']=function(){const _0xa6b1ce=_0x5b7e10;return this[_0xa6b1ce(0x10d)]()[_0xa6b1ce(0x11e)]??0x1;},VisuMZ[_0x5b7e10(0x14f)][_0x5b7e10(0x14a)]=Sprite_Character[_0x5b7e10(0xf1)]['updateAttachPictureBitmap'],Sprite_Character['prototype'][_0x5b7e10(0x119)]=function(){const _0x4a0ca7=_0x5b7e10;VisuMZ['AnimatedPictures']['Sprite_Character_updateAttachPictureBitmap'][_0x4a0ca7(0x110)](this),this[_0x4a0ca7(0x13d)]();},VisuMZ[_0x5b7e10(0x14f)][_0x5b7e10(0x10b)]=Sprite_Character[_0x5b7e10(0xf1)][_0x5b7e10(0x143)],Sprite_Character['prototype'][_0x5b7e10(0x143)]=function(_0xe5a6da){const _0x29958f=_0x5b7e10;this['_attachPictureAnimationCount']=0x0,this[_0x29958f(0x108)]=0x0;const _0xc5b8ca=this[_0x29958f(0x109)][_0x29958f(0x10c)]();if(_0xc5b8ca[_0x29958f(0x11a)](/\[ANI\]\[(\d+)x(\d+)\]/i))this[_0x29958f(0x13f)]=!![],this['_attachPictureAnimationHorzCells']=Math[_0x29958f(0x11c)](0x1,parseInt(RegExp['$1'])),this['_attachPictureAnimationVertCells']=Math[_0x29958f(0x11c)](0x1,parseInt(RegExp['$2'])),this[_0x29958f(0x15f)]=this[_0x29958f(0x129)]*this['_attachPictureAnimationVertCells'],this[_0x29958f(0x11d)]=this[_0x29958f(0x109)][_0x29958f(0x162)](),this[_0x29958f(0x13d)]();else{if(_0x29958f(0x107)===_0x29958f(0x107))this[_0x29958f(0x13f)]=![],this[_0x29958f(0x129)]=0x1,this['_attachPictureAnimationVertCells']=0x1,this[_0x29958f(0x15f)]=0x1,this['_attachPictureSprite'][_0x29958f(0x105)](0x0,0x0,_0xe5a6da[_0x29958f(0x166)],_0xe5a6da[_0x29958f(0x131)]);else{_0x6ff8e4[_0x29958f(0x15e)](_0xfce855,_0x42697b);const _0x52dcbd=_0xe68c09[_0x29958f(0x102)],_0x5a5cda=_0x5f4db2['Loop'],_0x447d80=_0x2b9e18['WaitFrames'];_0x1285da[_0x29958f(0x156)](_0x52dcbd,_0x5a5cda),_0x17f93c['setAnimatedPictureWaitFrames'](_0x52dcbd,_0x447d80);}}VisuMZ[_0x29958f(0x14f)][_0x29958f(0x10b)]['call'](this,_0xe5a6da);},VisuMZ['AnimatedPictures']['Sprite_Character_getAttachPictureBitmapWidth']=Sprite_Character[_0x5b7e10(0xf1)]['getAttachPictureBitmapWidth'],Sprite_Character[_0x5b7e10(0xf1)][_0x5b7e10(0x111)]=function(){const _0x5924b3=_0x5b7e10;let _0x2eae3b=VisuMZ[_0x5924b3(0x14f)][_0x5924b3(0x106)][_0x5924b3(0x110)](this);return _0x2eae3b/(this[_0x5924b3(0x129)]||0x1);},VisuMZ[_0x5b7e10(0x14f)][_0x5b7e10(0x165)]=Sprite_Character[_0x5b7e10(0xf1)][_0x5b7e10(0x120)],Sprite_Character['prototype'][_0x5b7e10(0x120)]=function(){const _0x37b281=_0x5b7e10;let _0x23861b=VisuMZ['AnimatedPictures']['Sprite_Character_getAttachPictureBitmapHeight'][_0x37b281(0x110)](this);return _0x23861b/(this[_0x37b281(0x138)]||0x1);},Sprite_Character[_0x5b7e10(0xf1)][_0x5b7e10(0x13d)]=function(){const _0x3ef304=_0x5b7e10;if(!this[_0x3ef304(0x13f)])return;this[_0x3ef304(0x15a)]+=0x1,this[_0x3ef304(0x15a)]>=this[_0x3ef304(0x11d)]&&(this['_attachPictureAnimationCount']=0x0,this[_0x3ef304(0x108)]+=0x1,this[_0x3ef304(0x108)]>=this[_0x3ef304(0x15f)]&&(this['_attachPictureAnimationIndex']=0x0),this[_0x3ef304(0x149)]());},Sprite_Character['prototype']['updateAttachedPictureAnimatedPictureFrame']=function(){const _0x1535b6=_0x5b7e10,_0x116a23=this[_0x1535b6(0x140)],_0x4dd7c0=_0x116a23['bitmap'],_0x550b5b=_0x4dd7c0[_0x1535b6(0x166)]/this[_0x1535b6(0x129)],_0x1c83e5=_0x4dd7c0[_0x1535b6(0x131)]/this[_0x1535b6(0x138)],_0xb35b15=this['_attachPictureAnimationIndex']%this[_0x1535b6(0x129)]*_0x550b5b,_0x9d2c1e=Math[_0x1535b6(0x12d)](this['_attachPictureAnimationIndex']/this[_0x1535b6(0x129)])*_0x1c83e5;_0x116a23['setFrame'](_0xb35b15,_0x9d2c1e,_0x550b5b,_0x1c83e5);},VisuMZ[_0x5b7e10(0x14f)]['Sprite_Picture_initialize']=Sprite_Picture[_0x5b7e10(0xf1)][_0x5b7e10(0x155)],Sprite_Picture['prototype']['initialize']=function(_0x8c7f35){const _0x323b3f=_0x5b7e10;this[_0x323b3f(0x14b)](),VisuMZ['AnimatedPictures'][_0x323b3f(0x163)][_0x323b3f(0x110)](this,_0x8c7f35);},Sprite_Picture[_0x5b7e10(0xf1)][_0x5b7e10(0x14b)]=function(){const _0x155a91=_0x5b7e10;this[_0x155a91(0x124)]=![],this[_0x155a91(0x132)]=0x1,this[_0x155a91(0x14d)]=0x1,this[_0x155a91(0x13b)]=0x1,this[_0x155a91(0x146)]=0x0,this[_0x155a91(0x148)]=0x0;},Sprite_Picture['prototype']['isAnimatedPicture']=function(){const _0x322d71=_0x5b7e10;if(this[_0x322d71(0x124)]===undefined)this['initAnimatedPicture']();return this[_0x322d71(0x124)];},VisuMZ['AnimatedPictures'][_0x5b7e10(0xfa)]=Sprite_Picture['prototype'][_0x5b7e10(0x12c)],Sprite_Picture[_0x5b7e10(0xf1)][_0x5b7e10(0x12c)]=function(){const _0x5051e2=_0x5b7e10;this[_0x5051e2(0x133)](),VisuMZ[_0x5051e2(0x14f)][_0x5051e2(0xfa)][_0x5051e2(0x110)](this),this[_0x5051e2(0xf7)]()?_0x5051e2(0x15b)===_0x5051e2(0x13a)?this[_0x5051e2(0x15d)]():this[_0x5051e2(0xf4)][_0x5051e2(0x13e)](this[_0x5051e2(0x13c)][_0x5051e2(0x10f)](this)):this['bitmap'][_0x5051e2(0x13e)](this[_0x5051e2(0x145)][_0x5051e2(0x10f)](this));},Sprite_Picture[_0x5b7e10(0xf1)][_0x5b7e10(0x145)]=function(){const _0xb5b155=_0x5b7e10;this[_0xb5b155(0x105)](0x0,0x0,this[_0xb5b155(0xf4)]['width'],this[_0xb5b155(0xf4)][_0xb5b155(0x131)]);},Sprite_Picture[_0x5b7e10(0xf1)][_0x5b7e10(0x133)]=function(){const _0x9b8680=_0x5b7e10;this[_0x9b8680(0x113)]['match'](/\[ANI\]\[(\d+)x(\d+)\]/i)?(this[_0x9b8680(0x124)]=!![],this['_animationHorzCells']=Math['max'](0x1,parseInt(RegExp['$1'])),this['_animationVertCells']=Math[_0x9b8680(0x11c)](0x1,parseInt(RegExp['$2'])),this[_0x9b8680(0x13b)]=this['_animationHorzCells']*this[_0x9b8680(0x14d)]):_0x9b8680(0x125)!==_0x9b8680(0xf2)?(this[_0x9b8680(0x124)]=![],this[_0x9b8680(0x132)]=0x1,this[_0x9b8680(0x14d)]=0x1,this[_0x9b8680(0x13b)]=0x1):(this[_0x9b8680(0x13f)]=!![],this[_0x9b8680(0x129)]=_0x5f666a['max'](0x1,_0x173d15(_0xf7afb3['$1'])),this[_0x9b8680(0x138)]=_0x159270[_0x9b8680(0x11c)](0x1,_0x2989c1(_0x5d9231['$2'])),this[_0x9b8680(0x15f)]=this[_0x9b8680(0x129)]*this[_0x9b8680(0x138)],this[_0x9b8680(0x11d)]=this[_0x9b8680(0x109)][_0x9b8680(0x162)](),this[_0x9b8680(0x13d)]()),this[_0x9b8680(0x146)]=0x0,this[_0x9b8680(0x148)]=0x0;},VisuMZ[_0x5b7e10(0x14f)]['Sprite_Picture_update']=Sprite_Picture[_0x5b7e10(0xf1)]['update'],Sprite_Picture[_0x5b7e10(0xf1)][_0x5b7e10(0xff)]=function(){const _0x483556=_0x5b7e10;VisuMZ[_0x483556(0x14f)][_0x483556(0x147)]['call'](this);if(this[_0x483556(0xfc)]&&this['isAnimatedPicture']()){if('oLefE'!==_0x483556(0x101))this[_0x483556(0x114)]();else{this[_0x483556(0x15c)]===_0x429e52&&this[_0x483556(0x15d)]();const _0x8b624b=this['realPictureId'](_0x240b46);return this['_animatedPictureWait'][_0x8b624b]===_0x4f868c&&(this[_0x483556(0x15c)][_0x8b624b]=_0x327a2d[_0x483556(0x14f)][_0x483556(0x150)]['WaitFrames']),this[_0x483556(0x15c)][_0x8b624b];}}},Sprite_Picture['prototype'][_0x5b7e10(0x114)]=function(){const _0x11c15e=_0x5b7e10;this[_0x11c15e(0x146)]+=0x1,this['_animationCount']>=this[_0x11c15e(0x104)]()&&(this[_0x11c15e(0x146)]=0x0,this[_0x11c15e(0x148)]+=0x1,this['_animationIndex']>=this[_0x11c15e(0x13b)]&&(this[_0x11c15e(0x153)]()?this['_animationIndex']=0x0:this['_animationIndex']=this['_animationMaxCells']-0x1),this[_0x11c15e(0x13c)]());},Sprite_Picture[_0x5b7e10(0xf1)][_0x5b7e10(0x13c)]=function(){const _0xc399bd=_0x5b7e10,_0x197d7a=this['bitmap'][_0xc399bd(0x166)]/this[_0xc399bd(0x132)],_0x589eef=this['bitmap'][_0xc399bd(0x131)]/this[_0xc399bd(0x14d)],_0x1e6c90=this[_0xc399bd(0x148)]%this[_0xc399bd(0x132)]*_0x197d7a,_0x19433a=Math[_0xc399bd(0x12d)](this[_0xc399bd(0x148)]/this[_0xc399bd(0x132)])*_0x589eef;this['setFrame'](_0x1e6c90,_0x19433a,_0x197d7a,_0x589eef);},Sprite_Picture[_0x5b7e10(0xf1)][_0x5b7e10(0x153)]=function(){const _0x4ecb88=_0x5b7e10;return $gameScreen[_0x4ecb88(0x112)](this['_pictureId']);},Sprite_Picture['prototype']['animationWaitFrames']=function(){const _0x582af9=_0x5b7e10;return $gameScreen[_0x582af9(0x141)](this['_pictureId']);};