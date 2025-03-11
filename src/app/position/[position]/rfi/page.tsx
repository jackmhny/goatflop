import { Button } from "@/components/ui/button";
import { Position, positionLabels, getImageFilename, Scenario } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RFIPage({ params }: { params: { position: string } }) {
  const position = params.position as Position;
  
  // Validate position
  if (!Object.keys(positionLabels).includes(position)) {
    notFound();
  }

  // Create scenario for RFI
  const scenario: Scenario = {
    heroPosition: position,
    action: "RFI"
  };

  // Get image filename
  let filename = getImageFilename(scenario);
  
  // Special case for BB - RFI image is missing
  if (position === "BB") {
    // BB rarely has an opportunity to RFI since they act last preflop
    return (
      <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
        <div className="w-full max-w-6xl">
          <div className="mb-4 flex items-center justify-between">
            <Link href={`/position/${position}`}>
              <Button variant="outline">Back</Button>
            </Link>
            <h1 className="text-2xl font-bold text-center">
              {positionLabels[position]} Opening Range
            </h1>
            <div className="w-[73px]"></div> {/* Spacer for even centering */}
          </div>
          
          <div className="bg-card border rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Big Blind RFI</h2>
            <p className="text-lg mb-4">
              The Big Blind acts last preflop, so there's rarely an opportunity to "Raise First In" from this position.
            </p>
            <p className="mb-4">
              If everyone else has folded to the BB, the hand is over and the BB wins the blinds uncontested.
            </p>
            <Link href={`/position/${position}`}>
              <Button className="mt-4">Back to Big Blind Options</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <Link href={`/position/${position}`}>
            <Button variant="outline">Back</Button>
          </Link>
          <h1 className="text-2xl font-bold text-center">
            {positionLabels[position]} Opening Range
          </h1>
          <div className="w-[73px]"></div> {/* Spacer for even centering */}
        </div>
        
        <Link href={`/position/${position}`} className="block w-full h-auto aspect-[4/3] relative">
          <Image
            src={`/images/${filename}`}
            alt={`${positionLabels[position]} Opening Range`}
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