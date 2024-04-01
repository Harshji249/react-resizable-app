import React from 'react'
import Splitter from "./Splitter";
import { useResizable } from "react-resizable-layout";
import { cn } from "../utils/cn";
import AddNote from './AddNote';
import AllNotes from './AllNotes';
import TotalNotes from './TotalNotes';
const MainWindow = () => {
    const {
        isDragging: isTerminalDragging,
        position: terminalH,
        splitterProps: terminalDragBarProps
      } = useResizable({
        axis: "y",
        initial: 150,
        min: 50,
        reverse: true
      });

      const {
        isDragging: isFileDragging,
        position: fileW,
        splitterProps: fileDragBarProps
      } = useResizable({
        axis: "x",
        initial: 250,
        min: 50
      });

      const {
        isDragging: isPluginDragging,
        position: pluginW,
        splitterProps: pluginDragBarProps
      } = useResizable({
        axis: "x",
        initial: 200,
        min: 50,
        reverse: true
      });
  return (
    <div
    className={
      "flex flex-column h-screen bg-dark font-mono color-white overflow-hidden"
    }
  >
    <div className={"flex grow"}>
      <div
        className={cn("shrink-0 contents", isFileDragging && "dragging")}
        style={{ width: fileW }}
      >
    <AddNote/>
      </div>
      <Splitter isDragging={isFileDragging} {...fileDragBarProps} />
      <div className={"flex grow"}>
        <div className={"grow bg-darker contents-new"}> 
        <h1>All Tasks</h1>
       <AllNotes/>
    
      </div>
      </div>
    </div>
    <Splitter
      dir={"horizontal"}
      isDragging={isTerminalDragging}
      {...terminalDragBarProps}
    />
    <div
      className={cn(
        "shrink-0 bg-darker contents",
        isTerminalDragging && "dragging"
      )}
      style={{ height: terminalH }}
    >
        <TotalNotes/>
    </div>
  </div>
  )
}

export default MainWindow
