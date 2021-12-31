import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Dialog } from "@headlessui/react";

function YAMLEditor() {
    const [editorBody, setEditorBody] = useState("");
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
                        defaultLanguage="yaml"
                        defaultValue="// some comment"
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
                        }}
                        onChange={(e) => {
                            setEditorBody(e || "");
                        }}
                    />
                    <div className="flex w-full justify-end mt-4">
                        <button
                            className="bg-indigo-700 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => {
                                console.log(editorBody);
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default YAMLEditor;
