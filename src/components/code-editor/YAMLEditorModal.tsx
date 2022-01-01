import { Dialog } from "@headlessui/react";
import useSWR from "swr";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isEditingFileState } from "../../atoms/atoms";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const fetcher = (url: string) => fetch(url).then((r) => r.text());

function YAMLEditorModal() {
    const { data: editorBody, mutate } = useSWR("/api/compose", fetcher);
    const [_isEditingFile, setIsEditingFile] =
        useRecoilState(isEditingFileState);

    const saveFile = () => {
        axios.post("/api/compose", {
            YAML: editorBody,
        });
        closeEditor();
    };
    const closeEditor = () => {
        setIsEditingFile(false);
    };

    return (
        <Dialog
            open={true}
            onClose={() => {}}
            className="fixed z-10 inset-0 overflow-y-auto"
        >
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div
                    className="relative rounded mx-auto flex justify-center p-4 items-center shadow-lg  w-1/2  flex-col"
                    style={{
                        backgroundColor: "rgb(30, 30, 30)",
                    }}
                >
                    <Editor
                        height="400px"
                        language="yaml"
                        value={editorBody}
                        theme="vs-dark"
                        options={{
                            minimap: { enabled: false },
                            padding: {
                                top: 2,
                            },
                            formatOnPaste: true,
                            tabSize: 2,
                            renderLineHighlight: "none",
                            copyWithSyntaxHighlighting: true,
                            fontSize: 14,
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                        onChange={(e) => {
                            mutate(e || "", false);
                        }}
                        loading={<div></div>}
                        line={1}
                    />
                    <div className="flex w-full justify-end mt-4">
                        <button
                            className="bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-2"
                            onClick={closeEditor}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-indigo-700 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={saveFile}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default YAMLEditorModal;
