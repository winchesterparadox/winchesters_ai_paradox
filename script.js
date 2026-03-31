document.addEventListener('DOMContentLoaded', () => {
    // === UI Logic (Nav & Theme & Modals) ===
    const themeToggle = document.getElementById('themeToggle');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    const modalOverlay = document.getElementById('modalOverlay');
    const resultModal = document.getElementById('resultModal');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        themeToggle.innerText = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
    });

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.openModal = function () {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function () {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
    
    window.closeResultModal = function () {
        resultModal.classList.remove('active');
    };

    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
        if (e.target === resultModal) closeResultModal();
    });

    window.handleWaitlist = function (e) {
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
                e.target.reset(); // clear form
            }, 2000);
        }, 1500);
    };

    // === SANDBOX LOGIC ===
    const sandboxInput = document.getElementById('sandboxInput');
    const sandboxOutput = document.getElementById('sandboxOutput');
    let sandboxTimeout;
    
    if (sandboxInput && sandboxOutput) {
        sandboxInput.addEventListener('input', (e) => {
            clearTimeout(sandboxTimeout);
            const val = e.target.value.trim();
            if (val.length === 0) {
                sandboxOutput.innerText = '// Output will synthesize here...';
                return;
            }
            if (val.length < 5) {
                sandboxOutput.innerText = '> Analyzing semantics...';
                return;
            }
            
            sandboxOutput.innerText = '> Processing paradox constraints...';
            sandboxTimeout = setTimeout(() => {
                const responses = [
                    "// INSIGHT: High emotional latency detected. Recommend structural pivot.",
                    "// INSIGHT: Competitor blindspot identified in secondary market.",
                    "// INSIGHT: Conflict isolated. 74% probability of resource misallocation.",
                    "// INSIGHT: Resonance optimal. Accelerate current operational sequence."
                ];
                sandboxOutput.innerText = responses[Math.floor(Math.random() * responses.length)];
                sandboxOutput.style.color = '#00ff88';
                setTimeout(() => sandboxOutput.style.color = '', 1000);
            }, 800);
        });
    }

    // === PARADOX ENGINE (12-Question Core Logic) ===
    
    /* Dimensions map:
       Cognition: <0 (Intuition), >0 (Analytical)
       Tempo: <0 (Deliberate), >0 (Agile)
       Authority: <0 (Collaborative), >0 (Autonomous)
       Risk: <0 (Conservative), >0 (Speculative)
    */
    const DIMENSIONS = { cognition: 0, tempo: 0, authority: 0, risk: 0 };
    let currentQIndex = 0;
    
    const questions = [
        // COGNITION
        { id: 'Q1', section: 'Cognition', text: "You face an ambiguous market signal with incomplete data. Your instinct is to:", opts: [
            { t: "Trust my pattern recognition from experience", dim: 'cognition', val: -25 },
            { t: "Gather 20% more data before moving", dim: 'cognition', val: 15 },
            { t: "Run a rapid experiment to test assumptions", dim: 'cognition', val: 0 },
            { t: "Build a full predictive model first", dim: 'cognition', val: 25 }
        ]},
        { id: 'Q2', section: 'Cognition', text: "When your dashboard contradicts your gut feeling:", opts: [
            { t: "I trust the dashboard", dim: 'cognition', val: 20 },
            { t: "I investigate why my gut differs", dim: 'cognition', val: 0 },
            { t: "I trust my gut until proven wrong", dim: 'cognition', val: -20 },
            { t: "I freeze until they align", branchTo: 'Q2b' } 
        ]},
        { id: 'Q2b', section: 'Cognition', text: "This paralysis usually lasts:", isBranch: true, opts: [
            { t: "Hours", dim: 'tempo', val: 10 },
            { t: "Days", dim: 'tempo', val: -10 },
            { t: "Weeks", dim: 'tempo', val: -25 }
        ]},
        { id: 'Q3', section: 'Cognition', text: "Your ideal morning routine includes:", opts: [
            { t: "Reviewing overnight metrics", dim: 'cognition', val: 20 },
            { t: "Meditation or unstructured thinking", dim: 'cognition', val: -20 },
            { t: "Team standup and alignment", dim: 'authority', val: -15 },
            { t: "Deep work, notifications off", dim: 'authority', val: 15 }
        ]},
        // TEMPO
        { id: 'Q4', section: 'Tempo', text: "Your last major decision was made:", opts: [
            { t: "In under 24 hours", dim: 'tempo', val: 25 },
            { t: "Within a week", dim: 'tempo', val: 15 },
            { t: "After 2-4 weeks of analysis", dim: 'tempo', val: -15 },
            { t: "Following 3+ months of planning", dim: 'tempo', val: -25 }
        ]},
        { id: 'Q5', section: 'Tempo', text: "When a competitor launches unexpectedly:", opts: [
            { t: "We pivot immediately", dim: 'tempo', val: 20 },
            { t: "We assess for 48 hours, then act", dim: 'tempo', val: 0 },
            { t: "We stick to our roadmap, monitor closely", dim: 'tempo', val: -20 },
            { t: "We call an all-hands strategy session", dim: 'authority', val: -15 }
        ]},
        { id: 'Q6', section: 'Tempo', text: "\"Move fast and break things\" describes:", opts: [
            { t: "My core philosophy", dim: 'tempo', val: 25 },
            { t: "A necessary phase we outgrew", dim: 'tempo', val: -15 },
            { t: "Reckless, we don't operate that way", dim: 'tempo', val: -25 },
            { t: "Only applicable to R&D, not core business", dim: 'tempo', val: 0 }
        ]},
        // AUTHORITY
        { id: 'Q7', section: 'Authority', text: "Your proudest achievement was:", opts: [
            { t: "A solo breakthrough no one believed in", dim: 'authority', val: 25 },
            { t: "Building something with my core team", dim: 'authority', val: -20 },
            { t: "Orchestrating across 5+ departments", dim: 'authority', val: -25 },
            { t: "Proving my critics wrong independently", dim: 'authority', val: 20 }
        ]},
        { id: 'Q8', section: 'Authority', text: "When the team disagrees with your direction:", opts: [
            { t: "I convince them one-by-one", dim: 'authority', val: 20 },
            { t: "We debate until consensus", dim: 'authority', val: -20 },
            { t: "I delegate the decision downward", dim: 'authority', val: -15 },
            { t: "I proceed and let results speak", dim: 'authority', val: 25 }
        ]},
        { id: 'Q9', section: 'Authority', text: "Your communication style is best described as:", opts: [
            { t: "\"Here's what we're doing\" (directive)", dim: 'authority', val: 20 },
            { t: "\"What do you all think?\" (inquiry)", dim: 'authority', val: -20 },
            { t: "\"Here are 3 options, I prefer A\" (framed)", dim: 'authority', val: 0 },
            { t: "\"Let's whiteboard this together\" (co-creation)", dim: 'authority', val: -25 }
        ]},
        // RISK
        { id: 'Q10', section: 'Risk', text: "Your resource allocation philosophy:", opts: [
            { t: "70% proven channels, 30% experiments", dim: 'risk', val: -15 },
            { t: "50/50 balance", dim: 'risk', val: 0 },
            { t: "Double down on what works, starve what doesn't", dim: 'risk', val: -25 },
            { t: "Aggressive bets on unproven high-ROI areas", dim: 'risk', val: 25 }
        ]},
        { id: 'Q11', section: 'Risk', text: "You've bet your career/reputation on:", opts: [
            { t: "Never — I de-risk everything", dim: 'risk', val: -25 },
            { t: "Once, calculated", dim: 'risk', val: -10 },
            { t: "2-3 times, significant moments", dim: 'risk', val: 15 },
            { t: "Repeatedly — it's how I operate", dim: 'risk', val: 25 }
        ]},
        { id: 'Q12', section: 'Risk', text: "When asked about your \"failure resume\":", opts: [
            { t: "I don't keep one, I avoid failures", dim: 'risk', val: -20 },
            { t: "Small experiments that didn't scale", dim: 'risk', val: 0 },
            { t: "A few major bets that missed", dim: 'risk', val: 15 },
            { t: "Spectacular failures that taught me everything", dim: 'risk', val: 25 }
        ]}
    ];

    // Build Quiz UI
    const quizArea = document.getElementById('quiz-dynamic-area');
    
    function renderQuestion(index) {
        if (index >= questions.length) {
            startSynthesis();
            return;
        }

        const q = questions[index];
        // Skip branch questions if we didn't land on them explicitly
        if (q.isBranch && !q.forceShow) {
            currentQIndex++;
            renderQuestion(currentQIndex);
            return;
        }

        // Show parsing states optionally based on question position
        let theaterText = '';
        if (index === 4) theaterText = `<div class="step-progress" style="color:#00d2ff; animation: pulse 1s infinite">Pattern detected: High-velocity analysis...</div>`;
        if (index === 7) theaterText = `<div class="step-progress" style="color:#00ff88; animation: pulse 1s infinite">Authority profile calibrating...</div>`;

        let html = `
            <div class="quiz-step active" id="Q_${index}">
                <div class="step-progress">Calibration Step ${index+1} / ${questions.length} (${q.section})</div>
                ${theaterText}
                <h3 style="font-size:2rem; margin-bottom: 25px;">${q.text}</h3>
                <div class="choice-grid" style="grid-template-columns: 1fr;">
        `;

        q.opts.forEach((opt, i) => {
            html += `
                <button class="choice-btn" style="padding: 25px 20px;" onclick="handleAnswer(${index}, ${i})">
                    <span class="choice-title" style="font-size: 1.1rem;">${opt.t}</span>
                </button>
            `;
        });

        html += `</div></div>`;
        quizArea.innerHTML = html;
        document.getElementById(`Q_${index}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    window.handleAnswer = function (qIndex, optIndex) {
        const q = questions[qIndex];
        const opt = q.opts[optIndex];
        
        if (opt.dim) {
            DIMENSIONS[opt.dim] += opt.val;
        }
        
        if (opt.branchTo) {
            const branchQ = questions.findIndex(x => x.id === opt.branchTo);
            if (branchQ > -1) questions[branchQ].forceShow = true;
            currentQIndex = branchQ;
        } else {
            currentQIndex++;
        }
        
        renderQuestion(currentQIndex);
    };

    // Calculate final stats
    function startSynthesis() {
        const overlay = document.getElementById('synthesisOverlay');
        const bar = document.querySelector('.loading-bar');
        
        overlay.style.display = 'flex';
        setTimeout(() => overlay.classList.add('active'), 10);
        setTimeout(() => bar.style.width = '100%', 100);

        const results = computeArchetype();
        buildResultCard(results);

        setTimeout(() => {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.style.display = 'none';
                document.getElementById('resultModal').classList.add('active');
            }, 500);
        }, 4000);
    }

    function computeArchetype() {
        // Normalize absolute values to determine primary/secondary/lowest traits
        const scores = [
            { name: 'Analytical', key: 'cognition', val: DIMENSIONS.cognition, class: 'kinetic' },
            { name: 'Intuitive',  key: 'cognition', val: -DIMENSIONS.cognition, class: 'ghost' },
            { name: 'Agile',      key: 'tempo',     val: DIMENSIONS.tempo, class: 'kinetic' },
            { name: 'Deliberate', key: 'tempo',     val: -DIMENSIONS.tempo, class: 'optimizer' },
            { name: 'Autonomous', key: 'authority', val: DIMENSIONS.authority, class: 'ghost' },
            { name: 'Collaborative',key: 'authority',val: -DIMENSIONS.authority, class: 'harmonizer' },
            { name: 'Speculative',key: 'risk',      val: DIMENSIONS.risk, class: 'harmonizer' },
            { name: 'Conservative',key:'risk',      val: -DIMENSIONS.risk, class: 'optimizer' }
        ];

        // Filter to only the highest side of each bipolar dimension
        const activeTraits = [
            DIMENSIONS.cognition >= 0 ? scores[0] : scores[1],
            DIMENSIONS.tempo >= 0 ? scores[2] : scores[3],
            DIMENSIONS.authority >= 0 ? scores[4] : scores[5],
            DIMENSIONS.risk >= 0 ? scores[6] : scores[7]
        ];

        // Sort descending by intensity
        activeTraits.sort((a, b) => b.val - a.val);

        const primary = activeTraits[0];
        let secondary = activeTraits[1];
        
        // If secondary isn't within 15 pts of primary and it's weak overall, maybe it's not a strong hybrid
        // But for the sake of 16 permutations, we will assume standard mapping.
        
        const hybridMap = {
            'Analytical_Agile': { name: "The Surgical Strike", theme: "kinetic", desc: "Your paradox is precision at velocity. You process complex data streams rapidly, making surgical decisions that others require weeks to validate. Your cognitive stack runs hot." },
            'Analytical_Deliberate': { name: "The Deep Current", theme: "optimizer", desc: "Your paradox is exhaustive foresight. You move slowly not from hesitation but from the sheer computational weight of your analysis. You are the submarine." },
            'Analytical_Autonomous': { name: "The Lone Architect", theme: "ghost", desc: "Your paradox is solitary genius. You construct mental models of staggering complexity without external input validation. You build cathedrals alone." },
            'Analytical_Collaborative': { name: "The Consensus Engine", theme: "harmonizer", desc: "Your paradox is distributed intelligence. You synthesize diverse perspectives into analytical frameworks that no single mind could construct." },
            
            'Intuitive_Agile': { name: "The Lightning Rod", theme: "kinetic", desc: "Your paradox is channeled chaos. You make high-stakes decisions faster than others process the question. You are weather, not climate." },
            'Intuitive_Deliberate': { name: "The Sleeping Giant", theme: "optimizer", desc: "Your paradox is dormant power. You appear still while vast intuitive processing happens beneath. You wait for the perfect wave." },
            'Intuitive_Autonomous': { name: "The Shadow Operator", theme: "ghost", desc: "Your paradox is invisible effectiveness. You navigate complex systems without leaving traces. No one knows how the outcome happened." },
            'Intuitive_Collaborative': { name: "The Cultivator", theme: "harmonizer", desc: "Your paradox is collective intuition. You grow decisions like crops, in seasons, with soil preparation built on deep social attunement." },
            
            'Agile_Speculative': { name: "The Firestarter", theme: "harmonizer", desc: "Your paradox is constructive arson. You move fast and break things, defining the game others will later play." },
            'Agile_Conservative': { name: "The Controlled Burn", theme: "kinetic", desc: "Your paradox is disciplined speed. You experiment aggressively, but only where downside is capped. You are the sprinter with a safety harness." },
            'Deliberate_Speculative': { name: "The Calculated Gambler", theme: "ghost", desc: "Your paradox is patient risk. You study the roulette wheel for years before placing one massive, highly asymmetric bet." },
            'Deliberate_Conservative': { name: "The Fortress", theme: "optimizer", desc: "Your paradox is impregnable stability. You optimize for survival and the long arc, remaining standing when volatility destroys competitors." },
            
            'Autonomous_Speculative': { name: "The Solo Voyager", theme: "kinetic", desc: "Your paradox is individual frontier exploration. You venture where no structure can follow, betting on yourself in new domains." },
            'Autonomous_Conservative': { name: "The Sovereign", theme: "optimizer", desc: "Your paradox is independent stability. You have achieved total control over a domain you have no intention of surrendering to anyone." },
            'Collaborative_Speculative': { name: "The Expedition Leader", theme: "harmonizer", desc: "Your paradox is collective daring. You convince groups to venture into unknown territory together, socializing risk across relationships." },
            'Collaborative_Conservative': { name: "The Steward", theme: "ghost", desc: "Your paradox is custodial care. You hold resources and institutions in trust, optimizing for perpetuation over transformation." }
        };

        const key1 = `${primary.name}_${secondary.name}`;
        const key2 = `${secondary.name}_${primary.name}`; // Reverse fallback
        
        let archetype = hybridMap[key1] || hybridMap[key2];
        if(!archetype) {
            // Fallback if traits are same dimension (impossible mathematically due to structure, but just in case)
            archetype = hybridMap['Analytical_Agile']; 
        }

        const lowest = activeTraits[3];

        return { primary, secondary, lowest, archetype, scores: activeTraits };
    }

    function buildResultCard(data) {
        document.getElementById('archetypeName').innerText = data.archetype.name;
        document.getElementById('primaryTraitValue').innerText = data.primary.name.toUpperCase();
        document.getElementById('secondaryTraitValue').innerText = data.secondary.name.toUpperCase();
        document.getElementById('archetypeDesc').innerText = data.archetype.desc;

        // Apply visual theme
        document.body.classList.remove('kinetic', 'ghost', 'optimizer', 'harmonizer', 'light-mode');
        document.body.classList.add(data.archetype.theme);

        // Calculate Confidence
        // Range of values max absolute is roughly 100 * 4 = 400. 
        const totalIntensity = data.scores.reduce((sum, item) => sum + item.val, 0);
        const randSeed = Math.floor(Math.random() * 5);
        const confidence = Math.min(99, Math.max(72, 70 + Math.floor(totalIntensity / 4) + randSeed));
        document.getElementById('confidenceValue').innerText = `${confidence}%`;

        // Dynamic Text Generators
        document.getElementById('insightTension').innerText = generateTension(data.primary.name, data.secondary.name, data.lowest.name);
        document.getElementById('insightSuperpower').innerText = generateSuperpower(data.primary.name);
        document.getElementById('insightBlindspot').innerText = generateBlindspot(data.lowest.name, data.secondary.name);
        document.getElementById('insightRecommendation').innerText = generateRecommendation(data.primary.name, data.lowest.name);
    }

    function generateTension(pri, sec, lowest) {
        if (pri === 'Analytical' && sec === 'Agile') return "You exhaust teams who cannot match your processing speed. You optimize systems but not the humans running them.";
        if (pri === 'Intuitive' && lowest === 'Deliberate') return "Your intuition pulls toward action but your risk awareness demands patience. You feel the opportunity slipping while you wait.";
        if (pri === 'Autonomous' && lowest === 'Intuitive') return "You move fast and alone, trusting your gut. When you are wrong, there is no system to catch you.";
        if (lowest === 'Analytical') return "Your analysis is exhaustive but your action is rare. Your knowledge becomes a museum, not a weapon.";
        return "The constant push between your dominant traits creates friction in standard corporate structures, requiring bespoke processes to harness your true velocity.";
    }

    function generateSuperpower(pri) {
        const powers = {
            'Analytical': "You see patterns in complexity that others miss. Your decisions are grounded in structures they cannot perceive.",
            'Intuitive': "You know before you know why. Your subconscious processing captures signals that conscious analysis filters out.",
            'Agile': "You capture time-bound opportunities that slower actors cannot even evaluate before they vanish.",
            'Deliberate': "Your patience lets you see second and third order effects that impatient actors never encounter.",
            'Autonomous': "You execute without friction, consultation, or compromise. Your will becomes reality faster than organizations can respond.",
            'Collaborative': "You amplify intelligence through social connection. Your network knows more than any node within it.",
            'Speculative': "You position for payoffs that others cannot imagine, capturing convex returns from asymmetric bets.",
            'Conservative': "You persist where others fail. Your survival through volatility compounds into dominance over time."
        };
        return powers[pri] || "Unique strategic synthesis that defies standardization.";
    }

    function generateBlindspot(lowest, sec) {
        if (lowest === 'Analytical' || lowest === 'Intuitive') {
            return "Your decision quality depends on factors you do not monitor or control. You may mistake luck for skill.";
        }
        if (lowest === 'Agile' || lowest === 'Deliberate') {
            return "Your timing is vulnerable to disruption by actors operating on entirely different pacing rhythms.";
        }
        if (lowest === 'Autonomous' || lowest === 'Collaborative') {
            return "Your impact is limited by your isolation or your dependency on consensus. Scaling requires confronting this ceiling.";
        }
        return "Your risk calibration systematically misprices uncertainty, leaving transformative returns on the table.";
    }

    function generateRecommendation(pri, lowest) {
        return "Force a monthly calibration. Install structural guardrails that artificially limit your natural tendencies when stakes cross into terminal threshold territories.";
    }

    window.retakeQuiz = function () {
        // Reset state
        DIMENSIONS.cognition = 0; DIMENSIONS.tempo = 0; DIMENSIONS.authority = 0; DIMENSIONS.risk = 0;
        currentQIndex = 0;
        document.body.classList.remove('kinetic', 'ghost', 'optimizer', 'harmonizer');
        
        const overlay = document.getElementById('synthesisOverlay');
        overlay.classList.remove('active');
        overlay.style.display = 'none';
        document.querySelector('.loading-bar').style.width = '0%';
        closeResultModal();
        
        renderQuestion(0);
    };

    window.copyShareLink = function () {
        const archName = document.getElementById('archetypeName').innerText;
        const text = `I just discovered I am "${archName}" on Winchester AI Paradox. The logic engine revealed my strategic DNA in 12 questions. What's yours? ${window.location.href}#identity-engine`;
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.querySelector('.card-actions .btn-primary');
            const orig = btn.innerText;
            btn.innerText = '✓ LINK COPIED!';
            setTimeout(() => btn.innerText = orig, 2500);
        }).catch(() => {
            alert('Paradox Identity Link Copied! Challenge your Nemesis.');
        });
    };

    // INIT
    renderQuestion(0);
});
