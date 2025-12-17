/**
 * Hero Gradient Mesh Animation
 * Atelier Popo - Elegant gradient mesh background
 */

(function() {
    'use strict';

    const HeroGradient = {
        canvas: null,
        ctx: null,
        width: 0,
        height: 0,
        time: 0,
        animationId: null,
        
        // Brand colors - Rose Gold / Wine / Gold theme
        colors: [
            { r: 114, g: 47, b: 55 },    // Dark Wine #722F37
            { r: 183, g: 110, b: 121 },  // Rose Gold
            { r: 201, g: 169, b: 98 },   // Gold
            { r: 30, g: 30, b: 30 },     // Dark
            { r: 80, g: 50, b: 60 }      // Deep Rose
        ],
        
        blobs: [],
        
        init: function(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            // Create canvas
            this.canvas = document.createElement('canvas');
            this.canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
            container.style.position = 'relative';
            container.appendChild(this.canvas);
            
            this.ctx = this.canvas.getContext('2d');
            
            // Initialize
            this.resize();
            this.createBlobs();
            this.animate();
            
            // Event listeners
            window.addEventListener('resize', () => this.resize());
            
            // Mouse interaction
            container.addEventListener('mousemove', (e) => this.onMouseMove(e));
        },
        
        resize: function() {
            const rect = this.canvas.parentElement.getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        },
        
        createBlobs: function() {
            this.blobs = [];
            const numBlobs = 5;
            
            for (let i = 0; i < numBlobs; i++) {
                this.blobs.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    radius: Math.random() * 400 + 300,
                    color: this.colors[i % this.colors.length],
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    phase: Math.random() * Math.PI * 2
                });
            }
        },
        
        onMouseMove: function(e) {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Subtle push effect
            this.blobs.forEach(blob => {
                const dx = blob.x - mouseX;
                const dy = blob.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 300) {
                    const force = (300 - dist) / 300 * 0.02;
                    blob.vx += dx * force;
                    blob.vy += dy * force;
                }
            });
        },
        
        updateBlobs: function() {
            this.blobs.forEach(blob => {
                // Update position
                blob.x += blob.vx;
                blob.y += blob.vy;
                
                // Add wave motion
                blob.x += Math.sin(this.time * 0.001 + blob.phase) * 0.5;
                blob.y += Math.cos(this.time * 0.001 + blob.phase) * 0.5;
                
                // Friction
                blob.vx *= 0.99;
                blob.vy *= 0.99;
                
                // Bounce off edges with padding
                const padding = blob.radius * 0.5;
                if (blob.x < -padding) blob.x = this.width + padding;
                if (blob.x > this.width + padding) blob.x = -padding;
                if (blob.y < -padding) blob.y = this.height + padding;
                if (blob.y > this.height + padding) blob.y = -padding;
            });
        },
        
        draw: function() {
            // Clear with dark background
            this.ctx.fillStyle = '#0a0a0a';
            this.ctx.fillRect(0, 0, this.width, this.height);
            
            // Draw blobs with blur effect
            this.blobs.forEach(blob => {
                const gradient = this.ctx.createRadialGradient(
                    blob.x, blob.y, 0,
                    blob.x, blob.y, blob.radius
                );
                
                const { r, g, b } = blob.color;
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.8)`);
                gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.3)`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
                this.ctx.fill();
            });
            
            // Add noise/grain overlay for texture
            this.addGrain();
        },
        
        addGrain: function() {
            const imageData = this.ctx.getImageData(0, 0, this.width, this.height);
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                const noise = (Math.random() - 0.5) * 15;
                data[i] += noise;     // R
                data[i + 1] += noise; // G
                data[i + 2] += noise; // B
            }
            
            this.ctx.putImageData(imageData, 0, 0);
        },
        
        animate: function() {
            this.time++;
            this.updateBlobs();
            this.draw();
            this.animationId = requestAnimationFrame(() => this.animate());
        },
        
        destroy: function() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            if (this.canvas && this.canvas.parentElement) {
                this.canvas.parentElement.removeChild(this.canvas);
            }
        }
    };
    
    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (document.getElementById('heroGradient')) {
                HeroGradient.init('heroGradient');
            }
        });
    } else {
        if (document.getElementById('heroGradient')) {
            HeroGradient.init('heroGradient');
        }
    }
    
    // Expose globally
    window.HeroGradient = HeroGradient;
})();

