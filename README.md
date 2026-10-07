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
