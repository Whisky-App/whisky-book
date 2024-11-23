# Little Big Adventure – Twinsen’s Quest
<!-- script:Aliases [] -->

{{#template ../templates/rating.md status=Bronze installs=Yes opens=Yes}}

Game crashes when run without modification.

Patching `LittleBigAdventureTwinsensQuest/LittleBigAdventureTwinsensQuest_Data/Plugins/x86_64/Rewired_WindowsGamingInput.dll` makes the game run, although some issues surrounding use of controllers remain.

The function `Core_IsAPISupported` in the aforementioned DLL needs to be patched to always return false. This prevents calling an API that isn't implemented.

For the DLL with SHA256 `946478c5e8f61cbe75c6d70e3aabe2766126605cba45ddb579a5ef38fb198e98` three bytes at offset 0x600 need to be changed to `b0 00 c3`. The resulting file should have a SHA256 of `954fa6b2960b2567797f061ec11131d026c1c640e5dfb8e9d4d2bae593151d36`

