document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        cursorGlow.style.left = x + 'px';
        cursorGlow.style.top = y + 'px';
    });

    // Add CSS for cursor glow dynamically if not in CSS
    if (!document.getElementById('cursor-style')) {
        const style = document.createElement('style');
        style.id = 'cursor-style';
        style.innerHTML = `
            .cursor-glow {
                position: fixed;
                width: 400px;
                height: 400px;
                background: radial-gradient(circle, rgba(93, 93, 255, 0.15) 0%, transparent 70%);
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 9999;
                border-radius: 50%;
                mix-blend-mode: screen;
                transition: opacity 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            if (isActive) {
                navLinks.style.display = 'none';
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '2rem';
                navLinks.style.background = '#15151A';
                navLinks.style.padding = '2rem';
                navLinks.style.borderRadius = '12px';
                navLinks.style.border = '1px solid rgba(255,255,255,0.1)';
                navLinks.classList.add('active');
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.style.display = 'none';
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Fade-in animation CSS
    const animStyle = document.createElement('style');
    animStyle.innerHTML = `
        .section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .section.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animStyle);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Theme Toggle Logic (Simple version)
    const themeToggle = document.querySelector('.theme-toggle');
    let isDark = true;

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        const icon = themeToggle.querySelector('i');

        if (!isDark) {
            document.documentElement.classList.add('light-mode');
            document.documentElement.style.setProperty('--bg-color', '#f8f9fa');
            document.documentElement.style.setProperty('--text-primary', '#1a1a1a');
            document.documentElement.style.setProperty('--text-secondary', '#4a4a4a');
            document.documentElement.style.setProperty('--card-bg', '#ffffff');
            document.documentElement.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.8)');
            document.documentElement.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            document.documentElement.classList.remove('light-mode');
            document.documentElement.style.removeProperty('--bg-color');
            document.documentElement.style.removeProperty('--text-primary');
            document.documentElement.style.removeProperty('--text-secondary');
            document.documentElement.style.removeProperty('--card-bg');
            document.documentElement.style.removeProperty('--nav-bg');
            document.documentElement.style.removeProperty('--glass-border');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Lightbox Logic for Certifications
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const certImages = document.querySelectorAll('.cert-image');

    if (lightbox && lightboxImg && lightboxClose) {
        certImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                // Small timeout to allow display:flex to apply before adding active class for opacity transition
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
                lightboxImg.src = img.getAttribute('data-full-res') || img.src;
                // Disable body scroll when lightbox is open
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.style.display = 'none';
                lightboxImg.src = ''; // Clear source
            }, 300); // Match transition duration
            document.body.style.overflow = 'auto';
        };

        lightboxClose.addEventListener('click', closeLightbox);

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // Entropy Animation
    function initEntropy() {
        const canvas = document.getElementById('entropy-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let size = 400;

        // Handle DPR for crisp rendering
        const dpr = window.devicePixelRatio || 1;

        function resize() {
            // Default size 400, strictly square
            canvas.width = size * dpr;
            canvas.height = size * dpr;
            canvas.style.width = `${size}px`;
            canvas.style.height = `${size}px`;
            ctx.scale(dpr, dpr);
        }
        resize();

        const particleColor = '#ffffff';

        class Particle {
            constructor(x, y, order) {
                this.x = x;
                this.y = y;
                this.originalX = x;
                this.originalY = y;
                this.size = 2;
                this.order = order;
                this.velocity = {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2
                };
                this.influence = 0;
                this.neighbors = [];
            }

            update() {
                if (this.order) {
                    // Ordered particles influenced by chaos
                    const dx = this.originalX - this.x;
                    const dy = this.originalY - this.y;

                    const chaosInfluence = { x: 0, y: 0 };
                    this.neighbors.forEach(neighbor => {
                        if (!neighbor.order) {
                            const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y);
                            const strength = Math.max(0, 1 - distance / 100);
                            chaosInfluence.x += (neighbor.velocity.x * strength);
                            chaosInfluence.y += (neighbor.velocity.y * strength);
                            this.influence = Math.max(this.influence, strength);
                        }
                    });

                    this.x += dx * 0.05 * (1 - this.influence) + chaosInfluence.x * this.influence;
                    this.y += dy * 0.05 * (1 - this.influence) + chaosInfluence.y * this.influence;
                    this.influence *= 0.99;
                } else {
                    // Chaotic movement
                    this.velocity.x += (Math.random() - 0.5) * 0.5;
                    this.velocity.y += (Math.random() - 0.5) * 0.5;
                    this.velocity.x *= 0.95;
                    this.velocity.y *= 0.95;
                    this.x += this.velocity.x;
                    this.y += this.velocity.y;

                    // Bounds check
                    if (this.x < size / 2 || this.x > size) this.velocity.x *= -1;
                    if (this.y < 0 || this.y > size) this.velocity.y *= -1;
                    this.x = Math.max(size / 2, Math.min(size, this.x));
                    this.y = Math.max(0, Math.min(size, this.y));
                }
            }

            draw(ctx) {
                const alpha = this.order ? 0.8 - this.influence * 0.5 : 0.8;
                const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
                ctx.fillStyle = `${particleColor}${alphaHex}`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles = [];
        const gridSize = 25;
        const spacing = size / gridSize;

        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const x = spacing * i + spacing / 2;
                const y = spacing * j + spacing / 2;
                // Left side is "order", right side is "chaos"
                const order = x < size / 2;
                particles.push(new Particle(x, y, order));
            }
        }

        function updateNeighbors() {
            particles.forEach(particle => {
                particle.neighbors = particles.filter(other => {
                    if (other === particle) return false;
                    const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
                    return distance < 100;
                });
            });
        }

        let time = 0;
        let animationId;

        function animate() {
            ctx.clearRect(0, 0, size, size);

            if (time % 30 === 0) {
                updateNeighbors();
            }

            particles.forEach(particle => {
                particle.update();
                particle.draw(ctx);

                particle.neighbors.forEach(neighbor => {
                    const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y);
                    if (distance < 50) {
                        const alpha = 0.2 * (1 - distance / 50);
                        const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
                        ctx.strokeStyle = `${particleColor}${alphaHex}`;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(neighbor.x, neighbor.y);
                        ctx.stroke();
                    }
                });
            });

            // Divider line
            ctx.strokeStyle = `${particleColor}4D`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(size / 2, 0);
            ctx.lineTo(size / 2, size);
            ctx.stroke();

            time++;
            animationId = requestAnimationFrame(animate);
        }

        animate();
    }

    // Initialize
    initEntropy();

    // Glowing Effect Logic
    function initGlowingEffect() {
        const cards = document.querySelectorAll('.project-card');

        cards.forEach(card => {
            // Create and inject the glow elements
            // Check if already exists to avoid duplicates if re-run
            if (!card.querySelector('.glow-container')) {
                const container = document.createElement('div');
                container.classList.add('glow-container');

                const effect = document.createElement('div');
                effect.classList.add('glow-effect');

                container.appendChild(effect);
                card.appendChild(container);

                // Event Listeners
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    // Calculate Angle similar to the React component
                    const angle = (Math.atan2(y - centerY, x - centerX) * 180 / Math.PI) + 90;

                    container.style.setProperty('--start', angle);
                    container.style.setProperty('--active', 1);
                });

                card.addEventListener('mouseleave', () => {
                    container.style.setProperty('--active', 0);
                });
            }
        });
    }

    initGlowingEffect();
    initShaderBackground();

});

// Shader Background Logic (Ported from React)
function initShaderBackground() {
    const canvas = document.getElementById('shader-canvas');
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
        console.warn('WebGL not supported.');
        return;
    }

    // Vertex shader source code
    const vsSource = `
        attribute vec4 aVertexPosition;
        void main() {
            gl_Position = aVertexPosition;
        }
    `;

    // Fragment shader source code
    const fsSource = `
        precision highp float;
        uniform vec2 iResolution;
        uniform float iTime;

        const float overallSpeed = 0.2;
        const float gridSmoothWidth = 0.015;
        const float axisWidth = 0.05;
        const float majorLineWidth = 0.025;
        const float minorLineWidth = 0.0125;
        const float majorLineFrequency = 5.0;
        const float minorLineFrequency = 1.0;
        const vec4 gridColor = vec4(0.5);
        const float scale = 5.0;
        const vec4 lineColor = vec4(0.4, 0.2, 0.8, 1.0);
        const float minLineWidth = 0.01;
        const float maxLineWidth = 0.2;
        const float lineSpeed = 1.0 * overallSpeed;
        const float lineAmplitude = 1.0;
        const float lineFrequency = 0.2;
        const float warpSpeed = 0.2 * overallSpeed;
        const float warpFrequency = 0.5;
        const float warpAmplitude = 1.0;
        const float offsetFrequency = 0.5;
        const float offsetSpeed = 1.33 * overallSpeed;
        const float minOffsetSpread = 0.6;
        const float maxOffsetSpread = 2.0;
        const int linesPerGroup = 16;

        #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
        #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
        #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
        #define drawPeriodicLine(freq, width, t) drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

        float drawGridLines(float axis) {
            return drawCrispLine(0.0, axisWidth, axis)
                + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
                + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
        }

        float drawGrid(vec2 space) {
            return min(1.0, drawGridLines(space.x) + drawGridLines(space.y));
        }

        float random(float t) {
            return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
        }

        float getPlasmaY(float x, float horizontalFade, float offset) {
            return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
        }

        void main() {
            vec2 fragCoord = gl_FragCoord.xy;
            vec4 fragColor;
            vec2 uv = fragCoord.xy / iResolution.xy;
            vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

            float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
            float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

            space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
            space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

            vec4 lines = vec4(0.0);
            vec4 bgColor1 = vec4(0.1, 0.1, 0.3, 1.0);
            vec4 bgColor2 = vec4(0.3, 0.1, 0.5, 1.0);

            for(int l = 0; l < linesPerGroup; l++) {
                float normalizedLineIndex = float(l) / float(linesPerGroup);
                float offsetTime = iTime * offsetSpeed;
                float offsetPosition = float(l) + space.x * offsetFrequency;
                float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
                float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
                float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
                float linePosition = getPlasmaY(space.x, horizontalFade, offset);
                float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

                float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
                vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
                float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

                line = line + circle;
                lines += line * lineColor * rand;
            }

            fragColor = mix(bgColor1, bgColor2, uv.x);
            fragColor *= verticalFade;
            fragColor.a = 1.0;
            fragColor += lines;

            gl_FragColor = fragColor;
        }
    `;

    // Helper function to compile shader
    const loadShader = (gl, type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error: ', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };

    // Initialize shader program
    const initShaderProgram = (gl, vsSource, fsSource) => {
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error('Shader program link error: ', gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        return shaderProgram;
    };

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    if (!shaderProgram) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        1.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        },
        uniformLocations: {
            resolution: gl.getUniformLocation(shaderProgram, 'iResolution'),
            time: gl.getUniformLocation(shaderProgram, 'iTime'),
        },
    };

    const resizeCanvas = () => {
        // Resize according to the container (hero section)
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial call

    let startTime = Date.now();
    const render = () => {
        const currentTime = (Date.now() - startTime) / 1000;

        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(programInfo.program);

        gl.uniform2f(programInfo.uniformLocations.resolution, canvas.width, canvas.height);
        gl.uniform1f(programInfo.uniformLocations.time, currentTime);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
}
