//=============================================================================
// MYTH_CGC_FunctionKeyMapper.js
//=============================================================================
/*:
 * @target MZ
 * @author Swarnava Banerjee (Neel)
 * @plugindesc v0.1 Allows the user to set up Keyboard Hotkeys to CGC functions.
 * @url https://mythatelier.itch.io/
 * 
 * @param keyFunctions
 * @text Function Keys
 * @type struct<KeyMap>[]
 * @default ["{\"keyCode\":\"49\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win && BattleManager._currentCardBattler._cardHand.length > 0){ win.select(win._itemsBeforeCards); }\"}","{\"keyCode\":\"50\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win && BattleManager._currentCardBattler._cardHand.length > 1){ win.select(win._itemsBeforeCards + 1); }\"}","{\"keyCode\":\"51\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win && BattleManager._currentCardBattler._cardHand.length > 2){ win.select(win._itemsBeforeCards + 2); }\"}","{\"keyCode\":\"52\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win && BattleManager._currentCardBattler._cardHand.length > 3){ win.select(win._itemsBeforeCards + 3); }\"}","{\"keyCode\":\"53\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win && BattleManager._currentCardBattler._cardHand.length > 4){ win.select(win._itemsBeforeCards + 4); }\"}","{\"keyCode\":\"54\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win && BattleManager._currentCardBattler._cardHand.length > 5){ win.select(win._itemsBeforeCards + 5); }\"}","{\"keyCode\":\"55\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win && BattleManager._currentCardBattler._cardHand.length > 6){ win.select(win._itemsBeforeCards + 6); }\"}","{\"keyCode\":\"56\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win && BattleManager._currentCardBattler._cardHand.length > 7){ win.select(win._itemsBeforeCards + 7); }\"}","{\"keyCode\":\"57\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win && BattleManager._currentCardBattler._cardHand.length > 8){ win.select(win._itemsBeforeCards + 8); }\"}","{\"keyCode\":\"58\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win && BattleManager._currentCardBattler._cardHand.length > 9){ win.select(win._itemsBeforeCards + 9); }\"}","{\"keyCode\":\"59\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win && BattleManager._currentCardBattler._cardHand.length > 10){ win.select(win._itemsBeforeCards + 10); }\"}","{\"keyCode\":\"65\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win){ win.select(win._deckSprite._index); }\"}","{\"keyCode\":\"83\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win){ win.select(win._discardSprite._index); }\"}","{\"keyCode\":\"69\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win){ win.select(win._endTurnButton._index); }\"}","{\"keyCode\":\"73\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win){ win.select(win._itemButton._index); }\"}","{\"keyCode\":\"75\",\"evalFunc\":\"var win = SceneManager._scene._skillWindow; if(win && win._extraButtons.length > 0){ win.select(win._extraButtons[0]._index); }\"}"]
 * 
 * @help
 * 
 * ============================================================================
 *                                Overview
 * ============================================================================
 * 
 * This is a simple script that should allow us to make Keyboard Bindings for
 * various functions that can accelerate or improve QoL of Card Game Combat.
 * To make a new mapping you add a new entry to the list, set a key code
 * (https://www.toptal.com/developers/keycode) and then write a string that will
 * be eval'd when you hit the corresponding input in a project running Card Game 
 * Combat.
 * 
 * Right now keybound actions have been restricted to being in Scene Battle but
 * this could easily be expanded to other Scenes in future iterations. 
 * 
 * Warning: There are no safeties when the eval string is parsed so if there is 
 * a crash or softlock that is on how that JS code script call was set up.
 * 
 * ============================================================================
 *                                Version History
 * ============================================================================
 * 
 * v0.1.0 - Got it working, needs more features and safety checks.
 * 
 * =============================================================================
 *                              Contact Information
 * =============================================================================
 *
 * This tool was developed by folks at MythAtelier LLC. We make Games that Care.
 *
 * Need more tools for your project? Be sure to check out our other plugins here:
 * https://itch.io/c/1695699/tools-plugins
 *
 * Have any questions? Run into any bugs? Want to chat? Best place to reach us:
 * https://discord.gg/wRk4XHF5tZ
 *
 * If you like this plugin and want to support us, please give our Patreon a look:
 * https://www.patreon.com/mythatelier
 *
 */

/*~struct~KeyMap:
* @param keyCode
* @text Key Code
* @type number
* @min 0
* @desc Key Code of the Input trigger we are looking for.
*
* @param evalFunc
* @text Eval Function
* @type string
* @default ""
* @desc String to be Eval'd when you press this button. Leave empty for no function.
*
*/


var Myth = Myth || {};
Myth.FKM = Myth.FKM || {};

Myth.Util = Myth.Util || {};
Myth.Util.usingMZ = (Utils.RPGMAKER_NAME == "MZ");

Myth.Parameters = PluginManager.parameters('MYTH_CGC_FunctionKeyMapper');
Myth.FKM.keyFunctions = {};

if (Myth.Parameters.keyFunctions)
{
    Myth.Parameters.keyFunctions = JSON.parse(Myth.Parameters.keyFunctions);
    if (Myth.Parameters.keyFunctions)
    {
        for (var i = 0; i < Myth.Parameters.keyFunctions.length; i++)
        {
            Myth.FKM.keyFunctions[i] = JSON.parse(Myth.Parameters.keyFunctions[i]);
            Input.keyMapper[String(Myth.FKM.keyFunctions[i].keyCode)] = "CGC_KeyFunc_" + String(i);
        }
    }
}

Myth_FKM_Scene_Battle_update = Scene_Battle.prototype.update;

Scene_Battle.prototype.update = function () {
    Myth_FKM_Scene_Battle_update.call(this);

    for (var i = 0; i < Myth.Parameters.keyFunctions.length; i++) {
        if (Input.isTriggered("CGC_KeyFunc_" + String(i))) {
            eval(String(Myth.FKM.keyFunctions[i].evalFunc));
        }
    }
}