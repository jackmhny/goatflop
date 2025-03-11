import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Position, positionLabels } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function VsOpenIPPage({ params }: { params: { position: string } }) {
  const position = params.position as Position;
  
  // Validate position
  if (!Object.keys(positionLabels).includes(position)) {
    notFound();
  }

  // Only certain positions can play in position against opens
  if (position === "BB" || position === "SB") {
    notFound();
  }

  // Define possible villain positions
  const villainPositions: Position[] = [];
  
  // Add earlier positions as villains
  if (position === "BTN") {
    villainPositions.push("CO", "HJ", "LJ");
  } else if (position === "CO") {
    villainPositions.push("HJ", "LJ");
  } else if (position === "HJ") {
    villainPositions.push("LJ");
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href={`/position/${position}`}>
            <Button variant="outline">Back</Button>
          </Link>
          <h1 className="text-2xl font-bold text-center">
            {positionLabels[position]} <span className="opacity-80">({position})</span> vs Opens (IP)
          </h1>
          <div className="w-[73px]"></div> {/* Spacer for even centering */}
        </div>
        
        {villainPositions.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Select Villain Position</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {villainPositions.map((villainPos) => (
                <Link 
                  href={`/position/${position}/vs-open-ip/${villainPos}`} 
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
        ) : (
          <div className="text-center p-8">
            <p className="text-xl">No earlier positions to call from {positionLabels[position]}.</p>
            <Link href={`/position/${position}`} className="mt-4 inline-block">
              <Button>Go Back</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}