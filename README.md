# Ghostly
Ghostly is a cute, helpful ghost that lives on your desktop. But it's not like the old assistants. Ghostly is powered by a real AI brain (using Kiro's MCP) and can actually help you with your tasks. It's a friendly spirit, a helpful haunt for your computer, that pops up only when you truly need it.
# 👻 Ghostly: Your Helpful, Haunting Desktop Assistant

**Kiroween Hackathon 2024 | Category: Resurrection**

**Ghostly** brings back the spirit of the classic desktop assistant (rest in peace, Clippy) and resurrects it with the magic of modern AI! Using **Kiro's Agent Hooks, MCP, and Steering Docs**, Ghostly is a helpful little ghoul that watches what you do and offers spooky-smart help right when you need it.

![Alt tex](path/to/your/image.png] (ghostly.jpg)
*(Imagine a cute ghost popping up with a code snippet!)*

---

## 🎃 What is Ghostly?

Remember the old paperclip that used to pop up and say "It looks like you're writing a letter"? Ghostly is its 21st-century, less-annoying, way-more-helpful spectral successor.

It's a desktop app that:
*   **Lives in the background:** It's only there when you summon it.
*   **Watches your context:** It knows if you're in your code editor or your browser.
*   **Offers help:** It can suggest code, find information, or just provide a spooky comment based on what you're doing.

## 🪄 The Magic Behind the Ghost (How It Works)

Ghostly is powered by Kiro! Think of it like a magic spellbook with three main parts:

1.  **Kiro MCP (Model Context Protocol):** These are the ghost's "eyes," letting it see what you're doing (e.g., the name of the application you're using or the code you've just typed).
2.  **Kiro Agent Hooks:** These are the "magic tripwires." When a condition is met (like you typing `npm install`), the hook triggers the ghost to appear.
3.  **Kiro Steering Docs (`personality.kiro.md`):** This is the ghost's "rulebook." It tells the AI how to act, ensuring it's always helpful, a little spooky, and never gets out of line.


```mermaid
graph TD
    A[You type 'git commit -m'] --> B{Kiro Agent Hook detects Git command};
    B --> C[Hook triggers the Ghost Agent];
    C --> D[Agent calls MCP for Context];
    D --> E[MCP gets window title & recent text];
    E --> F[Agent sends Context + Request to AI];
    G[AI reads Steering Personality Doc];
    F --> G;
    G --> H[AI generates a spooky suggestion];
    H --> I[Ghostly pops up on your screen!];
