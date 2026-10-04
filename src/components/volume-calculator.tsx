"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { shapes, ShapeId, getShapeById } from "@/lib/volumes";
import { units, UnitId, getUnitById, getVolumeUnitLabel } from "@/lib/units";
import { ShapeDiagram } from "@/components/shape-diagrams";
import { MoreHorizontal } from "lucide-react";

export function VolumeCalculator() {
  const [selectedShapeId, setSelectedShapeId] = useState<ShapeId>("cone");
  const [selectedUnitId, setSelectedUnitId] = useState<UnitId>("cm");
  const [values, setValues] = useState<Record<string, string>>({});

  const shape = getShapeById(selectedShapeId);
  const unit = getUnitById(selectedUnitId);

  const handleShapeChange = (id: string) => {
    setSelectedShapeId(id as ShapeId);
    setValues({});
  };

  const handleValueChange = (paramId: string, value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setValues((prev) => ({ ...prev, [paramId]: value }));
    }
  };

  const volume = useMemo(() => {
    if (!shape) return null;
    const numericValues: Record<string, number> = {};
    for (const param of shape.params) {
      const val = parseFloat(values[param.id] || "");
      if (isNaN(val) || val <= 0) return null;
      numericValues[param.id] = val;
    }
    try {
      const result = shape.calculate(numericValues);
      if (!isFinite(result) || result < 0) return null;
      return result;
    } catch {
      return null;
    }
  }, [shape, values]);

  const formatVolume = (vol: number): React.ReactNode => {
    if (vol >= 1e9 || (vol !== 0 && vol < 0.0001)) {
      const exp = Math.floor(Math.log10(Math.abs(vol)));
      const coeff = vol / Math.pow(10, exp);
      const coeffStr = coeff.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 });
      return <>{coeffStr} × 10<sup>{exp}</sup></>;
    }
    if (vol >= 1000)
      return vol.toLocaleString("en-US", { maximumFractionDigits: 4 });
    return vol.toLocaleString("en-US", { maximumFractionDigits: 6 });
  };

  if (!shape) return null;

  return (
    <div className="w-screen h-screen flex p-6 gap-6">
      {/* LEFT SIDE — 3/5 — Shape selector + Diagram in one card */}
      <Card className="w-3/5 border-border/50 bg-card shadow-xl shadow-black/20 flex flex-col">
        <CardContent className="flex flex-col flex-1">
          {/* Shape selector */}
          <h1 className="text-2xl font-bold mb-4">Volume Calculator</h1>
          <FieldSection label="Shape">
            <Select value={selectedShapeId} onValueChange={handleShapeChange}>
              <SelectTrigger className="w-full bg-secondary/50 border-border/50 h-11 text-sm font-medium">
                <SelectValue placeholder="Select a shape" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border/50">
                {shapes.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldSection>

          {/* Diagram fills remaining space */}
          <div className="flex-1 flex items-center justify-center mt-4">
            <ShapeDiagram shapeId={selectedShapeId} />
          </div>
        </CardContent>
      </Card>

      {/* RIGHT SIDE — 2/5 — Everything in one card */}
      <div className="w-2/5 flex flex-col gap-4">
        <Card className="border-border/50 bg-card shadow-xl shadow-black/20 flex-1 overflow-auto">
          <CardContent className="space-y-5">
            {/* Volume display at top */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Volume</label>
              </div>
              <div className="w-full bg-secondary/30 border border-border/50 rounded-lg px-4 py-3 flex items-baseline gap-2">
                <span className={`text-4xl font-bold tracking-tight ${volume !== null ? "text-foreground" : "text-muted-foreground/40"}`}>
                  {volume !== null ? formatVolume(volume) : "—"}
                </span>
                <span className="text-lg font-medium text-muted-foreground">
                  {getVolumeUnitLabel(unit)}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/40" />

            {/* Unit selector */}
            <FieldSection label="Unit">
              <Select
                value={selectedUnitId}
                onValueChange={(v) => setSelectedUnitId(v as UnitId)}
              >
                <SelectTrigger className="w-full bg-secondary/50 border-border/50 h-11 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border/50">
                  {units.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldSection>

            {/* Dynamic input fields */}
            {shape.params.map((param) => (
              <FieldSection
                key={param.id}
                label={`${param.label} (${param.symbol})`}
              >
                <div className="relative">
                  <Input
                    id={`input-${param.id}`}
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={values[param.id] || ""}
                    onChange={(e) =>
                      handleValueChange(param.id, e.target.value)
                    }
                    className="w-full bg-secondary/50 border-border/50 h-11 pr-14 text-sm"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">
                    {unit.short}
                  </span>
                </div>
              </FieldSection>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FieldSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
      </div>
      {children}
    </div>
  );
}
