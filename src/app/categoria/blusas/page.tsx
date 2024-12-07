// src/app/pantalones/page.tsx
"use client";

import React, { useState } from "react";
import dynamic from 'next/dynamic'

const Blusas = dynamic(() => import('@/components/Blusas'), { ssr: false })
export default function PantalonesPage() {

  return (
    <Blusas
    />
  );
}
