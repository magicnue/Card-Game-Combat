Title: card-overview \[Card Game Combat - Documentation\]

Keywords: card-overview   

card-overview

### Table of Contents

*   What is in a Card?

*   Anatomy of a Card

*   Card Customization

*   Card Art

*   Card Bases

*   Bases & Card Types

What is in a Card?
==================

Anatomy of a Card
-----------------

Each Card is composed of a number of layers of Bitmaps which are drawn to screen in the following sequence:

<table><tbody><tr><td><strong>Card Base</strong></td><td>Serves as the bottom-most layer which is used to determine the Card's shape and background. You can provide images of any dimensions to make up the Card Base, however, keep in mind how much screen space the Hand has in your game.</td></tr><tr><td><strong>Card Art</strong></td><td>Layer drawn on top of Card Base. This can be used for the image illustrating the Card. You can provide images of any dimensions to make up the Card Art, however, it will try to center itself on the Card Base by default so you may need to use plugin parameters to offset its position.</td></tr><tr><td><strong>Card Text</strong></td><td>Layer drawn on top of Card Art. This is where the text for the Skill Name, Skill Cost and Description Text is written. They will be in the default font of your RPG Maker Project. Each Text Item has their own plugin parameters which let you offset its position.</td></tr><tr><td><strong>Card Highlight</strong></td><td>Layer used by Playable, Discard and Remove Highlight borders that overlay a Card. Images for each can be specified in plugin parameters. Make sure the Highlights at least match the dimensions of the Card Base, otherwise Cards may look odd in Hand.</td></tr></tbody></table>

Card Customization
------------------

The following parameters give you control over the appearance of your cards:

| Parameter | Description |
| --- | --- |
| **Card Name Coordinates** | These parameters set the coordinates for the card/skill name. The top-left of the card is position 0,0. |
| **Skill Cost Coordinates** | These parameters set the coordinates for the card/skill description. The top-left of the card is position 0,0. |
| **Cost Width** | The Cost is right-aligned by default, so the Width determines how much horizontal space is dedicated to the cost text. |
| **Card Description Coordinates** | These parameters set the coordinates for the card/skill description. The top-left of the card is position 0,0. |
| **Highlight Sheet** | This is the name of an image sheet for sprites that appear when cards can be selected. They appear on top of the card itself. The sheet should consist of 3 images placed horizontally:  
\- The Enabled Highlight: used when a card can be selected for play.  
\- The Discard Highlight: used when a card can be selected for discard or moving between zones.  
\- The Remove Highlight: used when a card can be selected for removal.  

The sheet should be in img/CGC/highlights. |
| **Removal Animation** | The preprogrammed animation used for cards that are being removed from play. There are currently 2 animations:  

Fade - This will cause the card to rise in the air and fade out before disappearing.  
Burn - This will cause the card to slowly disappear from the bottom up. |
| **Smooth Scaling** | Determines whether smoothing is applied when scaling cards up or down. If this is set to false, scaled cards will appear pixelated, which may be desired if your game has a pixel art style. |

If you are using Text Format Plus, you have additional options for Card Customization. Each individual text component - Name, Description, Cost, and Type - has the following parameters:

| Parameter | Description |
| --- | --- |
| **Display Component** | A boolean determining if the given text component is drawn on the card. |
| **Font Size** | The font size of the given text component. |
| **Font Face** | The font of the given text component. Fonts must either all be in .ttf format or all be in .woff format. |
| **Text Style/Text Style Value** | See Text Style. |
| **Max Text Width** | Used for word-wrap and text alignment. Use 0 to set automatically, and -1 to disable word-wrap. |
| **Line Spacing** | The amount of pixels of space between multiple lines of text, if applicable. 0 to set automatically. |
| **Text Alignment** | Whether the text will be left-aligned, right-aligned, or centered within the space given to it. |

Card Art
--------

By default, each card will use their Skill Icon as their card art. This icon will be scaled up to match the width of the card.

You can instead use notetags to supply a piece of art for each card:

<Card Art: file\_name>

The plugin will use the image with the supplied file name inside the img/CGC/art folder. This image will not be centered - it will be drawn from starting the top-left corner of the card.

Card Bases
----------

Cards will use the Default Card Base image by default - the image found in your project's directory at img/CGC/bases/Default.png. However, just like with card art, you can use a plugin command to change the image of that skill’s card base:

<Card Base: file\_name>

The plugin will use the image with the supplied file name inside img/CGC/bases.

### Bases & Card Types

If you are using Card Types Plugin, it has a feature where cards of the same card type may all use a different card base from the Default Card Base. The <Card Base> notetag will override this behavior.

Priority goes like this:

1.  <Card Base>

2.  If no <Card Base> notetag, use the base associated with the card’s first Card Type.

3.  If the card has no type, or that type does not have a base associated with it, use the Default Card Base.

Note that only the first type supplied in the skill’s notetags will affect the card’s base.

card-overview.txt · Last modified: 2024/11/30 12:57 by banerjeesw