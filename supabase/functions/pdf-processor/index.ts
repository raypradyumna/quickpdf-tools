import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ProcessRequest {
  operation: 'merge' | 'split' | 'compress' | 'pdf-to-word' | 'word-to-pdf' | 'jpg-to-pdf' | 'rotate';
  files: string[];
  options?: Record<string, unknown>;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { operation, files, options }: ProcessRequest = await req.json();

    let result;

    switch (operation) {
      case 'merge':
        result = await mergePDFs(files, options);
        break;
      case 'split':
        result = await splitPDF(files[0], options);
        break;
      case 'compress':
        result = await compressPDF(files[0], options);
        break;
      case 'pdf-to-word':
        result = await pdfToWord(files[0], options);
        break;
      case 'word-to-pdf':
        result = await wordToPDF(files[0], options);
        break;
      case 'jpg-to-pdf':
        result = await jpgToPDF(files, options);
        break;
      case 'rotate':
        result = await rotatePDF(files[0], options);
        break;
      default:
        throw new Error('Invalid operation');
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: result,
        message: `${operation} operation completed successfully`
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('PDF processing error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});

async function mergePDFs(files: string[], _options?: Record<string, unknown>) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    outputUrl: 'https://example.com/merged.pdf',
    pages: 10,
    fileSize: 1024 * 1024 * 2
  };
}

async function splitPDF(file: string, _options?: Record<string, unknown>) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    outputFiles: [
      { url: 'https://example.com/page1.pdf', page: 1 },
      { url: 'https://example.com/page2.pdf', page: 2 }
    ]
  };
}

async function compressPDF(file: string, _options?: Record<string, unknown>) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    outputUrl: 'https://example.com/compressed.pdf',
    originalSize: 1024 * 1024 * 5,
    compressedSize: 1024 * 1024 * 2,
    compressionRatio: 60
  };
}

async function pdfToWord(file: string, _options?: Record<string, unknown>) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    outputUrl: 'https://example.com/document.docx',
    pages: 5,
    fileSize: 1024 * 500
  };
}

async function wordToPDF(file: string, _options?: Record<string, unknown>) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    outputUrl: 'https://example.com/document.pdf',
    pages: 5,
    fileSize: 1024 * 800
  };
}

async function jpgToPDF(files: string[], _options?: Record<string, unknown>) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    outputUrl: 'https://example.com/images.pdf',
    pages: files.length,
    fileSize: 1024 * 1024 * 3
  };
}

async function rotatePDF(file: string, options?: Record<string, unknown>) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const rotation = options?.rotation || 90;

  return {
    outputUrl: 'https://example.com/rotated.pdf',
    rotation,
    fileSize: 1024 * 1024 * 2
  };
}
