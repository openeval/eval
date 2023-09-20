"use client";
import { parseDiff, Diff, Hunk, Decoration } from "react-diff-view";

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
    <div className="border mb-8">
      <header className="diff-header p-2 font-normal border-b">
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
                <div className="hunk-header px-6 bg-cyan-100">
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
