import { Button } from "@/components/ui/button";
import { Position, positionLabels, getImageFilename, Scenario } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function VsOpenOOPStrategyPage({ 
  params 
}: { 
  params: { position: string; villain: string } 
}) {
  const position = params.position as Position;
  const villain = params.villain as Position;
  
  // Validate positions
  if (!Object.keys(positionLabels).includes(position) || 
      !Object.keys(positionLabels).includes(villain)) {
    notFound();
  }

  // Validate relationship 
  // BB can be OOP vs any position
  // SB can be OOP vs LJ, HJ, CO, BTN
  let isValidMatch = false;
  
  if (position === "BB" && villain !== "BB") {
    isValidMatch = true;
  } else if (position === "SB" && ["LJ", "HJ", "CO", "BTN"].includes(villain)) {
    isValidMatch = true;
  }
  
  if (!isValidMatch) {
    notFound();
  }

  // Create scenario for OOP vs RFI
  const scenario: Scenario = {
    heroPosition: position,
    villainPosition: villain,
    action: "VS_RFI_OOP"
  };

  // Get image filename
  const filename = getImageFilename(scenario);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <Link href={`/position/${position}/vs-open-oop`}>
            <Button variant="outline">Back</Button>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-center">
            {positionLabels[position]} vs {positionLabels[villain]} Open (OOP)
          </h1>
          <div className="w-[73px]"></div> {/* Spacer for even centering */}
        </div>
        
        <Link href="/" className="block w-full h-auto aspect-[4/3] relative">
          <Image
            src={`/images/${filename}`}
            alt={`${positionLabels[position]} vs ${positionLabels[villain]} (OOP)`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>
      </div>
    </main>
  );
}