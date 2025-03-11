import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Position, positionLabels } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function PositionPage({ params }: { params: { position: string } }) {
  const position = params.position as Position;
  
  // Validate position
  if (!Object.keys(positionLabels).includes(position)) {
    notFound();
  }

  // Define actions based on position
  const actions = [];
  
  // Everyone except BB can open (BB acts last preflop)
  if (position !== "BB") {
    actions.push({
      title: "Open (RFI)",
      href: `/position/${position}/rfi`,
      description: "Opening ranges when folded to you"
    });
  }
  
  // If not BB, you can face an open and play IP or OOP based on position
  if (position !== "BB") {
    // Only SB is OOP vs Button, CO, HJ, LJ
    if (position === "SB") {
      actions.push({
        title: "Vs Open (OOP)",
        href: `/position/${position}/vs-open-oop`,
        description: "Playing against an open out of position"
      });
    } else if (position !== "LJ") {
      // Everyone except SB, BB, and LJ can face opens from later positions and be IP
      actions.push({
        title: "Vs Open (IP)",
        href: `/position/${position}/vs-open-ip`,
        description: "Playing against an open in position"
      });
    }
  }
  
  // BB is always OOP
  if (position === "BB") {
    actions.push({
      title: "Vs Open (OOP)",
      href: `/position/${position}/vs-open-oop`,
      description: "Playing against an open out of position"
    });
    
    // BB vs SB is a special scenario
    actions.push({
      title: "Vs SB",
      href: `/position/${position}/vs-sb`,
      description: "Playing against Small Blind"
    });
  }

  // SB vs BB is a special scenario
  if (position === "SB") {
    actions.push({
      title: "Vs BB",
      href: `/position/${position}/vs-bb`,
      description: "Playing against Big Blind"
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/">
            <Button variant="outline">Back</Button>
          </Link>
          <h1 className="text-3xl font-bold text-center">
            {positionLabels[position]} <span className="opacity-80">({position})</span>
          </h1>
          <div className="w-[73px]"></div> {/* Spacer for even centering */}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Select Action</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actions.map((action, index) => (
              <Link href={action.href} key={index} className="w-full">
                <Button size="xl" className="w-full flex flex-col p-6 h-auto">
                  <span className="text-xl">{action.title}</span>
                  <span className="text-sm opacity-80 mt-1">{action.description}</span>
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}