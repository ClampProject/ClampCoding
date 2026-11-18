<script>
    import { playSound } from "../../resources/editor/sounds";

    /** @type {{icon?: string, name?: string, style?: string, children?: import('svelte').Snippet}} */
    let {
        icon = "",
        name = "",
        style = "",
        children
    } = $props();

    let showingMenu = $state(false);
    const toggleMenu = () => {
        showingMenu = !showingMenu;
        playSound('tabswitch');
    };
</script>

<button {style} onclick={toggleMenu}>
    {#if icon}
        <img
            alt={name}
            src={icon}
            width="16"
            style="margin-left:6px;margin-right:6px;"
        />
    {/if}
    {#if name}
        <span style="margin-right:6px;">{name}</span>
    {/if}

    {#if showingMenu}
        <div class="dialog-menu">
            {@render children?.()}
        </div>
    {/if}
</button>

<style>
    button {
        position: relative;

        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;

        color: white;
        font-size: 18px;
        background: transparent;
        cursor: pointer;
        border: 0;
    }
    button:focus,
    button:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    button:active {
        background: rgba(255, 255, 255, 0.3);
    }

    .dialog-menu {
        position: absolute;
        left: 0px;
        top: 100%;

        background: #222;
        border: 4px solid white;
        padding: 2px;

        z-index: 10000;
    }
</style>
