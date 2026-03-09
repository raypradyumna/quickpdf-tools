import { useState } from 'react';
import { AlertCircle, CheckCircle, Loader2, Download } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import AdSense from '../components/AdSense';
import SEO from '../components/SEO';
import { checkUsageLimit, logUsage } from '../lib/usageTracking';
import type { Tool, ToolType } from '../types';

interface ToolPageProps {
  tool: Tool;
}

export default function ToolPage({ tool }: ToolPageProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const acceptTypes: Record<ToolType, string> = {
    'merge': '.pdf',
    'split': '.pdf',
    'compress': '.pdf',
    'pdf-to-word': '.pdf',
    'word-to-pdf': '.doc,.docx',
    'jpg-to-pdf': '.jpg,.jpeg,.png',
    'rotate': '.pdf'
  };

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setError(null);
    setSuccess(false);
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      setError('Please select at least one file');
      return;
    }

    setError(null);
    setSuccess(false);

    const usageCheck = await checkUsageLimit();

    if (!usageCheck.allowed) {
      setError('You have reached your daily limit of 5 conversions. Please upgrade to Premium for unlimited access.');
      return;
    }

    setProcessing(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      await logUsage(tool.id, totalSize);

      setProgress(100);
      setSuccess(true);
      setResultUrl('#download');

      setTimeout(() => {
        clearInterval(progressInterval);
      }, 500);
    } catch (err) {
      setError('An error occurred while processing your file. Please try again.');
      clearInterval(progressInterval);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <SEO
        title={tool.name}
        description={`${tool.description}. Free, fast, and secure. No registration required.`}
        keywords={`${tool.seoKeyword}, ${tool.name.toLowerCase()}, free pdf tools, online pdf converter`}
        canonicalUrl={`https://quickpdftools.com${tool.path}`}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{tool.name}</h1>
            <p className="text-xl text-gray-600">{tool.description}</p>
          </div>

          <AdSense slot={`${tool.id}-top`} format="horizontal" className="mb-8" />

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <FileUpload
              accept={acceptTypes[tool.id]}
              multiple={tool.id === 'merge'}
              onFilesSelected={handleFilesSelected}
            />

            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-green-800 font-medium">Processing complete!</p>
                  <p className="text-green-700 text-sm mt-1">Your file is ready for download.</p>
                </div>
              </div>
            )}

            {processing && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Processing...</span>
                  <span className="text-sm font-medium text-blue-600">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleProcess}
                disabled={files.length === 0 || processing}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Process {tool.name}</span>
                )}
              </button>

              {resultUrl && (
                <button
                  onClick={() => alert('Download functionality will be implemented with actual PDF processing')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Result</span>
                </button>
              )}
            </div>
          </div>

          <AdSense slot={`${tool.id}-bottom`} format="horizontal" className="mb-8" />

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to {tool.name}</h2>
            <ol className="space-y-4 text-gray-600">
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <span>Upload your file by clicking or dragging it into the upload area</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <span>Click the "Process {tool.name}" button to start</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                <span>Wait for the processing to complete</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                <span>Download your processed file</span>
              </li>
            </ol>
          </div>

          <div className="mt-8 bg-blue-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">Need More Conversions?</h2>
            <p className="text-blue-100 mb-6">
              Upgrade to Premium for unlimited conversions and faster processing.
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
