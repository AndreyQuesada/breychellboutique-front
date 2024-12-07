// src/app/pantalones/page.tsx
"use client";

import React, { useState } from "react";
import dynamic from 'next/dynamic'

const Pantalones = dynamic(() => import('@/components/Pantalones'), { ssr: false })
export default function PantalonesPage() {

  return (
    <Pantalones
    />
  );
}
