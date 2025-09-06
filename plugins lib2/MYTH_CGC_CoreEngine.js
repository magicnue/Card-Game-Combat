//=============================================================================
// MYTH_CGC_CoreEngine
//=============================================================================
/*:
 * @target MZ
 * @author Isiah Brighton
 * @plugindesc v1.6.2 Converts Skills to Cards and allows them to be used in Battle.
 * @url https://mythatelier.itch.io/card-game-combat
 * 
 * @============================================================================
 * Commands
 * ============================================================================
 * 
 * @command setCardBattle
 * @text Set Card Battle
 *
 *   @arg enabled
 *   @type bool
 *   @default true
 *   @desc If ON, battles will be card battles. If OFF, they'll be default battles.
 *
 * @command setCardBattle
 * @text Set Card Battle
 * @desc Determines if Card Battles are enabled.
 *
 *   @arg enabled
 *   @type boolean
 *   @default true
 *   @desc If ON, battles will be card battles. If OFF, they'll be default battles.
 *
 * @command setCardLibrary
 * @text Set Card Library
 * @desc Determines if the Card Library will show up in the player's menu.
 *
 *   @arg enabled
 *   @type boolean
 *   @default true
 *   @desc If ON, the Card Library will be available in the player's menu.
 *
 * @command openCardLibrary
 * @text Open Card Library
 * @desc Opens the Card Library.
 * 
 * @command ShowCard
 * @text Show Card
 *
 *     @arg skillID
 *     @type number
 *     @default 1
 *     @min 1
 *     @desc The skill ID of the card to be shown
 *
 *     @arg x
 *     @type number
 *     @default 0
 *     @min -100
 *     @desc The x coordinate of the card. Card image is centered on its coordinates.
 *
 *     @arg y
 *     @type number
 *     @default 0
 *     @min -100
 *     @desc The y coordinate of the card. Card image is centered on its coordinates.
 *
 *     @arg angle
 *     @type number
 *     @default 0
 *     @min -360
 *     @desc The angle in degrees of rotation for the card
 *
 *     @arg index
 *     @type number
 *     @default -1
 *     @min -1
 *     @desc Works just like Number when you Show Picture. If left at -1, it will find the next unused index.
 *
 * @command ShowCardFromVariable
 * @text Show Card from Variable
 *
 *     @arg gameVariable
 *     @text Game Variable
 *     @type variable
 *     @default 1
 *     @min 1
 *     @desc The Game Variable containing the Skill ID of the card to be shown.
 *
 *     @arg x
 *     @type number
 *     @default 0
 *     @min -100
 *     @desc The x coordinate of the card. Card image is centered on its coordinates.
 *
 *     @arg y
 *     @type number
 *     @default 0
 *     @min -100
 *     @desc The y coordinate of the card. Card image is centered on its coordinates.
 *
 *     @arg angle
 *     @type number
 *     @default 0
 *     @min -360
 *     @desc The angle in degrees of rotation for the card
 *
 *     @arg index
 *     @type number
 *     @default -1
 *     @min -1
 *     @desc Works just like Number when you Show Picture. If left at -1, it will find the next unused index.
 *
 * 
 * @command HideCardIndex
 * @text Hide Card by index
 *
 *     @arg index
 *     @type number
 *     @default 0
 *     @desc The index of the card to hide
 *
 * @command HideCardID
 * @text Hide Card by skill ID
 *
 *     @arg skillID
 *     @type number
 *     @default 1
 *     @min 1
 *     @desc The skill ID of the card to hide. If multiple cards of the same skill are on screen, the one with the highest index will be hidden.
 *
 * @command MoveCard
 * @text Move Card
 *
 *     @arg index
 *     @type number
 *     @default 0
 *     @min 0
 *     @desc The index of the card to move.
 *
 *     @arg x
 *     @type number
 *     @default 0
 *     @min -100
 *     @desc The x coordinate of the card to move to. Card image is centered on its coordinates.
 *
 *     @arg y
 *     @type number
 *     @default 0
 *     @min -100
 *     @desc The y coordinate of the card to move to. Card image is centered on its coordinates.
 *
 *
 * @command HideAllCards
 * @text Hide All Cards
 * 
 * 
 * ============================================================================
 * Parameters
 * ============================================================================
 * 
 * @param startOfBattleActions
 * @text Battle Start Actions
 * @desc A list of actions, separated by a new line, that happen at the start of the actor's first turn/beginning of battle.
 * @type note
 * @default "Shuffle Deck\nDraw 5"
 * 
 * @param startOfTurnActions
 * @text Turn Start Actions
 * @desc A list of actions, separated by a new line, that happen at the start of a player's 2nd turn onward.
 * @type note
 * @default "Discard Until 0\nDraw 5"
 * 
 * @param maxHandSize
 * @text Max Hand Size
 * @type number
 * @default -1
 * @min -1
 * @desc The maximum number of cards in hand before the actor cannot draw. Set to -1 for an infinite hand size.
 * 
 * 
 * @param Card Appearance
 * 
 *   @param cardNameCoordinates
 *   @text Card Name Coordinates
 *   @parent Card Appearance
 *   @type struct<Coordinate>
 *   @default {"x":"6","y":"-4"}
 *   @desc The Coordinates for the Card Name to start drawing on the card.
 *       
 *   @param costCoords
 *   @parent Card Appearance
 *   @text Skill Cost Coordinates
 *   @type struct<Coordinate>
 *   @default {"x":"170","y":"28"}
 *   @desc Where on the card the cost text will display.
 *   
 *   @param costWidth
 *   @parent costCoords
 *   @text Cost Width
 *   @type number
 *   @default 34
 *   @desc The width of Cost space, since Cost is right-aligned. This + X = the right-most side of the text.
 *        
 *   @param cardDescCoords
 *   @text Card Description Coordinates
 *   @parent Card Appearance
 *   @type struct<Coordinate>
 *   @default {"x":"4","y":"100"}
 *   @desc The coordinates that the card description will start drawing to on the card.
 *  
 *   @param cardHighlightSheet
 *   @text Highlight Sheet
 *   @parent Card Appearance
 *   @default CardHighlightSheet
 *   @desc The image sheet for Card Highlights, in img/CGC/highlights. 1st row is standard, 2nd row is discard, 3rd row is remove.
 *   
 *   @param removalAnimation
 *   @text Removal Animation
 *   @parent Card Appearance
 *   @type select
 *   @option Fade
 *   @option Burn
 *   @default Fade
 *   @desc The specific behavior the card will exhibit to show it being removed.
 *   
 *   @param smoothCards
 *   @text Smooth Scaling
 *   @parent Card Appearance
 *   @type boolean
 *   @default true
 *   @desc Whether scaling up/down cards will be smooth (ON) or pixelated (OFF).
 * 
 * @param buttonOrder
 * @text UI Order
 * @type string
 * @default Item Hand End
 * @desc Put the names of the buttons/zones in the order you want to access them from left to right. Default is 'Item Hand End'
 *
 * @param Zones
 * @text Zones
 * @parent buttonOrder
 *
 *   @param handZone
 *   @parent Zones
 *   @text Hand Zone
 *   @type struct<HandZone>
 *   @default {"coordinates":"{\"x\":\"408\",\"y\":\"554\"}","selectedCardYOff":"40","discardingCardYOff":"40","inactiveCardYOff":"40","maxHandWidth":"816","minCardSeparationW":"60","cardRotationMulti":"1.00","cardHeightMulti":"1.00","enterSFX":"","exitSFX":"","emptyActions":""}
 *   @desc The parameters of the Hand's appearance and behavior in battle.
 * 
 *   @param deckZone
 *   @parent Zones
 *   @text Deck Zone
 *   @type struct<Zone>
 *   @default {"name":"Deck","sheet":"","coordinates":"{\"x\":\"48\",\"y\":\"380\"}","cardScale":"0.5000","skew":"{\"x\":\"0.0000\",\"y\":\"0.0000\"}","cardRotation":"-15","amountFont":"24","amountCoordinates":"{\"x\":\"32\",\"y\":\"48\"}","showCards":"No","description":"\"Check contents of Card Deck\"","enterSFX":"","exitSFX":"","emptyActions":"\"Move all from discard to deck\\nshuffle deck\""}
 *   @desc The parameters of the Deck's appearance and behavior in battle. Do not change its name.
 *   
 *   @param discardZone
 *   @parent Zones
 *   @text Discard Zone
 *   @type struct<Zone>
 *   @default {"name":"Discard","sheet":"","coordinates":"{\"x\":\"752\",\"y\":\"380\"}","cardScale":"0.5000","skew":"{\"x\":\"0.0000\",\"y\":\"0.0000\"}","cardRotation":"15","amountFont":"24","amountCoordinates":"{\"x\":\"32\",\"y\":\"48\"}","showCards":"Behind image","description":"\"Check contents of Discard Pile\\nDo what must be done.\"","enterSFX":"","exitSFX":"","emptyActions":""}
 *   @desc The parameters of the Discard's appearance and behavior in battle. Do not change its name.
 * 
 * 
 *   @param extraZones
 *   @parent Zones
 *   @text Extra Zones
 *   @type struct<Zone>[]
 *   @desc You can add extra zones to the battle that cards can move to.
 *   
 *   
 *   @param tempZone
 *   @parent Zones
 *   @text Temp Zone
 *   @type struct<TempZone>
 *   @desc Where a card goes to while its effects are still being resolved. Not a real zone.
 *   @default {"coordinates":"{\"x\":\"664\",\"y\":\"380\"}","cardScale":"0.5000","skew":"{\"x\":\"0.0000\",\"y\":\"0.0000\"}","cardRotation":"15"}
 *   
 * @param Battle Buttons
 * @parent buttonOrder
 *
 *   @param endTurnButtonStruct
 *   @text End Turn Button
 *   @desc If the Button Order does not contain 'End' ignore this. The End Turn Button will not appear.
 *   @type struct<EndTurnButton>
 *   @parent Battle Buttons
 *   @default {"skillID":"2","endTurnSheet":"endTurnSheet","discardSheet":"endTurnDiscardSheet","coordinates":"{\"x\":\"760\",\"y\":\"580\"}","enabledCondition":"true"}
 *
 *   @param itemButtonStruct
 *   @text Item Button
 *   @desc If the Button Order does not contain 'Item' ignore this. The Item Button will not appear.
 *   @type struct<ItemButton>
 *   @parent Battle Buttons
 *   @default {"imageSheet":"itemSheet","coordinates":"{\"x\":\"760\",\"y\":\"500\"}","description":"Open the Item Menu","enabledCondition":"true"}
 *
 *   @param extraButtons
 *   @text Extra Buttons
 *   @type struct<Button>[]
 *   @parent Battle Buttons
 *   
 *   
 *   
 * @param changeBattleWindows
 * @text Change Battle Windows
 * @type boolean
 * @default true
 * @desc Set this to OFF if you have other plugins augmenting the battle status window and the actor command window.
 * 
 *   @param showHelpWindow
 *   @parent changeBattleWindows
 *   @text Show Help Window
 *   @type boolean
 *   @default true
 *   @desc You can turn off the help window for Skills if showing card descriptions. Help Window still appears for other things.
 *   
 *   @param skipPartyCommand
 *   @parent changeBattleWindows
 *   @text Skip Party Command Menu
 *   @type boolean
 *   @default true
 *   @desc If set to ON, the player will go straight to the Actor Command Window instead of starting with the Party Command.

 *   
 *   @param skipActorCommand
 *   @parent changeBattleWindows
 *   @text Skip Actor Command Menu
 *   @type boolean
 *   @default true
 *   @desc If set to ON, the player will go straight to card selection instead of starting with the Actor Command Window.
 *   
 *   @param statusWindowTop
 *   @parent changeBattleWindows
 *   @text Status Window At Top
 *   @type boolean
 *   @default true
 *   @desc If set to ON, the status window (and command window) will appear at the top of the scren, underneath the Help Window.
 *   
 *   @param displayStatusCardIcons
 *   @parent changeBattleWindows
 *   @text Display Card Icons
 *   @type boolean
 *   @default true
 *   @desc If set to ON, extra icons will appear on the Battle Status Window showing how many cards each actor has in each zone.
 *   
 *     @param handSizeIcon
 *     @parent displayStatusCardIcons
 *     @text Hand Icon Index
 *     @type number
 *     @default 1
 *     @desc The icon index of the icon representing the actor's hand.
 *     
 *     @param deckSizeIcon
 *     @parent displayStatusCardIcons
 *     @text Deck Icon Index
 *     @type number
 *     @default 2
 *     @desc The icon index of the icon representing the actor's deck.
 *     
 *     @param discardSizeIcon
 *     @parent displayStatusCardIcons
 *     @text Discard Icon Index
 *     @default 3
 *     @desc The icon index of the icon representing the actor's discard.
 *   
 *   
 * @param General Sounds
 * 
 *   @param addCardSFX
 *   @text Add Card SE
 *   @parent General Sounds
 *   @desc The SE that plays when a card is Added to a zone (when it's created)
 *   @type file
 *   @dir audio/se/
 *   @require 1
 *   
 *   @param removeCardSFX
 *   @text Remove Card SE
 *   @parent General Sounds
 *   @desc The SE that plays when a card is Removed from play
 *   @type file
 *   @dir audio/se/
 *   @require 1
 *   
 *   @param shuffleSFX
 *   @text Shuffle SE
 *   @parent General Sounds
 *   @desc The SE that plays when the Shuffle Deck Card Action is executed
 *   @type file
 *   @dir audio/se/
 *   @require 1
 *   
 * @param Card Selection Window
 * @desc The window that shows you cards from the deck/discard in battle.
 *   
 *   @param cardSelectionWindowskin
 *   @parent Card Selection Window
 *   @text Windowskin
 *   @desc The windowskin for the window that shows you cards.
 *   @type file
 *   @dir img/system
 *   @default Window
 *   @require 1
 *   
 *   
 *   @param cardSelectionY
 *   @parent Card Selection Window
 *   @text Window Y
 *   @desc The Y position for the window that shows cards. Set to -1 if you want the window centered vertically.
 *   @type number
 *   @default -1
 *   
 *   @param cardSelectionHeight
 *   @parent Card Selection Window
 *   @text Window Height
 *   @desc The Height of the window that shows cards.
 *   @type number
 *   @default 400
 *     
 * @param Card Library
 * 
 *   @param libraryMenuSetting
 *   @text Card Library in Menu
 *   @parent Card Library
 *   @type select
 *   @option Add to Menu
 *   @option Replace Skill Menu
 *   @option No Card Library in Menu
 *   @default Replace Skill Menu
 *   @desc Determines if Card Library is in the Menu. Can be overridden through plugin commands.
 *   
 *   @param cardLibraryMenuDesc
 *   @parent Card Library
 *   @text Card Library Menu Text
 *   @desc The text that displays when a Card Library option is added to the menu. Does not replace Skill Command Text.
 *   @default Cards
 *   
 *   @param simpleView
 *   @parent Card Library
 *   @text Simple View
 *   @desc If this is set to ON, each copy of the actor's card will appear separately.
 *   @type boolean
 *   @default false
 *   
 *   @param showMissingCards
 *   @parent Card Library
 *   @text Show Missing Cards in Library
 *   @desc If this is set to ON, missing cards will appear in the Library scene greyed out.
 *   @type boolean
 *   @default false
 *   
 *   @param showGapCards
 *   @parent Card Library
 *   @text Show Gap Cards in Library
 *   @desc If this is set to ON, cards missing between your lowest Skill ID and highest Skill ID cards will appear greyed out.
 *   @type boolean
 *   @default false
 *   
 *   @param showBlankCards
 *   @parent Card Library
 *   @text Show Cards With Blank Names in Library
 *   @desc If this is set to ON, cards with empty names will appear in the Skill scene.
 *   @type boolean
 *   @default false
 *
 *   @param displayOriginBadges
 *   @text Origin Badges
 *   @type boolean
 *   @default true
 *   @parent Card Library
 *   @desc Display images that appear on Cards in the Library that show whether Cards were gained by learning, equipment, or states.
 * 
 *      @param cardOriginCoords
 *      @text Badge Coordinates
 *      @parent displayOriginBadges
 *      @type struct<Coordinate>
 *      @desc Where on the Card for the Origin Badge to be drawn
 *      @default {"x":"170","y":"300"}
 *      
 *      @param learnedBadge
 *      @text Standard
 *      @parent displayOriginBadges
 *      @type file
 *      @dir img/system
 *      @desc The image that appears on Cards gained through conventional means. Leave blank to not use.
 *      @default learnedBadge
 *      
 *      @param equipBadge
 *      @text Equipped Card
 *      @parent displayOriginBadges
 *      @type file
 *      @dir img/system
 *      @desc The image that appears on Cards gained through equipment. Leave blank to not use.
 *      @default equipBadge
 *      
 *      @param stateBadge
 *      @text State Card
 *      @parent displayOriginBadges
 *      @type file
 *      @dir img/system
 *      @desc The image that appears on Cards gained through a state. Leave blank to not use.
 *      @default stateBadge
 *      
 *      
 *      
 *   
 * @help
 * 
 * ============================================================================
 * Notetag quick reference
 * ============================================================================
 * 
 * In Skills:
 * 
 * <Hide from card library>
 *     Makes the card not show up in the card library
 *     
 * <Card Art: file_name>
 *     Makes the card's card art the file of the given name.
 *     Art can be found in the art directory in the plugin parameters
 *     
 * <Card Base: file_name>
 *     Replaces the default card Base with the file of the given name.
 *     Bases can be found in the base directory in the plugin parameters
 *     
 * 
 *     
 * In Skills and Items:
 * 
 *     
 * Card Actions: 
 *     
 *     <Card Actions>
 *     action
 *     action
 *     </Card Actions>
 *     
 *     <Card Target Actions>
 *     action
 *     action
 *     </Card Target Actions
 *     
 *     <Card Passives>
 *     passive
 *     passive
 *     </Card Passives>
 *     
 * Actions:
 * 
 * Draw X
 *     Where X is a number, playing this card will make the actor draw X cards
 *
 * Draw Until X
 *     Where X is a number, will make the actor draw until their hand is size X
 *
 * Discard X
 *     Will make the actor discard X cards in order to play this
 *
 * Discard Until X
 *     Will make the actor discard until their hand size is X
 *     
 * Remove X
 * Remove Until X
 *     Works just like discarding, but will remove the selected cards from play
 *     
 * Add [skillID] to [zoneName]
 *      Adds a card directly to a zone. For example, "Add 7 to hand" will 
 *      create a card of Skill ID 7 in your Hand.
 *
 * Mill X
 *     Moves X cards from the deck directly to the discard
 *     
 * Search For X
 * Search For [skill name]
 *     Draws the Card of the specified Skill ID (x) or name, if it is in the 
 *     deck.
 *     
 * Move X from [zoneName] to [zoneName]
 *     This can take the place of Draw or Discard or Mill, but works with
 *     all zones.
 *     
 * Move all from [zoneName] to [zoneName]
 *     This will move all cards from one zone to another.
 * 
 * Wait X
 *     Causes Card Action execution to wait X frames before continuing, like a 
 *     Wait command in RPG Maker. Does not work in Start of Turn/Battle params.
 *     
 * Shuffle Deck
 *     Will shuffle the deck
 *    
 *    
 * Move this to [zoneName]
 *     Will move the card currently being used to the specified zone. If this
 *     is absenst the card will move to the discard at the end of all Card Actions.
 * 
 * Remove this
 *     Will remove the card currently being used from play.
 * 
 * Play SE [fileName]
 * Play SFX [fileName]
 *     Will play the specified sound file located in audio/se
 *    
 *    
 * Eval [expression]
 *     Will execute anything after the word "eval" as a piece of code.
 *    
 * If [expression]
 *     This will evaluate the expression, and if it's true, it will execute the
 *     next Card Action. If false, it will skip that action.
 *    
 * Label [labelName]
 *     This will define a label, which is important for the following Card Action.
 *    
 * Jump to [labelName]
 *     This will search for the label with the same name, and move to that label.
 *     If the label is after this Card Action, it will skip all Card Actions
 *     between the two. If the label is before this Card Action, it will execute
 *     the Card Actions between the two a second time.
 *     
 * Force Action [skillID]
 *     This will force the actor or target to execute the specified skill.
 *    
 * Passives:
 * 
 * Will End Turn
 *     This will cause the card to end the turn upon use.
 *     
 * Discard if unplayed
 *     Will discard this card if the turn ends while this card is in 
 *     the hand.
 *     
 * Remove if unplayed
 *     Will remove this card from play if the turn ends while this card is in 
 *     the hand.
 *     
 * Start in [zoneName]
 *     Will be in the specified zone at start of battle, before start-of-battle 
 *     actions.
 *     
 * Require [expression]
 *     Cannot be played unless the expression evaluates to true. Multiple 
 *     requirements can be placed. Use the word 'user' to refer to the user of 
 *     the card.
 *     
 *     ex:
 *     
 *     Require user.handSize > 2
 *     Require user.handSize < 10
 *     Require $gameSwitches.value(3)
 *     
 *     This will make a card playable only if the user's hand contains more 
 *     than 2 and less than 10 cards. In addition, can only be played if Game 
 *     Switch 3 is set to ON.
 *
 * Start of Turn: Skill X
 *      At the Start of Turn, if this Card is in Hand, execute Skill ID X.
 *
 * End of Turn: Skill X
 *      At the end of Turn, if this Card is in Hand, execute Skill ID X.
 *      
 * Enter [zoneName]: Skill X
 *      When this Card enters the specified zone, execute Skill ID X.
 *      
 * Exit [zoneName]: Skill X
 *      When this Card exits the specified zone, execute Skill ID X.
 * 
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * 
 * DisableCardBattle - returns the game to non-card combat.
 * EnableCardBattle - returns the game to card combat.
 * These commands must be called outside of battle.
 * 
 * EnableCardLibrary - adds the Card Library option to the menu.
 * DisableCardLibrary - removes the Card Library option from the menu.
 * 
 * OpenCardLibrary - opens the Card Library scene directly. 
 * 
 * 
 * ShowCard [ID] [x] [y] [angle] [index]
 * 
 * Displays the specified card on screen.
 * Replace the brackets with their respective fields. Index works just like
 * the Number when you Show Picture.
 *
 * If Index is omitted, it will just find a new index and create a new card.
 * If angle is omitted, the angle will be 0.
 *
 * HideCardID [ID]
 *
 * This un-shows the card with the specified skill ID. If two or more cards
 * have the same ID, it will hide the most recently added card.
 *
 * HideCardIndex [index]
 *
 * This hides the card at the specified index.
 *
 * HideAllCards
 *
 * This will hide all cards.
 *
 * MoveCard [index] [x] [y]
 *
 * This moves the card of the specified index to the specified x and y
 * coordinates.
 *
 *
 *
 * Note: Instead of raw numbers for all parameters except index, you
 * can also use \V[x] to input a Game Variable.
 *
 * Ex:
 *     ShowCard \V[4] \V[5] \V[6] \V[7] 0
 * This shows a card whose ID is stored in Game Variable 4, at coordinates
 * stored in variables 5-6, at an angle stored in Varaible 7, and sets
 * its index to 0, replacing the card that was at that index.
 * 
 * 
 * ============================================================================
 * For more information and other features please use the wiki
 * that has been made for this and all related plugins:
 * http://card-game-combat-help.alwaysdata.net/
 * ============================================================================
 * 
 *
 * ============================================================================
 * Version History
 * ============================================================================
 * 
 * v1.6.2 - Consolidated ShowCard into the Core Engine.
 *          Removed several duplicate parameters that are present in Text 
 *          Format Plus.
 *          Cost X coordinate is now left-aligned. Added Cost Width param to
 *          compensate.
 *          Replaced Highlight Sprite with Highlight Sheet, which now includes
 *          a Remove variant.
 *          Added Remove variant of the End Turn Button
 *          Moved button images to img/CGC/buttons
 *          Moved highlight images to img/CGC/highlights
 *          Added Origin Badges to the Card Library which display where a Card
 *          came from.
 *          Added a few other parameters to determine which Cards are shown in
 *          the Library.
 *          Cards of different Origins now appear separately in the Library
 *          Default Card is now preloaded on boot, almost all card-based 
 *          calculations are now based on this image.
 *          Amount Text in Libraries is now handled by a new class 
 *          Window_CardAmount, which offers more flexibility.
 *          Card Sprite hitboxes have been fixed and now scale with the
 *          image's scale.
 *          Zone Sprites no longer create Card Highlights that go unused.
 *          Fixed math error in Hand positioning that makes cards improperly
 *          centered.
 *          New parameter Skip Party Command allows you to skip the Party
 *          Command Window
 *          Fixed bug where End of Turn: Skill X triggers twice
 *          Fixed bug where Start of Turn: Skill X wouldn't trigger properly.
 *          Skills Learned during battle now stay in the Actor's Library.
 *          Fixed bug where Actor could "forget" Cards gained through
 *          equipment or states.
 *          Library Scene has been revamped entirely. Lots of UI improvements.
 *          The Scrollbar is now in every Library-type scene.
 *          Fixed bug where Card Sprites wouldn't spawn in Library if Card
 *          Battle was disabled.
 *          Fixed crash when failing to flee from a battle using the Party Window
 *          before the opening hand has been drawn.
 *          Lots of backend refactoring.
 *          Better error handling and conveyance to the user.
 *          Behavior specific to Window_BattleSkill has been removed from
 *          Window_SkillList
 *          Cards are now added to a CardLayer object which inherits behavior
 *          from WindowLayer.
 *          Card Highlight sprites are now a new class Sprite_CardHighlight
 *          instead of just basic Sprite objects. Trust me, the code is
 *          cleaner now.
 *          CoreEngine is now over 10,000 lines. 
 *          
 * 
 * 
 * v1.6.1 - Added Skip Party Command Menu plugin parameter.
 *          Simple View in the Card Library will now show Var values when using
 *          MYTH_CGC_IndependentCardVariables.
 *          Fixed bug where Zone names weren't properly case-sensitive.
 *          Fixed bug with YEP_BattleEngineCore that would break card forced
 *          actions.
 *          Fixed bug with card forced actions that would sometimes discard
 *          a card on execution.
 *          Fixed bug where card forced actions would interrupt empty zone
 *          actions.
 *          Fixed Jump Card Action not working within Card Target Actions
 *          Fixed MZ touch input crash when hovering over zone sprites.
 *          Fixed MZ plugin commands not working.
 *          Fixed crash if skills force actions when no target is available.
 *          Fixed MZ bug where status windows would fail to appear/disappear
 *          when navigating item selection in battle.
 *          Fixed MV touch input bug where zone images' hitboxes would be based
 *          on the entire sheet instead of just the visible sprite.
 *          Added MV compatibility with SDJB_MouseHover and TDDP_MouseSystemEx
 *          Fixed bug with YEP_X_BattleSysSTB that would cause actors to
 *          repeat their Start of Turn Card Actions.
 *          Extra error handling for improved compatibility with other plugins
 * 
 * v1.6.0 - Zone params are now structs.
 *          Added custom zones.
 *          Will End Turn is now a Card Passive
 *          Remove this is now a Card Action
 *          New Card Action: Move this to [zoneName], moves the currently used
 *          card to the specified zone.
 *          Resolving used cards has been changed. Card is now removed from
 *          hand, its effects play, and then it is moved to the discard. Use
 *          "Move this" CA to move the card early.
 *          Deck and Discard sprites now take sheets instead of individual 
 *          images. Custom zones as well.
 *          Cards getting put into the discard from the hand and then
 *          reshuffled into the deck will now travel directly to the deck
 *          from the hand instead of appearing as duplicates.
 *          New CAs parameter for when a zone is empty, replacing the 
 *          automatic reshuffle. These CAs are executed when the zone is
 *          emptied, and again at the end of the action if the zone is
 *          still empty.
 *          End Turn Button and Item Button params are now structs.
 *          IsiahCGCCardSelection and IsiahCGCConditionalCardActions have been
 *          consolidated into the main plugin. Parameters have been moved
 *          and added as necessary.
 *          IsiahCGCExtraButtons has been consolidated into the main plugin.
 *          Lots and lots of parameter changes.
 *          New Card Action: Play SE [soundName]
 *          Zones have Sound Effects parameters for when a card enters/exits.
 *          New parameters for several other SEs.
 *          New parameter for smooth scaling.
 *          Skip Actor Command Menu parameter now plays nice with PartyUI_TypeA
 *          Removed a lot of case sensitivity for various things
 *          Fixed touch input bug in MZ when scrolling through the library
 *          where the vertical scrolling way too sensitive.
 *          Fixed bug that prevented turn from ending properly after forced
 *          actions.
 *          Fixed bug that would break text color changing on cards in MZ.
 *          Fixed touch input bug in MZ with extra buttons.
 *          Backend Refactoring.
 *          Removed legacy functions
 *          Renamed from IsiahCardGameCombat to MYTH_CGC_CoreEngine
 * 
 * 
 * Full version history is available on the wiki.
*/

/*~struct~EndTurnButton:
 * @param skillID
 * @text End Turn Skill ID
 * @type skill
 * @default 2
 * @desc The skill that is executed when you press the End Turn button
 *
 * @param endTurnSheet
 * @text End Turn Image Sheet
 * @desc The image sheet for the End Turn button, in img/CGC/buttons.
 * 
 * @param discardSheet
 * @text Discard Image Sheet
 * @desc The image sheet for the Discard state of the button, in img/CGC/buttons.
 * 
 * @param removeSheet
 * @text Remove Image Sheet
 * @desc The image sheet for the Remove state of the button, in img/CGC/buttons.
 * 
 * @param coordinates
 * @text Coordinates
 * @type struct<Coordinate>
 * @desc The coordinates for the button to be on the screen
 * @default {"x":"760","y":"580"}
 * 
 * @param enabledCondition
 * @text Use Condition
 * @type text
 * @default true
 * @desc The expression that must evaluate to true for the button to be used.
 * 
 */

/*~struct~ItemButton:
 *
 * @param imageSheet
 * @text Sprite Sheet
 * @desc The image sheet for the Item button, in img/CGC/buttons.
 * 
 * @param coordinates
 * @text Coordinates
 * @type struct<Coordinate>
 * @desc The coordinates for the button to be on the screen
 * @default {"x":"760","y":"500"}
 * 
 * @param description
 * @text Description
 * @type text
 * @desc The text that appears on the help window when the Item button is highlighted.
 * @default Open the Item Menu
 *
 * @param enabledCondition
 * @text Use Condition
 * @type text
 * @default true
 * @desc The expression that must evaluate to true for the button to be used.
 *
 */

/*~struct~Button:
 * @param name
 * @text Name
 * @type text
 * @desc The name of the button
 *
 * @param sheet
 * @text Image Sheet
 * @desc The image sheet for the button, in img/CGC/buttons. Enabled image at left, disabled in center, and highlight at right.
 * 
 * @param coordinates
 * @text Coordinates
 * @type struct<Coordinate>
 * @desc The coordinates for the button to be on the screen
 *
 * @param skillId
 * @text Skill ID
 * @type number
 * @desc The Skill that executes when this button is used.
 *
 * @param enabledCondition
 * @text Use Condition
 * @type text
 * @desc The expression that must evaluate to true for the button to be used
 * @default $gameParty.canUse(skill)
 *
 * @param appearCondition
 * @text Appear Condition
 * @type text
 * @desc The expression that must evaluate to true for the button to appear in battle at all. Only evaluates at start.
 * @default true
 *
 * @param disableDuringNonInput
 * @text Disable During Non-Input
 * @type boolean
 * @default true
 * @desc Check the Help section for an explanation
 */

/*~struct~Zone:
 * @param name
 * @text Name
 * @type text
 * @desc The name of the zone. Case insensitive
 *
 * @param sheet
 * @text Image Sheet
 * @type file
 * @dir img/system
 * @require 1
 * @desc The image sheet for the zone's appearance. Place enabled image at left, and highlight at right.
 *
 * @param coordinates
 * @text Zone Coordinates
 * @type struct<Coordinate>
 * @desc Where on screen the zone will be
 *
 * @param cardScale
 * @text Card Scale
 * @type number
 * @decimals 4
 * @desc The scale cards will become as they move to this zone.
 * @default 0.5
 * 
 * @param skew
 * @text Skew
 * @type struct<Point>
 * @desc Use this to simulate isometric 3D rotation
 * @default {"x":"0.0000","y":"0.0000"}
 * 
 * @param cardRotation
 * @text Card Rotation
 * @type number
 * @min -360
 * @desc The rotation cards will have when they arrive at this zone.
 * @default 0
 *
 * @param amountFont
 * @text Font Size
 * @type number
 * @default 24
 * @desc The font size of the text showing the amount of cards in this zone.
 * 
 * @param amountCoordinates
 * @text Amount Text Coordinates
 * @type struct<Coordinate>
 * @desc Where on the zone the amount text will display. Right-justified (higher X -> farther left)
 * @default {"x":"32","y":"48"}
 * 
 * @param showCards
 * @text Show cards?
 * @type select
 * @option No
 * @option Behind image
 * @option In front
 * @//option Spread
 * @default No
 * @desc How to display cards in this zone.
 * 
 * @param description
 * @text Highlight Description
 * @type note
 * @desc What the Help Window will say when this zone is highlighted in battle.
 * 
 * @param enterSFX
 * @text Card Enter SFX
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc The SE that will play when a card enters this zone
 * 
 * @param exitSFX
 * @text Card Exit SFX
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc The SE that will play when a card exits this zone
 * 
 * @param emptyActions
 * @text Card Actions on Empty
 * @type note
 * @desc A list of Card Actions that trigger when the final card is removed from this zone.
 * 
 * @//param emptyActionExecution
 * @//text Card Actions on Empty Trigger
 * @//type select
 * @//option Before and After Moving Cards from This Zone
 * @//option After Moving + End of Action
 * @//default Before and After Moving Cards from This Zone
 * @//desc Determines when the Card Actions on Empty trigger. End of Action triggers them ASAP if still empty after moving.
 */

/*~struct~TempZone:
 * 
 * @param coordinates
 * @text Zone Coordinates
 * @type struct<Coordinate>
 * @desc Where on screen the card will move to while waiting to resolve
 *
 * @param cardScale
 * @text Card Scale
 * @type number
 * @decimals 4
 * @desc The scale cards will become as they move to this zone.
 * @default 0.5
 * 
 * @param skew
 * @text Skew
 * @type struct<Point>
 * @desc Use this to simulate isometric 3D rotation
 * @default {"x":"0.0000","y":"0.0000"}
 * 
 *
 * @param cardRotation
 * @text Card Rotation
 * @type number
 * @min -360
 * @desc The rotation cards will have when they arrive at this zone.
 * @default 0
 */

/*~struct~HandZone:
 *
 * @param coordinates
 * @text Center Coordinates
 * @type struct<Coordinate>
 * @desc Where on screen the center of the hand will be. Generally recommended to be the bottom center of the screen.
 * @default {"x":"408","y":"554"}
 * 
 * @param selectedCardYOff
 * @text Selected Card Y Offset
 * @type number
 * @default 40
 * @desc The number of pixels the currently selected card will raise above the rest of the hand
 *
 * @param discardingCardYOff
 * @text Discarding Card Y Offset
 * @type number
 * @default 40
 * @desc The number of pixels a card will be raised if it is chosen to be discarded.
 *
 * @param inactiveCardYOff
 * @text Inactive Hand Y Offset
 * @type number
 * @default 40
 * @desc The number of pixels all cards will be lowered if the player cannot currently select cards.
 *
 * @param maxHandWidth
 * @text Max Hand Width
 * @type number
 * @default 816
 * @desc The max horizontal space the hand can take up.
 *
 * @param minCardSeparationW
 * @text Min Card Separation W
 * @type number
 * @default 60
 * @desc The minimum space in pixels between cards until the max width would otherwise be reached.
 *
 * @param cardRotationMulti
 * @text Card Rotation Multiplier
 * @type number
 * @decimals 2
 * @min -100
 * @default 1.00
 * @desc The amount a card will rotate based on how far it is from the center of the hand.
 *
 * @param cardHeightMulti
 * @text Card Height Multiplier
 * @type number
 * @decimals 2
 * @min -100
 * @default 1.00
 * @desc Card height changes depending on their distance from the center of the hand. This adds a multiplier to that value.
 *
 *
 * @param enterSFX
 * @text Card Enter SFX
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc The SE that will play when a card enters this zone
 *
 * @param exitSFX
 * @text Card Exit SFX
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc The SE that will play when a card exits this zone
 *
 * @param emptyActions
 * @text Card Actions on Empty
 * @type note
 * @desc A list of Card Actions that happen when the final card is removed from the Hand.
 * @default ""
 * 
 * @param emptyActionExecution
 * @text Card Actions on Empty Trigger
 * @type select
 * @option On Empty + Draw
 * @option On Empty + End of Action
 * @default On Empty + Draw
 * @desc Determines when the Card Actions on Empty trigger. Draw means when CAs try to move cards from this zone while empty.
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

/*~struct~Point:
 * @param x
 * @text X
 * @type number
 * @min -100
 * @default 1
 * @decimals 4
 *
 * @param y
 * @text Y
 * @type number
 * @min -100
 * @default 1
 * @decimals 4
 *
 */

var Myth = Myth || {};
Myth.CGC = Myth.CGC || {};
Myth.CGC.version = 1.6;
Myth.CGC.minorVersion = 2;

//for safety
var Isiah = Isiah || {};
Isiah.CGC = Myth.CGC;

//=============================================================================
// Myth.Util
//=============================================================================
// #region Myth.Util

Myth.Util = Myth.Util || {};
Myth.Util.usingMZ = (Utils.RPGMAKER_NAME == "MZ");
Myth.Util.spritePrototype = Myth.Util.usingMZ ? Sprite_Clickable : Sprite_Base;

Myth.Util.castMembersToNumber = function (object)
{
	for (var property in object)
	{
		var value = object[property];
		if (!isNaN(Number(value)))
			object[property] = Number(value);
		else if (typeof value == 'string')
		{
			try
			{
				object[property] = JSON.parse(value)
				Myth.Util.castMembersToNumber(object[property]);
			}
			catch (e) { };

		}
		else
		{
			try
			{
				Myth.Util.castMembersToNumber(object[property]);
			}
			catch (e) { };
		}
	}
}

Myth.Util.tryParse = function (jsonString, defaultValue, pluginName)
{
	var value = defaultValue;
	if (jsonString && jsonString != "")
		value = JSON.parse(jsonString);
	else
		console.warn("Unassigned parameter in " + pluginName + ". Setting the default value of " + defaultValue + ".");
	return value;
}

Myth.Util.shuffleArray = function (array)
{
	let currentIndex = array.length, randomIndex;

	while (currentIndex != 0)
	{
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
};


// Takes an array of numbers, or an array of objects with a 'weight' data member
// and returns a weighted random index of that array.
Myth.Util.weightedRandomIndex = function (array)
{
	var weights = [];
	if (typeof array[0] === 'number')
		weights = array;
	else if (array[0].weight != undefined)
	{
		for (var i = 0; i < array.length; i++)
		{
			weights[i] = array[i].weight;
		}
	}
	var total = 0;
	weights.forEach(weight =>
	{
		total += weight;
	});

	const random = Math.ceil(Math.random() * total);
	var cursor = 0;
	for (var i = 0; i < weights.length; i++)
	{
		cursor += weights[i];
		if (cursor >= random)
		{
			return i;
		}
	}
}

Myth.Util.createOutline = function (width, height, thickness)
{
	thickness = thickness || 1;
	var outline = new Bitmap(width, height);
	var sw = width;
	var sh = height;
	outline.fillRect(0, 0, sw, thickness, 'white');
	outline.fillRect(0, sh - thickness, sw, thickness, 'white');
	outline.fillRect(0, 0, thickness, sh, 'white');
	outline.fillRect(sw - thickness, 0, thickness, sh, 'white');

	return outline;
};

Myth.Util.findSkillbyName = function (name)
{
	for (var i = 0; i < $dataSkills.length; i++)
	{
		var skill = $dataSkills[i];
		if (!skill) continue;
		if (skill.name == name)
			return skill;
	}

	return null;
}

Myth.Util.getZoneDataByName = function (name)
{
	name = name.toLowerCase();
	if (name == 'deck')
		return Myth.CGC.zoneInfo.deck;
	else if (name == 'discard')
		return Myth.CGC.zoneInfo.discard;
	else if (name == 'hand')
		return Myth.CGC.zoneInfo.hand;
	for (var i = 0; i < Myth.CGC.zoneInfo.extra.length; i++)
	{
		var zone = Myth.CGC.zoneInfo.extra[i];
		if (zone.name.toLowerCase() == name)
			return zone;
	}

	return Myth.CGC.zoneInfo.nullZone;
}

Myth.Util.getInterpreter = function ()
{
	if (SceneManager._scene instanceof Scene_Battle)
		return $gameTroop._interpreter;
	else if (SceneManager._scene instanceof Scene_Map)
		return $gameMap._interpreter;

	return null;
}

// #endregion

var Imported = Imported || {};
Imported.IsiahCGC = true;
Imported.MythCGC = true;

//=============================================================================
// Plugin Parameters
//=============================================================================
// #region Plugin Parameters

Myth.Parameters = PluginManager.parameters('MYTH_CGC_CoreEngine');

Myth.CGC.cardDesignDirectory = "CGC/bases";
Myth.CGC.cardDirectory = "CGC/art";

Myth.CGC.useOldCardUseSystem = false;

Myth.CGC.images = {
	cardDeckSheet: Myth.Parameters.deckSheet,
	cardDiscardSheet: Myth.Parameters.discardSheet,

	cardHighlightSheet: Myth.Parameters.cardHighlightSheet,
};

Myth.CGC.images.originBadges = {
	learned: Myth.Parameters.learnedBadge,
	equip: Myth.Parameters.equipBadge,
	state: Myth.Parameters.stateBadge,
}

Myth.CGC.buttonInfo = {
	endTurn: JSON.parse(Myth.Parameters.endTurnButtonStruct),
	itemButton: JSON.parse(Myth.Parameters.itemButtonStruct),
	extra: Myth.Parameters.extraButtons
}
if (Myth.CGC.buttonInfo.extra)
{
	Myth.CGC.buttonInfo.extra = JSON.parse(Myth.CGC.buttonInfo.extra);
	if (Myth.CGC.buttonInfo.extra)
	{
		var len = Myth.CGC.buttonInfo.extra.length;
		for (var i = 0; i < len; i++)
		{
			Myth.CGC.buttonInfo.extra[i] = JSON.parse(Myth.CGC.buttonInfo.extra[i]);
			Myth.Util.castMembersToNumber(Myth.CGC.buttonInfo.extra[i]);
		}
	}
}

Myth.Util.castMembersToNumber(Myth.CGC.buttonInfo.endTurn);
Myth.Util.castMembersToNumber(Myth.CGC.buttonInfo.itemButton);

Myth.Util.getEmptyActionExecution = function (dataZone)
{
	return 2;

	if (dataZone.emptyActionExecution == "Before and After Moving Cards from This Zone")
		return 1;
	if (dataZone.emptyActionExecution == "After Moving + End of Action")
		return 2;
	return 0;
}

//*********************************************************************
// Zone Info
//********************************************************************
Myth.CGC.zoneInfo = {
	hand: JSON.parse(Myth.Parameters.handZone),
	deck: JSON.parse(Myth.Parameters.deckZone),
	discard: JSON.parse(Myth.Parameters.discardZone),
	extra: Myth.Parameters.extraZones,
	tempZone: JSON.parse(Myth.Parameters.tempZone)
}
if (Myth.CGC.zoneInfo.extra)
{
	Myth.CGC.zoneInfo.extra = JSON.parse(Myth.CGC.zoneInfo.extra);
	if (Myth.CGC.zoneInfo.extra)
	{
		var len = Myth.CGC.zoneInfo.extra.length;
		for (var i = 0; i < len; i++)
		{
			Myth.CGC.zoneInfo.extra[i] = JSON.parse(Myth.CGC.zoneInfo.extra[i]);
			Myth.Util.castMembersToNumber(Myth.CGC.zoneInfo.extra[i]);
		}
	}
}
Myth.Util.castMembersToNumber(Myth.CGC.zoneInfo.hand);
Myth.Util.castMembersToNumber(Myth.CGC.zoneInfo.deck);
Myth.Util.castMembersToNumber(Myth.CGC.zoneInfo.discard);
Myth.Util.castMembersToNumber(Myth.CGC.zoneInfo.tempZone);

Myth.CGC.zoneInfo.nullZone = {
	name: "$default",
	sheet: "",
	coordinates: {x: -1, y :0},
	cardScale: 0.01,
	cardRotation: 0,
	showCards: "No",
	description: "If you are reading this something went wrong."
}
Myth.CGC.zoneInfo.hand.name = "hand";
Myth.CGC.zoneInfo.hand.showCards = "Spread";



try
{
	Myth.CGC.startOfBattleActions = JSON.parse(Myth.Parameters.startOfBattleActions);
	Myth.CGC.startOfTurnActions = JSON.parse(Myth.Parameters.startOfTurnActions);
}
catch (e)
{
	console.warn("IsiahCardGameCombat v1.5.5 changed how the Start of Battle Actions and Start of Turn Actions plugin parameters work. Your current parameters will still work, but it is recommended you redo them using multiple lines instead of commas.")
	Myth.CGC.startOfBattleActions = Myth.Parameters.startOfBattleActions;
	Myth.CGC.startOfBattleActions = Myth.CGC.startOfBattleActions.replace(/,/g, "\n");
	Myth.CGC.startOfTurnActions = Myth.Parameters.startOfTurnActions;
	Myth.CGC.startOfTurnActions = Myth.CGC.startOfTurnActions.replace(/,/g, "\n");
}



Myth.CGC.coordinates = {
	cardNameCoords: JSON.parse(Myth.Parameters.cardNameCoordinates),
	skillCostCoords: JSON.parse(Myth.Parameters.costCoords),
	costWidth: Number(Myth.Parameters.costWidth),
	cardDescCoords: JSON.parse(Myth.Parameters.cardDescCoords),
	cardOriginCoords: JSON.parse(Myth.Parameters.cardOriginCoords),
	displayOriginBadges: JSON.parse(Myth.Parameters.displayOriginBadges),
	cardDescIconY: 4,

	cardSelectionY: Number(Myth.Parameters.cardSelectionY),
	cardSelectionHeight: Number(Myth.Parameters.cardSelectionHeight),
}

Myth.Util.castMembersToNumber(Myth.CGC.coordinates);

Myth.CGC.cardSelectionWindowskin = Myth.Parameters.cardSelectionWindowskin;

// #region TextFormatPlus numbers
// These magic numbers are overridden by TextFormatPlus

Myth.CGC.fontSizes = {
	cardName: 22,
	cardDesc: 16,
	cardCost: 24,
	cardType: 18,

	iconSize: 16//Number(Myth.Parameters.iconSize),
}

Myth.CGC.fontFaces = {
	cardName: "GameFont",
	cardDesc: "GameFont",
	cardType: "GameFont",
	cardCost: "GameFont"
}

Myth.CGC.textWidths = {
	cardName: 0,
	cardDesc: 192,
	cardType: 0,
	cardCost: 0
}

Myth.CGC.cardDisplayComponents = {
	cardName: true,
	cardDesc: true,
	cardType: true,
	cardCost: true
}

// #endregion

Myth.CGC.statusIcons = {
	handSize: Number(Myth.Parameters.handSizeIcon),
	deckSize: Number(Myth.Parameters.deckSizeIcon),
	discardSize: Number(Myth.Parameters.discardSizeIcon)
}

Myth.CGC.addLearnedSkillToDeck = true;

Myth.CGC.simpleDeckView = JSON.parse(Myth.Parameters.simpleView);
Myth.CGC.showMissingCardsInLibrary = JSON.parse(Myth.Parameters.showMissingCards);
Myth.CGC.showGapCardsInLibrary = JSON.parse(Myth.Parameters.showGapCards);
Myth.CGC.showBlankCardsInLibrary = JSON.parse(Myth.Parameters.showBlankCards);

Myth.CGC.changeBattleWindows = JSON.parse(Myth.Parameters.changeBattleWindows);
Myth.CGC.showHelpWindow = JSON.parse(Myth.Parameters.showHelpWindow);
Myth.CGC.showHelpWindowInSkillScene = true; //changes in Library Plus
Myth.CGC.statusWindowAtTop = JSON.parse(Myth.Parameters.statusWindowTop);
Myth.CGC.skipPartyCommand = JSON.parse(Myth.Parameters.skipPartyCommand);
Myth.CGC.skipActorCommand = JSON.parse(Myth.Parameters.skipActorCommand);
Myth.CGC.drawCardZones = true;
Myth.CGC.battleStatusZoneInfo = true;

Myth.CGC.buttonOrder = Myth.Parameters.buttonOrder;
Myth.CGC.buttonOrder = Myth.CGC.buttonOrder.toLowerCase().split(' ');

Myth.CGC.showEndTurn = Myth.CGC.buttonOrder.includes("end");
Myth.CGC.showItemButton = Myth.CGC.buttonOrder.includes("item");

Myth.CGC.maxHandSize = Number(Myth.Parameters.maxHandSize);


Myth.CGC.removeMode = Myth.Parameters.removalAnimation;
Myth.CGC.smoothCards = JSON.parse(Myth.Parameters.smoothCards);

Myth.CGC.displayStatusCardIcons = JSON.parse(Myth.Parameters.displayStatusCardIcons);


Myth.CGC.cardLibraryMenuDesc = Myth.Parameters.cardLibraryMenuDesc;


Myth.CGC.addCardSFX = Myth.Parameters.addCardSFX;
Myth.CGC.removeCardSFX = Myth.Parameters.removeCardSFX;
Myth.CGC.shuffleSFX = Myth.Parameters.shuffleSFX;

Myth.CGC.getIDsOfType = function (type)
{

}


//Plugin Commands change these
Myth.CGC.libraryMenuSetting = Myth.Parameters.libraryMenuSetting;

// #endregion


//=============================================================================
// Plugin Commands
//=============================================================================
// #region Plugin Commands


Myth.CGC.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args)
{
	Myth.CGC.Game_Interpreter_pluginCommand.call(this, command, args);
	command = command.toLowerCase();
	if (command == 'enablecardbattle') $gameSystem.setCardBattle(true);
	if (command == 'disablecardbattle') $gameSystem.setCardBattle(false);
	if (command == 'enablecardlibrary') $gameSystem.setShowCardLibrary(true);
	if (command == 'disablecardlibrary') $gameSystem.setShowCardLibrary(false);
	if (command == 'opencardlibrary') SceneManager.push(Scene_CardLibrary);

	if (command == "showcard")
	{
		var sid = args[0].replace(/\\/g, '\x1b');
		sid = sid.replace(/\x1b\x1b/g, '\\');
		sid = sid.replace(/\x1bV\[(\d+)\]/gi, function ()
		{
			return $gameVariables.value(parseInt(arguments[1]));
		}.bind(this));
		var skillId = Number(sid);

		var xx = args[1].replace(/\\/g, '\x1b');
		xx = xx.replace(/\x1b\x1b/g, '\\');
		xx = xx.replace(/\x1bV\[(\d+)\]/gi, function ()
		{
			return $gameVariables.value(parseInt(arguments[1]));
		}.bind(this));
		var x = Number(xx);

		var yy = args[2].replace(/\\/g, '\x1b');
		yy = yy.replace(/\x1b\x1b/g, '\\');
		yy = yy.replace(/\x1bV\[(\d+)\]/gi, function ()
		{
			return $gameVariables.value(parseInt(arguments[1]));
		}.bind(this));
		var y = Number(yy);
		if (args.length > 3)
			var angle = Number(args[3]);

		if (args.length > 4)
			var index = Number(args[4]);

		this.showCard(skillId, x, y, angle, index);
	}
	else if (command == "hidecardid")
	{
		var sid = args[0].replace(/\\/g, '\x1b');
		sid = sid.replace(/\x1b\x1b/g, '\\');
		sid = sid.replace(/\x1bV\[(\d+)\]/gi, function ()
		{
			return $gameVariables.value(parseInt(arguments[1]));
		}.bind(this));
		var skillId = Number(sid);
		this.hideCard(skillId);
	}
	else if (command == "hidecardindex")
	{
		var index = Number(args[0]);
		this.hideCardByIndex(index);
	}
	else if (command == "hideallcards")
	{
		this.hideAllCards();
	}
	else if (command == "movecard")
	{
		var index = Number(args[0]);

		var xx = args[1].replace(/\\/g, '\x1b');
		xx = xx.replace(/\x1b\x1b/g, '\\');
		xx = xx.replace(/\x1bV\[(\d+)\]/gi, function ()
		{
			return $gameVariables.value(parseInt(arguments[1]));
		}.bind(this));
		var x = Number(xx);

		var yy = args[2].replace(/\\/g, '\x1b');
		yy = yy.replace(/\x1b\x1b/g, '\\');
		yy = yy.replace(/\x1bV\[(\d+)\]/gi, function ()
		{
			return $gameVariables.value(parseInt(arguments[1]));
		}.bind(this));
		var y = Number(yy);
		this.moveCard(index, x, y);
	}
};

if (Myth.Util.usingMZ)
{
	PluginManager.registerCommand("MYTH_CGC_CoreEngine", "setCardBattle", args =>
	{
		const arg0 = JSON.parse(args.enabled);
		$gameSystem.setCardBattle(arg0);
	});

	PluginManager.registerCommand("MYTH_CGC_CoreEngine", "setCardLibrary", args =>
	{
		const arg0 = JSON.parse(args.enabled);
		$gameSystem.setShowCardLibrary(arg0);
	});

	PluginManager.registerCommand("MYTH_CGC_CoreEngine", "openCardLibrary", args =>
	{
		SceneManager.push(Scene_CardLibrary);
	});

	PluginManager.registerCommand("MYTH_CGC_CoreEngine", "ShowCard", args =>
	{
		var interpreter = Myth.Util.getInterpreter();
		if (!interpreter) return;
		var skillId = Number(args.skillID);
		var x = Number(args.x);
		var y = Number(args.y);
		var angle = Number(args.angle);
		var index = Number(args.index);
		if (index == -1)
			index = undefined;
		interpreter.showCard(skillId, x, y, angle, index);
	});

	PluginManager.registerCommand("MYTH_CGC_CoreEngine", "ShowCardFromVariable", args =>
	{
		var interpreter = Myth.Util.getInterpreter();
		if (!interpreter) return;
		var gameVariable = Number(args.gameVariable);
		var skillId = $gameVariables.value(gameVariable);
		var x = Number(args.x);
		var y = Number(args.y);
		var angle = Number(args.angle);
		var index = Number(args.index);
		if (index == -1)
			index = undefined;
		interpreter.showCard(skillId, x, y, angle, index);
	});

	PluginManager.registerCommand("MYTH_CGC_CoreEngine", "HideCardIndex", args =>
	{
		var interpreter = Myth.Util.getInterpreter();
		if (!interpreter) return;
		var index = Number(args.index);
		interpreter.hideCardByIndex(index);
	});

	PluginManager.registerCommand("MYTH_CGC_CoreEngine", "HideCardID", args =>
	{
		var interpreter = Myth.Util.getInterpreter();
		if (!interpreter) return;
		var skillId = Number(args.skillID);
		interpreter.hideCard(skillId);
	});

	PluginManager.registerCommand("MYTH_CGC_CoreEngine", "HideAllCards", args =>
	{
		var interpreter = Myth.Util.getInterpreter();
		if (!interpreter) return;
		interpreter.hideAllCards();
	});

	PluginManager.registerCommand("MYTH_CGC_CoreEngine", "MoveCard", args =>
	{
		var interpreter = Myth.Util.getInterpreter();
		if (!interpreter) return;
		var index = Number(args.index);
		var x = Number(args.x);
		var y = Number(args.y);

		interpreter.moveCard(index, x, y);
	});

}

// #endregion


//=============================================================================
// Game_Interpreter
//=============================================================================
// #region Game_Interpreter

Game_Interpreter.prototype.showCard = function (skillId, x, y, angle, index)
{
	if (!this._cardImages)
		this._cardImages = [];

	if (angle == undefined)
		angle = 0;
	if (index == undefined)
	{
		for (var i = 0; i < this._cardImages.length; i++)
		{
			if (!this._cardImages[i])
				index = i;

		}
		if (index == undefined)
			index = this._cardImages.length;
	}

	if (!!this._cardImages[index])
	{
		SceneManager._scene.removeChild(this._cardImages[index]);
	}

	var actor = $gameParty.leader();
	var card = new Sprite_SkillCard($dataSkills[skillId], actor);

	card.x = x;
	card.y = y;

	card._targetX = card.x;
	card._targetY = card.y;
	var __update = card.update;
	card.update = function ()
	{
		__update.call(this);
		if (this.x != this._targetX || this.y != this._targetY)
		{
			this.x += (this._targetX - this.x) / 30;
			this.y += (this._targetY - this.y) / 30;
		}
	}

	var targetAngle = angle * Math.PI / 180;
	card.rotation = targetAngle;

	SceneManager._scene.addChild(card);
	this._cardImages[index] = card;
};

Game_Interpreter.prototype.hideCard = function (skillId)
{
	if (!this._cardImages)
		return;

	for (var i = this._cardImages.length - 1; i >= 0; i--)
	{
		var card = this._cardImages[i];
		if (!card) continue;
		if (card._skillId == skillId)
		{
			this._cardImages[i] = null;
			SceneManager._scene.removeChild(card);
			return;
		}
	}
};

Game_Interpreter.prototype.hideCardByIndex = function (index)
{
	if (!this._cardImages)
		return;

	if (!this._cardImages[index])
		return;

	SceneManager._scene.removeChild(this._cardImages[index]);
	this._cardImages[index] = null;


};

Game_Interpreter.prototype.hideAllCards = function ()
{
	if (!this._cardImages)
		return;

	for (var i = this._cardImages.length - 1; i >= 0; i--)
	{
		var card = this._cardImages[i];
		SceneManager._scene.removeChild(card);
	}
	this._cardImages = [];
}

Game_Interpreter.prototype.moveCard = function (index, x, y)
{
	if (!this._cardImages)
		return;

	if (!this._cardImages[index])
		return;

	this._cardImages[index]._targetX = x;
	this._cardImages[index]._targetY = y;
}

// #endregion


//=============================================================================
// Scene_Boot
//=============================================================================
// #region Scene_Boot

Myth.CGC.Scene_Boot_create = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function ()
{
	Myth.CGC.Scene_Boot_create.call(this);
	this.loadCardImages();
}

Scene_Boot.prototype.loadCardImages = function ()
{
	if (Myth.CGC.defaultCardBack == undefined)
		Myth.CGC.defaultCardBack = ImageManager.loadBitmapSafe("img/CGC/bases/", "Default", Myth.CGC.createDefaultCardBack);
}

Myth.CGC.createDefaultCardBack = function ()
{
	var bitmap = new Bitmap(220, 400);
	bitmap.fillAll("#FF00DD");
	bitmap.fontSize = 20;
	for (var i = 0; i < 400; i += 60)
	{
		bitmap.drawText('Could not find', 10, i, 200, 30, 'left');
		bitmap.drawText(' img/CGC/bases/Default.png', 10, i + 20, 200, 30, 'left');
	}

	Myth.CGC.defaultCardBack = bitmap;
}
// #endregion

//=============================================================================
// Scene_Map
//=============================================================================
// #region Scene_Map

Myth.CGC.Scene_Base_stop = Scene_Map.prototype.stop;
Scene_Map.prototype.stop = function ()
{
	var interpreter = Myth.Util.getInterpreter();
	if (interpreter)
		interpreter.hideAllCards();
	Myth.CGC.Scene_Base_stop.call(this);
}
// #endregion


//=============================================================================
// Loading images without generating errors
//=============================================================================

ImageManager.loadBitmapSafe = function (folder, filename, errorFunction)
{
	if (Myth.Util.usingMZ)
	{
		return this.loadBitmap(folder, filename);
		if (filename)
		{
			const url = folder + Utils.encodeURI(filename) + ".png";
			return this.loadBitmapFromUrlSafe(url, errorFunction);
		} else
		{
			return this._emptyBitmap;
		}
	}
	else
	{
		if (filename)
		{
			var path = folder + encodeURIComponent(filename) + '.png';
			var bitmap = this.loadNormalBitmapSafe(path, 0, errorFunction);
			bitmap.smooth = 0;
			return bitmap;
		} else
		{
			return this.loadEmptyBitmap();
		}
	}
	
}

ImageManager.loadNormalBitmapSafe = function (path, hue, errorFunction)
{
	var key = this._generateCacheKey(path, hue);
	var bitmap = this._imageCache.get(key);
	if (!bitmap)
	{
		bitmap = Bitmap.loadSafe(decodeURIComponent(path), errorFunction);
		if (bitmap == -1)
			return -1;
		bitmap.addLoadListener(function ()
		{
			bitmap.rotateHue(hue);
		});
		this._imageCache.add(key, bitmap);
	} else if (!bitmap.isReady())
	{
		bitmap.decode();
	}

	return bitmap;
}

ImageManager.loadBitmapFromUrlSafe = function (url, errorFunction)
{
	const cache = url.includes("/system/") ? this._system : this._cache;
	if (!cache[url])
	{
		cache[url] = Bitmap.loadSafe(url, errorFunction);
	}
	return cache[url];
};

Bitmap.loadSafe = function (url, errorFunction)
{
	var success = false;
	if (Myth.Util.usingMZ)
	{
		const bitmap = Object.create(Bitmap.prototype);
		bitmap.initialize();
		bitmap._url = url;
		bitmap._startLoading();
	}
	else
	{
		var bitmap = Object.create(Bitmap.prototype);
		bitmap._defer = true;
		bitmap.initialize();

		bitmap._decodeAfterRequest = true;
		success = bitmap._requestImageSafe(url, errorFunction);
	}
	
	
	if (success)
		return bitmap;
	else
		return -1;
}

if (!Myth.Util.usingMZ)
{
	Bitmap.prototype._requestImageSafe = function (url, errorFunction)
	{
		if (Bitmap._reuseImages.length !== 0)
		{
			this._image = Bitmap._reuseImages.pop();
		} else
		{
			this._image = new Image();
		}

		if (this._decodeAfterRequest && !this._loader)
		{
			this._errorFunction = errorFunction;
			this._loader = ResourceHandler.createLoaderSafe(url, this._requestImageSafe.bind(this, url, errorFunction), this._onErrorSafe.bind(this));
		}

		this._image = new Image();
		this._url = url;
		this._loadingState = 'requesting';

		if (!Decrypter.checkImgIgnore(url) && Decrypter.hasEncryptedImages)
		{
			this._loadingState = 'decrypting';
			Decrypter.decryptImg(url, this);
		} else
		{
			this._image.src = url;
			//return false;
			this._errorFunction = errorFunction;
			this._image.addEventListener('load', this._loadListener = Bitmap.prototype._onLoad.bind(this));
			this._image.addEventListener('error', this._errorListener = this._loader || Bitmap.prototype._onErrorSafe.bind(this));
		}

		return true;
	}

	Bitmap.prototype._onErrorSafe = function ()
	{
		this._image.removeEventListener('load', this._loadListener);
		this._image.removeEventListener('error', this._errorListener);
		this._loadingState = 'none';
		this._errorFunction();
	};

	ResourceHandler.createLoaderSafe = function (url, retryMethod, resignMethod, retryInterval)
	{
		retryInterval = retryInterval || this._defaultRetryInterval;
		var reloaders = this._reloaders;
		var retryCount = 0;
		return function ()
		{
			if (retryCount < retryInterval.length)
			{
				setTimeout(retryMethod, retryInterval[retryCount]);
				retryCount++;
			} else
			{
				if (resignMethod)
				{
					resignMethod();
				}
				if (url)
				{
					if (reloaders.length === 0)
					{
						return;
					}
					reloaders.push(function ()
					{
						retryCount = 0;
						retryMethod();
					});
				}
			}
		};
	};
}




//=============================================================================
// Game_System
//=============================================================================

Myth.CGC.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function ()
{
	Myth.CGC.Game_System_initialize.call(this);
	this.initCardSettings();
};

Game_System.prototype.initCardSettings = function ()
{
	this._cardBattleEnabled = true;
	this._showCardLibraryInMenu = Myth.CGC.libraryMenuSetting == "Add to Menu";
	this._libraryMenuSetting = Myth.CGC.libraryMenuSetting;
};

Game_System.prototype.setCardBattle = function (enabled)
{
	this._cardBattleEnabled = enabled;
};

Game_System.prototype.setShowCardLibrary = function (enabled)
{
	this._showCardLibraryInMenu = enabled;
}



function Game_Card()
{
	this.initialize(...arguments);
}

Game_Card.prototype.initialize = function (skillId, origin)
{
	this._skillId = skillId;
	if (origin)
		this._origin = origin;
	else
		this._origin = "learned";
}

Game_Card.prototype.id = function ()
{
	return this._skillId;
};

Game_Card.prototype.origin = function ()
{
	return this._origin;
};

Game_Card.prototype.originSortId = function ()
{
	var id = 0;
	switch (this._origin)
	{
		case "learned":
			id = 0;
			break;

		case "equip":
			id = 2;
			break;
		case "state":
			id = 3;
			break;
		case "copy":
			id = 4;
			break;
		case "fusion":
			id = 5;
			break;
		case "empty":
			id = 999;
			break;
	}

	return id;
}

Game_Card.prototype.isIdenticalTo = function (otherCard)
{
	return this._skillId == otherCard._skillId && this._origin == otherCard._origin;
}

Game_Card.prototype.getSkillName = function ()
{
	var dataSkill = $dataSkills[this._skillId];
	return dataSkill.name;
}

//The wrapper class for a card array.

function Game_Cards()
{
	this.initialize(...arguments);
}

Game_Cards.prototype.initialize = function (name)
{
	this._data = [];
	this.length = 0;
	this.name = name;
};

Game_Cards.prototype.push = function (skillId, origin)
{
	var card = new Game_Card(skillId, origin);
	this._data.push(card);
	this.length++;
	return card;
};

Game_Cards.prototype.add = function (card)
{
	if (card instanceof Game_Card)
	{
		this._data.push(card);
		this.length++;
	}
}

Game_Cards.prototype.remove = function (card)
{
	var wasPresent = -1;
	if (card instanceof Game_Card)
	{
		var index = this.indexOfObject(card);
		if (index > -1)
		{
			wasPresent = index;
			this.splice(index, 1);
		}
	}
	return wasPresent;
}

Game_Cards.prototype.addNextToDuplicates = function (card)
{
	if (card instanceof Game_Card)
	{
		var pushed = false;
		for (var i = 0; i < this._data.length; i++)
		{
			var c = this._data[i];
			if (c.isIdenticalTo(card))
			{
				this._data.splice(i, 0, card);
				pushed = true;
				break;
			}
		}
		if (!pushed)
			this._data.push(card);
		this.length++;
	}
}

Game_Cards.prototype.splice = function (index, amount)
{
	var card = this._data[index];
	this._data.splice(index, amount);
	this.length -= amount;
	return card;
};

Game_Cards.prototype.insert = function (card, index)
{
	this._data.splice(index, 0, card);
	this.length++;
}

Game_Cards.prototype.slice = function ()
{
	return this._data.slice();
}

Game_Cards.prototype.card = function (index)
{
	if (index < this._data.length && index >= 0)
		return this._data[index];

	return null;
};

Game_Cards.prototype.indexOf = function (skillId, origin)
{
	for (var i = 0; i < this._data.length; i++)
	{
		var card = this._data[i];
		if (card.id() == skillId)
		{
			if (origin && card.origin() != origin)
				continue;
			return i;
		}
	}

	return -1;
};

Game_Cards.prototype.indexOfObject = function (card)
{
	for (var i = 0; i < this._data.length; i++)
	{
		if (this._data[i] == card)
			return i;
	}
}

Game_Cards.prototype.amountOf = function (skillId)
{
	var amount = 0;

	for (var i = 0; i < this._data.length; i++)
	{
		var card = this._data[i];
		if (card.id() == skillId)
		{
			amount++;
		}
	}

	return amount;
}

Game_Cards.prototype.getAllCards = function ()
{
	var cards = [...this._data];
	return cards;
}

Game_Cards.prototype.getSkillIds = function ()
{
	var ids = [];
	for (var i = 0; i < this._data.length; i++)
	{
		ids.push(this._data[i].id());
	}

	return ids;
}

Game_Cards.prototype.getUniqueSkillIds = function ()
{
	var ids = this.getSkillIds();
	var uniqueIds = [];
	for (var i = 0; i < ids.length; i++)
	{
		if (!uniqueIds.includes(ids[i]))
			uniqueIds.push(ids[i]);
	}

	return uniqueIds;
}

Game_Cards.prototype.clear = function ()
{
	this._data = [];
	this.length = 0;
};

Game_Cards.prototype.copy = function (cards)
{
	this._data = [];
	for (var i = 0; i < cards._data.length; i++)
	{
		this._data.push(cards._data[i]);
	}
	this.length = this._data.length;
};

Game_Cards.prototype.shuffle = function ()
{
	Myth.Util.shuffleArray(this._data);
	SoundManager.playShuffle();
}



function Sprite_SkillCard()
{
	this.initialize.apply(this, arguments);
};

Sprite_SkillCard.prototype = Object.create(Myth.Util.spritePrototype.prototype);
Sprite_SkillCard.prototype.constructor = Sprite_SkillCard;

Sprite_SkillCard.prototype.initialize = function (card, actor)
{
	Myth.Util.spritePrototype.prototype.initialize.call(this);
	this._isCard = true;
	this._actor = actor;
	this.bitmap = new Bitmap(Myth.CGC.defaultCardBack.width, Myth.CGC.defaultCardBack.height);
	this.addHighlights();
	this.initMembers();

	if (card instanceof Game_Card)
	{
		this.setCard(card);
	}
	else
	{
/*		if (card != -1)
			console.warn("You may be using an outdated CGC extension plugin. Check to make sure all CGC plugins are compatible with v1.6.0 or higher.");*/
		if (typeof card == "number")
		{
			this.setSkill($dataSkills[card]);
		}
		else
			this.setSkill(card);
	}
	this.contents = this.bitmap;
	this.updateBitmap();

	//Touch input
	this._parentWindow = null; //only used for MZ
};

Sprite_SkillCard.prototype.setCard = function (card)
{
	this._card = card;
	if (card)
		this.setSkill($dataSkills[card.id()]);
	else
		this.setSkill(null);
};

Sprite_SkillCard.prototype.card = function ()
{
	return this._card;
}

Sprite_SkillCard.prototype.setSkill = function (skill)
{
	this._skill = skill;
};

Sprite_SkillCard.prototype.initMembers = function ()
{
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._card = null;
	this._skill = null;
	this._skillId = null;
	this._iconIndex = null;
	this._skillname = null;
	this.x = Myth.CGC.zoneInfo.deck.x;
	this.y = Myth.CGC.zoneInfo.deck.y;
	this.drawType = 'none';
	this._drawOrigin = false;
	this.loadCardBack();
};

Sprite_SkillCard.prototype.shrinkToDeck = function ()
{
	var deckData = Myth.CGC.zoneInfo.deck;
	var targetAngle = deckData.cardRotation * Math.PI / 180;
	this.rotation = targetAngle;
	this.scale.x = deckData.cardScale;
	this.scale.y = deckData.cardScale;
	this.x = deckData.x;
	this.y = deckData.y;
}

Sprite_SkillCard.prototype.spawnIn = function ()
{
	var coords = Myth.CGC.coordinates;
	this.scale.x = 0.01;
	this.scale.y = 0.01;
	this.x = Graphics.boxWidth / 2;
	this.y = 0;
}

Sprite_SkillCard.prototype.update = function ()
{
	Myth.Util.spritePrototype.prototype.update.call(this);
	this.updateBitmap();
};

Sprite_SkillCard.prototype.setDrawOrigin = function (drawOrigin)
{
	this._drawOrigin = drawOrigin;
	this._skillId = -1; //forces a redraw on the next frame
}

Sprite_SkillCard.prototype.updateBitmap = function ()
{
	if (this.isImageChanged())
	{
		this._skillId = this._skill.id;
		this._iconIndex = this._skill.iconIndex;
		this._skillname = this._skill.name;
		
		this.updateCardBack();
		this.updateArt();

		this.drawCardBitmap();
	}
};

Sprite_SkillCard.prototype.isImageChanged = function ()
{
	return (this._skillId !== this._skill.id ||
		this._iconIndex !== this._skill.iconIndex ||
		this._skillname !== this._skill.name ||
		this.bitmap.width === 0 || this._unfinishedLoading === true);
};

Sprite_SkillCard.prototype.loadCardBack = function ()
{
	this._cardback = Myth.CGC.defaultCardBack;
};

Sprite_SkillCard.prototype.updateCardBack = function()
{
	var cardDesign = $dataSkills[this._skillId]._cardBase;

	if(cardDesign)
	{
		var back = ImageManager.loadBitmap("img/" + Myth.CGC.cardDesignDirectory + "/", cardDesign);
		this._cardback = back;
	}
	else
	{
		this._cardback = Myth.CGC.defaultCardBack;
	}
	
	return true;
};

Sprite_SkillCard.prototype.updateArt = function ()
{
	var cardArt = $dataSkills[this._skillId]._cardArt;
	if (cardArt)
	{
		var art = ImageManager.loadBitmap("img/" + Myth.CGC.cardDirectory + "/", cardArt);
		this._cardArt = art;
	}
	else
		this._cardArt = "icon";
}

Sprite_SkillCard.prototype.addHighlights = function ()
{
	var bitmap = ImageManager.loadBitmap("img/CGC/highlights/", Myth.CGC.images.cardHighlightSheet);
	this._enabledSprite = new Sprite_CardHighlight(bitmap, 0);
	this._discardSprite = new Sprite_CardHighlight(bitmap, 1);
	this._removeSprite = new Sprite_CardHighlight(bitmap, 2);

	this.addChild(this._enabledSprite);
	this.addChild(this._discardSprite);
	this.addChild(this._removeSprite);
}

Sprite_SkillCard.prototype.drawCardBitmap = function ()
{
	//this.__drawing = this.__drawing + 1 || 0;
	var bitmap = this._cardback;
	if (!bitmap.isReady() || bitmap.width == 0)
	{
		setTimeout(() =>
		{
			this.drawCardBitmap();
		}, 100);
		return;
	}

	var width = bitmap.width;
	var height = bitmap.height;
	this.bitmap = new Bitmap(width, height);
	this.contents = this.bitmap;
	this.bitmap.smooth = Myth.CGC.smoothCards;
	this.bitmap.blt(bitmap, 0, 0, width, height, 0, 0, width, height);

	//this.bitmap.textColor = "white";


	var success = this.drawCardArt();
	if (!success)
	{
		setTimeout(() =>
		{
			this.drawCardBitmap();
		}, 100);
		return;
	}

	this.drawCardName();
	this.drawCardCost();

	this.drawCardDescription();
	this.drawCardType();

	this.drawType = 'none';
	if (this._amount === 0 || this._card && this._card.origin() == "missing")
	{

		this.shadeCard();
	}
	else if (this._amountText)
	{
		this.drawAmount();
	}

	if (this._drawOrigin)
		this.drawOrigin();
	//this._unfinishedLoading = false;
};

Sprite_SkillCard.prototype.drawAmount = function (color)
{
	this._amountText.drawAmount(color);
}

Sprite_SkillCard.prototype.drawCardArt = function ()
{
	var cardArt = this._cardArt;
	if (cardArt != "icon")
	{
		if (!cardArt.isReady())
		{
			//this._unfinishedLoading = true;
			setTimeout(() =>
			{
				this.drawCardArt();
			}, 100);
			return false;
		}
		this.bitmap.blt(cardArt, 0, 0, cardArt.width, cardArt.height, 0, 0);
	}
	else
	{
		this.drawIconScaled(this._iconIndex, this.bitmap.width * 0.25, this.bitmap.height * 0.18, this.bitmap.width * 0.5, this.bitmap.width * 0.5);
	}
		

	return true;
};

Sprite_SkillCard.prototype.drawCardName = function ()
{
	if (!Myth.CGC.cardDisplayComponents.cardName) return;

	this.drawType = 'cardName';
	var coords = Myth.CGC.coordinates;
	this.drawTextEx(this._skillname, coords.cardNameCoords.x, coords.cardNameCoords.y);
};

Sprite_SkillCard.prototype.drawCardCost = function ()
{
	if (!Myth.CGC.cardDisplayComponents.cardCost) return;

	var coords = Myth.CGC.coordinates;
	var skillWidth = this.bitmap.width - 8;
	if (Imported.YEP_SkillCore)
		skillWidth += (Window_Base._iconWidth - Myth.CGC.fontSizes.iconSize);

	this.drawSkillCost(this._skill, coords.skillCostCoords.x, coords.skillCostCoords.y, coords.costWidth);
	//this.drawSkillCost(this._skill, 0, coords.skillCostCoords.y, skillWidth - coords.skillCostCoords.x);
};

Sprite_SkillCard.prototype.drawCardDescription = function ()
{
	if (!Myth.CGC.cardDisplayComponents.cardDesc) return;

	var coords = Myth.CGC.coordinates;
	this.drawType = 'cardDesc';
	var desc = this._skill.description;
	if (Imported.YEP_MessageCore)
		desc = "<WordWrap>" + desc;
	this.drawTextEx(desc, coords.cardDescCoords.x, coords.cardDescCoords.y);
};

Sprite_SkillCard.prototype.drawCardType = function ()
{
	//To be overridded in MYTH_CGC_CardTypes
}

Sprite_SkillCard.prototype.drawOrigin = function ()
{
	var coords = Myth.CGC.coordinates.cardOriginCoords;
	var x = coords.x;
	var y = coords.y;
	var origin = this._card.origin();
	var bitmapName = Myth.CGC.images.originBadges[origin];
	if (bitmapName == "" || bitmapName == undefined) return;

	//var bitmap = ImageManager.loadBitmap("img/CGC/ui/", bitmapName);
	var bitmap = ImageManager.loadSystem(bitmapName);

	if (!bitmap.isReady())
	{
		setTimeout(() =>
		{
			this.drawOrigin();
		}, 100);
		return false;
	}
	this.bitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y);

}

Sprite_SkillCard.prototype.shadeCard = function ()
{
	if (this._shadeSprite) return;
	var shadowBitmap = new Bitmap(this.bitmap.width, this.bitmap.height);
	shadowBitmap.paintOpacity = 220;
	shadowBitmap.fillAll('black');
	shadowBitmap.paintOpacity = 255;
	var shadeSprite = new Sprite(shadowBitmap);
	shadeSprite.anchor = new Point(0.5, 0.5);
	this._shadeSprite = shadeSprite;
	this.addChild(shadeSprite);
};

Sprite_SkillCard.prototype.unshadeCard = function ()
{
	if (this._shadeSprite)
	{
		this.removeChild(this._shadeSprite);
		this._shadeSprite = null;
	}
}

//=====================================================================
// Mimick Window_Base text drawing behavior
//======================================================================

//#region Mimick Window_Base text drawing behavior

Sprite_SkillCard.prototype.drawTextEx = function (text, x, y)
{
	return Window_Base.prototype.drawTextEx.call(this, text, x, y);
};

Sprite_SkillCard.prototype.drawText = function (text, x, y, maxWidth, align)
{
	return Window_Base.prototype.drawText.call(this, text, x, y, maxWidth, align);
}

Sprite_SkillCard.prototype.lineHeight = function ()
{
	return Myth.CGC.fontSizes.cardDesc;
}

Sprite_SkillCard.prototype.convertEscapeCharacters = function (text)
{
	return Window_Base.prototype.convertEscapeCharacters.call(this, text);
};

Sprite_SkillCard.prototype.calcTextHeight = function (textState, all)
{
	if (Myth.Util.usingMZ)
	{
		const lineSpacing = this.lineHeight() / 2;
		const lastFontSize = this.contents.fontSize;
		const lines = textState.text.slice(textState.index).split("\n");
		const textHeight = this.maxFontSizeInLine(lines[0]) + lineSpacing;
		this.contents.fontSize = lastFontSize;
		return textHeight;
	}
	else
		return Window_Base.prototype.calcTextHeight.call(this, textState, all);
};

Sprite_SkillCard.prototype.resetFontSettings = function ()
{
	this.contents.fontFace = this.standardFontFace();
	this.contents.fontSize = this.standardFontSize();
	this.resetTextColor();
};

Sprite_SkillCard.prototype.actorName = function (n)
{
	return Window_Base.prototype.actorName.call(this, n);
};

Sprite_SkillCard.prototype.partyMemberName = function (n)
{
	return Window_Base.prototype.partyMemberName.call(this, n);
};

Sprite_SkillCard.prototype.standardFontFace = function ()
{
	var fontFace = "GameFont";
	var tempFace = Myth.CGC.fontFaces[this.drawType];
	if (tempFace != undefined && tempFace != "")
		fontFace = tempFace;

	if (fontFace.toLowerCase() == 'gamefont')
	{
		if (Myth.Util.usingMZ)
			fontFace = $gameSystem.mainFontFace();
		else
			fontFace = Window_Base.prototype.standardFontFace.call(this);
	}

	return fontFace;
	//return Window_Base.prototype.standardFontFace.call(this);
};

Sprite_SkillCard.prototype.standardFontSize = function ()
{
	//return Window_Base.prototype.standardFontSize.call(this);
	var fontSize = Myth.CGC.fontSizes[this.drawType];
	if (!fontSize)
		return Myth.CGC.fontSizes.cardDesc;
	return fontSize;
};

Sprite_SkillCard.prototype.resetTextColor = function ()
{
	return Window_Base.prototype.resetTextColor.call(this);
};

if (Myth.Util.usingMZ)
{
	Sprite_SkillCard.prototype.createTextState = function (text, x, y, width)
	{
		return Window_Base.prototype.createTextState.call(this, text, x, y, width);
	}

	Sprite_SkillCard.prototype.changeOutlineColor = function (color)
	{
		Window_Base.prototype.changeOutlineColor.call(this, color);
	}

	Sprite_SkillCard.prototype.maxFontSizeInLine = function (line)
	{
		return Window_Base.prototype.maxFontSizeInLine.call(this, line);
	}
	
	Sprite_SkillCard.prototype.createTextBuffer = function (rtl)
	{
		return Window_Base.prototype.createTextBuffer.call(this, rtl);
	}
	
	Sprite_SkillCard.prototype.processAllText = function (textState)
	{
		return Window_Base.prototype.processAllText.call(this, textState);
	}
	
	Sprite_SkillCard.prototype.flushTextState = function (textState)
	{
		return Window_Base.prototype.flushTextState.call(this, textState);
	}
	
	Sprite_SkillCard.prototype.processControlCharacter = function (textState, c)
	{
		return Window_Base.prototype.processControlCharacter.call(this, textState, c);
	};
	
	Sprite_SkillCard.prototype.processColorChange = function (colorIndex)
	{
		return Window_Base.prototype.processColorChange.call(this, colorIndex);
	};



	Myth.CGC.Window_BattleStatus_isOpenAndActive = Window_BattleSkill.prototype.isOpenAndActive;
	Window_BattleSkill.prototype.isOpenAndActive = function ()
	{
		if ($gameSystem._cardBattleEnabled)
			return this.isOpen() && this.active;
		else
			return Myth.CGC.Window_BattleStatus_isOpenAndActive.call(this);
	};

	Myth.CGC.Window_BattleStatus_maxCols = Window_BattleStatus.prototype.maxCols;
	Window_BattleStatus.prototype.maxCols = function ()
	{
		if ($gameSystem._cardBattleEnabled)
		{
			var actors = $gameParty.allMembers().slice(0, $gameParty.maxBattleMembers());
			return actors.length;
		}
		else
			return Myth.CGC.Window_BattleStatus_maxCols.call(this);
		
	}

	Myth.CGC.Scene_Battle_needsInputWindowChange = Scene_Battle.prototype.needsInputWindowChange;
	Scene_Battle.prototype.needsInputWindowChange = function ()
	{
		if (!$gameSystem._cardBattleEnabled)
		{
			return Myth.CGC.Scene_Battle_needsInputWindowChange.call(this);
		}
		const windowActive = this.isAnyInputWindowActive();
		const inputting = BattleManager.isInputting();
		const inputPhase = BattleManager._phase == 'input';

		if (!inputPhase) return false;
		
		if (windowActive && inputting)
		{
			if (this._actorCommandWindow.actor() !== BattleManager.actor())
			{
				this._actorCommandWindow._actor = BattleManager.actor();
				return true;
			}
			else
				return false;
		}
		return windowActive !== inputting;
	};


	Myth.CGC.Scene_Battle_statusWindowRect = Scene_Battle.prototype.statusWindowRect;
	Scene_Battle.prototype.statusWindowRect = function ()
	{
		if (!$gameSystem._cardBattleEnabled || !Myth.CGC.changeBattleWindows)
		{
			return Myth.CGC.Scene_Battle_statusWindowRect.call(this);
		}
		const extra = 10;
		var ww = Graphics.boxWidth - 192;
		ww /= (5 - Window_BattleStatus.prototype.maxCols());
		const wh = this.windowAreaHeight() + extra;
		const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
		const wy = Graphics.boxHeight - wh + extra - 4;
		return new Rectangle(wx, wy, ww, wh);
	};

	Myth.CGC.Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel
	Scene_Battle.prototype.onActorCancel = function ()
	{
		Myth.CGC.Scene_Battle_onActorCancel.call(this);
		if ($gameSystem._cardBattleEnabled)
		{
			if (this._itemWindow.visible)
			{
				this._itemWindow.activate();
			}
			else
			{
				this._statusWindow.show();
				this._skillWindow.activate();
			}
			
		}

	};



	Scene_Battle.prototype.hideSubInputWindows = function ()
	{
		this._actorWindow.deactivate();
		this._enemyWindow.deactivate();
		//this._skillWindow.deactivate();
		this._itemWindow.deactivate();
		this._actorWindow.hide();
		this._enemyWindow.hide();
		//this._skillWindow.hide();
		this._itemWindow.hide();
	};

	Myth.CGC.Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
	Scene_Battle.prototype.startEnemySelection = function ()
	{
		Myth.CGC.Scene_Battle_startEnemySelection.call(this);
		if ($gameSystem._cardBattleEnabled)
			this._statusWindow.show();
	}
}




Sprite_SkillCard.prototype.changeTextColor = function (color)
{
	return Window_Base.prototype.changeTextColor.call(this, color);
};

Sprite_SkillCard.prototype.normalColor = function ()
{
	return Window_Base.prototype.normalColor.call(this);
};

Sprite_SkillCard.prototype.mpCostColor = function ()
{
	return Window_Base.prototype.mpCostColor.call(this);
};

Sprite_SkillCard.prototype.textColor = function (n)
{
	var skillWindow = new Window_SkillList();
	return skillWindow.textColor(n);
};

Sprite_SkillCard.prototype.tpCostColor = function ()
{
	return Window_Base.prototype.tpCostColor.call(this);
};

Sprite_SkillCard.prototype.processCharacter = function (textState)
{
	return Window_Base.prototype.processCharacter.call(this, textState);
};

Sprite_SkillCard.prototype.processNewLine = function (textState)
{
	return Window_Base.prototype.processNewLine.call(this, textState);
};

Sprite_SkillCard.prototype.processNewPage = function (textState)
{
	return Window_Base.prototype.processNewPage.call(this, textState);
};

Sprite_SkillCard.prototype.processNormalCharacter = function (textState)
{
	return Window_Base.prototype.processNormalCharacter.call(this, textState);
};

Sprite_SkillCard.prototype.obtainEscapeCode = function (textState)
{
	return Window_Base.prototype.obtainEscapeCode.call(this, textState);
};

Sprite_SkillCard.prototype.obtainEscapeParam = function (textState)
{
	return Window_Base.prototype.obtainEscapeParam.call(this, textState);
};

Sprite_SkillCard.prototype.processEscapeCharacter = function (code, textState)
{
	return Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
};

Sprite_SkillCard.prototype.textWidth = function (text)
{
	return Window_Base.prototype.textWidth.call(this, text);
};

Sprite_SkillCard.prototype.processDrawIcon = function (iconIndex, textState)
{
	var coords = Myth.CGC.coordinates;
	this.drawIcon(iconIndex, textState.x + 2, textState.y + 2 + coords.cardDescIconY);
	textState.x += Myth.CGC.fontSizes.iconSize + 4;
};

Sprite_SkillCard.prototype.makeFontBigger = function ()
{
	if (this.contents.fontSize <= 96)
	{
		this.contents.fontSize += 4;
	}
};

Sprite_SkillCard.prototype.makeFontSmaller = function ()
{
	if (this.contents.fontSize >= 8)
	{
		this.contents.fontSize -= 4;
	}
};

Sprite_SkillCard.prototype.textPadding = function ()
{
	return 0;
};

Sprite_SkillCard.prototype.newLineX = function ()
{
	return Window_Base.prototype.newLineX.call(this);
};

Sprite_SkillCard.prototype.contentsWidth = function ()
{
	return Window_Base.prototype.contentsWidth.call(this);
};

Sprite_SkillCard.prototype.standardPadding = function ()
{
	return 0;
};

//#endregion

//============================================================================
// YEP_MessageCore compatibility
//============================================================================

//#region YEP_MessageCore compatibility

if (Imported.YEP_MessageCore)
{
	Sprite_SkillCard.prototype.textWidthEx = function (text)
	{
		return Window_Base.prototype.textWidthEx.call(this, text);
	};

	Sprite_SkillCard.prototype.setWordWrap = function (text)
	{
		return Window_Base.prototype.setWordWrap.call(this, text);
	};

	Sprite_SkillCard.prototype.convertExtraEscapeCharacters = function (text)
	{
		return Window_Base.prototype.convertExtraEscapeCharacters.call(this, text);
	};

	Sprite_SkillCard.prototype.actorNickname = function (n)
	{
		return Window_Base.prototype.actorNickname.call(this, n);
	};

	Sprite_SkillCard.prototype.partyClassName = function (n)
	{
		return Window_Base.prototype.partyClassName.call(this, n);
	};

	Sprite_SkillCard.prototype.partyNickname = function (n)
	{
		return Window_Base.prototype.partyNickname.call(this, n);
	};

	Sprite_SkillCard.prototype.escapeIconItem = function (n, database)
	{
		return Window_Base.prototype.escapeIconItem.call(this, n, database);
	};

	Sprite_SkillCard.prototype.obtainEscapeString = function (textState)
	{
		return Window_Base.prototype.obtainEscapeString.call(this, textState);
	};

	Sprite_SkillCard.prototype.checkWordWrap = function (textState)
	{
		return Window_Base.prototype.checkWordWrap.call(this, textState);
	};

	Sprite_SkillCard.prototype.wordwrapWidth = function ()
	{
		if (this.drawType == 'cardDec' && Myth.CGC.textWidths.cardDesc != 0)
			return Myth.CGC.textWidths.cardDesc;
		else
			return Window_Base.prototype.wordwrapWidth.call(this);
	};

	Sprite_SkillCard.prototype.saveCurrentWindowSettings = function ()
	{
		return Window_Base.prototype.saveCurrentWindowSettings.call(this);
	};

	Sprite_SkillCard.prototype.restoreCurrentWindowSettings = function ()
	{
		return Window_Base.prototype.restoreCurrentWindowSettings.call(this);
	};

	Sprite_SkillCard.prototype.clearCurrentWindowSettings = function ()
	{
		return Window_Base.prototype.clearCurrentWindowSettings.call(this);
	};

	Sprite_SkillCard.prototype.textWidthExCheck = function (text)
	{
		return Window_Base.prototype.textWidthExCheck.call(this, text);
	};
}

//#endregion

//============================================================================
// YEP_X_ExtMesPack1 compatibility
//============================================================================

if (Imported.YEP_X_ExtMesPack1)
{
	Sprite_SkillCard.prototype.convertPlaytime = function (text)
	{
		return Window_Base.prototype.convertPlaytime.call(this, text);
	};

	Sprite_SkillCard.prototype.convertMapName = function (text)
	{
		return Window_Base.prototype.convertMapName.call(this, text);
	};

	Sprite_SkillCard.prototype.convertEnemyName = function (text)
	{
		return Window_Base.prototype.convertEnemyName.call(this, text);
	};

	Sprite_SkillCard.prototype.convertDigitGrouping = function (text)
	{
		return Window_Base.prototype.convertDigitGrouping.call(this, text);
	};

	Sprite_SkillCard.prototype.groupDigits = function (number)
	{
		return Window_Base.prototype.groupDigits.call(this, number);
	};

	Sprite_SkillCard.prototype.obtainColorString = function (textState)
	{
		return Window_Base.prototype.obtainColorString.call(this, textState);
	};
}

//============================================================================
// YEP_X_ExtMesPack2 compatibility
//============================================================================

if (Imported.YEP_X_ExtMesPack2)
{
	Sprite_SkillCard.prototype.convertItemQuantitiesCodes = function (text)
	{
		return Window_Base.prototype.convertItemQuantitiesCodes.call(this, text);
	};

	Sprite_SkillCard.prototype.convertActorParameterCodes = function (text)
	{
		return Window_Base.prototype.convertActorParameterCodes.call(this, text);
	};

	Sprite_SkillCard.prototype.convertEnemyParameterCodes = function (text)
	{
		return Window_Base.prototype.convertEnemyParameterCodes.call(this, text);
	};

	Sprite_SkillCard.prototype.convertColorCompare = function (text)
	{
		return Window_Base.prototype.convertColorCompare.call(this, text);
	};

	Sprite_SkillCard.prototype.convertCaseText = function (text)
	{
		return Window_Base.prototype.convertCaseText.call(this, text);
	};
}


//============================================================================
// Irina_AutoMessageColor compatibility
//============================================================================

if (Imported.Irina_AutoMessageColor)
{
	Sprite_SkillCard.prototype.convertAutomaticMessageColors = function (e)
	{
		return Window_Base.prototype.convertAutomaticMessageColors.call(this, e);
	};

	Sprite_SkillCard.prototype.convertMvBaseTextCodes = function (e)
	{
		return Window_Base.prototype.convertMvBaseTextCodes.call(this, e);
	};

	Sprite_SkillCard.prototype.convertYepMessageCoreTextCodes = function (e)
	{
		return Window_Base.prototype.convertYepMessageCoreTextCodes.call(this, e);
	};

	Sprite_SkillCard.prototype.convertYepExtMessagePack1TextCodes = function (e)
	{
		return Window_Base.prototype.convertYepExtMessagePack1TextCodes.call(this, e);
	};

	Sprite_SkillCard.prototype.revertTextColor = function ()
	{
		return Window_Base.prototype.revertTextColor.call(this);
	};
}


//============================================================================
// RS_MessageAlign compatibility
//============================================================================

if (Imported.RS_MessageAlign)
{
	Sprite_SkillCard.prototype.doFirstLineAlign = function (textState)
	{
		return Window_Base.prototype.doFirstLineAlign.call(this, textState);
	};

	Sprite_SkillCard.prototype.processAlign = function (textState)
	{
		return Window_Base.prototype.processAlign.call(this, textState);
	};

	Sprite_SkillCard.prototype.setAlignLeft = function (textState)
	{
		return Window_Base.prototype.setAlignLeft.call(this, textState);
	};

	Sprite_SkillCard.prototype.setAlignCenter = function (textState)
	{
		return Window_Base.prototype.setAlignCenter.call(this, textState);
	};

	Sprite_SkillCard.prototype.setAlignRight = function (textState)
	{
		return Window_Base.prototype.setAlignRight.call(this, textState);
	};

	Sprite_SkillCard.prototype.calcTextWidth = function (text)
	{
		return Window_Base.prototype.calcTextWidth.call(this, text);
	};

	Sprite_SkillCard.prototype.drawTextExForAlign = function (text, x, y)
	{
		return Window_Base.prototype.drawTextExForAlign.call(this, text, x, y);
	};

	Sprite_SkillCard.prototype.isUsedTextWidthEx = function ()
	{
		return Window_Base.prototype.isUsedTextWidthEx.call(this);
	};

	Sprite_SkillCard.prototype.saveFontSettings = function ()
	{
		return Window_Base.prototype.saveFontSettings.call(this);
	};

	Sprite_SkillCard.prototype.restoreFontSettings = function ()
	{
		return Window_Base.prototype.restoreFontSettings.call(this);
	};




}

//============================================================================
// Eli_MessageActions compatibility
//============================================================================

if (Imported.Eli_MessageActions)
{
	Eli.MessageActions.alias.Sprite_SkillCard_initialize = Sprite_SkillCard.prototype.initialize;
	Sprite_SkillCard.prototype.initialize = function (skill, actor)
	{
		if (!Myth.Util.usingMZ)
			this.initExtraEscapeCodes();
		this.setDefaultTextAlignment();
		Eli.MessageActions.alias.Sprite_SkillCard_initialize.call(this, skill, actor);

	}
	Sprite_SkillCard.prototype.initExtraEscapeCodes = function ()
	{
		return Window_Base.prototype.initExtraEscapeCodes.call(this);
	};

	Sprite_SkillCard.prototype.setDefaultTextAlignment = function ()
	{
		return Window_Base.prototype.setDefaultTextAlignment.call(this);
	};

	Sprite_SkillCard.prototype.changeDefaultFont = function (textState)
	{
		return Window_Base.prototype.changeDefaultFont.call(this, textState);
	};

	Sprite_SkillCard.prototype.changeBitmapFont = function (textState)
	{
		return Window_Base.prototype.changeBitmapFont.call(this, textState);
	};

	Sprite_SkillCard.prototype.fixAlign = function (textState)
	{
		return Window_Base.prototype.fixAlign.call(this, textState);
	};

	if (Myth.Util.usingMZ)
	{
		Sprite_SkillCard.prototype.actionCode_OUTCOLOR = function (textState)
		{
			return Window_Base.prototype.actionCode_OUTCOLOR.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_ALIGN = function (textState, defaultAlign)
		{
			return Window_Base.prototype.actionCode_ALIGN.call(this, textState, defaultAlign);
		};

		Sprite_SkillCard.prototype.getWidthsMeasureForAlign = function (textState)
		{
			return Window_Base.prototype.getWidthsMeasureForAlign.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_TEXTBACKGROUND = function (textState)
		{
			return Window_Base.prototype.actionCode_TEXTBACKGROUND.call(this, textState);
		};

		Sprite_SkillCard.prototype.removeActionEscapeCharacters = function (code, textState)
		{
			return Window_Base.prototype.removeActionEscapeCharacters.call(this, code, textState);
		};

		Sprite_SkillCard.prototype.actionCode_COLOR = function (textState)
		{
			return Window_Base.prototype.actionCode_COLOR.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_CHANGESWITCH = function (textState)
		{
			return Window_Base.prototype.actionCode_CHANGESWITCH.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_CHANGESELFSWITCH = function (textState)
		{
			return Window_Base.prototype.actionCode_CHANGESELFSWITCH.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_CHANGEVARIABLE = function (textState)
		{
			return Window_Base.prototype.actionCode_CHANGEVARIABLE.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_PBGM = function (textState)
		{
			return Window_Base.prototype.actionCode_PBGM.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_FOBGM = function (textState)
		{
			return Window_Base.prototype.actionCode_FOBGM.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_PBGS = function (textState)
		{
			return Window_Base.prototype.actionCode_PBGS.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_FOBGS = function (textState)
		{
			return Window_Base.prototype.actionCode_FOBGS.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_PME = function (textState)
		{
			return Window_Base.prototype.actionCode_PME.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_PSE = function (textState)
		{
			return Window_Base.prototype.actionCode_PSE.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_FORMULA = function (textState)
		{
			return Window_Base.prototype.actionCode_FORMULA.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_BOLD = function (textState)
		{
			return Window_Base.prototype.actionCode_BOLD.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_ITALIC = function (textState)
		{
			return Window_Base.prototype.actionCode_ITALIC.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_OUTWIDTH = function (textState)
		{
			return Window_Base.prototype.actionCode_OUTWIDTH.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_IMAGE = function (textState)
		{
			return Window_Base.prototype.actionCode_IMAGE.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_UNDERLINE = function (textState)
		{
			return Window_Base.prototype.actionCode_UNDERLINE.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_STRIKE = function (textState)
		{
			return Window_Base.prototype.actionCode_STRIKE.call(this, textState);
		};

		Sprite_SkillCard.prototype.actionCode_CHANGEFONT = function (textState)
		{
			return Window_Base.prototype.actionCode_CHANGEFONT.call(this, textState);
		};
	}
	else
	{
		Sprite_SkillCard.prototype.COLOR = function (textState)
		{
			return Window_Base.prototype.COLOR.call(this, textState);
		};

		Sprite_SkillCard.prototype.CSW = function (textState)
		{
			return Window_Base.prototype.CSW.call(this, textState);
		};

		Sprite_SkillCard.prototype.CSSW = function (textState)
		{
			return Window_Base.prototype.CSSW.call(this, textState);
		};

		Sprite_SkillCard.prototype.CVAR = function (textState)
		{
			return Window_Base.prototype.CVAR.call(this, textState);
		};

		Sprite_SkillCard.prototype.PBGM = function (textState)
		{
			return Window_Base.prototype.PBGM.call(this, textState);
		};

		Sprite_SkillCard.prototype.FBGM = function (textState)
		{
			return Window_Base.prototype.FBGM.call(this, textState);
		};

		Sprite_SkillCard.prototype.PBGS = function (textState)
		{
			return Window_Base.prototype.PBGS.call(this, textState);
		};

		Sprite_SkillCard.prototype.FBGS = function (textState)
		{
			return Window_Base.prototype.FBGS.call(this, textState);
		};

		Sprite_SkillCard.prototype.PME = function (textState)
		{
			return Window_Base.prototype.PME.call(this, textState);
		};

		Sprite_SkillCard.prototype.PSE = function (textState)
		{
			return Window_Base.prototype.PSE.call(this, textState);
		};

		Sprite_SkillCard.prototype.SCRIPT = function (textState)
		{
			return Window_Base.prototype.SCRIPT.call(this, textState);
		};

		Sprite_SkillCard.prototype.BOLD = function (textState)
		{
			return Window_Base.prototype.BOLD.call(this, textState);
		};

		Sprite_SkillCard.prototype.ITALIC = function (textState)
		{
			return Window_Base.prototype.ITALIC.call(this, textState);
		};

		Sprite_SkillCard.prototype.OUTWIDTH = function (textState)
		{
			return Window_Base.prototype.OUTWIDTH.call(this, textState);
		};

		Sprite_SkillCard.prototype.ALIGN = function (textState)
		{
			return Window_Base.prototype.ALIGN.call(this, textState);
		};

		Sprite_SkillCard.prototype.DRAWIMG = function (textState)
		{
			return Window_Base.prototype.DRAWIMG.call(this, textState);
		};

		Sprite_SkillCard.prototype.UL = function (textState)
		{
			return Window_Base.prototype.UL.call(this, textState);
		};

		Sprite_SkillCard.prototype.TS = function (textState)
		{
			return Window_Base.prototype.TS.call(this, textState);
		};

		Sprite_SkillCard.prototype.BGC = function (textState)
		{
			return Window_Base.prototype.BGC.call(this, textState);
		};

		Sprite_SkillCard.prototype.FNT = function (textState)
		{
			return Window_Base.prototype.FNT.call(this, textState);
		};

		Sprite_SkillCard.prototype.ALIGN = function (textState, defaultAlign)
		{
			return Window_Base.prototype.ALIGN.call(this, textState, defaultAlign);
		};
	}
	
	

	


	


}

//============================================================================
// Mimick Window_SkillList cost-drawing behavior
//============================================================================

Sprite_SkillCard.prototype.drawSkillCost = function (skill, x, y, width)
{
	return Window_SkillList.prototype.drawSkillCost.call(this, skill, x, y, width);
};

//============================================================================
// YEP_SkillCore compatibility
//============================================================================

if (Imported.YEP_SkillCore)
{
	Sprite_SkillCard.prototype.drawTpCost = function (skill, wx, wy, dw)
	{
		if (this._actor.skillTpCost(skill) <= 0) return dw;

		dw = Window_SkillList.prototype.drawTpCost.call(this, skill, wx, wy, dw);
		dw += (Window_Base._iconWidth - Myth.CGC.fontSizes.iconSize);
		return dw;
	}

	Sprite_SkillCard.prototype.drawMpCost = function (skill, wx, wy, dw)
	{
		if (this._actor.skillMpCost(skill) <= 0) return dw;

		dw = Window_SkillList.prototype.drawMpCost.call(this, skill, wx, wy, dw);
		dw += (Window_Base._iconWidth - Myth.CGC.fontSizes.iconSize);
		return dw;
	}

	Sprite_SkillCard.prototype.drawHpCost = function (skill, wx, wy, dw)
	{
		if (this._actor.skillHpCost(skill) <= 0) return dw;
		dw = Window_SkillList.prototype.drawHpCost.call(this, skill, wx, wy, dw);
		dw += (Window_Base._iconWidth - Myth.CGC.fontSizes.iconSize);
		return dw;
	}

	Sprite_SkillCard.prototype.drawOtherCost = function (skill, wx, wy, dw)
	{
		return Window_SkillList.prototype.drawOtherCost.call(this, skill, wx, wy, dw);
	}

	Sprite_SkillCard.prototype.drawCustomDisplayCost = function (skill, wx, wy, dw)
	{
		return Window_SkillList.prototype.drawCustomDisplayCost.call(this, skill, wx, wy, dw);
	}

	Sprite_SkillCard.prototype.runDisplayEvalCost = function (skill)
	{
		return Window_SkillList.prototype.runDisplayEvalCost.call(this, skill);
	}

}



//============================================================================
// YEP_X_SkillCostItems compatibility
//============================================================================

if (Imported.YEP_X_SkillCostItems)
{
	Sprite_SkillCard.prototype.drawSkillItemCost = function (skill, wx, wy, dw)
	{
		return Window_SkillList.prototype.drawSkillItemCost.call(this, skill, wx, wy, dw);
	}

	Myth.CGC.drawSkillItemCost = Window_SkillList.prototype.drawSkillItemCost;
	Window_SkillList.prototype.drawSkillItemCost = function (skill, wx, wy, dw)
	{
		if (!skill || skill.buttonName || typeof skill == "string") return dw;
		return Myth.CGC.drawSkillItemCost.call(this, skill, wx, wy, dw);
	}
}

//============================================================================
// Mimick Window_Selectable touch input
//============================================================================

if (Myth.Util.usingMZ)
{
	Sprite_SkillCard.prototype.onClick = function ()
	{
		if (this._parentWindow)
			return this._parentWindow.confirmByCard(this);

		var scene = SceneManager._scene;
		if (scene._skillWindow)
			scene._skillWindow.confirmByCard(this);
		else if (scene._itemWindow)
			scene._itemWindow.confirmByCard(this);
		//SceneManager._scene._skillWindow.confirmByCard(this);
	};

	Sprite_SkillCard.prototype.onMouseEnter = function ()
	{
		//
		this.__mouseEntered = true;
		if (this._parentWindow)
			return this._parentWindow.hoverCard(this);

		var scene = SceneManager._scene;
		if (scene._skillWindow)
			scene._skillWindow.hoverCard();
		else if (scene._itemWindow)
			scene._itemWindow.hoverCard();
	};

	Sprite_SkillCard.prototype.onMouseExit = function ()
	{
		this.__mouseEntered = false;

		if (this._parentWindow)
			return this._parentWindow.hoverCard(this);

		var scene = SceneManager._scene;
		if (scene._skillWindow)
			scene._skillWindow.hoverCard();
		else if (scene._itemWindow)
			scene._itemWindow.hoverCard();
	};

	Window_SkillList.prototype.hoverCard = function ()
	{
		var currentIndex = -1;
		var isBattle = this.isInBattle();
		var cardSprites = isBattle ? this._cardSprites.getCardSprites() : this._cardSprites;
		//for (var i = 0; i < cardSprites.length; i++)
		for (var i = cardSprites.length - 1; i >= 0; i--)
		{
			if (cardSprites[i].__mouseEntered)
			{
				currentIndex = i + (this._itemsBeforeCards || 0);
				break;
			}
		}

		if (currentIndex != -1 && this.isCursorMovable())
		{
			this.select(currentIndex);
		}
	}

	Window_SkillList.prototype.selectByCard = function (card)
	{
		if (!this.isCursorMovable()) return;

		//buttons
		for (var i = 0; i < this._extraButtons.length; i++)
		{
			if (card == this._extraButtons[i]._name)
			{
				this.select(this._extraButtons[i]._index);
				return;
			}
		}

		var currentIndex = -1;

		//zones
		if (card == 'deck')
			currentIndex = this._deckSprite._index;
		else if (card == 'discard')
			currentIndex = this._discardSprite._index;
		if (currentIndex != -1 && this.isCursorMovable())
			return this.select(currentIndex);
		for (var i = 0; i < this._zoneSprites.length; i++)
		{
			var name = this._zoneSprites[i].name;
			if (name == card)
				return this.select(this._zoneSprites[i]._index);
		}



		var lastIndex = this.index();
		var isBattle = this.isInBattle();
		var cardSprites = isBattle ? this._cardSprites.getCardSprites() : this._cardSprites;
		for (var i = 0; i < cardSprites.length; i++)
		{
			if (cardSprites[i] == card)
			{
				currentIndex = i + this._itemsBeforeCards;

				break;
			}
		}
		if (currentIndex == -1)
		{
			if (card == 'endTurn')
			{
				currentIndex = this.endTurnIndex();
			}
			else if (card == 'itemMenu')
			{
				currentIndex = this._itemButton._index;
			}
		}
		

		if (currentIndex != -1 && this.isCursorMovable())
		{
			this.select(currentIndex);
		}
	};

	Window_SkillList.prototype.confirmByCard = function (card)
	{
		var lastIndex = this.index();
		var currentIndex = -1;

		var isBattle = this.isInBattle();
		var cardSprites = isBattle ? this._cardSprites.getCardSprites() : this._cardSprites;
		for (var i = 0; i < cardSprites.length; i++)
		{
			if (cardSprites[i] == card)
			{
				currentIndex = i + this._itemsBeforeCards;

				break;
			}
		}

		//if (currentIndex != -1 && lastIndex === currentIndex)
		if (this.active)
		{
			this.processOk();
		}
	}
}
else
{
	Sprite_SkillCard.prototype.isTouchedInsideFrame = function ()
	{
		var x = this.canvasToLocalX(TouchInput.x);
		var y = this.canvasToLocalY(TouchInput.y);
		var radiusX = this.width / 2 * this.scale.x;
		var radiusY = this.height / 2 * this.scale.y;
		return x >= -radiusX && y >= -radiusY && x < radiusX && y < radiusY;
	};

	Sprite_SkillCard.prototype.canvasToLocalX = function (x)
	{
		var node = this;
		while (node)
		{
			x -= node.x;
			node = node.parent;
		}
		return x;
	};

	Sprite_SkillCard.prototype.canvasToLocalY = function (y)
	{
		var node = this;
		while (node)
		{
			y -= node.y;
			node = node.parent;
		}
		return y;
	};
}




//============================================================================
// Sprite_SkillDeck
//============================================================================


function Sprite_CardZone()
{
	this.initialize.apply(this, arguments);
};

Sprite_CardZone.prototype = Object.create(Sprite_SkillCard.prototype);
Sprite_CardZone.prototype.constructor = Sprite_CardZone;

Sprite_CardZone.prototype.initialize = function (zoneStruct)
{
	this._zoneData = zoneStruct;
	this.name = zoneStruct.name.toLowerCase();
	Sprite_SkillCard.prototype.initialize.call(this, -1);
	this.createTextSprite();
	this.x = zoneStruct.coordinates.x;
	this.y = zoneStruct.coordinates.y;
}

Sprite_CardZone.prototype.initMembers = function ()
{
	Sprite_SkillCard.prototype.initMembers.call(this);
	this._cardsLeft = 0;
	this._oldCardsLeft = -1;
	this.scale.x = 1;
	this.scale.y = 1;
	this.rotation = 0;

	this.bitmap = ImageManager.loadBitmap("img/system/", this.getSpritesheetName(), 0, true);
	this._index = null;
	this._spritegroup = null;
};

Sprite_CardZone.prototype.getSpritesheetName = function ()
{
	return this._zoneData.sheet;
};

Sprite_CardZone.prototype.setIndex = function (index)
{
	this._index = index;
};

Sprite_CardZone.prototype.setSpritegroup = function (spritegroup)
{
	this._spritegroup = spritegroup;
};

Sprite_CardZone.prototype.createTextSprite = function ()
{
	this._textSprite = new Sprite();
	this._textSprite.anchor = new Point(this.anchor.x, this.anchor.y);
	this.addChild(this._textSprite);
}

Sprite_CardZone.prototype.addHighlights = function ()
{
	// Sprite_CardZone is using a different highlight system, at least for now.
}

Sprite_CardZone.prototype.updateBitmap = function ()
{
	if (this.isImageChanged() && this._textSprite)
	{
		this._oldCardsLeft = this._cardsLeft;
		this.drawCardBitmap();
	}
	this.updateHighlight();
};

Sprite_CardZone.prototype.updateHighlight = function ()
{
	if (this._skillWindow && this._skillWindow.index() == this._index && !this._skillWindow.previewOnly)
	{
		this.setFrame(this.bitmap.width / 2, 0, this.bitmap.width / 2, this.bitmap.height);
	}
	else
	{
		this.setFrame(0, 0, this.bitmap.width / 2, this.bitmap.height);
	}
}

Sprite_CardZone.prototype.setCardsLeft = function (cardsLeft)
{
	this._cardsLeft = cardsLeft;
};

Sprite_CardZone.prototype.isImageChanged = function ()
{
	return (this._cardsLeft != this._oldCardsLeft);
};

Sprite_CardZone.prototype.drawCardBitmap = function ()
{
	
	var bitmap = new Bitmap(this.bitmap.width / 2, this.bitmap.height);

	bitmap = this.setTextBitmap(bitmap)
	var rect = this.textRect();
	bitmap.drawText(this._cardsLeft, 0, rect.y, bitmap.width - rect.x, bitmap.fontSize, 'right');
	this._textSprite.bitmap = bitmap;
	SceneManager._scene.removeCardSprite(this);
	SceneManager._scene.addCardSprite(this);
};

Sprite_CardZone.prototype.setTextBitmap = function (bitmap)
{
	bitmap.textColor = "white";
	bitmap.fontSize = this.fontSize();
	return bitmap;
}

Sprite_CardZone.prototype.fontSize = function ()
{
	return this._zoneData.amountFont;
};

Sprite_CardZone.prototype.textRect = function ()
{
	return new Rectangle(this._zoneData.amountCoordinates.x, this._zoneData.amountCoordinates.y);
}

// Touch input

if (Myth.Util.usingMZ)
{
	Sprite_CardZone.prototype.onClick = function ()
	{
		SceneManager._scene._skillWindow.confirmByCard(this._zoneData.name.toLowerCase());
	};

	Sprite_CardZone.prototype.onMouseEnter = function ()
	{
		SceneManager._scene._skillWindow.selectByCard(this._zoneData.name.toLowerCase());
	};

}


function Sprite_CardHighlight()
{
	this.initialize.apply(this, arguments);
}

Sprite_CardHighlight.prototype = Object.create(Sprite.prototype);
Sprite_CardHighlight.prototype.constructor = Sprite_CardHighlight;


Sprite_CardHighlight.prototype.initialize = function (sheet, row)
{
	this._highlightSheet = sheet;
	this._row = row;

	Sprite.prototype.initialize.call(this, sheet);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.smooth = Myth.CGC.smoothCards;
	this.opacity = 0;
	this.hide();

	if (sheet.isReady())
		this.initializeFrame();
	else
	{
		this._highlightSheet.addLoadListener(() =>
		{
			this.initializeFrame();
		});
	}
		
};

Sprite_CardHighlight.prototype.initializeFrame = function ()
{
	var width = this._highlightSheet.width / 3;
	var height = this._highlightSheet.height;
	var x = this._row * width;
	var y = 0;
	this.setFrame(x, y, width, height);
}

Sprite_CardHighlight.prototype.hide = function ()
{
	this._hide = true;
}

Sprite_CardHighlight.prototype.show = function ()
{
	this._hide = false;
}

Sprite_CardHighlight.prototype.update = function ()
{
	Sprite.prototype.update.call(this);
	if (this._hide)
	{
		this.opacity -= 10;
		if (this.opacity < 0)
			this.opacity = 0;
	}
	else
	{
		this.opacity += 10;
		if (this.opacity > 255)
			this.opacity = 255;
	}
}


function Sprite_CardButton()
{
	this.initialize.apply(this, arguments);
};

Sprite_CardButton.prototype = Object.create(Myth.Util.spritePrototype.prototype);
Sprite_CardButton.prototype.constructor = Sprite_CardButton;

Sprite_CardButton.prototype.initialize = function (name)
{
	var images = Myth.CGC.images;
	Myth.Util.spritePrototype.prototype.initialize.call(this);
	this._highlightSprite = new Sprite();

	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._highlightSprite.anchor.x = 0.5;
	this._highlightSprite.anchor.y = 0.5;
	this.addChild(this._highlightSprite);
	this._index = null;
	this._skillId = null;
	this._enabledCondition = "true";
	this._name = name;
};

Sprite_CardButton.prototype.setBitmaps = function (sheet)
{
	this._highlightSprite.bitmap = ImageManager.loadBitmap("img/CGC/buttons/", sheet);
	this.bitmap = ImageManager.loadBitmap("img/CGC/buttons/", sheet);
	this.updateBitmaps();
};

Sprite_CardButton.prototype.setIndex = function(index)
{
	this._index = index;
}

Sprite_CardButton.prototype.setSkill = function(id)
{
	this._skillId = id;
}

Sprite_CardButton.prototype.update = function ()
{
	Myth.Util.spritePrototype.prototype.update.call(this);
	this.updateBitmaps();
};

Sprite_CardButton.prototype.updateBitmaps = function ()
{
	var frameWidth = this.bitmap.width / 3;
	var frameHeight = this.bitmap.height;
	if (this.disableDuringNonInput)
	{
		if (BattleManager._phase == 'discard')
		{
			this.setFrame(frameWidth, 0, frameWidth, frameHeight);
		}
		else if (BattleManager._phase == 'input')
		{
			var isEnabled = this.isEnabled();
			if (isEnabled)
				this.setFrame(0, 0, frameWidth, frameHeight);
			else
				this.setFrame(frameWidth, 0, frameWidth, frameHeight);
		}
		else if (BattleManager._phase == 'turn')
		{
			this.setFrame(frameWidth, 0, frameWidth, frameHeight);
		}
	}
	else
	{
		var isEnabled = this.isEnabled();
		if (isEnabled)
			this.setFrame(0, 0, frameWidth, frameHeight);
		else
			this.setFrame(frameWidth, 0, frameWidth, frameHeight);
	}


	if (this._skillWindow.index() == this._index && !this._skillWindow.previewOnly)
	{
		this._highlightSprite.setFrame(frameWidth * 2, 0, frameWidth, frameHeight);
		this._highlightSprite.visible = true;
	}
	else
		this._highlightSprite.visible = false;
};

Sprite_CardButton.prototype.isTouchedInsideFrame = function ()
{
	var x = this.canvasToLocalX(TouchInput.x);
	var y = this.canvasToLocalY(TouchInput.y);
	var radiusX = this.width / 2;
	var radiusY = this.height / 2;
	return x >= -radiusX && y >= -radiusY && x < radiusX && y < radiusY;
};

Sprite_CardButton.prototype.canvasToLocalX = function (x)
{
	var node = this;
	while (node)
	{
		x -= node.x;
		node = node.parent;
	}
	return x;
};

Sprite_CardButton.prototype.canvasToLocalY = function (y)
{
	var node = this;
	while (node)
	{
		y -= node.y;
		node = node.parent;
	}
	return y;
};

Sprite_CardButton.prototype.skillId = function ()
{
	return this._skillId;
}

Sprite_CardButton.prototype.isEnabled = function ()
{
	var skill = $dataSkills[this._skillId];

	return eval(this._enabledCondition);
};



function Sprite_EndTurnButton()
{
	this.initialize.apply(this, arguments);
};



Sprite_EndTurnButton.prototype = Object.create(Sprite_CardButton.prototype);
Sprite_EndTurnButton.prototype.constructor = Sprite_EndTurnButton;


Sprite_EndTurnButton.prototype.initialize = function ()
{
	var buttonData = Myth.CGC.buttonInfo.endTurn;
	Sprite_CardButton.prototype.initialize.call(this);
	this.setBitmaps(buttonData.endTurnSheet, buttonData.discardSheet, buttonData.removeSheet);
};

Sprite_EndTurnButton.prototype.setBitmaps = function (endTurnSheet, discardSheet, removeSheet)
{
	this._endTurnBitmap = ImageManager.loadBitmap("img/CGC/buttons/", endTurnSheet);
	this._discardBitmap = ImageManager.loadBitmap("img/CGC/buttons/", discardSheet);
	this._removeBitmap = ImageManager.loadBitmap("img/CGC/buttons/", removeSheet);
	this._highlightSprite.bitmap = this._endTurnBitmap;
	this.bitmap = this._endTurnBitmap;
	this.bitmap.addLoadListener(this.updateBitmaps.bind(this));
	this.updateBitmaps();
};

Sprite_EndTurnButton.prototype.updateBitmaps = function ()
{
	
	var isEnabled = this.isEnabled();
	var mode = SceneManager._scene._skillWindow._discardMode;
	var isDiscard = BattleManager._phase == 'discard';
	if (mode == '')
		this.bitmap = this._endTurnBitmap;
	else if (mode == 'remove')
		this.bitmap = this._removeBitmap;
	else
		this.bitmap = this._discardBitmap;
	this._highlightSprite.bitmap = this.bitmap;

	var frameWidth = this.bitmap.width / 3;
	var frameHeight = this.bitmap.height;

	if (isDiscard)
	{
		var discardZone = this._skillWindow._cardsReadyToDiscard.getCardSprites();
		var cardsToDiscard = BattleManager._cardsToDiscard - discardZone.length
		if (cardsToDiscard > 0)
		{
			this.setFrame(frameWidth, 0, frameWidth, frameHeight);
		}
		else
		{
			this.setFrame(0, 0, frameWidth, frameHeight);
		}

	}
	else if (isEnabled && BattleManager._phase == 'input')
	{
		this.setFrame(0, 0, frameWidth, frameHeight);
	}
	else //if (!isEnabled || BattleManager._phase == 'turn')
	{
		this.setFrame(frameWidth, 0, frameWidth, frameHeight);
	}
	if (this._skillWindow == undefined) return this._highlightSprite.visible = false;
	if (this._skillWindow.index() == this._index && !this._skillWindow.previewOnly)
	{
		this._highlightSprite.setFrame(frameWidth * 2, 0, frameWidth, frameHeight);
		this._highlightSprite.visible = true;
	}
	else
		this._highlightSprite.visible = false;
};

Sprite_EndTurnButton.prototype.endTurn = function ()
{
	this.bitmap = this._disabledBitmap;
};

Sprite_EndTurnButton.prototype.isEnabled = function ()
{
	try
	{
		var isEnabled = eval(Myth.CGC.buttonInfo.endTurn.enabledCondition);
		return isEnabled;
	}
	catch (e)
	{
		var warningMessage = "Error evaluating the End Turn Use Condition:\n" + Myth.CGC.buttonInfo.endTurn.enabledCondition + "\n";
		console.warn(warningMessage + e);
		return false;
	}

}

//============================================================================
// MZ Touch Input
//============================================================================

if (Myth.Util.usingMZ)
{

	Sprite_EndTurnButton.prototype.onClick = function ()
	{
		SceneManager._scene._skillWindow.confirmByCard('endTurn');
	};

	Sprite_EndTurnButton.prototype.onMouseEnter = function ()
	{
		SceneManager._scene._skillWindow.selectByCard('endTurn');
	};

	Sprite_CardButton.prototype.onClick = function ()
	{
		SceneManager._scene._skillWindow.confirmByCard(this._name);
	};

	Sprite_CardButton.prototype.onMouseEnter = function ()
	{
		SceneManager._scene._skillWindow.selectByCard(this._name);
	};
}


// Spritegroup_Cards is an object containing a multidimensional array
// of Sprite_SkillCards.
// (formerly CardZone)
// It is named Spritegroup because it does not use the behavior of Spriteset.
// 
function Spritegroup_Cards()
{
	this.initialize.apply(this, arguments);
}

Spritegroup_Cards.prototype.initialize = function (actors)
{
	this.cardSprites = [];
	this._actors = actors;
	for (var i = 0; i < actors.length; i++)
	{
		this.cardSprites[actors[i].actorId()] = [];
	}

	this._currentActor = null;
}
	

Spritegroup_Cards.prototype.cardSprite = function (index, actor)
{
	if (!actor)
		actor = this._currentActor;
	if (!actor)
		return -1;

	return this.cardSprites[actor.actorId()][index];
}

Spritegroup_Cards.prototype.getCardSprites = function (actor)
{
	if (!actor)
		actor = this._currentActor;
	if (!actor)
		return -1;
	return this.cardSprites[actor.actorId()];
}

	//gets cards of all actors except the current one
Spritegroup_Cards.prototype.getOtherCardSprites = function (actor)
{
	if (!actor)
		actor = this._currentActor;
	if (!actor)
		return -1;

	var cards = [];
	for (var i = 0; i < this._actors.length; i++)
	{
		if (this._actors[i] == actor) continue;
		cards = cards.concat(this.getCardSprites(this._actors[i]));
	}

	return cards;
}

Spritegroup_Cards.prototype.getAllCardSprites = function ()
{
	var cards = [];
	for (var i = 0; i < this._actors.length; i++)
	{
		cards = cards.concat(this.getCardSprites(this._actors[i]));
	}

	return cards;
}

Spritegroup_Cards.prototype.pushCardSprite = function (sprite, actor)
{
	if (!actor)
		actor = this._currentActor;
	if (!actor)
		return -1;

	this.cardSprites[actor.actorId()].push(sprite);
}

Spritegroup_Cards.prototype.popCardSprite = function (actor, index)
{
	if (index == undefined)
		index = 0;

	if (!actor)
		actor = this._currentActor;
	if (!actor)
		return -1;

	var card = this.cardSprites[actor.actorId()][index];
	this.cardSprites[actor.actorId()].splice(index, 1);
	return card;
}

Spritegroup_Cards.prototype.setActor = function (actor)
{
	this._currentActor = actor;
}

Spritegroup_Cards.prototype.clear = function (actor)
{
	if (!actor)
		actor = this._currentActor;
	if (!actor)
		return -1;

	this.cardSprites[actor.actorId()] = [];
}

Spritegroup_Cards.prototype.pushActor = function(actor)
{
	this._actors.push(actor);
	this.cardSprites[actor.actorId()] = [];
}



Myth.CGC.Window_Help_setItem = Window_Help.prototype.setItem;
Window_Help.prototype.setItem = function (item)
{
	if (item instanceof Game_Card)
	{
		var dataSkill = $dataSkills[item._skillId];
		this.setItem(dataSkill);
	}
	else
	{
		return Myth.CGC.Window_Help_setItem.call(this, item);
	}
}


Myth.CGC.Window_BattleSkill_initialize = Window_BattleSkill.prototype.initialize;
Window_BattleSkill.prototype.initialize = function (x, y, width, height)
{
	Myth.CGC.Window_BattleSkill_initialize.call(this, x, y, width, height);

	if (!$gameSystem._cardBattleEnabled)
		return;

	

	this.opacity = 0;
	this.contentsOpacity = 0;

	

	this._discardMode = '';

	this._extraButtons = [];
	this._zoneSprites = SceneManager._scene._zoneSprites;
	this.initializeSpritegroups();
};

Window_BattleSkill.prototype.initializeSpritegroups = function ()
{
	var actors = $gameParty.allMembers().slice(0, $gameParty.maxBattleMembers());

	this._cardSprites = new Spritegroup_Cards(actors);
	this._deckSpritegroup = new Spritegroup_Cards(actors);
	this._discardedSprites = new Spritegroup_Cards(actors);
	this._removedSprites = new Spritegroup_Cards(actors);

	this._cardsReadyToDiscard = new Spritegroup_Cards(actors);

	//this one isn't a Spritegroup_Cards, it's transitioning to the deck
	// and is purely cosmetic
	this._resetCardSprites = [];

/*	if (this._deckSprite)
		this._deckSprite.setSpritegroup()*/
/*	if (this._discardSprite)
		this._discardSprite.setSpritegroup(this._discardedSprites);*/
	for (var i = 0; i < this._zoneSprites.length; i++)
	{
		this._zoneSprites[i].setSpritegroup(new Spritegroup_Cards(actors));
	}
}

Window_BattleSkill.prototype.addActorToZones = function(actor)
{
	this._cardSprites.pushActor(actor);
	this._deckSpritegroup.pushActor(actor);
	this._discardedSprites.pushActor(actor);
	this._removedSprites.pushActor(actor);
	this._cardsReadyToDiscard.pushActor(actor);

	for (var i = 0; i < this._zoneSprites.length; i++)
	{
		this._zoneSprites[i]._spritegroup.pushActor(actor);
	}
}

Window_BattleSkill.prototype.isTouchedInsideFrame = function ()
{
	return true;
};

Myth.CGC.Window_BattleSkill_maxCols = Window_BattleSkill.prototype.maxCols;
Window_BattleSkill.prototype.maxCols = function ()
{
	if ($gameSystem._cardBattleEnabled)
		return 10;
	else
		return Myth.CGC.Window_BattleSkill_maxCols.call(this);
};


//Compatibility with SDJB_MouseHover
Window_BattleSkill.prototype.MouseInsideWindow = function ()
{
	return true;
};

//Compatibility with TDDP_MouseSystemEx
Window_BattleSkill.prototype.cursorIsWithinWindow = function ()
{
	return true;
}

Myth.CGC.Window_BattleSkill_show = Window_BattleSkill.prototype.show;
Window_BattleSkill.prototype.show = function ()
{
	if (!$gameSystem._cardBattleEnabled)
		return Myth.CGC.Window_BattleSkill_show.call(this);

	var cards = this._cardSprites.getCardSprites();
	for (var i = 0; i < cards.length; i++)
	{
		cards[i].show();
	}

	if (Myth.CGC.showHelpWindow)
	{
		this.showHelpWindow();
	}
};

Myth.CGC.Window_BattleSkill_hide = Window_BattleSkill.prototype.hide;
Window_BattleSkill.prototype.hide = function ()
{
	Myth.CGC.Window_BattleSkill_hide.call(this);

};

Window_BattleSkill.prototype.addCardToZone = function (card, zone, actor)
{
	var startingZone = { name: "$default" };
	var endingZone = actor.getZoneByName(zone);
	this.moveCardSprite(card, -1, startingZone, endingZone, actor);
	SoundManager.playAddCard();
}

//regardless of zone, including custom zones, this handles the movement of cards, creating a card if need be
Window_BattleSkill.prototype.moveCardSprite = function (card, index, startingZone, endingZone, actor)
{
	actor = actor || this._actor;
	var dataStartingZone = Myth.Util.getZoneDataByName(startingZone.name);
	var spriteCard = null;
	if (dataStartingZone.showCards != "No" && dataStartingZone.name != "$default")
	{
		var startingSpritegroup = this.getSpritegroupFromName(startingZone.name);
		spriteCard = startingSpritegroup.popCardSprite(actor, index);
		if (spriteCard)
			spriteCard.show();
	}
	if (spriteCard == null || spriteCard == -1)
	{
		spriteCard = new Sprite_SkillCard(card, actor);
		SceneManager._scene.addCardSprite(spriteCard);
		spriteCard.x = dataStartingZone.coordinates.x; spriteCard.y = dataStartingZone.coordinates.y;
		spriteCard.scale.x = dataStartingZone.cardScale; spriteCard.scale.y = dataStartingZone.cardScale;
		spriteCard.rotation = dataStartingZone.cardRotation * Math.PI / 180;
	}
	var endingSpritegroup = this.getSpritegroupFromName(endingZone.name);
	endingSpritegroup.pushCardSprite(spriteCard, actor);
	this.makeItemList();
}

Window_BattleSkill.prototype.holdUsedCard = function ()
{
	var index = this.index();
	index -= this._itemsBeforeCards;
	var handCards = this._cardSprites.getCardSprites();
	var cardSprite = handCards[index];

	if (cardSprite)
	{
		cardSprite._enabledSprite.hide();
		cardSprite._discardSprite.hide();
		handCards.splice(index, 1);
		this._activeCardSprite = cardSprite;
		var card = this._actor._cardHand.splice(index, 1);
	}

	this._actor.updateCardVariables();
	this.deselect();

	this.makeItemList();
};

Window_BattleSkill.prototype.resolveUsedCard = function (zoneName)
{
	if (this._activeCardSprite)
	{
		var card = this._activeCardSprite.card();
		var skill = $dataSkills[card.id()];
		if (zoneName == 'remove' || skill._removeAfterPlay || (skill._cardPassives && skill._cardPassives.removeAfterPlay))
		{
			this._removedSprites.getCardSprites().push(this._activeCardSprite);
			SoundManager.playRemoveCard();
			this._actor.removedCards++;
		}
		else
		{
			var destination = this._actor.getZoneByName(zoneName);
			if (!destination)
			{
				console.warn("CGC warning: Could not find a zone named " + zoneName);
				zoneName = "discard";
				destination = this._actor.getZoneByName(zoneName);
			}
			var destinationSpritegroup = this.getSpritegroupFromName(zoneName);
			destination.add(card);
			SoundManager.playEnterZone(zoneName);
			destinationSpritegroup.pushCardSprite(this._activeCardSprite);
		}
		this._activeCardSprite = null;
	}
	//SceneManager._scene.reorderCardSprites();
	if (this._actor)
		this._actor.updateCardVariables();
}

Window_BattleSkill.prototype.discardCard = function (index)
{
	index -= this._itemsBeforeCards;
	var handCards = this._cardSprites.getCardSprites();
	var cardSprite = handCards[index];
	if (cardSprite)
	{
		cardSprite._enabledSprite.hide();
		cardSprite._discardSprite.hide();
		if (this._discardMode == 'discard' || this._discardMode == '')
		{
			this._actor.moveCard(index, this._actor._cardHand, this._actor._cardDiscard);

		}
		else if (this._discardMode == 'remove')
		{
			handCards.splice(index, 1);
			this._removedSprites.getCardSprites().push(cardSprite);
			//Don't want Removal effect to trigger the Exit effect
			var card = this._actor._cardHand.splice(index, 1);
			SoundManager.playRemoveCard();
			this._actor.removedCards++;
		}
		else
		{
			var zone = this._actor.getZoneByName(this._discardMode);
			if (zone != null)
			{
				this._actor.moveCard(index, this._actor._cardHand, zone);
			}
		}
	}

	this._actor.updateCardVariables();
	this.deselect();
	
	this.makeItemList();
};

Window_BattleSkill.prototype.removeCard = function (index, exitEffect)
{
	if (exitEffect == undefined) exitEffect = true;
	index -= this._itemsBeforeCards;
	var cards = this._cardSprites.getCardSprites();
	var cardSprite = cards[index];
	if (cardSprite)
	{
		cardSprite._enabledSprite.hide();
		cardSprite._discardSprite.hide();
		cards.splice(index, 1);
		this._removedSprites.getCardSprites().push(cardSprite);
		SoundManager.playRemoveCard();
		if (exitEffect)
		{
			var skill = this._actor.exitCard(this._actor._cardHand, index);
			this._actor.removedCards++;
		}
	}

	this._actor.updateCardVariables();
	this.deselect();

	this.makeItemList();
}

Window_BattleSkill.prototype.discardAllCards = function ()
{
	var handCards = this._cardSprites.getCardSprites();
	for (var i = handCards.length - 1; i >= 0; i--)
	{
		this.discardCard(i + this._itemsBeforeCards);
	}
}

Myth.CGC.Window_BattleSkill_update = Window_BattleSkill.prototype.update;
Window_BattleSkill.prototype.update = function ()
{
	Myth.CGC.Window_BattleSkill_update.call(this);
	if ($gameSystem._cardBattleEnabled)
	{
		this.updateDiscardPosition();
		this.updateRemovedPosition();
		this.updateHandPosition();
		this.updateResetCardPosition();
		this.updateExtraZonePosition();

		this.updateActiveCardSpritePosition();
	}

};

Window_BattleSkill.prototype.getCardX = function (index, cardZone)
{
	var zoneInfo = Myth.CGC.zoneInfo.hand;
	var centerX = zoneInfo.coordinates.x;
	var totalCards = cardZone.length;

	var compareMaxCards = Math.max(10, 5 + totalCards);
	var spaceBetweenCards = (120 * (1 + (5 - totalCards) / (compareMaxCards)));
	spaceBetweenCards = Math.max(spaceBetweenCards, zoneInfo.minCardSeparationW);
	var totalSpace = Math.min(spaceBetweenCards * (totalCards - 1), zoneInfo.maxHandWidth);
	spaceBetweenCards = (totalSpace / (totalCards - 1)) || 0;

	var cardX = (spaceBetweenCards * index) - totalSpace / 2 + centerX;


/*	//var compareMaxCards = Math.max(10, 5 + totalCards);
	//var spaceBetweenCards = (120 * (1 + (5 - totalCards) / (compareMaxCards)));
	//spaceBetweenCards = Math.max(spaceBetweenCards, zoneInfo.minCardSeparationW);
	var spaceBetweenCards = 120;
	var totalSpace = spaceBetweenCards * (totalCards - 1);
	//spaceBetweenCards = totalSpace / totalCards;

	var cardX = centerX + (spaceBetweenCards * index) - (totalSpace / 2);*/

	var pos = (index + this._itemsBeforeCards);
	if (pos == this.index() && SceneManager._scene._enemyWindow && SceneManager._scene._enemyWindow.visible)
	{
		var enemy = SceneManager._scene._enemyWindow.enemy();
		if (enemy.isEnemy())
		{
				cardX = enemy._screenX;
		}
		else if (enemy.isSpriteVisible())
		{
			// This will be where we make the card move to the actor sprite
			// as soon as we figure out how to access it.
			// There's a Game_Actor variable stored in `enemy`, but
			// Game_Actors don't have access to Sprite_Actors,
			// so we don't know its x coordinate.
			var spriteset = BattleManager._spriteset;
			var battlerSprites = spriteset.battlerSprites();
			for (var i = 0; i < battlerSprites.length; i++)
			{
				if (battlerSprites[i]._actor == enemy)
				{
					cardX = battlerSprites[i].x;
					break;
				}
			}
		}
	}

	return cardX;
};

Window_BattleSkill.prototype.getCardY = function (index, card, cardX)
{
	var zoneInfo = Myth.CGC.zoneInfo.hand;
	var centerX = zoneInfo.coordinates.x;

	var cardY = zoneInfo.coordinates.y;
	var distanceFromCenterY = Math.abs(cardX - centerX) / 10;
	cardY += (distanceFromCenterY * zoneInfo.cardHeightMulti);
	var pos = (index + this._itemsBeforeCards);
	if (pos == this.index())
	{
		cardY -= zoneInfo.selectedCardYOff;

		if (SceneManager._scene._actorWindow && SceneManager._scene._actorWindow.active)
			cardY -= zoneInfo.selectedCardYOff;

		if (SceneManager._scene._enemyWindow && SceneManager._scene._enemyWindow.visible)
		{
			cardY -= zoneInfo.selectedCardYOff;
		}
	}

	if (card._readyToDiscard)
		cardY -= zoneInfo.discardingCardYOff;

	if (!this.active)
	{
		cardY += zoneInfo.inactiveCardYOff;
	}

	return cardY;
}

Window_BattleSkill.prototype.getActiveCardY = function ()
{
	var zoneInfo = Myth.CGC.zoneInfo.hand;
	var cardY = zoneInfo.coordinates.y;
	cardY -= zoneInfo.selectedCardYOff * 3;

	return cardY;
}

Window_BattleSkill.prototype.updateHandPosition = function ()
{	var cardZone = this._cardSprites.getCardSprites();
	for (var i = cardZone.length - 1; i >= 0; i--)
	{
		this.updateHandCardPosition(i, cardZone);
	}


	var otherCards = this._cardSprites.getOtherCardSprites();
	for (var i = otherCards.length - 1; i >= 0; i--)
	{
		var card = otherCards[i];
		var cardY = Graphics.boxHeight + card.height + 40;

		if (card.y != cardY)
		{
			card.y += (cardY - card.y) / 10;
		}
	}
}

Window_BattleSkill.prototype.updateHandCardPosition = function (index, cardGroup)
{
	var zoneInfo = Myth.CGC.zoneInfo.hand;
	var centerX = zoneInfo.coordinates.x;
	var card = cardGroup[index];
	var cardX = this.getCardX(index, cardGroup);
	var cardY = this.getCardY(index, card, cardX);

	if (card.x != cardX || card.y != cardY)
	{
		card.x += (cardX - card.x) / 10;
		card.y += (cardY - card.y) / 10;
	}

	var targetSkew = { x: 0, y: 0 };
	if (card.skew.x != targetSkew.x || card.skew.y != targetSkew.y)
	{
		card.skew.x += (targetSkew.x - card.skew.x) / 10;
		card.skew.y += (targetSkew.y - card.skew.y) / 10;
	}

	var pos = (index + this._itemsBeforeCards);
	var targetAngle = ((cardX - centerX) / 2000) * zoneInfo.cardRotationMulti;
	if (pos == this.index())
		targetAngle = 0;

	if (card.rotation != targetAngle)
		card.rotation += (targetAngle - card.rotation) / 10;

	var targetScale = 1;
	if (card.scale.x != targetScale || card.scale.y != targetScale)
	{
		card.scale.x += (targetScale - card.scale.x) / 10;
		card.scale.y += (targetScale - card.scale.y) / 10;
	}
}

Window_BattleSkill.prototype.updateSpritegroupPosition = function (spritegroup, zoneData)
{
	var cardSprites = spritegroup.getCardSprites();
	for (var i = cardSprites.length - 1; i >= 0; i--)
	{
		var cardSprite = cardSprites[i];
		this.updateCardSpritePosition(cardSprite, zoneData);


		var targetAngle = zoneData.cardRotation * Math.PI / 180;
		if (zoneData.showCards == "No" &&
			Math.round(cardSprite.x) == zoneData.coordinates.x && Math.round(cardSprite.y) == zoneData.coordinates.y
			&& Math.round(cardSprite.rotation) == Math.round(targetAngle)
			&& Math.round(cardSprite.scale.x * 100) == Math.round(zoneData.cardScale * 100))
		{
			cardSprites.splice(i, 1);
			SceneManager._scene.removeCardSprite(cardSprite);
		}
	}
};

Window_BattleSkill.prototype.updateCardSpritePosition = function (cardSprite, zoneData)
{
	var zoneX = zoneData.coordinates.x; var zoneY = zoneData.coordinates.y;
	if (cardSprite.x != zoneX || cardSprite.y != zoneY)
	{
		cardSprite.x += (zoneX - cardSprite.x) / 10;
		cardSprite.y += (zoneY - cardSprite.y) / 10;
	}

	var targetSkew = zoneData.skew;
	if (zoneData == Myth.CGC.zoneInfo.discard)
	{
		//console.log(targetSkew);
		//console.log(cardSprite.skew);
	}
	if (cardSprite.skew.x != targetSkew.x || cardSprite.skew.y != targetSkew.y)
	{
		cardSprite.skew.x += (targetSkew.x - cardSprite.skew.x) / 10;
		cardSprite.skew.y += (targetSkew.y - cardSprite.skew.y) / 10;
	}

	var targetAngle = zoneData.cardRotation * Math.PI / 180;
	if (cardSprite.rotation != targetAngle)
		cardSprite.rotation += (targetAngle - cardSprite.rotation) / 10;

	var targetScale = zoneData.cardScale;
	if (cardSprite.scale.x != targetScale)
	{
		cardSprite.scale.x += (targetScale - cardSprite.scale.x) / 10;
		cardSprite.scale.y += (targetScale - cardSprite.scale.y) / 10;
	}
}

Window_BattleSkill.prototype.updateDiscardPosition = function ()
{
	var discardData = Myth.CGC.zoneInfo.discard;
	this.updateSpritegroupPosition(this._discardedSprites, discardData);
};

Window_BattleSkill.prototype.updateRemovedPosition = function ()
{
	var actors = $gameParty.members();
	for (var index = 0; index < actors.length; index++)
	{
		if (!actors[index].isActor()) continue;
		var removedCards = this._removedSprites.getCardSprites(actors[index]);
		if (removedCards == -1 || removedCards == null) continue;
		for (var i = removedCards.length - 1; i >= 0; i--)
		{
			var card = removedCards[i];
			var toBeRemoved = false;
			if (Myth.CGC.removeMode == 'Fade')
			{
				toBeRemoved = this.updateRemoveFadeAnim(card);
			}
			else if (Myth.CGC.removeMode == 'Burn')
			{
				toBeRemoved = this.updateRemoveBurnAnim(card);
			}

			if (toBeRemoved)
			{
				removedCards.splice(i, 1);
				SceneManager._scene.removeCardSprite(card);
			}
		}
	}
};

Window_BattleSkill.prototype.updateExtraZonePosition = function ()
{
	for (var zoneIndex = 0; zoneIndex < this._zoneSprites.length; zoneIndex++)
	{
		var zoneData = Myth.Util.getZoneDataByName(this._zoneSprites[zoneIndex].name);
		var spritegroup = this._zoneSprites[zoneIndex]._spritegroup;
		if (!spritegroup) continue;
		this.updateSpritegroupPosition(spritegroup, zoneData);
	}
};

Window_BattleSkill.prototype.updateActiveCardSpritePosition = function ()
{
	if (this._activeCardSprite == null) return;

	var zoneData = Myth.CGC.zoneInfo.tempZone;
	this.updateCardSpritePosition(this._activeCardSprite, zoneData);
/*	var card = this._activeCardSprite;
	var targetY = this.getActiveCardY();
	{
		card.y += (targetY - card.y) / 10;
	}*/

/*	var targetScale = 2;
	if (card.scale.x != targetScale)
	{
		card.scale.x += (targetScale - card.scale.x) / 10;
		card.scale.y += (targetScale - card.scale.y) / 10;
	}*/
}

Window_BattleSkill.prototype.updateRemoveFadeAnim = function (card)
{
	card.y -= 3;
	card.opacity -= 7;
	if (card.opacity <= 0)
	{
		return true;
	}

	return false;
};

Window_BattleSkill.prototype.updateRemoveBurnAnim = function (card)
{
	SceneManager._scene.removeCardSprite(card);
	SceneManager._scene.addCardSprite(card);
	//card.y -= 1;
	if (card.rotation != 0)
	{
		card.rotation += (-card.rotation) / 10;
	}
	var maxTime = 80;
	if (card.burnTime == undefined)
		card.burnTime = maxTime;
	else
		card.burnTime--;
	//card.burnTime = card.burnTime - 1 || maxTime;
	var bitmapHeight = card.bitmap.height;
	var ratio = 1 - (card.burnTime / maxTime);
	if (ratio < 0)
		ratio = 0;
	var bitmap = new Bitmap(card.bitmap.width, card.bitmap.height);
	bitmap.blt(card.bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
	card.bitmap.clearRect(0, bitmapHeight * (1 - ratio), card.bitmap.width, bitmapHeight * ratio);
	card.bitmap.paintOpacity = 190;
	card.bitmap.blt(bitmap, 0, bitmapHeight * (1 - ratio), bitmap.width, bitmapHeight * ratio, 0, bitmapHeight * (1 - ratio));
	card.bitmap.paintOpacity = 255;
	//card.setFrame(0, 0, card.bitmap.width, bitmapHeight / (card.burnTime / maxTime));

	//console.log(card.burnTime);
	if (card.burnTime <= -10)
	{
		return true;
	}

	return false;
};

Window_BattleSkill.prototype.updateResetCardPosition = function ()
{
	this._resetTime--;
	if (this._resetTime <= 0)
	{
		this._resetTime = 10;
		this._resetNum++;
	}
	if (this._deckSpritegroup && this._deckSpritegroup.getCardSprites().length > 0)
	{
		var zoneData = Myth.CGC.zoneInfo.deck;
		var deckX = zoneData.coordinates.x;
		var deckY = zoneData.coordinates.y;
		var i = 0;
		var cardSprites = this._deckSpritegroup.getCardSprites();
		for (i = cardSprites.length - 1; i >= 0; i--)
		{
			var cardSprite = cardSprites[i];
			if (cardSprite.x != deckX || cardSprite.y != deckY)
			{
				cardSprite.x += (deckX - cardSprite.x) / 10;
				cardSprite.y += (deckY - cardSprite.y) / 10;
			}

			var targetAngle = zoneData.cardRotation * Math.PI / 180;
			if (cardSprite.rotation != targetAngle)
				cardSprite.rotation += (targetAngle - cardSprite.rotation) / 10;

			

			var targetScale = zoneData.cardScale;
			if (cardSprite.scale.x != targetScale)
			{
				cardSprite.scale.x += (targetScale - cardSprite.scale.x) / 10;
				cardSprite.scale.y += (targetScale - cardSprite.scale.y) / 10;
			}

			if (zoneData.showCards == "No" && Math.round(cardSprite.x) == deckX && Math.round(cardSprite.y) == deckY
				&& Math.round(cardSprite.rotation) == Math.round(targetAngle)
				&& Math.round(cardSprite.scale.x * 100) == Math.round(targetScale * 100))
			{
				this._deckSpritegroup.popCardSprite(this._actor, i);
				//cardSprites.splice(i, 1);
				SceneManager._scene.removeCardSprite(cardSprite);
			}

			if (cardSprites.length - i > this._resetNum) break;
		}

		if (SceneManager._scene._discardSprite)
			SceneManager._scene._discardSprite.setCardsLeft(i + 1);
	}
}

Window_BattleSkill.prototype.reshuffleDeck = function ()
{
	while (this._discardedSprites.getCardSprites().length > 0)
	{
		var cardSprite = this._discardedSprites.popCardSprite();
		this._deckSpritegroup.pushCardSprite(cardSprite);
	}
	//this._deckSpritegroup = this._resetCardSprites.concat(this._discardedSprites.getCardSprites());
	//this._discardedSprites.clear();

	this._resetNum = 0;
	this._resetTime = 10;
}

Myth.CGC.Window_BattleSkill_select = Window_BattleSkill.prototype.select;
Window_BattleSkill.prototype.select = function (index)
{

	Myth.CGC.Window_BattleSkill_select.call(this, index);
	if ($gameSystem._cardBattleEnabled)
		SceneManager._scene.reorderCardSprites(index - this._itemsBeforeCards);
};

Myth.CGC.Window_BattleSkill_setActor = Window_BattleSkill.prototype.setActor;
Window_BattleSkill.prototype.setActor = function (actor)
{
	var oldActor = this._actor;
	Myth.CGC.Window_BattleSkill_setActor.call(this, actor);
	if ($gameSystem._cardBattleEnabled)
	{
		if (oldActor != actor)
		{
			this.resetCards();
		}
			
	}
};

Window_BattleSkill.prototype.setDiscardMode = function (mode, type)
{
	var cardZone = this._cardSprites.getCardSprites();
	this._discardMode = mode;
	var highlightToShow = '_enabledSprite';
	var highlightsToHide = ['_discardSprite', '_removeSprite'];
	if (mode == 'remove')
	{
		highlightToShow = '_removeSprite';
		highlightsToHide = ['_enabledSprite', '_discardSprite'];
	}
	else if (mode != '')
	{
		highlightToShow = '_discardSprite';
		highlightsToHide = ['_enabledSprite', '_removeSprite'];
	}

	if (mode != '')
	{
		this._typeToSelect = type;
	}
	else
		this._typeToSelect = null;


	for (var i = 0; i < cardZone.length; i++)
	{
		var card = cardZone[i];
		if (!type)
			card[highlightToShow].show();
		card[highlightsToHide[0]].hide();
		card[highlightsToHide[1]].hide();
	}
	if (!!type)
	{
		this.showHighlightSpritesByType(type, highlightToShow);
	}
/*	if (mode != '')
	{
		for (var i = 0; i < cardZone.length; i++)
		{
			var card = cardZone[i];
			card._enabledSprite.hide();
			if (!type)
				card._discardSprite.show();
		}
		if (!!type)
		{
			this._typeToSelect = type;
			this.showDiscardSpritesByType(type);
		}
	}
	else
	{
		this._typeToSelect = null;
		for (var i = 0; i < cardZone.length; i++)
		{
			var card = cardZone[i];
			if (this.isEnabled(this._data[i + this._itemsBeforeCards]))
				card._enabledSprite.show();
			else
				card._enabledSprite.hide();
			card._discardSprite.hide();
		}
	}*/
	this.select(this._itemsBeforeCards);
};

Window_BattleSkill.prototype.showDiscardSpritesByType = function (type)
{
	//to be overridden in MYTH_CGC_CardTypes
}

Myth.CGC.Window_BattleSkill_setHelpWindow = Window_BattleSkill.prototype.setHelpWindowItem;
Window_BattleSkill.prototype.setHelpWindowItem = function (item)
{
	if ($gameSystem._cardBattleEnabled)
	{
		if (!this._helpWindow) return;

		if (item instanceof Game_Card)
		{
			var skill = $dataSkills[item.id()];
			item = skill;
		}

		if (item == 'itemMenu')
		{
			this._helpWindow.setText(Myth.CGC.buttonInfo.itemButton.description);
		}
		else if (item == 'endTurn')
		{
			if (this._discardMode == 'discard')
			{
				this._helpWindow.setText(Myth.CGC.discardDescription);
			}
			else
			{
				this._helpWindow.setText(Myth.CGC.endTurnDescription);
			}
		}
		else if (typeof item === "string")
		{
			if (item == 'discardPile') item = 'discard';
			var dataZone = Myth.Util.getZoneDataByName(item);
			if (dataZone.name == "$default")
				return;

			this._helpWindow.setText(dataZone.description);
		}
		else
		{
			Myth.CGC.Window_BattleSkill_setHelpWindow.call(this, item);
			
		}
	}
	else
	{
		Myth.CGC.Window_BattleSkill_setHelpWindow.call(this, item);
	}
}

Window_BattleSkill.prototype.readyDiscard = function (index)
{
	if (index < this._itemsBeforeCards)
		return;
	if (index >= this._itemsBeforeCards + this._cardSprites.getCardSprites().length)
		return;

	var doesCondtain = false;
	index -= this._itemsBeforeCards;
	var cardsToDiscard = this._cardsReadyToDiscard.getCardSprites();

	for (var i = cardsToDiscard.length - 1; i >= 0; i--)
	{
		if (cardsToDiscard[i] == index)
		{
			doesCondtain = true;
			cardsToDiscard.splice(i, 1);
			this._cardSprites.getCardSprites()[index]._readyToDiscard = false;
			//this._cardsReadyToDiscard[i]._readyToDiscard = false;
		}
	}

	if (!doesCondtain && cardsToDiscard.length < BattleManager._cardsToDiscard)
	{
		cardsToDiscard.push(index);
		this._cardSprites.getCardSprites()[index]._readyToDiscard = true;
		//this._cardsReadyToDiscard[i]._readyToDiscard = true;

		if (!Myth.CGC.showEndTurn)
			this.discardSelectedCards();
	}
		
};

Window_BattleSkill.prototype.discardSelectedCards = function ()
{
	var cardsToDiscard = this._cardsReadyToDiscard.getCardSprites();
	if (cardsToDiscard.length == BattleManager._cardsToDiscard)
	{
		cardsToDiscard.sort(function (a, b) { return a - b });
		for (var i = cardsToDiscard.length - 1; i >= 0; i--)
		{
			this._cardSprites.getCardSprites()[cardsToDiscard[i]]._readyToDiscard = false;
			this.discardCard(cardsToDiscard[i] + this._itemsBeforeCards);
			BattleManager._cardsToDiscard--;
		}

		this._cardsReadyToDiscard.clear();
	}
	
};



Myth.CGC.Window_BattleSkill_onTouch = Window_BattleSkill.prototype.onTouch;
Window_BattleSkill.prototype.onTouch = function (triggered)
{
	if (!$gameSystem._cardBattleEnabled)
	{
		Myth.CGC.Window_BattleSkill_onTouch.call(this, triggered);
		return;
	}

	var lastIndex = this.index();
	var currentIndex = -1;
	var isBattle = this.isInBattle();
	var handCards = isBattle ? this._cardSprites.getCardSprites() : this._cardSprites;
	for (var i = handCards.length - 1; i >= 0; i--)
	{
		var sprite = handCards[i];
		if (sprite.isTouchedInsideFrame())
		{
			currentIndex = i + this._itemsBeforeCards;
			break;
		}
			
	}
	if (currentIndex == -1)
	{
		currentIndex = this.processTouchForSpecialItems(currentIndex);
	}
	if (currentIndex != -1)
	{
		if (currentIndex === lastIndex)
		{
			if (triggered && this.isTouchOkEnabled())
			{
				this.processOk();
			}
		}
		else if (this.isCursorMovable())
		{
			this.select(currentIndex);
		}
	}
	if (this.index() !== lastIndex)
	{
		SoundManager.playCursor();
	}
};

Window_BattleSkill.prototype.processTouchForSpecialItems = function (currentIndex)
{
	if (currentIndex == -1 && this._endTurnButton)
	{
		if (this._endTurnButton.isTouchedInsideFrame())
		{
			currentIndex = this._endTurnButton._index;
		}

	}
	if (currentIndex == -1 && this._itemButton)
	{
		if (this._itemButton.isTouchedInsideFrame())
			currentIndex = this._itemButton._index;
	}

	if (currentIndex == -1 && this._deckSprite && this._deckSprite.isTouchedInsideFrame())
		currentIndex = this._deckSprite._index;
	if (currentIndex == -1 && this._discardSprite && this._discardSprite.isTouchedInsideFrame())
		currentIndex = this._discardSprite._index;

	//buttons
	if (currentIndex == -1)
	{
		for (var i = 0; i < this._extraButtons.length; i++)
		{
			if (this._extraButtons[i].isTouchedInsideFrame())
			{
				currentIndex = this._extraButtons[i]._index;
				break;
			}
		}
	}

	//extra zones
	if (currentIndex == -1)
	{
		for (var i = 0; i < this._zoneSprites.length; i++)
		{
			if (this._zoneSprites[i].isTouchedInsideFrame())
			{
				currentIndex = this._zoneSprites[i]._index;
				break;
			}
		}
	}

	return currentIndex;
};

Myth.CGC.Window_BattleSkill_isEnabled = Window_BattleSkill.prototype.isEnabled;
Window_BattleSkill.prototype.isEnabled = function (item)
{
	if (!$gameSystem._cardBattleEnabled)
	{
		return Myth.CGC.Window_BattleSkill_isEnabled.call(this, item);
	};

	if (item == 'deck' || item == 'discardPile')
		return true;
	if (this.isZoneName(item)) return true;

	if (item && !!item.buttonName)
	{
		return this.isExtraButtonEnabled(item);
	}
	if (Myth.CGC.showEndTurn && this.index() == this.endTurnIndex() && BattleManager._phase != 'discard')
		return this._endTurnButton.isEnabled();
	else if (BattleManager._phase == 'discard')
		return this.isCorrectType(item, this._typeToSelect);
	else if (item == 'itemMenu' || item == 'endTurn')
		return this._itemButton.isEnabled();
	else
		return Myth.CGC.Window_BattleSkill_isEnabled.call(this, item);
}

Window_BattleSkill.prototype.isCorrectType = function (item, type)
{
	return true;
	//to be overridden in MYTH_CGC_CardTypes
};

Window_BattleSkill.prototype.isExtraButtonEnabled = function (item)
{
	var button = this.getButtonFromName(item.buttonName);
	if (button)
	{
		return button.isEnabled();
	}
	return false;
};

Window_BattleSkill.prototype.getButtonFromName = function (name)
{
	for (var i = 0; i < this._extraButtons.length; i++)
	{
		if (this._extraButtons[i]._name == name)
		{
			return this._extraButtons[i];
		}
	}
	return null;
};

Window_BattleSkill.prototype.getSpritegroupFromName = function (name)
{
	name = name.trim().toLowerCase();
	if (name == 'deck')
		return this._deckSpritegroup;
	else if (name == 'discard')
		return this._discardedSprites;
	else if (name == 'hand')
		return this._cardSprites;
	for (var i = 0; i < this._zoneSprites.length; i++)
	{
		if (this._zoneSprites[i].name == name)
		{
			return this._zoneSprites[i]._spritegroup;
		}
	}
	return null;
}

Window_BattleSkill.prototype.isZoneName = function (name)
{
	for (var i = 0; i < this._zoneSprites.length; i++)
	{
		if (this._zoneSprites[i].name == name)
		{
			return true;
		}
	}
	return false;
}

Myth.CGC.Window_BattleSkill_item = Window_BattleSkill.prototype.item;
Window_BattleSkill.prototype.item = function ()
{
	var item = Myth.CGC.Window_BattleSkill_item.call(this);
	if (item && !!item.buttonName)
	{
		item = $dataSkills[item.skillId];
	}
	return item;
}

Window_BattleSkill.prototype.resetCards = function ()
{

	var actor = this._actor;

	this._cardSprites.setActor(actor);
	this._deckSpritegroup.setActor(actor);
	this._discardedSprites.setActor(actor);
	this._removedSprites.setActor(actor);
	this._cardsReadyToDiscard.setActor(actor);
	for (var i = 0; i < this._zoneSprites.length; i++)
	{
		var spritegroup = this._zoneSprites[i]._spritegroup;
		spritegroup.setActor(actor);
	}

	var handCards = this._cardSprites.getCardSprites();
	for (var i = 0; i < actor._cardHand.length; i++)
	{
		var card = actor._cardHand.card(i);
		var skill = $dataSkills[card.id()];
		if (handCards.length >= i && handCards[i]._skill == skill)
		{
			handCards[i].show();
		}
		else
		{
			var cardSprite = new Sprite_SkillCard(card, actor);
			handCards.push(cardSprite);
			SceneManager._scene.addCardSprite(cardSprite);
		}
	}

	var discardCards = this._discardedSprites.getCardSprites();
	for (var i = 0; i < actor._cardDiscard.length; i++)
	{
		var card = actor._cardDiscard.card(i);
		var skill = $dataSkills[card.id()];
		if (discardCards.length >= i && discardCards[i]._skill == skill)
		{
			discardCards[i].show();
		}
		else
		{
			var cardSprite = new Sprite_SkillCard(card, actor);
			this._discardedSprites.getCardSprites().push(cardSprite);
			SceneManager._scene.addCardSprite(cardSprite);
		}

	}

	var otherCards = this._discardedSprites.getOtherCardSprites();
	for (var i = otherCards.length - 1; i >= 0; i--)
	{
		otherCards[i].hide();
	}

	if (SceneManager._scene._discardSprite)
		SceneManager._scene._discardSprite.setCardsLeft(actor._cardDiscard.length);

	if (SceneManager._scene._deckSprite)
		SceneManager._scene._deckSprite.setCardsLeft(actor._cardDeck.length);

	for (var i = 0; i < this._zoneSprites.length; i++)
	{
		var zone = actor._extraZones[i];
		this._zoneSprites[i].setCardsLeft(zone.length);
	}

	this.makeItemList();
};

Myth.CGC.Window_BattleSkill_makeItemList = Window_BattleSkill.prototype.makeItemList;
Window_BattleSkill.prototype.makeItemList = function ()
{
	if (!$gameSystem._cardBattleEnabled)
	{
		Myth.CGC.Window_BattleSkill_makeItemList.call(this);
		return;
	}
	this._data = [];
	this._itemsBeforeCards = 0;

	var cards = this._cardSprites.getCardSprites();

	var addedHand = false;

	if (cards)
	{
		for (var buttonIndex = 0; buttonIndex < Myth.CGC.buttonOrder.length; buttonIndex++)
		{
			var button = Myth.CGC.buttonOrder[buttonIndex].toLowerCase();

			if (button == "hand")
			{
				addedHand = true;
				for (var i = 0; i < cards.length; i++)
				{
					var dataSkill = $dataSkills[cards[i]._skill];
					//if (!this.includes(dataSkill)) continue;
					this._data.push(cards[i]._skill);
					if (this.isEnabled(this._data[i + this._itemsBeforeCards]))
						cards[i]._enabledSprite.show();
					else
						cards[i]._enabledSprite.hide();
				}
			}
			else if (this.previewOnly)
				continue;
			else if (button == "item")
			{
				this._data.push('itemMenu');
				this._itemButton.setIndex(this._data.length - 1);

				if (!addedHand)
					this._itemsBeforeCards++;
			}
			else if (button == 'end' || button == 'endturn')
			{
				this._data.push($dataSkills[Myth.CGC.buttonInfo.endTurn.skillID]);
				this._endTurnButton.setIndex(this._data.length - 1);

				if (!addedHand)
					this._itemsBeforeCards++;
			}
			else if (button == 'deck')
			{
				this._data.push('deck');
				this._deckSprite.setIndex(this._data.length - 1);

				if (!addedHand)
					this._itemsBeforeCards++;
			}
			else if (button == 'discard')
			{
				this._data.push('discardPile');
				this._discardSprite.setIndex(this._data.length - 1);

				if (!addedHand)
					this._itemsBeforeCards++;
			}
			else
			{
				this.addCustomCardButton(button, addedHand);
				this.addCustomZone(button, addedHand);
			}
		}
	}
};

Window_BattleSkill.prototype.addCustomCardButton = function (buttonName, addedHand)
{
	for (var i = 0; i < this._extraButtons.length; i++)
	{
		var button = this._extraButtons[i];
		if (button._name.toLowerCase() == buttonName.toLowerCase())
		{
			var o = { buttonName: button._name, skillId: button.skillId() };
			this._data.push(o);
			button.setIndex(this._data.length - 1);

			if (!addedHand)
				this._itemsBeforeCards++;

			return;
		}
	}
};

Window_BattleSkill.prototype.addCustomZone = function (zoneName, addedHand)
{
	for (var i = 0; i < this._zoneSprites.length; i++)
	{
		var zone = this._zoneSprites[i];
		if (zone.name.toLowerCase() == zoneName.toLowerCase())
		{
			this._data.push(zone.name.toLowerCase());
			this._zoneSprites[i].setIndex(this._data.length - 1);
			if (!addedHand)
				this._itemsBeforeCards++;

			return;
		}
	}
}

Window_BattleSkill.prototype.endTurnIndex = function ()
{
	if (!this._endTurnButton) return -1;

	return this._endTurnButton._index;
}

Window_BattleSkill.prototype.itemButtonIndex = function ()
{
	if (!this._itemButton) return -1;

	return this._itemButton._index;
}

Window_BattleSkill.prototype.isInBattle = function ()
{
	return true;
}



Myth.CGC.Window_BattleStatus_numVisibleRows = Window_BattleStatus.prototype.numVisibleRows;
Window_BattleStatus.prototype.numVisibleRows = function ()
{
	if (!$gameSystem._cardBattleEnabled || !Myth.CGC.changeBattleWindows)
		return Myth.CGC.Window_BattleStatus_numVisibleRows.call(this);

	var actors = $gameParty.allMembers().slice(0, $gameParty.maxBattleMembers());
	return actors.length;
	//return 1;
};

Myth.CGC.Window_BattleStatus_windowWidth = Window_BattleStatus.prototype.windowWidth;
Window_BattleStatus.prototype.windowWidth = function ()
{
	if (!$gameSystem._cardBattleEnabled || !Myth.CGC.changeBattleWindows || (!Myth.CGC.statusWindowAtTop && !Myth.CGC.skipActorCommand))
		return Myth.CGC.Window_BattleStatus_windowWidth.call(this);

	return Graphics.boxWidth;
}

if (Myth.CGC.statusWindowAtTop || Myth.CGC.skipActorCommand)
{
	Myth.CGC.Window_BattleStatus_updateWindowPositions = Scene_Battle.prototype.updateWindowPositions;
	Scene_Battle.prototype.updateWindowPositions = function ()
	{
		if (!$gameSystem._cardBattleEnabled || !Myth.CGC.changeBattleWindows)
			return Myth.CGC.Window_BattleStatus_updateWindowPositions.call(this);
		this._statusWindow.x = 0;
	};
}

Myth.CGC.Window_BattleStatus_update = Window_BattleStatus.prototype.update;
Window_BattleStatus.prototype.update = function ()
{
	Myth.CGC.Window_BattleStatus_update.call(this);
	if (!Myth.CGC.changeBattleWindows) return;
	if (!$gameSystem._cardBattleEnabled) return;
	if (!Myth.CGC.statusWindowAtTop) return;

	if (this._helpWindow && this._helpWindow.visible)
		this.y = this._helpWindow.height;
	else
		this.y = 0;
};

if (!Myth.Util.usingMZ)
{
	Myth.CGC.Window_battleStatus_drawBasicArea = Window_BattleStatus.prototype.drawBasicArea;
	Window_BattleStatus.prototype.drawBasicArea = function (rect, actor)
	{
		if (!$gameSystem._cardBattleEnabled || !Myth.CGC.displayStatusCardIcons || !Myth.CGC.changeBattleWindows)
		{
			return Myth.CGC.Window_battleStatus_drawBasicArea.call(this, rect, actor);
		}
		var neededWidth = Window_Base._iconWidth * 3 + this.textWidth("00") * 3 + 8;
		var normalRect = rect.width - neededWidth;
		this.drawActorName(actor, rect.x + 0, rect.y, 150);
		if (!Imported.YEP_BattleStatusWindow)
			this.drawActorIcons(actor, rect.x + 156, rect.y, normalRect - 156);
		if (!Myth.CGC.PartyUI)
			this.drawActorCardZones(actor, rect.x + normalRect, rect.y, neededWidth);
	}
};

Myth.CGC.Window_PartyCommand_setup = Window_PartyCommand.prototype.setup;
Window_PartyCommand.prototype.setup = function ()
{
	if (!$gameSystem._cardBattleEnabled || !Myth.CGC.skipPartyCommand)
	{
		return Myth.CGC.Window_PartyCommand_setup.call(this);
	};

}

Myth.CGC.Window_ActorCommand_update = Window_ActorCommand.prototype.update;
Window_ActorCommand.prototype.update = function ()
{
	Myth.CGC.Window_ActorCommand_update.call(this);
	if (!Myth.CGC.changeBattleWindows) return;
	if (!$gameSystem._cardBattleEnabled) return;
	if (!Myth.CGC.statusWindowAtTop) return;

	if (Myth.CGC.PartyUI) return;

	if (this._helpWindow && this._helpWindow.visible)
		this.y = this._helpWindow.height;
	else
		this.y = 0;
};

Myth.CGC.Window_ActorCommand_numVisibleRows = Window_ActorCommand.prototype.numVisibleRows;
Window_ActorCommand.prototype.numVisibleRows = function ()
{
	if (!$gameSystem._cardBattleEnabled || !Myth.CGC.changeBattleWindows || Myth.CGC.PartyUI)
		return Myth.CGC.Window_ActorCommand_numVisibleRows.call(this);
	return 1;
};

Myth.CGC.Window_ActorCommand_addAttackCommand = Window_ActorCommand.prototype.addAttackCommand;
Window_ActorCommand.prototype.addAttackCommand = function ()
{
	if (!$gameSystem._cardBattleEnabled || !Myth.CGC.changeBattleWindows)
		Myth.CGC.Window_ActorCommand_addAttackCommand.call(this);
};

if (!Imported.YEP_BattleEngineCore || !Yanfly.Param.BECEnemySelect)
{
	Myth.CGC.Window_BattleEnemy_numVisibleRows = Window_BattleEnemy.prototype.numVisibleRows;
	Window_BattleEnemy.prototype.numVisibleRows = function ()
	{
		if (!$gameSystem._cardBattleEnabled || !Myth.CGC.changeBattleWindows)
			return Myth.CGC.Window_BattleEnemy_numVisibleRows.call(this);
		return 1;
	};

	Myth.CGC.Window_BattleEnemy_update = Window_BattleEnemy.prototype.update;
	Window_BattleEnemy.prototype.update = function ()
	{
		Myth.CGC.Window_BattleEnemy_update.call(this);
		if (!Myth.CGC.changeBattleWindows) return;
		if (!$gameSystem._cardBattleEnabled) return;
		if (!Myth.CGC.statusWindowAtTop) return;
			if (this._helpWindow && this._helpWindow.visible)
				this.y = this._helpWindow.height;
			else
				this.y = 0;
	};
}


Myth.CGC.BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function ()
{
	Myth.CGC.BattleManager_startBattle.call(this);
	this._highestPerformedIndex = -1;
}

BattleManager._cardActions = [];
BattleManager._previousPhases = [];

Myth.CGC.BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function ()
{
	Myth.CGC.BattleManager_startAction.call(this);
	if ($gameSystem._cardBattleEnabled)
	{
		if (!this._action) return;

		var item = this._action.item();
		if (item && item._cardActions)
		{
			this._cardActions.push.apply(this._cardActions, item._cardActions.split(','));
			this._cardActionIndex = 0;
		}

		if (item && item._cardTargetActions)
		{
			this._cardTargetActions = item._cardTargetActions.split(',');
			this._originalCardTargetActions = item._cardTargetActions.split(',');
			this._cardTargetActionIndex = 0;
			this._cardTargets = [...this._targets];
		}

		if (this.__forcedActions && this.__forcedActions.length > 0) return;


		var win = SceneManager._scene._skillWindow;
		if (win.item())
		{
			var item = win.item();
			if (Myth.CGC.useOldCardUseSystem)
			{
				if (item._removeAfterPlay || (item._cardPassives && item._cardPassives.removeAfterPlay))
					win.removeCard(win.index());
				else
					win.discardCard(win.index());
			}
			else
			{
				win.holdUsedCard();
			}
		}

		this.defineAllLabels()
		//only check empty zones once per action
		this.__checkedEmptyZones = 1;
	}
};


Myth.CGC.BattleManager_updateAction = BattleManager.updateAction;
BattleManager.updateAction = function ()
{
	if (!$gameSystem._cardBattleEnabled)
		return Myth.CGC.BattleManager_updateAction.call(this);
	var target = this._targets.shift();
	if (target)
	{
		this.invokeAction(this._subject, target);
	}
	else
	{
		if (this._cardTargetActions && this._cardTargetActionIndex < this._cardTargetActions.length)
		{
			var target = this._cardTargets[0];
			if (target.isActor())
			{
				SceneManager._scene._skillWindow.setActor(target);
			}
			var action = this._cardTargetActions[this._cardTargetActionIndex];
			target.performCardAction(action);
			this._cardTargetActionIndex++;

			if (this._cardTargetActionIndex >= this._cardTargetActions.length)
			{
				this._cardTargets.shift();
				if (this._cardTargets.length > 0)
				{
					this._cardTargetActionIndex = 0;
					this._cardTargetActions = [...this._originalCardTargetActions];
				}
				else
				{
					this._cardTargetActions = null;
					this._originalCardTargetActions = null;
				}
			}
		}
		else if (this._cardActions && this._cardActionIndex < this._cardActions.length)
		{
			var subject = this._action.cardActionSubject();
			if (subject.isActor())
			{
				SceneManager._scene._skillWindow.setActor(subject);
			}
			var action = this._cardActions[this._cardActionIndex];
			subject.performCardAction(action);
			this._cardActionIndex++;
			
			if (this._cardActionIndex >= this._cardActions.length)
			{
				this._cardActions = [];
			}
		}
		else
		{
			if (Imported.YEP_BattleEngineCore)
			{
				if (this._returnPhase === 'target')
				{
					this.setTargets([this._individualTargets[0]]);
					this._phase = 'actionTargetList';
				} else
				{
					this.setTargets(this._allTargets.slice());
					this._phase = 'actionList';
				}
			}
			else
			{
				this.endAction();
			}
		}
	}
};


BattleManager.insertCardActions = function (battler, actions, attemptedDrawAmount)
{
	this._previousPhases.push(this._phase);
	this._phase = 'emptyZone';
	this._emptyZoneActor = battler;
	this._emptyZoneActions = actions;
	this._emptyZoneActionIndex = 0;
	this.__attemptedDrawAmount = attemptedDrawAmount;
}

if (Imported.YEP_BattleEngineCore)
{
	Myth.CGC.YEPBattle_BattleManager_startAction = BattleManager.startAction;
	BattleManager.startAction = function ()
	{
		Myth.CGC.YEPBattle_BattleManager_startAction.call(this);
		if ($gameSystem._cardBattleEnabled)
			this._phaseSteps.push('cardActions');
	};

	Myth.CGC.BattleManager_updatePhase = BattleManager.updatePhase;
	BattleManager.updatePhase = function ()
	{
		var phase = this._phaseSteps[0];
		if (phase == 'cardActions')
		{
			//this._phaseSteps.shift();
			this.createPhaseChanges();
			this.createCardActionsActions(); //I didn't think ahead when I adopted this naming convention.
		}
		else
		{
			Myth.CGC.BattleManager_updatePhase.call(this);
		}
	};

	BattleManager.createCardActionsActions = function ()
	{
		this._returnPhase = 'cardActions';
		if (this._cardTargetActions && this._cardTargetActionIndex < this._cardTargetActions.length)
		{
			var target = this._cardTargets[0];
			if (target.isActor())
			{
				SceneManager._scene._skillWindow.setActor(target);
			}
			var action = this._cardTargetActions[this._cardTargetActionIndex];
			target.performCardAction(action);
			this._cardTargetActionIndex++;

			if (this._cardTargetActionIndex >= this._cardTargetActions.length)
			{
				this._cardTargets.shift();
				if (this._cardTargets.length > 0)
					this._cardTargetActionIndex = 0;
				else
					this._cardTargetActions = null;
			}
		}
		else if (this._cardActions && this._cardActionIndex < this._cardActions.length)
		{
			//this._phase = 'phaseChange';
			var subject = this._action.cardActionSubject();
			if (subject.isActor())
			{
				SceneManager._scene._skillWindow.setActor(subject);
			}

			subject.performCardAction(this._cardActions[this._cardActionIndex]);
			this._cardActionIndex++;

			if (this._cardActionIndex >= this._cardActions.length)
			{
				this._phaseSteps.shift();
				this._cardActions = [];
			}
		}
		else
			this._phaseSteps.shift();
	}

}

BattleManager._highestPerformedIndex = -1;

Myth.CGC.BattleManager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function ()
{
	if ($gameSystem._cardBattleEnabled)
	{
		if (this.__forcedActions && this.__forcedActions.length > 0) return;

		if (this._highestPerformedIndex != -1)
		{
			for (var i = 0; i < $gameParty.members().length; i++)
			{
				var actor = $gameParty.members()[i];
				this.endTurnForcedActions(actor);
			}
			this._highestPerformedIndex = -1;
			//this._phase = 'turnEnd';
			if (this.__forcedActions && this.__forcedActions.length > 0) return;
		}

		var win = SceneManager._scene._skillWindow;
		var data = win._data;
		for (var i = data.length - 1; i >= 0; i--)
		{
			var item = data[i];
			if (item._cardPassives)
			{
				if (item._cardPassives.removeIfUnplayed)
				{
					win.removeCard(i);
				}
				else if (item._cardPassives.discardIfUnplayed)
					win.discardCard(i);
			}
		}		
	}
	Myth.CGC.BattleManager_endTurn.call(this);
}

BattleManager.requireDiscard = function (amount, mode, type)
{
	if ($gameTroop.isAllDead())
		return;
	if (!mode)
		mode = 'discard';
	this._cardsToDiscard = amount || 1;
	var actor = SceneManager._scene._skillWindow._actor;
	var currentCards = SceneManager._scene._skillWindow._cardSprites.getCardSprites().length;
	if (type != null && Myth.CGC.Types)
	{
		currentCards = actor.cardsInZoneOfType("hand", type);
	}
	if (this._cardsToDiscard >= currentCards)
	{
		//this._cardsToDiscard = currentCards;
		SceneManager._scene._skillWindow.setDiscardMode(mode);
		SceneManager._scene._skillWindow.discardAllCards(type);
		SceneManager._scene._skillWindow.setDiscardMode('');
	}
	else
	{
		this._previousPhases.push(this._phase);
		this._phase = 'discard';
		SceneManager._scene._skillWindow.setDiscardMode(mode, type);
	}
};

BattleManager.requireHandSelection = function (amount, zone, type)
{
	if ($gameTroop.isAllDead())
		return;
	if (!mode)
		mode = 'discard';
	this._cardsToSelect = amount || 1;
	var actor = SceneManager._scene._skillWindow._actor;
	var currentCards = SceneManager._scene._skillWindow._cardSprites.getCardSprites().length;
	if (type != null && Myth.CGC.Types)
	{
		currentCards = actor.cardsInZoneOfType("hand", type);
	}
	if (this._cardsToSelect >= currentCards)
	{
		//this._cardsToDiscard = currentCards;
		SceneManager._scene._skillWindow.setDiscardMode(mode);
		SceneManager._scene._skillWindow.discardAllCards(type);
		SceneManager._scene._skillWindow.setDiscardMode('');
	}
	else
	{
		this._previousPhases.push(this._phase);
		this._phase = 'discard';
		SceneManager._scene._skillWindow.setDiscardMode(mode, type);
	}
}

BattleManager.requireWait = function (frames)
{
	if (frames > 0)
	{
		this._cardWaitFrames = frames;
		this._previousPhases.push(this._phase);
		this._phase = 'cardwait';
	}
}

BattleManager.updateCardWait = function ()
{
	this._cardWaitFrames--;
	if (this._cardWaitFrames <= 0)
	{
		var skillWindow = SceneManager._scene._skillWindow;
		this._phase = this._previousPhases.pop();
		if (this._phase != 'input')
		{
			skillWindow.deactivate();
		}
	}
}

BattleManager.requireDiscardTo = function (amount, mode, type)
{
	var actor = SceneManager._scene._skillWindow._actor;
	var currentCards = SceneManager._scene._skillWindow._cardSprites.getCardSprites().length;
	var cardsToDiscard = (currentCards - amount);
	if (cardsToDiscard > 0)
		this.requireDiscard(cardsToDiscard, mode, type);
}

BattleManager.updateDiscard = function ()
{
	if (this._cardsToDiscard <= 0)
	{
		var skillWindow = SceneManager._scene._skillWindow;
		SceneManager._scene._skillWindow.setDiscardMode('');
		this._phase = this._previousPhases.pop();
		if (this._phase != 'input')
		{
			skillWindow.deactivate();
		}
	}
	else
	{
		var skillWindow = SceneManager._scene._skillWindow;
		skillWindow.activate();
/*		if (skillWindow.index() < skillWindow._itemsBeforeCards)
			skillWindow.select(skillWindow._itemsBeforeCards);*/
	}
};

BattleManager.skipCardAction = function ()
{
	if (this._cardTargetActions && this._cardTargetActionIndex < this._cardTargetActions.length)
	{
		this._cardTargetActionIndex++;
	}
	else if (this._cardActions && this._cardActionIndex < this._cardActions.length)
	{
		this._cardActionIndex++;
	}
};

BattleManager.defineLabel = function (label)
{
	if (!this._cardLabels)
		this._cardLabels = [];
	this._cardLabels[label] = this.getCardActionIndex();
};

BattleManager.getCardActionIndex = function ()
{
	if (this._cardTargetActions && this._cardTargetActionIndex < this._cardTargetActions.length)
	{
		return this._cardTargetActionIndex;
	}
	else if (this._cardActions && this._cardActionIndex < this._cardActions.length)
	{
		return this._cardActionIndex;
	}
};

BattleManager.setCardActionIndex = function (index)
{
	if (this._cardTargetActions && this._cardTargetActionIndex < this._cardTargetActions.length)
	{
		this._cardTargetActionIndex = index;
	}
	else if (this._cardActions && this._cardActionIndex < this._cardActions.length)
	{
		this._cardActionIndex = index;
	}
};

BattleManager.jumpToLabel = function (label)
{
	if (this._cardTargetActions && this._cardTargetActionIndex < this._cardTargetActions.length)
	{
		var index = this._cardTargetLabels[label];
		if (index != null)
			this._cardTargetActionIndex = index;
	}
	else if (this._cardActions && this._cardActionIndex < this._cardActions.length)
	{
		var index = this._cardLabels[label];
		if (index != null)
			this._cardActionIndex = index;
	}
};

BattleManager.defineAllLabels = function ()
{
	this._cardTargetLabels = [];
	this._cardLabels = [];

	if (this._cardTargetActions)
	{
		for (var i = 0; i < this._cardTargetActions.length; i++)
		{
			var action = this._cardTargetActions[i];
			if (action.match(/label (.*)/i))
			{
				this._cardTargetLabels[RegExp.$1] = i;
			}
		}
	}

	if (this._cardActions)
	{
		for (var i = 0; i < this._cardActions.length; i++)
		{
			var action = this._cardActions[i];
			if (action.match(/label (.*)/i))
			{
				this._cardLabels[RegExp.$1] = i;
			}
		}
	}
}


if (Myth.Util.usingMZ)
{
	//MZ
	Myth.CGC.BattleManager_changeCurrentActor = BattleManager.changeCurrentActor;
	BattleManager.changeCurrentActor = function (forward)
	{
		const members = $gameParty.battleMembers();
		Myth.CGC.BattleManager_changeCurrentActor.call(this, forward);
		if ($gameSystem._cardBattleEnabled)
		{
			var actor = this._currentActor;
			if (actor)
			{
				var newActorIndex = members.indexOf(actor);
				this.startTurnCardActions(actor, newActorIndex);
			}
		}
	}
}
else
{
	//MV
	Myth.CGC.BattleManager_changeActor = BattleManager.changeActor;
	BattleManager.changeActor = function (newActorIndex, lastActorActionState)
	{
		Myth.CGC.BattleManager_changeActor.call(this, newActorIndex, lastActorActionState);
		if ($gameSystem._cardBattleEnabled)
		{
			var actor = this.actor();
			this.startTurnCardActions(actor, newActorIndex);
		}
	};
}


//CTB still not fully compatible.
if (Imported.YEP_X_BattleSysCTB)
{
	console.warn("Warning: Card Game Combat is not fully compatible with Yanfly's CTB system.");
	Myth.CGC.BattleManager_startCTBInput = BattleManager.startCTBInput;
	BattleManager.startCTBInput = function (battler)
	{
		Myth.CGC.BattleManager_startCTBInput.call(this, battler);
		if ($gameSystem._cardBattleEnabled)
		{
			var actor = this.actor();
			this.startTurnCardActions(actor, -1);
		}
	}

	Myth.CGC.Game_Battler_checkCTBEndInstantCast = Game_Battler.prototype.checkCTBEndInstantCast;
	Game_Battler.prototype.checkCTBEndInstantCast = function ()
	{
		var action = this.currentAction();
		if (!action) return false;
		var item = action.item();
		if (!item) return false;
		if (item.meta.willEndTurn || item._cardPassives && item._cardPassives.willEndTurn)
		{
			this._ctbSpeed = Math.max(this._ctbSpeed, BattleManager.ctbTarget());
			this._ctbSpeed += 0.00000000001;
			return true;
		}

		return Myth.CGC.Game_Battler_checkCTBEndInstantCast.call(this);
	}
}

BattleManager.startTurnCardActions = function (actor, newActorIndex)
{
	if (actor)
	{
		SceneManager._scene._skillWindow.setActor(actor);
		if (newActorIndex > this._highestPerformedIndex || this.isUsingDifferentBattleSystem())
		{
			this._highestPerformedIndex = newActorIndex;
			var actions = this.getStartCardActions(actor);
			this._cardActions.push.apply(this._cardActions, actions.split('\n'));
			this._cardActionIndex = 0;

			this._phase = 'cardstart';
			this._cardStartActor = actor;
			this.defineAllLabels();
			SceneManager._scene._statusWindow.refresh();
			//this.startTurnForcedActions(actor);
		}
	}
};

BattleManager.isUsingDifferentBattleSystem = function ()
{

	if (Imported.YEP_X_BattleSysCTB)
		return true;

	// DTB should still use highestPerformedIndex since it's the default system

	// STB should still use highestPerformedIndex since you can back out of the menu
	//if (Imported.YEP_X_BattleSysSTB)
	//	return true;

	return false;
}

BattleManager.getStartCardActions = function (actor)
{
	if (!actor._battleStart)
	{
		return (Myth.CGC.startOfTurnActions);
	}
	else
	{
		actor._battleStart = false;
		return (Myth.CGC.startOfBattleActions);
	}
}

BattleManager.updateCardStart = function ()
{
	if (this._cardActions && this._cardActionIndex < this._cardActions.length)
	{
		var action = this._cardActions[this._cardActionIndex];
		this._cardStartActor.performCardAction(action);
		this._cardActionIndex++;

		if (this._cardActionIndex >= this._cardActions.length)
		{
			this._cardActions = [];
		}

		//this._cardStartActor.checkEmptyZones();
	}
	else
	{
		this._phase = 'input';

		this.startTurnForcedActions(this._cardStartActor);
		this._cardStartActor = undefined;
	}
};

BattleManager.updateEmptyZone = function ()
{
	if (this._emptyZoneActions && this._emptyZoneActionIndex < this._emptyZoneActions.length)
	{
		var action = this._emptyZoneActions[this._emptyZoneActionIndex];
		var actor = this._emptyZoneActor;
		actor.performCardAction(action);
		this._emptyZoneActionIndex++;
		if (this._emptyZoneActionIndex > this._emptyZoneActions.length)
		{
			this._emptyZoneActions = [];
			this._emptyZoneActor = null;
			this.__attemptedDrawAmount = null;
		}
	}
	else
	{
		this._phase = this._previousPhases.pop();
		if (this._phase != 'input')
		{
			var skillWindow = SceneManager._scene._skillWindow;
			skillWindow.deactivate();
		}
		
	}
}

BattleManager.startTurnForcedActions = function (actor)
{
	if (!this.__forcedActions)
		this.__forcedActions = [];
	for (var i = 0; i < actor._cardHand.length; i++)
	{
		var card = actor._cardHand.card(i);
		var skillId = card.id();
		var skill = $dataSkills[skillId];
		if (skill.__forcedActions && skill.__forcedActions.turnStart)
		{
			var actions = skill.__forcedActions.turnStart;
			for (var j = 0; j < actions.length; j++)
			{
				this.__forcedActions.push({ actor: actor, skill: actions[j] });
				
			}
		}
	}
};

BattleManager.endTurnForcedActions = function (actor)
{
	if (!this.__forcedActions)
		this.__forcedActions = [];
	for (var i = 0; i < actor._cardHand.length; i++)
	{
		var card = actor._cardHand.card(i);
		var skillId = card.id();
		var skill = $dataSkills[skillId];
		if (skill.__forcedActions && skill.__forcedActions.turnEnd)
		{
			var actions = skill.__forcedActions.turnEnd;
			for (var j = 0; j < actions.length; j++)
			{
				this.__forcedActions.push({ actor: actor, skill: actions[j] });
			}
		}
	}

	return (this.__forcedActions.length > 0);
};

BattleManager.exitZoneForcedActions = function (actor, zone, skillId)
{
	
	if (!this.__forcedActions)
		this.__forcedActions = [];
	var skill = $dataSkills[skillId];
	if (skill.__forcedActions && skill.__forcedActions.exitZone)
	{
		var exitZoneActions = skill.__forcedActions.exitZone;
		for (var i = 0; i < exitZoneActions.length; i++)
		{
			var action = exitZoneActions[i];
			if (action.zone.toLowerCase() == zone)
			{
				this.__forcedActions.push({ actor: actor, skill: action.skill });
			}
		}
	}
}

BattleManager.enterZoneForcedActions = function (actor, zone, skillId)
{
	if (!this.__forcedActions)
		this.__forcedActions = [];
	var skill = $dataSkills[skillId];
	if (skill.__forcedActions && skill.__forcedActions.enterZone)
	{
		var enterZoneActions = skill.__forcedActions.enterZone;
		for (var i = 0; i < enterZoneActions.length; i++)
		{
			
			var action = enterZoneActions[i];
			if (action.zone.toLowerCase() == zone)
				this.__forcedActions.push({ actor: actor, skill: action.skill });
		}
	}
}

BattleManager.playForcedAction = function ()
{	
	var actor = this.__forcedActions[0].actor;
	var skill = Number(this.__forcedActions[0].skill);
	this.__forcedActions.splice(0, 1);

	if (Imported.YEP_BattleEngineCore)
	{
		this._processingForcedAction = true;
	}
/*	if (Imported.YEP_BattleEngineCore)
	{
		this.createForceActionFailSafes();
		this.queueForceAction(actor, skill);
	}
	else*/
	{
		actor.forceAction(skill, -1);
		var lastAction = actor._actions[actor._actions.length - 1].item();
		if (lastAction == null)
		{
			actor.clearActions();
			return;
		}
		this.forceAction(actor);
	}

	SceneManager._scene._skillWindow.deactivate();
	SceneManager._scene._skillWindow.deselect();
	SceneManager._scene._partyCommandWindow.deactivate();
	SceneManager._scene._actorCommandWindow.deactivate();

	if (Imported.YEP_InstantCast)
		this.performInstantCast();
	else
	{
		if (this._phase == "turn")
		{
			this._subject = this._actionForcedBattler;
			this.startAction();
			this._subject.removeCurrentAction();
		}
		else
		{
			this.playCard();
		}
	}

	this._actionForcedBattler = null;
}


Game_Battler.prototype.atMaxHandSize = function ()
{
	return true;
}

Game_Battler.prototype.drawCards = function (amount)
{
	this.moveCards(amount, "deck", "hand");
};

Game_Battler.prototype.drawCardsUntil = function (amount)
{
	if (!this._cardHand) return;

	var len = this._cardHand.length;
	if (amount <= len) return;

	this.drawCards(amount - len);
};

//legacy function
Game_Battler.prototype.drawCard = function ()
{
	if (!this._cardDeck) return;

	if (this._cardDeck.length > 0)
	{
		//this.drawCardAtIndex(0);
		this.moveCard(0, this._cardDeck, this._cardHand);
	}
	else
	{
		setTimeout(() =>
		{
			if (SceneManager._scene instanceof Scene_Battle)
				this.drawCard();
		}, 100);
	}
};

Game_Battler.prototype.drawCardAtIndex = function (index)
{
	this.moveCard(index, this._cardDeck, this._cardHand);
}

Game_Battler.prototype.millCards = function (amount)
{
	this.moveCards(amount, "deck", "discard");
};

Game_Battler.prototype.millCard = function ()
{
	this.moveCards(1, "deck", "discard");
};

Game_Battler.prototype.millCardAtIndex = function (index)
{
	if (this.atMaxHandSize()) return;

	this.moveCard(index, this.getZoneByName("deck"), this.getZoneByName("discard"));
};

Game_Battler.prototype.moveCards = function (amount, zone1, zone2)
{
	var startingZone = this.getZoneByName(zone1);
	var endingZone = this.getZoneByName(zone2);

	if (startingZone == null || endingZone == null) return;

	if (startingZone.length < amount && startingZone.length > 0)
	{
		amount -= startingZone.length;
		this.moveCards(startingZone.length, zone1, zone2);
	}
	if (startingZone.length == 0)
	{
		var dataZone = Myth.Util.getZoneDataByName(zone1);
		if (dataZone.emptyActions)// && Myth.Util.getEmptyActionExecution(dataZone) == 1)
		{
			//basically cancel the card action and repeat it
			var newAction = "move " + amount + " from " + zone1 + " to " + zone2;
			var emptyActions = dataZone.emptyActions;
			if (BattleManager.__attemptedDrawAmount != amount)
				emptyActions += '\n' + newAction;
			BattleManager.insertCardActions(this, emptyActions.split('\n'), amount);
			return;
		}
	}

	if (amount == -1)
		amount = startingZone.length;

	for (var i = 0; i < amount; i++)
	{
		this.moveCard(0, startingZone, endingZone);
	}
};

Game_Battler.prototype.moveCard = function (index, startingZone, endingZone, playSE)
{
	//mechanical effect
	if (endingZone == this._cardHand && this.atMaxHandSize()) return;
	if (!startingZone || !endingZone) return;
	if (startingZone == endingZone) return;
	if (startingZone.length == 0)
	{
		var dataZone = Myth.Util.getZoneDataByName(startingZone.name);
		if (dataZone.emptyActions && Myth.Util.getEmptyActionExecution(dataZone) == 1)
		{
			//Recreate the move in the form of a Card Action, tack it on to the empty actions.
			//This captures any move that doesn't happen from moveCards.
			var newAction = "move 1 from " + startingZone.name + " to " + endingZone.name;
			var emptyActions = dataZone.emptyActions;
			if (BattleManager._phase != 'emptyZone')
				emptyActions += '\n' + newAction;
			BattleManager.insertCardActions(this, emptyActions.split('\n'));			
		}
		return;
	}
	
	var card = this.exitCard(startingZone, index, playSE);
	this.enterCard(endingZone, card, playSE);

/*	if (startingZone == this._cardDeck && this._cardDeck.length == 0)
	{
		this.reshuffleDeck();
	}*/
	if (startingZone.length == 0)
	{
		
		var dataZone = Myth.Util.getZoneDataByName(startingZone.name);
		if (dataZone.emptyActions)
		{
			//BattleManager._cardActions.push.apply(BattleManager._cardActions, dataZone.emptyActions.split('\n'));
			BattleManager.insertCardActions(this, dataZone.emptyActions.split('\n'));
		}
	}
	//visual effect

	var skillWindow = SceneManager._scene._skillWindow;
	if (skillWindow)
		skillWindow.moveCardSprite(card, index, startingZone, endingZone, this);

	this.updateCardVariables();

	return card;
};


Game_Battler.prototype.shuffleDeck = function ()
{
	if (!this._cardDeck) return;
	this._cardDeck.shuffle();
}

//requires player input for actor and something else for enemy
Game_Battler.prototype.discardCards = function (amount)
{
};

//requires player input for actor and something else for enemy
Game_Battler.prototype.discardCardsUntil = function (amount)
{
};

//requires player input for actor and something else for enemy
Game_Battler.prototype.removeCards = function (amount)
{
};

//requires player input for actor and something else for enemy
Game_Battler.prototype.removeCardsUntil = function (amount)
{
};

Game_Battler.prototype.drawCardOfSkillId = function (skillId)
{
	if (this.atMaxHandSize())
		return;

	var index = null;
	for (var i = 0; i < this._cardDeck.length; i++)
	{
		var card = this._cardDeck.card(i);
		if (card.id() == skillId)
		{
			index = i;
			break;
		}
	}

	if (index != null)
	{
		this.moveCard(index, this._cardDeck, this._cardHand);
	}
};

Game_Battler.prototype.drawCardOfSkillName = function (skillName)
{
	var skill = Myth.Util.findSkillbyName(skillName);
	if (!skill) return;
	this.drawCardOfSkillId(skill.id);
};

Game_Battler.prototype.addCardToZone = function (skill, zoneName)
{
	var cardZone = this.getZoneByName(zoneName);
	if (cardZone == null)
		return console.error("Error trying to add skill #" + skill + " to zone " + zoneName + ". Did you misspell a zone name?");

	var card = cardZone.push(skill);

	this.updateCardVariables();

	return card;
}

Game_Battler.prototype.syncEvalVariables = function ()
{
};

Game_Battler.prototype.updateCardVariables = function ()
{

}

Game_Battler.prototype.formatCardAction = function (action)
{
	BattleManager._currentCardBattler = this;

	action = action.replace(/`comma`/g, ',');
	action = action.replace(/\\/g, '\x1b');
	action = action.replace(/\x1b\x1b/g, '\\');
	action = action.replace(/\x1bV\[(\d+)\]/gi, function ()
	{
		return $gameVariables.value(parseInt(arguments[1]));
	}.bind(this));

	return action;
}

Game_Battler.prototype.performCardAction = function (action)
{
	var originalAction = action;
	action = this.formatCardAction(action);

	if (action.match(/<?(?:Draw )(\d+)>?/i))
	{
		this.drawCards(RegExp.$1);
	}
	else if (action.match(/<?(?:Draw Until )(\d+)>?/i))
	{
		this.drawCardsUntil(RegExp.$1);
	}
	else if (action.match(/(?:Search For )(\d+)/i))
	{
		this.drawCardOfSkillId(RegExp.$1);
	}
	else if (action.match(/(?:Search For )(.+)/i))
	{
		this.drawCardOfSkillName(RegExp.$1);
	}
	else if (action.match(/<?(?:Discard )(\d+)>?/i))
	{
		this.discardCards(RegExp.$1);
	}
	else if (action.match(/<?(?:Discard Until )(\d+)>?/i))
	{
		this.discardCardsUntil(RegExp.$1);
	}
	else if (action.match(/<?(?:Remove )(\d+)>?/i))
	{
		this.removeCards(RegExp.$1);
	}
	else if (action.match(/<?(?:Remove Until )(\d+)>?/i))
	{
		this.removeCardsUntil(RegExp.$1);
	}
	else if (action.match(/<?(?:Wait )(\d+)>?/i))
	{
		BattleManager.requireWait(RegExp.$1);
	}
	else if (action.match(/<?(?:Mill )(\d+)>?/i))
	{
		this.millCards(RegExp.$1);
	}
	else if (action.match(/<?Shuffle Deck>?/i))
	{
		this.shuffleDeck();
	}
	else if (action.match(/<?(?:Add )(\d+)(?: to )(\w+)>?/i))
	{
		var skill = RegExp.$1;
		var zone = RegExp.$2;
		this.addCardToZone(skill, zone);
	}
	else if (action.match(/(?:Move )(\d+)(?: from )(\w+)(?: to )(\w+)/i))
	{
		var amount = RegExp.$1;
		var zone1 = RegExp.$2;
		var zone2 = RegExp.$3;
		this.moveCards(amount, zone1, zone2);
	}
	else if (action.match(/(?:Move all from )(\w+)(?: to )(\w+)/i))
	{
		var zone1 = RegExp.$1;
		var zone2 = RegExp.$2;
		this.moveCards(-1, zone1, zone2);
	}
	else if (action.match(/(?:Move this to )(\w+)/i))
	{
		this.resolveUsedCard(RegExp.$1);
	}
	else if (action.match(/(?:Remove this)/i))
	{
		this.resolveUsedCard('remove');
	}
	else if (action.match(/(?:Move skill )(\d+)(?: from )(\w+)(?: to )(\w+)/i))
	{
		var skill = RegExp.$1;
		var zone1 = RegExp.$2;
		var zone2 = RegExp.$3;
		//TODO: 
	}
	else if (action.match(/eval (.*)/i))
	{
		var user = this;
		var expression = RegExp.$1;
		try
		{
			eval(expression);
		}
		catch (error)
		{
			console.error(error);
			console.error("Error in MYTH_CGC_CoreEngine Card Action Eval.");
			console.error(expression);
		}
	}
	else if (action.match(/if (.*)/i))
	{
		var requirement = RegExp.$1;
		var user = this;
		var meetsCondition = eval(requirement);
		if (!meetsCondition)
			BattleManager.skipCardAction();
	}
	else if (action.match(/label (.*)/i))
	{
	}
	else if (action.match(/jump to (?:label )?(.*)/i))
	{
		var label = RegExp.$1;
		BattleManager.jumpToLabel(label);
	}
	else if (action.match(/play (?:se|sfx) (\w+)/i))
	{
		var seName = RegExp.$1;
		SoundManager.playCardAction(seName);
	}
	else if (action.match(/force action (\d+)/i))
	{
		var skillId = Number(RegExp.$1);
		BattleManager.__forcedActions.push({ actor: this, skill: skillId});
	}
	else
	{
		console.log("MythCardGameCombat warning - action " + action + " is not registered.\nCould there be a typo?");
		console.log("Original action formatting: " + originalAction);
	}
}

Game_Battler.prototype.exitCard = function (zone, index, playSE)
{
	if (playSE == undefined) playSE = true;
	var card = zone.splice(index, 1);
	BattleManager.exitZoneForcedActions(this, zone.name, card.id());
	if (playSE)
		SoundManager.playExitZone(zone.name);
	return card;
}

Game_Battler.prototype.enterCard = function (zone, card, playSE)
{
	if (playSE == undefined) playSE = true;
	zone.add(card);
	BattleManager.enterZoneForcedActions(this, zone.name, card.id());
	if (playSE)
		SoundManager.playEnterZone(zone.name);
	return card;
}

Game_Battler.prototype.getZoneByName = function (zoneName)
{
	zoneName = zoneName.trim().toLowerCase();
	var cardZone = null;
	switch (zoneName)
	{
		case "deck":
			cardZone = this._cardDeck; break;
		case "discard":
			cardZone = this._cardDiscard; break;
		case "hand":
			cardZone = this._cardHand; break;
	}

	if (cardZone == null && this._extraZones)
	{
		for (var i = 0; i < this._extraZones.length; i++)
		{
			if (this._extraZones[i].name == zoneName)
			{
				cardZone = this._extraZones[i];
				break;
			}
		}
	}

	return cardZone;
}

Game_Battler.prototype.reshuffleDeck = function ()
{
	if (this._cardDiscard.length > 0)
	{
		while (this._cardDiscard.length > 0)
		{
			var card = this.exitCard(this._cardDiscard, 0);
			this.enterCard(this._cardDeck, card);
		}
		this._cardDeck.shuffle();



		return true;

		this.updateCardVariables();
	}
	else
	{
		setTimeout(() =>
		{
			this.reshuffleDeck();
		}, 100);

		return false;
	}
};

Game_Battler.prototype.resolveUsedCard = function (zoneName)
{
	//
}

Game_Battler.prototype.checkEmptyZones = function ()
{
	var emptyActions = [];
	if (this._cardDeck == undefined) return false;
	if (this._cardDeck.length == 0)
	{
		var dataZone = Myth.Util.getZoneDataByName("deck");
		if (dataZone.emptyActions && Myth.Util.getEmptyActionExecution(dataZone) == 2)
			emptyActions = emptyActions.concat(dataZone.emptyActions.split('\n'));
	}
	if (this._cardDiscard.length == 0)
	{
		var dataZone = Myth.Util.getZoneDataByName("discard");
		if (dataZone.emptyActions && Myth.Util.getEmptyActionExecution(dataZone) == 2)
			emptyActions = emptyActions.concat(dataZone.emptyActions.split('\n'));
	}
	for (var i = 0; i < this._extraZones.length; i++)
	{
		var zone = this._extraZones[i];
		if (zone.length == 0)
		{
			var dataZone = Myth.Util.getZoneDataByName(zone.name);
			if (dataZone.emptyActions && Myth.Util.getEmptyActionExecution(dataZone) == 2)
				emptyActions = emptyActions.concat(dataZone.emptyActions.split('\n'));
		}
	}

	if (emptyActions.length == 0) return false;

	BattleManager.insertCardActions(this, emptyActions);
	return true;
}


Myth.CGC.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function ()
{
	Myth.CGC.Game_Actor_initMembers.call(this);
	this._skillCards = new Game_Cards("skills");
	this._cardDeck =   new Game_Cards("deck");
	this._cardHand = new Game_Cards("hand");
	this._cardDiscard = new Game_Cards("discard");
	this._cardsLearnedInBattle = [];
	this.handSize = 0;
	this.currentDeckSize = 0;
	this.totalDeckSize = 0;
	this.discardSize = 0;
	this.cardsInPlay = 0;
	this.cardsToDraw = 0;
	this.removedCards = 0;
	this._bonusHandSize = 0;
	this._battleStart = false;

	this.initializeExtraZones();
};

//Read-only getter that returns an array of Game_Card objects
Game_Actor.prototype.cardLibrary = function ()
{
	var cards = this._skillCards.getAllCards();

	//TODO in v1.6.3
/*	if (Myth.CGC.EQP)
	{
		var equips = this.equips();
		for (var i = 0; i < equips.length; i++)
		{
			if (equips[i]._cards)
				cards = cards.concat(equips[i]._cards);
		}
	}*/

	return cards;
}

Game_Actor.prototype.initializeExtraZones = function ()
{
	this._extraZones = [];
	for (var i = 0; i < Myth.CGC.zoneInfo.extra.length; i++)
	{
		var zone = Myth.CGC.zoneInfo.extra[i];
		this._extraZones[i] = new Game_Cards(zone.name.toLowerCase());
	}
}


Myth.CGC.Game_Actor_onBattleStart = Game_Actor.prototype.onBattleStart;
Game_Actor.prototype.onBattleStart = function ()
{
	Myth.CGC.Game_Actor_onBattleStart.call(this);

	if ($gameSystem._cardBattleEnabled)
	{
		this.initializeDeckForBattle();

		this.removedCards = 0;

		this.performStartOfBattlePassives();

		this.totalDeckSize = this._cardDeck.length;
		this._battleStart = true;
	}
	
};

Game_Actor.prototype.initializeDeckForBattle = function ()
{
	//Make a copy of the deck so anything that gives you cards midway through the battle
		// is not saved
	this._deckCopy = new Game_Cards("copy");
	this._deckCopy.copy(this._cardDeck);
}

Game_Actor.prototype.performStartOfBattlePassives = function ()
{
	for (var i = this._cardDeck.length - 1; i >= 0; i--)
	{
		var card = this._cardDeck.card(i);
		var cardId = card.id();
		var skill = $dataSkills[cardId];
		if (skill && skill._cardPassives)
		{
			if (skill._cardPassives.startInZone == 'hand')
				this.drawCardOfSkillId(cardId);
			else if (skill._cardPassives.startInZone)
			{
				var zone = this.getZoneByName(skill._cardPassives.startInZone);
				this.moveCard(i, this._cardDeck, zone, false);
			}
		}
	}
}

Myth.CGC.Game_Actor_onBattleEnd = Game_Actor.prototype.onBattleEnd;
Game_Actor.prototype.onBattleEnd = function ()
{
	Myth.CGC.Game_Actor_onBattleEnd.call(this);
	if ($gameSystem._cardBattleEnabled)
		this.returnCardsToDeck();
	
};

Game_Actor.prototype.returnCardsToDeck = function ()
{
	this._cardDeck.clear();
	this._cardHand.clear();
	this._cardDiscard.clear();
	for (var i = 0; i < this._extraZones.length; i++)
	{
		this._extraZones[i].clear();
	}
	this._cardDeck.copy(this._deckCopy);

	//If they gained any permanent cards in battle (like through level up)

	if (Myth.CGC.addLearnedSkillToDeck)
	{
		for (var i = 0; i < this._cardsLearnedInBattle.length; i++)
		{
			this._cardDeck.add(this._cardsLearnedInBattle[i]);
		}
	}
	
	this._cardsLearnedInBattle = [];
}

Game_Actor.prototype.atMaxHandSize = function ()
{
	if (Myth.CGC.maxHandSize != -1)
	{
		var totalHandSize = Myth.CGC.maxHandSize + this._bonusHandSize;
		if (this._cardHand.length >= totalHandSize)
			return true;
	}

	return false;
}

Game_Actor.prototype.addCardToZone = function (skill, zone)
{
	var card = Game_Battler.prototype.addCardToZone.call(this, skill, zone);
	if (SceneManager._scene._skillWindow)
		SceneManager._scene._skillWindow.addCardToZone(card, zone, this);

	this.updateCardVariables();

	return card;
}

Game_Actor.prototype.updateCardVariables = function ()
{
	var scene = SceneManager._scene;
	if (scene._deckSprite)
		scene._deckSprite.setCardsLeft(this._cardDeck.length);
	if (scene._discardSprite)
		scene._discardSprite.setCardsLeft(this._cardDiscard.length);

	if (scene._zoneSprites)
	{
		for (var i = 0; i < scene._zoneSprites.length; i++)
		{
			var zone = this._extraZones[i];
			scene._zoneSprites[i].setCardsLeft(zone.length);
		}
	}
	

	this.syncEvalVariables();
}


Game_Actor.prototype.discardCards = function (amount)
{
	BattleManager.requireDiscard(amount);
};

Game_Actor.prototype.discardCardsUntil = function (amount)
{
	BattleManager.requireDiscardTo(amount);
};

Game_Actor.prototype.removeCards = function (amount)
{
	BattleManager.requireDiscard(amount, 'remove');
};

Game_Actor.prototype.removeCardsUntil = function (amount)
{
	BattleManager.requireDiscardTo(amount, 'remove');
};

Game_Actor.prototype.reshuffleDeck = function ()
{
	var success = Game_Battler.prototype.reshuffleDeck.call(this);
	if (success)
	{
		if (SceneManager._scene._skillWindow)
		{
			SceneManager._scene._skillWindow.reshuffleDeck();
		}
	}
};

Game_Actor.prototype.moveCards = function (amount, zone1, zone2)
{
	var startingZone = this.getZoneByName(zone1);
	if (startingZone == this._cardHand)
	{
		BattleManager.requireDiscard(amount, zone2);
	}
	else
	{
		Game_Battler.prototype.moveCards.call(this, amount, zone1, zone2);
	}

};

Game_Actor.prototype.resolveUsedCard = function (zoneName)
{
	var win = SceneManager._scene._skillWindow;
	win.resolveUsedCard(zoneName);
}



Myth.CGC.Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function (skillId)
{
	//console.log(skillId);
	Myth.CGC.Game_Actor_learnSkill.call(this, skillId);

	if (!$dataSkills[skillId])
	{
		console.error("Warning: The database does not contain a skill with the ID of " + skillId + ". If an actor draws a card with that ID, it will crash the game.");
	}
	else
	{
		var card = this._skillCards.push(skillId);
		if (Myth.CGC.addLearnedSkillToDeck)
			this._cardDeck.add(card);
		if ($gameParty._actors.includes(this.actorId()))
			$gameParty.addCardToLibrary(card);

		if (SceneManager._scene instanceof Scene_Battle)
		{
			this._cardsLearnedInBattle.push(card);
		}
	}
	
};

Myth.CGC.Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
Game_Actor.prototype.forgetSkill = function (skillId)
{
	var index = this._skillCards.indexOf(skillId, "learned");
	if (index >= 0)
	{
		this._skillCards.splice(index, 1);

		index = this._skillCards.indexOf(skillId, "learned");
		if (index == -1)
		{
			Myth.CGC.Game_Actor_forgetSkill.call(this, skillId);
		}

		if (index == -1 || Myth.CGC.addLearnedSkillToDeck)
		{
			var index = this._cardDeck.indexOf(skillId, "learned");
			if (index >= 0)
				this._cardDeck.splice(index, 1);
		}

		$gameParty.removeCardFromLibrary(skillId);
	}
};

Game_Actor.prototype.syncEvalVariables = function ()
{
	this.handSize = this._cardHand.length;
	this.currentDeckSize = this._cardDeck.length;
	this.discardSize = this._cardDiscard.length;
	this.cardsInPlay = this._cardDiscard.length + this._cardDeck.length + this._cardHand.length;
};

Myth.CGC.Game_Actor_canUse = Game_BattlerBase.prototype.canUse;
Game_Actor.prototype.canUse = function (item)
{
	if (!$gameSystem._cardBattleEnabled)
		return Myth.CGC.Game_Actor_canUse.call(this, item);

	var canUse = Myth.CGC.Game_Actor_canUse.call(this, item);
	if (SceneManager._scene instanceof Scene_Battle && canUse)
	{
		if (item._cardPassives && item._cardPassives.requirements)
		{
			for (var i = 0; i < item._cardPassives.requirements.length; i++)
			{
				var req = item._cardPassives.requirements[i];
				var user = this;
				try
				{
					canUse = eval(req);
				}
				catch (error)
				{
					console.error(error);
					console.error("Error in MYTH_CGC_CoreEngine Card Passive Require. It tried to parse an expression it didn't understand in Skill #"
						+ item.id + " " + item.name + ". Make sure your syntax is correct.");
				}

				if (!canUse) break;
			}
		}
	}

	return canUse;
}

Myth.CGC.Game_Party_setupStartingMembers = Game_Party.prototype.setupStartingMembers;
Game_Party.prototype.setupStartingMembers = function ()
{
	Myth.CGC.Game_Party_setupStartingMembers.call(this);
	for (var i = 0; i < this._actors.length; i++)
	{
		var actor = $gameActors.actor(this._actors[i]);
		if (!actor) continue;
		var skillCards = actor._skillCards.slice();
		for (var j = 0; j < skillCards.length; j++)
		{
			this.addCardToLibrary(skillCards[j]);
		}
	}
}

Myth.CGC.Game_Party_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function (actorId)
{
	if (!this._actors.contains(actorId) && $gameSystem._cardBattleEnabled && SceneManager._scene instanceof Scene_Battle)
	{
		var actor = $gameActors.actor(actorId);
		SceneManager._scene._skillWindow.addActorToZones(actor);
		actor.makeActions();
	}
	if (!this._actors.includes(actorId))
	{
		var skillCards = $gameActors.actor(actorId)._skillCards.slice();
		for (var i = 0; i < skillCards.length; i++)
		{
			this.addCardToLibrary(skillCards[i]);
		}
	}
	Myth.CGC.Game_Party_addActor.call(this, actorId);
};

Myth.CGC.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function ()
{
	Myth.CGC.Game_Party_initialize.call(this);
	this.initCards();
};

Game_Party.prototype.initCards = function ()
{
	if (this._allCards == undefined)
		this._allCards = new Game_Cards("Library");
	if (this._cardCollection == undefined)
		this._cardCollection = new Game_Cards("Collection");
}

Game_Party.prototype.addCardToLibrary = function (card)
{
	//this.initCards();
	if (card instanceof Game_Card)
		this._allCards.add(card);
	else
		card = this._allCards.push(card);

	this._cardCollection.add(card);
}


Game_Party.prototype.removeCardFromLibrary = function (card)
{
	if (card instanceof Game_Card)
	{
		var index = this._allCards.indexOfObject(card);
		if (index >= 0)
			this._allCards.splice(index, 1);
	}
	else
	{
		var index = this._allCards.indexOf(card);
		if (index >= 0)
			this._allCards.splice(index, 1);
	}
	
}

Game_Action.prototype.cardActionSubject = function ()
{
	return this.subject();
}



Myth.CGC.Scene_ItemBase_create = Scene_ItemBase.prototype.create;
Scene_ItemBase.prototype.create = function ()
{
	Myth.CGC.Scene_ItemBase_create.call(this);
};

Myth.CGC.Scene_Battle_updateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
Scene_Battle.prototype.updateBattleProcess = function ()
{
	if (BattleManager._phase == 'discard')
		BattleManager.updateDiscard();
	else if (BattleManager._phase == 'cardwait')
		BattleManager.updateCardWait();
	else if (BattleManager._phase == 'cardstart')
		BattleManager.updateCardStart();
	else if (BattleManager._phase == 'emptyZone')
		BattleManager.updateEmptyZone();

	var isActionPhase = BattleManager.isActionPhase();
	if ((!isActionPhase && BattleManager._phase != 'discard' && BattleManager._phase != 'emptyZone') && BattleManager.__forcedActions && BattleManager.__forcedActions.length > 0)
	{
		BattleManager.playForcedAction();
	}
	Myth.CGC.Scene_Battle_updateBattleProcess.call(this);
};

//This prevents Input from changing during a series of forced inputs
Myth.CGC.Scene_Battle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
Scene_Battle.prototype.changeInputWindow = function ()
{
	if (BattleManager.__forcedActions == undefined || BattleManager.__forcedActions.length == 0)
		Myth.CGC.Scene_Battle_changeInputWindow.call(this);
}

BattleManager.isActionPhase = function ()
{
	if (this._processingForcedAction) return true;

	switch (this._phase)
	{
		case 'action':
		case 'actionList':
		case 'actionTargetList':
		case 'cardstart':
			return true;
			break;
		default:
			return false;
			break;
	}
}

Myth.CGC.Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function ()
{
	ImageManager.loadBitmap("img/system/", Myth.CGC.images.cardDeck, 0, true);
	ImageManager.loadBitmap("img/system/", Myth.CGC.images.cardDiscard, 0, true);
	Myth.CGC.Scene_Battle_createDisplayObjects.call(this);

	if (!$gameSystem._cardBattleEnabled)
		return;

	if (Myth.CGC.showEndTurn)
		this.createEndTurnButton();
	if (Myth.CGC.showItemButton)
		this.createItemButton();

	this.createExtraButtons();
}

Myth.CGC.Scene_Battle_createSkillWindow = Scene_Battle.prototype.createSkillWindow;
Scene_Battle.prototype.createSkillWindow = function ()
{
	Myth.CGC.Scene_Battle_createSkillWindow.call(this);
};

Myth.CGC.Scene_battle_commandSkill = Scene_Battle.prototype.commandSkill;
Scene_Battle.prototype.commandSkill = function ()
{
	Myth.CGC.Scene_battle_commandSkill.call(this);
	if (!$gameSystem._cardBattleEnabled)
	{
		return;
	}
		

	this._skillWindow.select(this._skillWindow._itemsBeforeCards);
	if (Myth.Util.usingMZ)
	{
		this._statusWindow.show();

	}
		
}

Myth.CGC.Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
Scene_Battle.prototype.onSkillOk = function ()
{
	if (!$gameSystem._cardBattleEnabled)
	{
		Myth.CGC.Scene_Battle_onSkillOk.call(this);
		return;
	}
	if (BattleManager._phase == 'discard')
	{
		var wasValidString = false;
		var item = this._skillWindow.item();
		if (typeof item === 'string')
		{
			return;
		}
		var index = this._skillWindow.index();
		if (Myth.CGC.showEndTurn && index == this._skillWindow.endTurnIndex())
		{
			this._skillWindow.discardSelectedCards();
		}
		else
		{
			this._skillWindow.readyDiscard(index);
		}
		//this._skillWindow.discardCard(index);
		this._skillWindow.reselect();
		this._skillWindow.activate();
		//BattleManager._cardsToDiscard--;
	}
	else
	{
		var wasValidString = false;
		var item = this._skillWindow.item();
		if (typeof item === 'string')
		{
			wasValidString = this.executeStringSkill(item);
		}

		if (wasValidString == false)
			Myth.CGC.Scene_Battle_onSkillOk.call(this);
	}
	
	//SceneManager._scene.reorderCardSprites(index);
	//
};

Scene_Battle.prototype.executeStringSkill = function (string)
{
	if (string == 'itemMenu' && Myth.CGC.showItemButton)
	{
		this._lastWindow = 'skill';
		this.commandItem();
		return true;
	}
	else if (string == 'deck')
	{
		this._lastWindow = 'skill';
		var cards = [...BattleManager.actor()._cardDeck._data];
		Myth.Util.shuffleArray(cards);
		this.commandCardSelection(cards, 'left');
		return true;
	}
	else if (string == 'discardPile')
	{
		this._lastWindow = 'skill';
		var cards = [...BattleManager.actor()._cardDiscard._data];
		this.commandCardSelection(cards, 'right');
		return true;
	}
	else
	{
		for (var i = 0; i < this._zoneSprites.length; i++)
		{
			if (string == this._zoneSprites[i].name.toLowerCase())
			{
				var actor = BattleManager.actor();
				var cards = [...actor.getZoneByName(string)._data];
				this.commandCardSelection(cards, 'right');
				return true;
			}
		}
	}
	return false;
}

Myth.CGC.Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function ()
{
	if (!$gameSystem._cardBattleEnabled)
	{
		Myth.CGC.Scene_Battle_onSkillCancel.call(this);
		return;
	}

	if (BattleManager._phase != 'discard')
	{
		if (Myth.CGC.skipActorCommand)
		{
			this.selectPreviousCommand();
			if (!Myth.CGC.skipPartyCommand)
				this._skillWindow.deselect();
		}
		else
		{
			Myth.CGC.Scene_Battle_onSkillCancel.call(this);
			//SceneManager._scene.reorderCardSprites();
			this._skillWindow.deselect();
		}
	}
	
};

Myth.CGC.Scene_Battle_onItemCancel = Scene_Battle.prototype.onItemCancel;
Scene_Battle.prototype.onItemCancel = function ()
{
	if (!$gameSystem._cardBattleEnabled)
	{
		Myth.CGC.Scene_Battle_onItemCancel.call(this);
		return;
	}

	if (this._lastWindow == 'skill')
	{
		this._lastWindow = undefined;
		this._itemWindow.hide();
		this._skillWindow.activate();
		this._skillWindow.reselect();

		if (Myth.CGC.showHelpWindow)
		{
			this._helpWindow.show();
		}
	}
	else
		Myth.CGC.Scene_Battle_onItemCancel.call(this);

};

if (Myth.Util.usingMZ)
{
	Myth.CGC.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
	Scene_Battle.prototype.onEnemyCancel = function ()
	{
		Myth.CGC.Scene_Battle_onEnemyCancel.call(this);
		if (!$gameSystem._cardBattleEnabled)
		{
			return;
		}

		if (this._itemWindow.visible)
		{
			this._itemWindow.activate();
		}
		else
		{
			this._statusWindow.show();
			this._skillWindow.activate();
		}
	}

	Myth.CGC.Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
	Scene_Battle.prototype.commandItem = function ()
	{
		Myth.CGC.Scene_Battle_commandItem.call(this);
		if (!$gameSystem._cardBattleEnabled)
		{
			return;
		}
		this._statusWindow.show();
	}
}


Myth.CGC.Scene_Battle_createWindowLayer = Scene_Battle.prototype.createWindowLayer;
Scene_Battle.prototype.createWindowLayer = function ()
{
	
	if ($gameSystem._cardBattleEnabled && !this._cardParent)
	{
		var cardParent = new Sprite();
		this._cardParent = cardParent;
		this.addChild(this._cardParent);
	}

	Myth.CGC.Scene_Battle_createWindowLayer.call(this);
	if ($gameSystem._cardBattleEnabled)
	{
		this.createDeckSprite();
		this.createDiscardSprite();
		this.createExtraZoneSprites();
	}
};

Scene_Battle.prototype.createDeckSprite = function ()
{
	this._deckSprite = new Sprite_CardZone(Myth.CGC.zoneInfo.deck);
	this.addCardSprite(this._deckSprite);
};

Scene_Battle.prototype.createDiscardSprite = function ()
{
	this._discardSprite = new Sprite_CardZone(Myth.CGC.zoneInfo.discard);
	this.addCardSprite(this._discardSprite);
}

Scene_Battle.prototype.createExtraZoneSprites = function ()
{
	this._zoneSprites = [];
	for (var i = 0; i < Myth.CGC.zoneInfo.extra.length; i++)
	{
		var zone = Myth.CGC.zoneInfo.extra[i];
		this._zoneSprites[i] = new Sprite_CardZone(zone);
		this.addCardSprite(this._zoneSprites[i]);
		//this._skillWindow._zoneSprites.push(button);
	}
}

Scene_Battle.prototype.createEndTurnButton = function ()
{
	this._endTurnButton = new Sprite_EndTurnButton();
	this._endTurnButton._skillWindow = this._skillWindow;
	this._skillWindow._endTurnButton = this._endTurnButton;

	this.addCardSprite(this._endTurnButton);
	this._endTurnButton.x = Myth.CGC.buttonInfo.endTurn.coordinates.x;
	this._endTurnButton.y = Myth.CGC.buttonInfo.endTurn.coordinates.y;
};

Scene_Battle.prototype.createItemButton = function ()
{
	var buttonData = Myth.CGC.buttonInfo.itemButton;
	this._itemButton = new Sprite_CardButton('itemMenu');
	this._itemButton._enabledCondition = buttonData.enabledCondition;
	this._itemButton._skillWindow = this._skillWindow;
	this._skillWindow._itemButton = this._itemButton;
	this._itemButton.setBitmaps(buttonData.imageSheet);
	//this._itemButton.setIndex(0);
	this.addCardSprite(this._itemButton);
	

	this._itemButton.x = buttonData.coordinates.x;
	this._itemButton.y = buttonData.coordinates.y;
}

Scene_Battle.prototype.createExtraButtons = function ()
{
	this._extraButtons = [];
	var dataButtons = Myth.CGC.buttonInfo.extra;
	for (var i = 0; i < dataButtons.length; i++)
	{
		var extraButton = dataButtons[i];
		var skill = $dataSkills[extraButton.skillId];

		var shouldDisplay = eval(extraButton.appearCondition);
		if (!shouldDisplay)
			continue;

		var button = new Sprite_CardButton(extraButton.name);
		this._extraButtons.push(button);
		this._skillWindow._extraButtons.push(button);
		button._skillWindow = this._skillWindow;
		button.setBitmaps(extraButton.sheet);
		button.setSkill(extraButton.skillId);
		button._enabledCondition = extraButton.enabledCondition;
		button.x = extraButton.coordinates.x;
		button.y = extraButton.coordinates.y;
		button.disableDuringNonInput = JSON.parse(extraButton.disableDuringNonInput);
		this.addCardSprite(button);
	}
}

Myth.CGC.Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer
Scene_Base.prototype.createWindowLayer = function ()
{
	if (!this._cardParent)
	{
		var cardParent = new CardLayer();
		cardParent.setBackgrounds(this._backgroundSprite, this._libraryBackgroundSprite);
		if (!Myth.Util.usingMZ)
			cardParent.move(0, 0, Graphics.boxWidth, Graphics.boxHeight);
		this._cardParent = cardParent;
		this.addChild(this._cardParent);
	}
	Myth.CGC.Scene_Base_createWindowLayer.call(this);

};

Scene_Base.prototype.addCardSprite = function (sprite)
{
	this._cardParent.addChild(sprite);
	if (sprite._amountText)
	{
		this._cardParent.addChild(sprite._amountText);
	}
};

Scene_Base.prototype.removeCardSprite = function (sprite)
{
	this._cardParent.removeChild(sprite);
	if (sprite._amountText)
		this._cardParent.removeChild(sprite._amountText);
};

Scene_Battle.prototype.reorderCardSprites = function (indexToFront)
{
	if (!this._skillWindow) return;
	var actor = this._skillWindow._actor;
	var sprites = this._skillWindow._cardSprites.getCardSprites();
	for (var i = 0; i < sprites.length; i++)
	{
		this.removeCardSprite(sprites[i]);
	}

	for (var i = 0; i < sprites.length; i++)
	{
		if (i != indexToFront)
			this.addCardSprite(sprites[i]);
	}

	if (indexToFront != null && indexToFront >= 0 && indexToFront < sprites.length)
		this.addCardSprite(sprites[indexToFront]);

/*	var activeCardSprite = this._skillWindow._activeCardSprite;
	if (activeCardSprite)
	{
		this.removeCardSprite(activeCardSprite);
		this.addCardSprite(activeCardSprite);
	}*/
};

Myth.CGC.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function ()
{
	Myth.CGC.Scene_Battle_createAllWindows.call(this);
	if (!$gameSystem._cardBattleEnabled)
		return;

	this.createCardSelectionWindow();
	this.setDecksSkillWindow();

	if (Myth.CGC.statusWindowAtTop)
	{
		this._statusWindow.setHelpWindow(this._helpWindow);
		this._actorCommandWindow.setHelpWindow(this._helpWindow);
		if (!Myth.CGC.PartyUI)
			this._logWindow.y += this._statusWindow.height;
	}
};

Scene_Battle.prototype.createCardSelectionWindow = function ()
{
	this._cardSelectionWindow = new Window_CardSelection();

	this._cardSelectionWindow.hide();
	this._cardSelectionWindow.setHelpWindow(this._helpWindow);
	this._cardSelectionWindow.setHandler('ok', this.onCardSelectionOk.bind(this));
	this._cardSelectionWindow.setHandler('cancel', this.onCardSelectionCancel.bind(this));
	this.addWindow(this._cardSelectionWindow);
};

Scene_Battle.prototype.onCardSelectionOk = function ()
{
	this.onCardSelectionCancel();
}

Scene_Battle.prototype.onCardSelectionCancel = function ()
{
	this._lastWindow = undefined;
	this._cardSelectionWindow.hide();
	this._skillWindow.activate();
	this._skillWindow.reselect();

	if (Myth.CGC.showHelpWindow)
	{
		this._helpWindow.show();
	}
}

Scene_Battle.prototype.commandCardSelection = function (cards, direction)
{
	this._skillWindow.deactivate();
	//this._skillWindow.deselect();
	this._cardSelectionWindow.setCards(cards, direction);
	this._cardSelectionWindow.show();
	this._cardSelectionWindow.activate();
	this._cardSelectionWindow.select(0);
}

Myth.CGC.Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function ()
{
	var isAnyActive = Myth.CGC.Scene_Battle_isAnyInputWindowActive.call(this);
	return (isAnyActive || this._cardSelectionWindow.active);
};

Scene_Battle.prototype.setDecksSkillWindow = function ()
{
	this._deckSprite._skillWindow = this._skillWindow;
	this._skillWindow._deckSprite = this._deckSprite;
	this._discardSprite._skillWindow = this._skillWindow;
	this._skillWindow._discardSprite = this._discardSprite;
	for (var i = 0; i < this._zoneSprites.length; i++)
	{
		this._zoneSprites[i]._skillWindow = this._skillWindow;
	}
}

Myth.CGC.Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function ()
{
	if (!$gameSystem._cardBattleEnabled || !Myth.CGC.skipPartyCommand)
		return Myth.CGC.Scene_Battle_startPartyCommandSelection.call(this);
	BattleManager.selectNextCommand();
	this.startActorCommandSelection();
	this._partyCommandWindow.deactivate();
}

Myth.CGC.Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function ()
{
	if (!$gameSystem._cardBattleEnabled || !Myth.CGC.skipActorCommand)
		return Myth.CGC.Scene_Battle_startActorCommandSelection.call(this);

	this._statusWindow.select(BattleManager.actor().index());
	this._partyCommandWindow.close();
	this._partyCommandWindow.deactivate();
	//this._actorCommandWindow.setup(BattleManager.actor());
	this.commandSkill();
};

//UI
Window_Base.prototype.drawActorCardZones = function (actor, x, y)
{
	var xx = x;
	var textWidth = this.textWidth("00");

	this.drawText(actor._cardHand.length, xx, y, textWidth, 'right');
	xx += textWidth;
	this.drawIcon(Myth.CGC.statusIcons.handSize, xx, y + 2);

	xx += Window_Base._iconWidth + 4;

	this.drawText(actor._cardDeck.length, xx, y, textWidth, 'right');
	xx += textWidth;
	this.drawIcon(Myth.CGC.statusIcons.deckSize, xx, y + 2);
	xx += Window_Base._iconWidth + 4;

	this.drawText(actor._cardDiscard.length, xx, y, textWidth, 'right');
	xx += textWidth;
	this.drawIcon(Myth.CGC.statusIcons.discardSize, xx, y + 2);
};

Window_Base.prototype.drawActorCardZonesVertical = function (actor, x, y)
{
	var xx = x;
	var yy = y;
	var textWidth = this.textWidth("00");

	this.drawText(actor._cardHand.length, xx, yy, textWidth, 'right');
	this.drawIcon(Myth.CGC.statusIcons.handSize, xx + textWidth, yy + 2);

	yy += this.lineHeight();

	this.drawText(actor._cardDeck.length, xx, yy, textWidth, 'right')
	this.drawIcon(Myth.CGC.statusIcons.deckSize, xx + textWidth, yy + 2);

	yy += this.lineHeight();

	this.drawText(actor._cardDiscard.length, xx, yy, textWidth, 'right');
	this.drawIcon(Myth.CGC.statusIcons.discardSize, xx + textWidth, yy + 2);
};

//====================================================
// Window_CardSelection
//====================================================


function Window_CardSelection()
{
	this.initialize.apply(this, arguments);
}

Window_CardSelection.prototype = Object.create(Window_Selectable.prototype);
Window_CardSelection.prototype.constructor = Window_CardSelection;

Window_CardSelection.prototype.initialize = function (cards, direction)
{
	


	direction = direction || 'left';
	var x = 0;
	var width = this.windowWidth();
	var height = this.windowHeight();
	var y = this.getY();
	if (y == -1)
	{
		y = (Graphics.boxHeight - height) / 2;
	}
	this._cards = cards || [];
	this._data = [];
	if (Myth.Util.usingMZ)
	{
		var rect = new Rectangle(x, y, width, height);
		Window_Selectable.prototype.initialize.call(this, rect);
	}
	else
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);

/*	this._cardLayer = new CardLayer();
	this._cardLayer.move(x, y, width, height);
	SceneManager._scene.addChild(this._cardLayer);*/

	//var index = SceneManager._scene.children.indexOf(SceneManager._scene._windowLayer);
	//SceneManager._scene.addChildAt(this._cardLayer, index);
	
	this._cardSprites = [];
	this._direction = direction;
	this.createCardSprites();
};

Window_CardSelection.prototype.getY = function ()
{
	return Myth.CGC.coordinates.cardSelectionY;
}

Window_CardSelection.prototype.loadWindowskin = function ()
{
	this.windowskin = ImageManager.loadSystem(Myth.CGC.cardSelectionWindowskin);
};

Window_CardSelection.prototype.windowHeight = function ()
{
	return Myth.CGC.coordinates.cardSelectionHeight;
}

Window_CardSelection.prototype.windowWidth = function ()
{
	return Graphics.boxWidth;
}

Window_CardSelection.prototype.createCardSprites = function ()
{
	this.deleteCardSprites();
	for (var i = 0; i < this._cards.length; i++)
	{
		var card = this._cards[i];
		var sprite = new Sprite_SkillCard(card, $gameParty.leader());
		sprite._parentWindow = this;
		this.addChild(sprite);
		//this._cardLayer.addChild(sprite);
		this._cardSprites.push(sprite);
		sprite.y = (this.height / 2);
		if (this._direction == 'left')
			sprite.x = 0;
		else if (this._direction == 'right')
			sprite.x = Graphics.boxWidth;
	}
};

Window_CardSelection.prototype.deleteCardSprites = function ()
{
	for (var i = this._cardSprites.length - 1; i >= 0; i--)
	{
		var card = this._cardSprites[i];
		this.removeChild(card);
		//this._cardLayer.removeChild(card);
	}
	this._cardSprites = [];
}

Window_CardSelection.prototype.setCards = function (cards, direction)
{
	this._direction = direction || 'left';
	this._cards = cards;
	this.refresh();
	this.createCardSprites();
}

Window_CardSelection.prototype.update = function ()
{
	Window_Selectable.prototype.update.call(this);
	this.updateCardPosition();
};


Window_CardSelection.prototype.updateCardPosition = function ()
{
	for (var i = 0; i < this._cardSprites.length; i++)
	{
		var card = this._cardSprites[i];
		//var targetX = (cardWidth + spacing) * (i - index) + this.width / 2;
		var targetX = this.getCardX(i);
		var targetY = this.getCardY(i);
		card.x += (targetX - card.x) / 10;
		card.y += (targetY - card.y) / 10;

		if (this.index() == i)
			card.scale = this.selectedCardScale();
		else
			card.scale = this.cardScale();

		card.rotation = 0;
	}
};

Window_CardSelection.prototype.getCardX = function (index)
{
	var cardWidth = this.getCardPadding();
	if (this._cardSprites[0])
	{
		var scaleX = this.cardScale().x;
		cardWidth = this._cardSprites[0].bitmap.width * scaleX;
	}
	var totalCardWidth = cardWidth + this.getCardPadding();
	//var startingPadding = this.standardPadding ? this.standardPadding() : 30;
	var currentIndex = this.index();
	var targetX = (totalCardWidth) * (index - currentIndex) + this.width / 2;
	return targetX;
};

Window_CardSelection.prototype.getCardY = function (index)
{
	return (this.height / 2);
}

Window_CardSelection.prototype.cardScale = function ()
{
	return new Point(1, 1);
}

Window_CardSelection.prototype.selectedCardScale = function ()
{
	return new Point(1.1, 1.1);
}

Window_CardSelection.prototype.getCardPadding = function ()
{
	return 20;
}

Window_CardSelection.prototype.makeItemList = function ()
{
	this._data = this._cards;
};

Window_CardSelection.prototype.refresh = function ()
{
	this.makeItemList();
	this.createContents();
	this.drawAllItems();
};

Window_CardSelection.prototype.maxCols = function ()
{
	return this._cards.length;
};

Window_CardSelection.prototype.maxItems = function ()
{
	return this._cards.length;
};

Window_CardSelection.prototype.updateCursor = function ()
{
	this.setCursorRect(0, 0, 0, 0);
};

Window_CardSelection.prototype.drawAllItems = function ()
{

};

Window_CardSelection.prototype.updateHelp = function ()
{
	this.setHelpWindowItem(this.item());
};

Window_CardSelection.prototype.setHelpWindowItem = function (item)
{
	if (typeof item === "number")
		item = $dataSkills[item];
	Window_BattleSkill.prototype.setHelpWindowItem.call(this, item);
};

Window_CardSelection.prototype.item = function ()
{
	return Window_SkillList.prototype.item.call(this);
};


// Touch input
if (Myth.Util.usingMZ)
{

	Window_CardSelection.prototype.hoverCard = function ()
	{
		var currentIndex = -1;
		var cardSprites = this._cardSprites;
		for (var i = cardSprites.length - 1; i >= 0; i--)
		{
			if (cardSprites[i].__mouseEntered)
			{
				currentIndex = i;
				break;
			}
		}

		if (currentIndex != -1 && this.isCursorMovable())
		{
			this.select(currentIndex);
		}
	}

	Window_CardSelection.prototype.confirmByCard = function (card)
	{
		var lastIndex = this.index();
		var currentIndex = -1;

		var cardSprites = this._cardSprites;
		for (var i = 0; i < cardSprites.length; i++)
		{
			if (cardSprites[i] == card)
			{
				currentIndex = i;

				break;
			}
		}

		//if (currentIndex != -1 && lastIndex === currentIndex)
		if (this.active)
		{
			this.processOk();
		}
	}
}
else
{
	Window_CardSelection.prototype.onTouch = function (triggered)
	{
		var lastIndex = this.index();
		var currentIndex = -1;
		var cards = this._cardSprites;
		for (var i = cards.length - 1; i >= 0; i--)
		{
			var sprite = cards[i];
			if (sprite.isTouchedInsideFrame())
			{
				currentIndex = i;
				break;
			}
		}
		if (currentIndex != -1)
		{
			if (currentIndex === lastIndex)
			{
				if (triggered && this.isTouchOkEnabled())
				{
					this.processOk();
				}
			}
			else if (this.isCursorMovable())
			{
				this.select(currentIndex);
			}
		}
		if (this.index() !== lastIndex)
		{
			SoundManager.playCursor();
		}
	}
}
// 2 MZ functions:

Window_CardSelection.prototype.itemAt = function (index)
{
	return Window_SkillList.prototype.itemAt.call(this, index);
};

Window_CardSelection.prototype.refreshCursor = function ()
{
	this.setCursorRect(0, 0, 0, 0);
};

Window_Base.prototype.drawIconScaled = function (iconIndex, x, y, width, height)
{
	var bitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	var b = new Bitmap(pw, ph);
	b.blt(bitmap, sx, sy, pw, ph, 0, 0)
	this.contents.blt(b, 0, 0, pw, ph, x, y, width, height);
}

Myth.Util.spritePrototype.prototype.drawIconScaled = function (iconIndex, x, y, width, height)
{
	var bitmap = ImageManager.loadSystem('IconSet');

	var pw = Myth.Util.usingMZ ? ImageManager.iconWidth : Window_Base._iconWidth;
	var ph = Myth.Util.usingMZ ? ImageManager.iconHeight :  Window_Base._iconHeight;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	//console.log(pw, ph, sx, sy);
	var b = new Bitmap(pw, ph);
	b.blt(bitmap, sx, sy, pw, ph, 0, 0)
	this.bitmap.blt(b, 0, 0, pw, ph, x, y, width, height);
};

Myth.Util.spritePrototype.prototype.drawIcon = function (iconIndex, x, y)
{
	var size = Myth.CGC.fontSizes.iconSize;
	this.drawIconScaled(iconIndex, x, y - 3, size, size);
/*	var bitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	this.bitmap.blt(bitmap, sx, sy, pw, ph, x, y);*/
};



//=================================================================
// Scene_Skill -> Library Scene
//===================================================================

Myth.CGC.Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function ()
{
	Myth.CGC.Window_MenuCommand_addOriginalCommands.call(this);
	if (!Myth.CGC.libraryMenuSetting != "Replace Skill Menu" && $gameSystem._showCardLibraryInMenu)
		this.addCommand(Myth.CGC.cardLibraryMenuDesc, 'card', true);
};

Myth.CGC.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function ()
{
	Myth.CGC.Scene_Menu_createCommandWindow.call(this);
	this._commandWindow.setHandler('card', this.commandPersonal.bind(this));
};

Myth.CGC.Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function ()
{
	var symbol = this._commandWindow.currentSymbol();
	if (symbol == 'skill' && Myth.CGC.libraryMenuSetting == "Replace Skill Menu")
	{
		SceneManager.push(Scene_CardLibrary);
		return;
	}
	Myth.CGC.Scene_Menu_onPersonalOk.call(this);
	if (symbol == 'card')
		SceneManager.push(Scene_CardLibrary);
}


function Scene_CardLibrary()
{
	this.initialize.apply(this, arguments);
};

Scene_CardLibrary.prototype = Object.create(Scene_Skill.prototype);
Scene_CardLibrary.prototype.constructor = Scene_CardLibrary;

Scene_CardLibrary.prototype.createHelpWindow = function ()
{
	if (Myth.Util.usingMZ)
	{
		const rect = this.helpWindowRect();
		this._helpWindow = new Window_Help(rect);
	}
	else
	{
		this._helpWindow = new Window_Help();
		
	}
	var y = Graphics.boxHeight - this._helpWindow.height;
	this._helpWindow.y = y;

	if (this.doesShowHelpWindow())
		this.addWindow(this._helpWindow);
	else
	{
		this._helpWindow.y += this._helpWindow.height;
		this._helpWindow.height = 0;
	}

};

Scene_CardLibrary.prototype.createSkillTypeWindow = function ()
{
	Scene_Skill.prototype.createSkillTypeWindow.call(this);
	this._skillTypeWindow.y = 0;
}

Scene_CardLibrary.prototype.createStatusWindow = function ()
{
	Scene_Skill.prototype.createStatusWindow.call(this);
	this._statusWindow.y = 0;
}

Scene_CardLibrary.prototype.doesShowHelpWindow = function ()
{
	return Myth.CGC.showHelpWindowInSkillScene;
}

Scene_CardLibrary.prototype.createItemWindow = function ()
{
	var wx = 0;
	var wy = this._statusWindow.y + this._statusWindow.height;
	var ww = Graphics.boxWidth;
	var wh = Graphics.boxHeight - wy;
	if (this.doesShowHelpWindow())
	{
		wh -= this._helpWindow.height;
	}
	this._itemWindow = new Window_CardList(wx, wy, ww, wh);
	this._itemWindow.setHelpWindow(this._helpWindow);
	this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
	this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
	this._skillTypeWindow.setSkillWindow(this._itemWindow);
	this.addWindow(this._itemWindow);

	
	//cardParent.setBackgrounds(this._backgroundSprite, this._libraryBackgroundSprite);
	if (!Myth.Util.usingMZ)
		this._cardParent.move(wx, wy, ww, wh);
};

Scene_CardLibrary.prototype.getLibraryBackground = function ()
{
	return "";
}

Scene_CardLibrary.prototype.createBackground = function ()
{
	Scene_Skill.prototype.createBackground.call(this);

	var bitmapName = this.getLibraryBackground();
	if (!bitmapName || bitmapName == "") return;

	this._libraryBackgroundSprite = new Sprite(ImageManager.loadPicture(bitmapName));
	this.addChild(this._libraryBackgroundSprite);
};



Window_SkillList.prototype.isInBattle = function ()
{
	return false;
}


function Window_CardList()
{
	this.initialize.apply(this, arguments);
};

Window_CardList.prototype = Object.create(Window_SkillList.prototype);
Window_CardList.prototype.constructor = Window_CardList;

Window_CardList.prototype.initialize = function (x, y, width, height)
{
	if (Myth.Util.usingMZ)
	{
		var rect = new Rectangle(x, y, width, height);
		Window_SkillList.prototype.initialize.call(this, rect);
	}
	else
		Window_SkillList.prototype.initialize.call(this, x, y, width, height);
	this.opacity = 0;
	this.contentsOpacity = 0;

	this._cardSprites = [];
	this._currentRow = 0;
	this._rowOffset = 0;
	this._currentCol = 0;
	this._colOffset = 0;
	this._cardToCreate = -1;
	this.createScrollBar();
};

Window_CardList.prototype.scrollBackImage = function ()
{
	return "ScrollBarBack";
}

Window_CardList.prototype.scrollBarImage = function ()
{
	return "ScrollBar";
}

Window_CardList.prototype.scrollBarYPinch = function ()
{
	return 0;
}

Window_CardList.prototype.createScrollBar = function ()
{
	var backBitmap = ImageManager.loadSystem(this.scrollBackImage());
	this._scrollBack = new Sprite(backBitmap, this);
	this._scrollBack._baseImage = backBitmap;
	this.addChild(this._scrollBack);


	var bitmap = ImageManager.loadSystem(this.scrollBarImage());
	this._scrollBar = new Sprite_ScrollBar(bitmap, this);
	this._scrollBar._baseImage = bitmap;
	this._scrollBar.back = this._scrollBack;

	this._scrollBar.x = this.scrollBarX();
	this._scrollBar.yPinch = this.scrollBarYPinch();
	this._scrollBack.x = this._scrollBar.x;
	this.addChild(this._scrollBar);
}

Window_CardList.prototype.isHoverEnabled = function ()
{
	return false;
};

Window_CardList.prototype.setActor = function (actor)
{
	Window_SkillList.prototype.setActor.call(this, actor);
	//this.createCardSprites();
};

Window_CardList.prototype.drawItemBackground = function (index)
{

};

Window_CardList.prototype.createCardSprites = function ()
{
	this.deleteCardSprites();
	this._cardToCreate = 0;
};


Window_CardList.prototype.refresh = function ()
{
	this.createCardSprites();
	Window_SkillList.prototype.refresh.call(this);
	this._scrollBar.redraw();
};

Window_CardList.prototype.onTouch = function (triggered)
{
	var lastIndex = this.index();
	var currentIndex = -1;
	var handCards = this._cardSprites;
	for (var i = handCards.length - 1; i >= 0; i--)
	{
		var sprite = handCards[i];
		if (sprite.isTouchedInsideFrame())
		{
			currentIndex = i;
			break;
		}

	}
	if (currentIndex != -1)
	{
		if (currentIndex === lastIndex)
		{
			if (triggered && this.isTouchOkEnabled())
			{
				this.processOk();
			}
		}
		else if (this.isCursorMovable())
		{
			this.select(currentIndex);
		}
	}
	if (this.index() !== lastIndex)
	{
		SoundManager.playCursor();
	}
};

Window_CardList.prototype.cardsToList = function ()
{
	return [...this._actor._skillCards._data];
}

Window_CardList.prototype.usingSimpleView = function ()
{
	return Myth.CGC.simpleDeckView;
}

Window_CardList.prototype.makeItemList = function ()
{
	this._data = [];
	this._amounts = [];
	var cards = this.cardsToList();
	cards.sort(function (a, b)
	{
		if (a.id() < b.id())
			return -1;
		if (b.id() < a.id())
			return 1;

		return a.originSortId() - b.originSortId();
	});
	cards = this.includeMissingCards(cards);
	var lastIndex = -1;
	for (var i = 0; i < cards.length; i++)
	{
		var card = cards[i];
		if (!this.includes(card))
			continue;
		var lastCard = this._data[lastIndex];
		if (!this.usingSimpleView() && lastCard != null && card.isIdenticalTo(lastCard))
		{
			this._amounts[lastIndex]++;
		}
		else
		{
			lastIndex++;
			this._data.push(card);
			var amount = 1;
			if (card.origin() == "missing")
				amount = 0;
			this._amounts.push(amount);
		}
	}
	
};

Window_CardList.prototype.includeMissingCards = function (cards)
{
	if (!this.showMissingCards() && !this.showGapCards()) return cards;

	for (var i = 0; i < cards.length; i++)
	{
		if (i == 0) continue;

		var id = cards[i].id();
		var lastId = cards[i - 1].id();
		if (id - lastId > 1)
		{
			var card = new Game_Card(lastId + 1, "missing");
			cards.splice(i, 0, card);
			//i--;
		}
	}

	if (!this.showMissingCards()) return cards;

	var lowestId = cards[0].id();
	for (var i = 1; i < lowestId; i++)
	{
		var card = new Game_Card(i, "missing");
		cards.splice(i - 1, 0, card);
	}
	var highestId = cards[cards.length - 1].id();
	var dataLength = $dataSkills.length;
	for (var i = highestId + 1; i < dataLength; i++)
	{
		var card = new Game_Card(i, "missing");
		cards.push(card);
	}

	return cards;
}

Window_CardList.prototype.includes = function (item)
{
	var dataSkill = $dataSkills[item.id()];
	//var includes = Window_SkillList.prototype.isEnabled.call(this, dataSkill);
	//if (!includes) return false;

	if (dataSkill.name == "" && !Myth.CGC.showBlankCardsInLibrary)
		return false;

	if (this.shouldHideCard(dataSkill)) return false;

	return true;
}

Window_CardList.prototype.shouldHideCard = function (dataSkill)
{
	if (dataSkill.hideFromCardLibrary) return true;
}

Window_CardList.prototype.isEnabled = function (item)
{
	return false;
};

Window_CardList.prototype.deleteCardSprites = function ()
{
	for (var i = this._cardSprites.length - 1; i >= 0; i--)
	{
		var card = this._cardSprites[i];
		SceneManager._scene.removeCardSprite(card);
	}
	this._cardSprites = [];
};

Window_CardList.prototype.update = function ()
{
	Window_SkillList.prototype.update.call(this);
	this.updateCardCreation();
	this.updateCardPosition();
};

Window_CardList.prototype.updateCardCreation = function ()
{
	if (this._cardToCreate == -1) return;
	//var finalY = this.getCardY(this._cardsToCreate);
	//if (finalY > (Graphics.boxHeight + this.cardHeight() / 2) && Graphics._fpsMeter.fps < 50) return;

	var spriteCard = this.createCard();
	if (spriteCard)
	{
		this.addCardSprite(spriteCard);

		this._cardSprites.push(spriteCard);
/*		this.makeItemList();*/

		var finalX = this.getCardX(this._cardToCreate - 1);
		var finalY = this.getCardY(this._cardToCreate - 1);
		if (finalX > Graphics.boxWidth + this.cardWidth() || finalY > Graphics.boxHeight + this.cardHeight())
		{
			spriteCard.x = finalX;
			spriteCard.y = finalY;
		}
		else
		{
			spriteCard.x = -this.getCardX(0) * 2;
			spriteCard.y = this.getCardY(this._cardToCreate - 1);
		}

		this._scrollBar.redraw();
	}

	
};

Window_CardList.prototype.addCardSprite = function (spriteCard)
{
	SceneManager._scene.addCardSprite(spriteCard);
/*	spriteCard._parentWindow = this;
	this.addChild(spriteCard);
	if (spriteCard._amountText)
		this.addChild(spriteCard._amountText);*/
}

Window_CardList.prototype.actorCards = function ()
{
	return this._actor._skillCards.slice();
}

Window_CardList.prototype.createCard = function ()
{
	if (this._cardToCreate >= this._data.length) return null;
	var actor = this._actor;
	var card = this._data[this._cardToCreate];
	if (!card) return null;
	var spriteCard;
	if (!(card instanceof Game_Card))
	{
		spriteCard = this.createCardSpecial(card);
		if (!spriteCard)
		{
			this._cardToCreate++;
			return null;
		}
	}
	else
		spriteCard = new Sprite_SkillCard(card, actor);

	if (!this.usingSimpleView() && this.drawAmounts())
	{
		var amount = this._amounts[this._cardToCreate];
		spriteCard._amountText = new Window_CardAmount(spriteCard, this.cardWidth());
		spriteCard._amount = amount;
		spriteCard.drawAmount();
	}
	if (this.drawCardOrigin() && spriteCard)
		spriteCard.setDrawOrigin(true);

	this._cardToCreate++;
	return spriteCard;
};

Window_CardList.prototype.drawCardOrigin = function ()
{
	return Myth.CGC.coordinates.displayOriginBadges;
}

Window_CardList.prototype.drawAmounts = function ()
{
	return true;
}

Window_CardList.prototype.createCardSpecial = function (dataObj)
{
	//to be overridden in expansions
	return null;
}

Window_CardList.prototype.showMissingCards = function ()
{
	return Myth.CGC.showMissingCardsInLibrary;
}

Window_CardList.prototype.showGapCards = function ()
{
	return Myth.CGC.showGapCardsInLibrary;
}

Window_CardList.prototype.ensureCursorVisible = function ()
{

}

Window_CardList.prototype.getCurrentRow = function ()
{
	return Math.floor(this.index() / this.maxCols());
};

Window_CardList.prototype.getCurrentCol = function ()
{
	return (this.index() % this.maxCols());
};

Window_CardList.prototype.getLowestRow = function ()
{
	return Math.ceil(this._data.length / this.maxCols());
}

Window_CardList.prototype.select = function (index)
{
	var oldRow = this.getCurrentRow();
	var oldCol = this.getCurrentCol();
	

	Window_Selectable.prototype.select.call(this, index);

	if (index == -1)
	{
		this._currentRow = 0;
		this._rowOffset = 0;
		this._currentCol = 0;
		this._colOffset = 0;
		return;
	}
	this.scrollVertically(oldRow);
	this.scrollHorizontally(oldCol);
}

Window_CardList.prototype.scrollVertically = function (oldRow)
{
	if (oldRow < 0) oldRow = 0;

	var rowDiff = this.getCurrentRow() - oldRow;

	this._rowOffset += rowDiff;
	while (this._rowOffset <= 0)
	{
		this._rowOffset++;
		this._currentRow--;
	}
	while (this._rowOffset >= this.numVisibleRows() - 1)
	{
		this._rowOffset--;
		this._currentRow++;
	}

	if (this._currentRow < 0)
	{
		this._currentRow = 0;
		this._rowOffset = 0;
	}
}

Window_CardList.prototype.scrollHorizontally = function (oldCol)
{
	if (oldCol < 0) oldCol = 0;


	var colDiff = this.getCurrentCol() - oldCol;

	this._colOffset += colDiff;
	while (this._colOffset <= 0)
	{
		this._colOffset++;
		this._currentCol--;
	}
	while (this._colOffset >= this.numVisibleCols())
	{
		this._colOffset--;
		this._currentCol++;
	}


	if (this._currentCol < 0)
	{
		this._currentCol = 0;
		this._colOffset = 0;
	}
}

Window_CardList.prototype.updateCardPosition = function ()
{
	for (var i = 0; i < this._cardSprites.length; i++)
	{
		var card = this._cardSprites[i];
		var targetX = this.getCardX(i);
		card.x += (targetX - card.x) / 10;
		var targetY = this.getCardY(i);
		card.y += (targetY - card.y) / 10;

		if (this.index() == i)
			card.scale = this.selectedCardScale();
		else
			card.scale = this.cardScale();

		if (card._amountText)
		{

			card._amountText.x = this.getAmountX(card);
			card._amountText.y = this.getAmountY(card);
		}
	}

	this.updateScrollBarPosition();
};

Window_CardList.prototype.getCardX = function (index)
{
	var totalCardWidth = this.totalCardWidth();
	var startingPadding = this.cardPaddingX();
	var thisColumn = (index % this.maxCols());

	var targetX = this.x + totalCardWidth * (thisColumn - this._currentCol) + startingPadding + this.cardWidth() / 2 - SceneManager._scene._cardParent.x;
	return targetX;
}

Window_CardList.prototype.getCardY = function (index)
{
	var totalCardHeight = this.totalCardHeight();
	var startingPadding = this.cardPaddingY();
	var thisRow = Math.floor(index / this.maxCols());

	var targetY = this.y + totalCardHeight * (thisRow - this._currentRow) + startingPadding + this.cardHeight() / 2 - SceneManager._scene._cardParent.y;
	return targetY;
};

Window_CardList.prototype.cardWidth = function ()
{
	var bitmap = Myth.CGC.defaultCardBack;
	return bitmap.width * this.cardScale().x;
}

Window_CardList.prototype.cardHeight = function ()
{
	var bitmap = Myth.CGC.defaultCardBack;
	return bitmap.height * this.cardScale().y;
}

Window_CardList.prototype.totalCardWidth = function ()
{
	return this.cardWidth() + this.cardBufferWidth();
}

Window_CardList.prototype.totalCardHeight = function ()
{
	return this.cardHeight() + this.cardBufferHeight();
}


//Hard coded values that are overridden through LibraryPlus plugin params:
Window_CardList.prototype.displaySettings = function ()
{
	return {
		maxCols: 6,
		amountCoords: { x: 0, y: 0 },
		amountJustify: "right",
		cardScale: 1,
		selectedCardScale: 1.1,
		cardSpacing: { x: 30, y: 70 },
		startPadding: { x: 50, y: 90 }
	}
}

Window_CardList.prototype.cardScale = function ()
{
	var scale = this.displaySettings().cardScale;
	return new Point(scale, scale);
}

Window_CardList.prototype.selectedCardScale = function ()
{
	var scale = this.displaySettings().selectedCardScale;
	return new Point(scale, scale);
}

Window_CardList.prototype.maxCols = function ()
{
	return this.displaySettings().maxCols;
}

Window_CardList.prototype.numVisibleRows = function ()
{
	//lowest recommended value is 2
	return 2;
}

Window_CardList.prototype.numVisibleCols = function ()
{
	//lowest recommended value is 2
	return 6;
}

Window_CardList.prototype.cardPaddingX = function ()
{
	return this.displaySettings().startPadding.x;
}

Window_CardList.prototype.cardPaddingY = function ()
{
	return this.displaySettings().startPadding.y;
}

Window_CardList.prototype.cardBufferWidth = function ()
{
	return this.displaySettings().cardSpacing.x;
}

Window_CardList.prototype.cardBufferHeight = function ()
{
	return this.displaySettings().cardSpacing.y;
}

Window_CardList.prototype.getAmountX = function (spriteCard)
{
	return spriteCard.x - (spriteCard._amountText.width / 2);
}

Window_CardList.prototype.getAmountY = function (spriteCard)
{
	return spriteCard.y + spriteCard.height / 2 * this.cardScale().y;
}

Window_CardList.prototype.scrollBarX = function ()
{
	var padding = Myth.Util.usingMZ ? $gameSystem.windowPadding() : this.standardPadding();
	return this.width - padding;
}

Window_CardList.prototype.updateScrollBarPosition = function ()
{
	if (this._scrollBar.isPressed()) return;
	this._scrollBar.x = this.scrollBarX();

	var lowestRow = this.getLowestRow() - (this.numVisibleRows() - 1);
	if (lowestRow <= 0) lowestRow = 1;
	var percent = (this._currentRow) / (lowestRow);
	var usedHeight = (this.height - this._scrollBar.yPinch * 2);
	var scrollHeight = this._scrollBar.height;
	var scrollTargetY = (percent * usedHeight) - (percent * scrollHeight);
	this._scrollBar.y += (scrollTargetY - this._scrollBar.y) / 10;
	return;
};

Window_CardList.prototype.selectByBarY = function (y)
{
	var scrollY = this._scrollBar.y;
	var usedHeight = (this.height - this._scrollBar.yPinch * 2);
	var scrollHeight = this._scrollBar.height;

	var percent = (1 / (usedHeight - scrollHeight)) * scrollY;

	//var percent = scrollY / (this.height - this._scrollBar.yPinch * 2);
	var lowestRow = this.getLowestRow();// - (this.numVisibleRows() - 1);
	if (lowestRow <= 0) lowestRow = 1;
	var row = Math.max(0, Math.ceil(percent * (lowestRow)) - 1);
	this.select(row * this.maxCols());
	return;
}


function Sprite_ScrollBar()
{
	this.initialize.apply(this, arguments);
}

Sprite_ScrollBar.prototype = Object.create(Myth.Util.spritePrototype.prototype);
Sprite_ScrollBar.prototype.constructor = Sprite_ScrollBar;


Sprite_ScrollBar.prototype.initialize = function (bitmap, parent)
{
	Myth.Util.spritePrototype.prototype.initialize.call(this);
	this._baseImage = bitmap;
	this.listWindow = parent;
	this.bitmap = bitmap;
	if (bitmap.width > 0)
		this.redraw();
	else
	{
		this.firstLoad = true;
		this._baseImage.addLoadListener(this.redraw.bind(this));
	}

	this._pressed = false;
	this._hovered = false;
};

Sprite_ScrollBar.prototype.redrawBack = function ()
{
	if (!this.back) return;

	var width = this.back._baseImage.width;
	var height = this.listWindow.height;

	var bitmap = new Bitmap(width, height);
	var sectionHeight = this.back._baseImage.height / 3;

	bitmap.blt(this.back._baseImage, 0, 0, width, sectionHeight, 0, this.yPinch);
	bitmap.blt(this.back._baseImage, 0, sectionHeight, width, sectionHeight, 0, sectionHeight + this.yPinch, width, height - (sectionHeight * 2) - this.yPinch);
	bitmap.blt(this.back._baseImage, 0, sectionHeight * 2, width, sectionHeight, 0, height - sectionHeight - this.yPinch);
	this.back.bitmap = bitmap;
};

Sprite_ScrollBar.prototype.redraw = function ()
{
	this.redrawBack();
	var width = this._baseImage.width;
	var listWindow = this.listWindow;
	var height = listWindow.height;
	if (listWindow._cardSprites.length > 0)
	{
		var cardHeight = listWindow.totalCardHeight();;

		var lowestRow = listWindow.getLowestRow() - (listWindow.numVisibleRows() - 3);
		//console.log(lowestRow);
		if (lowestRow <= 0) lowestRow = 1;
/*		
		else if (lowestRow == 2)
			lowestRow = 3;*/
		var totalHeight = lowestRow * cardHeight;
		var usedHeight = listWindow.height;
		var percentage = usedHeight / totalHeight;
		this._totalHeight = totalHeight;
		height = listWindow.height * percentage;
		//console.log(lowestRow, height);
	}
	if (height < this._baseImage.height)
		height = this._baseImage.height;
	if (height > listWindow.height)
		height = listWindow.height;
	//console.log(height);
	var bitmap = new Bitmap(width, height);
	//console.log(bitmap.height);
	var sectionHeight = this._baseImage.height / 3;
	bitmap.blt(this._baseImage, 0, 0, width, sectionHeight, 0, this.yPinch);
	bitmap.blt(this._baseImage, 0, sectionHeight, width, sectionHeight, 0, sectionHeight + this.yPinch, width, height - (sectionHeight * 2) - this.yPinch);
	bitmap.blt(this._baseImage, 0, sectionHeight * 2, width, sectionHeight, 0, height - sectionHeight - this.yPinch);
	this.bitmap = bitmap;
}

// A slight change to MZ's touch input to make it so once you click
// Moving your mouse away from the sprite doesn't cause _pressed
// to become false.
Sprite_ScrollBar.prototype.processTouch = function ()
{
	if (this.isClickEnabled())
	{
		if (this.isBeingTouched())
		{
			if (Myth.Util.usingMZ && !this._hovered && TouchInput.isHovered())
			{
				this._hovered = true;
				this.onMouseEnter();
			}
			if (TouchInput.isTriggered())
			{
				this._pressed = true;
			}
		} else
		{
			if (this._hovered)
			{
				this.onMouseExit();
			}
			this._hovered = false;
		}
		if (this._pressed && TouchInput.isReleased())
		{
			this._pressed = false;
		}
	} else
	{
		this._pressed = false;
		this._hovered = false;
	}
};

if (!Myth.Util.usingMZ)
{
	// We need the MV version of the project to mimic
	// MZ's touch input

	Sprite_ScrollBar.prototype.update = function ()
	{
		Sprite_Base.prototype.update.call(this);
		this.processTouch();
	};	

	Sprite_ScrollBar.prototype.isPressed = function ()
	{
		return this._pressed;
	};

	Sprite_ScrollBar.prototype.isClickEnabled = function ()
	{
		return this.worldVisible;
	};

	Sprite_ScrollBar.prototype.isBeingTouched = function ()
	{
		const touchPos = new Point(TouchInput.x, TouchInput.y);
		const localPos = this.worldTransform.applyInverse(touchPos);
		return this.hitTest(localPos.x, localPos.y);
	};

	Sprite_ScrollBar.prototype.hitTest = function (x, y)
	{
		const rect = new Rectangle(
			-this.anchor.x * this.width,
			-this.anchor.y * this.height,
			this.width,
			this.height
		);
		return rect.contains(x, y);
	};
};

Sprite_ScrollBar.prototype.update = function ()
{
	Myth.Util.spritePrototype.prototype.update.call(this);
	if (!Myth.Util.usingMZ)
		this.processTouch();

	if (this.isPressed())
	{
		const touchPos = new Point(TouchInput.x, TouchInput.y);
		const localPos = this.listWindow.worldTransform.applyInverse(touchPos);
		var targetY = localPos.y - (this.bitmap.height / 2);
		targetY = Math.max(targetY, 0);
		targetY = Math.min(targetY, this.listWindow.height - this.bitmap.height);
		this.y = targetY;
		this.listWindow.selectByBarY(this.y);
	}
};


function Window_CardAmount()
{
	this.initialize.apply(this, arguments);
}

Window_CardAmount.prototype = Object.create(Window_Base.prototype);
Window_CardAmount.prototype.constructor = Window_CardAmount;

Window_CardAmount.prototype.initialize = function (spriteCard, width)
{
	var x = 0;
	var y = 0;
	width = width || 40;
	var height = this.windowHeight();
	this._color = 'white';
	if (Myth.Util.usingMZ)
	{
		var rect = new Rectangle(x, y, width, height);
		Window_Base.prototype.initialize.call(this, rect);
	}
	else
		Window_Base.prototype.initialize.call(this, x, y, width, height);

	this._spriteCard = spriteCard;
	if (Myth.Util.usingMZ)
		this.frameVisible = false;
	else
		this._windowFrameSprite.visible = false;
	this.backOpacity = 0;
	//this.contentsOpacity = 255;
	//this.setBackgroundType(2);
}

Window_CardAmount.prototype.windowHeight = function ()
{
	return this.fittingHeight(this.maxRows());
};

Window_CardAmount.prototype.maxRows = function ()
{
	return 1;
}

Window_CardAmount.prototype.standardPadding = function ()
{
	return 0;
};

Window_CardAmount.prototype.updatePadding = function ()
{
	this.padding = 0;
};

Window_CardAmount.prototype.textAlign = function ()
{
	return 'center';
}

Window_CardAmount.prototype.drawAmount = function (color)
{
	this.contents.clear();
	if (color == undefined)
		color = 'white';
	this.contents.textColor = color;
	this.drawText("x" + this._spriteCard._amount, 0, 0, this.contents.width, this.textAlign());
}

Window_CardAmount.prototype.drawAmountWithSuffix = function (color, suffix)
{
	this.contents.clear();
	if (color == undefined)
		color = 'white';
	this.contents.textColor = color;
	this.drawText(this._spriteCard._amount + " " + suffix, 0, 0, this.contents.width, this.textAlign());
}


SoundManager.playExitZone = function (zoneName)
{
	var dataZone = Myth.Util.getZoneDataByName(zoneName);
	if (dataZone && dataZone.exitSFX)
	{
		var se = {
			name: dataZone.exitSFX,
			pan: 0,
			pitch: 100,
			volume: 90
		}
		AudioManager.playStaticSe(se);
	}
};

SoundManager.playEnterZone = function (zoneName)
{
	if (this.__ignoreZoneMoveSound)
		return this.__ignoreZoneMoveSound = false;
	var dataZone = Myth.Util.getZoneDataByName(zoneName);
	if (dataZone && dataZone.enterSFX)
	{
		var se = {
			name: dataZone.enterSFX,
			pan: 0,
			pitch: 100,
			volume: 90
		}
		AudioManager.playStaticSe(se);
	}
};

SoundManager.playAddCard = function ()
{
	this.__ignoreZoneMoveSound = true;
	var seName = Myth.CGC.addCardSFX;
	if (seName)
	{
		var se = {
			name: seName,
			pan: 0,
			pitch: 100,
			volume: 90
		}
		AudioManager.playStaticSe(se);
	}
};

SoundManager.playShuffle = function ()
{
	var seName = Myth.CGC.shuffleSFX;
	if (seName)
	{
		var se = {
			name: seName,
			pan: 0,
			pitch: 100,
			volume: 90
		}
		AudioManager.playStaticSe(se);
	}
}

SoundManager.playRemoveCard = function ()
{
	//this.__ignoreZoneMoveSound = true;
	var seName = Myth.CGC.removeCardSFX;
	if (seName)
	{
		var se = {
			name: seName,
			pan: 0,
			pitch: 100,
			volume: 90
		}
		AudioManager.playStaticSe(se);
	}
}

SoundManager.playCardAction = function (seName)
{
	var se = {
		name: seName,
		pan: 0,
		pitch: 100,
		volume: 90
	}
	AudioManager.playStaticSe(se);
}


Myth.CGC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function ()
{
	if (!Myth.CGC.DataManager_isDatabaseLoaded.call(this)) return false;
	if (!Myth.loaded_CGC)
	{
		DataManager.processCardAppearanceNotetags($dataSkills);

		DataManager.processCardActionNotetags($dataSkills);
		DataManager.processCardActionNotetags($dataItems);

		DataManager.processCardTargetActionNotetags($dataSkills);
		DataManager.processCardTargetActionNotetags($dataItems);

		DataManager.processCardPassiveNotetags($dataSkills);

		Myth.loaded_CGC = true;
	}

	return true;
}

DataManager.processCardAppearanceNotetags = function (group)
{
	var hideNote = /<(?:HIDE FROM (?:CARD )?LIBRARY)>/i;
	var artNote = /<(?:CARD ART: )(.*)>/i;
	var designNote = /<(?:CARD BASE: )(.*)>/i;
	
	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++)
		{			
			var line = notedata[i];
			if (line.match(hideNote))
			{
				obj.hideFromCardLibrary = true;
			}
			else if (line.match(artNote))
			{
				obj._cardArt = RegExp.$1;
			}
			else if(line.match(designNote))
			{
				obj._cardBase = RegExp.$1;
			}
		}
	}
};

DataManager.processCardActionNotetags = function (group)
{
	var startNote = /<Card Actions?>/i;
	var endNote = /<\/Card Actions?>/i;


	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		var mode = '';
		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(startNote))
			{
				mode = 'actions';
				obj._cardActions = "";
			}
			else if (line.match(endNote))
			{
				mode = '';
			}
			else if (mode == 'actions')
			{
				line = line.trim();
				line = line.replace(/,/g, '`comma`');
				if (obj._cardActions == "")
					obj._cardActions = line.trim();
				else
					obj._cardActions += "," + line.trim();
			}
		}
	}
};

DataManager.processCardTargetActionNotetags = function (group)
{
	var startNote = /<Card Target Actions?>/i;
	var endNote = /<\/Card Target Actions?>/i;


	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		var mode = '';
		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(startNote))
			{
				mode = 'actions';
				obj._cardTargetActions = "";
			}
			else if (line.match(endNote))
			{
				mode = '';
			}
			else if (mode == 'actions')
			{
				line = line.trim();
				line = line.replace(/,/g, '`comma`');
				if (obj._cardTargetActions == "")
					obj._cardTargetActions = line.trim();
				else
					obj._cardTargetActions += "," + line.trim();
			}
		}
	}
};

DataManager.processCardPassiveNotetags = function (group)
{
	var startNote = /<Card Passives?>/i;
	var endNote = /<\/Card Passives?>/i;


	var removeThisNote = /remove this/i;

	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		var mode = '';
		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(startNote))
			{
				mode = 'passives';
				obj._cardPassives = {};
			}
			else if (line.match(endNote))
			{
				mode = '';
			}
			else if (mode == 'passives')
			{
				if (line.match(/remove this/i))
					obj._cardPassives.removeAfterPlay = true;
				else if (line.match(/discard if unplayed/i))
					obj._cardPassives.discardIfUnplayed = true;
				else if (line.match(/remove if unplayed/i))
					obj._cardPassives.removeIfUnplayed = true;
				else if (line.match(/(?:will )?ends? turn/i))
					obj._cardPassives.willEndTurn = true;
				else if (line.match(/start in (\w+)/i))
				{
					obj._cardPassives.startInZone = RegExp.$1.toLowerCase();;
				}
				else if (line.match(/require (.*)/i))
				{
					if (!obj._cardPassives.requirements)
						obj._cardPassives.requirements = [];

					obj._cardPassives.requirements.push(RegExp.$1);
				}
				else if (line.match(/start of turn:? ?(?:skill)? ?(\d+)/i))
				{
					if (!obj.__forcedActions)
						obj.__forcedActions = {};
					if (!obj.__forcedActions.turnStart)
						obj.__forcedActions.turnStart = [];
					obj.__forcedActions.turnStart.push(RegExp.$1);
				}
				else if (line.match(/end of turn:? ?(?:skill)? ?(\d+)/i))
				{
					if (!obj.__forcedActions)
						obj.__forcedActions = {};
					if (!obj.__forcedActions.turnEnd)
						obj.__forcedActions.turnEnd = [];
					obj.__forcedActions.turnEnd.push(RegExp.$1);
				}
				else if (line.match(/enter (\w*):? ?(?:skill)? ?(\d+)/i))
				{
					if (!obj.__forcedActions)
						obj.__forcedActions = {};
					if (!obj.__forcedActions.enterZone)
						obj.__forcedActions.enterZone = [];
					var zoneData = { zone: RegExp.$1, skill: RegExp.$2 };
					obj.__forcedActions.enterZone.push(zoneData);
				}
				else if (line.match(/exit (\w*):? ?(?:skill)? ?(\d+)/i))
				{
					if (!obj.__forcedActions)
						obj.__forcedActions = {};
					if (!obj.__forcedActions.exitZone)
						obj.__forcedActions.exitZone = [];
					var zoneData = { zone: RegExp.$1, skill: RegExp.$2 };
					obj.__forcedActions.exitZone.push(zoneData);
				}
			}
		}
	}
}


if (Imported.YEP_BattleEngineCore)
{
	BattleManager.updateActionTargetList = function ()
	{
		for (; ;)
		{
			if (this._phase == 'discard') break;
			if (this._phase == 'cardwait') break;
			this._actSeq = this._actionList.shift();
			if (this._actSeq)
			{
				if (!this.actionConditionsMet(this._actSeq)) continue;
				var seqName = this._actSeq[0].toUpperCase();
				if (!this.processActionSequenceCheck(seqName, this._actSeq[1]))
				{
					break;
				}
			} else if (this._individualTargets.length > 0)
			{
				this._individualTargets.shift();
				if (this._individualTargets.length > 0)
				{
					this.setTargets([this._individualTargets[0]]);
					this._actionList = this._action.item().targetActions.slice();
				} else
				{
					this._phase = 'phaseChange';

					break;
				}
			} else
			{
				this._phase = 'phaseChange';
				break;
			}
		}
	};
}

if (!Imported.YEP_InstantCast)
{
	

	Myth.CGC.Scene_Battle_selectNextCommand = Scene_Battle.prototype.selectNextCommand;
	Scene_Battle.prototype.selectNextCommand = function ()
	{
		if (this.willCardEndTurn())
		{
			BattleManager._endTheTurn = true;
			Myth.CGC.Scene_Battle_selectNextCommand.call(this);
		}
		else
		{
			BattleManager.playCard();
			if (this._itemWindow.visible)
				this._itemWindow.hide();
		}
	}

	Scene_Battle.prototype.willCardEndTurn = function ()
	{
		if (!$gameSystem._cardBattleEnabled) return true;

		var actor = BattleManager.actor();
		if (!actor) return true;
		var action = BattleManager.inputtingAction();
		if (!action) return false;
		if (action !== actor.action(0)) return false;
		var item = action.item();
		if (!item) return false;

		if (item.meta.willEndTurn) return true;
		if (item._cardPassives && item._cardPassives.willEndTurn) return true;

		return false;
	};

	BattleManager.playCard = function ()
	{
		if (Imported.YEP_BattleEngineCore)
		{
			this.stopAllSelection();
			this.resetSelection();
		}
		this._subject = BattleManager.actor();
		if (!this._subject)
			this._subject = this._actionForcedBattler;
		this._endTheTurn = false;
		if (Imported.YEP_BattleEngineCore && BattleManager.isDTB())
		{
			this._ignoreTurnOrderFirstIndex = true;
		}
		this.startAction();
	}

	Myth.CGC.BattleManager_endAction = BattleManager.endAction;
	BattleManager.endAction = function ()
	{
		if ($gameSystem._cardBattleEnabled && this.__checkedEmptyZones > 0)
		{
			this.__checkedEmptyZones--;
			SceneManager._scene._skillWindow.resolveUsedCard('discard');
			var hasMoreActions = this._action.cardActionSubject().checkEmptyZones();
			if (hasMoreActions) return;
		}
		

		if ($gameSystem._cardBattleEnabled && this._endTheTurn === false)
		{
			this.doNotEndTurn();
/*			if (this.__forcedActions.length > 0)
				this._phase = 'input';*/
		} else
		{
			Myth.CGC.BattleManager_endAction.call(this);
		}


	};

	BattleManager.doNotEndTurn = function ()
	{
		if (Imported.YEP_BattleEngineCore && BattleManager.isDTB())
		{
			this._ignoreTurnOrderFirstIndex = false;
		}
		var user = this._subject;
		if (Imported.YEP_BattleEngineCore)
		{
			if (this._processingForcedAction) this._phase = this._preForcePhase;
			this._processingForcedAction = false;
		}
		if (this.updateEventMain()) return;
		Myth.CGC.BattleManager_endAction.call(this);
		this._subject = user;
		user.makeActions();
		if (this.checkBattleEnd()) return;
		this._phase = 'input';
		if (!(user.canMove() && user.canInput()))
		{
			user.makeActions();
			this.selectNextCommand();
		}
		this._endTheTurn = true;
		if (Myth.Util.usingMZ)
		{
			var skillWindow = SceneManager._scene._skillWindow;
			skillWindow.activate();
			skillWindow.select(skillWindow._itemsBeforeCards);
		}
		else
			this.refreshStatus();
		if (Imported.YEP_BattleEngineCore && BattleManager.isDTB())
		{
			this._subject = undefined;
		}

		if (Myth.CGC.showHelpWindow && this.__forcedActions.length == 0)
			SceneManager._scene._helpWindow.show();
	};
}


function CardLayer()
{
	this.initialize.apply(this, arguments);
}

CardLayer.prototype = Object.create(WindowLayer.prototype);
CardLayer.prototype.constructor = CardLayer;

CardLayer.prototype.setBackgrounds = function (backgroundSprite, libraryBackgroundSprite)
{
	this._backgroundSprite = backgroundSprite;
	this._libraryBackgroundSprite = libraryBackgroundSprite;
}

/**
 * Sets the x, y, width, and height all at once.
 *
 * @method move
 * @param {Number} x The x coordinate of the window layer
 * @param {Number} y The y coordinate of the window layer
 * @param {Number} width The width of the window layer
 * @param {Number} height The height of the window layer
 */
/*CardLayer.prototype.move = function (x, y, width, height)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.refreshBackgroundSprites();
};

CardLayer.prototype.refreshBackgroundSprites = function ()
{
	if (this.bkg1 == undefined)
	{
		this.bkg1 = new Sprite();
		this.bkg1.displayAll = true;
		if (this._backgroundSprite && Myth.Util.usingMZ)
			this.bkg1.filters = [...this._backgroundSprite.filters];
		this.addChild(this.bkg1);
		
	}
	if (this.bkg2 == undefined)
	{
		this.bkg2 = new Sprite();
		this.bkg2.displayAll = true;
		this.addChild(this.bkg2);
		
	}

	this.bkg1.x = 0 - this.x;
	this.bkg2.y = 0 - this.y;
	this.bkg2.x = 0 - this.x;
	this.bkg2.y = 0 - this.y;

	if (this._backgroundSprite)
	{
		var b = new Bitmap(this._backgroundSprite.bitmap.width, this._backgroundSprite.bitmap.height);
		b.blt(this._backgroundSprite.bitmap, 0, 0, b.width, b.height, 0, 0);
		b.clearRect(this.x, this.y, this.width, this.height);
		this.bkg1.bitmap = b;
	}

	if (this._libraryBackgroundSprite)
	{
		var b = new Bitmap(this._libraryBackgroundSprite.bitmap.width, this._libraryBackgroundSprite.bitmap.height);
		b.blt(this._libraryBackgroundSprite.bitmap, 0, 0, b.width, b.height, 0, 0);
		b.clearRect(this.x, this.y, this.width, this.height);
		this.bkg2.bitmap = b;
	}
	console.log(this.bkg1.width);
	
}

CardLayer.prototype.addChild = function (displayObject)
{
	PIXI.Container.prototype.addChild.call(this, displayObject);
	if (!displayObject.displayAll)
	{
		this.removeChild(this.bkg1);
		this.removeChild(this.bkg2);
		this.addChild(this.bkg1);
		this.addChild(this.bkg2);
	}
}*/



/**
 * @method _renderCanvas
 * @param {Object} renderSession
 * @private
 */
CardLayer.prototype.renderCanvas = function (renderer)
{
	if (!this.visible || !this.renderable)
	{
		return;
	}

	if (!this._tempCanvas)
	{
		this._tempCanvas = document.createElement('canvas');
	}

	this._tempCanvas.width = Graphics.width;
	this._tempCanvas.height = Graphics.height;

	var realCanvasContext = renderer.context;
	var context = this._tempCanvas.getContext('2d');

	context.save();
	context.clearRect(0, 0, Graphics.width, Graphics.height);
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.closePath();
	context.clip();

	renderer.context = context;

	for (var i = 0; i < this.children.length; i++)
	{
		var child = this.children[i];
		if (child && child.visible && child.opacity > 0)
		{
			this._canvasClearWindowRect(renderer, child);
			context.save();
			child.renderCanvas(renderer);
			context.restore();
		}
	}

	context.restore();

	renderer.context = realCanvasContext;
	renderer.context.setTransform(1, 0, 0, 1, 0, 0);
	renderer.context.globalCompositeOperation = 'source-over';
	renderer.context.globalAlpha = 1;
	renderer.context.drawImage(this._tempCanvas, 0, 0);

};

/**
 * @method _renderWebGL
 * @param {Object} renderSession
 * @private
 */
CardLayer.prototype.renderWebGL = function (renderer)
{
	if (!this.visible || !this.renderable)
	{
		return;
	}

	if (this.children.length == 0)
	{
		return;
	}

	renderer.flush();
	this.filterArea.copy(this);
	renderer.filterManager.pushFilter(this, this.filters);
	renderer.currentRenderer.start();

	var shift = new PIXI.Point();
	var rt = renderer._activeRenderTarget;
	var projectionMatrix = rt.projectionMatrix;
	shift.x = Math.round((projectionMatrix.tx + 1) / 2 * rt.sourceFrame.width);
	shift.y = Math.round((projectionMatrix.ty + 1) / 2 * rt.sourceFrame.height);

	for (var i = 0; i < this.children.length; i++)
	{
		var child = this.children[i];
		if (child && child.visible && child.opacity > 0)
		{
			renderer.maskManager.pushScissorMask(this, this._windowMask);
			renderer.clear();
			renderer.maskManager.popScissorMask();
			renderer.currentRenderer.start();
			child.renderWebGL(renderer);
			renderer.currentRenderer.flush();
		}
	}

	renderer.flush();
	renderer.filterManager.popFilter();
	renderer.maskManager.popScissorMask();

};

CardLayer.prototype._canvasClearWindowRect = function (renderSession, window)
{
	var rx = this.x + window.x;
	var ry = this.y + window.y + window.height / 2;
	var rw = window.width;
	var rh = window.height;
	renderSession.context.clearRect(rx, ry, rw, rh);
};


//MZ
/**
 * Renders the object using the WebGL renderer.
 *
 * @param {PIXI.Renderer} renderer - The renderer.
 */
CardLayer.prototype.render = function render(renderer)
{
	if (!this.visible)
	{
		return;
	}

	const graphics = new PIXI.Graphics();
	const gl = renderer.gl;
	const children = this.children.clone().reverse();

	renderer.framebuffer.forceStencil();
	graphics.transform = this.transform;
	renderer.batch.flush();
	gl.enable(gl.STENCIL_TEST);

	while (children.length > 0)
	{
		const child = children.pop();
		if (child && child.visible && child.opacity > 0)
		{
			//gl.stencilFunc(gl.EQUAL, 0, ~0);
			//gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
			child.render(renderer);
			renderer.batch.flush();
			graphics.clear();
			//if (child._isWindow)
			//	child.drawShape(graphics);
			//gl.stencilFunc(gl.ALWAYS, 1, ~0);
			//gl.stencilOp(gl.REPLACE, gl.REPLACE, gl.REPLACE);
			//gl.blendFunc(gl.ZERO, gl.ONE);
			graphics.render(renderer);
			renderer.batch.flush();
			//gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
		}
	}

	gl.disable(gl.STENCIL_TEST);
	gl.clear(gl.STENCIL_BUFFER_BIT);
	gl.clearStencil(0);
	renderer.batch.flush();
};