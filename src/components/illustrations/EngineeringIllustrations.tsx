import React from "react";

export function AirConditioningIllustration({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Industrial Air-Conditioning & HVAC System Line Illustration"
    >
      {/* Outer Housing Unit */}
      <rect x="20" y="25" width="200" height="110" rx="8" stroke="#04374D" strokeWidth="2" fill="#FFFFFF" />
      
      {/* Top Mounting Bracket */}
      <path d="M40 25 V15 H60 V25 M180 25 V15 H200 V25" stroke="#04374D" strokeWidth="2" strokeLinecap="round" />
      
      {/* Circular Fan Grille */}
      <circle cx="80" cy="80" r="38" stroke="#04374D" strokeWidth="2" strokeDasharray="4 3" />
      <circle cx="80" cy="80" r="14" stroke="#2BC194" strokeWidth="2" fill="#E4EEF2" />
      
      {/* Fan Blades in Teal */}
      <path d="M80 66 C85 72, 90 76, 94 80" stroke="#2BC194" strokeWidth="2" strokeLinecap="round" />
      <path d="M94 80 C90 85, 85 90, 80 94" stroke="#2BC194" strokeWidth="2" strokeLinecap="round" />
      <path d="M80 94 C75 90, 70 85, 66 80" stroke="#2BC194" strokeWidth="2" strokeLinecap="round" />
      <path d="M66 80 C70 75, 75 70, 80 66" stroke="#2BC194" strokeWidth="2" strokeLinecap="round" />
      
      {/* Condenser Louver Slats on Right */}
      <line x1="140" y1="45" x2="205" y2="45" stroke="#04374D" strokeWidth="2" strokeLinecap="round" />
      <line x1="140" y1="58" x2="205" y2="58" stroke="#04374D" strokeWidth="2" strokeLinecap="round" />
      <line x1="140" y1="71" x2="205" y2="71" stroke="#04374D" strokeWidth="2" strokeLinecap="round" />
      <line x1="140" y1="84" x2="205" y2="84" stroke="#2BC194" strokeWidth="2" strokeLinecap="round" />
      <line x1="140" y1="97" x2="205" y2="97" stroke="#04374D" strokeWidth="2" strokeLinecap="round" />
      <line x1="140" y1="110" x2="205" y2="110" stroke="#04374D" strokeWidth="2" strokeLinecap="round" />
      <line x1="140" y1="123" x2="205" y2="123" stroke="#04374D" strokeWidth="2" strokeLinecap="round" />

      {/* Refrigerant Flow Lines & Valves */}
      <path d="M220 55 H232 V95 H220" stroke="#2BC194" strokeWidth="2" strokeLinecap="round" />
      <circle cx="232" cy="75" r="3" fill="#2BC194" />

      {/* Status LED indicators */}
      <circle cx="35" cy="40" r="2.5" fill="#2BC194" />
      <circle cx="44" cy="40" r="2.5" fill="#04374D" />
      <circle cx="53" cy="40" r="2.5" fill="#04374D" />
      
      {/* Subtle airflow wave lines */}
      <path d="M8 70 C12 68, 14 74, 18 72" stroke="#2BC194" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 80 C10 78, 12 84, 18 82" stroke="#2BC194" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 90 C12 88, 14 94, 18 92" stroke="#2BC194" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IndustrialFacilityIllustration({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Industrial Plant and Processing Facility Line Illustration"
    >
      {/* Ground Foundation */}
      <line x1="10" y1="145" x2="230" y2="145" stroke="#04374D" strokeWidth="2" strokeLinecap="round" />

      {/* Primary Distillation Column / Silo */}
      <rect x="25" y="30" width="36" height="115" rx="3" stroke="#04374D" strokeWidth="2" fill="#FFFFFF" />
      <path d="M25 30 C25 22, 61 22, 61 30" stroke="#04374D" strokeWidth="2" fill="#FFFFFF" />
      <line x1="25" y1="55" x2="61" y2="55" stroke="#2BC194" strokeWidth="1.5" />
      <line x1="25" y1="80" x2="61" y2="80" stroke="#04374D" strokeWidth="1.5" />
      <line x1="25" y1="105" x2="61" y2="105" stroke="#2BC194" strokeWidth="1.5" />
      <line x1="25" y1="130" x2="61" y2="130" stroke="#04374D" strokeWidth="1.5" />

      {/* Main Structural Warehouse / Plant Building */}
      <rect x="75" y="60" width="90" height="85" rx="2" stroke="#04374D" strokeWidth="2" fill="#FFFFFF" />
      {/* Gabled roof */}
      <path d="M70 60 L120 35 L170 60 Z" stroke="#04374D" strokeWidth="2" fill="#FFFFFF" />
      {/* Building Windows / Grid */}
      <rect x="85" y="75" width="20" height="25" rx="1" stroke="#2BC194" strokeWidth="1.5" fill="#E4EEF2" />
      <rect x="115" y="75" width="20" height="25" rx="1" stroke="#2BC194" strokeWidth="1.5" fill="#E4EEF2" />
      <rect x="145" y="75" width="12" height="25" rx="1" stroke="#2BC194" strokeWidth="1.5" fill="#E4EEF2" />
      {/* Access Door */}
      <rect x="105" y="115" width="30" height="30" rx="1" stroke="#04374D" strokeWidth="1.5" />

      {/* Spherical Pressurized Storage Tank */}
      <circle cx="195" cy="85" r="24" stroke="#04374D" strokeWidth="2" fill="#FFFFFF" />
      {/* Tank Equator Line */}
      <ellipse cx="195" cy="85" rx="24" ry="7" stroke="#2BC194" strokeWidth="1.5" />
      {/* Tank Vertical Stilt Legs */}
      <line x1="178" y1="102" x2="174" y2="145" stroke="#04374D" strokeWidth="2" strokeLinecap="round" />
      <line x1="212" y1="102" x2="216" y2="145" stroke="#04374D" strokeWidth="2" strokeLinecap="round" />
      <line x1="195" y1="109" x2="195" y2="145" stroke="#04374D" strokeWidth="2" strokeLinecap="round" />

      {/* High-Pressure Connecting Manifold Pipeline */}
      <path d="M61 90 H75 M165 90 H171" stroke="#2BC194" strokeWidth="2" strokeLinecap="round" />
      <path d="M43 22 V15 H100 V35" stroke="#2BC194" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
