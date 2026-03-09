import { Zap, Shield, Globe } from 'lucide-react';
import ToolCard from '../components/ToolCard';
import AdSense from '../components/AdSense';
import SEO from '../components/SEO';
import { tools } from '../data/tools';

export default function Home() {
  return (
    <>
      <SEO
        title="Free Online PDF Tools"
        description="Free online PDF tools to merge, split, compress, convert PDFs. Easy to use, fast, and secure. No registration required."
        keywords="pdf tools, merge pdf, split pdf, compress pdf, pdf to word, word to pdf, jpg to pdf, free pdf tools"
        canonicalUrl="https://quickpdftools.com"
      />

      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Free Online PDF Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              All the PDF tools you need in one place. Merge, split, compress, convert, and edit PDFs for free.
              No installation required. Works on any device.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="bg-blue-50 p-3 rounded-lg w-fit mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Process your PDFs in seconds with our optimized algorithms.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="bg-green-50 p-3 rounded-lg w-fit mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Secure</h3>
              <p className="text-gray-600">Your files are automatically deleted after processing.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="bg-purple-50 p-3 rounded-lg w-fit mb-4">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Works Anywhere</h3>
              <p className="text-gray-600">Use on any device with a browser. No installation needed.</p>
            </div>
          </div>

          <AdSense slot="home-top" format="horizontal" className="mb-16" />

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Tool</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>

          <AdSense slot="home-bottom" format="horizontal" className="mt-16" />

          <div className="mt-16 bg-blue-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to go Premium?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Upgrade to Premium for unlimited conversions, faster processing, and priority support.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors">
              Upgrade Now - $9.99/month
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
