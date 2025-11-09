"use client";

import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  originX: number;
  originY: number;
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  const particleColor = useColorModeValue("rgba(96, 165, 250, 0.8)", "rgba(147, 197, 253, 0.7)");
  const lineColor = useColorModeValue("rgba(139, 92, 246, 0.3)", "rgba(167, 139, 250, 0.25)");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuration réactive
    const getConfig = () => {
      const width = window.innerWidth;
      
      if (width < 640) { // Mobile
        return {
          particleCount: 40,
          maxDistance: 120,
          minDistance: 30,
          mouseRadius: 150,
          returnSpeed: 0.05
        };
      } else if (width < 1024) { // Tablette
        return {
          particleCount: 70,
          maxDistance: 150,
          minDistance: 35,
          mouseRadius: 180,
          returnSpeed: 0.05
        };
      } else { // Desktop
        return {
          particleCount: 100,
          maxDistance: 180,
          minDistance: 40,
          mouseRadius: 200,
          returnSpeed: 0.05
        };
      }
    };
    
    let config = getConfig();
    let particleCount = config.particleCount;
    let maxDistance = config.maxDistance;
    let minDistance = config.minDistance;
    let mouseRadius = config.mouseRadius;
    let returnSpeed = config.returnSpeed;

    // Initialisation du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Création des particules avec espacement minimum
    const createParticles = () => {
      particlesRef.current = [];
      let attempts = 0;
      const maxAttempts = particleCount * 50; // Limite pour éviter boucle infinie
      
      while (particlesRef.current.length < particleCount && attempts < maxAttempts) {
        attempts++;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        // Vérifier si la nouvelle particule est assez éloignée des autres
        let tooClose = false;
        for (const existing of particlesRef.current) {
          const dx = x - existing.x;
          const dy = y - existing.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < minDistance) {
            tooClose = true;
            break;
          }
        }
        
        if (!tooClose) {
          particlesRef.current.push({
            x,
            y,
            vx: 0,
            vy: 0,
            radius: Math.random() * 2 + 1,
            originX: x,
            originY: y,
          });
        }
      }
    };

    const handleResize = () => {
      config = getConfig();
      particleCount = config.particleCount;
      maxDistance = config.maxDistance;
      minDistance = config.minDistance;
      mouseRadius = config.mouseRadius;
      returnSpeed = config.returnSpeed;
      
      resizeCanvas();
      createParticles(); // Recréer les particules avec la nouvelle configuration
    };
    
    // Initialisation
    handleResize();
    window.addEventListener("resize", handleResize);

    // Gestion de la souris et du tactile
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Zones d'exclusion (header et footer)
    const getExclusionZones = () => {
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      const zones = [];
      
      if (header) {
        const rect = header.getBoundingClientRect();
        zones.push({ top: 0, bottom: rect.bottom, left: 0, right: canvas.width });
      }
      
      if (footer) {
        const rect = footer.getBoundingClientRect();
        zones.push({ top: rect.top, bottom: canvas.height, left: 0, right: canvas.width });
      }
      
      return zones;
    };

    const isInExclusionZone = (x: number, y: number, zones: Array<{top: number, bottom: number, left: number, right: number}>) => {
      return zones.some(zone => 
        x >= zone.left && x <= zone.right && y >= zone.top && y <= zone.bottom
      );
    };

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const exclusionZones = getExclusionZones();

      // Mise à jour et dessin des particules
      particlesRef.current.forEach((particle, i) => {
        // Interaction avec la souris
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          // Répulsion de la souris
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.3;
          particle.vy -= Math.sin(angle) * force * 0.3;
        }

        // Retour vers la position d'origine
        const dxOrigin = particle.originX - particle.x;
        const dyOrigin = particle.originY - particle.y;
        particle.vx += dxOrigin * returnSpeed;
        particle.vy += dyOrigin * returnSpeed;

        // Friction
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Mouvement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Ne dessiner que si la particule n'est pas dans une zone d'exclusion
        const inExclusionZone = isInExclusionZone(particle.x, particle.y, exclusionZones);
        
        if (!inExclusionZone) {
          // Dessin de la particule
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particleColor;
          ctx.fill();

          // Connexions avec les autres particules
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const other = particlesRef.current[j];
            
            // Ne pas dessiner la connexion si l'autre particule est dans une zone d'exclusion
            if (isInExclusionZone(other.x, other.y, exclusionZones)) continue;
            
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              const opacity = 1 - distance / maxDistance;
              ctx.strokeStyle = lineColor.replace("0.15", String(opacity * 0.15));
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Nettoyage
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particleColor, lineColor]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={-1}
      pointerEvents="none"
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
}
