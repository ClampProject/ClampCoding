<script>
    import { activeModals } from '#lib/stores.js';

    import NavigationOption from "#lib/NavigationBar/NavigationOption.svelte";
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<div>
    <img
        src="/images/icon.png"
        alt="Clamp Logo"
        class="logo-margin"
        style="height: 100%;"
    />
    <img
        src="/images/code.png"
        alt="Clamp Coding Logo"
        class="logo-margin"
        style="height: 100%;"
    />
    {@render children?.()}

    <NavigationOption
        name="Settings"
        icon="/images/gui-icons/cog-icon.png"
        on:click={() => {
            $activeModals.settings = !$activeModals.settings
        }}
    />
    <a
        href="/credits"
        target="_blank"
        class="link-option"
    >
        <NavigationOption
            name="Credits"
            icon="/images/gui-icons/information-icon.png"
        />
    </a>
</div>

<style>
    div {
        width: 100%;
        height: 3.25rem;
        /* overflow: hidden; */

        z-index: 100;
        padding: 4px;

        position: fixed;
        left: 0px;
        top: 0px;

        display: flex;
        flex-direction: row;
        align-items: center;

        background: #363636;
    }

    .logo-margin {
        margin-right: 8px;
    }
    .link-option {
        height: 100%;
        text-decoration: none;
        margin-left: 6px;
    }
</style>
