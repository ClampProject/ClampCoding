<script>
    import MarkdownIt from "markdown-it";

    import { activeModals } from '$lib/stores.js';
    import { browser } from '$app/environment';
    import '../../styles/library.css';

    import { playSound } from '../../resources/editor/sounds';
    import { createEventObject } from '../../resources/editor/create-event-object';
    import SettingsUI from '../../resources/editor/settings-api';
    SettingsUI.initialize();

    import exposeWindow from '../../resources/exposeWindow';
    import SettingsInputType from '../../resources/enums/settings-input-types';
    import SettingsRestrictionType from '../../resources/enums/settings-restriction-types';
    
    let libraryContent = $state([]);
    const createLibrarySections = () => {
        libraryContent = [];

        for (const sectionSet of Object.values(SettingsUI._registeredSections)) {
            libraryContent.push(sectionSet);
        }
    };

    // editor.saveSetting("customEditorFont", "font", fontName);
    // should result in
    // localStorage.getItem('clamp:native-setting.customEditorFont.font');
    const saveSetting = (basePath, ...extraParams) => {
        SettingsUI.saveSetting(currentSectionPrefix, basePath, ...extraParams);
    };
    const eventObject = createEventObject({
        getSetting: SettingsUI.getSetting,
        saveSetting,
    });

    let currentSection = $state([]);
    let currentSectionPrefix = 'undefined';
    let selectedSection = $state('project');
    const loadedInputs = $state({});
    activeModals.subscribe((newModals) => {
        if (newModals.settings) {
            createLibrarySections();
            selectSection(selectedSection);
        }
    });
    const attachEvents = () => {
        for (const inputId in loadedInputs) {
            const input = loadedInputs[inputId];
            if (!input) delete loadedInputs[inputId];
        }

        console.log(loadedInputs);
        // find the associated events for this input
        for (const inputId in loadedInputs) {
            const input = loadedInputs[inputId];
            const idSplit = inputId.split('.');

            const optionId = idSplit[0];
            const realInputId = idSplit[1];

            const config = currentSection.find(option => option.id === optionId);
            if (!config) continue;
            const inputConfig = config.inputs.find(input => input.id === realInputId);
            if (!inputConfig) continue;
            if (!inputConfig.listeners) {
                // set a default event of just saving to localstorage
                input.onchange = (event) => {
                    const targetValue = inputConfig.type === SettingsInputType.CHECKBOX ?
                        event.target.checked : event.target.value;
                    saveSetting(optionId, realInputId, targetValue);
                };
                continue;
            }

            for (const eventName in inputConfig.listeners) {
                input[eventName] = (event) => {
                    const listener = inputConfig.listeners[eventName];
                    listener(eventObject, event);
                };
            }
        }
    };
    const loadSection = (sectionId) => {
        // find which section set has this section ID
        let targetSection = null;
        let sectionPrefix = 'undefined';
        for (const sectionSet of libraryContent) {
            const _targetSection = sectionSet.sections[sectionId];
            if (_targetSection) {
                targetSection = _targetSection;
                sectionPrefix = sectionSet.id;
                break;
            }
        }
        currentSectionPrefix = sectionPrefix;
        if (!targetSection) {
            currentSection = [];
            return;
        }

        // create an array of just the options here
        const options = [];
        for (const optionId in targetSection.options) {
            const option = targetSection.options[optionId];
            options.push(option);
        }

        console.log(options);
        currentSection = options;
    };
    const selectSection = (sectionId) => {
        selectedSection = sectionId;
        console.log('load settings section', sectionId)
        loadSection(selectedSection);

        setTimeout(() => {
            attachEvents(currentSectionPrefix);
        });
    };

    const getInputValue = (inputValue, optionId, inputId) => {
        if (typeof inputValue === 'function') {
            return inputValue(eventObject);
        }

        const path = [currentSectionPrefix, optionId, inputId];
        const key = path.join('.');
        const value = SettingsUI.getSetting(key);

        return value ?? inputValue;
    }
    
    const md = new MarkdownIt({
        html: false,
        linkify: false,
        breaks: true,
    });
    const env = {};
    const generateMarkdown = (mdtext) => {
        const tokens = md.parse(mdtext, env);
        const bodyHTML = md.renderer.render(tokens, md.options, env);
        return bodyHTML;
    };

    if (browser) {
        exposeWindow({
            SettingsUI,
            SettingsInputType,
            SettingsRestrictionType,
        }, false);
    }
</script>

{#if $activeModals.settings}
    <div class="library">
        <div class="library-title">
            <h1>Settings</h1>
        </div>
        <div class="library-contents-w">
            <div class="settings-sections">
                {#each libraryContent as sectionSet}
                    {#each Object.values(sectionSet.sections) as section}
                        <button
                            data-id={section.id}
                            data-selected={selectedSection === section.id}
                            onclick={() => {
                                playSound("tabswitch");
                                selectSection(section.id);
                            }}
                        >
                            {section.section}
                        </button>
                    {/each}
                {/each}
            </div>
            <div class="settings-options">
                {#each currentSection as option}
                    <label>
                        <div>
                            <h2>{option.name}</h2>
                            <p>{@html generateMarkdown(option.description)}</p>
                        </div>

                        {#each option.inputs as input}
                            {#if input.type === SettingsInputType.CHECKBOX}
                                <input
                                    type="checkbox"
                                    checked={getInputValue(input.value, option.id, input.id)}
                                    bind:this={loadedInputs[`${option.id}.${input.id}`]}
                                >
                            {:else if input.type === SettingsInputType.TEXTLINE}
                                <input
                                    type="text"
                                    value={getInputValue(input.value, option.id, input.id)}
                                    bind:this={loadedInputs[`${option.id}.${input.id}`]}
                                >
                            {/if}
                        {/each}
                    </label>
                {/each}
            </div>
        </div>
        <div class="library-footer">
            <button
                class="library-exit"
                onclick={() => {
                    $activeModals.settings = false;
                    playSound("tabswitch");
                }}
            >
                OK
            </button>
        </div>
    </div>
    <div class="backing"></div>
{/if}

<style>
    .library-contents-w {
        width: calc(100% - 16px);
        height: calc(90% - 104px);
        padding: 8px;

        overflow: hidden;

        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
    }

    .settings-sections {
        width: 20%;
        overflow: auto;
        border-right: 1px solid white;
    }
    .settings-sections button {
        width: calc(100% - 8px);
        height: 32px;

        border: 1px solid white;
        border-left: 0;
        border-right: 0;
        text-align: left;
        background: none;
        color: white;

        cursor: pointer;
    }
    .settings-sections button:hover {
        background: rgba(0, 0, 0, 0.2);
    }
    .settings-sections button[data-selected="true"] {
        background: rgba(255, 255, 255, 0.2);
    }
    .settings-sections button:active {
        background: rgba(0, 0, 0, 0.5);
    }
    
    /* .settings-sections button[data-blocked="true"] {
        cursor: not-allowed;
        opacity: 0.5;
    } */

    .settings-options {
        width: 80%;
        padding: 0 8px;
        overflow: auto;

        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        align-items: flex-start;
    }
    .settings-options label {
        margin: 8px 0;
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .settings-options label input[type="checkbox"] {
        width: 48px;
        height: 48px;
    }
</style>