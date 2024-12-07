// src/app/pantalones/page.tsx
"use client";

import React, { useState } from "react";
import dynamic from 'next/dynamic'

const Interior = dynamic(() => import('@/components/Ropa-Interior'), { ssr: false })
export default function PantalonesPage() {

  return (
    <Interior
    />
  );
}
