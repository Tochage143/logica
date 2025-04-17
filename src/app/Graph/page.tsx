"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

const GraphView = ({ graphData }) => {
  const [settings, setSettings] = useState({
    nodeSize: 8,
    linkDistance: 100,
    showLinks: true,
    theme: "dark",
  });

  const handleSettingChange = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const convertToGraph = useCallback((folder, parent = null, graph = { nodes: [], links: [] }) => {
    const node = { id: folder.name || "Root" };
    graph.nodes.push(node);

    if (parent) {
      graph.links.push({ source: parent, target: node.id });
    }

    folder.children?.forEach((child) => convertToGraph(child, node.id, graph));
    return graph;
  }, []);

  const graph = useMemo(() => convertToGraph(graphData), [graphData, convertToGraph]);

  return (
    <div className={`flex h-screen w-full ${settings.theme === "dark" ? "bg-gray-900" : "bg-blue-900"} text-white`}>
      <div className="flex-grow p-4">
        <ForceGraph2D
          graphData={graph}
          nodeAutoColorBy="id"
          linkDirectionalArrowLength={settings.showLinks ? 5 : 0}
          linkCurvature={0.2}
          nodeRelSize={settings.nodeSize}
          linkDistance={settings.linkDistance}
          enableNodeDrag
          enableZoomPanInteraction
          nodeCanvasObject={(node, ctx) => {
            ctx.fillStyle = node.color || "#ffffff";
            ctx.beginPath();
            ctx.arc(node.x, node.y, settings.nodeSize, 0, 2 * Math.PI);
            ctx.fill();
            ctx.font = "12px Arial";
            ctx.fillText(node.id, node.x + 10, node.y);
          }}
        />
      </div>

      <Card className="w-1/4 p-4 bg-gray-800 border-l border-gray-700">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <div className="mb-4">
            <label className="block text-gray-300">Node Size</label>
            <Slider value={[settings.nodeSize]} min={5} max={20} onValueChange={(val) => handleSettingChange("nodeSize", val[0])} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Link Distance</label>
            <Slider value={[settings.linkDistance]} min={50} max={200} onValueChange={(val) => handleSettingChange("linkDistance", val[0])} />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block text-gray-300 mr-2">Show Links</label>
            <Switch checked={settings.showLinks} onCheckedChange={(val) => handleSettingChange("showLinks", val)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Theme</label>
            <Select onValueChange={(val) => handleSettingChange("theme", val)} defaultValue={settings.theme}>
              <SelectTrigger>
                <SelectValue placeholder="Select Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const folder = {
  name: "",
  children: [
    { name: "src", children: [{ name: "index.js" }, { name: "styles.css" }] },
    { name: "node_modules", children: [{ name: "react", children: [{ name: "index.js" }] }] },
    { name: ".gitignore" },
    { name: "package.json" },
    { name: "README.md" },
    { name: "server.py" },
  ],
};

export default function Page() {
  return <GraphView graphData={folder} />;
}