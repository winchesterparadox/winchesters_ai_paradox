document.addEventListener('DOMContentLoaded', () => {
    const nodeField = document.getElementById('nodeField');
    const pulseCore = document.getElementById('pulseCore');
    const statusOutput = document.getElementById('statusOutput');
    const demoInput = document.getElementById('demoInput');

    // Initialize Neural Nodes
    const nodeCount = 20;
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'node';
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        nodeField.appendChild(node);
    }

    window.runParadoxDemo = function() {
        const input = demoInput.value.trim();
        if (!input) {
            statusOutput.innerHTML = '<span style="color: #ff4d4d">Error:</span> Please enter a goal to initiate the Paradox Engine.';
            return;
        }

        // Start animation
        pulseCore.classList.add('active');
        statusOutput.innerHTML = 'Initializing Paradox Kernels...';
        
        const nodes = document.querySelectorAll('.node');
        nodes.forEach(n => n.classList.remove('active'));

        const steps = [
            { text: `Scanning goal: "${input}"`, delay: 1000 },
            { text: 'Bypassing standard logical constraints...', delay: 2000 },
            { text: 'Synthesizing contradictory datasets...', delay: 3500 },
            { text: 'Paradox resolution in progress...', delay: 5000 },
            { text: 'DONE. Solution synthesized.', delay: 6500, final: true }
        ];

        steps.forEach((step, index) => {
            setTimeout(() => {
                statusOutput.innerHTML = step.text;
                
                // Activate some nodes
                const batchSize = 4;
                for(let i = 0; i < batchSize; i++) {
                    const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
                    randomNode.classList.add('active');
                }

                if (step.final) {
                    pulseCore.classList.remove('active');
                    displayFinalResult(input);
                }
            }, step.delay);
        });
    };

    function displayFinalResult(input) {
        const results = [
            `Logic Breach Successful. Unified strategy for <span class="highlight">${input}</span> generated with 99.8% paradox stability.`,
            `Paradox Resolved. Neural pathways for <span class="highlight">${input}</span> have been optimized beyond 10th-dimension efficiency.`,
            `Synthesis Complete. The engine has projected a non-linear growth path for <span class="highlight">${input}</span>.`
        ];
        const randomResult = results[Math.floor(Math.random() * results.length)];
        statusOutput.innerHTML = randomResult;
    }
});
