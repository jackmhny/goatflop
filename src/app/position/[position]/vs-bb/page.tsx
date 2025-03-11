import { Button } from "@/components/ui/button";
import { Position, positionLabels, getImageFilename, Scenario } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function VsBBPage({ 
  params 
}: { 
  params: { position: string } 
}) {
  const position = params.position as Position;
  
  // Validate position - only SB can play vs BB
  if (position !== "SB") {
    notFound();
  }

  // Special case - SB strategy is a single image
  const filename = "SB_STRATEGY.png";

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <Link href={`/position/${position}`}>
            <Button variant="outline">Back</Button>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-center">
            {positionLabels[position]} vs {positionLabels["BB"]}
          </h1>
          <div className="w-[73px]"></div> {/* Spacer for even centering */}
        </div>
        
        <Link href="/" className="block w-full h-auto aspect-[4/3] relative">
          <Image
            src={`/images/${filename}`}
            alt={`${positionLabels[position]} vs ${positionLabels["BB"]} Strategy`}
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