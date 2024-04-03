# WhiskyCmd

WhiskyCmd is an optional CLI tool that allows you to list, create, and delete bottles,
as well as run programs directly from the command line.
This can be helpful if you're trying to automate certain tasks in Whisky,
or want to use Whisky bottles from another app.

## Installation

WhiskyCmd can be installed through the app by clicking `Whisky > Install Whisky CLI...`.
This will create a symlink between `/Applications/Whisky.app/Contents/Resources/WhiskyCmd` and `/usr/local/bin/whisky`.
When you update the main Whisky app, the CLI tool will automatically link to the updated binary.

## Running Commands

After installing WhiskyCmd, it will be available on PATH. In a new terminal session,
verify that the installation is working by typing `whisky`, you should see the following or similar output:

```shell
$ whisky

OVERVIEW: A CLI interface for Whisky.

USAGE: whisky <subcommand>

OPTIONS:
  -h, --help              Show help information.

SUBCOMMANDS:
  list                    List existing bottles.
  create                  Create a new bottle.
  add                     Add an existing bottle.
  delete                  Delete an existing bottle from disk.
  remove                  Remove an existing bottle from Whisky.
  run                     Run a program with Whisky.

  See 'whisky help <subcommand>' for detailed help.
```

## List

List takes no arguments, and returns an ASCII table of all bottles registered to `BottleVM.plist`,
located at `~/Library/Containers/com.isaacmarovitz.Whisky/BottleVM.plist`.

**Example Output:**

```shell
$ whisky list

+-------+-----------------+--------------------------------------------------------------------------+
| Name  | Windows Version | Path                                                                     |
+-------+-----------------+--------------------------------------------------------------------------+
| Steam | Windows 10      | ~/Library/Containers/Whisky/Bottles/72DC05EA-4D0C-47E5-8A16-9A5DAE62A118 |
+-------+-----------------+--------------------------------------------------------------------------+
```

## Create

Create takes a name for a new bottle to be made at your default bottle creation directory,
as specified in the UI. It is currently not possible to specify a desired Windows version,
it will always default to Windows 10.

> [!CAUTION]
> This command currently does not actually initialise the bottle with Wine.
> This will be resolved in a future version of WhiskyCmd.

```shell
$ whisky create Example

Created new bottle "Example".
```

## Add

Takes a path to an existing `Metadata.plist` and adds it to your `BottleVM.plist`.

> [!CAUTION]
> This path is not sanitised as a valid Whisky bottle.
> Specifying the wrong path may have unintended consequences.

```shell
$ whisky add ~/Library/Containers/Whisky/Bottles/Example/Metadata.plist

Bottle "Example" added.
```