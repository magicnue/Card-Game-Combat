//=============================================================================
// MYTH_CGC_DeckEditorCore
//=============================================================================

/*:
 * @target MZ *
 * @author Isiah Brighton
 * @plugindesc v1.2.0 An extension to Card Game Combat which allows you the player to customize their decks.
 * @url https://mythatelier.itch.io/deck-editor-cgc-expansion-plugin
 * 
 * 
 * @command openDeckEditor
 * @text Open Deck Editor
 * @desc Opens the Deck Editor for the party leader
 *
 * @command equipDeck
 * @text Equip Deck
 * @desc Makes the specified actor equip the specified deck
 *
 *    @arg actorIndex
 *    @type number
 *    @default 0
 *    @desc The index of the actor in the database.
 *
 *    @arg deckName
 *    @type text
 *    @desc The name of the deck.
 *
 * @command increaseDP
 * @text Increase DP
 * @desc Raises the DP stat of the specified actor
 *
 *    @arg actorIndex
 *    @type number
 *    @default 0
 *    @desc The index of the actor in the database.
 *
 *    @arg amount
 *    @type number
 *    @default 0
 *    @min -999
 *    @desc The amount to raise the DP stat by
 *    
 * @command addCardToDeck
 * @text Add Card to Deck
 * @desc Adds a card to an actor's deck preset. Not for use in battle.
 * 
 *    @arg actorIndex
 *    @type number
 *    @default 0
 *    @desc The index of the actor in the database.
 *    
 *    @arg deckName
 *    @text Deck Name
 *    @default %current
 *    @desc The name of the deck to edit. Use "%current" for the deck the actor currently has equipped.
 *    
 *    @arg skillId
 *    @text Skill ID
 *    @type skill
 *    @default 0
 *    @desc The Skill to add to the deck.
 *    
 *    @arg addCardToLibrary
 *    @text Add Card to Library?
 *    @type boolean
 *    @default true
 *    @desc If OFF, the deck will use a card from the actor's library if it is present. If not the deck will become illegal!
 *    
 *    
 * @command removeCardFromDeck
 * @text Remove Card from Deck
 * @desc Removes a card from an actor's deck preset. Not for use in battle.
 * 
 *    @arg actorIndex
 *    @type number
 *    @default 0
 *    @desc The index of the actor in the database.
 *    
 *    @arg deckName
 *    @text Deck Name
 *    @default %current
 *    @desc The name of the deck to edit. Use "%current" for the deck the actor currently has equipped.
 *    
 *    @arg skillId
 *    @text Skill ID
 *    @type skill
 *    @default 0
 *    @desc The Skill to remove from the deck.
 *    
 *    @arg removeFromLibraryToo
 *    @text Remove Card from Library?
 *    @type boolean
 *    @default false
 *    @desc If ON, the deck will remove the card from the actor's library. This can break other decks!
 *    
 * 
 * 
 * @param deckRules
 * @text Deck Rules
 * 
 *   @param sharedLibrary
 *   @text Actors share library?
 *   @type boolean
 *   @parent deckRules
 *   @desc If set to ON, all party members will share a Card Library as well as sharing a list of Decks.
 *   @default false
 *   
 *     @param startingCards
 *     @text Starting Library Cards
 *     @type note
 *     @parent sharedLibrary
 *     @default ""
 *   
 *   @param Restrictions
 *   @text Default Restrictions
 *   @parent deckRules
 *   
 *     @param minSize
 *     @text Min Deck Size
 *     @parent Restrictions
 *     @type number
 *     @default 15
 *     @desc The minimum amount of cards a deck must have before it can be equipped.
 *     
 *     @param maxSize
 *     @text Max Deck Size
 *     @parent Restrictions
 *     @type number
 *     @default 60
 *     @desc The max amount of cards allowed in a deck
 *     
 *     @param maxCopies
 *     @text Max Card Copies
 *     @parent Restrictions
 *     @type number
 *     @default 3
 *     @desc The max amount of copies of an individual card allowed in a deck.
 *   
 *     @param maxNameLength
 *     @text Max Name Length
 *     @parent Restrictions
 *     @description The amount of characters allowed in a deck's name
 *     @type number
 *     @default 20
 *     
 *   @param equipCardsSetting
 *   @text Equip Cards Setting
 *   @parent deckRules
 *   @type select
 *   @option Add to Library
 *   @option Add to Current Deck at Start of Battle
 *   @default Add to Library
 *   @desc Determine what happens when gaining cards through MYTH_CGC_EquipCards.
 *     
 * 
 * @param deckPointsEnabled
 * @text Deck Points
 * @type boolean
 * @default true
 * @desc If set to OFF, Deck Points will not be used and you can ignore this section.
 * 
 *   
 *   
 *   @param deckPointsVisible
 *   @parent deckPointsEnabled
 *   @text Visible?
 *   @type boolean
 *   @default true
 *   @desc If set to ON, DP will be drawn underneath the preview card in the deck editor.
 *   
 *   @param deckPointsName
 *   @text Deck Points Name
 *   @parent deckPointsEnabled
 *   @desc How Deck Points will be called in your game.
 *   @type text
 *   @default Deck Points
 *   
 *   @param deckPointsAbbrv
 *   @text Deck Points Abbrv
 *   @parent deckPointsEnabled
 *   @desc The abbreviation of your Deck Points
 *   @type text
 *   @default DP
 *   
 *   @param deckPointsStarting
 *   @text Default Starting DP
 *   @parent deckPointsEnabled
 *   @desc How many Deck Points an actor will initialize with (at level 1) by default. Can be overridden with notetags.
 *   @type number
 *   @default 100
 *   
 *   @param deckPointsOnLevel
 *   @text Deck Points on Level Up
 *   @parent deckPointsEnabled
 *   @desc How many Deck Points an actor will gain on a level up. Can be overridden with notetags.
 *   @type number
 *   @default 15
 *   
 * @param divider1
 * @text --------------------------
 * @default --------------------------
 * @desc This is just here to help with visual organization
 * 
 * @param deckScene
 * @text Deck Editor Scene Params
 *
 *   @param windowWidth
 *   @parent deckScene
 *   @text Card Window Width
 *   @desc The width of the windows where the player selects cards. Leave room for the preview card.
 *   @type number
 *   @default 280
 *   
 *   @param previewY
 *   @parent deckScene
 *   @text Preview Card Y
 *   @desc The Y coordinate of the preview card in the Deck Editor scene. It's always centered horizontally.
 *   @type number
 *   @default 400
 *   
 *   @param previewScale
 *   @parent deckScene
 *   @text Preview Card Scale
 *   @desc The scale of the preview card in the Deck Editor scene.
 *   @type number
 *   @decimals 2
 *   @default 1.0
 *   
 *   @param numVisibleRows
 *   @parent deckScene
 *   @text Max Visible Rows
 *   @type number
 *   @default 3
 *   @desc Number used to calculate how long to wait before scrolling vertically.
 *   
 *   @param cardDisplay
 *   @text Card Placement Settings
 *   @parent deckScene
 *   @type struct<CardDisplay>
 *   @default {"maxCols":"3","cardScale":"0.5","selectedCardScale":"0.55","startPadding":"{\"x\":\"50\",\"y\":\"80\"}","cardSpacing":"{\"x\":\"30\",\"y\":\"40\"}","amountCoords":"{\"x\":\"0\",\"y\":\"0\"}","amountJustify":"right"}
 *   @desc Settings that determine how cards are positioned within the Deck Editor windows.
 *   
 *   @param scrollSettings
 *   @text Scrollbar Settings
 *   @parent deckScene
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
 *   @param Arrow Sprites
 *   @parent deckScene
 *   @desc These are for the image in the Deck Editor scene that changes depending on if you are adding or removing cards.
 *     
 *     @param deckArrow
 *     @parent Arrow Sprites
 *     @text Right Arrow Image
 *     @type file
 *     @dir img/system
 *     @require 1
 *     @desc The image for the arrow when adding cards to the deck.
 *     
 *     @param libraryArrow
 *     @parent Arrow Sprites
 *     @text Left Arrow Image
 *     @type file
 *     @dir img/system
 *     @require 1
 *     @desc The image for the arrow when removing cards from the deck.
 *     
 *     @param arrowY
 *     @text Anchor Y
 *     @parent Arrow Sprites
 *     @type number
 *     @default 220
 *     @desc The Y coordinate of the arrow sprite. It's horizontally centered.
 *     
 *   @param Deck Selection
 *   @parent deckScene
 *   
 *     @param helpWindowWidth
 *     @parent Deck Selection
 *     @text Help Window Width
 *     @type number
 *     @default 280
 *     @desc The width of the Help Window at the bottom of the screen.
 *     
 *     @param helpFontSize
 *     @parent Deck Selection
 *     @text Help Window Font Size
 *     @type number
 *     @default 28
 *     @desc The font size for help text for this scene. Default for RPG Maker is 28.
 *     
 *     @param statusWindowWidth
 *     @parent Deck Selection
 *     @text Deck Status Width
 *     @type number
 *     @default 280
 *     @desc The width of the Deck Status Window at the bottom right of the screen.
 *   
 *     @param equippedImage
 *     @parent Deck Selection
 *     @text Equipped Image
 *     @type file
 *     @dir img/system
 *     @require 1
 *     @desc The image used on the Deck Selection window to show a deck is equipped.
 *     
 *       @param equippedX
 *       @text Anchor X
 *       @parent equippedImage
 *       @type number
 *       @default 300
 *       @desc The X coordiante of the equipped image in the Deck Selection window.
 *       
 *       @param equippedY
 *       @text Anchor Y
 *       @parent equippedImage
 *       @type number
 *       @default 4
 *       @desc The Y coordinate of the equipped image in the row on the window that contains the equipped deck.
 *     
 *     @param immutableIcon
 *     @text Immutable Icon
 *     @parent Deck Selection
 *     @type number
 *     @default 0
 *     @desc The icon index for the icon to appear when a deck is marked as immutable and therefore cannot be edited.
 *       
 *     @param deckStatusContents
 *     @text Deck Status Contents
 *     @type text[]
 *     @parent Deck Selection
 *     @desc The List of things the Deck Status Window will display. See help for details.
 *     @default ["name, count","cost"]
 *       
 *     @param Illegal Deck Messages
 *     @parent Deck Selection
 *     
 *       @param maxSizeMessage
 *       @parent Illegal Deck Messages
 *       @text Too many cards
 *       @desc The message that displays in the Deck Selection window if that deck has more than the legal number of cards
 *       @default No more than 60 cards
 *       
 *       @param minSizeMessage
 *       @parent Illegal Deck Messages
 *       @text Not enough cards
 *       @desc The message that displays if a deck has less than the legal number of cards
 *       @default Requires at least 15 cards
 *       
 *       @param maxTypeSizeMessage
 *       @parent Illegal Deck Messages
 *       @text Too many cards of a type
 *       @desc The message that displays if the deck has more cards of type %t than the legal amount.
 *       @default Too many cards of type %t.
 *       
 *       @param minTypeSizeMessage
 *       @parent Illegal Deck Messages
 *       @text Not enough cards of a type
 *       @desc The message that displays if the deck has more cards of type %t than the legal amount.
 *       @default Not enough cards of type %t.
 *       
 *       @param maxCopiesMessage
 *       @text Too many copies of a card
 *       @parent Illegal Deck Messages
 *       @desc The message that displays if too many copies of one card are in the deck.
 *       @default Too many copies of a card
 *       
 *       @param missingCardsMessage
 *       @text Cards missing from Library
 *       @parent Illegal Deck Messages
 *       @desc The message that displays if the deck contains cards that are not in the player's library.
 *       @default Cards are missing from the Library
 *       
 *       @param notEnoughPointsMessage
 *       @text Not Enough Deck Points
 *       @parent Illegal Deck Messages
 *       @desc The message that displays if the deck contains cards with more deck points than the actor can use.
 *       @default Too many Deck Points
 *       
 *       @param sealedTypeMessage
 *       @text Sealed Type in Deck
 *       @parent Illegal Deck Messages
 *       @desc The message that displays if the deck contains cards that are currently sealed by type %t.
 *       @default Contains sealed type %.
 *       
 *       @param restrictedCardMessage
 *       @text Restricted card
 *       @parent Illegal Deck Messages
 *       @desc The message that displays if the deck contains a card whose requirements are not met.
 *       @default Deck has card that does not meet requirements.
 *       
 *       @param illegalEquipped
 *       @text Illegal Deck Equipped Popup
 *       @parent Illegal Deck Messages
 *       @desc The message that pops up if the player tries to leave the menu with an illegal deck equipped.
 *       @type note
 *       @default "Must equip a legal deck\nbefore exiting the menu."
 *       
 *       @param messageFontSize
 *       @text Font Size
 *       @parent Illegal Deck Messages
 *       @desc The font size for the above messages when they appear in the Deck Selection window.
 *       @type number
 *       @default 16
 *       
 *
 *  @param deckSelectorBackgroundImage
 *  @text Deck Selector Background Image
 *  @type file
 *  @require 1
 *  @dir img/pictures
 *  @desc A background image can be added to the Deck Selector scene.
 *  
 *  @param deckEditorBackgroundImage
 *  @text Deck Editor Background Image
 *  @type file
 *  @require 1
 *  @dir img/pictures
 *  @desc A background image can be added to the Deck Selector scene.

 * 
 * @help
 * ============================================================================
 * Overview
 * ============================================================================
 *
 * Ordinarily, every card an actor collects goes into battle with them.
 * This plugin adds an extra menu the player can use to take cards they've
 * collected in their Library and create Decks with them, equip a deck, and use
 * that deck going into battle.
 * 
 * Whenever an actor learns a skill, instead of a card being added to their
 * deck, it's added to their Library, and can be manually added to their deck.
 *
 * if "Actors share Library" is turned on, all actors' cards will be pooled
 * into one Library, and all decks created will be shared among the party.
 * 
 * ============================================================================
 * Deck Status Contents
 * ============================================================================
 * 
 * This parameter is an array, where each index in the array adds a new line
 * to the Deck Status Window.
 * 
 * These are the things that can be listed in the Deck Status Window:
 * 
 *     Name - the name of the deck
 *     Count - the amount of cards in the deck / the max amount of cards
 *     Cost - the total DP cost of the deck's cards / the max DP
 *     Type - the number of cards of each type in the deck. Will only display
 *            as many types as the window has room for.
 *            
 * You can make multiple items share a line on the window by separating them
 * with commas, like so:
 * 
 *     Name, Count, Cost
 *     
 * Doing so may not give them enough room to display comfortably. In addition,
 * Type cannot share a line with anything else as there's no way to shorten it.
 * 
 * ============================================================================
 * Deck Restriction Notetags
 * ============================================================================
 *
 * You can give individual Actors/Classes their own deck restrictions which
 * override the plugin parameters, like so:
 * 
 * <Deck Restriction>
 * Min Size: 10
 * Max Size: 99
 * </Deck Restriction>
 * 
 *     Min Size: X
 * Sets the minimum amount of cards for a deck to be legal.
 * 
 *    Max Size: X
 * Sets the maximum amount of cards a deck can have before it becomes illegal.
 * 
 *    Min Type typeName: X
 * Sets the minimum amount of cards of Type typeName for a deck to be legal.
 * 
 *    Max Type typeName: X
 * Sets the maximum amount of cards of Type typeName for a deck to be legal.
 * 
 *    Seal Type typeName
 * Disables the specified type from being added to the deck for this
 * Actor/Class. Cards of this type do not show up in this actor's Deck Editor
 * scene.
 * 
 * Note that if you want to disable cards of a type but still want the cards
 * to appear, you can use "Max Type typeName: 0" instead.
 * 
 *    Seal Type typeName if [expression]
 * Works just like the previous Seal restriction, but only if the expression
 * evaluates to true.
 * 
 *    Require [expression]
 * Makes the deck illegal if the code expression evaluates to false.
 * 
 *    Requirement Message: [string]
 * Adds a message to display in the Deck Selector's Illegal Deck Messages
 * section if the requirement is not met. All Require notetags should
 * immediately be followed by a Requirement Message notetag so that they
 * match up.
 * 
 * Eg.:
 *    Require deck.length < user.level * 3
 *    Requirement Message: Deck exceeds the Actor's level * 3.
 *    
 *    
 *    
 * 
 * 
 * An actor's custom deck restrictions override their class's deck restrictions.
 * 
 * 
 * 
 * In a Skill, you can use the following notetags:
 * 
 * <Deck Restriction>
 * Max Copies: 4
 * Require [expression]
 * </Deck Restriction>
 * 
 *     Max Copies: X
 * Overrides the amount of max copies for this specific card.
 * 
 *     Require [expression]
 * Works just like the Actor/Class Require restriction but it determines
 * if this card can be equipped, and does not come with a Requirement Message.
 * 
 * Eg.:
 *     Require user.level > 20
 * 
 * to override the amount of max copies for that specific card.
 * 
 * ============================================================================
 * Decklist Notetags
 * ============================================================================
 * 
 * A Decklist is a list of Cards that comprise a Deck. You can specify Decklists 
 * for Actors/Classes using the following Notetags:
 * 
 * <decklist DeckName>
 * 5x Skill Y
 * 3x Skill Z
 * </decklist>
 * 
 * Y and Z are the Skill IDs of Cards you want to include. [N]x refers to how 
 * many copies of those Cards you want in the Deck. You can also use this format:
 * 
 * <decklist DeckName>
 * 5x skillName
 * 3x skillName
 * 1x skillName
 * </decklist>
 * 
 * Here the skillName is the name of the Card you want to include. If there are
 * multiple Cards with the same name, it will grab the first one in the list.
 * 
 * Important to note that the name of the deck cannot contain spaces or special 
 * characters.
 * 
 * By default, all skills that an actor learns at level 1 are put into a deck
 * which is equipped on initialization.
 * 
 * Here are some extra settings you can put inside a <decklist> tag:
 * 
 *     Immutable
 * This will cause the decklist to be uneditable.
 * 
 *     Equip
 * This will cause the decklist to be equipped when the Actor initializes,
 * instead of their default deck.
 * 
 * 
 * 
 * ============================================================================
 * Deck Points Notetags
 * ============================================================================
 * 
 * By default, all cards cost 1 DP. This can be overridden with the following
 * notetag in a Skill:
 *
 * <Deck Cost: X>
 * Where X is a number.
 * 
 * ----------------------------------------------------------------------------
 * 
 * By default, each actor has an amount of max DP specified by plugin
 * parameters. However, this can be overridden by putting the following
 * notetags in either the Actor or the Class:
 * 
 * <Starting Deck Points: X>
 * 
 * This notetag will set their DP to X.
 * 
 * <Deck Points On Level: X>
 * 
 * This notetag will specify how much DP an actor gains when they level up.
 * 
 * 
 * In addition, Equipment can be used to provide bonus DP through the
 * following notetag in a Weapon or Armor:
 * 
 * <Bonus Deck Points: X>
 * Where X is a number.
 * 
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================ 
 * 
 * IncreaseDP [ActorID] [Amount]
 * Will add the specified amount to the actor's max DP, like raising a stat.
 * 
 * OpenDeckEditor
 * Will open the Deck Editor Scene during an Event
 *
 * EquipDeck [ActorID] [DeckName]
 * Equips Actor with matching ID with a Decklist you specify. Actor needs to be 
 * in the party. Decklist needs to match the name given.
 * 
 * Example: "EquipDeck 1 HeroStarter" will equip the Actor at ID 1 with the
 * Decklist called "HeroStarter" if it is available.
 * 
 * AddCardToDeck [ActorID] [DeckName] [SkillID] [AddToLibraryToo]
 * Adds the supplied Card to the supplied actor's deck, if such a deck exits.
 * In place of a deck name you can use "%current" for the deck the actor
 * currently has equipped.
 * AddToLibraryToo - (true/false) determines if the Card is also added to the 
 * actor's (or party's) library. It is recommended to keep this as true to
 * prevent making a deck illegal.
 * 
 * RemoveCardFromDeck [ActorID] [DeckName] [SkillID] [RemoveFromLibraryToo]
 * Removes the specified Card from the actor's deck, if the card is present.
 * In place of a deck name you can use "%current" for the deck the actor
 * currently has equipped.
 * RemoveFromLibraryToo - (true/false) determines if the Card is also removed
 * from the actor's (or party's) library. It is recommended to keep this as 
 * false to prevent making other decks illegal.
 *
 * ============================================================================
 * Script Calls
 * ============================================================================ 
 * 
 * $gameParty.addCardToLibrary(skillId)
 * Adds Card of given Skill ID to the Shared Library. Card will need to be added
 * to a Decklist via Deck Edit Scene in order to be used by an Actor.
 * 
 * $gameParty.removeCardFromLibrary(skillId)
 * Removes Card of given Skill ID from the Shared Library. If Card with the given
 * ID can't be found, it will not remove anything.
 * 
 * actor.addDeckPoints(value)
 * Adds extra max Deck Points to the specified actor, similar to raising a 
 * stat.
 *
 * ============================================================================
 * Version History
 * ============================================================================
 *
 * v1.2.0 - Added the following Deck Restriction options:
 *             - Max Type typeName: X
 *             - Min Type typeName: X
 *             - Seal Type typeName
 *             - Seal Type typeName if [condition]
 *             - Require [expression]
 *             - Requirement Message: [string]
 *          Added the following Card restriction options:
 *             - Require [expression]
 *          You can now "lock" presets so they can't be edited.
 *          Added utility function Actor.isCurrentDeckLegal().
 *          Fixed bug where starting decks would contain cards that weren't
 *          the same cards that would be in the actor's library. Ghost cards.
 *          Added ability to use Deck Editor scene and Card Library scene
 *          simultaneously.
 *          Added two new Plugin Commands: AddCardToDeck and RemoveCardFromDeck.
 *          Added parameter to change how cards gained by equipment factor into
 *          the deck.
 *          Added parameters for whether DP should be enabled and/or visible.
 *          Changed the Deck scenes in line with the Library revamp.
 *          Changed parameters to match.
 *          Replaced safety skill with a custom still that provides better
 *          feedback to the user.
 *			Fixed Param Descriptions in DeckEditor referring to Simple Library
 * 
 * v1.1.0 - Added Deck Points feature
 *          You can now customize what info is in the Deck Status window. Doing
 *          so will change its height based on the amount of lines added.
 *          Deck Status text now turns red if that component of the deck is 
 *          illegal (eg, if you have too many cards the card count text turns 
 *          red)
 *          Card Amount Text will now be red if the number of copies exceeds
 *          max.
 *          Fixed touch input for MV. MZ's is still a little wonky.
 * 
 *          Fixed bug where editing a deck that's currently equipped doesn't
 *          affect deck in battle unless you manually equip it again.
 *          Removing the last card from the deck will now activate the library
 *          list so the player can still make inputs other than cancel.
 *          Fixed MV bug where the final plugin param's name and description
 *          would use MZ's plugin command name and description.
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
 * @default 3
 * @desc The max number of columns for the cards.
 *
 * @param cardScale
 * @text Card Scale
 * @type number
 * @default 0.5
 * @decimals 2
 * @min 0.01
 * @desc The multiplier for the scale of the cards.
 *
 * @param selectedCardScale
 * @text Selected Card Scale
 * @type number
 * @decimals 2
 * @min 0.01
 * @default .55
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

var Myth = Myth || {};
if (!Myth.CGC)
	console.error("Please make sure MYTH_CGC_DeckEditorCore is placed underneath MYTH_CGC_CoreEngine");
if (Game_Card == undefined)
{
	console.error("Please make sure MythCardGameCombat is updated to v1.5.1 or higher\n" +
		"DeckEditor will not work with versions of CGC below that.");
}

Myth.CGC.Deck = {};



Myth.Parameters = PluginManager.parameters('MYTH_CGC_DeckEditorCore');

Myth.CGC.Deck.coordinates = {
	windowWidth: Number(Myth.Parameters.windowWidth),
	hideOffscreen: false,

	helpWindowWidth: Number(Myth.Parameters.helpWindowWidth),
	statusWindowWidth: Number(Myth.Parameters.statusWindowWidth),
	helpFontSize: Number(Myth.Parameters.helpFontSize),
	
	windowY: 150,
	previewY: Number(Myth.Parameters.previewY),
	previewScale: Number(Myth.Parameters.previewScale),

	numVisibleRows: Number(Myth.Parameters.numVisibleRows),

	cardDisplay: JSON.parse(Myth.Parameters.cardDisplay),

	arrowY: Number(Myth.Parameters.arrowY),

	errorFontSize: Number(Myth.Parameters.messageFontSize),

	equippedX: Number(Myth.Parameters.equippedX),
	equippedY: Number(Myth.Parameters.equippedY),


	scrollBarX: Number(Myth.Parameters.scrollBarX),
	scrollBarYPinch: Number(Myth.Parameters.scrollBarYPinch)
}

Myth.CGC.images.deckEditorBackgroundImage = Myth.Parameters.deckEditorBackgroundImage;
Myth.CGC.images.deckSelectorBackgroundImage = Myth.Parameters.deckSelectorBackgroundImage;

Myth.Util.castMembersToNumber(Myth.CGC.Deck.coordinates);

Myth.CGC.Deck.maxNameLength = Number(Myth.Parameters.maxNameLength);
Myth.CGC.Deck.sharedLibrary = JSON.parse(Myth.Parameters.sharedLibrary);
Myth.CGC.Deck.safetySkill = 'deck';
Myth.CGC.Deck.immutableIcon = Number(Myth.Parameters.immutableIcon);


Myth.CGC.Deck.commandName = "Edit Decks";
Myth.CGC.Deck.usingDP = JSON.parse(Myth.Parameters.deckPointsEnabled);
Myth.CGC.Deck.showDP = JSON.parse(Myth.Parameters.deckPointsVisible);

Myth.CGC.Deck.equipCardsSetting = Myth.Parameters.equipCardsSetting;

Myth.CGC.Deck.restrictions = {
	maxSize: Number(Myth.Parameters.maxSize),
	minSize: Number(Myth.Parameters.minSize),
	maxCopies: Number(Myth.Parameters.maxCopies),
};

Myth.CGC.Deck.restrictions.type = {

}

Myth.CGC.Deck.loadSafetySkill = function ()
{
	$dataSkills['deck'] = {
		id: 'deck',
		name: ' ',
		description: ''
	}
}

Myth.CGC.Deck.Scene_Boot_loadCardImages = Scene_Boot.prototype.loadCardImages;
Scene_Boot.prototype.loadCardImages = function ()
{
	Myth.CGC.Deck.Scene_Boot_loadCardImages.call(this);
	var bitmap = new Bitmap(220, 400);
	bitmap.fillAll("#FF00DD");
	bitmap.fontSize = 40;
	bitmap.drawText('DECK PRESET ERROR', 10, 10, 200, 40, 'center');
	bitmap.fontSize = 20;
	for (var i = 80; i < 400; i += 80)
	{
		bitmap.drawText('Deck Preset via Notetags has fewer', 10, i, 200, 30, 'left');
		bitmap.drawText('Cards than Actor\'s Minimum Deck Size.', 10, i + 20, 200, 30, 'left');
		bitmap.drawText('Add more Cards to Deck Preset to fix.', 10, i + 40, 200, 30, 'left');
	}
	Myth.CGC.deckErrorCardBack = bitmap;
}

//Do not change this
Myth.CGC.addLearnedSkillToDeck = false;

Myth.CGC.Deck.restrictionMessages = {
	maxSize: Myth.Parameters.maxSizeMessage,
	minSize: Myth.Parameters.minSizeMessage,
	maxTypeSizeMessage: Myth.Parameters.maxTypeSizeMessage,
	minTypeSizeMessage: Myth.Parameters.minTypeSizeMessage,
	maxCopies: Myth.Parameters.maxCopiesMessage,
	missingCards: Myth.Parameters.missingCardsMessage,
	sealedTypeMessage: Myth.Parameters.sealedTypeMessage,
	restrictedCardMessage: Myth.Parameters.restrictedCardMessage,
	illegalEquipped: JSON.parse(Myth.Parameters.illegalEquipped),
	notEnoughPoints: Myth.Parameters.notEnoughPointsMessage,
}

Myth.CGC.Deck.images = {
	deckArrow: Myth.Parameters.deckArrow,
	libraryArrow: Myth.Parameters.libraryArrow,
	equippedImage: Myth.Parameters.equippedImage,
	scrollBar: Myth.Parameters.scrollBar,
	scrollBack: Myth.Parameters.scrollBack
};

Myth.CGC.Deck.startingCards = JSON.parse(Myth.Parameters.startingCards);

Myth.CGC.Deck.deckStatusDraw = JSON.parse(Myth.Parameters.deckStatusContents);

Myth.CGC.Deck.deckPointsName = Myth.Parameters.deckPointsName;
Myth.CGC.Deck.deckPointsAbbrv = Myth.Parameters.deckPointsAbbrv;

Myth.CGC.Deck.deckPointDefaults = {
	starting: Number(Myth.Parameters.deckPointsStarting),
	onLevel: Number(Myth.Parameters.deckPointsOnLevel),
}

Myth.CGC.Deck.typeWindowRect = function ()
{
	var wx = 0;
	var wy = 0;
	var ww = Graphics.boxWidth / 2;
	var wh = 100;
	var rect = new Rectangle(wx, wy, ww, wh);
	return rect;
}

Myth.CGC.Deck.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args)
{
	Myth.CGC.Deck.Game_Interpreter_pluginCommand.call(this, command, args);
	command = command.toLowerCase();
	if (command == 'opendeckeditor') SceneManager.push(Scene_DeckSelector);
	else if (command == 'equipdeck') Myth.CGC.Deck.equipDeckToActor(args[0], args[1]);
	else if (command == 'increasedp') Myth.CGC.Deck.addDeckPointsToActor(args[0], args[1]);
	else if (command == 'addcardtodeck') Myth.CGC.Deck.addCardToDeck(args[0], args[1], args[2], args[3]);
	else if (command == 'removecardfromdeck') Myth.CGC.Deck.removeCardFromDeck(args[0], args[1], args[2], args[3]);
}

Myth.CGC.Deck.equipDeckToActor = function (actorIndex, deckName)
{
	var actor = $gameActors.actor(actorIndex);
	var presets = actor.getDeckPresets();
	var deckIndex = null;
	for (var i = 0; i < presets.length; i++)
	{
		if (presets[i].name == deckName)
		{
			deckIndex = i;
			break;
		}
	}
	if (deckIndex != null)
	{
		actor.equipDeck(deckIndex);
	}
};

Myth.CGC.Deck.addDeckPointsToActor = function (actorIndex, value)
{
	var actor = $gameActors.actor(actorIndex);
	var amount = Number(value);
	actor.addDeckPoints(amount);
}

Myth.CGC.Deck.addCardToDeck = function (actorIndex, deckName, skillId, addToLibraryToo)
{
	var actor = $gameActors.actor(actorIndex);
	
	var deck = null;
	if (deckName == "%current")
		deck = actor.deck();
	else
	{
		var presets = actor.getDeckPresets();
		for (var i = 0; i < presets.length; i++)
		{
			if (presets[i].name == deckName)
			{
				deck = presets[i];
				break;
			}
		}
	}
	if (deck == null) return;

	var card;
	if (addToLibraryToo)
	{
		actor.learnSkill(skillId);
		card = actor._skillCards.card(actor._skillCards.length - 1);
	}
	else
	{
		var unusedCardsOfSkill = actor.getUnusedCards().filter(card => card.id() == skillId);
		if (unusedCardsOfSkill.length > 0)
			card = unusedCardsOfSkill[0];
		else
			card = new Game_Card(skillId, "learned");
	}
			
	deck.add(card);
}

Myth.CGC.Deck.removeCardFromDeck = function (actorIndex, deckName, skillId, removeFromLibraryToo)
{
	var actor = $gameActors.actor(actorIndex);

	var deck = null;
	if (deckName == "%current")
		deck = actor.deck();
	else
	{
		var presets = actor.getDeckPresets();
		for (var i = 0; i < presets.length; i++)
		{
			if (presets[i].name == deckName)
			{
				deck = presets[i];
				break;
			}
		}
	}
	if (deck == null) return;

	var index = deck._data.findIndex(card => card.id() == skillId);
	if (index == -1)
		return;
	var card = deck.splice(index, 1);
	if (removeFromLibraryToo)
	{
		var index = actor._skillCards.indexOfObject(card);
		if (index > -1)
			actor._skillCards.splice(index, 1);

		$gameParty.removeCardFromLibrary(card);
	}
	

}

if (Myth.Util.usingMZ)
{
	PluginManager.registerCommand("MYTH_CGC_DeckEditorCore", "openDeckEditor", args =>
	{
		SceneManager.push(Scene_DeckSelector);
	});

	PluginManager.registerCommand("MYTH_CGC_DeckEditorCore", "equipDeck", args =>
	{
		const actorIndex = Number(args.actorIndex);
		const deckName = (args.deckName);
		Myth.CGC.Deck.equipDeckToActor(actorIndex, deckName);
	});

	PluginManager.registerCommand("MYTH_CGC_DeckEditorCore", "increaseDP", args =>
	{
		const actorIndex = Number(args.actorIndex);
		const amount = (args.amount);
		Myth.CGC.Deck.addDeckPointsToActor(actorIndex, amount);
	});

	PluginManager.registerCommand("MYTH_CGC_DeckEditorCore", "addCardToDeck", args =>
	{
		const actorIndex = Number(args.actorIndex);
		const deckName = args.deckname;
		const skillId = Number(args.skillId);
		const addToLibraryToo = JSON.parse(args.addToLibraryToo);
		Myth.CGC.Deck.addCardToDeck(actorIndex, deckName, skillId, addToLibraryToo);
	});

	PluginManager.registerCommand("MYTH_CGC_DeckEditorCore", "removeCardFromDeck", args =>
	{
		const actorIndex = Number(args.actorIndex);
		const deckName = args.deckname;
		const skillId = Number(args.skillId);
		const removeFromLibraryToo = JSON.parse(args.removeFromLibraryToo);
		Myth.CGC.Deck.removeCardFromDeck(actorIndex, deckName, skillId, removeFromLibraryToo);
	});
}

function Scene_DeckEditor()
{
	this.initialize.apply(this, arguments);
};

Scene_DeckEditor.prototype = Object.create(Scene_ItemBase.prototype);
Scene_DeckEditor.prototype.constructor = Scene_DeckEditor;

Scene_DeckEditor.prototype.initialize = function ()
{
	Scene_ItemBase.prototype.initialize.call(this);
};

Scene_DeckEditor.prototype.start = function ()
{
	Scene_ItemBase.prototype.start.call(this);
	this.refreshActor();
};

Scene_DeckEditor.prototype.create = function ()
{
	Scene_ItemBase.prototype.create.call(this);
	this.createHelpWindow();
	this.createDeckStatusWindow();
	this.createPreviewCard();
	this.createCardTypeWindow();
	this.createActorWindow();
	this._actorWindow.visible = true;

	this.createCardListWindow();
	this.createDeckListWindow();

	this.createArrowSprite();


	this._cardTypeWindow.setSkillWindow(this._cardListWindow);
	this._cardTypeWindow.activate();

	//this._windowLayer.removeChild(this._helpWindow);
	//this.addWindow(this._helpWindow);
};

Scene_DeckEditor.prototype.createHelpWindow = function ()
{
	Scene_MenuBase.prototype.createHelpWindow.call(this);
	var rect = this.helpWindowRect();
	this._helpWindow.y = rect.y;
	this._helpWindow.width = rect.width;
	this._helpWindow.standardFontSize = function ()
	{
		return Myth.CGC.Deck.coordinates.helpFontSize;
	}
}

Scene_DeckEditor.prototype.createDeckStatusWindow = function ()
{
	var rect = this.helpWindowRect();
	if (this instanceof Scene_DeckSelector)
		rect.width = Myth.CGC.Deck.coordinates.windowWidth;
	else
		rect.width = Myth.CGC.Deck.coordinates.statusWindowWidth;
	rect.x = Graphics.boxWidth - rect.width;
	this._deckStatusWindow = new Window_DeckStatus(rect);
	this._deckStatusWindow.y = Graphics.boxHeight - this._deckStatusWindow.height;
	this.addWindow(this._deckStatusWindow);
}

Scene_DeckEditor.prototype.createActorWindow = function ()
{
	const rect = this.actorWindowRect();
	this._actorWindow = new Window_DeckActor(rect.x, rect.y);
	this._actorWindow.setHandler("ok", this.onActorOk.bind(this));
	this._actorWindow.setHandler("cancel", this.onActorCancel.bind(this));
	this.addWindow(this._actorWindow);
};

Scene_DeckEditor.prototype.refreshActor = function ()
{
	this.refreshDeck();

	const actor = this.actor();
	this._cardTypeWindow.setActor(actor);
	this._actorWindow.setActor(actor);
	this._cardListWindow.setActor(actor);
	this._deckListWindow.setActor(actor);
	this._deckStatusWindow.setActor(actor);
};

Scene_DeckEditor.prototype.refreshDeck = function ()
{
	const deck = this.currentDeck();
	this._cardListWindow.setDeck(deck);
	this._deckListWindow.setDeck(deck);
	this._deckStatusWindow.setDeck(deck);

}

Scene_DeckEditor.prototype.createCardListWindow = function ()
{
	var wx = 0;
	var wy = this._cardTypeWindow.y + this._cardTypeWindow.height;
	var ww = Myth.CGC.Deck.coordinates.windowWidth;
	var wh = Graphics.boxHeight - wy - this._helpWindow.height;
	this._cardListWindow = new Window_DeckCardList(wx, wy, ww, wh);
	this._cardListWindow.setHandler("ok", this.onItemOk.bind(this));
	this._cardListWindow.setHandler("cancel", this.onItemCancel.bind(this));
	this._cardListWindow.setHandler("pagedown", this.activateDeckList.bind(this));
	this._cardListWindow.setHelpWindow(this._helpWindow);
	this._cardListWindow._previewSprite = this._previewSprite;
	this._windowLayer.addChildAt(this._cardListWindow, 0);
	//this.addWindow(this._cardListWindow);
};

Scene_DeckEditor.prototype.createPreviewCard = function ()
{
	this._previewSprite = new Sprite_SkillCard($dataSkills[1], this._actor);
	this._previewSprite.drawAmount = function (color)
	{
		if (Myth.CGC.Deck.usingDP && Myth.CGC.Deck.showDP)
			this._amountText.drawAmountWithSuffix(color, Myth.CGC.Deck.deckPointsAbbrv);
	}
	
	this._previewSprite.x = Graphics.boxWidth / 2;
	this._previewSprite.y = Myth.CGC.Deck.coordinates.previewY;
	


	var scale = Myth.CGC.Deck.coordinates.previewScale;
	this._previewSprite.scale = new Point(scale, scale);

	this._previewSprite._amountText = new Window_CardAmount(this._previewSprite, 200);
	this._previewSprite._amount = 0;
	this._previewSprite._amountText.x = this._previewSprite.x - 100;
	this._previewSprite._amountText.y = this._previewSprite.y + (this._previewSprite.bitmap.height/2 * scale);

	this._previewSprite.hide();
	this.addCardSprite(this._previewSprite);

	var _setSkill = this._previewSprite.setSkill;
	this._previewSprite.setSkill = function (skill)
	{
		if (skill != 0)
		{
			_setSkill.call(this, skill);
			this._amount = skill._deckCost;
			if (this._amount == undefined)
				this._amount = 1;
			this.drawAmount();
			this.show();
		}
		else
		{
			this.hide();
		}

	}
};

Scene_DeckEditor.prototype.createArrowSprite = function ()
{
	var bitmap1 = ImageManager.loadSystem(Myth.CGC.Deck.images.deckArrow);
	var bitmap2 = ImageManager.loadSystem(Myth.CGC.Deck.images.libraryArrow);
	this._arrowSprite = new Sprite(bitmap1);
	this._arrowSprite.forwardArrow = bitmap1;
	this._arrowSprite.backArrow = bitmap2;
	this._arrowSprite.anchor = new Point(0.5, 0.5);
	this._arrowSprite.x = this._previewSprite.x;
	this._arrowSprite.y = Myth.CGC.Deck.coordinates.arrowY;
	this._arrowSprite.visible = false;
	this.addChild(this._arrowSprite);
}

Scene_DeckEditor.prototype.createDeckListWindow = function ()
{
	var wy = this._actorWindow.y + this._actorWindow.height;
	//var wy = this._cardTypeWindow.y + this._cardTypeWindow.height;
	var ww = Myth.CGC.Deck.coordinates.windowWidth;
	var wx = Graphics.boxWidth - ww;
	var wh = Graphics.boxHeight - wy - this._deckStatusWindow.height;
	this._deckListWindow = new Window_DeckDeckList(wx, wy, ww, wh);
	this._deckListWindow.setHandler("ok", this.onDeckItemOk.bind(this));
	this._deckListWindow.setHandler("cancel", this.onItemCancel.bind(this));
	this._deckListWindow.setHandler("pageup", this.activateCardList.bind(this));
	this._deckListWindow.setHelpWindow(this._helpWindow);
	this._deckListWindow._previewSprite = this._previewSprite;
	this._deckListWindow._deckStatusWindow = this._deckStatusWindow;
	//this.addWindow(this._deckListWindow);
	this._windowLayer.addChildAt(this._deckListWindow, 0);
}

Scene_DeckEditor.prototype.helpWindowRect = function ()
{
	const wx = 0;
	//var wy = this.helpAreaTop();
	const ww = Myth.CGC.Deck.coordinates.helpWindowWidth;
	var wh = 0;
	if (Myth.Util.usingMZ)
		wh = this.helpAreaHeight();
	else
		wh = Window_Help.prototype.fittingHeight(2);
	const wy = Graphics.boxHeight - wh;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_DeckEditor.prototype.actorWindowRect = function ()
{
	const wx = Graphics.boxWidth / 2;
	var wy = 0;
	if (Myth.Util.usingMZ)
		wy = this.mainAreaTop();
	const ww = Graphics.boxWidth / 2;

	var wh = 0;
	if (Myth.Util.usingMZ)
		wh = this.mainAreaHeight();
	else
		wh = Window_Selectable.prototype.fittingHeight(2);
	//const wh = 400;
	return new Rectangle(wx, wy, ww, wh);
};


Scene_DeckEditor.prototype.onItemOk = function ()
{
	this.addCardToDeck();
	this._cardListWindow.activate();
};

Scene_DeckEditor.prototype.onDeckItemOk = function ()
{
	this.removeCardFromDeck();
	if (this._deckListWindow._data.length > 0)
		this._deckListWindow.activate();
	else
		this.activateCardList();
};

Scene_DeckEditor.prototype.activateDeckList = function (index)
{
	if (this._deckListWindow._data.length == 0)
		return this.activateCardList(index);

	this._cardListWindow.deselect();
	this._cardListWindow.deactivate();
	this._deckListWindow.activate();

	if (index == null || index == undefined || index == -1)
		this._deckListWindow.select(0);
	else
		this._deckListWindow.select(0);

	this._arrowSprite.bitmap = this._arrowSprite.backArrow;
};

Scene_DeckEditor.prototype.activateCardList = function (index)
{
	this._deckListWindow.deactivate();
	this._deckListWindow.deselect();
	this._cardListWindow.activate();
	if (index == null || index == undefined || index == -1)
		this._cardListWindow.select(0);
	else
		this._cardListWindow.select(this._cardListWindow.maxCols());

	this._arrowSprite.bitmap = this._arrowSprite.forwardArrow;
};

Scene_DeckEditor.prototype.currentDeck = function ()
{
	return this.actor().menuDeck();
}

Scene_DeckEditor.prototype.addCardToDeck = function ()
{
	var index = this._cardListWindow.index();
	if (index == -1) return;
	if (index >= this._cardListWindow._data.length)
		return;
	var cardSprite = this._cardListWindow._cardSprites[index];
	var card = this.card();

	this.currentDeck().addNextToDuplicates(card);
	
	var deckCard = this._deckListWindow._cardSprites.find(cSprite =>
	{
		return cSprite._card.isIdenticalTo(card);
	});
	if (deckCard)
	{
		deckCard._amount++;
	}
	if (!deckCard)
	{
		var newSprite = this._deckListWindow.createOneCard(card);
		if (newSprite)
		{
			newSprite.x = cardSprite.x - this._deckListWindow.x;
			newSprite.y = cardSprite.y;
			newSprite._amount = 1;
		}
		
		//this._deckListWindow.originalDeckCards.push(card);
		this._deckListWindow.addCard(card);
	}
	this._deckListWindow.updateCardAmount(card);

	cardSprite._amount--;
	if (cardSprite._amount == 0)
		cardSprite.shadeCard();
	cardSprite.drawAmount();

	this._cardListWindow.makeItemList();

	this._deckListWindow.makeItemList();

	this._deckListWindow._scrollBar.redraw();
};

Scene_DeckEditor.prototype.removeCardFromDeck = function ()
{
	var index = this._deckListWindow.index();
	if (index == -1) return;
	if (index >= this._deckListWindow._data.length)
		return;
	var cardSprite = this._deckListWindow._cardSprites[index];
	var card = this._deckListWindow.card();

	var deckAmount = this.currentDeck().amountOf(card.id());
	var library = Myth.CGC.Deck.sharedLibrary ? $gameParty._allCards : this._actor._skillCards;
	var libraryAmount = library.amountOf(card.id());
	var isLegal = (deckAmount <= libraryAmount);
/*	if (card.origin() == "equip")
		isLegal = true;*/

	
	if (isLegal)
		this._cardListWindow.deckCards.push(card);

	var deckIndex = this.currentDeck().indexOf(card.id(), card.origin());
	this.currentDeck().splice(deckIndex, 1);

	
	var cardCard = this._cardListWindow._cardSprites.find(cSprite =>
	{
		return cSprite._card.isIdenticalTo(card);
	});
	if (cardCard && isLegal)
	{
		cardCard._amount++;
		

		cardCard.drawAmount();
		cardCard.unshadeCard();
	}
	else if (isLegal)
	{
		var newSprite = this._cardListWindow.createOneCard(card, cardSprite.x - this._deckListWindow.x, cardSprite.y);
	}

	cardSprite._amount--;
	
	//cardSprite.drawCardBitmap();
	if (cardSprite._amount == 0)
	{
		this._deckListWindow._cardSprites.splice(index, 1);
		//this._deckListWindow.originalDeckCards.splice(index, 1);
		this._deckListWindow.removeCard(index);
		this._deckListWindow.removeCardSprite(cardSprite);
	}
	this._deckListWindow.updateCardAmount(card);
	

	this._cardListWindow.makeItemList();
	this._deckListWindow.resetDeckCards();
	this._deckListWindow.makeItemList();

	this._deckListWindow._scrollBar.redraw();
}

Scene_DeckEditor.prototype.item = function ()
{
	return this._cardListWindow.item();
};

Scene_DeckEditor.prototype.card = function ()
{
	return this._cardListWindow.card();
}

Scene_DeckEditor.prototype.onItemCancel = function ()
{
	this._cardTypeWindow.activate();
	this._cardListWindow.deselect();
	this._deckListWindow.deselect();

	this._previewSprite.hide();
	this._previewSprite._amountText.hide();
	this._arrowSprite.visible = false;
};

Scene_DeckEditor.prototype.commandSkill = function ()
{
	this._cardListWindow.activate();
	this._cardListWindow.selectLast();

	this._previewSprite.show();
	this._previewSprite._amountText.show();
	this._arrowSprite.visible = true;
	this._arrowSprite.bitmap = this._arrowSprite.forwardArrow;
};



Scene_DeckEditor.prototype.createCardTypeWindow = function ()
{
	var rect = Myth.CGC.Deck.typeWindowRect();
	if (Myth.Util.usingMZ)
	{
		rect.y += this.mainAreaTop();
		this._cardTypeWindow = new Window_DeckSkillType(rect);
	}
	else
	{
		this._cardTypeWindow = new Window_DeckSkillType(rect.x, rect.y);
		this._cardTypeWindow.width = rect.width;
	}
	this._cardTypeWindow.setHandler("skill", this.commandSkill.bind(this));
	this._cardTypeWindow.setHandler('cancel', this.popScene.bind(this));
	this.addWindow(this._cardTypeWindow);
}

Scene_DeckEditor.prototype.getLibraryBackground = function ()
{
	return Myth.CGC.images.deckEditorBackgroundImage;
}

Scene_DeckEditor.prototype.createBackground = function ()
{
	Scene_ItemBase.prototype.createBackground.call(this);

	var bitmapName = this.getLibraryBackground();
	if (!bitmapName || bitmapName == "") return;

	this._libraryBackgroundSprite = new Sprite(ImageManager.loadPicture(bitmapName));
	this.addChild(this._libraryBackgroundSprite);
};


function Window_DeckCardList()
{
	this.initialize.apply(this, arguments);
}

Window_DeckCardList.prototype = Object.create(Window_CardList.prototype);
Window_DeckCardList.prototype.constructor = Window_DeckCardList;

Window_DeckCardList.prototype.initialize = function (x, y, width, height)
{
	Window_CardList.prototype.initialize.call(this, x, y, width, height);
	this._itemsBeforeCards = 0; // this variable keeps touch input index from returning NaN
	this.opacity = 255;
	this.contents.fontSize = 16;
	this.deckCards = [];
	this.originalDeckCards = this.deckCards;
};

Window_DeckCardList.prototype.scrollBackImage = function ()
{
	return Myth.CGC.Deck.images.scrollBack;
}

Window_DeckCardList.prototype.scrollBarImage = function ()
{
	return Myth.CGC.Deck.images.scrollBar;
}

Window_DeckCardList.prototype.scrollBarYPinch = function ()
{
	return Myth.CGC.Deck.coordinates.scrollBarYPinch;
}

Window_DeckCardList.prototype.scrollBarX = function ()
{
	return this.width - Myth.CGC.Deck.coordinates.scrollBarX;
}

Window_DeckCardList.prototype.setDeck = function (deck)
{
	this._deck = deck;
}

Window_DeckCardList.prototype.isEnabled = function (item)
{
	return true;
	//return !!this._actor;
};

Window_DeckCardList.prototype.cardsToList = function ()
{
	return this.originalDeckCards.filter(item => this.includes(item));
}

/*Window_DeckCardList.prototype.makeItemList = function ()
{
	var deckCards = this.originalDeckCards.filter(item => this.includes($dataSkills[item.id()]));
	this._data = [];
	for (var i = 0; i < deckCards.length; i++)
	{
		if (this._data.filter(element => element.id() == deckCards[i].id()).length == 0)
		{
			this._data.push(deckCards[i]);
		}
		else
		{

		}
	}
}*/

Window_DeckCardList.prototype.isCurrentItemEnabled = function ()
{
	if (!this._actor)
		return false;
	var sprite = this._cardSprites[this.index()];
	if (!sprite) return false;
	if (sprite._amount > 0)
		return this.isEnabled(this._data[this.index()]);
	//return (sprite._amount > 0);
}

if (!Myth.CGC.Types)
{
	Window_DeckCardList.prototype.includes = function (item)
	{
		return true;
	}
}
else
{
	Window_DeckCardList.prototype.includes = function (item)
	{
		var includes = Window_CardList.prototype.includes.call(this, item);
		if (!includes) return false;

		var typeRestrictions = this._actor.getMaxTypeRestrictions();
		var sealedTypes = this._actor.getSealedCardTypes();
		for (var i = 0; i < typeRestrictions.length; i++)
		{
			if (typeRestrictions[i].amount > 0) continue;
			if (item.isType(typeRestrictions[i].type))
				return false;
		}
		for (var i = 0; i < sealedTypes.length; i++)
		{
			if (item.isType(sealedTypes[i]))
				return false;
		}

		return true;
	}
}

Window_DeckCardList.prototype.isCardLibraryScene = function ()
{
	return false;
}

Window_DeckCardList.prototype.usingSimpleView = function ()
{
	return false;
}

//Legacy function
Window_DeckCardList.prototype.updateCardVisibility = function ()
{
	if (!Myth.CGC.Deck.coordinates.hideOffscreen) return;

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
		/*		var alpha = Math.max(255 - (dist * 4), 0);
				card.opacity = alpha;
				if (card._amountText)
					card._amountText.opacity = alpha;
				if (card._shadeSprite)
					card._shadeSprite.opacity = alpha;*/
	}
}

Window_DeckCardList.prototype.setHelpWindowItem = function (item)
{
	if (!this._helpWindow) return;

	if (item)
	{
		var skill = $dataSkills[item.id()];
		this._helpWindow.setItem(skill);
		this._previewSprite.setSkill(skill);
	}
	else
	{
		this._previewSprite.setSkill(0);
		//this._previewSprite.visible = false;
		this._helpWindow.setItem(null);
	}
}

Window_DeckCardList.prototype.card = function ()
{
	var item = this.item();
	return item;
}

Window_DeckCardList.prototype.getCardX = function (index)
{
	var x = Window_CardList.prototype.getCardX.call(this, index);
	return x - this.x;
}

Window_DeckCardList.prototype.getCardY = function (index)
{
	var y = Window_CardList.prototype.getCardY.call(this, index);
	return y - this.y;
}

Window_DeckCardList.prototype.showMissingCards = function ()
{
	return false;
};

Window_DeckCardList.prototype.includeMissingCards = function (cards)
{
	return cards;
}

Window_DeckCardList.prototype.standardPadding = function ()
{
	return 12;
};

Window_DeckCardList.prototype.displaySettings = function ()
{
	return Myth.CGC.Deck.coordinates.cardDisplay;
}

Window_DeckCardList.prototype.numVisibleCols = function ()
{
	return this.maxCols() + 1;
}

Window_DeckCardList.prototype.numVisibleRows = function ()
{
	return Myth.CGC.Deck.coordinates.numVisibleRows;
}


Window_DeckCardList.prototype.actorCards = function ()
{
	return this.originalDeckCards;
}

Window_DeckCardList.prototype.createCardSprites = function ()
{
	this.setDeckCards();
	Window_CardList.prototype.createCardSprites.call(this);
};

Window_DeckCardList.prototype.setDeckCards = function ()
{
	if (Myth.CGC.Deck.sharedLibrary)
	{
		this.deckCards = $gameParty._allCards.sort().slice();
	}
	else if (this._actor)
	{
		this.deckCards = this._actor._skillCards.sort().slice();
	}
	//this.deckCards.sort();
	this.originalDeckCards = this.deckCards.slice();
}

Window_DeckCardList.prototype.deleteCardSprites = function ()
{
	for (var i = this._cardSprites.length - 1; i >= 0; i--)
	{
		var card = this._cardSprites[i];
		this.removeCardSprite(card);
	}
	this._cardSprites = [];
};

Window_DeckCardList.prototype.addCardSprite = function (spriteCard)
{
	//Window_CardList.prototype.addCardSprite.call(this, spriteCard);
	spriteCard._parentWindow = this;
	this.addChild(spriteCard);
	if (spriteCard._amountText)
		this.addChild(spriteCard._amountText);
};

Window_DeckCardList.prototype.isTouchOkEnabled = function ()
{
	if (Myth.Util.usingMZ)
		return false;

	return true;
};

Window_DeckCardList.prototype.onTouchSelect = function (trigger)
{
	this._doubleTouch = false;
};

Window_DeckCardList.prototype.removeCardSprite = function (spriteCard)
{
	this.removeChild(spriteCard);
	if (spriteCard._amountText)
		this.removeChild(spriteCard._amountText);
}

Window_DeckCardList.prototype.createOneCard = function (card, x, y)
{
	var spriteCard = new Sprite_SkillCard(card, this._actor);
	if (spriteCard)
	{
		spriteCard.scale.x = this.cardScale();
		spriteCard.scale.y = this.cardScale();
		spriteCard.x = x;
		spriteCard.y = y;
		spriteCard._amountText = new Window_CardAmount(spriteCard, this.cardWidth());
		spriteCard._amount = 1;
		spriteCard._amountText.x = this.getAmountX(spriteCard);
		spriteCard._amountText.y = this.getAmountY(spriteCard);
		this.addCardSprite(spriteCard);
		this._cardSprites.push(spriteCard);
		this.makeItemList();
	}
	return spriteCard;
};

Window_DeckCardList.prototype.createCard = function ()
{
	var spriteCard = Window_CardList.prototype.createCard.call(this);
	if (spriteCard == null) return null;
	var thisCard = spriteCard._card;
	var deck = this._deck._data;
	for (var j = deck.length - 1; j >= 0; j--)
	{
		var card = deck[j];
		if (card.isIdenticalTo(thisCard))
		{
			spriteCard._amount--;
		}
	}
	spriteCard.drawCardBitmap();
	spriteCard.drawAmount();
	return spriteCard;
}

Window_DeckCardList.prototype.updateCardAmount = function (card)
{
	var maxCopies = Myth.CGC.Deck.restrictions.maxCopies;
	var dataSkill = $dataSkills[card.id()];
	if (dataSkill._deckRestrictions && dataSkill._deckRestrictions.maxCopies)
		maxCopies = dataSkill._deckRestrictions.maxCopies;
	

	var cardSprites = this._cardSprites.filter(cardSprite =>
	{
		return cardSprite._card && cardSprite._card.id() == card.id();
	});

	var totalAmount = 0;
	for (var i = 0; i < cardSprites.length; i++)
	{
		totalAmount += cardSprites[i]._amount;
	}

	var color = 'white';
	if (totalAmount > maxCopies)
		color = 'red';

	for (var i = 0; i < cardSprites.length; i++)
	{
		cardSprites[i].drawAmount(color);
	}
}


Window_DeckCardList.prototype.cursorRight = function (wrap)
{
	var index = this.index();
	var maxCols = this.maxCols();
	if (index % maxCols != maxCols - 1 && index < this._data.length - 1)
		Window_Selectable.prototype.cursorRight.call(this, wrap);
	else
		SceneManager._scene.activateDeckList(index);
}


Window_DeckCardList.prototype.processTouch = function ()
{
	if (this.canTouchToActivate())
		SceneManager._scene.activateCardList()
	Window_CardList.prototype.processTouch.call(this);
}

Window_DeckCardList.prototype.canTouchToActivate = function ()
{
	if (SceneManager._scene._cardListWindow == undefined) return false;
	if (!this.isOpen()) return false;
	if (!this.visible) return false;
	if (this.active) return false;
	if (Myth.Util.usingMZ)
	{
		if (this.hitIndex() <= 0) return false;
		if (!TouchInput.isHovered()) return false;
	}
	else
	{
		if (!TouchInput.isTriggered()) return false;
		if (!this.isTouchedInsideFrame()) return false;
	}
			
		

	return true;
}

Window_DeckCardList.prototype.hitTest = function (x, y)
{
	if (this.innerRect.contains(x, y))
	{
		return 1;
	}
	return -1;
};


function Window_DeckDeckList()
{
	this.initialize.apply(this, arguments);
}

Window_DeckDeckList.prototype = Object.create(Window_DeckCardList.prototype);
Window_DeckDeckList.prototype.constructor = Window_DeckDeckList;


Window_DeckDeckList.prototype.initialize = function (x, y, width, height)
{
	Window_DeckCardList.prototype.initialize.call(this, x, y, width, height);
}

Window_DeckDeckList.prototype.updateCardCreation = function ()
{
	Window_DeckCardList.prototype.updateCardCreation.call(this);
	if (this._cardToCreate == -1) return;

	this._deckStatusWindow.setCards(this._cardSprites);
}

Window_DeckDeckList.prototype.cardsToList = function ()
{
	return this.actorCards();
}

Window_DeckDeckList.prototype.createCard = function ()
{
	var spriteCard = Window_CardList.prototype.createCard.call(this);
	return spriteCard;
}

Window_DeckDeckList.prototype.setDeckCards = function ()
{
	if (this._deck)
	{
		this.deckCards = this._deck.slice();
		this.originalDeckCards = this.deckCards.slice();
	}
	else
	{
		this.deckCards = [];
		this.originalDeckCards = [];
	}
};

Window_DeckDeckList.prototype.resetDeckCards = function ()
{
	this.originalDeckCards = this._deck.slice();
}

Window_DeckDeckList.prototype.cursorRight = function (wrap)
{
	Window_Selectable.prototype.cursorRight.call(this, wrap);
}

Window_DeckDeckList.prototype.cursorLeft = function (wrap)
{
	var index = this.index();
	var maxCols = this.maxCols();
	if (index % maxCols != 0 && index != -1)
		Window_Selectable.prototype.cursorLeft.call(this, wrap);
	else
	{
		SceneManager._scene.activateCardList(index);
	}
};

Window_DeckDeckList.prototype.processTouch = function ()
{
	if (this.canTouchToActivate())
			SceneManager._scene.activateDeckList()
	Window_CardList.prototype.processTouch.call(this);
}

Window_DeckDeckList.prototype.addCard = function (card)
{
	this.originalDeckCards.push(card);
	this._cardToCreate++;
	this._deckStatusWindow.setCards(this._cardSprites);
};

Window_DeckDeckList.prototype.removeCard = function (index)
{
	this.originalDeckCards.splice(index, 1);
	this._deckStatusWindow.setCards(this._cardSprites);
}

Window_DeckDeckList.prototype.makeItemList = function ()
{
	Window_DeckCardList.prototype.makeItemList.call(this);
	this._deckStatusWindow.setCards(this._cardSprites);
	this.sortCardSprites();
}

Window_DeckDeckList.prototype.sortStyle = function ()
{
	return 1;
}

Window_DeckDeckList.prototype.sortCardSprites = function ()
{
	if (this.sortStyle() == 0)
	{
		// Sort the card sprites based on the data
		this._cardSprites.sort(function (a, b)
		{
			var cardA = a._card;
			var cardB = b._card;

			if (cardA.id() < cardB.id())
				return -1;
			if (cardB.id() < cardA.id())
				return 1;

			return cardA.originSortId() - cardB.originSortId();
		});
	}
	else if (this.sortStyle() == 1)
	{
		//sort the data based on the card sprites

		for (var i = 0; i < this._cardSprites.length; i++)
		{
			var spriteCard = this._cardSprites[i]._card;
			var dataCard = this._data[i];
			if (!dataCard) continue;
			if (spriteCard.isIdenticalTo(dataCard)) continue;
			for (var j = 0; j < i; j++)
			{
				var dataCard2 = this._data[j];
				if (spriteCard.isIdenticalTo(dataCard2))
				{
					this._data.splice(j, 1);
					this._data.splice(i, 0, dataCard2);
					break;
				}
			}
		}
	}
}

Window_DeckDeckList.prototype.includes = function (item)
{
	return Window_CardList.prototype.includes.call(this, item);
}


function Window_DeckSkillType()
{
	this.initialize.apply(this, arguments);
};

Window_DeckSkillType.prototype = Object.create(Window_SkillType.prototype);
Window_DeckSkillType.prototype.constructor = Window_DeckSkillType;

Window_DeckSkillType.prototype.initialize = function ()
{
	Window_SkillType.prototype.initialize.apply(this, arguments);
	this.height = this.fittingHeight(2);
}

if (Myth.CGC.Types)
{
	Window_DeckSkillType.prototype.makeCommandList = function ()
	{
		Window_CardSkillType.prototype.makeCommandList.call(this);
	};

	Window_DeckSkillType.prototype.displayType = function (type)
	{
		return type.showDeck;
	}

	Window_DeckSkillType.prototype.getActorTypes = function ()
	{
		var types = Window_CardSkillType.prototype.getActorTypes.call(this);
		var sealedTypes = this._actor.getSealedCardTypes().map(function (v)
		{
			return v.toLowerCase()
		});
		types = types.filter(function (type)
		{
			return !sealedTypes.includes(type);
		});
		return types;
	}

	Window_DeckSkillType.prototype.drawItem = function (index)
	{
		Window_CardSkillType.prototype.drawItem.call(this, index);
	}
};

Window_DeckSkillType.prototype.maxCols = function ()
{
	return 3;
};
Window_DeckSkillType.prototype.itemTextAlign = function ()
{
	return "center";
};


//This should be exactly like Window_CardLibraryActor
// which the user may or may not have if they aren't using CardTypes.
function Window_DeckActor()
{
	this.initialize.apply(this, arguments);
};

Window_DeckActor.prototype = Object.create(Window_MenuStatus.prototype);
Window_DeckActor.prototype.constructor = Window_DeckActor;

Window_DeckActor.prototype.initialize = function (x, y)
{
	
	if (Myth.Util.usingMZ)
	{
		var width = Graphics.boxWidth / 2;
		var height = this.lineHeight() * 2 + this.itemPadding() * 2;
		height += $gameSystem.windowPadding() * 2;
		var rect = new Rectangle(x, y, width, height);
		Window_MenuStatus.prototype.initialize.call(this, rect);
	}
	else
	{
		Window_MenuStatus.prototype.initialize.call(this, x, y);
	}
};

Window_DeckActor.prototype.windowWidth = function ()
{
	return Graphics.boxWidth / 2;
};

Window_DeckActor.prototype.windowHeight = function ()
{
	return this.lineHeight() * 2 + this.standardPadding() * 2;
};

Window_DeckActor.prototype.setActor = function (actor)
{
	this._actor = actor;
	this.refresh();
}

Window_DeckActor.prototype.itemRect = function (index)
{
	var height = this.lineHeight() * 2 + this.itemPadding() * 2;
	var rect = new Rectangle(0, 0, this.contents.width, height);
	return rect;
};

if (!Myth.Util.usingMZ)
{
	Window_DeckActor.prototype.itemPadding = function ()
	{
		return this.standardPadding();
	}
}

Window_DeckActor.prototype.drawAllItems = function ()
{
	const topIndex = this.topIndex();
	var max = Myth.Util.usingMZ ? this.maxVisibleItems() : this.maxPageItems();
	for (let i = 0; i < max; i++)
	{
		const index = topIndex + i;
		if (index < this.maxItems() && $gameParty.members()[index] == this._actor)
		{
			this.drawItemBackground(index);
			this.drawItem(index);
		}
	}
}

Window_DeckActor.prototype.actor = function (index)
{
	return $gameParty.members()[index];
};



if (Myth.Util.usingMZ)
{
	Window_DeckActor.prototype.drawItemStatus = function (index)
	{
		const actor = this.actor(index);
		if (!actor) return;
		const rect = this.itemRect(index);

		const x = rect.x + Myth.Util.usingMZ ? ImageManager.faceWidth : Window_Base._faceWidth;
		const y = rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);
		var textY = y + 8;
		var lineHeight = this.lineHeight();
		const x2 = rect.width / 2;
		this.drawActorName(actor, x, textY);
		this.drawActorLevel(actor, x, y + lineHeight * 1);
		var iconY = rect.height - Window_Base._iconHeight;
		if (Window_Base._iconHeight == undefined)
			iconY = rect.height - ImageManager.iconHeight;
		this.drawActorIcons(actor, x, iconY - 2);
		this.drawActorClass(actor, x2, textY);
		this.placeBasicGauges(actor, x2, textY - 4 + lineHeight);
	};
}
else
{
	Window_DeckActor.prototype.drawItemStatus = function (index)
	{
		const actor = this.actor(index);
		if (!actor) return;
		const rect = this.itemRect(index);

		const x = rect.x + Myth.Util.usingMZ ? ImageManager.faceWidth : Window_Base._faceWidth;
		const y = rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);
		var textY = y + 8;
		var lineHeight = this.lineHeight();
		const x2 = (rect.width - x) / 2 + x;
		this.drawActorName(actor, x, textY);
		this.drawActorLevel(actor, x2, textY);

		var iconY = rect.height - Window_Base._iconHeight;
		this.drawActorIcons(actor, 0, iconY - 2);

		this.drawActorHp(actor, x, textY - 4 + lineHeight, x2 - x - 12)
		this.drawActorMp(actor, x2, textY - 4 + lineHeight * 1, rect.width - x2 - 12);
	};

	Window_DeckActor.prototype.drawItemImage = function (index)
	{
		var actor = $gameParty.members()[index];
		var rect = this.itemRect(index);
		this.changePaintOpacity(actor.isBattleMember());
		var height = Math.min(Window_Base._faceHeight, this.contents.height);
		this.drawActorFace(actor, rect.x, rect.y, Window_Base._faceWidth, height);
		this.changePaintOpacity(true);
	};
}

Window_DeckActor.prototype.drawActorLevel = function (actor, x, y)
{
	var color = Myth.Util.usingMZ ? ColorManager.systemColor() : this.systemColor();
	this.changeTextColor(color);
	this.drawText(TextManager.levelA, x, y, 48);
	this.resetTextColor();
	this.drawText(actor.level, x + 56, y, 36, "right");
};

Window_DeckActor.prototype.placeGauge = function (actor, type, x, y)
{
	if (type == "tp") return;
	Window_StatusBase.prototype.placeGauge.call(this, actor, type, x, y);
};



function Window_DeckStatus()
{
	this.initialize.apply(this, arguments);
};

Window_DeckStatus.prototype = Object.create(Window_Base.prototype);
Window_DeckStatus.prototype.constructor = Window_DeckStatus;

Window_DeckStatus.prototype.initialize = function (rect)
{
	var len = Myth.CGC.Deck.deckStatusDraw.length;
	rect.height = this.fittingHeight(len);
	if (len == 0)
		rect.height = 0;
	if (Myth.Util.usingMZ)
		Window_Base.prototype.initialize.call(this, rect);
	else
		Window_Base.prototype.initialize.call(this, rect.x, rect.y, rect.width, rect.height);
	this.cards = [];
	this.deckName = "Test Deck";
	this.refresh();
};

Window_DeckStatus.prototype.setCards = function (cardSprites)
{
	this.cards = cardSprites;
	this.refresh();
}

Window_DeckStatus.prototype.refresh = function ()
{
	
	if (this.contents)
	{
		this.contents.clear();
		this.drawItem();
	}
};

Window_DeckStatus.prototype.standardFontSize = function ()
{
	return Myth.CGC.Deck.coordinates.helpFontSize;
}

Window_DeckStatus.prototype.drawItem = function ()
{
	if (this._deck == null) return;

	var yy = 0;

	var draws = Myth.CGC.Deck.deckStatusDraw;
	for (var i = 0; i < draws.length; i++)
	{
		var xx = 0;
		var line = draws[i].split(',');
		var width = this.contents.width / line.length;
		for (var j = 0; j < line.length; j++)
		{
			var draw = line[j].trim().toLowerCase();
			this.drawComponent(xx, yy, width, draw);

			xx += width;
		}
		yy += this.lineHeight();
	}
};

Window_DeckStatus.prototype.drawComponent = function (xx, yy, width, draw)
{
	if (draw == "cost")
		this.drawDeckCost(xx, yy, width);
	else if (draw == "count")
		this.drawCardCount(xx, yy, width);
	else if (draw == "name")
		this.drawDeckName(xx, yy, width);
	else if (draw == "type")
		this.drawTypes(yy);
}

Window_DeckStatus.prototype.drawCardCount = function (xx, yy, width)
{
	var amount = 0;
	for (var i = 0; i < this.cards.length; i++)
	{
		var sprite = this.cards[i];
		amount += sprite._amount;
	}
	var actor = SceneManager._scene._actor;
	var maxSize = actor.getMaxDeckSize();
	var unit = "";
	if (width > this.contents.width / 2)
		unit = " Cards";

	var canEquip = amount <= maxSize;
	if (canEquip)
		canEquip = amount >= actor.getMinDeckSize();
	this.setColorOnSuccess(canEquip);

	this.drawText(amount + " / " + maxSize + unit, xx, yy, width, 'right');
};

Window_DeckStatus.prototype.drawDeckCost = function (xx, yy, width)
{
	if (Myth.CGC.Deck.usingDP == false) return;

	var maxCost = SceneManager._scene._actor.deckPoints();
	var totalCost = this._deck.getDeckCost();
	var hasEnough = totalCost <= maxCost;
	this.setColorOnSuccess(hasEnough);

	var unit = Myth.CGC.Deck.deckPointsAbbrv;
	if (width > this.contents.width / 2)
		unit = Myth.CGC.Deck.deckPointsName;
	this.drawText(totalCost + " / " + maxCost + " " + unit, xx, yy, width, 'right');
}

Window_DeckStatus.prototype.setColorOnSuccess = function (success)
{
	var color = 'white';
	if (Myth.Util.usingMZ)
		color = success ? ColorManager.normalColor() : ColorManager.deathColor();
	else
		color = success ? this.normalColor() : this.deathColor();

	this.changeTextColor(color);
}

Window_DeckStatus.prototype.drawDeckName = function (xx, yy, width)
{
	this.resetFontSettings();
	this.drawText(this.deckName, xx, yy, width, 'left');
}

Window_DeckStatus.prototype.drawTypes = function (yy)
{
	this.resetFontSettings();
	var types = [];
	for (var i = 0; i < this.cards.length; i++)
	{
		var sprite = this.cards[i];
		var amount = sprite._amount;
		var cardTypes = sprite._skill._cardTypes;
		if (cardTypes)
		{
			for (var j = 0; j < cardTypes.length; j++)
			{
				var type = cardTypes[j];
				if (types[type] == undefined)
					types[type] = 0;
				types[type] += amount;

			}
		}
	}
	var xx = 0;

	var _this = this;
	var textWidth = this.textWidth("00");
	Object.keys(types).forEach(function (type)
	{
		var dataType = Myth.CGC.Types.findTypeByName(type);
		if (!dataType) return;
		if (dataType.showDeck === false) return;
		var icon = dataType.icon;
		if (icon == 0) return;
		_this.drawIcon(icon, xx, yy);
		var iconW = Myth.Util.usingMZ ? ImageManager.iconWidth : Window_Base._iconWidth;
		_this.drawText(types[type], xx + iconW, yy, textWidth, 'right');
		xx += iconW + textWidth + 12;
	});
};

Window_DeckStatus.prototype.setActor = function (actor)
{
	this._actor = actor;
	this.refresh();
}

Window_DeckStatus.prototype.setDeck = function (deck)
{
	this._deck = deck;
	this.deckName = deck ? this._deck.name : "";
}



Isiah.CGC.Deck.Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function ()
{
	Isiah.CGC.Deck.Window_MenuCommand_addOriginalCommands.call(this);
	this.addCommand(Isiah.CGC.Deck.commandName, 'deck', this.areMainCommandsEnabled());
};

Isiah.CGC.Deck.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function ()
{
	Isiah.CGC.Deck.Scene_Menu_createCommandWindow.call(this);
	this._commandWindow.setHandler('deck', this.commandPersonal.bind(this));
};

Isiah.CGC.Deck.Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function ()
{
	var symbol = this._commandWindow.currentSymbol();
	Isiah.CGC.Deck.Scene_Menu_onPersonalOk.call(this);
	if (symbol == 'deck')
		SceneManager.push(Scene_DeckSelector);
};

/*Myth.CGC.Deck.Scene_Menu_onPersonalOk = Myth.CGC.Scene_Menu_onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function ()
{
	var symbol = this._commandWindow.currentSymbol();
	if (symbol == 'skill')
	{
		SceneManager.push(Scene_DeckSelector);
		return;
	}
	Myth.CGC.Deck.Scene_Menu_onPersonalOk.call(this);
}*/



Myth.CGC.Deck.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function ()
{
	Myth.CGC.Deck.Game_Party_initialize.call(this);
	this._deckPresets = [];
	this.addStartingCardsToLibrary();
};

Game_Party.prototype.addStartingCardsToLibrary = function ()
{
	if (!Myth.CGC.Deck.sharedLibrary) return;
	var startingCards = Myth.CGC.Deck.startingCards.split('\n');
	for (var i = 0; i < startingCards.length; i++)
	{
		var line = startingCards[i];
		if (line.match(/(\d+)x skill (\d+)/i))
		{
			var amount = Number(RegExp.$1);
			var skillId = Number(RegExp.$2);

			for (var j = 0; j < amount; j++)
			{
				this._allCards.push(skillId);
			}
		}
		else if (line.match(/(\d+)x (.+)/i))
		{
			var amount = Number(RegExp.$1);
			var skill = Myth.Util.findSkillbyName(RegExp.$2);
			if (skill && skill.name != "")
			{
				for (var j = 0; j < amount; j++)
				{
					this._allCards.push(skill.id);
				}
			}
		}
	}
}

Myth.CGC.Deck.Game_Party_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function (actorId)
{
	var includesActor = this._actors.includes(actorId);
	Myth.CGC.Deck.Game_Party_addActor.call(this, actorId);
	if (!includesActor && Myth.CGC.Deck.sharedLibrary)
	{
		var actor = $gameActors.actor(actorId);
		var actorPresets = actor._deckPresets;
		var originalPresetsLength = this._deckPresets.length;
		for (var i = 0; i < actorPresets.length; i++)
		{
			this._deckPresets.push(actorPresets[i]);
		}
		actor.equipDeck(originalPresetsLength);
	};

};

Myth.CGC.Deck.Game_Party_setupStartingMembers = Game_Party.prototype.setupStartingMembers;
Game_Party.prototype.setupStartingMembers = function ()
{
	Myth.CGC.Deck.Game_Party_setupStartingMembers.call(this);
	for (var i = 0; i < this._actors.length; i++)
	{
		var actorIndex = this._actors[i];
		var actor = $gameActors.actor(actorIndex);
		for (var j = 0; j < actor._deckPresets.length; j++)
		{
			this._deckPresets.push(actor._deckPresets[j]);
		}
	}
}

Myth.CGC.Deck.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function ()
{
	Myth.CGC.Deck.Game_Actor_initMembers.call(this);
	this._deckPresets = [];
	this._deckPresetIndex = 0;
};

Myth.CGC.Deck.Game_Actor_initSkills = Game_Actor.prototype.initSkills;
Game_Actor.prototype.initSkills = function ()
{
	Myth.CGC.Deck.Game_Actor_initSkills.call(this);
	this._deckPresets[0] = new Game_Cards(this.name() + "1");
};

Myth.CGC.Deck.Game_Actors_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId)
{
	Myth.CGC.Deck.Game_Actors_setup.call(this, actorId);
	this.initializeDeckPoints();
	this.initializeDecks();
	this.equipInitDeck();
	this.replaceTempDecklistCards();
}

Game_Actor.prototype.initializeDeckPoints = function ()
{
	var dataActor = $dataActors[this.actorId()];
	var currentClass = this.currentClass();

	this._deckPointsStarting = dataActor._deckPointsStarting;
	if (currentClass._deckPointsStarting)
		this._deckPointsStarting = currentClass._deckPointsStarting;
	if (this._deckPointsStarting == undefined || this._deckPointsStarting == NaN)
		this._deckPointsStarting = Myth.CGC.Deck.deckPointDefaults.starting;

	this._deckPointsOnLevel = dataActor._deckPointsOnLevel;
	if (currentClass._deckPointsOnLevel)
		this._deckPointsOnLevel = currentClass._deckPointsOnLevel;
	if (this._deckPointsOnLevel == undefined || this._deckPointsOnLevel == NaN)
		this._deckPointsOnLevel = Myth.CGC.Deck.deckPointDefaults.onLevel;

	this._deckPointsBonus = 0;
}

Game_Actor.prototype.initializeDecks = function ()
{
	for (const learning of this.currentClass().learnings)
	{
		if (learning.level <= 1)
		{
			this._deckPresets[0].push(learning.skillId);
		}
	}
	this._deckPresets[0].sort();
	var dataDecks = this.currentClass()._deckPresets;
	if (dataDecks)
	{
		for (var i = 0; i < dataDecks.length; i++)
		{
			var preset = new Game_Cards(dataDecks[i].name);
			preset.copy(dataDecks[i]);
			preset.sort();
			if (dataDecks[i]._locked)
				preset._locked = true;
			this._deckPresets.push(preset);
		}
	}

	var dataDecks = $dataActors[this.actorId()]._deckPresets;
	if (dataDecks)
	{
		for (var i = 0; i < dataDecks.length; i++)
		{
			var preset = new Game_Cards(dataDecks[i].name);
			
			preset.copy(dataDecks[i]);
			preset.sort();
			if (dataDecks[i]._locked)
				preset._locked = true;
			this._deckPresets.push(preset);
		}
	}
	var dataPresetIndex = $dataActors[this.actorId()]._deckPresetIndex
	if (dataPresetIndex)
		this.equipDeck(dataPresetIndex);
}

Game_Actor.prototype.getDeckPresets = function ()
{
	var useShared = Myth.CGC.Deck.sharedLibrary && $gameParty.members().includes(this);
	if (useShared)
	{
		return $gameParty._deckPresets;
	}
	else
		return this._deckPresets;
}

Game_Actor.prototype.getLibrary = function ()
{
	var useShared = Myth.CGC.Deck.sharedLibrary && $gameParty.members().includes(this);
	if (useShared)
	{
		return $gameParty._allCards;
	}
	else
		return this._skillCards;
}

Game_Actor.prototype.equipInitDeck = function ()
{
	var success = false;
	var presets = this.getDeckPresets();
	//var presets = this._deckPresets;
	for (var i = 1; i < presets.length; i++)
	{
		var deck = presets[i];
		if (this.canEquipDeck(deck))
		{

			this.equipDeck(i);

			success = true;
			break;
		}
	}

	if (success)
	{
		//delete Preset1
		this.deleteDeck(0);
		//console.log("deleting preset for " + this.name());
	}
	else
	{
		this.makePresetDeckLegal();
	}
};

Game_Actor.prototype.makePresetDeckLegal = function ()
{

	var deck = this.getDeckPresets()[0];
	if (deck.length == 0 && this.getDeckPresets().length > 1 && this.getDeckPresets()[1].length > 0)
	{
		this.deleteDeck(0);
		deck = this.getDeckPresets()[0];
		//console.log(this.hasAllCards(deck));
		if (!this.hasAllCards(deck))
		{
			console.warn(this.name() + " has no valid starting deck. Modifying their first notetag deck to be legal");
			for (var i = 0; i < deck.length; i++)
			{
				var card = deck.card(i);
				var skillId = card.id();
				if (skillId == Myth.CGC.Deck.safetySkill) continue;
				var amount = deck.amountOf(skillId);
				var library = this.getLibrary();
				var libraryAmount = library.amountOf(skillId);
				if (amount > libraryAmount)
				{
					console.warn("Learned " + $dataSkills[skillId].name + " to add to Library.");
					this.learnSkill(skillId);
				}
			}
		}
		else
		{
			//console.log(deck);
		}
	}

	if (!this.deckUnderMaxCopies(deck))
	{
		for (var i = deck.length - 1; i >= 0; i--)
		{
			var skillId = deck.card(i).id();
			var maxCopies = this.getCardMaxCopies(skillId);

			if (maxCopies == -1)
				continue;
			var amount = deck.amountOf(skillId);
			if (amount > maxCopies)
			{
				deck.splice(i, 1);
			}
				
		}
	}

	var maxSize = this.getMaxDeckSize();
	var minSize = this.getMinDeckSize();
	if (minSize > maxSize)
	{
		console.warn(this.name() + "'s deck restrictions have a smaller max size than the min size, which means no legal decks can be made.");
		return;
	}

	while (!this.deckUnderMaxSize(deck))
	{
		var lastIndex = deck.length - 1;
		deck.splice(lastIndex, 1);
	}

	while (!this.deckAboveMinSize(deck))
	{
		console.warn(deck.name + " does not contain enough cards. Adding an unplayable dummy card to force the deck to be legal. Please make sure your deck presets meet minimum deck size requirements.");
		deck.push(Myth.CGC.Deck.safetySkill);
	}

	this.equipDeck(0);
}

Game_Actor.prototype.replaceTempDecklistCards = function ()
{
	var presets = this.getDeckPresets();
	for (var i = 0; i < presets.length; i++)
	{
		var tempCards = new Game_Cards("temp");
		//console.log(this.getLibrary());
		tempCards.copy(this.getLibrary());
		var preset = presets[i];
		for (var j = 0; j < preset.length; j++)
		{
			var card = preset._data[j];
			if (card.id() == 'deck') continue;
			var libraryAmount = tempCards.amountOf(card.id());
			var index = tempCards.indexOfObject(card);
			if (libraryAmount == 0)
			{
				//This is actually fine as long as it's not the one they've got equipped.
				//console.warn(this.name() + " somehow didn't learn card " + card.id());
			}
			else if (index == -1 || index == null)
			{
				var libraryCardIndex = tempCards.indexOf(card.id(), card.origin());
				var libraryCard = tempCards.card(libraryCardIndex);
				if (libraryCard)
				{
					tempCards.splice(libraryCardIndex, 1);
					preset._data[j] = libraryCard;
				}
			}
		}
	}
}

Game_Actor.prototype.equipDeck = function (index)
{
	var presets = this.getDeckPresets();
	var deck = presets[index];
	if (this.canEquipDeck(deck))
	{
		this._cardDeck.copy(presets[index]);
		this._deckPresetIndex = index;
	}
};

Game_Actor.prototype.deckPresetIndex = function ()
{
	return this._deckPresetIndex;
}

Game_Actor.prototype.canEquipDeck = function (deck)
{
	if (typeof deck == 'number')
	{
		deck = this.getDeckPresets()[deck];
	}
	if (!deck)
	{
		console.error("Tried to equip deck which doesn't exist");
		return false;
	}
	if (!this.deckUnderMaxSize(deck))
		return false;

	var type = this.deckUnderMaxTypes(deck)
	if (type !== true)
		return false;

	if (!this.deckAboveMinSize(deck))
		return false;

	if (!this.deckOverMinTypes(deck))
		return false;

	var type = this.deckUnderMaxCopies(deck);
	if (type !== true)
		return false;

	if (!this.hasAllCards(deck))
		return false;

	if (!this.hasDeckPoints(deck))
		return false;

	var type = this.hasSealedTypeCard(deck);
	if (type !== false)
		return false;

	var evalSuccess = this.evalDeckRestrictions(deck);
	if (evalSuccess !== true)
		return false;

	if (!this.evalCardRestrictions(deck))
		return false;

	return true;
};

Game_Actor.prototype.isCurrentDeckLegal = function ()
{
	return this.canEquipDeck(this.deck());
}

Game_Actor.prototype.deckUnderMaxSize = function (deck)
{
	var maxSize = this.getMaxDeckSize();

	if (maxSize == -1)
		return true;
	return (deck.length <= maxSize);
};

Game_Actor.prototype.getMaxDeckSize = function ()
{
	var maxSize = Myth.CGC.Deck.restrictions.maxSize;

	var dataRestrictions = this.currentClass()._deckRestrictions;
	if (dataRestrictions && dataRestrictions.maxSize)
		maxSize = dataRestrictions.maxSize;

	var dataRestrictions = $dataActors[this.actorId()]._deckRestrictions;
	if (dataRestrictions && dataRestrictions.maxSize)
		maxSize = dataRestrictions.maxSize;

	return Number(maxSize);
}

Game_Actor.prototype.deckUnderMaxTypes = function (deck)
{
	var maxTypes = this.getMaxTypeRestrictions();

	for (var i = 0; i < maxTypes.length; i++)
	{
		var type = maxTypes[i].type;
		var amount = maxTypes[i].amount;
		if (deck.cardsOfType(type) > amount)
			return type;
	}

	return true;
}

Game_Actor.prototype.getMaxTypeRestrictions = function ()
{
	var maxTypes = [];
	var dataRestrictions = this.currentClass()._deckRestrictions;
	if (dataRestrictions && dataRestrictions.maxTypes)
		maxTypes = dataRestrictions.maxTypes;

	var dataRestrictions = $dataActors[this.actorId()]._deckRestrictions;
	if (dataRestrictions && dataRestrictions.maxTypes)
		maxTypes = dataRestrictions.maxTypes;
	return maxTypes;
}

Game_Actor.prototype.deckAboveMinSize = function (deck)
{
	var minSize = this.getMinDeckSize();

	return (deck.length >= minSize);
};

Game_Actor.prototype.getMinDeckSize = function ()
{
	var minSize = Myth.CGC.Deck.restrictions.minSize;

	var dataRestrictions = this.currentClass()._deckRestrictions;
	if (dataRestrictions && dataRestrictions.minSize)
		minSize = dataRestrictions.minSize;

	var dataRestrictions = $dataActors[this.actorId()]._deckRestrictions;
	if (dataRestrictions && dataRestrictions.minSize)
		minSize = dataRestrictions.minSize;

	return Number(minSize);
}

Game_Actor.prototype.deckOverMinTypes = function (deck)
{
	var minTypes = [];
	var dataRestrictions = this.currentClass()._deckRestrictions;
	if (dataRestrictions && dataRestrictions.minTypes)
		minTypes = dataRestrictions.minTypes;

	var dataRestrictions = $dataActors[this.actorId()]._deckRestrictions;
	if (dataRestrictions && dataRestrictions.minTypes)
		minTypes = dataRestrictions.minTypes;

	for (var i = 0; i < minTypes.length; i++)
	{
		var type = minTypes[i].type;
		var amount = minTypes[i].amount;
		if (deck.cardsOfType(type) <= amount)
			return type;
	}

	return true;
}

Game_Actor.prototype.deckUnderMaxCopies = function (deck)
{
	for (var i = 0; i < deck.length; i++)
	{
		var skillId = deck.card(i).id();
		var maxCopies = this.getCardMaxCopies(skillId);

		if (maxCopies == -1)
			continue;
		var amount = deck.amountOf(skillId);
		if (amount > maxCopies)
			return false;
	}

	return true;
};

Game_Actor.prototype.getCardMaxCopies = function (skillId)
{
	if (skillId == Myth.CGC.Deck.safetySkill) return -1;


	var skill = $dataSkills[skillId];
	var maxCopies = Myth.CGC.Deck.restrictions.maxCopies;
	if (skill._deckRestrictions && skill._deckRestrictions.maxCopies)
		maxCopies = skill._deckRestrictions.maxCopies;
	return maxCopies;
}

Game_Actor.prototype.hasAllCards = function (deck)
{
	for (var i = 0; i < deck.length; i++)
	{
		var card = deck.card(i);

		if (card.id() == Myth.CGC.Deck.safetySkill) continue;

		var amount = deck.amountOf(card.id());
		//console.log(amount, card.id());
		var library = this.getLibrary();
		var libraryAmount = library.amountOf(card.id());
		if (amount > libraryAmount)
		{
			return false;
		}
	}
	return true;
}

Game_Actor.prototype.hasDeckPoints = function (deck)
{
	if (Myth.CGC.Deck.usingDP == false) return true;

	var totalCost = deck.getDeckCost();

	return (totalCost <= this.deckPoints());
}

Game_Actor.prototype.hasSealedTypeCard = function (deck)
{
	var sealedTypes = this.getSealedCardTypes();

	for (var i = 0; i < sealedTypes.length; i++)
	{
		var type = sealedTypes[i];
		if (deck.cardsOfType(type) > 0)
			return type;
	}

	return false;
}

Game_Actor.prototype.getSealedCardTypes = function ()
{
	var dataSealedTypes = [];
	var dataRestrictions = this.currentClass()._deckRestrictions;
	if (dataRestrictions && dataRestrictions.sealedTypes)
		dataSealedTypes = dataRestrictions.sealedTypes;

	var dataRestrictions = $dataActors[this.actorId()]._deckRestrictions;
	if (dataRestrictions && dataRestrictions.sealedTypes)
		dataSealedTypes = dataRestrictions.sealedTypes;

	var sealedTypes = [];
	for (var i = 0; i < dataSealedTypes.length; i++)
	{
		var type = dataSealedTypes[i].type;
		var condition = dataSealedTypes[i].condition;
		var meetsCondition = false;

		try
		{
			meetsCondition = eval(condition);
		}
		catch (error)
		{
			console.error(error);
			console.error("Error in MYTH_CGC_DeckEditorCore Deck restriction for actor " + this.name() + " Sealing type " + type + ". Make sure your syntax is correct.");
			console.error(condition);
		}

		if (meetsCondition)
			sealedTypes.push(type);
	}

	return sealedTypes;
}

Game_Actor.prototype.evalDeckRestrictions = function (deck)
{
	var requirements = this.getDeckRequirements();
	var user = this;

	for (var i = 0; i < requirements.length; i++)
	{
		var success = false;
		try
		{
			success = eval(requirements[i]);
		}
		catch (error)
		{
			console.error(error);
			console.error("Error in MYTH_CGC_DeckEditorCore Deck restriction for actor " + this.name() + ". Make sure your syntax is correct.");
			console.error(requirements[i]);
		}
		if (!success) return i;
	}
	return true;
};

Game_Actor.prototype.evalCardRestrictions = function (deck)
{
	var user = this;


	for (var i = 0; i < deck.length; i++)
	{
		var card = deck.card(i);
		var dataSkill = $dataSkills[card.id()];
		if (dataSkill._deckRestrictions && dataSkill._deckRestrictions.requirements)
		{
			var requirements = dataSkill._deckRestrictions.requirements;
			for (var j = 0; j < requirements.length; j++)
			{
				var success = false;
				try
				{
					success = eval(requirements[j]);
				}
				catch (error)
				{
					console.error(error);
					console.error("Error in MYTH_CGC_DeckEditorCore Deck restriction for card " + dataSkill.name + ". Make sure your syntax is correct.");
					console.error(requirements[j]);
				}
				if (!success) return false;
			}
		}
	}

	return true;
}

Game_Actor.prototype.getDeckRequirements = function ()
{
	var requirements = [];
	var dataRestrictions = this.currentClass()._deckRestrictions;
	if (dataRestrictions && dataRestrictions.requirements)
		requirements = dataRestrictions.requirements;

	var dataRestrictions = $dataActors[this.actorId()]._deckRestrictions;
	if (dataRestrictions && dataRestrictions.requirements)
		requirements = dataRestrictions.requirements;

	return requirements;
}

Game_Actor.prototype.getRequireMessage = function (index)
{
	var messages = [];
	var dataRestrictions = this.currentClass()._deckRestrictions;
	if (dataRestrictions && dataRestrictions.requireMessages)
		messages = dataRestrictions.requireMessages;

	var dataRestrictions = $dataActors[this.actorId()]._deckRestrictions;
	if (dataRestrictions && dataRestrictions.requireMessages)
		messages = dataRestrictions.requireMessages;
	return messages[index];
}

Game_Actor.prototype.createDeck = function ()
{
	var presets = this.getDeckPresets();
	var len = presets.length + 1;
	var deck = new Game_Cards(this.name() + len);
	presets.push(deck);

	return deck;
};

Game_Actor.prototype.copyDeck = function (originalIndex)
{
	var presets = this.getDeckPresets();

	var originalDeck = presets[originalIndex];
	var newDeck = new Game_Cards(originalDeck.name + " 2");
	newDeck.copy(originalDeck);
	presets.splice(originalIndex + 1, 0, newDeck);
	if (this._deckPresetIndex > originalIndex)
		this._deckPresetIndex++;
};

Game_Actor.prototype.deleteDeck = function (deckIndex)
{
	var presets = this.getDeckPresets();
	if (this.canDeleteDeck(deckIndex))
	{
		presets.splice(deckIndex, 1);
		if (Myth.CGC.Deck.sharedLibrary && $gameParty.members().includes(this))
		{
			var party = $gameParty.members();
			for (var i = 0; i < party.length; i++)
			{
				var actor = party[i];
				if (actor._deckPresetIndex >= deckIndex)
					actor._deckPresetIndex--;
			}
		}
		else if (this._deckPresetIndex >= deckIndex)
			this._deckPresetIndex--;
	}
}

Game_Actor.prototype.canDeleteDeck = function (deckIndex, recursive)
{
	if (recursive == undefined && $gameParty.members().includes(this))
		recursive = true;
	if (deckIndex instanceof Game_Cards)
	{
		var presets = this.getDeckPresets();
		for (var i = 0; i < presets.length; i++)
		{
			if (deckIndex == presets[i])
			{
				deckIndex = i;
				break;
			}
		}
	}

	if (deckIndex == this._deckPresetIndex)
		return false;

	if (Myth.CGC.Deck.sharedLibrary && recursive)
	{
		var party = $gameParty.members();
		for (var i = 0; i < party.length; i++)
		{
			var actor = party[i];
			if (actor == this) continue;
			if (!actor.canDeleteDeck(deckIndex, false)) return false;
		}
	}

	
	return true;
}

Game_Actor.prototype.setMenuDeck = function (deckIndex)
{
	this._menuDeckIndex = deckIndex;
};

Game_Actor.prototype.menuDeck = function ()
{
	var presets = this.getDeckPresets();
	return presets[this._menuDeckIndex];
};

Game_Actor.prototype.deck = function ()
{
	var presets = this.getDeckPresets();
	return presets[this._deckPresetIndex];
};

Game_Actor.prototype.getUnusedCards = function ()
{
	var library = this.getLibrary();
	var deck = this.deck();
	var unusedCards = library._data.filter((card) => !deck._data.includes(card));
	return unusedCards;
}

Game_Actor.prototype.deckPoints = function ()
{
	var value = this.deckPointsBase() + this.deckPointsPlus();
	return Math.round(value);
};

Game_Actor.prototype.deckPointsBase = function ()
{
	var gainedPoints = (this._level - 1) * this._deckPointsOnLevel;
	return this._deckPointsStarting + gainedPoints;
}

Game_Actor.prototype.deckPointsPlus = function ()
{
	var value = this._deckPointsBonus;
	var equips = this.equips();
	for (var i = 0; i < equips.length; i++)
	{
		var item = equips[i];
		if (item && item._deckPointsBonus)
		{
			value += item._deckPointsBonus;
		}
	}

	return value;
}

Game_Actor.prototype.addDeckPoints = function (value)
{
	this._deckPointsBonus += value;
	//console.log(this._deckPointsBonus);
	this.refresh();
}


Game_Cards.prototype.sort = function ()
{
	this._data.sort((a, b) =>
	{
		return (a.id() - b.id());
	});

	return this;
}

Game_Cards.prototype.getDeckCost = function ()
{
	var totalCost = 0;
	for (var i = 0; i < this.length; i++)
	{
		var skillId = this._data[i].id();
		var dataSkill = $dataSkills[skillId];
		var cost = dataSkill._deckCost;
		if (cost == undefined)
			cost = 1;

		totalCost += cost;
	}

	return totalCost;
}






function Scene_DeckSelector()
{
	this.initialize.apply(this, arguments);
};

Scene_DeckSelector.prototype = Object.create(Scene_DeckEditor.prototype);
Scene_DeckSelector.prototype.constructor = Scene_DeckSelector;


Scene_DeckSelector.prototype.create = function ()
{
	Scene_ItemBase.prototype.create.call(this);
	this.createDeckStatusWindow();
	this.createActorWindow();
	this.createDeckCommandWindow();
	this.createDeckListWindow();
	this.createDeckSelectionWindow();
	this.createNameEditWindow();
	this.createNameInputWindow();
	this._editWindow.width = this._deckCommandWindow.width;
};

Scene_DeckSelector.prototype.createNameEditWindow = function ()
{
	var x = this._deckCommandWindow.x;
	var y = this._deckCommandWindow.y;
	var width = Graphics.boxWidth;;
	var height = this._deckCommandWindow.height;
	var rect = new Rectangle(x, y, width, height);
	this._editWindow = new Window_DeckNameEdit(rect, this._actor, Myth.CGC.Deck.maxNameLength);
	this.addWindow(this._editWindow);
	this._editWindow.hide();
}

Scene_DeckSelector.prototype.createNameInputWindow = function ()
{
	const rect = this.inputWindowRect();
	if (Myth.Util.usingMZ)
	{
		this._inputWindow = new Window_NameInput(rect);
		this._inputWindow.setEditWindow(this._editWindow);
	}
	else
	{
		this._inputWindow = new Window_NameInput(this._editWindow);
		this._inputWindow.x = rect.x;
		this._inputWindow.y = rect.y;
		this._inputWindow.width = rect.width;
		this._inputWindow.height = rect.height;
		this._inputWindow.refresh();
	}
	
	this._inputWindow.setHandler("ok", this.onNameInputOk.bind(this));
	this.addWindow(this._inputWindow);
	this._inputWindow.deactivate();
	this._inputWindow.hide();
};

Scene_DeckSelector.prototype.inputWindowRect = function ()
{
	var wx = this._deckSelectionWindow.x;
	var wy = this._deckSelectionWindow.y;
	var ww = this._deckSelectionWindow.width;
	var wh = this.calcWindowHeight(9, true);
	wy += (this._deckSelectionWindow.height - wh) / 2;
	return new Rectangle(wx, wy, ww, wh);
};

Scene_DeckSelector.prototype.calcWindowHeight = function (numLines, selectable)
{
	if (selectable)
	{
		return Window_Selectable.prototype.fittingHeight(numLines);
	} else
	{
		return Window_Base.prototype.fittingHeight(numLines);
	}
};

Scene_DeckSelector.prototype.onNameInputOk = function ()
{
	var name = this._editWindow.name();
	this._editWindow._deck.name = name;
	this._deckSelectionWindow.refresh();
	this._deckSelectionWindow.show();
	this._inputWindow.hide();
	this._editWindow.hide();
	this.onSelectionCancel();


}

Scene_DeckSelector.prototype.refreshActor = function ()
{
	//this.refreshDeck();
	const actor = this.actor();
	//this._cardTypeWindow.setActor(actor);
	this._actorWindow.setActor(actor);
	this._deckSelectionWindow.setActor(actor);
	this._deckListWindow.setActor(actor);
	this._deckStatusWindow.setActor(actor);
	
};

Scene_DeckSelector.prototype.refreshDeck = function ()
{
	const deck = this.currentDeck();
	//if (deck == null) return;
	this._deckListWindow.setDeck(deck);
	this._deckStatusWindow.setDeck(deck);
	this._deckStatusWindow.refresh();
	this._deckListWindow.refresh();
	if (this._editWindow)
	{
		this._editWindow.setDeck(deck);
		//this._editWindow.refresh();
	}
}

Scene_DeckSelector.prototype.currentDeck = function ()
{
	if (!this._deckSelectionWindow) return null;

	var index = this._deckSelectionWindow.index();
	if (index == -1) return null;

	var presets = Myth.CGC.Deck.sharedLibrary ? $gameParty._deckPresets : this.actor()._deckPresets;
	return presets[index];
}


Scene_DeckSelector.prototype.createDeckSelectionWindow = function ()
{
	var wx = 0;
	var wy = this._actorWindow.y + this._actorWindow.height;
	var ww = Graphics.boxWidth - this._deckListWindow.width;
	var wh = Graphics.boxHeight - wy;
	if (Myth.Util.usingMZ)
	{
		var rect = new Rectangle(wx, wy, ww, wh);
		this._deckSelectionWindow = new Window_DeckSelection(rect);
	}
	else
	{
		this._deckSelectionWindow = new Window_DeckSelection(wx, wy, ww, wh);
	}
	this._deckSelectionWindow.setHandler('ok', this.onSelectionOk.bind(this));
	this._deckSelectionWindow.setHandler('cancel', this.onSelectionCancel.bind(this));
	this.addWindow(this._deckSelectionWindow);
}

Scene_DeckSelector.prototype.createDeckCommandWindow = function ()
{
	var wx = 0;
	var wy = 0;
	var ww = Graphics.boxWidth / 2;
	var wh = this.calcWindowHeight(2, true);
	if (Myth.Util.usingMZ)
	{
		var rect = new Rectangle(wx, wy, ww, wh);
		rect.y += this.mainAreaTop();
		this._deckCommandWindow = new Window_DeckCommand(rect);
	}
	else
	{
		this._deckCommandWindow = new Window_DeckCommand(wx, wy);
	}
	this._deckCommandWindow.setHandler('cancel', this.onCommandCancel.bind(this));
	this._deckCommandWindow.setHandler('ok', this.onCommandOk.bind(this));
	this._deckCommandWindow.setHandler('new', this.onCommandNew.bind(this));


	this.addWindow(this._deckCommandWindow);
}

Scene_DeckSelector.prototype.onCommandCancel = function ()
{
	if (this._actor.canEquipDeck(this._actor.deck()))
	{
		this._actor.equipDeck(this._actor.deckPresetIndex());
		this.popScene();
	}
	else
	{
		if (this._popupWindow)
			this._popupWindow.open();
		else
		{
			this._popupWindow = new Window_WarningPopup(Myth.CGC.Deck.restrictionMessages.illegalEquipped);
			this._popupWindow.setHandler('ok', this.onPopupClose.bind(this));
			this.addWindow(this._popupWindow);
		}
		this._popupWindow.activate();
		//this._deckCommandWindow.activate();
	}
}

Scene_DeckSelector.prototype.onPopupClose = function ()
{
	this._popupWindow.close();
	this._deckCommandWindow.activate();
}

Scene_DeckSelector.prototype.onCommandOk = function ()
{
	this._deckSelectionWindow.activate();
	this._deckSelectionWindow.select(0);
	var symbol = this._deckCommandWindow.currentSymbol();
	this._deckSelectionWindow.setSelectionType(symbol);
	//SceneManager.push(Scene_DeckEditor);
};

Scene_DeckSelector.prototype.onCommandNew = function ()
{
	this._actor.createDeck();
	this._deckSelectionWindow.refresh();
	this._deckCommandWindow.activate();
}

Scene_DeckSelector.prototype.onCommandRename = function ()
{
	this._inputWindow.show();
	this._editWindow.show();
	this._inputWindow.activate();
	this._deckSelectionWindow.hide();
}

Scene_DeckSelector.prototype.onSelectionOk = function ()
{
	var sType = this._deckSelectionWindow._sType;
	var index = this._deckSelectionWindow.index();
	this._actor.setMenuDeck(index);
	switch (sType)
	{
		case 'equip':
			this._actor.equipDeck(index);
			this.onSelectionCancel();
			break;
		case 'edit':
			SceneManager.push(Scene_DeckEditor);
			break;
		case 'copy':
			this._actor.copyDeck(index);
			this.onSelectionCancel();
			break;
		case 'delete':
			this._actor.deleteDeck(index);
			this.onSelectionCancel();
			break;
		case 'rename':
			this.onCommandRename();
			break;
		default:
			this.onSelectionCancel();
	}

	this._deckSelectionWindow.refresh();
	
};

Scene_DeckSelector.prototype.onSelectionCancel = function ()
{
	this._deckCommandWindow.activate();
	this._deckSelectionWindow.deselect();
	//SceneManager.push(Scene_DeckEditor);
};

Scene_DeckSelector.prototype.getLibraryBackground = function ()
{
	return Myth.CGC.images.deckSelectorBackgroundImage;
}


function Window_DeckCommand()
{
	this.initialize.apply(this, arguments);
};

Window_DeckCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_DeckCommand.prototype.constructor = Window_DeckCommand;

Window_DeckCommand.prototype.makeCommandList = function ()
{
	this.addCommand("Equip", 'equip');
	this.addCommand("Edit", 'edit');
	this.addCommand("New", 'new');
	this.addCommand("Rename", 'rename');
	this.addCommand("Copy", 'copy');
	this.addCommand("Delete", 'delete');
};

Window_DeckCommand.prototype.windowWidth = function ()
{
	return Graphics.boxWidth / 2;
};

Window_DeckCommand.prototype.maxCols = function()
{
	return 3;
}

Window_DeckCommand.prototype.numVisibleRows = function()
{
	return 2;
}

function Window_DeckSelection()
{
	this.initialize.apply(this, arguments);
};

Window_DeckSelection.prototype = Object.create(Window_ItemList.prototype);
Window_DeckSelection.prototype.constructor = Window_DeckSelection;

Window_DeckSelection.prototype.makeItemList = function ()
{
	if (Myth.CGC.Deck.sharedLibrary)
	{
		this._data = $gameParty._deckPresets;
	}
	else if (this._actor)
	{
		this._data = this._actor._deckPresets;
	}
	else
	{
		this._data = [];
	}
};

Window_DeckSelection.prototype.maxCols = function ()
{
	return 1;
};

Window_DeckSelection.prototype.select = function (index)
{
	Window_ItemList.prototype.select.call(this, index);
	SceneManager._scene.refreshDeck();
};

// Re-adding MZ function to MV
if (!Myth.Util.usingMZ)
{
	Window_DeckSelection.prototype.itemAt = function (index)
	{
		return this._data && index >= 0 ? this._data[index] : null;
	};
}


Window_DeckSelection.prototype.drawItem = function (index)
{
	var deck = this.itemAt(index);
	if (!deck) return;

	var rect = Myth.Util.usingMZ ? this.itemLineRect(index) : this.itemRectForText(index);

	if (index == this._actor.deckPresetIndex())
	{
		var bitmap = ImageManager.loadSystem(Myth.CGC.Deck.images.equippedImage);
		if (!bitmap.isReady())
		{
			bitmap.addLoadListener(this.drawItem.bind(this, index));
		}
		var x = rect.x + Myth.CGC.Deck.coordinates.equippedX;
		var y = rect.y + Myth.CGC.Deck.coordinates.equippedY;
		this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y);
//		this.drawText("Equipped", rect.x, rect.y, rect.width, 'right');
	}

	var canEquip = this._actor.canEquipDeck(deck);
	var color = 'white';
	if (Myth.Util.usingMZ)
		color = canEquip ? ColorManager.normalColor() : ColorManager.deathColor();
	else
		color = canEquip ? this.normalColor() : this.deathColor();

	this.changeTextColor(color);
	this.drawText(deck.name, rect.x, rect.y, rect.width);

	if (!canEquip)
	{
		this.drawRestrictionMessages(index);
	}
	if (deck._locked)
	{
		var iconWidth = (Myth.Util.usingMZ ? ImageManager.iconWidth : Window_Base._iconWidth);
		this.drawIcon(Myth.CGC.Deck.immutableIcon , rect.width - iconWidth, rect.y);
	}

};

Window_DeckSelection.prototype.drawRestrictionMessages = function (index)
{
	var deck = this.itemAt(index);
	if (!deck) return;

	var messages = [];
	if (!this._actor.deckUnderMaxSize(deck))
		messages.push(Myth.CGC.Deck.restrictionMessages.maxSize);
	if (!this._actor.deckAboveMinSize(deck))
		messages.push(Myth.CGC.Deck.restrictionMessages.minSize);
	if (!this._actor.deckUnderMaxCopies(deck))
		messages.push(Myth.CGC.Deck.restrictionMessages.maxCopies);
	if (!this._actor.hasAllCards(deck))
		messages.push(Myth.CGC.Deck.restrictionMessages.missingCards);
	if (!this._actor.hasDeckPoints(deck))
		messages.push(Myth.CGC.Deck.restrictionMessages.notEnoughPoints);
	var type = this._actor.deckUnderMaxTypes(deck);
	if (type !== true)
	{
		var message = Myth.CGC.Deck.restrictionMessages.maxTypeSizeMessage;
		message = message.replace("%t", type);
		messages.push(message);
		//messages.push("Too many cards of type " + type);
	}
		
	var type = this._actor.deckOverMinTypes(deck);
	if (type !== true)
	{
		var message = Myth.CGC.Deck.restrictionMessages.minTypeSizeMessage;
		message = message.replace("%t", type);
		messages.push(message);
		//messages.push("Not enough cards of type " + type);
	}
	
	var type = this._actor.hasSealedTypeCard(deck);
	if (type !== false)
	{
		var message = Myth.CGC.Deck.restrictionMessages.sealedTypeMessage;
		message = message.replace("%t", type);
		messages.push(message);
		//messages.push("Contains sealed type " + type);
	}
		

	var evalIndex = this._actor.evalDeckRestrictions(deck);
	if (evalIndex !== true)
	{
		var message = this._actor.getRequireMessage(evalIndex);
		messages.push(message);
	}

	if (!this._actor.evalCardRestrictions(deck))
		messages.push(Myth.CGC.Deck.restrictionMessages.restrictedCardMessage);

	this.contents.fontSize = Myth.CGC.Deck.coordinates.errorFontSize;
	var rect = this.itemRect(index);
	for (var i = 0; i < messages.length; i++)
	{
		var yy = i * (this.contents.fontSize + 4);
		this.drawText(messages[i], rect.x, rect.y + yy - 4, rect.width - 6, 'right');
	}
	this.resetFontSettings();
}

Window_DeckSelection.prototype.setActor = function (actor)
{
	this._actor = actor;
	this.refresh();
};

Window_DeckSelection.prototype.itemHeight = function ()
{
	return this.lineHeight() * 2;
};

Window_DeckSelection.prototype.isEnabled = function (item)
{
	if (this._sType == 'edit')
		return item._locked != true;
	if (this._sType == 'equip')
		return this._actor.canEquipDeck(item);
	else if (this._sType == 'delete')
		return this._actor.canDeleteDeck(item);
	return true;
};

Window_DeckSelection.prototype.setSelectionType = function (sType)
{
	this._sType = sType;
};




function Window_DeckNameEdit()
{
	this.initialize.apply(this, arguments);
}

Window_DeckNameEdit.prototype = Object.create(Window_NameEdit.prototype);
Window_DeckNameEdit.prototype.constructor = Window_DeckNameEdit;

Window_DeckNameEdit.prototype.initialize = function (rect, actor, maxLength)
{
	if (Myth.Util.usingMZ)
	{
		Window_NameEdit.prototype.initialize.call(this, rect);
		this.setup(actor, maxLength);
	}
	else
	{
		Window_NameEdit.prototype.initialize.call(this, actor, maxLength);
		this.x = rect.x;
		this.y = rect.y;
		this.width = rect.width;
		this.height = rect.height;
	}
		

	this._deck = null;
};

Window_DeckNameEdit.prototype.setup = function (actor, maxLength)
{
	this._actor = actor;
	this._maxLength = maxLength;
	this._name = actor.name().slice(0, this._maxLength);
	this._index = this._name.length;
	this._defaultName = this._name;
};

Window_DeckNameEdit.prototype.setDeck = function (deck)
{
	this._deck = deck;
	if (!!deck)
		this._name = deck.name;
	else
		this._name = "";
	this._defaultName = this._name;
	this.restoreDefault();
};

Window_DeckNameEdit.prototype.faceWidth = function ()
{
	return 0;
};

Window_DeckNameEdit.prototype.drawActorFace = function ()
{
	return;
};

Window_DeckNameEdit.prototype.itemRect = function (index)
{
	const x = this.left() + index * this.charWidth();
	const y = this.height / 2 - this.lineHeight();
	const width = this.charWidth();
	const height = this.lineHeight();
	return new Rectangle(x, y, width, height);
};


function Window_WarningPopup()
{
	this.initialize.apply(this, arguments);
};

Window_WarningPopup.prototype = Object.create(Window_Selectable.prototype);
Window_WarningPopup.prototype.constructor = Window_WarningPopup;

Window_WarningPopup.prototype.initialize = function (message)
{
	//var bitmap = new Bitmap(100, 100);
	var width = 400;//bitmap.measureTextWidth(message) + this.standardPadding() * 2;
	//var textState = { index: 0, text: message };
	var height = 150;//this.calcTextHeight(textState, true) + this.standardPadding() * 2;
	var x = (Graphics.boxWidth - width) / 2;
	var y = (Graphics.boxHeight - height) / 2;

	if (Myth.Util.usingMZ)
	{
		var rect = new Rectangle(x, y, width, height);
		Window_Selectable.prototype.initialize.call(this, rect);
	}
	else
		Window_Selectable.prototype.initialize.call(this, x, y, width, height);

	this.openness = 0;
	this.open();
	this.drawTextEx(message, 0, 0);
}

if (Myth.Util.usingMZ)
{
	Window_WarningPopup.prototype.standardPadding = function ()
	{
		return $gameSystem.windowPadding();
	}
}


//Put this in CGC core next update.
Sprite_SkillCard.prototype.isTouchedInsideFrame = function ()
{
	var x = this.canvasToLocalX(TouchInput.x);
	var y = this.canvasToLocalY(TouchInput.y);
	var radiusX = this.bitmap.width / 2 * this.scale.x;
	var radiusY = this.bitmap.height / 2 * this.scale.y;
	return x >= -radiusX && y >= -radiusY && x < radiusX && y < radiusY;
};

Myth.CGC.Deck.Sprite_SkillCard_updateCardBack = Sprite_SkillCard.prototype.updateCardBack;
Sprite_SkillCard.prototype.updateCardBack = function ()
{
	if (this._skillId == 'deck')
	{
		this._cardback = Myth.CGC.deckErrorCardBack;
	}
	else
		Myth.CGC.Deck.Sprite_SkillCard_updateCardBack.call(this);

	return true;
}



Myth.CGC.Deck.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function ()
{
	if (!Myth.CGC.Deck.DataManager_isDatabaseLoaded.call(this)) return false;
	if (!Myth.loaded_CGC_Deck)
	{
		DataManager.processDeckRestrictionNotetags($dataClasses);
		DataManager.processDeckRestrictionNotetags($dataActors);

		//DataManager.processMaxCardNotetags($dataSkills);
		DataManager.processCardRestrictionNotetags($dataSkills);

		DataManager.processDeckCostNotetags($dataSkills);
		

		DataManager.processDeckPointNotetags($dataActors);
		DataManager.processDeckPointNotetags($dataClasses);

		DataManager.processDeckPointBonusNotetags($dataWeapons);
		DataManager.processDeckPointBonusNotetags($dataArmors);


		DataManager.processDeckStartingNotetags($dataActors);
		DataManager.processDeckStartingNotetags($dataClasses);

		Myth.CGC.Deck.loadSafetySkill();
		Myth.loaded_CGC_Deck = true;
	}

	return true;
};

DataManager.processDeckCostNotetags = function (group)
{
	for (var n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(/<deck cost:? ?(\d+)>/i))
			{
				var cost = Number(RegExp.$1);
				obj._deckCost = cost;
			}
		}
	}
};

DataManager.processDeckPointNotetags = function (group)
{
	for (var n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(/<starting deck points:? ?(\d+)>/i))
			{
				var value = Number(RegExp.$1);
				obj._deckPointsStarting = value;
			}
			else if (line.match(/<deck points on level:? ?(\d+)>/i))
			{
				var value = Number(RegExp.$1);
				obj._deckPointsOnLevel = value;
			}
		}
	}
}

DataManager.processDeckPointBonusNotetags = function (group)
{
	for (var n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (line.match(/<bonus deck points:? ?(\d+)>/i))
			{
				var value = Number(RegExp.$1);
				obj._deckPointsBonus = value;
			}
		}
	}
}

DataManager.processDeckStartingNotetags = function (group)
{
	var mode = '';
	var currentPreset = null;
	var presetIndex = 0;

	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];

			if (mode == 'deck')
			{
				if (line.match(/<\/decklist>/i))
				{
					mode = '';
				}
				else if (line.match(/immutable/i))
				{
					currentPreset._locked = true;
				}
				else if (line.match(/equip/i))
				{
					obj._deckPresetIndex = presetIndex;
				}
				else if (line.match(/(\d+)x skill (\d+)/i))
				{
					var amount = Number(RegExp.$1);
					var skillId = Number(RegExp.$2);

					for (var j = 0; j < amount; j++)
					{
						currentPreset.push(skillId);
					}
				}
				else if (line.match(/(\d+)x (.+)/i))
				{
					var amount = Number(RegExp.$1);
					var skill = Myth.Util.findSkillbyName(RegExp.$2);
					if (skill && skill.name != "")
					{
						for (var j = 0; j < amount; j++)
						{
							currentPreset.push(skill.id);
						}
					}
				}
			}
			else if (line.match(/<decklist:? (\w*)>/i))
			{
				mode = 'deck';
				if (obj._deckPresets == undefined)
					obj._deckPresets = [];

				var deckPreset = new Game_Cards(RegExp.$1);
				obj._deckPresets.push(deckPreset);
				currentPreset = deckPreset;
				presetIndex = obj._deckPresets.length - 1;
			}
		}
	}
};

DataManager.processCardRestrictionNotetags = function (group)
{
	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		var mode = '';

		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];
			if (mode == 'restrict')
			{
				if (line.match(/<\/deck \b(requirement|restriction)s?>/i))
				{
					mode = '';
				}
				if (line.match(/max ?copies:? (\d*)/i))
				{
					obj._deckRestrictions.maxCopies = Number(RegExp.$1);
				}
				else if (line.match(/require (.*)/i))
				{
					if (!obj._deckRestrictions.requirements)
						obj._deckRestrictions.requirements = [];

					obj._deckRestrictions.requirements.push(RegExp.$1);
				}
			}
			else if (line.match(/<max ?copies:? (\d*)>/i))
			{
				if (obj._deckRestrictions == undefined)
					obj._deckRestrictions = {};
				obj._deckRestrictions.maxCopies = Number(RegExp.$1);
			}
			else if (line.match(/<deck \b(requirement|restriction)s?>/i))
			{
				mode = 'restrict';
				if (obj._deckRestrictions == undefined)
					obj._deckRestrictions = {};
			}
		}
	}
}

DataManager.processDeckRestrictionNotetags = function (group)
{


	for (n = 1; n < group.length; n++)
	{
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		var mode = '';
		for (var i = 0; i < notedata.length; i++)
		{
			var line = notedata[i];

			if (mode == 'restrict')
			{
				if (line.match(/<\/deck \b(requirement|restriction)s?>/i))
				{
					mode = '';
				}
				else if (line.match(/min ?size:? (\d*)/i))
				{
					var amount = Number(RegExp.$1);
					obj._deckRestrictions.minSize = amount;
				}
				else if (line.match(/max ?size:? (\d*)/i))
				{
					var amount = Number(RegExp.$1);
					obj._deckRestrictions.maxSize = amount;
				}
				else if (line.match(/max ?copies:? (\d*)/i))
				{
					var amount = Number(RegExp.$1);
					obj._deckRestrictions.maxCopies = amount;
				}
				else if (line.match(/min type (.+): (\d+)/i))
				{
					var type = RegExp.$1;
					var amount = Number(RegExp.$2);
					if (obj._deckRestrictions.minTypes == undefined)
						obj._deckRestrictions.minTypes = [];
					obj._deckRestrictions.minTypes.push({ type: type, amount: amount });
				}
				else if (line.match(/max type (.+): (\d+)/i))
				{
					var type = RegExp.$1;
					var amount = Number(RegExp.$2);
					if (obj._deckRestrictions.maxTypes == undefined)
						obj._deckRestrictions.maxTypes = [];
					obj._deckRestrictions.maxTypes.push({ type: type, amount: amount });
				}
				else if (line.match(/seal type (.+) if (.+)/i))
				{
					var type = RegExp.$1;
					var condition = RegExp.$2;
					if (obj._deckRestrictions.sealedTypes == undefined)
						obj._deckRestrictions.sealedTypes = [];
					obj._deckRestrictions.sealedTypes.push({ type: type, condition: condition });
				}
				else if (line.match(/seal type (.+)/i))
				{
					var type = RegExp.$1;
					if (obj._deckRestrictions.sealedTypes == undefined)
						obj._deckRestrictions.sealedTypes = [];
					obj._deckRestrictions.sealedTypes.push({ type: type, condition: true });
				}
				else if (line.match(/require (.*)/i))
				{
					if (!obj._deckRestrictions.requirements)
						obj._deckRestrictions.requirements = [];

					obj._deckRestrictions.requirements.push(RegExp.$1);
				}
				else if (line.match(/requirement message:? ?(.*)/i))
				{
					if (!obj._deckRestrictions.requireMessages)
						obj._deckRestrictions.requireMessages = [];

					obj._deckRestrictions.requireMessages.push(RegExp.$1);
				}
			}
			else if (line.match(/<deck \b(requirement|restriction)s?>/i))
			{
				mode = 'restrict';
				if (obj._deckRestrictions == undefined)
					obj._deckRestrictions = {};
			}
		}
	}
};

