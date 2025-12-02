# Ghostly Kiro Desktop Assistant

This directory contains the core configuration, source, and assets for the Ghostly desktop coding assistant, supercharged for the Kiroween hackathon.

## Quickstart

1. **Install dependencies**

   ```bash
   cd Kiro
   npm install
   ```

2. **Run the assistant**

   ```bash
   npm start
   ```

- Requires [Electron](https://www.electronjs.org/) and Node 18+ to be installed
- Your Ghost assistant will appear as a floating character on the desktop, offering relevant coding suggestions and commands based on what you’re working on

## Files and Structure

- `kiro.yaml` & `personality.kiro.md` - Configure how agents (and Ghostly's style) interact with users
- `src/` - Electron app source code and context tooling
- `assets/` - Place your ghost.png or other art here!

## Development

Ghostly agents use context (active window, file, etc) to trigger helpful suggestions. Adjust `kiro.yaml` and the MCP tools in `src/` for more behaviors!

Happy Hacking! 👻