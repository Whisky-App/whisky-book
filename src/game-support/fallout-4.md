# Fallout 4

{{#template ../templates/rating.md status=Silver date=04/25/24 installs=Yes opens=Yes}}

The recent Next Gen update now allows the game to launch with audio enabled.

### Voices and Music Fix

Add all of the following libraries to the `Wine Configuration` panel.

`x3audio1_6`
`x3audio1_7`
`xaudio2_6`
`xaudio2_7`

Adjust your output speaker format in Audio MIDI Setup to reduce popping audio i.e. `48,000hz`

### Mouse Fix

Add `bBackgroundMouse=1` perferably under `[Controls]` to Fallout4.ini in `(Your Bottle)/users/crossover/Documents/My Games/Fallout4/`

### Dismemberment Crash
Change `bDisableAllGore=1` to equal 0. This removes blood, including severing limbs. Mods can be installed to just remove dismemberment if you wish.



{{#template ../templates/steam.md id=377160}}
