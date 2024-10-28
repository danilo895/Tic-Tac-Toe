let fields = [
    null,
    'circle', 
    'circle', 
    null,
    'cross', 
    'cross', 
    null,
    null,
    null
];

function init() {
    render();
}

function render() {
    const content = document.getElementById('content');
    let html = '<table>';

    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const symbol = fields[index] === 'circle' ? showCircle() : fields[index] === 'cross' ? showX() : '';
            html += `<td onclick="showAnimation()" id="playfield${j}">${symbol}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    content.innerHTML = html;
}

function showCircle() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("class", "circle");
    svg.setAttribute("width", "55");
    svg.setAttribute("height", "55");
    svg.setAttribute("viewBox", "0 0 100 100");

    const circle = document.createElementNS(svgNamespace, "circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "40");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "#00B0EF");
    circle.setAttribute("stroke-width", "10");
    circle.setAttribute("stroke-dasharray", "440");
    circle.setAttribute("stroke-dashoffset", "440");

    const animate = document.createElementNS(svgNamespace, "animate");
    animate.setAttribute("attributeName", "stroke-dashoffset");
    animate.setAttribute("from", "440");
    animate.setAttribute("to", "0");
    animate.setAttribute("dur", "2s");
    animate.setAttribute("fill", "freeze");

    circle.appendChild(animate);
    svg.appendChild(circle);

    return svg.outerHTML; // gibt den SVG-Code als String zurück
}

function showX() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("class", "cross");
    svg.setAttribute("width", "55");
    svg.setAttribute("height", "55");
    svg.setAttribute("viewBox", "0 0 100 100");

    // Erster Strich des X
    const line1 = document.createElementNS(svgNamespace, "line");
    line1.setAttribute("x1", "20");
    line1.setAttribute("y1", "20");
    line1.setAttribute("x2", "80");
    line1.setAttribute("y2", "80");
    line1.setAttribute("stroke", "#F7C607");
    line1.setAttribute("stroke-width", "10");

    // Zweiter Strich des X
    const line2 = document.createElementNS(svgNamespace, "line");
    line2.setAttribute("x1", "80");
    line2.setAttribute("y1", "20");
    line2.setAttribute("x2", "20");
    line2.setAttribute("y2", "80");
    line2.setAttribute("stroke", "#F7C607");
    line2.setAttribute("stroke-width", "10");

    // Animation für die Linien
    const animate1 = document.createElementNS(svgNamespace, "animate");
    animate1.setAttribute("attributeName", "stroke-dasharray");
    animate1.setAttribute("from", "0, 100");
    animate1.setAttribute("to", "100, 0");
    animate1.setAttribute("dur", "0.5s");
    animate1.setAttribute("fill", "freeze");

    const animate2 = document.createElementNS(svgNamespace, "animate");
    animate2.setAttribute("attributeName", "stroke-dasharray");
    animate2.setAttribute("from", "0, 100");
    animate2.setAttribute("to", "100, 0");
    animate2.setAttribute("dur", "0.5s");
    animate2.setAttribute("fill", "freeze");

    line1.setAttribute("stroke-dasharray", "100"); // Initialwert für die Animation
    line1.appendChild(animate1);

    line2.setAttribute("stroke-dasharray", "100"); // Initialwert für die Animation
    line2.appendChild(animate2);

    svg.appendChild(line1);
    svg.appendChild(line2);

    return svg.outerHTML; // gibt den SVG-Code als String zurück
}
