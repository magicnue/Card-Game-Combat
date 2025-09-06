//=============================================================================
// MYTH_CGC_CardShopCore
//=============================================================================

/*:
 * @target MZ
 * @author Isiah Brighton
 * @plugindesc v1.2.0 An extension to MYTH_CGC_CoreEngine that adds a new menu for purchasing and selling cards
 * @url https://mythatelier.itch.io/card-shop-cgc-expansion-plugin
 *
 * @command openCardShop
 * @text Open Card Shop
 *   
 *   @arg 
 *
 * @command resetCardShop
 * @text Reset Card Shop
 *
 *   @arg eventId
 *   @type number
 *   @min 1
 *
 * @param defaultPrice
 * @text Default Card Price
 * @type number
 * @default 10
 * @desc The default price of cards in the shop. Can be overridden with notetags.
 * 
 * @param buyPriceFormula
 * @text Buy Price Formula
 * @type text
 * @default adjustedCardPrice
 * @desc The formula to determine the price of buying a card. See help section for details.
 *
 * @param sellPriceFormula
 * @text Sell Price Formula
 * @type text
 * @default sellPrice || Math.floor(buyPrice / 2)
 * @desc The formula to determine the price of selling a card. See help section for details.
 *
 * @param removePriceFormula
 * @text Remove Price Formula
 * @type text
 * @default (removePrice || buyPrice) + 10 * removed
 * @desc The formula to determine the price of removing a card. See help section for details.
 *
 * @param freeText
 * @text Free Card Text
 * @default 0 \c[16]Gold
 * @desc The text to display for a card that costs 0 Gold.
 * 
 * 
 * @param shopScene
 * @text Card Shop Scene Params
 * 
 *   
 *   @param previewCoords
 *   @parent shopScene
 *   @text Preview Coordinates
 *   @type struct<Coordinate>
 *   @desc The coordinates of the preview card in the Card Shop scene.
 *   @default {"x":"140","y":"450"}
 *
 *   @param previewScale
 *   @parent shopScene
 *   @text Preview Card Scale
 *   @desc The scale of the preview card in the Card Shop scene.
 *   @type number
 *   @decimals 2
 *   @default 1.0
 *   
 *   @param previewAmountCoords
 *   @parent shopScene
 *   @text Preview Cost Coordinates
 *   @type struct<Coordinate>
 *   @desc The offset coords of the Cost text for the preview card.
 *   @default {"x":"0","y":"0"}
 *
 *   @param section2
 *   @text Card Settings
 *   @parent shopScene
 *   
 *    @param numVisibleRows
 *    @parent section2
 *    @text Max Visible Rows
 *    @type number
 *    @default 2
 *    @desc Number used to calculate how long to wait before scrolling vertically.

 *    @param cardDisplay
 *    @text Card Placement Settings
 *    @parent section2
 *    @type struct<CardDisplay>
 *    @default {"maxCols":"6","cardScale":"1","selectedCardScale":"1.1","startPadding":"{\"x\":\"50\",\"y\":\"80\"}","cardSpacing":"{\"x\":\"30\",\"y\":\"40\"}","amountCoords":"{\"x\":\"0\",\"y\":\"0\"}","amountJustify":"right"}
 *    @desc Settings that determine how cards are positioned within the Library window.
 *   
 *    @param costWindowWidth
 *    @parent section2
 *    @text Cost Window Width
 *    @type number
 *    @default 200
 *    @desc If price text in the Buy Window gets cut off, you can increase this.
 *    
 *    @param costWindowFontSize
 *    @parent section2
 *    @text Cost Font Size
 *    @type number
 *    @default 18
 *    @desc The font size for a card's cost in the Buy Window.
 * 
 *   @param cardListWidth
 *   @parent shopScene
 *   @text Card List Window Width
 *   @desc The width in pixels of the Card List Window
 *   @type number
 *   @default 576
 * 
 *   @param confirmWidth
 *   @parent shopScene
 *   @text Confirm Window Width
 *   @desc The width in pixels of the Confirm Window
 *   @type number
 *   @default 400
 *     
 *   @param goldWindowWidth
 *   @text Gold Window Width
 *   @parent shopScene
 *   @type number
 *   @min 0
 *   @default 300
 *   @desc The width of the Gold Window. Determines how much space there is for the Card Preview.
 *   
 *   @param hideActorWindow
 *   @text Hide Actor Window?
 *   @parent shopScene
 *   @type boolean
 *   @default false
 *   @desc If set to ON, the Actor Window will only appear when buying a card with multiple party members.
 *   
 *   @param actorWindowWidth
 *   @text Actor Window Width
 *   @parent hideActorWindow
 *   @type number
 *   @min 0
 *   @default 300
 *   @desc The width of the Actor Window. Only used if Hide Actor Window is OFF.
 *   
 *  @param shortActorWindow
 *  @text Short Actor Window?
 *  @parent hideActorWindow
 *  @type boolean
 *  @default true
 *  @desc If set to ON, less information will show on the Actor Window.
 *     
 *  @param altUI
 *  @parent shopScene
 *  @text Move Help Window
 *  @type boolean
 *  @default false
 *  @desc If set to ON, the Help Window will appear underneath the Card Preview, giving more height to the Card List.
 *  
 *  @param altUIHelpRows
 *  @parent shopScene
 *  @text Help Window Rows
 *  @type number
 *  @default 2
 *  @desc Set the amount of rows of text that the Help Window can fit
 *    
 *   @param scrollSettings
 *   @text Scrollbar Settings
 *   @parent shopScene
 *
 *     @param scrollBar
 *     @parent scrollSettings
 *     @text Front Sprite
 *     @type file
 *     @dir img/system
 *     @require 1
 *     @desc The sprite used for the scrollbar. The middle third of its height scales to change the bar's size.
 *
 *     @param scrollBack
 *     @parent scrollSettings
 *     @text Back Sprite
 *     @type file
 *     @dir img/system
 *     @require 1
 *     @desc The sprite used for the bit behind the scrollbar.
 *
 *     @param scrollBarX
 *     @parent scrollSettings
 *     @text X Offset
 *     @type number
 *     @default 16
 *     @desc The amount of pixels to the right of a scrolling window the scroll bar will appear.
 *
 *     @param scrollBarYPinch
 *     @parent scrollSettings
 *     @text Y Pinch
 *     @type number
 *     @default 8
 *     @desc The amount of pixels the top is lowered by and the bottom is raised by to keep within the window.
 *    
 *    
 *  @param backgroundImage
 *  @text Background Image
 *  @type file
 *  @require 1
 *  @dir img/pictures
 *  @desc A background image can be added to the scene.
 *    
 * @param section3
 * @text ----------------------------------
 * 
 * @param cardPacks
 * @text Card Pack Presets
 * @type struct<CardPack>[]
 * @default []
 * @desc A list of Card Packs you can add to the Card Shop.
 * 
 * @param giveWholePackToActor
 * @text Give Whole Pack to Actor?
 * @type boolean
 * @default false
 * @desc If ON, when you buy a Card Pack all cards will go to the actor you select. When OFF, each card can go to a different actor.
 * 
 * @help
 *
 * 
 * ============================================================================
 * Overview
 * ============================================================================
 * 
 * This plugin adds a Card Shop scene
 * 
 * The Card Shop can be opened through the following process:
 * 
 *     1. In an event or common event, use Comments to add notetags to specify
 *        the contents of the shop, and whether the player can buy, sell, or 
 *        remove cards.
 *     2. In that same event or common event, call the script:
 *         this.cardShopProcessing();
 *         
 * Only one shop preset can be made per event page, but until the shop is reset
 * its stock will carry over between sessions. This means if the player buys
 * its entire stock, when the player returns to the shop it will stay empty.
 * 
 * ============================================================================
 * Buy, Sell, and Remove
 * ============================================================================
 * 
 * With each Card Shop, you can specify whether the player can buy cards, sell
 * cards and/or remove cards.
 * 
 * Buy - The player can add cards to their actors' library based on the
 *       inventory you specify through Event Comment tags (outlined below)
 * Sell - The player can remove cards from their library in exchange for half
 *       of the card's purchasing cost.
 * Remove - The player can remove cards from their library, but instead of
 *       receiving money, they must spend it based on an algorithm in the
 *       Remove Price plugin parameter.
 * 
 * 
 * ============================================================================
 * Skill notetags
 * ============================================================================
 * 
 * <Card Price: X>
 * <Card Buy Price: X>
 * 
 * This will set the price of that skill's Card to X. You can use \v[x] to
 * substitute the price with a Game Variable.
 * 
 * <Card Sell Price: X>
 * 
 * This will set the sell price of that skill's Card to X. You can use \v[x] 
 * to substitute the price with a Game Variable.
 * 
 * <Card Remove Price: X>
 * 
 * This will set the removal price of that skill's Card to X. You can use \v[x]
 * to substitute the price with a Game Variable.
 * 
 * <Shop Image: fileName>
 * 
 * This will cause that skill's Card to appear using the specified image
 * in the Card Shop. Images should be placed in img/CGC/shop.
 * 
 * ============================================================================
 * Event Comment tags
 * ============================================================================
 *
 * Before you can open the Card Shop scene, you need to specify the contents
 * of the shop. You can do so inside one or more Comments inside the event
 * page:
 * 
 *     <card shop>
 *     info
 *     info
 *     </card shop>
 * 
 * You can space out the info across multiple Comments in the event page.
 * 
 * In between the opening and closing tags, you can use the following syntax
 * to populate the card shop: 
 * 
 *     <card shop>
 *     3x Skill Y
 *     5x Skill Z
 *     </card shop>
 * 
 * Y and Z are the Skill IDs of Cards you want to include. [N]x refers to how
 * many copies of those Cards you want in the Shop. You can also use this format:
 *
 *     <card shop>
 *     5x skillName
 *     3x skillName
 *     1x skillName
 *     </card shop>
 *
 * Here the skillName is the name of the Card you want to include. If there are
 * multiple Cards with the same name, it will grab the first one in the database.
 *
 * If you want a card that has a different price from the default, use:
 * 
 *     Skill Y Price Z
 * 
 * Y is the Skill ID, and Z is the custom price.
 * You can also use:
 * 
 *     skillName Price Z
 * 
 * Finally, you can use:
 * 
 *     5x Skill Y Price Z
 *     2x skillName Price Z
 *     
 * In addition, you can add Card Packs that have been set up through the
 * Card Pack Preset parameters:
 * 
 *     Pack Preset Y
 *     3x Pack Preset Y
 * 
 * 
 *     Command: buy
 *     Command: buy, sell, remove, cancel
 *     
 * This determines which commands will be present in the scene. If only one
 * is present, the Command Window will be invisible and more space will be
 * given to the Card Selection Window.
 * 
 * 
 *     Buy price priceFormula
 *     
 * This sets a formula for that shop which modifies the costs of all cards.
 * 
 *     Sell price priceFormula
 *     Remove price priceFormula
 *     
 * These override the formulas used to determine how much a card is worth
 * when selling or removing. The default Sell formula is half of a card's
 * normal price, while the default Remove formula is set by the Remove Price
 * Formula plugin parameter.
 * 
 * For more about price formulas, see the Price Formulas of this help section.
 * 
 * 
 *     Buy Limit X
 *     Sell Limit X
 *     Remove Limit X
 *     
 * These determine how many cards can be bought, sold, or removed respectively
 * before the option to buy/sell/remove is disabled.
 * 
 * 
 * Lastly, this plugin has tools to allow you to randomize values within these
 * comments, like so:
 * 
 *    1x Skill [1-4]
 *    
 * Replacing a number with [min-max] will make the shop determine a random
 * number between the minimum and the maximum (inclusive). So in the above
 * example Skill 1, Skill 2, Skill 3, or Skill 4 may appear.
 * 
 * You can also put this at the beginning of the notetag, like so:
 * 
 *    [1-3]x Skill 4
 * 
 * This will cause the Shop to stock between 1 and 3 copies of Skill 4.
 * 
 * Additionally, you can also use the following:
 * 
 *    1x Skill [5, 7, 9]
 * 
 * Replacing a number with [x, y, z, etc] will make the shop choose
 * from the list of numbers inside the brackets. So in the above example
 * Skill 5, Skill 7, or skill 9 may appear.
 * 
 * This works anywhere in the comments to determine the shop inventory. This
 * means you can do this:
 * 
 * <card shop>
 * [3-4]x Skill [7, 8, 9, 11, 13, 15]
 * [1-2]x Pack Preset [1-3]
 * [1-2]x Pack Preset [1-3]
 * [1-2]x Pack Preset [1-3]
 * Buy Price buyPrice * [1-2]
 * </card shop>
 * 
 * Note that these randomization methods will only produce whole numbers.
 * Also note that any random numbers will retain their values when a shop's
 * inventory is reset through script calls or plugin commands.
 * 
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * this.cardShopProcessing();
 * 
 * As long as a Card Shop has been set up through the above Event Comment tags,
 * this will open up the Card Shop scene and take you to the shop belonging
 * to the same event calling this function.
 * 
 * this.resetCardShopInventory();
 * this.resetCardShopInventory(eventId);
 * 
 * This will reset the Card Shop of the specified event ID (or use the current
 * event if no ID is specified).
 * This means that it will restock to its original inventory and its Remove
 * costs will be reset.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * OpenCardShop
 *
 * Functions just as this.cardShopProcessing() to open Card Shop Scene in Event
 *
 * ResetCardShop
 * ResetCardShop [EventID]
 *
 * Functions just as this.resetCardShopInventory() to restock shop's original 
 * inventory and reset its Remove costs. If [EventID] is not specified will
 * default to resetting the shop for the current Event.
 *
 * ============================================================================
 * Price Formulas
 * ============================================================================
 * 
 * Price formulas work like damage formulas, except they determine how much
 * a card costs to buy or remove, or how much it gives the player on selling.
 * 
 * Price formulas have several variables you can use:
 *     buyPrice - the original Buy Price of a card set through Skill notetags.
 *     sellPrice - the original Sell Price of a card set through Skill notetags.
 *     removePrice - the original Remove Price of a card set through notetags.
 *     
 *     bought - the total cards bought at that shop
 *     sold - the total cards sold at that shop
 *     removed - the total cards removed at that shop
 *     
 *     adjustedCardPrice - a variable just for the Buy formula, this is
 *     the price of a card specific to this shop.
 *     
 * So using the following example:
 * 
 *     Remove price buyPrice + 10 * removed
 *     
 * If a card costs 40 to purchase, it will cost 40 to remove if the player
 * has not removed any cards at this shop, and every time they do the price
 * will increase by 10.
 * 
 * Example 2:
 * 
 *     Buy price adjustedCardPrice * 2
 * 
 * This creates a shop where all cards cost double, and in addition
 * some cards have a custom price which is *also* doubled.
 * 
 * Example 3:
 *
 *    Sell price Math.floor(buyPrice * 0.3)
 *
 * This creates a shop where all cards sold will get you roughly 30% 
 * of their value back in gold. This is not impacted by adjustements.
 *
 * ============================================================================
 * Version History
 * ============================================================================
 * 
 * v1.2.0 - Updated for compatibility with CoreEngine v1.6.2.
 *          Complete overhaul of Card Shop Scene as a product of the Library
 *          overhaul.
 *          Lots of UI improvements. More UI parameters.
 *          Fixed bug where buy formula would reset to default after backing
 *          out and reentering shop.
 *          Fixed bug where bought and sold variables would reset between
 *          shop instances.
 *          Fixed default sell formula not working.
 *          Added parameter to change what displays when a card is free.
 *          Added Card Packs to the shop.
 *          Added custom Sell and Remove prices to Card Notetags.
 *          Added custom Image notetags for Cards when displaying in the Shop.
 *          Added Buy Limit, Sell Limit, and Remove Limit options in a
 *          <card shop> settings tag.
 *          Added randomization options in <card shop> settings tags.
 *          Added compatibility with YEP_X_MoreCurrencies.
 *			Fixed CardShopCore bug where Help Window would still appear when 
 *			its Rows parameter was 0.
 *			Fixed Param Descriptions in CardShopCore referring to Simple Library
 * 
 * 
 * v1.1.3 - Fixed scrollbar math error.
 *          Added Cost Text Y Offset parameter, organized parameters a bit.
 *          Fixed cards scrolling offscreen becoming unreachable when you
 *          scroll back up.
 *          A few minor rewrites of the help section.
 *          Added error handling if IsiahCardGameCombat is not above it in
 *          the plugin manager.
 * 
 * v1.1.2 - Fixed error where 1 Member Party was unable to back out of a Buy
 *
 * v1.1.1 - Added Plugin Params for default Buy and Sell Price Formulas
 *        - Added Plugin Commands for Opening and Resetting Card Shop
 *
 * v1.1.0 - Fixed touch input bug in MV that would prevent selection
 *          Fixed cost text being in the wrong place for the preview card if
 *          opening a card shop for the first time before loading any other
 *          scenes with cards.
 *          Fixed crash when calling common events in certain ways.
 *          Fixed "ghost cards" if the user supplies cards that are hidden
 *          from the library.
 *          Added extra feedback when using deck editor. Now if you try to
 *          sell/remove cards when all cards are in use, the help window
 *          tells you so.
 *          Command Window now has room for 4 items
 *          Dummy Window is now the same dimensions as the Buy Window.
 *          Added compatibility with YEP_ShopMenuCore
 *          
 *          Custom prices can now accept formulas, and make use of the 
 *          cardPrice variable. You can even combine game variables.
 *          Added scrollbar
 *          Introduced an alternate UI design which shrinks the help window
 *          and expands the card list window.
 *          
 *          Added tags allowing you to custom price a custom amount of cards
 *          Added tags allowing you to specify custom price formulas for
 *          buying, selling and removing (overriding default values).
 * 
 * v1.0.0 - Released plugin
 *
 */

/*~struct~Coordinate:
 * @param x
 * @text X Coordinate
 * @type number
 * @min -10000
 * @default 0
 *
 * @param y
 * @text Y Coordinate
 * @type number
 * @min -10000
 * @default 0
 *
 */

/*~struct~CardDisplay:
 * @param maxCols
 * @text Max Columns
 * @type number
 * @default 6
 * @desc The max number of columns for the cards.
 *
 * @param cardScale
 * @text Card Scale
 * @type number
 * @default 1
 * @decimals 2
 * @min 0.01
 * @desc The multiplier for the scale of the cards.
 *
 * @param selectedCardScale
 * @text Selected Card Scale
 * @type number
 * @decimals 2
 * @min 0.01
 * @default 1.1
 * @desc The scale of the card that is currently selected in the menu.
 *
 * @param startPadding
 * @text Starting Padding
 * @type struct<Coordinate>
 * @desc The padding between the left/top of the Window and the cards.
 * @default {"x":"50","y":"80"}
 *
 * @param cardSpacing
 * @text Card Spacing
 * @type struct<Coordinate>
 * @desc The spacing between cards
 * @default {"x":"30","y":"40"}
 *
 * @param amountCoords
 * @text Amount Text Offset
 * @type struct<Coordinate>
 * @desc The coordinate offset values for the Amount text. They default to underneath the center of the cards.
 * @default {"x":"0","y":"0"}
 *
 * @param amountJustify
 * @text Amount Text Justify
 * @type select
 * @option left
 * @option center
 * @option right
 * @default right
 * @desc Whether the "amount" text of a card will be centered, justified left, or right.
 *
 *
 */

/*~struct~CardPack:
 * @param name
 * @text Name
 * @default Booster Pack
 * @desc The name that will display for the card pack.
 *
 * @param description
 * @text Description
 * @default Buy a pack of 5 cards
 * @desc The text that will fill the help window when highlighting this card pack.
 *
 * @param amount
 * @text Amount of Cards in Pack
 * @type number
 * @min 1
 * @default 5
 * @desc The amount of cards any copy of this pack can contain.
 * 
 * @param cardPool
 * @text Card Pool
 * @type struct<PoolCard>[]
 * @default []
 * @desc The cards that could appear in any copy of this pack.
 *
 * @param price
 * @text Price
 * @type number
 * @default 100
 * @desc The amount of gold this pack costs.
 * 
 * @param image
 * @text Cover Image
 * @default Default
 * @desc The image in img/CGC/shop that makes the appearance of this pack.
 * 
 * @param note
 * @text Notetag
 * @type note
 * @desc If you need to put notetags in here, like for YEP_X_MoreCurrencies.
 * @default ""
 *
 */

/*~struct~PoolCard:
 *
 * @param skill
 * @text Skill
 * @type skill
 * @desc The Skill of the Card in the pool.
 * 
 * @param weight
 * @text Weight
 * @type number
 * @min 1
 * @default 100
 * @desc The Weight of the Card to be picked from the pool. Higher weight means more likely to appear.
 * 
 */

var Myth = Myth || {};

if (!Myth.CGC)
{
	throw new TypeError("Please make sure MYTH_CGC_CoreEngine is placed above all other MYTH_CGC plugins.");
}
Myth.CGC = Myth.CGC || {};
Myth.CGC.Shop = {};

Myth.Parameters = PluginManager.parameters('MYTH_CGC_CardShopCore');

Myth.CGC.Shop.coordinates = {
	cardListWidth: Number(Myth.Parameters.cardListWidth),
	cardScale: Number(Myth.Parameters.cardScale),
	selectedCardScale: Number(Myth.Parameters.selectedCardScale),
	amountY: Number(Myth.Parameters.amountY),

	numVisibleRows: Number(Myth.Parameters.numVisibleRows),
	cardDisplay: JSON.parse(Myth.Parameters.cardDisplay),

	previewCoords: JSON.parse(Myth.Parameters.previewCoords),
	previewAmountCoords: JSON.parse(Myth.Parameters.previewAmountCoords),
	previewScale: Number(Myth.Parameters.previewScale),

	confirmWidth: Number(Myth.Parameters.confirmWidth),

	scrollBarX: Number(Myth.Parameters.scrollBarX),
	scrollBarYPinch: Number(Myth.Parameters.scrollBarYPinch),

	altUI: JSON.parse(Myth.Parameters.altUI),
	helpRows: Number(Myth.Parameters.altUIHelpRows),
	shortActorWindow: JSON.parse(Myth.Parameters.shortActorWindow),

	hideActorWindow: JSON.parse(Myth.Parameters.hideActorWindow),
	goldWindowWidth: Number(Myth.Parameters.goldWindowWidth),
	actorWindowWidth: Number(Myth.Parameters.actorWindowWidth),


	costWindowWidth: Number(Myth.Parameters.costWindowWidth),
	costWindowFontSize: Number(Myth.Parameters.costWindowFontSize)
}

Myth.CGC.Shop.giveWholePackToActor = JSON.parse(Myth.Parameters.giveWholePackToActor);

Myth.Util.castMembersToNumber(Myth.CGC.Shop.coordinates);

Myth.CGC.Shop.images = {
	scrollBar: Myth.Parameters.scrollBar,
	scrollBack: Myth.Parameters.scrollBack
}

Myth.CGC.cardShopBackgroundImage = Myth.Parameters.backgroundImage;

Myth.CGC.Shop.defaultPrice = Number(Myth.Parameters.defaultPrice);

Myth.CGC.Shop.buyPriceFormula = Myth.Parameters.buyPriceFormula;
Myth.CGC.Shop.sellPriceFormula = Myth.Parameters.sellPriceFormula;
Myth.CGC.Shop.removePriceFormula = Myth.Parameters.removePriceFormula;

Myth.CGC.Shop.freeText = Myth.Parameters.freeText;
Myth.CGC.Shop.trashPackText = "Trash remaining cards?";
//Myth.CGC.Shop.freeText = "Free";

Myth.CGC.Shop.cardPacks = JSON.parse(Myth.Parameters.cardPacks);
for (var i = 0; i < Myth.CGC.Shop.cardPacks.length; i++)
{
	Myth.CGC.Shop.cardPacks[i] = JSON.parse(Myth.CGC.Shop.cardPacks[i]);
	Myth.CGC.Shop.cardPacks[i].cardPool = JSON.parse(Myth.CGC.Shop.cardPacks[i].cardPool);
	for (var j = 0; j < Myth.CGC.Shop.cardPacks[i].cardPool.length; j++)
	{
		Myth.CGC.Shop.cardPacks[i].cardPool[j] = JSON.parse(Myth.CGC.Shop.cardPacks[i].cardPool[j]);
	}
}
Myth.Util.castMembersToNumber(Myth.CGC.Shop.cardPacks);
Myth.CGC.Shop.cardPacks.splice(0, 0, null);

Myth.CGC.Shop.Game_Interpreter_pluginCommand_cardShop = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
	var comm = command.toLowerCase();
	if(comm == "opencardshop")
	{
		this.cardShopProcessing();
	}
	else if(comm == "resetcardshop")
	{
		var index = Number(args[0]);
		this.resetCardShopInventory(index);
	}
	else
	{
		return Myth.CGC.Shop.Game_Interpreter_pluginCommand_cardShop.call(this, command, args);
	}
}

if(Myth.Util.usingMZ)
{
	PluginManager.registerCommand("MYTH_CGC_CardShopCore", "openCardShop", args =>
	{
		var interpreter = Myth.Util.getInterpreter();
		if(!interpreter) return;
		interpreter.cardShopProcessing();
	});

	PluginManager.registerCommand("MYTH_CGC_CardShopCore", "resetCardShop", args =>
	{
		var interpreter = Myth.Util.getInterpreter();
		if(!interpreter) return;
		var eventID = Number(args.eventID);
		interpreter.resetCardShopInventory(eventID);
	});

	Myth.Util.getInterpreter = function()
	{
		if(SceneManager._scene instanceof Scene_Battle)
			return $gameTroop._interpreter; 
		else if(SceneManager._scene instanceof Scene_Map)
			return $gameMap._interpreter;

		return null;
	}
}

Game_Interpreter.prototype.cardShopProcessing = function ()
{
	if ($gameParty.inBattle()) return false;
	var shop;
	var event = $gameMap.event(this._eventId);
	if (event && event._cardShop)
		shop = event._cardShop;
	else
		shop = Myth.CGC.Shop._cardShop;
	if (shop == undefined) return false;
	Scene_CardShop.prepare(shop);
	SceneManager.push(Scene_CardShop);
	SceneManager.prepareNextScene(shop._goods, shop._price, shop._commands);
	this._justHadCardShop = 2;
	return true;
};

Game_Interpreter.prototype.resetCardShopInventory = function (eventId)
{
	eventId = eventId || this._eventId;
	var event = $gameMap.event(eventId);
	if (event && event._cardShop)
	{
		if (event._originalCardShop == null || event._originalCardShop == undefined)
			event._cardShop = null;
		else
		{
			event._cardShop.copy(event._originalCardShop);
		}
	}
		
	Myth.CGC.Shop._cardShop = null;
}

Myth.CGC.Shop.Game_Interpreter_update = Game_Interpreter.prototype.update;
Game_Interpreter.prototype.update = function ()
{
	Myth.CGC.Shop.Game_Interpreter_update.call(this)
	if (this._justHadCardShop)
	{
		this._justHadCardShop--;
		if (this._justHadCardShop == 0)
			this.updateEventInventory();
	}
}

Game_Interpreter.prototype.updateEventInventory = function ()
{
	var shop = new CardShop_Inventory();
	shop._goods = Scene_CardShop._goods;
	shop._price = Scene_CardShop._price;
	shop._commands = Scene_CardShop._commands;
	shop._removed = Scene_CardShop._removed;
	shop._bought = Scene_CardShop._bought;
	shop._sold = Scene_CardShop._sold;
	shop._buyFormula = Scene_CardShop._buyFormula;
	shop._sellFormula = Scene_CardShop._sellFormula;
	shop._removeFormula = Scene_CardShop._removeFormula;
	shop._limits = Scene_CardShop._limits;
	if (this._cardShop == undefined)
	{
		var event = $gameMap.event(this._eventId);
		if (event)
			event._cardShop = shop;
	}
}

function Scene_CardShop()
{
	this.initialize.apply(this, arguments);
}

Scene_CardShop.prototype = Object.create(Scene_Shop.prototype);
Scene_CardShop.prototype.constructor = Scene_CardShop;

Scene_CardShop.prepare = function (preset)
{
	this._goods = preset._goods;
	this._price = preset._price;
	this._goodsPlusPrice = [];
	this._bought = preset._bought;
	this._sold = preset._sold;
	this._removed = preset._removed;
	this._buyFormula = preset._buyFormula;
	this._sellFormula = preset._sellFormula;
	this._removeFormula = preset._removeFormula;
	this._limits = preset._limits;
	for (var i = 0; i < this._goods.length; i++)
	{
		this._goodsPlusPrice[i] = [this._goods[i], this._price[i]];
	}
	this._commands = preset._commands;
	//SceneManager.push(this);
};

Scene_CardShop.prototype.prepare = function (goods, purchaseOnly, commands)
{
	this._goods = goods;
	this._purchaseOnly = purchaseOnly;
	this._commands = commands
	this._item = null;
};

Scene_CardShop.prototype.terminate = function ()
{
	var data = this._buyWindow._data;
	var price = this._buyWindow._price;
	var removed = this._sellWindow._removed;
	var bought = this._buyWindow._bought;
	var sold = this._sellWindow._sold;
	var goods = [];
	var prices = [];
	for (var i = 0; i < data.length; i++)
	{
		goods[i] = data[i];
		prices[i] = price[i];
	}
	var tempShop = new CardShop_Inventory();
	tempShop._goods = goods;
	tempShop._price = prices;
	tempShop._removed = removed;
	tempShop._bought = bought;
	tempShop._sold = sold;
	tempShop._commands = this._commands;
	tempShop._buyFormula = Scene_CardShop._buyFormula;
	tempShop._sellFormula = Scene_CardShop._sellFormula;
	tempShop._removeFormula = Scene_CardShop._removeFormula;
	tempShop._limits = Scene_CardShop._limits;
	Scene_CardShop.prepare(tempShop);
	Scene_Shop.prototype.terminate.call(this);

}

Scene_CardShop.prototype.create = function ()
{
	Scene_MenuBase.prototype.create.call(this);
	this.createHelpWindow();
	this.createPreviewCard();
	this.createCommandWindow();
	this.createGoldWindow();
	this.createLimitWindow();
	
	this.createBuyWindow();
	this.createSellWindow();
	this.createDummyWindow();
	
	this.createCardPackWindow();

	this.createActorWindow();

	this._windowLayer.removeChild(this._helpWindow);
	this._windowLayer.addChild(this._helpWindow);
	this._windowLayer.removeChild(this._commandWindow);
	if (Scene_CardShop._commands.length > 1)
		this._windowLayer.addChild(this._commandWindow);
	this._windowLayer.removeChild(this._goldWindow);
	this._windowLayer.addChild(this._goldWindow);

	this.createConfirmWindow();


	if (Scene_CardShop._commands.length == 1)
	{
		var command = Scene_CardShop._commands[0];
		if (command == 'buy')
			this.commandBuy();
		else if (command == 'sell')
			this.commandSell();
		else if (command == 'remove')
			this.commandRemove();

		this._commandWindow.deactivate();
	}
};

Scene_CardShop.prototype.createHelpWindow = function ()
{
	//if (!Myth.CGC.Shop.coordinates.altUI)
	//	return Scene_Shop.prototype.createHelpWindow.call(this);

	var x = 0;
	var width = Graphics.boxWidth;
	var height = Window_Help.prototype.fittingHeight(Myth.CGC.Shop.coordinates.helpRows);
	if (Myth.CGC.Shop.coordinates.helpRows == 0)
		height = 0;
	var y = Graphics.boxHeight - height;

	if (Myth.CGC.Shop.coordinates.altUI)
	{
		width = Myth.CGC.Shop.coordinates.goldWindowWidth;
/*		x = Myth.CGC.Shop.coordinates.cardListWidth;
		width = Graphics.boxWidth - x;*/
	}

	if (Myth.Util.usingMZ)
	{
		var rect = new Rectangle(x, y, width, height);
		this._helpWindow = new Window_Help(rect);
	}
	else
	{
		this._helpWindow = new Window_Help();
		this._helpWindow.move(x, y, width, height);
	}
	this.addWindow(this._helpWindow);
}

Scene_CardShop.prototype.createGoldWindow = function ()
{
	if (Myth.Util.usingMZ)
	{
		const rect = this.goldWindowRect();
		this._goldWindow = new Window_Gold(rect);
	}
	else
	{
		var y = this._commandWindow.y + this._commandWindow.height;
		this._goldWindow = new Window_Gold(0, y);
		this._goldWindow.width = Myth.CGC.Shop.coordinates.goldWindowWidth;
		this._goldWindow.createContents();
		//this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
	}
	this._goldWindow.refresh();
	this.addWindow(this._goldWindow);
};

Scene_CardShop.prototype.createLimitWindow = function ()
{
	var rect = new Rectangle(this._goldWindow.x, this._goldWindow.y + this._goldWindow.height, this._goldWindow.width, this._goldWindow.height);
	//rect.y = this._goldWindow.y + this._goldWindow.height;
	if (Myth.Util.usingMZ)
		this._limitWindow = new Window_Base(rect);
	else
		this._limitWindow = new Window_Base(rect.x, rect.y, rect.width, rect.height);

	this.addWindow(this._limitWindow);
	this._limitWindow.hide();
}

Scene_CardShop.prototype.refreshLimitWindow = function ()
{
	var mode = this.mode();
	var amount = Scene_CardShop._limits[mode];
	if (amount != -1)
		this._limitWindow.show();
	else
		this._limitWindow.hide();

	var remaining = 0;
	switch (mode)
	{
		case "buy":
			remaining = this._buyWindow._limits.buy - this._buyWindow._bought; break;
		case "sell":
			remaining = this._sellWindow._limits.sell - this._sellWindow._sold; break;
		case "remove":
			remaining = this._sellWindow._limits.remove - this._sellWindow._removed; break;
	}

	this._limitWindow.contents.clear();
	this._limitWindow.drawText("Remaining: " + remaining, 0, 0, this._limitWindow.contents.width, 'right');
}

Scene_CardShop.prototype.goldWindowRect = function ()
{
	const ww = Myth.CGC.Shop.coordinates.goldWindowWidth;
	const wh = this.calcWindowHeight(1, true);
	const wx = 0;
	const wy = this._commandWindow.y + this._commandWindow.height;
	return new Rectangle(wx, wy, ww, wh);
}

Scene_CardShop.prototype.createDummyWindow = function ()
{
	var wy = this._buyWindow.y;
	var wh = this._buyWindow.height;
	var wx = this._buyWindow.x;
	var ww = this._buyWindow.width;
	if (Myth.Util.usingMZ)
	{
		var rect = new Rectangle(wx, wy, ww, wh);
		this._dummyWindow = new Window_Base(rect);
	}
	else
		this._dummyWindow = new Window_Base(wx, wy, ww, wh);
	this.addWindow(this._dummyWindow);
};

Scene_CardShop.prototype.createCommandWindow = function ()
{
	this._commandWindow = new Window_CardShopCommand(Graphics.boxWidth);
	var y = 0;
	this._commandWindow.y = y;
	this._commandWindow.setHandler('buy', this.commandBuy.bind(this));
	this._commandWindow.setHandler('sell', this.commandSell.bind(this));
	this._commandWindow.setHandler('remove', this.commandRemove.bind(this));
	this._commandWindow.setHandler('cancel', this.popScene.bind(this));
	this.addWindow(this._commandWindow);
};

Scene_CardShop.prototype.createConfirmWindow = function ()
{
	this._confirmWindow = new Window_CardShopConfirm();
	this._confirmWindow.setHandler('yes', this.confirmOk.bind(this));
	this._confirmWindow.setHandler('cancel', this.confirmCancel.bind(this));
	this.addWindow(this._confirmWindow);
}

Scene_CardShop.prototype.confirmCancel = function ()
{
	this._confirmWindow.close();

	var mode = this._actorWindow.mode();
	var item = SceneManager._scene._item;
	console.log(item);
	if (this._cardPackWindow.visible)
	{
		this._cardPackWindow.activate();
	}
	else if (!item.isGameCard())
	{
		this._buyWindow.activate();
		this._actorWindow.deselect();
	}
	else if ($gameParty.members().length > 1 && !Myth.Util.sharedLibrary())
	{
		if (mode == 'buy')
		{
			this._actorWindow.show();
			this._actorWindow.activate();
		}
		else
		{
			this._sellWindow.activate();
		}
	}
	else
	{
		if (mode == 'buy')
		{
			this._buyWindow.activate();
		}
		else
		{
			this._sellWindow.activate();
		}
	}
};

Scene_CardShop.prototype.confirmOk = function ()
{
	var mode = this._actorWindow.mode();
	if (this._cardPackWindow.visible)
	{
		this._cardPackWindow.hide();
		this._cardPackWindow.deactivate();
		this._cardPackWindow.deleteCardSprites();
		this._cardPackWindow.setCardPack(null);
		this.endActorInput();
		SoundManager.playOk();
	}
	else if (mode == 'buy')
	{
		SoundManager.playShop();
		this._item = this._buyWindow.item();
		this.doBuy(1);
		this._buyWindow.removeCurrentItem();
		if (this._item.isGameCard())
		{
			this.endActorInput();
		}
		else
		{
			this.setupCardPackWindow(this._item);
		}
		
		this._goldWindow.refresh();
		
	}
	else if (mode == 'sell' || mode == 'remove')
	{
		SoundManager.playShop();
		if (this._sellWindow._mode == 'sell')
			this.doSell(1);
		else if (this._sellWindow._mode == 'remove')
			this.doRemove();
		this._sellWindow.removeCurrentItem();
		this._goldWindow.refresh();
		this._sellWindow.activate();
	}
	this._confirmWindow.close();
}

Scene_CardShop.prototype.setupCardPackWindow = function (item)
{
	this._cardPackWindow.setCardPack(item);
	this._cardPackWindow.show();
	this._cardPackWindow.activate();
	this._cardPackWindow.select(0);
}

Scene_CardShop.prototype.createCategoryWindow = function ()
{

};

Scene_CardShop.prototype.createSellWindow = function ()
{
	var wx = this._buyWindow.x; var wy = this._buyWindow.y; var wh = this._buyWindow.height; var ww = this._buyWindow.width;
	this._sellWindow = new Window_CardShopBuy(wx, wy, ww, wh, [], this._actor);
	this._sellWindow.setSellWindow(true);
	this._sellWindow._removed = Scene_CardShop._removed;
	this._sellWindow._sold = Scene_CardShop._sold;
	this._sellWindow._limits = Scene_CardShop._limits;
	this._sellWindow.setHelpWindow(this._helpWindow);
	this._sellWindow._previewSprite = this._previewSprite;
	//this._buyWindow.setStatusWindow(this._statusWindow);
	this._sellWindow.hide();
	this._sellWindow.setHandler('ok', this.onSellOk.bind(this));
	this._sellWindow.setHandler('cancel', this.onBuyCancel.bind(this));
	this._sellWindow.setMode('sell');
	this.addWindow(this._sellWindow);
};

Scene_CardShop.prototype.createActorWindow = function ()
{
	this._actorWindow = new Window_CardShopActor(0, 0);
	var width = this.actorWindowWidth();
	var x = Graphics.boxWidth - width;
	var y = this._goldWindow.y;
	var height = Graphics.boxHeight - (y + this._helpWindow.height);
	if (Myth.CGC.Shop.coordinates.hideActorWindow)
	{
		x = this._buyWindow.x;
		y = this._buyWindow.y;
		width = this._buyWindow.width;
		height = this._buyWindow.height;
	}
	else if (Myth.CGC.Shop.coordinates.altUI)
	{
		height = this._buyWindow.height;
	}
	
	this._actorWindow.move(x, y, width, height);
	this._actorWindow.createContents();
	this._actorWindow.refresh();
	//this._actorWindow.select(0);
	this._actorWindow.setHandler('ok', this.onActorOk.bind(this));
	this._actorWindow.setHandler('cancel', this.onActorCancel.bind(this));
	this.addWindow(this._actorWindow);
};

Scene_CardShop.prototype.createCardPackWindow = function ()
{
	this._cardPackWindow = new Window_CardPackOpener();

	this._cardPackWindow.hide();
	this._cardPackWindow.setHelpWindow(this._helpWindow);
	this._cardPackWindow.setHandler('ok', this.onCardPackOk.bind(this));
	this._cardPackWindow.setHandler('cancel', this.onCardPackCancel.bind(this));
	this.addWindow(this._cardPackWindow);
};

Scene_CardShop.prototype.onCardPackOk = function ()
{
	if (Myth.CGC.Shop.giveWholePackToActor)
		this.onCardPackCancel();
	else
	{
		this._actorWindow.select(0);
		this._actorWindow.show();
		this._actorWindow.activate();
		Input.clear();
	}
}

Scene_CardShop.prototype.onCardPackCancel = function ()
{
	if (Myth.CGC.Shop.giveWholePackToActor)
	{
		var cards = this._cardPackWindow._cards;
		for (var i = 0; i < cards.length; i++)
		{
			this.addCardToLibrary(cards[i]);
		}
		this._cardPackWindow.setCardPack(null);
		this._cardPackWindow.hide();
		this.endActorInput();
	}
	else
	{
		this._confirmWindow.open(Myth.CGC.Shop.trashPackText);
		this._confirmWindow.activate();
		//this._cardPackWindow.activate();
	}
}



Scene_CardShop.prototype.commandBuy = function ()
{
	if (this._dummyWindow)
		this._dummyWindow.hide();
	this.activateBuyWindow();
	this._actorWindow.setMode('buy');

	this.refreshLimitWindow();
};

Scene_CardShop.prototype.commandSell = function ()
{
	if (Myth.CGC.Shop.coordinates.hideActorWindow)
		this._dummyWindow.hide();
	this._actorWindow.show();
	this._actorWindow.activate();
	this._actorWindow.select(0);
	this._item = null;
	this._actorWindow.refresh();
	this._actorWindow.setMode('sell');
	var text = "Select the actor to sell cards.";
	if (this._helpWindow.textWidth(text) > this._helpWindow.contents.width)
		text = "Select the actor\nto sell cards."
	this._helpWindow.setText(text);
	if ($gameParty.members().length == 1 || Myth.Util.sharedLibrary())
		this.onActorOk();

	this.refreshLimitWindow();
};

Scene_CardShop.prototype.commandRemove = function ()
{
	if (Myth.CGC.Shop.coordinates.hideActorWindow)
		this._dummyWindow.hide();
	this._actorWindow.show();
	this._actorWindow.activate();
	this._actorWindow.select(0);
	this._item = null;
	this._actorWindow.refresh();
	this._actorWindow.setMode('remove')
	var text = "Select the actor to remove cards.";
	if (this._helpWindow.textWidth(text) > this._helpWindow.contents.width)
		text = "Select the actor\nto remove cards."
	this._helpWindow.setText(text);
	if ($gameParty.members().length == 1 || Myth.Util.sharedLibrary())
		this.onActorOk();

	this.refreshLimitWindow();
}

Scene_CardShop.prototype.previewCardWidth = function ()
{
	var bitmap = Myth.CGC.defaultCardBack;
	return bitmap.width * Myth.CGC.Shop.coordinates.previewScale;
}

Scene_CardShop.prototype.previewCardHeight = function ()
{
	var bitmap = Myth.CGC.defaultCardBack;
	return bitmap.height * Myth.CGC.Shop.coordinates.previewScale;
}

Scene_CardShop.prototype.mode = function ()
{
	return this._actorWindow._mode;
}

Scene_CardShop.prototype.createPreviewCard = function ()
{
	var width = this.previewCardWidth();
	var height = this.previewCardHeight();

	var coords = Myth.CGC.Shop.coordinates;

	var scene = this;
	this._previewSprite = new Sprite_SkillCard($dataSkills[1], this._actor);
	this._previewSprite._amountColor = 'white';
	this._previewSprite.drawAmount = function (isEnabled)
	{
		if (this._amount == undefined || isNaN(this._amount)) return;
		this._amountText.drawPrice(isEnabled, scene.mode());
	}

	this._previewSprite.x = coords.previewCoords.x;
	this._previewSprite.y = coords.previewCoords.y;



	var scale = Myth.CGC.Shop.coordinates.previewScale;
	this._previewSprite.scale = new Point(scale, scale);

	
	this._previewSprite._amountText = new Window_CardCost(this._previewSprite, width);
	this._previewSprite._amountText.x = this._previewSprite.x - width / 2 + coords.previewAmountCoords.x;
	this._previewSprite._amountText.y = this._previewSprite.y + (height / 2) + coords.previewAmountCoords.y;

	setTimeout(() =>
	{
		this._previewSprite._amountText.y = this._previewSprite.y + (height / 2) + 26;
	}, 100);

	this._previewSprite.hide();
	this.addCardSprite(this._previewSprite);

	var _setCard = this._previewSprite.setCard;
	this._previewSprite.setCard = function (card, goldCost, isEnabled)
	{
		this._skillname = null;
		this._amount = goldCost;
		if (card != null && !card.isGameCard())
		{
			this._cardPack = card;
			this.drawAmount(isEnabled);
			//this.setCard(null);
			return;
		}

		this._cardPack = null;

		if (card != null)
		{
			_setCard.call(this, card);
			this.drawAmount(isEnabled);
			this.show();
		}
		else
		{
			this.hide();
			this._amountText.contents.clear();
		}


		//this.addShopImage();
	}

	var _drawCardBitmap = this._previewSprite.drawCardBitmap;
	this._previewSprite.drawCardBitmap = function ()
	{
		_drawCardBitmap.call(this);
		if (this._card == null)
			this.addShopImage();
		else if (SceneManager._scene._commandWindow.currentSymbol() == 'buy')
			this.addShopImage();
	}

	var _addShopImage = this._previewSprite.addShopImage;
	this._previewSprite.addShopImage = function ()
	{
		_addShopImage.call(this);
		if (this._cardPack == null) return;
		this._shopImage.bitmap = ImageManager.loadBitmap("img/CGC/shop/", this._cardPack.image);
		this.bitmap.clear();
	}
	this._previewSprite.shadeCard = function () { };
};

Scene_CardShop.prototype.actorWindowWidth = function ()
{
	var width = Myth.CGC.Shop.coordinates.actorWindowWidth;
	if (Myth.CGC.Shop.coordinates.hideActorWindow)
		width = 0;
	return width;
}

Scene_CardShop.prototype.createBuyWindow = function ()
{
	var wy = this._goldWindow.y;
	if (Scene_CardShop._commands.length > 1)
	{
		wy = this._commandWindow.y + this._commandWindow.height;
	}
	var wx = this._goldWindow.width;
	var ww = Graphics.boxWidth - (wx + this.actorWindowWidth());
	var wh = Graphics.boxHeight - (wy + this._helpWindow.height);
	if (Myth.CGC.Shop.coordinates.altUI)
	{
		wh = Graphics.boxHeight - wy;
	}
/*	if (Myth.Util.usingMZ && !Myth.CGC.Shop.coordinates.altUI)
		wh -= this._helpWindow.height;*/
	this._buyWindow = new Window_CardShopBuy(wx, wy, ww, wh, Scene_CardShop._goodsPlusPrice, this._actor);
	this._buyWindow._bought = Scene_CardShop._bought;
	this._buyWindow._limits = Scene_CardShop._limits;
	this._buyWindow.setHelpWindow(this._helpWindow);
	this._buyWindow._previewSprite = this._previewSprite;
	//this._buyWindow.setStatusWindow(this._statusWindow);
	this._buyWindow.hide();
	this._buyWindow.setHandler('ok', this.onBuyOk.bind(this));
	this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
	this.addWindow(this._buyWindow);
};

Scene_CardShop.prototype.updateActor = function ()
{
	this._actor = $gameParty.leader();
};

Scene_CardShop.prototype.setActor = function (actor)
{
	this._actor = actor;
	if (actor == null)
		this.updateActor();
}

Scene_CardShop.prototype.onBuyOk = function ()
{
	this._item = this._buyWindow.item();
	var openActorWindow = false;
	if ($gameParty.members().length > 1 && !Myth.Util.sharedLibrary())
		openActorWindow = true;
	if (!this._item.isGameCard() && $gameParty.members().length > 1)
	{
		openActorWindow = Myth.CGC.Shop.giveWholePackToActor;
	}


	if (openActorWindow)
	{
		if (Myth.CGC.Shop.coordinates.hideActorWindow)
			this._buyWindow.hide();
		this._actorWindow.select(0);
		
		this._actorWindow.setCard(this._item);
		this._actorWindow.show();
		this._actorWindow.activate();
		var text = "Select the actor to receive " + this._item.getSkillName() + ".";
		if (this._helpWindow.textWidth(text) > this._helpWindow.contents.width)
			text = "Select the actor to\nreceive " + this._item.getSkillName() + "."
		this._helpWindow.setText(text);
	}
	else
	{
		this._confirmWindow.open("Buy " + this._item.getSkillName() + "?");
		this._confirmWindow.activate();
		
	}
};

Scene_CardShop.prototype.onSellOk = function ()
{
	this._item = this._sellWindow.item();
	var sellRemove = this._sellWindow._mode == "sell" ? "Sell" : "Remove";
	this._confirmWindow.open(sellRemove + " " + this._item.getSkillName() + "?");
	this._confirmWindow.activate();
};


function Window_CardShopConfirm()
{
	this.initialize.apply(this, arguments);
};

Window_CardShopConfirm.prototype = Object.create(Window_HorzCommand.prototype);
Window_CardShopConfirm.prototype.constructor = Window_CardShopConfirm;

Window_CardShopConfirm.prototype.initialize = function ()
{
	var width = this.windowWidth();
	var height = this.windowHeight();
	var x = (Graphics.boxWidth - width) / 2;
	var y = (Graphics.boxHeight - height) / 2;
	if (Myth.Util.usingMZ)
	{
		var rect = new Rectangle(x, y, width, height);
		Window_HorzCommand.prototype.initialize.call(this, rect);
	}
	else
		Window_HorzCommand.prototype.initialize.call(this, x, y);
	this.deactivate();
	this.openness = 0;
};

Window_CardShopConfirm.prototype.makeCommandList = function ()
{
	this.addCommand("Yes", 'yes');
	this.addCommand("No", 'cancel');
};

Window_CardShopConfirm.prototype.maxCols = function ()
{
	return 2;
};

Window_CardShopConfirm.prototype.windowWidth = function ()
{
	return Myth.CGC.Shop.coordinates.confirmWidth;
};

Window_CardShopConfirm.prototype.windowHeight = function ()
{
	return this.fittingHeight(2);
};

Window_CardShopConfirm.prototype.itemRect = function (index)
{
	var rect = Window_HorzCommand.prototype.itemRect.call(this, index);
	rect.y += rect.height;
	return rect;
}

Window_CardShopConfirm.prototype.drawAllItems = function ()
{
	this.drawText(this._helpText, 0, 0, this.contents.width, 'left');
	Window_HorzCommand.prototype.drawAllItems.call(this);
};

Window_CardShopConfirm.prototype.open = function (text)
{
	this._helpText = text;
	this.refresh();
	Window_HorzCommand.prototype.open.call(this);
}

Window_CardShopConfirm.prototype.playOkSound = function ()
{
	if (this.index() == 1)
		SoundManager.playCancel();
};

Scene_CardShop.prototype.onBuyCancel = function ()
{
	if (Scene_CardShop._commands.length == 1)
	{
		this.popScene();
	}
	else
	{
		this._item = null;
		this._commandWindow.activate();
		if (this._dummyWindow)
			this._dummyWindow.show();
		this._buyWindow.hide();
		this._sellWindow.hide();
		this._helpWindow.clear();
		this._previewSprite.setCard(null);
	}
};



Scene_CardShop.prototype.onActorOk = function ()
{
	SoundManager.playOk();
	var mode = this._actorWindow.mode();
	this._dummyWindow.hide();
	var packItem = this._cardPackWindow.card();
	if (packItem)
	{
		//for some reason if we don't clear the input it calls 
		//the OK handler for the card pack window. This is RPG Maker jank.
		//or maybe Isiah jank. I choose to believe the former.
		Input.clear();
		this.setActor(this._actorWindow.item());
		this.addCardToLibrary(packItem);
		this._cardPackWindow.removeSelectedCard();

		this._actorWindow.deselect();
		this._actorWindow.deactivate();

		if (this._cardPackWindow._data.length == 0)
		{
			this._cardPackWindow.hide();
			this._cardPackWindow.deactivate();
			this.endActorInput();
		}
		else
		{
			this._cardPackWindow.activate();
		}
		
		
	}
	else if (mode == 'buy')
	{
		this._item = this._buyWindow.item();
		this._confirmWindow.open("Buy " + this._item.getSkillName() + "?");
		this._confirmWindow.activate();
		this.setActor(this._actorWindow.item());
		this._actorWindow.deactivate();

	}
	else if (mode == 'sell' || mode == 'remove')
	{
		this.setActor(this._actorWindow.item());
		this._sellWindow.setMode(mode);
		this._sellWindow.setMoney(this.money());
		this._sellWindow.setGoodsByActor(this.actor());
		this._sellWindow.refreshCards();
		this._sellWindow.show();
		this._sellWindow.activate();
		if (Myth.CGC.Shop.coordinates.hideActorWindow)
			this._actorWindow.hide();
		else
			this._actorWindow.deselect();
		this._actorWindow.deactivate();
		//this._sellWindow.setGoods(this.actor)
	}
}

Scene_CardShop.prototype.onActorCancel = function ()
{
	var mode = this._actorWindow.mode();
	if (this._cardPackWindow.visible)
	{
		this._actorWindow.deselect();
		this._cardPackWindow.activate();
	}
	else if (mode == 'buy')
		this.endActorInput();
	else
	{
		if (Scene_CardShop._commands.length == 1)
			return this.popScene();
		if (Myth.CGC.Shop.coordinates.hideActorWindow)
			this._actorWindow.hide();
		else
			this._actorWindow.deselect();
		this._actorWindow.deactivate();
		this._dummyWindow.show();
		this._commandWindow.activate();
		this._helpWindow.setText("");
	}
}

Scene_CardShop.prototype.doBuy = function (number)
{
	var item = this._item;
	if (Imported.YEP_X_MoreCurrencies)
	{
		var card = this._item;
		if (card.isGameCard())
			this._item = $dataSkills[card.id()];
		this.doBuyGold(number);
		//this.doBuyItem(number);
		this._item = card;
	}
	else
		$gameParty.loseGold(number * this.buyingPrice());
	
	if (item.isGameCard())
	{
		this.addCardToLibrary(item);
	}
	else
	{

	}
	
	this._buyWindow._bought++;
	this._buyWindow.refreshCards();
	this.refreshLimitWindow();
};

Scene_CardShop.prototype.addCardToLibrary = function (card)
{
	if (Myth.Util.sharedLibrary())
	{
		$gameParty.addCardToLibrary(card);
	}
	else
	{
		var actor = this.actor();
		actor.gainSkillCard(card);
	}
}

Game_Actor.prototype.gainSkillCard = function (card)
{
	this._skillCards.add(card);
	if (Myth.CGC.addLearnedSkillToDeck)
		this._cardDeck.add(card);
	if ($gameParty._actors.includes(this.actorId()))
		$gameParty.addCardToLibrary(card);
};


Scene_CardShop.prototype.doSell = function (number)
{
	var item = this._item;
	var amount = number * this.sellingPrice();
	if (Imported.YEP_X_MoreCurrencies)
	{
		var card = this._item;
		if (card.isGameCard())
			this._item = $dataSkills[card.id()];
		this.doSellGold(number);
		//this.doSellItem(number);
		this._item = card;
	}
	else
		$gameParty.gainGold(amount);
	
	if (item.isGameCard())
	{
		this.removeCardFromLibrary(item);
	}
	else
	{
		console.log(item);
	}
	this._sellWindow._sold++;
	this._sellWindow.refreshCards();
	this.refreshLimitWindow();
};

Scene_CardShop.prototype.removeCardFromLibrary = function (card)
{
	if (Myth.Util.sharedLibrary())
	{
		$gameParty.removeCardFromLibrary(card);
	}
	else
	{
		var actor = this.actor();
		actor.removeSkillCard(card);
	}
}

Game_Actor.prototype.removeSkillCard = function (card)
{
	var index = this._skillCards.indexOfObject(card);
	if (index != -1)
		this._skillCards.splice(index, 1);
	if (Myth.CGC.addLearnedSkillToDeck)
	{
		index = this._cardDeck.indexOfObject(card);
		if (index != -1)
			this._cardDeck.splice(index, 1);
	}
	if ($gameParty._actors.includes(this.actorId))
		$gameParty.removeCardFromLibrary(card);
}

Scene_CardShop.prototype.doRemove = function ()
{
	var amount = this.removingPrice();
	$gameParty.loseGold(amount);
	this._sellWindow.setMoney(this.money());
	this._sellWindow._removed++;
	this._sellWindow.refreshCards();
	this.removeCardFromLibrary(this._item);
	this.refreshLimitWindow();
}

Scene_CardShop.prototype.createNumberWindow = function ()
{

};

Scene_CardShop.prototype.createStatusWindow = function ()
{
};

Scene_CardShop.prototype.activateBuyWindow = function ()
{
	this._buyWindow.setMoney(this.money());
	this._buyWindow.show();
	this._buyWindow.activate();
};

Scene_CardShop.prototype.buyingPrice = function ()
{
	return this._buyWindow.priceAtIndex(this._buyWindow.index());
};

Scene_CardShop.prototype.sellingPrice = function ()
{
	return this._sellWindow.priceAtIndex(this._sellWindow.index());
};

Scene_CardShop.prototype.removingPrice = function ()
{
	return this._sellWindow.priceAtIndex(this._sellWindow.index());
}


Scene_CardShop.prototype.endActorInput = function ()
{
	if (Myth.CGC.Shop.coordinates.hideActorWindow)
		this._actorWindow.hide();
	this._actorWindow.deselect();
	this._actorWindow.deactivate();
	this.activateBuyWindow();
};

Scene_CardShop.prototype.commandWindowRect = function ()
{
	const wx = 0;
	const wy = this.mainAreaTop();
	const ww = this._cancelButton.x - 4;
	const wh = this.calcWindowHeight(1, true);
	return new Rectangle(wx, wy, ww, wh);
};

Scene_CardShop.prototype.getLibraryBackground = function ()
{
	return Myth.CGC.cardShopBackgroundImage;
}

Scene_CardShop.prototype.createBackground = function ()
{
	Scene_Shop.prototype.createBackground.call(this);

	var bitmapName = this.getLibraryBackground();
	if (!bitmapName || bitmapName == "") return;

	this._libraryBackgroundSprite = new Sprite(ImageManager.loadPicture(bitmapName));
	this.addChild(this._libraryBackgroundSprite);
};


function Window_CardShopCommand()
{
	this.initialize.apply(this, arguments);
};

Window_CardShopCommand.prototype = Object.create(Window_ShopCommand.prototype);
Window_CardShopCommand.prototype.constructor = Window_CardShopCommand;

Window_CardShopCommand.prototype.initialize = function (width)
{
	this._windowWidth = width;
	if (Myth.Util.usingMZ)
	{
		var rect = SceneManager._scene.commandWindowRect();
		Window_HorzCommand.prototype.initialize.call(this, rect);
	}
	else
	{
		Window_HorzCommand.prototype.initialize.call(this, 0, 0);
	}
}

Window_CardShopCommand.prototype.windowWidth = function ()
{
	return this._windowWidth;
};

Window_CardShopCommand.prototype.makeCommandList = function ()
{
	var commands = Scene_CardShop._commands;
	for (var i = 0; i < commands.length; i++)
	{
		var capitalizedCommand = commands[i].charAt(0).toUpperCase() + commands[i].slice(1);
		this.addCommand(capitalizedCommand, commands[i]);
	}
};

Window_CardShopCommand.prototype.numVisibleRows = function ()
{
	return 1;
};

Window_CardShopCommand.prototype.maxCols = function ()
{
	var len = Scene_CardShop._commands.length;
	return Math.min(len, 4);
};


function Window_CardShopBuy()
{
	this.initialize.apply(this, arguments);
};

Window_CardShopBuy.prototype = Object.create(Window_CardList.prototype);
Window_CardShopBuy.prototype.constructor = Window_CardShopBuy;

Window_CardShopBuy.prototype.initialize = function (x, y, width, height, shopGoods, actor)
{
	//var width = this.windowWidth();
	this._storedPrices = [];
	this._mode = 'buy';
	Window_CardList.prototype.initialize.call(this, x, y, width, height);
	this._itemsBeforeCards = 0; // this variable keeps touch input index from returning NaN
	this._shopGoods = shopGoods;
	this._money = 0;
	this.setActor(actor);


	//this.refresh();
	this.select(0);
	this.opacity = 255;
	
};

Window_CardShopBuy.prototype.drawCardOrigin = function ()
{
	return false;
}

Window_CardShopBuy.prototype.scrollBackImage = function ()
{
	return Myth.CGC.Shop.images.scrollBack;
}

Window_CardShopBuy.prototype.scrollBarImage = function ()
{
	return Myth.CGC.Shop.images.scrollBar;
}

Window_CardShopBuy.prototype.displaySettings = function ()
{
	return Myth.CGC.Shop.coordinates.cardDisplay;
}

Window_CardShopBuy.prototype.numVisibleCols = function ()
{
	return this.maxCols() + 1;
}

Window_CardShopBuy.prototype.numVisibleRows = function ()
{
	return Myth.CGC.Shop.coordinates.numVisibleRows;
}

Window_CardShopBuy.prototype.removeCurrentItem = function ()
{
	
	var index = this.index();
	var card = this._cardSprites[index];
	this._data.splice(index, 1);
	this._price.splice(index, 1);
	this._storedPrices.splice(index, 1);
	
	this.removeCardSprite(card);
	this._cardSprites.splice(index, 1);

	this.refreshCards();
}

Window_CardShopBuy.prototype.setMoney = function (money)
{
	this._money = money;
	//this.refresh();
	this.refreshCards();
};

Window_CardShopBuy.prototype.setGoods = function (goods)
{
	this._shopGoods = goods;
	this.refresh();
}

Window_CardShopBuy.prototype.setGoodsByActor = function (actor)
{
	this._shopGoods = [];
	var cards = actor._skillCards;
	if (Myth.CGC.Deck)
	{
		var cards = actor.getLibrary();
	}
	for (var i = 0; i < cards.length; i++)
	{
		var card = cards.card(i);
		if (card.origin() == "equip") continue;
		var price = 0;
		if (this._mode == 'remove')
			price = this.getRemovePrice(card.id());
		else
			price = this.getSellPrice(card.id());
		price = Math.floor(price);
		var good = [card, price];
		this._shopGoods.push(good);
	}
	if (Myth.CGC.Deck != undefined)
		this.removeEquippedCards(actor);
	this.refresh();
}

Window_CardShopBuy.prototype.removeEquippedCards = function (actor)
{
	var cards = actor.deck();
	if (Myth.Util.sharedLibrary())
	{
		var allEquipped = new Game_Cards("temp");
		var members = $gameParty.members();
		for (var i = 0; i < members.length; i++)
		{
			var deck = members[i].deck();
			for (var j = 0; j < deck.length; j++)
			{
				var card = deck.card(j);
				if (!allEquipped._data.includes(card))
					allEquipped.add(card);
			}
		}

		cards = allEquipped;
	}
	
	this.makeItemList();
	for (var i = 0; i < cards.length; i++)
	{
		var card = cards.card(i);
		if (card.origin() == "equip") continue;
		var index = this._data.indexOf(card);
		if (index > -1)
		{
			this._shopGoods.splice(index, 1);
			this._data.splice(index, 1);
			this._price.splice(index, 1);
		}

	}
}

Window_CardShopBuy.prototype.getRemovePrice = function (skillId)
{
	return Myth.CGC.Shop.removePriceOfCardSkill(skillId);
};

Window_CardShopBuy.prototype.getSellPrice = function (skillId)
{
	return Myth.CGC.Shop.sellPriceOfCardSkill(skillId);
}

Window_CardShopBuy.prototype.refreshCards = function ()
{
	if (this._mode == 'remove')
	{
		this._storedPrices = [];
		for (var i = 0; i < this._cardSprites.length; i++)
		{
			var price = this.priceAtIndex(i);
			this._cardSprites[i]._amount = price;
		}
	}
	for (var i = this._cardSprites.length - 1; i >= 0; i--)
	{
		var card = this._cardSprites[i];
		var isEnabled = (this.isEnabled(i));

		card._amountText.drawPrice(isEnabled, this._mode);
		if (isEnabled)
			card.unshadeCard();
		else
			card.shadeCard();
		//card.drawAmount(color, '');
	}
}

Window_CardShopBuy.prototype.price = function (item)
{
	var index = this._data.indexOf(item);
	if (index == -1)
		index = this._data.indexOf(this.__tempItem);
	return this.priceAtIndex(index);
};

Window_CardShopBuy.prototype.getCustomPrice = function (index)
{
	var price = this._price[index];

	if (typeof price == "string")
	{
		price = price.replace(/\\/g, '\x1b');
		price = price.replace(/\x1b\x1b/g, '\\');
		price = price.replace(/\x1bV\[(\d+)\]/gi, function ()
		{
			return $gameVariables.value(parseInt(arguments[1]));
		}.bind(this));
		price = price.replace(/\x1bV\[(\d+)\]/gi, function ()
		{
			return $gameVariables.value(parseInt(arguments[1]));
		}.bind(this));
	}

	var gameCard = this._data[index];
	if (gameCard && gameCard.isGameCard())
	{
		var skillId = gameCard.id();
		var dataSkill = $dataSkills[skillId];
		var cardPrice = Myth.CGC.Shop.priceOfCardSkill(skillId);
		var buyPrice = Myth.CGC.Shop.priceOfCardSkill(skillId, 'buy');
		var cardPrice = buyPrice;
		var sellPrice = Myth.CGC.Shop.priceOfCardSkill(skillId, 'sell');
		var removePrice = Myth.CGC.Shop.priceOfCardSkill(skillId, 'remove');
		var bought = this._bought;
		var sold = this._sold;
		try
		{
			price = eval(price);
		}
		catch (e)
		{
			console.error(e);
			console.error("There was an issue with the custom price formula for " + dataSkill.name + ".");
			return 0;
		}
	}

	return price;
}

Window_CardShopBuy.prototype.priceAtIndex = function (index)
{
	if (this._storedPrices.length > index && this._storedPrices[index] != undefined)
		return this._storedPrices[index];

	var price = price = this.getCustomPrice(index);

	var item = this._data[index];
	var skillId = item.isGameCard() ? item.id() : 0;
	price = this.getPriceByFormula(skillId, price);
	price = Number(price);

	this._storedPrices[index] = price || 0;
	return price || 0;
};

Window_CardShopBuy.prototype.getPriceByFormula = function (skillId, adjustedCardPrice)
{
	var newPrice = adjustedCardPrice;
	var bought = this._bought;
	var sold = this._sold;
	var removed = this._removed;
	var adjustedCardPrice = adjustedCardPrice;
	var cardPrice = Myth.CGC.Shop.priceOfCardSkill(skillId, this._mode);
	var buyPrice = Myth.CGC.Shop.priceOfCardSkill(skillId, 'buy');
	var cardPrice = buyPrice;
	var sellPrice = Myth.CGC.Shop.priceOfCardSkill(skillId, 'sell');
	var removePrice = Myth.CGC.Shop.priceOfCardSkill(skillId, 'remove');
	var formula = "adjustedCardPrice";
	switch (this._mode)
	{
		case 'buy':
		case undefined:
			formula = Scene_CardShop._buyFormula;
			break;
		case 'sell':
			formula = Scene_CardShop._sellFormula;
			break;
		case 'remove':
			formula = Scene_CardShop._removeFormula;
			break;
	}
	try
	{
		newPrice = eval(formula);
	}
	catch (e)
	{
		console.error(e);
		console.error("There was an issue with the custom price formula for the card shop.");
		return adjustedCardPrice;
	}
	return newPrice;
}

Myth.CGC.Shop.priceOfCardSkill = function (skillId, category)
{
	if (skillId == 0) return 0;

	category = category || 'buy';
	var price;

	if (category == 'buy')
	{
		price = $dataSkills[skillId]._cardBuyPrice;
		if (price == undefined)
			price = Myth.CGC.Shop.defaultPrice;
	}
	else if (category == 'sell')
		price = $dataSkills[skillId]._cardSellPrice;
	else if (category == 'remove')
		price = $dataSkills[skillId]._cardRemovePrice;
	

	
	if (typeof price == "string" && price.match(/\\v\[(\d+)]/i))
		price = $gameVariables.value(RegExp.$1);
	else
		price = Number(price);

	return price;
}

Myth.CGC.Shop.buyPriceOfCardSkill = function (skillId)
{
	return this.priceOfCardSkill(skillId, 'buy');
}

Myth.CGC.Shop.sellPriceOfCardSkill = function (skillId)
{
	return this.priceOfCardSkill(skillId, 'sell');
}

Myth.CGC.Shop.removePriceOfCardSkill = function (skillId)
{
	return this.priceOfCardSkill(skillId, 'remove');
}

Window_CardShopBuy.prototype.isCurrentItemEnabled = function ()
{
	return this.isEnabled(this.index());
	//return this.isEnabled(this.item());
};

Window_CardShopBuy.prototype.drawItem = function () { };

Window_CardShopBuy.prototype.isEnabled = function (index)
{
	var item = null;
	if (typeof index != 'number')
	{
		item = index;
		index = this._data.indexOf(item);
		//console.trace();
	}
	else
		item = this._data[index];
	if (this._mode == 'sell')
	{
		if (this._limits.sell == -1) return true;

		return this._sold < this._limits.sell;
	}
	else if (this._mode == 'remove' && this._limits.remove != -1)
	{
		if (this._removed >= this._limits.remove)
			return false;
	}
	else if (this._limits.buy != -1)
	{
		if (this._bought >= this._limits.buy)
			return false;
	}

	var isenabled = (item && this.priceAtIndex(index) <= this._money &&
		!$gameParty.hasMaxItems(item));
	

	var isExtraEnabled = true;
	if (Imported.YEP_X_MoreCurrencies)
	{
		var dataItem;
		if (item.isGameCard())
			dataItem = $dataSkills[item.id()];
		else
			dataItem = item;

		this.__tempItem = item; //this is a terrible fix
		isExtraEnabled = Window_ShopBuy.prototype.isEnabled.call(this, dataItem);
		this.__tempItem = null;
	}
	return isenabled && isExtraEnabled;
};

Window_CardShopBuy.prototype.setMode = function (mode)
{
	this._mode = mode;
}

Window_CardShopBuy.prototype.makeItemList = function ()
{
    this._data = [];
	this._price = [];
    this._shopGoods.forEach(function (goods)
	{
		var item = goods[0];
		if (item instanceof Game_Card)
		{
			var skill = $dataSkills[item.id()];
			if (skill.hideFromCardLibrary) return;
		}
		else if (typeof item == 'number')
		{
			item = $dataSkills[goods[0]];
			if (item.hideFromCardLibrary) return;

			item = new Game_Card(goods[0], "learned");
		}
		
        if (item)
        {
			this._data.push(item);
            this._price.push(goods[1]);
        }
	}, this);
	
};

Window_CardShopBuy.prototype.deleteCardSprites = function ()
{
	for (var i = this._cardSprites.length - 1; i >= 0; i--)
	{
		var card = this._cardSprites[i];
		this.removeCardSprite(card);
	}
	this._cardSprites = [];
	this._data = [];
};

Window_CardShopBuy.prototype.addCardSprite = function (spriteCard)
{
	//Window_CardList.prototype.addCardSprite.call(this, spriteCard);
	spriteCard._parentWindow = this;
	this.addChild(spriteCard);
	if (spriteCard._amountText)
		this.addChild(spriteCard._amountText);
};

Window_CardShopBuy.prototype.isTouchOkEnabled = function ()
{
	if (Myth.Util.usingMZ)
		return false;

	return true;
};

Window_CardShopBuy.prototype.onTouchSelect = function (trigger)
{
	this._doubleTouch = false;
};

Window_CardShopBuy.prototype.removeCardSprite = function (spriteCard)
{
	this.removeChild(spriteCard);
	if (spriteCard._amountText)
		this.removeChild(spriteCard._amountText);
};

Window_CardShopBuy.prototype.isCardLibraryScene = function ()
{
	return false;
}

Window_CardShopBuy.prototype.usingSimpleView = function ()
{
	return true;
}

Window_CardShopBuy.prototype.setSellWindow = function (isSellWindow)
{
	this._isSellWindow = isSellWindow;
}

Window_CardShopBuy.prototype.createCard = function ()
{
	var spriteCard = Window_CardList.prototype.createCard.call(this);
	if (!spriteCard) return null;
	spriteCard._amountText = new Window_CardCost(spriteCard, Myth.CGC.Shop.coordinates.costWindowWidth);
	spriteCard._amount = this.priceAtIndex(this._cardToCreate - 1);
	var __this = this;
	var __mode = this._mode;
	spriteCard.drawAmount = function (isEnabled)
	{
		//if (color == undefined) color = this._amountColor;
		//if (color == undefined) __this.refreshCards();
		
		this._amountText.drawPrice(isEnabled, __mode);
	}

	if (!this._isSellWindow)
		spriteCard.addShopImage();
	var isEnabled = this.isEnabled(spriteCard._card);
	if (!isEnabled)
		spriteCard.shadeCard();
	spriteCard.drawAmount(isEnabled);
	return spriteCard;
};

Window_CardShopBuy.prototype.createCardSpecial = function (dataObj)
{
	if (!(dataObj instanceof Game_CardPack))
		return null;

	var spriteCard = new Sprite_CardPack(dataObj);
	//this._cardToCreate++;
	return spriteCard;
}

//Legacy Function
Window_CardShopBuy.prototype.updateCardVisibility = function ()
{
	if (!Myth.CGC.Shop.coordinates.hideOffscreen) return;

	var windowHeight = this.contents.height;
	if (!this._helpWindow) return;
	var scaleY = this.cardScale().y;
	var cardHeight = this._cardSprites[0] ? this._cardSprites[0].bitmap.height * scaleY : 0;

	for (var i = 0; i < this._cardSprites.length; i++)
	{
		var card = this._cardSprites[i];
		var y = card.y;
		var visible = true;
		if (y > windowHeight + (cardHeight / 4))
		{
			visible = false;
		}
		else if (y < -(cardHeight / 3))
			visible = false;

		card.visible = visible;
		if (card._shadeSprite)
			card._shadeSprite.visible = visible;
		if (card._amountText)
			card._amountText.visible = visible;
	}
};

Window_CardShopBuy.prototype.windowWidth = function ()
{
	return Myth.CGC.Shop.coordinates.cardListWidth;
	return Graphics.width;
}

Window_CardShopBuy.prototype.getCardX = function (index)
{
	var x = Window_CardList.prototype.getCardX.call(this, index);
	return x - this.x;
}

Window_CardShopBuy.prototype.getCardY = function (index)
{
	var y = Window_CardList.prototype.getCardY.call(this, index);
	return y - this.y;
}

if (Imported.YEP_X_MoreCurrencies)
{
	Window_CardShopBuy.prototype.updateHelp = function ()
	{
		Window_CardList.prototype.updateHelp.call(this);
		var item = this.item();
		var goldWindow = SceneManager._scene._goldWindow;
		if (!item) return;
		var dataItem = null;
		if (item.isGameCard())
			dataItem = $dataSkills[item.id()];
		else
			dataItem = item;

		goldWindow.setItemPrice(this.priceAtIndex(this.index()));
		if (SceneManager._scene.isSelling())
			goldWindow.setItemSell(dataItem);
		else
			goldWindow.setItemBuy(dataItem);
	}

	Window_Gold.prototype.setItemPrice = function (price)
	{
		this._price = price;
	}

	Myth.CGC.Shop.Window_Gold_isDrawGoldCurrency = Window_Gold.prototype.isDrawGoldCurrency;
	Window_Gold.prototype.isDrawGoldCurrency = function ()
	{
		if (this._price > 0) return true;
		return Myth.CGC.Shop.Window_Gold_isDrawGoldCurrency.call(this);
	}

	Myth.CGC.Shop.Window_Gold_drawItemCurrencies = Window_Gold.prototype.drawItemCurrencies;
	Window_Gold.prototype.drawItemCurrencies = function (wx, ww)
	{
		this._wy = 0;
		Myth.CGC.Shop.Window_Gold_drawItemCurrencies.call(this, wx, ww);
	}

	Myth.CGC.Shop.Window_Gold_drawAltCurrency = Window_Gold.prototype.drawAltCurrency;
	Window_Gold.prototype.drawAltCurrency = function (value, unit, wx, wy, ww)
	{
		if (SceneManager._scene instanceof Scene_CardShop)
		{
			var iconIndex = 0;
			var textWidth = 0;
			var unitText = '';
			if (DataManager.isItem(unit) || DataManager.isWeapon(unit) ||
				DataManager.isArmor(unit))
			{
				var iconIndex = unit.iconIndex;
			}
			else if (unit.match(/VARIABLE[ ](\d+)/i))
			{
				var name = $dataSystem.variables[parseInt(RegExp.$1)];
				if (name.match(/\\I\[(\d+)\]/i))
				{
					var iconIndex = parseInt(RegExp.$1);
				}
				name = name.replace(/\\I\[(\d+)\]/gi, '');
				unitText = name.replace(/<<(.*?)>>/gi, '');
			}
			textWidth += this.textWidth(unitText);
			if (iconIndex > 0)
				textWidth += Window_Base._iconWidth;
			textWidth += this.textWidth(Yanfly.Util.toGroup(value));
			if (textWidth > ww)
			{
				ww = this.contents.width - this.textPadding() * 2;
				this._wy += this.lineHeight();
			}

			wy = this._wy;
		}
		

		return Myth.CGC.Shop.Window_Gold_drawAltCurrency.call(this, value, unit, wx, wy, ww);
	}

	Myth.CGC.Shop.Window_Gold_windowHeight = Window_Gold.prototype.windowHeight;
	Window_Gold.prototype.windowHeight = function ()
	{
		if (SceneManager._scene instanceof Scene_CardShop)
			return this.fittingHeight(2);

		return Myth.CGC.Shop.Window_Gold_windowHeight.call(this);
	}
}



function Window_CardShopActor()
{
	this.initialize.apply(this, arguments);
};

Window_CardShopActor.prototype = Object.create(Window_MenuActor.prototype);
Window_CardShopActor.prototype.constructor = Window_CardShopActor;

Window_CardShopActor.prototype.initialize = function ()
{
	if (Myth.Util.usingMZ)
	{
		var rect = new Rectangle(0, 0, 0, 0);
		Window_MenuActor.prototype.initialize.call(this, rect);
	}
	else
		Window_MenuActor.prototype.initialize.call(this);
	this._mode = 'buy';
	this._card = null;
	if (!Myth.CGC.Shop.coordinates.hideActorWindow)
		this.show();
};

Window_CardShopActor.prototype.setCard = function (card)
{
	this._card = card;
	this.refresh();
}

Window_CardShopActor.prototype.item = function ()
{
	var index = this.index();
	if (index == -1) return null;
	return $gameParty.members()[index];
};

Window_CardShopActor.prototype.setMode = function (mode)
{
	this._mode = mode;
}

Window_CardShopActor.prototype.mode = function ()
{
	return this._mode;
};

Window_CardShopActor.prototype.faceHeight = function ()
{
	if (Myth.Util.usingMZ)
		return Math.min(ImageManager.faceHeight, this.itemRectWithPadding(0).height - 2);
	else
		return Math.min(Window_Base._faceHeight, this.itemRect(0).height);
}

Window_CardShopActor.prototype.itemHeight = function ()
{
	var clientHeight = this.height - this.padding * 2;
	return Math.floor(clientHeight / $gameParty.maxBattleMembers());
};

Window_CardShopActor.prototype.drawItemImage = function (index)
{
	var actor = $gameParty.members()[index];
	var rect = this.itemRect(index);
	this.changePaintOpacity(actor.isBattleMember());
	var faceWidth = Math.min(Myth.Util.usingMZ ? ImageManager.faceWidth : Window_Base._faceWidth, rect.width);
	var faceHeight = this.faceHeight();
	this.drawActorFace(actor, rect.x + rect.width - faceWidth, rect.y + 1, faceWidth, faceHeight);
	this.changePaintOpacity(true);
};

Window_CardShopActor.prototype.numVisibleRows = function ()
{
	var maxRows = Window_MenuStatus.prototype.numVisibleRows.call(this);
	maxRows = Math.min(maxRows, $gameParty.members().length);
	return maxRows;
};

Window_CardShopActor.prototype.drawItemStatus = function (index)
{
	var actor = $gameParty.members()[index];
	var rect = this.itemRect(index);
	var x = rect.x;
	var y = rect.y;
	var width = rect.width;
	var height = rect.height;
	this.drawActorSimpleStatus(actor, x, y, width, height);
}

Window_CardShopActor.prototype.drawActorSimpleStatus = function (actor, x, y, width, height)
{
	var lineHeight = this.lineHeight();
	if (height >= lineHeight * 3 + this.faceHeight())
	{
		y += this.faceHeight();
	}
	else
	{
		y += height;
		y -= lineHeight * 3;
	}
	if (Myth.Util.usingMZ)
	{
		var numRows = this.numVisibleRows();
		if (numRows > 3)
		{
			lineHeight -= 6;
			y += 6;
		}
		
	}
	if (Myth.CGC.Shop.coordinates.shortActorWindow)
	{
		var padding = Myth.Util.usingMZ ? this.itemPadding() : this.textPadding();
		this.drawActorName(actor, x + padding, y);
		this.drawActorCardCopies(actor, x + padding, y + lineHeight * 1, width - padding * 2);
		this.drawActorCardTotal(actor, x + padding, y + lineHeight * 2, width - padding * 2);
	}
	else
	{
		var padding = Myth.Util.usingMZ ? this.itemPadding() : this.textPadding();


		this.drawActorName(actor, x + padding, y);
		this.drawActorLevel(actor, x + padding, y + lineHeight * 1);
		this.drawActorIcons(actor, x + padding, y + lineHeight * 2);

		var x2 = x + 160;
		
		var width2 = Math.min(260, width - 160 - padding * 2);

		this.drawActorClass(actor, x2, y);
		this.drawActorCardCopies(actor, x2, y + lineHeight * 1, width2);
		this.drawActorCardTotal(actor, x2, y + lineHeight * 2, width2);
	}

};

Window_CardShopActor.prototype.drawActorCardCopies = function (actor, x, y, width)
{
	var card = this._card;
	width = width || this.contents.width - x - 12;
	var color = Myth.Util.usingMZ ? ColorManager.hpColor(actor) : this.hpColor(actor);
	this.changeTextColor(color);
	this.drawText("Copies:", x, y, width);

	var amount = 0;
	if (card != null && card.isGameCard())
		amount = actor._skillCards.amountOf(card.id());
	this.drawText(amount, x, y, width, 'right');
};

Window_CardShopActor.prototype.drawActorCardTotal = function (actor, x, y, width)
{
	width = width || this.contents.width - x - 12;
	var color = Myth.Util.usingMZ ? ColorManager.hpColor(actor) : this.hpColor(actor);
	this.changeTextColor(color);
	this.drawText("Total cards:", x, y, width);
	this.drawText(actor._skillCards.length, x, y, width, 'right');
};


Myth.CGC.Shop.Window_CardShopBuy_setHelpWindowItem = Window_CardShopBuy.prototype.setHelpWindowItem;
Window_CardShopBuy.prototype.setHelpWindowItem = function (item)
{
	if (!this._helpWindow) return;

	if (item)
	{
		//var skill = $dataSkills[item.id()];
		this._helpWindow.setItem(item);
		var index = this.index(); var cost = this.priceAtIndex(index);
		var isEnabled = this.isEnabled(index);
		this._previewSprite.setCard(item, cost, isEnabled);

		SceneManager._scene._actorWindow.setCard(item);
	}
	else
	{
		this._previewSprite.setCard(null);
		//this._previewSprite.visible = false;
		this._helpWindow.setItem(null);

		if (this._mode != "buy" && Myth.CGC.Deck && this._shopGoods.length == 0)
		{
			this._helpWindow.setText("No cards available to " + this._mode + ".\nAll cards are in use.");
		}
	}
}


function Window_CardPackOpener()
{
	this.initialize.apply(this, arguments);
}

Window_CardPackOpener.prototype = Object.create(Window_CardSelection.prototype);
Window_CardPackOpener.prototype.constructor = Window_CardPackOpener;

Window_CardPackOpener.prototype.initialize = function ()
{
	Window_CardSelection.prototype.initialize.call(this, []);
	this._cardPack = null;
}

Window_CardPackOpener.prototype.windowWidth = function ()
{
	if (Myth.CGC.Shop.giveWholePackToActor)
		return Graphics.boxWidth;
	else
		return Graphics.boxWidth - Myth.CGC.Shop.coordinates.actorWindowWidth;
}

Window_CardPackOpener.prototype.setCardPack = function (cardPack)
{
	this._cardPack = cardPack;
	this.refresh();
	this.createCardSprites();
}

Window_CardPackOpener.prototype.card = function ()
{
	return this._cards[this.index()];
}

Window_CardPackOpener.prototype.removeSelectedCard = function ()
{
	var index = this.index();
	this.removeChild(this._cardSprites[index]);
	this._cardSprites.splice(index, 1);
	this._cards.splice(index, 1);
	this._data.splice(index, 1);
	

	if (this._data.length == 0)
	{
		return;
	}

	if (index >= this._data.length)
		this.select(index - 1);
}

Window_CardPackOpener.prototype.makeItemList = function ()
{
	this._data = [];
	this._cards = [];
	if (!this._cardPack) return;
	var cardPool = this._cardPack.cardPool;
	var values = [];
	var weights = [];
	cardPool.forEach(card =>
	{
		values.push(card.skill);
		weights.push(card.weight);
	});
	var amount = this._cardPack.amount;
	for (var i = 0; i < amount; i++)
	{
		if (weights.length == 0) break;

		var index = Myth.Util.weightedRandomIndex(weights);
		var skillId = values[index];
		this._data[i] = skillId;

		weights.splice(index, 1);
		values.splice(index, 1);
	}

	
	for (var i = 0; i < amount; i++)
	{
		var card = new Game_Card(this._data[i], "learned");
		this._cards[i] = card;
	}
}

Window_CardPackOpener.prototype.setHelpWindowItem = function (item)
{
	Window_CardSelection.prototype.setHelpWindowItem.call(this, item);
	SceneManager._scene._actorWindow.setCard(this.card());
}


Myth.CGC.Shop.Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function ()
{
	Myth.CGC.Shop.Game_Event_setupPageSettings.call(this);
	var list = this.page().list;
	this._cardShop = this.checkPageForCardShop(list);
	if (this._cardShop != null)
	{
		this._originalCardShop = new CardShop_Inventory();
		this._originalCardShop.copy(this._cardShop);
	}
	else
		this._originalCardShop = null;
}

Game_Event.prototype.checkPageForCardShop = function (list)
{
	var mode = '';
	var shopPreset = new CardShop_Inventory();
	for (var i = 0; i < list.length; i++)
	{
		var item = list[i];
		if (item.code != 108 && item.code != 408) continue;
		var line = item.parameters[0];
		if (mode == '')
		{
			if (line.match(/<card shop>(.*)/i))
			{
				mode = 'cardShop';
				//var changes = RegExp.$1.split(',');
				//preset = this.createShatterPreset(preset, changes);
			}
		}
		else if (mode == 'cardShop')
		{
			//random
			while (line.match(/\[(\d+)-(\d+)\]/i))
			{
				var min = Number(RegExp.$1);
				var max = Number(RegExp.$2);
				var result = Math.randomInt(max - min) + min;
				line = line.replace(/\[(\d+)-(\d+)\]/i, result);
			}
			//choose
			while (line.match(/\[((?:\d+,? ?)+)\]/i))
			{
				var allOptions = RegExp.$1.trim();
				allOptions = allOptions.replace(/,/g, '');
				var numbers = allOptions.split(' ');
				var index = Math.randomInt(numbers.length);
				var result = Number(numbers[index]);
				line = line.replace(/\[((?:\d+,? ?)+)\]/i, result);
			}

			if (line.match(/(.*)<\/card shop>/i))
			{
				//var changes = RegExp.$1.split(',');
				//preset = this.createShatterPreset(preset, changes);
				//return preset;
				mode = '';
				return shopPreset;
			}

			else if (line.match(/(buy|sell|remove) limit:? (\d+)/i))
			{
				var category = RegExp.$1.toLowerCase();;
				var limit = Number(RegExp.$2);
				shopPreset.addLimit(category, limit);
			}

			else if (line.match(/commands?:? (.*)/i))
			{
				var commands = RegExp.$1.split(",");
				for (var j = 0; j < commands.length; j++)
				{
					shopPreset.addCommand(commands[j].toLowerCase().trim());
				}
			}
			else if (line.match(/^buy price (.+)/i))
			{
				if (!shopPreset._commands.includes('buy'))
					shopPreset.addCommand('buy');
				shopPreset._buyFormula = RegExp.$1;
			}
			else if (line.match(/^sell price (.+)/i))
			{
				if (!shopPreset._commands.includes('sell'))
					shopPreset.addCommand('sell');
				shopPreset._sellFormula = RegExp.$1;
			}
			else if (line.match(/^remove price (.+)/i))
			{
				if (!shopPreset._commands.includes('remove'))
					shopPreset.addCommand('remove');
				shopPreset._removeFormula = RegExp.$1;
			}
			else if (line.match(/^cancel$/i))
			{
				shopPreset.addCommand('cancel');
			}
			else if (line.match(/(\d+)x pack preset (\d+)/i))
			{
				var amount = Number(RegExp.$1);
				var index = Number(RegExp.$2);
				for (var j = 0; j < amount; j++)
				{
					//test
					//they do need to be separate objects
					var preset = Object.assign(new Game_CardPack, Myth.CGC.Shop.cardPacks[index]);
					shopPreset.addCardPack(preset);
				}
				
			}
			else if (line.match(/pack preset (\d+)/i))
			{
				var index = Number(RegExp.$1);
				var preset = Object.assign(new Game_CardPack, Myth.CGC.Shop.cardPacks[index]);
				shopPreset.addCardPack(preset);
			}
			else if (line.match(/(\d+)x skill (\d+) price (.+)/i)) //Xx skill Y price Z
			{
				var amount = Number(RegExp.$1);
				var skillId = Number(RegExp.$2);
				var price = (RegExp.$3);

				for (var j = 0; j < amount; j++)
				{
					shopPreset.addSkillCustomPrice(skillId, price);
				}
			}
			else if (line.match(/(\d+)x skill (\d+)/i)) //Xx skill Y
			{
				var amount = Number(RegExp.$1);
				var skillId = Number(RegExp.$2);

				for (var j = 0; j < amount; j++)
				{
					shopPreset.addSkill(skillId);
				}
			}
			else if (line.match(/skill (\d+) price (.+)/i)) //skill Y price Z
			{
				var skillId = Number(RegExp.$1);
				var price = (RegExp.$2);

				shopPreset.addSkillCustomPrice(skillId, price);
			}
			else if (line.match(/(\d+)x (.+) price (.+)/i)) //Xx CardName price Z
			{
				var amount = Number(RegExp.$1);
				var skill = Myth.Util.findSkillbyName(RegExp.$2);
				var price = (RegExp.$3);
				if (skill && skill.name != "")
				{
					for (var j = 0; j < amount; j++)
					{
						shopPreset.addSkillCustomPrice(skill.id, price);
					}
				}
			}
			else if (line.match(/(\d+)x (.+)/i)) //Xx CardName
			{
				var amount = Number(RegExp.$1);
				var skill = Myth.Util.findSkillbyName(RegExp.$2);
				if (skill && skill.name != "")
				{
					for (var j = 0; j < amount; j++)
					{
						shopPreset.addSkill(skill.id);
					}
				}
			}
			else if (line.match(/(.+) price (.+)/i)) //CardName price Z
			{
				var skill = Myth.Util.findSkillbyName(RegExp.$1);
				var price = (RegExp.$2);
				if (skill && skill.name != "")
				{
					shopPreset.addSkillCustomPrice(skill.id, price);
				}
			}
		}
	}

	return null;
};

Myth.CGC.Shop.Game_Interpreter_setupReservedCommonEvent = Game_Interpreter.prototype.setupReservedCommonEvent;
Game_Interpreter.prototype.setupReservedCommonEvent = function ()
{
	var success = Myth.CGC.Shop.Game_Interpreter_setupReservedCommonEvent.call(this);
	if (success)
	{
		var cardShop = this.checkPageForCardShop(this._list);
		if (cardShop)
			Myth.CGC.Shop._cardShop = cardShop;
	}
	return success;
}

Myth.CGC.Shop.Game_Interpreter_command117 = Game_Interpreter.prototype.command117;
Game_Interpreter.prototype.command117 = function (params)
{
	var success = Myth.CGC.Shop.Game_Interpreter_command117.call(this, params);
	var p = this._params == undefined ? params : this._params;
	var commonEvent = $dataCommonEvents[p]
	var cardShop = this.checkPageForCardShop(commonEvent.list);
	if (cardShop)
		Myth.CGC.Shop._cardShop = cardShop;
	return success;
}

Game_Interpreter.prototype.checkPageForCardShop = function (list)
{
	return Game_Event.prototype.checkPageForCardShop.call(this, list);
}

function CardShop_Inventory()
{
	this.initialize.apply(this, arguments);
}

CardShop_Inventory.prototype.initialize = function ()
{
	this._goods = [];
	this._price = [];
	this._commands = [];
	this._bought = 0;
	this._sold = 0;
	this._removed = 0;
	this._buyFormula = Myth.CGC.Shop.buyPriceFormula;
	this._sellFormula = Myth.CGC.Shop.sellPriceFormula;
	this._removeFormula = Myth.CGC.Shop.removePriceFormula;
	this._limits = {
		buy: -1,
		sell: -1,
		remove: -1
	}
};

CardShop_Inventory.prototype.copy = function (newInventory)
{
	this._goods = [...newInventory._goods];
	this._price = [...newInventory._price];
	this._commands = [...newInventory._commands];
	this._removed = newInventory._removed;
	this._bought = newInventory._bought;
	this._sold = newInventory._sold;
	this._buyFormula = newInventory._buyFormula;
	this._sellFormula = newInventory._sellFormula;
	this._removeFormula = newInventory._removeFormula;
	this._limits = newInventory._limits;
}

CardShop_Inventory.prototype.addSkill = function (skillId)
{
	this._goods.push(skillId);
	var price = Myth.CGC.Shop.priceOfCardSkill(skillId);
	this._price.push(price);
}
CardShop_Inventory.prototype.addCommand = function (command)
{
	this._commands.push(command)
}
CardShop_Inventory.prototype.addLimit = function (category, limit)
{
	this._limits[category] = limit;
}

CardShop_Inventory.prototype.addSkillCustomPrice = function (skillId, price)
{
	this._goods.push(skillId);
	this._price.push(price);
};

CardShop_Inventory.prototype.addCardPack = function (pack)
{
	this._goods.push(pack);
	this._price.push(pack.price);
}

function Game_CardPack()
{
	this.initialize.apply(this, arguments);
}

Game_CardPack.prototype.initialize = function ()
{
	this.amount = 5;
	this.cardPool = [];
	this.price = 300;
	this.image = "Default";
	this.name = "Card Pack"
	this.description = "Description";
}

Game_CardPack.prototype.getSkillName = function ()
{
	return this.name;
}

Game_CardPack.prototype.isGameCard = function ()
{
	return false;
}

Game_Card.prototype.isGameCard = function ()
{
	return true;
}


Sprite_SkillCard.prototype.addShopImage = function ()
{
	var dataSkill = this._skill;

	if (this._shopImage == undefined)
	{
		this._shopImage = new Sprite();
		this._shopImage.anchor = new Point(0.5, 0.5);
		this.addChild(this._shopImage);
	}

	if (dataSkill && dataSkill._shopImage)
	{
		var bitmap = ImageManager.loadBitmap("img/CGC/shop/", dataSkill._shopImage);
		this._shopImage.bitmap = bitmap;
	}
	else
	{
		this._shopImage.bitmap = new Bitmap(1, 1);
	}
}




function Sprite_CardPack()
{
	this.initialize.apply(this, arguments);
};

Sprite_CardPack.prototype = Object.create(Myth.Util.spritePrototype.prototype);
Sprite_CardPack.prototype.constructor = Sprite_CardPack;

Sprite_CardPack.prototype.initialize = function (cardPack)
{
	Myth.Util.spritePrototype.prototype.initialize.call(this);
	this._cardPack = cardPack;
	this._card = cardPack;
	this._packImage = ImageManager.loadBitmap("img/CGC/shop/", this._cardPack.image);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.drawBitmap();
}

Sprite_CardPack.prototype.drawBitmap = function ()
{
	var bitmap = this._packImage;
	if (!bitmap.isReady() || bitmap.width == 0)
	{
		setTimeout(() =>
		{
			this.drawBitmap();
		}, 100);
		return;
	}

	var width = bitmap.width;
	var height = bitmap.height;
	this.bitmap = new Bitmap(width, height);
	this.contents = this.bitmap;
	this.bitmap.smooth = Myth.CGC.smoothCards;
	this.bitmap.blt(bitmap, 0, 0, width, height, 0, 0, width, height);
}

Sprite_CardPack.prototype.isTouchedInsideFrame = function ()
{
	return Sprite_SkillCard.prototype.isTouchedInsideFrame.call(this);
}

Sprite_CardPack.prototype.canvasToLocalX = function (x)
{
	return Sprite_SkillCard.prototype.canvasToLocalX.call(this, x);
};

Sprite_CardPack.prototype.canvasToLocalY = function (y)
{
	return Sprite_SkillCard.prototype.canvasToLocalY.call(this, y);
};

Sprite_CardPack.prototype.onClick = function ()
{
	return Sprite_SkillCard.prototype.onClick.call(this);
};

Sprite_CardPack.prototype.onMouseEnter = function ()
{
	return Sprite_SkillCard.prototype.onMouseEnter.call(this);
};

Sprite_CardPack.prototype.onMouseExit = function ()
{
	return Sprite_SkillCard.prototype.onMouseExit.call(this);
};

Sprite_CardPack.prototype.shadeCard = function ()
{
	
	if (!this.bitmap)
	{
		this._needsShade = true;
		setTimeout(() =>
		{
			if (this._needsShade)
				this.shadeCard();
		}, 100);
		return;
	}
	this.setBlendColor([0, 0, 0, 155]);
	this._needsShade = false;
	//return Sprite_SkillCard.prototype.shadeCard.call(this);
}

Sprite_CardPack.prototype.unshadeCard = function ()
{
	this._needsShade = false;
	this.setBlendColor([0, 0, 0, 0]);
	//return Sprite_SkillCard.prototype.unshadeCard.call(this);
}

Sprite_CardPack.prototype.addShopImage = function ()
{
	
}


Myth.CGC.Shop.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function ()
{
	if (!Myth.CGC.Shop.DataManager_isDatabaseLoaded.call(this)) return false;
	if (!Myth.loaded_CardShop)
	{
		DataManager.processCardPriceNotetags($dataSkills);

		if (Imported.YEP_X_MoreCurrencies)
		{
			this.processMCNotetags1(Myth.CGC.Shop.cardPacks, 3);
		}
		Myth.loaded_CardShop = true;
	}

	return true;
};

DataManager.processCardPriceNotetags = function (group)
{
	var priceNote = /<(?:CARD PRICE:? )(.+)>/i;
	var buyNote = /<(?:CARD BUY PRICE:? )(.+)>/i;
	var selllNote = /<(?:CARD SELL PRICE:? )(.+)>/i;
	var removeNote = /<(?:CARD REMOVE PRICE:? )(.+)>/i;
	for (var n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(priceNote))
			{
				obj._cardBuyPrice = RegExp.$1;
			}
			else if (line.match(buyNote))
			{
				obj._cardBuyPrice = RegExp.$1;
			}
			else if (line.match(selllNote))
			{
				obj._cardSellPrice = RegExp.$1;
			}
			else if (line.match(removeNote))
			{
				obj._cardRemovePrice = RegExp.$1;
			}
		}
	}

	if (Imported.YEP_X_MoreCurrencies)
	{
		this.processMCNotetags1($dataSkills, 3);
	}
};

Myth.CGC.Shop.DataManager_processCardAppearanceNotetags = DataManager.processCardAppearanceNotetags;
DataManager.processCardAppearanceNotetags = function (group)
{
	Myth.CGC.Shop.DataManager_processCardAppearanceNotetags.call(this, group);
	var shopNote = /<(?:SHOP IMAGE: )(.*)>/i;

	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(shopNote))
			{
				obj._shopImage = RegExp.$1;
			}
		}
	}
}


if (Imported.YEP_X_MoreCurrencies)
{
	//proxy buy won't work currently with skills
	Myth.CGC.Shop.DataManager_adjustProxyBuy = DataManager.adjustProxyBuy;
	DataManager.adjustProxyBuy = function (obj, itemType)
	{
		if (itemType === 3) return;
		return Myth.CGC.Shop.DataManager_adjustProxyBuy.call(this, obj, itemType);
	}
}

Myth.Util.sharedLibrary = function ()
{
	if (Myth.CGC.Deck)
		return Myth.CGC.Deck.sharedLibrary;
	return false;
}


function Window_CardCost()
{
	this.initialize.apply(this, arguments);
}

Window_CardCost.prototype.initialize = function (spriteCard)
{
	var width = Myth.CGC.Shop.coordinates.costWindowWidth;
	this._scrollX = 0;
	this._scrollY = 0;
	Window_CardAmount.prototype.initialize.apply(this, spriteCard, width);
}

Window_CardCost.prototype = Object.create(Window_CardAmount.prototype);
Window_CardCost.prototype.constructor = Window_CardCost;

Window_CardCost.prototype.maxRows = function ()
{
	return 8;
}

Window_CardCost.prototype.maxCols = function ()
{
	return 1;
}

Window_CardCost.prototype.standardFontSize = function ()
{
	return Myth.CGC.Shop.coordinates.costWindowFontSize;
}

Window_CardCost.prototype.itemRect = function (index)
{
	this._scrollX = 0;
	this._scrollY = 0;
	var rect = Window_Selectable.prototype.itemRect.call(this, index);
	return rect;
}

Window_CardCost.prototype.itemWidth = function ()
{
	return Window_Selectable.prototype.itemWidth.call(this);
};

Window_CardCost.prototype.itemHeight = function ()
{
	return Window_Selectable.prototype.itemHeight.call(this);
};

Window_CardCost.prototype.spacing = function ()
{
	return 12;
};

Window_CardCost.prototype.colSpacing = function ()
{
	return 8;
}

Window_CardCost.prototype.rowSpacing = function ()
{
	return 4;
}

Window_CardCost.prototype.scrollBaseX = function ()
{
	return 0;
}

Window_CardCost.prototype.scrollBaseY = function ()
{
	return 0;
}

/*Window_CardCost.prototype.lineHeight = function ()
{
	return this.standardFontSize() + 8;
}*/

/*Window_CardCost.prototype.drawText = function (text, x, y, maxWidth, textAlign)
{
	Window_Base.prototype.drawText.call(this, text, x, y, maxWidth, this.textAlign());
}*/

Window_CardCost.prototype.drawPrice = function (isEnabled, mode)
{
	this._mode = mode;
	this.contents.clear();
	//this.changePaintOpacity(isEnabled);
	var currencyIndex = 0;
	currencyIndex = this.drawGoldPrice(currencyIndex);
	if (Imported.YEP_X_MoreCurrencies)
	{
		var dataItem = this._spriteCard._cardPack;
		if (!dataItem)
		{
			dataItem = this._spriteCard._skill;
		}
		if (!dataItem)
		{
			return;
		}
		//var ww = this.calculatePriceWidth(item, rect);
		currencyIndex = this.drawVariableBuyPrices(dataItem, currencyIndex);
		currencyIndex = this.drawArmorBuyPrices(dataItem, currencyIndex);
		currencyIndex = this.drawWeaponBuyPrices(dataItem, currencyIndex);
		currencyIndex = this.drawItemBuyPrices(dataItem, currencyIndex);
	}

	if (currencyIndex == 0)
		this.drawFreeText();
}

Window_CardCost.prototype.drawFreeText = function ()
{
	var rect = this.itemRect(0);
	var text = Myth.CGC.Shop.freeText;
	var totalWidth = this.textWidthEx(text);
	rect = this.alignRect(rect, totalWidth);

	this.drawTextEx(text, rect.x, rect.y);
}

Window_CardCost.prototype.textAlign = function ()
{
	return Myth.CGC.Shop.coordinates.cardDisplay.amountJustify;
};

Window_CardCost.prototype.alignRect = function (rect, totalWidth)
{
	//override alignment by changing x and width values

	var textAlign = this.textAlign();
	if (textAlign == 'center')
	{
		rect.x += rect.width / 2;
		rect.x -= totalWidth / 2;
	}
	if (textAlign == 'right')
	{
		rect.x += rect.width;
		rect.x -= totalWidth;
	}
	rect.width = totalWidth;

	return rect;
}

Window_CardCost.prototype.textWidthEx = function (text)
{
	return this.drawTextEx(text, 0, this.contents.height);
};

Window_CardCost.prototype.drawGoldPrice = function (currentCurrency)
{
	var amount = this._spriteCard._amount;
	if (amount == 0) return currentCurrency;
	var rect = this.itemRect(currentCurrency);
	
	var unitWidth = Math.min(80, this.textWidth(TextManager.currencyUnit));
	var textWidth = this.textWidth(amount);
	if (Imported.YEP_CoreEngine)
	{
		this.contents.fontSize = Yanfly.Param.GoldFontSize;
		if (this.usingGoldIcon(TextManager.currencyUnit))
			unitWidth = Window_Base._iconWidth;
		var text = Yanfly.Util.toGroup(amount);
		textWidth = this.textWidth(text);
	}
	var totalWidth = textWidth + unitWidth;
	rect = this.alignRect(rect, totalWidth);


	this.drawCurrencyValue(amount, TextManager.currencyUnit, rect.x, rect.y, rect.width);

	return currentCurrency + 1;
}

if (Imported.YEP_X_MoreCurrencies)
{
	Window_CardCost.prototype.isSelling = function ()
	{
		var sellWindow = SceneManager._scene._sellWindow;
		return sellWindow.isOpenAndActive() && sellWindow._mode == 'sell';
	}

	Window_CardCost.prototype.drawVariableBuyPrices = function (item, currentCurrency)
	{
		var prices = null;
		if (this._mode == 'buy')
			prices = item.variableBuyPrices;
		if (this._mode == 'sell')
			prices = item.variableSellPrices;
		if (!prices) return currentCurrency;
		for (var i = 0; i < prices.length; i++)
		{
			var varId = prices[i];
			var rect = this.itemRect(currentCurrency);
			this.drawVariablePrice(item, varId, rect, rect.width);
			currentCurrency++;
		}
		return currentCurrency;
	}

	Window_CardCost.prototype.drawVariablePrice = function (item, varId, rect, ww)
	{
		var value = this._mode == 'buy' ? item.variableBuyPrice[varId] : item.variableSellPrice[varId];
		var unit = 'VARIABLE ' + varId;
		this.drawAltCurrency(value, unit, rect.x, rect.y, ww);
		//return Window_ShopBuy.prototype.drawVariablePrice.call(this, item, varId, rect, ww)
	}

	Window_CardCost.prototype.drawItemBuyPrices = function (item, currentCurrency)
	{
		var prices = null;
		if (this._mode == 'buy')
			prices = item.itemBuyPrices;
		if (this._mode == 'sell')
			prices = item.itemSellPrices;
		//var prices = this.isSelling() ? item.itemSellPrices : item.itemBuyPrices;
		if (!prices) return currentCurrency;
		for (var i = 0; i < prices.length; i++)
		{
			var varId = prices[i];
			var rect = this.itemRect(currentCurrency);
			this.drawItemBuyPrice(item, varId, rect, rect.width);
			currentCurrency++;
		}
		return currentCurrency;
	}

	Window_CardCost.prototype.drawItemBuyPrice = function (item, varId, rect, ww)
	{
		var value = this._mode == 'buy' ? item.itemBuyPrice[varId] : item.itemSellPrice[varId];
		var unit = $dataItems[varId];
		this.drawAltCurrency(value, unit, rect.x, rect.y, ww);
		//return Window_ShopBuy.prototype.drawItemBuyPrice.call(this, item, varId, rect, ww)
	}

	Window_CardCost.prototype.drawWeaponBuyPrices = function (item, currentCurrency)
	{
		var prices = null;
		if (this._mode == 'buy')
			prices = item.weaponBuyPrices;
		if (this._mode == 'sell')
			prices = item.weaponSellPrices;
		//var prices = this.isSelling() ? item.weaponSellPrices : item.weaponBuyPrices;
		if (!prices) return currentCurrency;
		for (var i = 0; i < prices.length; i++)
		{
			var varId = prices[i];
			var rect = this.itemRect(currentCurrency);
			this.drawWeaponBuyPrice(item, varId, rect, rect.width);
			currentCurrency++;
		}
		return currentCurrency;
	}

	Window_CardCost.prototype.drawWeaponBuyPrice = function (item, varId, rect, ww)
	{
		var value = this._mode == 'buy' ? item.weaponBuyPrice[varId] : item.weaponSellPrice[varId];
		var unit = $dataWeapons[varId];
		this.drawAltCurrency(value, unit, rect.x, rect.y, ww);
		//return Window_ShopBuy.prototype.drawWeaponBuyPrice.call(this, item, varId, rect, ww)
	}

	Window_CardCost.prototype.drawArmorBuyPrices = function (item, currentCurrency)
	{
		var prices = null;
		if (this._mode == 'buy')
			prices = item.armorBuyPrices;
		if (this._mode == 'sell')
			prices = item.armorSellPrices;
		//var prices = this.isSelling() ? item.armorSellPrices : item.armorBuyPrices;

		if (!prices) return currentCurrency;
		for (var i = 0; i < prices.length; i++)
		{
			var varId = prices[i];
			var rect = this.itemRect(currentCurrency);
			this.drawArmorBuyPrice(item, varId, rect, rect.width);
			currentCurrency++;
		}
		return currentCurrency;
	}

	Window_CardCost.prototype.drawArmorBuyPrice = function (item, varId, rect, ww)
	{
		var value = this._mode == 'buy' ? item.armorBuyPrice[varId] : item.armorSellPrice[varId];
		var unit = $dataArmors[varId];
		this.drawAltCurrency(value, unit, rect.x, rect.y, ww);
		//return Window_ShopBuy.prototype.drawArmorBuyPrice.call(this, item, varId, rect, ww)
	}

	Window_CardCost.prototype.textWidthEx = function (text)
	{
		return Window_ShopBuy.prototype.textWidthEx.call(this, text);
	}
}