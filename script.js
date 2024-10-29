let fields = [
    null,
    null, 
    null, 
    null,
    null, 
    null, 
    null,
    null,
    null
];

let currentPlayer = 'circle'; // Startspieler
let gameWon = false; // Flag, um zu überprüfen, ob das Spiel gewonnen wurde

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
            html += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    content.innerHTML = html;
}

function handleClick(index, cell) {
    if (!fields[index] && !gameWon) { // Nur klicken, wenn das Feld leer ist und das Spiel nicht gewonnen wurde
        fields[index] = currentPlayer; // Füge den aktuellen Spieler hinzu
        cell.innerHTML = currentPlayer === 'circle' ? showCircle() : showX(); // Setze das Symbol
        cell.onclick = null; // Entferne das onclick-Event

        if (checkWin()) { // Überprüfe, ob jemand gewonnen hat
            gameWon = true; // Setze das Flag, dass das Spiel gewonnen wurde
            highlightWinningCells(); // Markiere die gewinnende Kombination
        } else {
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Wechsel den Spieler
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], // Erste Zeile
        [3, 4, 5], // Zweite Zeile
        [6, 7, 8], // Dritte Zeile
        [0, 3, 6], // Erste Spalte
        [1, 4, 7], // Zweite Spalte
        [2, 5, 8], // Dritte Spalte
        [0, 4, 8], // Diagonal von links oben nach rechts unten
        [2, 4, 6]  // Diagonal von rechts oben nach links unten
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return true; // Es gibt einen Gewinner
        }
    }
    return false; // Kein Gewinner
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

    const line1 = document.createElementNS(svgNamespace, "line");
    line1.setAttribute("x1", "20");
    line1.setAttribute("y1", "20");
    line1.setAttribute("x2", "80");
    line1.setAttribute("y2", "80");
    line1.setAttribute("stroke", "#F7C607");
    line1.setAttribute("stroke-width", "10");

    const line2 = document.createElementNS(svgNamespace, "line");
    line2.setAttribute("x1", "80");
    line2.setAttribute("y1", "20");
    line2.setAttribute("x2", "20");
    line2.setAttribute("y2", "80");
    line2.setAttribute("stroke", "#F7C607");
    line2.setAttribute("stroke-width", "10");

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

    line1.setAttribute("stroke-dasharray", "100");
    line1.appendChild(animate1);

    line2.setAttribute("stroke-dasharray", "100");
    line2.appendChild(animate2);

    svg.appendChild(line1);
    svg.appendChild(line2);

    return svg.outerHTML; // gibt den SVG-Code als String zurück
}

function highlightWinningCells() {
    const cells = document.getElementById('content').getElementsByTagName('td');

    const winningCombinations = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]  
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Blinken und Farbe ändern für die gewinnenden SVGs
            [a, b, c].forEach(index => {
                const cell = cells[index];
                const svg = cell.querySelector('svg');

                if (svg) {
                    // Wähle die entsprechenden Linien oder den Kreis aus
                    const shapes = svg.querySelectorAll('circle, line');
                    const originalColors = Array.from(shapes).map(shape => shape.getAttribute('stroke') || shape.getAttribute('fill'));

                    // Blinken
                    let blink = true;
                    const interval = setInterval(() => {
                        shapes.forEach((shape, idx) => {
                            shape.setAttribute('stroke', blink ? '#00FF00' : originalColors[idx]); // Ändere die Farbe für jedes Shape
                        });
                        blink = !blink;
                    }, 200);

                    // Nach 2 Sekunden stoppen und die Farben auf giftgrün setzen
                    setTimeout(() => {
                        clearInterval(interval);
                        shapes.forEach(shape => {
                            shape.setAttribute('stroke', '#00FF00'); // Endfarbe für beide Linien
                        });
                    }, 2000);
                }
            });
            break; // Breche die Schleife ab, nachdem die gewinnende Kombination gefunden wurde
        }
    }
}

function resetGame() {
    // Leere das Spielfeld
    fields = [
        null,
        null, 
        null, 
        null,
        null, 
        null, 
        null,
        null,
        null
    ];

    // Setze den aktuellen Spieler zurück
    currentPlayer = 'circle';

    // Entferne die Tabelle aus dem Inhalt
    const content = document.getElementById('content');
    content.innerHTML = '';

    // Render das leere Spielfeld neu
    render();
}

