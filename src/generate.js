import {addButton} from "./controls.js";


const generatePage = (elements, state, controls) => {

    // >>> boilerplate for generating the page...

    elements.fragment.classList.add("code");
    elements.fragment.innerHTML = `
        <pre>${state.source.fragment}</pre>
    `;

    elements.vertex.classList.add("code");
    elements.vertex.innerHTML = `
        <pre>${state.source.vertex}</pre>
    `;

    elements.console.innerHTML = `
        <h4>Fragment Shader</h4>
        <div>Compile Status: ${state.compileStatus.fragment}</div>
        <div class="error">${state.error.fragment}</div>
        <div></div>
        <h4>Vertex Shader</h4>
        <div>Compile Status: ${state.compileStatus.vertex}</div>
        <div class="error">${state.error.vertex}</div>
        <div></div>
        <h4>Shader Program</h4>
        <div>Link Status: ${state.compileStatus.linker}</div>
        <div class="error">${state.error.linker}</div>
        <div></div>
    `;

    const locations = Object.entries(state.location);
    if (locations.length > 0) {
        let locationHTML =
            `<h4>Locations (whatever these are)</h4>`
            + "<pre>";
        for (const [name, location] of locations) {
            locationHTML +=
                `${name.padEnd(20)} -> ${location}\n`;
        }
        locationHTML += "</pre>";
        elements.console.innerHTML += locationHTML;
    }

    // <<< end of boilerplate

    addControlsToPage(elements, state, controls);
};

export default generatePage;

export const addControlsToPage = (elements, state, controls) => {
    if (!state.program) {
        elements.controls.innerHTML = `
        <div class="error rightnote">
            Nothing to render, because compilation failed.
        </div>
    `;
    } else {
        for (const control of controls) {
            if (control.type === "button") {
                addButton(elements.controls, {
                    title: control.title,
                    onClick: () => {
                        control.onClick();
                    },
                });
            }
        }
    }
};
