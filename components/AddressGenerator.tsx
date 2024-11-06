"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AddressDisplay } from "./AddressDisplay";
import { generateAddress } from "@/lib/bitcoin";
import { toast } from "sonner";

export function AddressGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [rate, setRate] = useState(0);
  const startTimeRef = useRef<number>(0);
  const generationRef = useRef<boolean>(false);

  useEffect(() => {
    import('@/lib/bitcoin').then(() => {
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    const updateRate = () => {
      if (isGenerating && startTimeRef.current) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setRate(Math.round(attempts / Math.max(elapsed, 1)));
      }
    };

    const interval = setInterval(updateRate, 1000);
    return () => clearInterval(interval);
  }, [isGenerating, attempts]);

  const handleGenerate = useCallback(async () => {
    if (!isReady) return;
    
    setIsGenerating(true);
    setAttempts(0);
    startTimeRef.current = Date.now();
    generationRef.current = true;

    while (generationRef.current) {
      const result = await generateAddress();
      setAttempts(prev => prev + 1);
      setCurrentAddress(result.address);
      setPrivateKey(result.privateKey);

      if (result.address.toLowerCase().endsWith('maga')) {
        generationRef.current = false;
        setAddress(result.address);
        const duration = ((Date.now() - startTimeRef.current) / 1000).toFixed(1);
        toast.success(`Found MAGA address in ${duration}s after ${attempts + 1} attempts!`);
        break;
      }

      // Prevent UI freezing
      await new Promise(resolve => setTimeout(resolve, 0));
    }

    setIsGenerating(false);
  }, [isReady, attempts]);

  const stopGeneration = () => {
    generationRef.current = false;
    setIsGenerating(false);
  };

  return (
    <Card className="w-full max-w-2xl bg-gray-800 border-gray-700 p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Attempts: {attempts.toLocaleString()}</span>
            <span className="text-sm text-gray-400">
              Rate: {rate} addr/s
            </span>
          </div>
          <Progress value={attempts % 100} className="h-1" />
        </div>

        {isGenerating && (
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Current Address:</div>
            <code className="block w-full p-3 bg-gray-900 rounded-lg text-sm break-all">
              {currentAddress}
            </code>
          </div>
        )}

        <Button
          size="lg"
          className="w-full"
          onClick={isGenerating ? stopGeneration : handleGenerate}
          disabled={!isReady}
        >
          {!isReady ? "Loading..." : isGenerating ? "Stop Generation" : "Start Generation"}
        </Button>

        {address && (
          <div className="space-y-4 border-t border-gray-700 pt-4 mt-4">
            <h3 className="text-lg font-semibold text-green-400">Found MAGA Address!</h3>
            <AddressDisplay label="Address" value={address} />
            <AddressDisplay label="Private Key" value={privateKey} />
          </div>
        )}
      </div>
    </Card>
  );
}