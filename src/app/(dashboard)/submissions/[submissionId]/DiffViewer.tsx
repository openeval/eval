"use client";
import { parseDiff, Diff, Hunk, Decoration } from "react-diff-view";
import "react-diff-view/style/index.css";

export const DiffViewer = ({ diffText }) => {
  const files = parseDiff(diffText);

  const renderFile = ({
    oldPath,
    newPath,
    oldRevision,
    newRevision,
    type,
    hunks,
  }) => (
    <div className="mb-8 border">
      <header className="diff-header border-b p-2 font-normal">
        {oldPath === newPath ? oldPath : `${oldPath} -> ${newPath}`}
      </header>
      <Diff
        key={oldRevision + "-" + newRevision}
        viewType="split"
        diffType={type}
        hunks={hunks}
      >
        {(hunks) =>
          hunks.map((hunk) => (
            <>
              <Decoration key={"deco-" + hunk.content}>
                <div className="hunk-header bg-cyan-100 px-6">
                  {hunk.content}
                </div>
              </Decoration>
              <Hunk key={hunk.content} hunk={hunk} />
            </>
          ))
        }
      </Diff>
    </div>
  );

  return <div>{files.map(renderFile)}</div>;
};
