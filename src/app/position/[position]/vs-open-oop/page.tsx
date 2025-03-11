import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Position, positionLabels } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function VsOpenOOPPage({ params }: { params: { position: string } }) {
  const position = params.position as Position;
  
  // Validate position
  if (!Object.keys(positionLabels).includes(position)) {
    notFound();
  }

  // BB can play OOP against all positions
  // SB can play OOP against LJ, HJ, CO, BTN
  // Other positions don't play OOP against opens
  
  // Define possible villain positions
  const villainPositions: Position[] = [];
  
  if (position === "BB") {
    villainPositions.push("LJ", "HJ", "CO", "BTN", "SB");
  } else if (position === "SB") {
    villainPositions.push("LJ", "HJ", "CO", "BTN");
  } else {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href={`/position/${position}`}>
            <Button variant="outline">Back</Button>
          </Link>
          <h1 className="text-2xl font-bold text-center">
            {positionLabels[position]} <span className="opacity-80">({position})</span> vs Opens (OOP)
          </h1>
          <div className="w-[73px]"></div> {/* Spacer for even centering */}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Select Villain Position</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {villainPositions.map((villainPos) => (
              <Link 
                href={`/position/${position}/vs-open-oop/${villainPos}`} 
                key={villainPos}
                className="w-full"
              >
                <Button size="xl" className="w-full flex flex-col">
                  <span>{positionLabels[villainPos]}</span>
                  <span className="text-sm opacity-80 mt-1">({villainPos})</span>
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}