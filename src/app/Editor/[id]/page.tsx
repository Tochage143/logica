"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const fileId = params?.id as string;
  const [data, setData] = useState<any>(null);
  const [title ,setTitle ] = useState<string>("");

  // Fetch data when fileId is available
  useEffect(() => {
    if (!fileId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/Data/${fileId}`);
        const result = await res.json();
        setData(JSON.parse(result.content || "{}"));
        setTitle(result.name || "Untitled Document");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fileId]);

  // Auto save every 5 seconds
  useEffect(() => {
    if (!fileId || !data) return;

    const interval = setInterval(() => {
      fetch(`/api/Data/${fileId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: JSON.stringify(data) }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("Data saved:", result);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    }, 5000);

    return () => clearInterval(interval);
  }, [fileId, data]); // Ensure this effect runs when data or fileId changes

  // Handle data loading
  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-lg">Loading editor, please wait...</p>
      </div>
    );
  }

  // Render the editor
  return (
    <>
      <div className="flex flex-col gap-2 p-4  h-screen">
        <h1 className="text-3xl font-bold">{title}</h1>
        
        <div className="flex-1 overflow-hidden">
          <SimpleEditor data={data} onChange={setData} />;
        </div>
      </div>
    </>
  );
}
