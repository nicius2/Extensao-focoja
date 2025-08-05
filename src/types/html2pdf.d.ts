// src/types/html2pdf.d.ts

declare module 'html2pdf.js' {
    interface Html2Pdf {
        from(element: HTMLElement | string): Html2Pdf;
        set(options: object): Html2Pdf;
        save(): Promise<void>;
    }
    function html2pdf(): Html2Pdf;
    export = html2pdf;
}