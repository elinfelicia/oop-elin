const wrapper = document.querySelector(".wrapper");
const rInput = document.querySelector("#r-input");
const gInput = document.querySelector("#g-input");
const bInput = document.querySelector("#b-input");
const submitBtn = document.querySelector(".submit-btn");
const hexRes = document.querySelector(".hex-result");
const rgbaRes = document.querySelector(".rgba-result");

function Colour(r, g, b) {
    this.r = Math.max(0, Math.min(255, r));
    this.g = Math.max(0, Math.min(255, g));
    this.b = Math.max(0, Math.min(255, b));
}

Colour.prototype.rgb = function () {
    return `rgb(${this.r},${this.g},${this.b})`;
};

Colour.prototype.hex = function () {
    return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
};

Colour.prototype.rgba = function () {
    return `rgba(${this.r},${this.g},${this.b},1)`;
};

function handleFormSubmit(e) {
    e.preventDefault();
    const r = parseInt(rInput.value);
    const g = parseInt(gInput.value);
    const b = parseInt(bInput.value);
    const bgColour = new Colour(r, g, b);

    wrapper.style.backgroundColor = bgColour.rgb();
    hexRes.innerHTML = `HEX: ${bgColour.hex()}`;
    rgbaRes.innerHTML = `RGBA: ${bgColour.rgba()}`;

    clearInputFields();
}

function clearInputFields() {
    rInput.value = "";
    gInput.value = "";
    bInput.value = "";
}

submitBtn.addEventListener("click", handleFormSubmit);
