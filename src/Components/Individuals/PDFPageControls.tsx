import { useRotatePage } from "../../Hooks/useRotatePage";
import { useRearrangePages } from "../../Hooks/useRearrangePages";
import { useRemovePage } from "../../Hooks/useRemovePage";

export function PDFPageControls({ pageNum, index }: { pageNum: number, index: number }) {
    const { removePage } = useRemovePage();
    const { rearrangePages } = useRearrangePages();
    const { rotatePage} = useRotatePage();

    return (
        <div className="flex flex-col items-center m-4">
            <button onClick={() => rotatePage(index)}>Rotate</button>
            {index > 0 &&
                <button onClick={() => rearrangePages(0, index - 1)}>Move Up</button>
            }
            <div>{index + 1}</div>
            {index < (pageNum - 1) &&
                <button onClick={() => rearrangePages(index, index + 1)}>Move Down</button>
            }
            {pageNum > 1 &&
                <button onClick={() => removePage(index)}>Delete Page</button>
            }
        </div>
    )
};