"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

const GraphView = () => {
  const [apiData, setApiData] = useState(null);
  const [settings, setSettings] = useState({
    nodeSize: 8,
    linkDistance: 100,
    showLinks: true,
    theme: "dark",
  });
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/files");
        const data = await res.json();
        setApiData(data.folderData);
        setLoading(false); // Data is fetched, so set loading to false
      } catch (error) {
        console.error("Error fetching API:", error);
        setLoading(false); // In case of error, set loading to false
      }
    };

    fetchData();
  }, []);

  // Handle settings change
  const handleSettingChange = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Recursive conversion from API structure to graph format
  const convertToGraph = useCallback((folder, parentId = null, graph = { nodes: [], links: [] }) => {
    const nodeId = folder.id;
    graph.nodes.push({ id: nodeId, name: folder.name || "Unnamed" });

    if (parentId) {
      graph.links.push({ source: parentId, target: nodeId });
    }

    const children = folder.items?.length ? folder.items : folder.children || [];

    children.forEach((child) => convertToGraph(child, nodeId, graph));
    return graph;
  }, []);

  const graph = useMemo(() => (apiData ? convertToGraph(apiData) : { nodes: [], links: [] }), [apiData, convertToGraph]);

  return (
    <div className={`flex h-screen w-full overflow-hidden ${settings.theme === "dark" ? "bg-gray-900" : "bg-blue-900"} text-white`}>
      <div className="flex-grow relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900">
            <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          apiData && (
            <ForceGraph2D
              width={window.innerWidth * 0.75}
              height={window.innerHeight}
              graphData={graph}
              nodeAutoColorBy="id"
              linkColor={(link) => link.color || "#00ff99"}
              linkDirectionalArrowLength={settings.showLinks ? 5 : 0}
              linkCurvature={0.2}
              nodeRelSize={settings.nodeSize}
              linkDistance={settings.linkDistance}
              enableNodeDrag
              enableZoomPanInteraction
              fitView
              nodeCanvasObject={(node, ctx) => {
                const maxLength = 10;
                const words = node.name.match(new RegExp(`.{1,${maxLength}}`, "g")) || [];
              
                ctx.fillStyle = node.color || "#ffffff";
                ctx.beginPath();
                ctx.arc(node.x, node.y, settings.nodeSize, 0, 2 * Math.PI);
                ctx.fill();
              
                ctx.font = "10px Arial";
                ctx.textAlign = "left";
                ctx.textBaseline = "middle";
              
                words.forEach((line, index) => {
                  ctx.fillText(line, node.x + 10, node.y + index * 12);
                });
              }}
            />
          )
        )}
      </div>

      <Card className="w-1/4 p-4 bg-gray-800 border-l border-gray-700 overflow-y-auto">
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

export default function Page() {
  return <GraphView />;
}
