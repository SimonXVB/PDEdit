import { useRotatePage } from "../../Hooks/useRotatePage.ts";
import { useRemovePage } from "../../Hooks/useRemovePage.ts";
import { SidebarButton } from "./SidebarButton.tsx";
import { useRearrangePages } from "../../Hooks/useRearrangePages.ts";
import { DeletePageModal } from "./DeletePageModal.tsx";
import { useState } from "react";

export function PDFPageControls({ pageNum, index }: { pageNum: number, index: number }) {
    const [toggleModal, setToggleModal] = useState(false);

    const { removePage } = useRemovePage();
    const { rotatePage } = useRotatePage();
    const { rearrangePages } = useRearrangePages();

    return (
        <>
            <div className="flex justify-center mt-1 mb-2">
                {index !== 0 &&
                    <SidebarButton onclick={() => rearrangePages(index, index - 1)} title={"Move Up"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#00b8db" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                        </svg>
                    </SidebarButton>
                }
                <SidebarButton onclick={() => rotatePage(index)} title={"Rotate Page"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#00b8db" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
                    </svg>
                </SidebarButton>
                {pageNum > 1 &&
                    <SidebarButton onclick={() => setToggleModal(true)} title={"Delete Page"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#00b8db" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                        </svg>
                    </SidebarButton>
                }
                {index + 1 < pageNum &&
                    <SidebarButton onclick={() => rearrangePages(index, index + 1)} title={"Move Down"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#00b8db" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                        </svg>
                    </SidebarButton>
                }
            </div>
            {toggleModal && <DeletePageModal removePage={() => {removePage(index); setToggleModal(false)}} toggleModal={() => setToggleModal(false)}/>}
        </>
    )
};