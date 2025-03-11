import { Button } from "@/components/ui/button";
import { Position, positionLabels, getImageFilename, Scenario } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function VsOpenIPStrategyPage({ 
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

  // Validate relationship (hero must be after villain in position)
  const positionOrder: Position[] = ["LJ", "HJ", "CO", "BTN", "SB", "BB"];
  const heroIndex = positionOrder.indexOf(position);
  const villainIndex = positionOrder.indexOf(villain);
  
  if (heroIndex <= villainIndex || heroIndex === -1 || villainIndex === -1) {
    notFound();
  }

  // Create scenario for IP vs RFI
  const scenario: Scenario = {
    heroPosition: position,
    villainPosition: villain,
    action: "VS_RFI_IP"
  };

  // Get image filename
  const filename = getImageFilename(scenario);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <Link href={`/position/${position}/vs-open-ip`}>
            <Button variant="outline">Back</Button>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-center">
            {positionLabels[position]} vs {positionLabels[villain]} Open (IP)
          </h1>
          <div className="w-[73px]"></div> {/* Spacer for even centering */}
        </div>
        
        <Link href="/" className="block w-full h-auto aspect-[4/3] relative">
          <Image
            src={`/images/${filename}`}
            alt={`${positionLabels[position]} vs ${positionLabels[villain]} (IP)`}
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