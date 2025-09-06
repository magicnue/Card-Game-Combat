//=============================================================================
// MYTH_CGC_TextFormatPlus
//=============================================================================
/*:
 * @target MZ
 * @author Isiah Brighton
 * @plugindesc v1.2.0 Adds extra formatting options to Card text
 * @url https://mythatelier.itch.io/card-game-combat
 *
 * @param fontExtension
 * @text Font File Extension
 * @type select
 * @option .ttf
 * @option .woff
 * @default .ttf
 * @desc The file type this plugin should look for in the fonts folder.
 * 
 * @param iconSize
 * @type number
 * @default 16
 * @text Icon Size
 * @desc Icons may need to be scaled-down on the card. This is the size for icons. Type Icons use the parameter in CardTypes.
 *
 * @param Card Name
 * @type boolean
 * @default true
 * @desc If this is set to OFF, the Name will not be drawn on the card and you can ignore everything below.
 * 
 *   @param nameFontSize
 *   @text Font Size
 *   @parent Card Name
 *   @type number
 *   @default 16
 *   @desc The font size for the name of the card/skill
 *   
 *   @param nameFontFace
 *   @text Font Face
 *   @parent Card Name
 *   @type text
 *   @default GameFont
 *   @desc The name of the font used for the card's name. Use "GameFont" for default.
 *   
 *   @param nameTextStyle
 *   @text Text Style
 *   @parent Card Name
 *   @type select
 *   @option Default
 *   @option Outline
 *   @option Shadow
 *   @option None
 *   @default Default
 *   @desc The Text Style for the card's name. See Help for info.
 *   
 *   @param nameTextStyleValue
 *   @text Text Style Value
 *   @parent Card Name
 *   @type number
 *   @min -100
 *   @default 4
 *   @desc The value for the text style for the card's name. See Help for info.
 *   
 *   @param nameWidth
 *   @text Max Text Width
 *   @parent Card Name
 *   @type number
 *   @default 0
 *   @min -1
 *   @desc The amount of pixels wide a line of text can be before it wraps. 0 to set automatically. -1 to disable word wrap.
 *   
 *   @param nameSpacing
 *   @text Line Spacing
 *   @parent Card Name
 *   @type number
 *   @default 0
 *   @desc The amount of pixels of space between multiple lines of text, if applicable. 0 to set automatically.
 *
 *   @param nameAlign
 *   @parent Card Name
 *   @text Text Alignment
 *   @type select
 *   @option left
 *   @option center
 *   @option right
 *   @default left
 *   @desc Whether the text will be left-aligned, right-aligned, or centered within the space given to it.
 * 
 * @param Card Description
 * @type boolean
 * @default true
 * @desc If this is set to OFF, the Description will not be drawn on the card and you can ignore everything below.
 *
 * 
 * 
 *   @param descFontSize
 *   @text Font Size
 *   @parent Card Description
 *   @type number
 *   @default 16
 *   @desc The font size for the description of the card/skill
 *   
 *   @param descFontFace
 *   @text Font Face
 *   @parent Card Description
 *   @type text
 *   @default GameFont
 *   @desc The name of the font used for the card's description. Use "GameFont" for default.
 *   
 *   @param descTextStyle
 *   @text Text Style
 *   @parent Card Description
 *   @type select
 *   @option Default
 *   @option Outline
 *   @option Shadow
 *   @option None
 *   @default Default
 *   @desc The Text Style for the card's description. See Help for info.
 *   
 *   @param descTextStyleValue
 *   @text Text Style Value
 *   @parent Card Description
 *   @type number
 *   @min -100
 *   @default 4
 *   @desc The value for the text style for the card's description. See Help for info.
 * 
 *   @param descWidth
 *   @text Max Text Width
 *   @parent Card Description
 *   @type number
 *   @default 0
 *   @desc The amount of pixels wide a line of text can be before it wraps. 0 to set automatically. -1 to disable word wrap.
 *   
 *   @param descSpacing
 *   @text Line Spacing
 *   @parent Card Description
 *   @type number
 *   @default 0
 *   @desc The amount of pixels of space between multiple lines of text, if applicable. 0 to set automatically.
 *
 *   @param descAlign
 *   @parent Card Description
 *   @text Text Alignment
 *   @type select
 *   @option left
 *   @option center
 *   @option right
 *   @default left
 *   @desc Whether the text will be left-aligned, right-aligned, or centered within the space given to it.
 *
 *
 * @param Card Cost
 * @type boolean
 * @default true
 * @desc If this is set to OFF, the Cost will not be drawn on the card and you can ignore everything below.
 *
 * 
 *   @param costFontSize
 *   @text Font Size
 *   @parent Card Cost
 *   @type number
 *   @default 16
 *   @desc The font size for the cost text of the card/skill
 *   
 *   @param costFontFace
 *   @text Font Face
 *   @parent Card Cost
 *   @type text
 *   @default GameFont
 *   @desc The name of the font used for the card's cost. Use "GameFont" for default.
 *   
 *   @param costTextStyle
 *   @text Text Style
 *   @parent Card Cost
 *   @type select
 *   @option Default
 *   @option Outline
 *   @option Shadow
 *   @option None
 *   @default Default
 *   @desc The Text Style for the card's cost. See Help for info.
 *   
 *   @param costTextStyleValue
 *   @text Text Style Value
 *   @parent Card Cost
 *   @type number
 *   @min -100
 *   @default 4
 *   @desc The value for the text style for the card's cost. See Help for info.
 *   
 *   @param costAlign
 *   @parent Card Card
 *   @text Text Alignment
 *   @type select
 *   @option left
 *   @option center
 *   @option right
 *   @default right
 *   @desc Whether the text will be left-aligned, right-aligned, or centered within the space given to it.
 * 
 * @param Card Type
 * @type boolean
 * @default true
 * @desc If this is set to OFF, the Types will not be drawn on the card and you can ignore everything below.
 *
 * 
 *   @param typeFontSize
 *   @text Font Size
 *   @parent Card Type
 *   @type number
 *   @default 16
 *   @desc The font size for the type text of the card/skill
 *   
 *   @param typeFontFace
 *   @text Font Face
 *   @parent Card Type
 *   @type text
 *   @default GameFont
 *   @desc The name of the font used for the card's type. Use "GameFont" for default.
 *   
 *   @param typeTextStyle
 *   @text Text Style
 *   @parent Card Type
 *   @type select
 *   @option Default
 *   @option Outline
 *   @option Shadow
 *   @option None
 *   @default Default
 *   @desc The Text Style for the card's type. See Help for info.
 *   
 *   @param typeTextStyleValue
 *   @text Text Style Value
 *   @parent Card Type
 *   @type number
 *   @min -100
 *   @default 4
 *   @desc The value for the text style for the card's type. See Help for info.
 *   
 *   @param typeAlign
 *   @parent Card Type
 *   @text Text Alignment
 *   @type select
 *   @option left
 *   @option center
 *   @option right
 *   @default left
 *   @desc Whether the text will be left-aligned, right-aligned, or centered within the space given to it.
 *
 *   
 * 
 * @param linebreak1
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param refreshOnRefresh
 * @text Refresh Card Text
 * @type boolean
 * @default false
 * @desc Set this to true if card text changes mid-game, such as cost or a variable calculation in the description.
 * 
 * 
 * @param linebreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SFont Compatibility
 * @desc If you're using SFont, you should ignore all of the parameters above except Refresh Card Text and use these instead.
 * 
 *   @param cardNameSFont
 *   @parent SFont Compatibility
 *   @text Card Name SFont
 *   @type number
 *   @default -1
 *   @min -1
 *   @desc The index of SFont to use for the Card Name.
 *   
 *   @param cardDescSFont
 *   @parent SFont Compatibility
 *   @text Card Desc SFont
 *   @type number
 *   @default -1
 *   @min -1
 *   @desc The index of SFont to use for the Card Description
 *   
 *   @param cardCostSFont
 *   @parent SFont Compatibility
 *   @text Card Cost SFont
 *   @type number
 *   @default -1
 *   @min -1
 *   @desc The index of SFont to use for the Card Cost
 *   
 *   @param cardTypeSFont
 *   @parent SFont Compatibility
 *   @text Card Type SFont
 *   @type number
 *   @default -1
 *   @min -1
 *   @desc The index of SFont to use for the Card Type
 *   
 *   @param cardAmountSFont
 *   @parent SFont Compatibility
 *   @text Card Amount SFont
 *   @type number
 *   @default -1
 *   @min -1
 *   @desc The index of SFont to use for the text indicating the number of copies of the card inside the Card Library/Deck Editor
 *   
 *   @param zoneAmountSFont
 *   @parent SFont Compatibility
 *   @text Deck/Discard Amount SFont
 *   @type number
 *   @default -1
 *   @min -1
 *   @desc The index of SFont to use for the text overlayed on the Deck/Discard images in battle.
 * 
 * @help
 * 
 * ============================================================================
 * Overview
 * ============================================================================
 *
 * Text Format Plus overhauls how text is drawn onto cards.
 * 
 * Card descriptions now word-wrap automatically, and for that matter, so
 * do names! You can use '\n', '\BR', or '<br>' to manually linebreak, but
 * you can also still hit enter in a description box (as long as there's room)
 * to linebreak.
 * 
 * 
 * Note: If you see plugin parameters in this plugin that are duplicates of/
 * serve a duplicate function to plugin parameters in the core CardGameCombat
 * plugin, ignore the ones of the core plugin and use the ones here. They've
 * been duplicated to assist with organization.
 * 
 * Example: Card Name Font Size appears in this plugin and in the core plugin.
 * It's the same parameter, but this plugin overwrites the core's parameter.
 * 
 * ============================================================================
 * Regarding fonts
 * ============================================================================
 * 
 * If you are using YEP_LoadCustomFonts, you can ignore this section and follow
 * the help section of that plugin.
 * 
 * This plugin will allow any font as long as it is included in the fonts
 * folder and the file name is exactly the same name as the font name.
 * 
 * What this means is, for example, if you want Comic Sans to be included,
 * you may copy the font from your system fonts to the fonts folder and
 * discover that it contains a series of font files, the main one being called
 * "comic.ttf". You will need to rename that file to "Comic Sans MS.ttf" for
 * this plugin to load it properly.
 * 
 * Renaming font files doesn't cause any issues as far as I can tell.
 * 
 * ============================================================================
 * Text Styles
 * ============================================================================
 * 
 * By default, RPG Maker adds an outline to all text. This parameter allows
 * you to decide if you want to continue that behavior when drawing each
 * element of text on a card, or if you want to change that behavior.
 * 
 * The options are:
 *     Default - Use the same behavior that all other text has in the game
 *     Outline - Use the vanilla RPG Maker outline text drawing behavior
 *     Shadow - Use a black drop shadow underneath the text
 *     None - Just draw the text.
 *     
 * For most users, there will be no difference between Default and Outline.
 * There are some plugins that change the way RPG Maker draws text, such
 * as a popular one that removes outlines. For those using plugins like that,
 * Outline restores the default behavior for that card element only.
 * 
 * ============================================================================
 * Text Style Values
 * ============================================================================
 * 
 * This is a number that is relevant for Default/Outline and Shadow text 
 * styles.
 * 
 * When drawing an outline, this represents the outline width. Default is 4.
 * 
 * When drawing a drop shadow, this is the amount of pixels offset from the
 * regular text that the drop shadow will be. Recommended value is 2 based on
 * font sizes.
 * 
 * This value is unused for None because nothing interesting is happening.
 *
 * ============================================================================
 * Refresh Card Text info
 * ============================================================================
 * 
 * Many games modify card cost, or put damage calculations inside the
 * description of the card. Setting this parameter to ON will allow card text
 * to update whenever you play a card and immediately after a skill is used,
 * so that their text information is always up-to-date.
 * 
 * However, for games that don't do this, we have given the option to turn this
 * feature off as an optimization measure. We've noticed a small dip in the
 * framerate when card text refreshes which is not significant in our testing
 * environment but might be annoying for some users who aren't even using the
 * feature.
 * 
 * You can also manually refresh all card text by using the following code:
 * 
 *     Myth.CGC.refreshCardText();
 *     
 * This works whether Refresh Card Text is on or off.
 * 
 * 
 * ============================================================================
 * Version History
 * ============================================================================
 *
 * v1.2.0 - Major refactors.
 *          Addition of Text Alignment parameters for each text component.
 *          Addition of parameters to disable showing each text component.
 *          Fixed TextFormatPlus bug where SFont index 0 wouldn't display.
 *			Fixed TextFormatPlus bug where Amount would always use index 0.
 *			Added tryParse calls to TextFormatPlus, supplying default values 
 *			and preventing errors
 * 
 * v1.1.1 - Fixed MV slowdown when using YEP_CoreEngine and non-default fonts
 * 
 * v1.1.0 - Updated compatibility for CGC 1.6.0
 *          Added compatibility with VE_SFont
 *          Fixed bug where card names would use the font size of card cost.
 *          Fixed bug that would prevent proper text wrapping when using text
 *          codes.
 *          Fixed MZ bug that would break color codes.
 *          Added support for .woff files through a new plugin parameter.
 *          Changed plugin name
 * 
 * v1.0.1 - Now draws TP and MP next to each other if both need to be drawn
 *          Fixed optimization issue when using YEP_CoreEngine.
 * 
 * v1.0.0 - Finished plugin
*/


var Myth = Myth || {};
if (!Myth.CGC)
	console.error("Make sure you put MYTH_CGC_TextFormatPlus underneath MYTH_CGC_CoreEngine");

Myth.Parameters = PluginManager.parameters('MYTH_CGC_TextFormatPlus');


Myth.CGC.TFP = {};

Myth.CGC.TFP.refreshOnRefresh = JSON.parse(Myth.Parameters.refreshOnRefresh);

Myth.CGC.fontSizes.cardName = Number(Myth.Parameters.nameFontSize);
Myth.CGC.fontSizes.cardDesc = Number(Myth.Parameters.descFontSize);
Myth.CGC.fontSizes.cardCost = Number(Myth.Parameters.costFontSize);
Myth.CGC.fontSizes.cardType = Number(Myth.Parameters.typeFontSize);

Myth.CGC.fontSizes.iconSize = Number(Myth.Parameters.iconSize);

Myth.CGC.fontFaces.cardName = Myth.Parameters.nameFontFace;
Myth.CGC.fontFaces.cardDesc = Myth.Parameters.descFontFace;
Myth.CGC.fontFaces.cardType = Myth.Parameters.typeFontFace;
Myth.CGC.fontFaces.cardCost = Myth.Parameters.costFontFace;

Myth.CGC.cardDisplayComponents.cardName = Myth.Util.tryParse(Myth.Parameters['Card Name'], true, "MYTH_CGC_TextFormatPlus - Card Name");
Myth.CGC.cardDisplayComponents.cardDesc = Myth.Util.tryParse(Myth.Parameters['Card Description'], true, "MYTH_CGC_TextFormatPlus - Card Description");
Myth.CGC.cardDisplayComponents.cardType = Myth.Util.tryParse(Myth.Parameters['Card Type'], true, "MYTH_CGC_TextFormatPlus - Card Type");
Myth.CGC.cardDisplayComponents.cardCost = Myth.Util.tryParse(Myth.Parameters['Card Cost'], true, "MYTH_CGC_TextFormatPlus - Card Cost");


Myth.CGC.TFP.fontExtension = Myth.Parameters.fontExtension;

Myth.CGC.textWidths.cardName = Number(Myth.Parameters.nameWidth);
Myth.CGC.textWidths.cardDesc = Number(Myth.Parameters.descWidth);

Myth.CGC.TFP.cardNameSpacing = Number(Myth.Parameters.nameSpacing);
Myth.CGC.TFP.cardDescSpacing = Number(Myth.Parameters.descSpacing);

Myth.CGC.TFP.textSpacing = {
	cardName: Number(Myth.Parameters.nameSpacing),
	cardDesc: Number(Myth.Parameters.descSpacing),
	cardType: 0,
	cardCost: 0
}

Myth.CGC.TFP.textStyle = {
	cardName: Myth.Parameters.nameTextStyle,
	cardDesc: Myth.Parameters.descTextStyle,
	cardType: Myth.Parameters.typeTextStyle,
	cardCost: Myth.Parameters.costTextStyle,
}

Myth.CGC.TFP.textStyleValue = {
	cardName: Number(Myth.Parameters.nameTextStyleValue),
	cardDesc: Number(Myth.Parameters.descTextStyleValue),
	cardType: Number(Myth.Parameters.typeTextStyleValue),
	cardCost: Number(Myth.Parameters.costTextStyleValue),
};

Myth.CGC.TFP.textAligns = {
	cardName: Myth.Parameters.nameAlign,
	cardDesc: Myth.Parameters.descAlign,
	cardType: Myth.Parameters.typeAlign,
	cardCost: Myth.Parameters.costAlign,
}

Myth.CGC.TFP.SFont = {
	cardName: Number(Myth.Parameters.cardNameSFont),
	cardDesc: Number(Myth.Parameters.cardDescSFont),
	cardCost: Number(Myth.Parameters.cardCostSFont),
	cardType: Number(Myth.Parameters.cardTypeSFont),
	amount: Number(Myth.Parameters.cardAmountSFont),
	zoneAmount: Number(Myth.Parameters.zoneAmountSFont),
}


Sprite_SkillCard.prototype.resetFontSettings = function ()
{
	var color = Myth.Util.usingMZ ? ColorManager.normalColor() : this.normalColor();

	this.contents.fontFace = this.standardFontFace();
	this.contents.fontSize = this.standardFontSize();
	this.contents.textColor = color;
	this.contents.outlineWidth = Myth.CGC.TFP.textStyleValue[this.drawType];

	var style = Myth.CGC.TFP.textStyle[this.drawType];
	this.contents.drawText = Myth.CGC.TFP.getDrawTextStyle(style);

	if (Imported['VE - SFont'])
	{
		var sfontIndex = -1;

		sfontIndex = Myth.CGC.TFP.SFont[this.drawType];

		if (sfontIndex != -1)
			this.contents.changeSFont(sfontIndex);
		else
			this.contents.sfont = null;
	}

};

// This fixes a typo in VE_SFont...
if (Imported['VE - SFont'])
{
	Bitmap.prototype.changeSFont = function (index)
	{
		this.sfont = VictorEngine.SFont.getSFont(index);
	};
}


Myth.CGC.TFP.Sprite_SkillCard_isImageChanged = Sprite_SkillCard.prototype.isImageChanged;
Sprite_SkillCard.prototype.isImageChanged = function ()
{
	var isChanged = Myth.CGC.TFP.Sprite_SkillCard_isImageChanged.call(this);
	if (this.bitmap.requestRedraw)
	{
		this.bitmap.requestRedraw = false;
		return true;
	}
	return (isChanged);
};

Myth.CGC.TFP.Sprite_SkillCard_drawCardCost = Sprite_SkillCard.prototype.drawCardCost;
Sprite_SkillCard.prototype.drawCardCost = function ()
{
	this.drawType = 'cardCost';
	this.resetFontSettings();
	Myth.CGC.TFP.Sprite_SkillCard_drawCardCost.call(this);
}

if (!Imported.YEP_SkillCore)
{
	Sprite_SkillCard.prototype.drawSkillCost = function (skill, x, y, width)
	{
		var drawTp = this._actor.skillTpCost(skill) > 0;
		var drawMp = this._actor.skillMpCost(skill) > 0;
		var oldX = x;
		x = this.alignCostText(x, width, skill);
		if (drawTp)
		{
			if (Myth.Util.usingMZ)
				this.changeTextColor(ColorManager.tpCostColor());
			else
				this.changeTextColor(this.tpCostColor());
			var xx = x;
			if (drawMp)
				xx += this.textWidth(this._actor.skillMpCost(skill)) + 8;
			this.drawText(this._actor.skillTpCost(skill), xx, y, this.bitmap.width, 'left');
		}
		if (drawMp)
		{
			if (Myth.Util.usingMZ)
				this.changeTextColor(ColorManager.mpCostColor());
			else
				this.changeTextColor(this.mpCostColor());
			this.drawText(this._actor.skillMpCost(skill), x, y, this.bitmap.width, 'left');
		}
		//return Window_SkillList.prototype.drawSkillCost.call(this, skill, x, y, width);
	};

	Sprite_SkillCard.prototype.alignCostText = function (x, width, skill)
	{
		var drawTp = this._actor.skillTpCost(skill) > 0;
		var drawMp = this._actor.skillMpCost(skill) > 0;
		var textAlign = this.textAlign();
		var totalTextWidth = 0;
		if (drawTp)
			totalTextWidth += this.textWidth(this._actor.skillTpCost(skill));
		if (drawMp)
			totalTextWidth += this.textWidth(this._actor.skillMpCost(skill));
		if (drawMp && drawTp)
			totalTextWidth += 8;

		if (textAlign == 'center')
		{
			x += width / 2;
			x -= totalTextWidth / 2;
		}
		if (textAlign == 'right')
		{
			x += width;
			x -= totalTextWidth;
		}

		return x;
	}
}

if (Myth.Util.usingMZ)
{
	Sprite_SkillCard.prototype.processAllText = function (textState)
	{
		var lines = textState.text.split('\n');
		for (var i = 0; i < lines.length; i++)
		{
			textState.text = lines[i];
			this.alignTextLine(textState);
			while (textState.index < textState.text.length)
			{
				this.processCharacter(textState);
			}
			this.flushTextState(textState);
			this.processNewLine(textState);
			textState.index = 0;
			
		}
		//this.flushTextState(textState);
	}
}


Sprite_SkillCard.prototype.drawTextEx = function (text, x, y, width)
{
	if (Myth.Util.usingMZ)
	{
		//width = this.maxTextWidth();
		this.resetFontSettings();
		const textState = this.createTextState(text, x, y, width);
		textState.text = this.wrapText(textState.text);
		this.processAllText(textState);
		return textState.outputWidth;
	}
	else
	{
		if (!text) return 0;

		var textState = { index: 0, x: x, y: y, left: x };
		text = this.convertEscapeCharacters(text);
		this.resetFontSettings();
		textState.text = this.wrapText(text);
		textState.height = this.calcTextHeight(textState, false);

		var lines = textState.text.split('\n');
		for (var i = 0; i < lines.length; i++)
		{
			textState.text = lines[i];
			this.alignTextLine(textState);
			while (textState.index < textState.text.length)
			{
				this.processCharacter(textState);
			}
			this.processNewLine(textState);
			textState.index = 0;
		}
		
		return textState.x - x;
	}


}

Sprite_SkillCard.prototype.alignTextLine = function (textState)
{
	//Replicate the alignment of drawText by changing x value

	var maxWidth = this.maxTextWidth();
	var textAlign = this.textAlign();
	var textWidth = this.getEscapelessTextWidth(textState.text);

	if (textAlign == 'center')
	{
		textState.x += maxWidth / 2;
		textState.x -= textWidth / 2;
	}
	if (textAlign == 'right')
	{
		textState.x += maxWidth;
		textState.x -= textWidth;
	}
}

Sprite_SkillCard.prototype.convertEscapeCharacters = function (text)
{
	var text = Window_Base.prototype.convertEscapeCharacters.call(this, text);
	text = text.replace(/\x1bBR/gi, '\n');
	text = text.replace(/<br>/gi, '\n');
	return text;
}

Sprite_SkillCard.prototype.getEscapelessTextWidth = function (text)
{
	var escapelessText = text.replace(/\x1b\w+\[\w*\]/ig, '');
	return this.textWidth(escapelessText);
}

Sprite_SkillCard.prototype.wrapText = function (text)
{
	var maxWidth = this.maxTextWidth();
	if (maxWidth == -1) return text;
	var words = text.split(" ");
	var lines = [];
	var currentLine = 0;
	for (var i = 0; i < words.length; i++)
	{
		var line = lines[currentLine];
		if (line == undefined)
			line = "";
		var word = words[i].trim();
		var testText = line + " " + word;
		var textWidth = this.getEscapelessTextWidth(testText);
		if (textWidth < maxWidth)
		{
			line = testText;
			lines[currentLine] = line;
		}
		else
		{
			line = word;
			currentLine++;
			lines[currentLine] = line;
		}
	}
	var totalText = "";
	for (var i = 0; i <= currentLine; i++)
	{
		if (lines[i])
			totalText += lines[i].trim() + "\n";
	}
	return totalText;
};

Window_BattleSkill.prototype.refresh = function ()
{
	Window_SkillList.prototype.refresh.call(this);
	if (!Myth.CGC.TFP.refreshOnRefresh) return;

	var cards = this._cardSprites.getCardSprites();
	for (var i = 0; i < cards.length; i++)
	{
		cards[i].bitmap.requestRedraw = true;
	}
}

Myth.CGC.refreshCardText = function ()
{
	var win = SceneManager._scene._skillWindow;
	if (!win) return;
	if (!win._cardSprites) return;
	var cards = win._cardSprites.getCardSprites();
	for (var i = 0; i < cards.length; i++)
	{
		cards[i].bitmap.requestRedraw = true;
	}
}

Sprite_SkillCard.prototype.maxTextWidth = function ()
{
	var maxWidth = Myth.CGC.textWidths[this.drawType];

	if (maxWidth == 0)
	{
		if (this.drawType == 'cardType' || this.drawType == 'cardCost')
			maxWidth = this.bitmap.width;
		else if (this.drawType == 'cardName')
			maxWidth = (this.bitmap.width - Myth.CGC.coordinates.cardNameCoords.x);
		else if (this.drawType == 'cardDesc')
			maxWidth = (this.bitmap.width - Myth.CGC.coordinates.cardDescCoords.x);
	}
	else if (this.drawType == 'cardType')
	{
		maxWidth = this.typeRect(0).width;
	}

	return maxWidth;
}

Sprite_SkillCard.prototype.textAlign = function ()
{
	var textAlign = Myth.CGC.TFP.textAligns[this.drawType];
	return textAlign;
}

Sprite_SkillCard.prototype.getTextHeight = function ()
{
	var height = Myth.CGC.TFP.textSpacing[this.drawType];
	return height;
}

/*Sprite_SkillCard.prototype.standardFontFace = function ()
{
	if (Myth.Util.usingMZ)
		return $gameSystem.mainFontFace();
	return Window_Base.prototype.standardFontFace.call(this);
};

Sprite_SkillCard.prototype.standardFontSize = function ()
{
	if (Myth.Util.usingMZ)
		return $gameSystem.mainFontSize();
	return Myth.CGC.fontSizes.cardDesc;
};*/

Sprite_SkillCard.prototype.processNewLine = function (textState)
{
	var height = this.getTextHeight();
	if (height == 0)
		height = textState.height;

	if (Myth.Util.usingMZ)
	{
		textState.x = textState.startX;
		textState.y += height;
		textState.height = this.calcTextHeight(textState);
	}
	else
	{
		textState.x = textState.left;
		textState.y += height;
		textState.height = this.calcTextHeight(textState, false);
		textState.index++;
	}
};

//VE_SFont compatibility
Myth.CGC.TFP.Sprite_SkillCard_drawAmount = Sprite_CardZone.prototype.drawAmount;
Sprite_CardZone.prototype.drawAmount = function ()
{
	if (Imported['VE - SFont'])
	{
		var sfontIndex = Myth.CGC.TFP.SFont.amount;
		if (sfontIndex != -1)
			bitmap.changeSFont(sfontIndex);
		else
			bitmap.sfont = null;
	}
	Myth.CGC.TFP.Sprite_SkillCard_drawAmount.call(this);
}


//VE_SFont compatibility
Myth.CGC.TFP.Sprite_CardZone_setTextBitmap = Sprite_CardZone.prototype.setTextBitmap;
Sprite_CardZone.prototype.setTextBitmap = function (bitmap)
{
	bitmap = Myth.CGC.TFP.Sprite_CardZone_setTextBitmap.call(this, bitmap);
	if (Imported['VE - SFont'])
	{
		var sfontIndex = Myth.CGC.TFP.SFont.zoneAmount;
		if (sfontIndex != -1)
			bitmap.changeSFont(sfontIndex);
		else
			bitmap.sfont = null;
	}
	return bitmap;
}

//VE_SFont compatibility
if (Imported['VE - SFont'])
{
	Myth.CGC.TFP.Window_CardAmount_initialize = Window_CardAmount.prototype.initialize;
	Window_CardAmount.prototype.initialize = function (spriteCard, width)
	{
		Myth.CGC.TFP.Window_CardAmount_initialize.call(this, spriteCard, width);
		var sfont = Myth.CGC.TFP.SFont.amount;
		this._sfont = VictorEngine.SFont.getSFont(sfont);
		this.contents.changeSFont(sfont);
	}
}


Bitmap.prototype._fontFace = Bitmap.prototype.fontFace;
Object.defineProperty(Bitmap.prototype, 'fontFace', {
	get: function ()
	{
		return this._fontFace;
	},
	set: function (fontFace)
	{
		var hasYanflyFont = Imported.YEP_CoreEngine && fontFace == Yanfly.Param.DefaultFont;
		if (!Myth.Util.usingMZ && !Graphics.isFontLoaded(fontFace) && fontFace != "GameFont"
			&& fontFace != "GameFont, Verdana, Arial, Courier New"
			&& !hasYanflyFont)
		{
			var dir = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
			Graphics.loadFont(fontFace, dir + '/fonts/' + fontFace + Myth.CGC.TFP.fontExtension);
			this.requestRedraw = true;
		}
		this._fontFace = fontFace;
	},
	configurable: true
});


// you should be using Yanfly's plugin if you can (MV)
// but this will do in a pinch
// like I could just do outright what yanfly's custom fonts plugin is doing
// but the only way to do it is to write code that looks like yanfly's
// and I can't afford to be accused of stealing
// so I have to just write a worse feature.
Myth.CGC.TFP.loadAllFonts = function ()
{
	var dir = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
	for (var property in Myth.CGC.fontFaces)
	{
		var fontFace = Myth.CGC.fontFaces[property];
		if (fontFace.toLowerCase() == 'gamefont') continue;

		Graphics.loadFont(fontFace, dir + '/fonts/' + fontFace + Myth.CGC.TFP.fontExtension);
	}
}
if (!Imported.YEP_LoadCustomFonts && !Myth.Util.usingMZ)
	Myth.CGC.TFP.loadAllFonts();

// if you're reading the documentation then here's a haiku:
//     TypeError: Cannot
//     read property 'replace' of
//     undefined. Fix it.

Myth.CGC.TFP.loadAllFontsMZ = function ()
{
	for (var property in Myth.CGC.fontFaces)
	{
		var fontFace = Myth.CGC.fontFaces[property];
		if (fontFace.toLowerCase() == 'gamefont') continue;

		FontManager.load(fontFace, fontFace + Myth.CGC.TFP.fontExtension);
	}
}

Myth.CGC.TFP.Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
Scene_Boot.prototype.loadGameFonts = function ()
{
	Myth.CGC.TFP.Scene_Boot_loadGameFonts.call(this);
	Myth.CGC.TFP.loadAllFontsMZ();
}

Myth.CGC.TFP.drawTextWithOutline = function (text, x, y, maxWidth, lineHeight, align)
{
	if (text !== undefined)
	{
		var tx = x;
		var ty = y + lineHeight - (lineHeight - this.fontSize * 0.7) / 2;
		var context = this._context;
		var alpha = context.globalAlpha;
		maxWidth = maxWidth || 0xffffffff;
		if (align === 'center')
		{
			tx += maxWidth / 2;
		}
		if (align === 'right')
		{
			tx += maxWidth;
		}
		context.save();
		context.font = this._makeFontNameText();
		context.textAlign = align;
		context.textBaseline = 'alphabetic';
		context.globalAlpha = 1;
		this._drawTextOutline(text, tx, ty, maxWidth);
		context.globalAlpha = alpha;
		this._drawTextBody(text, tx, ty, maxWidth);
		context.restore();
		//the one difference between versions when drawing text
		if (Myth.Util.usingMZ)
			this._baseTexture.update();
		else
			this._setDirty();
	}
};

Myth.CGC.TFP.drawTextWithoutOutline = function (text, x, y, maxWidth, lineHeight, align)
{
	if (text !== undefined)
	{
		var tx = x;
		var ty = y + lineHeight - (lineHeight - this.fontSize * 0.7) / 2;
		var context = this._context;
		var alpha = context.globalAlpha;
		maxWidth = maxWidth || 0xffffffff;
		if (align === 'center')
		{
			tx += maxWidth / 2;
		}
		if (align === 'right')
		{
			tx += maxWidth;
		}
		context.save();
		context.font = this._makeFontNameText();
		context.textAlign = align;
		context.textBaseline = 'alphabetic';
		context.globalAlpha = 1;
		//this._drawTextOutline(text, tx, ty, maxWidth);
		context.globalAlpha = alpha;
		this._drawTextBody(text, tx, ty, maxWidth);
		context.restore();
		//the one difference between versions when drawing text
		if (Myth.Util.usingMZ)
			this._baseTexture.update();
		else
			this._setDirty();
	}
};

Myth.CGC.TFP.drawTextWithShadow = function (text, x, y, maxWidth, lineHeight, align)
{
	var color = this.textColor;
	this.textColor = this.outlineColor;
	Myth.CGC.TFP.drawTextWithoutOutline.call(this, text, x + this.outlineWidth, y + this.outlineWidth, maxWidth, lineHeight, align);

	this.textColor = color
	Myth.CGC.TFP.drawTextWithoutOutline.call(this, text, x, y, maxWidth, lineHeight, align);
};

Myth.CGC.TFP.drawTextDefault = Bitmap.prototype.drawText;


Myth.CGC.TFP.getDrawTextStyle = function (style)
{
	style = style.toLowerCase();
	if (style == 'default')
		this.drawTextDefault;
	if (style == 'shadow')
		return this.drawTextWithShadow;
	if (style == 'outline')
		return this.drawTextWithOutline;
	if (style == 'none')
		return this.drawTextWithoutOutline;

	return this.drawTextDefault;
}