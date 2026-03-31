document.addEventListener('DOMContentLoaded', () => {
    // Identity Engine State
    let currentStep = 1;
    let answers = {};

    // DOM Elements
    const synthesisOverlay = document.getElementById('synthesisOverlay');
    const loadingBar = document.querySelector('.loading-bar');
    const resultModal = document.getElementById('resultModal');
    const modalOverlay = document.getElementById('modalOverlay');

    // Archetype Data Configuration
    const ARCHETYPES = {
        'ImpactOrderMachine': {
            name: 'THE KINETIC ARCHITECT',
            class: 'kinetic',
            desc: 'A master of structural dominance. You build systems that don\'t just scale—they accelerate. Your logic is a grid that bends reality to your will.',
            emblem: '<svg viewBox="0 0 100 100" class="archetype-emblem"><rect x="20" y="20" width="60" height="60" stroke-width="2" fill="none" stroke="currentColor"/><path d="M20 20 L80 80 M80 20 L20 80" stroke="currentColor" stroke-width="1"/></svg>',
            stability: '99.2%', entropy: '0.8%', resonance: 'TOTAL'
        },
        'LegacyChaosSoul': {
            name: 'THE GHOST NAVIGATOR',
            class: 'ghost',
            desc: 'The whisper in the machine. You navigate the unseen currents of intuition, creating impact through subtle ripples rather than raw force.',
            emblem: '<svg viewBox="0 0 100 100" class="archetype-emblem"><circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="10 5"/><circle cx="50" cy="50" r="15" fill="currentColor"/></svg>',
            stability: '84.5%', entropy: '15.5%', resonance: 'ETHEREAL'
        },
        'LegacyOrderMachine': {
            name: 'THE INFINITE OPTIMIZER',
            class: 'optimizer',
            desc: 'Precision is your religion. You see the world as a series of perfectable loops, ruthlessly removing entropy until only pure efficiency remains.',
            emblem: '<svg viewBox="0 0 100 100" class="archetype-emblem"><path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50 30 L70 50 L50 70 L30 50 Z" fill="currentColor"/></svg>',
            stability: '99.9%', entropy: '0.1%', resonance: 'ABSOLUTE'
        },
        'ImpactChaosSoul': {
            name: 'THE CHAOS HARMONIZER',
            class: 'harmonizer',
            desc: 'A visionary of the storm. You find patterns where others see noise, turning radical change into a symphonic advancement for humanity.',
            emblem: '<svg viewBox="0 0 100 100" class="archetype-emblem"><path d="M20 50 Q 50 10 80 50 T 20 50" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="10" fill="currentColor"/></svg>',
            stability: '72.1%', entropy: '27.9%', resonance: 'DYNAMIC'
        }
    };

    // Quiz Navigation
    window.nextStep = function(step, value) {
        const currentChoice = step === 1 ? 'Focus' : step === 2 ? 'Method' : 'Core';
        answers[currentChoice] = value;

        if (step < 3) {
            document.getElementById(`step${step}`).classList.remove('active');
            document.getElementById(`step${step + 1}`).classList.add('active');
            currentStep = step + 1;
        } else {
            initiateSynthesis();
        }
    };

    function initiateSynthesis() {
        synthesisOverlay.style.display = 'flex';
        setTimeout(() => synthesisOverlay.classList.add('active'), 10);
        
        // Progress bar animation
        setTimeout(() => loadingBar.style.width = '100%', 100);

        // Map answers to key
        // We use a fallback mapping for all 8 combinations
        const resultKey = determineArchetype(answers);
        const archetype = ARCHETYPES[resultKey];

        setTimeout(() => {
            applyMetamorphosis(archetype);
            showResult(archetype);
        }, 3500);
    }

    function determineArchetype(ans) {
        // Simple mapping logic for word-of-mouth appeal
        const key = `${ans.Focus}${ans.Method}${ans.Core}`;
        if (ARCHETYPES[key]) return key;
        
        // Fallback groupings
        if (ans.Focus === 'Impact' && ans.Method === 'Order') return 'ImpactOrderMachine';
        if (ans.Focus === 'Legacy' && ans.Core === 'Soul') return 'LegacyChaosSoul';
        if (ans.Method === 'Order') return 'LegacyOrderMachine';
        return 'ImpactChaosSoul';
    }

    function applyMetamorphosis(archetype) {
        // Remove previous themes
        document.body.classList.remove('kinetic', 'ghost', 'optimizer', 'harmonizer');
        // Apply new theme
        document.body.classList.add(archetype.class);
    }

    function showResult(archetype) {
        document.getElementById('archetypeName').innerText = archetype.name;
        document.getElementById('archetypeDesc').innerText = archetype.desc;
        document.getElementById('archetypeEmblem').innerHTML = archetype.emblem;
        
        document.getElementById('stabilityValue').innerText = archetype.stability;
        document.getElementById('entropyValue').innerText = archetype.entropy;
        document.getElementById('resonanceValue').innerText = archetype.resonance;

        synthesisOverlay.classList.remove('active');
        setTimeout(() => {
            synthesisOverlay.style.display = 'none';
            resultModal.classList.add('active');
        }, 500);
    }

    window.closeResultModal = function() {
        resultModal.classList.remove('active');
    };

    window.retakeQuiz = function() {
        // Reset state
        answers = {};
        currentStep = 1;
        // Reset quiz steps
        document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
        document.getElementById('step1').classList.add('active');
        // Reset synthesis overlay
        synthesisOverlay.classList.remove('active');
        synthesisOverlay.style.display = 'none';
        loadingBar.style.width = '0%';
        // Remove theme
        document.body.classList.remove('kinetic', 'ghost', 'optimizer', 'harmonizer');
        // Close modal
        resultModal.classList.remove('active');
        // Scroll back to quiz
        document.getElementById('identity-engine').scrollIntoView({ behavior: 'smooth' });
    };

    window.copyShareLink = function() {
        const archName = document.getElementById('archetypeName').innerText;
        const text = `I just discovered I am "${archName}" using Winchester AI Paradox. The engine revealed my strategic DNA in 3 questions. What's yours? ${window.location.href}#identity-engine`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                const btn = document.querySelector('[onclick="copyShareLink()"]');
                const orig = btn.innerText;
                btn.innerText = '✓ LINK COPIED!';
                setTimeout(() => btn.innerText = orig, 2500);
            });
        } else {
            const dummy = document.createElement('textarea');
            dummy.value = text;
            document.body.appendChild(dummy);
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            alert('Paradox Identity Link Copied! Challenge your Nemesis.');
        }
    };

    // Modal Handling (Main CTAs)
    window.openModal = function() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    window.handleWaitlist = function(e) {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'ENROLLING PROTOCOL...';
        
        setTimeout(() => {
            btn.innerText = 'SPOT SECURED';
            btn.style.background = '#00ff88';
            setTimeout(() => {
                closeModal();
                btn.innerText = originalText;
                btn.style.background = '';
            }, 2000);
        }, 1500);
    };

    // Event Listeners for closing modals
    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
        if (e.target === resultModal) closeResultModal();
    });
});
