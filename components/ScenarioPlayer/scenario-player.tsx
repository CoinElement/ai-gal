"use client"
import { useScenario } from "@/lib/scenario-provider";
import { ImageTextScene } from "../ImageTextScene/image-text-scene";
import { VideoScene } from "../VideoScene/video-scene";
import { useEffect, useState } from "react";
import { Scene } from "@/lib/types";

export default function ScenarioPlayer({ scenarioId }: { scenarioId: string }) {
  const { scenario, currentSceneIndex, loadScenario } = useScenario();
  const [currentScene, setCurrentScene] = useState<Scene>();

  useEffect(() => {
    console.log("Loading scenario", scenarioId)
    loadScenario(scenarioId);
  }, [scenarioId, loadScenario])

  useEffect(() => {
    setCurrentScene(scenario?.scenes[currentSceneIndex]);
  }, [currentSceneIndex, scenario])

  return (
    <div id="scenario-player" className="w-full h-full flex flex-col">
      <div>
        {currentSceneIndex + 1} / {scenario?.scenes.length}
      </div>
      <div className="flex-grow"></div>
      {
        currentScene && (
          currentScene.type === "image-text" ?
            <ImageTextScene scene={currentScene} />
            :
            <VideoScene url={currentScene.url} />
        )
      }
    </div >
  )
}
