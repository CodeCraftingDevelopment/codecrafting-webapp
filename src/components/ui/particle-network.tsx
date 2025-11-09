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

    // Configuration
    const particleCount = 100;
    const maxDistance = 180;
    const mouseRadius = 200;
    const returnSpeed = 0.05;

    // Initialisation du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Création des particules
    const createParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
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
    };

    createParticles();

    // Gestion de la souris
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

        // Dessin de la particule
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Connexions avec les autres particules
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
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
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Nettoyage
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
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
