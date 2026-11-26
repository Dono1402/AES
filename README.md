# AES

Custom trader and quest mod for SPT, featuring Anastasia, Evelyn and Svetlana.

## Repository contents

- `AddTraderWithAssortJson.cs`: mod metadata, trader registration, assortments and WTT quest integration.
- `AddCustomTraderHelper.cs`: trader database and localization helpers.
- `db/`: trader data, quest definitions, images and translated game text.

The current repository metadata declares AES **0.7.9** for SPT **~4.0.0**. It uses **WTT-CommonLib**; VCQL is no longer required by the C# rewrite. This historical branch is distinct from the newer local SPT 4.1.3 port.

## Installation

Use the [published releases](https://github.com/Dono1402/AES/releases) and match the package to your SPT version. Keep the packaged `db/` resources with the mod. Release compatibility is version-specific.

## Source and language

Technical documentation, identifiers and comments use English. Language-specific quest and game localization files intentionally retain their respective languages. Do not replace localization data with English-only text.

This repository contains source files and resources, but no versioned `.csproj` or complete build environment; it does not provide a reproducible standalone build command. Adding documentation does not rebuild or republish a mod package.

## Unofficial SPT 4.1.6 port (branch `spt-4.1.6-port`)

> **This is an unofficial fork.** It is not made or supported by the AES author.
> Please report bugs in this port **here, in this fork's issue tracker**, not to Dono1402.

AES is made by **Dono1402** (credited in the mod as Flowless, with contributor Colobos9mm). All
traders, quests, images, texts and data are their work. This branch only brings AES 0.7.9 up to
date with the current SPT version so that people can keep playing it while the author reviews the
changes. The author has said they are open to forks. Every change is a separate commit so the
author can review, cherry-pick or ignore each one.

### Requirements

- **SPT 4.1.6 + WTT CommonLib 3.0.x** (3.0.6 or newer; tested with 3.0.8).
- This build does not work on SPT 4.0.x. For SPT 4.0, use the author's official 0.7.9 release.

### Install

Extract the release zip into your SPT folder, so that the mod ends up in
`SPT_Runtime/user/mods/AES/` (`AES.dll` plus the `db` folder). If an older AES is installed,
delete its `user/mods/AES` folder first. Uninstall by deleting that folder. The trader ids, quest
ids and mod id (`com.dono.aes`) are unchanged, so existing AES progress should carry over.

### Build

`dotnet build -c Release` (needs the .NET 10 SDK; the SPT and WTT packages come from NuGet).
Copy `bin/Release/net10.0/AES.dll` and the `db` folder into `SPT_Runtime/user/mods/AES/`.

### What changed and why (one commit each)

1. **Port to the SPT 4.1 server API.** SPT 4.1 renamed or replaced several APIs that AES uses,
   so the 4.0 build does not load. Changes are kept small, and the original comments are kept:
   - `AbstractModMetadata` became `IModMetadata`, `IsBundleMod` was removed, and `SptVersion` is
     now `~4.1`;
   - `OnLoad()` became `OnLoadAsync(CancellationToken)`;
   - the load order moved from `PostDBModLoader + 1` to `Preload + 2`, because 4.1 expects mods
     that add traders and quests to run there;
   - configs are injected directly instead of through `ConfigServer`;
   - `DatabaseService.GetTables()` became the injected `TradersTable` / `LocaleTable`, and a few
     namespaces moved;
   - added `AES.csproj` (the repo had none) and a `.gitignore`.
2. **Require WTT-CommonLib 3.0.x.** WTT-CommonLib 3 is the SPT 4.1 line. Its
   `CreateCustomQuests` is now async, so it is awaited. The dependency is now declared in the mod
   metadata, so a missing WTT-CommonLib gives a clear message instead of a startup error.
3. **Match the 0.7.9 release.** Commit `44635a0` on `main` put the corrected German locale for
   Anastasia's quests into Evelyn's folder. So on `main`, Anastasia's German fix is missing and
   Evelyn's German quest text is overwritten. This commit makes both files identical to the
   official 0.7.9 release zip.
4. **Fix three quest-data errors** found by an audit of all loaded quests:
   - three `VisitPlace` counters had the string `"1"` instead of the number `1` ("The West -
     Part 2", and "Geared up for the terrain" ×2);
   - the typo key `avaibleAfter` in "The Little Crew";
   - a duplicated sub-condition id in "Black Friday !".

Not changed: in most languages other than English, German and Portuguese, the text for "Eliminate
50 Scavs using silenced weapons" (Anastasia) is keyed to the sub-condition id
`677fdcd3a3054df6291548b7` rather than the condition id `677fdcd3211d313738bc4406`. That text
probably does not show in those languages. It is left for the author to decide.

### Status

A local build with the same changes was tested server-side on SPT 4.1.6: the mod loads, all 3
traders appear, and the quests are visible. A full playthrough of every quest has not been done.

Port made using Claude

### License

The mod metadata (`ModMetadata.License`) declares **MIT**, but the repository has no LICENSE
file. This fork keeps the author's metadata unchanged and does not add a license of its own.
All rights to AES stay with its author.
