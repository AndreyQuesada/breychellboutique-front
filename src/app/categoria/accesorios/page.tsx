// src/app/pantalones/page.tsx
"use client";

import React, { useState } from "react";
import dynamic from 'next/dynamic'

const Accesorios = dynamic(() => import('@/components/Accesorios'), { ssr: false })
export default function PantalonesPage() {

  return (
    <Accesorios
    />
  );
}
