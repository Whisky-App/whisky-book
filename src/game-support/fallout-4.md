# Fallout 4

{{#template ../templates/rating.md status=Silver date=25/04/24 installs=Yes opens=Yes}}

The recent Next Gen update now allows the game to launch with audio enabled.

## Voices and Music Fix

- Add all of the following libraries to the `Wine Configuration` panel.
  - `x3audio1_6`
  - `x3audio1_7`
  - `xaudio2_6`
  - `xaudio2_7`
- Adjust your output speaker format in Audio MIDI Setup to reduce popping audio i.e. `48,000hz`

## Mouse Fix
- Add `bBackgroundMouse=1` under `[Controls]` in `<Your Bottle>/users/crossover/Documents/My Games/Fallout4/Fallout4.ini`

## Dismemberment Crash
- Set `bDisableAllGore` under `[General]` to `bDisableAllGore=1` in the `.ini` file found above.

> [!NOTE]
> This will remove gore, including severing limbs. Mods can be installed to remove dismemberment if you wish.

{{#template ../templates/steam.md id=377160}}
