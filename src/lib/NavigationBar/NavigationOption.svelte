<script>
    import { createEventDispatcher } from "svelte";
    import { playSound } from "../../resources/editor/sounds";
  
    const dispatch = createEventDispatcher();

  /** @type {{icon?: string, name?: string, style?: string, children?: import('svelte').Snippet}} */
  let {
    icon = "",
    name = "",
    style = "",
    children
  } = $props();

    function event() {
        playSound("tabswitch");
        dispatch("click");
    }
</script>

<button {style} onclick={event}>
    {@render children?.()}
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
</style>
