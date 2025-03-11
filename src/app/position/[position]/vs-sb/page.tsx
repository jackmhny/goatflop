import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Position, positionLabels, SBvsBBAction } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function VsSBPage({ params }: { params: { position: string } }) {
  const position = params.position as Position;
  
  // Validate position - only BB can play vs SB
  if (position !== "BB") {
    notFound();
  }

  // SB can either limp or raise
  const actions: { key: SBvsBBAction; label: string }[] = [
    { key: "LIMP", label: "SB Limps" },
    { key: "RAISE", label: "SB Raises" }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href={`/position/${position}`}>
            <Button variant="outline">Back</Button>
          </Link>
          <h1 className="text-2xl font-bold text-center">
            {positionLabels[position]} <span className="opacity-80">({position})</span> vs {positionLabels["SB"]} <span className="opacity-80">(SB)</span>
          </h1>
          <div className="w-[73px]"></div> {/* Spacer for even centering */}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Select SB Action</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actions.map((action) => (
              <Link 
                href={`/position/${position}/vs-sb/${action.key.toLowerCase()}`} 
                key={action.key}
                className="w-full"
              >
                <Button size="xl" className="w-full">
                  <span>{action.label}</span>
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}