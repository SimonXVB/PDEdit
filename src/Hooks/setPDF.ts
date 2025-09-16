import { useContext } from "react";
import { pdfContext } from "../Context/PDFCTX/pdfContext";
import { PDFDocument } from "pdf-lib";
import { mainContext } from "../Context/MainCTX/mainContext";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

export function useSetPDF() {
    const { pdfDoc, setPDFDoc, setPDFPages } = useContext(pdfContext);
    const { setError } = useContext(mainContext);
    
    async function setPDF(input: File) {        
        if(input.type !== "application/pdf") {
            setError("fileTypeError");
            return;
        };

        GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
        ).toString();

        try {
            const mainPDF = await PDFDocument.create();
            const reader = new FileReader();
            reader.readAsDataURL(input);
    
            reader.onload = async () => {
                // set PDF
                const newPDF = await PDFDocument.load(reader.result!);

                if(pdfDoc) {
                    const copyExisting = await mainPDF.copyPages(pdfDoc, pdfDoc.getPageIndices());
                    copyExisting.forEach(page => mainPDF.addPage(page));
                };

                const copyNew = await mainPDF.copyPages(newPDF, newPDF.getPageIndices());
                copyNew.forEach(page => mainPDF.addPage(page));

                const bytes = await mainPDF.save();
                const pdfBlob = new Blob([bytes as BlobPart], {type: 'application/pdf'});
                const pdf = await getDocument(URL.createObjectURL(pdfBlob)).promise;

                // set PDF Pages
                for(let i = 1; i <= pdf._pdfInfo.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({scale: 2});
        
                    const canvas: HTMLCanvasElement = document.createElement("canvas");
                    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
                    
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    const renderParams = {
                        canvasContext: ctx,
                        canvas: canvas,
                        viewport: viewport
                    };
                    
                    await page.render(renderParams).promise;
                    const img = canvas.toDataURL("image/png");

                    const pdfPage = {
                        pdfImg: img,
                        height: viewport.height,
                        width: viewport.width,
                        rotation: 360
                    };

                    setPDFPages(prev => [...prev, pdfPage]);
                };

                setPDFDoc(mainPDF);
            };
        } catch (error) {
            setError("setPDFError");
            console.error("An error occurred: ", error);
        };
    };

    return { setPDF };
};