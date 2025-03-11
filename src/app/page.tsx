import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Position, positionLabels } from "@/lib/types";
import Link from "next/link";

export default function Home() {
  // Positions in proper table order
  const positions: Position[] = ["SB", "BB", "LJ", "HJ", "CO", "BTN"];
  const [showHelp, setShowHelp] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-center mb-8 relative">
          <h1 className="text-3xl md:text-4xl font-bold text-center">GoatFlop Poker Charts</h1>
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute right-0 rounded-full w-8 h-8 p-0"
            onClick={() => setShowHelp(!showHelp)}
          >
            ?
          </Button>
        </div>
        
        {showHelp && (
          <Card className="mb-4">
            <CardContent className="pt-6">
              <h3 className="font-medium text-lg mb-2">How to use:</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Select your position (SB, BB, LJ, HJ, CO, BTN)</li>
                <li>Choose your scenario (RFI, vs Open IP/OOP, etc.)</li>
                <li>If applicable, select opponent's position</li>
                <li>View the strategy chart</li>
                <li>Click anywhere on the chart to return home</li>
              </ol>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Select Your Position</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {positions.map((position) => (
              <Link href={`/position/${position}`} key={position}>
                <Button 
                  size="xl" 
                  className="w-full flex flex-col"
                >
                  <span>{positionLabels[position]}</span>
                  <span className="text-xs opacity-80 mt-1">({position})</span>
                </Button>
              </Link>
            ))}
          </CardContent>
          <CardFooter className="flex justify-center mt-4">
            <p className="text-center text-sm text-muted-foreground">
              Created by Jack Mahoney
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
