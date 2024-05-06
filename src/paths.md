# What's Where?

Whisky installs files to the following locations:

| Item      | Location                                                           |
|-----------|--------------------------------------------------------------------|
| GPTK      | `~/Library/Application Support/com.isaacmarovitz.Whisky/Libraries` |
| Bottles   | `~/Library/Containers/com.isaacmarovitz.Whisky/Bottles`            |
| Logs      | `~/Library/Logs/com.isaacmarovitz.Whisky`                          |
| WhiskyCmd | `/usr/local/bin/whisky`                                            |

Note that you may need to press `⌘ + Shift + .` to view hidden files, and that `com.isaacmarovitz.Whisky` may show up as a folder simply titled `Whisky`.

# Uninstalling Whisky

If you're looking to do a complete uninstall, remove the following files and folders:
- `~/Library/Application Support/com.isaacmarovitz.Whisky`
- `~/Library/Containers/com.isaacmarovitz.Whisky`
- `~/Library/Logs/com.isaacmarovitz.Whisky`
- `/usr/local/bin/whisky` (if it exists)
- `/Applications/Whisky.app` (or wherever you have it installed)

> [!NOTE]
> This will not delete any bottles that have been created outside the default folder.
> Make sure you delete those in app by `Right Clicking > Remove...` and selecting `Delete files from disk`.
> If you forget to do this before deleting Whisky, or some of your bottles have become orphaned,
> you can remove them manually in Finder.