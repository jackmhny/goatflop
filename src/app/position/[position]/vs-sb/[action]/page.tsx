import { Button } from "@/components/ui/button";
import { Position, positionLabels, getImageFilename, Scenario, SBvsBBAction } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function VsSBStrategyPage({ 
  params 
}: { 
  params: { position: string; action: string } 
}) {
  const position = params.position as Position;
  const action = params.action.toUpperCase() as SBvsBBAction;
  
  // Validate position - only BB can play vs SB
  if (position !== "BB") {
    notFound();
  }

  // Validate action
  if (!["LIMP", "RAISE"].includes(action)) {
    notFound();
  }

  // Create scenario
  const scenario: Scenario = {
    action: "SB_VS_BB",
    sbAction: action
  };

  // Get image filename
  const filename = getImageFilename(scenario);
  
  // Action label
  const actionLabel = action === "LIMP" ? "Limps" : "Raises";

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <Link href={`/position/${position}/vs-sb`}>
            <Button variant="outline">Back</Button>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-center">
            {positionLabels[position]} vs {positionLabels["SB"]} ({actionLabel})
          </h1>
          <div className="w-[73px]"></div> {/* Spacer for even centering */}
        </div>
        
        <Link href="/" className="block w-full h-auto aspect-[4/3] relative">
          <Image
            src={`/images/${filename}`}
            alt={`${positionLabels[position]} vs ${positionLabels["SB"]} when SB ${actionLabel}`}
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