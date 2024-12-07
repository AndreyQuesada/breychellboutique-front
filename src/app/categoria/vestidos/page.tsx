// src/app/pantalones/page.tsx
"use client";

import React, { useState } from "react";
import dynamic from 'next/dynamic'

const Vestidos = dynamic(() => import('@/components/Vestidos'), { ssr: false })
export default function PantalonesPage() {

  return (
    <Vestidos
    />
  );
}
